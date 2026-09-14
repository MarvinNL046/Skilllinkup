import { v } from "convex/values";
import {
  paginationOptsValidator,
  paginationResultValidator,
} from "convex/server";
import { query, type QueryCtx } from "../_generated/server";
import type { Id } from "../_generated/dataModel";
import { requireAuthUser, requireMarketplaceContext } from "../lib/authHelpers";
import { jobApplicationStatusValidator } from "../lib/marketplaceState";

const invitationStatus = v.union(
  v.literal("pending"),
  v.literal("interested"),
  v.literal("declined"),
  v.literal("withdrawn"),
);
async function ownedJob(ctx: QueryCtx, jobId: Id<"jobs">) {
  const user = await requireAuthUser(ctx);
  requireMarketplaceContext(
    user,
    "company",
    "jobs",
    "viewing your hiring overview",
  );
  const job = await ctx.db.get(jobId);
  if (!job || job.clientId !== user._id || job.tenantId !== user.tenantId)
    throw new Error("This vacancy is not available to your account.");
  return job;
}
const count = v.object({ value: v.number(), capped: v.boolean() });
const cappedCount = (length: number) => ({
  value: Math.min(length, 500),
  capped: length > 500,
});
export const summary = query({
  args: { jobId: v.id("jobs") },
  returns: v.object({
    title: v.string(),
    status: v.string(),
    invited: count,
    interested: count,
    applications: count,
  }),
  handler: async (ctx, { jobId }) => {
    const job = await ownedJob(ctx, jobId);
    // Bound summary reads. Larger totals are explicitly displayed as 500+.
    const [invited, interested, ...applications] = await Promise.all([
      ctx.db
        .query("jobInvitations")
        .withIndex("by_jobId", (q) => q.eq("jobId", jobId))
        .take(501),
      ctx.db
        .query("jobInvitations")
        .withIndex("by_jobId_and_status", (q) =>
          q.eq("jobId", jobId).eq("status", "interested"),
        )
        .take(501),
      ...(
        [
          "submitted",
          "screening",
          "interview",
          "offer",
          "hired",
          "rejected",
          "withdrawn",
        ] as const
      ).map((status) =>
        ctx.db
          .query("jobApplications")
          .withIndex("by_job_status", (q) =>
            q.eq("jobId", jobId).eq("status", status),
          )
          .take(501),
      ),
    ]);
    return {
      title: job.title,
      status: job.status,
      invited: cappedCount(invited.length),
      interested: cappedCount(interested.length),
      applications: cappedCount(
        applications.reduce((sum, rows) => sum + rows.length, 0),
      ),
    };
  },
});
export const invitations = query({
  args: {
    jobId: v.id("jobs"),
    status: v.optional(invitationStatus),
    paginationOpts: paginationOptsValidator,
  },
  returns: paginationResultValidator(
    v.object({
      _id: v.id("jobInvitations"),
      candidateName: v.string(),
      status: invitationStatus,
      note: v.string(),
      createdAt: v.number(),
      expiresAt: v.number(),
      applicationId: v.union(v.id("jobApplications"), v.null()),
      applicationStatus: v.union(jobApplicationStatusValidator, v.null()),
    }),
  ),
  handler: async (ctx, args) => {
    const job = await ownedJob(ctx, args.jobId);
    if (args.paginationOpts.numItems > 50)
      throw new Error("Load up to 50 invitations at a time.");
    const source = args.status
      ? ctx.db
          .query("jobInvitations")
          .withIndex("by_jobId_and_status", (q) =>
            q.eq("jobId", job._id).eq("status", args.status!),
          )
      : ctx.db
          .query("jobInvitations")
          .withIndex("by_jobId", (q) => q.eq("jobId", job._id));
    const result = await source.order("desc").paginate(args.paginationOpts);
    const page = [];
    for (const invite of result.page) {
      if (
        invite.employerId !== job.clientId ||
        invite.tenantId !== job.tenantId
      )
        continue;
      const application = await ctx.db
        .query("jobApplications")
        .withIndex("by_job_candidate", (q) =>
          q.eq("jobId", job._id).eq("candidateId", invite.candidateId),
        )
        .unique();
      const submitted =
        application &&
        application.status !== "draft" &&
        application.tenantId === job.tenantId;
      page.push({
        _id: invite._id,
        candidateName: invite.candidateName,
        status: invite.status,
        note: invite.note,
        createdAt: invite.createdAt,
        expiresAt: invite.expiresAt,
        applicationId: submitted ? application._id : null,
        applicationStatus: submitted ? application.status : null,
      });
    }
    return { ...result, page };
  },
});
