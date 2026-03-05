# Stripe Escrow Design

**Goal:** Hold client payments on the platform Stripe account until delivery is approved or 7 days pass — only disputes require manual admin action.

**Approach:** Stripe Separate Charges + Manual Transfers. Remove `transfer_data.destination` from checkout so funds land on the platform account. Release via `stripe.transfers.create()` triggered automatically by client approval, 7-day Convex scheduled job, or admin dispute resolution.

**Tech Stack:** Stripe Connect (Separate Charges), Next.js API routes, Convex scheduled functions, existing orders/disputes tables.

---

## Payment Flow

```
Client betaalt → Stripe Checkout (geen transfer_data) → geld op platform account
                                                                ↓
                                                   Order: escrowStatus = "held"
                                                                ↓
                              ┌─────────────────────────────────────────────┐
                              │                                             │
                   Client keurt goed                          Freelancer levert af
                              │                                             │
                   stripe.transfers.create()            Convex scheduler: +7 dagen
                              │                                             │
                   escrowStatus = "released"          [geen dispute] → auto-release
                                                       [dispute] → bevroren → admin
```

---

## Stripe Fee Structure

| Moment | Fee | Wie |
|---|---|---|
| Incoming charge | ~1.4% + €0.25 (EU) | Platform betaalt |
| Transfer naar freelancer | **€0** | Niemand |
| Payout naar bank | €0 standaard | Freelancer |

Platform fee (10–15%) moet Stripe processing fee dekken. Geen dubbele kosten.

---

## Files to Change

| File | Change |
|---|---|
| `src/app/api/stripe/checkout/route.js` | Verwijder `transfer_data.destination` — platform ontvangt volledige betaling |
| `src/app/api/stripe/webhook/route.js` | Voeg handlers toe: `payment_intent.succeeded`, `charge.dispute.created` |
| `convex/marketplace/orders.ts` | `approve()` triggert release API; voeg `autoRelease` internal mutation toe + scheduler |

## New Files

| File | What |
|---|---|
| `src/app/api/stripe/release/route.js` | POST — `stripe.transfers.create()` naar freelancer connected account |
| `src/app/api/stripe/refund/route.js` | POST — `stripe.refunds.create()` bij dispute in favor of client |
| `src/app/dashboard/admin/disputes/page.jsx` | Admin dispute dashboard: lijst van bevroren orders + "Release" / "Refund" knoppen |

---

## Data Model

Geen schema-wijziging nodig. Bestaande velden:

```
orders.escrowStatus:         "held" | "released" | "refunded" | "disputed"
orders.stripePaymentIntentId (existing) — needed for transfer/refund
```

Nieuw veld toevoegen aan schema:
```
orders.stripeTransferId: v.optional(v.string())  — id van transfer naar freelancer
```

---

## Auto-Release Logic (Convex Scheduler)

```ts
// Bij delivery door freelancer:
const jobId = await ctx.scheduler.runAfter(
  7 * 24 * 60 * 60 * 1000,
  internal.marketplace.orders.autoRelease,
  { orderId }
);
await ctx.db.patch(orderId, { autoReleaseJobId: jobId });

// Bij dispute openen: cancel de job
await ctx.scheduler.cancel(order.autoReleaseJobId);
await ctx.db.patch(orderId, { escrowStatus: "disputed" });

// Bij client approval: cancel de job + direct release
await ctx.scheduler.cancel(order.autoReleaseJobId);
// → roept /api/stripe/release aan
```

Nieuw veld: `orders.autoReleaseJobId: v.optional(v.id("_scheduled_functions"))`

---

## Dispute Flow

```
1. Client opent dispute
   → escrowStatus = "disputed"
   → auto-release job gecanceld
   → admin notificatie

2. Admin dashboard /dashboard/admin/disputes
   → lijst van orders met escrowStatus = "disputed"
   → per order: bewijs bekijken, "Release aan freelancer" of "Refund aan client"

3a. Release → POST /api/stripe/release → transfer naar freelancer
3b. Refund  → POST /api/stripe/refund  → refund naar client
```

---

## Webhook Events to Register in Stripe Dashboard

| Event | Handler |
|---|---|
| `checkout.session.completed` | Existing — create order |
| `payment_intent.succeeded` | New — confirm escrow held, update order |
| `charge.dispute.created` | New — freeze order, notify admin |
| `account.updated` | Existing — freelancer onboarding |

---

## Out of Scope

- Partial releases (milestone-based escrow)
- Automatic dispute resolution (AI-based)
- Multi-currency conversion at release time
