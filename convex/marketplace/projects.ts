import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

/**
 * List open projects with client info, category name, and bid count.
 */
export const list = query({
  args: {
    locale: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;

    const projects = await ctx.db
      .query("projects")
      .withIndex("by_status", (q) => q.eq("status", "open"))
      .order("desc")
      .take(limit);

    // Filter by locale in memory (no composite index for status+locale)
    const filtered = projects.filter((p) => p.locale === args.locale);

    const enriched = await Promise.all(
      filtered.map(async (project) => {
        const client = await ctx.db.get(project.clientId);

        const category = project.categoryId
          ? await ctx.db.get(project.categoryId)
          : null;

        // Count bids for this project
        const bids = await ctx.db
          .query("bids")
          .withIndex("by_project", (q) => q.eq("projectId", project._id))
          .collect();

        return {
          ...project,
          clientName: client?.name ?? null,
          clientAvatar: client?.avatar ?? client?.image ?? null,
          categoryName: category?.name ?? null,
          bidCount: bids.length,
        };
      })
    );

    return enriched;
  },
});

/**
 * Get a single project by slug and locale.
 */
export const getBySlug = query({
  args: {
    slug: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db
      .query("projects")
      .withIndex("by_slug_locale", (q) =>
        q.eq("slug", args.slug).eq("locale", args.locale)
      )
      .first();

    if (!project) return null;

    const client = await ctx.db.get(project.clientId);
    const category = project.categoryId
      ? await ctx.db.get(project.categoryId)
      : null;

    const bids = await ctx.db
      .query("bids")
      .withIndex("by_project", (q) => q.eq("projectId", project._id))
      .collect();

    return {
      ...project,
      clientName: client?.name ?? null,
      clientAvatar: client?.avatar ?? client?.image ?? null,
      categoryName: category?.name ?? null,
      bidCount: bids.length,
    };
  },
});

/**
 * Get a single project by its Convex ID.
 * Enriches with client info, category name, and bid count.
 */
export const getById = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);
    if (!project) return null;

    const client = await ctx.db.get(project.clientId);
    const category = project.categoryId
      ? await ctx.db.get(project.categoryId)
      : null;

    const bids = await ctx.db
      .query("bids")
      .withIndex("by_project", (q) => q.eq("projectId", project._id))
      .collect();

    return {
      ...project,
      clientName: client?.name ?? null,
      clientAvatar: client?.avatar ?? client?.image ?? null,
      categoryName: category?.name ?? null,
      bidCount: bids.length,
    };
  },
});

/**
 * Get all bids for a project, enriched with freelancer profile info.
 * Sorted by status (accepted first) then by creation date ascending.
 */
export const getBids = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const bids = await ctx.db
      .query("bids")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();

    const enriched = await Promise.all(
      bids.map(async (bid) => {
        const profile = await ctx.db.get(bid.freelancerId);
        const freelancerUser = profile
          ? await ctx.db.get(profile.userId)
          : null;

        return {
          ...bid,
          freelancerName: profile?.displayName ?? freelancerUser?.name ?? "Unknown",
          freelancerAvatar: profile?.avatarUrl ?? freelancerUser?.image ?? null,
          freelancerRating: profile?.ratingAverage ?? 0,
          freelancerVerified: profile?.isVerified ?? false,
        };
      })
    );

    // Sort: accepted bids first, then by createdAt ascending
    enriched.sort((a, b) => {
      if (a.status === "accepted" && b.status !== "accepted") return -1;
      if (a.status !== "accepted" && b.status === "accepted") return 1;
      return (a.createdAt ?? 0) - (b.createdAt ?? 0);
    });

    return enriched;
  },
});

/**
 * Get all projects for a specific client (all statuses).
 */
export const getByClient = query({
  args: {
    clientId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    const projects = await ctx.db
      .query("projects")
      .withIndex("by_client", (q) => q.eq("clientId", args.clientId))
      .order("desc")
      .take(limit);

    const enriched = await Promise.all(
      projects.map(async (project) => {
        const category = project.categoryId
          ? await ctx.db.get(project.categoryId)
          : null;

        return {
          ...project,
          categoryName: category?.name ?? null,
        };
      })
    );

    return enriched;
  },
});

/**
 * Create a new project.
 * Requires authentication. Sets status to "open".
 */
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    categoryId: v.optional(v.id("marketplaceCategories")),
    requiredSkills: v.optional(v.array(v.string())),
    budgetMin: v.optional(v.number()),
    budgetMax: v.optional(v.number()),
    currency: v.optional(v.string()),
    deadline: v.optional(v.number()),
    workType: v.optional(v.string()),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!user) throw new Error("User not found");

    // Get the default tenant
    const tenant = await ctx.db.query("tenants").first();
    if (!tenant) throw new Error("No tenant found");

    const now = Date.now();

    const projectId = await ctx.db.insert("projects", {
      tenantId: tenant._id,
      clientId: user._id,
      title: args.title,
      slug: args.slug,
      description: args.description,
      categoryId: args.categoryId,
      requiredSkills: args.requiredSkills,
      budgetMin: args.budgetMin,
      budgetMax: args.budgetMax,
      currency: args.currency ?? "EUR",
      deadline: args.deadline,
      workType: args.workType,
      status: "open",
      bidCount: 0,
      views: 0,
      locale: args.locale,
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    return projectId;
  },
});

/**
 * Freelancer submits a bid on a project.
 * Requires authentication. A freelancer may only bid once per project.
 */
export const submitBid = mutation({
  args: {
    projectId: v.id("projects"),
    amount: v.number(),
    deliveryDays: v.number(),
    pitch: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!user) throw new Error("User not found");

    // Retrieve the freelancer profile for this user
    const profile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .first();
    if (!profile) throw new Error("Freelancer profile not found");

    // Ensure this freelancer hasn't already bid on the project
    const existingBid = await ctx.db
      .query("bids")
      .withIndex("by_freelancer", (q) => q.eq("freelancerId", profile._id))
      .filter((q) => q.eq(q.field("projectId"), args.projectId))
      .first();

    if (existingBid) {
      throw new Error("You have already submitted a bid for this project");
    }

    const project = await ctx.db.get(args.projectId);
    if (!project) throw new Error("Project not found");
    if (project.status !== "open") {
      throw new Error("This project is no longer accepting bids");
    }

    const now = Date.now();

    const bidId = await ctx.db.insert("bids", {
      projectId: args.projectId,
      freelancerId: profile._id,
      amount: args.amount,
      currency: project.currency ?? "EUR",
      deliveryDays: args.deliveryDays,
      pitch: args.pitch,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });

    // Increment the project's bid count
    await ctx.db.patch(args.projectId, {
      bidCount: (project.bidCount ?? 0) + 1,
      updatedAt: now,
    });

    return bidId;
  },
});

/**
 * Client accepts a bid.
 * Sets bid status to "accepted" and project status to "in_progress".
 * Requires authentication — caller must be the project owner.
 */
export const acceptBid = mutation({
  args: {
    bidId: v.id("bids"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!user) throw new Error("User not found");

    const bid = await ctx.db.get(args.bidId);
    if (!bid) throw new Error("Bid not found");

    const project = await ctx.db.get(bid.projectId);
    if (!project) throw new Error("Project not found");

    if (project.clientId !== user._id) {
      throw new Error("Access denied: only the project client can accept a bid");
    }

    const now = Date.now();

    // Accept the bid
    await ctx.db.patch(args.bidId, {
      status: "accepted",
      updatedAt: now,
    });

    // Move project to in_progress and record selected freelancer
    await ctx.db.patch(bid.projectId, {
      status: "in_progress",
      selectedFreelancerId: bid.freelancerId,
      updatedAt: now,
    });

    return { success: true };
  },
});
