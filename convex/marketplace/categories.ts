import { v } from "convex/values";
import { query } from "../_generated/server";

/**
 * Get all marketplace categories as a tree (parents with nested children),
 * including gig counts.
 */
export const list = query({
  args: { locale: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const locale = args.locale ?? "en";

    const allCategories = await ctx.db
      .query("marketplaceCategories")
      .filter((q) => q.eq(q.field("locale"), locale))
      .collect();

    // Enrich with gig counts
    const enriched = await Promise.all(
      allCategories.map(async (cat) => {
        const gigs = await ctx.db
          .query("gigs")
          .withIndex("by_category", (q) => q.eq("categoryId", cat._id))
          .filter((q) =>
            q.and(
              q.eq(q.field("status"), "active"),
              q.eq(q.field("locale"), locale)
            )
          )
          .collect();

        return {
          ...cat,
          gigCount: gigs.length,
          children: [] as typeof allCategories,
        };
      })
    );

    // Build tree
    const map = new Map<string, (typeof enriched)[0]>();
    const roots: (typeof enriched)[0][] = [];

    for (const cat of enriched) {
      map.set(cat._id, cat);
    }

    for (const cat of enriched) {
      if (cat.parentId) {
        const parent = map.get(cat.parentId);
        if (parent) {
          parent.children.push(cat);
        } else {
          roots.push(cat);
        }
      } else {
        roots.push(cat);
      }
    }

    return roots;
  },
});

/**
 * Get a single marketplace category by slug + locale.
 */
export const getBySlug = query({
  args: { slug: v.string(), locale: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const locale = args.locale ?? "en";

    return await ctx.db
      .query("marketplaceCategories")
      .withIndex("by_slug_locale", (q) =>
        q.eq("slug", args.slug).eq("locale", locale)
      )
      .first();
  },
});
