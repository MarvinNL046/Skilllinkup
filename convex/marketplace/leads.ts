import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { getLeadCreditCost, MAX_SHARED_SLOTS } from "./leadPricing";

// Get credit balance for the current authenticated freelancer.
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

// Get credit transaction history for the current freelancer.
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

// Get leads claimed by the current freelancer, with full quote request details.
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
      .collect();

    const maxSlots = request.isExclusive ? 1 : (request.maxSlots ?? MAX_SHARED_SLOTS);
    const claimedSlots = request.claimedSlots ?? 0;
    const slotsRemaining = Math.max(0, maxSlots - claimedSlots);

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

// Claim a lead (quote request). Deducts credits atomically.
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

    const request = await ctx.db.get(args.quoteRequestId);
    if (!request) throw new Error("Quote request not found.");
    if (request.status !== "open") throw new Error("This quote request is no longer open.");

    const existingClaims = await ctx.db
      .query("leadClaims")
      .withIndex("by_quoteRequest", (q) =>
        q.eq("quoteRequestId", args.quoteRequestId)
      )
      .collect();

    if (existingClaims.some((c) => c.freelancerId === user._id)) {
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
      freelancerId: user._id,
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
