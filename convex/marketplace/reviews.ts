import type { MutationCtx, QueryCtx } from "../_generated/server";
import type { Doc, Id } from "../_generated/dataModel";
// Reconciled with the existing development deployment (2026-09-07).
import { isPublicOnlineFreelancerProfile } from "../lib/publicData";
import { internal } from "../_generated/api";
import { query } from "../_generated/server";
import { mutation } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";
import { v } from "convex/values";
var R = v.union(v.string(), v.null()),
  P = {
    _id: v.id("marketplaceReviews"),
    _creationTime: v.number(),
    reviewerRole: v.union(v.literal("client"), v.literal("freelancer")),
    overallRating: v.number(),
    communicationRating: v.optional(v.number()),
    qualityRating: v.optional(v.number()),
    timelinessRating: v.optional(v.number()),
    valueRating: v.optional(v.number()),
    content: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number()
  },
  T = v.object({
    ...P,
    reviewerName: v.string(),
    reviewerAvatar: R,
    orderTitle: R
  }),
  U = v.object({
    ...P,
    orderId: v.optional(v.id("orders")),
    reviewerId: v.optional(v.id("users")),
    revieweeId: v.optional(v.id("users")),
    isPublic: v.optional(v.boolean()),
    reviewerName: v.string(),
    reviewerAvatar: R,
    orderTitle: R,
    orderType: R
  }),
  B = v.object({
    ...P,
    orderId: v.optional(v.id("orders")),
    reviewerId: v.optional(v.id("users")),
    revieweeId: v.optional(v.id("users")),
    isPublic: v.optional(v.boolean())
  });
function toReviewFields(r) {
  return {
    _id: r._id,
    _creationTime: r._creationTime,
    reviewerRole: r.reviewerRole,
    overallRating: r.overallRating,
    communicationRating: r.communicationRating,
    qualityRating: r.qualityRating,
    timelinessRating: r.timelinessRating,
    valueRating: r.valueRating,
    content: r.content,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt
  };
}
function toOrderReview(r) {
  return {
    ...toReviewFields(r),
    orderId: r.orderId,
    reviewerId: r.reviewerId,
    revieweeId: r.revieweeId,
    isPublic: r.isPublic
  };
}
async function getOrderReviewContext(ctx: QueryCtx | MutationCtx, orderId: Id<"orders">) {
  let n = await ctx.db.get(orderId);
  if (!n) throw new Error("Order not found");
  let d = n.freelancerId ? await ctx.db.get(n.freelancerId) : null;
  return {
    order: n,
    freelancerProfile: d,
    freelancerUserId: d?.userId ?? null
  };
}
function canAccessOrderReviews(user: Doc<"users">, order: Doc<"orders">, freelancerUserId: Id<"users"> | null) {
  return user.role === "admin" || order.clientId === user._id || freelancerUserId === user._id;
}
async function getPublicProfileReviewPairs(r: QueryCtx | MutationCtx, i: Doc<"freelancerProfiles">, n: number) {
  let [d, u] = await Promise.all([r.db.query("marketplaceReviews").withIndex("by_revieweeProfile_and_isPublic", t => t.eq("revieweeProfileId", i._id).eq("isPublic", !0)).order("desc").take(n), r.db.query("marketplaceReviews").withIndex("by_reviewee_and_isPublic", t => t.eq("revieweeId", i.userId).eq("isPublic", !0)).order("desc").take(n)]),
    o = new Map([...d, ...u].filter(t => t.revieweeProfileId === i._id || t.revieweeProfileId === void 0).map(t => [t._id, t])),
    s = [...new Set([...o.values()].map(t => t.orderId).filter(t => t !== void 0))],
    v = await Promise.all(s.map(t => r.db.get(t))),
    I = new Map(v.filter(t => t !== null).map(t => [t._id, t]));
  return [...o.values()].filter(t => {
    if (!t.orderId) return !1;
    let l = I.get(t.orderId);
    return l?.freelancerId === i._id && l.tenantId === i.tenantId && t.revieweeId === i.userId;
  }).map(t => ({
    review: t,
    order: I.get(t.orderId)
  }));
}
async function refreshFreelancerRating(ctx: MutationCtx, userId: Id<"freelancerProfiles">) {
  let n = await ctx.db.get(userId);
  if (!n) return;
  let d = (await getPublicProfileReviewPairs(ctx, n, 1e3)).map(({
      review: o
    }) => o),
    u = d.length ? d.reduce((o, s) => o + s.overallRating, 0) / d.length : 0;
  await ctx.db.patch(n._id, {
    ratingAverage: Math.round(u * 10) / 10,
    ratingCount: d.length,
    updatedAt: Date.now()
  });
}
async function schedulePublishedReviewEmail(r, i, n, d) {
  let u = await r.db.get(i);
  u?.email && (await r.scheduler.runAfter(0, internal.lib.email.sendReviewReceived, {
    userEmail: u.email,
    userName: u.name || "User",
    orderTitle: n.title,
    rating: d,
    orderId: n._id
  }));
}
var getByFreelancer = query({
    args: {
      freelancerId: v.id("freelancerProfiles"),
      limit: v.optional(v.number())
    },
    returns: v.array(T),
    handler: async (ctx, args) => {
      let n = Math.max(1, Math.min(args.limit ?? 10, 100)),
        d = await ctx.db.get(args.freelancerId);
      if (!isPublicOnlineFreelancerProfile(d)) return [];
      let o = (await getPublicProfileReviewPairs(ctx, d, Math.min(Math.max(n * 4, 40), 400))).sort((l, f) => f.review.createdAt - l.review.createdAt).slice(0, n),
        s = [...new Set(o.map(({
          review: l
        }) => l.reviewerId).filter(Boolean))],
        v = await Promise.all(s.map(l => ctx.db.get(l))),
        I = new Map(v.filter(Boolean).map(l => [l._id, l]));
      return o.map(({
        review: l,
        order: f
      }) => {
        let c = l.reviewerId ? I.get(l.reviewerId) : null;
        return {
          ...toReviewFields(l),
          reviewerName: c?.name ?? "Anonymous",
          reviewerAvatar: c?.avatar ?? c?.image ?? null,
          orderTitle: f.title
        };
      });
    }
  }),
  getByUserId = query({
    args: {
      userId: v.id("users"),
      limit: v.optional(v.number())
    },
    returns: v.array(U),
    handler: async (ctx, args) => {
      let n = await requireAuthUser(ctx);
      if (n._id !== args.userId && n.role !== "admin") throw new Error("Unauthorized.");
      let d = Math.max(1, Math.min(args.limit ?? 50, 100)),
        u = ctx.db.query("marketplaceReviews").withIndex("by_reviewee", a => a.eq("revieweeId", args.userId)),
        s = (n.role === "admin" ? await u.take(Math.min(d * 2, 200)) : await ctx.db.query("marketplaceReviews").withIndex("by_reviewee_and_isPublic", a => a.eq("revieweeId", args.userId).eq("isPublic", !0)).take(Math.min(d * 2, 200))).sort((a, p) => p.createdAt - a.createdAt).slice(0, d),
        v = [...new Set(s.map(a => a.reviewerId).filter(Boolean))],
        I = [...new Set(s.map(a => a.orderId).filter(Boolean))],
        [t, l] = await Promise.all([Promise.all(v.map(a => ctx.db.get(a))), Promise.all(I.map(a => ctx.db.get(a)))]),
        f = new Map(t.filter(Boolean).map(a => [a._id, a])),
        c = new Map(l.filter(Boolean).map(a => [a._id, a]));
      return s.map(a => {
        let p = a.reviewerId ? f.get(a.reviewerId) : null,
          w = a.orderId ? c.get(a.orderId) : null;
        return {
          ...toOrderReview(a),
          reviewerName: p?.name ?? "Anonymous",
          reviewerAvatar: p?.avatar ?? p?.image ?? null,
          orderTitle: w?.title ?? null,
          orderType: w?.orderType ?? null
        };
      });
    }
  }),
  getByOrder = query({
    args: {
      orderId: v.id("orders")
    },
    returns: v.array(B),
    handler: async (ctx, args) => {
      let n = await requireAuthUser(ctx),
        {
          order: d,
          freelancerUserId: u
        } = await getOrderReviewContext(ctx, args.orderId);
      if (!canAccessOrderReviews(n, d, u)) throw new Error("Unauthorized.");
      let o = await ctx.db.query("marketplaceReviews").withIndex("by_order", s => s.eq("orderId", args.orderId)).take(10);
      return n.role === "admin" || o.every(s => s.isPublic === !0) ? o.map(toOrderReview) : o.filter(s => s.isPublic === !0 || s.reviewerId === n._id).map(toOrderReview);
    }
  }),
  create = mutation({
    args: {
      orderId: v.id("orders"),
      revieweeId: v.id("users"),
      reviewerRole: v.union(v.literal("client"), v.literal("freelancer")),
      overallRating: v.number(),
      communicationRating: v.optional(v.number()),
      qualityRating: v.optional(v.number()),
      timelinessRating: v.optional(v.number()),
      valueRating: v.optional(v.number()),
      content: v.optional(v.string())
    },
    returns: v.id("marketplaceReviews"),
    handler: async (ctx, args) => {
      let n = await requireAuthUser(ctx);
      if ([args.overallRating, args.communicationRating, args.qualityRating, args.timelinessRating, args.valueRating].filter(w => w !== void 0).some(w => !Number.isInteger(w) || w < 1 || w > 5)) throw new Error("Ratings must be whole numbers from 1 to 5.");
      let u = args.content?.trim();
      if (u && (u.length < 10 || u.length > 3e3)) throw new Error("Written reviews must be between 10 and 3,000 characters.");
      let {
        order: o,
        freelancerUserId: s
      } = await getOrderReviewContext(ctx, args.orderId);
      if (o.status !== "completed") throw new Error("Reviews are only allowed for completed orders.");
      let v = o.clientId === n._id,
        I = s === n._id;
      if (!v && !I) throw new Error("Unauthorized.");
      let t = v ? s : o.clientId;
      if (!t || args.revieweeId !== t) throw new Error("Unauthorized.");
      let l = v ? "client" : "freelancer";
      if (args.reviewerRole !== l) throw new Error("Unauthorized.");
      if (await ctx.db.query("marketplaceReviews").withIndex("by_order_and_reviewer", w => w.eq("orderId", args.orderId).eq("reviewerId", n._id)).first()) throw new Error("You already reviewed this order");
      let c = await ctx.db.query("marketplaceReviews").withIndex("by_order_and_reviewer", w => w.eq("orderId", args.orderId).eq("reviewerId", t)).first(),
        h = !!c,
        a = v ? o.freelancerId : void 0,
        p = await ctx.db.insert("marketplaceReviews", {
          tenantId: o.tenantId,
          orderId: args.orderId,
          reviewerId: n._id,
          revieweeId: args.revieweeId,
          revieweeProfileId: a,
          reviewerRole: l,
          overallRating: args.overallRating,
          communicationRating: args.communicationRating,
          qualityRating: args.qualityRating,
          timelinessRating: args.timelinessRating,
          valueRating: args.valueRating,
          content: u,
          isPublic: h,
          createdAt: Date.now(),
          updatedAt: Date.now()
        });
      return h && c && (await ctx.db.patch(c._id, {
        isPublic: !0
      }), await Promise.all([a ? refreshFreelancerRating(ctx, a) : Promise.resolve(), c.revieweeProfileId ? refreshFreelancerRating(ctx, c.revieweeProfileId) : Promise.resolve()]), await schedulePublishedReviewEmail(ctx, args.revieweeId, o, args.overallRating), c.revieweeId && (await schedulePublishedReviewEmail(ctx, c.revieweeId, o, c.overallRating))), p;
    }
  });
export { create, getByFreelancer, getByOrder, getByUserId };
