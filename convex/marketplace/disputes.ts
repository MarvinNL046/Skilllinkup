import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

/**
 * List disputes, optionally filtered by status.
 * Sorted by createdAt DESC.
 */
export const list = query({
  args: {
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
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
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required to open a dispute.");
    }

    // Resolve current user by email
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();

    if (!currentUser) {
      throw new Error("User not found in database.");
    }

    // Verify the order exists
    const order = await ctx.db.get(args.orderId);
    if (!order) {
      throw new Error("Order not found.");
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
      openedBy: currentUser._id,
      reason: args.reason,
      description: args.description,
      evidence: args.evidence,
      status: "open",
      openedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    // Update the order status to "disputed"
    await ctx.db.patch(args.orderId, {
      status: "disputed",
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
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Authentication required to resolve a dispute.");
    }

    // Resolve current user by email (admin check)
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();

    if (!currentUser) {
      throw new Error("User not found in database.");
    }

    // Only admins can resolve disputes
    if (currentUser.role !== "admin") {
      throw new Error("Only administrators can resolve disputes.");
    }

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

    return { success: true, disputeId: args.disputeId };
  },
});
