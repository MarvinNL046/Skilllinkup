#!/usr/bin/env node
/**
 * Translate blog posts from EN → NL using free Google Translate.
 * Uses upsertBySlug mutation which auto-resolves tenant and category.
 *
 * Usage: node scripts/translate-posts-nl.mjs [--dry-run]
 */
import fs from "fs";
import path from "path";
import translate from "@iamtraction/google-translate";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const DRY_RUN = process.argv.includes("--dry-run");
const TARGET = "nl";
const RATE_LIMIT_MS = 500;
const MAX_CHUNK = 4500; // Google Translate max ~5000 chars
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
    // For short text, translate directly
    if (text.length <= MAX_CHUNK) {
      const result = await translate(text, { to: TARGET });
      await sleep(RATE_LIMIT_MS);
      return result.text;
    }

    // For long text (HTML content), split by paragraphs/sections
    const chunks = splitHTML(text);
    const translated = [];
    for (const chunk of chunks) {
      const result = await translate(chunk, { to: TARGET });
      await sleep(RATE_LIMIT_MS);
      translated.push(result.text);
    }
    return translated.join("");
  } catch (err) {
    console.warn(`  ⚠ Translation failed: "${text.slice(0, 60)}...": ${err.message}`);
    return text;
  }
}

/**
 * Split HTML into chunks that respect tag boundaries.
 * Splits on </p>, </h2>, </h3>, </div>, </ul>, </ol>, </blockquote> etc.
 */
function splitHTML(html) {
  const chunks = [];
  let current = "";
  // Split on closing block tags
  const parts = html.split(/(<\/(?:p|h[1-6]|div|section|ul|ol|li|blockquote|table|tr|figure)>)/gi);

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

async function main() {
  console.log(`\n🌍 Translating posts EN → ${TARGET} ${DRY_RUN ? "(DRY RUN)" : ""}`);
  console.log("─".repeat(50));

  // Get all EN posts
  const allEN = await client.query(api.posts.list, { locale: "en", limit: 200 });
  console.log(`Found ${allEN.length} English posts\n`);

  if (allEN.length === 0) {
    console.log("No English posts found.");
    return;
  }

  // Check existing NL posts
  const nlPosts = await client.query(api.posts.list, { locale: TARGET, limit: 200 });
  const existingSlugs = new Set(nlPosts.map((p) => p.slug));
  console.log(`Already have ${existingSlugs.size} ${TARGET} posts\n`);

  const toTranslate = allEN.filter((p) => !existingSlugs.has(p.slug));
  console.log(`Need to translate: ${toTranslate.length}\n`);

  if (toTranslate.length === 0) {
    console.log("All posts already translated!");
    return;
  }

  let translated = 0;
  let failed = 0;

  for (const post of toTranslate) {
    console.log(`\n  📝 ${post.slug}: "${post.title.slice(0, 50)}..."`);

    try {
      const nlTitle = await tr(post.title);
      const nlExcerpt = post.excerpt ? await tr(post.excerpt) : undefined;
      const nlContent = await tr(post.content);
      const nlMetaTitle = post.metaTitle ? await tr(post.metaTitle) : undefined;
      const nlMetaDescription = post.metaDescription ? await tr(post.metaDescription) : undefined;

      console.log(`     → "${nlTitle.slice(0, 50)}..."`);

      if (!DRY_RUN) {
        // Resolve category slug from the enriched post data
        const categorySlug = post.category?.slug;

        await client.mutation(api.posts.upsertBySlug, {
          slug: post.slug,
          locale: TARGET,
          title: nlTitle,
          content: nlContent,
          excerpt: nlExcerpt,
          categorySlug,
          metaTitle: nlMetaTitle,
          metaDescription: nlMetaDescription,
          tags: post.tags,
          featureImg: post.featureImg,
          readTime: post.readTime,
          authorName: post.authorName,
          status: post.status || "published",
          serverSecret: SERVER_SECRET,
        });
      }
      translated++;
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}`);
      failed++;
    }
  }

  console.log("\n" + "─".repeat(50));
  console.log(`✅ Done! Translated: ${translated}, Failed: ${failed}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
