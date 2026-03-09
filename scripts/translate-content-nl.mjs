#!/usr/bin/env node
/**
 * Translate Convex DB content from English to Dutch using free Google Translate.
 *
 * Usage:
 *   node scripts/translate-content-nl.mjs --table=marketplaceCategories
 *   node scripts/translate-content-nl.mjs --table=platforms
 *   node scripts/translate-content-nl.mjs --table=posts
 *   node scripts/translate-content-nl.mjs --table=tools
 *   node scripts/translate-content-nl.mjs --table=skills
 *   node scripts/translate-content-nl.mjs --table=categories
 *   node scripts/translate-content-nl.mjs --table=resources
 *   node scripts/translate-content-nl.mjs --table=seoPages
 *
 * Options:
 *   --dry-run    Show what would be translated without writing
 *   --locale=XX  Target locale (default: nl)
 */
import fs from "fs";
import path from "path";
import translate from "@iamtraction/google-translate";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

// --------------- Config ---------------
const TARGET_LOCALE = process.argv.find((a) => a.startsWith("--locale="))?.slice(9) || "nl";
const TABLE = process.argv.find((a) => a.startsWith("--table="))?.slice(8);
const DRY_RUN = process.argv.includes("--dry-run");

if (!TABLE) {
  console.error("Usage: node scripts/translate-content-nl.mjs --table=<tableName>");
  console.error("Tables: marketplaceCategories, skills, platforms, posts, tools, categories, resources, seoPages");
  process.exit(1);
}

// --------------- Env ---------------
function readEnv(filePath) {
  const env = {};
  const raw = fs.readFileSync(filePath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^"|"$/g, "");
    env[key] = value;
  }
  return env;
}

const env = readEnv(path.join(process.cwd(), ".env.local"));
const CONVEX_URL = env.NEXT_PUBLIC_CONVEX_URL;
if (!CONVEX_URL) {
  console.error("Missing NEXT_PUBLIC_CONVEX_URL in .env.local");
  process.exit(1);
}
const client = new ConvexHttpClient(CONVEX_URL);

// --------------- Translation helpers ---------------
const RATE_LIMIT_MS = 500; // be nice to Google
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tr(text, to = TARGET_LOCALE) {
  if (!text || typeof text !== "string" || text.trim().length === 0) return text;
  // Skip very short strings (single chars, numbers)
  if (text.trim().length <= 2 && /^[\d.]+$/.test(text.trim())) return text;
  try {
    const result = await translate(text, { to });
    await sleep(RATE_LIMIT_MS);
    return result.text;
  } catch (err) {
    console.warn(`  [WARN] Translation failed for "${text.slice(0, 50)}...": ${err.message}`);
    return text; // fallback to original
  }
}

async function trArray(arr, to = TARGET_LOCALE) {
  if (!Array.isArray(arr) || arr.length === 0) return arr;
  const results = [];
  for (const item of arr) {
    results.push(await tr(item, to));
  }
  return results;
}

// Strip HTML for plain-text fields, translate, return
async function trHtml(html, to = TARGET_LOCALE) {
  if (!html || typeof html !== "string") return html;
  // For HTML content, translate as-is (Google handles HTML ok)
  return tr(html, to);
}

// --------------- Table configs ---------------
// Each table config defines: query to list EN records, fields to translate, mutation to create
const TABLE_CONFIGS = {
  marketplaceCategories: {
    listQuery: async () => {
      // Use internal query — list all categories with locale="en"
      const cats = await client.query(api.marketplaceCategories.list, { locale: "en" });
      return cats || [];
    },
    fields: {
      text: ["label", "description"],
    },
    slugField: "slug",
    createMutation: "marketplaceCategories:upsertTranslation",
  },
  skills: {
    listQuery: async () => {
      const skills = await client.query(api.skills.list, { locale: "en" });
      return skills || [];
    },
    fields: {
      text: ["name"],
    },
    slugField: "slug",
    createMutation: "skills:upsertTranslation",
  },
  platforms: {
    listQuery: async () => {
      const platforms = await client.query(api.platforms.list, { locale: "en", status: "published" });
      return platforms || [];
    },
    fields: {
      text: ["name", "description", "fees", "category"],
      array: ["pros", "cons", "features"],
    },
    slugField: "slug",
    createMutation: "platforms:upsertTranslation",
  },
  posts: {
    listQuery: async () => {
      const posts = await client.query(api.posts.list, { locale: "en", status: "published", limit: 500 });
      return posts || [];
    },
    fields: {
      text: ["title", "excerpt", "metaTitle", "metaDescription"],
      html: ["content"],
    },
    slugField: "slug",
    createMutation: "posts:upsertTranslation",
  },
  tools: {
    listQuery: async () => {
      const tools = await client.query(api.tools.list, { locale: "en" });
      return tools || [];
    },
    fields: {
      text: ["name", "description"],
    },
    slugField: "slug",
    createMutation: "tools:upsertTranslation",
  },
  categories: {
    listQuery: async () => {
      const cats = await client.query(api.categories.list, { locale: "en" });
      return cats || [];
    },
    fields: {
      text: ["name", "description"],
    },
    slugField: "slug",
    createMutation: "categories:upsertTranslation",
  },
  resources: {
    listQuery: async () => {
      const res = await client.query(api.resources.list, { locale: "en", status: "published", limit: 500 });
      return res || [];
    },
    fields: {
      text: ["metaTitle", "metaDescription", "heroTitle", "heroSubtitle"],
      html: ["content"],
      array: ["faqItems"],
    },
    slugField: "slug",
    createMutation: "resources:upsertTranslation",
  },
  seoPages: {
    listQuery: async () => {
      const pages = await client.query(api.seoPages.list, { locale: "en", status: "published", limit: 500 });
      return pages || [];
    },
    fields: {
      text: ["metaTitle", "metaDescription", "heroTitle", "heroSubtitle"],
      html: ["content"],
    },
    slugField: "slug",
    createMutation: "seoPages:upsertTranslation",
  },
};

// --------------- Main ---------------
async function main() {
  const config = TABLE_CONFIGS[TABLE];
  if (!config) {
    console.error(`Unknown table: ${TABLE}`);
    console.error(`Available: ${Object.keys(TABLE_CONFIGS).join(", ")}`);
    process.exit(1);
  }

  console.log(`\n🌍 Translating ${TABLE} → ${TARGET_LOCALE} ${DRY_RUN ? "(DRY RUN)" : ""}`);
  console.log("─".repeat(50));

  let records;
  try {
    records = await config.listQuery();
  } catch (err) {
    console.error(`Failed to query ${TABLE}:`, err.message);
    console.log("\nNote: If the query function doesn't exist, you'll need to create");
    console.log("an upsertTranslation mutation in the Convex table file first.");
    process.exit(1);
  }

  console.log(`Found ${records.length} English records\n`);

  let translated = 0;
  let skipped = 0;

  for (const record of records) {
    const slug = record[config.slugField];
    if (!slug) {
      console.log(`  ⏭ Skipping record without slug (id: ${record._id})`);
      skipped++;
      continue;
    }

    console.log(`  📝 ${slug}`);

    // Build translated fields
    const translatedFields = {};

    // Text fields
    if (config.fields.text) {
      for (const field of config.fields.text) {
        if (record[field]) {
          const result = await tr(record[field]);
          translatedFields[field] = result;
          if (!DRY_RUN) {
            console.log(`     ${field}: "${result.slice(0, 60)}${result.length > 60 ? "..." : ""}"`);
          }
        }
      }
    }

    // HTML fields
    if (config.fields.html) {
      for (const field of config.fields.html) {
        if (record[field]) {
          const result = await trHtml(record[field]);
          translatedFields[field] = result;
          if (!DRY_RUN) {
            console.log(`     ${field}: (${result.length} chars)`);
          }
        }
      }
    }

    // Array fields
    if (config.fields.array) {
      for (const field of config.fields.array) {
        if (record[field] && Array.isArray(record[field])) {
          // Handle FAQ items (objects with question/answer)
          if (field === "faqItems") {
            const translated = [];
            for (const item of record[field]) {
              translated.push({
                question: await tr(item.question),
                answer: await tr(item.answer),
              });
            }
            translatedFields[field] = translated;
          } else {
            translatedFields[field] = await trArray(record[field]);
          }
          if (!DRY_RUN) {
            console.log(`     ${field}: [${translatedFields[field].length} items]`);
          }
        }
      }
    }

    if (DRY_RUN) {
      console.log(`     Would translate: ${Object.keys(translatedFields).join(", ")}`);
    } else {
      // Note: upsertTranslation mutations need to be created in each Convex table.
      // They should: find existing record with (slug, locale), update or create.
      // For now, log the result — actual mutations will be wired per-table in subsequent items.
      console.log(`     ✅ Translated ${Object.keys(translatedFields).length} fields`);
    }

    translated++;
  }

  console.log("\n" + "─".repeat(50));
  console.log(`✅ Done! Translated: ${translated}, Skipped: ${skipped}`);
  if (DRY_RUN) console.log("(Dry run — no changes written)");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
