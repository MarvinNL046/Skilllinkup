import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAdmin, requireAuthUser } from "./lib/authHelpers";
import { rateLimiter } from "./lib/rateLimits";

// Submit feedback. The only entry point is the signed-in dashboard, so anonymous
// writes are rejected; input is bounded and rate limited per account.
export const submit = mutation({
  args: {
    type: v.union(v.literal("feedback"), v.literal("bug"), v.literal("feature")),
    message: v.string(),
    rating: v.optional(v.number()),
    pageUrl: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const userId = user._id;
    const message = args.message.trim();
    if (message.length < 5 || message.length > 4000)
      throw new Error("Write between 5 and 4,000 characters.");
    if (args.rating !== undefined && (!Number.isInteger(args.rating) || args.rating < 1 || args.rating > 5))
      throw new Error("Choose a rating from 1 to 5.");
    if ((args.pageUrl?.length ?? 0) > 500 || (args.email?.length ?? 0) > 254)
      throw new Error("That value is too long.");
    await rateLimiter.limit(ctx, "feedback", { key: user._id, throws: true });

    await ctx.db.insert("feedback", {
      type: args.type,
      message,
      rating: args.rating,
      pageUrl: args.pageUrl,
      email: args.email,
      userId,
      status: "new",
      createdAt: Date.now(),
    });

    return { success: true };
  },
});

// User: get own feedback (newest first)
export const getByUser = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireAuthUser(ctx);
    return await ctx.db
      .query("feedback")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(250);
  },
});

// Admin: list all feedback (newest first)
export const list = query({
  args: {
    status: v.optional(v.string()),
    type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    let q = ctx.db.query("feedback").withIndex("by_createdAt").order("desc");
    const results = await q.take(500);

    return results.filter((f) => {
      if (args.status && f.status !== args.status) return false;
      if (args.type && f.type !== args.type) return false;
      return true;
    });
  },
});
