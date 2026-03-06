import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { requireAuthUser, requireOwner } from "../lib/authHelpers";

export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await requireOwner(ctx, args.userId);
    return await ctx.db
      .query("userNotificationSettings")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
  },
});

export const upsert = mutation({
  args: {
    newMessage: v.optional(v.boolean()),
    orderUpdate: v.optional(v.boolean()),
    reviewReceived: v.optional(v.boolean()),
    marketingEmails: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);

    const existing = await ctx.db
      .query("userNotificationSettings")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .first();
    const now = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, { ...args, updatedAt: now });
      return existing._id;
    } else {
      return await ctx.db.insert("userNotificationSettings", {
        userId: user._id,
        ...args,
        updatedAt: now,
      });
    }
  },
});
