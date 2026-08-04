import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { getLeadCreditCost, MAX_SHARED_SLOTS } from "./leadPricing";
import {
  getOptionalAuthUser,
  getProviderProfile,
  requireAuthUser,
  requireMarketplaceContext,
  requireServerSecret,
} from "../lib/authHelpers";
import { Id } from "../_generated/dataModel";

// Get credit balance for the current authenticated freelancer.
export const getMyCredits = query({
  args: {},
  handler: async (ctx) => {
    const user = await getOptionalAuthUser(ctx);
    if (!user) return null;

    const profile = await getProviderProfile(ctx, user._id, "local_professional");

    return {
      balance: profile?.creditBalance ?? 0,
      userId: user._id,
      profileId: profile?._id ?? null,
    };
  },
});

// Get credit transaction history for the current freelancer.
export const getMyTransactions = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const user = await getOptionalAuthUser(ctx);
    if (!user) return [];

    const txns = await ctx.db
      .query("creditTransactions")
      .withIndex("by_freelancer", (q) => q.eq("freelancerId", user._id))
      .order("desc")
      .take(Math.min(Math.max(args.limit ?? 50, 1), 100));

    return txns;
  },
});

// Get leads claimed by the current freelancer, with full quote request details.
export const getMyClaims = query({
  args: {},
  handler: async (ctx) => {
    const user = await getOptionalAuthUser(ctx);
    if (!user) return [];

    const profile = await getProviderProfile(ctx, user._id, "local_professional");
    if (!profile) return [];

    // Safety limit: avoid unbounded .collect() on large datasets
    const claims = await ctx.db
      .query("leadClaims")
      .withIndex("by_freelancer", (q) => q.eq("freelancerId", profile._id))
      .order("desc")
      .take(200);

    // Batch load unique quote requests
    const requestIds = [...new Set(
      claims.map((c) => c.quoteRequestId).filter(Boolean)
    )] as Id<"quoteRequests">[];

    const requests = await Promise.all(requestIds.map((id) => ctx.db.get(id)));
    const requestMap = new Map(requests.filter(Boolean).map((r) => [r!._id, r!]));

    // Batch load unique clients and categories from the requests
    const clientIds = [...new Set(
      requests.filter(Boolean).map((r) => r!.clientId).filter(Boolean)
    )] as Id<"users">[];

    const categoryIds = [...new Set(
      requests.filter(Boolean).map((r) => r!.categoryId).filter(Boolean)
    )] as Id<"marketplaceCategories">[];

    const [clients, categories] = await Promise.all([
      Promise.all(clientIds.map((id) => ctx.db.get(id))),
      Promise.all(categoryIds.map((id) => ctx.db.get(id))),
    ]);

    const clientMap = new Map(clients.filter(Boolean).map((c) => [c!._id, c!]));
    const categoryMap = new Map(categories.filter(Boolean).map((c) => [c!._id, c!]));

    const enriched = claims.map((claim) => {
      const request = requestMap.get(claim.quoteRequestId);
      if (!request) return { ...claim, request: null, client: null, categoryName: null };

      const client = clientMap.get(request.clientId);
      const category = categoryMap.get(request.categoryId);

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
          ? { name: client.name, email: client.email }
          : null,
        categoryName: category?.name ?? null,
      };
    });

    return enriched;
  },
});

// Get claim status for a specific quote request (for the current user).
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
      .take(MAX_SHARED_SLOTS);

    const maxSlots = request.isExclusive ? 1 : (request.maxSlots ?? MAX_SHARED_SLOTS);
    const claimedSlots = request.claimedSlots ?? 0;
    const slotsRemaining = Math.max(0, maxSlots - claimedSlots);

    let alreadyClaimed = false;
    const user = await getOptionalAuthUser(ctx);
    if (user) {
        const profile = await getProviderProfile(ctx, user._id, "local_professional");
        if (profile) {
          alreadyClaimed = claims.some((c) => c.freelancerId === profile._id);
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

// Claim a lead (quote request). Deducts credits atomically.
export const claimLead = mutation({
  args: {
    quoteRequestId: v.id("quoteRequests"),
    claimType: v.union(v.literal("shared"), v.literal("exclusive")),
  },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    requireMarketplaceContext(user, "local_professional", "local", "claiming a lead");

    const profile = await getProviderProfile(ctx, user._id, "local_professional");
    if (!profile) throw new Error("Freelancer profile required to claim leads.");

    const request = await ctx.db.get(args.quoteRequestId);
    if (!request) throw new Error("Quote request not found.");
    if (request.status !== "open") throw new Error("This quote request is no longer open.");

    const existingClaims = await ctx.db
      .query("leadClaims")
      .withIndex("by_quoteRequest", (q) =>
        q.eq("quoteRequestId", args.quoteRequestId)
      )
      .take(MAX_SHARED_SLOTS);

    if (existingClaims.some((c) => c.freelancerId === profile._id)) {
      throw new Error("You have already claimed this lead.");
    }

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

    const creditCost = getLeadCreditCost(request.budgetIndication, args.claimType);
    const balance = profile.creditBalance ?? 0;

    if (balance < creditCost) {
      throw new Error(
        `Insufficient credits. You need ${creditCost} credits but have ${balance}.`
      );
    }

    const now = Date.now();

    await ctx.db.patch(profile._id, {
      creditBalance: balance - creditCost,
    });

    const claimId = await ctx.db.insert("leadClaims", {
      quoteRequestId: args.quoteRequestId,
      freelancerId: profile._id,
      creditsSpent: creditCost,
      claimType: args.claimType,
      claimedAt: now,
    });

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

// Add credits to a freelancer's balance (called from Stripe webhook).
export const addCredits = mutation({
  args: {
    freelancerUserId: v.id("users"),
    credits: v.number(),
    stripeSessionId: v.string(),
    description: v.string(),
    serverSecret: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);
    const profile = await getProviderProfile(
      ctx,
      args.freelancerUserId,
      "local_professional",
    );

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
