# Prod-Ready Checkout Wiring Design

**Goal:** Get the SkillLinkup gig-purchase flow end-to-end working in production. The escrow backend (per `2026-03-05-stripe-escrow-design.md`) is shipped and webhook-verified. The buyer-facing UI is not wired to it.

**Approach:** Wire the missing front-end calls, fix four route-group URL bugs, add a manual dispute button, and configure Stripe on Vercel production with test keys (live keys deferred until the flow is proven).

**Tech stack:** Existing — Next.js 16 App Router, Convex, Clerk, Stripe v20.4.0, `react-stickynode` UI primitives.

---

## Out of scope (do NOT do in this iteration)

- Standalone order detail page (the `OrderCard` is sufficient for now)
- Confirmation modal before clicking Order (the Stripe Checkout page itself is the confirmation)
- Refactoring the heroStats UI on the gig page
- Live-mode Stripe keys (deferred until preview test is green)

---

## Buyer flow — gig purchase

```
ServiceDetails3 (gig page)
  ├── packagePicker (new tabbed UI: Basic | Standard | Premium)
  └── "Order package" button
        └── POST /api/stripe/checkout { gigId, packageId, gigTitle, packageTitle, price, currency, freelancerStripeAccountId }
              └── stripe.checkout.sessions.create  (returns Stripe URL)
                    └── window.location.href = url
                          └── Stripe Checkout (4242…)
                                └── success_url: /orders?success=true&session_id=…   ← FIXED
```

### Package picker

Render `data.packages` as a tabbed selector under the existing hero block. Active tab shows: title, price, delivery days, revisions, feature list, **Order** button.

Acceptance: at least one package must exist on the gig (otherwise the picker is hidden and an inline "No packages available yet" notice is shown).

### Order button — auth + checkout call

```js
async function handleOrderPackage() {
  if (!isSignedIn) {
    router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
    return;
  }
  setIsCheckingOut(true);
  try {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gigId: data.id,
        packageId: selectedPackage._id,
        gigTitle: data.title,
        packageTitle: selectedPackage.title,
        price: selectedPackage.price,
        currency: selectedPackage.currency ?? "eur",
        freelancerStripeAccountId: data.freelancer?.stripeAccountId ?? "",
      }),
    });
    const { url, error } = await res.json();
    if (!res.ok) throw new Error(error || "Checkout failed");
    window.location.href = url;
  } catch (err) {
    toast.error(err.message);
    setIsCheckingOut(false);
  }
}
```

The route accepts an empty `freelancerStripeAccountId` (it's metadata-only since the escrow refactor); the Convex `releaseToFreelancer` action reads the live ID from Convex DB at release time.

---

## Route-group URL bugs (4 occurrences in 2 files)

The `(dashboard)` route group means `/dashboard/foo` URLs do NOT exist — `(dashboard)/foo/page.jsx` maps to `/foo`. Fix:

| File | Line(s) | Change |
|---|---|---|
| `src/app/api/stripe/checkout/route.js` | 151 | `/dashboard/orders` → `/orders` in success_url |
| `src/app/api/stripe/connect/callback/route.js` | 47, 92, 100, 109, 116 | `/dashboard/payouts` → `/payouts` (5× — every redirect) |

Note: the existing `(dashboard)/dashboard/page.jsx` and `(dashboard)/dashboard/credits/page.jsx` ARE valid URLs (`/dashboard` and `/dashboard/credits`) — those literal nested folders are intentional. We only fix the four redirect strings, not the routes themselves.

---

## Manual dispute UI

Add a "Open Dispute" button to `OrderCard.jsx`, visible only when:
- `order.status` is `in_progress`, `delivered`, or `revision_requested`
- AND `order.escrowStatus !== "disputed"`

Click → modal with `reason` (select: not_delivered, quality_issues, communication, other) + `description` (textarea, 30–1000 chars). On submit, calls `disputes.open` Convex mutation. The mutation already cancels auto-release and freezes escrow.

---

## Production env on Vercel

Set in Vercel project `marvinnl046s-projects/skilllinkup`, environment **Production**:

| Var | Value |
|---|---|
| `STRIPE_SECRET_KEY` | the existing `sk_test_…` (test key reused, intentionally) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | the existing `pk_test_…` |
| `STRIPE_WEBHOOK_SECRET` | from a fresh test-mode webhook endpoint registered in Stripe Dashboard |

The Stripe Dashboard webhook endpoint to register (test mode):
- URL: `https://skilllinkup.com/api/stripe/webhook`
- Events: `checkout.session.completed`, `payment_intent.succeeded`, `charge.dispute.created`, `account.updated`

Live keys (`sk_live_…44YD`) stay in the dashboard but are NOT deployed yet. After the green e2e on prod-with-test-keys, swap to live and register a second live-mode webhook.

---

## End-to-end verification (preview deploy)

After Vercel env is set + webhook registered:

1. Push to a Vercel preview branch (Stripe webhook still hits prod URL — that's fine for the test).
2. Onboard one of the existing freelancer profiles via `/payouts` → Stripe Connect Express. Expected: `freelancerProfiles.stripeAccountId` set + `charges_enabled` triggers webhook → `setOnboardingComplete`.
3. Login as a different user, browse to a gig owned by that freelancer, pick a package, click Order, pay with `4242 4242 4242 4242`.
4. Land on `/orders?success=true`. Order doc has `escrowStatus: held`, `stripePaymentIntentId` set.
5. Login as freelancer, click Deliver. Order has `autoReleaseJobId` set.
6. Login as client, click Approve. Convex `releaseToFreelancer` runs. Order has `escrowStatus: released`, `stripeTransferId` set. Stripe Dashboard shows transfer to the connected account.
7. Repeat with a second order, `Open Dispute` instead of Approve. Order frozen with `escrowStatus: disputed`, scheduler cancelled. Admin resolves → release or refund per outcome.

---

## Files touched

| File | Type | What |
|---|---|---|
| `src/components/section/ServiceDetails3.jsx` | modify | Replace `handleSelectPackage` with package-picker state + `handleOrderPackage` |
| `src/components/element/PackagePicker.jsx` | new | Tabbed Basic/Standard/Premium picker |
| `src/app/api/stripe/checkout/route.js` | modify | success_url fix |
| `src/app/api/stripe/connect/callback/route.js` | modify | 5× redirect fix |
| `src/components/card/OrderCard.jsx` | modify | Add Open Dispute button + modal |
| `src/components/dispute/OpenDisputeModal.jsx` | new | Reason + description form |
| (Vercel env, Stripe Dashboard) | external | Out-of-repo config |

No Convex schema changes. No new Convex actions. Backend already supports every step.

---

## Verification (2026-04-26)

End-to-end checkout-to-payout flow proven on production (`skilllinkup.com`):

- ✅ Buyer Marvin S paid €129 via Stripe Checkout (test card `4242…`).
- ✅ Production webhook created Convex order `ORD-20260426-MPKVIB` (`md7785ytgs1sw1j3ezy8zhtqd985jef8`) with `escrowStatus: held`, linked to PaymentIntent `pi_3TQRbvEPjKUovbQK0OMP6WGW`.
- ✅ Resend emails fired: "Order placed" (to client), "Order delivered" (to client).
- ✅ Freelancer (StayCool Airco) clicked Mark as delivered → `status: delivered`, `autoReleaseJobId: kc21hzc24zb8g7sb3kgpab018h85k09q` set (7-day scheduler).
- ✅ Client clicked Approve → scheduler cancelled, `releaseToFreelancer` action invoked.
- ✅ Stripe transfer `tr_3TQRbvEPjKUovbQK0qZss6Vz` of €113.52 to `acct_1TQQrgCYr4Em6ASP` (StayCool Connect Express account), `source_transaction: ch_3TQRbvEPjKUovbQK01Hq6ut0`.
- ✅ Order patched to `escrowStatus: released`, `stripeTransferId` set.
- ✅ Platform fee (€15.48) implicitly retained on platform balance — Separate Charges + Manual Transfers model confirmed.

### Bugs caught during e2e (and fixed)

1. **`application_fee_amount` rejected by Stripe** — original 2026-03-05 escrow plan kept it after removing `transfer_data`. Stripe only allows it for Direct/Destination charges. Removed entirely. Commit `bce7b71`.
2. **Webhook silently swallowed Convex errors** — `gigs.getPackageById` and `gigs.getById` need `serverSecret`, but the webhook never passed it. Outer catch returned 200 anyway, so Stripe never retried. Fix: pass secret + rethrow on failure → outer 500 → Stripe retries. Commit `92a83a9`.
3. **Vercel prod env vars stored as empty `""`** — `vercel env add` via stdin pipe silently saved empty values despite reporting "Added". Fixed via Vercel REST API direct PATCH/POST.
4. **Connect onboarding writes only to one Convex deployment** — when triggered from localhost, the Convex mutation hits dev Convex; production freelancerProfile never received the `stripeAccountId`, so `releaseToFreelancer` errored. Fix: copy account ID from dev to prod, OR initiate Connect onboarding from prod URL.
5. **Stripe Connect platform profile** — required two acknowledgments ("loss management" + "ongoing seller compliance") before any `accounts.create` call worked. Confirmed in dashboard.

### Known follow-ups (out of scope, but recorded)

- `/orders?success=true` UX: page renders success even when webhook silently failed downstream — should query session and show pending/error state.
- Stripe Dashboard Connect-onboarding branding shows "wetryleadflow" / shared platform branding rather than SkillLinkup-specific (single Stripe account hosts multiple platforms).
- `src/app/api/stripe/webhook/route.js:39` exports deprecated `config = { api: { bodyParser: false } }` — Next.js 16 ignores it; should be removed.
- Connect platform profile says "Direct Charges" model; actual implementation uses Separate Charges + Manual Transfers — informational mismatch only, not blocking.
- Live keys (`sk_live_…44YD`) deferred until separate live-mode webhook is registered.
- Manual dispute path (T7 button + admin resolve) not yet exercised end-to-end — code paths verified earlier via Stripe CLI triggers, but no full UI walkthrough on prod.
