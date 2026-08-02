import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { getOptionalAuthUser, requireAuthUser } from "../lib/authHelpers";

const savedItemValidator = v.object({
  _id: v.id("savedItems"),
  _creationTime: v.number(),
  userId: v.id("users"),
  itemType: v.string(),
  itemId: v.string(),
  itemTitle: v.optional(v.string()),
  itemImage: v.optional(v.string()),
  itemUrl: v.optional(v.string()),
  createdAt: v.number(),
});

/**
 * List all saved items for the authenticated user.
 */
export const list = query({
  args: {},
  returns: v.array(savedItemValidator),
  handler: async (ctx) => {
    const user = await requireAuthUser(ctx);
    const items = await ctx.db
      .query("savedItems")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(500);

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
  returns: v.boolean(),
  handler: async (ctx, args) => {
    const user = await getOptionalAuthUser(ctx);
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
  returns: v.id("savedItems"),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const userId = user._id;

    const itemType = args.itemType.trim();
    const itemId = args.itemId.trim();
    if (itemType.length < 2 || itemType.length > 40 || itemId.length < 1 || itemId.length > 200) {
      throw new Error("Invalid saved item.");
    }
    const existing = await ctx.db
      .query("savedItems")
      .withIndex("by_user_item", (q) =>
        q.eq("userId", userId).eq("itemId", itemId)
      )
      .first();

    if (existing) return existing._id;

    const id = await ctx.db.insert("savedItems", {
      userId,
      itemType,
      itemId,
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
  returns: v.null(),
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
    return null;
  },
});
