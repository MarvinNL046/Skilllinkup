# Error reporting and readable Convex sources, block 4 (part 1) — 17 September 2026

Source: `PRODUCTION_READINESS_AUDIT_2026-09-17.md`: "No error monitoring anywhere" and "Several Convex source files are committed in minified form".

## Error reporting

Synthetic uptime monitoring already existed (`PRODUCTION_MONITORING_RUNBOOK.md`). What was missing is a record of real errors. No vendor was chosen yet, so this is vendor-neutral and needs no new account or key:

- `src/instrumentation.js` — `onRequestError` writes every server-side error (rendering, route handlers, server actions, proxy) as one structured log line.
- `src/instrumentation-client.js` — reports uncaught browser errors and unhandled promise rejections.
- `src/app/error.jsx`, `src/app/global-error.jsx`, `src/app/(dashboard)/error.jsx` — report errors caught by the React boundaries.
- `src/app/api/monitoring/client-error/route.js` — same-origin only, 8 KB limit, per-client throttle, stores nothing, returns 204.
- `src/lib/errorReport.mjs` — shared sanitiser. A report contains message, stack, route path, source, release commit and environment. It never contains query strings, headers, cookies or request bodies, and masks email addresses, long tokens and phone numbers.

**Where to look:** Vercel → project → Logs, search for `[skilllinkup-error]`. Each line is JSON with `kind` (`client` or `server`), `path`, `source`, `commit` and `environment`.

**Adding Sentry or similar later:** forward from `formatErrorLog` callers or attach a log drain that matches the prefix. Callers do not change.

## Readable Convex sources

`convex/marketplace/disputes.ts` was rewritten from minified output (single-letter bindings, comma expressions) into readable code with named values and comments. Behaviour is unchanged and pinned:

- `scripts/check-readable-convex.mjs` runs the real handlers against in-memory data with a fixed clock and records every result, write, scheduled job, notification and error.
- The recording in `scripts/data/readable-convex-golden.json` was made from the **original minified file** (32 scenarios covering `list`, `getByOrder`, `open` and `resolve`, including authorisation failures, server-secret paths, missing tenants, beta outcomes and the blocked paid-order path).
- The readable file reproduces all 32 scenarios exactly. The check was shown to fail when two behaviour changes were injected.
- The check also fails if single-letter minified bindings reappear.

`orders.ts` followed on 19 September 2026 (108 scenarios, including paid paths opened inside the harness only). `freelancers.ts` followed the same day (77 scenarios). Remaining minified files, in proposed order: `quotes.ts`, `leads.ts`, `gigs.ts`, `projects.ts`, `reviews.ts`, `dashboard.ts`, `chat/conversations.ts`. Each gets its own recording before it is rewritten. `smoke.ts` is test tooling and comes last.

## Verification

- `scripts/check-error-reporting.mjs` (3 groups): sanitiser bounds and masking, the real route handler (accepts same-origin, rejects foreign origin, malformed, oversized and flooding requests), and that every boundary and both instrumentation hooks are wired. Part of `test:launch-contracts`.
- `scripts/check-readable-convex.mjs` (32 scenarios). Part of `test:launch-contracts`.
- TypeScript, full ESLint and all other suites pass.
- Local server, real browser: an uncaught error and an unhandled rejection thrown on `/pricing?ref=qa-secret` each produced a `204` report and a log line with `path: "/pricing"`, the email address masked and the query string absent. A foreign-origin POST returned `403`.
- Development backend accepted the rewritten module.

## Release

Frontend plus one behaviour-identical backend file. Deploy backend first.
