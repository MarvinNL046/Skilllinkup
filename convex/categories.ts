import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * List all categories for a given locale, sorted by name ASC.
 * Each category is enriched with a count of published posts referencing it.
 */
export const list = query({
  args: { locale: v.string() },
  handler: async (ctx, args) => {
    const categories = await ctx.db
      .query("categories")
      .filter((q) => q.eq(q.field("locale"), args.locale))
      .collect();

    const enriched = await Promise.all(
      categories.map(async (cat) => {
        const posts = await ctx.db
          .query("posts")
          .withIndex("by_category", (q) => q.eq("categoryId", cat._id))
          .filter((q) => q.eq(q.field("status"), "published"))
          .collect();
        return { ...cat, postCount: posts.length };
      })
    );

    return enriched.sort((a, b) => a.name.localeCompare(b.name));
  },
});

/**
 * Get a single category by slug and locale.
 * Returns null if not found.
 * Includes a count of published posts referencing this category.
 */
export const getBySlug = query({
  args: {
    slug: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const category = await ctx.db
      .query("categories")
      .withIndex("by_slug_locale", (q) =>
        q.eq("slug", args.slug).eq("locale", args.locale)
      )
      .unique();

    if (!category) {
      return null;
    }

    const posts = await ctx.db
      .query("posts")
      .withIndex("by_category", (q) => q.eq("categoryId", category._id))
      .filter((q) => q.eq(q.field("status"), "published"))
      .collect();

    return { ...category, postCount: posts.length };
  },
});
