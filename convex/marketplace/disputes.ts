import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { internal } from "../_generated/api";
import { requireAdmin, requireAuthUser, requireServerSecret } from "../lib/authHelpers";

/**
 * List disputes, optionally filtered by status.
 * Sorted by createdAt DESC.
 */
export const list = query({
  args: {
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    let disputes;

    if (args.status) {
      disputes = await ctx.db
        .query("disputes")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .collect();
    } else {
      disputes = await ctx.db
        .query("disputes")
        .order("desc")
        .collect();
    }

    return disputes;
  },
});

/**
 * Get the dispute for a specific order.
 * Returns null if no dispute exists for the order.
 */
export const getByOrder = query({
  args: {
    orderId: v.id("orders"),
  },
  handler: async (ctx, args) => {
    const currentUser = await requireAuthUser(ctx);
    const order = await ctx.db.get(args.orderId);
    if (!order) return null;

    const freelancerProfile = order.freelancerId
      ? await ctx.db.get(order.freelancerId)
      : null;
    const isOrderParty =
      order.clientId === currentUser._id ||
      freelancerProfile?.userId === currentUser._id;

    if (currentUser.role !== "admin" && !isOrderParty) {
      throw new Error("Unauthorized.");
    }

    const dispute = await ctx.db
      .query("disputes")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .first();

    return dispute ?? null;
  },
});

/**
 * Open a dispute for an order. Authentication required.
 * Args: orderId, reason, description, optional evidence array.
 */
export const open = mutation({
  args: {
    orderId: v.id("orders"),
    reason: v.string(),
    description: v.string(),
    evidence: v.optional(v.array(v.any())),
    serverSecret: v.optional(v.string()),
    openedByUserId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    // Verify the order exists
    const order = await ctx.db.get(args.orderId);
    if (!order) {
      throw new Error("Order not found.");
    }

    const freelancerProfile = order.freelancerId
      ? await ctx.db.get(order.freelancerId)
      : null;
    const isOrderParty = (userId: typeof order.clientId) =>
      order.clientId === userId || freelancerProfile?.userId === userId;

    let openedBy = order.clientId;
    if (args.serverSecret) {
      requireServerSecret(args.serverSecret);
      openedBy = args.openedByUserId ?? order.clientId;
      if (!isOrderParty(openedBy)) {
        throw new Error("Unauthorized.");
      }
    } else {
      const currentUser = await requireAuthUser(ctx);
      if (!isOrderParty(currentUser._id)) {
        throw new Error("Unauthorized.");
      }
      openedBy = currentUser._id;
    }

    // Check if a dispute already exists for this order
    const existingDispute = await ctx.db
      .query("disputes")
      .withIndex("by_order", (q) => q.eq("orderId", args.orderId))
      .first();

    if (existingDispute) {
      throw new Error("A dispute already exists for this order.");
    }

    // Get tenantId from the order or fall back to first tenant
    let tenantId = order.tenantId;
    if (!tenantId) {
      const tenant = await ctx.db.query("tenants").first();
      if (!tenant) {
        throw new Error("No tenant found — run data migration first");
      }
      tenantId = tenant._id;
    }

    const now = Date.now();

    const disputeId = await ctx.db.insert("disputes", {
      tenantId,
      orderId: args.orderId,
      openedBy,
      reason: args.reason,
      description: args.description,
      evidence: args.evidence,
      status: "open",
      openedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    // Cancel auto-release so funds aren't paid out during an active dispute
    const disputedOrder = await ctx.db.get(args.orderId);
    if (disputedOrder?.autoReleaseJobId) {
      await ctx.scheduler.cancel(disputedOrder.autoReleaseJobId);
    }

    // Update the order status to "disputed" and freeze escrow
    await ctx.db.patch(args.orderId, {
      status: "disputed",
      escrowStatus: "disputed",
      autoReleaseJobId: undefined,
      updatedAt: now,
    });

    return disputeId;
  },
});

/**
 * Resolve a dispute. Admin-level action.
 * Args: disputeId, resolution, resolutionNote.
 */
export const resolve = mutation({
  args: {
    disputeId: v.id("disputes"),
    resolution: v.string(),
    resolutionNote: v.string(),
  },
  handler: async (ctx, args) => {
    const currentUser = await requireAdmin(ctx);

    // Get the dispute
    const dispute = await ctx.db.get(args.disputeId);
    if (!dispute) {
      throw new Error("Dispute not found.");
    }

    if (dispute.status === "resolved" || dispute.status === "closed") {
      throw new Error("This dispute has already been resolved or closed.");
    }

    const now = Date.now();

    await ctx.db.patch(args.disputeId, {
      resolution: args.resolution,
      resolutionNote: args.resolutionNote,
      resolvedBy: currentUser._id,
      status: "resolved",
      resolvedAt: now,
      updatedAt: now,
    });

    // Trigger Stripe action based on dispute resolution outcome
    if (args.resolution === "freelancer_wins") {
      await ctx.scheduler.runAfter(0, internal.marketplace.escrow.releaseToFreelancer, {
        orderId: dispute.orderId,
      });
    } else if (args.resolution === "client_wins") {
      await ctx.scheduler.runAfter(0, internal.marketplace.escrow.refundToClient, {
        orderId: dispute.orderId,
      });
    }

    return { success: true, disputeId: args.disputeId };
  },
});
