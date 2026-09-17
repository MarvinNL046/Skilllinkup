// Order disputes: opening by a participant (or the trusted server) and
// resolution by an admin. Readable source restored on 2026-09-17; behaviour is
// identical to the reconciled deployment version and is pinned by
// scripts/check-readable-convex.mjs.
import { v } from "convex/values";
import { internal } from "../_generated/api";
import { mutation, query } from "../_generated/server";
import {
  requireAdmin,
  requireAuthUser,
  requireServerSecret,
} from "../lib/authHelpers";
import {
  disputeReasonValidator,
  disputeResolutionValidator,
  disputeStatusValidator,
} from "../lib/marketplaceState";
import { notifyUser } from "../lib/notifications";
import { finishLinkedWork } from "../lib/orderLifecycle";
import { requireLivePaymentsEnabled } from "../lib/paymentPolicy";

const DISPUTABLE_ORDER_STATUSES = [
  "active",
  "in_progress",
  "delivered",
  "revision_requested",
  "completed",
];

/** Admin overview of disputes, newest first, optionally filtered by status. */
const list = query({
  args: {
    status: v.optional(disputeStatusValidator),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    if (args.status) {
      return await ctx.db
        .query("disputes")
        .withIndex("by_status", (q) => q.eq("status", args.status))
        .order("desc")
        .take(250);
    }
    return await ctx.db.query("disputes").order("desc").take(250);
  },
});

/** The dispute for one order, visible to its two participants and to admins. */
const getByOrder = query({
  args: {
    orderId: v.id("orders"),
  },
  handler: async (ctx, args) => {
    const user = await requireAuthUser(ctx);
    const order = await ctx.db.get(args.orderId);
    if (!order) return null;

    const provider = order.freelancerId
      ? await ctx.db.get(order.freelancerId)
      : null;
    const isParticipant =
      order.clientId === user._id || provider?.userId === user._id;
    if (user.role !== "admin" && !isParticipant) throw new Error("Unauthorized.");

    return (
      (await ctx.db
        .query("disputes")
        .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
        .first()) ?? null
    );
  },
});

/**
 * Open a dispute on an order. A signed-in participant opens it for themselves;
 * the trusted server may open it on behalf of a participant.
 */
const open = mutation({
  args: {
    orderId: v.id("orders"),
    reason: disputeReasonValidator,
    description: v.string(),
    evidence: v.optional(v.array(v.any())),
    serverSecret: v.optional(v.string()),
    openedByUserId: v.optional(v.id("users")),
  },
  returns: v.id("disputes"),
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Order not found.");
    if (!DISPUTABLE_ORDER_STATUSES.includes(order.status))
      throw new Error("This order cannot be disputed in its current state.");

    const description = args.description.trim();
    if (description.length < 20 || description.length > 5000)
      throw new Error("Describe the issue in 20 to 5,000 characters.");

    const provider = order.freelancerId
      ? await ctx.db.get(order.freelancerId)
      : null;
    const isParticipant = (userId: unknown) =>
      order.clientId === userId || provider?.userId === userId;

    let openedBy = order.clientId;
    if (args.serverSecret) {
      requireServerSecret(args.serverSecret);
      openedBy = args.openedByUserId ?? order.clientId;
      if (!isParticipant(openedBy)) throw new Error("Unauthorized.");
    } else {
      const caller = await requireAuthUser(ctx);
      if (!isParticipant(caller._id)) throw new Error("Unauthorized.");
      openedBy = caller._id;
    }

    const existing = await ctx.db
      .query("disputes")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .first();
    if (existing) throw new Error("A dispute already exists for this order.");

    let tenantId = order.tenantId;
    if (!tenantId) {
      const fallbackTenant = await ctx.db.query("tenants").first();
      if (!fallbackTenant)
        throw new Error("No tenant found — run data migration first");
      tenantId = fallbackTenant._id;
    }

    const now = Date.now();
    const disputeId = await ctx.db.insert("disputes", {
      tenantId,
      orderId: args.orderId,
      openedBy,
      reason: args.reason,
      description,
      evidence: args.evidence,
      status: "open",
      openedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    // A disputed order must not auto-release while support reviews it.
    const currentOrder = await ctx.db.get(args.orderId);
    if (currentOrder?.autoReleaseJobId)
      await ctx.scheduler.cancel(currentOrder.autoReleaseJobId);

    await ctx.db.patch(args.orderId, {
      status: "disputed",
      escrowStatus:
        order.escrowStatus === "beta_no_payment" ? "beta_no_payment" : "disputed",
      autoReleaseJobId: undefined,
      updatedAt: now,
    });
    return disputeId;
  },
});

/**
 * Record an admin decision. During the private beta no money moves: the order
 * and its linked work are closed as completed or cancelled and both parties are
 * notified. Paid orders require live payments and hand over to escrow.
 */
const resolve = mutation({
  args: {
    disputeId: v.id("disputes"),
    resolution: disputeResolutionValidator,
    resolutionNote: v.string(),
  },
  returns: v.object({
    success: v.boolean(),
    disputeId: v.id("disputes"),
  }),
  handler: async (ctx, args) => {
    const admin = await requireAdmin(ctx);
    const dispute = await ctx.db.get(args.disputeId);
    if (!dispute) throw new Error("Dispute not found.");
    if (dispute.tenantId !== admin.tenantId)
      throw new Error("This dispute belongs to another workspace.");
    if (dispute.status === "resolved" || dispute.status === "closed")
      throw new Error("This dispute has already been resolved or closed.");

    const now = Date.now();
    const note = args.resolutionNote.trim();
    if (note.length < 10 || note.length > 5000)
      throw new Error("Add a resolution note between 10 and 5,000 characters.");
    if (!dispute.orderId)
      throw new Error("The dispute is not linked to an order.");

    const order = await ctx.db.get(dispute.orderId);
    if (!order) throw new Error("Order not found.");
    if (order.tenantId !== dispute.tenantId || order.status !== "disputed")
      throw new Error("The dispute and order are not in a consistent state.");

    const isBetaOrder = order.escrowStatus === "beta_no_payment";
    if (!isBetaOrder)
      requireLivePaymentsEnabled("Resolving a paid-order dispute");

    await ctx.db.patch(args.disputeId, {
      resolution: args.resolution,
      resolutionNote: note,
      resolvedBy: admin._id,
      status: "resolved",
      resolvedAt: now,
      updatedAt: now,
    });
    await ctx.db.insert("moderationAuditEvents", {
      tenantId: dispute.tenantId,
      actorId: admin._id,
      action: "order_dispute_resolved",
      targetType: "dispute",
      targetId: dispute._id,
      fromStatus: dispute.status,
      toStatus: "resolved",
      note,
      createdAt: now,
    });

    if (isBetaOrder) {
      const outcome: "completed" | "cancelled" =
        args.resolution === "freelancer_wins" ? "completed" : "cancelled";
      await finishLinkedWork(ctx, order, outcome, now, {
        disputeResolution: true,
      });
      await ctx.db.patch(order._id, {
        status: outcome,
        escrowStatus: "beta_no_payment",
        ...(outcome === "completed"
          ? { completedAt: now }
          : { cancelledAt: now }),
        updatedAt: now,
      });

      const provider = order.freelancerId
        ? await ctx.db.get(order.freelancerId)
        : null;
      const participants = new Set(
        [order.clientId, provider?.userId].filter(Boolean),
      );
      for (const userId of participants) {
        await notifyUser(ctx, {
          userId,
          type: "order_dispute_resolved",
          title: "Order dispute resolved",
          body: `Support resolved the dispute for ${order.title}. The order is ${outcome}.`,
          link: `/orders/${order._id}`,
          metadata: { orderId: order._id, disputeId: dispute._id, status: outcome },
        });
      }
    } else if (args.resolution === "freelancer_wins") {
      await ctx.scheduler.runAfter(
        0,
        internal.marketplace.escrow.releaseToFreelancer,
        { orderId: dispute.orderId },
      );
    } else if (args.resolution === "client_wins") {
      await ctx.scheduler.runAfter(
        0,
        internal.marketplace.escrow.refundToClient,
        { orderId: dispute.orderId },
      );
    }

    return {
      success: true,
      disputeId: args.disputeId,
    };
  },
});

export { getByOrder, list, open, resolve };
