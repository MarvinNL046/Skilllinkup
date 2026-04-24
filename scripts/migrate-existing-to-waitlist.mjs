#!/usr/bin/env node
/**
 * One-off migration: pull every email we already have (Clerk registered
 * users + Resend Audience contacts) and insert into the Convex waitlist
 * table via the internal bulkImport mutation. Dedupes on email. No
 * welcome emails — these people already know SkillLinkup, a sudden
 * "you're on the waitlist" mail would feel weird.
 *
 * After this runs, Convex `waitlist` is the single source of truth for
 * the launch blast. Going forward, new signups only hit Convex via
 * waitlist.join; no more multi-system sync.
 *
 * Usage:
 *   cd /home/marvin/Projecten/Skilllinkup
 *   node scripts/migrate-existing-to-waitlist.mjs
 *
 * Required env (from .env.local):
 *   CLERK_SECRET_KEY
 *   RESEND_API_KEY
 *   RESEND_AUDIENCE_ID
 *
 * Calls Convex prod via `npx convex run --prod` (authenticated via your
 * local CLI session; no deploy key needed). Safe to re-run: bulkImport
 * skips emails that are already in the table.
 */

import { config as loadEnv } from "dotenv";
import { writeFileSync, unlinkSync } from "fs";
import { execSync } from "child_process";
import { tmpdir } from "os";
import { join as joinPath } from "path";

loadEnv({ path: ".env.local" });

const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

if (!CLERK_SECRET_KEY || !RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
  console.error("Missing required env vars (CLERK_SECRET_KEY, RESEND_API_KEY, RESEND_AUDIENCE_ID).");
  process.exit(1);
}

const CLERK_SOURCE = "clerk-migration-2026-04-24";
const RESEND_SOURCE = "resend-newsletter-migration-2026-04-24";

async function fetchAllClerkUsers() {
  const out = [];
  let offset = 0;
  const limit = 100;
  while (true) {
    const res = await fetch(
      `https://api.clerk.com/v1/users?limit=${limit}&offset=${offset}`,
      { headers: { Authorization: `Bearer ${CLERK_SECRET_KEY}` } },
    );
    if (!res.ok) {
      throw new Error(`Clerk API ${res.status}: ${await res.text()}`);
    }
    const users = await res.json();
    if (!Array.isArray(users) || users.length === 0) break;
    for (const u of users) {
      const primaryId = u.primary_email_address_id;
      const primary = (u.email_addresses || []).find((e) => e.id === primaryId);
      const email = primary?.email_address;
      if (!email) continue;
      const name =
        [u.first_name, u.last_name].filter(Boolean).join(" ").trim() || undefined;
      out.push({ email, name, source: CLERK_SOURCE });
    }
    if (users.length < limit) break;
    offset += limit;
  }
  return out;
}

async function fetchAllResendContacts() {
  const res = await fetch(
    `https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`,
    { headers: { Authorization: `Bearer ${RESEND_API_KEY}` } },
  );
  if (!res.ok) {
    throw new Error(`Resend API ${res.status}: ${await res.text()}`);
  }
  const body = await res.json();
  const contacts = body?.data || [];
  return contacts
    .filter((c) => c.email && !c.unsubscribed)
    .map((c) => ({
      email: c.email,
      name:
        [c.first_name, c.last_name].filter(Boolean).join(" ").trim() ||
        undefined,
      source: RESEND_SOURCE,
    }));
}

async function main() {
  console.log("Fetching Clerk users…");
  const clerkEntries = await fetchAllClerkUsers();
  console.log(`  → ${clerkEntries.length} Clerk users`);

  console.log("Fetching Resend audience contacts…");
  const resendEntries = await fetchAllResendContacts();
  console.log(`  → ${resendEntries.length} Resend contacts`);

  // Merge + dedupe by email. Clerk wins (usually has a proper name).
  const byEmail = new Map();
  for (const e of clerkEntries) {
    byEmail.set(e.email.toLowerCase().trim(), e);
  }
  for (const e of resendEntries) {
    const key = e.email.toLowerCase().trim();
    if (!byEmail.has(key)) byEmail.set(key, e);
  }
  const entries = Array.from(byEmail.values());
  console.log(`  → ${entries.length} unique emails to import`);

  // Write args to a temp file and call `npx convex run --prod` with it.
  // Passing ~100 entries inline would hit argv size limits on some shells.
  const argsPath = joinPath(tmpdir(), `waitlist-migration-${Date.now()}.json`);
  writeFileSync(argsPath, JSON.stringify({ entries }));
  console.log(`Pushing to Convex prod via 'npx convex run waitlist:bulkImport'…`);

  try {
    const output = execSync(
      `npx convex run --prod waitlist:bulkImport "$(cat ${argsPath})"`,
      { encoding: "utf8", stdio: ["pipe", "pipe", "inherit"] },
    );
    console.log(output);
  } finally {
    try {
      unlinkSync(argsPath);
    } catch {
      // ignore
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
