// Orders: creation, lookup, delivery, approval and revision, plus the Stripe
// reconciliation entry points that stay disabled during the free private beta.
// Readable source restored on 2026-09-19; behaviour is identical to the
// reconciled deployment version and is pinned by scripts/check-readable-convex.mjs.
import { v } from "convex/values";
import { internal } from "../_generated/api";
import type { Doc, Id } from "../_generated/dataModel";
import {
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "../_generated/server";
import type { MutationCtx } from "../_generated/server";
import {
  requireAuthUser,
  requireMarketplaceContext,
  requireOwner,
  requireServerSecret,
} from "../lib/authHelpers";
import {
  assertTransition,
  orderTransitions,
  orderTypeValidator,
  projectTransitions,
} from "../lib/marketplaceState";
import { notifyUser } from "../lib/notifications";
import {
  assertActiveOnlineProviderProfile,
  assertOnlineGig,
  assertOnlineMarketplaceCategory,
} from "../lib/onlineMarketplace";
import {
  assertOrderNotDisputed,
  finishLinkedWork,
  remainingRevisions,
  requireBetaOrder,
  requireOrderContext,
} from "../lib/orderLifecycle";
import { orderViewValidator } from "../lib/orderView";
import { requireLivePaymentsEnabled } from "../lib/paymentPolicy";

const DAY_MS = 24 * 60 * 60 * 1000;
const AUTO_RELEASE_DELAY_MS = 7 * DAY_MS;
const LOCAL_ORDER_TYPES = ["local", "local_quote"];

const roundCents = (value: number) => Math.round(value * 100) / 100;

/** Tiered platform fee for paid orders: 15% under 50, 12% up to 500, 10% above. */
function calculatePlatformFee(amount: number): number {
  if (amount < 50) return roundCents(amount * 0.15);
  if (amount <= 500) return roundCents(amount * 0.12);
  return roundCents(amount * 0.1);
}

function generateOrderNumber(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const suffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${year}${month}${day}-${suffix}`;
}

/**
 * Complete the project linked to a project order. After an external transfer
 * the money has already moved, so inconsistencies are logged instead of thrown.
 */
async function completeLinkedProject(
  ctx: MutationCtx,
  order: Doc<"orders">,
  now: number,
  options: { afterExternalTransfer?: boolean } = {},
) {
  if (order.orderType !== "project" || !order.projectId) return;
  const project = await ctx.db.get(order.projectId);

  let mismatch: string | null = null;
  if (!project) {
    mismatch = "Linked project not found.";
  } else if (
    project.tenantId !== order.tenantId ||
    project.clientId !== order.clientId ||
    project.selectedFreelancerId !== order.freelancerId
  ) {
    mismatch = "Linked project does not match this order.";
  }
  if (mismatch) {
    if (options.afterExternalTransfer) {
      console.error(
        `[orders] Project completion reconciliation skipped for order ${order._id}: ${mismatch}`,
      );
      return;
    }
    throw new Error(mismatch);
  }

  if (project && project.status !== "completed") {
    if (project.status !== "in_progress" && project.status !== "cancelled") {
      const reason = `Linked project cannot complete from ${project.status}.`;
      if (!options.afterExternalTransfer) throw new Error(reason);
      console.error(
        `[orders] Project completion reconciliation skipped for order ${order._id}: ${reason}`,
      );
      return;
    }
    if (project.status === "in_progress")
      assertTransition(projectTransitions, project.status, "completed");
    await ctx.db.patch(project._id, { status: "completed", updatedAt: now });
  }
}

/** Shape an order for its participants, with names and remaining revisions. */
function toOrderView(
  order: Doc<"orders">,
  client: Doc<"users"> | null | undefined,
  provider: Doc<"freelancerProfiles"> | null | undefined,
  providerUser: Doc<"users"> | null | undefined,
) {
  return {
    ...order,
    remainingRevisions: remainingRevisions(order),
    deliveryVersion: order.deliveryVersion ?? 0,
    clientName: client?.name ?? null,
    freelancerName: provider?.displayName ?? providerUser?.name ?? null,
    freelancerUserId: provider?.userId ?? null,
  };
}

/**
 * Paid order creation by the trusted server. Disabled while live payments are
 * off: `requireLivePaymentsEnabled` throws before any data is read.
 */
const create = mutation({
  args: {
    orderType: orderTypeValidator,
    title: v.string(),
    amount: v.number(),
    currency: v.optional(v.string()),
    deliveryDays: v.number(),
    clientId: v.id("users"),
    freelancerId: v.id("freelancerProfiles"),
    gigId: v.optional(v.id("gigs")),
    projectId: v.optional(v.id("projects")),
    gigPackageId: v.optional(v.id("gigPackages")),
    serverSecret: v.string(),
  },
  returns: v.id("orders"),
  handler: async (ctx, args): Promise<Id<"orders">> => {
    requireServerSecret(args.serverSecret);
    requireLivePaymentsEnabled("Paid order creation");
    if (!["gig", "project"].includes(args.orderType))
      throw new Error("Unsupported order type.");
    if (args.gigId && args.projectId)
      throw new Error("Order cannot reference both a gig and a project.");

    const [client, provider] = await Promise.all([
      ctx.db.get(args.clientId),
      ctx.db.get(args.freelancerId),
    ]);
    if (!client) throw new Error("Client not found");
    if (!provider) throw new Error("Freelancer profile not found");
    if (provider.tenantId !== client.tenantId)
      throw new Error("Client and freelancer must belong to the same tenant.");
    if (provider.userId === args.clientId)
      throw new Error("You cannot create an order for yourself.");

    // Trusted values come from the gig package or the project, never from the caller.
    let title = args.title;
    let amount = args.amount;
    let currency = args.currency ?? "EUR";
    let deliveryDays = args.deliveryDays;

    if (args.orderType === "gig" && (!args.gigId || !args.gigPackageId))
      throw new Error("Gig orders require both gigId and gigPackageId.");
    if (args.orderType === "project" && !args.projectId)
      throw new Error("Project orders require a projectId.");

    if (!!args.gigId || !!args.gigPackageId) {
      if (!args.gigId || !args.gigPackageId)
        throw new Error("Gig orders require both gigId and gigPackageId.");
      const gig = await ctx.db.get(args.gigId);
      if (!gig) throw new Error("Gig not found");
      if (gig.tenantId !== client.tenantId)
        throw new Error("Gig and client must belong to the same tenant.");
      if (gig.freelancerId !== args.freelancerId) throw new Error("Unauthorized.");
      const gigPackage = await ctx.db.get(args.gigPackageId);
      if (!gigPackage) throw new Error("Gig package not found");
      if (gigPackage.gigId !== args.gigId) throw new Error("Unauthorized.");
      title = `${gig.title} - ${gigPackage.title}`;
      amount = gigPackage.price;
      currency = gigPackage.currency ?? currency;
      deliveryDays = gigPackage.deliveryDays;
    }

    if (args.projectId) {
      const project = await ctx.db.get(args.projectId);
      if (!project) throw new Error("Project not found");
      if (project.tenantId !== client.tenantId)
        throw new Error("Project and client must belong to the same tenant.");
      if (project.clientId !== args.clientId) throw new Error("Unauthorized.");
      if (!project.selectedFreelancerId)
        throw new Error(
          "Project order cannot be created before a freelancer is selected.",
        );
      if (project.selectedFreelancerId !== args.freelancerId)
        throw new Error("Unauthorized.");
      title = project.title;
      currency = project.currency ?? currency;
    }

    const platformFee = calculatePlatformFee(amount);
    const freelancerEarnings = roundCents(amount - platformFee);
    const deliveryDeadline = Date.now() + deliveryDays * DAY_MS;
    const now = Date.now();
    const orderId = await ctx.db.insert("orders", {
      tenantId: client.tenantId,
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

    const providerUser = provider ? await ctx.db.get(provider.userId) : null;
    const created = await ctx.db.get(orderId);
    if (client?.email) {
      await ctx.scheduler.runAfter(0, internal.lib.email.sendOrderConfirmation, {
        clientEmail: client.email,
        clientName: client.name || "Customer",
        orderNumber: created!.orderNumber,
        orderTitle: title,
        amount,
        currency,
        deliveryDays,
        orderId,
      });
    }
    if (providerUser?.email) {
      await ctx.scheduler.runAfter(
        0,
        internal.lib.email.sendNewOrderNotification,
        {
          freelancerEmail: providerUser.email,
          freelancerName:
            provider?.displayName || providerUser.name || "Freelancer",
          orderNumber: created!.orderNumber,
          orderTitle: title,
          amount: amount - platformFee,
          currency,
          deliveryDays,
          orderId,
        },
      );
    }
    return orderId;
  },
});

/**
 * Start a free private-beta order for a service package. No payment is created:
 * the order records the agreed scope and opens the shared workspace.
 */
const createBetaGigOrder = mutation({
  args: {
    gigId: v.id("gigs"),
    packageId: v.id("gigPackages"),
    requestId: v.optional(v.string()),
  },
  returns: v.object({
    orderId: v.id("orders"),
  }),
  handler: async (ctx, args) => {
    const buyer = await requireAuthUser(ctx);
    requireMarketplaceContext(buyer, "client", "online", "buying a service");
    if (
      args.requestId !== undefined &&
      !/^[A-Za-z0-9_-]{16,128}$/.test(args.requestId)
    )
      throw new Error("Invalid order request ID.");

    // The same purchase intent always resolves to the same order.
    if (args.requestId) {
      const existing = await ctx.db
        .query("orders")
        .withIndex("by_client_and_requestId", (q) =>
          q.eq("clientId", buyer._id).eq("clientRequestId", args.requestId),
        )
        .unique();
      if (existing) {
        if (
          existing.gigId !== args.gigId ||
          existing.gigPackageId !== args.packageId ||
          existing.tenantId !== buyer.tenantId
        )
          throw new Error(
            "This order request ID was already used for another package.",
          );
        return { orderId: existing._id };
      }
    }

    const [gig, gigPackage] = await Promise.all([
      ctx.db.get(args.gigId),
      ctx.db.get(args.packageId),
    ]);
    if (!gig || gig.status !== "active")
      throw new Error("This service is not available.");
    if (!gigPackage || gigPackage.gigId !== gig._id)
      throw new Error("The selected package does not belong to this service.");

    const provider = await ctx.db.get(gig.freelancerId);
    if (!provider || provider.status !== "active")
      throw new Error("The freelancer profile is not available.");
    if (provider.userId === buyer._id)
      throw new Error("You cannot order your own service.");
    const seller = await ctx.db.get(provider.userId);
    if (!seller || seller.tenantId !== buyer.tenantId)
      throw new Error("The freelancer account belongs to another workspace.");

    assertActiveOnlineProviderProfile(provider, {
      ownerId: seller._id,
      accountTenantId: seller.tenantId,
      resourceTenantId: buyer.tenantId,
    });
    assertOnlineGig(gig, provider, { expectedTenantId: buyer.tenantId });
    await assertOnlineMarketplaceCategory(
      ctx,
      gig.categoryId,
      buyer.tenantId,
      gig.locale,
    );
    if (provider.isAvailable === false || provider.profileVisibility === "private")
      throw new Error("This freelancer is not accepting new orders.");

    if (!/^[A-Z]{3}$/.test(gigPackage.currency ?? "EUR"))
      throw new Error("The selected package needs a valid currency.");
    const packageIsValid =
      Number.isFinite(gigPackage.price) &&
      gigPackage.price >= 0 &&
      gigPackage.price <= 1_000_000 &&
      Number.isInteger(gigPackage.deliveryDays) &&
      gigPackage.deliveryDays >= 1 &&
      gigPackage.deliveryDays <= 365 &&
      (gigPackage.revisionCount === undefined ||
        (Number.isInteger(gigPackage.revisionCount) &&
          gigPackage.revisionCount >= 0));
    if (!packageIsValid)
      throw new Error("The selected package needs to be updated before ordering.");

    if (!args.requestId) {
      // Compatibility for an older tab: reuse its most recent active commitment.
      // Modern callers supply a new intent ID when deliberately ordering again.
      const recent = await ctx.db
        .query("orders")
        .withIndex("by_client_and_package", (q) =>
          q.eq("clientId", buyer._id).eq("gigPackageId", args.packageId),
        )
        .order("desc")
        .first();
      if (
        recent &&
        recent.tenantId === buyer.tenantId &&
        !["completed", "cancelled"].includes(recent.status)
      )
        return { orderId: recent._id };
    }

    const now = Date.now();
    const orderTitle = `${gig.title} - ${gigPackage.title}`;
    const currency = gigPackage.currency ?? "EUR";
    const orderId = await ctx.db.insert("orders", {
      tenantId: gig.tenantId,
      orderNumber: generateOrderNumber(),
      orderType: "gig",
      clientId: buyer._id,
      freelancerId: provider._id,
      gigId: gig._id,
      gigPackageId: gigPackage._id,
      clientRequestId: args.requestId,
      title: orderTitle,
      description: gigPackage.description,
      amount: gigPackage.price,
      platformFee: 0,
      freelancerEarnings: gigPackage.price,
      currency,
      deliveryDeadline: now + gigPackage.deliveryDays * DAY_MS,
      revisionCount: gigPackage.revisionCount,
      revisionsUsed: 0,
      deliveryVersion: 0,
      status: "active",
      escrowStatus: "beta_no_payment",
      createdAt: now,
      updatedAt: now,
    });
    const conversationId = await ctx.db.insert("conversations", {
      tenantId: gig.tenantId,
      contextType: "order",
      contextTitle: gig.title,
      contextHref: `/orders/${orderId}`,
      orderId,
      freelancerProfileId: provider._id,
      gigId: gig._id,
      participant1: buyer._id,
      participant2: provider.userId,
      status: "active",
      unreadCount1: 0,
      unreadCount2: 0,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.scheduler.runAfter(0, internal.lib.email.sendOrderConfirmation, {
      clientEmail: buyer.email,
      clientName: buyer.name || "Customer",
      orderNumber: (await ctx.db.get(orderId))!.orderNumber,
      orderTitle,
      amount: gigPackage.price,
      currency,
      deliveryDays: gigPackage.deliveryDays,
      orderId,
    });
    await ctx.scheduler.runAfter(0, internal.lib.email.sendNewOrderNotification, {
      freelancerEmail: seller.email,
      freelancerName: provider.displayName || seller.name,
      orderNumber: (await ctx.db.get(orderId))!.orderNumber,
      orderTitle,
      amount: gigPackage.price,
      currency,
      deliveryDays: gigPackage.deliveryDays,
      orderId,
    });

    await ctx.db.insert("messages", {
      conversationId,
      content: `Private beta order started: ${gig.title}`,
      messageType: "system",
      isRead: false,
      createdAt: now,
    });
    await notifyUser(ctx, {
      userId: provider.userId,
      type: "order_placed",
      title: "New private beta order",
      body: `${buyer.name} started ${gigPackage.title} for ${gig.title}.`,
      link: `/orders/${orderId}`,
      metadata: {
        orderId,
        gigId: gig._id,
      },
    });
    return { orderId };
  },
});

/** Server-only lookup used by the Stripe webhook. */
const getByStripePaymentIntentId = query({
  args: {
    stripePaymentIntentId: v.string(),
    serverSecret: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);
    return (
      (await ctx.db
        .query("orders")
        .withIndex("by_stripePaymentIntentId", (q) =>
          q.eq("stripePaymentIntentId", args.stripePaymentIntentId),
        )
        .first()) ?? null
    );
  },
});

/**
 * Stripe payment reconciliation. Disabled during the private beta.
 *
 * Known defect, kept as-is so this rewrite stays behaviour-identical: the
 * client notification below reuses the "work submitted for review" copy, which
 * is wrong for a payment confirmation. Fix it before live payments are enabled.
 */
const updateStripePayment = mutation({
  args: {
    orderId: v.id("orders"),
    stripePaymentIntentId: v.string(),
    requirements: v.optional(v.string()),
    serverSecret: v.optional(v.string()),
  },
  returns: v.id("orders"),
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);
    requireLivePaymentsEnabled("Stripe payment reconciliation");
    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Order not found.");
    if (order.status !== "active")
      assertTransition(orderTransitions, order.status, "active");
    await notifyUser(ctx, {
      userId: order.clientId,
      type: "order_delivered",
      title: "Work submitted for review",
      body: `${order.title} is ready for your review.`,
      link: `/orders/${order._id}`,
      metadata: {
        orderId: order._id,
      },
    });
    await ctx.db.patch(args.orderId, {
      stripePaymentIntentId: args.stripePaymentIntentId,
      escrowStatus: "held",
      status: "active",
      requirements: args.requirements,
      updatedAt: Date.now(),
    });
    return args.orderId;
  },
});

/** Payment ledger entry. Disabled during the private beta. */
const createTransaction = mutation({
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
  returns: v.id("transactions"),
  handler: async (ctx, args) => {
    requireServerSecret(args.serverSecret);
    requireLivePaymentsEnabled("Payment ledger creation");
    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Order not found");
    const now = Date.now();
    return await ctx.db.insert("transactions", {
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
  },
});

/** The caller's own orders as a client or as a provider, newest first. */
const getByUser = query({
  args: {
    userId: v.id("users"),
    role: v.union(v.literal("client"), v.literal("freelancer")),
    limit: v.optional(v.number()),
  },
  returns: v.array(orderViewValidator),
  handler: async (ctx, args) => {
    await requireOwner(ctx, args.userId);
    const limit = Math.min(100, Math.max(1, Math.floor(args.limit ?? 20)));

    let orders: Doc<"orders">[];
    if (args.role === "client") {
      orders = await ctx.db
        .query("orders")
        .withIndex("by_client", (q) => q.eq("clientId", args.userId))
        .order("desc")
        .take(limit);
    } else {
      // One account can hold several provider profiles; merge their orders.
      const profiles = await ctx.db
        .query("freelancerProfiles")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .take(20);
      const groups = await Promise.all(
        profiles.map((profile) =>
          ctx.db
            .query("orders")
            .withIndex("by_freelancer", (q) => q.eq("freelancerId", profile._id))
            .order("desc")
            .take(limit),
        ),
      );
      orders = [...new Map(groups.flat().map((order) => [order._id, order])).values()]
        .sort((first, second) => second.createdAt - first.createdAt)
        .slice(0, limit);
    }

    const clientIds = [...new Set(orders.map((order) => order.clientId).filter(Boolean))];
    const providerIds = [
      ...new Set(orders.map((order) => order.freelancerId).filter(Boolean)),
    ];
    const [clients, providers] = await Promise.all([
      Promise.all(clientIds.map((id) => ctx.db.get(id))),
      Promise.all(providerIds.map((id) => ctx.db.get(id))),
    ]);
    const clientsById = new Map(
      clients.filter(Boolean).map((client) => [client!._id, client!]),
    );
    const providersById = new Map(
      providers.filter(Boolean).map((provider) => [provider!._id, provider!]),
    );
    const providerUserIds = [
      ...new Set(
        providers
          .filter(Boolean)
          .map((provider) => provider!.userId)
          .filter(Boolean),
      ),
    ];
    const providerUsers = await Promise.all(
      providerUserIds.map((id) => ctx.db.get(id)),
    );
    const providerUsersById = new Map(
      providerUsers.filter(Boolean).map((account) => [account!._id, account!]),
    );

    return orders.map((order) => {
      const provider = order.freelancerId
        ? providersById.get(order.freelancerId)
        : null;
      return toOrderView(
        order,
        clientsById.get(order.clientId),
        provider,
        provider ? providerUsersById.get(provider.userId) : null,
      );
    });
  },
});

/** One order, visible only to its two participants inside their workspace. */
const getById = query({
  args: {
    orderId: v.id("orders"),
  },
  returns: v.union(v.null(), orderViewValidator),
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId);
    if (!order) return null;
    const user = await requireAuthUser(ctx);
    const provider = order.freelancerId
      ? await ctx.db.get(order.freelancerId)
      : null;
    const isClient = order.clientId === user._id;
    const isProvider = provider?.userId === user._id;
    if (order.tenantId !== user.tenantId || (!isClient && !isProvider)) return null;

    const [client, providerUser] = await Promise.all([
      ctx.db.get(order.clientId),
      provider ? ctx.db.get(provider.userId) : Promise.resolve(null),
    ]);
    return toOrderView(order, client, provider, providerUser);
  },
});

/** The provider submits the work for review. At least one deliverable is required. */
const deliver = mutation({
  args: {
    orderId: v.id("orders"),
  },
  returns: v.object({
    success: v.boolean(),
  }),
  handler: async (ctx, args): Promise<{ success: boolean }> => {
    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Order not found");
    const user = await requireAuthUser(ctx);
    const provider = order.freelancerId
      ? await ctx.db.get(order.freelancerId)
      : null;
    if (!provider || provider.userId !== user._id)
      throw new Error("Access denied: only the freelancer can deliver this order");
    requireOrderContext(user, order, "provider");
    requireBetaOrder(order);
    await assertOrderNotDisputed(ctx, order);
    if (LOCAL_ORDER_TYPES.includes(order.orderType))
      throw new Error("Update local service progress in the appointment workspace.");
    if (order.status === "delivered") return { success: true };

    if (order.escrowStatus === "held")
      requireLivePaymentsEnabled("Paid-order delivery");
    assertTransition(orderTransitions, order.status, "delivered");
    const firstDeliverable = await ctx.db
      .query("orderDeliverables")
      .withIndex("by_order", (q) => q.eq("orderId", order._id))
      .first();
    if (!firstDeliverable)
      throw new Error(
        "Add at least one file or delivery note before submitting the work.",
      );

    const deliveryVersion = (order.deliveryVersion ?? 0) + 1;
    await ctx.db.patch(args.orderId, {
      status: "delivered",
      deliveryVersion,
      updatedAt: Date.now(),
    });
    if (order.escrowStatus === "held") {
      // Paid orders release automatically when the client does not respond.
      const autoReleaseJobId = await ctx.scheduler.runAfter(
        AUTO_RELEASE_DELAY_MS,
        internal.marketplace.escrow.releaseToFreelancer,
        { orderId: args.orderId },
      );
      await ctx.db.patch(args.orderId, { autoReleaseJobId });
    }

    await notifyUser(ctx, {
      userId: order.clientId,
      type: "order_delivered",
      title: "Work submitted for review",
      body: `${order.title} is ready for your review.`,
      link: `/orders/${order._id}`,
      metadata: { orderId: order._id, deliveryVersion },
    });
    const client = await ctx.db.get(order.clientId);
    if (client?.email) {
      await ctx.scheduler.runAfter(0, internal.lib.email.sendOrderDelivered, {
        clientEmail: client.email,
        clientName: client.name || "Customer",
        orderNumber: order.orderNumber,
        orderTitle: order.title,
        orderId: args.orderId,
        deliveryVersion,
      });
    }
    return { success: true };
  },
});

/** The client approves the delivery, which completes the order and linked work. */
const approve = mutation({
  args: {
    orderId: v.id("orders"),
  },
  returns: v.object({
    success: v.boolean(),
  }),
  handler: async (ctx, args): Promise<{ success: boolean }> => {
    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Order not found");
    const user = await requireAuthUser(ctx);
    if (order.clientId !== user._id)
      throw new Error("Access denied: only the client can approve this order");
    requireOrderContext(user, order, "client");
    requireBetaOrder(order);
    await assertOrderNotDisputed(ctx, order);
    if (LOCAL_ORDER_TYPES.includes(order.orderType))
      throw new Error("Update local service progress in the appointment workspace.");

    if (order.escrowStatus === "held")
      requireLivePaymentsEnabled("Paid-order approval");
    if (order.status !== "completed")
      assertTransition(orderTransitions, order.status, "completed");

    const now = Date.now();
    await finishLinkedWork(ctx, order, "completed", now);
    // Approving twice is safe: linked work is reconciled, nothing else repeats.
    if (order.status === "completed") return { success: true };

    if (order.autoReleaseJobId) await ctx.scheduler.cancel(order.autoReleaseJobId);
    await ctx.db.patch(args.orderId, {
      status: "completed",
      completedAt: now,
      updatedAt: now,
      autoReleaseJobId: undefined,
    });
    if (order.escrowStatus === "held") {
      await ctx.scheduler.runAfter(
        0,
        internal.marketplace.escrow.releaseToFreelancer,
        { orderId: args.orderId },
      );
      await ctx.scheduler.runAfter(
        0,
        internal.marketplace.rewards.processOrderCashback,
        { orderId: args.orderId },
      );
      if (order.freelancerId) {
        await ctx.scheduler.runAfter(
          0,
          internal.marketplace.rewards.recalculateFreelancerLevel,
          { freelancerProfileId: order.freelancerId },
        );
      }
    }

    const provider = order.freelancerId
      ? await ctx.db.get(order.freelancerId)
      : null;
    const providerUser = provider ? await ctx.db.get(provider.userId) : null;
    if (providerUser?.email) {
      await ctx.scheduler.runAfter(0, internal.lib.email.sendOrderCompleted, {
        freelancerEmail: providerUser.email,
        freelancerName: provider?.displayName || providerUser.name || "Freelancer",
        orderNumber: order.orderNumber,
        orderTitle: order.title,
        amount: order.freelancerEarnings ?? order.amount,
        currency: order.currency ?? "EUR",
        orderId: args.orderId,
      });
    }
    if (providerUser) {
      await notifyUser(ctx, {
        userId: providerUser._id,
        type: "order_completed",
        title: "Order completed",
        body: `${order.title} was approved by the client.`,
        link: `/orders/${order._id}`,
        metadata: {
          orderId: order._id,
        },
      });
    }
    return { success: true };
  },
});

/** The client asks for changes; the feedback is posted into the order conversation. */
const requestRevision = mutation({
  args: {
    orderId: v.id("orders"),
    message: v.string(),
  },
  returns: v.object({
    success: v.boolean(),
    revisionsUsed: v.number(),
  }),
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Order not found");
    const user = await requireAuthUser(ctx);
    if (order.clientId !== user._id)
      throw new Error("Access denied: only the client can request a revision");
    requireOrderContext(user, order, "client");
    requireBetaOrder(order);
    await assertOrderNotDisputed(ctx, order);
    if (LOCAL_ORDER_TYPES.includes(order.orderType))
      throw new Error("Use the local appointment workspace for this order.");
    if (order.status === "revision_requested")
      throw new Error(
        "A revision has already been requested. Wait for the next delivery.",
      );
    assertTransition(orderTransitions, order.status, "revision_requested");
    if (remainingRevisions(order) === 0)
      throw new Error(
        "All included revisions have been used. Discuss any additional work with the freelancer.",
      );

    const feedback = args.message.trim();
    if (feedback.length < 10 || feedback.length > 3000)
      throw new Error("Revision feedback must be between 10 and 3,000 characters.");

    const revisionsUsed = (order.revisionsUsed ?? 0) + 1;
    await ctx.db.patch(args.orderId, {
      status: "revision_requested",
      revisionsUsed,
      updatedAt: Date.now(),
    });

    const conversation = await ctx.db
      .query("conversations")
      .withIndex("by_order", (q) => q.eq("orderId", order._id))
      .unique();
    if (conversation) {
      const sentAt = Date.now();
      await ctx.db.insert("messages", {
        conversationId: conversation._id,
        senderId: user._id,
        content: feedback,
        messageType: "order_update",
        isRead: false,
        createdAt: sentAt,
      });
      await ctx.db.patch(conversation._id, {
        lastMessageAt: sentAt,
        lastMessagePreview: feedback.slice(0, 140),
        ...(conversation.participant1 === user._id
          ? { unreadCount2: (conversation.unreadCount2 ?? 0) + 1 }
          : { unreadCount1: (conversation.unreadCount1 ?? 0) + 1 }),
        updatedAt: sentAt,
      });
    }

    const provider = order.freelancerId
      ? await ctx.db.get(order.freelancerId)
      : null;
    if (provider) {
      await notifyUser(ctx, {
        userId: provider.userId,
        type: "revision_requested",
        title: "Revision requested",
        body: `${order.title}: ${feedback.slice(0, 120)}`,
        link: `/orders/${order._id}`,
        metadata: {
          orderId: order._id,
        },
      });
    }
    return { success: true, revisionsUsed };
  },
});

const getByIdInternal = internalQuery({
  args: {
    orderId: v.id("orders"),
  },
  handler: async (ctx, args) => ctx.db.get(args.orderId),
});

/** Record a completed Stripe transfer. Disabled during the private beta. */
const markReleased = internalMutation({
  args: {
    orderId: v.id("orders"),
    stripeTransferId: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    requireLivePaymentsEnabled("Stripe transfer reconciliation");
    const order = await ctx.db.get(args.orderId);
    if (!order) throw new Error("Order not found.");
    const now = Date.now();
    if (
      order.escrowStatus === "released" &&
      order.stripeTransferId &&
      order.stripeTransferId !== args.stripeTransferId
    )
      throw new Error(
        "Order is already associated with a different Stripe transfer.",
      );
    await ctx.db.patch(args.orderId, {
      escrowStatus: "released",
      stripeTransferId: args.stripeTransferId,
      status: "completed",
      completedAt: now,
      updatedAt: now,
    });
    await completeLinkedProject(ctx, order, now, { afterExternalTransfer: true });
    return null;
  },
});

/** Record a completed Stripe refund. Disabled during the private beta. */
const markRefunded = internalMutation({
  args: {
    orderId: v.id("orders"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    requireLivePaymentsEnabled("Stripe refund reconciliation");
    await ctx.db.patch(args.orderId, {
      escrowStatus: "refunded",
      status: "cancelled",
      cancelledAt: Date.now(),
      updatedAt: Date.now(),
    });
    return null;
  },
});

export {
  approve,
  create,
  createBetaGigOrder,
  createTransaction,
  deliver,
  getById,
  getByIdInternal,
  getByStripePaymentIntentId,
  getByUser,
  markRefunded,
  markReleased,
  requestRevision,
  updateStripePayment,
};
