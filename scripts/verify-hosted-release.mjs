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
if (!allowHttp && baseUrl.protocol !== "https:")
  throw new Error("Hosted release verification requires HTTPS.");
const failures = [];

async function request(pathname, options = {}) {
  const response = await fetch(new URL(pathname, baseUrl), {
    redirect: "manual",
    signal: AbortSignal.timeout(15_000),
    ...options,
    headers: {
      ...(protectionBypass
        ? { "x-vercel-protection-bypass": protectionBypass }
        : {}),
      ...options.headers,
    },
  });
  return response;
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
    "Public routes, health, payment quarantine and internal secret boundaries are healthy.",
  );
}
