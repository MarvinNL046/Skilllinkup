#!/usr/bin/env node
import fs from "fs";
import path from "path";

const cwd = process.cwd();
const envFile = path.join(cwd, ".env.local");
const apiUrl = "https://api.clerk.com/v1/jwt_templates";

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
const secretKey = env.CLERK_SECRET_KEY;

if (!secretKey) {
  throw new Error("CLERK_SECRET_KEY is required in .env.local");
}

async function clerkFetch(url, init = {}) {
  const response = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${await response.text()}`);
  }

  return response.json();
}

const templates = await clerkFetch(`${apiUrl}?limit=100`);
const existing = templates?.data?.find((template) => template.name === "convex");

if (existing) {
  console.log(`Clerk JWT template 'convex' already exists: ${existing.id}`);
  console.log(JSON.stringify(existing.claims, null, 2));
  process.exit(0);
}

const created = await clerkFetch(apiUrl, {
  method: "POST",
  body: JSON.stringify({
    name: "convex",
    claims: {
      aud: "convex",
      email: "{{user.primary_email_address}}",
      name: "{{user.full_name}}",
    },
  }),
});

console.log(`Created Clerk JWT template 'convex': ${created.id}`);
console.log(JSON.stringify(created.claims, null, 2));
