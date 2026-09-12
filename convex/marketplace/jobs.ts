import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import type { Doc } from "../_generated/dataModel";
import {
  requireAuthUser,
  requireMarketplaceContext,
  requireOwner,
} from "../lib/authHelpers";
import {
  assertTransition,
  jobStatusValidator,
  jobTransitions,
} from "../lib/marketplaceState";

const publicJobFields = {
  _id: v.id("jobs"),
  _creationTime: v.number(),
  clientId: v.id("users"),
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
  applicationCount: v.optional(v.number()),
  views: v.optional(v.number()),
  status: jobStatusValidator,
  locale: v.string(),
  publishedAt: v.optional(v.number()),
  expiresAt: v.optional(v.number()),
  createdAt: v.number(),
  updatedAt: v.number(),
};

export const publicJobValidator = v.object({
  ...publicJobFields,
  clientName: v.union(v.string(), v.null()),
  clientAvatar: v.union(v.string(), v.null()),
  categoryName: v.union(v.string(), v.null()),
  companyVerified: v.boolean(),
});

const ownedJobValidator = v.object({
  ...publicJobFields,
  tenantId: v.id("tenants"),
  categoryName: v.union(v.string(), v.null()),
});

export function toPublicJob(
  job: Doc<"jobs">,
  client: Doc<"users">,
  category: Doc<"marketplaceCategories"> | null,
) {
  return {
    _id: job._id,
    _creationTime: job._creationTime,
    clientId: job.clientId,
    title: job.title,
    slug: job.slug,
    description: job.description,
    categoryId: job.categoryId,
    company: job.company,
    companyLogo: job.companyLogo,
    requiredSkills: job.requiredSkills,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    currency: job.currency,
    jobType: job.jobType,
    experienceLevel: job.experienceLevel,
    workType: job.workType,
    locationCity: job.locationCity,
    locationCountry: job.locationCountry,
    benefits: job.benefits,
    applicationCount: job.applicationCount,
    views: job.views,
    status: job.status,
    locale: job.locale,
    publishedAt: job.publishedAt,
    expiresAt: job.expiresAt,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
    clientName: client.name,
    clientAvatar: client.avatar ?? client.image ?? null,
    categoryName: category?.name ?? null,
    companyVerified: true,
  };
}

/**
 * List open jobs with client info and category name.
 */
export const list = query({
  args: {
    locale: v.string(),
    limit: v.optional(v.number()),
  },
  returns: v.array(publicJobValidator),
  handler: async (ctx, args) => {
    const limit = Math.max(1, Math.min(args.limit ?? 20, 100));

    const jobs = await ctx.db
      .query("jobs")
      .withIndex("by_status_locale", (q) =>
        q.eq("status", "open").eq("locale", args.locale),
      )
      .order("desc")
      .take(limit);

    // A vacancy can still have the persisted `open` status after its deadline.
    // Public consumers (including the sitemap) must fail closed on that state.
    const now = Date.now();
    const eligibleJobs = jobs.filter(
      (job) => !job.expiresAt || job.expiresAt > now,
    );

    const enriched = await Promise.all(
      eligibleJobs.map(async (job) => {
        try {
          const client = await ctx.db.get(job.clientId);
          if (client?.companyVerificationStatus !== "verified") return null;
          const category = job.categoryId
            ? await ctx.db.get(job.categoryId)
            : null;

          return toPublicJob(job, client, category);
        } catch {
          // Verification and ownership enrichment must fail closed.
          return null;
        }
      }),
    );

    return enriched.filter((job) => job !== null);
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
  returns: v.union(v.null(), publicJobValidator),
  handler: async (ctx, args) => {
    const job = await ctx.db
      .query("jobs")
      .withIndex("by_slug_locale", (q) =>
        q.eq("slug", args.slug).eq("locale", args.locale),
      )
      .first();

    if (
      !job ||
      job.status !== "open" ||
      (job.expiresAt !== undefined && job.expiresAt <= Date.now())
    )
      return null;

    let client = null;
    let category = null;
    try {
      client = await ctx.db.get(job.clientId);
      category = job.categoryId ? await ctx.db.get(job.categoryId) : null;
    } catch {
      // Silently handle missing references
    }
    if (client?.companyVerificationStatus !== "verified") return null;

    return toPublicJob(job, client, category);
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
  returns: v.array(ownedJobValidator),
  handler: async (ctx, args) => {
    await requireOwner(ctx, args.clientId);

    const limit = Math.max(1, Math.min(args.limit ?? 50, 100));

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
      }),
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
    jobType: v.union(
      v.literal("full-time"),
      v.literal("part-time"),
      v.literal("contract"),
      v.literal("freelance"),
      v.literal("internship"),
    ),
    experienceLevel: v.optional(v.string()),
    workType: v.union(
      v.literal("remote"),
      v.literal("hybrid"),
      v.literal("local"),
    ),
    locationCity: v.optional(v.string()),
    locationCountry: v.optional(v.string()),
    benefits: v.optional(v.array(v.string())),
    expiresAt: v.optional(v.number()),
    locale: v.string(),
  },
  returns: v.id("jobs"),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    requireMarketplaceContext(user, "company", "jobs", "publishing a vacancy");
    if (
      user.role !== "admin" &&
      user.companyVerificationStatus !== "verified"
    ) {
      throw new Error(
        "Company verification is required before publishing a vacancy.",
      );
    }
    const now = Date.now();
    const title = args.title.trim();
    const description = args.description.trim();
    const slug = args.slug.trim().toLowerCase();
    const company = user.companyName?.trim() || args.company?.trim();
    const locationCity = args.locationCity?.trim();
    const locationCountry = args.locationCountry?.trim();
    if (title.length < 8 || title.length > 120)
      throw new Error("Use a title between 8 and 120 characters.");
    if (description.length < 80 || description.length > 10_000)
      throw new Error("Use a description between 80 and 10,000 characters.");
    if (!company) throw new Error("Add the hiring organization's name.");
    if (!locationCountry || locationCountry.length > 80)
      throw new Error("Add a valid applicant country.");
    if (args.workType !== "remote" && !locationCity)
      throw new Error("Add the city for hybrid and on-site vacancies.");
    if (locationCity && locationCity.length > 100)
      throw new Error("Use a city name of at most 100 characters.");
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
      throw new Error("Invalid job slug.");
    const existing = await ctx.db
      .query("jobs")
      .withIndex("by_slug_locale", (q) =>
        q.eq("slug", slug).eq("locale", args.locale),
      )
      .first();
    if (existing) throw new Error("A job with this URL already exists.");
    if (args.salaryMin !== undefined && (!Number.isFinite(args.salaryMin) || args.salaryMin < 0))
      throw new Error("Minimum salary cannot be negative.");
    if (args.salaryMax !== undefined && (!Number.isFinite(args.salaryMax) || args.salaryMax < 0))
      throw new Error("Maximum salary cannot be negative.");
    if (
      args.salaryMin !== undefined &&
      args.salaryMax !== undefined &&
      args.salaryMin > args.salaryMax
    ) {
      throw new Error("Minimum salary cannot exceed maximum salary.");
    }
    if (args.expiresAt !== undefined && args.expiresAt <= now)
      throw new Error("The application deadline must be in the future.");

    const jobId = await ctx.db.insert("jobs", {
      salarySortValue: args.salaryMax ?? args.salaryMin,
      tenantId: user.tenantId,
      clientId: user._id,
      title,
      slug,
      description,
      categoryId: args.categoryId,
      company,
      companyLogo: args.companyLogo,
      requiredSkills: args.requiredSkills,
      salaryMin: args.salaryMin,
      salaryMax: args.salaryMax,
      currency: args.currency ?? "EUR",
      jobType: args.jobType,
      experienceLevel: args.experienceLevel,
      workType: args.workType,
      locationCity,
      locationCountry,
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
  returns: v.id("jobs"),
  handler: async (ctx, args) => {
    const job = await ctx.db.get(args.jobId);
    if (!job) throw new Error("Job not found");
    const user = await requireOwner(ctx, job.clientId);
    requireMarketplaceContext(user, "company", "jobs", "closing a vacancy");
    if (job.status !== "closed") {
      assertTransition(jobTransitions, job.status, "closed");
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
    status: v.optional(jobStatusValidator),
    expiresAt: v.optional(v.union(v.number(), v.null())),
  },
  returns: v.id("jobs"),
  handler: async (ctx, args) => {
    const job = await ctx.db.get(args.jobId);
    if (!job) throw new Error("Job not found");
    const user = await requireOwner(ctx, job.clientId);
    requireMarketplaceContext(user, "company", "jobs", "updating a vacancy");

    if (args.status) {
      assertTransition(jobTransitions, job.status, args.status);
    }

    const title = (args.title ?? job.title).trim();
    const description = (args.description ?? job.description).trim();
    if (title.length < 8 || title.length > 120) throw new Error("Use a title between 8 and 120 characters.");
    if (description.length < 80 || description.length > 10000) throw new Error("Use a description between 80 and 10,000 characters.");
    if (typeof args.expiresAt === "number" && (!Number.isFinite(args.expiresAt) || args.expiresAt <= Date.now())) throw new Error("The application deadline must be in the future.");
    const { jobId, expiresAt, ...fields } = args;
    await ctx.db.patch(jobId, { ...fields, title, description, ...(expiresAt !== undefined ? { expiresAt: expiresAt ?? undefined } : {}), updatedAt: Date.now() });

    return jobId;
  },
});
