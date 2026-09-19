# Reliable credit top-up — 19 September 2026

Scope: the server-side crediting of Local lead credits after a Stripe Checkout session. Payments stay disabled; nothing here enables a purchase. This is a defect repair, not a product decision.

## What was wrong

`leads.addCredits` trusted its caller completely:

- The number of credits came from Stripe session **metadata**, parsed by the webhook, and was credited as given. Zero, negative and fractional values were accepted.
- The Stripe session id was stored but never checked, so a replayed or concurrent webhook delivery credited twice.
- Nothing tied the credits to a payment: not the payment status, the amount, the currency or the package.
- The webhook swallowed every error, so a failed crediting was acknowledged to Stripe and never retried.
- The mutation was not behind the beta payment gate.

## What changed

- **New table `creditPurchases`** with the Stripe session id as idempotency key (`by_stripeSessionId`). It keeps the verified facts: buyer, profile, package, credits, amount in cents, currency and the ledger entry. Additive schema change.
- **`convex/lib/creditPurchases.ts` — `applyCreditPurchase`.** Accepts a package id, never a credit count. It refuses the purchase unless the session id is well formed, the package is known, the session is `paid`, the currency is EUR, the amount equals the package price in cents exactly, and the buyer has a Local professional profile. The session lookup, purchase record, balance change and ledger entry happen inside one mutation.
- **Replay and races.** A session that was already processed for the same buyer and package returns the earlier result with `alreadyProcessed: true` and writes nothing. A session reused for a different buyer or package is refused.
- **`leads.addCredits`** now requires the server secret **and** the live-payments gate, so it is disabled during the private beta like every other money movement.
- **Webhook helper** (the webhook itself stays quarantined with its 503 response). `src/lib/creditPurchaseEvent.mjs` reads the purchase from Stripe's own fields (`payment_status`, `amount_total`, `currency`, `mode`) and ignores any credit count in metadata. A rejected purchase is logged through the structured error log and acknowledged, because it must never be retried into success. Any other failure is rethrown, so the webhook fails and Stripe retries, which is now safe.

## Verification

- `scripts/check-credit-top-up.mjs` (6 groups, real handlers): the gate and the secret; a verified purchase for each package with the recorded facts; five replays crediting nothing; session reuse for another buyer or package; 18 refused variants (unpaid, mispriced including fractions and NaN, wrong currency, unknown package, malformed session id, buyer without a profile) each with zero writes; the session parser and the webhook helper. Part of `test:launch-contracts`.
- **Sensitivity:** eleven safeguards were removed one at a time. Ten made a test fail. The eleventh, an integer check on the amount, was genuinely redundant next to exact equality with a whole-cent package price and was removed.
- **Real concurrency on the development backend.** An in-memory test cannot prove this, so a temporary internal helper (bypassing only the gate) was deployed to development. Eight parallel attempts for one session: one credited, seven reported `alreadyProcessed`, balance 10, one purchase row, one ledger row. Six parallel attempts for a second session: one credited, balance 20. The helper, the temporary profile and all five rows were removed afterwards and the clean backend was republished; the QA account is back to no profile and balance 0.
- The behaviour pin for `leads.ts` was re-recorded deliberately. A comparison before and after shows 62 scenarios unchanged, 7 old top-up scenarios removed and 8 new ones added; no other scenario changed.
- TypeScript, full ESLint and all other suites pass.

## Not covered

No real Stripe event was used: the Stripe connection was unavailable in these sessions and payments are disabled. Before Local credits are sold, run one purchase in Stripe test mode end to end, including a deliberate webhook replay from the Stripe dashboard.

Still open from the same audit: the Checkout route for buying credits does not exist (it returns 503 and its code was removed), credit refunds have no path yet, and lead prices are derived from a free-text budget field.

## Release

Backend (additive table, changed mutation signature) plus one frontend file. Deploy backend first. The only caller of `addCredits` is the quarantined webhook, so the signature change cannot break a live flow. Rollback: revert the frontend and the mutation; the new table can stay.
