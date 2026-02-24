import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get published platforms ordered by featured first, then by rating descending.
 */
export const list = query({
  args: {
    locale: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    const platforms = await ctx.db
      .query("platforms")
      .withIndex("by_status_locale", (q) =>
        q.eq("status", "published").eq("locale", args.locale)
      )
      .collect();

    // Sort: featured first, then by rating desc. Multi-field ordering done in JS.
    return platforms
      .sort(
        (a, b) =>
          (b.featured ? 1 : 0) - (a.featured ? 1 : 0) ||
          (b.rating ?? 0) - (a.rating ?? 0)
      )
      .slice(0, limit);
  },
});

/**
 * Get a single platform by its slug and locale. Returns null if not found.
 */
export const getBySlug = query({
  args: {
    slug: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const platform = await ctx.db
      .query("platforms")
      .withIndex("by_slug_locale", (q) =>
        q.eq("slug", args.slug).eq("locale", args.locale)
      )
      .first();

    return platform ?? null;
  },
});

/**
 * Get featured published platforms.
 */
export const getFeatured = query({
  args: {
    locale: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 3;
    const platforms = await ctx.db
      .query("platforms")
      .withIndex("by_featured", (q) =>
        q.eq("featured", true).eq("status", "published").eq("locale", args.locale)
      )
      .collect();

    return platforms.slice(0, limit);
  },
});

/**
 * Get top-rated published platforms sorted by rating descending.
 */
export const getTopRated = query({
  args: {
    locale: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 6;
    const platforms = await ctx.db
      .query("platforms")
      .withIndex("by_status_locale", (q) =>
        q.eq("status", "published").eq("locale", args.locale)
      )
      .collect();

    return platforms
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, limit);
  },
});

/**
 * Get published platforms that belong to a specific category.
 */
export const getByCategory = query({
  args: {
    category: v.string(),
    locale: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;
    const platforms = await ctx.db
      .query("platforms")
      .withIndex("by_status_locale", (q) =>
        q.eq("status", "published").eq("locale", args.locale)
      )
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();

    return platforms.slice(0, limit);
  },
});

/**
 * Get distinct platform categories with platform counts for a given locale.
 * Only considers published platforms.
 */
export const getCategories = query({
  args: {
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const platforms = await ctx.db
      .query("platforms")
      .withIndex("by_status_locale", (q) =>
        q.eq("status", "published").eq("locale", args.locale)
      )
      .collect();

    // Group by category field and count occurrences.
    const counts: Record<string, number> = {};
    for (const platform of platforms) {
      const cat = platform.category;
      if (cat) {
        counts[cat] = (counts[cat] ?? 0) + 1;
      }
    }

    return Object.entries(counts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  },
});

/**
 * Full-text search on platform name using the "search_platforms" search index.
 * Filters results to the requested locale and published status.
 */
export const search = query({
  args: {
    query: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("platforms")
      .withSearchIndex("search_platforms", (q) =>
        q
          .search("name", args.query)
          .eq("status", "published")
          .eq("locale", args.locale)
      )
      .collect();

    return results;
  },
});
