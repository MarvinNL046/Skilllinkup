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
    const amountCents = Math.round(order.amount * 100);

    const existingYearlySpend = client.clientYearlySpend ?? 0;
    const newYearlySpend = existingYearlySpend + amountCents;

    const tier = getTier(newYearlySpend);
    const previousTier = (client.clientTier ?? "bronze") as "bronze" | "silver" | "gold";
    const cashbackRate = getCashbackRate(tier);
    const cashbackCents = Math.round(amountCents * cashbackRate);

    const currentBalance = client.clientCreditBalance ?? 0;
    const newBalance = currentBalance + cashbackCents;

    await ctx.db.patch(client._id, {
      clientCreditBalance: newBalance,
      clientTier: tier,
      clientYearlySpend: newYearlySpend,
      updatedAt: now,
    });

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

    const levelOrder: Record<string, number> = { new: 0, rising: 1, pro: 2, top_rated: 3 };
    const currentLevel = profile.level ?? "new";
    if ((levelOrder[newLevel] ?? 0) > (levelOrder[currentLevel] ?? 0)) {
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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized.");
    const caller = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!caller || caller._id !== args.userId) throw new Error("Unauthorized.");
    const user = await ctx.db.get(args.userId);
    if (!user) return null;

    const tier = (user.clientTier ?? "bronze") as "bronze" | "silver" | "gold";
    const yearlySpendCents = user.clientYearlySpend ?? 0;
    const balanceCents = user.clientCreditBalance ?? 0;

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
    const accountAgeMs = Date.now() - profile.createdAt;
    const accountAgeDays = Math.floor(accountAgeMs / (24 * 60 * 60 * 1000));

    return {
      level,
      totalOrders: profile.totalOrders ?? 0,
      ratingAverage: profile.ratingAverage ?? 0,
      completionRate: profile.completionRate ?? 0,
      accountAgeDays,
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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized.");
    const caller = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!caller || caller._id !== args.userId) throw new Error("Unauthorized.");
    return await ctx.db
      .query("rewardTransactions")
      .withIndex("by_user_createdAt", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(Math.min(args.limit ?? 20, 100));
  },
});

export const applyCredits = mutation({
  args: {
    orderId: v.id("orders"),
    creditsToUseCents: v.number(),
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

    const maxCredits = Math.round(order.amount * 100 * 0.5);
    if (args.creditsToUseCents > maxCredits) {
      throw new Error(`Cannot apply more than 50% of order amount (max ${maxCredits} cents).`);
    }
    const actualCredits = args.creditsToUseCents;

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
