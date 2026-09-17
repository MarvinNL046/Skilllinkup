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
      .withIndex("by_platform_status", (q) => q.eq("platformId", args.platformId).eq("status", "approved"))
      .take(500);

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
      .take(Math.min(Math.max(limit, 1), 100));

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
    if (!review || review.status !== "approved") return null;

    const platform = await ctx.db.get(review.platformId);
    return {
      ...review,
      platformName: platform?.name ?? null,
      platformSlug: platform?.slug ?? null,
    };
  },
});

