#!/usr/bin/env node
/**
 * Translate messages/en.json to a target locale using free Google Translate.
 * Preserves JSON structure, keys, and interpolation variables like {name}.
 *
 * Usage: node scripts/translate-messages.mjs <locale> [--dry-run]
 *   e.g. node scripts/translate-messages.mjs de
 */
import fs from "fs";
import path from "path";
import translate from "@iamtraction/google-translate";

const TARGET = process.argv[2];
if (!TARGET) {
  console.error("Usage: node scripts/translate-messages.mjs <locale> [--dry-run]");
  process.exit(1);
}

const DRY_RUN = process.argv.includes("--dry-run");
const RATE_LIMIT_MS = 350;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Terms that should NOT be translated (kept in English)
const KEEP_ENGLISH = new Set([
  "SkillLinkup", "freelancer", "freelancers", "dashboard", "portfolio",
  "skills", "gig", "gigs", "review", "reviews", "tags", "online",
]);

async function tr(text) {
  if (!text || typeof text !== "string" || text.trim().length === 0) return text;

  // Protect interpolation variables {name}, {count}, etc.
  const vars = [];
  const protected_ = text.replace(/\{(\w+)\}/g, (match) => {
    vars.push(match);
    return `__VAR${vars.length - 1}__`;
  });

  try {
    const result = await translate(protected_, { to: TARGET });
    await sleep(RATE_LIMIT_MS);

    // Restore variables
    let translated = result.text;
    vars.forEach((v, i) => {
      // Google Translate sometimes adds spaces around placeholders
      const patterns = [
        `__VAR${i}__`,
        `__ VAR${i}__`,
        `__VAR${i} __`,
        `__ VAR${i} __`,
        `__var${i}__`,
        `__ var${i}__`,
        `__var${i} __`,
        `__ var${i} __`,
      ];
      for (const p of patterns) {
        translated = translated.replace(p, v);
      }
    });

    return translated;
  } catch (err) {
    console.warn(`  ⚠ Failed: "${text.slice(0, 40)}": ${err.message}`);
    return text;
  }
}

async function translateObject(obj, path_ = "") {
  const result = {};
  const entries = Object.entries(obj);

  for (const [key, value] of entries) {
    const fullPath = path_ ? `${path_}.${key}` : key;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      // Recurse into nested objects
      result[key] = await translateObject(value, fullPath);
    } else if (typeof value === "string") {
      const translated = await tr(value);
      result[key] = translated;
      // Log progress every namespace
      if (!path_.includes(".")) {
        process.stdout.write(".");
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}

async function main() {
  const srcPath = path.join(process.cwd(), "messages", "en.json");
  const destPath = path.join(process.cwd(), "messages", `${TARGET}.json`);

  console.log(`\n🌍 Translating messages EN → ${TARGET} ${DRY_RUN ? "(DRY RUN)" : ""}`);
  console.log("─".repeat(50));

  const en = JSON.parse(fs.readFileSync(srcPath, "utf8"));
  const namespaces = Object.keys(en);
  console.log(`Found ${namespaces.length} namespaces\n`);

  // If target file exists, use it as base and only translate missing keys
  let existing = {};
  if (fs.existsSync(destPath)) {
    existing = JSON.parse(fs.readFileSync(destPath, "utf8"));
    console.log(`Existing ${TARGET}.json found — will merge missing keys\n`);
  }

  const translated = {};
  let count = 0;

  for (const ns of namespaces) {
    process.stdout.write(`  📝 ${ns} `);

    if (existing[ns] && JSON.stringify(Object.keys(en[ns])) === JSON.stringify(Object.keys(existing[ns]))) {
      // Namespace already fully translated
      translated[ns] = existing[ns];
      process.stdout.write("(exists, skipped)\n");
      continue;
    }

    translated[ns] = await translateObject(en[ns], ns);
    count++;
    process.stdout.write(" ✓\n");
  }

  if (DRY_RUN) {
    console.log(`\n(Dry run — would write ${Object.keys(translated).length} namespaces)`);
    return;
  }

  fs.writeFileSync(destPath, JSON.stringify(translated, null, 2) + "\n", "utf8");
  console.log(`\n✅ Written to ${destPath}`);
  console.log(`   Namespaces translated: ${count}, Skipped: ${namespaces.length - count}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
