#!/usr/bin/env node
/**
 * Translate platforms from EN → NL using free Google Translate.
 * Uses the existing seedAll mutation which upserts by slug+locale.
 *
 * Usage: node scripts/translate-platforms-nl.mjs [--dry-run]
 */
import fs from "fs";
import path from "path";
import translate from "@iamtraction/google-translate";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const DRY_RUN = process.argv.includes("--dry-run");
const TARGET = "nl";
const RATE_LIMIT_MS = 400;
const BATCH_SIZE = 25; // seedAll batch size
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
    console.warn(`  ⚠ Translation failed: "${text.slice(0, 40)}": ${err.message}`);
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
  console.log(`\n🌍 Translating platforms EN → ${TARGET} ${DRY_RUN ? "(DRY RUN)" : ""}`);
  console.log("─".repeat(50));

  // Get all EN platforms (all statuses, we translate everything)
  const allEN = await client.query(api.platforms.list, { locale: "en", limit: 200 });
  console.log(`Found ${allEN.length} English platforms\n`);

  if (allEN.length === 0) {
    console.log("No English platforms found.");
    return;
  }

  // Check existing NL platforms
  const nlPlatforms = await client.query(api.platforms.list, { locale: TARGET, limit: 200 });
  const existingSlugs = new Set(nlPlatforms.map((p) => p.slug));
  console.log(`Already have ${existingSlugs.size} ${TARGET} platforms\n`);

  const toTranslate = allEN.filter((p) => !existingSlugs.has(p.slug));
  console.log(`Need to translate: ${toTranslate.length}\n`);

  if (toTranslate.length === 0) {
    console.log("All platforms already translated!");
    return;
  }

  const translated = [];
  for (const platform of toTranslate) {
    console.log(`  📝 ${platform.slug}: "${platform.name}"`);

    const nlName = await tr(platform.name);
    const nlDescription = await tr(platform.description);
    const nlFees = await tr(platform.fees);
    const nlPros = await trArray(platform.pros);
    const nlCons = await trArray(platform.cons);
    const nlFeatures = await trArray(platform.features);

    console.log(`     → "${nlName}"`);

    translated.push({
      name: nlName,
      slug: platform.slug,
      description: nlDescription,
      logoUrl: platform.logoUrl,
      websiteUrl: platform.websiteUrl,
      rating: platform.rating,
      category: platform.category,
      fees: nlFees,
      difficulty: platform.difficulty,
      color: platform.color,
      featured: platform.featured,
      pros: nlPros,
      cons: nlCons,
      features: nlFeatures,
      status: platform.status,
      publishedAt: platform.publishedAt,
      workType: platform.workType,
      countries: platform.countries,
      affiliateLink: platform.affiliateLink,
      locale: TARGET,
      createdAt: platform.createdAt ?? Date.now(),
      updatedAt: Date.now(),
    });
  }

  if (DRY_RUN) {
    console.log("\n(Dry run — no changes written to Convex)");
    console.log(`Would insert ${translated.length} platforms`);
    return;
  }

  // Insert in batches via seedAll
  console.log(`\n💾 Writing ${translated.length} platforms to Convex...`);
  let totalInserted = 0;
  let totalSkipped = 0;

  for (let i = 0; i < translated.length; i += BATCH_SIZE) {
    const batch = translated.slice(i, i + BATCH_SIZE);
    const result = await client.mutation(api.platforms.seedAll, {
      platforms: batch,
      serverSecret: SERVER_SECRET,
    });
    totalInserted += result.inserted;
    totalSkipped += result.skipped;
    console.log(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}: inserted=${result.inserted}, skipped=${result.skipped}`);
  }

  console.log(`\n✅ Done! Inserted: ${totalInserted}, Skipped: ${totalSkipped}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
