import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { requireAuthUser, requireOwner } from "../lib/authHelpers";
import { notifyUser } from "../lib/notifications";
import {
  assertTransition,
  jobApplicationStatusValidator,
  jobApplicationTransitions,
} from "../lib/marketplaceState";
import { rateLimiter } from "../lib/rateLimits";
import { DOCUMENT_CONTENT_TYPES, requireStoredFile } from "../lib/storageValidation";

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
        q.eq("jobId", args.jobId).eq("candidateId", user._id)
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
  returns: v.array(
    v.object({
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
    })
  ),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const limit = Math.min(Math.max(args.limit ?? 25, 1), 100);
    const applications = await ctx.db
      .query("jobApplications")
      .withIndex("by_candidate", (q) => q.eq("candidateId", user._id))
      .order("desc")
      .take(limit);

    const jobs = await Promise.all(applications.map((item) => ctx.db.get(item.jobId)));
    return applications.flatMap((application, index) => {
      const job = jobs[index];
      if (!job) return [];
      const {
        candidateId: _candidateId,
        employerNote: _privateNote,
        tenantId: _tenantId,
        ...safe
      } = application;
      return [{
        application: safe,
        job: {
          id: job._id,
          slug: job.slug,
          title: job.title,
          company: job.company ?? null,
          workType: job.workType ?? null,
          locationCity: job.locationCity ?? null,
          status: job.status,
        },
      }];
    });
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
    await requireOwner(ctx, job.clientId);

    const limit = Math.min(Math.max(args.limit ?? 50, 1), 100);
    const applications = args.status
      ? await ctx.db
          .query("jobApplications")
          .withIndex("by_job_status", (q) =>
            q.eq("jobId", args.jobId).eq("status", args.status!)
          )
          .order("desc")
          .take(limit)
      : await ctx.db
          .query("jobApplications")
          .withIndex("by_job", (q) => q.eq("jobId", args.jobId))
          .order("desc")
          .take(limit);

    return await Promise.all(
      applications.map(async (application) => {
        const candidate = await ctx.db.get(application.candidateId);
        if (!candidate) throw new Error("Application candidate no longer exists.");
        const resumeUrl = application.resumeStorageId
          ? await ctx.storage.getUrl(application.resumeStorageId)
          : null;
        return {
          application,
          candidate: {
            id: candidate._id,
            name: candidate.name,
            email: candidate.email,
            image: candidate.image ?? candidate.avatar ?? null,
          },
          resumeUrl,
        };
      })
    );
  },
});

export const generateResumeUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    await requireAuthUser(ctx);
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
    const job = await ctx.db.get(args.jobId);
    if (!job) throw new Error("Job not found.");
    if (job.status !== "open") throw new Error("This job is not accepting applications.");
    if (job.expiresAt && job.expiresAt < Date.now()) {
      throw new Error("This job has expired.");
    }
    if (job.clientId === candidate._id) {
      throw new Error("You cannot apply to your own job.");
    }

    const coverLetter = args.coverLetter.trim();
    if (coverLetter.length < 80 || coverLetter.length > 5000) {
      throw new Error("Your application message must be between 80 and 5,000 characters.");
    }
    validatePortfolioUrl(args.portfolioUrl);
    if (args.resumeStorageId) {
      await requireStoredFile(ctx, args.resumeStorageId, {
        maxBytes: 10 * 1024 * 1024,
        allowedContentTypes: DOCUMENT_CONTENT_TYPES,
        typeError: "Upload a PDF, DOC or DOCX resume.",
      });
    }

    const existing = await ctx.db
      .query("jobApplications")
      .withIndex("by_job_candidate", (q) =>
        q.eq("jobId", args.jobId).eq("candidateId", candidate._id)
      )
      .unique();
    if (existing) throw new Error("You have already applied for this job.");

    await rateLimiter.limit(ctx, "jobApplication", { key: candidate._id, throws: true });

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

    const roles = new Set(candidate.accountRoles ?? []);
    roles.add("candidate");
    await ctx.db.patch(candidate._id, {
      accountRoles: [...roles],
      activeRole: candidate.activeRole ?? "candidate",
      preferredWorld: candidate.preferredWorld ?? "jobs",
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
  args: { applicationId: v.id("jobApplications") },
  returns: v.id("jobApplications"),
  handler: async (ctx, args) => {
    const candidate = await requireAuthUser(ctx);
    const application = await ctx.db.get(args.applicationId);
    if (!application) throw new Error("Application not found.");
    if (application.candidateId !== candidate._id) throw new Error("Unauthorized.");

    assertTransition(jobApplicationTransitions, application.status, "withdrawn");
    const now = Date.now();
    await ctx.db.patch(application._id, {
      status: "withdrawn",
      statusUpdatedAt: now,
      updatedAt: now,
    });
    return application._id;
  },
});

export const updateStatus = mutation({
  args: {
    applicationId: v.id("jobApplications"),
    status: jobApplicationStatusValidator,
    employerNote: v.optional(v.string()),
  },
  returns: v.id("jobApplications"),
  handler: async (ctx, args) => {
    const application = await ctx.db.get(args.applicationId);
    if (!application) throw new Error("Application not found.");
    const job = await ctx.db.get(application.jobId);
    if (!job) throw new Error("Job not found.");
    await requireOwner(ctx, job.clientId);

    if (["draft", "submitted", "withdrawn"].includes(args.status)) {
      throw new Error("Employers cannot move an application to that status.");
    }
    assertTransition(jobApplicationTransitions, application.status, args.status);

    const employerNote = args.employerNote?.trim();
    if (employerNote && employerNote.length > 3000) {
      throw new Error("Employer notes cannot exceed 3,000 characters.");
    }
    const now = Date.now();
    await ctx.db.patch(application._id, {
      status: args.status,
      employerNote,
      statusUpdatedAt: now,
      updatedAt: now,
    });
    await notifyUser(ctx, {
      userId: application.candidateId,
      type: "job_application_status",
      title: "Application updated",
      body: `${job.title} moved to ${args.status.replaceAll("_", " ")}.`,
      link: "/dashboard/applications",
      metadata: { jobId: job._id, applicationId: application._id, status: args.status },
    });
    return application._id;
  },
});
