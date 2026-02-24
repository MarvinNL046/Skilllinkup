import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Get active ads for a given placement.
 * Filters by isActive=true and optional date range (startDate/endDate).
 */
export const getActive = query({
  args: {
    placement: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const ads = await ctx.db
      .query("ads")
      .withIndex("by_placement_active", (q) =>
        q.eq("placement", args.placement).eq("isActive", true)
      )
      .collect();

    return ads.filter((ad) => {
      const afterStart = ad.startDate == null || ad.startDate <= now;
      const beforeEnd = ad.endDate == null || ad.endDate >= now;
      return afterStart && beforeEnd;
    });
  },
});

/**
 * Get all ads for a tenant (admin use).
 */
export const getAll = query({
  args: {
    tenantId: v.id("tenants"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("ads")
      .filter((q) => q.eq(q.field("tenantId"), args.tenantId))
      .collect();
  },
});

/**
 * Get a single ad by ID.
 */
export const getById = query({
  args: {
    id: v.id("ads"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

/**
 * Create a new ad.
 */
export const create = mutation({
  args: {
    tenantId: v.id("tenants"),
    title: v.string(),
    imageUrl: v.string(),
    linkUrl: v.string(),
    placement: v.string(),
    isActive: v.optional(v.boolean()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const adId = await ctx.db.insert("ads", {
      tenantId: args.tenantId,
      title: args.title,
      imageUrl: args.imageUrl,
      linkUrl: args.linkUrl,
      placement: args.placement,
      isActive: args.isActive ?? true,
      startDate: args.startDate,
      endDate: args.endDate,
      createdAt: now,
      updatedAt: now,
    });

    return adId;
  },
});

/**
 * Update an existing ad. Only provided fields are changed.
 */
export const update = mutation({
  args: {
    id: v.id("ads"),
    title: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    linkUrl: v.optional(v.string()),
    placement: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;

    const ad = await ctx.db.get(id);
    if (!ad) {
      throw new Error("Ad not found");
    }

    // Build patch object with only the fields that were provided
    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    if (fields.title !== undefined) patch.title = fields.title;
    if (fields.imageUrl !== undefined) patch.imageUrl = fields.imageUrl;
    if (fields.linkUrl !== undefined) patch.linkUrl = fields.linkUrl;
    if (fields.placement !== undefined) patch.placement = fields.placement;
    if (fields.isActive !== undefined) patch.isActive = fields.isActive;
    if (fields.startDate !== undefined) patch.startDate = fields.startDate;
    if (fields.endDate !== undefined) patch.endDate = fields.endDate;

    await ctx.db.patch(id, patch);
  },
});

/**
 * Delete an ad by ID.
 */
export const remove = mutation({
  args: {
    id: v.id("ads"),
  },
  handler: async (ctx, args) => {
    const ad = await ctx.db.get(args.id);
    if (!ad) {
      throw new Error("Ad not found");
    }

    await ctx.db.delete(args.id);
  },
});
