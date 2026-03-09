import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { internal } from "../_generated/api";
import { requireAuthUser, requireOwner } from "../lib/authHelpers";

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

    // Batch load unique clients and categories
    const clientIds = [...new Set(filtered.map((p) => p.clientId).filter(Boolean))];
    const categoryIds = [...new Set(filtered.map((p) => p.categoryId).filter(Boolean))] as typeof filtered[number]["categoryId"][];

    const [clients, categories] = await Promise.all([
      Promise.all(clientIds.map((id) => ctx.db.get(id))),
      Promise.all(categoryIds.map((id) => ctx.db.get(id!))),
    ]);

    const clientMap = new Map(clients.filter(Boolean).map((c) => [c!._id, c!]));
    const categoryMap = new Map(categories.filter(Boolean).map((c) => [c!._id, c!]));

    const enriched = filtered.map((project) => {
      const client = clientMap.get(project.clientId);
      const category = project.categoryId ? categoryMap.get(project.categoryId) : null;

      return {
        ...project,
        clientName: client?.name ?? null,
        clientAvatar: client?.avatar ?? (client as any)?.image ?? null,
        categoryName: category?.name ?? null,
        // Use the stored bidCount field — kept in sync by submitBid mutation
        bidCount: project.bidCount ?? 0,
      };
    });

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

    const [client, category] = await Promise.all([
      ctx.db.get(project.clientId),
      project.categoryId ? ctx.db.get(project.categoryId) : Promise.resolve(null),
    ]);

    return {
      ...project,
      clientName: client?.name ?? null,
      clientAvatar: client?.avatar ?? (client as any)?.image ?? null,
      categoryName: category?.name ?? null,
      // Use the stored bidCount field — kept in sync by submitBid mutation
      bidCount: project.bidCount ?? 0,
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

    const [client, category] = await Promise.all([
      ctx.db.get(project.clientId),
      project.categoryId ? ctx.db.get(project.categoryId) : Promise.resolve(null),
    ]);

    return {
      ...project,
      clientName: client?.name ?? null,
      clientAvatar: client?.avatar ?? (client as any)?.image ?? null,
      categoryName: category?.name ?? null,
      // Use the stored bidCount field — kept in sync by submitBid mutation
      bidCount: project.bidCount ?? 0,
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
    const user = await requireAuthUser(ctx);
    const project = await ctx.db.get(args.projectId);
    if (!project) return [];
    if (project.clientId !== user._id) {
      throw new Error("Unauthorized.");
    }

    const bids = await ctx.db
      .query("bids")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();

    // Batch load unique freelancer profiles
    const profileIds = [...new Set(bids.map((b) => b.freelancerId).filter(Boolean))];
    const profiles = await Promise.all(profileIds.map((id) => ctx.db.get(id)));
    const profileMap = new Map(profiles.filter(Boolean).map((p) => [p!._id, p!]));

    // Batch load unique user records for those profiles
    const userIds = [...new Set(
      profiles.filter(Boolean).map((p) => p!.userId).filter(Boolean)
    )];
    const users = await Promise.all(userIds.map((id) => ctx.db.get(id)));
    const userMap = new Map(users.filter(Boolean).map((u) => [u!._id, u!]));

    const enriched = bids.map((bid) => {
      const profile = profileMap.get(bid.freelancerId);
      const freelancerUser = profile ? userMap.get(profile.userId) : null;

      return {
        ...bid,
        freelancerName: profile?.displayName ?? freelancerUser?.name ?? "Unknown",
        freelancerAvatar: profile?.avatarUrl ?? (freelancerUser as any)?.image ?? null,
        freelancerRating: profile?.ratingAverage ?? 0,
        freelancerVerified: profile?.isVerified ?? false,
      };
    });

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
 * Get open projects for a specific client (public, no auth required).
 * Used on freelancer profile pages to show what projects they've posted.
 */
export const getPublicByClient = query({
  args: {
    clientId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;

    const projects = await ctx.db
      .query("projects")
      .withIndex("by_client", (q) => q.eq("clientId", args.clientId))
      .order("desc")
      .take(limit);

    const openProjects = projects.filter((p) => p.status === "open");

    // Batch load unique categories
    const categoryIds = [...new Set(
      openProjects.map((p) => p.categoryId).filter(Boolean)
    )] as NonNullable<typeof openProjects[number]["categoryId"]>[];

    const categories = await Promise.all(categoryIds.map((id) => ctx.db.get(id)));
    const categoryMap = new Map(categories.filter(Boolean).map((c) => [c!._id, c!]));

    const enriched = openProjects.map((project) => {
      const category = project.categoryId ? categoryMap.get(project.categoryId) : null;

      return {
        ...project,
        categoryName: category?.name ?? null,
        // Use the stored bidCount field — kept in sync by submitBid mutation
        bidCount: project.bidCount ?? 0,
      };
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
    await requireOwner(ctx, args.clientId);

    const limit = args.limit ?? 50;

    const projects = await ctx.db
      .query("projects")
      .withIndex("by_client", (q) => q.eq("clientId", args.clientId))
      .order("desc")
      .take(limit);

    // Batch load unique categories
    const categoryIds = [...new Set(
      projects.map((p) => p.categoryId).filter(Boolean)
    )] as NonNullable<typeof projects[number]["categoryId"]>[];

    const categories = await Promise.all(categoryIds.map((id) => ctx.db.get(id)));
    const categoryMap = new Map(categories.filter(Boolean).map((c) => [c!._id, c!]));

    const enriched = projects.map((project) => {
      const category = project.categoryId ? categoryMap.get(project.categoryId) : null;

      return {
        ...project,
        categoryName: category?.name ?? null,
      };
    });

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
    if (project.clientId === user._id) {
      throw new Error("You cannot bid on your own project.");
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

    // Send new bid notification to project client
    const client = project.clientId ? await ctx.db.get(project.clientId) : null;
    const freelancerProfile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .first();

    if (client?.email) {
      await ctx.scheduler.runAfter(0, internal.lib.email.sendNewBid, {
        clientEmail: client.email,
        clientName: client.name || "Customer",
        projectTitle: project.title,
        bidAmount: args.amount,
        currency: project.currency ?? "EUR",
        deliveryDays: args.deliveryDays,
        freelancerName: freelancerProfile?.displayName || user.name || "Freelancer",
        projectId: args.projectId,
      });
    }

    return bidId;
  },
});

/**
 * Get all bids submitted by the current freelancer.
 * Enriched with the project title and slug.
 */
export const getMyBids = query({
  args: {
    freelancerId: v.id("freelancerProfiles"),
  },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const profile = await ctx.db.get(args.freelancerId);
    if (!profile) return [];
    if (profile.userId !== user._id) {
      throw new Error("Unauthorized.");
    }

    const bids = await ctx.db
      .query("bids")
      .withIndex("by_freelancer", (q) => q.eq("freelancerId", args.freelancerId))
      .order("desc")
      .take(50);

    // Batch load unique projects
    const projectIds = [...new Set(bids.map((b) => b.projectId).filter(Boolean))];
    const projects = await Promise.all(projectIds.map((id) => ctx.db.get(id)));
    const projectMap = new Map(projects.filter(Boolean).map((p) => [p!._id, p!]));

    const enriched = bids.map((bid) => {
      const project = projectMap.get(bid.projectId);
      return {
        ...bid,
        projectTitle: project?.title ?? "Unknown",
        projectSlug: project?.slug ?? "",
        projectStatus: project?.status ?? "unknown",
        projectCurrency: project?.currency ?? bid.currency ?? "EUR",
      };
    });

    return enriched;
  },
});

/**
 * Soft-delete a project (set status to "cancelled").
 * Requires authentication — caller must be the project owner.
 */
export const remove = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!user) throw new Error("User not found");

    const project = await ctx.db.get(args.projectId);
    if (!project) throw new Error("Project not found");

    if (project.clientId !== user._id) {
      throw new Error("Access denied: only the project owner can delete this project");
    }

    await ctx.db.patch(args.projectId, {
      status: "cancelled",
      updatedAt: Date.now(),
    });

    return args.projectId;
  },
});

/**
 * Update an existing project. Authentication required.
 * Caller must be the project owner.
 */
export const update = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    budgetMin: v.optional(v.number()),
    budgetMax: v.optional(v.number()),
    deadline: v.optional(v.number()),
    workType: v.optional(v.string()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!user) throw new Error("User not found");

    const project = await ctx.db.get(args.projectId);
    if (!project) throw new Error("Project not found");

    if (project.clientId !== user._id) {
      throw new Error("Access denied: only the project owner can update this project");
    }

    const { projectId, ...fields } = args;

    // Build patch object with only defined fields
    const patch: Record<string, unknown> = { updatedAt: Date.now() };
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) {
        patch[key] = value;
      }
    }

    await ctx.db.patch(projectId, patch);

    return projectId;
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

    // Send bid accepted notification to freelancer
    const freelancerProfile = await ctx.db.get(bid.freelancerId);
    const freelancerUser = freelancerProfile ? await ctx.db.get(freelancerProfile.userId) : null;

    if (freelancerUser?.email) {
      await ctx.scheduler.runAfter(0, internal.lib.email.sendBidAccepted, {
        freelancerEmail: freelancerUser.email,
        freelancerName: freelancerProfile?.displayName || freelancerUser.name || "Freelancer",
        projectTitle: project.title,
        amount: bid.amount,
        currency: project.currency ?? "EUR",
      });
    }

    return { success: true };
  },
});
