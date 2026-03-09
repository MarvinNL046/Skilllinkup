import { v } from "convex/values";
import { query, mutation, internalQuery, internalMutation } from "../_generated/server";
import { internal } from "../_generated/api";
import { Doc, Id } from "../_generated/dataModel";
import { requireOwner, requireServerSecret } from "../lib/authHelpers";

/**
 * Calculate the platform fee based on the order amount.
 *
 * IMPORTANT: Fee tiers must match src/app/api/stripe/checkout/route.js:calculateApplicationFeeAmountCents
 * Tiers: <$50 → 15%, $50-500 → 12%, >$500 → 10%
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
    serverSecret: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!["gig", "project"].includes(args.orderType)) {
      throw new Error("Unsupported order type.");
    }
    if (args.gigId && args.projectId) {
      throw new Error("Order cannot reference both a gig and a project.");
    }
    if (args.serverSecret) {
      requireServerSecret(args.serverSecret);
    } else {
      await requireOwner(ctx, args.clientId);
    }

    const freelancerProfile = await ctx.db.get(args.freelancerId);
    if (!freelancerProfile) throw new Error("Freelancer profile not found");
    if (freelancerProfile.userId === args.clientId) {
      throw new Error("You cannot create an order for yourself.");
    }

    let title = args.title;
    let amount = args.amount;
    let currency = args.currency ?? "EUR";
    let deliveryDays = args.deliveryDays;

    if (args.orderType === "gig" && (!args.gigId || !args.gigPackageId)) {
      throw new Error("Gig orders require both gigId and gigPackageId.");
    }
    if (args.orderType === "project" && !args.projectId) {
      throw new Error("Project orders require a projectId.");
    }

    const hasGigArgs = !!args.gigId || !!args.gigPackageId;
    if (hasGigArgs) {
      if (!args.gigId || !args.gigPackageId) {
        throw new Error("Gig orders require both gigId and gigPackageId.");
      }

      const gig = await ctx.db.get(args.gigId);
      if (!gig) throw new Error("Gig not found");
      if (gig.freelancerId !== args.freelancerId) {
        throw new Error("Unauthorized.");
      }

      const gigPackage = await ctx.db.get(args.gigPackageId);
      if (!gigPackage) throw new Error("Gig package not found");
      if (gigPackage.gigId !== args.gigId) {
        throw new Error("Unauthorized.");
      }

      title = `${gig.title} - ${gigPackage.title}`;
      amount = gigPackage.price;
      currency = gigPackage.currency ?? currency;
      deliveryDays = gigPackage.deliveryDays;
    }

    if (args.projectId) {
      const project = await ctx.db.get(args.projectId);
      if (!project) throw new Error("Project not found");
      if (project.clientId !== args.clientId) {
        throw new Error("Unauthorized.");
      }
      if (!project.selectedFreelancerId) {
        throw new Error("Project order cannot be created before a freelancer is selected.");
      }
      if (project.selectedFreelancerId !== args.freelancerId) {
        throw new Error("Unauthorized.");
      }

      title = project.title;
      currency = project.currency ?? currency;
    }

    // Get the default tenant
    const tenant = await ctx.db.query("tenants").first();
    if (!tenant) throw new Error("No tenant found");

    const platformFee = calculatePlatformFee(amount);
    const freelancerEarnings = Math.round((amount - platformFee) * 100) / 100;

    const deliveryDeadline = Date.now() + deliveryDays * 24 * 60 * 60 * 1000;
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
      title,
      amount,
      platformFee,
      freelancerEarnings,
      currency,
      deliveryDeadline,
      revisionsUsed: 0,
      status: "pending",
      escrowStatus: "held",
      createdAt: now,
      updatedAt: now,
    });

    // Fetch user data for emails
    const client = await ctx.db.get(args.clientId);
    const freelancerUser = freelancerProfile ? await ctx.db.get(freelancerProfile.userId) : null;

    const order = await ctx.db.get(orderId);

    // Send order confirmation to client
    if (client?.email) {
      await ctx.scheduler.runAfter(0, internal.lib.email.sendOrderConfirmation, {
        clientEmail: client.email,
        clientName: client.name || "Customer",
        orderNumber: order!.orderNumber,
        orderTitle: title,
        amount,
        currency,
        deliveryDays,
        orderId: orderId,
      });
    }

    // Send new order notification to freelancer
    if (freelancerUser?.email) {
      await ctx.scheduler.runAfter(0, internal.lib.email.sendNewOrderNotification, {
        freelancerEmail: freelancerUser.email,
        freelancerName: freelancerProfile?.displayName || freelancerUser.name || "Freelancer",
        orderNumber: order!.orderNumber,
        orderTitle: title,
        amount: amount - platformFee,
        currency,
        deliveryDays,
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
  args: {
    stripePaymentIntentId: v.string(),
    serverSecret: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);
    const order = await ctx.db
      .query("orders")
      .withIndex("by_stripePaymentIntentId", (q) =>
        q.eq("stripePaymentIntentId", args.stripePaymentIntentId)
      )
      .first();
    return order ?? null;
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
    serverSecret: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);
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
    serverSecret: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);
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
    await requireOwner(ctx, args.userId);

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

    // Batch load unique clients
    const clientIds = [...new Set(orders.map((o) => o.clientId).filter(Boolean))] as Id<"users">[];

    // Batch load unique freelancer profiles
    const freelancerProfileIds = [...new Set(
      orders.map((o) => o.freelancerId).filter(Boolean)
    )] as Id<"freelancerProfiles">[];

    const [clients, freelancerProfiles] = await Promise.all([
      Promise.all(clientIds.map((id) => ctx.db.get(id))),
      Promise.all(freelancerProfileIds.map((id) => ctx.db.get(id))),
    ]);

    const clientMap = new Map(clients.filter(Boolean).map((c) => [c!._id, c!]));
    const profileMap = new Map(freelancerProfiles.filter(Boolean).map((p) => [p!._id, p!]));

    // Batch load unique user records for freelancer profiles
    const freelancerUserIds = [...new Set(
      freelancerProfiles.filter(Boolean).map((p) => p!.userId).filter(Boolean)
    )] as Id<"users">[];

    const freelancerUsers = await Promise.all(freelancerUserIds.map((id) => ctx.db.get(id)));
    const freelancerUserMap = new Map(freelancerUsers.filter(Boolean).map((u) => [u!._id, u!]));

    const enriched = orders.map((order) => {
      const client = clientMap.get(order.clientId);
      const freelancerProfile = order.freelancerId ? profileMap.get(order.freelancerId) : null;
      const freelancerUser = freelancerProfile ? freelancerUserMap.get(freelancerProfile.userId) : null;

      return {
        ...order,
        clientName: client?.name ?? null,
        freelancerName: freelancerProfile?.displayName ?? freelancerUser?.name ?? null,
        freelancerUserId: freelancerProfile?.userId ?? null,
      };
    });

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

    const [client, freelancerUser] = await Promise.all([
      ctx.db.get(order.clientId),
      freelancerProfile ? ctx.db.get(freelancerProfile.userId) : Promise.resolve(null),
    ]);

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

    // Schedule automatic escrow release after 7 days if client takes no action
    const releaseJobId = await ctx.scheduler.runAfter(
      7 * 24 * 60 * 60 * 1000, // 7 days in ms
      internal.marketplace.escrow.releaseToFreelancer,
      { orderId: args.orderId }
    );
    await ctx.db.patch(args.orderId, {
      autoReleaseJobId: releaseJobId,
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

    // Cancel the 7-day auto-release job — client approved before timeout
    if (order.autoReleaseJobId) {
      await ctx.scheduler.cancel(order.autoReleaseJobId);
    }

    const now = Date.now();
    // NOTE: escrowStatus is NOT set here — markReleased (called after Stripe transfer) will set it
    await ctx.db.patch(args.orderId, {
      status: "completed",
      completedAt: now,
      updatedAt: now,
      autoReleaseJobId: undefined,
    });

    // Trigger Stripe transfer — runs asynchronously after this mutation
    await ctx.scheduler.runAfter(0, internal.marketplace.escrow.releaseToFreelancer, {
      orderId: args.orderId,
    });

    // Schedule reward processing
    await ctx.scheduler.runAfter(0, internal.marketplace.rewards.processOrderCashback, {
      orderId: args.orderId,
    });

    if (order.freelancerId) {
      await ctx.scheduler.runAfter(0, internal.marketplace.rewards.recalculateFreelancerLevel, {
        freelancerProfileId: order.freelancerId,
      });
    }

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

/** Internal: fetch an order by ID without auth check (used by escrow actions). */
export const getByIdInternal = internalQuery({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => ctx.db.get(args.orderId),
});

/** Internal: mark order escrow as released after Stripe transfer. */
export const markReleased = internalMutation({
  args: {
    orderId: v.id("orders"),
    stripeTransferId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, {
      escrowStatus: "released",
      stripeTransferId: args.stripeTransferId,
      status: "completed",
      completedAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

/** Internal: mark order as refunded after Stripe refund. */
export const markRefunded = internalMutation({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, {
      escrowStatus: "refunded",
      status: "cancelled",
      cancelledAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});
