# Beta honesty and broken flows, block 2 — 17 September 2026

Source: `PRODUCTION_READINESS_AUDIT_2026-09-17.md`, section "Fix before inviting beta users".

## Changes

- **Removed template routes**: `/ui-elements` (lorem ipsum) and `/invoices` (hardcoded sample invoice) with their components. `/invoices` was also dropped from the auth proxy so it returns a plain 404.
- **Illustrative project**: `/online/project/demo` and `/online/project/sustainable-interior-brand` (invented client, 12 bids, budget) now exist in development only, matching the freelancer preview. Hardcoded metadata for that slug was removed.
- **Rewards**: the cashback screen (balance, tiers, "earn credits") was deleted and removed from every client navigation. `/dashboard/rewards` stays as an honest "not active during beta" notice so old links do not 404.
- **About page**: claims of identity verification, "only pay for work you approve", 24/7 support, "19+ platforms" and "verified freelancers" were replaced with beta-accurate wording.
- **Terms and Privacy (English and Dutch)**: the sentences that described live Stripe processing, discretionary refunds and "our payment system" now state that no payments are processed during the beta. These are factual corrections and still need the legal review listed in the launch checklist.
- **Hub scenario cards** (Online, Local, Jobs): invented person and company names removed; cards show a role only.
- **Dashboard**: the account menu "Settings" link pointed to a missing route and now opens `/my-profile?tab=settings`; "Verified company" fallback label became "Company"; the "Secure platform" footer badge became "Free private beta".
- **Dashboard error page**: `src/app/(dashboard)/error.jsx` keeps the dashboard shell and navigation when a query throws or an id is malformed.
- **Auth pages**: sign-in and registration now have their own title and `noindex`; registration states that the platform is in private beta and working together is by invitation.
- **Dead code**: `WebDesignCategory` (invented designers, ratings and "Skilllinkup guarantees") was not routed anywhere. The audit listed it as live at `/services/webdesign`; that was incorrect, the route renders the SEO page. The component was deleted rather than rewritten.

## Verification

- `scripts/check-private-beta-copy.mjs` now covers the About components, the role dashboard and the navigation data, forbids the removed claims, asserts that the template routes and rewards screen are gone, that the illustrative project is development-only and that the old legal sentences are absent. It was shown to fail on the previous "Verified company" label and pass on the fix.
- TypeScript, full ESLint and all regression and contract suites pass.
- Browser check on the local server (desktop and 375 px): `/ui-elements` and `/invoices` return 404; About shows the new wording and none of the removed claims; registration has the new title, `noindex` and the beta note; the Online hub shows no invented names; Terms shows the new refund sentence. No horizontal scroll. The only console error is Clerk telemetry being blocked by the existing CSP.
- Not verified in a browser: the signed-in dashboard changes (rewards notice, Settings link, error page, labels). They are covered by code review, lint and type checks only.

## Open question for the product owner

The site says access is by invitation, but the registration form is a standard Clerk sign-up. Whether Clerk is in restricted or invitation mode cannot be seen from the code.

## Release

Frontend-only change. No backend deploy needed.
