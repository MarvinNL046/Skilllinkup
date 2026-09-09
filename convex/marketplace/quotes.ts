// Reconciled with the existing development deployment (2026-09-07).
import { publicLocalQuoteRequestValidator } from "../lib/publicData";
import { participantLocalQuoteRequestValidator } from "../lib/publicData";
import { toPublicLocalQuoteRequest } from "../lib/publicData";
import { toParticipantLocalQuoteRequest } from "../lib/publicData";
import { rateLimiter } from "../lib/rateLimits";
import { notifyUser } from "../lib/notifications";
import { query } from "../_generated/server";
import { mutation } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";
import { requireMarketplaceContext } from "../lib/authHelpers";
import { getProviderProfile } from "../lib/authHelpers";
import { quoteRequestTransitions } from "../lib/marketplaceState";
import { quoteTransitions } from "../lib/marketplaceState";
import { assertTransition } from "../lib/marketplaceState";
import { v } from "convex/values";
function betaLocalOrderNumber() {
  return `LOCAL-BETA-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}
var listRequests = query({
    args: {
      limit: v.optional(v.number())
    },
    returns: v.array(publicLocalQuoteRequestValidator),
    handler: async (ctx, args) => {
      let i = Math.min(Math.max(args.limit ?? 20, 1), 100),
        r = await ctx.db.query("quoteRequests").withIndex("by_status", n => n.eq("status", "open")).order("desc").take(i);
      return await Promise.all(r.map(async n => {
        let u = await ctx.db.get(n.categoryId);
        return toPublicLocalQuoteRequest(n, u?.name ?? null);
      }));
    }
  }),
  getRequestById = query({
    args: {
      requestId: v.id("quoteRequests")
    },
    returns: v.union(publicLocalQuoteRequestValidator, v.null()),
    handler: async (ctx, args) => {
      let i = await ctx.db.get(args.requestId);
      if (!i || i.status !== "open") return null;
      let r = await ctx.db.get(i.categoryId);
      return toPublicLocalQuoteRequest(i, r?.name ?? null);
    }
  }),
  getParticipantRequestById = query({
    args: {
      requestId: v.id("quoteRequests")
    },
    returns: v.union(participantLocalQuoteRequestValidator, v.null()),
    handler: async (ctx, args) => {
      let i = await requireAuthUser(ctx),
        r = await ctx.db.get(args.requestId);
      if (!r) return null;
      let n = await getProviderProfile(ctx, i._id, "local_professional"),
        u = await ctx.db.query("leadClaims").withIndex("by_quoteRequest", l => l.eq("quoteRequestId", args.requestId)).take(10),
        a = i._id === r.clientId,
        m = !!n && u.some(l => l.freelancerId === n._id);
      if (!a && !m) return null;
      let [d, p] = await Promise.all([ctx.db.get(r.categoryId), ctx.db.get(r.clientId)]),
        s = a ? await ctx.db.query("quotes").withIndex("by_quoteRequest", l => l.eq("quoteRequestId", args.requestId)).take(100).then(l => Promise.all(l.map(async c => {
          let q = await ctx.db.get(c.freelancerId),
            v = q ? await ctx.db.get(q.userId) : null;
          return {
            quote: c,
            freelancerProfile: q ? {
              _id: q._id,
              displayName: q.displayName,
              tagline: q.tagline ?? null,
              avatarUrl: q.avatarUrl ?? v?.image ?? v?.avatar ?? null,
              ratingAverage: q.ratingAverage ?? 0,
              ratingCount: q.ratingCount ?? 0,
              isVerified: q.isVerified ?? !1
            } : null
          };
        }))) : [],
        f = n ? await ctx.db.query("quotes").withIndex("by_quoteRequest_freelancer", l => l.eq("quoteRequestId", args.requestId).eq("freelancerId", n._id)).unique() : null;
      return toParticipantLocalQuoteRequest(r, {
        categoryName: d?.name ?? null,
        clientName: p?.name ?? null,
        isOwner: a,
        quotes: s,
        myQuote: f
      });
    }
  }),
  createRequest = mutation({
    args: {
      categoryId: v.id("marketplaceCategories"),
      title: v.string(),
      description: v.string(),
      locationCity: v.optional(v.string()),
      locationPostcode: v.optional(v.string()),
      locationCountry: v.optional(v.string()),
      latitude: v.optional(v.number()),
      longitude: v.optional(v.number()),
      photos: v.optional(v.array(v.any())),
      budgetIndication: v.optional(v.string()),
      preferredDate: v.optional(v.number())
    },
    returns: v.id("quoteRequests"),
    handler: async (ctx, args) => {
      let i = await requireAuthUser(ctx);
      requireMarketplaceContext(i, "client", "local", "requesting a local quote"), await rateLimiter.limit(ctx, "localRequest", {
        key: i._id,
        throws: !0
      });
      let r = args.title.trim(),
        n = args.description.trim();
      if (r.length < 8 || r.length > 120) throw new Error("Use a title between 8 and 120 characters.");
      if (n.length < 40 || n.length > 5e3) throw new Error("Use a description between 40 and 5,000 characters.");
      let u = args.locationCity?.trim(),
        a = args.locationPostcode?.trim();
      if (!u && !a) throw new Error("Enter a city or postcode for the local request.");
      if (u && (u.length < 2 || u.length > 100)) throw new Error("Use a city or region between 2 and 100 characters.");
      if (a && a.length > 20) throw new Error("Postcode must be at most 20 characters.");
      let m = args.locationCountry?.trim() || "Netherlands";
      if (!/^(netherlands|nederland|nl)$/i.test(m)) throw new Error("Local private-beta requests are currently limited to the Netherlands.");
      if (args.latitude !== void 0 && (!Number.isFinite(args.latitude) || args.latitude < -90 || args.latitude > 90)) throw new Error("Latitude must be between -90 and 90.");
      if (args.longitude !== void 0 && (!Number.isFinite(args.longitude) || args.longitude < -180 || args.longitude > 180)) throw new Error("Longitude must be between -180 and 180.");
      let d = await ctx.db.get(args.categoryId);
      if (!d || d.tenantId !== i.tenantId) throw new Error("Local service category not found.");
      if (d.serviceType && d.serviceType !== "local" && d.serviceType !== "hybrid") throw new Error("Choose a Local service category.");
      let p = Date.now();
      return await ctx.db.insert("quoteRequests", {
        tenantId: i.tenantId,
        clientId: i._id,
        categoryId: args.categoryId,
        title: r,
        description: n,
        locationCity: u,
        locationPostcode: a,
        locationCountry: "Netherlands",
        latitude: args.latitude,
        longitude: args.longitude,
        photos: args.photos,
        budgetIndication: args.budgetIndication,
        preferredDate: args.preferredDate,
        status: "open",
        quoteCount: 0,
        createdAt: p,
        updatedAt: p
      });
    }
  }),
  submitQuote = mutation({
    args: {
      quoteRequestId: v.id("quoteRequests"),
      amount: v.number(),
      currency: v.optional(v.string()),
      description: v.string(),
      estimatedDays: v.optional(v.number()),
      validUntil: v.optional(v.number())
    },
    handler: async (ctx, args) => {
      let i = await requireAuthUser(ctx);
      requireMarketplaceContext(i, "local_professional", "local", "submitting a quote"), await rateLimiter.limit(ctx, "localQuote", {
        key: i._id,
        throws: !0
      });
      let r = await getProviderProfile(ctx, i._id, "local_professional");
      if (!r) throw new Error("Freelancer profile not found. Please create a profile first.");
      let n = await ctx.db.get(args.quoteRequestId);
      if (!n) throw new Error("Quote request not found.");
      if (n.status !== "open") throw new Error("This quote request is no longer accepting quotes.");
      if (n.clientId === i._id) throw new Error("You cannot submit a quote to your own request.");
      if (!Number.isFinite(args.amount) || args.amount <= 0 || args.amount > 1e6) throw new Error("Enter a valid quote amount.");
      let u = args.description.trim();
      if (u.length < 20 || u.length > 5e3) throw new Error("Use a quote description between 20 and 5,000 characters.");
      if (await ctx.db.query("quotes").withIndex("by_quoteRequest_freelancer", s => s.eq("quoteRequestId", args.quoteRequestId).eq("freelancerId", r._id)).unique()) throw new Error("You already submitted a quote for this request.");
      if (!(await ctx.db.query("leadClaims").withIndex("by_quoteRequest", s => s.eq("quoteRequestId", args.quoteRequestId)).take(10).then(s => s.find(f => f.freelancerId === r._id)))) throw new Error("Claim this lead before submitting a quote.");
      let d = Date.now(),
        p = await ctx.db.insert("quotes", {
          quoteRequestId: args.quoteRequestId,
          freelancerId: r._id,
          amount: args.amount,
          currency: args.currency,
          description: u,
          estimatedDays: args.estimatedDays,
          validUntil: args.validUntil,
          status: "pending",
          createdAt: d,
          updatedAt: d
        });
      return await ctx.db.patch(args.quoteRequestId, {
        quoteCount: (n.quoteCount ?? 0) + 1,
        updatedAt: d
      }), await notifyUser(ctx, {
        userId: n.clientId,
        type: "local_quote_received",
        title: "New local quote received",
        body: `${r.displayName} sent a quote for ${n.title}.`,
        link: `/local/quote-request/${n._id}`,
        metadata: {
          quoteRequestId: n._id,
          quoteId: p
        }
      }), p;
    }
  }),
  acceptQuote = mutation({
    args: {
      quoteId: v.id("quotes")
    },
    handler: async (ctx, args) => {
      let i = await requireAuthUser(ctx);
      requireMarketplaceContext(i, "client", "local", "accepting a local quote");
      let r = await ctx.db.get(args.quoteId);
      if (!r) throw new Error("Quote not found.");
      let n = await ctx.db.get(r.quoteRequestId);
      if (!n) throw new Error("Quote request not found.");
      if (n.clientId !== i._id) throw new Error("Only the client who created this request can accept quotes.");
      if (!["open", "matched"].includes(n.status)) throw new Error("This quote request can no longer be awarded.");
      assertTransition(quoteTransitions, r.status, "accepted"), assertTransition(quoteRequestTransitions, n.status, "accepted");
      let u = await ctx.db.query("orders").withIndex("by_quote", c => c.eq("quoteId", r._id)).unique();
      if (u) {
        let c = await ctx.db.query("localAppointments").withIndex("by_order", q => q.eq("orderId", u._id)).unique();
        return {
          success: !0,
          quoteId: r._id,
          orderId: u._id,
          appointmentId: c?._id ?? null
        };
      }
      let a = await ctx.db.get(r.freelancerId);
      if (!a) throw new Error("Local professional profile not found.");
      let m = await ctx.db.get(a.userId);
      if (!m) throw new Error("Local professional account not found.");
      let d = Date.now();
      await ctx.db.patch(args.quoteId, {
        status: "accepted",
        updatedAt: d
      }), await ctx.db.patch(r.quoteRequestId, {
        status: "accepted",
        updatedAt: d
      });
      let p = await ctx.db.query("quotes").withIndex("by_quoteRequest_status", c => c.eq("quoteRequestId", r.quoteRequestId).eq("status", "pending")).take(100);
      await Promise.all(p.filter(c => c._id !== r._id).map(c => ctx.db.patch(c._id, {
        status: "rejected",
        updatedAt: d
      })));
      let s = await ctx.db.insert("orders", {
          tenantId: n.tenantId,
          orderNumber: betaLocalOrderNumber(),
          orderType: "local_quote",
          clientId: n.clientId,
          freelancerId: r.freelancerId,
          quoteRequestId: n._id,
          quoteId: r._id,
          title: n.title,
          description: r.description,
          amount: r.amount,
          platformFee: 0,
          freelancerEarnings: r.amount,
          currency: r.currency ?? "EUR",
          revisionsUsed: 0,
          status: "active",
          escrowStatus: "beta_no_payment",
          createdAt: d,
          updatedAt: d
        }),
        f = await ctx.db.insert("conversations", {
          tenantId: n.tenantId,
          contextType: "local_appointment",
          contextTitle: n.title,
          contextHref: `/orders/${s}`,
          orderId: s,
          freelancerProfileId: r.freelancerId,
          quoteId: r._id,
          participant1: n.clientId,
          participant2: m._id,
          unreadCount1: 0,
          unreadCount2: 0,
          status: "active",
          createdAt: d,
          updatedAt: d
        }),
        l = await ctx.db.insert("localAppointments", {
          tenantId: n.tenantId,
          quoteRequestId: n._id,
          quoteId: r._id,
          orderId: s,
          clientId: n.clientId,
          professionalId: r.freelancerId,
          scheduledStart: n.preferredDate,
          timezone: "Europe/Amsterdam",
          locationAddress: [n.locationPostcode, n.locationCity, n.locationCountry].filter(Boolean).join(", ") || void 0,
          status: "requested",
          createdAt: d,
          updatedAt: d
        });
      return await ctx.db.patch(f, {
        localAppointmentId: l
      }), await notifyUser(ctx, {
        userId: m._id,
        type: "local_quote_accepted",
        title: "Your local quote was accepted",
        body: `${n.title} is ready in your private workspace.`,
        link: `/orders/${s}`,
        metadata: {
          orderId: s,
          appointmentId: l
        }
      }), {
        success: !0,
        quoteId: args.quoteId,
        orderId: s,
        appointmentId: l
      };
    }
  }),
  listMyRequests = query({
    args: {},
    returns: v.array(v.object({
      _id: v.id("quoteRequests"),
      title: v.string(),
      status: v.string(),
      categoryName: v.union(v.string(), v.null()),
      locationCity: v.union(v.string(), v.null()),
      budgetIndication: v.union(v.string(), v.null()),
      preferredDate: v.union(v.number(), v.null()),
      quoteCount: v.number(),
      createdAt: v.number(),
      updatedAt: v.number()
    })),
    handler: async ctx => {
      let o = await requireAuthUser(ctx);
      requireMarketplaceContext(o, "client", "local", "updating a local request");
      let i = await ctx.db.query("quoteRequests").withIndex("by_client", a => a.eq("clientId", o._id)).order("desc").take(100),
        r = [...new Set(i.map(a => a.categoryId))],
        n = await Promise.all(r.map(a => ctx.db.get(a))),
        u = new Map(n.filter(Boolean).map(a => [a._id, a.name]));
      return i.map(a => ({
        _id: a._id,
        title: a.title,
        status: a.status,
        categoryName: u.get(a.categoryId) ?? null,
        locationCity: a.locationCity ?? null,
        budgetIndication: a.budgetIndication ?? null,
        preferredDate: a.preferredDate ?? null,
        quoteCount: a.quoteCount ?? 0,
        createdAt: a.createdAt,
        updatedAt: a.updatedAt
      }));
    }
  });
export { acceptQuote, createRequest, getParticipantRequestById, getRequestById, listMyRequests, listRequests, submitQuote };
