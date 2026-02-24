import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Get approved reviews for a specific platform.
 */
export const getByPlatform = query({
  args: {
    platformId: v.id("platforms"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 10;

    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_platform", (q) => q.eq("platformId", args.platformId))
      .collect();

    return reviews
      .filter((r) => r.status === "approved")
      .slice(0, limit);
  },
});

/**
 * Get all approved reviews enriched with their platform name and slug.
 */
export const getApproved = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_status", (q) => q.eq("status", "approved"))
      .collect();

    const sliced = reviews.slice(0, limit);

    const enriched = await Promise.all(
      sliced.map(async (review) => {
        const platform = await ctx.db.get(review.platformId);
        return {
          ...review,
          platformName: platform?.name ?? null,
          platformSlug: platform?.slug ?? null,
        };
      })
    );

    return enriched;
  },
});

/**
 * Get a single review by ID, enriched with platform name and slug.
 */
export const getById = query({
  args: {
    reviewId: v.id("reviews"),
  },
  handler: async (ctx, args) => {
    const review = await ctx.db.get(args.reviewId);
    if (!review) return null;

    const platform = await ctx.db.get(review.platformId);
    return {
      ...review,
      platformName: platform?.name ?? null,
      platformSlug: platform?.slug ?? null,
    };
  },
});

/**
 * Create a new platform review with status "pending".
 */
export const create = mutation({
  args: {
    platformId: v.id("platforms"),
    title: v.string(),
    content: v.string(),
    overallRating: v.number(),
    easeOfUseRating: v.optional(v.number()),
    supportRating: v.optional(v.number()),
    valueRating: v.optional(v.number()),
    pros: v.optional(v.array(v.string())),
    cons: v.optional(v.array(v.string())),
    userName: v.optional(v.string()),
    userRole: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const platform = await ctx.db.get(args.platformId);
    if (!platform) {
      throw new Error("Platform not found");
    }

    const now = Date.now();

    const reviewId = await ctx.db.insert("reviews", {
      platformId: args.platformId,
      title: args.title,
      content: args.content,
      overallRating: args.overallRating,
      easeOfUseRating: args.easeOfUseRating,
      supportRating: args.supportRating,
      valueRating: args.valueRating,
      pros: args.pros,
      cons: args.cons,
      userName: args.userName,
      userRole: args.userRole,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });

    return reviewId;
  },
});
