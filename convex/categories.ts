import { mutation, query } from "./_generated/server";
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

/**
 * Seed mutation: insert blog categories for en + nl locales.
 * Creates the default tenant first if none exists.
 * Safe to run multiple times — skips slugs that already exist for that locale.
 *
 * Usage:
 *   npx convex run categories:seedAll --args '{"categories":[...]}'
 */
export const seedAll = mutation({
  args: {
    categories: v.array(
      v.object({
        name: v.string(),
        slug: v.string(),
        description: v.optional(v.string()),
        locale: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Ensure the default tenant exists
    let tenant = await ctx.db
      .query("tenants")
      .withIndex("by_slug", (q) => q.eq("slug", "skilllinkup"))
      .first();

    if (!tenant) {
      const tenantId = await ctx.db.insert("tenants", {
        name: "SkillLinkup",
        slug: "skilllinkup",
        plan: "pro",
        createdAt: now,
        updatedAt: now,
      });
      tenant = await ctx.db.get(tenantId);
    }

    const tenantId = tenant!._id;
    let inserted = 0;
    let skipped = 0;

    for (const category of args.categories) {
      const existing = await ctx.db
        .query("categories")
        .withIndex("by_slug_locale", (q) =>
          q.eq("slug", category.slug).eq("locale", category.locale)
        )
        .first();

      if (existing) {
        skipped++;
        continue;
      }

      await ctx.db.insert("categories", {
        tenantId,
        name: category.name,
        slug: category.slug,
        description: category.description,
        locale: category.locale,
        createdAt: now,
        updatedAt: now,
      });
      inserted++;
    }

    return { tenantId, inserted, skipped, total: args.categories.length };
  },
});
