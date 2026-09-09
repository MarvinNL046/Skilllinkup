import type { Id } from "../_generated/dataModel";
// Reconciled with the existing development deployment (2026-09-07).
import { getLeadCreditCost } from "./leadPricing";
import { MAX_SHARED_SLOTS } from "./leadPricing";
import { rateLimiter } from "../lib/rateLimits";
import { query } from "../_generated/server";
import { mutation } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";
import { getOptionalAuthUser } from "../lib/authHelpers";
import { requireMarketplaceContext } from "../lib/authHelpers";
import { getProviderProfile } from "../lib/authHelpers";
import { requireServerSecret } from "../lib/authHelpers";
import { v } from "convex/values";
var T = {
  be: "be",
  belgie: "be",
  belgique: "be",
  belgium: "be",
  de: "de",
  deutschland: "de",
  germany: "de",
  nl: "nl",
  nederland: "nl",
  netherlands: "nl",
  thenetherlands: "nl",
  uk: "gb",
  gb: "gb",
  greatbritain: "gb",
  unitedkingdom: "gb"
};
function normalizeAreaValue(e) {
  return e?.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "") || null;
}
function normalizeCountry(e) {
  let t = normalizeAreaValue(e);
  return t ? T[t] ?? t : null;
}
function isLatitude(e) {
  return typeof e == "number" && Number.isFinite(e) && e >= -90 && e <= 90;
}
function isLongitude(e) {
  return typeof e == "number" && Number.isFinite(e) && e >= -180 && e <= 180;
}
function distanceKm(e, t, i, o) {
  let a = p => p * Math.PI / 180,
    d = a(i - e),
    c = a(o - t),
    m = a(e),
    s = a(i),
    f = Math.sin(d / 2) ** 2 + Math.cos(m) * Math.cos(s) * Math.sin(c / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(f));
}
function coversLocalServiceArea(e, t) {
  let i = normalizeCountry(e.locationCountry),
    o = normalizeCountry(t.locationCountry);
  if (!i || !o || i !== o) return !1;
  if (isLatitude(e.latitude) && isLongitude(e.longitude) && isLatitude(t.latitude) && isLongitude(t.longitude) && typeof e.serviceRadiusKm == "number" && Number.isFinite(e.serviceRadiusKm) && e.serviceRadiusKm > 0) return distanceKm(e.latitude, e.longitude, t.latitude, t.longitude) <= e.serviceRadiusKm;
  let d = normalizeAreaValue(e.locationCity),
    c = normalizeAreaValue(t.locationCity);
  if (d && c && d === c) return !0;
  let m = normalizeAreaValue(e.locationPostcode),
    s = normalizeAreaValue(t.locationPostcode);
  return !!(m && s && m === s);
}
var getMyCredits = query({
    args: {},
    handler: async ctx => {
      let t = await getOptionalAuthUser(ctx);
      if (!t) return null;
      let i = await getProviderProfile(ctx, t._id, "local_professional");
      return {
        balance: i?.creditBalance ?? 0,
        userId: t._id,
        profileId: i?._id ?? null
      };
    }
  }),
  getMyTransactions = query({
    args: {
      limit: v.optional(v.number())
    },
    handler: async (ctx, args) => {
      let i = await getOptionalAuthUser(ctx);
      return i ? await ctx.db.query("creditTransactions").withIndex("by_freelancer", a => a.eq("freelancerId", i._id)).order("desc").take(Math.min(Math.max(args.limit ?? 50, 1), 100)) : [];
    }
  }),
  getMyClaims = query({
    args: {},
    handler: async ctx => {
      let t = await getOptionalAuthUser(ctx);
      if (!t) return [];
      let i = await getProviderProfile(ctx, t._id, "local_professional");
      if (!i) return [];
      let o = await ctx.db.query("leadClaims").withIndex("by_freelancer", r => r.eq("freelancerId", i._id)).order("desc").take(200),
        a = [...new Set(o.map(r => r.quoteRequestId).filter(Boolean))],
        d = await Promise.all(a.map(r => ctx.db.get(r))),
        c = new Map(d.filter(Boolean).map(r => [r._id, r])),
        m = [...new Set(d.filter(Boolean).map(r => r.clientId).filter(Boolean))],
        s = [...new Set(d.filter(Boolean).map(r => r.categoryId).filter(Boolean))],
        [f, p] = await Promise.all([Promise.all(m.map(r => ctx.db.get(r))), Promise.all(s.map(r => ctx.db.get(r)))]),
        w = new Map(f.filter(Boolean).map(r => [r._id, r])),
        q = new Map(p.filter(Boolean).map(r => [r._id, r]));
      return o.map(r => {
        let u = c.get(r.quoteRequestId);
        if (!u) return {
          ...r,
          request: null,
          client: null,
          categoryName: null
        };
        let R = w.get(u.clientId),
          B = q.get(u.categoryId);
        return {
          ...r,
          request: {
            _id: u._id,
            title: u.title,
            description: u.description,
            locationCity: u.locationCity,
            locationPostcode: u.locationPostcode,
            budgetIndication: u.budgetIndication,
            preferredDate: u.preferredDate,
            status: u.status,
            createdAt: u.createdAt
          },
          client: R ? {
            name: R.name,
            email: R.email
          } : null,
          categoryName: B?.name ?? null
        };
      });
    }
  }),
  getLeadStatus = query({
    args: {
      quoteRequestId: v.id("quoteRequests")
    },
    handler: async (ctx, args) => {
      let i = await ctx.db.get(args.quoteRequestId);
      if (!i) return null;
      let o = await ctx.db.query("leadClaims").withIndex("by_quoteRequest", w => w.eq("quoteRequestId", args.quoteRequestId)).take(MAX_SHARED_SLOTS),
        a = i.isExclusive ? 1 : i.maxSlots ?? MAX_SHARED_SLOTS,
        d = i.claimedSlots ?? 0,
        c = Math.max(0, a - d),
        m = !1,
        s = await getOptionalAuthUser(ctx);
      if (s) {
        let w = await getProviderProfile(ctx, s._id, "local_professional");
        w && (m = o.some(q => q.freelancerId === w._id));
      }
      let f = getLeadCreditCost(i.budgetIndication, "shared"),
        p = getLeadCreditCost(i.budgetIndication, "exclusive");
      return {
        claimedSlots: d,
        maxSlots: a,
        slotsRemaining: c,
        isExclusive: i.isExclusive ?? !1,
        alreadyClaimed: m,
        creditCost: f,
        exclusiveCost: p,
        canClaimExclusive: d === 0 && !i.isExclusive
      };
    }
  }),
  claimLead = mutation({
    args: {
      quoteRequestId: v.id("quoteRequests"),
      claimType: v.union(v.literal("shared"), v.literal("exclusive"))
    },
    returns: v.object({
      claimId: v.id("leadClaims"),
      creditsSpent: v.number(),
      newBalance: v.number()
    }),
    handler: async (ctx, args) => {
      let i = await requireAuthUser(ctx);
      if (i.role === "admin") throw new Error("Administrators cannot claim Local leads.");
      requireMarketplaceContext(i, "local_professional", "local", "claiming a lead"), await rateLimiter.limit(ctx, "localLeadClaim", {
        key: i._id,
        throws: !0
      });
      let o = await ctx.db.query("freelancerProfiles").withIndex("by_userId_and_providerRole", q => q.eq("userId", i._id).eq("providerRole", "local_professional")).unique();
      if (!o) throw new Error("An explicit Local professional profile is required to claim leads.");
      if (o.providerRole !== "local_professional" || o.status !== "active" || o.isVerified !== !0 || o.workType !== "local" && o.workType !== "hybrid") throw new Error("Your Local professional profile is not eligible to claim leads.");
      if (o.tenantId !== i.tenantId) throw new Error("Your Local professional profile belongs to another workspace.");
      let a = await ctx.db.get(args.quoteRequestId);
      if (!a) throw new Error("Quote request not found.");
      if (a.status !== "open") throw new Error("This quote request is no longer open.");
      if (a.tenantId !== i.tenantId) throw new Error("This quote request belongs to another workspace.");
      if (!coversLocalServiceArea(o, a)) throw new Error("This quote request is outside your verified service area.");
      if ((await ctx.db.query("leadClaims").withIndex("by_quoteRequest", q => q.eq("quoteRequestId", args.quoteRequestId)).take(MAX_SHARED_SLOTS)).some(q => q.freelancerId === o._id)) throw new Error("You have already claimed this lead.");
      let c = a.claimedSlots ?? 0,
        m = a.maxSlots ?? MAX_SHARED_SLOTS;
      if (args.claimType === "exclusive") {
        if (c > 0) throw new Error("Exclusive claim not available \u2014 lead already has claims.");
      } else {
        if (a.isExclusive) throw new Error("This lead has been exclusively claimed.");
        if (c >= m) throw new Error("All slots for this lead are taken.");
      }
      let s = getLeadCreditCost(a.budgetIndication, args.claimType),
        f = o.creditBalance ?? 0;
      if (f < s) throw new Error(`Insufficient credits. You need ${s} credits but have ${f}.`);
      let p = Date.now();
      await ctx.db.patch(o._id, {
        creditBalance: f - s
      });
      let w = await ctx.db.insert("leadClaims", {
        quoteRequestId: args.quoteRequestId,
        freelancerId: o._id,
        creditsSpent: s,
        claimType: args.claimType,
        claimedAt: p
      });
      return args.claimType === "exclusive" ? await ctx.db.patch(args.quoteRequestId, {
        isExclusive: !0,
        claimedSlots: 1,
        maxSlots: 1,
        updatedAt: p
      }) : await ctx.db.patch(args.quoteRequestId, {
        claimedSlots: c + 1,
        updatedAt: p
      }), await ctx.db.insert("creditTransactions", {
        freelancerId: i._id,
        amount: -s,
        type: "spend",
        description: `Claimed lead: ${a.title}`,
        referenceId: w,
        createdAt: p
      }), {
        claimId: w,
        creditsSpent: s,
        newBalance: f - s
      };
    }
  }),
  addCredits = mutation({
    args: {
      freelancerUserId: v.id("users"),
      credits: v.number(),
      stripeSessionId: v.string(),
      description: v.string(),
      serverSecret: v.optional(v.string())
    },
    handler: async (ctx, args) => {
      requireServerSecret(args.serverSecret);
      let i = await getProviderProfile(ctx, args.freelancerUserId, "local_professional");
      if (!i) throw new Error("Freelancer profile not found.");
      let a = (i.creditBalance ?? 0) + args.credits;
      return await ctx.db.patch(i._id, {
        creditBalance: a
      }), await ctx.db.insert("creditTransactions", {
        freelancerId: args.freelancerUserId,
        amount: args.credits,
        type: "purchase",
        description: args.description,
        referenceId: args.stripeSessionId,
        createdAt: Date.now()
      }), {
        newBalance: a
      };
    }
  });
export { addCredits, claimLead, getLeadStatus, getMyClaims, getMyCredits, getMyTransactions };
