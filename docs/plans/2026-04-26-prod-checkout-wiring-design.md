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
