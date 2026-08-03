import { v } from "convex/values";
import type { Infer } from "convex/values";
import { mutation, query } from "../_generated/server";
import type { Doc, Id } from "../_generated/dataModel";
import type { MutationCtx } from "../_generated/server";
import { requireAuthUser, requireOwner } from "../lib/authHelpers";
import { conversationContextTypeValidator } from "../lib/marketplaceState";

const conversationContextValidator = v.union(
  v.object({
    type: v.literal("profile_inquiry"),
    freelancerProfileId: v.id("freelancerProfiles"),
  }),
  v.object({
    type: v.literal("gig_inquiry"),
    gigId: v.id("gigs"),
  }),
  v.object({
    type: v.literal("project_bid"),
    bidId: v.id("bids"),
  }),
  v.object({
    type: v.literal("order"),
    orderId: v.id("orders"),
  }),
  v.object({
    type: v.literal("local_quote"),
    quoteId: v.id("quotes"),
  }),
  v.object({
    type: v.literal("local_appointment"),
    appointmentId: v.id("localAppointments"),
  }),
  v.object({
    type: v.literal("job_application"),
    applicationId: v.id("jobApplications"),
  }),
);

type ConversationContextInput = Infer<typeof conversationContextValidator>;

type ResolvedContext = {
  type: Infer<typeof conversationContextTypeValidator>;
  title: string;
  href: string;
  otherUserId: Id<"users">;
  orderId?: Id<"orders">;
  projectId?: Id<"projects">;
  bidId?: Id<"bids">;
  freelancerProfileId?: Id<"freelancerProfiles">;
  gigId?: Id<"gigs">;
  quoteId?: Id<"quotes">;
  localAppointmentId?: Id<"localAppointments">;
  jobApplicationId?: Id<"jobApplications">;
};

function canonicalParticipants(
  first: Id<"users">,
  second: Id<"users">,
): [Id<"users">, Id<"users">] {
  return first < second ? [first, second] : [second, first];
}

function canStartProfileInquiry(user: Doc<"users">) {
  const roles = user.accountRoles ?? [];
  return (
    roles.includes("client") ||
    user.userType === "client" ||
    user.role === "admin"
  );
}

async function resolveContext(
  ctx: MutationCtx,
  caller: Doc<"users">,
  context: ConversationContextInput,
): Promise<ResolvedContext> {
  if (context.type === "profile_inquiry") {
    const profile = await ctx.db.get(context.freelancerProfileId);
    if (!profile || profile.status !== "active") {
      throw new Error("This professional is not available.");
    }
    if (profile.userId === caller._id) {
      throw new Error("You cannot start a conversation with yourself.");
    }
    if (profile.contactPermission === "nobody") {
      throw new Error("This professional is not accepting new enquiries.");
    }
    if (
      profile.contactPermission === "clients_only" &&
      !canStartProfileInquiry(caller)
    ) {
      throw new Error("Only client accounts can contact this professional.");
    }
    return {
      type: context.type,
      title: `Profile enquiry · ${profile.displayName}`,
      href: `/online/freelancer/${profile.slug ?? profile._id}`,
      otherUserId: profile.userId,
      freelancerProfileId: profile._id,
    };
  }

  if (context.type === "gig_inquiry") {
    const gig = await ctx.db.get(context.gigId);
    if (!gig || gig.status !== "active") {
      throw new Error("This service is not available.");
    }
    const profile = await ctx.db.get(gig.freelancerId);
    if (!profile || profile.status !== "active") {
      throw new Error("This professional is not available.");
    }
    if (profile.userId === caller._id) {
      throw new Error("You cannot enquire about your own service.");
    }
    return {
      type: context.type,
      title: gig.title,
      href: `/online/service/${gig._id}`,
      otherUserId: profile.userId,
      freelancerProfileId: profile._id,
      gigId: gig._id,
    };
  }

  if (context.type === "project_bid") {
    const bid = await ctx.db.get(context.bidId);
    if (!bid || !["pending", "accepted"].includes(bid.status)) {
      throw new Error("This proposal is not available for messaging.");
    }
    const [project, profile] = await Promise.all([
      ctx.db.get(bid.projectId),
      ctx.db.get(bid.freelancerId),
    ]);
    if (!project || !profile) throw new Error("Proposal context not found.");
    const isClient = caller._id === project.clientId;
    const isFreelancer = caller._id === profile.userId;
    if (!isClient && !isFreelancer) throw new Error("Unauthorized.");
    return {
      type: context.type,
      title: project.title,
      href: `/online/project/${project._id}`,
      otherUserId: isClient ? profile.userId : project.clientId,
      projectId: project._id,
      bidId: bid._id,
      freelancerProfileId: profile._id,
    };
  }

  if (context.type === "order") {
    const order = await ctx.db.get(context.orderId);
    if (!order || !order.freelancerId) throw new Error("Order not found.");
    const profile = await ctx.db.get(order.freelancerId);
    if (!profile) throw new Error("Order professional not found.");
    const isClient = caller._id === order.clientId;
    const isFreelancer = caller._id === profile.userId;
    if (!isClient && !isFreelancer) throw new Error("Unauthorized.");
    return {
      type: context.type,
      title: order.title,
      href: `/orders/${order._id}`,
      otherUserId: isClient ? profile.userId : order.clientId,
      orderId: order._id,
      projectId: order.projectId,
      freelancerProfileId: profile._id,
      gigId: order.gigId,
      quoteId: order.quoteId,
    };
  }

  if (context.type === "local_quote") {
    const quote = await ctx.db.get(context.quoteId);
    if (!quote || !["pending", "accepted"].includes(quote.status)) {
      throw new Error("This quote is not available for messaging.");
    }
    const [request, profile] = await Promise.all([
      ctx.db.get(quote.quoteRequestId),
      ctx.db.get(quote.freelancerId),
    ]);
    if (!request || !profile) throw new Error("Quote context not found.");
    const isClient = caller._id === request.clientId;
    const isProfessional = caller._id === profile.userId;
    if (!isClient && !isProfessional) throw new Error("Unauthorized.");
    return {
      type: context.type,
      title: request.title,
      href: `/local/quote-request/${request._id}`,
      otherUserId: isClient ? profile.userId : request.clientId,
      quoteId: quote._id,
      freelancerProfileId: profile._id,
    };
  }

  if (context.type === "local_appointment") {
    const appointment = await ctx.db.get(context.appointmentId);
    if (!appointment) throw new Error("Appointment not found.");
    const profile = await ctx.db.get(appointment.professionalId);
    if (!profile) throw new Error("Appointment professional not found.");
    const isClient = caller._id === appointment.clientId;
    const isProfessional = caller._id === profile.userId;
    if (!isClient && !isProfessional) throw new Error("Unauthorized.");
    const order = await ctx.db.get(appointment.orderId);
    return {
      type: context.type,
      title: order?.title ?? "Local appointment",
      href: `/orders/${appointment.orderId}`,
      otherUserId: isClient ? profile.userId : appointment.clientId,
      orderId: appointment.orderId,
      quoteId: appointment.quoteId,
      freelancerProfileId: profile._id,
      localAppointmentId: appointment._id,
    };
  }

  const application = await ctx.db.get(context.applicationId);
  if (!application) throw new Error("Application not found.");
  if (!["screening", "interview", "offer", "hired"].includes(application.status)) {
    throw new Error("Messaging opens when the employer starts screening.");
  }
  const job = await ctx.db.get(application.jobId);
  if (!job) throw new Error("Job not found.");
  const isCandidate = caller._id === application.candidateId;
  const isEmployer = caller._id === job.clientId;
  if (!isCandidate && !isEmployer) throw new Error("Unauthorized.");
  return {
    type: context.type,
    title: job.title,
    href: `/jobs/job/${job._id}`,
    otherUserId: isCandidate ? job.clientId : application.candidateId,
    jobApplicationId: application._id,
  };
}

async function findExisting(
  ctx: MutationCtx,
  resolved: ResolvedContext,
  participant1: Id<"users">,
  participant2: Id<"users">,
) {
  if (resolved.orderId) {
    return await ctx.db
      .query("conversations")
      .withIndex("by_order", (q) => q.eq("orderId", resolved.orderId))
      .first();
  }
  if (resolved.bidId) {
    return await ctx.db
      .query("conversations")
      .withIndex("by_bid", (q) => q.eq("bidId", resolved.bidId))
      .first();
  }
  if (resolved.quoteId) {
    return await ctx.db
      .query("conversations")
      .withIndex("by_quote", (q) => q.eq("quoteId", resolved.quoteId))
      .first();
  }
  if (resolved.localAppointmentId) {
    return await ctx.db
      .query("conversations")
      .withIndex("by_localAppointment", (q) =>
        q.eq("localAppointmentId", resolved.localAppointmentId),
      )
      .first();
  }
  if (resolved.jobApplicationId) {
    return await ctx.db
      .query("conversations")
      .withIndex("by_jobApplication", (q) =>
        q.eq("jobApplicationId", resolved.jobApplicationId),
      )
      .first();
  }
  if (resolved.gigId) {
    return await ctx.db
      .query("conversations")
      .withIndex("by_gig_and_participants", (q) =>
        q
          .eq("gigId", resolved.gigId)
          .eq("participant1", participant1)
          .eq("participant2", participant2),
      )
      .first();
  }
  if (resolved.freelancerProfileId) {
    return await ctx.db
      .query("conversations")
      .withIndex("by_freelancerProfile_and_participants", (q) =>
        q
          .eq("freelancerProfileId", resolved.freelancerProfileId)
          .eq("participant1", participant1)
          .eq("participant2", participant2),
      )
      .first();
  }
  return null;
}

function contextSummary(conversation: Doc<"conversations">) {
  const type =
    conversation.contextType ??
    (conversation.orderId
      ? "order"
      : conversation.projectId
        ? "project_bid"
        : null);
  const href =
    conversation.contextHref ??
    (conversation.orderId
      ? `/orders/${conversation.orderId}`
      : conversation.projectId
        ? `/online/project/${conversation.projectId}`
        : null);
  return {
    type,
    title: conversation.contextTitle ?? "Skilllinkup conversation",
    href,
  };
}

export const list = query({
  args: { userId: v.id("users") },
  returns: v.array(v.any()),
  handler: async (ctx, args) => {
    await requireOwner(ctx, args.userId);
    const [asParticipant1, asParticipant2] = await Promise.all([
      ctx.db
        .query("conversations")
        .withIndex("by_participant1", (q) => q.eq("participant1", args.userId))
        .order("desc")
        .take(60),
      ctx.db
        .query("conversations")
        .withIndex("by_participant2", (q) => q.eq("participant2", args.userId))
        .order("desc")
        .take(60),
    ]);
    const sorted = [...asParticipant1, ...asParticipant2]
      .sort((a, b) => (b.lastMessageAt ?? b.createdAt) - (a.lastMessageAt ?? a.createdAt))
      .slice(0, 100);
    const otherIds = [
      ...new Set(
        sorted.map((conversation) =>
          conversation.participant1 === args.userId
            ? conversation.participant2
            : conversation.participant1,
        ),
      ),
    ];
    const users = await Promise.all(otherIds.map((id) => ctx.db.get(id)));
    const usersById = new Map(
      users
        .filter((user): user is NonNullable<typeof user> => user !== null)
        .map((user) => [user._id, user]),
    );
    return sorted.map((conversation) => {
      const otherId =
        conversation.participant1 === args.userId
          ? conversation.participant2
          : conversation.participant1;
      const other = usersById.get(otherId) ?? null;
      return {
        ...conversation,
        otherParticipant: other
          ? {
              _id: other._id,
              name: other.name,
              image: other.image ?? other.avatar ?? null,
            }
          : null,
        unreadCount:
          conversation.participant1 === args.userId
            ? (conversation.unreadCount1 ?? 0)
            : (conversation.unreadCount2 ?? 0),
        context: contextSummary(conversation),
      };
    });
  },
});

export const openForContext = mutation({
  args: { context: conversationContextValidator },
  returns: v.id("conversations"),
  handler: async (ctx, args) => {
    const caller = await requireAuthUser(ctx);
    const resolved = await resolveContext(ctx, caller, args.context);
    const [participant1, participant2] = canonicalParticipants(
      caller._id,
      resolved.otherUserId,
    );
    const existing = await findExisting(
      ctx,
      resolved,
      participant1,
      participant2,
    );
    if (existing) {
      const participantsMatch =
        (existing.participant1 === participant1 &&
          existing.participant2 === participant2) ||
        (existing.participant1 === participant2 &&
          existing.participant2 === participant1);
      if (
        !participantsMatch
      ) {
        throw new Error("Conversation participants do not match this context.");
      }
      return existing._id;
    }
    const now = Date.now();
    return await ctx.db.insert("conversations", {
      tenantId: caller.tenantId,
      contextType: resolved.type,
      contextTitle: resolved.title,
      contextHref: resolved.href,
      orderId: resolved.orderId,
      projectId: resolved.projectId,
      bidId: resolved.bidId,
      freelancerProfileId: resolved.freelancerProfileId,
      gigId: resolved.gigId,
      quoteId: resolved.quoteId,
      localAppointmentId: resolved.localAppointmentId,
      jobApplicationId: resolved.jobApplicationId,
      participant1,
      participant2,
      unreadCount1: 0,
      unreadCount2: 0,
      status: "active",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const getById = query({
  args: { conversationId: v.id("conversations") },
  returns: v.union(v.any(), v.null()),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) return null;
    if (
      conversation.participant1 !== user._id &&
      conversation.participant2 !== user._id
    ) {
      throw new Error("Unauthorized.");
    }
    const [participant1User, participant2User] = await Promise.all([
      ctx.db.get(conversation.participant1),
      ctx.db.get(conversation.participant2),
    ]);
    return {
      ...conversation,
      context: contextSummary(conversation),
      participant1User: participant1User
        ? {
            _id: participant1User._id,
            name: participant1User.name,
            image: participant1User.image ?? participant1User.avatar ?? null,
          }
        : null,
      participant2User: participant2User
        ? {
            _id: participant2User._id,
            name: participant2User.name,
            image: participant2User.image ?? participant2User.avatar ?? null,
          }
        : null,
    };
  },
});

export const getByOrder = query({
  args: { orderId: v.id("orders") },
  returns: v.union(v.any(), v.null()),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const conversation = await ctx.db
      .query("conversations")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .first();
    if (!conversation) return null;
    if (
      conversation.participant1 !== user._id &&
      conversation.participant2 !== user._id
    ) {
      throw new Error("Unauthorized.");
    }
    const otherId =
      conversation.participant1 === user._id
        ? conversation.participant2
        : conversation.participant1;
    const other = await ctx.db.get(otherId);
    return {
      ...conversation,
      context: contextSummary(conversation),
      otherParticipant: other
        ? {
            _id: other._id,
            name: other.name,
            image: other.image ?? other.avatar ?? null,
          }
        : null,
    };
  },
});
