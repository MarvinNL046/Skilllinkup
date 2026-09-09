# English SEO pages and waitlist conversion

Implemented locally on 7 September 2026. Production publishing and search indexing have not been performed.

## Business facts and editorial boundaries

SkillLinkup is preparing for launch. The conversion for these pages is a waitlist registration, not a purchase, freelancer booking or guaranteed match. Target language: English; audience: international. Do not invent availability, prices, reviews, customer results or local offices. The project briefs are explicitly examples. The proposal template leaves commercial details blank.

Voice: direct, practical English. Explain the decision a reader needs to make. Prefer a specific checklist or example over vague promises. Do not turn every section into a sales pitch. Use the existing site font, white backgrounds and restrained borders.

## Keyword ownership and internal links

| Root keyword | Canonical path | Intent and conversion | Supporting links |
|---|---|---|---|
| hire web designer | /services/webdesign | Commercial research; web design waitlist interest | Hiring guide, graphic design, SEO |
| hire graphic designer | /services/graphic-design | Commercial research; graphic design waitlist interest | Hiring guide, web design, proposal template |
| freelance seo specialist | /services/seo | Commercial research; SEO waitlist interest | Hiring guide, web design, graphic design |
| how to hire a freelancer | /resources/how-to-hire-a-freelancer | Practical hiring guide; waitlist | All three service pages and proposal template |
| freelance proposal template | /resources/freelance-proposal-template | Usable template; freelancer waitlist interest | Hiring guide, graphic design and web design |

These roots were selected from the preceding English Ahrefs research. Previously recorded US monthly volume / global volume / keyword difficulty: 1000/1800/4, 1300/2200/0, 1100/3100/5, 250/350/3 and 150/350/1 respectively. These are third-party estimates, not promised traffic or current measured results. US data helped prioritise; it does not restrict the product to the US.

Same-intent variations belong on these pages. Do not create a separate “hire freelance web designer” page simply to repeat the content. Check this registry and existing Convex resources before adding a topic. The existing webdesign URL is preserved. New guide slugs are reserved by the git content registry and excluded from duplicate CMS cards and sitemap entries.

The /services hub links to the three service pages; /resources links to the two guides. Each new page links to relevant supporting pages. Existing pricing, comparison and guide templates now end in the shared waitlist CTA.

## Obsidian techniques applied

Source vault: `C:/Users/M_Smi/Documents/webdev/webdev/SEO`. The vault was consulted, not modified.

| Vault note | Application |
|---|---|
| 05 Service pages catch, blog posts raise the tide | Three service pages supported by two useful guides; conversion path continues toward the waitlist. |
| 09 One blog post = 1 root keyword + cluster | One intent per registered URL; adjacent wording grouped instead of creating duplicate pages. |
| 10 Steal the SERP | Observe useful comparison/brief/checklist formats; write original content rather than copying competitors. Search tool ordering is not treated as verified Google ranking. |
| 11 Sound like you, not AI; 27 Anti-slop QA | Specific deliverables, portfolio questions and dependencies; no generic authority claims or fabricated stories. |
| 12 On-page SEO; 13 checklist; 26 titles | Unique title/description, single H1, descriptive headings, canonical, social metadata and sitemap registration. |
| 19 TOFU MOFU BOFU; 21 hub and spoke | Commercial service pages and supporting informational guides linked through the existing hubs. |
| 20 Image rhythm; 22 content templates | Example brief cards, lists, a selectable proposal template, FAQ disclosures and a quiet CTA break up longer text. No fake portfolio imagery. |
| 24 Reference files | This document records facts, voice, keyword ownership, boundaries and sources for future editing. |
| 28 Publish, refresh and measure | Use the staged review process below; refresh based on evidence rather than changing dates automatically. |

The vault's “only SSG ranks” claim is not adopted. Google can render JavaScript; server rendering gives these pages useful initial HTML without breaking the app's locale/auth layout. There is no guarantee of indexing or ranking. City/service multiplication is inappropriate without real local coverage and distinct useful content. FAQ rich results and exact word/image quotas are not promised.

## Implementation and conversion

- `src/content/seo.js`: English page content, intent registry and metadata.
- `src/components/seo/SeoPage.jsx` and CSS module: shared server-rendered layout, breadcrumbs, contents, FAQs, related pages and CTAs.
- Service pages use WebPage and BreadcrumbList schema. Guides use Article and BreadcrumbList with SkillLinkup as organisational author. No fabricated ratings, offers or person credentials.
- `/seo-og`: real generated 1200×630 social image for these pages; no broken inherited image reference.
- WaitlistButton accepts optional starting skill/role while leaving both editable. Existing callers retain their defaults.
- The existing Convex mutation records email, interest, role, locale and source pathname. No extra analytics service was added.
- Email remains the required field. The role and interest are optional. The modal scrolls within a mobile viewport.
- Local canonical URLs follow NEXT_PUBLIC_SITE_URL. Verify the production variable is https://skilllinkup.com when publishing.

## Validation and publication sequence

Local build, TypeScript compilation and targeted ESLint passed. Browser verification on the separate QA server checked all five pages: HTTP 200, one H1, server HTML, canonical, valid JSON-LD, sitemap uniqueness, hub links, waitlist opening, defaults and mobile overflow. The social image returns an image successfully. A synthetic QA registration persisted the correct source/skill/role; a repeat produced no extra record, and the test record was removed. This verifies database persistence, not email delivery to an inbox or live SEO performance.

1. Review the five local pages and real business wording. Publish through the normal release process once ready. Do not change canonical URLs on a whim.
2. After publication, check public HTTP status, canonical, robots access, sitemap and social image. Use Search Console URL Inspection on these five URLs. Confirm a sitemap submission only if access is available; do not claim it happened here.
3. Establish a baseline for impressions, clicks, queries and landing pages. Compare waitlist source counts for the five paths. Counts alone are not a conversion rate: a rate needs corresponding visit data and a consistent measurement window.
4. After sufficient search data accumulates, review intent and snippets before writing more pages. Prioritise impressions with poor click-through, useful queries without a suitable page, and visits with weak waitlist response. Avoid drawing conclusions from a handful of visits.
5. Expand the strongest cluster with a genuinely distinct topic, such as a website brief template or design handover checklist. Update internal links and this keyword registry in the same change.
6. Review quarterly, or sooner when the product's launch status changes. At launch, replace the waitlist promise with the actual available action and confirm that copy and structured data reflect reality.

## Primary references checked

- Google JavaScript SEO basics: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google spam policies: https://developers.google.com/search/docs/essentials/spam-policies
- Google guidance on hiring SEO support: https://developers.google.com/search/docs/fundamentals/do-i-need-seo

The final reference is linked on the SEO specialist page. The pages' practical examples and template are original editorial material; there are no copied competitor passages or unverified client results.


## GSC recovery implementation — 9 September 2026

The approved recovery batch is now implemented locally. See [SEO recovery implementation](seo-recovery-implementation.md) for URL decisions, refreshed sources, verification, remaining PDF review and the post-publication Search Console sequence. Existing /en/ canonical migrations remain intact.
