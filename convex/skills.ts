import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * List all skills for a given locale.
 */
export const list = query({
  args: {
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const locale = args.locale ?? "en";

    return await ctx.db
      .query("skills")
      .withIndex("by_slug_locale", (q) => q)
      .filter((q) => q.eq(q.field("locale"), locale))
      .collect();
  },
});

/**
 * Insert a new skill (used by translation scripts).
 */
export const insert = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    categoryId: v.optional(v.id("marketplaceCategories")),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if already exists
    const existing = await ctx.db
      .query("skills")
      .withIndex("by_slug_locale", (q) =>
        q.eq("slug", args.slug).eq("locale", args.locale)
      )
      .first();

    if (existing) {
      // Update existing
      await ctx.db.patch(existing._id, { name: args.name });
      return existing._id;
    }

    // Insert new
    return await ctx.db.insert("skills", {
      name: args.name,
      slug: args.slug,
      categoryId: args.categoryId,
      locale: args.locale,
      createdAt: Date.now(),
    });
  },
});
