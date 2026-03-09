#!/usr/bin/env node
/**
 * Translate skills from EN → NL using free Google Translate.
 *
 * Usage: node scripts/translate-skills-nl.mjs [--dry-run]
 */
import fs from "fs";
import path from "path";
import translate from "@iamtraction/google-translate";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const DRY_RUN = process.argv.includes("--dry-run");
const TARGET = "nl";
const RATE_LIMIT_MS = 350;
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
  console.log(`\n🌍 Translating skills EN → ${TARGET} ${DRY_RUN ? "(DRY RUN)" : ""}`);
  console.log("─".repeat(50));

  const skills = await client.query(api.skills.list, { locale: "en" });
  console.log(`Found ${skills.length} English skills\n`);

  // Check existing NL skills to skip already-translated ones
  const nlSkills = await client.query(api.skills.list, { locale: TARGET });
  const existingSlugs = new Set(nlSkills.map((s) => s.slug));
  console.log(`Already have ${existingSlugs.size} ${TARGET} skills\n`);

  let translated = 0;
  let skipped = 0;

  for (const skill of skills) {
    if (existingSlugs.has(skill.slug)) {
      skipped++;
      continue;
    }

    const nlName = await tr(skill.name);
    console.log(`  📝 ${skill.slug}: "${skill.name}" → "${nlName}"`);

    if (!DRY_RUN) {
      await client.mutation(api.skills.insert, {
        name: nlName,
        slug: skill.slug,
        categoryId: skill.categoryId,
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
