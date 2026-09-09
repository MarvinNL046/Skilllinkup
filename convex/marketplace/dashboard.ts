import type { Id } from "../_generated/dataModel";
// Reconciled with the existing development deployment (2026-09-07).
import { query } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";
import { requireOwner } from "../lib/authHelpers";
import { getProviderProfile } from "../lib/authHelpers";
import { hasCompletedMarketplaceContext } from "../lib/marketplaceState";
import { v } from "convex/values";
var getStats = query({
    args: {
      userId: v.optional(v.id("users"))
    },
    handler: async (ctx, args) => {
      if (!args.userId) return {
        totalOrders: 0,
        totalEarnings: 0,
        activeGigs: 0,
        pendingOrders: 0
      };
      await requireOwner(ctx, args.userId);
      let o = await ctx.db.query("freelancerProfiles").withIndex("by_userId", l => l.eq("userId", args.userId)).first(),
        w = await ctx.db.query("orders").withIndex("by_client", l => l.eq("clientId", args.userId)).take(1e3),
        c = o ? await ctx.db.query("orders").withIndex("by_freelancer", l => l.eq("freelancerId", o._id)).take(1e3) : [],
        m = new Set(),
        u = [...w, ...c].filter(l => m.has(l._id) ? !1 : (m.add(l._id), !0)),
        I = u.length,
        _ = c.filter(l => l.status === "completed").reduce((l, d) => l + (d.freelancerEarnings ?? 0), 0),
        h = o ? await ctx.db.query("gigs").withIndex("by_freelancer", l => l.eq("freelancerId", o._id)).take(1e3).then(l => l.filter(d => d.status === "active").length) : 0,
        q = u.filter(l => ["pending", "in_progress", "active", "delivered", "revision_requested"].includes(l.status)).length;
      return {
        totalOrders: I,
        totalEarnings: _,
        activeGigs: h,
        pendingOrders: q
      };
    }
  }),
  getRecentOrders = query({
    args: {
      userId: v.optional(v.id("users")),
      limit: v.optional(v.number())
    },
    handler: async (ctx, args) => {
      if (!args.userId) return [];
      await requireOwner(ctx, args.userId);
      let o = args.limit ?? 5,
        w = await ctx.db.query("orders").withIndex("by_client", n => n.eq("clientId", args.userId)).order("desc").take(o),
        c = await ctx.db.query("freelancerProfiles").withIndex("by_userId", n => n.eq("userId", args.userId)).first(),
        m = c ? await ctx.db.query("orders").withIndex("by_freelancer", n => n.eq("freelancerId", c._id)).order("desc").take(o) : [],
        u = new Set(),
        I = [...w, ...m].filter(n => u.has(n._id) ? !1 : (u.add(n._id), !0)).sort((n, g) => g.createdAt - n.createdAt).slice(0, o),
        _ = [...new Set(I.map(n => n.clientId))],
        h = [...new Set(I.map(n => n.freelancerId).filter(n => n != null))],
        [q, l] = await Promise.all([Promise.all(_.map(n => ctx.db.get(n))), Promise.all(h.map(n => ctx.db.get(n)))]),
        d = new Map(_.map((n, g) => [n, q[g]])),
        y = new Map(h.map((n, g) => [n, l[g]])),
        p = [...new Set(l.filter(Boolean).map(n => n.userId))],
        v = await Promise.all(p.map(n => ctx.db.get(n))),
        P = new Map(p.map((n, g) => [n, v[g]]));
      return I.map(n => {
        let g = d.get(n.clientId),
          j = n.freelancerId ? y.get(n.freelancerId) : null,
          A = j ? P.get(j.userId) : null;
        return {
          _id: n._id,
          orderNumber: n.orderNumber,
          title: n.title,
          amount: n.amount,
          currency: n.currency ?? "EUR",
          status: n.status,
          orderType: n.orderType,
          createdAt: n.createdAt,
          clientName: g?.name ?? null,
          freelancerName: j?.displayName ?? A?.name ?? null
        };
      });
    }
  }),
  getChartData = query({
    args: {
      userId: v.optional(v.id("users"))
    },
    handler: async (ctx, args) => {
      let o = {
        monthlyOrders: [],
        statusBreakdown: {
          completed: 0,
          active: 0,
          pending: 0,
          cancelled: 0
        }
      };
      if (!args.userId) return o;
      await requireOwner(ctx, args.userId);
      let w = await ctx.db.query("freelancerProfiles").withIndex("by_userId", d => d.eq("userId", args.userId)).first(),
        c = await ctx.db.query("orders").withIndex("by_client", d => d.eq("clientId", args.userId)).take(1e3),
        m = w ? await ctx.db.query("orders").withIndex("by_freelancer", d => d.eq("freelancerId", w._id)).take(1e3) : [],
        u = new Set(),
        I = [...c, ...m].filter(d => u.has(d._id) ? !1 : (u.add(d._id), !0));
      if (I.length === 0) return o;
      let _ = new Date(),
        h = [];
      for (let d = 11; d >= 0; d--) {
        let y = new Date(_.getFullYear(), _.getMonth() - d, 1),
          p = new Date(y.getFullYear(), y.getMonth() + 1, 1);
        h.push({
          month: y.toLocaleString("en-US", {
            month: "short"
          }),
          start: y.getTime(),
          end: p.getTime()
        });
      }
      let q = h.map(({
          month: d,
          start: y,
          end: p
        }) => ({
          month: d,
          count: I.filter(v => v.createdAt >= y && v.createdAt < p).length
        })),
        l = {
          completed: 0,
          active: 0,
          pending: 0,
          cancelled: 0
        };
      for (let d of I) switch (d.status) {
        case "completed":
          l.completed++;
          break;
        case "active":
        case "in_progress":
        case "delivered":
        case "revision_requested":
          l.active++;
          break;
        case "pending":
          l.pending++;
          break;
        case "cancelled":
        case "disputed":
          l.cancelled++;
          break;
      }
      return {
        monthlyOrders: q,
        statusBreakdown: l
      };
    }
  }),
  getCombined = query({
    args: {
      userId: v.id("users")
    },
    handler: async (ctx, args) => {
      await requireOwner(ctx, args.userId);
      let o = await ctx.db.query("freelancerProfiles").withIndex("by_userId", r => r.eq("userId", args.userId)).first(),
        w = await ctx.db.query("orders").withIndex("by_client", r => r.eq("clientId", args.userId)).order("desc").take(200),
        c = o ? await ctx.db.query("orders").withIndex("by_freelancer", r => r.eq("freelancerId", o._id)).order("desc").take(200) : [],
        m = new Set(),
        u = [...w, ...c].filter(r => m.has(r._id) ? !1 : (m.add(r._id), !0)),
        I = u.length,
        _ = c.filter(r => r.status === "completed").reduce((r, f) => r + (f.freelancerEarnings ?? 0), 0),
        h = u.filter(r => ["pending", "in_progress", "active", "delivered", "revision_requested"].includes(r.status)).length,
        q = o ? await ctx.db.query("gigs").withIndex("by_freelancer", r => r.eq("freelancerId", o._id)).take(1e3).then(r => r.filter(f => f.status === "active").length) : 0,
        l = {
          totalOrders: I,
          totalEarnings: _,
          activeGigs: q,
          pendingOrders: h
        },
        d = u.sort((r, f) => f.createdAt - r.createdAt).slice(0, 5),
        y = [...new Set(d.map(r => r.clientId))],
        p = [...new Set(d.map(r => r.freelancerId).filter(r => r != null))],
        [v, P] = await Promise.all([Promise.all(y.map(r => ctx.db.get(r))), Promise.all(p.map(r => ctx.db.get(r)))]),
        U = new Map(y.map((r, f) => [r, v[f]])),
        n = new Map(p.map((r, f) => [r, P[f]])),
        g = [...new Set(P.filter(Boolean).map(r => r.userId))],
        j = await Promise.all(g.map(r => ctx.db.get(r))),
        A = new Map(g.map((r, f) => [r, j[f]])),
        D = d.map(r => {
          let f = U.get(r.clientId),
            O = r.freelancerId ? n.get(r.freelancerId) : null,
            R = O ? A.get(O.userId) : null;
          return {
            _id: r._id,
            orderNumber: r.orderNumber,
            title: r.title,
            amount: r.amount,
            currency: r.currency ?? "EUR",
            status: r.status,
            orderType: r.orderType,
            createdAt: r.createdAt,
            clientName: f?.name ?? null,
            freelancerName: O?.displayName ?? R?.name ?? null
          };
        });
      return {
        stats: l,
        recentOrders: D
      };
    }
  }),
  le = v.object({
    user: v.object({
      name: v.string(),
      isProvider: v.boolean(),
      activeRole: v.string(),
      preferredWorld: v.string(),
      image: v.union(v.string(), v.null())
    }),
    stats: v.object({
      activeProjects: v.number(),
      newProposals: v.number(),
      unreadMessages: v.number(),
      outstandingAmount: v.number(),
      currency: v.string()
    }),
    activeProjects: v.array(v.object({
      id: v.string(),
      title: v.string(),
      category: v.union(v.string(), v.null()),
      freelancerName: v.union(v.string(), v.null()),
      freelancerAvatar: v.union(v.string(), v.null()),
      progress: v.number(),
      status: v.string(),
      deadline: v.union(v.number(), v.null())
    })),
    proposals: v.array(v.object({
      id: v.string(),
      projectId: v.string(),
      projectTitle: v.string(),
      freelancerName: v.string(),
      freelancerAvatar: v.union(v.string(), v.null()),
      freelancerTagline: v.union(v.string(), v.null()),
      ratingAverage: v.number(),
      ratingCount: v.number(),
      isVerified: v.boolean(),
      amount: v.number(),
      currency: v.string(),
      status: v.string(),
      createdAt: v.number()
    })),
    messages: v.array(v.object({
      id: v.string(),
      counterpartName: v.string(),
      counterpartAvatar: v.union(v.string(), v.null()),
      preview: v.string(),
      unreadCount: v.number(),
      lastMessageAt: v.union(v.number(), v.null())
    })),
    deadlines: v.array(v.object({
      id: v.string(),
      title: v.string(),
      subtitle: v.string(),
      deadline: v.number(),
      daysRemaining: v.number()
    })),
    paymentMonths: v.array(v.object({
      month: v.string(),
      amount: v.number()
    })),
    recentPayments: v.array(v.object({
      id: v.string(),
      title: v.string(),
      amount: v.number(),
      currency: v.string(),
      date: v.number(),
      status: v.string()
    })),
    favorites: v.array(v.object({
      id: v.string(),
      title: v.string(),
      subtitle: v.string(),
      image: v.union(v.string(), v.null()),
      url: v.string()
    }))
  }),
  getOverview = query({
    args: {},
    returns: le,
    handler: async ctx => {
      let i = await requireAuthUser(ctx),
        o = i.activeRole,
        w = i.preferredWorld;
      if (!o || !w || !hasCompletedMarketplaceContext(i, o, w)) throw new Error("Complete account onboarding before opening the dashboard.");
      let c = o === "freelancer" || o === "local_professional",
        m = c ? await getProviderProfile(ctx, i._id, o === "local_professional" ? "local_professional" : "freelancer") : null,
        [u, I, _, h, q, l] = await Promise.all([ctx.db.query("projects").withIndex("by_client", e => e.eq("clientId", i._id)).order("desc").take(40), ctx.db.query("orders").withIndex("by_client", e => e.eq("clientId", i._id)).order("desc").take(120), m ? ctx.db.query("orders").withIndex("by_freelancer", e => e.eq("freelancerId", m._id)).order("desc").take(120) : Promise.resolve([]), ctx.db.query("conversations").withIndex("by_participant1", e => e.eq("participant1", i._id)).order("desc").take(20), ctx.db.query("conversations").withIndex("by_participant2", e => e.eq("participant2", i._id)).order("desc").take(20), ctx.db.query("savedItems").withIndex("by_user_createdAt", e => e.eq("userId", i._id)).order("desc").take(6)]),
        d = (c ? _ : I).sort((e, s) => s.updatedAt - e.updatedAt),
        y = new Set(["pending", "active", "in_progress", "delivered", "revision_requested"]),
        p = d.filter(e => y.has(e.status)),
        v = c && m ? await ctx.db.query("bids").withIndex("by_freelancer", e => e.eq("freelancerId", m._id)).order("desc").take(8) : (await Promise.all(u.slice(0, 12).map(e => ctx.db.query("bids").withIndex("by_project", s => s.eq("projectId", e._id)).order("desc").take(4)))).flat().sort((e, s) => s.createdAt - e.createdAt).slice(0, 8),
        P = new Set<Id<"projects">>();
      for (let e of u) P.add(e._id);
      for (let e of p) e.projectId && P.add(e.projectId);
      for (let e of v) P.add(e.projectId);
      let U = [...P].filter(e => !u.some(s => s._id === e)),
        n = await Promise.all(U.map(e => ctx.db.get(e))),
        g = [...u, ...n.filter(e => e !== null)],
        j = new Map(g.map(e => [e._id, e])),
        A = new Set<Id<"freelancerProfiles">>();
      for (let e of p) e.freelancerId && A.add(e.freelancerId);
      for (let e of u) e.selectedFreelancerId && A.add(e.selectedFreelancerId);
      for (let e of v) A.add(e.freelancerId);
      let D = await Promise.all([...A].map(e => ctx.db.get(e))),
        r = new Map(D.filter(e => e !== null).map(e => [e._id, e])),
        f = [...new Set(p.map(e => e.clientId))],
        O = await Promise.all(f.map(e => ctx.db.get("users", e))),
        R = new Map(O.filter(e => e !== null).map(e => [e._id, e])),
        J = [...new Set(g.map(e => e.categoryId).filter(e => e !== void 0))],
        K = await Promise.all(J.map(e => ctx.db.get(e))),
        Q = new Map(K.filter(e => e !== null).map(e => [e._id, e.name])),
        X = e => e === "completed" ? 100 : e === "delivered" ? 90 : e === "revision_requested" ? 75 : e === "active" || e === "in_progress" ? 55 : 15,
        E = p.slice(0, 5).map(e => {
          let s = e.projectId ? j.get(e.projectId) : null,
            b = e.freelancerId ? r.get(e.freelancerId) : null,
            M = R.get(e.clientId);
          return {
            id: e._id,
            title: s?.title ?? e.title,
            category: s?.categoryId ? Q.get(s.categoryId) ?? null : null,
            freelancerName: c ? M?.name ?? null : b?.displayName ?? null,
            freelancerAvatar: c ? M?.avatar ?? M?.image ?? null : b?.avatarUrl ?? null,
            progress: X(e.status),
            status: e.status,
            deadline: e.deliveryDeadline ?? s?.deadline ?? null
          };
        }),
        Z = v.slice(0, 4).map(e => {
          let s = r.get(e.freelancerId),
            b = j.get(e.projectId);
          return {
            id: e._id,
            projectId: e.projectId,
            projectTitle: b?.title ?? "Project proposal",
            freelancerName: s?.displayName ?? "Professional",
            freelancerAvatar: s?.avatarUrl ?? null,
            freelancerTagline: s?.tagline ?? null,
            ratingAverage: s?.ratingAverage ?? 0,
            ratingCount: s?.ratingCount ?? 0,
            isVerified: s?.isVerified ?? !1,
            amount: e.amount,
            currency: e.currency ?? "EUR",
            status: e.status,
            createdAt: e.createdAt
          };
        }),
        F = new Set(),
        B = [...h, ...q].filter(e => F.has(e._id) ? !1 : (F.add(e._id), !0)).sort((e, s) => (s.lastMessageAt ?? s.updatedAt) - (e.lastMessageAt ?? e.updatedAt)).slice(0, 5),
        $ = [...new Set(B.map(e => e.participant1 === i._id ? e.participant2 : e.participant1))],
        x = await Promise.all($.map(e => ctx.db.get(e))),
        ee = new Map(x.filter(e => e !== null).map(e => [e._id, e])),
        W = B.map(e => {
          let s = e.participant1 === i._id,
            b = s ? e.participant2 : e.participant1,
            M = ee.get(b);
          return {
            id: e._id,
            counterpartName: M?.name ?? "Skilllinkup member",
            counterpartAvatar: M?.avatar ?? M?.image ?? null,
            preview: e.lastMessagePreview ?? "Start the conversation",
            unreadCount: s ? e.unreadCount1 ?? 0 : e.unreadCount2 ?? 0,
            lastMessageAt: e.lastMessageAt ?? null
          };
        }),
        V = Date.now(),
        te = E.filter(e => e.deadline !== null && e.deadline >= V).sort((e, s) => e.deadline - s.deadline).slice(0, 4).map(e => ({
          id: e.id,
          title: e.title,
          subtitle: [e.category, e.freelancerName].filter(Boolean).join(" \u2014 ") || "Active project",
          deadline: e.deadline,
          daysRemaining: Math.max(0, Math.ceil((e.deadline - V) / 864e5))
        })),
        G = c ? _ : I,
        T = Array.from({
          length: 6
        }, (e, s) => {
          let b = new Date();
          return b.setDate(1), b.setHours(0, 0, 0, 0), b.setMonth(b.getMonth() - (5 - s)), b;
        }),
        re = T.map((e, s) => {
          let b = s === T.length - 1 ? new Date(e.getFullYear(), e.getMonth() + 1, 1) : T[s + 1],
            M = G.filter(C => C.createdAt >= e.getTime() && C.createdAt < b.getTime()).reduce((C, Y) => C + (c ? Y.freelancerEarnings : Y.amount), 0);
          return {
            month: e.toLocaleString("en-US", {
              month: "short"
            }),
            amount: M
          };
        }),
        ne = G.filter(e => ["completed", "delivered", "active", "in_progress"].includes(e.status)).slice(0, 4).map(e => ({
          id: e._id,
          title: e.title,
          amount: c ? e.freelancerEarnings : e.amount,
          currency: e.currency ?? "EUR",
          date: e.completedAt ?? e.updatedAt,
          status: e.status === "completed" ? "Paid" : "Pending"
        })),
        ae = W.reduce((e, s) => e + s.unreadCount, 0),
        se = p.reduce((e, s) => e + (c ? s.freelancerEarnings : s.amount), 0),
        ie = v.filter(e => e.status === "pending").length;
      return {
        user: {
          name: i.name,
          isProvider: c,
          activeRole: o,
          preferredWorld: w,
          image: i.avatar ?? i.image ?? null
        },
        stats: {
          activeProjects: p.length,
          newProposals: ie,
          unreadMessages: ae,
          outstandingAmount: se,
          currency: "EUR"
        },
        activeProjects: E,
        proposals: Z,
        messages: W,
        deadlines: te,
        paymentMonths: re,
        recentPayments: ne,
        favorites: l.map(e => ({
          id: e._id,
          title: e.itemTitle ?? "Saved professional",
          subtitle: e.itemType === "freelancer" ? "Freelancer" : e.itemType,
          image: e.itemImage ?? null,
          url: e.itemUrl ?? "/saved"
        }))
      };
    }
  });
export { getChartData, getCombined, getOverview, getRecentOrders, getStats };
