# Pay-Per-Lead Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a credit-based pay-per-lead system for the Local Marketplace so craftsmen can buy credits and spend them to claim leads (quote requests), revealing client contact details.

**Architecture:** Credits stored on Convex `freelancerProfiles.creditBalance`. New `leadClaims` and `creditTransactions` tables in Convex. Stripe Checkout for credit purchases (one-time payments, no Connect needed). Atomic Convex mutations ensure balance + slot checks. Dashboard pages for credit management and claimed leads.

**Tech Stack:** Convex (schema, queries, mutations), Stripe Checkout (credit purchases), Next.js 15 App Router (dashboard pages), React 19 (client components)

**Design doc:** `docs/plans/2026-02-28-pay-per-lead-design.md`

---

## Task 1: Add schema fields and new tables

**Files:**
- Modify: `convex/schema.ts` (lines 317-361 for freelancerProfiles, lines 717-737 for quoteRequests, and after line 752 for new tables)

**Step 1: Add `creditBalance` to `freelancerProfiles`**

In `convex/schema.ts`, find the `freelancerProfiles` table definition (line 317). After the `featured` field (line 349), add:

```js
creditBalance: v.optional(v.number()), // pay-per-lead credits (default 0)
```

**Step 2: Add lead claim fields to `quoteRequests`**

In the `quoteRequests` table (line 717). After the `quoteCount` field (line 732), add:

```js
maxSlots: v.optional(v.number()),      // default 3
claimedSlots: v.optional(v.number()),  // default 0
isExclusive: v.optional(v.boolean()),  // default false
```

**Step 3: Add new `leadClaims` table**

After the `quotes` table closing (line 752), before the `savedItems` comment block, add:

```js
// ============================================================
// LOCAL SERVICES: PAY-PER-LEAD
// ============================================================

leadClaims: defineTable({
  quoteRequestId: v.id("quoteRequests"),
  freelancerId: v.id("users"),
  creditsSpent: v.number(),
  claimType: v.union(v.literal("shared"), v.literal("exclusive")),
  claimedAt: v.number(),
})
  .index("by_quoteRequest", ["quoteRequestId"])
  .index("by_freelancer", ["freelancerId"]),

creditTransactions: defineTable({
  freelancerId: v.id("users"),
  amount: v.number(), // positive = purchase, negative = spend
  type: v.union(v.literal("purchase"), v.literal("spend"), v.literal("refund")),
  description: v.string(),
  referenceId: v.optional(v.string()), // Stripe session ID or leadClaim ID
  createdAt: v.number(),
})
  .index("by_freelancer", ["freelancerId"]),
```

**Step 4: Run `npx convex dev` to push schema**

```bash
npx convex dev
```

Expected: Schema accepted, no errors. New tables created.

**Step 5: Commit**

```bash
git add convex/schema.ts
git commit -m "feat(pay-per-lead): add creditBalance, leadClaims, creditTransactions schema"
```

---

## Task 2: Create lead pricing utility

**Files:**
- Create: `convex/marketplace/leadPricing.ts`

**Step 1: Create the pricing module**

Create `convex/marketplace/leadPricing.ts`:

```ts
/**
 * Lead pricing configuration for the Local Marketplace pay-per-lead system.
 *
 * Pricing tiers based on the quoteRequest's budgetIndication field:
 *   - "< €500"          → 2 credits (shared), 4 credits (exclusive)
 *   - "€500 - €2,000"   → 4 credits (shared), 8 credits (exclusive)
 *   - "> €2,000"        → 6 credits (shared), 12 credits (exclusive)
 *   - anything else      → 3 credits (shared), 6 credits (exclusive)
 *
 * Credit packages (for Stripe checkout):
 *   - starter: 5 credits  → €25.00  (€5.00/credit)
 *   - popular: 10 credits → €45.00  (€4.50/credit)
 *   - pro:     25 credits → €99.00  (€3.96/credit)
 */

export const CREDIT_PACKAGES = [
  { id: "starter", name: "Starter", credits: 5, priceEur: 25, priceCents: 2500 },
  { id: "popular", name: "Popular", credits: 10, priceEur: 45, priceCents: 4500 },
  { id: "pro", name: "Pro", credits: 25, priceEur: 99, priceCents: 9900 },
] as const;

export type CreditPackageId = (typeof CREDIT_PACKAGES)[number]["id"];

export function getLeadCreditCost(
  budgetIndication: string | undefined,
  claimType: "shared" | "exclusive"
): number {
  let baseCost: number;

  if (!budgetIndication) {
    baseCost = 3;
  } else if (budgetIndication.includes("500") && !budgetIndication.includes("2")) {
    // "< €500" or similar
    baseCost = 2;
  } else if (budgetIndication.includes("2,000") || budgetIndication.includes("2000")) {
    // "€500 - €2,000"
    baseCost = 4;
  } else if (budgetIndication.includes(">") || budgetIndication.includes("2,000+") || budgetIndication.includes("2000+")) {
    // "> €2,000"
    baseCost = 6;
  } else {
    // "Flexible" or unrecognized
    baseCost = 3;
  }

  return claimType === "exclusive" ? baseCost * 2 : baseCost;
}

export const MAX_SHARED_SLOTS = 3;
```

**Step 2: Commit**

```bash
git add convex/marketplace/leadPricing.ts
git commit -m "feat(pay-per-lead): add lead pricing utility with credit packages and tier logic"
```

---

## Task 3: Create lead claim mutations and queries

**Files:**
- Create: `convex/marketplace/leads.ts`

**Step 1: Create the leads module**

Create `convex/marketplace/leads.ts`:

```ts
import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { getLeadCreditCost, MAX_SHARED_SLOTS } from "./leadPricing";

/**
 * Get credit balance for the current authenticated freelancer.
 */
export const getMyCredits = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!user) return null;

    const profile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .first();

    return {
      balance: profile?.creditBalance ?? 0,
      userId: user._id,
      profileId: profile?._id ?? null,
    };
  },
});

/**
 * Get credit transaction history for the current freelancer.
 */
export const getMyTransactions = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!user) return [];

    const txns = await ctx.db
      .query("creditTransactions")
      .withIndex("by_freelancer", (q) => q.eq("freelancerId", user._id))
      .order("desc")
      .collect();

    return txns.slice(0, args.limit ?? 50);
  },
});

/**
 * Get leads claimed by the current freelancer, with full quote request details.
 */
export const getMyClaims = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!user) return [];

    const claims = await ctx.db
      .query("leadClaims")
      .withIndex("by_freelancer", (q) => q.eq("freelancerId", user._id))
      .order("desc")
      .collect();

    // Enrich with quote request details + client info (since they claimed it)
    const enriched = await Promise.all(
      claims.map(async (claim) => {
        const request = await ctx.db.get(claim.quoteRequestId);
        if (!request) return { ...claim, request: null, client: null, categoryName: null };

        const client = await ctx.db.get(request.clientId);
        const category = await ctx.db.get(request.categoryId);

        return {
          ...claim,
          request: {
            _id: request._id,
            title: request.title,
            description: request.description,
            locationCity: request.locationCity,
            locationPostcode: request.locationPostcode,
            budgetIndication: request.budgetIndication,
            preferredDate: request.preferredDate,
            status: request.status,
            createdAt: request.createdAt,
          },
          client: client
            ? { name: client.name, email: client.email, phone: (client as any).phone ?? null }
            : null,
          categoryName: category?.name ?? null,
        };
      })
    );

    return enriched;
  },
});

/**
 * Get claim status for a specific quote request (for the current user).
 * Returns: number of claims, whether current user already claimed, slots left.
 */
export const getLeadStatus = query({
  args: { quoteRequestId: v.id("quoteRequests") },
  handler: async (ctx, args) => {
    const request = await ctx.db.get(args.quoteRequestId);
    if (!request) return null;

    const claims = await ctx.db
      .query("leadClaims")
      .withIndex("by_quoteRequest", (q) =>
        q.eq("quoteRequestId", args.quoteRequestId)
      )
      .collect();

    const maxSlots = request.isExclusive ? 1 : (request.maxSlots ?? MAX_SHARED_SLOTS);
    const claimedSlots = request.claimedSlots ?? 0;
    const slotsRemaining = Math.max(0, maxSlots - claimedSlots);

    // Check if current user already claimed
    let alreadyClaimed = false;
    const identity = await ctx.auth.getUserIdentity();
    if (identity) {
      const user = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", identity.email!))
        .first();
      if (user) {
        alreadyClaimed = claims.some((c) => c.freelancerId === user._id);
      }
    }

    const creditCost = getLeadCreditCost(request.budgetIndication, "shared");
    const exclusiveCost = getLeadCreditCost(request.budgetIndication, "exclusive");

    return {
      claimedSlots,
      maxSlots,
      slotsRemaining,
      isExclusive: request.isExclusive ?? false,
      alreadyClaimed,
      creditCost,
      exclusiveCost,
      canClaimExclusive: claimedSlots === 0 && !request.isExclusive,
    };
  },
});

/**
 * Claim a lead (quote request). Deducts credits atomically.
 */
export const claimLead = mutation({
  args: {
    quoteRequestId: v.id("quoteRequests"),
    claimType: v.union(v.literal("shared"), v.literal("exclusive")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required.");

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!user) throw new Error("User not found.");

    const profile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .first();
    if (!profile) throw new Error("Freelancer profile required to claim leads.");

    // Get the quote request
    const request = await ctx.db.get(args.quoteRequestId);
    if (!request) throw new Error("Quote request not found.");
    if (request.status !== "open") throw new Error("This quote request is no longer open.");

    // Check not already claimed by this user
    const existingClaims = await ctx.db
      .query("leadClaims")
      .withIndex("by_quoteRequest", (q) =>
        q.eq("quoteRequestId", args.quoteRequestId)
      )
      .collect();

    if (existingClaims.some((c) => c.freelancerId === user._id)) {
      throw new Error("You have already claimed this lead.");
    }

    // Check slot availability
    const claimedSlots = request.claimedSlots ?? 0;
    const maxSlots = request.maxSlots ?? MAX_SHARED_SLOTS;

    if (args.claimType === "exclusive") {
      if (claimedSlots > 0) {
        throw new Error("Exclusive claim not available — lead already has claims.");
      }
    } else {
      if (request.isExclusive) {
        throw new Error("This lead has been exclusively claimed.");
      }
      if (claimedSlots >= maxSlots) {
        throw new Error("All slots for this lead are taken.");
      }
    }

    // Calculate credit cost
    const creditCost = getLeadCreditCost(request.budgetIndication, args.claimType);
    const balance = profile.creditBalance ?? 0;

    if (balance < creditCost) {
      throw new Error(
        `Insufficient credits. You need ${creditCost} credits but have ${balance}.`
      );
    }

    const now = Date.now();

    // Deduct credits
    await ctx.db.patch(profile._id, {
      creditBalance: balance - creditCost,
    });

    // Create claim record
    const claimId = await ctx.db.insert("leadClaims", {
      quoteRequestId: args.quoteRequestId,
      freelancerId: user._id,
      creditsSpent: creditCost,
      claimType: args.claimType,
      claimedAt: now,
    });

    // Update quote request slots
    if (args.claimType === "exclusive") {
      await ctx.db.patch(args.quoteRequestId, {
        isExclusive: true,
        claimedSlots: 1,
        maxSlots: 1,
        updatedAt: now,
      });
    } else {
      await ctx.db.patch(args.quoteRequestId, {
        claimedSlots: claimedSlots + 1,
        updatedAt: now,
      });
    }

    // Record credit transaction
    await ctx.db.insert("creditTransactions", {
      freelancerId: user._id,
      amount: -creditCost,
      type: "spend",
      description: `Claimed lead: ${request.title}`,
      referenceId: claimId,
      createdAt: now,
    });

    return { claimId, creditsSpent: creditCost, newBalance: balance - creditCost };
  },
});

/**
 * Add credits to a freelancer's balance (called from Stripe webhook).
 * This is an internal mutation — should only be called server-side.
 */
export const addCredits = mutation({
  args: {
    freelancerUserId: v.id("users"),
    credits: v.number(),
    stripeSessionId: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.freelancerUserId))
      .first();

    if (!profile) throw new Error("Freelancer profile not found.");

    const currentBalance = profile.creditBalance ?? 0;
    const newBalance = currentBalance + args.credits;

    await ctx.db.patch(profile._id, {
      creditBalance: newBalance,
    });

    await ctx.db.insert("creditTransactions", {
      freelancerId: args.freelancerUserId,
      amount: args.credits,
      type: "purchase",
      description: args.description,
      referenceId: args.stripeSessionId,
      createdAt: Date.now(),
    });

    return { newBalance };
  },
});
```

**Step 2: Verify it compiles**

```bash
npx convex dev
```

Expected: No errors. New functions registered.

**Step 3: Commit**

```bash
git add convex/marketplace/leads.ts
git commit -m "feat(pay-per-lead): add lead claim mutations, credit queries, and addCredits mutation"
```

---

## Task 4: Create Stripe credit purchase API route

**Files:**
- Create: `src/app/api/stripe/credits/route.js`

**Step 1: Create the credit checkout route**

Create `src/app/api/stripe/credits/route.js`:

```js
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { CREDIT_PACKAGES } from "../../../../convex/marketplace/leadPricing";

// ---------------------------------------------------------------------------
// POST /api/stripe/credits
//
// Creates a Stripe Checkout Session for purchasing lead credits.
//
// Body (JSON):
//   packageId        – "starter" | "popular" | "pro"
//   freelancerUserId – Convex user ID of the freelancer buying credits
//
// Returns:
//   { url }  – Redirect the client to this Stripe-hosted checkout URL.
// ---------------------------------------------------------------------------

export async function POST(request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured." },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { packageId, freelancerUserId } = body;

  if (!packageId || !freelancerUserId) {
    return NextResponse.json(
      { error: "Missing required fields: packageId, freelancerUserId" },
      { status: 400 }
    );
  }

  const pkg = CREDIT_PACKAGES.find((p) => p.id === packageId);
  if (!pkg) {
    return NextResponse.json(
      { error: `Invalid packageId: ${packageId}. Valid: starter, popular, pro` },
      { status: 400 }
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "ideal"],

      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: pkg.priceCents,
            product_data: {
              name: `${pkg.credits} Lead Credits (${pkg.name})`,
              description: `Purchase ${pkg.credits} credits for claiming leads on SkillLinkup Local Marketplace`,
            },
          },
          quantity: 1,
        },
      ],

      metadata: {
        type: "credit_purchase",
        packageId: pkg.id,
        credits: String(pkg.credits),
        freelancerUserId,
      },

      success_url: `${baseUrl}/dashboard/credits?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/dashboard/credits?cancelled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[stripe/credits] Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/stripe/credits/route.js
git commit -m "feat(pay-per-lead): add Stripe checkout route for credit purchases"
```

---

## Task 5: Add credit purchase handler to Stripe webhook

**Files:**
- Modify: `src/app/api/stripe/webhook/route.js`

**Step 1: Add credit purchase handler**

In `src/app/api/stripe/webhook/route.js`, the `handleCheckoutSessionCompleted` function (line 124) currently handles gig purchases. We need to add a branch for credit purchases.

At the top of `handleCheckoutSessionCompleted` (after line 126), add a check for the `type` metadata:

```js
// Check if this is a credit purchase (pay-per-lead)
if (session.metadata?.type === "credit_purchase") {
  await handleCreditPurchase(session);
  return;
}
```

Then add a new handler function before the `handleAccountUpdated` function (before line 265):

```js
// ---------------------------------------------------------------------------
// Handler: credit purchase (pay-per-lead)
// ---------------------------------------------------------------------------

async function handleCreditPurchase(session) {
  const { credits, freelancerUserId, packageId } = session.metadata || {};

  if (!credits || !freelancerUserId) {
    console.error(
      "[stripe/webhook] Credit purchase missing metadata:",
      session.metadata
    );
    return;
  }

  const creditsNum = parseInt(credits, 10);
  if (!creditsNum || creditsNum <= 0) {
    console.error("[stripe/webhook] Invalid credits value:", credits);
    return;
  }

  try {
    await convex.mutation(api.marketplace.leads.addCredits, {
      freelancerUserId,
      credits: creditsNum,
      stripeSessionId: session.id,
      description: `Purchased ${creditsNum} credits (${packageId} package)`,
    });

    console.log(
      `[stripe/webhook] Added ${creditsNum} credits to user ${freelancerUserId} (session: ${session.id})`
    );
  } catch (err) {
    console.error("[stripe/webhook] Failed to add credits:", err);
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/stripe/webhook/route.js
git commit -m "feat(pay-per-lead): handle credit purchase in Stripe webhook"
```

---

## Task 6: Add dashboard navigation items

**Files:**
- Modify: `src/data/dashboard.js`

**Step 1: Add Credits and My Leads to freelancer navigation**

In `src/data/dashboard.js`, find the `freelancerNavigation` array (line 15). Add two items after "My Orders" (id 5, line 21):

```js
{ id: 13, name: "Credits", icon: "flaticon-dollar", path: "/dashboard/credits" },
{ id: 14, name: "My Leads", icon: "flaticon-place", path: "/dashboard/my-leads" },
```

Insert them after the `My Orders` entry (line 21, `{ id: 5, name: "My Orders", ... }`). The `startEnd` / `organizeEnd` slicing in `DashboardNavigation.jsx` uses index 5 / 10, so adding items before index 5 would shift things. Instead, add them at the end of the "Organize and Manage" section. Insert after `{ id: 10, name: "Invoice", ... }` (line 25) and before the "My Profile" entry.

Actually, looking at the freelancerNavigation structure:
- Items 1-5 (index 0-4) = "Start" section
- Items 6-10 (index 5-9) = "Organize and Manage" section
- Items 11-12 (index 10+) = "Account" section

Add Credits and My Leads into the "Organize and Manage" section. Update the `organizeEnd` value from 10 to 12 in `DashboardNavigation.jsx`.

In `src/data/dashboard.js`, change the `freelancerNavigation` array to:

```js
export const freelancerNavigation = [
  { id: 1, name: "Dashboard", icon: "flaticon-home", path: "/dashboard" },
  { id: 2, name: "Manage Services", icon: "flaticon-presentation", path: "/manage-services" },
  { id: 3, name: "Add Services", icon: "flaticon-document", path: "/add-services" },
  { id: 4, name: "My Proposals", icon: "flaticon-document", path: "/proposal" },
  { id: 5, name: "My Orders", icon: "flaticon-receipt", path: "/orders" },
  { id: 6, name: "Message", icon: "flaticon-chat", path: "/message" },
  { id: 7, name: "Reviews", icon: "flaticon-review-1", path: "/reviews" },
  { id: 8, name: "Payouts", icon: "flaticon-dollar", path: "/payouts" },
  { id: 9, name: "Statements", icon: "flaticon-web", path: "/statements" },
  { id: 10, name: "Invoice", icon: "flaticon-receipt", path: "/invoice" },
  { id: 13, name: "Credits", icon: "flaticon-dollar", path: "/dashboard/credits" },
  { id: 14, name: "My Leads", icon: "flaticon-place", path: "/dashboard/my-leads" },
  { id: 11, name: "My Profile", icon: "flaticon-photo", path: "/my-profile" },
  { id: 12, name: "Logout", icon: "flaticon-logout", path: "/login" },
];
```

Then in `src/components/dashboard/header/DashboardNavigation.jsx`, change line 16:

```js
const organizeEnd = isFreelancer ? 12 : 7;
```

**Step 2: Commit**

```bash
git add src/data/dashboard.js src/components/dashboard/header/DashboardNavigation.jsx
git commit -m "feat(pay-per-lead): add Credits and My Leads to freelancer dashboard nav"
```

---

## Task 7: Create Credits dashboard page

**Files:**
- Create: `src/app/(dashboard)/dashboard/credits/page.jsx`
- Create: `src/components/dashboard/section/CreditsInfo.jsx`

**Step 1: Create the CreditsInfo client component**

Create `src/components/dashboard/section/CreditsInfo.jsx`:

```jsx
"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { CREDIT_PACKAGES } from "../../../../convex/marketplace/leadPricing";
import { useState } from "react";
import { toast } from "sonner";

export default function CreditsInfo() {
  const credits = useQuery(api.marketplace.leads.getMyCredits);
  const transactions = useQuery(api.marketplace.leads.getMyTransactions, { limit: 20 });
  const [purchasing, setPurchasing] = useState(null);

  async function handleBuy(packageId) {
    if (!credits?.userId) {
      toast.error("You must be logged in with a freelancer profile to buy credits.");
      return;
    }
    setPurchasing(packageId);
    try {
      const res = await fetch("/api/stripe/credits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId, freelancerUserId: credits.userId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Failed to start checkout.");
        setPurchasing(null);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      setPurchasing(null);
    }
  }

  if (credits === undefined) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-thm" role="status" />
      </div>
    );
  }

  return (
    <div>
      {/* Balance */}
      <div className="row mb30">
        <div className="col-lg-4">
          <div className="dashboard-style1 bdrs8 p30 text-center">
            <h2 className="title mb-1" style={{ fontSize: "3rem", color: "#22c55e" }}>
              {credits?.balance ?? 0}
            </h2>
            <p className="body-color">Credits Available</p>
          </div>
        </div>
      </div>

      {/* Packages */}
      <h4 className="mb20">Buy Credits</h4>
      <div className="row mb40">
        {CREDIT_PACKAGES.map((pkg) => (
          <div key={pkg.id} className="col-sm-6 col-lg-4 mb20">
            <div className="dashboard-style1 bdrs8 p30 text-center position-relative">
              {pkg.id === "popular" && (
                <span
                  className="position-absolute top-0 end-0 badge bg-thm m10"
                  style={{ fontSize: "0.7rem" }}
                >
                  Most Popular
                </span>
              )}
              <h3 className="title mb-1">{pkg.credits}</h3>
              <p className="body-color fz14 mb10">credits</p>
              <h4 className="mb5">€{pkg.priceEur}</h4>
              <p className="body-color fz13 mb15">
                €{(pkg.priceEur / pkg.credits).toFixed(2)} per credit
              </p>
              <button
                className="ud-btn btn-thm bdrs4 w-100"
                onClick={() => handleBuy(pkg.id)}
                disabled={purchasing !== null}
              >
                {purchasing === pkg.id ? "Redirecting..." : `Buy ${pkg.credits} Credits`}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Transaction History */}
      <h4 className="mb20">Transaction History</h4>
      {transactions === undefined ? (
        <div className="spinner-border text-thm" role="status" />
      ) : transactions.length === 0 ? (
        <p className="body-color">No transactions yet. Buy credits to get started.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Description</th>
                <th className="text-end">Credits</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn._id}>
                  <td className="fz14">{new Date(txn.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        txn.type === "purchase"
                          ? "bg-success"
                          : txn.type === "spend"
                          ? "bg-warning"
                          : "bg-info"
                      }`}
                    >
                      {txn.type}
                    </span>
                  </td>
                  <td className="fz14">{txn.description}</td>
                  <td
                    className={`text-end fw-bold ${
                      txn.amount > 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {txn.amount > 0 ? "+" : ""}
                    {txn.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
```

**Step 2: Create the page**

Create `src/app/(dashboard)/dashboard/credits/page.jsx`:

```jsx
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import CreditsInfo from "@/components/dashboard/section/CreditsInfo";

export const metadata = {
  title: "SkillLinkup | Credits",
};

export default function CreditsPage() {
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
                <h2>Lead Credits</h2>
                <p className="text">
                  Buy credits to claim leads from the Local Marketplace. Each lead reveals
                  client contact details so you can reach out directly.
                </p>
              </div>
            </div>
          </div>
          <CreditsInfo />
        </div>
      </DashboardLayout>
    </>
  );
}
```

**Step 3: Commit**

```bash
git add src/components/dashboard/section/CreditsInfo.jsx src/app/\\(dashboard\\)/dashboard/credits/page.jsx
git commit -m "feat(pay-per-lead): add Credits dashboard page with balance, packages, and transaction history"
```

---

## Task 8: Create My Leads dashboard page

**Files:**
- Create: `src/app/(dashboard)/dashboard/my-leads/page.jsx`
- Create: `src/components/dashboard/section/MyLeadsInfo.jsx`

**Step 1: Create the MyLeadsInfo client component**

Create `src/components/dashboard/section/MyLeadsInfo.jsx`:

```jsx
"use client";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";

export default function MyLeadsInfo() {
  const claims = useQuery(api.marketplace.leads.getMyClaims);

  if (claims === undefined) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-thm" role="status" />
      </div>
    );
  }

  if (claims.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="flaticon-place fz40 text mb20 d-block" />
        <h4>No Claimed Leads Yet</h4>
        <p className="body-color mb20">
          Browse quote requests in the Local Marketplace and claim leads to get client details.
        </p>
        <Link href="/local/quote-requests" className="ud-btn btn-thm bdrs4">
          Browse Quote Requests <i className="fal fa-arrow-right-long ms-1" />
        </Link>
      </div>
    );
  }

  return (
    <div className="row">
      {claims.map((claim) => (
        <div key={claim._id} className="col-lg-6 mb20">
          <div className="dashboard-style1 bdrs8 p20">
            <div className="d-flex justify-content-between align-items-start mb10">
              <div>
                <h5 className="list-title mb-1">
                  {claim.request?.title || "Quote Request"}
                </h5>
                <span className="fz13 body-color">{claim.categoryName || "General"}</span>
              </div>
              <span
                className={`badge ${
                  claim.claimType === "exclusive" ? "bg-warning" : "bg-thm"
                }`}
              >
                {claim.claimType === "exclusive" ? "Exclusive" : "Shared"}
              </span>
            </div>

            {claim.request?.description && (
              <p className="body-color fz14 mb15">
                {claim.request.description.length > 200
                  ? claim.request.description.slice(0, 200) + "..."
                  : claim.request.description}
              </p>
            )}

            {/* Client details — only visible because they claimed this lead */}
            {claim.client && (
              <div className="bgc-thm3 bdrs4 p15 mb15">
                <p className="fz13 fw500 mb5">Client Contact</p>
                <p className="fz14 mb-0">
                  <i className="flaticon-user me-1" />
                  {claim.client.name || "—"}
                </p>
                {claim.client.email && (
                  <p className="fz14 mb-0">
                    <i className="flaticon-mail me-1" />
                    <a href={`mailto:${claim.client.email}`}>{claim.client.email}</a>
                  </p>
                )}
                {claim.client.phone && (
                  <p className="fz14 mb-0">
                    <i className="flaticon-call me-1" />
                    <a href={`tel:${claim.client.phone}`}>{claim.client.phone}</a>
                  </p>
                )}
              </div>
            )}

            <div className="d-flex justify-content-between fz13 body-color">
              <span>
                {claim.request?.locationCity && `${claim.request.locationCity}`}
                {claim.request?.budgetIndication && ` · ${claim.request.budgetIndication}`}
              </span>
              <span>
                {claim.creditsSpent} credits · {new Date(claim.claimedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

**Step 2: Create the page**

Create `src/app/(dashboard)/dashboard/my-leads/page.jsx`:

```jsx
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import MyLeadsInfo from "@/components/dashboard/section/MyLeadsInfo";

export const metadata = {
  title: "SkillLinkup | My Leads",
};

export default function MyLeadsPage() {
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
                <h2>My Leads</h2>
                <p className="text">
                  Leads you have claimed. Client contact details are shown below.
                </p>
              </div>
            </div>
          </div>
          <MyLeadsInfo />
        </div>
      </DashboardLayout>
    </>
  );
}
```

**Step 3: Commit**

```bash
git add src/components/dashboard/section/MyLeadsInfo.jsx src/app/\\(dashboard\\)/dashboard/my-leads/page.jsx
git commit -m "feat(pay-per-lead): add My Leads dashboard page with client contact details"
```

---

## Task 9: Build quote request detail page with claim button

**Files:**
- Modify: `src/app/(local)/local/quote-request/[id]/page.jsx` (replace stub)
- Create: `src/components/section/QuoteRequestDetail.jsx`

**Step 1: Create the QuoteRequestDetail client component**

Create `src/components/section/QuoteRequestDetail.jsx`:

```jsx
"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function QuoteRequestDetail({ requestId }) {
  const request = useQuery(api.marketplace.quotes.getRequestById, { requestId });
  const leadStatus = useQuery(api.marketplace.leads.getLeadStatus, { quoteRequestId: requestId });
  const credits = useQuery(api.marketplace.leads.getMyCredits);
  const claimLead = useMutation(api.marketplace.leads.claimLead);
  const [claiming, setClaiming] = useState(false);

  if (request === undefined || leadStatus === undefined) {
    return (
      <section className="pt30 pb90">
        <div className="container text-center py-5">
          <div className="spinner-border text-thm" role="status" />
        </div>
      </section>
    );
  }

  if (!request) {
    return (
      <section className="pt30 pb90">
        <div className="container text-center py-5">
          <h4>Quote Request Not Found</h4>
          <Link href="/local/quote-requests" className="ud-btn btn-thm bdrs4 mt15">
            Back to Quote Requests
          </Link>
        </div>
      </section>
    );
  }

  const isLoggedIn = credits !== null;
  const isFreelancer = credits?.profileId !== null;
  const balance = credits?.balance ?? 0;

  async function handleClaim(claimType) {
    setClaiming(true);
    try {
      const result = await claimLead({ quoteRequestId: requestId, claimType });
      toast.success(
        `Lead claimed! ${result.creditsSpent} credits deducted. New balance: ${result.newBalance}`
      );
    } catch (err) {
      toast.error(err.message || "Failed to claim lead.");
    } finally {
      setClaiming(false);
    }
  }

  return (
    <section className="pt30 pb90">
      <div className="container">
        <div className="row">
          {/* Main content */}
          <div className="col-lg-8">
            <div className="bdr1 bdrs8 p30 mb30">
              <h3 className="mb15">{request.title}</h3>

              <div className="d-flex gap-3 mb20 fz14 body-color">
                <span><i className="flaticon-place me-1" />{request.locationCity || "No location"}</span>
                <span><i className="flaticon-briefcase me-1" />{request.categoryName || "General"}</span>
                <span><i className="flaticon-dollar me-1" />{request.budgetIndication || "Flexible"}</span>
              </div>

              <h5 className="mb10">Description</h5>
              {leadStatus?.alreadyClaimed ? (
                <p className="fz15">{request.description}</p>
              ) : (
                <div>
                  <p className="fz15">
                    {request.description?.slice(0, 150)}
                    {request.description?.length > 150 && "..."}
                  </p>
                  {request.description?.length > 150 && (
                    <p className="fz13 body-color">
                      <i className="flaticon-lock me-1" />
                      Claim this lead to see the full description and client details.
                    </p>
                  )}
                </div>
              )}

              {request.preferredDate && (
                <p className="fz14 body-color mt15">
                  <i className="flaticon-calendar me-1" />
                  Preferred date: {new Date(request.preferredDate).toLocaleDateString()}
                </p>
              )}

              {/* Client details (only if claimed) */}
              {leadStatus?.alreadyClaimed && (
                <div className="bgc-thm3 bdrs8 p20 mt20">
                  <h5 className="mb10">Client Contact</h5>
                  <p className="fz14 mb5">
                    <i className="flaticon-user me-1" />
                    {request.clientName || "—"}
                  </p>
                  <p className="body-color fz13">
                    You have claimed this lead. Check your{" "}
                    <Link href="/dashboard/my-leads" className="text-thm">
                      My Leads
                    </Link>{" "}
                    page for full contact details.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-lg-4">
            <div className="bdr1 bdrs8 p30">
              <h5 className="mb15">Lead Status</h5>

              <div className="d-flex justify-content-between fz14 mb10">
                <span>Slots taken</span>
                <span className="fw500">
                  {leadStatus?.claimedSlots ?? 0} / {leadStatus?.maxSlots ?? 3}
                </span>
              </div>

              <div className="d-flex justify-content-between fz14 mb10">
                <span>Slots remaining</span>
                <span className="fw500">{leadStatus?.slotsRemaining ?? 3}</span>
              </div>

              <div className="d-flex justify-content-between fz14 mb20">
                <span>Your balance</span>
                <span className="fw500">{balance} credits</span>
              </div>

              <hr className="mb20" />

              {leadStatus?.alreadyClaimed ? (
                <div className="text-center">
                  <i className="flaticon-review-1 fz30 text-success d-block mb10" />
                  <p className="fw500">You claimed this lead</p>
                </div>
              ) : request.status !== "open" ? (
                <p className="text-center body-color">This request is closed.</p>
              ) : !isLoggedIn ? (
                <Link href="/login" className="ud-btn btn-thm bdrs4 w-100">
                  Log In to Claim
                </Link>
              ) : !isFreelancer ? (
                <p className="fz13 body-color text-center">
                  You need a freelancer profile to claim leads.
                </p>
              ) : (
                <div>
                  {/* Shared claim */}
                  {leadStatus?.slotsRemaining > 0 && !leadStatus?.isExclusive && (
                    <button
                      className="ud-btn btn-thm bdrs4 w-100 mb10"
                      onClick={() => handleClaim("shared")}
                      disabled={claiming || balance < leadStatus.creditCost}
                    >
                      {claiming
                        ? "Claiming..."
                        : `Claim Lead (${leadStatus.creditCost} credits)`}
                    </button>
                  )}

                  {/* Exclusive claim */}
                  {leadStatus?.canClaimExclusive && (
                    <button
                      className="ud-btn btn-thm2 bdrs4 w-100 mb10"
                      onClick={() => handleClaim("exclusive")}
                      disabled={claiming || balance < leadStatus.exclusiveCost}
                    >
                      {claiming
                        ? "Claiming..."
                        : `Claim Exclusive (${leadStatus.exclusiveCost} credits)`}
                    </button>
                  )}

                  {/* Insufficient credits warning */}
                  {balance < leadStatus?.creditCost && (
                    <div className="mt10 text-center">
                      <p className="fz13 text-danger mb10">Insufficient credits</p>
                      <Link href="/dashboard/credits" className="ud-btn btn-white bdrs4 w-100">
                        Buy Credits
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Update the quote request detail page**

Replace the contents of `src/app/(local)/local/quote-request/[id]/page.jsx`:

```jsx
import QuoteRequestDetail from "@/components/section/QuoteRequestDetail";

export const metadata = { title: "Quote Request — SkillLinkup" };

export default async function QuoteRequestDetailPage({ params }) {
  const { id } = await params;
  return <QuoteRequestDetail requestId={id} />;
}
```

**Step 3: Commit**

```bash
git add src/components/section/QuoteRequestDetail.jsx src/app/\\(local\\)/local/quote-request/\\[id\\]/page.jsx
git commit -m "feat(pay-per-lead): build quote request detail page with claim buttons and credit cost display"
```

---

## Task 10: Update QuoteRequestListing to show lead slots

**Files:**
- Modify: `src/components/section/QuoteRequestListing.jsx`

**Step 1: Update listing cards to show slot info and budget**

Replace the content of `src/components/section/QuoteRequestListing.jsx`:

```jsx
"use client";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";

export default function QuoteRequestListing() {
  const requests = useQuery(api.marketplace.quotes.listRequests, { limit: 20 });

  if (requests === undefined) {
    return (
      <section className="pt30 pb90">
        <div className="container text-center py-5">
          <div className="spinner-border text-thm" role="status" />
        </div>
      </section>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <section className="pt30 pb90">
        <div className="container text-center py-5">
          <i className="flaticon-clipboard fz40 text mb20 d-block" />
          <h4>No Quote Requests Yet</h4>
          <p className="body-color">Check back soon for local service requests.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt30 pb90">
      <div className="container">
        <div className="row">
          {requests.map((req) => {
            const claimedSlots = req.claimedSlots ?? 0;
            const maxSlots = req.isExclusive ? 1 : (req.maxSlots ?? 3);
            const slotsRemaining = Math.max(0, maxSlots - claimedSlots);
            const isFull = slotsRemaining === 0;

            return (
              <div key={req._id} className="col-sm-6 col-lg-4 mb20">
                <div className={`listing-style1 bdrs8 p20 ${isFull ? "opacity-50" : ""}`}>
                  <div className="d-flex justify-content-between align-items-start mb10">
                    <h5 className="list-title mb-1">
                      {req.title || req.description?.slice(0, 50) || "Quote Request"}
                    </h5>
                    {req.isExclusive && (
                      <span className="badge bg-warning fz11">Exclusive</span>
                    )}
                  </div>
                  <p className="body-color fz13 mb10">{req.categoryName || "General"}</p>
                  <p className="body-color fz14 mb15">
                    {req.description?.length > 120
                      ? req.description.slice(0, 120) + "..."
                      : req.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mb10">
                    <span className="fz13 body-color">
                      {req.budgetIndication || "Flexible"}
                    </span>
                    <span className="fz13 body-color">
                      {slotsRemaining}/{maxSlots} slots
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    {req.locationCity && (
                      <span className="fz13 body-color">
                        <i className="flaticon-place me-1" />{req.locationCity}
                      </span>
                    )}
                    <Link
                      href={`/local/quote-request/${req._id}`}
                      className={`ud-btn ${isFull ? "btn-white" : "btn-thm2"} bdrs4`}
                      style={{ fontSize: "0.8rem", padding: "6px 14px" }}
                    >
                      {isFull ? "Full" : "View"} <i className="fal fa-arrow-right-long ms-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/section/QuoteRequestListing.jsx
git commit -m "feat(pay-per-lead): show lead slots remaining and exclusive status in listing"
```

---

## Task 11: Build verification

**Step 1: Run the build**

```bash
npm run build
```

Expected: Build succeeds with no errors. If there are TypeScript issues with the Convex imports (leadPricing is `.ts` imported from `.js`), the build should still work since Next.js transpiles TypeScript.

**Step 2: Start dev server and verify pages**

```bash
npm run dev
```

Visit:
- `http://localhost:3000/local/quote-requests` — verify listing shows slot counts
- `http://localhost:3000/dashboard/credits` — verify credits page loads with balance + packages
- `http://localhost:3000/dashboard/my-leads` — verify empty state with link to quote requests

**Step 3: Commit build verification (if any fixes needed)**

If any fixes are required, commit them:

```bash
git add -A
git commit -m "fix(pay-per-lead): build fixes"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Schema changes | `convex/schema.ts` |
| 2 | Lead pricing utility | `convex/marketplace/leadPricing.ts` |
| 3 | Lead claim mutations + queries | `convex/marketplace/leads.ts` |
| 4 | Stripe credit checkout route | `src/app/api/stripe/credits/route.js` |
| 5 | Webhook credit purchase handler | `src/app/api/stripe/webhook/route.js` |
| 6 | Dashboard nav items | `src/data/dashboard.js`, `DashboardNavigation.jsx` |
| 7 | Credits dashboard page | `CreditsInfo.jsx`, `credits/page.jsx` |
| 8 | My Leads dashboard page | `MyLeadsInfo.jsx`, `my-leads/page.jsx` |
| 9 | Quote request detail + claim | `QuoteRequestDetail.jsx`, `[id]/page.jsx` |
| 10 | Quote listing slot display | `QuoteRequestListing.jsx` |
| 11 | Build verification | — |
