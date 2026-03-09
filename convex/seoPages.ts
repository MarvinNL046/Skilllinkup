import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * List published SEO pages for a given locale.
 */
export const list = query({
  args: {
    locale: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 100;
    const pages = await ctx.db
      .query("seoPages")
      .withIndex("by_slug_locale", (q) => q)
      .filter((q) => q.eq(q.field("locale"), args.locale))
      .take(limit);

    return pages;
  },
});

/**
 * Insert/upsert an SEO page (used by translation scripts).
 */
export const insert = mutation({
  args: {
    tenantId: v.id("tenants"),
    title: v.string(),
    slug: v.string(),
    metaTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    h1: v.optional(v.string()),
    content: v.string(),
    excerpt: v.optional(v.string()),
    pillarId: v.number(),
    pillarName: v.string(),
    pillarSlug: v.string(),
    subpillarIndex: v.number(),
    keywords: v.optional(v.array(v.string())),
    locale: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("seoPages")
      .withIndex("by_slug_locale", (q) =>
        q.eq("slug", args.slug).eq("locale", args.locale)
      )
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        title: args.title,
        metaTitle: args.metaTitle,
        metaDescription: args.metaDescription,
        h1: args.h1,
        content: args.content,
        excerpt: args.excerpt,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("seoPages", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});
