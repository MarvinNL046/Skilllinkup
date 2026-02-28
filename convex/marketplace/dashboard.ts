import { v } from "convex/values";
import { query } from "../_generated/server";
import { Id } from "../_generated/dataModel";

/**
 * Fetch aggregated dashboard stats for a given user.
 * Counts orders, sums earnings, counts active gigs, and counts unread messages.
 */
export const getStats = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    if (!args.userId) {
      return {
        totalOrders: 0,
        totalEarnings: 0,
        activeGigs: 0,
        pendingOrders: 0,
      };
    }

    // Fetch the freelancer profile for this user (if any)
    const profile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId!))
      .first();

    // Fetch orders where user is client
    const clientOrders = await ctx.db
      .query("orders")
      .withIndex("by_client", (q) => q.eq("clientId", args.userId!))
      .collect();

    // Fetch orders where user is freelancer (via profile)
    const freelancerOrders = profile
      ? await ctx.db
          .query("orders")
          .withIndex("by_freelancer", (q) => q.eq("freelancerId", profile._id))
          .collect()
      : [];

    // Deduplicate by merging both sets
    const allOrderIds = new Set<string>();
    const allOrders = [...clientOrders, ...freelancerOrders].filter((o) => {
      if (allOrderIds.has(o._id)) return false;
      allOrderIds.add(o._id);
      return true;
    });

    const totalOrders = allOrders.length;

    // Total freelancer earnings from completed orders
    const totalEarnings = freelancerOrders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + (o.freelancerEarnings ?? 0), 0);

    // Active gigs count (if freelancer)
    const activeGigs = profile
      ? await ctx.db
          .query("gigs")
          .withIndex("by_freelancer", (q) => q.eq("freelancerId", profile._id))
          .collect()
          .then((gigs) => gigs.filter((g) => g.status === "active").length)
      : 0;

    // Pending or in-progress orders (all roles)
    const pendingOrders = allOrders.filter((o) =>
      ["pending", "in_progress", "active", "delivered", "revision_requested"].includes(o.status)
    ).length;

    return {
      totalOrders,
      totalEarnings,
      activeGigs,
      pendingOrders,
    };
  },
});

/**
 * Fetch the most recent orders for a user (as client or freelancer).
 * Returns up to `limit` orders, enriched with counterpart name.
 */
export const getRecentOrders = query({
  args: {
    userId: v.optional(v.id("users")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    if (!args.userId) return [];

    const limit = args.limit ?? 5;

    // Fetch orders as client
    const clientOrders = await ctx.db
      .query("orders")
      .withIndex("by_client", (q) => q.eq("clientId", args.userId!))
      .order("desc")
      .take(limit);

    // Fetch the freelancer profile for this user
    const profile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId!))
      .first();

    const freelancerOrders = profile
      ? await ctx.db
          .query("orders")
          .withIndex("by_freelancer", (q) => q.eq("freelancerId", profile._id))
          .order("desc")
          .take(limit)
      : [];

    // Merge, deduplicate, sort by createdAt desc and cap at limit
    const seen = new Set<string>();
    const merged = [...clientOrders, ...freelancerOrders]
      .filter((o) => {
        if (seen.has(o._id)) return false;
        seen.add(o._id);
        return true;
      })
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);

    // Enrich with counterpart display name
    const enriched = await Promise.all(
      merged.map(async (order) => {
        const clientUser = order.clientId ? await ctx.db.get(order.clientId) : null;
        const freelancerProfile = order.freelancerId
          ? await ctx.db.get(order.freelancerId)
          : null;
        const freelancerUser = freelancerProfile
          ? await ctx.db.get(freelancerProfile.userId)
          : null;

        return {
          _id: order._id as string,
          orderNumber: order.orderNumber,
          title: order.title,
          amount: order.amount,
          currency: order.currency ?? "EUR",
          status: order.status,
          orderType: order.orderType,
          createdAt: order.createdAt,
          clientName: clientUser?.name ?? null,
          freelancerName:
            freelancerProfile?.displayName ?? freelancerUser?.name ?? null,
        };
      })
    );

    return enriched;
  },
});

/**
 * Fetch chart data for dashboard: monthly order counts + status breakdown.
 */
export const getChartData = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    const empty = {
      monthlyOrders: [] as { month: string; count: number }[],
      statusBreakdown: {
        completed: 0,
        active: 0,
        pending: 0,
        cancelled: 0,
      },
    };

    if (!args.userId) return empty;

    // Fetch the freelancer profile for this user (if any)
    const profile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId as Id<"users">))
      .first();

    // Fetch orders where user is client
    const clientOrders = await ctx.db
      .query("orders")
      .withIndex("by_client", (q) => q.eq("clientId", args.userId as Id<"users">))
      .collect();

    // Fetch orders where user is freelancer (via profile)
    const freelancerOrders = profile
      ? await ctx.db
          .query("orders")
          .withIndex("by_freelancer", (q) => q.eq("freelancerId", profile._id))
          .collect()
      : [];

    // Deduplicate
    const seen = new Set<string>();
    const allOrders = [...clientOrders, ...freelancerOrders].filter((o) => {
      if (seen.has(o._id)) return false;
      seen.add(o._id);
      return true;
    });

    if (allOrders.length === 0) return empty;

    // --- Monthly order counts (last 12 months) ---
    const now = new Date();
    const months: { month: string; start: number; end: number }[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextMonth = new Date(d.getFullYear(), d.getMonth() + 1, 1);
      months.push({
        month: d.toLocaleString("en-US", { month: "short" }),
        start: d.getTime(),
        end: nextMonth.getTime(),
      });
    }

    const monthlyOrders = months.map(({ month, start, end }) => ({
      month,
      count: allOrders.filter((o) => o.createdAt >= start && o.createdAt < end).length,
    }));

    // --- Status breakdown ---
    const statusBreakdown = {
      completed: 0,
      active: 0,
      pending: 0,
      cancelled: 0,
    };

    for (const order of allOrders) {
      switch (order.status) {
        case "completed":
          statusBreakdown.completed++;
          break;
        case "active":
        case "in_progress":
        case "delivered":
        case "revision_requested":
          statusBreakdown.active++;
          break;
        case "pending":
          statusBreakdown.pending++;
          break;
        case "cancelled":
        case "disputed":
          statusBreakdown.cancelled++;
          break;
      }
    }

    return { monthlyOrders, statusBreakdown };
  },
});
