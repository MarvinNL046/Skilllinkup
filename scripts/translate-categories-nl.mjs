#!/usr/bin/env node
/**
 * Translate marketplace categories from EN → NL using free Google Translate.
 * Uses the existing seedAll mutation which upserts by slug+locale.
 *
 * Usage: node scripts/translate-categories-nl.mjs [--dry-run]
 */
import fs from "fs";
import path from "path";
import translate from "@iamtraction/google-translate";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const DRY_RUN = process.argv.includes("--dry-run");
const TARGET = "nl";
const RATE_LIMIT_MS = 400;
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

async function main() {
  console.log(`\n🌍 Translating marketplace categories EN → ${TARGET} ${DRY_RUN ? "(DRY RUN)" : ""}`);
  console.log("─".repeat(50));

  // Get all EN categories (flat list, not tree)
  const allEN = await client.query(api.marketplace.categories.list, { locale: "en" });
  if (!allEN || allEN.length === 0) {
    console.log("No English categories found.");
    return;
  }

  // allEN is a tree structure. Flatten it for counting, but keep tree for seedAll.
  function countTree(nodes) {
    let count = 0;
    for (const node of nodes) {
      count++;
      if (node.children) count += countTree(node.children);
    }
    return count;
  }
  console.log(`Found ${countTree(allEN)} categories (${allEN.length} root)\n`);

  // Get tenant ID
  const tenantId = await client.query(api.marketplace.categories.getFirstTenant, {});
  if (!tenantId) {
    console.error("No tenant found!");
    process.exit(1);
  }

  // Translate tree recursively
  async function translateNode(node) {
    const translated = {
      name: await tr(node.name || node.label),
      slug: node.slug,
      description: node.description ? await tr(node.description) : undefined,
      icon: node.icon,
      imageUrl: node.imageUrl,
      serviceType: node.serviceType,
      sortOrder: node.sortOrder,
      isActive: node.isActive,
      seoMetadata: node.seoMetadata,
    };

    console.log(`  📝 ${node.slug}: "${node.name || node.label}" → "${translated.name}"`);

    if (node.children && node.children.length > 0) {
      translated.children = [];
      for (const child of node.children) {
        translated.children.push(await translateNode(child));
      }
    }

    return translated;
  }

  const translatedTree = [];
  for (const root of allEN) {
    translatedTree.push(await translateNode(root));
  }

  if (DRY_RUN) {
    console.log("\n(Dry run — no changes written to Convex)");
    return;
  }

  // Use seedAll mutation to upsert with locale="nl"
  console.log("\n💾 Writing to Convex...");
  const result = await client.mutation(api.marketplace.categories.seedAll, {
    tenantId,
    categories: translatedTree,
    locale: TARGET,
    serverSecret: SERVER_SECRET,
  });

  console.log(`\n✅ Done! Inserted: ${result.inserted}, Updated: ${result.skipped}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
