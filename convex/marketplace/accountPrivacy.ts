import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";

export const exportMyData = query({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    const user = await requireAuthUser(ctx);
    const profile = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .first();

    const [clientOrders, freelancerOrders, projects, jobs, applications, quoteRequests, reports, tickets, saved, portfolio, experience, education, certifications, reviewsGiven, reviewsReceived] =
      await Promise.all([
        ctx.db.query("orders").withIndex("by_client", (q) => q.eq("clientId", user._id)).order("desc").take(250),
        profile
          ? ctx.db.query("orders").withIndex("by_freelancer", (q) => q.eq("freelancerId", profile._id)).order("desc").take(250)
          : Promise.resolve([]),
        ctx.db.query("projects").withIndex("by_client", (q) => q.eq("clientId", user._id)).order("desc").take(250),
        ctx.db.query("jobs").withIndex("by_client", (q) => q.eq("clientId", user._id)).order("desc").take(250),
        ctx.db.query("jobApplications").withIndex("by_candidate", (q) => q.eq("candidateId", user._id)).order("desc").take(250),
        ctx.db.query("quoteRequests").withIndex("by_client", (q) => q.eq("clientId", user._id)).order("desc").take(250),
        ctx.db.query("moderationReports").withIndex("by_reporter", (q) => q.eq("reporterId", user._id)).order("desc").take(250),
        ctx.db.query("supportTickets").withIndex("by_user", (q) => q.eq("userId", user._id)).order("desc").take(250),
        ctx.db.query("savedItems").withIndex("by_user", (q) => q.eq("userId", user._id)).order("desc").take(250),
        ctx.db.query("portfolioProjects").withIndex("by_user", (q) => q.eq("userId", user._id)).order("desc").take(250),
        ctx.db.query("workExperience").withIndex("by_user", (q) => q.eq("userId", user._id)).order("desc").take(250),
        ctx.db.query("education").withIndex("by_user", (q) => q.eq("userId", user._id)).order("desc").take(250),
        ctx.db.query("userCertifications").withIndex("by_user", (q) => q.eq("userId", user._id)).order("desc").take(250),
        ctx.db.query("marketplaceReviews").withIndex("by_reviewer", (q) => q.eq("reviewerId", user._id)).order("desc").take(250),
        ctx.db.query("marketplaceReviews").withIndex("by_reviewee", (q) => q.eq("revieweeId", user._id)).order("desc").take(250),
      ]);

    const [asParticipant1, asParticipant2] = await Promise.all([
      ctx.db.query("conversations").withIndex("by_participant1", (q) => q.eq("participant1", user._id)).order("desc").take(50),
      ctx.db.query("conversations").withIndex("by_participant2", (q) => q.eq("participant2", user._id)).order("desc").take(50),
    ]);
    const conversationMap = new Map(
      [...asParticipant1, ...asParticipant2].map((conversation) => [conversation._id, conversation])
    );
    const conversations = [...conversationMap.values()].slice(0, 25);
    const messageGroups = await Promise.all(
      conversations.map((conversation) =>
        ctx.db
          .query("messages")
          .withIndex("by_conversation", (q) => q.eq("conversationId", conversation._id))
          .order("asc")
          .take(100)
      )
    );

    const safeUser = {
      id: user._id,
      email: user.email,
      name: user.name,
      avatar: user.avatar ?? user.image,
      bio: user.bio,
      accountRoles: user.accountRoles,
      activeRole: user.activeRole,
      preferredWorld: user.preferredWorld,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletionRequestedAt: user.deletionRequestedAt,
    };

    return JSON.stringify(
      {
        exportVersion: 1,
        exportedAt: new Date().toISOString(),
        account: safeUser,
        freelancerProfile: profile,
        online: { projects, orders: [...clientOrders, ...freelancerOrders], reviewsAuthored: reviewsGiven, reviewsReceived },
        local: { quoteRequests },
        jobs: { jobs, applications },
        communication: { conversations, messages: messageGroups.flat() },
        profileData: { portfolio, experience, education, certifications },
        accountActivity: { savedItems: saved, reports, supportTickets: tickets },
      },
      null,
      2
    );
  },
});

export const requestAccountDeletion = mutation({
  args: { reason: v.string() },
  returns: v.object({ ticketId: v.id("supportTickets") }),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const reason = args.reason.trim();
    if (reason.length < 10 || reason.length > 2000) {
      throw new Error("Explain your request in 10 to 2,000 characters.");
    }
    if (user.deletionRequestedAt) {
      throw new Error("An account deletion request is already active.");
    }
    const now = Date.now();
    const ticketId = await ctx.db.insert("supportTickets", {
      tenantId: user.tenantId,
      userId: user._id,
      category: "account",
      subject: "Account deletion request",
      description: reason,
      priority: "normal",
      status: "open",
      relatedUrl: "/dashboard/privacy",
      createdAt: now,
      updatedAt: now,
    });
    await ctx.db.patch(user._id, { deletionRequestedAt: now, updatedAt: now });
    return { ticketId };
  },
});

export const cancelAccountDeletion = mutation({
  args: {},
  returns: v.object({ success: v.boolean() }),
  handler: async (ctx) => {
    const user = await requireAuthUser(ctx);
    if (!user.deletionRequestedAt) return { success: true };
    const tickets = await ctx.db
      .query("supportTickets")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(50);
    const deletionTicket = tickets.find(
      (ticket) =>
        ticket.subject === "Account deletion request" &&
        !["resolved", "closed"].includes(ticket.status)
    );
    const now = Date.now();
    if (deletionTicket) {
      await ctx.db.patch(deletionTicket._id, {
        status: "closed",
        adminNote: "Cancelled by the account owner.",
        resolvedAt: now,
        updatedAt: now,
      });
    }
    await ctx.db.patch(user._id, { deletionRequestedAt: undefined, updatedAt: now });
    return { success: true };
  },
});
