import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

/**
 * List active gigs with enriched freelancer, category, min price and first image.
 * Sorted by isFeatured DESC, ratingAverage DESC.
 */
export const list = query({
  args: {
    locale: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;

    const gigs = await ctx.db
      .query("gigs")
      .withIndex("by_status_locale", (q) =>
        q.eq("status", "active").eq("locale", args.locale)
      )
      .collect();

    // Sort by isFeatured DESC, ratingAverage DESC, then cap at limit
    const sorted = gigs
      .slice()
      .sort((a, b) => {
        const featuredA = a.isFeatured ? 1 : 0;
        const featuredB = b.isFeatured ? 1 : 0;
        if (featuredB !== featuredA) return featuredB - featuredA;
        return (b.ratingAverage ?? 0) - (a.ratingAverage ?? 0);
      })
      .slice(0, limit);

    // Enrich each gig with related data
    const enriched = await Promise.all(
      sorted.map(async (gig) => {
        const freelancerProfile = await ctx.db.get(gig.freelancerId);
        const category = gig.categoryId ? await ctx.db.get(gig.categoryId) : null;

        // Get all packages to find minimum price
        const packages = await ctx.db
          .query("gigPackages")
          .withIndex("by_gig", (q) => q.eq("gigId", gig._id))
          .collect();

        const minPrice =
          packages.length > 0
            ? Math.min(...packages.map((p) => p.price))
            : null;

        // Get only the first image (lowest sortOrder)
        const images = await ctx.db
          .query("gigImages")
          .withIndex("by_gig", (q) => q.eq("gigId", gig._id))
          .collect();

        const firstImage =
          images.length > 0
            ? images.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))[0]
            : null;

        return {
          ...gig,
          freelancerProfile,
          category,
          minPrice,
          firstImage,
        };
      })
    );

    return enriched;
  },
});

/**
 * Get full gig detail by slug + locale.
 * Includes all packages (sorted by price ASC), all images (sorted by sortOrder ASC),
 * freelancer profile and category.
 */
export const getBySlug = query({
  args: {
    slug: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const gig = await ctx.db
      .query("gigs")
      .withIndex("by_slug_locale", (q) =>
        q.eq("slug", args.slug).eq("locale", args.locale)
      )
      .first();

    if (!gig) return null;

    const freelancerProfile = await ctx.db.get(gig.freelancerId);
    const category = gig.categoryId ? await ctx.db.get(gig.categoryId) : null;

    // Fetch all packages sorted by price ASC
    const packagesRaw = await ctx.db
      .query("gigPackages")
      .withIndex("by_gig", (q) => q.eq("gigId", gig._id))
      .collect();

    const packages = packagesRaw
      .slice()
      .sort((a, b) => a.price - b.price);

    // Fetch all images sorted by sortOrder ASC
    const imagesRaw = await ctx.db
      .query("gigImages")
      .withIndex("by_gig", (q) => q.eq("gigId", gig._id))
      .collect();

    const images = imagesRaw
      .slice()
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

    return {
      ...gig,
      freelancerProfile,
      category,
      packages,
      images,
    };
  },
});

/**
 * Get all active gigs for a specific freelancer.
 */
export const getByFreelancer = query({
  args: {
    freelancerId: v.id("freelancerProfiles"),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const gigs = await ctx.db
      .query("gigs")
      .withIndex("by_freelancer", (q) => q.eq("freelancerId", args.freelancerId))
      .collect();

    // Filter to active gigs for the requested locale
    const filtered = gigs.filter(
      (g) => g.status === "active" && g.locale === args.locale
    );

    // Enrich with packages min price and first image
    const enriched = await Promise.all(
      filtered.map(async (gig) => {
        const packages = await ctx.db
          .query("gigPackages")
          .withIndex("by_gig", (q) => q.eq("gigId", gig._id))
          .collect();

        const minPrice =
          packages.length > 0
            ? Math.min(...packages.map((p) => p.price))
            : null;

        const images = await ctx.db
          .query("gigImages")
          .withIndex("by_gig", (q) => q.eq("gigId", gig._id))
          .collect();

        const firstImage =
          images.length > 0
            ? images.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))[0]
            : null;

        return { ...gig, minPrice, firstImage };
      })
    );

    return enriched;
  },
});

/**
 * Full-text search on gig title using the "search_gigs" search index.
 * Filters by active status and locale.
 */
export const search = query({
  args: {
    query: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query("gigs")
      .withSearchIndex("search_gigs", (q) =>
        q
          .search("title", args.query)
          .eq("status", "active")
          .eq("locale", args.locale)
      )
      .collect();

    // Enrich each result with freelancer, category, min price and first image
    const enriched = await Promise.all(
      results.map(async (gig) => {
        const freelancerProfile = await ctx.db.get(gig.freelancerId);
        const category = gig.categoryId ? await ctx.db.get(gig.categoryId) : null;

        const packages = await ctx.db
          .query("gigPackages")
          .withIndex("by_gig", (q) => q.eq("gigId", gig._id))
          .collect();

        const minPrice =
          packages.length > 0
            ? Math.min(...packages.map((p) => p.price))
            : null;

        const images = await ctx.db
          .query("gigImages")
          .withIndex("by_gig", (q) => q.eq("gigId", gig._id))
          .collect();

        const firstImage =
          images.length > 0
            ? images.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))[0]
            : null;

        return { ...gig, freelancerProfile, category, minPrice, firstImage };
      })
    );

    return enriched;
  },
});

/**
 * Create a new gig. Authentication required.
 */
export const create = mutation({
  args: {
    tenantId: v.id("tenants"),
    freelancerId: v.id("freelancerProfiles"),
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    categoryId: v.optional(v.id("marketplaceCategories")),
    tags: v.optional(v.array(v.string())),
    workType: v.optional(v.string()),
    locationCity: v.optional(v.string()),
    locationCountry: v.optional(v.string()),
    serviceRadiusKm: v.optional(v.number()),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required to create a gig.");
    }

    const now = Date.now();

    const gigId = await ctx.db.insert("gigs", {
      tenantId: args.tenantId,
      freelancerId: args.freelancerId,
      title: args.title,
      slug: args.slug,
      description: args.description,
      categoryId: args.categoryId,
      tags: args.tags,
      workType: args.workType,
      locationCity: args.locationCity,
      locationCountry: args.locationCountry,
      serviceRadiusKm: args.serviceRadiusKm,
      locale: args.locale,
      status: "pending",
      views: 0,
      orderCount: 0,
      ratingAverage: 0,
      ratingCount: 0,
      isFeatured: false,
      createdAt: now,
      updatedAt: now,
    });

    return gigId;
  },
});

/**
 * Get ALL gigs for a specific freelancer, regardless of status.
 * Used by the dashboard Manage Services page.
 */
export const getAllByFreelancer = query({
  args: {
    freelancerId: v.id("freelancerProfiles"),
  },
  handler: async (ctx, args) => {
    const gigs = await ctx.db
      .query("gigs")
      .withIndex("by_freelancer", (q) => q.eq("freelancerId", args.freelancerId))
      .order("desc")
      .collect();

    // Enrich with packages min price and first image
    const enriched = await Promise.all(
      gigs.map(async (gig) => {
        const category = gig.categoryId ? await ctx.db.get(gig.categoryId) : null;

        const packages = await ctx.db
          .query("gigPackages")
          .withIndex("by_gig", (q) => q.eq("gigId", gig._id))
          .collect();

        const minPrice =
          packages.length > 0
            ? Math.min(...packages.map((p) => p.price))
            : null;

        const images = await ctx.db
          .query("gigImages")
          .withIndex("by_gig", (q) => q.eq("gigId", gig._id))
          .collect();

        const firstImage =
          images.length > 0
            ? images.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))[0]
            : null;

        return { ...gig, category, minPrice, firstImage };
      })
    );

    return enriched;
  },
});

/**
 * Remove (soft-delete) a gig by setting status to "deleted". Authentication required.
 */
export const remove = mutation({
  args: {
    gigId: v.id("gigs"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required to remove a gig.");
    }

    await ctx.db.patch(args.gigId, {
      status: "deleted",
      updatedAt: Date.now(),
    });

    return args.gigId;
  },
});

/**
 * Create a package for a gig. Authentication required.
 */
export const createPackage = mutation({
  args: {
    gigId: v.id("gigs"),
    tier: v.string(),
    title: v.string(),
    description: v.string(),
    price: v.number(),
    currency: v.optional(v.string()),
    deliveryDays: v.number(),
    revisionCount: v.optional(v.number()),
    features: v.optional(v.array(v.any())),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required to create a package.");
    }

    const now = Date.now();
    const packageId = await ctx.db.insert("gigPackages", {
      gigId: args.gigId,
      tier: args.tier,
      title: args.title,
      description: args.description,
      price: args.price,
      currency: args.currency ?? "EUR",
      deliveryDays: args.deliveryDays,
      revisionCount: args.revisionCount,
      features: args.features ?? [],
      createdAt: now,
      updatedAt: now,
    });

    return packageId;
  },
});

/**
 * Update an existing gig. Authentication required.
 */
export const update = mutation({
  args: {
    gigId: v.id("gigs"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    categoryId: v.optional(v.id("marketplaceCategories")),
    tags: v.optional(v.array(v.string())),
    workType: v.optional(v.string()),
    locationCity: v.optional(v.string()),
    locationCountry: v.optional(v.string()),
    serviceRadiusKm: v.optional(v.number()),
    isFeatured: v.optional(v.boolean()),
    status: v.optional(v.string()),
    locale: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required to update a gig.");
    }

    const { gigId, ...fields } = args;

    // Build patch object with only defined fields
    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }

    await ctx.db.patch(gigId, patch);

    return gigId;
  },
});
