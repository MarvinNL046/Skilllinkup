# Resources SEO Recovery Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Recover 6 lost top-ranking pages (26k–1.7k impressions, near-zero clicks due to 404s) by creating a `/resources/[slug]` route with real scraped content, rich snippets, and i18n support.

**Architecture:** New `resources` Convex table → scraper script uses Jina Reader + Claude to fill it with real data → Next.js server-rendered pages with `generateMetadata()` + JSON-LD → 301 redirects from old `/en/resources/[slug]` URLs.

**Tech Stack:** Next.js 15, Convex 1.32, Jina AI Reader/Search, Claude API (claude-haiku-4-5), next-intl (already installed)

---

## Task 1: Convex schema — add `resources` table

**Files:**
- Modify: `convex/schema.ts` (end of file, before closing `}`)

**Step 1: Add the resources table to the schema**

In `convex/schema.ts`, add before the final `});`:

```ts
  // ============================================================
  // RESOURCES (SEO articles: pricing guides, comparisons, how-tos)
  // ============================================================

  resources: defineTable({
    slug: v.string(),
    locale: v.string(),                        // "en" | "nl"
    type: v.string(),                          // "pricing" | "comparison" | "guide"
    status: v.string(),                        // "draft" | "published"

    // SEO
    metaTitle: v.string(),
    metaDescription: v.string(),

    // Content
    intro: v.string(),
    sections: v.array(v.object({
      heading: v.string(),
      body: v.string(),
    })),
    pricingData: v.optional(v.any()),          // [{tier, price, features[]}]
    comparisonData: v.optional(v.any()),       // [{category, a, b}]
    faqItems: v.array(v.object({
      question: v.string(),
      answer: v.string(),
    })),
    keyTakeaways: v.optional(v.array(v.string())),

    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug_locale", ["slug", "locale"])
    .index("by_status", ["status"])
    .index("by_type_status", ["type", "status"]),
```

**Step 2: Verify build still passes**

```bash
npm run build
```

Expected: `✓ Compiled successfully`

**Step 3: Commit**

```bash
git add convex/schema.ts
git commit -m "feat(resources): add resources table to Convex schema"
```

---

## Task 2: Convex functions — `convex/resources.ts`

**Files:**
- Create: `convex/resources.ts`

**Step 1: Create the file**

```ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Public: fetch single resource by slug + locale
export const getBySlug = query({
  args: { slug: v.string(), locale: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("resources")
      .withIndex("by_slug_locale", (q) =>
        q.eq("slug", args.slug).eq("locale", args.locale)
      )
      .first() ?? null;
  },
});

// Public: list published resources
export const list = query({
  args: {
    locale: v.optional(v.string()),
    status: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("resources")
      .withIndex("by_status", (q) =>
        q.eq("status", args.status ?? "published")
      )
      .order("desc")
      .collect();
    return results
      .filter((r) => !args.locale || r.locale === args.locale)
      .slice(0, args.limit ?? 100);
  },
});

// Script: create or update (upsert) a resource — used by scraper
export const upsert = mutation({
  args: {
    slug: v.string(),
    locale: v.string(),
    type: v.string(),
    status: v.string(),
    metaTitle: v.string(),
    metaDescription: v.string(),
    intro: v.string(),
    sections: v.array(v.object({ heading: v.string(), body: v.string() })),
    pricingData: v.optional(v.any()),
    comparisonData: v.optional(v.any()),
    faqItems: v.array(v.object({ question: v.string(), answer: v.string() })),
    keyTakeaways: v.optional(v.array(v.string())),
    publishedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("resources")
      .withIndex("by_slug_locale", (q) =>
        q.eq("slug", args.slug).eq("locale", args.locale)
      )
      .first();

    const now = Date.now();
    const data = { ...args, updatedAt: now };

    if (existing) {
      await ctx.db.patch(existing._id, data);
      return existing._id;
    } else {
      return await ctx.db.insert("resources", { ...data, createdAt: now });
    }
  },
});
```

**Step 2: Deploy Convex**

```bash
npx convex deploy -y
```

Expected: `✔ Deployed Convex functions`

**Step 3: Commit**

```bash
git add convex/resources.ts convex/schema.ts
git commit -m "feat(resources): Convex resources table + getBySlug/list/upsert functions"
```

---

## Task 3: Add redirects + public routes to middleware

**Files:**
- Modify: `next.config.js`
- Modify: `middleware.ts`

**Step 1: Add 301 redirects in next.config.js**

In the `redirects()` array, add:

```js
// Resources: redirect old /en/resources/* URLs to canonical /resources/*
{ source: '/en/resources/:slug', destination: '/resources/:slug', permanent: true },
// Also handle /en/platforms/* → /platforms/*
{ source: '/en/platforms/:slug', destination: '/platforms/:slug', permanent: true },
```

**Step 2: Add resources to public routes in middleware.ts**

Add to the `isPublicRoute` array:

```ts
"/resources(.*)",
"/nl/resources(.*)",
"/platforms(.*)",
```

**Step 3: Build check**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add next.config.js middleware.ts
git commit -m "feat(resources): add 301 redirects for old /en/resources/* URLs, add to public routes"
```

---

## Task 4: Scraper script — `scripts/scrape-resources.mjs`

**Files:**
- Create: `scripts/scrape-resources.mjs`

**Step 1: Create the scraper**

```js
#!/usr/bin/env node
/**
 * Scrapes real pricing/comparison data for SkillLinkup resource pages.
 * Uses Jina Reader + Jina Search to get real data, Claude to structure it,
 * then upserts into Convex via npx convex run.
 *
 * Usage:
 *   node scripts/scrape-resources.mjs                    # all resources
 *   node scripts/scrape-resources.mjs --slug upwork-pricing  # single resource
 *   node scripts/scrape-resources.mjs --dry-run          # print JSON, don't save
 */

import { readFileSync } from 'fs';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, '..', '.env.local') });

const JINA_API_KEY = process.env.JINA_READER_API_KEY || process.env.JINA_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const DELAY_MS = 2000;
const TIMEOUT_MS = 30000;

// ---------------------------------------------------------------------------
// Resource definitions
// ---------------------------------------------------------------------------
const RESOURCES = [
  {
    slug: 'upwork-pricing',
    locale: 'en',
    type: 'pricing',
    sources: [
      'https://www.upwork.com/pricing',
      'https://support.upwork.com/hc/en-us/articles/211063538',
    ],
    searchQuery: 'Upwork pricing fees service fee 2026',
  },
  {
    slug: '99designs-pricing',
    locale: 'en',
    type: 'pricing',
    sources: [
      'https://99designs.com/pricing',
      'https://en.99designs.com.au/how-it-works',
    ],
    searchQuery: '99designs pricing plans fees 2026',
  },
  {
    slug: 'freelancer-vs-guru',
    locale: 'en',
    type: 'comparison',
    sources: [
      'https://www.freelancer.com/about',
      'https://www.guru.com/d/account/employer/memberships/',
    ],
    searchQuery: 'Freelancer.com vs Guru comparison fees talent 2026',
  },
  {
    slug: 'mastering-freelance-platform-algorithms',
    locale: 'en',
    type: 'guide',
    sources: [
      'https://www.upwork.com/resources/boosting-upwork-profile',
      'https://www.fiverr.com/resources/guides/freelancing/fiverr-algorithm',
    ],
    searchQuery: 'how freelance platform algorithms work ranking tips 2026',
  },
  {
    slug: 'upwork-pricing-tactics',
    locale: 'en',
    type: 'guide',
    sources: [
      'https://www.upwork.com/pricing',
      'https://support.upwork.com/hc/en-us/articles/211063538',
    ],
    searchQuery: 'Upwork pricing tactics reduce fees save money freelancer 2026',
  },
  {
    slug: 'toptal-for-beginners',
    locale: 'en',
    type: 'guide',
    sources: [
      'https://www.toptal.com/faq',
      'https://www.toptal.com/how-it-works',
    ],
    searchQuery: 'Toptal how it works beginners guide requirements 2026',
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchWithTimeout(url, opts = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

async function jinaRead(url) {
  const headers = { Accept: 'text/markdown', 'X-Return-Format': 'markdown' };
  if (JINA_API_KEY) headers['Authorization'] = `Bearer ${JINA_API_KEY}`;
  const res = await fetchWithTimeout(`https://r.jina.ai/${url}`, { headers });
  if (!res.ok) return null;
  const text = await res.text();
  return text?.length > 200 ? text.slice(0, 8000) : null;
}

async function jinaSearch(query) {
  if (!JINA_API_KEY) throw new Error('JINA_READER_API_KEY required');
  const res = await fetchWithTimeout(
    `https://s.jina.ai/?q=${encodeURIComponent(query)}`,
    { headers: { Authorization: `Bearer ${JINA_API_KEY}` } }
  );
  if (!res.ok) return null;
  const text = await res.text();
  return text?.slice(0, 6000);
}

async function claudeStructure(resourceDef, scrapedContent) {
  const typeInstructions = {
    pricing: `Extract and structure pricing information. Create a pricing table with tiers/plans (pricingData as array of {tier, price, billingPeriod, features[]}). Include how fees work, what's included, and money-saving tips in sections.`,
    comparison: `Compare the two platforms objectively. Create comparisonData as array of {category, a, b} rows covering: fees, talent pool quality, ease of use, support, payment protection. Give a clear verdict.`,
    guide: `Structure as a practical guide with clear sections. Include actionable tips, numbered steps where relevant. No pricingData or comparisonData needed.`,
  };

  const prompt = `You are an expert SEO content writer. Structure the following scraped web content into a resource article for SkillLinkup (a freelance marketplace platform).

Resource: "${resourceDef.slug}" (type: ${resourceDef.type})

SCRAPED CONTENT:
${scrapedContent}

INSTRUCTIONS:
${typeInstructions[resourceDef.type]}

Return ONLY valid JSON matching this exact schema:
{
  "metaTitle": "string (max 60 chars, include year 2026, numbers if possible, power words)",
  "metaDescription": "string (max 155 chars, include key stat or benefit, no fluff)",
  "intro": "string (2-3 sentences, hook the reader, include the main value proposition)",
  "sections": [{"heading": "string", "body": "string (2-4 paragraphs of real useful content)"}],
  "pricingData": null or [{"tier": "string", "price": "string", "billingPeriod": "string", "features": ["string"]}],
  "comparisonData": null or [{"category": "string", "a": "string", "b": "string"}],
  "faqItems": [{"question": "string", "answer": "string"}] (5-7 real questions people ask),
  "keyTakeaways": ["string"] (3-5 bullet points, the most important things to remember)
}

Rules:
- Use ONLY real data from the scraped content — never invent prices or statistics
- If you cannot find specific pricing, say "Check current pricing at [platform]"
- metaTitle must be compelling for CTR (e.g. "Upwork Fees 2026: Full Breakdown (+ How to Pay Less)")
- Write in clear English, no jargon
- Sections should have 2-4 concrete paragraphs each`;

  const res = await fetchWithTimeout('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      temperature: 0.2,
      messages: [{ role: 'user', content: prompt }],
    }),
  }, 90000);

  if (!res.ok) throw new Error(`Claude API ${res.status}: ${await res.text()}`);
  const result = await res.json();
  const raw = result.content[0].text.replace(/```json?\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(raw);
}

async function upsertToConvex(resource, structured, dryRun) {
  const payload = {
    slug: resource.slug,
    locale: resource.locale,
    type: resource.type,
    status: 'published',
    publishedAt: Date.now(),
    ...structured,
    faqItems: structured.faqItems ?? [],
    sections: structured.sections ?? [],
  };

  if (dryRun) {
    console.log('DRY RUN — would upsert:', JSON.stringify(payload, null, 2));
    return;
  }

  // Write to a temp file and pass as JSON arg
  const json = JSON.stringify(payload);
  execSync(`npx convex run resources:upsert '${json.replace(/'/g, "'\\''")}'`, {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit',
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  const slugFilter = args.includes('--slug') ? args[args.indexOf('--slug') + 1] : null;
  const dryRun = args.includes('--dry-run');

  if (!ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY missing in .env.local');

  const targets = slugFilter
    ? RESOURCES.filter((r) => r.slug === slugFilter)
    : RESOURCES;

  if (targets.length === 0) {
    console.error(`No resource found for slug: ${slugFilter}`);
    process.exit(1);
  }

  for (const resource of targets) {
    console.log(`\n=== ${resource.slug} (${resource.type}) ===`);

    // 1. Scrape sources
    const contentParts = [];
    for (const url of resource.sources) {
      console.log(`  Jina Reader: ${url}`);
      try {
        const content = await jinaRead(url);
        if (content) contentParts.push(`### Source: ${url}\n${content}`);
        else console.log(`    → empty/blocked`);
      } catch (err) {
        console.log(`    → failed: ${err.message}`);
      }
      await sleep(DELAY_MS);
    }

    // 2. Search for additional context
    console.log(`  Jina Search: ${resource.searchQuery}`);
    try {
      const searchContent = await jinaSearch(resource.searchQuery);
      if (searchContent) contentParts.push(`### Search results\n${searchContent}`);
    } catch (err) {
      console.log(`    → search failed: ${err.message}`);
    }
    await sleep(DELAY_MS);

    if (contentParts.length === 0) {
      console.log(`  ⚠ No content scraped — skipping`);
      continue;
    }

    // 3. Structure with Claude
    console.log(`  Claude: structuring content...`);
    let structured;
    try {
      structured = await claudeStructure(resource, contentParts.join('\n\n---\n\n'));
    } catch (err) {
      console.error(`  ✗ Claude failed: ${err.message}`);
      continue;
    }

    // 4. Save to Convex
    console.log(`  Saving to Convex...`);
    try {
      await upsertToConvex(resource, structured, dryRun);
      console.log(`  ✓ Done: "${structured.metaTitle}"`);
    } catch (err) {
      console.error(`  ✗ Convex upsert failed: ${err.message}`);
    }

    await sleep(DELAY_MS);
  }

  console.log('\n✓ All resources processed');
}

main().catch((err) => { console.error(err); process.exit(1); });
```

**Step 2: Make executable and run a dry-run test on one resource**

```bash
node scripts/scrape-resources.mjs --slug upwork-pricing --dry-run
```

Expected: prints JSON with metaTitle, sections, faqItems (no Convex write)

**Step 3: Commit**

```bash
git add scripts/scrape-resources.mjs
git commit -m "feat(resources): scraper script using Jina Reader + Claude"
```

---

## Task 5: Run scraper for all resources

**Step 1: Deploy Convex first (needed for upsert)**

```bash
npx convex deploy -y
```

**Step 2: Run scraper for all resources**

```bash
node scripts/scrape-resources.mjs
```

Expected: each resource prints `✓ Done: "[metaTitle]"`

**Step 3: Verify data in Convex dashboard**

Open https://dashboard.convex.dev → your deployment → Data → resources table
Check: 6 rows, all `status: "published"`

**Step 4: Commit**

```bash
git commit -m "chore(resources): scrape + seed 6 resource articles via Jina + Claude"
```

(No files to commit — data is in Convex)

---

## Task 6: Next.js — `/resources/[slug]` page + template components

**Files:**
- Create: `src/app/resources/[slug]/page.jsx`
- Create: `src/components/resources/ResourcePricingTemplate.jsx`
- Create: `src/components/resources/ResourceComparisonTemplate.jsx`
- Create: `src/components/resources/ResourceGuideTemplate.jsx`
- Create: `src/components/resources/ResourceFAQ.jsx`
- Create: `src/components/resources/ResourceCTA.jsx`

**Step 1: Create the page with generateMetadata**

`src/app/resources/[slug]/page.jsx`:

```jsx
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import ResourcePricingTemplate from "@/components/resources/ResourcePricingTemplate";
import ResourceComparisonTemplate from "@/components/resources/ResourceComparisonTemplate";
import ResourceGuideTemplate from "@/components/resources/ResourceGuideTemplate";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skilllinkup.com";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const resource = await fetchQuery(api.resources.getBySlug, { slug, locale: "en" });
    if (!resource) return { title: "Resource | SkillLinkup" };
    return {
      title: resource.metaTitle,
      description: resource.metaDescription,
      openGraph: {
        title: resource.metaTitle,
        description: resource.metaDescription,
        url: `${BASE_URL}/resources/${slug}`,
      },
      alternates: {
        canonical: `${BASE_URL}/resources/${slug}`,
      },
    };
  } catch {
    return { title: "Resource | SkillLinkup" };
  }
}

export default async function ResourcePage({ params }) {
  const { slug } = await params;
  const resource = await fetchQuery(api.resources.getBySlug, { slug, locale: "en" }).catch(() => null);

  if (!resource || resource.status !== "published") notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: resource.metaTitle,
        description: resource.metaDescription,
        url: `${BASE_URL}/resources/${slug}`,
        datePublished: resource.publishedAt ? new Date(resource.publishedAt).toISOString() : undefined,
        dateModified: new Date(resource.updatedAt).toISOString(),
        publisher: { "@type": "Organization", name: "SkillLinkup", url: BASE_URL },
      },
      resource.faqItems?.length > 0 && {
        "@type": "FAQPage",
        mainEntity: resource.faqItems.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Resources", item: `${BASE_URL}/resources` },
          { "@type": "ListItem", position: 3, name: resource.metaTitle, item: `${BASE_URL}/resources/${slug}` },
        ],
      },
    ].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header20 />
      {resource.type === "pricing" && <ResourcePricingTemplate resource={resource} />}
      {resource.type === "comparison" && <ResourceComparisonTemplate resource={resource} />}
      {resource.type === "guide" && <ResourceGuideTemplate resource={resource} />}
      <Footer14 />
    </>
  );
}
```

**Step 2: Create ResourceFAQ component**

`src/components/resources/ResourceFAQ.jsx`:

```jsx
"use client";
import { useState } from "react";

export default function ResourceFAQ({ items }) {
  const [open, setOpen] = useState(null);
  if (!items?.length) return null;
  return (
    <section className="pt60 pb60">
      <div className="container">
        <h2 className="fz28 fw700 mb30">Frequently Asked Questions</h2>
        <div className="accordion" id="resourceFAQ">
          {items.map((item, i) => (
            <div key={i} className="accordion-item bdr1 bdrs8 mb10">
              <h3 className="accordion-header">
                <button
                  className={`accordion-button fz16 fw600 ${open !== i ? "collapsed" : ""}`}
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{ background: "none", boxShadow: "none" }}
                >
                  {item.question}
                </button>
              </h3>
              {open === i && (
                <div className="accordion-body fz15 text-muted pt0">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 3: Create ResourceCTA component**

`src/components/resources/ResourceCTA.jsx`:

```jsx
import Link from "next/link";

export default function ResourceCTA() {
  return (
    <section className="pt60 pb80 bgc-thm3">
      <div className="container text-center">
        <h2 className="fz28 fw700 mb15">Find top freelancers on SkillLinkup</h2>
        <p className="fz16 text-muted mb30">
          Compare talent, read reviews, and hire with confidence — no hidden fees.
        </p>
        <Link href="/online/freelancers" className="ud-btn btn-thm bdrs8 px40 py15 fz16">
          Browse Freelancers
          <i className="fal fa-arrow-right-long ms-2" />
        </Link>
      </div>
    </section>
  );
}
```

**Step 4: Create ResourcePricingTemplate**

`src/components/resources/ResourcePricingTemplate.jsx`:

```jsx
import ResourceFAQ from "./ResourceFAQ";
import ResourceCTA from "./ResourceCTA";

export default function ResourcePricingTemplate({ resource }) {
  return (
    <main>
      {/* Hero */}
      <section className="pt80 pb60 bgc-thm3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <span className="badge bg-thm text-white px-3 py-2 bdrs8 fz13 mb20">Pricing Guide</span>
              <h1 className="fz40 fw700 mb20">{resource.metaTitle}</h1>
              <p className="fz17 text-muted">{resource.intro}</p>
              {resource.publishedAt && (
                <p className="fz13 text-muted mt15">
                  Last updated: {new Date(resource.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Key takeaways */}
      {resource.keyTakeaways?.length > 0 && (
        <section className="pt60 pb40">
          <div className="container">
            <div className="col-lg-8 mx-auto bdr1 bdrs12 p30" style={{ borderLeft: "4px solid #ef2b70" }}>
              <h2 className="fz20 fw700 mb20">Key Takeaways</h2>
              <ul className="mb-0 ps-0" style={{ listStyle: "none" }}>
                {resource.keyTakeaways.map((t, i) => (
                  <li key={i} className="d-flex align-items-start gap-2 mb10 fz15">
                    <i className="fas fa-check-circle text-success mt-1" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Pricing table */}
      {resource.pricingData?.length > 0 && (
        <section className="pt40 pb60">
          <div className="container">
            <h2 className="fz28 fw700 mb30 text-center">Pricing Plans</h2>
            <div className="row g-4 justify-content-center">
              {resource.pricingData.map((plan, i) => (
                <div key={i} className="col-md-4">
                  <div className="bdr1 bdrs12 p30 h-100 text-center hover-box-shadow">
                    <h3 className="fz20 fw700 mb10">{plan.tier}</h3>
                    <div className="fz32 fw700 text-thm mb5">{plan.price}</div>
                    {plan.billingPeriod && <p className="fz13 text-muted mb20">{plan.billingPeriod}</p>}
                    <ul className="text-start ps-0" style={{ listStyle: "none" }}>
                      {plan.features?.map((f, j) => (
                        <li key={j} className="d-flex gap-2 mb8 fz14">
                          <i className="fas fa-check text-success mt-1" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sections */}
      <section className="pt40 pb60">
        <div className="container">
          <div className="col-lg-8 mx-auto">
            {resource.sections?.map((section, i) => (
              <div key={i} className="mb40">
                <h2 className="fz24 fw700 mb15">{section.heading}</h2>
                <div className="fz16 text-dark lh-lg" style={{ whiteSpace: "pre-wrap" }}>
                  {section.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ResourceFAQ items={resource.faqItems} />
      <ResourceCTA />
    </main>
  );
}
```

**Step 5: Create ResourceComparisonTemplate**

`src/components/resources/ResourceComparisonTemplate.jsx`:

```jsx
import ResourceFAQ from "./ResourceFAQ";
import ResourceCTA from "./ResourceCTA";

export default function ResourceComparisonTemplate({ resource }) {
  return (
    <main>
      {/* Hero */}
      <section className="pt80 pb60 bgc-thm3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <span className="badge bg-thm text-white px-3 py-2 bdrs8 fz13 mb20">Platform Comparison</span>
              <h1 className="fz40 fw700 mb20">{resource.metaTitle}</h1>
              <p className="fz17 text-muted">{resource.intro}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison table */}
      {resource.comparisonData?.length > 0 && (
        <section className="pt60 pb40">
          <div className="container">
            <h2 className="fz28 fw700 mb30 text-center">Side-by-Side Comparison</h2>
            <div className="table-responsive">
              <table className="table bdr1 bdrs8 overflow-hidden">
                <thead style={{ background: "#1e1541", color: "#fff" }}>
                  <tr>
                    <th className="p20 fz15">Category</th>
                    <th className="p20 fz15">Freelancer.com</th>
                    <th className="p20 fz15">Guru</th>
                  </tr>
                </thead>
                <tbody>
                  {resource.comparisonData.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bgc-thm3" : ""}>
                      <td className="p20 fw600 fz14">{row.category}</td>
                      <td className="p20 fz14">{row.a}</td>
                      <td className="p20 fz14">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Sections */}
      <section className="pt40 pb60">
        <div className="container">
          <div className="col-lg-8 mx-auto">
            {resource.sections?.map((section, i) => (
              <div key={i} className="mb40">
                <h2 className="fz24 fw700 mb15">{section.heading}</h2>
                <div className="fz16 text-dark lh-lg" style={{ whiteSpace: "pre-wrap" }}>
                  {section.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ResourceFAQ items={resource.faqItems} />
      <ResourceCTA />
    </main>
  );
}
```

**Step 6: Create ResourceGuideTemplate**

`src/components/resources/ResourceGuideTemplate.jsx`:

```jsx
import ResourceFAQ from "./ResourceFAQ";
import ResourceCTA from "./ResourceCTA";

export default function ResourceGuideTemplate({ resource }) {
  return (
    <main>
      {/* Hero */}
      <section className="pt80 pb60 bgc-thm3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <span className="badge bg-thm text-white px-3 py-2 bdrs8 fz13 mb20">Guide</span>
              <h1 className="fz40 fw700 mb20">{resource.metaTitle}</h1>
              <p className="fz17 text-muted">{resource.intro}</p>
              {resource.publishedAt && (
                <p className="fz13 text-muted mt15">
                  Last updated: {new Date(resource.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Key takeaways */}
      {resource.keyTakeaways?.length > 0 && (
        <section className="pt60 pb20">
          <div className="container">
            <div className="col-lg-8 mx-auto bdr1 bdrs12 p30" style={{ borderLeft: "4px solid #22c55e" }}>
              <h2 className="fz20 fw700 mb20">What You'll Learn</h2>
              <ul className="mb-0 ps-0" style={{ listStyle: "none" }}>
                {resource.keyTakeaways.map((t, i) => (
                  <li key={i} className="d-flex align-items-start gap-2 mb10 fz15">
                    <i className="fas fa-check-circle text-success mt-1" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Sections */}
      <section className="pt40 pb60">
        <div className="container">
          <div className="col-lg-8 mx-auto">
            {resource.sections?.map((section, i) => (
              <div key={i} className="mb40">
                <h2 className="fz24 fw700 mb15">{section.heading}</h2>
                <div className="fz16 text-dark lh-lg" style={{ whiteSpace: "pre-wrap" }}>
                  {section.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ResourceFAQ items={resource.faqItems} />
      <ResourceCTA />
    </main>
  );
}
```

**Step 7: Build check**

```bash
npm run build
```

Expected: `✓ Compiled successfully`, no errors

**Step 8: Commit**

```bash
git add src/app/resources src/components/resources
git commit -m "feat(resources): /resources/[slug] page with pricing/comparison/guide templates + JSON-LD"
```

---

## Task 7: i18n — `/[locale]/resources/[slug]` route

**Files:**
- Create: `src/app/[locale]/resources/[slug]/page.jsx`

Note: The `[locale]` segment already works in Next.js App Router — no extra config needed. next-intl is already installed.

**Step 1: Create the localized page**

`src/app/[locale]/resources/[slug]/page.jsx`:

```jsx
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import ResourcePricingTemplate from "@/components/resources/ResourcePricingTemplate";
import ResourceComparisonTemplate from "@/components/resources/ResourceComparisonTemplate";
import ResourceGuideTemplate from "@/components/resources/ResourceGuideTemplate";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skilllinkup.com";

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  try {
    const resource = await fetchQuery(api.resources.getBySlug, { slug, locale });
    if (!resource) return { title: "Resource | SkillLinkup" };
    return {
      title: resource.metaTitle,
      description: resource.metaDescription,
      openGraph: { title: resource.metaTitle, description: resource.metaDescription },
      alternates: {
        canonical: `${BASE_URL}/${locale}/resources/${slug}`,
        languages: { en: `${BASE_URL}/resources/${slug}` },
      },
    };
  } catch {
    return { title: "Resource | SkillLinkup" };
  }
}

export default async function LocaleResourcePage({ params }) {
  const { slug, locale } = await params;
  const resource = await fetchQuery(api.resources.getBySlug, { slug, locale }).catch(() => null);

  if (!resource || resource.status !== "published") notFound();

  return (
    <>
      <Header20 />
      {resource.type === "pricing" && <ResourcePricingTemplate resource={resource} />}
      {resource.type === "comparison" && <ResourceComparisonTemplate resource={resource} />}
      {resource.type === "guide" && <ResourceGuideTemplate resource={resource} />}
      <Footer14 />
    </>
  );
}
```

**Step 2: Add `/[locale]/resources` to middleware public routes**

Already done in Task 3 (`"/nl/resources(.*)"`). If `[locale]` needs to be more generic:

In `middleware.ts`, also add:
```ts
"/nl(.*)",   // if not already present
```

Check: is `/nl/resources/...` already covered by existing public route patterns? If not, add `"/:locale/resources(.*)"`.

**Step 3: Build check**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add src/app/\[locale\]/resources
git commit -m "feat(resources): i18n route /[locale]/resources/[slug]"
```

---

## Task 8: Platform pages — add generateMetadata + JSON-LD

**Files:**
- Modify: `src/app/platforms/[slug]/page.jsx`

The platform page is currently `"use client"` — we need to split it into a server wrapper (for metadata) + client component (for interactivity).

**Step 1: Extract client content to a separate component**

Move the entire current `src/app/platforms/[slug]/page.jsx` content to:
`src/components/platforms/PlatformPageClient.jsx`

Keep the `"use client"` directive at the top.

**Step 2: Replace page.jsx with a server component**

`src/app/platforms/[slug]/page.jsx`:

```jsx
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import PlatformPageClient from "@/components/platforms/PlatformPageClient";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skilllinkup.com";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const platform = await fetchQuery(api.platforms.getBySlug, { slug, locale: "en" });
    if (!platform) return { title: "Platform | SkillLinkup" };
    return {
      title: `${platform.name} Review 2026: Pricing, Features & Alternatives | SkillLinkup`,
      description: platform.description
        ? platform.description.slice(0, 155)
        : `In-depth ${platform.name} review: pricing, features, pros & cons. Find the best freelance platform for your needs.`,
      openGraph: {
        title: `${platform.name} Review 2026`,
        description: platform.description?.slice(0, 155),
        images: platform.logo ? [{ url: platform.logo }] : [],
      },
      alternates: { canonical: `${BASE_URL}/platforms/${slug}` },
    };
  } catch {
    return { title: "Platform Review | SkillLinkup" };
  }
}

export default async function PlatformPage({ params }) {
  const { slug } = await params;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Platforms", item: `${BASE_URL}/platforms` },
      { "@type": "ListItem", position: 3, name: slug, item: `${BASE_URL}/platforms/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PlatformPageClient slug={slug} />
    </>
  );
}
```

**Step 3: Build check**

```bash
npm run build
```

Expected: `✓ Compiled successfully`

**Step 4: Commit**

```bash
git add src/app/platforms src/components/platforms
git commit -m "feat(seo): platform pages generateMetadata + JSON-LD breadcrumb"
```

---

## Task 9: Update sitemap to include resources

**Files:**
- Modify: `src/app/sitemap.ts`

**Step 1: Add resources to the sitemap fetch**

In the `Promise.all([...])`, add:

```ts
fetchQuery(api.resources.list, { locale: "en", status: "published", limit: 500 }).catch(() => []),
```

Then map them:

```ts
const resourceRoutes: MetadataRoute.Sitemap = (resources ?? []).map((r: any) => ({
  url: `${BASE_URL}/resources/${r.slug}`,
  lastModified: new Date(r.updatedAt),
  changeFrequency: "monthly" as const,
  priority: 0.85,
}));
```

Add `resourceRoutes` to the return array.

**Step 2: Build check**

```bash
npm run build
```

**Step 3: Deploy Convex + push**

```bash
npx convex deploy -y
git add -A
git commit -m "feat(resources): add resources to sitemap"
git push origin main
```

---

## Task 10: Verify everything works

**Step 1: Check redirects**

```bash
curl -I https://skilllinkup.com/en/resources/upwork-pricing
```

Expected: `HTTP/2 301` with `location: /resources/upwork-pricing`

**Step 2: Check resource pages render**

Visit in browser (or curl):
```
https://skilllinkup.com/resources/upwork-pricing
https://skilllinkup.com/resources/freelancer-vs-guru
```

Expected: full page with title, sections, FAQ accordion, pricing table (where applicable)

**Step 3: Check metadata**

```bash
curl -s https://skilllinkup.com/resources/upwork-pricing | grep -E '<title>|<meta name="description"'
```

Expected: real title and description from Convex data

**Step 4: Check sitemap**

```
https://skilllinkup.com/sitemap.xml
```

Expected: includes `/resources/upwork-pricing` etc.

**Step 5: Validate JSON-LD**

Paste a resource URL into https://search.google.com/test/rich-results
Expected: Article + FAQPage results detected
