import { v } from "convex/values";
import { mutation, query } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";

export const exportMyData = query({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    const user = await requireAuthUser(ctx);
    const profiles = await ctx.db
      .query("freelancerProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .take(20);

    const [clientOrders, freelancerOrders, projects, jobs, applications, quoteRequests, reports, tickets, saved, portfolio, experience, education, certifications, reviewsGiven, reviewsReceived] =
      await Promise.all([
        ctx.db.query("orders").withIndex("by_client", (q) => q.eq("clientId", user._id)).order("desc").take(250),
        Promise.all(profiles.map(profile => ctx.db.query("orders").withIndex("by_freelancer", (q) => q.eq("freelancerId", profile._id)).order("desc").take(250))).then(groups => groups.flat()),
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
        freelancerProfile: profiles[0] ?? null,
        providerProfiles: profiles,
        partialExport: true,
        fullExportAvailableVia: "marketplace/accountPrivacy:exportSection",
        online: { projects, orders: [...clientOrders, ...freelancerOrders], reviewsAuthored: reviewsGiven, reviewsReceived: reviewsReceived.filter(review => review.isPublic === true || review.reviewerId === user._id) },
        local: { quoteRequests },
        jobs: { jobs, applications },
        communication: { conversations, messages: messageGroups.flat() },
        profileData: { portfolio, experience, education, certifications },
        accountActivity: { savedItems: saved, reports, supportTickets: tickets },
      },
      (key, value) => ["adminNote", "employerNote", "assignedTo", "reviewedBy", "passwordHash", "stackAuthId", "autoReleaseJobId"].includes(key) ? undefined : value,
      2
    );
  },
});

const userSections = {
  providerProfiles: ["freelancerProfiles", "by_userId", "userId"],
  clientOrders: ["orders", "by_client", "clientId"],
  clientAppointments: ["localAppointments", "by_client", "clientId"],
  projects: ["projects", "by_client", "clientId"],
  jobs: ["jobs", "by_client", "clientId"],
  applications: ["jobApplications", "by_candidate", "candidateId"],
  quoteRequests: ["quoteRequests", "by_client", "clientId"],
  reports: ["moderationReports", "by_reporter", "reporterId"],
  supportTickets: ["supportTickets", "by_user", "userId"],
  savedItems: ["savedItems", "by_user", "userId"],
  portfolio: ["portfolioProjects", "by_user", "userId"],
  experience: ["workExperience", "by_user", "userId"],
  education: ["education", "by_user", "userId"],
  certifications: ["userCertifications", "by_user", "userId"],
  reviewsGiven: ["marketplaceReviews", "by_reviewer", "reviewerId"],
  reviewsReceived: ["marketplaceReviews", "by_reviewee", "revieweeId"],
  notifications: ["notifications", "by_user", "userId"],
  notificationSettings: ["userNotificationSettings", "by_user", "userId"],
  fileAssets: ["fileAssets", "by_owner", "ownerId"],
  creditTransactions: ["creditTransactions", "by_freelancer", "freelancerId"],
  rewardTransactions: ["rewardTransactions", "by_user", "userId"],
  feedback: ["feedback", "by_user", "userId"],
  companyVerificationRequests: ["companyVerificationRequests", "by_user", "userId"],
  participant1Conversations: ["conversations", "by_participant1", "participant1"],
  participant2Conversations: ["conversations", "by_participant2", "participant2"],
} as const;
const providerSections = {
  sellerOrders: ["orders", "by_freelancer", "freelancerId"],
  bids: ["bids", "by_freelancer", "freelancerId"],
  quotes: ["quotes", "by_freelancer", "freelancerId"],
  leadClaims: ["leadClaims", "by_freelancer", "freelancerId"],
  localAppointments: ["localAppointments", "by_professional", "professionalId"],
  services: ["gigs", "by_freelancer", "freelancerId"],
} as const;

/** Download all pages client-side, without one query exceeding database limits. */
export const exportSection = query({
  args: { section: v.string(), cursor: v.optional(v.union(v.string(), v.null())), scopeId: v.optional(v.string()) },
  returns: v.object({ section: v.string(), itemsJson: v.string(), continueCursor: v.union(v.string(), v.null()), isDone: v.boolean(), nextSections: v.array(v.object({ section: v.string(), scopeId: v.string() })) }),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    if (args.section === "account") {
      const account = { ...user };
      delete account.passwordHash;
      delete account.stackAuthId;
      return { section: args.section, itemsJson: JSON.stringify([account]), continueCursor: null, isDone: true, nextSections: [] };
    }
    let definition: readonly string[] = Object.prototype.hasOwnProperty.call(userSections, args.section) ? userSections[args.section] : null;
    let ownerId: string = user._id;
    if (Object.prototype.hasOwnProperty.call(providerSections, args.section)) {
      const id = args.scopeId ? ctx.db.normalizeId("freelancerProfiles", args.scopeId) : null;
      const profile = id ? await ctx.db.get(id) : null;
      if (!profile || profile.userId !== user._id || profile.tenantId !== user.tenantId) throw new Error("Unauthorized export scope.");
      definition = providerSections[args.section];
      ownerId = profile._id;
    }
    if (args.section === "messages") {
      const id = args.scopeId ? ctx.db.normalizeId("conversations", args.scopeId) : null;
      const conversation = id ? await ctx.db.get(id) : null;
      if (!conversation || (conversation.participant1 !== user._id && conversation.participant2 !== user._id) || conversation.tenantId !== user.tenantId) throw new Error("Unauthorized export scope.");
      definition = ["messages", "by_conversation", "conversationId"];
      ownerId = conversation._id;
    }
    if (["deliverables", "orderMilestones", "orderTransactions", "disputes"].includes(args.section)) {
      const id = args.scopeId ? ctx.db.normalizeId("orders", args.scopeId) : null;
      const order = id ? await ctx.db.get(id) : null;
      const profile = order?.freelancerId ? await ctx.db.get(order.freelancerId) : null;
      if (!order || (order.clientId !== user._id && profile?.userId !== user._id) || order.tenantId !== user.tenantId) throw new Error("Unauthorized export scope.");
      const tables = { deliverables: "orderDeliverables", orderMilestones: "orderMilestones", orderTransactions: "transactions", disputes: "disputes" };
      definition = [tables[args.section], "by_order", "orderId"];
      ownerId = order._id;
    }
    if (["servicePackages", "serviceImages"].includes(args.section)) {
      const id = args.scopeId ? ctx.db.normalizeId("gigs", args.scopeId) : null;
      const gig = id ? await ctx.db.get(id) : null;
      const profile = gig ? await ctx.db.get(gig.freelancerId) : null;
      if (!gig || profile?.userId !== user._id || gig.tenantId !== user.tenantId) throw new Error("Unauthorized export scope.");
      definition = [args.section === "servicePackages" ? "gigPackages" : "gigImages", "by_gig", "gigId"];
      ownerId = gig._id;
    }
    if (!definition) throw new Error("Unknown export section.");
    // Table/index/field names come only from this fixed allowlist, never input.
    const [table, index, field] = definition;
    const page = await (ctx.db as any).query(table).withIndex(index, (q) => q.eq(field, ownerId)).order("asc").paginate({ numItems: 100, cursor: args.cursor ?? null });
    const nextSections: { section: string; scopeId: string }[] = [];
    for (const row of page.page) {
      if (args.section === "providerProfiles") for (const section of Object.keys(providerSections)) nextSections.push({ section, scopeId: row._id });
      if (["participant1Conversations", "participant2Conversations"].includes(args.section)) nextSections.push({ section: "messages", scopeId: row._id });
      if (["clientOrders", "sellerOrders"].includes(args.section)) for (const section of ["deliverables", "orderMilestones", "orderTransactions", "disputes"]) nextSections.push({ section, scopeId: row._id });
      if (args.section === "services") for (const section of ["servicePackages", "serviceImages"]) nextSections.push({ section, scopeId: row._id });
    }
    const items = page.page.filter(row => args.section !== "reviewsReceived" || row.isPublic === true || row.reviewerId === user._id).map(row => {
      const safe = { ...row };
      // Internal staff notes are separate from the user's submitted data.
      for (const field of ["adminNote", "employerNote", "assignedTo", "reviewedBy", "passwordHash", "stackAuthId", "autoReleaseJobId"]) delete safe[field];
      return safe;
    });
    return { section: args.section, itemsJson: JSON.stringify(items), continueCursor: page.isDone ? null : page.continueCursor, isDone: page.isDone, nextSections };
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
