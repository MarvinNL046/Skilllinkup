import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get published tools ordered by sortOrder ASC, then createdAt DESC.
 * No by_status_locale index exists on tools, so all records are collected
 * and filtered in JavaScript.
 */
export const list = query({
  args: {
    locale: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    const tools = await ctx.db.query("tools").collect();

    return tools
      .filter(
        (tool) => tool.status === "published" && tool.locale === args.locale
      )
      .sort(
        (a, b) =>
          (a.sortOrder ?? Infinity) - (b.sortOrder ?? Infinity) ||
          b.createdAt - a.createdAt
      )
      .slice(0, limit);
  },
});

/**
 * Get a single tool by its slug and locale. Returns null if not found.
 */
export const getBySlug = query({
  args: {
    slug: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const tool = await ctx.db
      .query("tools")
      .withIndex("by_slug_locale", (q) =>
        q.eq("slug", args.slug).eq("locale", args.locale)
      )
      .first();

    return tool ?? null;
  },
});

/**
 * Get published tools that belong to a specific category.
 * Uses the by_category index, then filters by status and locale in JavaScript.
 */
export const getByCategory = query({
  args: {
    category: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const tools = await ctx.db
      .query("tools")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .filter((q) =>
        q.and(
          q.eq(q.field("status"), "published"),
          q.eq(q.field("locale"), args.locale)
        )
      )
      .collect();

    return tools;
  },
});

/**
 * Get featured published tools.
 * Uses the by_featured index which covers (featured, status, locale).
 */
export const getFeatured = query({
  args: {
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const tools = await ctx.db
      .query("tools")
      .withIndex("by_featured", (q) =>
        q
          .eq("featured", true)
          .eq("status", "published")
          .eq("locale", args.locale)
      )
      .collect();

    return tools;
  },
});
