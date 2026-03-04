import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!user) throw new Error("User not found");

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
