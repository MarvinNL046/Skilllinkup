# Stripe Escrow Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Hold client payments on the platform Stripe account until delivery is approved — with automated 7-day auto-release and admin-only dispute resolution.

**Architecture:** Remove `transfer_data.destination` from Stripe Checkout so funds land on the platform account. Stripe transfers to the freelancer are created by Convex internal actions (triggered by client approval, a 7-day scheduler, or admin dispute resolution). The Stripe SDK runs inside Convex actions using the `STRIPE_SECRET_KEY` env var (set via `npx convex env set`).

**Tech Stack:** Stripe Connect (Separate Charges + Manual Transfers), Convex actions + scheduler, Next.js App Router, existing `stripe` npm package (v20).

---

### Context for the implementer

**Key files:**
- `src/app/api/stripe/checkout/route.js` — Stripe Checkout session creation
- `src/app/api/stripe/webhook/route.js` — Stripe event handler
- `convex/marketplace/orders.ts` — order mutations (deliver, approve)
- `convex/marketplace/disputes.ts` — dispute mutations (open, resolve)
- `convex/schema.ts` — database schema (orders table around line 560)
- `src/lib/stripe.js` — Stripe client (uses `STRIPE_SECRET_KEY`)

**Current broken behaviour:** `transfer_data.destination` in checkout immediately sends money to the freelancer. `escrowStatus: "held"` in Convex is a lie — nothing is actually held.

**After this plan:** Money lands on the platform Stripe account. A Convex action creates the transfer to the freelancer only when approved/auto-released/admin-resolved.

**No test suite exists.** Verification is via Stripe CLI event triggering + manual UI testing.

---

### Task 1: Add schema fields for auto-release job tracking

**Files:**
- Modify: `convex/schema.ts` (orders table, around line 580)

**Step 1:** Add two fields to the `orders` table definition, after `escrowStatus`:

```ts
autoReleaseJobId: v.optional(v.id("_scheduled_functions")),
escrowStatus: v.optional(v.string()), // held, released, refunded, disputed
```

Replace the existing `escrowStatus` line with the updated comment and add `autoReleaseJobId` below it:

```ts
escrowStatus: v.optional(v.string()), // held | released | refunded | disputed
autoReleaseJobId: v.optional(v.id("_scheduled_functions")),
```

**Step 2:** Deploy schema to dev:
```bash
npx convex dev --once
```
Expected: `✔ Convex functions ready!`

**Step 3:** Commit:
```bash
git add convex/schema.ts
git commit -m "feat(escrow): add autoReleaseJobId to orders schema"
```

---

### Task 2: Remove `transfer_data` from Stripe Checkout

This is the most critical change. Without it, money stays on the platform account.

**Files:**
- Modify: `src/app/api/stripe/checkout/route.js` (around line 140–155)

**Step 1:** Find the `payment_intent_data` block. It currently looks like:

```js
payment_intent_data: {
  application_fee_amount: applicationFeeAmountCents,
  transfer_data: {
    destination: freelancerStripeAccountId,
  },
},
```

Replace it with (remove `transfer_data` entirely):

```js
payment_intent_data: {
  application_fee_amount: applicationFeeAmountCents,
},
```

**Step 2:** The `freelancerStripeAccountId` is no longer used in checkout. Remove its validation guard (around line 90–97):

```js
// DELETE these lines:
if (!freelancerStripeAccountId) {
  return NextResponse.json(
    {
      error:
        "The freelancer has not set up their Stripe account yet. They need to complete onboarding before accepting payments.",
    },
    { status: 422 }
  );
}
```

> **Note:** We still need `freelancerStripeAccountId` later (for the transfer), so keep it in the metadata. Update the metadata block to include it:

```js
metadata: {
  gigId,
  packageId,
  amountCents,
  currency: currency.toLowerCase(),
  freelancerStripeAccountId: freelancerStripeAccountId || "",
},
```

**Step 3:** Verify the file compiles — start dev server briefly:
```bash
npm run build 2>&1 | tail -5
```
Expected: no errors related to checkout route.

**Step 4:** Commit:
```bash
git add src/app/api/stripe/checkout/route.js
git commit -m "feat(escrow): remove transfer_data from checkout — funds stay on platform"
```

---

### Task 3: Create Convex escrow actions (release + refund)

These internal actions call Stripe directly using the Stripe SDK inside Convex.

**Files:**
- Create: `convex/marketplace/escrow.ts`

**Step 1:** Add `STRIPE_SECRET_KEY` to Convex environment:
```bash
npx convex env set STRIPE_SECRET_KEY $(grep STRIPE_SECRET_KEY .env.local | cut -d= -f2)
```
Verify:
```bash
npx convex env list | grep STRIPE
```
Expected: `STRIPE_SECRET_KEY  sk_test_...`

**Step 2:** Create the file `convex/marketplace/escrow.ts`:

```ts
"use node";

import { v } from "convex/values";
import { internalAction } from "../_generated/server";
import { internal } from "../_generated/api";
import Stripe from "stripe";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not set in Convex environment");
  return new Stripe(key, { apiVersion: "2024-06-20" });
}

/**
 * Transfer freelancer earnings from platform account to freelancer's Stripe account.
 * Called by: orders.approve, orders.autoRelease, disputes.resolve (freelancer wins)
 */
export const releaseToFreelancer = internalAction({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.runQuery(internal.marketplace.orders.getById, {
      orderId: args.orderId,
    });
    if (!order) throw new Error(`Order ${args.orderId} not found`);
    if (order.escrowStatus === "released") {
      console.log(`[escrow] Order ${args.orderId} already released — skipping`);
      return;
    }
    if (!order.stripePaymentIntentId) {
      throw new Error(`Order ${args.orderId} has no stripePaymentIntentId`);
    }

    // Get freelancer's Stripe account ID
    const freelancerProfile = order.freelancerId
      ? await ctx.runQuery(internal.marketplace.freelancers.getProfileById, {
          profileId: order.freelancerId,
        })
      : null;
    const stripeAccountId = freelancerProfile?.stripeAccountId;
    if (!stripeAccountId) {
      throw new Error(`Freelancer for order ${args.orderId} has no Stripe account`);
    }

    const stripe = getStripe();
    const amountCents = Math.round(order.freelancerEarnings * 100);

    const transfer = await stripe.transfers.create({
      amount: amountCents,
      currency: (order.currency ?? "EUR").toLowerCase(),
      destination: stripeAccountId,
      source_transaction: order.stripePaymentIntentId,
      metadata: { orderId: args.orderId },
    });

    await ctx.runMutation(internal.marketplace.orders.markReleased, {
      orderId: args.orderId,
      stripeTransferId: transfer.id,
    });

    console.log(`[escrow] Released ${amountCents} cents to ${stripeAccountId} for order ${args.orderId}`);
  },
});

/**
 * Refund the client's payment in full.
 * Called by: disputes.resolve (client wins)
 */
export const refundToClient = internalAction({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.runQuery(internal.marketplace.orders.getById, {
      orderId: args.orderId,
    });
    if (!order) throw new Error(`Order ${args.orderId} not found`);
    if (order.escrowStatus === "refunded") {
      console.log(`[escrow] Order ${args.orderId} already refunded — skipping`);
      return;
    }
    if (!order.stripePaymentIntentId) {
      throw new Error(`Order ${args.orderId} has no stripePaymentIntentId`);
    }

    const stripe = getStripe();

    // Retrieve the PaymentIntent to get the charge ID
    const paymentIntent = await stripe.paymentIntents.retrieve(
      order.stripePaymentIntentId
    );
    const chargeId = typeof paymentIntent.latest_charge === "string"
      ? paymentIntent.latest_charge
      : paymentIntent.latest_charge?.id;

    if (!chargeId) throw new Error(`No charge found on PaymentIntent ${order.stripePaymentIntentId}`);

    await stripe.refunds.create({ charge: chargeId });

    await ctx.runMutation(internal.marketplace.orders.markRefunded, {
      orderId: args.orderId,
    });

    console.log(`[escrow] Refunded charge ${chargeId} for order ${args.orderId}`);
  },
});
```

**Step 3:** Deploy to dev:
```bash
npx convex dev --once
```
Expected: `✔ Convex functions ready!`

**Step 4:** Commit:
```bash
git add convex/marketplace/escrow.ts
git commit -m "feat(escrow): Convex internal actions for Stripe release + refund"
```

---

### Task 4: Add internal helper queries/mutations to orders.ts

The escrow actions need `getById`, `markReleased`, `markRefunded`, and `getProfileById` internal helpers.

**Files:**
- Modify: `convex/marketplace/orders.ts`
- Modify: `convex/marketplace/freelancers.ts`

**Step 1:** Add to `convex/marketplace/orders.ts` (at the bottom of the file):

```ts
import { internalQuery, internalMutation } from "../_generated/server";

/** Internal: fetch an order by ID (used by escrow actions). */
export const getById = internalQuery({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => ctx.db.get(args.orderId),
});

/** Internal: mark order as escrow released after Stripe transfer. */
export const markReleased = internalMutation({
  args: {
    orderId: v.id("orders"),
    stripeTransferId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, {
      escrowStatus: "released",
      stripeTransferId: args.stripeTransferId,
      status: "completed",
      completedAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

/** Internal: mark order as refunded after Stripe refund. */
export const markRefunded = internalMutation({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, {
      escrowStatus: "refunded",
      status: "cancelled",
      cancelledAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});
```

**Step 2:** Add to `convex/marketplace/freelancers.ts` (at the bottom):

```ts
import { internalQuery } from "../_generated/server";

/** Internal: get freelancer profile by ID (used by escrow actions). */
export const getProfileById = internalQuery({
  args: { profileId: v.id("freelancerProfiles") },
  handler: async (ctx, args) => ctx.db.get(args.profileId),
});
```

**Step 3:** Check `internalQuery`/`internalMutation` are imported at the top of each file. Add if missing:
```ts
// In orders.ts — add to the import line:
import { query, mutation, internalQuery, internalMutation } from "../_generated/server";

// In freelancers.ts — add to the import line:
import { query, mutation, internalQuery } from "../_generated/server";
```

**Step 4:** Deploy:
```bash
npx convex dev --once
```
Expected: `✔ Convex functions ready!`

**Step 5:** Commit:
```bash
git add convex/marketplace/orders.ts convex/marketplace/freelancers.ts
git commit -m "feat(escrow): internal helper queries/mutations for escrow actions"
```

---

### Task 5: Update `orders.deliver` to schedule 7-day auto-release

**Files:**
- Modify: `convex/marketplace/orders.ts` (the `deliver` mutation, around line 319)

**Step 1:** In the `deliver` mutation handler, after the `ctx.db.patch` call, add the scheduler:

```ts
// After: await ctx.db.patch(args.orderId, { status: "delivered", updatedAt: Date.now() });
// Add:
const releaseJobId = await ctx.scheduler.runAfter(
  7 * 24 * 60 * 60 * 1000, // 7 days in ms
  internal.marketplace.escrow.releaseToFreelancer,
  { orderId: args.orderId }
);
await ctx.db.patch(args.orderId, { autoReleaseJobId: releaseJobId });
```

**Step 2:** Ensure `internal` is imported at the top of orders.ts:
```ts
import { internal } from "../_generated/api";
```
(It already is — verify it's there.)

**Step 3:** Deploy:
```bash
npx convex dev --once
```

**Step 4:** Commit:
```bash
git add convex/marketplace/orders.ts
git commit -m "feat(escrow): schedule 7-day auto-release on delivery"
```

---

### Task 6: Update `orders.approve` to cancel job + trigger release

**Files:**
- Modify: `convex/marketplace/orders.ts` (the `approve` mutation, around line 370)

**Step 1:** Replace the existing `ctx.db.patch` in `approve` that sets `escrowStatus: "released"`:

**Before:**
```ts
await ctx.db.patch(args.orderId, {
  status: "completed",
  escrowStatus: "released",
  completedAt: now,
  updatedAt: now,
});
```

**After:**
```ts
// Cancel the auto-release scheduler job (if still pending)
if (order.autoReleaseJobId) {
  await ctx.scheduler.cancel(order.autoReleaseJobId);
}

// Only update order status — markReleased will set escrowStatus after Stripe confirms
await ctx.db.patch(args.orderId, {
  status: "completed",
  completedAt: now,
  updatedAt: now,
  autoReleaseJobId: undefined,
});

// Trigger Stripe transfer (async — runs after this mutation completes)
await ctx.scheduler.runAfter(0, internal.marketplace.escrow.releaseToFreelancer, {
  orderId: args.orderId,
});
```

**Step 2:** Deploy:
```bash
npx convex dev --once
```

**Step 3:** Commit:
```bash
git add convex/marketplace/orders.ts
git commit -m "feat(escrow): approve triggers Stripe transfer instead of DB-only status update"
```

---

### Task 7: Update `disputes.open` to cancel auto-release

**Files:**
- Modify: `convex/marketplace/disputes.ts` (the `open` mutation)

**Step 1:** In the `open` mutation, after fetching the order and before inserting the dispute, add:

```ts
// Cancel pending auto-release so funds don't go to freelancer during dispute
if (order.autoReleaseJobId) {
  await ctx.scheduler.cancel(order.autoReleaseJobId);
  await ctx.db.patch(args.orderId, {
    autoReleaseJobId: undefined,
    escrowStatus: "disputed",
  });
}
```

This replaces the existing `ctx.db.patch` that sets `status: "disputed"` — update it:

**Before:**
```ts
await ctx.db.patch(args.orderId, {
  status: "disputed",
  updatedAt: now,
});
```

**After:**
```ts
await ctx.db.patch(args.orderId, {
  status: "disputed",
  escrowStatus: "disputed",
  autoReleaseJobId: undefined,
  updatedAt: now,
});
```

**Step 2:** Add `internal` import to disputes.ts if not already present:
```ts
import { internal } from "../_generated/api";
```

**Step 3:** Deploy:
```bash
npx convex dev --once
```

**Step 4:** Commit:
```bash
git add convex/marketplace/disputes.ts
git commit -m "feat(escrow): opening dispute cancels auto-release and freezes escrow"
```

---

### Task 8: Update `disputes.resolve` to trigger release or refund

**Files:**
- Modify: `convex/marketplace/disputes.ts` (the `resolve` mutation)

**Step 1:** The `resolve` mutation takes `resolution: v.string()`. After the `ctx.db.patch` to mark dispute resolved, add:

```ts
// Trigger Stripe action based on who wins the dispute
if (args.resolution === "freelancer_wins") {
  await ctx.scheduler.runAfter(0, internal.marketplace.escrow.releaseToFreelancer, {
    orderId: dispute.orderId,
  });
} else if (args.resolution === "client_wins") {
  await ctx.scheduler.runAfter(0, internal.marketplace.escrow.refundToClient, {
    orderId: dispute.orderId,
  });
}
```

The `resolution` field currently accepts any string. Valid values are now:
- `"freelancer_wins"` — transfers to freelancer
- `"client_wins"` — refunds client
- Any other value — no Stripe action (partial resolution handled manually)

**Step 2:** Deploy:
```bash
npx convex dev --once
```

**Step 3:** Commit:
```bash
git add convex/marketplace/disputes.ts
git commit -m "feat(escrow): dispute resolution triggers Stripe release or refund"
```

---

### Task 9: Admin disputes dashboard page

**Files:**
- Create: `src/app/(dashboard)/admin/disputes/page.jsx`
- Create: `src/components/dashboard/AdminDisputeList.jsx`

**Step 1:** Create `src/components/dashboard/AdminDisputeList.jsx`:

```jsx
"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";

export default function AdminDisputeList() {
  const disputes = useQuery(api.marketplace.disputes.list, { status: "open" }) ?? [];
  const resolve = useMutation(api.marketplace.disputes.resolve);
  const [loading, setLoading] = useState(null);

  async function handleResolve(disputeId, resolution) {
    setLoading(disputeId + resolution);
    try {
      await resolve({
        disputeId,
        resolution,
        resolutionNote: `Resolved via admin dashboard: ${resolution}`,
      });
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(null);
    }
  }

  if (disputes.length === 0) {
    return <p className="text-muted">No open disputes.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Dispute ID</th>
            <th>Order ID</th>
            <th>Reason</th>
            <th>Opened</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {disputes.map((d) => (
            <tr key={d._id}>
              <td className="fz13">{d._id.slice(-8)}</td>
              <td className="fz13">{d.orderId.slice(-8)}</td>
              <td>{d.reason}</td>
              <td>{new Date(d.openedAt).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  disabled={!!loading}
                  onClick={() => handleResolve(d._id, "freelancer_wins")}
                >
                  {loading === d._id + "freelancer_wins" ? "..." : "Release to Freelancer"}
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  disabled={!!loading}
                  onClick={() => handleResolve(d._id, "client_wins")}
                >
                  {loading === d._id + "client_wins" ? "..." : "Refund Client"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

**Step 2:** Create `src/app/(dashboard)/admin/disputes/page.jsx`:

```jsx
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import AdminDisputeList from "@/components/dashboard/AdminDisputeList";

export const metadata = {
  title: "SkillLinkup | Admin — Disputes",
};

export default function AdminDisputesPage() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <div className="dashboard__content hover-bgc-color">
          <div className="row pb40">
            <div className="col-lg-12">
              <DashboardNavigation />
            </div>
            <div className="col-lg-12">
              <div className="dashboard_title_area">
                <h2>Dispute Management</h2>
                <p className="text">
                  Review open disputes and release funds or refund the client.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <AdminDisputeList />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
```

**Step 3:** Verify it builds:
```bash
npm run build 2>&1 | grep -E "error|Error" | head -10
```
Expected: no errors.

**Step 4:** Commit:
```bash
git add src/app/\(dashboard\)/admin/disputes/page.jsx src/components/dashboard/AdminDisputeList.jsx
git commit -m "feat(escrow): admin dispute dashboard with release/refund buttons"
```

---

### Task 10: Update Stripe webhook handlers

**Files:**
- Modify: `src/app/api/stripe/webhook/route.js`

**Step 1:** In the `switch (event.type)` block, add two new cases after `checkout.session.completed`:

```js
case "payment_intent.succeeded":
  await handlePaymentIntentSucceeded(event.data.object);
  break;

case "charge.dispute.created":
  await handleChargeDisputeCreated(event.data.object);
  break;
```

**Step 2:** Add the handler functions at the bottom of the file:

```js
// ---------------------------------------------------------------------------
// Handler: payment_intent.succeeded
// Confirms escrow is held after the checkout session fully completes.
// ---------------------------------------------------------------------------
async function handlePaymentIntentSucceeded(paymentIntent) {
  const existing = await convex.query(
    api.marketplace.orders.getByStripePaymentIntentId,
    { stripePaymentIntentId: paymentIntent.id }
  );
  if (!existing) {
    // Order not yet created (checkout.session.completed may still be in flight — ignore)
    return;
  }
  // Confirm escrow held status (already set by create, this is a safety net)
  console.log(`[stripe/webhook] PaymentIntent ${paymentIntent.id} succeeded — escrow held for order ${existing._id}`);
}

// ---------------------------------------------------------------------------
// Handler: charge.dispute.created
// A cardholder has filed a chargeback. Freeze escrow and notify admin.
// ---------------------------------------------------------------------------
async function handleChargeDisputeCreated(dispute) {
  const paymentIntentId = dispute.payment_intent;
  if (!paymentIntentId) return;

  const order = await convex.query(
    api.marketplace.orders.getByStripePaymentIntentId,
    { stripePaymentIntentId: paymentIntentId }
  );

  if (!order) {
    console.warn(`[stripe/webhook] charge.dispute.created: no order for PaymentIntent ${paymentIntentId}`);
    return;
  }

  // Open a dispute in Convex (this cancels auto-release and freezes escrow)
  try {
    await convex.mutation(api.marketplace.disputes.open, {
      orderId: order._id,
      reason: "chargeback",
      description: `Stripe chargeback filed. Dispute ID: ${dispute.id}. Reason: ${dispute.reason}`,
    });
    console.log(`[stripe/webhook] Dispute opened for order ${order._id} due to Stripe chargeback`);
  } catch (err) {
    // Dispute may already exist — log and continue
    console.warn(`[stripe/webhook] Could not open dispute for order ${order._id}: ${err.message}`);
  }
}
```

> **Note:** `api.marketplace.disputes.open` requires auth. Since this is a server-side call via `ConvexHttpClient`, it won't have a user identity. You may need an `internalMutation` version of `disputes.open` that skips the auth check. If the mutation throws "Authentication required", create `disputes.openFromWebhook` as an `internalMutation` in disputes.ts and call it with `convex.mutation(api.marketplace.disputes.openFromWebhook, ...)` — but only if the regular `open` fails.

**Step 3:** Register the new webhook events in the Stripe dashboard:
- Go to [https://dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
- Add `payment_intent.succeeded` and `charge.dispute.created` to the existing endpoint

**Step 4:** Build check:
```bash
npm run build 2>&1 | grep -E "^.*error" | head -10
```

**Step 5:** Commit:
```bash
git add src/app/api/stripe/webhook/route.js
git commit -m "feat(escrow): webhook handlers for payment_intent.succeeded + charge.dispute.created"
```

---

### Task 11: Deploy and verify end-to-end

**Step 1:** Deploy Convex to prod:
```bash
npx convex deploy -y
```

**Step 2:** Deploy Next.js to Vercel:
```bash
git push origin main
```

**Step 3:** Test with Stripe CLI (requires `stripe` CLI installed):
```bash
# Trigger a test checkout.session.completed event
stripe trigger checkout.session.completed

# Trigger a test charge.dispute.created
stripe trigger charge.dispute.created
```

**Step 4:** Verify in Stripe dashboard:
- Go to Payments → find a test payment
- Confirm no automatic transfer to connected account occurred
- After simulating approval: check Transfers — a transfer should appear

**Step 5:** Verify Convex dashboard:
- Go to [https://dashboard.convex.dev](https://dashboard.convex.dev)
- Check `orders` table — `escrowStatus` should be `"held"` on new orders
- After approval: `escrowStatus` should be `"released"` and `stripeTransferId` populated

**Step 6:** Final commit if any fixes were needed during verification:
```bash
git add -A
git commit -m "fix(escrow): post-deploy verification fixes"
```
