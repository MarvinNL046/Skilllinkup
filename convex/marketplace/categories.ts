import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { requireServerSecret } from "../lib/authHelpers";
import { buildMarketplaceCategoryTree } from "../lib/marketplaceCategories";

/**
 * Get all marketplace categories as a tree (parents with nested children),
 * including gig counts.
 */
export const list = query({
  args: {
    locale: v.optional(v.string()),
    serviceType: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const locale = args.locale ?? "en";

    const allCategories = await ctx.db
      .query("marketplaceCategories")
      .filter((q) => q.eq(q.field("locale"), locale))
      .collect();

    const activeGigs = await ctx.db
      .query("gigs")
      .withIndex("by_status_locale", (q) =>
        q.eq("status", "active").eq("locale", locale)
      )
      .collect();

    const gigCounts = new Map<string, number>();
    for (const gig of activeGigs) {
      if (!gig.categoryId) continue;
      gigCounts.set(gig.categoryId, (gigCounts.get(gig.categoryId) ?? 0) + 1);
    }

    const tree = buildMarketplaceCategoryTree(allCategories as any, gigCounts);

    // Filter root categories by serviceType if provided
    if (args.serviceType) {
      const st = args.serviceType;
      return tree.filter((root) => {
        const rootType = root.serviceType;
        if (rootType === "hybrid") return true;
        if (st === "digital") return rootType === "digital" || !rootType;
        if (st === "local") return rootType === "local";
        return true;
      });
    }

    return tree;
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
 * Search categories by name prefix (for autocomplete).
 */
export const search = query({
  args: {
    query: v.string(),
    locale: v.optional(v.string()),
    serviceType: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const locale = args.locale ?? "en";
    const q = args.query.toLowerCase().trim();
    if (q.length < 2) return [];

    const all = await ctx.db
      .query("marketplaceCategories")
      .filter((q2) => q2.eq(q2.field("locale"), locale))
      .collect();

    let filtered = all.filter((cat) => cat.name.toLowerCase().includes(q));

    // Filter by serviceType if provided
    if (args.serviceType) {
      const st = args.serviceType;
      // Build a set of root category IDs that match the serviceType
      const roots = all.filter((c) => !c.parentId);
      const allowedRootIds = new Set<string>();
      for (const root of roots) {
        const rootType = root.serviceType;
        if (rootType === "hybrid") {
          allowedRootIds.add(root._id);
        } else if (st === "digital" && (rootType === "digital" || !rootType)) {
          allowedRootIds.add(root._id);
        } else if (st === "local" && rootType === "local") {
          allowedRootIds.add(root._id);
        }
      }
      filtered = filtered.filter((cat) => {
        // Root categories: check directly
        if (!cat.parentId) return allowedRootIds.has(cat._id);
        // Children: check if parent root is allowed
        return allowedRootIds.has(cat.parentId);
      });
    }

    return filtered
      .sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(q) ? 0 : 1;
        const bStarts = b.name.toLowerCase().startsWith(q) ? 0 : 1;
        return aStarts - bStarts || a.name.localeCompare(b.name);
      })
      .slice(0, 8)
      .map((cat) => ({ name: cat.name, slug: cat.slug }));
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
    categories: v.array(v.any()),
    locale: v.optional(v.string()),
    serverSecret: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);
    const locale = args.locale ?? "en";
    const now = Date.now();
    let inserted = 0;
    let skipped = 0;

    const upsertCategory = async (category: any, parentId?: any) => {
      if (!category?.name || !category?.slug) {
        throw new Error("Each category must include name and slug.");
      }

      const existing = await ctx.db
        .query("marketplaceCategories")
        .withIndex("by_slug_locale", (q) =>
          q.eq("slug", category.slug).eq("locale", locale)
        )
        .first();

      let categoryId = existing?._id;
      const patch = {
        tenantId: args.tenantId,
        name: category.name,
        slug: category.slug,
        description: category.description,
        icon: category.icon,
        imageUrl: category.imageUrl,
        parentId,
        serviceType: category.serviceType,
        sortOrder: category.sortOrder,
        isActive: category.isActive ?? true,
        locale,
        seoMetadata: category.seoMetadata,
        updatedAt: now,
      };

      if (existing) {
        await ctx.db.patch(existing._id, patch);
        skipped++;
      } else {
        categoryId = await ctx.db.insert("marketplaceCategories", {
          ...patch,
          createdAt: now,
        });
        inserted++;
      }

      for (const child of category.children ?? []) {
        await upsertCategory(child, categoryId);
      }
    };

    for (const category of args.categories) {
      await upsertCategory(category);
    }

    return { inserted, skipped };
  },
});
