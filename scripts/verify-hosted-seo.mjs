#!/usr/bin/env node

const args = process.argv.slice(2);
const rawBaseUrl =
  args.find((arg) => arg.startsWith("--base-url="))?.split("=")[1] ??
  process.env.HOSTED_BASE_URL;
const allowHttp = args.includes("--allow-http");
const requireJob = args.includes("--require-job");
const rawCanonicalOrigin =
  args.find((arg) => arg.startsWith("--canonical-origin="))?.split("=")[1] ??
  rawBaseUrl;
const maxJobs = Number(
  args.find((arg) => arg.startsWith("--max-jobs="))?.split("=")[1] ?? 25,
);

if (!rawBaseUrl)
  throw new Error(
    "Pass --base-url=https://preview.example.com or set HOSTED_BASE_URL.",
  );
if (!Number.isInteger(maxJobs) || maxJobs < 0 || maxJobs > 100)
  throw new Error("--max-jobs must be an integer between 0 and 100.");

const baseUrl = new URL(rawBaseUrl);
const canonicalOrigin = new URL(rawCanonicalOrigin).origin;
const environment =
  args.find((arg) => arg.startsWith("--environment="))?.split("=")[1] ??
  (baseUrl.hostname === "skilllinkup.com" ? "production" : "preview");
if (!["preview", "production"].includes(environment))
  throw new Error("--environment must be preview or production.");
if (!allowHttp && baseUrl.protocol !== "https:")
  throw new Error("Hosted SEO verification requires HTTPS.");

const protectionBypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET?.trim();
const shareToken = process.env.VERCEL_SHARE_TOKEN?.trim();
const failures = [];
const notices = [];
let shareCookie;

async function request(pathname) {
  return fetch(new URL(pathname, baseUrl), {
    redirect: "manual",
    signal: AbortSignal.timeout(15_000),
    headers: {
      ...(protectionBypass
        ? { "x-vercel-protection-bypass": protectionBypass }
        : {}),
      ...(shareCookie ? { cookie: shareCookie } : {}),
    },
  });
}

if (shareToken) {
  const accessUrl = new URL(baseUrl);
  accessUrl.searchParams.set("_vercel_share", shareToken);
  const response = await fetch(accessUrl, { redirect: "manual" });
  shareCookie = response.headers.get("set-cookie")?.split(";", 1)[0];
  if (!shareCookie)
    throw new Error("Vercel share token did not produce an access cookie.");
}

function canonicalFrom(html) {
  return html.match(
    /<link\b(?=[^>]*\brel=["'][^"']*\bcanonical\b[^"']*["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/i,
  )?.[1];
}

function robotsFrom(html) {
  return (
    html.match(
      /<meta\b(?=[^>]*\bname=["']robots["'])(?=[^>]*\bcontent=["']([^"']+)["'])[^>]*>/i,
    )?.[1] ?? ""
  ).toLowerCase();
}

function jobPostingsFrom(html) {
  const values = [];
  const pattern =
    /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(pattern)) {
    try {
      const parsed = JSON.parse(match[1]);
      const candidates = Array.isArray(parsed)
        ? parsed
        : Array.isArray(parsed?.["@graph"])
          ? parsed["@graph"]
          : [parsed];
      values.push(...candidates.filter((item) => item?.["@type"] === "JobPosting"));
    } catch {
      failures.push("A JSON-LD script contains invalid JSON.");
    }
  }
  return values;
}

function assertJobPosting(posting, pageUrl) {
  for (const property of [
    "title",
    "description",
    "datePosted",
    "employmentType",
    "hiringOrganization",
  ]) {
    if (!posting[property])
      failures.push(`${pageUrl}: JobPosting.${property} is missing.`);
  }
  if (!posting.hiringOrganization?.name)
    failures.push(`${pageUrl}: hiringOrganization.name is missing.`);
  if (posting.url !== pageUrl)
    failures.push(`${pageUrl}: JobPosting.url does not match the canonical URL.`);
  if (!Number.isFinite(new Date(posting.datePosted).getTime()))
    failures.push(`${pageUrl}: datePosted is invalid.`);
  if (
    posting.validThrough &&
    (!Number.isFinite(new Date(posting.validThrough).getTime()) ||
      new Date(posting.validThrough).getTime() <= Date.now())
  ) {
    failures.push(`${pageUrl}: validThrough is invalid or expired.`);
  }
  if (posting.jobLocationType === "TELECOMMUTE") {
    if (
      posting.applicantLocationRequirements?.["@type"] !== "Country" ||
      !posting.applicantLocationRequirements?.name
    ) {
      failures.push(
        `${pageUrl}: remote JobPosting lacks applicantLocationRequirements country.`,
      );
    }
  } else if (!posting.jobLocation?.address?.addressCountry) {
    failures.push(`${pageUrl}: physical JobPosting lacks addressCountry.`);
  }
}

const robotsResponse = await request("/robots.txt");
const robots = await robotsResponse.text();
if (robotsResponse.status !== 200)
  failures.push(`/robots.txt returned HTTP ${robotsResponse.status}.`);
if (environment === "preview") {
  if (!/^disallow:\s*\/$/im.test(robots))
    failures.push("Preview robots.txt does not disallow the entire site.");
  if (/^sitemap:/im.test(robots))
    failures.push("Preview robots.txt must not advertise a sitemap.");
} else {
  if (
    !new RegExp(
      `Sitemap:\\s*${canonicalOrigin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/sitemap\\.xml`,
      "i",
    ).test(robots)
  )
    failures.push("robots.txt does not advertise the canonical sitemap.");
  for (const path of ["/api/", "/dashboard/", "/admin/"]) {
    if (!robots.toLowerCase().includes(`disallow: ${path}`))
      failures.push(`robots.txt does not disallow ${path}.`);
  }
}

let urls = [];
if (environment === "production") {
  const sitemapResponse = await request("/sitemap.xml");
  const sitemap = await sitemapResponse.text();
  if (sitemapResponse.status !== 200)
    failures.push(`/sitemap.xml returned HTTP ${sitemapResponse.status}.`);
  urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1],
  );
  if (!urls.length) failures.push("The sitemap contains no URLs.");
  if (new Set(urls).size !== urls.length)
    failures.push("The sitemap contains duplicate URLs.");
  for (const url of urls) {
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      failures.push(`The sitemap contains an invalid URL: ${url}`);
      continue;
    }
    if (parsed.origin !== canonicalOrigin)
      failures.push(`The sitemap contains a foreign origin: ${url}`);
    if (
      /\/(dashboard|admin|message|orders|onboarding|login|register)(\/|$)/.test(
        parsed.pathname,
      )
    )
      failures.push(`The sitemap contains a protected route: ${url}`);
  }
}

const publicPaths = [
  "/",
  "/online",
  "/local",
  "/jobs",
  "/jobs/browse",
  "/jobs/companies",
  "/services",
  "/projects",
];
for (const pathname of publicPaths) {
  const expected =
    pathname === "/" ? canonicalOrigin : `${canonicalOrigin}${pathname}`;
  if (environment === "production" && !urls.includes(expected))
    failures.push(`${pathname} is missing from the sitemap.`);
  const response = await request(pathname);
  const html = await response.text();
  if (response.status !== 200)
    failures.push(`${pathname} returned HTTP ${response.status}.`);
  if (canonicalFrom(html) !== expected)
    failures.push(`${pathname} has an incorrect or missing canonical URL.`);
  if (environment === "production" && robotsFrom(html).includes("noindex"))
    failures.push(`${pathname} is noindex in production.`);
  if (jobPostingsFrom(html).length)
    failures.push(`${pathname} incorrectly contains JobPosting structured data.`);
}

const jobUrls = urls.filter((url) =>
  new URL(url).pathname.startsWith("/jobs/job/"),
);
if (environment === "production" && !jobUrls.length) {
  const notice =
    "No eligible live job URLs are present; rich-result output remains an inventory-dependent launch gate.";
  if (requireJob) failures.push(notice);
  else notices.push(notice);
}

for (const pageUrl of jobUrls.slice(0, maxJobs)) {
  const response = await request(new URL(pageUrl).pathname);
  const html = await response.text();
  if (response.status !== 200) {
    failures.push(`${pageUrl} returned HTTP ${response.status}.`);
    continue;
  }
  if (canonicalFrom(html) !== pageUrl)
    failures.push(`${pageUrl} has an incorrect or missing canonical URL.`);
  if (robotsFrom(html).includes("noindex"))
    failures.push(`${pageUrl} is noindex despite being in the sitemap.`);
  const postings = jobPostingsFrom(html);
  if (postings.length !== 1) {
    failures.push(`${pageUrl} contains ${postings.length} JobPosting objects; expected 1.`);
    continue;
  }
  assertJobPosting(postings[0], pageUrl);
}

for (const notice of notices) console.warn(`NOTICE: ${notice}`);
if (failures.length) {
  for (const failure of failures) console.error(`FAIL: ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Hosted SEO verification passed for ${baseUrl.origin}.`);
  console.log(
    environment === "production"
      ? `Checked ${urls.length} sitemap URLs and ${Math.min(jobUrls.length, maxJobs)} eligible job detail pages.`
      : "Verified Preview crawl isolation and production canonicals.",
  );
}
