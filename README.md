# Skilllinkup

Skilllinkup is an English-first marketplace with three connected products:

- **Online** — hire freelancers worldwide, buy scoped services or publish projects.
- **Local** — request quotes from nearby professionals, initially focused on Rotterdam–The Hague.
- **Jobs** — publish and discover Dutch and remote European company vacancies.

The application uses Next.js App Router, Clerk identity and Convex as the marketplace source of truth. The private beta is free: paid Checkout, credit purchases and real escrow movement are intentionally feature-gated.

## Local setup

Requirements: Node.js 20+, npm and access to the Skilllinkup Clerk and Convex development instances.

1. Copy `.env.example` to `.env.local` and add development credentials.
2. Install dependencies with `npm install`.
3. Validate and push Convex functions with:

   ```powershell
   $env:CONVEX_AGENT_MODE='anonymous'
   npx convex dev --once
   ```

4. Start the shared development server:

   ```powershell
   npm run dev -- -p 3010
   ```

5. Open [http://localhost:3010](http://localhost:3010).

Never commit `.env.local`, Clerk secrets, Convex deployment credentials or generated smoke fixture IDs.

## Verification

Run the same foundation gates before handing work over:

```powershell
npx tsc --noEmit
$env:CONVEX_AGENT_MODE='anonymous'; npx convex dev --once
npm run build
```

Authenticated end-to-end tests require dedicated Clerk test accounts and `INTERNAL_EMAIL_SECRET`:

```powershell
npm run e2e:provision
npm run e2e:seed
npm run e2e:smoke
npm run e2e:cleanup
```

`e2e:provision` refuses non-development Clerk keys and creates five isolated marketplace, Local-client, Jobs-company, admin and outsider QA identities. Seed and cleanup must always be paired. The scripts fail closed when the internal server secret is missing; cleanup restores temporary admin state, removes seeded and Playwright-generated records, and runs a server-side zero-residue verification before deleting the manifest.

Before a hosted release, validate the environment separation and then the deployed candidate:

```powershell
npm run env:verify -- --environment=preview
npm run release:verify-hosted -- --base-url=https://your-preview-url.vercel.app
```

Production requires Clerk live keys and a Convex `prod:` deployment; Preview requires isolated Clerk test keys and a Convex `dev:` deployment. The hosted verifier also proves that private-beta payment routes remain quarantined and internal endpoints reject forged credentials.

## Canonical product routes

- `/online`, `/services`, `/online/freelancers`, `/projects`
- `/local`, `/local/craftsmen`, `/local/quote-requests`, `/local/request-quote`
- `/jobs`, `/jobs/browse`, `/jobs/companies`
- `/dashboard` plus role-aware workflow routes
- `/admin/disputes` and `/admin/trust` for recovery operations

The complete alias and redirect policy is in `docs/CANONICAL_ROUTE_MAP.md`.

## Private-beta rules

- Online service packages and accepted proposals create `beta_no_payment` workspaces.
- Local leads cost zero credits and accepted quotes create appointment workspaces.
- Jobs applications never require payment.
- `/api/stripe/checkout` and `/api/stripe/credits` return `503 PRIVATE_BETA_FREE`.
- Listed prices are scope references used to validate future pricing.

Do not enable live Stripe flows until commission, protected-payment structure, refunds, VAT/tax, merchant responsibility, dispute responsibility and country scope are approved.

## Project documentation

- `docs/MASTER_PROJECT_PLAN.md` — product strategy and phased delivery plan.
- `docs/TECHNICAL_AUDIT.md` — verified state, resolved risks and remaining engineering work.
- `docs/product-page-inventory-and-seo-roadmap.md` — page inventory and SEO sequence.
- `docs/PRIVATE_BETA_LAUNCH_CHECKLIST.md` — operational release gates.
- `docs/PRIVATE_BETA_KPI_CONTRACT.md` — metric definitions, targets and stop conditions.
- `docs/PRIVATE_BETA_COHORT_PLAN.md` — phased supply-first cohort design.
- `docs/PRIVATE_BETA_OPERATIONS_RUNBOOK.md` — daily operation, incident and rollback procedure.
- `docs/BETA_OPERATIONS_LOG_TEMPLATE.md` — privacy-safe daily and weekly operating record.
- `docs/SUPPORT_RESPONSE_TEMPLATES.md` — English-first support and safety responses.
- `docs/MASTER_PLAN_COMPLETION_AUDIT.md` — requirement-by-requirement completion evidence and open gates.

## Architecture guardrails

- Clerk identifies users; Convex stores roles, permissions and product state.
- Authorize by Clerk subject/Convex user ID, never by a client-provided email.
- Use indexed and bounded Convex reads; growing directories must paginate.
- Every product mutation validates ownership and a server-side status transition.
- Store new files as Convex storage IDs and resolve URLs at read time.
- Preserve the shared premium light-theme design system and reusable components.
