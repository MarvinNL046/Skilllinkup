import fs from "fs";
import path from "path";
import { expect, test } from "@playwright/test";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";

function readLocalEnvValue(key: string) {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return undefined;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    if (!line || line.trimStart().startsWith("#")) continue;
    const separator = line.indexOf("=");
    if (separator === -1 || line.slice(0, separator).trim() !== key) continue;
    return line.slice(separator + 1).trim().replace(/^"|"$/g, "");
  }
  return undefined;
}

const protectedEndpoints = [
  { name: "blog cron", method: "get" as const, path: "/api/cron/generate-blog" },
  { name: "pipeline status", method: "get" as const, path: "/api/pipeline/status" },
  { name: "pipeline generation", method: "post" as const, path: "/api/pipeline/generate", data: { dryRun: true } },
  {
    name: "transactional email",
    method: "post" as const,
    path: "/api/email/send",
    data: { template: "waitlistWelcome", to: "nobody@example.invalid", subject: "Must not send", props: {} },
  },
];

for (const endpoint of protectedEndpoints) {
  test(`${endpoint.name} endpoint fails closed without valid credentials`, async ({ request }) => {
    for (const authorization of [undefined, "Bearer undefined", "Bearer definitely-invalid"]) {
      const response = await request.fetch(endpoint.path, {
        method: endpoint.method.toUpperCase(),
        headers: authorization ? { authorization } : undefined,
        data: endpoint.data,
      });
      expect([401, 503], `${endpoint.name} returned ${response.status()}`).toContain(response.status());
    }
  });
}

test("secret-protected Convex maintenance functions reject forged secrets", async () => {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || readLocalEnvValue("NEXT_PUBLIC_CONVEX_URL");
  if (!convexUrl) throw new Error("NEXT_PUBLIC_CONVEX_URL is required for Convex security tests.");
  const client = new ConvexHttpClient(convexUrl);
  const forgedSecret = "forged-secret-that-must-never-authorize";

  await expect(client.mutation(api.marketplace.smoke.seed, {
    serverSecret: forgedSecret,
    tag: "forged-secret-attempt",
    clientEmail: "nobody@example.invalid",
    freelancerEmail: "nobody@example.invalid",
  })).rejects.toThrow(/Unauthorized/);
  await expect(client.query(api.marketplace.smoke.verifyCleanup, {
    serverSecret: forgedSecret,
    fixtureIds: [],
  })).rejects.toThrow(/Unauthorized/);
  await expect(client.query(api.users.getByEmail, {
    email: "nobody@example.invalid",
    serverSecret: forgedSecret,
  })).rejects.toThrow(/Unauthorized/);
});

test("every payment creation and webhook endpoint remains quarantined", async ({ request }) => {
  const endpoints = [
    { method: "POST", path: "/api/stripe/checkout" },
    { method: "POST", path: "/api/stripe/credits" },
    { method: "POST", path: "/api/stripe/connect" },
    { method: "GET", path: "/api/stripe/connect/callback" },
    { method: "POST", path: "/api/stripe/webhook" },
  ];

  for (const endpoint of endpoints) {
    const response = await request.fetch(endpoint.path, {
      method: endpoint.method,
      headers: endpoint.path.endsWith("webhook")
        ? { "stripe-signature": "forged-signature" }
        : undefined,
    });
    expect(response.status(), endpoint.path).toBe(503);
    await expect(response.json()).resolves.toMatchObject({ code: "PRIVATE_BETA_FREE" });
  }
});
