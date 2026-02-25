import { mutation, query } from "./_generated/server";
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

/**
 * Seed mutation: accepts a batch of platform objects and inserts any that do
 * not yet exist (checked by slug + locale). Safe to run multiple times.
 * Call via:  npx convex run platforms:seedAll --args '{"platforms":[...]}'
 */
export const seedAll = mutation({
  args: {
    platforms: v.array(
      v.object({
        name: v.string(),
        slug: v.string(),
        description: v.optional(v.string()),
        logoUrl: v.optional(v.string()),
        websiteUrl: v.optional(v.string()),
        rating: v.optional(v.number()),
        category: v.optional(v.string()),
        fees: v.optional(v.string()),
        difficulty: v.optional(v.string()),
        color: v.optional(v.string()),
        featured: v.optional(v.boolean()),
        pros: v.optional(v.array(v.string())),
        cons: v.optional(v.array(v.string())),
        features: v.optional(v.array(v.string())),
        status: v.optional(v.string()),
        publishedAt: v.optional(v.number()),
        workType: v.optional(v.string()),
        countries: v.optional(v.array(v.string())),
        affiliateLink: v.optional(v.string()),
        locale: v.string(),
        createdAt: v.number(),
        updatedAt: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    let inserted = 0;
    let skipped = 0;

    for (const platform of args.platforms) {
      // Check for existing record by slug + locale
      const existing = await ctx.db
        .query("platforms")
        .withIndex("by_slug_locale", (q) =>
          q.eq("slug", platform.slug).eq("locale", platform.locale)
        )
        .first();

      if (existing) {
        skipped++;
        continue;
      }

      await ctx.db.insert("platforms", {
        ...platform,
        createdAt: platform.createdAt ?? now,
        updatedAt: platform.updatedAt ?? now,
      });
      inserted++;
    }

    return { inserted, skipped, total: args.platforms.length };
  },
});
