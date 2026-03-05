# Reward System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a dual reward system — cashback credit tiers for clients (Bronze/Silver/Gold) and automatic performance levels for freelancers (New/Rising/Pro/Top Rated) — to increase retention and repeat orders.

**Architecture:** New fields on `users` and `freelancerProfiles`, a new `rewardTransactions` Convex table, and a new `convex/marketplace/rewards.ts` file with internal mutations hooked into `orders.approve`. Client-facing dashboard page at `/dashboard/rewards`, freelancer level shown on profile cards and detail pages.

**Tech Stack:** Convex (schema, internal mutations, queries), Next.js App Router (dashboard page), React (UI components). No new external dependencies.

---

## Important Context

- **Convex schema file**: `convex/schema.ts`
- **Orders approve hook point**: `convex/marketplace/orders.ts` → `approve` mutation (line 370). Already uses `ctx.scheduler.runAfter` for emails — use same pattern.
- **Auth helper**: `convex/lib/authHelpers.ts` exports `requireAuthUser`.
- **Dashboard nav data**: `src/data/dashboard.js` — object of route definitions, `dashboardNavigation[role][world]`.
- **Dashboard page pattern**: `src/app/(dashboard)/[path]/page.jsx` — import `DashboardLayout` from `@/components/dashboard/DashboardLayout`, render a section component inside it.
- **FreelancerCard2**: `src/components/card/FreelancerCard2.jsx` — already renders `data.level` on line 50 but hardcoded.
- **FreelancerDetails3**: `src/components/section/FreelancerDetails3.jsx` — public profile detail page, uses `useConvexFreelancerDetail` hook.
- **Amounts are in euros (whole numbers)**, NOT cents. `order.amount` is in EUR. E.g. €100 order → 3% cashback = 3 credits. Credits stored as integers (cents-equivalent for rounding safety — store in cents, display in euros).
- **Deploy Convex separately** after schema/function changes: `npx convex deploy -y`
- **`createdAt` on `freelancerProfiles`** is a Unix timestamp in milliseconds. "Account ≥3 months" = `createdAt <= Date.now() - 90 * 24 * 60 * 60 * 1000`.
- **Internal functions** in Convex: defined with `internalMutation` from `"../internal"` or `"convex/_generated/server"`, called via `ctx.scheduler.runAfter(0, internal.marketplace.rewards.xxx, args)`.

---

## Task 1: Schema — Add reward fields

**Files:**
- Modify: `convex/schema.ts`

**What to add:**

1. On the `users` table (after `lastActiveAt`, before `createdAt`):
```ts
clientCreditBalance: v.optional(v.number()), // cents, default 0
clientTier: v.optional(v.string()),           // "bronze" | "silver" | "gold"
clientYearlySpend: v.optional(v.number()),    // cents, cumulative this calendar year
```

2. On the `freelancerProfiles` table (after `creditBalance`, before `status`):
```ts
level: v.optional(v.string()), // "new" | "rising" | "pro" | "top_rated"
```

3. New table at the end, before the closing `}`):
```ts
rewardTransactions: defineTable({
  userId: v.id("users"),
  tenantId: v.id("tenants"),
  type: v.string(), // "cashback_earned" | "credit_used" | "tier_upgrade"
  amount: v.number(), // in cents
  orderId: v.optional(v.id("orders")),
  description: v.string(),
  createdAt: v.number(),
})
  .index("by_user", ["userId"])
  .index("by_user_createdAt", ["userId", "createdAt"]),
```

**Step 1: Open `convex/schema.ts` and make the three additions above.**

On the `users` table, find the line `lastActiveAt: v.optional(v.number()),` and add after it:
```ts
clientCreditBalance: v.optional(v.number()),
clientTier: v.optional(v.string()),
clientYearlySpend: v.optional(v.number()),
```

On `freelancerProfiles`, find `creditBalance: v.optional(v.number()),` and add after it:
```ts
level: v.optional(v.string()),
```

Add the `rewardTransactions` table block at the bottom (before the final `}`).

**Step 2: Verify the file has no TypeScript errors**
```bash
cd /home/marvin/Projecten/Skilllinkup && npx tsc --noEmit 2>&1 | head -30
```
Expected: no errors (or only pre-existing unrelated errors).

**Step 3: Commit**
```bash
git add convex/schema.ts
git commit -m "feat(rewards): add schema fields for client tiers, credits, freelancer levels, rewardTransactions table"
```

---

## Task 2: Create `convex/marketplace/rewards.ts`

**Files:**
- Create: `convex/marketplace/rewards.ts`

This file contains:
- 2 internal mutations (called from orders.approve)
- 4 public functions (queries + 1 mutation for applying credits)

**Step 1: Create the file with this exact content:**

```ts
import { v } from "convex/values";
import { internalMutation, mutation, query } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";

// ---- Tier helpers ----

function getTier(yearlySpendCents: number): "bronze" | "silver" | "gold" {
  if (yearlySpendCents >= 500_000) return "gold";   // €5,000+
  if (yearlySpendCents >= 100_000) return "silver"; // €1,000+
  return "bronze";
}

function getCashbackRate(tier: "bronze" | "silver" | "gold"): number {
  if (tier === "gold") return 0.07;
  if (tier === "silver") return 0.05;
  return 0.03;
}

// ---- Level helpers ----

function calculateLevel(
  totalOrders: number,
  ratingAverage: number,
  completionRate: number,
  accountAgeMs: number
): "new" | "rising" | "pro" | "top_rated" {
  const threeMonths = 90 * 24 * 60 * 60 * 1000;
  const sixMonths = 180 * 24 * 60 * 60 * 1000;

  if (
    totalOrders >= 50 &&
    ratingAverage >= 4.9 &&
    completionRate >= 95 &&
    accountAgeMs >= sixMonths
  ) {
    return "top_rated";
  }
  if (
    totalOrders >= 20 &&
    ratingAverage >= 4.7 &&
    completionRate >= 90 &&
    accountAgeMs >= threeMonths
  ) {
    return "pro";
  }
  if (totalOrders >= 5 && ratingAverage >= 4.5 && completionRate >= 85) {
    return "rising";
  }
  return "new";
}

// ---- Internal: called from orders.approve ----

export const processOrderCashback = internalMutation({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId);
    if (!order || order.status !== "completed") return;

    const client = await ctx.db.get(order.clientId);
    if (!client) return;

    const now = Date.now();
    const currentYear = new Date(now).getFullYear();

    // Only count spend within the current calendar year
    const orderYear = new Date(order.createdAt).getFullYear();
    const amountCents = Math.round(order.amount * 100);

    // Update yearly spend (reset if new year)
    const existingYearlySpend = client.clientYearlySpend ?? 0;
    // Note: yearly reset is handled by checking the year; simple approach:
    // we always add to clientYearlySpend (admin resets on Jan 1 via scheduled job — out of scope)
    const newYearlySpend = existingYearlySpend + amountCents;

    const tier = getTier(newYearlySpend);
    const previousTier = client.clientTier ?? "bronze";
    const cashbackRate = getCashbackRate(tier);
    const cashbackCents = Math.round(amountCents * cashbackRate);

    const currentBalance = client.clientCreditBalance ?? 0;
    const newBalance = currentBalance + cashbackCents;

    // Patch the user
    await ctx.db.patch(order.clientId, {
      clientCreditBalance: newBalance,
      clientTier: tier,
      clientYearlySpend: newYearlySpend,
      updatedAt: now,
    });

    // Log cashback transaction
    const tenant = await ctx.db.query("tenants").first();
    if (!tenant) return;

    await ctx.db.insert("rewardTransactions", {
      userId: order.clientId,
      tenantId: tenant._id,
      type: "cashback_earned",
      amount: cashbackCents,
      orderId: args.orderId,
      description: `${Math.round(cashbackRate * 100)}% cashback on order "${order.title}"`,
      createdAt: now,
    });

    // Log tier upgrade if tier changed
    if (tier !== previousTier) {
      await ctx.db.insert("rewardTransactions", {
        userId: order.clientId,
        tenantId: tenant._id,
        type: "tier_upgrade",
        amount: 0,
        orderId: args.orderId,
        description: `Tier upgraded from ${previousTier} to ${tier}`,
        createdAt: now + 1,
      });
    }
  },
});

export const recalculateFreelancerLevel = internalMutation({
  args: { freelancerProfileId: v.id("freelancerProfiles") },
  handler: async (ctx, args) => {
    const profile = await ctx.db.get(args.freelancerProfileId);
    if (!profile) return;

    const accountAgeMs = Date.now() - profile.createdAt;
    const newLevel = calculateLevel(
      profile.totalOrders ?? 0,
      profile.ratingAverage ?? 0,
      profile.completionRate ?? 0,
      accountAgeMs
    );

    // Levels only go up
    const levelOrder = { new: 0, rising: 1, pro: 2, top_rated: 3 };
    const currentLevel = (profile.level ?? "new") as keyof typeof levelOrder;
    if (levelOrder[newLevel] > levelOrder[currentLevel]) {
      await ctx.db.patch(args.freelancerProfileId, {
        level: newLevel,
        updatedAt: Date.now(),
      });
    }
  },
});

// ---- Public queries ----

export const getClientRewards = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return null;

    const tier = (user.clientTier ?? "bronze") as "bronze" | "silver" | "gold";
    const yearlySpendCents = user.clientYearlySpend ?? 0;
    const balanceCents = user.clientCreditBalance ?? 0;

    // Progress to next tier
    const tierThresholds = { bronze: 0, silver: 100_000, gold: 500_000 };
    const nextTierThreshold =
      tier === "gold" ? null : tier === "silver" ? 500_000 : 100_000;
    const progressToNextTier = nextTierThreshold
      ? Math.min(100, Math.round((yearlySpendCents / nextTierThreshold) * 100))
      : 100;

    return {
      tier,
      balanceCents,
      balanceEuros: balanceCents / 100,
      yearlySpendCents,
      yearlySpendEuros: yearlySpendCents / 100,
      cashbackRate: getCashbackRate(tier),
      nextTierThreshold,
      progressToNextTier,
    };
  },
});

export const getFreelancerLevel = query({
  args: { profileId: v.id("freelancerProfiles") },
  handler: async (ctx, args) => {
    const profile = await ctx.db.get(args.profileId);
    if (!profile) return null;

    const level = (profile.level ?? "new") as "new" | "rising" | "pro" | "top_rated";
    const levelOrder = { new: 0, rising: 1, pro: 2, top_rated: 3 };
    const accountAgeMs = Date.now() - profile.createdAt;
    const accountAgeDays = Math.floor(accountAgeMs / (24 * 60 * 60 * 1000));

    return {
      level,
      totalOrders: profile.totalOrders ?? 0,
      ratingAverage: profile.ratingAverage ?? 0,
      completionRate: profile.completionRate ?? 0,
      accountAgeDays,
      // Progress to next level
      nextLevel:
        level === "top_rated"
          ? null
          : level === "pro"
          ? "top_rated"
          : level === "rising"
          ? "pro"
          : "rising",
    };
  },
});

export const getRewardHistory = query({
  args: {
    userId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("rewardTransactions")
      .withIndex("by_user_createdAt", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(args.limit ?? 20);
  },
});

// ---- Apply credits at checkout ----

export const applyCredits = mutation({
  args: {
    orderId: v.id("orders"),
    creditsToUseCents: v.number(), // in cents
  },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);

    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Order not found.");
    if (order.clientId !== user._id) throw new Error("Unauthorized.");

    const currentBalance = user.clientCreditBalance ?? 0;
    if (args.creditsToUseCents > currentBalance) {
      throw new Error("Insufficient credit balance.");
    }

    // Max 50% of order amount
    const maxCredits = Math.round(order.amount * 100 * 0.5);
    const actualCredits = Math.min(args.creditsToUseCents, maxCredits);

    await ctx.db.patch(user._id, {
      clientCreditBalance: currentBalance - actualCredits,
      updatedAt: Date.now(),
    });

    const tenant = await ctx.db.query("tenants").first();
    if (!tenant) throw new Error("No tenant found.");

    await ctx.db.insert("rewardTransactions", {
      userId: user._id,
      tenantId: tenant._id,
      type: "credit_used",
      amount: -actualCredits,
      orderId: args.orderId,
      description: `Credits applied to order "${order.title}"`,
      createdAt: Date.now(),
    });

    return { appliedCents: actualCredits };
  },
});
```

**Step 2: Verify TypeScript**
```bash
cd /home/marvin/Projecten/Skilllinkup && npx tsc --noEmit 2>&1 | head -30
```
Expected: no new errors.

**Step 3: Commit**
```bash
git add convex/marketplace/rewards.ts
git commit -m "feat(rewards): add rewards.ts with cashback, level recalculation, and credit queries"
```

---

## Task 3: Hook rewards into `orders.approve`

**Files:**
- Modify: `convex/marketplace/orders.ts`

The `approve` mutation (around line 370) needs to schedule two internal reward functions after marking the order as completed.

**Step 1: Add import for `internal` API**

The file already has `import { internal } from "../_generated/api";` at the top (line 3). Verify this is present.

**Step 2: In the `approve` mutation handler, after the `ctx.db.patch(args.orderId, {...})` call and before the email scheduling, add:**

```ts
// Schedule reward processing
await ctx.scheduler.runAfter(0, internal.marketplace.rewards.processOrderCashback, {
  orderId: args.orderId,
});

if (order.freelancerId) {
  await ctx.scheduler.runAfter(0, internal.marketplace.rewards.recalculateFreelancerLevel, {
    freelancerProfileId: order.freelancerId,
  });
}
```

Place this block right after the `ctx.db.patch(args.orderId, {...})` call (around line 392–397 in the original file), before the freelancer email block.

**Step 3: Verify TypeScript**
```bash
cd /home/marvin/Projecten/Skilllinkup && npx tsc --noEmit 2>&1 | head -30
```

**Step 4: Deploy Convex**
```bash
cd /home/marvin/Projecten/Skilllinkup && npx convex deploy -y
```
Expected: "Convex functions ready!" with no errors.

**Step 5: Commit**
```bash
git add convex/marketplace/orders.ts
git commit -m "feat(rewards): hook processOrderCashback and recalculateFreelancerLevel into orders.approve"
```

---

## Task 4: Client rewards dashboard page

**Files:**
- Create: `src/app/(dashboard)/dashboard/rewards/page.jsx`
- Create: `src/components/dashboard/section/RewardsInfo.jsx`

**Step 1: Create the section component `src/components/dashboard/section/RewardsInfo.jsx`:**

```jsx
"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";

const TIER_COLORS = {
  bronze: { bg: "#cd7f32", text: "#fff", label: "Bronze" },
  silver: { bg: "#9e9e9e", text: "#fff", label: "Silver" },
  gold:   { bg: "#ffd700", text: "#333", label: "Gold" },
};

const TRANSACTION_LABELS = {
  cashback_earned: { icon: "flaticon-add", color: "text-success", prefix: "+" },
  credit_used:     { icon: "flaticon-minus", color: "text-danger", prefix: "-" },
  tier_upgrade:    { icon: "flaticon-up-arrow", color: "text-primary", prefix: "" },
};

function TierBadge({ tier }) {
  const config = TIER_COLORS[tier] || TIER_COLORS.bronze;
  return (
    <span
      className="badge px-3 py-2 fz14 fw600 bdrs20"
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {config.label}
    </span>
  );
}

function ProgressBar({ value, label, color = "#ef2b70" }) {
  return (
    <div className="mb15">
      <div className="d-flex justify-content-between mb5">
        <span className="fz14 text-dark">{label}</span>
        <span className="fz14 fw500">{value}%</span>
      </div>
      <div className="progress" style={{ height: 8, borderRadius: 4 }}>
        <div
          className="progress-bar"
          style={{ width: `${value}%`, backgroundColor: color, borderRadius: 4 }}
        />
      </div>
    </div>
  );
}

export default function RewardsInfo() {
  const { convexUser } = useConvexUser();

  const rewards = useQuery(
    api.marketplace.rewards.getClientRewards,
    convexUser ? { userId: convexUser._id } : "skip"
  );

  const history = useQuery(
    api.marketplace.rewards.getRewardHistory,
    convexUser ? { userId: convexUser._id, limit: 15 } : "skip"
  );

  if (!convexUser || rewards === undefined) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 200 }}>
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  const tier = rewards?.tier || "bronze";
  const tierLabel = TIER_COLORS[tier]?.label || "Bronze";
  const balanceEuros = ((rewards?.balanceCents || 0) / 100).toFixed(2);
  const yearlySpendEuros = ((rewards?.yearlySpendCents || 0) / 100).toFixed(2);
  const nextTierAmount = rewards?.nextTierThreshold
    ? (rewards.nextTierThreshold / 100).toFixed(0)
    : null;
  const cashbackPct = Math.round((rewards?.cashbackRate || 0.03) * 100);

  return (
    <div className="row">
      {/* Left: Tier card */}
      <div className="col-md-5 mb30">
        <div className="ps-widget bdrs8 p30 bdr1 mb25">
          <h5 className="mb20">Your Rewards</h5>
          <div className="d-flex align-items-center gap-3 mb20">
            <TierBadge tier={tier} />
            <span className="fz14 text-muted">Member</span>
          </div>

          <div className="mb20">
            <p className="fz13 text-muted mb5">Credit Balance</p>
            <h3 className="mb0" style={{ color: "#ef2b70" }}>€{balanceEuros}</h3>
          </div>

          <div className="mb20">
            <p className="fz13 text-muted mb5">Yearly Spend</p>
            <h5 className="mb0">€{yearlySpendEuros}</h5>
          </div>

          <div className="mb20">
            <p className="fz13 text-muted mb5">Cashback Rate</p>
            <h5 className="mb0">{cashbackPct}% per completed order</h5>
          </div>

          {nextTierAmount && (
            <>
              <hr className="opacity-100 mb15 mt15" />
              <p className="fz13 text-muted mb10">
                Progress to {tier === "bronze" ? "Silver" : "Gold"} (€{nextTierAmount})
              </p>
              <ProgressBar
                value={rewards?.progressToNextTier || 0}
                label={`€${yearlySpendEuros} / €${nextTierAmount}`}
                color={tier === "bronze" ? "#9e9e9e" : "#ffd700"}
              />
            </>
          )}

          {tier === "gold" && (
            <div className="alert alert-warning mt15 fz13 mb0">
              🥇 You're a Gold member — maximum cashback!
            </div>
          )}
        </div>

        {/* Tier overview */}
        <div className="ps-widget bdrs8 p30 bdr1">
          <h6 className="mb15">Tier Overview</h6>
          {[
            { key: "bronze", label: "Bronze", threshold: "€0+", rate: "3%" },
            { key: "silver", label: "Silver", threshold: "€1.000+/yr", rate: "5%" },
            { key: "gold",   label: "Gold",   threshold: "€5.000+/yr", rate: "7%" },
          ].map((t) => (
            <div
              key={t.key}
              className="d-flex align-items-center justify-content-between mb10 pb10"
              style={{ borderBottom: "1px solid #f0f0f0", opacity: t.key === tier ? 1 : 0.5 }}
            >
              <TierBadge tier={t.key} />
              <span className="fz13 text-muted">{t.threshold}</span>
              <span className="fz13 fw500">{t.rate} cashback</span>
              {t.key === tier && <i className="flaticon-check text-success fz16" />}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Transaction history */}
      <div className="col-md-7 mb30">
        <div className="ps-widget bdrs8 p30 bdr1">
          <h5 className="mb20">Credit History</h5>
          {!history || history.length === 0 ? (
            <div className="text-center py40 text-muted">
              <i className="flaticon-dollar fz40 mb15 d-block" />
              <p>No reward transactions yet.<br />Complete your first order to earn credits!</p>
            </div>
          ) : (
            <div className="table-style3 table-responsive mb0">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th className="text-end">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((tx) => {
                    const config = TRANSACTION_LABELS[tx.type] || TRANSACTION_LABELS.cashback_earned;
                    const amountEuros = Math.abs(tx.amount / 100).toFixed(2);
                    const date = new Date(tx.createdAt).toLocaleDateString("nl-NL", {
                      day: "2-digit", month: "short", year: "numeric",
                    });
                    return (
                      <tr key={tx._id}>
                        <td className="fz13 text-muted">{date}</td>
                        <td className="fz13">{tx.description}</td>
                        <td className={`text-end fz13 fw500 ${config.color}`}>
                          {tx.type !== "tier_upgrade"
                            ? `${config.prefix}€${amountEuros}`
                            : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Create the page `src/app/(dashboard)/dashboard/rewards/page.jsx`:**

```jsx
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import RewardsInfo from "@/components/dashboard/section/RewardsInfo";

export const metadata = {
  title: "SkillLinkup | My Rewards",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <RewardsInfo />
      </DashboardLayout>
    </>
  );
}
```

**Step 3: Verify the app still builds**
```bash
cd /home/marvin/Projecten/Skilllinkup && npm run build 2>&1 | tail -20
```
Expected: build succeeds (or only pre-existing errors).

**Step 4: Commit**
```bash
git add src/app/(dashboard)/dashboard/rewards/ src/components/dashboard/section/RewardsInfo.jsx
git commit -m "feat(rewards): add client rewards dashboard page with tier badge, credit balance, and history"
```

---

## Task 5: Add Rewards to sidebar navigation

**Files:**
- Modify: `src/data/dashboard.js`

**Step 1: Add a new nav item constant** after the existing `_quoteReqs` constant:

```js
const _rewards = { id: 20, name: "Rewards",  icon: "flaticon-star",  path: "/dashboard/rewards" };
```

**Step 2: Add `_rewards` to the client navigation** in all three worlds (online, local, jobs). In the `client` block, add to `organize` arrays:

```js
client: {
  online: {
    start:    [_dashboard, _myProjects, _createProj, _orders, _saved],
    organize: [_message, _reviews, _rewards],   // ← add _rewards
    account:  [_profile],
  },
  local: {
    start:    [_dashboard, _orders, _saved],
    organize: [_message, _reviews, _rewards],   // ← add _rewards
    account:  [_profile],
  },
  jobs: {
    start:    [_dashboard, _myProjects, _createProj, _orders, _saved],
    organize: [_message, _reviews, _rewards],   // ← add _rewards
    account:  [_profile],
  },
},
```

**Step 3: Verify file is valid JS**
```bash
node -e "require('./src/data/dashboard.js')" 2>&1
```
Expected: no errors (runs silently).

**Step 4: Commit**
```bash
git add src/data/dashboard.js
git commit -m "feat(rewards): add Rewards to client dashboard sidebar navigation"
```

---

## Task 6: FreelancerCard2 — show real level badge

**Files:**
- Modify: `src/components/card/FreelancerCard2.jsx`

The card already renders `data.level` in a "Level" section (line 50). Currently it only handles `"top-rated"` and falls back to `"New"`. Update to handle all 4 levels with color chips.

**Step 1: Replace the Level section in `FreelancerCard2.jsx`.**

Find the block (around lines 47–51):
```jsx
<a className="meta fw500 text-start">
  Level
  <br />
  <span className="fz14 fw400">{data.level === "top-rated" ? "Top Rated" : "New"}</span>
</a>
```

Replace with:
```jsx
<a className="meta fw500 text-start">
  Level
  <br />
  <LevelBadge level={data.level} />
</a>
```

**Step 2: Add the `LevelBadge` helper above the component:**

```jsx
const LEVEL_CONFIG = {
  top_rated: { label: "Top Rated", color: "#1a73e8", textColor: "#fff" },
  pro:       { label: "Pro",       color: "#ef2b70", textColor: "#fff" },
  rising:    { label: "Rising",    color: "#22c55e", textColor: "#fff" },
  new:       { label: "New",       color: "#9ca3af", textColor: "#fff" },
};

function LevelBadge({ level }) {
  const config = LEVEL_CONFIG[level] || LEVEL_CONFIG.new;
  return (
    <span
      className="badge fz11 fw500 px-2 py-1"
      style={{ backgroundColor: config.color, color: config.textColor, borderRadius: 12 }}
    >
      {config.label}
    </span>
  );
}
```

**Step 3: Verify build**
```bash
cd /home/marvin/Projecten/Skilllinkup && npm run build 2>&1 | tail -20
```

**Step 4: Commit**
```bash
git add src/components/card/FreelancerCard2.jsx
git commit -m "feat(rewards): show real freelancer level badge (New/Rising/Pro/Top Rated) in FreelancerCard2"
```

---

## Task 7: FreelancerDetails3 — level badge on public profile

**Files:**
- Modify: `src/components/section/FreelancerDetails3.jsx`

The `useConvexFreelancerDetail` hook returns the freelancer profile. Add a level badge to the `ProfileSidebar` component.

**Step 1: Find the `ProfileSidebar` component inside `FreelancerDetails3.jsx`.**

Find where the sidebar renders stats. Look for `ratingAverage` or `totalOrders` mentions in the sidebar to find the right section. The sidebar already shows rating, skills, etc.

**Step 2: Add a level badge section to `ProfileSidebar`. Find the closing of the hourly rate / contact block (the `<div className="price-widget...">` block) and after it, add:**

```jsx
{/* Level badge */}
{convexData?.level && convexData.level !== "new" && (
  <div className="ps-widget bdrs8 p30 bdr1 mb30">
    <h6 className="mb15">Seller Level</h6>
    {(() => {
      const LEVEL_CONFIG = {
        top_rated: { label: "Top Rated", color: "#1a73e8" },
        pro:       { label: "Pro",       color: "#ef2b70" },
        rising:    { label: "Rising",    color: "#22c55e" },
      };
      const cfg = LEVEL_CONFIG[convexData.level];
      if (!cfg) return null;
      return (
        <div className="d-flex align-items-center gap-2">
          <span
            className="badge px-3 py-2 fz14 fw600"
            style={{ backgroundColor: cfg.color, color: "#fff", borderRadius: 12 }}
          >
            {cfg.label}
          </span>
          {convexData.level === "top_rated" && (
            <span className="fz13 text-muted">Top 1% of sellers</span>
          )}
          {convexData.level === "pro" && (
            <span className="fz13 text-muted">Verified professional</span>
          )}
          {convexData.level === "rising" && (
            <span className="fz13 text-muted">Up-and-coming seller</span>
          )}
        </div>
      );
    })()}
  </div>
)}
```

**Step 3: Verify build**
```bash
cd /home/marvin/Projecten/Skilllinkup && npm run build 2>&1 | tail -20
```

**Step 4: Commit**
```bash
git add src/components/section/FreelancerDetails3.jsx
git commit -m "feat(rewards): show freelancer level badge on public profile page (FreelancerDetails3)"
```

---

## Task 8: Deploy to Convex + final verification

**Step 1: Deploy Convex functions**
```bash
cd /home/marvin/Projecten/Skilllinkup && npx convex deploy -y
```
Expected: "✔ Convex functions ready!"

**Step 2: Do a full production build**
```bash
npm run build 2>&1 | tail -30
```
Expected: build succeeds.

**Step 3: Verify locally at `http://localhost:3000`**
```bash
npm run dev
```
Check:
- [ ] Dashboard sidebar shows "Rewards" for a client user
- [ ] `/dashboard/rewards` loads without error (even with empty data)
- [ ] Freelancer cards on `/online/freelancers` show level chips
- [ ] A freelancer's public profile shows level badge (if level is not "new")

**Step 4: Commit any final fixes, then push**
```bash
git push origin main
```
Note: pushing to main triggers Vercel deploy. Convex was already deployed in Step 1.

---

## What's Out of Scope (YAGNI)

- Yearly credit reset job (Jan 1) — credits just accumulate; admin can reset manually in Convex dashboard
- "Apply credits at checkout" UI toggle — `applyCredits` mutation exists but no UI yet; can add in a future sprint
- Email notifications for tier upgrades
- Admin dashboard for manual adjustments
- Freelancer level metrics progress bars on dashboard (can add to `/my-profile` later)
