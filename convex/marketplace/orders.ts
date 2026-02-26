import { v } from "convex/values";
import { query, mutation } from "../_generated/server";
import { internal } from "../_generated/api";
import { Doc } from "../_generated/dataModel";

/**
 * Calculate the platform fee based on the order amount.
 * - < $50:   15%
 * - $50-500: 12%
 * - > $500:  10%
 */
function calculatePlatformFee(amount: number): number {
  if (amount < 50) return Math.round(amount * 0.15 * 100) / 100;
  else if (amount <= 500) return Math.round(amount * 0.12 * 100) / 100;
  else return Math.round(amount * 0.10 * 100) / 100;
}

/**
 * Generate a unique order number in the format ORD-YYYYMMDD-XXXXXX.
 */
function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${year}${month}${day}-${random}`;
}

/**
 * Create a new order.
 * Calculates platform fee and freelancer earnings automatically.
 * Requires authentication.
 */
export const create = mutation({
  args: {
    orderType: v.string(),
    title: v.string(),
    amount: v.number(),
    currency: v.optional(v.string()),
    deliveryDays: v.number(),
    clientId: v.id("users"),
    freelancerId: v.id("freelancerProfiles"),
    gigId: v.optional(v.id("gigs")),
    projectId: v.optional(v.id("projects")),
    gigPackageId: v.optional(v.id("gigPackages")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Get the default tenant
    const tenant = await ctx.db.query("tenants").first();
    if (!tenant) throw new Error("No tenant found");

    const platformFee = calculatePlatformFee(args.amount);
    const freelancerEarnings = Math.round((args.amount - platformFee) * 100) / 100;

    const deliveryDeadline = Date.now() + args.deliveryDays * 24 * 60 * 60 * 1000;
    const now = Date.now();

    const orderId = await ctx.db.insert("orders", {
      tenantId: tenant._id,
      orderNumber: generateOrderNumber(),
      orderType: args.orderType,
      clientId: args.clientId,
      freelancerId: args.freelancerId,
      gigId: args.gigId,
      projectId: args.projectId,
      gigPackageId: args.gigPackageId,
      title: args.title,
      amount: args.amount,
      platformFee,
      freelancerEarnings,
      currency: args.currency ?? "EUR",
      deliveryDeadline,
      revisionsUsed: 0,
      status: "pending",
      escrowStatus: "held",
      createdAt: now,
      updatedAt: now,
    });

    // Fetch user data for emails
    const client = await ctx.db.get(args.clientId);
    const freelancerProfile = await ctx.db.get(args.freelancerId);
    const freelancerUser = freelancerProfile ? await ctx.db.get(freelancerProfile.userId) : null;

    const order = await ctx.db.get(orderId);

    // Send order confirmation to client
    if (client?.email) {
      await ctx.scheduler.runAfter(0, internal.lib.email.sendOrderConfirmation, {
        clientEmail: client.email,
        clientName: client.name || "Customer",
        orderNumber: order!.orderNumber,
        orderTitle: args.title,
        amount: args.amount,
        currency: args.currency ?? "EUR",
        deliveryDays: args.deliveryDays,
        orderId: orderId,
      });
    }

    // Send new order notification to freelancer
    if (freelancerUser?.email) {
      await ctx.scheduler.runAfter(0, internal.lib.email.sendNewOrderNotification, {
        freelancerEmail: freelancerUser.email,
        freelancerName: freelancerProfile?.displayName || freelancerUser.name || "Freelancer",
        orderNumber: order!.orderNumber,
        orderTitle: args.title,
        amount: args.amount - platformFee,
        currency: args.currency ?? "EUR",
        deliveryDays: args.deliveryDays,
        orderId: orderId,
      });
    }

    return orderId;
  },
});

/**
 * Get an order by its Stripe PaymentIntent ID.
 * Used for idempotency in the webhook handler.
 */
export const getByStripePaymentIntentId = query({
  args: { stripePaymentIntentId: v.string() },
  handler: async (ctx, args) => {
    // No index on stripePaymentIntentId — full table scan is acceptable
    // since this is only called from the webhook and idempotency is rare.
    const orders = await ctx.db.query("orders").collect();
    return orders.find((o) => o.stripePaymentIntentId === args.stripePaymentIntentId) ?? null;
  },
});

/**
 * Update an order with Stripe payment data after a successful payment.
 * Sets stripePaymentIntentId, escrowStatus, status, and requirements.
 */
export const updateStripePayment = mutation({
  args: {
    orderId: v.id("orders"),
    stripePaymentIntentId: v.string(),
    requirements: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, {
      stripePaymentIntentId: args.stripePaymentIntentId,
      escrowStatus: "held",
      status: "in_progress",
      requirements: args.requirements,
      updatedAt: Date.now(),
    });
    return args.orderId;
  },
});

/**
 * Create a transaction record for a completed payment.
 */
export const createTransaction = mutation({
  args: {
    orderId: v.id("orders"),
    payerId: v.optional(v.id("users")),
    payeeId: v.optional(v.id("users")),
    amount: v.number(),
    platformFee: v.optional(v.number()),
    currency: v.string(),
    stripePaymentIntentId: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Look up the tenant from the order
    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Order not found");

    const now = Date.now();

    const transactionId = await ctx.db.insert("transactions", {
      tenantId: order.tenantId,
      orderId: args.orderId,
      payerId: args.payerId,
      payeeId: args.payeeId,
      amount: args.amount,
      platformFee: args.platformFee,
      currency: args.currency,
      transactionType: "payment",
      stripePaymentIntentId: args.stripePaymentIntentId,
      status: "completed",
      description: args.description,
      createdAt: now,
      updatedAt: now,
    });

    return transactionId;
  },
});

/**
 * Get orders for a user as either client or freelancer.
 * Enriches each order with client and freelancer display names.
 */
export const getByUser = query({
  args: {
    userId: v.id("users"),
    role: v.union(v.literal("client"), v.literal("freelancer")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 20;

    let orders: Doc<"orders">[];
    if (args.role === "client") {
      orders = await ctx.db
        .query("orders")
        .withIndex("by_client", (q) => q.eq("clientId", args.userId))
        .order("desc")
        .take(limit);
    } else {
      // For freelancer role we need to match the freelancerProfiles id.
      // Fetch the freelancer profile for this user first.
      const profile = await ctx.db
        .query("freelancerProfiles")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .first();

      if (!profile) return [];

      orders = await ctx.db
        .query("orders")
        .withIndex("by_freelancer", (q) => q.eq("freelancerId", profile._id))
        .order("desc")
        .take(limit);
    }

    // Enrich with names
    const enriched = await Promise.all(
      orders.map(async (order) => {
        const client = order.clientId ? await ctx.db.get(order.clientId) : null;
        const freelancerProfile = order.freelancerId
          ? await ctx.db.get(order.freelancerId)
          : null;
        const freelancerUser = freelancerProfile
          ? await ctx.db.get(freelancerProfile.userId)
          : null;

        return {
          ...order,
          clientName: client?.name ?? null,
          freelancerName: freelancerProfile?.displayName ?? freelancerUser?.name ?? null,
          freelancerUserId: freelancerProfile?.userId ?? null,
        };
      })
    );

    return enriched;
  },
});

/**
 * Get a single order by ID.
 * The requesting user must be the client or freelancer on the order.
 */
export const getById = query({
  args: {
    orderId: v.id("orders"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const order = await ctx.db.get(args.orderId);
    if (!order) return null;

    // Verify the requester is the client or freelancer on this order
    const requestingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();

    if (!requestingUser) throw new Error("User not found");

    const freelancerProfile = order.freelancerId
      ? await ctx.db.get(order.freelancerId)
      : null;

    const isClient = order.clientId === requestingUser._id;
    const isFreelancer = freelancerProfile?.userId === requestingUser._id;

    if (!isClient && !isFreelancer) {
      throw new Error("Access denied: you are not a party to this order");
    }

    const client = order.clientId ? await ctx.db.get(order.clientId) : null;
    const freelancerUser = freelancerProfile
      ? await ctx.db.get(freelancerProfile.userId)
      : null;

    return {
      ...order,
      clientName: client?.name ?? null,
      freelancerName: freelancerProfile?.displayName ?? freelancerUser?.name ?? null,
      freelancerUserId: freelancerProfile?.userId ?? null,
    };
  },
});

/**
 * Freelancer marks an order as delivered.
 * Requires authentication and the caller must be the freelancer on the order.
 */
export const deliver = mutation({
  args: {
    orderId: v.id("orders"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Order not found");

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!user) throw new Error("User not found");

    // Verify caller is the freelancer
    const freelancerProfile = order.freelancerId
      ? await ctx.db.get(order.freelancerId)
      : null;
    if (!freelancerProfile || freelancerProfile.userId !== user._id) {
      throw new Error("Access denied: only the freelancer can deliver this order");
    }

    await ctx.db.patch(args.orderId, {
      status: "delivered",
      updatedAt: Date.now(),
    });

    // Send delivery notification to client
    const client = await ctx.db.get(order.clientId);
    if (client?.email) {
      await ctx.scheduler.runAfter(0, internal.lib.email.sendOrderDelivered, {
        clientEmail: client.email,
        clientName: client.name || "Customer",
        orderNumber: order.orderNumber,
        orderTitle: order.title,
        orderId: args.orderId,
      });
    }

    return { success: true };
  },
});

/**
 * Client approves the delivery.
 * Sets status to "completed" and escrowStatus to "released".
 * Requires authentication and the caller must be the client on the order.
 */
export const approve = mutation({
  args: {
    orderId: v.id("orders"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Order not found");

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!user) throw new Error("User not found");

    if (order.clientId !== user._id) {
      throw new Error("Access denied: only the client can approve this order");
    }

    const now = Date.now();
    await ctx.db.patch(args.orderId, {
      status: "completed",
      escrowStatus: "released",
      completedAt: now,
      updatedAt: now,
    });

    // Send completion notification to freelancer
    const freelancerProfile = order.freelancerId ? await ctx.db.get(order.freelancerId) : null;
    const freelancerUser = freelancerProfile ? await ctx.db.get(freelancerProfile.userId) : null;
    if (freelancerUser?.email) {
      await ctx.scheduler.runAfter(0, internal.lib.email.sendOrderCompleted, {
        freelancerEmail: freelancerUser.email,
        freelancerName: freelancerProfile?.displayName || freelancerUser.name || "Freelancer",
        orderNumber: order.orderNumber,
        orderTitle: order.title,
        amount: order.freelancerEarnings ?? order.amount,
        currency: order.currency ?? "EUR",
        orderId: args.orderId,
      });
    }

    return { success: true };
  },
});

/**
 * Client requests a revision on a delivered order.
 * Increments revisionsUsed and sets status to "revision_requested".
 * Requires authentication and the caller must be the client on the order.
 */
export const requestRevision = mutation({
  args: {
    orderId: v.id("orders"),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Order not found");

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity.email!))
      .first();
    if (!user) throw new Error("User not found");

    if (order.clientId !== user._id) {
      throw new Error("Access denied: only the client can request a revision");
    }

    const revisionsUsed = (order.revisionsUsed ?? 0) + 1;

    await ctx.db.patch(args.orderId, {
      status: "revision_requested",
      revisionsUsed,
      updatedAt: Date.now(),
    });

    return { success: true, revisionsUsed };
  },
});
