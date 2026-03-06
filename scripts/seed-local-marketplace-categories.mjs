#!/usr/bin/env node
/**
 * Seed local marketplace categories (home improvement, construction, etc.)
 *
 * Usage:
 *   node scripts/seed-local-marketplace-categories.mjs              # dev (NEXT_PUBLIC_CONVEX_URL)
 *   node scripts/seed-local-marketplace-categories.mjs --prod       # production (SMOKE_CONVEX_URL_PROD)
 *   node scripts/seed-local-marketplace-categories.mjs --dry-run    # preview only, no write
 */
import fs from "fs";
import path from "path";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import { localMarketplaceCategories } from "./data/local-marketplace-categories.mjs";

const cwd = process.cwd();
const envFile = path.join(cwd, ".env.local");
const args = process.argv.slice(2);
const isProd = args.includes("--prod");
const isDryRun = args.includes("--dry-run");
const urlArg = args.find((a) => a.startsWith("--url="));
const locale = "en";

function readEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
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

const env = readEnv(envFile);
const prodUrl = process.env.SMOKE_CONVEX_URL_PROD || env.SMOKE_CONVEX_URL_PROD;
const defaultUrl = process.env.SMOKE_CONVEX_URL || env.SMOKE_CONVEX_URL || env.NEXT_PUBLIC_CONVEX_URL;
const explicitUrl = urlArg?.slice("--url=".length);
const convexUrl = explicitUrl || (isProd ? prodUrl : defaultUrl);

if (!convexUrl) {
  throw new Error(
    isProd
      ? "No production Convex URL. Set SMOKE_CONVEX_URL_PROD in .env.local"
      : "No Convex URL. Set NEXT_PUBLIC_CONVEX_URL in .env.local"
  );
}

const serverSecret = process.env.INTERNAL_EMAIL_SECRET || env.INTERNAL_EMAIL_SECRET;

if (isDryRun) {
  const totalChildren = localMarketplaceCategories.reduce(
    (sum, cat) => sum + (cat.children?.length ?? 0), 0
  );
  console.log(`Dry run — ${localMarketplaceCategories.length} parent categories, ${totalChildren} child categories:`);
  for (const cat of localMarketplaceCategories) {
    console.log(`  [${cat.icon}] ${cat.name} (${cat.children?.length ?? 0} children)`);
    for (const child of cat.children ?? []) {
      console.log(`       • ${child.name} (${child.slug})`);
    }
  }
  process.exit(0);
}

if (!serverSecret) {
  throw new Error("INTERNAL_EMAIL_SECRET is required. Add it to .env.local");
}

const client = new ConvexHttpClient(convexUrl);
const tenantId = await client.query(api.marketplace.categories.getFirstTenant, {});

if (!tenantId) {
  throw new Error("No tenant found. Seed a tenant first.");
}

const envLabel = explicitUrl ? explicitUrl : (isProd ? "PRODUCTION" : "dev");
console.log(`Seeding ${localMarketplaceCategories.length} parent categories to ${envLabel}...`);

const result = await client.mutation(api.marketplace.categories.seedAll, {
  tenantId,
  locale,
  serverSecret,
  categories: localMarketplaceCategories,
});

const totalChildren = localMarketplaceCategories.reduce(
  (sum, cat) => sum + (cat.children?.length ?? 0), 0
);

console.log(JSON.stringify({
  env: isProd ? "production" : "dev",
  locale,
  parentCategories: localMarketplaceCategories.length,
  childCategories: totalChildren,
  totalCategories: localMarketplaceCategories.length + totalChildren,
  result,
}, null, 2));
