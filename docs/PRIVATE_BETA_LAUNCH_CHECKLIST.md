# Skilllinkup private-beta launch checklist

Owner: product/engineering

Launch mode: free, invite-only, English-first

Local hypothesis: Rotterdam–The Hague

Jobs hypothesis: Dutch employers plus remote European roles

No box may be inferred from a green build alone. Attach the concrete test, screenshot, log or decision document that proves each gate.

## Verification snapshot — 2 August 2026

- `npm run build`: passed on Next.js 16.2.12, 71 routes.
- `npx tsc --noEmit`: passed.
- `npm run lint`: passed with ESLint 9 and zero warnings.
- `npx convex dev --once`: passed against `accurate-anaconda-993` on 2 August 2026.
- `/api/health`: returned HTTP 200 with Convex and Clerk configuration checks; it bypasses Clerk middleware so uptime checks do not depend on an authentication request.
- Branded 404 and global/page error boundaries render without a framework error overlay.
- Public Chromium matrix: `/`, `/online`, `/local`, `/jobs`, `/services`, `/projects` and `/services/webdesign` passed at 375, 768, 1280 and 1440 pixels without console errors, overflow, broken images or duplicate `main` landmarks.
- Fresh Chromium regression at 375 and 1440 pixels passed on `/`, `/online`, `/local`, `/jobs` and the branded 404 with meaningful content, no unexpected console errors, no overflow and no broken images.
- Policy pages: homepage, Pricing, FAQ, Privacy and Terms passed mobile Chromium checks and contain no old 3.5%/active-escrow claims.
- Payment gate: Checkout, credit purchases, Stripe Connect and its callback return `503 PRIVATE_BETA_FREE`.
- Analytics gate: no PostHog or Google Tag Manager runtime request is present.
- Clerk key validation: the configured test publishable/secret keys resolve to development instance `ins_3A7tnjbJAw48DupvnbjXEafyI6V`.
- Combined Clerk/Convex and integration acceptance completed against the development environment: all 37 scenarios passed. Coverage includes signed-out protection, all marketplace roles, distinct Online client/freelancer, Local client/professional and Jobs candidate/company identities, a separate admin identity, full lifecycle transitions, company vacancy publishing, private workspaces/messages, project CRUD, fail-closed internal endpoints, payment quarantine and direct Clerk-JWT authorization checks.
- The smoke dataset is removed through the secret-protected cleanup mutation after verification. Its server-side post-cleanup audit proves zero fixture records, child messages, deliverables, reviews, lifecycle notifications and generated Playwright records, plus restoration of the admin role; the development smoke secret is rotated afterwards.
- The admin-only 30-day marketplace-health snapshot is source-backed by Convex and exposes demand, response coverage, committed matches, completion/cancellation, median first response and open trust queues. Direct JWT tests prove outsider denial and admin access; the admin browser surface is asserted separately.
- Upload security is enforced from authoritative Convex storage metadata. A real multi-account storage test proves cross-account storage-ID replay is rejected, disallowed resume MIME types and files over 10 MB are rejected, and owner deletion removes both the storage object and its ownership record. Post-test cleanup reports zero smoke fixtures and an empty `fileAssets` table.

## 1. Environment and deployment

- [ ] Preview and production projects use separate Clerk and Convex instances.
- [ ] `NEXT_PUBLIC_SITE_URL`, Clerk keys and Convex URLs point to the same environment.
- [ ] Clerk JWT issuer is configured in both Convex deployments.
- [ ] `INTERNAL_EMAIL_SECRET`, Resend and cron secrets exist only server-side.
- [ ] Production contains no smoke accounts or fabricated marketplace inventory.
- [x] `npx tsc --noEmit`, Convex deployment validation and `npm run build` pass on the current working tree. A separate clean-install preview check remains part of deployment sign-off.
- [x] Preview promotion and rollback procedure, exact verification commands and a release-record template are documented. The concrete last-known-good deployment remains mandatory per hosted release.

## 2. Product acceptance

### Online

- [x] Client can open seeded service/project details and the intended proposal surface; public search/browse was covered separately by responsive Chromium QA.
- [ ] Client publishes a project; freelancer submits one proposal; client accepts it.
- [ ] Service-package CTA creates a free beta order without Stripe.
- [x] Authenticated project create/edit/cancel and private workspace messaging/deliverable rendering pass automated browser acceptance. Distinct client and freelancer JWTs prove delivery, revision, redelivery, approval, terminal-state rejection and two-sided blind reviews.
- [ ] Neither party sees a misleading payment, payout or escrow promise.

### Local

- [ ] Customer creates a quote request without exposing a full address publicly.
- [ ] Matching professional claims it for zero credits and submits a quote.
- [x] The accepted-quote appointment workspace renders for distinct authenticated Local client and professional identities, with role-appropriate controls.
- [x] Client rescheduling and cancellation plus professional confirmation, start and completion are permission tested, including synchronized request/order state, terminal-state rejection and two-sided blind reviews after completion.
- [ ] Initial categories are limited to plumbing, heating/boiler, air conditioning, electrical and carpentry.

### Jobs

- [x] Company publishes a vacancy and is routed into its applicant pipeline. Distinct company JWT coverage proves pause, reopen and fill transitions plus terminal-state rejection.
- [x] Seeded candidate applications render in the authenticated pipeline, and a distinct candidate JWT proves withdrawal plus terminal-state enforcement.
- [x] A distinct employer JWT moves an application through screening, interview, offer and hire; candidate/employer permission inversion is rejected.
- [x] Expired and closed vacancies reject new applications at the Convex boundary. Indexable-feed eligibility remains part of production SEO verification.
- [x] Public job details expose `JobPosting` structured data only while status is open and the deadline has not expired; ineligible details are `noindex`, and the public Jobs query/sitemap excludes expired vacancies.

## 3. Roles and security

- [x] Anonymous, client, freelancer, local professional, candidate, company and a separate admin identity pass the browser smoke matrix.
- [x] Direct Clerk-JWT tests prove cross-account denial for project update/cancel, order reads, applicant pipelines, order conversations/messages, deliverable upload URLs, support-ticket order links, Local appointment reads/rescheduling/status, quote acceptance/submission and lead claims.
- [x] Active-role switching cannot grant a role that is absent from `accountRoles`; this is verified directly against Convex with the outsider identity.
- [x] The Trust & Safety admin surface denies a normal account and loads its protected Convex queues only for the separate temporary admin QA identity.
- [x] Upload size, ownership and content-type rules are verified for avatars, covers, portfolio images, resumes and deliverables. Legacy arbitrary chat-file URLs fail closed until chat uses the protected storage flow.
- [x] Stripe creation/webhook routes remain quarantined with `503 PRIVATE_BETA_FREE`; email, cron, pipeline and secret-protected Convex maintenance endpoints reject missing, `undefined` and forged credentials.
- [x] Rate limits exist for waitlist joins, applications, proposals, Local requests/quotes, reports, tickets and chat messages.

## 4. Trust, privacy and support

- [x] Report actions exist on Online freelancer, service and project details, Local quote-request details and Jobs details.
- [x] Trust & Safety can review reports, support tickets and disputes; report and ticket state changes require an admin and create durable audit events.
- [x] Users receive an in-app notification when an admin resolves their report or updates their ticket.
- [x] Data export is generated from the authenticated Convex identity and queries only that account's owned/participating records.
- [x] Account deletion request and cancellation are implemented; legal-retention review and Clerk deletion are documented as required manual closeout steps.
- [ ] Urgent safety escalation has a named human owner and response target.
- [ ] Terms, privacy, cookies and marketplace responsibilities have legal review.

## 5. Responsive and accessibility QA

- [ ] Reference page types are checked at 375, 768, 1280 and 1440 pixels.
- [ ] Navigation, forms, tables, modals, filters and workspaces remain usable with keyboard only.
- [ ] Focus states, dialog labels, form errors and loading states are perceivable.
- [ ] Body text meets the agreed readable size and colour contrast target.
- [ ] Images have useful alt text or empty alt text when decorative.
- [ ] Reduced-motion preference is respected.

## 6. SEO and analytics

- [ ] Canonicals, sitemap and robots expose only approved public routes.
- [ ] Dashboard, admin, application, quote-request and workspace pages are `noindex`.
- [ ] No arbitrary search/filter URLs or empty city/category pages are indexable.
- [ ] Search Console domain verification and sitemap submission are complete.
- [ ] Consent controls analytics; rejection prevents non-essential tracking.
- [ ] Events cover search, detail view, primary action, committed match and completion per product.
- [ ] Monitoring captures server errors, Convex failures and critical client exceptions without personal data.

Release tooling now fails closed before promotion: `npm run env:verify -- --environment=preview|production` validates URL, Clerk-mode, Convex-mode and secret separation; `npm run release:verify-hosted -- --base-url=<url>` validates public routes, health, payment quarantine and forged-secret rejection. The manual GitHub `Release readiness` workflow runs the same contract against environment-scoped variables and secrets.

## 7. Cohort and operations

- [x] Beta cohort is segmented by product, role, category and location in `PRIVATE_BETA_COHORT_PLAN.md`.
- [ ] Supply is manually verified before demand invitations are sent.
- [ ] A daily owner reviews unmatched requests, unanswered proposals, stalled applications and safety queues.
- [ ] English-first support response templates are ready; named escalation contacts remain required in the ownership roster.
- [ ] Feedback interviews and weekly marketplace-health review are scheduled.
- [ ] Launch metrics, source fields, provisional targets and stop conditions are defined in `PRIVATE_BETA_KPI_CONTRACT.md`; a named accountable owner remains required.

## 8. Payment policy gate — intentionally open

The private beta may launch while this section is open because payment creation is disabled server-side. Public paid launch may not proceed until all are decided:

- [ ] Online and Local commission model.
- [ ] Protected-payment/escrow provider and regulated responsibility.
- [ ] Refund, cancellation, chargeback and dispute rules.
- [ ] VAT/tax invoices and merchant-of-record responsibility.
- [ ] Stripe Connect country availability, KYC and payout timing.
- [ ] Contract wording and customer-support responsibility.

## Release decision

- [ ] Product owner signs off product scope and cohort.
- [ ] Engineering signs off security, tests, monitoring and rollback.
- [ ] Operations signs off support, moderation and incident ownership.
- [ ] Legal/payment owner confirms free-beta wording and prohibited payment promises.
- [ ] Final go/no-go decision and timestamp are recorded here.
