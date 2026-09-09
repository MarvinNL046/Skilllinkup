// Reconciled with the existing development deployment (2026-09-07).
import { requireLivePaymentsEnabled } from "../lib/paymentPolicy";
import { query } from "../_generated/server";
import { mutation } from "../_generated/server";
import { internalMutation } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";
import { v } from "convex/values";
function getTier(yearlySpendCents: number): "bronze" | "silver" | "gold" {
  return yearlySpendCents >= 5e5 ? "gold" : yearlySpendCents >= 1e5 ? "silver" : "bronze";
}
function getCashbackRate(tier: string): number {
  return tier === "gold" ? 0.07 : tier === "silver" ? 0.05 : 0.03;
}
function calculateLevel(totalOrders: number, ratingAverage: number, completionRate: number, accountAgeMs: number): "new" | "rising" | "pro" | "top_rated" {
  return totalOrders >= 50 && ratingAverage >= 4.9 && completionRate >= 95 && accountAgeMs >= 15552e6 ? "top_rated" : totalOrders >= 20 && ratingAverage >= 4.7 && completionRate >= 90 && accountAgeMs >= 7776e6 ? "pro" : totalOrders >= 5 && ratingAverage >= 4.5 && completionRate >= 85 ? "rising" : "new";
}
var processOrderCashback = internalMutation({
    args: {
      orderId: v.id("orders")
    },
    handler: async (ctx, args) => {
      let e = await ctx.db.get(args.orderId);
      if (!e || e.status !== "completed") return;
      let t = await ctx.db.get(e.clientId);
      if (!t) return;
      let a = Date.now(),
        o = Math.round(e.amount * 100),
        c = (t.clientYearlySpend ?? 0) + o,
        d = getTier(c),
        u = t.clientTier ?? "bronze",
        h = getCashbackRate(d),
        b = Math.round(o * h),
        C = (t.clientCreditBalance ?? 0) + b;
      await ctx.db.patch(t._id, {
        clientCreditBalance: C,
        clientTier: d,
        clientYearlySpend: c,
        updatedAt: a
      });
      let m = e.tenantId;
      await ctx.db.insert("rewardTransactions", {
        userId: e.clientId,
        tenantId: m,
        type: "cashback_earned",
        amount: b,
        orderId: args.orderId,
        description: `${Math.round(h * 100)}% cashback on order "${e.title}"`,
        createdAt: a
      }), d !== u && (await ctx.db.insert("rewardTransactions", {
        userId: e.clientId,
        tenantId: m,
        type: "tier_upgrade",
        amount: 0,
        orderId: args.orderId,
        description: `Tier upgraded from ${u} to ${d}`,
        createdAt: a + 1
      }));
    }
  }),
  recalculateFreelancerLevel = internalMutation({
    args: {
      freelancerProfileId: v.id("freelancerProfiles")
    },
    handler: async (ctx, args) => {
      let e = await ctx.db.get(args.freelancerProfileId);
      if (!e) return;
      let t = Date.now() - e.createdAt,
        a = calculateLevel(e.totalOrders ?? 0, e.ratingAverage ?? 0, e.completionRate ?? 0, t),
        o = {
          new: 0,
          rising: 1,
          pro: 2,
          top_rated: 3
        },
        l = e.level ?? "new";
      (o[a] ?? 0) > (o[l] ?? 0) && (await ctx.db.patch(args.freelancerProfileId, {
        level: a,
        updatedAt: Date.now()
      }));
    }
  }),
  getClientRewards = query({
    args: {
      userId: v.id("users")
    },
    handler: async (ctx, args) => {
      let e = await requireAuthUser(ctx);
      if (e._id !== args.userId && e.role !== "admin") throw new Error("Unauthorized.");
      let t = await ctx.db.get(args.userId);
      if (!t) return null;
      let a = t.clientTier ?? "bronze",
        o = t.clientYearlySpend ?? 0,
        l = t.clientCreditBalance ?? 0,
        c = a === "gold" ? null : a === "silver" ? 5e5 : 1e5,
        d = c ? Math.min(100, Math.round(o / c * 100)) : 100;
      return {
        tier: a,
        balanceCents: l,
        balanceEuros: l / 100,
        yearlySpendCents: o,
        yearlySpendEuros: o / 100,
        cashbackRate: getCashbackRate(a),
        nextTierThreshold: c,
        progressToNextTier: d
      };
    }
  }),
  getFreelancerLevel = query({
    args: {
      profileId: v.id("freelancerProfiles")
    },
    handler: async (ctx, args) => {
      let e = await ctx.db.get(args.profileId);
      if (!e) return null;
      let t = e.level ?? "new",
        a = Date.now() - e.createdAt,
        o = Math.floor(a / (1440 * 60 * 1e3));
      return {
        level: t,
        totalOrders: e.totalOrders ?? 0,
        ratingAverage: e.ratingAverage ?? 0,
        completionRate: e.completionRate ?? 0,
        accountAgeDays: o,
        nextLevel: t === "top_rated" ? null : t === "pro" ? "top_rated" : t === "rising" ? "pro" : "rising"
      };
    }
  }),
  getRewardHistory = query({
    args: {
      userId: v.id("users"),
      limit: v.optional(v.number())
    },
    handler: async (ctx, args) => {
      let e = await requireAuthUser(ctx);
      if (e._id !== args.userId && e.role !== "admin") throw new Error("Unauthorized.");
      return await ctx.db.query("rewardTransactions").withIndex("by_user_createdAt", t => t.eq("userId", args.userId)).order("desc").take(Math.min(args.limit ?? 20, 100));
    }
  }),
  applyCredits = mutation({
    args: {
      orderId: v.id("orders"),
      creditsToUseCents: v.number()
    },
    returns: v.object({
      appliedCents: v.number()
    }),
    handler: async (ctx, args) => {
      let e = await requireAuthUser(ctx);
      if (!Number.isSafeInteger(args.creditsToUseCents) || args.creditsToUseCents <= 0) throw new Error("Credits must be a positive whole number of cents.");
      requireLivePaymentsEnabled("Applying marketplace credits");
      let t = await ctx.db.get(args.orderId);
      if (!t) throw new Error("Order not found.");
      if (t.clientId !== e._id) throw new Error("Unauthorized.");
      if (!["pending", "in_progress"].includes(t.status)) throw new Error("Credits can only be applied to active orders.");
      let a = e.clientCreditBalance ?? 0;
      if (args.creditsToUseCents > a) throw new Error("Insufficient credit balance.");
      let o = Math.round(t.amount * 100 * 0.5),
        l = t.creditAppliedCents ?? 0,
        c = Math.max(0, o - l);
      if (args.creditsToUseCents > c) throw new Error(`Cannot apply more than 50% of order amount (${c} cents remaining).`);
      let d = args.creditsToUseCents;
      await ctx.db.patch(e._id, {
        clientCreditBalance: a - d,
        updatedAt: Date.now()
      }), await ctx.db.patch(t._id, {
        creditAppliedCents: l + d,
        updatedAt: Date.now()
      });
      let u = t.tenantId;
      return await ctx.db.insert("rewardTransactions", {
        userId: e._id,
        tenantId: u,
        type: "credit_used",
        amount: -d,
        orderId: args.orderId,
        description: `Credits applied to order "${t.title}"`,
        createdAt: Date.now()
      }), {
        appliedCents: d
      };
    }
  });
export { applyCredits, getClientRewards, getFreelancerLevel, getRewardHistory, processOrderCashback, recalculateFreelancerLevel };
