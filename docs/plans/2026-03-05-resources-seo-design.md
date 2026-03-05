# Resources SEO Recovery Design

**Goal:** Recover lost top-ranking pages by recreating them with real scraped data, stronger CTR optimization, rich snippets, and i18n support. Pages to recover have 26k–1.7k impressions but near-zero clicks due to 404s after migration.

**Approach:** Approach A — dedicated `resources` Convex table + `/resources/[slug]` route + scraper script using Jina Reader/Search + Claude to structure real data.

**Tech Stack:** Next.js 15, Convex, Jina AI Reader/Search, Claude API (claude-haiku-4-5), next-intl

---

## 1. Target Pages

| URL (old) | Impressions | Type |
|---|---|---|
| `/en/resources/upwork-pricing` | 26,329 | pricing |
| `/en/resources/99designs-pricing` | 10,619 | pricing |
| `/resources/freelancer-vs-guru` | 8,407 | comparison |
| `/platforms/malt` | 4,743 | platform (fix metadata) |
| `/platforms/upwork` | 3,079 | platform (fix metadata) |
| `/en/resources/mastering-freelance-platform-algorithms` | 2,815 | guide |
| `/platforms/peopleperhour` | 2,085 | platform (fix metadata) |
| `/en/resources/upwork-pricing-tactics` | 1,785 | pricing |
| `/en/resources/toptal-for-beginners` | 1,693 | guide |

---

## 2. URL Structure & i18n

**Canonical (English):**
```
/resources/[slug]
```

**Localized:**
```
/nl/resources/[slug]
```

**Redirects (next.config.js):**
```
/en/resources/:slug  →  /resources/:slug  (301)
```

**Platform pages** — no URL change needed, just add `generateMetadata()` + JSON-LD.

---

## 3. Convex Schema

**New `resources` table:**
```ts
resources: defineTable({
  slug: v.string(),
  locale: v.string(),               // "en" | "nl"
  type: v.string(),                 // "pricing" | "comparison" | "guide"
  status: v.string(),               // "draft" | "published"

  // SEO
  metaTitle: v.string(),
  metaDescription: v.string(),

  // Content
  intro: v.string(),
  sections: v.array(v.object({
    heading: v.string(),
    body: v.string(),
  })),
  pricingData: v.optional(v.any()),    // tiers with prices
  comparisonData: v.optional(v.any()), // side-by-side table data
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
  .index("by_type", ["type"])
```

**Convex functions** (`convex/resources.ts`):
| Function | Type | Description |
|---|---|---|
| `getBySlug(slug, locale)` | query | Fetch single resource for page render |
| `list(locale, status)` | query | List all resources (admin + sitemap) |
| `create(data)` | mutation | Used by scraper script |
| `upsert(slug, locale, data)` | mutation | Idempotent create/update for re-runs |

---

## 4. Scraper Script

**File:** `scripts/scrape-resources.mjs`

**Flow per resource:**
1. **Jina Reader** (`r.jina.ai/[url]`) — scrape primary source (e.g. upwork.com/pricing)
2. **Jina Search** (`s.jina.ai?q=...`) — 2-3 additional sources for cross-verification
3. **Claude** (`claude-haiku-4-5`) — structure into resource schema:
   - CTR-optimized `metaTitle` (with year, numbers, power words)
   - `metaDescription` (155 chars, includes key stat)
   - `intro`, `sections`, `pricingData`/`comparisonData`, `faqItems`
4. **Convex upsert** — saves to `resources` table (resume-safe)

**Target sources per resource:**
```
upwork-pricing           → upwork.com/pricing + support.upwork.com/fees
99designs-pricing        → 99designs.com/pricing + help.99designs.com
freelancer-vs-guru       → freelancer.com/about + guru.com/employer/pricing
upwork-pricing-tactics   → upwork.com/pricing + blog.upwork.com
mastering-algorithms     → upwork.com/search + fiverr.com/search (algorithm docs)
toptal-for-beginners     → toptal.com/faq + toptal.com/how-it-works
```

**CTR title patterns:**
- Pricing: `"[Platform] Pricing & Fees 2026: Full Breakdown (+ How to Pay Less)"`
- Comparison: `"[A] vs [B] 2026: Which Freelance Platform Is Better?"`
- Guide: `"[Topic] 2026: Complete Beginner's Guide"`

---

## 5. Next.js Routes & Templates

**Routes:**
```
src/app/resources/[slug]/page.jsx          ← English canonical
src/app/[locale]/resources/[slug]/page.jsx ← i18n (nl, etc.)
```

**Templates by type:**

**`pricing`:**
```
Hero (title + intro + last updated)
→ Pricing tiers table (side-by-side cards)
→ Key takeaways box (green checkmarks)
→ Sections (how fees work, tips to save)
→ FAQ (collapsible, for rich snippet)
→ CTA → SkillLinkup
```

**`comparison`:**
```
Hero ("X vs Y: Which is Better in 2026?")
→ Quick verdict box (winner per category)
→ Side-by-side comparison table
→ Deep-dive sections per category
→ Final verdict + recommendation
→ FAQ
→ CTA
```

**`guide`:**
```
Hero (title + intro)
→ Sticky table of contents (sidebar)
→ Sections with H2/H3
→ Key takeaways box
→ FAQ
→ CTA
```

---

## 6. SEO Implementation

**Per page (`generateMetadata`):**
```ts
export async function generateMetadata({ params }) {
  const resource = await fetchQuery(api.resources.getBySlug, { slug, locale })
  return {
    title: resource.metaTitle,
    description: resource.metaDescription,
    openGraph: { title, description },
    alternates: { canonical: `/resources/${slug}`, languages: { nl: `/nl/resources/${nlSlug}` } }
  }
}
```

**JSON-LD per page:**
- `Article` schema (always)
- `FAQPage` schema (when faqItems.length > 0) — shows FAQ dropdowns in Google
- `BreadcrumbList` schema

**Redirects in `next.config.js`:**
```js
redirects: async () => [
  { source: '/en/resources/:slug', destination: '/resources/:slug', permanent: true },
]
```

**Sitemap:** extended to include all published resources.

---

## 7. Platform Pages Fix

`/platforms/[slug]` already exists. Add:
- `generateMetadata()` using `fetchQuery(api.marketplace.platforms.getBySlug)`
- JSON-LD: `Organization` + `Review` schema
- Ensure Upwork, Malt, PeoplePerHour data exists in Convex

---

## 8. Out of Scope (YAGNI)

- Comments/ratings on resources
- User-submitted resources
- Automatic re-scraping (manual re-run of script is enough for now)
- More than EN + NL for now
