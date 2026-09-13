import { v, ConvexError } from "convex/values";
import { query } from "../_generated/server";
import { requireAuthUser, getProviderProfile } from "../lib/authHelpers";
import { hasCompletedMarketplaceContext } from "../lib/marketplaceState";
import type { Id } from "../_generated/dataModel";

type Cursor = { phase: number; page: string | null; projectId?: Id<"projects">; projectCursor?: string; projectDone?: boolean };
const emptyCounts = () => ({ activeProjects: 0, newProposals: 0, unreadMessages: 0 });
const active = new Set(["pending", "active", "in_progress", "delivered", "revision_requested"]);

// Small reactive chunks provide exact totals without using the dashboard's
// preview arrays or loading an account's entire history in one transaction.
export const chunk = query({
  args: { cursor: v.union(v.string(), v.null()), contextKey: v.string() },
  returns: v.object({
    counts: v.object({ activeProjects: v.number(), newProposals: v.number(), unreadMessages: v.number() }),
    orderValues: v.optional(v.array(v.object({ currency: v.string(), cents: v.number(), orders: v.number() }))),
    nextCursor: v.union(v.string(), v.null()),
  }),
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    if (!user.activeRole || !user.preferredWorld || !hasCompletedMarketplaceContext(user, user.activeRole, user.preferredWorld)) throw new ConvexError("Complete onboarding first.");
    const currentKey = [user._id, user.activeRole, user.preferredWorld].join(":");
    if (args.contextKey !== currentKey) return { counts: emptyCounts(), nextCursor: null };
    if (user.preferredWorld !== "online" || !["client", "freelancer"].includes(user.activeRole)) return { counts: emptyCounts(), nextCursor: null };
    let cursor: Cursor = { phase: 0, page: null };
    if (args.cursor) {
      try { cursor = JSON.parse(args.cursor); } catch { throw new ConvexError("Invalid dashboard cursor."); }
      if (!Number.isInteger(cursor.phase) || cursor.phase < 0 || cursor.phase > 4
        || !(cursor.page === null || typeof cursor.page === "string")
        || (cursor.phase === 4 && (typeof cursor.projectId !== "string" || typeof cursor.projectCursor !== "string" || typeof cursor.projectDone !== "boolean"))) throw new ConvexError("Invalid dashboard cursor.");
    }
    const counts = emptyCounts();
    const provider = ["freelancer", "local_professional"].includes(user.activeRole);
    const profile = provider ? await getProviderProfile(ctx, user._id, user.activeRole === "local_professional" ? "local_professional" : "freelancer") : null;
    const advance = (phase: number): string | null => phase > 3 ? null : JSON.stringify({ phase, page: null });
    const next = (result: { isDone: boolean; continueCursor: string }) => result.isDone
      ? advance(cursor.phase + 1)
      : JSON.stringify({ ...cursor, page: result.continueCursor });
    if (cursor.phase === 0) {
      if (provider && !profile) return { counts, nextCursor: advance(1) };
      const source = provider
        ? ctx.db.query("orders").withIndex("by_freelancer", (q) => q.eq("freelancerId", profile!._id))
        : ctx.db.query("orders").withIndex("by_client", (q) => q.eq("clientId", user._id));
      const result = await source.paginate({ cursor: cursor.page, numItems: 100 });
      const values = new Map<string, { currency: string; cents: number; orders: number }>();
      for (const order of result.page) {
        if (!["gig", "project"].includes(order.orderType) ||
          !(active.has(order.status) || order.status === "completed")) continue;
        const currency = (order.currency ?? "EUR").toUpperCase();
        const value = values.get(currency) ?? { currency, cents: 0, orders: 0 };
        value.cents += Math.round(order.amount * 100);
        value.orders++;
        values.set(currency, value);
      }
      for (const order of result.page) if (active.has(order.status) && ["gig", "project"].includes(order.orderType)) {
        counts.activeProjects++;
      }
      return { counts, orderValues: [...values.values()], nextCursor: next(result) };
    }
    if (cursor.phase === 1 || cursor.phase === 2) {
      const first = cursor.phase === 1;
      const source = first
        ? ctx.db.query("conversations").withIndex("by_participant1", (q) => q.eq("participant1", user._id))
        : ctx.db.query("conversations").withIndex("by_participant2", (q) => q.eq("participant2", user._id));
      const result = await source.paginate({ cursor: cursor.page, numItems: 100 });
      counts.unreadMessages = result.page.reduce((sum, conversation) => sum + (first ? conversation.unreadCount1 ?? 0 : conversation.unreadCount2 ?? 0), 0);
      return { counts, nextCursor: next(result) };
    }
    if (provider && cursor.phase === 3) {
      if (!profile) return { counts, nextCursor: null };
      const result = await ctx.db.query("bids").withIndex("by_freelancer_status", (q) => q.eq("freelancerId", profile._id).eq("status", "pending"))
        .paginate({ cursor: cursor.page, numItems: 100 });
      counts.newProposals = result.page.length;
      return { counts, nextCursor: next(result) };
    }
    if (provider) throw new ConvexError("Invalid dashboard cursor.");
    if (cursor.phase === 3) {
      const result = await ctx.db.query("projects").withIndex("by_client", (q) => q.eq("clientId", user._id))
        .order("asc").paginate({ cursor: cursor.page, numItems: 1 });
      const project = result.page[0];
      if (!project) return { counts, nextCursor: result.isDone ? null : JSON.stringify({ phase: 3, page: result.continueCursor }) };
      return { counts, nextCursor: JSON.stringify({ phase: 4, page: null, projectId: project._id,
        projectCursor: result.continueCursor, projectDone: result.isDone }) };
    }
    const project = await ctx.db.get(cursor.projectId!);
    // A live cursor can outlast its project. Advance over the missing record,
    // while preserving ownership checks for every record that still exists.
    if (!project) return { counts, nextCursor: cursor.projectDone ? null : JSON.stringify({ phase: 3, page: cursor.projectCursor }) };
    if (project.clientId !== user._id) throw new ConvexError("Project scope is not available.");
    const result = await ctx.db.query("bids").withIndex("by_project_status", (q) => q.eq("projectId", project._id).eq("status", "pending"))
      .paginate({ cursor: cursor.page, numItems: 100 });
    counts.newProposals = result.page.length;
    return { counts, nextCursor: result.isDone
      ? (cursor.projectDone ? null : JSON.stringify({ phase: 3, page: cursor.projectCursor }))
      : JSON.stringify({ ...cursor, page: result.continueCursor }) };
  },
});
