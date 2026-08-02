#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const environment =
  args.find((arg) => arg.startsWith("--environment="))?.split("=")[1] ??
  process.env.VERCEL_ENV ??
  process.env.NODE_ENV ??
  "development";
const envFile = args
  .find((arg) => arg.startsWith("--env-file="))
  ?.split("=")[1];
const supported = new Set(["development", "preview", "production"]);

if (!supported.has(environment)) {
  throw new Error(
    `Unsupported environment '${environment}'. Use development, preview or production.`,
  );
}

function readEnvFile(filePath) {
  const values = {};
  if (!filePath || !fs.existsSync(filePath)) return values;
  for (const rawLine of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#") || !line.includes("=")) continue;
    const separator = line.indexOf("=");
    values[line.slice(0, separator).trim()] = line
      .slice(separator + 1)
      .trim()
      .replace(/^['"]|['"]$/g, "");
  }
  return values;
}

const fileValues = readEnvFile(envFile ? path.resolve(envFile) : undefined);
const value = (key) =>
  process.env[key]?.trim() || fileValues[key]?.trim() || "";
const failures = [];
const warnings = [];

function requireValue(key, predicate, message) {
  const configured = value(key);
  if (!configured) failures.push(`${key} is missing.`);
  else if (predicate && !predicate(configured))
    failures.push(`${key} ${message}`);
}

function validUrl(raw, { httpsOnly = false, hostnameSuffix } = {}) {
  try {
    const parsed = new URL(raw);
    if (httpsOnly && parsed.protocol !== "https:") return false;
    if (hostnameSuffix && !parsed.hostname.endsWith(hostnameSuffix))
      return false;
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

const hosted = environment !== "development";
requireValue(
  "NEXT_PUBLIC_SITE_URL",
  (raw) => validUrl(raw, { httpsOnly: hosted }),
  hosted ? "must be an HTTPS URL." : "must be a URL.",
);
requireValue(
  "NEXT_PUBLIC_CONVEX_URL",
  (raw) => validUrl(raw, { httpsOnly: true, hostnameSuffix: ".convex.cloud" }),
  "must be an HTTPS convex.cloud URL.",
);
requireValue(
  "NEXT_PUBLIC_CONVEX_SITE_URL",
  (raw) => validUrl(raw, { httpsOnly: true, hostnameSuffix: ".convex.site" }),
  "must be an HTTPS convex.site URL.",
);
requireValue(
  "CONVEX_DEPLOYMENT",
  (raw) => /^(dev|prod):[a-z0-9-]+$/.test(raw),
  "must use the dev:<name> or prod:<name> format.",
);
requireValue(
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  (raw) => /^pk_(test|live)_/.test(raw),
  "must be a Clerk publishable key.",
);
requireValue(
  "CLERK_SECRET_KEY",
  (raw) => /^sk_(test|live)_/.test(raw),
  "must be a Clerk secret key.",
);
requireValue(
  "CLERK_JWT_ISSUER_DOMAIN",
  (raw) => validUrl(raw, { httpsOnly: true }),
  "must be an HTTPS URL.",
);

for (const key of ["INTERNAL_EMAIL_SECRET", "CRON_SECRET", "PIPELINE_SECRET"]) {
  requireValue(
    key,
    (raw) => raw.length >= 32 && raw !== "undefined" && raw !== "dev-secret",
    "must be a non-default secret of at least 32 characters.",
  );
}

const publishable = value("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
const clerkSecret = value("CLERK_SECRET_KEY");
if (publishable && clerkSecret) {
  const publicMode = publishable.startsWith("pk_live_") ? "live" : "test";
  const secretMode = clerkSecret.startsWith("sk_live_") ? "live" : "test";
  if (publicMode !== secretMode)
    failures.push(
      "Clerk publishable and secret keys belong to different modes.",
    );
  if (environment === "production" && publicMode !== "live")
    failures.push("Production must use Clerk live keys.");
  if (environment === "preview" && publicMode !== "test")
    failures.push("Preview must use an isolated Clerk development instance.");
}

const convexDeployment = value("CONVEX_DEPLOYMENT");
if (
  environment === "production" &&
  convexDeployment &&
  !convexDeployment.startsWith("prod:")
) {
  failures.push("Production must use a Convex production deployment.");
}
if (
  environment === "preview" &&
  convexDeployment &&
  !convexDeployment.startsWith("dev:")
) {
  failures.push("Preview must use an isolated Convex development deployment.");
}

const secretValues = ["INTERNAL_EMAIL_SECRET", "CRON_SECRET", "PIPELINE_SECRET"]
  .map(value)
  .filter(Boolean);
if (new Set(secretValues).size !== secretValues.length)
  failures.push("Internal, cron and pipeline secrets must be unique.");

if (value("STRIPE_SECRET_KEY") || value("STRIPE_WEBHOOK_SECRET")) {
  warnings.push(
    "Stripe credentials are configured; server-side PRIVATE_BETA_FREE quarantine must remain verified.",
  );
}
if (
  environment === "production" &&
  /qa\+|clerk_test|smoke/i.test(
    Object.entries(process.env)
      .filter(([key]) => /EMAIL/.test(key))
      .map(([, configured]) => configured)
      .join(" "),
  )
) {
  failures.push(
    "Production environment contains a QA or smoke email identity.",
  );
}

console.log(`Environment contract: ${environment}`);
console.log(
  `Checked ${hosted ? "hosted" : "local"} URL, identity, backend and secret boundaries.`,
);
for (const warning of warnings) console.warn(`Warning: ${warning}`);
if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exitCode = 1;
} else {
  console.log("Environment contract passed.");
}
