#!/usr/bin/env node
/**
 * Translate SEO pages from EN → NL using free Google Translate.
 *
 * Usage: node scripts/translate-seopages-nl.mjs [--dry-run]
 */
import fs from "fs";
import path from "path";
import translate from "@iamtraction/google-translate";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const DRY_RUN = process.argv.includes("--dry-run");
const TARGET = "nl";
const RATE_LIMIT_MS = 500;
const MAX_CHUNK = 4500;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function readEnv(filePath) {
  const env = {};
  const raw = fs.readFileSync(filePath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx === -1) continue;
    env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim().replace(/^"|"$/g, "");
  }
  return env;
}

const env = readEnv(path.join(process.cwd(), ".env.local"));
const client = new ConvexHttpClient(env.NEXT_PUBLIC_CONVEX_URL);

function splitHTML(html) {
  const chunks = [];
  let current = "";
  const parts = html.split(/(<\/(?:p|h[1-6]|div|section|ul|ol|li|blockquote)>)/gi);
  for (const part of parts) {
    if ((current + part).length > MAX_CHUNK && current.length > 0) {
      chunks.push(current);
      current = part;
    } else {
      current += part;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

async function tr(text) {
  if (!text || typeof text !== "string" || text.trim().length === 0) return text;
  try {
    if (text.length <= MAX_CHUNK) {
      const result = await translate(text, { to: TARGET });
      await sleep(RATE_LIMIT_MS);
      return result.text;
    }
    const chunks = splitHTML(text);
    const translated = [];
    for (const chunk of chunks) {
      const result = await translate(chunk, { to: TARGET });
      await sleep(RATE_LIMIT_MS);
      translated.push(result.text);
    }
    return translated.join("");
  } catch (err) {
    console.warn(`  ⚠ Failed: "${text.slice(0, 40)}": ${err.message}`);
    return text;
  }
}

async function main() {
  console.log(`\n🌍 Translating SEO pages EN → ${TARGET} ${DRY_RUN ? "(DRY RUN)" : ""}`);
  console.log("─".repeat(50));

  const allEN = await client.query(api.seoPages.list, { locale: "en", limit: 200 });
  console.log(`Found ${allEN.length} English SEO pages\n`);

  if (allEN.length === 0) {
    console.log("No English SEO pages found.");
    return;
  }

  const nlPages = await client.query(api.seoPages.list, { locale: TARGET, limit: 200 });
  const existingSlugs = new Set(nlPages.map((p) => p.slug));
  console.log(`Already have ${existingSlugs.size} ${TARGET} SEO pages\n`);

  let translated = 0;
  let skipped = 0;

  for (const page of allEN) {
    if (existingSlugs.has(page.slug)) {
      skipped++;
      continue;
    }

    console.log(`  📝 ${page.slug}: "${page.title.slice(0, 50)}"`);

    const nlTitle = await tr(page.title);
    const nlMetaTitle = page.metaTitle ? await tr(page.metaTitle) : undefined;
    const nlMetaDescription = page.metaDescription ? await tr(page.metaDescription) : undefined;
    const nlH1 = page.h1 ? await tr(page.h1) : undefined;
    const nlContent = await tr(page.content);
    const nlExcerpt = page.excerpt ? await tr(page.excerpt) : undefined;

    console.log(`     → "${nlTitle.slice(0, 50)}"`);

    if (!DRY_RUN) {
      await client.mutation(api.seoPages.insert, {
        tenantId: page.tenantId,
        title: nlTitle,
        slug: page.slug,
        metaTitle: nlMetaTitle,
        metaDescription: nlMetaDescription,
        h1: nlH1,
        content: nlContent,
        excerpt: nlExcerpt,
        pillarId: page.pillarId,
        pillarName: page.pillarName,
        pillarSlug: page.pillarSlug,
        subpillarIndex: page.subpillarIndex,
        keywords: page.keywords,
        locale: TARGET,
        status: page.status,
      });
    }

    translated++;
  }

  console.log("\n" + "─".repeat(50));
  console.log(`✅ Done! Translated: ${translated}, Skipped: ${skipped}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
