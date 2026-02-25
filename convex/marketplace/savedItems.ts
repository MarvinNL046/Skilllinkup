import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

/**
 * List all saved items for a user.
 */
export const list = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("savedItems")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    return items;
  },
});

/**
 * Check whether a specific item is saved by the user.
 */
export const isSaved = query({
  args: {
    userId: v.id("users"),
    itemId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("savedItems")
      .withIndex("by_user_item", (q) =>
        q.eq("userId", args.userId).eq("itemId", args.itemId)
      )
      .first();

    return existing !== null;
  },
});

/**
 * Save an item for the current user.
 * Idempotent: does nothing if already saved.
 */
export const save = mutation({
  args: {
    userId: v.id("users"),
    itemType: v.string(),
    itemId: v.string(),
    itemTitle: v.optional(v.string()),
    itemImage: v.optional(v.string()),
    itemUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("savedItems")
      .withIndex("by_user_item", (q) =>
        q.eq("userId", args.userId).eq("itemId", args.itemId)
      )
      .first();

    if (existing) return existing._id;

    const id = await ctx.db.insert("savedItems", {
      userId: args.userId,
      itemType: args.itemType,
      itemId: args.itemId,
      itemTitle: args.itemTitle,
      itemImage: args.itemImage,
      itemUrl: args.itemUrl,
      createdAt: Date.now(),
    });

    return id;
  },
});

/**
 * Remove a saved item.
 */
export const remove = mutation({
  args: {
    userId: v.id("users"),
    itemId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("savedItems")
      .withIndex("by_user_item", (q) =>
        q.eq("userId", args.userId).eq("itemId", args.itemId)
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
    }

    return { success: true };
  },
});
