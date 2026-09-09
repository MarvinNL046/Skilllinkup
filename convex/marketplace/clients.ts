// Reconciled with the existing development deployment (2026-09-07).
import { toPublicClient } from "../lib/publicData";
import { query } from "../_generated/server";
import { hasCompletedMarketplaceContext } from "../lib/marketplaceState";
import { v } from "convex/values";
var list = query({
    args: {
      locale: v.optional(v.string()),
      limit: v.optional(v.number())
    },
    handler: async (ctx, args) => {
      let o = args.limit ?? 20;
      return (await ctx.db.query("users").take(1e4)).filter(t => (t.accountRoles ?? []).includes("client") && (hasCompletedMarketplaceContext(t, "client", "online") || hasCompletedMarketplaceContext(t, "client", "local"))).slice(0, Math.min(Math.max(o, 1), 100)).map(t => toPublicClient(t));
    },
    returns: v.array(v.union(v.null(), v.object({
      _id: v.id("users"),
      name: v.string(),
      avatar: v.union(v.string(), v.null()),
      bio: v.union(v.string(), v.null()),
      createdAt: v.number()
    })))
  }),
  getMarketplaceStats = query({
    args: {},
    returns: v.object({
      freelancers: v.number(),
      completedProjects: v.number(),
      clients: v.number(),
      countries: v.number()
    }),
    handler: async ctx => {
      let [s, o, a] = await Promise.all([ctx.db.query("freelancerProfiles").withIndex("by_status", n => n.eq("status", "active")).take(1e4), ctx.db.query("orders").withIndex("by_status", n => n.eq("status", "completed")).take(1e4), ctx.db.query("users").take(1e4)]),
        u = a.filter(n => (n.accountRoles ?? []).includes("client") && (hasCompletedMarketplaceContext(n, "client", "online") || hasCompletedMarketplaceContext(n, "client", "local"))).length,
        t = s.length,
        d = o.length;
      return {
        freelancers: t,
        completedProjects: d,
        clients: u,
        countries: 5
      };
    }
  });
export { getMarketplaceStats, list };
