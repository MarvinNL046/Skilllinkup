# Security hardening, block 1 — 17 September 2026

Source: `PRODUCTION_READINESS_AUDIT_2026-09-17.md`, section "Fix first". Every item was confirmed in the code before changing it.

## Changes

- **Smoke fixtures** (`convex/marketplace/smoke.ts`): `seed`, `cleanup` and `verifyCleanup` now also require `SMOKE_FIXTURES_ENABLED=true` on the deployment, and `seed` only elevates `skilllinkup.qa+…` addresses to admin or verified company. The flag is set on development only. Production must never set it.
- **Profile extras** (`convex/lib/profileAccess.ts`, `experience.ts`, `portfolio.ts`): work history, education, certificates and portfolio are returned only to the owner, or to anyone when the owner has an active, non-private provider profile. Candidates and private providers no longer expose this data by user id.
- **Application CVs** (`jobApplications.ts`): an employer's CV download and the candidate email and CV link in the applicant list end when the application is withdrawn, rejected or a draft, and require the same workspace. The candidate keeps access. Upload URLs are rate limited and blocked during pending account deletion.
- **Anonymous client listing**: `convex/marketplace/clients.ts` (unauthenticated list plus a statistics query with an invented `countries: 5`), its hook and four unreferenced template components were deleted.
- **Unauthenticated writes**: `tools.insert` and `skills.insert` require the server secret (translation scripts pass it); unused anonymous `comments.create` and `platformReviews.create` were removed; `feedback.submit` requires a signed-in user, validates type, length and rating, and is rate limited.
- **Payout account**: `freelancers.updateStripeAccount` always requires the server secret; a signed-in user can no longer set their own Stripe account id.
- **Conversations**: profile and service enquiries reject private, inactive or other-workspace professionals, new conversations are rate limited, and conversations tied to a rejected or withdrawn application or a closed proposal are read-only.
- **Structured data**: `src/lib/jsonLd.mjs` escapes `<`; the platform and both resource detail pages use it.

## Verification

- New `scripts/check-security-hardening.mjs` (7 groups, real handlers, in-memory data) is part of `test:launch-contracts` and therefore of CI. It caught a real defect during development: the first version of the JSON-LD helper did not escape.
- `check-mvp-foundation.cjs` gained a case for private, inactive and other-workspace professionals.
- TypeScript, full ESLint and all 15 regression and contract suites pass.
- Development backend (accurate-anaconda-993) probed after the push: anonymous feedback is rejected, an anonymous request for the QA candidate's work history returns an empty list, and a signed-in owner cannot set a Stripe account id. No records were created.

## Release

Backend and frontend change. Deploy backend first. Behaviour changes to expect: public provider pages still show experience and portfolio; private profiles and candidates do not. Translation scripts need `INTERNAL_EMAIL_SECRET` in `.env.local`. Smoke seeding against any deployment requires the opt-in flag.

## Still open from the audit's security section

Error monitoring, restoring the minified Convex sources, splitting the shared server secret by purpose, constant-time secret comparison and a nonce-based CSP.
