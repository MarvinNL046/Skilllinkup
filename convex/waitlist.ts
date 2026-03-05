import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Add email to waitlist (public)
export const join = mutation({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const email = args.email.toLowerCase().trim();

    // Prevent duplicates
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existing) {
      return { success: true, alreadyJoined: true };
    }

    await ctx.db.insert("waitlist", {
      email,
      createdAt: Date.now(),
    });

    return { success: true, alreadyJoined: false };
  },
});

// Admin: list all waitlist entries (newest first)
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("waitlist")
      .order("desc")
      .collect();
  },
});

// Admin: count
export const count = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("waitlist").collect();
    return all.length;
  },
});
