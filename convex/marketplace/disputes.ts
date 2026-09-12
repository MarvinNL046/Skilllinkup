// Reconciled with the existing development deployment (2026-09-07).
import { requireLivePaymentsEnabled } from "../lib/paymentPolicy";
import { internal } from "../_generated/api";
import { query } from "../_generated/server";
import { mutation } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";
import { requireAdmin } from "../lib/authHelpers";
import { requireServerSecret } from "../lib/authHelpers";
import { finishLinkedWork } from "../lib/orderLifecycle";
import { notifyUser } from "../lib/notifications";
import { disputeReasonValidator } from "../lib/marketplaceState";
import { disputeStatusValidator } from "../lib/marketplaceState";
import { disputeResolutionValidator } from "../lib/marketplaceState";
import { v } from "convex/values";
var list = query({
    args: {
      status: v.optional(disputeStatusValidator)
    },
    handler: async (ctx, args) => {
      await requireAdmin(ctx);
      let d;
      return args.status ? d = await ctx.db.query("disputes").withIndex("by_status", r => r.eq("status", args.status)).order("desc").take(250) : d = await ctx.db.query("disputes").order("desc").take(250), d;
    }
  }),
  getByOrder = query({
    args: {
      orderId: v.id("orders")
    },
    handler: async (ctx, args) => {
      let d = await requireAuthUser(ctx),
        r = await ctx.db.get(args.orderId);
      if (!r) return null;
      let s = r.freelancerId ? await ctx.db.get(r.freelancerId) : null,
        a = r.clientId === d._id || s?.userId === d._id;
      if (d.role !== "admin" && !a) throw new Error("Unauthorized.");
      return (await ctx.db.query("disputes").withIndex("by_order", l => l.eq("orderId", args.orderId)).first()) ?? null;
    }
  }),
  open = mutation({
    args: {
      orderId: v.id("orders"),
      reason: disputeReasonValidator,
      description: v.string(),
      evidence: v.optional(v.array(v.any())),
      serverSecret: v.optional(v.string()),
      openedByUserId: v.optional(v.id("users"))
    },
    returns: v.id("disputes"),
    handler: async (ctx, args) => {
      let d = await ctx.db.get(args.orderId);
      if (!d) throw new Error("Order not found.");
      if (!["active", "in_progress", "delivered", "revision_requested", "completed"].includes(d.status)) throw new Error("This order cannot be disputed in its current state.");
      let r = args.description.trim();
      if (r.length < 20 || r.length > 5e3) throw new Error("Describe the issue in 20 to 5,000 characters.");
      let s = d.freelancerId ? await ctx.db.get(d.freelancerId) : null,
        a = i => d.clientId === i || s?.userId === i,
        n = d.clientId;
      if (args.serverSecret) {
        if (requireServerSecret(args.serverSecret), n = args.openedByUserId ?? d.clientId, !a(n)) throw new Error("Unauthorized.");
      } else {
        let i = await requireAuthUser(ctx);
        if (!a(i._id)) throw new Error("Unauthorized.");
        n = i._id;
      }
      if (await ctx.db.query("disputes").withIndex("by_order", i => i.eq("orderId", args.orderId)).first()) throw new Error("A dispute already exists for this order.");
      let p = d.tenantId;
      if (!p) {
        let i = await ctx.db.query("tenants").first();
        if (!i) throw new Error("No tenant found \u2014 run data migration first");
        p = i._id;
      }
      let c = Date.now(),
        q = await ctx.db.insert("disputes", {
          tenantId: p,
          orderId: args.orderId,
          openedBy: n,
          reason: args.reason,
          description: r,
          evidence: args.evidence,
          status: "open",
          openedAt: c,
          createdAt: c,
          updatedAt: c
        }),
        m = await ctx.db.get(args.orderId);
      return m?.autoReleaseJobId && (await ctx.scheduler.cancel(m.autoReleaseJobId)), await ctx.db.patch(args.orderId, {
        status: "disputed",
        escrowStatus: d.escrowStatus === "beta_no_payment" ? "beta_no_payment" : "disputed",
        autoReleaseJobId: void 0,
        updatedAt: c
      }), q;
    }
  }),
  resolve = mutation({
    args: {
      disputeId: v.id("disputes"),
      resolution: disputeResolutionValidator,
      resolutionNote: v.string()
    },
    returns: v.object({
      success: v.boolean(),
      disputeId: v.id("disputes")
    }),
    handler: async (ctx, args) => {
      let d = await requireAdmin(ctx),
        r = await ctx.db.get(args.disputeId);
      if (!r) throw new Error("Dispute not found.");
      if (r.tenantId !== d.tenantId) throw new Error("This dispute belongs to another workspace.");
      if (r.status === "resolved" || r.status === "closed") throw new Error("This dispute has already been resolved or closed.");
      let s = Date.now(),
        a = args.resolutionNote.trim();
      if (a.length < 10 || a.length > 5e3) throw new Error("Add a resolution note between 10 and 5,000 characters.");
      if (!r.orderId) throw new Error("The dispute is not linked to an order.");
      let n = await ctx.db.get(r.orderId);
      if (!n) throw new Error("Order not found.");
      if (n.tenantId !== r.tenantId || n.status !== "disputed") throw new Error("The dispute and order are not in a consistent state.");
      if (n.escrowStatus !== "beta_no_payment" && requireLivePaymentsEnabled("Resolving a paid-order dispute"), await ctx.db.patch(args.disputeId, {
        resolution: args.resolution,
        resolutionNote: a,
        resolvedBy: d._id,
        status: "resolved",
        resolvedAt: s,
        updatedAt: s
      }), await ctx.db.insert("moderationAuditEvents", {
        tenantId: r.tenantId,
        actorId: d._id,
        action: "order_dispute_resolved",
        targetType: "dispute",
        targetId: r._id,
        fromStatus: r.status,
        toStatus: "resolved",
        note: a,
        createdAt: s
      }), n.escrowStatus === "beta_no_payment") {
        let l: "completed" | "cancelled" = args.resolution === "freelancer_wins" ? "completed" : "cancelled";
        await finishLinkedWork(ctx, n, l, s, { disputeResolution: true });
        await ctx.db.patch(n._id, {
          status: l,
          escrowStatus: "beta_no_payment",
          ...(l === "completed" ? {
            completedAt: s
          } : {
            cancelledAt: s
          }),
          updatedAt: s
        });
        const provider = n.freelancerId ? await ctx.db.get(n.freelancerId) : null;
        for (const userId of new Set([n.clientId, provider?.userId].filter(Boolean))) {
          await notifyUser(ctx, { userId, type: "order_dispute_resolved", title: "Order dispute resolved", body: `Support resolved the dispute for ${n.title}. The order is ${l}.`, link: `/orders/${n._id}`, metadata: { orderId: n._id, disputeId: r._id, status: l } });
        }
      } else args.resolution === "freelancer_wins" ? await ctx.scheduler.runAfter(0, internal.marketplace.escrow.releaseToFreelancer, {
        orderId: r.orderId
      }) : args.resolution === "client_wins" && (await ctx.scheduler.runAfter(0, internal.marketplace.escrow.refundToClient, {
        orderId: r.orderId
      }));
      return {
        success: !0,
        disputeId: args.disputeId
      };
    }
  });
export { getByOrder, list, open, resolve };
