# Skilllinkup master project plan

Version: 1 August 2026

## Implementation checkpoint — 2 August 2026

- Foundation gates are green: TypeScript, Convex deployment validation and the 68-route production build pass.
- Canonical routes, role-aware onboarding and primary product status machines are implemented.
- Online, Local and Jobs each have a connected private-beta transaction lifecycle rather than presentation-only pages.
- The beta is enforced as free at both UI and server boundaries; paid Checkout and Local credit purchases are feature-gated.
- Current focus: query pagination/contracts, moderation and support recovery, authenticated multi-role browser acceptance and launch operations.
- Detailed evidence and remaining technical risk live in `docs/TECHNICAL_AUDIT.md`.

## 1. Product direction

Skilllinkup becomes one account and one trusted marketplace with three products:

1. **Online** — hire worldwide freelancers, buy services, or publish projects.
2. **Local** — find nearby professionals and request quotes for physical work.
3. **Jobs** — find or publish genuine company vacancies, remote, hybrid, or local.

The three products share identity, profiles, categories, search concepts, messaging, notifications, reviews, payments, and trust. Their transaction flows remain separate because hiring a web designer, booking a heating engineer, and applying for a permanent job are fundamentally different user journeys.

## 2. Recommended launch scope

### Geographic scope

- Online: worldwide from launch, English-first.
- Local: start in the Netherlands with a limited set of cities and trades.
- Jobs: remote roles plus Netherlands-based companies first.
- Add other countries only after supply, moderation, payments, tax, and support processes work reliably.

### Initial category scope

- Online: web design, WordPress, SEO, social media, copywriting.
- Local: plumbing, boiler/heating maintenance, air-conditioning, electrical work, carpentry.
- Jobs: software, design/product, marketing, customer success, operations.

### Core launch promise

Users can find the right person or work, understand why the match is trustworthy, complete the primary action, and track what happens next without leaving Skilllinkup.

## 3. MVP user journeys

### Online

Client: search → profile/service → contact or project → proposal → agreement → workspace → completion → review.

Freelancer: onboarding → profile/service → discovery or invitation → proposal → delivery → payout → review.

### Local

Customer: category/location → professional or quote request → compare quotes → appointment → completion → review.

Professional: onboarding → verification/service radius → receive request → quote → appointment → completion → payout/review.

### Jobs

Candidate: search → public job detail → save/apply → confirmation → application status.

Company: employer onboarding → verified profile → publish job → applicant pipeline → decision/close vacancy.

## 4. Delivery phases

The schedule below is a working sequence, not a fixed promise. Each phase only closes when its exit criteria pass.

### Phase 0 — Stabilise the foundation

Target: 1 week

- Resolve current production build blockers (`sharp`, React Email/Prettier, outdated route config).
- Confirm one canonical URL architecture and redirect duplicate legacy routes.
- Remove or quarantine unused legacy templates and styles.
- Document required environment variables for local, preview, and production.
- Establish automated formatting, linting, type checking, and smoke tests.
- Audit Clerk roles and the Convex auth boundary.
- Define analytics events and consent behaviour.

Exit criteria:

- Production build succeeds from a clean install.
- Core public routes return 200 and dashboard routes enforce authentication.
- No login/onboarding redirect loop.
- One shared header, footer, typography system, and loading pattern.

### Phase 1 — Shared marketplace data model

Target: 1–2 weeks

- Finalise Convex tables and indexes for users, roles, profiles, companies, categories, locations, listings, applications/proposals/quotes, conversations, reviews, favourites, files, and notifications.
- Define status machines for each product instead of loose status strings.
- Add seed data that mirrors realistic product scenarios.
- Create shared permission helpers and server-side validators.
- Add moderation, publish/draft/archive states, and audit fields.

Exit criteria:

- Each MVP journey can be represented without product-specific hacks.
- All writes verify identity, ownership, status transitions, and input shape.
- Seed and cleanup scripts reliably create a complete test marketplace.

### Phase 2 — Finish Online end to end

Target: 2–3 weeks

- Connect online hub, service overview, freelancer search, profiles, and project listings to Convex.
- Finish freelancer onboarding, portfolio, service packages, availability, and rates.
- Finish project creation, proposals, acceptance, and project workspace.
- Add file delivery, milestones, notifications, and reviews.
- Implement payment architecture in test mode; decide platform fee before production.

Exit criteria:

- A new client can publish a project and accept a proposal.
- A freelancer can complete onboarding, respond, deliver, and be reviewed.
- Empty, loading, error, and permission states work on desktop and mobile.

### Phase 3 — Finish Local end to end

Target: 2–3 weeks

- Build premium professional search and profile templates.
- Build reusable trade category pages and initial city/category landing pages.
- Create the local quote-request intake with category, general location, urgency, photos, and visit windows.
- Add service radius, availability, credentials, insurance, quotes, and appointment status.
- Add a local-specific completion and review flow.

Exit criteria:

- A customer can request and compare quotes without exposing a full address publicly.
- A professional only receives relevant requests within their service area.
- Appointment and scope changes leave a clear history.

### Phase 4 — Finish Jobs end to end

Target: 2–3 weeks

- Rebuild job search and job details with live Convex data.
- Add employer profiles, company verification, and job publishing.
- Add candidate profiles, saved jobs, application forms, confirmation, and status tracking.
- Build the employer applicant pipeline.
- Add correct `JobPosting` structured data only to public individual job pages.
- Automatically expire or close vacancies.

Exit criteria:

- A company can publish, manage, and close a verified vacancy.
- A candidate can apply once and track the application.
- Public job details remain readable without authentication and pass rich-result validation.

### Phase 5 — Shared operations and trust

Target: 2 weeks

- Role-aware dashboard navigation and active-role switching.
- Unified messaging with context for project, quote, appointment, or application.
- Notification centre plus transactional email.
- Trust & Safety centre, reporting, dispute, refund, and moderation workflows.
- Invoice, payout, statement, and account deletion/export flows.
- Admin tools for users, listings, verification, disputes, and content.

Exit criteria:

- Every critical marketplace action has an owner, status, notification, and admin recovery path.
- Sensitive actions are audited and permission tested.

### Phase 6 — Launch readiness

Target: 1–2 weeks

- Full responsive and accessibility review.
- Security review of Convex mutations, uploads, webhooks, and Clerk roles.
- Performance and image optimisation.
- Legal review: terms, privacy, cookies, freelancer/local professional/company responsibilities, payments and disputes.
- Search Console, sitemap, robots, canonicals, structured data, and analytics verification.
- Production monitoring, error tracking, backups, rate limits, and support runbook.
- Private beta with a small, manually recruited supply and demand cohort.

Exit criteria:

- Zero unresolved launch-blocking defects.
- Core journeys pass automated smoke tests and manual acceptance tests.
- Supply exists before public demand campaigns start.

## 5. Design workstream

- Maintain one reusable design system for spacing, typography, buttons, cards, forms, tables, badges, loading, empty states, and responsive behaviour.
- Preserve visual differences between Online, Local, and Jobs through content, imagery, accent colour, and product vocabulary—not separate component libraries.
- Complete one reference-quality template per page type before cloning variants.
- Treat form states and dashboard workflows as first-class design, not as leftover screens.
- Run visual QA at 375, 768, 1280, and 1440 pixels for every completed page type.

## 6. Technical architecture decisions

- Next.js App Router for server-rendered public pages and authenticated application routes.
- Convex as source of truth for marketplace data, permissions, realtime updates, and workflows.
- Clerk for identity; application roles and profile completeness remain in Convex.
- Resend/React Email for transactional email after the dependency chain is stabilised.
- Stripe Connect only after money flow, merchant-of-record responsibility, refunds, and country scope are decided.
- Store files behind validated upload rules; never trust client-supplied ownership or MIME type alone.
- Use explicit status transition functions for proposals, quotes, orders, applications, and disputes.

## 7. SEO workstream

SEO begins during implementation, not after the product is finished.

- Phase 0: canonical architecture, robots, sitemap, metadata conventions, analytics.
- Phase 2: Online category pages, freelancer/profile and service structured information.
- Phase 3: Local trade and selected city pages only where unique content and supply exist.
- Phase 4: public job pages with compliant `JobPosting` data and expiry handling.
- Phase 5–6: internal linking, editorial guides, Search Console QA, Core Web Vitals, and indexation monitoring.
- Do not index arbitrary filter combinations, empty landing pages, drafts, expired listings, or duplicate route families.

## 8. Go-to-market plan

### Supply before broad demand

- Recruit the first freelancers, local professionals, and companies manually.
- Offer founding-profile onboarding and hands-on profile completion.
- Seed only genuine, approved profiles and listings; never present fabricated marketplace activity as live inventory.
- Build one concentrated local supply area before advertising nationally.

### Acquisition sequence

1. Founder outreach, LinkedIn, freelancer communities, trade associations, local business networks, and existing contacts.
2. Referral loop for both sides of each marketplace.
3. SEO pages and useful guides around high-intent categories.
4. Small Google Search campaigns for proven high-intent queries.
5. Retargeting via Meta/LinkedIn only after conversion tracking and landing pages are proven.
6. Scale paid acquisition only when activation, fill rate, time-to-response, and retention are healthy.

### Waitlist

Use a segmented waitlist immediately: product, role, category, location, and intended timing. The waitlist is valuable only if it feeds interviews, beta invitations, and supply/demand matching.

## 9. Metrics

### Shared north-star signal

Successful matches that reach the product-specific committed state:

- Online: accepted proposal/order.
- Local: accepted quote/confirmed appointment.
- Jobs: qualified application moved forward by the employer.

### Marketplace health

- Active supply by category/location.
- Search-to-detail and detail-to-action conversion.
- Time to first relevant response.
- Fill/match rate.
- Cancellation, dispute, and no-show rate.
- Repeat client/customer/company rate.
- Freelancer/professional/company activation rate.
- Review completion and satisfaction.

## 10. Main risks and controls

| Risk                                  | Control                                                                          |
| ------------------------------------- | -------------------------------------------------------------------------------- |
| Three products make the MVP too broad | Shared foundation, strict category scope, sequential product completion          |
| Empty marketplace                     | Recruit and onboard supply before broad marketing                                |
| Fake profiles/listings                | Verification, moderation, reporting, publish states, rate limits                 |
| Local trust and liability             | Visible checks, insurance fields, written scope, clear terms and support process |
| Payment complexity                    | Decide legal/payment model before enabling live Stripe transfers                 |
| Thin SEO pages                        | Index only pages with inventory and unique value                                 |
| Role confusion                        | Explicit active role and role-aware onboarding/dashboard                         |
| Legacy code slows delivery            | Stabilisation phase and incremental removal backed by smoke tests                |

## 11. Immediate Sprint 1 backlog

Sprint objective: turn the current attractive prototype into a stable base that can safely receive real data.

1. Fix the clean production build and dependency warnings.
2. Map all duplicate/legacy routes and approve canonical destinations.
3. Audit the current Convex schema, indexes, validators, and auth helpers.
4. Write the three status machines and shared permissions matrix.
5. Define active account roles and onboarding completeness rules.
6. Add a realistic cross-product seed dataset and smoke-test accounts.
7. Connect the Online browse/profile/project loop first.
8. Add automated smoke coverage for anonymous, client, freelancer, professional, candidate, company, and admin roles.

## 12. Decisions required before live transactions

1. First Local launch country and cities.
2. Platform fee model for Online and Local.
3. Whether Skilllinkup holds protected funds or only facilitates direct payment.
4. Verification level required per professional category.
5. Whether Jobs launches free, per vacancy, subscription-based, or hybrid.
6. Which account roles one user may combine.
7. Support and dispute responsibility during the private beta.

## 13. Execution checkpoint — 2 August 2026

The implementation has progressed beyond Sprint 1 while preserving the sequential marketplace strategy.

Completed and verified:

- Production build restored on Next.js 16.2.12; 71 application routes compile.
- ESLint 9 flat-config validation passes with zero warnings, and TypeScript validation passes independently.
- The Convex schema and functions validate successfully against development deployment `accurate-anaconda-993`.
- Canonical routes, legacy redirects, sitemap, robots and protected-route `noindex` rules are in place.
- Clerk identity, explicit account roles, versioned onboarding and Convex authorization are connected.
- Shared status machines and permission checks cover Online projects/orders, Local requests/quotes/appointments and Jobs vacancies/applications.
- Online, Local and Jobs each have a complete private-beta transaction lifecycle and role-aware dashboard surfaces.
- Trust reports, moderation queues, support tickets, disputes, notifications, account export and deletion requests are implemented.
- Production Convex reads are indexed/bounded and high-write public actions have rate limits.
- Upload mutations validate the authoritative Convex storage metadata, file size and approved content type before persisting avatars, covers, portfolio images, resumes or deliverables.
- `/api/health`, branded error boundaries and a private-beta operations runbook now provide the local operational baseline; the health route is deliberately independent of Clerk middleware.
- Private-beta payment creation fails closed; listed prices remain informational until the payment policy gate is approved.
- Public browser acceptance passes at 375, 768, 1280 and 1440 pixels on the homepage and core Online, Local, Jobs, Services and Projects routes.
- A fresh 375/1440 Chromium pass on `/`, `/online`, `/local`, `/jobs` and the branded 404 found no error overlay, unexpected console errors, horizontal overflow or broken images.
- English is now the deterministic default; another locale is used only after an explicit language-switcher choice.
- Analytics is intentionally dormant until a provider, consent configuration and production key are approved.
- A dedicated development QA identity was connected to Clerk and Convex without weakening production authorization boundaries.
- The combined Playwright matrix completed with all 37 scenarios passing. Real Clerk JWTs prove cross-account denials and distinct Online client/freelancer, Local client/professional and Jobs candidate/company lifecycles through cancellation, completion, blind review and terminal-state enforcement. Expired/closed vacancies reject applications, internal HTTP and Convex maintenance boundaries fail closed, payment endpoints remain quarantined, and the dedicated admin JWT positively verifies its protected query. Post-cleanup verification proves all fixtures, child records, reviews, lifecycle notifications and generated records are gone before the smoke secret is rotated.
- Clerk/Next authentication was verified from signed-out redirect through signed-in dashboard, and Convex user synchronization now authorizes by Clerk subject even when the deployment JWT intentionally omits email.
- Preview and production have an executable environment contract, hosted smoke runner, environment-scoped GitHub release gate, release-record template and exact promotion/rollback procedure. The Vercel project is linked, the general Preview scope inherits an isolated development Clerk/Convex contract, and `/api/health` now identifies the exact version, commit and immutable deployment artifact.
- A source-backed admin operations snapshot now reports 30-day demand, response coverage, committed matches, completion, cancellation, median first response and open trust queues across all three products. Its admin authorization and fixture-backed calculations are covered by direct Clerk-JWT acceptance.
- The private-beta KPI contract, segmented cohort plan, daily operations log and English-first support-response library are documented. Human ownership and scheduled cohort activity remain explicit launch gates.

Operational gates still open:

- Keep the verified Preview/Production separation and artifact-specific hosted smoke run green for every release; perform and record a rollback rehearsal with the named release owner.
- Configure Search Console and validate the production sitemap and eligible JobPosting output.
- Connect a hosted error-monitoring/alerting provider to the existing health and error surfaces; local readiness does not replace production alert delivery.
- Keep the scheduled public production monitor green and complete its failure-notification rehearsal with a named owner and backup; synthetic availability does not replace exception monitoring.
- Confirm the Local launch region (current hypothesis: Rotterdam–The Hague) and first supply cohort.
- Name the human owners for support, urgent safety incidents, moderation and daily marketplace operations.
- Obtain legal review of terms, privacy, cookies and marketplace responsibility wording.
- Keep live payments disabled until commissions, protected funds, refunds, VAT/tax, KYC and legal responsibility are explicitly approved.
