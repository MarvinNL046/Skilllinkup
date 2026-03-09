#!/usr/bin/env node
/**
 * Translate tools from EN → NL using free Google Translate.
 *
 * Usage: node scripts/translate-tools-nl.mjs [--dry-run]
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

async function main() {
  console.log(`\n🌍 Translating tools EN → ${TARGET} ${DRY_RUN ? "(DRY RUN)" : ""}`);
  console.log("─".repeat(50));

  const allEN = await client.query(api.tools.list, { locale: "en", limit: 100 });
  console.log(`Found ${allEN.length} English tools\n`);

  if (allEN.length === 0) {
    console.log("No English tools found.");
    return;
  }

  const nlTools = await client.query(api.tools.list, { locale: TARGET, limit: 100 });
  const existingSlugs = new Set(nlTools.map((t) => t.slug));
  console.log(`Already have ${existingSlugs.size} ${TARGET} tools\n`);

  let translated = 0;
  let skipped = 0;

  for (const tool of allEN) {
    if (existingSlugs.has(tool.slug)) {
      skipped++;
      continue;
    }

    const nlName = await tr(tool.name);
    const nlDescription = tool.description ? await tr(tool.description) : undefined;
    console.log(`  📝 ${tool.slug}: "${tool.name}" → "${nlName}"`);

    if (!DRY_RUN) {
      await client.mutation(api.tools.insert, {
        ownerId: tool.ownerId,
        name: nlName,
        slug: tool.slug,
        description: nlDescription,
        category: tool.category,
        icon: tool.icon,
        color: tool.color,
        toolUrl: tool.toolUrl,
        isAvailable: tool.isAvailable,
        featured: tool.featured,
        sortOrder: tool.sortOrder,
        status: tool.status,
        locale: TARGET,
      });
    }

    translated++;
  }

  console.log("\n" + "─".repeat(50));
  console.log(`✅ Done! Translated: ${translated}, Skipped (already exist): ${skipped}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
