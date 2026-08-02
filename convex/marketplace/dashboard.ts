import { v } from "convex/values";
import { query } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { requireAuthUser, requireOwner } from "../lib/authHelpers";

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

const dashboardOverviewValidator = v.object({
  user: v.object({ name: v.string(), userType: v.string(), image: v.union(v.string(), v.null()) }),
  stats: v.object({
    activeProjects: v.number(),
    newProposals: v.number(),
    unreadMessages: v.number(),
    outstandingAmount: v.number(),
    currency: v.string(),
  }),
  activeProjects: v.array(v.object({
    id: v.string(),
    title: v.string(),
    category: v.union(v.string(), v.null()),
    freelancerName: v.union(v.string(), v.null()),
    freelancerAvatar: v.union(v.string(), v.null()),
    progress: v.number(),
    status: v.string(),
    deadline: v.union(v.number(), v.null()),
  })),
  proposals: v.array(v.object({
    id: v.string(),
    projectId: v.string(),
    projectTitle: v.string(),
    freelancerName: v.string(),
    freelancerAvatar: v.union(v.string(), v.null()),
    freelancerTagline: v.union(v.string(), v.null()),
    ratingAverage: v.number(),
    ratingCount: v.number(),
    isVerified: v.boolean(),
    amount: v.number(),
    currency: v.string(),
    status: v.string(),
    createdAt: v.number(),
  })),
  messages: v.array(v.object({
    id: v.string(),
    counterpartName: v.string(),
    counterpartAvatar: v.union(v.string(), v.null()),
    preview: v.string(),
    unreadCount: v.number(),
    lastMessageAt: v.union(v.number(), v.null()),
  })),
  deadlines: v.array(v.object({
    id: v.string(),
    title: v.string(),
    subtitle: v.string(),
    deadline: v.number(),
    daysRemaining: v.number(),
  })),
  paymentMonths: v.array(v.object({ month: v.string(), amount: v.number() })),
  recentPayments: v.array(v.object({
    id: v.string(),
    title: v.string(),
    amount: v.number(),
    currency: v.string(),
    date: v.number(),
    status: v.string(),
  })),
  favorites: v.array(v.object({
    id: v.string(),
    title: v.string(),
    subtitle: v.string(),
    image: v.union(v.string(), v.null()),
    url: v.string(),
  })),
});

/**
 * One bounded, reactive payload for the dashboard home screen.
 * The authenticated user is resolved server-side; callers cannot request
 * another user's marketplace activity.
 */
export const getOverview = query({
  args: {},
  returns: dashboardOverviewValidator,
  handler: async (ctx) => {
    const user = await requireAuthUser(ctx);

    const profile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .first();

    const [clientProjects, clientOrders, freelancerOrders, participant1, participant2, savedItems] = await Promise.all([
      ctx.db.query("projects").withIndex("by_client", (q) => q.eq("clientId", user._id)).order("desc").take(40),
      ctx.db.query("orders").withIndex("by_client", (q) => q.eq("clientId", user._id)).order("desc").take(120),
      profile
        ? ctx.db.query("orders").withIndex("by_freelancer", (q) => q.eq("freelancerId", profile._id)).order("desc").take(120)
        : Promise.resolve([]),
      ctx.db.query("conversations").withIndex("by_participant1", (q) => q.eq("participant1", user._id)).order("desc").take(20),
      ctx.db.query("conversations").withIndex("by_participant2", (q) => q.eq("participant2", user._id)).order("desc").take(20),
      ctx.db.query("savedItems").withIndex("by_user_createdAt", (q) => q.eq("userId", user._id)).order("desc").take(6),
    ]);

    const orderIds = new Set<string>();
    const allOrders = [...clientOrders, ...freelancerOrders]
      .filter((order) => {
        if (orderIds.has(order._id)) return false;
        orderIds.add(order._id);
        return true;
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);

    const activeStatuses = new Set(["pending", "active", "in_progress", "delivered", "revision_requested"]);
    const activeOrders = allOrders.filter((order) => activeStatuses.has(order.status));

    const proposalDocs = profile
      ? await ctx.db.query("bids").withIndex("by_freelancer", (q) => q.eq("freelancerId", profile._id)).order("desc").take(8)
      : (await Promise.all(
          clientProjects.slice(0, 12).map((project) =>
            ctx.db.query("bids").withIndex("by_project", (q) => q.eq("projectId", project._id)).order("desc").take(4)
          )
        )).flat().sort((a, b) => b.createdAt - a.createdAt).slice(0, 8);

    const projectIds = new Set<Id<"projects">>();
    for (const project of clientProjects) projectIds.add(project._id);
    for (const order of activeOrders) if (order.projectId) projectIds.add(order.projectId);
    for (const bid of proposalDocs) projectIds.add(bid.projectId);
    const missingProjectIds = [...projectIds].filter((id) => !clientProjects.some((project) => project._id === id));
    const missingProjects = await Promise.all(missingProjectIds.map((id) => ctx.db.get(id)));
    const projects = [...clientProjects, ...missingProjects.filter((project): project is NonNullable<typeof project> => project !== null)];
    const projectMap = new Map(projects.map((project) => [project._id as string, project]));

    const profileIds = new Set<Id<"freelancerProfiles">>();
    for (const order of activeOrders) if (order.freelancerId) profileIds.add(order.freelancerId);
    for (const project of clientProjects) if (project.selectedFreelancerId) profileIds.add(project.selectedFreelancerId);
    for (const bid of proposalDocs) profileIds.add(bid.freelancerId);
    const profileDocs = await Promise.all([...profileIds].map((id) => ctx.db.get(id)));
    const profileMap = new Map(profileDocs.filter((item): item is NonNullable<typeof item> => item !== null).map((item) => [item._id as string, item]));

    const categoryIds = [...new Set(projects.map((project) => project.categoryId).filter((id): id is Id<"marketplaceCategories"> => id !== undefined))];
    const categoryDocs = await Promise.all(categoryIds.map((id) => ctx.db.get(id)));
    const categoryMap = new Map(categoryDocs.filter((item): item is NonNullable<typeof item> => item !== null).map((item) => [item._id as string, item.name]));

    const orderProgress = (status: string) => {
      if (status === "completed") return 100;
      if (status === "delivered") return 90;
      if (status === "revision_requested") return 75;
      if (status === "active" || status === "in_progress") return 55;
      return 15;
    };

    const activeProjects = activeOrders.slice(0, 5).map((order) => {
      const project = order.projectId ? projectMap.get(order.projectId as string) : null;
      const freelancer = order.freelancerId ? profileMap.get(order.freelancerId as string) : null;
      return {
        id: order._id as string,
        title: project?.title ?? order.title,
        category: project?.categoryId ? categoryMap.get(project.categoryId as string) ?? null : null,
        freelancerName: freelancer?.displayName ?? null,
        freelancerAvatar: freelancer?.avatarUrl ?? null,
        progress: orderProgress(order.status),
        status: order.status,
        deadline: order.deliveryDeadline ?? project?.deadline ?? null,
      };
    });

    const proposals = proposalDocs.slice(0, 4).map((bid) => {
      const freelancer = profileMap.get(bid.freelancerId as string);
      const project = projectMap.get(bid.projectId as string);
      return {
        id: bid._id as string,
        projectId: bid.projectId as string,
        projectTitle: project?.title ?? "Project proposal",
        freelancerName: freelancer?.displayName ?? "Professional",
        freelancerAvatar: freelancer?.avatarUrl ?? null,
        freelancerTagline: freelancer?.tagline ?? null,
        ratingAverage: freelancer?.ratingAverage ?? 0,
        ratingCount: freelancer?.ratingCount ?? 0,
        isVerified: freelancer?.isVerified ?? false,
        amount: bid.amount,
        currency: bid.currency ?? "EUR",
        status: bid.status,
        createdAt: bid.createdAt,
      };
    });

    const conversationIds = new Set<string>();
    const conversations = [...participant1, ...participant2]
      .filter((conversation) => {
        if (conversationIds.has(conversation._id)) return false;
        conversationIds.add(conversation._id);
        return true;
      })
      .sort((a, b) => (b.lastMessageAt ?? b.updatedAt) - (a.lastMessageAt ?? a.updatedAt))
      .slice(0, 5);
    const counterpartIds = [...new Set(conversations.map((conversation) => conversation.participant1 === user._id ? conversation.participant2 : conversation.participant1))];
    const counterpartDocs = await Promise.all(counterpartIds.map((id) => ctx.db.get(id)));
    const counterpartMap = new Map(counterpartDocs.filter((item): item is NonNullable<typeof item> => item !== null).map((item) => [item._id as string, item]));
    const messages = conversations.map((conversation) => {
      const isFirst = conversation.participant1 === user._id;
      const counterpartId = isFirst ? conversation.participant2 : conversation.participant1;
      const counterpart = counterpartMap.get(counterpartId as string);
      return {
        id: conversation._id as string,
        counterpartName: counterpart?.name ?? "Skilllinkup member",
        counterpartAvatar: counterpart?.avatar ?? counterpart?.image ?? null,
        preview: conversation.lastMessagePreview ?? "Start the conversation",
        unreadCount: isFirst ? conversation.unreadCount1 ?? 0 : conversation.unreadCount2 ?? 0,
        lastMessageAt: conversation.lastMessageAt ?? null,
      };
    });

    const now = Date.now();
    const deadlines = activeProjects
      .filter((item): item is typeof item & { deadline: number } => item.deadline !== null && item.deadline >= now)
      .sort((a, b) => a.deadline - b.deadline)
      .slice(0, 4)
      .map((item) => ({
        id: item.id,
        title: item.title,
        subtitle: [item.category, item.freelancerName].filter(Boolean).join(" — ") || "Active project",
        deadline: item.deadline,
        daysRemaining: Math.max(0, Math.ceil((item.deadline - now) / 86_400_000)),
      }));

    const paymentSource = profile ? freelancerOrders : clientOrders;
    const monthStarts = Array.from({ length: 6 }, (_, index) => {
      const date = new Date();
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
      date.setMonth(date.getMonth() - (5 - index));
      return date;
    });
    const paymentMonths = monthStarts.map((start, index) => {
      const end = index === monthStarts.length - 1 ? new Date(start.getFullYear(), start.getMonth() + 1, 1) : monthStarts[index + 1];
      const amount = paymentSource
        .filter((order) => order.createdAt >= start.getTime() && order.createdAt < end.getTime())
        .reduce((sum, order) => sum + (profile ? order.freelancerEarnings : order.amount), 0);
      return { month: start.toLocaleString("en-US", { month: "short" }), amount };
    });

    const recentPayments = paymentSource
      .filter((order) => ["completed", "delivered", "active", "in_progress"].includes(order.status))
      .slice(0, 4)
      .map((order) => ({
        id: order._id as string,
        title: order.title,
        amount: profile ? order.freelancerEarnings : order.amount,
        currency: order.currency ?? "EUR",
        date: order.completedAt ?? order.updatedAt,
        status: order.status === "completed" ? "Paid" : "Pending",
      }));

    const unreadMessages = messages.reduce((sum, message) => sum + message.unreadCount, 0);
    const outstandingAmount = activeOrders.reduce((sum, order) => sum + (profile ? order.freelancerEarnings : order.amount), 0);
    const pendingProposals = proposalDocs.filter((proposal) => proposal.status === "pending").length;

    return {
      user: { name: user.name, userType: user.userType ?? "client", image: user.avatar ?? user.image ?? null },
      stats: {
        activeProjects: activeOrders.length,
        newProposals: pendingProposals,
        unreadMessages,
        outstandingAmount,
        currency: "EUR",
      },
      activeProjects,
      proposals,
      messages,
      deadlines,
      paymentMonths,
      recentPayments,
      favorites: savedItems.map((item) => ({
        id: item._id as string,
        title: item.itemTitle ?? "Saved professional",
        subtitle: item.itemType === "freelancer" ? "Freelancer" : item.itemType,
        image: item.itemImage ?? null,
        url: item.itemUrl ?? "/saved",
      })),
    };
  },
});
