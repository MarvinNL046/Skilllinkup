#!/usr/bin/env node
/**
 * Translate DB content from EN → any locale using free Google Translate.
 * Supports all Convex content tables: platforms, posts, resources, categories, skills, tools, seoPages.
 *
 * Usage: node scripts/translate-db-content.mjs <locale> [table] [--dry-run]
 *   e.g. node scripts/translate-db-content.mjs de              # all tables
 *        node scripts/translate-db-content.mjs de platforms     # just platforms
 *        node scripts/translate-db-content.mjs fr posts --dry-run
 */
import fs from "fs";
import path from "path";
import translate from "@iamtraction/google-translate";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const TARGET = process.argv[2];
if (!TARGET || TARGET.startsWith("--")) {
  console.error("Usage: node scripts/translate-db-content.mjs <locale> [table] [--dry-run]");
  process.exit(1);
}

const TABLE_FILTER = process.argv[3] && !process.argv[3].startsWith("--") ? process.argv[3] : null;
const DRY_RUN = process.argv.includes("--dry-run");
const RATE_LIMIT_MS = 450;
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
const SERVER_SECRET = env.INTERNAL_EMAIL_SECRET;

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

async function trArray(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) return arr;
  const out = [];
  for (const item of arr) { out.push(await tr(item)); }
  return out;
}

// ─── Table handlers ───

async function translatePlatforms() {
  const allEN = await client.query(api.platforms.list, { locale: "en", limit: 200 });
  const existing = await client.query(api.platforms.list, { locale: TARGET, limit: 200 });
  const existingSlugs = new Set(existing.map((p) => p.slug));
  const toTranslate = allEN.filter((p) => !existingSlugs.has(p.slug));
  console.log(`  Platforms: ${allEN.length} EN, ${existingSlugs.size} ${TARGET} exist, ${toTranslate.length} to translate`);
  if (toTranslate.length === 0) return 0;

  const batch = [];
  for (const p of toTranslate) {
    console.log(`    📝 ${p.slug}`);
    batch.push({
      name: await tr(p.name), slug: p.slug, description: await tr(p.description),
      logoUrl: p.logoUrl, websiteUrl: p.websiteUrl, rating: p.rating, category: p.category,
      fees: await tr(p.fees), difficulty: p.difficulty, color: p.color, featured: p.featured,
      pros: await trArray(p.pros), cons: await trArray(p.cons), features: await trArray(p.features),
      status: p.status, publishedAt: p.publishedAt, workType: p.workType, countries: p.countries,
      affiliateLink: p.affiliateLink, locale: TARGET,
      createdAt: p.createdAt ?? Date.now(), updatedAt: Date.now(),
    });
  }
  if (!DRY_RUN) {
    const result = await client.mutation(api.platforms.seedAll, { platforms: batch, serverSecret: SERVER_SECRET });
    console.log(`    Inserted: ${result.inserted}`);
  }
  return batch.length;
}

async function translatePosts() {
  const allEN = await client.query(api.posts.list, { locale: "en", limit: 200 });
  const existing = await client.query(api.posts.list, { locale: TARGET, limit: 200 });
  const existingSlugs = new Set(existing.map((p) => p.slug));
  const toTranslate = allEN.filter((p) => !existingSlugs.has(p.slug));
  console.log(`  Posts: ${allEN.length} EN, ${existingSlugs.size} ${TARGET} exist, ${toTranslate.length} to translate`);
  if (toTranslate.length === 0) return 0;

  for (const post of toTranslate) {
    console.log(`    📝 ${post.slug}`);
    if (!DRY_RUN) {
      await client.mutation(api.posts.upsertBySlug, {
        slug: post.slug, locale: TARGET, title: await tr(post.title), content: await tr(post.content),
        excerpt: post.excerpt ? await tr(post.excerpt) : undefined,
        categorySlug: post.category?.slug, metaTitle: post.metaTitle ? await tr(post.metaTitle) : undefined,
        metaDescription: post.metaDescription ? await tr(post.metaDescription) : undefined,
        tags: post.tags, featureImg: post.featureImg, readTime: post.readTime,
        authorName: post.authorName, status: post.status || "published", serverSecret: SERVER_SECRET,
      });
    }
  }
  return toTranslate.length;
}

async function translateResources() {
  const allEN = await client.query(api.resources.list, { locale: "en", limit: 200 });
  const existing = await client.query(api.resources.list, { locale: TARGET, limit: 200 });
  const existingSlugs = new Set(existing.map((r) => r.slug));
  const toTranslate = allEN.filter((r) => !existingSlugs.has(r.slug));
  console.log(`  Resources: ${allEN.length} EN, ${existingSlugs.size} ${TARGET} exist, ${toTranslate.length} to translate`);
  if (toTranslate.length === 0) return 0;

  for (const r of toTranslate) {
    console.log(`    📝 ${r.slug}`);
    const nlSections = [];
    for (const s of r.sections || []) { nlSections.push({ heading: await tr(s.heading), body: await tr(s.body) }); }
    const nlFaq = [];
    for (const f of r.faqItems || []) { nlFaq.push({ question: await tr(f.question), answer: await tr(f.answer) }); }
    if (!DRY_RUN) {
      await client.mutation(api.resources.upsert, {
        slug: r.slug, locale: TARGET, type: r.type, status: r.status,
        metaTitle: await tr(r.metaTitle), metaDescription: await tr(r.metaDescription),
        intro: await tr(r.intro), sections: nlSections, faqItems: nlFaq,
        pricingData: r.pricingData, comparisonData: r.comparisonData,
        keyTakeaways: r.keyTakeaways ? await trArray(r.keyTakeaways) : undefined,
        publishedAt: r.publishedAt, serverSecret: SERVER_SECRET,
      });
    }
  }
  return toTranslate.length;
}

async function translateCategories() {
  const allEN = await client.query(api.marketplace.categories.list, { locale: "en" });
  if (!allEN || allEN.length === 0) { console.log("  Categories: 0 EN"); return 0; }

  function countTree(nodes) { let c = 0; for (const n of nodes) { c++; if (n.children) c += countTree(n.children); } return c; }
  console.log(`  Categories: ${countTree(allEN)} EN`);

  const tenantId = await client.query(api.marketplace.categories.getFirstTenant, {});
  if (!tenantId) { console.log("  No tenant found!"); return 0; }

  async function translateNode(node) {
    const translated = {
      name: await tr(node.name || node.label), slug: node.slug,
      description: node.description ? await tr(node.description) : undefined,
      icon: node.icon, imageUrl: node.imageUrl, serviceType: node.serviceType,
      sortOrder: node.sortOrder, isActive: node.isActive, seoMetadata: node.seoMetadata,
    };
    if (node.children && node.children.length > 0) {
      translated.children = [];
      for (const child of node.children) { translated.children.push(await translateNode(child)); }
    }
    return translated;
  }

  const translatedTree = [];
  for (const root of allEN) { translatedTree.push(await translateNode(root)); }

  if (!DRY_RUN) {
    const result = await client.mutation(api.marketplace.categories.seedAll, {
      tenantId, categories: translatedTree, locale: TARGET, serverSecret: SERVER_SECRET,
    });
    console.log(`    Inserted: ${result.inserted}, Updated: ${result.skipped}`);
  }
  return countTree(allEN);
}

async function translateSkills() {
  const allEN = await client.query(api.skills.list, { locale: "en" });
  const existing = await client.query(api.skills.list, { locale: TARGET });
  const existingSlugs = new Set(existing.map((s) => s.slug));
  const toTranslate = allEN.filter((s) => !existingSlugs.has(s.slug));
  console.log(`  Skills: ${allEN.length} EN, ${existingSlugs.size} ${TARGET} exist, ${toTranslate.length} to translate`);
  if (toTranslate.length === 0) return 0;

  for (const skill of toTranslate) {
    if (!DRY_RUN) {
      await client.mutation(api.skills.insert, {
        name: await tr(skill.name), slug: skill.slug, categoryId: skill.categoryId, locale: TARGET,
      });
    }
  }
  return toTranslate.length;
}

async function translateTools() {
  const allEN = await client.query(api.tools.list, { locale: "en", limit: 100 });
  const existing = await client.query(api.tools.list, { locale: TARGET, limit: 100 });
  const existingSlugs = new Set(existing.map((t) => t.slug));
  const toTranslate = allEN.filter((t) => !existingSlugs.has(t.slug));
  console.log(`  Tools: ${allEN.length} EN, ${existingSlugs.size} ${TARGET} exist, ${toTranslate.length} to translate`);
  if (toTranslate.length === 0) return 0;

  for (const tool of toTranslate) {
    if (!DRY_RUN) {
      await client.mutation(api.tools.insert, {
        ownerId: tool.ownerId, name: await tr(tool.name), slug: tool.slug,
        description: tool.description ? await tr(tool.description) : undefined,
        category: tool.category, icon: tool.icon, color: tool.color, toolUrl: tool.toolUrl,
        isAvailable: tool.isAvailable, featured: tool.featured, sortOrder: tool.sortOrder,
        status: tool.status, locale: TARGET,
      });
    }
  }
  return toTranslate.length;
}

async function translateSeoPages() {
  const allEN = await client.query(api.seoPages.list, { locale: "en", limit: 200 });
  const existing = await client.query(api.seoPages.list, { locale: TARGET, limit: 200 });
  const existingSlugs = new Set(existing.map((p) => p.slug));
  const toTranslate = allEN.filter((p) => !existingSlugs.has(p.slug));
  console.log(`  SeoPages: ${allEN.length} EN, ${existingSlugs.size} ${TARGET} exist, ${toTranslate.length} to translate`);
  if (toTranslate.length === 0) return 0;

  for (const page of toTranslate) {
    if (!DRY_RUN) {
      await client.mutation(api.seoPages.insert, {
        tenantId: page.tenantId, title: await tr(page.title), slug: page.slug,
        metaTitle: page.metaTitle ? await tr(page.metaTitle) : undefined,
        metaDescription: page.metaDescription ? await tr(page.metaDescription) : undefined,
        h1: page.h1 ? await tr(page.h1) : undefined, content: await tr(page.content),
        excerpt: page.excerpt ? await tr(page.excerpt) : undefined,
        pillarId: page.pillarId, pillarName: page.pillarName, pillarSlug: page.pillarSlug,
        subpillarIndex: page.subpillarIndex, keywords: page.keywords, locale: TARGET, status: page.status,
      });
    }
  }
  return toTranslate.length;
}

// ─── Main ───

const TABLES = {
  platforms: translatePlatforms,
  posts: translatePosts,
  resources: translateResources,
  categories: translateCategories,
  skills: translateSkills,
  tools: translateTools,
  seoPages: translateSeoPages,
};

async function main() {
  console.log(`\n🌍 Translating DB content EN → ${TARGET} ${DRY_RUN ? "(DRY RUN)" : ""}`);
  console.log("─".repeat(50));

  const tables = TABLE_FILTER ? [TABLE_FILTER] : Object.keys(TABLES);
  let totalTranslated = 0;

  for (const table of tables) {
    if (!TABLES[table]) { console.log(`  Unknown table: ${table}`); continue; }
    console.log(`\n📦 ${table}:`);
    try {
      totalTranslated += await TABLES[table]();
    } catch (err) {
      console.error(`  ❌ ${table} failed: ${err.message}`);
    }
  }

  console.log("\n" + "─".repeat(50));
  console.log(`✅ Done! Total items translated: ${totalTranslated}`);
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
