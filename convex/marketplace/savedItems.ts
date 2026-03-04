import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";

/**
 * List all saved items for the authenticated user.
 */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireAuthUser(ctx);
    const items = await ctx.db
      .query("savedItems")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();

    return items;
  },
});

/**
 * Check whether a specific item is saved by the authenticated user.
 * Returns false for unauthenticated users instead of throwing.
 */
export const isSaved = query({
  args: {
    itemId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false;
    const email = identity.email;
    if (!email) return false;
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();
    if (!user) return false;
    const existing = await ctx.db
      .query("savedItems")
      .withIndex("by_user_item", (q) =>
        q.eq("userId", user._id).eq("itemId", args.itemId)
      )
      .first();
    return existing != null;
  },
});

/**
 * Save an item for the authenticated user.
 * Idempotent: does nothing if already saved.
 */
export const save = mutation({
  args: {
    itemType: v.string(),
    itemId: v.string(),
    itemTitle: v.optional(v.string()),
    itemImage: v.optional(v.string()),
    itemUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const userId = user._id;

    const existing = await ctx.db
      .query("savedItems")
      .withIndex("by_user_item", (q) =>
        q.eq("userId", userId).eq("itemId", args.itemId)
      )
      .first();

    if (existing) return existing._id;

    const id = await ctx.db.insert("savedItems", {
      userId,
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
 * Remove a saved item for the authenticated user.
 */
export const remove = mutation({
  args: {
    itemId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const existing = await ctx.db
      .query("savedItems")
      .withIndex("by_user_item", (q) =>
        q.eq("userId", user._id).eq("itemId", args.itemId)
      )
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
    }
  },
});
