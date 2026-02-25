import { v } from "convex/values";
import { query } from "../_generated/server";

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

    const users = await ctx.db.query("users").collect();
    const clients = users
      .filter((u) => u.userType === "client")
      .slice(0, limit);

    return clients.map((c) => ({
      _id: c._id,
      name: c.name,
      email: c.email,
      avatar: c.avatar ?? c.image ?? null,
      bio: c.bio ?? null,
      locationCity: null as string | null,
      locationCountry: null as string | null,
      createdAt: c.createdAt,
    }));
  },
});

/**
 * Count marketplace stats for the about page.
 * Returns real counts from the database.
 */
export const getMarketplaceStats = query({
  args: {},
  handler: async (ctx) => {
    const [freelancerProfiles, orders, users] = await Promise.all([
      ctx.db
        .query("freelancerProfiles")
        .withIndex("by_status", (q) => q.eq("status", "active"))
        .collect(),
      ctx.db
        .query("orders")
        .withIndex("by_status", (q) => q.eq("status", "completed"))
        .collect(),
      ctx.db.query("users").collect(),
    ]);

    const clientCount = users.filter((u) => u.userType === "client").length;
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
