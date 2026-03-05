import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { requireAuthUser } from "./lib/authHelpers";

// Submit feedback (public — works for anonymous and logged-in users)
export const submit = mutation({
  args: {
    type: v.string(),             // "feedback" | "bug" | "feature"
    message: v.string(),
    rating: v.optional(v.number()),
    pageUrl: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Optionally attach logged-in user
    const identity = await ctx.auth.getUserIdentity();
    let userId = undefined;
    if (identity?.email) {
      const user = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", identity.email!))
        .first();
      if (user) userId = user._id;
    }

    await ctx.db.insert("feedback", {
      type: args.type,
      message: args.message,
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
      .collect();
  },
});

// Admin: list all feedback (newest first)
export const list = query({
  args: {
    status: v.optional(v.string()),
    type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("feedback").withIndex("by_createdAt").order("desc");
    const results = await q.collect();

    return results.filter((f) => {
      if (args.status && f.status !== args.status) return false;
      if (args.type && f.type !== args.type) return false;
      return true;
    });
  },
});
