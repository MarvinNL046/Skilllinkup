// Reconciled with the existing development deployment (2026-09-07).
import type { Id } from "../_generated/dataModel";
import { assertOnlineWorkType } from "../lib/onlineMarketplace";
import { assertActiveOnlineProviderProfile } from "../lib/onlineMarketplace";
import { assertOnlineProject } from "../lib/onlineMarketplace";
import { assertOnlineMarketplaceCategory } from "../lib/onlineMarketplace";
import { rateLimiter } from "../lib/rateLimits";
import { notifyUser } from "../lib/notifications";
import { internal } from "../_generated/api";
import { query } from "../_generated/server";
import { mutation } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";
import { requireOwner } from "../lib/authHelpers";
import { requireMarketplaceContext } from "../lib/authHelpers";
import { getProviderProfile } from "../lib/authHelpers";
import { projectTransitions } from "../lib/marketplaceState";
import { bidTransitions } from "../lib/marketplaceState";
import { assertTransition } from "../lib/marketplaceState";
import { projectStatusValidator } from "../lib/marketplaceState";
import { bidStatusValidator } from "../lib/marketplaceState";
import { v } from "convex/values";
import { assertValidProjectFields } from "../../src/lib/projectValidation.mjs";
var h = v.union(v.string(), v.null()),
  N = {
    _id: v.id("projects"),
    _creationTime: v.number(),
    clientId: v.id("users"),
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    categoryId: v.optional(v.id("marketplaceCategories")),
    requiredSkills: v.optional(v.array(v.string())),
    budgetMin: v.optional(v.number()),
    budgetMax: v.optional(v.number()),
    currency: v.optional(v.string()),
    deadline: v.optional(v.number()),
    workType: v.optional(v.string()),
    locationCity: v.optional(v.string()),
    locationCountry: v.optional(v.string()),
    bidCount: v.number(),
    views: v.optional(v.number()),
    status: projectStatusValidator,
    locale: v.string(),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number()
  },
  O = v.object({
    ...N,
    clientName: h,
    clientAvatar: h,
    clientVerified: v.boolean(),
    categoryName: h
  }),
  z = v.object({
    ...N,
    categoryName: h
  }),
  R = v.object({
    ...N,
    selectedFreelancerId: v.optional(v.id("freelancerProfiles")),
    categoryName: h
  }),
  $ = {
    _id: v.id("bids"),
    _creationTime: v.number(),
    projectId: v.id("projects"),
    freelancerId: v.id("freelancerProfiles"),
    amount: v.number(),
    currency: v.optional(v.string()),
    deliveryDays: v.number(),
    pitch: v.string(),
    status: bidStatusValidator,
    createdAt: v.number(),
    updatedAt: v.number()
  },
  H = v.object({
    ...$,
    freelancerName: v.string(),
    freelancerAvatar: h,
    freelancerRating: v.number(),
    freelancerVerified: v.boolean()
  }),
  L = v.object({
    ...$,
    projectTitle: v.string(),
    projectSlug: v.string(),
    projectStatus: v.string(),
    projectCurrency: v.string()
  });
export function toProjectFields(t) {
  return {
    _id: t._id,
    _creationTime: t._creationTime,
    clientId: t.clientId,
    title: t.title,
    slug: t.slug,
    description: t.description,
    categoryId: t.categoryId,
    requiredSkills: t.requiredSkills,
    budgetMin: t.budgetMin,
    budgetMax: t.budgetMax,
    currency: t.currency,
    deadline: t.deadline,
    workType: t.workType,
    locationCity: t.locationCity,
    locationCountry: t.locationCountry,
    bidCount: t.bidCount ?? 0,
    views: t.views,
    status: t.status,
    locale: t.locale,
    publishedAt: t.publishedAt,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt
  };
}
function toBidFields(t) {
  return {
    _id: t._id,
    _creationTime: t._creationTime,
    projectId: t.projectId,
    freelancerId: t.freelancerId,
    amount: t.amount,
    currency: t.currency,
    deliveryDays: t.deliveryDays,
    pitch: t.pitch,
    status: t.status,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt
  };
}
function isOnlineProject(t) {
  return !t.workType || t.workType === "remote" || t.workType === "online";
}
function assertDirectCancellationAllowed(t) {
  if (t.status !== "cancelled" && (t.status === "in_progress" || t.selectedFreelancerId)) throw new Error("This project has an active order. Cancel or resolve the linked order instead.");
}
function betaOrderNumber() {
  return `BETA-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}
var getOpenCount = query({
    args: {},
    returns: v.number(),
    handler: async ctx => (await ctx.db.query("projects").withIndex("by_status", r => r.eq("status", "open")).take(1e4)).filter(isOnlineProject).length
  }),
  list = query({
    args: {
      locale: v.string(),
      limit: v.optional(v.number())
    },
    returns: v.array(O),
    handler: async (ctx, args) => {
      let r = Math.min(100, Math.max(1, args.limit ?? 20)),
        l = (await ctx.db.query("projects").withIndex("by_status_locale", a => a.eq("status", "open").eq("locale", args.locale)).order("desc").take(Math.min(r * 5, 500))).filter(isOnlineProject).slice(0, r),
        d = [...new Set(l.map(a => a.clientId).filter(Boolean))],
        s = [...new Set(l.map(a => a.categoryId).filter(Boolean))],
        [u, c] = await Promise.all([Promise.all(d.map(a => ctx.db.get(a))), Promise.all(s.map(a => ctx.db.get(a)))]),
        o = new Map(u.filter(Boolean).map(a => [a._id, a])),
        p = new Map(c.filter(Boolean).map(a => [a._id, a]));
      return l.map(a => {
        let y = o.get(a.clientId),
          A = a.categoryId ? p.get(a.categoryId) : null;
        return {
          ...toProjectFields(a),
          clientName: y?.name ?? null,
          clientAvatar: y?.avatar ?? y?.image ?? null,
          clientVerified: y?.emailVerified === !0,
          categoryName: A?.name ?? null,
          bidCount: a.bidCount ?? 0
        };
      });
    }
  }),
  getBySlug = query({
    args: {
      slug: v.string(),
      locale: v.string()
    },
    returns: v.union(v.null(), O),
    handler: async (ctx, args) => {
      let r = await ctx.db.query("projects").withIndex("by_slug_locale", d => d.eq("slug", args.slug).eq("locale", args.locale)).first();
      if (!r || r.status !== "open" || !isOnlineProject(r)) return null;
      let [i, l] = await Promise.all([ctx.db.get(r.clientId), r.categoryId ? ctx.db.get(r.categoryId) : Promise.resolve(null)]);
      return {
        ...toProjectFields(r),
        clientName: i?.name ?? null,
        clientAvatar: i?.avatar ?? i?.image ?? null,
        clientVerified: i?.emailVerified === !0,
        categoryName: l?.name ?? null,
        bidCount: r.bidCount ?? 0
      };
    }
  }),
  getById = query({
    args: {
      projectId: v.id("projects")
    },
    returns: v.union(v.null(), R),
    handler: async (ctx, args) => {
      let r = await ctx.db.get(args.projectId);
      if (!r) return null;
      await requireOwner(ctx, r.clientId);
      let i = r.categoryId ? await ctx.db.get(r.categoryId) : null;
      return {
        ...toProjectFields(r),
        selectedFreelancerId: r.selectedFreelancerId,
        categoryName: i?.name ?? null,
        bidCount: r.bidCount ?? 0
      };
    }
  }),
  getBids = query({
    args: {
      projectId: v.id("projects")
    },
    returns: v.array(H),
    handler: async (ctx, args) => {
      let r = await requireAuthUser(ctx),
        i = await ctx.db.get(args.projectId);
      if (!i) return [];
      if (i.clientId !== r._id) throw new Error("Unauthorized.");
      let l = await ctx.db.query("bids").withIndex("by_project", a => a.eq("projectId", args.projectId)).take(500),
        d = [...new Set(l.map(a => a.freelancerId).filter(Boolean))],
        s = await Promise.all(d.map(a => ctx.db.get(a))),
        u = new Map(s.filter(Boolean).map(a => [a._id, a])),
        c = [...new Set(s.filter(Boolean).map(a => a.userId).filter(Boolean))],
        o = await Promise.all(c.map(a => ctx.db.get(a))),
        p = new Map(o.filter(Boolean).map(a => [a._id, a])),
        b = l.map(a => {
          let y = u.get(a.freelancerId),
            A = y ? p.get(y.userId) : null;
          return {
            ...toBidFields(a),
            freelancerName: y?.displayName ?? A?.name ?? "Unknown",
            freelancerAvatar: y?.avatarUrl ?? A?.image ?? null,
            freelancerRating: y?.ratingAverage ?? 0,
            freelancerVerified: y?.isVerified ?? !1
          };
        });
      return b.sort((a, y) => a.status === "accepted" && y.status !== "accepted" ? -1 : a.status !== "accepted" && y.status === "accepted" ? 1 : (a.createdAt ?? 0) - (y.createdAt ?? 0)), b;
    }
  }),
  getPublicByClient = query({
    args: {
      clientId: v.id("users"),
      limit: v.optional(v.number())
    },
    returns: v.array(z),
    handler: async (ctx, args) => {
      let r = Math.max(1, Math.min(args.limit ?? 20, 100)),
        l = (await ctx.db.query("projects").withIndex("by_client", o => o.eq("clientId", args.clientId)).order("desc").take(r)).filter(o => o.status === "open" && isOnlineProject(o)),
        d = [...new Set(l.map(o => o.categoryId).filter(Boolean))],
        s = await Promise.all(d.map(o => ctx.db.get(o))),
        u = new Map(s.filter(Boolean).map(o => [o._id, o]));
      return l.map(o => {
        let p = o.categoryId ? u.get(o.categoryId) : null;
        return {
          ...toProjectFields(o),
          categoryName: p?.name ?? null,
          bidCount: o.bidCount ?? 0
        };
      });
    }
  }),
  getByClient = query({
    args: {
      clientId: v.id("users"),
      limit: v.optional(v.number())
    },
    returns: v.array(R),
    handler: async (ctx, args) => {
      await requireOwner(ctx, args.clientId);
      let r = Math.max(1, Math.min(args.limit ?? 50, 100)),
        i = await ctx.db.query("projects").withIndex("by_client", c => c.eq("clientId", args.clientId)).order("desc").take(r),
        l = [...new Set(i.map(c => c.categoryId).filter(Boolean))],
        d = await Promise.all(l.map(c => ctx.db.get(c))),
        s = new Map(d.filter(Boolean).map(c => [c._id, c]));
      return i.map(c => {
        let o = c.categoryId ? s.get(c.categoryId) : null;
        return {
          ...toProjectFields(c),
          selectedFreelancerId: c.selectedFreelancerId,
          categoryName: o?.name ?? null
        };
      });
    }
  }),
  create = mutation({
    args: {
      title: v.string(),
      slug: v.string(),
      description: v.string(),
      categoryId: v.optional(v.id("marketplaceCategories")),
      requiredSkills: v.optional(v.array(v.string())),
      budgetMin: v.optional(v.number()),
      budgetMax: v.optional(v.number()),
      currency: v.optional(v.string()),
      deadline: v.optional(v.number()),
      workType: v.optional(v.string()),
      locale: v.string()
    },
    returns: v.id("projects"),
    handler: async (ctx, args) => {
      let r = await requireAuthUser(ctx);
      requireMarketplaceContext(r, "client", "online", "posting a project");
      let i = args.workType ?? "remote";
      assertOnlineWorkType(i, "Online project"), await assertOnlineMarketplaceCategory(ctx, args.categoryId, r.tenantId, args.locale);
      let l = args.title.trim(),
        d = args.description.trim();
      assertValidProjectFields({ ...args, title: l, description: d });
      if (l.length < 10 || l.length > 120) throw new Error("Project titles must be between 10 and 120 characters.");
      if (d.length < 80 || d.length > 1e4) throw new Error("Project descriptions must be between 80 and 10,000 characters.");
      if (args.budgetMin !== void 0 && args.budgetMin < 0) throw new Error("Minimum budget cannot be negative.");
      if (args.budgetMax !== void 0 && args.budgetMax < 0) throw new Error("Maximum budget cannot be negative.");
      if (args.budgetMin !== void 0 && args.budgetMax !== void 0 && args.budgetMin > args.budgetMax) throw new Error("Minimum budget cannot exceed maximum budget.");
      let s = Date.now();
      return await ctx.db.insert("projects", {
        budgetSortValue: args.budgetMax ?? args.budgetMin,
        tenantId: r.tenantId,
        clientId: r._id,
        title: l,
        slug: args.slug,
        description: d,
        categoryId: args.categoryId,
        requiredSkills: args.requiredSkills,
        budgetMin: args.budgetMin,
        budgetMax: args.budgetMax,
        currency: args.currency ?? "EUR",
        deadline: args.deadline,
        workType: i,
        status: "open",
        bidCount: 0,
        views: 0,
        locale: args.locale,
        publishedAt: s,
        createdAt: s,
        updatedAt: s
      });
    }
  }),
  submitBid = mutation({
    args: {
      projectId: v.id("projects"),
      amount: v.number(),
      deliveryDays: v.number(),
      pitch: v.string()
    },
    returns: v.id("bids"),
    handler: async (ctx, args): Promise<Id<"bids">> => {
      let r = await requireAuthUser(ctx);
      if (requireMarketplaceContext(r, "freelancer", "online", "submitting a proposal"), !Number.isFinite(args.amount) || args.amount <= 0) throw new Error("Enter a valid proposal amount.");
      if (!Number.isInteger(args.deliveryDays) || args.deliveryDays < 1 || args.deliveryDays > 365) throw new Error("Delivery time must be between 1 and 365 days.");
      let i = args.pitch.trim();
      if (i.length < 80 || i.length > 5e3) throw new Error("Your proposal must be between 80 and 5,000 characters.");
      let l = await getProviderProfile(ctx, r._id, "freelancer"),
        d = await ctx.db.get(args.projectId);
      if (!d) throw new Error("Project not found");
      let s = await ctx.db.get(d.clientId);
      if (!s) throw new Error("Project client not found");
      if (s.tenantId !== d.tenantId) throw new Error("Online marketplace tenant mismatch.");
      let u = assertActiveOnlineProviderProfile(l, {
        ownerId: r._id,
        accountTenantId: r.tenantId,
        resourceTenantId: d.tenantId
      });
      if (assertOnlineProject(d, {
        expectedTenantId: r.tenantId
      }), await assertOnlineMarketplaceCategory(ctx, d.categoryId, r.tenantId, d.locale), await ctx.db.query("bids").withIndex("by_project_freelancer", a => a.eq("projectId", args.projectId).eq("freelancerId", u._id)).unique()) throw new Error("You have already submitted a bid for this project");
      if (d.status !== "open") throw new Error("This project is no longer accepting bids");
      if (d.clientId === r._id) throw new Error("You cannot bid on your own project.");
      await rateLimiter.limit(ctx, "projectProposal", {
        key: r._id,
        throws: !0
      });
      let o = Date.now(),
        p = await ctx.db.insert("bids", {
          projectId: args.projectId,
          freelancerId: u._id,
          amount: args.amount,
          currency: d.currency ?? "EUR",
          deliveryDays: args.deliveryDays,
          pitch: i,
          status: "pending",
          createdAt: o,
          updatedAt: o
        });
      await ctx.db.patch(args.projectId, {
        bidCount: (d.bidCount ?? 0) + 1,
        updatedAt: o
      });
      let b = await getProviderProfile(ctx, r._id, "freelancer");
      return s.email && (await ctx.scheduler.runAfter(0, internal.lib.email.sendNewBid, {
        clientEmail: s.email,
        clientName: s.name || "Customer",
        projectTitle: d.title,
        bidAmount: args.amount,
        currency: d.currency ?? "EUR",
        deliveryDays: args.deliveryDays,
        freelancerName: b?.displayName || r.name || "Freelancer",
        bidId: p,
        projectId: args.projectId
      })), await notifyUser(ctx, {
        userId: d.clientId,
        type: "proposal_received",
        title: "New proposal received",
        body: `${b?.displayName || r.name} sent a proposal for ${d.title}.`,
        link: `/online/project/${d.slug}`,
        metadata: {
          projectId: d._id,
          bidId: p
        }
      }), p;
    }
  }),
  getMyBids = query({
    args: {
      freelancerId: v.id("freelancerProfiles")
    },
    returns: v.array(L),
    handler: async (ctx, args) => {
      let r = await requireAuthUser(ctx),
        i = await ctx.db.get(args.freelancerId);
      if (!i) return [];
      if (i.userId !== r._id) throw new Error("Unauthorized.");
      let l = await ctx.db.query("bids").withIndex("by_freelancer", o => o.eq("freelancerId", args.freelancerId)).order("desc").take(50),
        d = [...new Set(l.map(o => o.projectId).filter(Boolean))],
        s = await Promise.all(d.map(o => ctx.db.get(o))),
        u = new Map(s.filter(Boolean).map(o => [o._id, o]));
      return l.map(o => {
        let p = u.get(o.projectId);
        return {
          ...toBidFields(o),
          projectTitle: p?.title ?? "Unknown",
          projectSlug: p?.slug ?? "",
          projectStatus: p?.status ?? "unknown",
          projectCurrency: p?.currency ?? o.currency ?? "EUR"
        };
      });
    }
  }),
  remove = mutation({
    args: {
      projectId: v.id("projects")
    },
    returns: v.id("projects"),
    handler: async (ctx, args) => {
      let r = await ctx.db.get(args.projectId);
      if (!r) throw new Error("Project not found");
      let i = await requireOwner(ctx, r.clientId);
      return requireMarketplaceContext(i, "client", "online", "cancelling a project"), assertDirectCancellationAllowed(r), r.status !== "cancelled" && assertTransition(projectTransitions, r.status, "cancelled"), await ctx.db.patch(args.projectId, {
        status: "cancelled",
        updatedAt: Date.now()
      }), args.projectId;
    }
  }),
  update = mutation({
    args: {
      projectId: v.id("projects"),
      title: v.optional(v.string()),
      description: v.optional(v.string()),
      budgetMin: v.optional(v.number()),
      budgetMax: v.optional(v.number()),
      deadline: v.optional(v.number()),
      workType: v.optional(v.string()),
      status: v.optional(v.union(v.literal("draft"), v.literal("open"), v.literal("cancelled"), v.literal("closed")))
    },
    returns: v.id("projects"),
    handler: async (ctx, args) => {
      let r = await ctx.db.get(args.projectId);
      if (!r) throw new Error("Project not found");
      let i = await requireOwner(ctx, r.clientId);
      requireMarketplaceContext(i, "client", "online", "updating a project"), args.status === "cancelled" && assertDirectCancellationAllowed(r), args.status && args.status !== r.status && assertTransition(projectTransitions, r.status, args.status), assertOnlineProject(r, {
        expectedTenantId: i.tenantId,
        expectedClientId: i._id,
        workType: args.workType ?? r.workType
      }), await assertOnlineMarketplaceCategory(ctx, r.categoryId, i.tenantId, r.locale);
      const cleanFields = { ...args, ...(args.title !== undefined ? { title: args.title.trim() } : {}), ...(args.description !== undefined ? { description: args.description.trim() } : {}) };
      assertValidProjectFields({ ...r, ...cleanFields });
      let {
          projectId: l,
          ...d
        } = cleanFields,
        s = {
          budgetSortValue: cleanFields.budgetMax ?? r.budgetMax ?? cleanFields.budgetMin ?? r.budgetMin,
          updatedAt: Date.now()
        };
      for (let [u, c] of Object.entries(d)) c !== void 0 && (s[u] = c);
      return await ctx.db.patch(l, s), l;
    }
  }),
  acceptBid = mutation({
    args: {
      bidId: v.id("bids")
    },
    returns: v.object({
      success: v.boolean(),
      orderId: v.id("orders")
    }),
    handler: async (ctx, args) => {
      let r = await ctx.db.get(args.bidId);
      if (!r) throw new Error("Bid not found");
      let i = await ctx.db.get(r.projectId);
      if (!i) throw new Error("Project not found");
      let l = await requireOwner(ctx, i.clientId);
      requireMarketplaceContext(l, "client", "online", "accepting a proposal"), assertOnlineProject(i, {
        expectedTenantId: l.tenantId,
        expectedClientId: l._id
      }), await assertOnlineMarketplaceCategory(ctx, i.categoryId, l.tenantId, i.locale);
      let d = await ctx.db.query("orders").withIndex("by_bid", a => a.eq("bidId", r._id)).unique();
      if (d) return {
        success: !0,
        orderId: d._id
      };
      if (i.status !== "open") throw new Error("This project is no longer accepting proposals.");
      assertTransition(bidTransitions, r.status, "accepted"), assertTransition(projectTransitions, i.status, "in_progress");
      let s = await ctx.db.get(r.freelancerId);
      if (!s) throw new Error("Freelancer profile not found.");
      let u = await ctx.db.get(s.userId);
      if (!u) throw new Error("Freelancer account not found.");
      assertActiveOnlineProviderProfile(s, {
        ownerId: u._id,
        accountTenantId: u.tenantId,
        resourceTenantId: i.tenantId
      });
      let c = Date.now();
      await ctx.db.patch(args.bidId, {
        status: "accepted",
        updatedAt: c
      }), await ctx.db.patch(r.projectId, {
        status: "in_progress",
        selectedFreelancerId: r.freelancerId,
        updatedAt: c
      });
      let o = await ctx.db.query("bids").withIndex("by_project_status", a => a.eq("projectId", i._id).eq("status", "pending")).take(500);
      await Promise.all(o.filter(a => a._id !== r._id).map(a => ctx.db.patch(a._id, {
        status: "rejected",
        updatedAt: c
      })));
      let p = await ctx.db.insert("orders", {
        tenantId: i.tenantId,
        orderNumber: betaOrderNumber(),
        orderType: "project",
        clientId: i.clientId,
        freelancerId: r.freelancerId,
        projectId: i._id,
        bidId: r._id,
        title: i.title,
        description: i.description,
        amount: r.amount,
        platformFee: 0,
        freelancerEarnings: r.amount,
        currency: r.currency ?? i.currency ?? "EUR",
        deliveryDeadline: c + r.deliveryDays * 24 * 60 * 60 * 1e3,
        revisionsUsed: 0,
        status: "active",
        escrowStatus: "beta_no_payment",
        createdAt: c,
        updatedAt: c
      });
      return (await ctx.db.query("conversations").withIndex("by_order", a => a.eq("orderId", p)).unique()) || (await ctx.db.insert("conversations", {
        tenantId: i.tenantId,
        contextType: "order",
        contextTitle: i.title,
        contextHref: `/orders/${p}`,
        orderId: p,
        projectId: i._id,
        bidId: r._id,
        freelancerProfileId: s._id,
        participant1: i.clientId,
        participant2: u._id,
        unreadCount1: 0,
        unreadCount2: 0,
        status: "active",
        createdAt: c,
        updatedAt: c
      })), u?.email && (await ctx.scheduler.runAfter(0, internal.lib.email.sendBidAccepted, {
        freelancerEmail: u.email,
        freelancerName: s?.displayName || u.name || "Freelancer",
        projectTitle: i.title,
        amount: r.amount,
        currency: i.currency ?? "EUR",
        orderId: p
      })), await notifyUser(ctx, {
        userId: u._id,
        type: "proposal_accepted",
        title: "Your proposal was accepted",
        body: `${i.title} is ready in your private workspace.`,
        link: `/orders/${p}`,
        metadata: {
          projectId: i._id,
          orderId: p
        }
      }), {
        success: !0,
        orderId: p
      };
    }
  });
export { acceptBid, create, getBids, getByClient, getById, getBySlug, getMyBids, getOpenCount, getPublicByClient, list, remove, submitBid, update };

export { O as publicProjectValidator };
