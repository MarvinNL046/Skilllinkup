import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

/**
 * Get public reviews for a freelancer (by their user ID in revieweeId).
 */
export const getByFreelancer = query({
  args: {
    freelancerId: v.id("freelancerProfiles"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;

    // Get the freelancer profile to find user_id
    const profile = await ctx.db.get(args.freelancerId);
    if (!profile) return [];

    const reviews = await ctx.db
      .query("marketplaceReviews")
      .withIndex("by_reviewee", (q) => q.eq("revieweeId", profile.userId))
      .filter((q) => q.eq(q.field("isPublic"), true))
      .collect();

    // Sort by createdAt DESC and limit
    const sorted = reviews
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);

    // Enrich with reviewer name and order title
    const enriched = await Promise.all(
      sorted.map(async (review) => {
        const reviewer = review.reviewerId
          ? await ctx.db.get(review.reviewerId)
          : null;
        const order = review.orderId
          ? await ctx.db.get(review.orderId)
          : null;

        return {
          ...review,
          reviewerName: reviewer?.name ?? "Anonymous",
          reviewerAvatar: reviewer?.image ?? null,
          orderTitle: order?.title ?? null,
        };
      })
    );

    return enriched;
  },
});

/**
 * Get all reviews received by a user (as reviewee) using their Convex user ID.
 * Used for the dashboard reviews page. Returns both public and pending reviews.
 */
export const getByUserId = query({
  args: {
    userId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    const reviews = await ctx.db
      .query("marketplaceReviews")
      .withIndex("by_reviewee", (q) => q.eq("revieweeId", args.userId))
      .collect();

    const sorted = reviews
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);

    const enriched = await Promise.all(
      sorted.map(async (review) => {
        const reviewer = review.reviewerId
          ? await ctx.db.get(review.reviewerId)
          : null;
        const order = review.orderId
          ? await ctx.db.get(review.orderId)
          : null;

        return {
          ...review,
          reviewerName: reviewer?.name ?? "Anonymous",
          reviewerAvatar: reviewer?.image ?? null,
          orderTitle: order?.title ?? null,
        };
      })
    );

    return enriched;
  },
});

/**
 * Get reviews for an order (both client and freelancer reviews).
 */
export const getByOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("marketplaceReviews")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .collect();
  },
});

/**
 * Submit a review for an order.
 * Uses blind review system: review becomes public only when both parties reviewed.
 */
export const create = mutation({
  args: {
    orderId: v.id("orders"),
    revieweeId: v.id("users"),
    reviewerRole: v.string(),
    overallRating: v.number(),
    communicationRating: v.optional(v.number()),
    qualityRating: v.optional(v.number()),
    timelinessRating: v.optional(v.number()),
    valueRating: v.optional(v.number()),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Find the reviewer's user doc
    const reviewer = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!reviewer) throw new Error("User not found");

    // Check if reviewer already submitted a review for this order
    const existing = await ctx.db
      .query("marketplaceReviews")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .filter((q) => q.eq(q.field("reviewerId"), reviewer._id))
      .first();
    if (existing) throw new Error("You already reviewed this order");

    // Get tenant
    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Order not found");

    // Check if both parties have now reviewed (blind review system)
    const otherReview = await ctx.db
      .query("marketplaceReviews")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .filter((q) => q.neq(q.field("reviewerId"), reviewer._id))
      .first();

    const isPublic = !!otherReview;

    const reviewId = await ctx.db.insert("marketplaceReviews", {
      tenantId: order.tenantId,
      orderId: args.orderId,
      reviewerId: reviewer._id,
      revieweeId: args.revieweeId,
      reviewerRole: args.reviewerRole,
      overallRating: args.overallRating,
      communicationRating: args.communicationRating,
      qualityRating: args.qualityRating,
      timelinessRating: args.timelinessRating,
      valueRating: args.valueRating,
      content: args.content,
      isPublic,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // If both have now reviewed, make the other review public too
    if (isPublic && otherReview) {
      await ctx.db.patch(otherReview._id, { isPublic: true });
    }

    return reviewId;
  },
});
