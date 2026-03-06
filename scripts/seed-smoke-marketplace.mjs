#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const cwd = process.cwd();
const envFile = path.join(cwd, ".env.local");
const outFile = path.join(cwd, "e2e", ".smoke-data.json");
const args = process.argv.slice(2);
const isProd = args.includes("--prod");
const tagArg = args.find((arg) => arg.startsWith("--tag="));
const urlArg = args.find((arg) => arg.startsWith("--url="));
const tag = tagArg ? tagArg.slice("--tag=".length) : String(Math.floor(Date.now() / 1000));

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

const env = readEnv(envFile);
const serverSecret = env.INTERNAL_EMAIL_SECRET;
if (!serverSecret) {
  throw new Error("INTERNAL_EMAIL_SECRET is required in .env.local");
}
const convexUrl = urlArg?.slice("--url=".length)
  || (isProd ? process.env.SMOKE_CONVEX_URL_PROD : process.env.SMOKE_CONVEX_URL)
  || env.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) {
  throw new Error("No Convex URL found. Set NEXT_PUBLIC_CONVEX_URL or pass --url=...");
}

const payload = {
  serverSecret,
  tag,
  clientEmail: process.env.SMOKE_CLIENT_EMAIL || "testonboarding@skilllinkup.com",
  freelancerEmail: process.env.SMOKE_FREELANCER_EMAIL || "info@staycoolairco.nl",
  categorySlug: process.env.SMOKE_CATEGORY_SLUG || "finance-accounting",
  locale: process.env.SMOKE_LOCALE || "en",
};

const client = new ConvexHttpClient(convexUrl);
const manifest = await client.mutation(api.marketplace.smoke.seed, payload);
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Wrote smoke manifest to ${path.relative(cwd, outFile)}`);
console.log(JSON.stringify(manifest.routes, null, 2));
