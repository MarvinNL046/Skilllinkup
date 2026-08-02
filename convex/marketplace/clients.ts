import { v } from "convex/values";
import { query } from "../_generated/server";
import { toPublicClient } from "../lib/publicData";

/**
 * List users where userType === "client".
 * Returns enriched public-safe data for the employees/clients listing page.
 */
export const list = query({
  args: {
    locale: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;

    const clients = await ctx.db
      .query("users")
      .withIndex("by_userType", (q) => q.eq("userType", "client"))
      .take(Math.min(Math.max(limit, 1), 100));

    return clients.map((client) => toPublicClient(client));
  },
  returns: v.array(
    v.union(
      v.null(),
      v.object({
        _id: v.id("users"),
        name: v.string(),
        avatar: v.union(v.string(), v.null()),
        bio: v.union(v.string(), v.null()),
        createdAt: v.number(),
      })
    )
  ),
});

/**
 * Count marketplace stats for the about page.
 * Returns real counts from the database.
 */
export const getMarketplaceStats = query({
  args: {},
  returns: v.object({
    freelancers: v.number(),
    completedProjects: v.number(),
    clients: v.number(),
    countries: v.number(),
  }),
  handler: async (ctx) => {
    const [freelancerProfiles, orders, users] = await Promise.all([
      ctx.db
        .query("freelancerProfiles")
        .withIndex("by_status", (q) => q.eq("status", "active"))
        .take(10000),
      ctx.db
        .query("orders")
        .withIndex("by_status", (q) => q.eq("status", "completed"))
        .take(10000),
      ctx.db
        .query("users")
        .withIndex("by_userType", (q) => q.eq("userType", "client"))
        .take(10000),
    ]);

    const clientCount = users.length;
    const freelancerCount = freelancerProfiles.length;
    const completedOrders = orders.length;

    return {
      freelancers: freelancerCount,
      completedProjects: completedOrders,
      clients: clientCount,
      // Static aspirational number for countries until geo data is tracked
      countries: 5,
    };
  },
});
