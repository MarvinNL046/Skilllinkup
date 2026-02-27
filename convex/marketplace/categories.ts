import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

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

/**
 * Get the first tenant ID (helper for seeding).
 */
export const getFirstTenant = query({
  args: {},
  handler: async (ctx) => {
    const tenant = await ctx.db.query("tenants").first();
    return tenant?._id ?? null;
  },
});

/**
 * Seed marketplace categories in bulk.
 * Accepts parent categories with nested children.
 * Skips categories whose slug+locale already exists.
 */
export const seedAll = mutation({
  args: {
    tenantId: v.id("tenants"),
    categories: v.array(
      v.object({
        name: v.string(),
        slug: v.string(),
        icon: v.optional(v.string()),
        serviceType: v.optional(v.string()),
        sortOrder: v.optional(v.number()),
        children: v.optional(
          v.array(
            v.object({
              name: v.string(),
              slug: v.string(),
              sortOrder: v.optional(v.number()),
            })
          )
        ),
      })
    ),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const locale = args.locale ?? "en";
    const now = Date.now();
    let inserted = 0;
    let skipped = 0;

    for (const cat of args.categories) {
      // Check if parent already exists
      const existing = await ctx.db
        .query("marketplaceCategories")
        .withIndex("by_slug_locale", (q) =>
          q.eq("slug", cat.slug).eq("locale", locale)
        )
        .first();

      if (existing) {
        skipped++;
        // Still seed children under existing parent
        if (cat.children) {
          for (const child of cat.children) {
            const childExists = await ctx.db
              .query("marketplaceCategories")
              .withIndex("by_slug_locale", (q) =>
                q.eq("slug", child.slug).eq("locale", locale)
              )
              .first();
            if (childExists) {
              skipped++;
              continue;
            }
            await ctx.db.insert("marketplaceCategories", {
              tenantId: args.tenantId,
              name: child.name,
              slug: child.slug,
              parentId: existing._id,
              sortOrder: child.sortOrder,
              isActive: true,
              locale,
              createdAt: now,
              updatedAt: now,
            });
            inserted++;
          }
        }
        continue;
      }

      // Insert parent
      const parentId = await ctx.db.insert("marketplaceCategories", {
        tenantId: args.tenantId,
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        serviceType: cat.serviceType ?? "digital",
        sortOrder: cat.sortOrder,
        isActive: true,
        locale,
        createdAt: now,
        updatedAt: now,
      });
      inserted++;

      // Insert children
      if (cat.children) {
        for (const child of cat.children) {
          await ctx.db.insert("marketplaceCategories", {
            tenantId: args.tenantId,
            name: child.name,
            slug: child.slug,
            parentId,
            sortOrder: child.sortOrder,
            isActive: true,
            locale,
            createdAt: now,
            updatedAt: now,
          });
          inserted++;
        }
      }
    }

    return { inserted, skipped };
  },
});
