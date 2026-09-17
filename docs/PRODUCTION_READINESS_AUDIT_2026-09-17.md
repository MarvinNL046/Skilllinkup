# Production-readiness audit — 17 September 2026

Scope: automated checks, live public site (desktop and 375 px), code audit of the authenticated dashboard, and code audit of the public site plus API/Convex security. Code inspection only for the dashboard: no signed-in browser session was available. Live release at audit time: commit 617323e6.

## Passing

TypeScript, full ESLint, 15 regression and contract suites, hosted SEO check on production, zero vulnerabilities in production dependencies. 15 core public pages return 200 with unique title, description and canonical, no console errors, no horizontal scroll at 375 px. Payment creation is disabled server-side on every path found. User, notification and admin queries are properly protected. Redirect handling blocks open redirects. Blog HTML is sanitized. Dashboard routes are noindex; newer Jobs screens use shared dialogs, busy locks and optimistic concurrency.

## Fix first — security and data exposure

1. `convex/marketplace/smoke.ts` `seed` (:119) and `cleanup` (:915) are public mutations gated only by the shared secret, deployed to production. Seed can grant `role: "admin"` and company verification; cleanup hard-deletes by client-supplied id. Make them internal or non-production only.
2. `experience.ts:57,142,230` and `portfolio.ts:85` return CV-style data for any user id without auth or visibility check, including candidates who did not opt in.
3. `jobApplications.ts:256` lets an employer download a CV after the application was withdrawn or rejected.
4. `clients.ts:6,23` lists every client anonymously and scans up to 10,000 rows per call; `getMarketplaceStats` hardcodes `countries: 5`.
5. Unauthenticated writes without rate limit or length caps: `tools.ts:107`, `skills.ts:24`, `comments.ts:46`, `platformReviews.ts:81`, `feedback.ts:6`.
6. `freelancers.ts:341` lets a signed-in user set their own Stripe account id. Dormant, but it sits on the payout path; require the server secret before Stripe work starts.
7. `chat/conversations.ts:60-72` skips profile visibility and has no rate limit; messaging continues after a rejection (`messages.ts:121`).
8. `platforms/[slug]/page.jsx:63` injects the URL slug into JSON-LD without escaping `<`, and the page never 404s. Same at the two `resources/[slug]` pages. Exploitability not tested.
9. No error monitoring anywhere (no Sentry or equivalent); error pages only `console.error`.
10. Several Convex files are committed in minified form (orders, projects, gigs, quotes, leads, disputes, freelancers, reviews, dashboard, clients, chat/conversations). Auth logic there is hard to review. Restore readable sources before building payments on top.

## Fix before inviting beta users — honesty and broken flows

11. Rewards page shows a live cashback program with tiers and a EUR balance, linked in every client navigation (`RewardsInfo.jsx`, `src/data/dashboard.js:63-73`).
12. Admin disputes: one-click "Release to Freelancer" / "Refund Client" with money wording, no confirmation, `alert()` errors (`AdminDisputeList.jsx`).
13. Live fake content: `/online/project/demo` (client "Greenhaus Living", 12 bids), invented profiles and "Skilllinkup guarantees" on `/services/webdesign`, template `/ui-elements` page with lorem ipsum, template `/invoices` page.
14. About page claims identity verification, "only pay for work you approve", 24/7 support, "19+ platforms". Terms and Privacy still describe live Stripe payments and refunds (`messages/en.json:513,572,574`).
15. Registration looks open while the site says access is by invitation. Confirm the Clerk sign-up mode.
16. Header account menu "Settings" links to `/dashboard/settings`, which does not exist.
17. No `error.jsx` under `(dashboard)`: a throwing query or malformed id replaces the whole shell. `/projects/[id]` throws for non-owners and is not covered by the auth proxy matcher.
18. Manage Services shows an endless loader when the freelancer profile is null.
19. Irreversible actions without the shared dialog: cancel appointment, mark service complete, remove deliverable, request account deletion; service/experience/portfolio delete use `window.confirm`.
20. Role-specific routes without `AccountModeGuard`: credits, proposal, projects/[id], reviews, rewards.
21. ExperienceTab edit/delete controls are unfocusable `<a>` icons without labels; portfolio shows grey placeholders instead of thumbnails.
22. "Verified company" fallback label for unnamed companies (`RoleDashboardInfo.jsx:150`); "Secure platform" badge without a stated policy.
23. Blog posts are client-rendered with no per-post metadata yet sit in the sitemap; detail pages return soft 404s.
24. Auto-blog pipeline publishes even when its own fact check says high risk (dormant today).

## Performance and polish

Multi-megabyte home images with `unoptimized`; about 1 MB legacy template CSS and FontAwesome Pro on every page; full 108 KB translation file shipped to every page; focus outlines removed in several modules; skip link targets the whole page; login/register without title, h1 or noindex and a robots rule that does not match; brand colours redefined locally in six modules and hundreds of hardcoded hex values; about 44 raw template buttons on public pages; 24 orphaned template components and mock data with fake numbers; lists capped at 50 without hint; mixed hardcoded English next to translations; non-constant-time secret comparison and one secret reused for many purposes; permissive CSP.

## Not covered

Signed-in browser pass of the dashboard at desktop and mobile. Deep review of the minified Convex mutation bodies. `messages/nl.json` parity. Long-form SEO content. Live Convex data for seeded fake records. Lighthouse and real response-header checks.
