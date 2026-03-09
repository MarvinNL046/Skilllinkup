#!/usr/bin/env node
/**
 * Translate resources from EN → NL using free Google Translate.
 * Uses the existing upsert mutation.
 *
 * Usage: node scripts/translate-resources-nl.mjs [--dry-run]
 */
import fs from "fs";
import path from "path";
import translate from "@iamtraction/google-translate";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const DRY_RUN = process.argv.includes("--dry-run");
const TARGET = "nl";
const RATE_LIMIT_MS = 450;
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
const SERVER_SECRET = env.INTERNAL_EMAIL_SECRET;

async function tr(text) {
  if (!text || typeof text !== "string" || text.trim().length === 0) return text;
  try {
    const result = await translate(text, { to: TARGET });
    await sleep(RATE_LIMIT_MS);
    return result.text;
  } catch (err) {
    console.warn(`  ⚠ Failed: "${text.slice(0, 40)}": ${err.message}`);
    return text;
  }
}

async function trArray(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return arr;
  const translated = [];
  for (const item of arr) {
    translated.push(await tr(item));
  }
  return translated;
}

async function main() {
  console.log(`\n🌍 Translating resources EN → ${TARGET} ${DRY_RUN ? "(DRY RUN)" : ""}`);
  console.log("─".repeat(50));

  const allEN = await client.query(api.resources.list, { locale: "en", limit: 200 });
  console.log(`Found ${allEN.length} English resources\n`);

  if (allEN.length === 0) {
    console.log("No English resources found.");
    return;
  }

  const nlResources = await client.query(api.resources.list, { locale: TARGET, limit: 200 });
  const existingSlugs = new Set(nlResources.map((r) => r.slug));
  console.log(`Already have ${existingSlugs.size} ${TARGET} resources\n`);

  let translated = 0;
  let skipped = 0;

  for (const resource of allEN) {
    if (existingSlugs.has(resource.slug)) {
      skipped++;
      continue;
    }

    console.log(`  📝 ${resource.slug}: "${resource.metaTitle.slice(0, 50)}"`);

    const nlMetaTitle = await tr(resource.metaTitle);
    const nlMetaDescription = await tr(resource.metaDescription);
    const nlIntro = await tr(resource.intro);

    // Translate sections
    const nlSections = [];
    for (const section of resource.sections || []) {
      nlSections.push({
        heading: await tr(section.heading),
        body: await tr(section.body),
      });
    }

    // Translate FAQ items
    const nlFaqItems = [];
    for (const faq of resource.faqItems || []) {
      nlFaqItems.push({
        question: await tr(faq.question),
        answer: await tr(faq.answer),
      });
    }

    // Translate key takeaways
    const nlKeyTakeaways = resource.keyTakeaways ? await trArray(resource.keyTakeaways) : undefined;

    console.log(`     → "${nlMetaTitle.slice(0, 50)}"`);

    if (!DRY_RUN) {
      await client.mutation(api.resources.upsert, {
        slug: resource.slug,
        locale: TARGET,
        type: resource.type,
        status: resource.status,
        metaTitle: nlMetaTitle,
        metaDescription: nlMetaDescription,
        intro: nlIntro,
        sections: nlSections,
        pricingData: resource.pricingData,
        comparisonData: resource.comparisonData,
        faqItems: nlFaqItems,
        keyTakeaways: nlKeyTakeaways,
        publishedAt: resource.publishedAt,
        serverSecret: SERVER_SECRET,
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
