#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const cwd = process.cwd();
const envFile = path.join(cwd, ".env.local");
const manifestFile = path.join(cwd, "e2e", ".smoke-data.json");
const args = process.argv.slice(2);
const isProd = args.includes("--prod");
const urlArg = args.find((arg) => arg.startsWith("--url="));

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

if (!fs.existsSync(manifestFile)) {
  throw new Error(`Smoke manifest not found at ${manifestFile}`);
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

const manifest = JSON.parse(fs.readFileSync(manifestFile, "utf8"));
const payload = {
  serverSecret,
  gigId: manifest.ids?.gigId,
  projectId: manifest.ids?.projectId,
  quoteRequestId: manifest.ids?.quoteRequestId,
  jobId: manifest.ids?.jobId,
};

const client = new ConvexHttpClient(convexUrl);
await client.mutation(api.marketplace.smoke.cleanup, payload);

fs.unlinkSync(manifestFile);
console.log("Removed e2e/.smoke-data.json");
