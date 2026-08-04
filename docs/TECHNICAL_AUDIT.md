# Skilllinkup technical audit

Last updated: 2 August 2026

Scope: technical foundation, canonical routing, Convex domain model, authentication, product workflows, private-beta policy and test readiness.

## Verified baseline

- `npx tsc --noEmit` passes.
- `CONVEX_AGENT_MODE=anonymous npx convex dev --once` pushes successfully to the configured development deployment.
- `npm run build` succeeds on Next.js 16.2.12 and generates 71 application routes.
- The development server remains available on `http://localhost:3010` and returns HTTP 200.
- Chromium acceptance passes on `/`, `/online`, `/local`, `/jobs`, `/services`, `/projects` and `/services/webdesign` at 375, 768, 1280 and 1440 pixels: no console errors, horizontal overflow, broken images or duplicate `main` landmarks.
- Next.js request interception uses `src/proxy.ts`.
- Resend and Stripe integrations fail closed when their configuration is absent.
- Paid Checkout and Local credit purchases are explicitly disabled during the free private beta.

## Resolved critical findings

### Roles, onboarding and identity

- Marketplace account roles are explicit literals: client, freelancer, local professional, candidate and company.
- `activeRole`, `accountRoles`, `preferredWorld` and versioned onboarding rules are validated server-side.
- Clerk subject IDs are the primary identity key. Marketplace code no longer authorizes by client-provided email.
- Role-aware dashboard navigation and active-role switching are connected.

### Domain status machines

- Explicit validators and transition maps exist for projects, proposals, orders, quote requests, quotes, Local appointments, jobs and applications.
- Schema status fields for all primary transaction aggregates now use literal validators.
- Order, escrow, milestone, transaction, dispute and freelancer-profile statuses are no longer free strings.

### Product lifecycles

- Online supports project creation, proposals, acceptance, private workspace, chat, deliverables, revisions, completion and reviews.
- Service-package purchases now start an authenticated free-beta order directly and open a workspace; they no longer depend on Stripe Checkout.
- Local supports request creation, free beta claiming, quotes, acceptance, appointment state, workspace, completion and review.
- Jobs supports vacancy creation, public details, one application per candidate, candidate tracking and an employer applicant pipeline.
- Core actions create in-app notifications for the affected counterparty.
- Online, Local and Jobs lifecycle emails use the same action events, respect per-user notification preferences and record an idempotent delivery audit with provider message IDs and bounded retries.

### Routes and builds

- Canonical product routes and legacy redirects are documented in `docs/CANONICAL_ROUTE_MAP.md`.
- Duplicate sitemap and robots implementations were consolidated.
- Production build blockers and the previous login/onboarding loop were repaired.
- ESLint 9 flat configuration, TypeScript and the 71-route production build pass independently.
- The Clerk proxy now runs only on authenticated surfaces, login/register and protected APIs; public marketplace pages and `/api/health` are not forced through the auth middleware.
- A no-store `/api/health` endpoint, branded 404 and reusable page/global error states provide operational diagnostics without exposing secrets.

## Completed P1 engineering work

These items are not current build blockers, but must close before public launch.

### Query scale and bounded reads

- Production Convex queries no longer use unbounded `.collect()` reads.
- Public directories, child-relation reads, aggregate views and admin queues use indexes plus explicit result caps.
- New indexes cover locale, status and tenant access paths used by categories, comments, reviews, tools, ads and skills.
- High-write public actions are rate limited for waitlist joins, applications, proposals, Local requests/quotes, reports, tickets and chat messages.

### API contracts and legacy data shapes

- Add `returns` validators whenever remaining legacy Convex functions are touched.
- Replace legacy `v.any()` fields for attachments, evidence, metadata and SEO payloads with explicit objects.
- Standardise new uploads on Convex storage IDs plus validated file metadata; arbitrary URL fields remain migration-only compatibility fields.
- New avatar, cover, portfolio, resume and deliverable writes validate actual `_storage` metadata server-side, including approved MIME types and product-specific size limits.

### Trust, moderation and privacy

- Disputes, reviews, listing reports and support tickets are permission checked and have an admin recovery queue.
- Admin decisions create durable audit events and user notifications.
- Authenticated account export and deletion-request flows are implemented.
- The admin Trust & Safety centre exposes recent transactional delivery status and failures without granting public access to recipient data.

## Remaining P1 launch work

### Automated acceptance

- Cross-product seed and cleanup functions exist, along with Playwright role and workflow coverage.
- Five isolated development Clerk QA identities cover the marketplace actor, Local client, Jobs company, admin and unrelated outsider without weakening production authorization.
- The combined authenticated and integration run completed with 37 passing scenarios and no skipped cases. It verifies protected-route redirects, all role workspaces, distinct parties for Online, Local and Jobs, a separate admin identity, complete lifecycle transitions, vacancy publishing, messaging/workspaces, project CRUD, payment quarantine, fail-closed internal endpoints and route-level plus direct Convex authorization boundaries.
- Keyboard acceptance now covers the mobile professional-filter dialog, project-table edit dialog and deep Online/Local workspace controls. Focus is trapped while dialogs are open, restored to the originating action on close and visibly indicated on raw workspace controls.
- Smoke cleanup now sweeps browser-generated projects and vacancies for every allowlisted QA actor, including after an interrupted run; verification aggregates all actor-owned generated records before reporting success.
- Seeded fixtures were removed with the server-secret-protected cleanup mutation. Its post-cleanup query proved zero fixture records, child messages, deliverables, lifecycle notifications and generated Playwright records, and confirmed the temporary admin was restored to `author`; the development secret was then rotated.
- Direct Clerk-JWT authorization rejects outsider project update/cancel, private-order reads and lifecycle mutations, deliverable upload URLs, employer applicant reads, order conversation/message access, unrelated support-ticket links, role escalation, admin queries and Local appointment/quote/lead mutations. Distinct Online identities prove delivery through blind review; distinct Local identities prove rescheduling, cancellation, completion and blind review; distinct Jobs identities prove hiring, withdrawal, vacancy lifecycle and expired/closed application rejection.
- Public responsive acceptance is complete at 375, 768, 1280 and 1440 pixels.

### Dependency audit

- Runtime and development dependencies were updated, including Next.js 16.2.12 and Swiper 14.0.7.
- `npm audit` reports three high advisories inherited by Next.js through its bundled PostCSS and Sharp versions.
- npm proposes Next.js 9.3.3 as the only automated remediation; that breaking downgrade is invalid and was not applied.
- Re-check these upstream advisories whenever Next.js publishes a patched stable release.
- Analytics is intentionally not loaded in the private beta runtime. Consent UI remains, but no PostHog or Google Tag Manager script is bundled or requested.
- Hosted readiness is repository-enforced: environment validation rejects mixed Clerk/Convex modes and weak or duplicated internal secrets; the hosted verifier checks core routes, health, payment quarantine and internal credential boundaries, including protected previews through an automation-bypass secret. A manual GitHub Environment workflow runs the same gate without committing secrets.
- `marketplace/operations:getSnapshot` provides a bounded, tenant-aware 30-day source-of-truth view for beta demand, response coverage, committed matches, completion, cancellation, median first response and trust queues. It is admin-only; direct Clerk-JWT tests prove both denial and positive access, and the Trust & Safety UI renders the result.

## Payments policy gate

Private beta remains payment-free:

- Online and Local orders store `escrowStatus: beta_no_payment`.
- Local lead claims cost zero credits.
- Credit-purchase and paid-checkout endpoints return `503 PRIVATE_BETA_FREE`.
- Listed prices remain visible only as scope and pricing feedback.

Live payments may only be enabled after commission, protected-payment or escrow structure, refunds, tax/VAT, merchant responsibility, dispute responsibility and launch countries are approved. Stripe code remains quarantined for later test-mode integration and must not be treated as launch-ready.

## Foundation acceptance evidence

| Requirement                               | Evidence                                              | Status                                                                                              |
| ----------------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Clean production build                    | Next.js 16.2.12 build, 71 routes                      | Passed                                                                                              |
| Type safety                               | `npx tsc --noEmit`                                    | Passed                                                                                              |
| Static lint                               | `npm run lint` with zero warnings                     | Passed                                                                                              |
| Convex schema/function deployment         | `npx convex dev --once`                               | Passed                                                                                              |
| Runtime health endpoint                   | `/api/health` HTTP 200 with no-store response         | Passed locally                                                                                      |
| Canonical route plan                      | `docs/CANONICAL_ROUTE_MAP.md`                         | Passed                                                                                              |
| Deterministic Clerk-to-Convex identity    | shared subject-based auth helpers                     | Passed                                                                                              |
| Explicit roles and primary state machines | schema plus `convex/lib/marketplaceState.ts`          | Passed                                                                                              |
| Realistic cross-product fixtures          | `convex/marketplace/smoke.ts`                         | Passed; secret-protected seed/cleanup also removes generated QA records                             |
| All production reads bounded/indexed      | repository query audit; no active `.collect()` calls  | Passed                                                                                              |
| Public responsive/browser matrix          | Chromium at 375, 768, 1280 and 1440 px                | Passed                                                                                              |
| Branded runtime failure surfaces          | custom 404 plus page/global error boundaries          | Passed locally                                                                                      |
| Full role/browser and integration suite   | `e2e/smoke.spec.ts`, `e2e/security-endpoints.spec.ts` | 37 passed; distinct Online, Local and Jobs parties plus route-, mutation- and secret-boundary cases |

## Next engineering sequence

1. Complete preview-environment deployment, monitoring, rollback and hosted smoke verification.
2. Add explicit `returns` validators and replace remaining migration-only `v.any()` data shapes as those legacy modules are touched.
3. Prepare preview deployment, error monitoring, rollback and beta cohort operations.
4. Complete legal review and record the free-beta product-owner go/no-go.
