# Skilllinkup product page inventory and roadmap

Last audited: 31 July 2026

## Product architecture

Skilllinkup is one brand with three distinct marketplace products:

1. **Online** — worldwide freelancers, packaged digital services and project proposals.
2. **Local** — nearby professionals for work that must be performed at a location.
3. **Jobs** — real vacancies at verified companies, remote, hybrid or local.

Every public page should make its product context obvious, but keep the same Skilllinkup header, typography, trust language, account and footer.

## Current inventory

Legend: **Done** = current premium design exists; **Exists** = route/function exists but still uses legacy UI or needs product-specific UX; **Missing** = no complete page type yet.

### Shared public experience

| Page type | Route | Status | Next action |
| --- | --- | --- | --- |
| Homepage | `/` | Done | Conversion and responsive QA |
| Sign in / registration | `/login`, `/register` | Done | Add role-specific onboarding entry copy |
| For companies | `/jobs/companies` | Done | Connect demo and lead forms |
| About, contact, FAQ, help | `/about`, `/contact`, `/faq`, `/help` | Exists | Replace legacy layout and align navigation |
| Pricing | `/pricing` | Exists | Split pricing logic by product |
| Legal | `/privacy-policy`, `/terms`, `/cookie-policy` | Exists | Legal review before launch |
| Resources / blog | `/resources`, `/blog` | Exists | Consolidate two content systems and URL policy |
| Trust & safety hub | — | Missing | Create shared verification, payments and disputes overview |
| Search landing / global search | — | Missing | One intent router for Online, Local and Jobs |

### Online product

| Page type | Route | Status | Next action |
| --- | --- | --- | --- |
| Product hub | `/online` | Done | Connect live counts when inventory is credible |
| Services overview | `/services` and `/online/services` | Done / Exists | Select one canonical hierarchy and retire duplicate legacy view |
| Category landing | `/services/webdesign` | Done | Turn into reusable category template |
| Other category landings | `/services/[category]` | Exists | Replace generic legacy template, publish only substantive categories |
| Freelancer search | `/online/freelancers` | Done | Connect filters and result counts to Convex |
| Freelancer profile | `/online/freelancer/[id]` | Done | Complete availability, portfolio and reviews data |
| Projects overview | `/projects` | Done | Connect filters and saved searches |
| Project detail | `/online/project/[id]` | Done | Complete proposal/question flows |
| Service detail | `/online/service/[id]` | Exists | Premium redesign and order states |
| Post a project | `/create-projects` | Done | Persist drafts and validation in Convex |
| Compare freelancers/services | — | Missing | Add shareable comparison page |

### Local product

| Page type | Route | Status | Next action |
| --- | --- | --- | --- |
| Product hub | `/local` | Done | Connect location/category search |
| Professional search | `/local/craftsmen` | Exists | Redesign to match freelancer search quality |
| Professional profile | `/local/craftsman/[id]` | Exists | Add service radius, credentials, insurance and availability |
| Quote requests | `/local/quote-requests` | Exists | Redesign and connect filters |
| Quote request detail | `/local/quote-request/[id]` | Exists | Add scope, photos, appointment and quote states |
| Local category landing | `/local/[category]` | Missing | Reusable landing page for plumbing, heating, electrical, etc. |
| Category + city landing | `/local/[category]/[city]` | Missing | Publish only where supply and unique local information exist |
| Create quote request | — | Missing | Local-specific intake: address area, urgency, photos and visit window |
| Booking / appointment | — | Missing | Calendar, reschedule, arrival and completion states |
| Credentials detail | — | Missing | Explain verified identity, trade qualifications and insurance |

### Jobs product

| Page type | Route | Status | Next action |
| --- | --- | --- | --- |
| Product hub | `/jobs` | Done | Connect search to real job inventory |
| Job search | `/jobs/browse` | Exists | Premium redesign and Convex-backed filters |
| Job detail | `/jobs/job/[id]` | Exists | Redesign, add complete public content and JobPosting data |
| For companies | `/jobs/companies` | Done | Connect plans, demo and employer onboarding |
| Employer profile | — | Missing | Company story, verification, workplace and open jobs |
| Job category landing | `/jobs/category/[slug]` | Missing | Editorial category context plus live vacancies |
| Job location landing | `/jobs/location/[slug]` | Missing | Remote/country/city pages with real inventory |
| Saved jobs / alerts | `/dashboard/saved` partially | Exists | Add public-to-account save flow and alerts |
| Application flow | — | Missing | Apply, screening questions, confirmation and status |
| Employer applicant pipeline | `/manage-jobs` partially | Exists | Role publishing and applicant stages |

### Logged-in marketplace operations

The client dashboard exists and is connected to Convex. Many operational routes also exist, but most still require workflow completion and role-aware design: messages, proposals, orders, invoices, payouts, statements, reviews, saved items, job management, service management and disputes.

The largest missing product type is **separate role-aware dashboard information architecture** for client, freelancer/local professional, candidate, and company users. One account can hold multiple roles, but the dashboard must change tasks and metrics based on the active role.

## Execution plan

### P0 — marketplace foundations

- Completed: replace the three prelaunch pages with reusable product hubs for `/online`, `/local` and `/jobs`.
- Choose canonical URL rules for overlapping legacy routes (`/services` versus `/online/services`, `/projects` versus `/online/projects`).
- Introduce one shared entity model in Convex: category, location, profile/company, listing, engagement and review.
- Finish the primary loop for each product:
  - Online: search → profile/service → proposal/order → workspace → review.
  - Local: search/request → quotes → appointment → completion → review.
  - Jobs: search → public job detail → application → candidate status.

### P1 — supply and conversion pages

- Build the reusable Local category template and the create-quote-request flow.
- Redesign the Jobs browse and job-detail templates; add employer profiles and application flow.
- Turn Webdesign into the reusable Online category system and add the first five categories based on actual demand.
- Build a shared Trust & Safety hub and product-specific verification explanations.

### P2 — retention and marketplace depth

- Role-aware dashboards, saved searches, alerts and favourites.
- Messaging, project/order workspace, attachments and notifications.
- Reviews, disputes, refunds, invoices and payout histories.
- Comparison pages and personalised recommendations.

### P3 — editorial and international expansion

- Consolidate Resources and Blog into one content architecture.
- Add country/language editions only after translation ownership and hreflang QA exist.
- Expand location and category pages only where the marketplace has inventory and unique content.

## SEO plan

### 1. Technical baseline

- Keep all valuable listing detail pages publicly readable; do not require sign-in to view a job description.
- Generate unique server-rendered titles, descriptions, canonicals and social images per hub, category and detail page.
- Maintain `robots.txt` and split sitemaps by page type when inventory grows: static, online services, professionals, projects, local professionals and jobs.
- Include only canonical, indexable URLs in sitemaps; filter drafts, expired content, parameterized search pages and empty category/location pages.
- Add breadcrumbs and semantic headings. Important textual meaning must be present in the DOM, not only inside images.
- Define one canonical URL for duplicate legacy route families before launch.

### 2. Structured data

- `Organization` and `WebSite` on shared public pages.
- `BreadcrumbList` on category and detail pages.
- `Person` or `ProfilePage` for public professional profiles where the visible content supports it.
- `Service` for individual service detail pages; do not invent prices or ratings.
- `JobPosting` only on a single, public job-detail page—not on `/jobs/browse`. Keep `datePosted`, `validThrough`, employer, location/remote status, employment type and salary consistent with visible content.
- Remove or update expired vacancies promptly and notify Google; keep job URLs out of the sitemap once they are no longer canonical/indexable.

### 3. Scalable landing pages without thin content

- Launch a category or category-location page only when it contains meaningful inventory plus unique guidance, price context, trust information and FAQs.
- No automatic indexation of every filter combination. Search/filter parameters should normally canonicalize to the closest useful landing page or be non-indexable.
- Use demand and supply data to choose the first pages. Recommended first clusters:
  - Online: web design, WordPress, SEO, social media, copywriting.
  - Local: plumber, boiler maintenance, air-conditioning service, electrician, carpenter.
  - Jobs: software engineering, marketing, customer support, remote jobs, jobs by launch country/city.

### 4. Content and authority

- Build expert guides that answer pre-transaction questions and link directly to relevant marketplace inventory.
- Add genuine author/reviewer information, updated dates and clear methodology to pricing/safety guides.
- Earn initial links and demand through launch partners, trade associations, local business networks, freelancer communities and employer case studies.

### 5. Measurement and release gates

- Configure Search Console and Bing Webmaster Tools; monitor indexed pages, rich-result errors and query/page performance.
- Track organic landing → search → profile/detail → signup/application/request conversion by product.
- Release new SEO page clusters in small batches. Keep a page only when it has impressions, useful inventory or a clear strategic role.
- QA Core Web Vitals, accessibility, mobile layouts, canonicals, structured data and empty states before indexation.

### Primary references

- Google Search Central, SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central, developer SEO guide: https://developers.google.com/search/docs/fundamentals/get-started-developers
- Google Search Central, JobPosting structured data: https://developers.google.com/search/docs/appearance/structured-data/job-posting
- Google Search Central, sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
