#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { createClerkClient } from "@clerk/backend";
import { chromium } from "@playwright/test";
import {
  clerk,
  clerkSetup,
  setupClerkTestingToken,
} from "@clerk/testing/playwright";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const projectDir = process.cwd();
const envPath = path.join(projectDir, ".env.local");
const baseUrl = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3010";

function readEnv(filePath) {
  const result = {};
  const raw = fs.readFileSync(filePath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    if (!line || line.trim().startsWith("#") || !line.includes("=")) continue;
    const index = line.indexOf("=");
    result[line.slice(0, index).trim()] = line
      .slice(index + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
  }
  return result;
}

const env = readEnv(envPath);
for (const key of [
  "CLERK_SECRET_KEY",
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_CONVEX_URL",
]) {
  if (!env[key]) throw new Error(`${key} is required in .env.local.`);
  process.env[key] = env[key];
}
if (!env.CLERK_SECRET_KEY.startsWith("sk_test_")) {
  throw new Error("Refusing to provision accounts outside Clerk development.");
}

const accountDefinitions = [
  {
    email: "skilllinkup.qa+clerk_test@skilllinkup.com",
    firstName: "Skilllinkup",
    lastName: "QA",
    externalId: "skilllinkup-private-beta-qa",
    accountRoles: ["client", "freelancer", "local_professional", "candidate", "company"],
    activeRole: "freelancer",
    preferredWorld: "online",
  },
  {
    email: "skilllinkup.qa+admin_clerk_test@skilllinkup.com",
    firstName: "Skilllinkup",
    lastName: "Admin QA",
    externalId: "skilllinkup-private-beta-admin-qa",
    accountRoles: ["client"],
    activeRole: "client",
    preferredWorld: "online",
  },
  {
    email: "skilllinkup.qa+outsider_clerk_test@skilllinkup.com",
    firstName: "Skilllinkup",
    lastName: "Outsider QA",
    externalId: "skilllinkup-private-beta-outsider-qa",
    accountRoles: ["client"],
    activeRole: "client",
    preferredWorld: "online",
  },
  {
    email: "skilllinkup.qa+local-client_clerk_test@skilllinkup.com",
    firstName: "Skilllinkup",
    lastName: "Local Client QA",
    externalId: "skilllinkup-private-beta-local-client-qa",
    accountRoles: ["client"],
    activeRole: "client",
    preferredWorld: "local",
  },
  {
    email: "skilllinkup.qa+company_clerk_test@skilllinkup.com",
    firstName: "Skilllinkup",
    lastName: "Company QA",
    externalId: "skilllinkup-private-beta-company-qa",
    accountRoles: ["company"],
    activeRole: "company",
    preferredWorld: "jobs",
  },
];

const clerkClient = createClerkClient({
  secretKey: env.CLERK_SECRET_KEY,
  publishableKey: env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
});
await clerkSetup();

const browser = await chromium.launch({
  headless: true,
  channel: process.env.PLAYWRIGHT_CHANNEL || "chrome",
});

for (const definition of accountDefinitions) {
  const existing = await clerkClient.users.getUserList({
    emailAddress: [definition.email],
    limit: 1,
  });
  const clerkUser =
    existing.data[0]
    ?? await clerkClient.users.createUser({
      emailAddress: [definition.email],
      firstName: definition.firstName,
      lastName: definition.lastName,
      externalId: definition.externalId,
      skipPasswordRequirement: true,
      skipLegalChecks: true,
      publicMetadata: { purpose: "private-beta-e2e" },
    });

  const context = await browser.newContext();
  const page = await context.newPage();
  await setupClerkTestingToken({ page });
  await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await clerk.signIn({ page, emailAddress: definition.email });
  await page.reload({ waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.waitForFunction(() => window.Clerk?.session, null, { timeout: 20_000 });
  const token = await page.evaluate(() =>
    window.Clerk.session.getToken({ template: "convex" })
  );
  if (!token) throw new Error(`No Convex JWT returned for ${definition.email}.`);

  const convex = new ConvexHttpClient(env.NEXT_PUBLIC_CONVEX_URL);
  convex.setAuth(token);
  await convex.mutation(api.users.syncUser, {
    email: definition.email,
    name: `${definition.firstName} ${definition.lastName}`,
    image: clerkUser.imageUrl || "",
    clerkId: clerkUser.id,
  });
  await convex.mutation(api.users.setAccountContext, {
    accountRoles: definition.accountRoles,
    activeRole: definition.activeRole,
    preferredWorld: definition.preferredWorld,
    onboardingVersion: 1,
  });
  await context.close();
}

await browser.close();
console.log("Provisioned five isolated Clerk development QA identities and synchronized them to Convex.");
