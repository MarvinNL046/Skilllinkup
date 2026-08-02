#!/usr/bin/env node

const args = process.argv.slice(2);
const rawBaseUrl =
  args.find((arg) => arg.startsWith("--base-url="))?.split("=")[1] ??
  process.env.HOSTED_BASE_URL;
const allowHttp = args.includes("--allow-http");
if (!rawBaseUrl)
  throw new Error(
    "Pass --base-url=https://preview.example.com or set HOSTED_BASE_URL.",
  );

const baseUrl = new URL(rawBaseUrl);
const protectionBypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET?.trim();
const shareToken = process.env.VERCEL_SHARE_TOKEN?.trim();
let shareCookie;
if (!allowHttp && baseUrl.protocol !== "https:")
  throw new Error("Hosted release verification requires HTTPS.");
const failures = [];

async function request(pathname, options = {}) {
  const requestUrl = new URL(pathname, baseUrl);
  const response = await fetch(requestUrl, {
    redirect: "manual",
    signal: AbortSignal.timeout(15_000),
    ...options,
    headers: {
      ...(protectionBypass
        ? { "x-vercel-protection-bypass": protectionBypass }
        : {}),
      ...(shareCookie ? { cookie: shareCookie } : {}),
      ...options.headers,
    },
  });
  return response;
}

if (shareToken) {
  const accessUrl = new URL(baseUrl);
  accessUrl.searchParams.set("_vercel_share", shareToken);
  const accessResponse = await fetch(accessUrl, { redirect: "manual" });
  shareCookie = accessResponse.headers.get("set-cookie")?.split(";", 1)[0];
  if (!shareCookie)
    throw new Error("Vercel share token did not produce an access cookie.");
}

for (const pathname of [
  "/",
  "/online",
  "/local",
  "/jobs",
  "/services",
  "/projects",
  "/pricing",
  "/privacy-policy",
  "/terms",
]) {
  try {
    const response = await request(pathname);
    const body = await response.text();
    if (response.status !== 200)
      failures.push(`${pathname} returned HTTP ${response.status}.`);
    if (!response.headers.get("content-type")?.includes("text/html"))
      failures.push(`${pathname} did not return HTML.`);
    if (!/skilllinkup/i.test(body))
      failures.push(`${pathname} did not contain the Skilllinkup identity.`);
    if (/Application error|Internal Server Error|__next_error__/.test(body))
      failures.push(`${pathname} rendered an application error.`);
  } catch (error) {
    failures.push(
      `${pathname} failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

try {
  const response = await request("/api/health");
  const health = await response.json();
  if (response.status !== 200 || health.status !== "ok")
    failures.push(`/api/health is not healthy (HTTP ${response.status}).`);
  if (health.checks?.paymentMode !== "private_beta_disabled")
    failures.push("Health response does not confirm payment quarantine.");
  if (health.checks?.analyticsMode !== "disabled")
    failures.push("Health response does not confirm analytics is disabled.");
  if (health.checks?.environmentContract !== true)
    failures.push(
      "Health response reports an invalid hosted environment contract.",
    );
  if (!health.version || health.version === "unknown")
    failures.push("Health response does not expose an application version.");
  const hostedEnvironment = ["preview", "production"].includes(health.environment);
  if (hostedEnvironment) {
    if (health.checks?.releaseTraceable !== true)
      failures.push("Health response cannot identify the deployed release.");
    if (!/^[a-f0-9]{40}$/i.test(health.release?.commit ?? ""))
      failures.push("Health response does not expose a full Git commit SHA.");
    if (!/^[a-z0-9-]+\.vercel\.app$/i.test(health.release?.deployment ?? ""))
      failures.push("Health response does not expose a Vercel deployment URL.");
    if (
      health.release?.commit
      && response.headers.get("x-skilllinkup-release") !== health.release.commit.slice(0, 12)
    ) {
      failures.push("Health response header and release commit do not match.");
    }
  }
} catch (error) {
  failures.push(
    `/api/health failed: ${error instanceof Error ? error.message : String(error)}`,
  );
}

const paymentRequests = [
  ["/api/stripe/checkout", "POST"],
  ["/api/stripe/credits", "POST"],
  ["/api/stripe/connect", "POST"],
  ["/api/stripe/connect/callback", "GET"],
  ["/api/stripe/webhook", "POST"],
];
for (const [pathname, method] of paymentRequests) {
  try {
    const response = await request(pathname, {
      method,
      headers: { "content-type": "application/json" },
      body: method === "POST" ? "{}" : undefined,
    });
    const payload = await response.json().catch(() => ({}));
    if (response.status !== 503 || payload.code !== "PRIVATE_BETA_FREE") {
      failures.push(
        `${pathname} is not quarantined with 503 PRIVATE_BETA_FREE.`,
      );
    }
  } catch (error) {
    failures.push(
      `${pathname} quarantine check failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

const protectedRequests = [
  ["/api/cron/generate-blog", "GET"],
  ["/api/pipeline/generate", "POST"],
  ["/api/pipeline/status", "GET"],
  ["/api/email/send", "POST"],
];
for (const [pathname, method] of protectedRequests) {
  try {
    const response = await request(pathname, {
      method,
      headers: {
        authorization: "Bearer hosted-smoke-forged-secret",
        "content-type": "application/json",
      },
      body: method === "POST" ? "{}" : undefined,
    });
    if (![401, 503].includes(response.status))
      failures.push(
        `${pathname} accepted a forged credential (HTTP ${response.status}).`,
      );
  } catch (error) {
    failures.push(
      `${pathname} secret-boundary check failed: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Hosted release verification passed for ${baseUrl.origin}.`);
  console.log(
    "Public routes, release-traceable health, payment quarantine and internal secret boundaries are healthy.",
  );
}
