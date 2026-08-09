#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

function readEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  return Object.fromEntries(
    fs
      .readFileSync(filePath, "utf8")
      .split(/\r?\n/)
      .filter((line) => line && !line.trimStart().startsWith("#"))
      .map((line) => {
        const separator = line.indexOf("=");
        return [
          line.slice(0, separator).trim(),
          line
            .slice(separator + 1)
            .trim()
            .replace(/^"|"$/g, ""),
        ];
      }),
  );
}

const localEnv = readEnv(path.join(process.cwd(), ".env.local"));
const convexUrl =
  process.env.NEXT_PUBLIC_CONVEX_URL || localEnv.NEXT_PUBLIC_CONVEX_URL;
if (!convexUrl) throw new Error("NEXT_PUBLIC_CONVEX_URL is required.");

const client = new ConvexHttpClient(convexUrl);
const publicJobs = await client.query(api.marketplace.jobs.list, {
  locale: "en",
  limit: 25,
});
if (publicJobs.some((job) => job.companyVerified !== true)) {
  throw new Error("The public Jobs query exposed an unverified company.");
}

let adminGatePassed = false;
try {
  await client.query(api.marketplace.companyVerifications.listForAdmin, {
    limit: 1,
  });
} catch {
  // Convex deliberately masks handler messages as "Server Error" in production.
  // The public query above already proves connectivity, so any rejection here
  // confirms that the anonymous caller could not read the private admin queue.
  adminGatePassed = true;
}
if (!adminGatePassed) {
  throw new Error(
    "The company verification admin queue was readable anonymously.",
  );
}

console.log(
  `Company trust contract verified: ${publicJobs.length} public jobs checked; admin queue denied anonymously.`,
);
