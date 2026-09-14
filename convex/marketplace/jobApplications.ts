import { v } from "convex/values";
import { paginationOptsValidator, paginationResultValidator } from "convex/server";
import type { QueryCtx } from "../_generated/server";
import type { Doc } from "../_generated/dataModel";
import { mutation, query } from "../_generated/server";
import {
  requireAuthUser,
  requireMarketplaceContext,
  requireOwner,
  requireServerSecret,
} from "../lib/authHelpers";
import { notifyUser } from "../lib/notifications";
import {
  assertTransition,
  jobApplicationStatusValidator,
  jobApplicationTransitions,
} from "../lib/marketplaceState";
import { rateLimiter } from "../lib/rateLimits";
import {
  claimStoredFile,
  DOCUMENT_CONTENT_TYPES,
} from "../lib/storageValidation";

const applicationValidator = v.object({
  _id: v.id("jobApplications"),
  _creationTime: v.number(),
  tenantId: v.id("tenants"),
  jobId: v.id("jobs"),
  candidateId: v.id("users"),
  coverLetter: v.optional(v.string()),
  resumeStorageId: v.optional(v.id("_storage")),
  portfolioUrl: v.optional(v.string()),
  status: jobApplicationStatusValidator,
  employerNote: v.optional(v.string()),
  submittedAt: v.optional(v.number()),
  statusUpdatedAt: v.number(),
  createdAt: v.number(),
  updatedAt: v.number(),
});

const candidateApplicationValidator = v.object({
  _id: v.id("jobApplications"),
  _creationTime: v.number(),
  jobId: v.id("jobs"),
  status: jobApplicationStatusValidator,
  coverLetter: v.optional(v.string()),
  portfolioUrl: v.optional(v.string()),
  resumeStorageId: v.optional(v.id("_storage")),
  submittedAt: v.optional(v.number()),
  statusUpdatedAt: v.number(),
  createdAt: v.number(),
  updatedAt: v.number(),
});

const employerApplicationValidator = v.object({
  application: applicationValidator,
  candidate: v.object({
    id: v.id("users"),
    name: v.string(),
    email: v.string(),
    image: v.union(v.string(), v.null()),
  }),
  resumeUrl: v.union(v.string(), v.null()),
});

const candidateRowValidator =     v.object({
      application: candidateApplicationValidator,
      job: v.object({
        id: v.id("jobs"),
        slug: v.string(),
        title: v.string(),
        company: v.union(v.string(), v.null()),
        workType: v.union(v.string(), v.null()),
        locationCity: v.union(v.string(), v.null()),
        status: v.string(),
      }),
    });

async function candidateRows(ctx: QueryCtx, applications: Doc<"jobApplications">[]) {
    const jobs = await Promise.all(
      applications.map((item) => ctx.db.get(item.jobId)),
    );
    return applications.flatMap((application, index) => {
      const job = jobs[index];
      const {
        candidateId: _candidateId,
        employerNote: _privateNote,
        tenantId: _tenantId,
        ...safe
      } = application;
      return [
        {
          application: safe,
          job: {
            id: application.jobId,
            slug: job?.slug ?? "",
            title: job?.title ?? "Vacancy no longer available",
            company: job?.company ?? null,
            workType: job?.workType ?? null,
            locationCity: job?.locationCity ?? null,
            status: job && (!job.expiresAt || job.expiresAt > Date.now()) ? job.status : "closed",
          },
        },
      ];
    });
}
async function employerRows(ctx: QueryCtx, applications: Doc<"jobApplications">[]) {
    return await Promise.all(
      applications.map(async (application) => {
        const candidate = await ctx.db.get(application.candidateId);
        const resumeUrl = application.resumeStorageId
          ? `/api/applications/${application._id}/resume`
          : null;
        return {
          application,
          candidate: {
            id: application.candidateId,
            name: candidate?.name ?? "Former candidate",
            email: candidate?.email ?? "",
            image: candidate?.image ?? candidate?.avatar ?? null,
          },
          resumeUrl,
        };
      }),
    );
}

export const listMinePage = query({
  args: { applicationId: v.optional(v.string()), paginationOpts: paginationOptsValidator },
  returns: paginationResultValidator(candidateRowValidator),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    if (args.applicationId !== undefined) {
      const id = ctx.db.normalizeId("jobApplications", args.applicationId);
      const application = id ? await ctx.db.get(id) : null;
      const owned = application && application.candidateId === user._id && application.tenantId === user.tenantId;
      return { page: owned ? await candidateRows(ctx, [application]) : [], isDone: true, continueCursor: "" };
    }
    const result = await ctx.db.query("jobApplications")
      .withIndex("by_candidate", q => q.eq("candidateId", user._id))
      .order("desc").paginate(args.paginationOpts);
    return { ...result, page: await candidateRows(ctx, result.page) };
  },
});

export const listForJobPage = query({
  args: { jobId: v.id("jobs"), status: v.optional(jobApplicationStatusValidator), applicationId: v.optional(v.id("jobApplications")), paginationOpts: paginationOptsValidator },
  returns: paginationResultValidator(employerApplicationValidator),
  handler: async (ctx, args) => {
    const job = await ctx.db.get(args.jobId);
    if (!job) throw new Error("Job not found.");
    const employer = await requireOwner(ctx, job.clientId);
    requireMarketplaceContext(employer, "company", "jobs", "viewing applicants");
    if (job.tenantId !== employer.tenantId) throw new Error("This vacancy is not available to your account.");
    if (args.paginationOpts.numItems > 50) throw new Error("Load up to 50 applications at a time.");
    if (args.applicationId) {
      const application = await ctx.db.get(args.applicationId);
      const visible = application && application.jobId === job._id && application.tenantId === job.tenantId && application.status !== "draft";
      return { page: visible ? await employerRows(ctx, [application]) : [], isDone: true, continueCursor: "" };
    }
    const applications = args.status
      ? ctx.db.query("jobApplications").withIndex("by_job_status", q => q.eq("jobId", args.jobId).eq("status", args.status!))
      : ctx.db.query("jobApplications").withIndex("by_job", q => q.eq("jobId", args.jobId));
    const result = await applications.order("desc").paginate(args.paginationOpts);
    return { ...result, page: await employerRows(ctx, result.page.filter(application => application.status !== "draft" && application.tenantId === job.tenantId)) };
  },
});

function validatePortfolioUrl(value?: string) {
  if (!value) return;
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error("Enter a valid portfolio URL.");
  }
  if (parsed.protocol !== "https:") {
    throw new Error("Portfolio URLs must use HTTPS.");
  }
}

export const getMineForJob = query({
  args: { jobId: v.id("jobs") },
  returns: v.union(candidateApplicationValidator, v.null()),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const application = await ctx.db
      .query("jobApplications")
      .withIndex("by_job_candidate", (q) =>
        q.eq("jobId", args.jobId).eq("candidateId", user._id),
      )
      .unique();

    if (!application) return null;
    const {
      candidateId: _candidateId,
      employerNote: _privateNote,
      tenantId: _tenantId,
      ...safe
    } = application;
    return safe;
  },
});

export const listMine = query({
  args: { limit: v.optional(v.number()) },
  returns: v.array(candidateRowValidator),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const limit = Math.min(Math.max(args.limit ?? 25, 1), 100);
    const applications = await ctx.db
      .query("jobApplications")
      .withIndex("by_candidate", (q) => q.eq("candidateId", user._id))
      .order("desc")
      .take(limit);

    return candidateRows(ctx, applications);
  },
});

export const listForJob = query({
  args: {
    jobId: v.id("jobs"),
    status: v.optional(jobApplicationStatusValidator),
    limit: v.optional(v.number()),
  },
  returns: v.array(employerApplicationValidator),
  handler: async (ctx, args) => {
    const job = await ctx.db.get(args.jobId);
    if (!job) throw new Error("Job not found.");
    const employer = await requireOwner(ctx, job.clientId);
    requireMarketplaceContext(employer, "company", "jobs", "viewing applicants");

    const limit = Math.min(Math.max(args.limit ?? 50, 1), 100);
    const applications = args.status
      ? await ctx.db
          .query("jobApplications")
          .withIndex("by_job_status", (q) =>
            q.eq("jobId", args.jobId).eq("status", args.status!),
          )
          .order("desc")
          .take(limit)
      : await ctx.db
          .query("jobApplications")
          .withIndex("by_job", (q) => q.eq("jobId", args.jobId))
          .order("desc")
          .take(limit);

    return employerRows(ctx, applications);
  },
});

// Only the authenticated download route can resolve the underlying storage URL.
export const getResumeDownload = query({
  args: { applicationId: v.id("jobApplications"), serverSecret: v.string() },
  returns: v.union(v.null(), v.object({ url: v.string(), contentType: v.string() })),
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);
    const user = await requireAuthUser(ctx);
    const application = await ctx.db.get(args.applicationId);
    if (!application?.resumeStorageId) return null;
    const job = await ctx.db.get(application.jobId);
    if (!job || (user._id !== application.candidateId && user._id !== job.clientId)) throw new Error("Unauthorized.");
    const metadata = await ctx.db.system.get("_storage", application.resumeStorageId);
    if (!metadata || !metadata.contentType || !DOCUMENT_CONTENT_TYPES.has(metadata.contentType)) return null;
    const url = await ctx.storage.getUrl(application.resumeStorageId);
    return url ? { url, contentType: metadata.contentType } : null;
  },
});

export const generateResumeUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    const candidate = await requireAuthUser(ctx);
    requireMarketplaceContext(candidate, "candidate", "jobs", "uploading a resume");
    return await ctx.storage.generateUploadUrl();
  },
});

export const submit = mutation({
  args: {
    jobId: v.id("jobs"),
    coverLetter: v.string(),
    resumeStorageId: v.optional(v.id("_storage")),
    portfolioUrl: v.optional(v.string()),
  },
  returns: v.id("jobApplications"),
  handler: async (ctx, args) => {
    const candidate = await requireAuthUser(ctx);
    requireMarketplaceContext(candidate, "candidate", "jobs", "applying for a vacancy");
    const job = await ctx.db.get(args.jobId);
    if (!job) throw new Error("Job not found.");
    if (job.status !== "open")
      throw new Error("This job is not accepting applications.");
    if (job.expiresAt && job.expiresAt < Date.now()) {
      throw new Error("This job has expired.");
    }
    if (job.clientId === candidate._id) {
      throw new Error("You cannot apply to your own job.");
    }

    const coverLetter = args.coverLetter.trim();
    if (coverLetter.length < 80 || coverLetter.length > 5000) {
      throw new Error(
        "Your application message must be between 80 and 5,000 characters.",
      );
    }
    validatePortfolioUrl(args.portfolioUrl);
    const existing = await ctx.db
      .query("jobApplications")
      .withIndex("by_job_candidate", (q) =>
        q.eq("jobId", args.jobId).eq("candidateId", candidate._id),
      )
      .unique();
    if (existing) throw new Error("You have already applied for this job.");

    await rateLimiter.limit(ctx, "jobApplication", {
      key: candidate._id,
      throws: true,
    });

    if (args.resumeStorageId) {
      await claimStoredFile(
        ctx,
        candidate._id,
        args.resumeStorageId,
        "resume",
        {
          maxBytes: 10 * 1024 * 1024,
          allowedContentTypes: DOCUMENT_CONTENT_TYPES,
          typeError: "Upload a PDF, DOC or DOCX resume.",
        },
      );
    }

    const now = Date.now();
    const applicationId = await ctx.db.insert("jobApplications", {
      tenantId: job.tenantId,
      jobId: job._id,
      candidateId: candidate._id,
      coverLetter,
      resumeStorageId: args.resumeStorageId,
      portfolioUrl: args.portfolioUrl,
      status: "submitted",
      submittedAt: now,
      statusUpdatedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.patch(job._id, {
      applicationCount: (job.applicationCount ?? 0) + 1,
      updatedAt: now,
    });
    await notifyUser(ctx, {
      userId: job.clientId,
      type: "job_application_received",
      title: "New application received",
      body: `${candidate.name} applied for ${job.title}.`,
      link: `/manage-jobs/${job._id}/applications`,
      metadata: { jobId: job._id, applicationId },
    });

    return applicationId;
  },
});

export const withdraw = mutation({
  args: { applicationId: v.id("jobApplications"), expectedUpdatedAt: v.optional(v.number()) },
  returns: v.id("jobApplications"),
  handler: async (ctx, args) => {
    const candidate = await requireAuthUser(ctx);
    requireMarketplaceContext(candidate, "candidate", "jobs", "withdrawing an application");
    const application = await ctx.db.get(args.applicationId);
    if (!application) throw new Error("Application not found.");
    if (application.candidateId !== candidate._id)
      throw new Error("Unauthorized.");
    if (application.status === "withdrawn") return application._id;
    if (args.expectedUpdatedAt !== undefined && args.expectedUpdatedAt !== application.updatedAt) throw new Error("The application changed. Review the latest status and try again.");

    assertTransition(
      jobApplicationTransitions,
      application.status,
      "withdrawn",
    );
    const now = Math.max(Date.now(), application.updatedAt + 1);
    await ctx.db.patch(application._id, {
      status: "withdrawn",
      statusUpdatedAt: now,
      updatedAt: now,
    });
    const job = await ctx.db.get(application.jobId);
    if (job) await notifyUser(ctx, {
      userId: job.clientId, type: "job_application_withdrawn", title: "Application withdrawn",
      body: `${candidate.name} withdrew their application for ${job.title}.`,
      link: `/manage-jobs/${job._id}/applications`,
      metadata: { jobId: job._id, applicationId: application._id },
    });
    return application._id;
  },
});

export const updateStatus = mutation({
  args: {
    applicationId: v.id("jobApplications"),
    status: jobApplicationStatusValidator,
    employerNote: v.optional(v.string()),
    expectedUpdatedAt: v.optional(v.number()),
  },
  returns: v.id("jobApplications"),
  handler: async (ctx, args) => {
    const application = await ctx.db.get(args.applicationId);
    if (!application) throw new Error("Application not found.");
    const job = await ctx.db.get(application.jobId);
    if (!job) throw new Error("Job not found.");
    const employer = await requireOwner(ctx, job.clientId);
    requireMarketplaceContext(employer, "company", "jobs", "updating an application");

    if (["draft", "submitted", "withdrawn"].includes(args.status)) {
      throw new Error("Employers cannot move an application to that status.");
    }
    const employerNote = args.employerNote?.trim();
    if (employerNote && employerNote.length > 3000) throw new Error("Employer notes cannot exceed 3,000 characters.");
    if (application.status === args.status && (args.employerNote === undefined || application.employerNote === employerNote)) return application._id;
    if (args.expectedUpdatedAt !== undefined && args.expectedUpdatedAt !== application.updatedAt) throw new Error("The application changed. Review the latest status and try again.");
    assertTransition(
      jobApplicationTransitions,
      application.status,
      args.status,
    );

    const now = Math.max(Date.now(), application.updatedAt + 1);
    await ctx.db.patch(application._id, {
      status: args.status,
      ...(args.employerNote === undefined ? {} : { employerNote }),
      statusUpdatedAt: now,
      updatedAt: now,
    });
    if (application.status !== args.status) await notifyUser(ctx, {
      userId: application.candidateId,
      type: "job_application_status",
      title: "Application updated",
      body: `${job.title}: ${args.status === "screening" ? "In review" : args.status === "rejected" ? "Application closed" : args.status.charAt(0).toUpperCase() + args.status.slice(1)}. View your application for the latest status.`,
      link: `/dashboard/applications?application=${application._id}`,
      metadata: {
        jobId: job._id,
        applicationId: application._id,
        status: args.status,
      },
    });
    return application._id;
  },
});
