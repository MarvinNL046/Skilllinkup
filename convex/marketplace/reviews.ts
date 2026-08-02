import { v } from "convex/values";
import { query, mutation, MutationCtx, QueryCtx } from "../_generated/server";
import { internal } from "../_generated/api";
import { Doc, Id } from "../_generated/dataModel";
import { requireAuthUser } from "../lib/authHelpers";

async function getOrderReviewContext(
  ctx: QueryCtx | MutationCtx,
  orderId: Id<"orders">
) {
  const order = await ctx.db.get(orderId);
  if (!order) throw new Error("Order not found");

  const freelancerProfile = order.freelancerId
    ? await ctx.db.get(order.freelancerId)
    : null;

  return {
    order,
    freelancerProfile,
    freelancerUserId: freelancerProfile?.userId ?? null,
  };
}

function canAccessOrderReviews(
  user: Doc<"users">,
  order: Doc<"orders">,
  freelancerUserId: Id<"users"> | null
) {
  return (
    user.role === "admin" ||
    order.clientId === user._id ||
    freelancerUserId === user._id
  );
}

async function refreshFreelancerRating(ctx: MutationCtx, userId: Id<"users">) {
  const profile = await ctx.db
    .query("freelancerProfiles")
    .withIndex("by_userId", (q) => q.eq("userId", userId))
    .first();
  if (!profile) return;
  const publicReviews = await ctx.db
    .query("marketplaceReviews")
    .withIndex("by_reviewee", (q) => q.eq("revieweeId", userId))
    .filter((q) => q.eq(q.field("isPublic"), true))
    .take(1000);
  const ratingAverage = publicReviews.length
    ? publicReviews.reduce((total, review) => total + review.overallRating, 0) / publicReviews.length
    : 0;
  await ctx.db.patch(profile._id, {
    ratingAverage: Math.round(ratingAverage * 10) / 10,
    ratingCount: publicReviews.length,
    updatedAt: Date.now(),
  });
}

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
      .take(Math.min(limit * 2, 200));

    // Sort by createdAt DESC and limit
    const sorted = reviews
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);

    // Batch load unique reviewers and orders
    const reviewerIds = [...new Set(sorted.map((r) => r.reviewerId).filter(Boolean))] as Id<"users">[];
    const orderIds = [...new Set(sorted.map((r) => r.orderId).filter(Boolean))] as Id<"orders">[];

    const [reviewers, orders] = await Promise.all([
      Promise.all(reviewerIds.map((id) => ctx.db.get(id))),
      Promise.all(orderIds.map((id) => ctx.db.get(id))),
    ]);

    const reviewerMap = new Map(reviewers.filter(Boolean).map((r) => [r!._id, r!]));
    const orderMap = new Map(orders.filter(Boolean).map((o) => [o!._id, o!]));

    const enriched = sorted.map((review) => {
      const reviewer = review.reviewerId ? reviewerMap.get(review.reviewerId) : null;
      const order = review.orderId ? orderMap.get(review.orderId) : null;

      return {
        ...review,
        reviewerName: reviewer?.name ?? "Anonymous",
        reviewerAvatar: (reviewer as any)?.image ?? null,
        orderTitle: order?.title ?? null,
      };
    });

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
    const caller = await requireAuthUser(ctx);
    if (caller._id !== args.userId && caller.role !== "admin") {
      throw new Error("Unauthorized.");
    }

    const limit = args.limit ?? 50;

    const allReviews = await ctx.db
      .query("marketplaceReviews")
      .withIndex("by_reviewee", (q) => q.eq("revieweeId", args.userId))
      .take(Math.min(limit * 2, 200));

    const sorted = allReviews
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);

    // Batch load unique reviewers and orders
    const reviewerIds = [...new Set(sorted.map((r) => r.reviewerId).filter(Boolean))] as Id<"users">[];
    const orderIds = [...new Set(sorted.map((r) => r.orderId).filter(Boolean))] as Id<"orders">[];

    const [reviewers, orders] = await Promise.all([
      Promise.all(reviewerIds.map((id) => ctx.db.get(id))),
      Promise.all(orderIds.map((id) => ctx.db.get(id))),
    ]);

    const reviewerMap = new Map(reviewers.filter(Boolean).map((r) => [r!._id, r!]));
    const orderMap = new Map(orders.filter(Boolean).map((o) => [o!._id, o!]));

    const enriched = sorted.map((review) => {
      const reviewer = review.reviewerId ? reviewerMap.get(review.reviewerId) : null;
      const order = review.orderId ? orderMap.get(review.orderId) : null;

      return {
        ...review,
        reviewerName: reviewer?.name ?? "Anonymous",
        reviewerAvatar: (reviewer as any)?.image ?? null,
        orderTitle: order?.title ?? null,
      };
    });

    return enriched;
  },
});

/**
 * Get reviews for an order (both client and freelancer reviews).
 */
export const getByOrder = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const { order, freelancerUserId } = await getOrderReviewContext(ctx, args.orderId);

    if (!canAccessOrderReviews(user, order, freelancerUserId)) {
      throw new Error("Unauthorized.");
    }

    const reviews = await ctx.db
      .query("marketplaceReviews")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .take(10);

    if (user.role === "admin" || reviews.every((review) => review.isPublic !== false)) {
      return reviews;
    }

    return reviews.filter(
      (review) => review.isPublic !== false || review.reviewerId === user._id
    );
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
    reviewerRole: v.union(v.literal("client"), v.literal("freelancer")),
    overallRating: v.number(),
    communicationRating: v.optional(v.number()),
    qualityRating: v.optional(v.number()),
    timelinessRating: v.optional(v.number()),
    valueRating: v.optional(v.number()),
    content: v.optional(v.string()),
  },
  returns: v.id("marketplaceReviews"),
  handler: async (ctx, args) => {
    const reviewer = await requireAuthUser(ctx);
    const ratings = [
      args.overallRating,
      args.communicationRating,
      args.qualityRating,
      args.timelinessRating,
      args.valueRating,
    ].filter((rating): rating is number => rating !== undefined);
    if (ratings.some((rating) => !Number.isInteger(rating) || rating < 1 || rating > 5)) {
      throw new Error("Ratings must be whole numbers from 1 to 5.");
    }
    const content = args.content?.trim();
    if (content && (content.length < 10 || content.length > 3000)) {
      throw new Error("Written reviews must be between 10 and 3,000 characters.");
    }

    // Check if reviewer already submitted a review for this order
    const existing = await ctx.db
      .query("marketplaceReviews")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .filter((q) => q.eq(q.field("reviewerId"), reviewer._id))
      .first();
    if (existing) throw new Error("You already reviewed this order");

    const { order, freelancerUserId } = await getOrderReviewContext(ctx, args.orderId);
    if (order.status !== "completed") {
      throw new Error("Reviews are only allowed for completed orders.");
    }

    const isClient = order.clientId === reviewer._id;
    const isFreelancer = freelancerUserId === reviewer._id;
    if (!isClient && !isFreelancer) {
      throw new Error("Unauthorized.");
    }

    const expectedRevieweeId = isClient ? freelancerUserId : order.clientId;
    if (!expectedRevieweeId || args.revieweeId !== expectedRevieweeId) {
      throw new Error("Unauthorized.");
    }

    const expectedReviewerRole = isClient ? "client" : "freelancer";
    if (args.reviewerRole !== expectedReviewerRole) {
      throw new Error("Unauthorized.");
    }

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
      reviewerRole: expectedReviewerRole,
      overallRating: args.overallRating,
      communicationRating: args.communicationRating,
      qualityRating: args.qualityRating,
      timelinessRating: args.timelinessRating,
      valueRating: args.valueRating,
      content,
      isPublic,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // If both have now reviewed, make the other review public too
    if (isPublic && otherReview) {
      await ctx.db.patch(otherReview._id, { isPublic: true });
      await Promise.all([
        refreshFreelancerRating(ctx, args.revieweeId),
        otherReview.revieweeId ? refreshFreelancerRating(ctx, otherReview.revieweeId) : Promise.resolve(),
      ]);
    }

    // Send review notification to reviewee
    const reviewee = await ctx.db.get(args.revieweeId);
    if (reviewee?.email) {
      await ctx.scheduler.runAfter(0, internal.lib.email.sendReviewReceived, {
        userEmail: reviewee.email,
        userName: reviewee.name || "User",
        orderTitle: order.title,
        rating: args.overallRating,
        orderId: args.orderId,
      });
    }

    return reviewId;
  },
});
