import { v } from "convex/values";
import { query } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { requireOwner } from "../lib/authHelpers";

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

    await requireOwner(ctx, args.userId);

    // Fetch the freelancer profile for this user (if any)
    const profile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId!))
      .first();

    // Fetch orders where user is client (capped to prevent memory bombs)
    const clientOrders = await ctx.db
      .query("orders")
      .withIndex("by_client", (q) => q.eq("clientId", args.userId!))
      .take(1000);

    // Fetch orders where user is freelancer (via profile, capped)
    const freelancerOrders = profile
      ? await ctx.db
          .query("orders")
          .withIndex("by_freelancer", (q) => q.eq("freelancerId", profile._id))
          .take(1000)
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

    // Active gigs count (if freelancer, capped)
    const activeGigs = profile
      ? await ctx.db
          .query("gigs")
          .withIndex("by_freelancer", (q) => q.eq("freelancerId", profile._id))
          .take(1000)
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
 * Returns up to `limit` orders, enriched with counterpart name via batch loading.
 */
export const getRecentOrders = query({
  args: {
    userId: v.optional(v.id("users")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    if (!args.userId) return [];
    await requireOwner(ctx, args.userId);

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

    // --- Batch-load enrichment (O(n) instead of O(n*3) individual fetches) ---
    // Collect unique IDs
    const uniqueClientIds = [...new Set(merged.map((o) => o.clientId))];
    const uniqueFreelancerProfileIds = [
      ...new Set(
        merged.map((o) => o.freelancerId).filter((id): id is Id<"freelancerProfiles"> => id != null)
      ),
    ];

    // Batch fetch clients and freelancer profiles in parallel
    const [clientUsers, freelancerProfiles] = await Promise.all([
      Promise.all(uniqueClientIds.map((id) => ctx.db.get(id))),
      Promise.all(uniqueFreelancerProfileIds.map((id) => ctx.db.get(id))),
    ]);

    // Build O(1) lookup maps
    const clientMap = new Map(
      uniqueClientIds.map((id, i) => [id as string, clientUsers[i]])
    );
    const freelancerProfileMap = new Map(
      uniqueFreelancerProfileIds.map((id, i) => [id as string, freelancerProfiles[i]])
    );

    // Batch fetch freelancer user records
    const uniqueFreelancerUserIds = [
      ...new Set(
        freelancerProfiles
          .filter(Boolean)
          .map((fp) => fp!.userId)
      ),
    ];
    const freelancerUserRecords = await Promise.all(
      uniqueFreelancerUserIds.map((id) => ctx.db.get(id))
    );
    const freelancerUserMap = new Map(
      uniqueFreelancerUserIds.map((id, i) => [id as string, freelancerUserRecords[i]])
    );

    // Enrich in-memory using the lookup maps
    const enriched = merged.map((order) => {
      const clientUser = clientMap.get(order.clientId as string);
      const freelancerProfile = order.freelancerId
        ? freelancerProfileMap.get(order.freelancerId as string)
        : null;
      const freelancerUser =
        freelancerProfile ? freelancerUserMap.get(freelancerProfile.userId as string) : null;

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
    });

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
    await requireOwner(ctx, args.userId);

    // Fetch the freelancer profile for this user (if any)
    const profile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId as Id<"users">))
      .first();

    // Fetch orders where user is client (capped to prevent memory bombs)
    const clientOrders = await ctx.db
      .query("orders")
      .withIndex("by_client", (q) => q.eq("clientId", args.userId as Id<"users">))
      .take(1000);

    // Fetch orders where user is freelancer (via profile, capped)
    const freelancerOrders = profile
      ? await ctx.db
          .query("orders")
          .withIndex("by_freelancer", (q) => q.eq("freelancerId", profile._id))
          .take(1000)
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

/**
 * Combined query that returns both stats and recent orders in a single round-trip.
 * Fetches orders only once and derives both stats and recent list from the same data,
 * avoiding duplicate reads. Uses batch loading for enrichment.
 */
export const getCombined = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    await requireOwner(ctx, args.userId);

    // Fetch the freelancer profile once
    const profile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .first();

    // Fetch orders once with a generous cap — both roles share this data
    const clientOrders = await ctx.db
      .query("orders")
      .withIndex("by_client", (q) => q.eq("clientId", args.userId))
      .order("desc")
      .take(200);

    const freelancerOrders = profile
      ? await ctx.db
          .query("orders")
          .withIndex("by_freelancer", (q) => q.eq("freelancerId", profile._id))
          .order("desc")
          .take(200)
      : [];

    // Deduplicate, maintaining descending order
    const seen = new Set<string>();
    const allOrders = [...clientOrders, ...freelancerOrders].filter((o) => {
      if (seen.has(o._id)) return false;
      seen.add(o._id);
      return true;
    });

    // --- Derive stats from the shared order list ---
    const totalOrders = allOrders.length;

    const totalEarnings = freelancerOrders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + (o.freelancerEarnings ?? 0), 0);

    const pendingOrders = allOrders.filter((o) =>
      ["pending", "in_progress", "active", "delivered", "revision_requested"].includes(o.status)
    ).length;

    // Active gigs count requires a separate read (not order data)
    const activeGigs = profile
      ? await ctx.db
          .query("gigs")
          .withIndex("by_freelancer", (q) => q.eq("freelancerId", profile._id))
          .take(1000)
          .then((gigs) => gigs.filter((g) => g.status === "active").length)
      : 0;

    const stats = { totalOrders, totalEarnings, activeGigs, pendingOrders };

    // --- Derive recent orders (top 5, already sorted desc) ---
    const recent = allOrders
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    // Batch-load enrichment data
    const uniqueClientIds = [...new Set(recent.map((o) => o.clientId))];
    const uniqueFreelancerProfileIds = [
      ...new Set(
        recent.map((o) => o.freelancerId).filter((id): id is Id<"freelancerProfiles"> => id != null)
      ),
    ];

    const [clientUsers, freelancerProfileDocs] = await Promise.all([
      Promise.all(uniqueClientIds.map((id) => ctx.db.get(id))),
      Promise.all(uniqueFreelancerProfileIds.map((id) => ctx.db.get(id))),
    ]);

    const clientMap = new Map(
      uniqueClientIds.map((id, i) => [id as string, clientUsers[i]])
    );
    const freelancerProfileMap = new Map(
      uniqueFreelancerProfileIds.map((id, i) => [id as string, freelancerProfileDocs[i]])
    );

    // Batch fetch the user records behind each freelancer profile
    const uniqueFreelancerUserIds = [
      ...new Set(
        freelancerProfileDocs
          .filter(Boolean)
          .map((fp) => fp!.userId)
      ),
    ];
    const freelancerUserRecords = await Promise.all(
      uniqueFreelancerUserIds.map((id) => ctx.db.get(id))
    );
    const freelancerUserMap = new Map(
      uniqueFreelancerUserIds.map((id, i) => [id as string, freelancerUserRecords[i]])
    );

    const recentOrders = recent.map((order) => {
      const clientUser = clientMap.get(order.clientId as string);
      const freelancerProfile = order.freelancerId
        ? freelancerProfileMap.get(order.freelancerId as string)
        : null;
      const freelancerUser = freelancerProfile
        ? freelancerUserMap.get(freelancerProfile.userId as string)
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
    });

    return { stats, recentOrders };
  },
});
