#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import { getFiverrMarketplaceCategories } from "./data/fiverr-marketplace-categories.mjs";

const cwd = process.cwd();
const envFile = path.join(cwd, ".env.local");
const args = process.argv.slice(2);
const isProd = args.includes("--prod");
const isDryRun = args.includes("--dry-run");
const localeArg = args.find((arg) => arg.startsWith("--locale="));
const urlArg = args.find((arg) => arg.startsWith("--url="));
const locale = localeArg ? localeArg.slice("--locale=".length) : "en";
const categories = getFiverrMarketplaceCategories(locale);

function readEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

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
const explicitUrl = urlArg?.slice("--url=".length);
const prodUrl = process.env.SMOKE_CONVEX_URL_PROD || env.SMOKE_CONVEX_URL_PROD;
const defaultUrl = process.env.SMOKE_CONVEX_URL || env.SMOKE_CONVEX_URL || env.NEXT_PUBLIC_CONVEX_URL;
const convexUrl = explicitUrl || (isProd ? prodUrl : defaultUrl);

if (!convexUrl) {
  throw new Error(
    isProd
      ? "No production Convex URL found. Set SMOKE_CONVEX_URL_PROD or pass --url=..."
      : "No Convex URL found. Set NEXT_PUBLIC_CONVEX_URL or pass --url=..."
  );
}

const serverSecret = process.env.INTERNAL_EMAIL_SECRET || env.INTERNAL_EMAIL_SECRET;
if (!isDryRun && !serverSecret) {
  throw new Error("INTERNAL_EMAIL_SECRET is required unless using --dry-run");
}

const payload = {
  locale,
  categories,
};

if (isDryRun) {
  console.log(JSON.stringify(payload, null, 2));
  console.log(
    `Prepared ${payload.categories.length} parent categories and `
    + `${payload.categories.reduce((sum, category) => sum + (category.children?.length || 0), 0)} child categories.`
  );
  process.exit(0);
}

const client = new ConvexHttpClient(convexUrl);
const tenantId = await client.query(api.marketplace.categories.getFirstTenant, {});

if (!tenantId) {
  throw new Error("No tenant found. Seed a tenant before seeding marketplace categories.");
}

const result = await client.mutation(api.marketplace.categories.seedAll, {
  tenantId,
  locale,
  serverSecret,
  categories,
});

console.log(JSON.stringify({
  tenantId,
  locale,
  parentCount: categories.length,
  childCount: categories.reduce(
    (sum, category) => sum + (category.children?.length || 0),
    0
  ),
  result,
}, null, 2));
