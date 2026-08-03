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
const serverSecret = process.env.INTERNAL_EMAIL_SECRET || env.INTERNAL_EMAIL_SECRET;
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
  bidId: manifest.ids?.bidId,
  quoteRequestId: manifest.ids?.quoteRequestId,
  jobId: manifest.ids?.jobId,
  jobApplicationId: manifest.ids?.jobApplicationId,
  withdrawalJobId: manifest.ids?.withdrawalJobId,
  withdrawalJobApplicationId: manifest.ids?.withdrawalJobApplicationId,
  companyUserId: manifest.ids?.companyUserId,
  localClientId: manifest.ids?.localClientId,
  workspaceProjectId: manifest.ids?.workspaceProjectId,
  acceptedBidId: manifest.ids?.acceptedBidId,
  orderId: manifest.ids?.orderId,
  conversationId: manifest.ids?.conversationId,
  messageId: manifest.ids?.messageId,
  deliverableId: manifest.ids?.deliverableId,
  localQuoteRequestId: manifest.ids?.localQuoteRequestId,
  localLeadClaimId: manifest.ids?.localLeadClaimId,
  localQuoteId: manifest.ids?.localQuoteId,
  localOrderId: manifest.ids?.localOrderId,
  localConversationId: manifest.ids?.localConversationId,
  localAppointmentId: manifest.ids?.localAppointmentId,
  cancellationQuoteRequestId: manifest.ids?.cancellationQuoteRequestId,
  cancellationQuoteId: manifest.ids?.cancellationQuoteId,
  cancellationOrderId: manifest.ids?.cancellationOrderId,
  cancellationAppointmentId: manifest.ids?.cancellationAppointmentId,
  adminUserId: manifest.ids?.adminUserId,
  adminPreviousRole: manifest.ids?.adminPreviousRole,
  qaUserId: manifest.ids?.qaUserId,
};

const client = new ConvexHttpClient(convexUrl);
await client.mutation(api.marketplace.smoke.cleanup, payload);

const fixtureIds = Object.entries(manifest.ids ?? {})
  .filter(([key, value]) =>
    typeof value === "string"
    && !["adminUserId", "adminPreviousRole", "qaUserId", "localClientId", "companyUserId"].includes(key)
  )
  .map(([, value]) => value);
const verification = await client.query(api.marketplace.smoke.verifyCleanup, {
  serverSecret,
  fixtureIds,
  orderId: manifest.ids?.orderId,
  localOrderId: manifest.ids?.localOrderId,
  conversationId: manifest.ids?.conversationId,
  localAppointmentId: manifest.ids?.localAppointmentId,
  cancellationAppointmentId: manifest.ids?.cancellationAppointmentId,
  localClientId: manifest.ids?.localClientId,
  companyUserId: manifest.ids?.companyUserId,
  jobId: manifest.ids?.jobId,
  jobApplicationId: manifest.ids?.jobApplicationId,
  withdrawalJobId: manifest.ids?.withdrawalJobId,
  withdrawalJobApplicationId: manifest.ids?.withdrawalJobApplicationId,
  adminUserId: manifest.ids?.adminUserId,
  qaUserId: manifest.ids?.qaUserId,
});
if (!verification.ok) {
  throw new Error(`Smoke cleanup verification failed: ${JSON.stringify(verification)}`);
}
console.log(`Cleanup verified: ${JSON.stringify(verification)}`);

fs.unlinkSync(manifestFile);
console.log("Removed e2e/.smoke-data.json");
