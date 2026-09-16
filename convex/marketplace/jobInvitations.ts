import { v } from "convex/values";
import {
  paginationOptsValidator,
  paginationResultValidator,
} from "convex/server";
import { mutation, query, type QueryCtx } from "../_generated/server";
import type { Doc } from "../_generated/dataModel";
import { requireAuthUser, requireMarketplaceContext } from "../lib/authHelpers";
import { rateLimiter } from "../lib/rateLimits";
import { notifyUser } from "../lib/notifications";
import { jobApplicationStatusValidator } from "../lib/marketplaceState";

const status = v.union(
  v.literal("pending"),
  v.literal("interested"),
  v.literal("declined"),
  v.literal("withdrawn"),
);
const row = v.object({
  _id: v.id("jobInvitations"),
  jobId: v.id("jobs"),
  candidateName: v.string(),
  companyName: v.string(),
  jobTitle: v.string(),
  note: v.string(),
  status,
  expiresAt: v.number(),
  createdAt: v.number(),
  updatedAt: v.number(),
  available: v.boolean(),
  jobHref: v.union(v.string(), v.null()),
  // A submitted application by the invited candidate for the same vacancy.
  // Interest alone never creates one; drafts stay private to the candidate.
  applicationId: v.union(v.id("jobApplications"), v.null()),
  applicationStatus: v.union(jobApplicationStatusValidator, v.null()),
});
async function employer(ctx: QueryCtx) {
  const user = await requireAuthUser(ctx);
  requireMarketplaceContext(user, "company", "jobs", "inviting candidates");
  if (user.companyVerificationStatus !== "verified" || user.deletionRequestedAt)
    throw new Error("Verify your company before inviting candidates.");
  return user;
}
function openJob(job: Doc<"jobs"> | null) {
  return (
    !!job &&
    job.status === "open" &&
    (job.expiresAt === undefined || job.expiresAt > Date.now())
  );
}
async function recipient(
  ctx: QueryCtx,
  profileId: Doc<"candidateProfiles">["_id"],
  sender: Doc<"users">,
) {
  const profile = await ctx.db.get(profileId);
  const candidate = profile ? await ctx.db.get(profile.userId) : null;
  if (
    !profile ||
    !candidate ||
    candidate.deletionRequestedAt ||
    !profile.discoverable ||
    !profile.allowInvitations ||
    profile.tenantId !== sender.tenantId ||
    candidate.tenantId !== sender.tenantId ||
    candidate._id === sender._id
  )
    throw new Error("This candidate is not available for invitations.");
  return { profile, candidate };
}
// Only paginated, open vacancies belonging to the verified sender are offered.
export const options = query({
  args: {
    profileId: v.id("candidateProfiles"),
    paginationOpts: paginationOptsValidator,
  },
  returns: paginationResultValidator(
    v.object({
      _id: v.id("jobs"),
      title: v.string(),
      unavailableReason: v.union(v.string(), v.null()),
    }),
  ),
  handler: async (ctx, args) => {
    const sender = await employer(ctx);
    const profile = await ctx.db.get(args.profileId);
    // A reactive consent change empties the picker without crashing the directory.
    if (
      !profile ||
      !profile.discoverable ||
      !profile.allowInvitations ||
      profile.tenantId !== sender.tenantId
    )
      return { page: [], isDone: true, continueCursor: "" };
    if (args.paginationOpts.numItems > 30)
      throw new Error("Load up to 30 vacancies at a time.");
    const result = await ctx.db
      .query("jobs")
      .withIndex("by_client_status", (q) =>
        q.eq("clientId", sender._id).eq("status", "open"),
      )
      .order("desc")
      .paginate(args.paginationOpts);
    const page = [];
    for (const job of result.page) {
      if (!openJob(job) || job.tenantId !== sender.tenantId) continue;
      const existing = await ctx.db
        .query("jobInvitations")
        .withIndex("by_jobId_and_candidateId", (q) =>
          q.eq("jobId", job._id).eq("candidateId", profile.userId),
        )
        .unique();
      const application = await ctx.db
        .query("jobApplications")
        .withIndex("by_job_candidate", (q) =>
          q.eq("jobId", job._id).eq("candidateId", profile.userId),
        )
        .unique();
      page.push({
        _id: job._id,
        title: job.title,
        unavailableReason: existing
          ? "Already invited"
          : application
            ? "Already applied"
            : null,
      });
    }
    return { ...result, page };
  },
});
export const send = mutation({
  args: {
    profileId: v.id("candidateProfiles"),
    jobId: v.id("jobs"),
    note: v.string(),
  },
  returns: v.id("jobInvitations"),
  handler: async (ctx, args) => {
    const sender = await employer(ctx);
    const { profile, candidate } = await recipient(ctx, args.profileId, sender);
    const job = await ctx.db.get(args.jobId);
    if (
      !job ||
      job.clientId !== sender._id ||
      job.tenantId !== sender.tenantId ||
      !openJob(job)
    )
      throw new Error("Choose one of your open, current vacancies.");
    const note = args.note.trim();
    if (note.length > 600)
      throw new Error("Keep your invitation below 600 characters.");
    const existing = await ctx.db
      .query("jobInvitations")
      .withIndex("by_jobId_and_candidateId", (q) =>
        q.eq("jobId", job._id).eq("candidateId", candidate._id),
      )
      .unique();
    // Transactional uniqueness makes retries/double-clicks notification-idempotent.
    if (existing) return existing._id;
    const application = await ctx.db
      .query("jobApplications")
      .withIndex("by_job_candidate", (q) =>
        q.eq("jobId", job._id).eq("candidateId", candidate._id),
      )
      .unique();
    if (application)
      throw new Error("This candidate has already applied to this vacancy.");
    await rateLimiter.limit(ctx, "jobInvitation", {
      key: sender._id,
      throws: true,
    });
    const now = Date.now();
    const id = await ctx.db.insert("jobInvitations", {
      tenantId: sender.tenantId,
      employerId: sender._id,
      candidateId: candidate._id,
      jobId: job._id,
      candidateName: profile.displayName,
      jobTitle: job.title,
      companyName: job.company || sender.name,
      note,
      status: "pending",
      expiresAt: Math.min(now + 30 * 86400000, job.expiresAt ?? Infinity),
      createdAt: now,
      updatedAt: now,
    });
    await notifyUser(ctx, {
      userId: candidate._id,
      type: "job_invitation_received",
      title: "You have a vacancy invitation",
      body: `${job.company || sender.name} invited you to consider ${job.title}. You decide whether to respond.`,
      link: `/dashboard/job-invitations?invitation=${id}`,
    });
    return id;
  },
});
async function available(ctx: QueryCtx, invitation: Doc<"jobInvitations">) {
  const job = await ctx.db.get(invitation.jobId);
  const company = await ctx.db.get(invitation.employerId);
  const candidate = await ctx.db.get(invitation.candidateId);
  const allowed =
    openJob(job) &&
    job?.clientId === invitation.employerId &&
    job?.tenantId === invitation.tenantId &&
    company?.tenantId === invitation.tenantId &&
    company?.companyVerificationStatus === "verified" &&
    !company?.deletionRequestedAt &&
    !!candidate &&
    candidate.tenantId === invitation.tenantId &&
    !candidate.deletionRequestedAt &&
    invitation.expiresAt > Date.now();
  return { allowed: !!allowed, job };
}
async function linkedApplication(
  ctx: QueryCtx,
  invitation: Doc<"jobInvitations">,
) {
  const application = await ctx.db
    .query("jobApplications")
    .withIndex("by_job_candidate", (q) =>
      q.eq("jobId", invitation.jobId).eq("candidateId", invitation.candidateId),
    )
    .unique();
  return application &&
    application.status !== "draft" &&
    application.tenantId === invitation.tenantId
    ? application
    : null;
}
export const listMine = query({
  args: {
    audience: v.union(v.literal("candidate"), v.literal("company")),
    // Notification and dashboard links select one invitation; an unknown or
    // foreign id yields an empty page instead of an error.
    invitationId: v.optional(v.string()),
    paginationOpts: paginationOptsValidator,
  },
  returns: paginationResultValidator(row),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    requireMarketplaceContext(
      user,
      args.audience,
      "jobs",
      "viewing invitations",
    );
    if (args.paginationOpts.numItems > 50)
      throw new Error("Load up to 50 invitations at a time.");
    let result;
    if (args.invitationId !== undefined) {
      const id = ctx.db.normalizeId("jobInvitations", args.invitationId);
      const invitation = id ? await ctx.db.get(id) : null;
      const owned =
        invitation &&
        (args.audience === "candidate"
          ? invitation.candidateId === user._id
          : invitation.employerId === user._id);
      result = { page: owned ? [invitation] : [], isDone: true, continueCursor: "" };
    } else {
      const source =
        args.audience === "candidate"
          ? ctx.db
              .query("jobInvitations")
              .withIndex("by_candidateId", (q) => q.eq("candidateId", user._id))
          : ctx.db
              .query("jobInvitations")
              .withIndex("by_employerId", (q) => q.eq("employerId", user._id));
      result = await source.order("desc").paginate(args.paginationOpts);
    }
    const page = [];
    for (const invitation of result.page) {
      if (invitation.tenantId !== user.tenantId) continue;
      const { allowed, job } = await available(ctx, invitation);
      const application = await linkedApplication(ctx, invitation);
      page.push({
        _id: invitation._id,
        jobId: invitation.jobId,
        candidateName: invitation.candidateName,
        companyName: invitation.companyName,
        jobTitle: invitation.jobTitle,
        note: invitation.note,
        status: invitation.status,
        expiresAt: invitation.expiresAt,
        createdAt: invitation.createdAt,
        updatedAt: invitation.updatedAt,
        available: allowed,
        jobHref:
          allowed && job ? `/jobs/job/${encodeURIComponent(job.slug)}` : null,
        applicationId: application ? application._id : null,
        applicationStatus: application ? application.status : null,
      });
    }
    return { ...result, page };
  },
});
export const respond = mutation({
  args: {
    invitationId: v.id("jobInvitations"),
    response: v.union(v.literal("interested"), v.literal("declined")),
    expectedUpdatedAt: v.number(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    requireMarketplaceContext(
      user,
      "candidate",
      "jobs",
      "responding to an invitation",
    );
    const invitation = await ctx.db.get(args.invitationId);
    if (
      !invitation ||
      invitation.candidateId !== user._id ||
      invitation.tenantId !== user.tenantId ||
      user.deletionRequestedAt
    )
      throw new Error("This invitation is not available to your account.");
    if (invitation.status === args.response) return null;
    if (
      invitation.status !== "pending" ||
      invitation.updatedAt !== args.expectedUpdatedAt
    )
      throw new Error("This invitation changed. Review its current status.");
    // Expired, closed or unverified invitations accept no response at all, so
    // the employer never receives a misleading decline for a dead invitation.
    if (!(await available(ctx, invitation)).allowed)
      throw new Error("This invitation is no longer available.");
    await ctx.db.patch(invitation._id, {
      status: args.response,
      updatedAt: Math.max(Date.now(), invitation.updatedAt + 1),
    });
    const company = await ctx.db.get(invitation.employerId);
    if (company && !company.deletionRequestedAt)
      await notifyUser(ctx, {
        userId: company._id,
        type: "job_invitation_response",
        title: "A candidate responded to your invitation",
        body: `${invitation.candidateName} ${args.response === "interested" ? "is interested in" : "declined the invitation for"} ${invitation.jobTitle}.`,
        link: `/dashboard/sent-invitations?invitation=${invitation._id}`,
      });
    return null;
  },
});
export const withdraw = mutation({
  args: { invitationId: v.id("jobInvitations"), expectedUpdatedAt: v.number() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    requireMarketplaceContext(
      user,
      "company",
      "jobs",
      "withdrawing an invitation",
    );
    const invitation = await ctx.db.get(args.invitationId);
    if (
      !invitation ||
      invitation.employerId !== user._id ||
      invitation.tenantId !== user.tenantId
    )
      throw new Error("This invitation is not available to your account.");
    if (invitation.status === "withdrawn") return null;
    if (
      invitation.status !== "pending" ||
      invitation.updatedAt !== args.expectedUpdatedAt
    )
      throw new Error("This invitation changed. Review its current status.");
    await ctx.db.patch(invitation._id, {
      status: "withdrawn",
      updatedAt: Math.max(Date.now(), invitation.updatedAt + 1),
    });
    return null;
  },
});
