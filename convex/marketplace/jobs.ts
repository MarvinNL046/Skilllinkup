import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

/**
 * List open jobs with client info and category name.
 */
export const list = query({
  args: {
    locale: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;

    const jobs = await ctx.db
      .query("jobs")
      .withIndex("by_status_locale", (q) =>
        q.eq("status", "open").eq("locale", args.locale)
      )
      .order("desc")
      .take(limit);

    const enriched = await Promise.all(
      jobs.map(async (job) => {
        try {
          const client = await ctx.db.get(job.clientId);
          const category = job.categoryId
            ? await ctx.db.get(job.categoryId)
            : null;

          return {
            ...job,
            clientName: client?.name ?? null,
            clientAvatar: client?.avatar ?? client?.image ?? null,
            categoryName: category?.name ?? null,
          };
        } catch {
          // If enrichment fails (e.g. deleted user), return job with defaults
          return {
            ...job,
            clientName: null,
            clientAvatar: null,
            categoryName: null,
          };
        }
      })
    );

    return enriched;
  },
});

/**
 * Get a single job by slug and locale.
 */
export const getBySlug = query({
  args: {
    slug: v.string(),
    locale: v.string(),
  },
  handler: async (ctx, args) => {
    const job = await ctx.db
      .query("jobs")
      .withIndex("by_slug_locale", (q) =>
        q.eq("slug", args.slug).eq("locale", args.locale)
      )
      .first();

    if (!job) return null;

    let client = null;
    let category = null;
    try {
      client = await ctx.db.get(job.clientId);
      category = job.categoryId
        ? await ctx.db.get(job.categoryId)
        : null;
    } catch {
      // Silently handle missing references
    }

    return {
      ...job,
      clientName: client?.name ?? null,
      clientAvatar: client?.avatar ?? client?.image ?? null,
      categoryName: category?.name ?? null,
    };
  },
});

/**
 * Get all jobs for a specific client (all statuses).
 */
export const getByClient = query({
  args: {
    clientId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    const jobs = await ctx.db
      .query("jobs")
      .withIndex("by_client", (q) => q.eq("clientId", args.clientId))
      .order("desc")
      .take(limit);

    const enriched = await Promise.all(
      jobs.map(async (job) => {
        const category = job.categoryId
          ? await ctx.db.get(job.categoryId)
          : null;

        return {
          ...job,
          categoryName: category?.name ?? null,
        };
      })
    );

    return enriched;
  },
});

/**
 * Create a new job listing.
 * Requires authentication. Sets status to "open".
 */
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    categoryId: v.optional(v.id("marketplaceCategories")),
    company: v.optional(v.string()),
    companyLogo: v.optional(v.string()),
    requiredSkills: v.optional(v.array(v.string())),
    salaryMin: v.optional(v.number()),
    salaryMax: v.optional(v.number()),
    currency: v.optional(v.string()),
    jobType: v.string(),
    experienceLevel: v.optional(v.string()),
    workType: v.optional(v.string()),
    locationCity: v.optional(v.string()),
    locationCountry: v.optional(v.string()),
    benefits: v.optional(v.array(v.string())),
    expiresAt: v.optional(v.number()),
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

    const tenant = await ctx.db.query("tenants").first();
    if (!tenant) throw new Error("No tenant found");

    const now = Date.now();

    const jobId = await ctx.db.insert("jobs", {
      tenantId: tenant._id,
      clientId: user._id,
      title: args.title,
      slug: args.slug,
      description: args.description,
      categoryId: args.categoryId,
      company: args.company,
      companyLogo: args.companyLogo,
      requiredSkills: args.requiredSkills,
      salaryMin: args.salaryMin,
      salaryMax: args.salaryMax,
      currency: args.currency ?? "EUR",
      jobType: args.jobType,
      experienceLevel: args.experienceLevel,
      workType: args.workType,
      locationCity: args.locationCity,
      locationCountry: args.locationCountry,
      benefits: args.benefits,
      expiresAt: args.expiresAt,
      applicationCount: 0,
      views: 0,
      status: "open",
      locale: args.locale,
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    return jobId;
  },
});

/**
 * Delete a job (sets status to "closed"). Authentication required.
 * Caller must be the job owner.
 */
export const remove = mutation({
  args: {
    jobId: v.id("jobs"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!user) throw new Error("User not found");

    const job = await ctx.db.get(args.jobId);
    if (!job) throw new Error("Job not found");

    if (job.clientId !== user._id) {
      throw new Error("Access denied: only the job owner can delete this job");
    }

    await ctx.db.patch(args.jobId, {
      status: "closed",
      updatedAt: Date.now(),
    });

    return args.jobId;
  },
});

/**
 * Update a job. Authentication required.
 * Caller must be the job owner.
 */
export const update = mutation({
  args: {
    jobId: v.id("jobs"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(v.string()),
    expiresAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Authentication required");

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!user) throw new Error("User not found");

    const job = await ctx.db.get(args.jobId);
    if (!job) throw new Error("Job not found");

    if (job.clientId !== user._id) {
      throw new Error("Access denied: only the job owner can update this job");
    }

    const { jobId, ...fields } = args;
    await ctx.db.patch(jobId, { ...fields, updatedAt: Date.now() });

    return jobId;
  },
});
