import type { Doc, Id } from "../_generated/dataModel";
import type { MutationCtx } from "../_generated/server";
type ConversationContextInput = Infer<typeof _>;
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
// Reconciled with the existing development deployment (2026-09-07).
import { query } from "../_generated/server";
import { mutation } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";
import { requireOwner } from "../lib/authHelpers";
import { requireMarketplaceContext } from "../lib/authHelpers";
import type { Infer } from "convex/values";
import { conversationContextTypeValidator } from "../lib/marketplaceState";
import { v } from "convex/values";
var _ = v.union(v.object({
  type: v.literal("profile_inquiry"),
  freelancerProfileId: v.id("freelancerProfiles")
}), v.object({
  type: v.literal("gig_inquiry"),
  gigId: v.id("gigs")
}), v.object({
  type: v.literal("project_bid"),
  bidId: v.id("bids")
}), v.object({
  type: v.literal("order"),
  orderId: v.id("orders")
}), v.object({
  type: v.literal("local_quote"),
  quoteId: v.id("quotes")
}), v.object({
  type: v.literal("local_appointment"),
  appointmentId: v.id("localAppointments")
}), v.object({
  type: v.literal("job_application"),
  applicationId: v.id("jobApplications")
}));
function canonicalParticipants(first: Id<"users">, second: Id<"users">): [Id<"users">, Id<"users">] {
  return first < second ? [first, second] : [second, first];
}
function canStartProfileInquiry(user: Doc<"users">) {
  return (user.accountRoles ?? []).includes("client");
}
async function resolveContext(ctx: MutationCtx, caller: Doc<"users">, context: ConversationContextInput): Promise<ResolvedContext> {
  if (context.type === "profile_inquiry") {
    let t = await ctx.db.get(context.freelancerProfileId);
    if (!t || t.status !== "active") throw new Error("This professional is not available.");
    let r: "local" | "online" = t.providerRole === "local_professional" || !t.providerRole && t.workType === "local" ? "local" : "online";
    if (requireMarketplaceContext(caller, "client", r, "contacting a professional"), t.userId === caller._id) throw new Error("You cannot start a conversation with yourself.");
    if (t.contactPermission === "nobody") throw new Error("This professional is not accepting new enquiries.");
    if (t.contactPermission === "clients_only" && !canStartProfileInquiry(caller)) throw new Error("Only client accounts can contact this professional.");
    return {
      type: context.type,
      title: `Profile enquiry \xB7 ${t.displayName}`,
      href: `/online/freelancer/${t.slug ?? t._id}`,
      otherUserId: t.userId,
      freelancerProfileId: t._id
    };
  }
  if (context.type === "gig_inquiry") {
    requireMarketplaceContext(caller, "client", "online", "contacting a professional");
    let t = await ctx.db.get(context.gigId);
    if (!t || t.status !== "active") throw new Error("This service is not available.");
    let r = await ctx.db.get(t.freelancerId);
    if (!r || r.status !== "active") throw new Error("This professional is not available.");
    if (r.userId === caller._id) throw new Error("You cannot enquire about your own service.");
    return {
      type: context.type,
      title: t.title,
      href: `/online/service/${t._id}`,
      otherUserId: r.userId,
      freelancerProfileId: r._id,
      gigId: t._id
    };
  }
  if (context.type === "project_bid") {
    let t = await ctx.db.get(context.bidId);
    if (!t || !["pending", "accepted"].includes(t.status)) throw new Error("This proposal is not available for messaging.");
    let [r, p] = await Promise.all([ctx.db.get(t.projectId), ctx.db.get(t.freelancerId)]);
    if (!r || !p) throw new Error("Proposal context not found.");
    let l = caller._id === r.clientId,
      I = caller._id === p.userId;
    if (!l && !I) throw new Error("Unauthorized.");
    return {
      type: context.type,
      title: r.title,
      href: `/online/project/${r._id}`,
      otherUserId: l ? p.userId : r.clientId,
      projectId: r._id,
      bidId: t._id,
      freelancerProfileId: p._id
    };
  }
  if (context.type === "order") {
    let t = await ctx.db.get(context.orderId);
    if (!t || !t.freelancerId) throw new Error("Order not found.");
    let r = await ctx.db.get(t.freelancerId);
    if (!r) throw new Error("Order professional not found.");
    let p = caller._id === t.clientId,
      l = caller._id === r.userId;
    if (!p && !l) throw new Error("Unauthorized.");
    return {
      type: context.type,
      title: t.title,
      href: `/orders/${t._id}`,
      otherUserId: p ? r.userId : t.clientId,
      orderId: t._id,
      projectId: t.projectId,
      freelancerProfileId: r._id,
      gigId: t.gigId,
      quoteId: t.quoteId
    };
  }
  if (context.type === "local_quote") {
    let t = await ctx.db.get(context.quoteId);
    if (!t || !["pending", "accepted"].includes(t.status)) throw new Error("This quote is not available for messaging.");
    let [r, p] = await Promise.all([ctx.db.get(t.quoteRequestId), ctx.db.get(t.freelancerId)]);
    if (!r || !p) throw new Error("Quote context not found.");
    let l = caller._id === r.clientId,
      I = caller._id === p.userId;
    if (!l && !I) throw new Error("Unauthorized.");
    return {
      type: context.type,
      title: r.title,
      href: `/local/quote-request/${r._id}`,
      otherUserId: l ? p.userId : r.clientId,
      quoteId: t._id,
      freelancerProfileId: p._id
    };
  }
  if (context.type === "local_appointment") {
    let t = await ctx.db.get(context.appointmentId);
    if (!t) throw new Error("Appointment not found.");
    let r = await ctx.db.get(t.professionalId);
    if (!r) throw new Error("Appointment professional not found.");
    let p = caller._id === t.clientId,
      l = caller._id === r.userId;
    if (!p && !l) throw new Error("Unauthorized.");
    let I = await ctx.db.get(t.orderId);
    return {
      type: context.type,
      title: I?.title ?? "Local appointment",
      href: `/orders/${t.orderId}`,
      otherUserId: p ? r.userId : t.clientId,
      orderId: t.orderId,
      quoteId: t.quoteId,
      freelancerProfileId: r._id,
      localAppointmentId: t._id
    };
  }
  let n = await ctx.db.get(context.applicationId);
  if (!n) throw new Error("Application not found.");
  if (!["screening", "interview", "offer", "hired"].includes(n.status)) throw new Error("Messaging opens when the employer starts screening.");
  let a = await ctx.db.get(n.jobId);
  if (!a) throw new Error("Job not found.");
  let s = caller._id === n.candidateId,
    c = caller._id === a.clientId;
  if (!s && !c) throw new Error("Unauthorized.");
  return {
    type: context.type,
    title: a.title,
    href: `/jobs/job/${a._id}`,
    otherUserId: s ? a.clientId : n.candidateId,
    jobApplicationId: n._id
  };
}
async function findExisting(ctx: MutationCtx, resolved: ResolvedContext, participant1: Id<"users">, participant2: Id<"users">) {
  return resolved.orderId ? await ctx.db.query("conversations").withIndex("by_order", a => a.eq("orderId", resolved.orderId)).first() : resolved.bidId ? await ctx.db.query("conversations").withIndex("by_bid", a => a.eq("bidId", resolved.bidId)).first() : resolved.quoteId ? await ctx.db.query("conversations").withIndex("by_quote", a => a.eq("quoteId", resolved.quoteId)).first() : resolved.localAppointmentId ? await ctx.db.query("conversations").withIndex("by_localAppointment", a => a.eq("localAppointmentId", resolved.localAppointmentId)).first() : resolved.jobApplicationId ? await ctx.db.query("conversations").withIndex("by_jobApplication", a => a.eq("jobApplicationId", resolved.jobApplicationId)).first() : resolved.gigId ? await ctx.db.query("conversations").withIndex("by_gig_and_participants", a => a.eq("gigId", resolved.gigId).eq("participant1", participant1).eq("participant2", participant2)).first() : resolved.freelancerProfileId ? await ctx.db.query("conversations").withIndex("by_freelancerProfile_and_participants", a => a.eq("freelancerProfileId", resolved.freelancerProfileId).eq("participant1", participant1).eq("participant2", participant2)).first() : null;
}
function contextSummary(conversation: Doc<"conversations">) {
  let i = conversation.contextType ?? (conversation.orderId ? "order" : conversation.projectId ? "project_bid" : null),
    o = conversation.contextHref ?? (conversation.orderId ? `/orders/${conversation.orderId}` : conversation.projectId ? `/online/project/${conversation.projectId}` : null);
  return {
    type: i,
    title: conversation.contextTitle ?? "Skilllinkup conversation",
    href: o
  };
}
var list = query({
    args: {
      userId: v.id("users")
    },
    returns: v.array(v.any()),
    handler: async (ctx, args) => {
      await requireOwner(ctx, args.userId);
      let [o, n] = await Promise.all([ctx.db.query("conversations").withIndex("by_participant1_activity", r => r.eq("participant1", args.userId)).order("desc").take(60), ctx.db.query("conversations").withIndex("by_participant2_activity", r => r.eq("participant2", args.userId)).order("desc").take(60)]),
        a = [...o, ...n].sort((r, p) => (p.lastMessageAt ?? p.createdAt) - (r.lastMessageAt ?? r.createdAt)).slice(0, 100),
        s = [...new Set(a.map(r => r.participant1 === args.userId ? r.participant2 : r.participant1))],
        c = await Promise.all(s.map(r => ctx.db.get(r))),
        t = new Map(c.filter(r => r !== null).map(r => [r._id, r]));
      return a.map(r => {
        let p = r.participant1 === args.userId ? r.participant2 : r.participant1,
          l = t.get(p) ?? null;
        return {
          ...r,
          otherParticipant: l ? {
            _id: l._id,
            name: l.name,
            image: l.image ?? l.avatar ?? null
          } : null,
          unreadCount: r.participant1 === args.userId ? r.unreadCount1 ?? 0 : r.unreadCount2 ?? 0,
          context: contextSummary(r)
        };
      });
    }
  }),
  openForContext = mutation({
    args: {
      context: _
    },
    returns: v.id("conversations"),
    handler: async (ctx, args) => {
      let o = await requireAuthUser(ctx),
        n = await resolveContext(ctx, o, args.context),
        [a, s] = canonicalParticipants(o._id, n.otherUserId),
        c = await findExisting(ctx, n, a, s);
      if (c) {
        if (!(c.participant1 === a && c.participant2 === s || c.participant1 === s && c.participant2 === a)) throw new Error("Conversation participants do not match this context.");
        return c._id;
      }
      let t = Date.now();
      return await ctx.db.insert("conversations", {
        tenantId: o.tenantId,
        contextType: n.type,
        contextTitle: n.title,
        contextHref: n.href,
        orderId: n.orderId,
        projectId: n.projectId,
        bidId: n.bidId,
        freelancerProfileId: n.freelancerProfileId,
        gigId: n.gigId,
        quoteId: n.quoteId,
        localAppointmentId: n.localAppointmentId,
        jobApplicationId: n.jobApplicationId,
        participant1: a,
        participant2: s,
        unreadCount1: 0,
        unreadCount2: 0,
        status: "active",
        createdAt: t,
        updatedAt: t
      });
    }
  }),
  getById = query({
    args: {
      conversationId: v.id("conversations")
    },
    returns: v.union(v.any(), v.null()),
    handler: async (ctx, args) => {
      let o = await requireAuthUser(ctx),
        n = await ctx.db.get(args.conversationId);
      if (!n) return null;
      if (n.participant1 !== o._id && n.participant2 !== o._id) throw new Error("Unauthorized.");
      let [a, s] = await Promise.all([ctx.db.get(n.participant1), ctx.db.get(n.participant2)]);
      return {
        ...n,
        context: contextSummary(n),
        participant1User: a ? {
          _id: a._id,
          name: a.name,
          image: a.image ?? a.avatar ?? null
        } : null,
        participant2User: s ? {
          _id: s._id,
          name: s.name,
          image: s.image ?? s.avatar ?? null
        } : null
      };
    }
  }),
  getByOrder = query({
    args: {
      orderId: v.id("orders")
    },
    returns: v.union(v.any(), v.null()),
    handler: async (ctx, args) => {
      let o = await requireAuthUser(ctx),
        n = await ctx.db.query("conversations").withIndex("by_order", c => c.eq("orderId", args.orderId)).first();
      if (!n) return null;
      if (n.participant1 !== o._id && n.participant2 !== o._id) throw new Error("Unauthorized.");
      let a = n.participant1 === o._id ? n.participant2 : n.participant1,
        s = await ctx.db.get(a);
      return {
        ...n,
        context: contextSummary(n),
        otherParticipant: s ? {
          _id: s._id,
          name: s.name,
          image: s.image ?? s.avatar ?? null
        } : null
      };
    }
  });
export { getById, getByOrder, list, openForContext };
