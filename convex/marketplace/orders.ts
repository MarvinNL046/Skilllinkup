import type { Doc, Id } from "../_generated/dataModel";
// Reconciled with the existing development deployment (2026-09-07).
import { requireLivePaymentsEnabled } from "../lib/paymentPolicy";
import { notifyUser } from "../lib/notifications";
import { internal } from "../_generated/api";
import { query } from "../_generated/server";
import { internalQuery } from "../_generated/server";
import { mutation } from "../_generated/server";
import { internalMutation } from "../_generated/server";
import { requireAuthUser } from "../lib/authHelpers";
import { requireOwner } from "../lib/authHelpers";
import { requireMarketplaceContext } from "../lib/authHelpers";
import { requireServerSecret } from "../lib/authHelpers";
import { assertActiveOnlineProviderProfile, assertOnlineGig, assertOnlineMarketplaceCategory } from "../lib/onlineMarketplace";
import { assertOrderNotDisputed, finishLinkedWork, remainingRevisions, requireBetaOrder, requireOrderContext } from "../lib/orderLifecycle";
import { orderViewValidator } from "../lib/orderView";
import { projectTransitions } from "../lib/marketplaceState";
import { orderTransitions } from "../lib/marketplaceState";
import { assertTransition } from "../lib/marketplaceState";
import { orderTypeValidator } from "../lib/marketplaceState";
import { v } from "convex/values";
function calculatePlatformFee(amount: number): number {
  return amount < 50 ? Math.round(amount * 0.15 * 100) / 100 : amount <= 500 ? Math.round(amount * 0.12 * 100) / 100 : Math.round(amount * 0.1 * 100) / 100;
}
function generateOrderNumber(): string {
  let r = new Date(),
    e = r.getFullYear(),
    t = String(r.getMonth() + 1).padStart(2, "0"),
    a = String(r.getDate()).padStart(2, "0"),
    d = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${e}${t}${a}-${d}`;
}
async function completeLinkedProject(r, e, t, a: { afterExternalTransfer?: boolean } = {}) {
  if (e.orderType !== "project" || !e.projectId) return;
  let d = await r.db.get(e.projectId),
    s = null;
  if (d ? (d.tenantId !== e.tenantId || d.clientId !== e.clientId || d.selectedFreelancerId !== e.freelancerId) && (s = "Linked project does not match this order.") : s = "Linked project not found.", s) {
    if (a.afterExternalTransfer) {
      console.error(`[orders] Project completion reconciliation skipped for order ${e._id}: ${s}`);
      return;
    }
    throw new Error(s);
  }
  if (d && d.status !== "completed") {
    if (d.status !== "in_progress" && d.status !== "cancelled") {
      let o = `Linked project cannot complete from ${d.status}.`;
      if (!a.afterExternalTransfer) throw new Error(o);
      console.error(`[orders] Project completion reconciliation skipped for order ${e._id}: ${o}`);
      return;
    }
    d.status === "in_progress" && assertTransition(projectTransitions, d.status, "completed"), await r.db.patch(d._id, {
      status: "completed",
      updatedAt: t
    });
  }
}
var create = mutation({
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
      serverSecret: v.string()
    },
    returns: v.id("orders"),
    handler: async (ctx, args): Promise<Id<"orders">> => {
      if (requireServerSecret(args.serverSecret), requireLivePaymentsEnabled("Paid order creation"), !["gig", "project"].includes(args.orderType)) throw new Error("Unsupported order type.");
      if (args.gigId && args.projectId) throw new Error("Order cannot reference both a gig and a project.");
      let [t, a] = await Promise.all([ctx.db.get(args.clientId), ctx.db.get(args.freelancerId)]);
      if (!t) throw new Error("Client not found");
      if (!a) throw new Error("Freelancer profile not found");
      if (a.tenantId !== t.tenantId) throw new Error("Client and freelancer must belong to the same tenant.");
      if (a.userId === args.clientId) throw new Error("You cannot create an order for yourself.");
      let d = args.title,
        s = args.amount,
        o = args.currency ?? "EUR",
        l = args.deliveryDays;
      if (args.orderType === "gig" && (!args.gigId || !args.gigPackageId)) throw new Error("Gig orders require both gigId and gigPackageId.");
      if (args.orderType === "project" && !args.projectId) throw new Error("Project orders require a projectId.");
      if (!!args.gigId || !!args.gigPackageId) {
        if (!args.gigId || !args.gigPackageId) throw new Error("Gig orders require both gigId and gigPackageId.");
        let c = await ctx.db.get(args.gigId);
        if (!c) throw new Error("Gig not found");
        if (c.tenantId !== t.tenantId) throw new Error("Gig and client must belong to the same tenant.");
        if (c.freelancerId !== args.freelancerId) throw new Error("Unauthorized.");
        let w = await ctx.db.get(args.gigPackageId);
        if (!w) throw new Error("Gig package not found");
        if (w.gigId !== args.gigId) throw new Error("Unauthorized.");
        d = `${c.title} - ${w.title}`, s = w.price, o = w.currency ?? o, l = w.deliveryDays;
      }
      if (args.projectId) {
        let c = await ctx.db.get(args.projectId);
        if (!c) throw new Error("Project not found");
        if (c.tenantId !== t.tenantId) throw new Error("Project and client must belong to the same tenant.");
        if (c.clientId !== args.clientId) throw new Error("Unauthorized.");
        if (!c.selectedFreelancerId) throw new Error("Project order cannot be created before a freelancer is selected.");
        if (c.selectedFreelancerId !== args.freelancerId) throw new Error("Unauthorized.");
        d = c.title, o = c.currency ?? o;
      }
      let h = calculatePlatformFee(s),
        T = Math.round((s - h) * 100) / 100,
        S = Date.now() + l * 24 * 60 * 60 * 1e3,
        k = Date.now(),
        v = await ctx.db.insert("orders", {
          tenantId: t.tenantId,
          orderNumber: generateOrderNumber(),
          orderType: args.orderType,
          clientId: args.clientId,
          freelancerId: args.freelancerId,
          gigId: args.gigId,
          projectId: args.projectId,
          gigPackageId: args.gigPackageId,
          title: d,
          amount: s,
          platformFee: h,
          freelancerEarnings: T,
          currency: o,
          deliveryDeadline: S,
          revisionsUsed: 0,
          status: "pending",
          escrowStatus: "held",
          createdAt: k,
          updatedAt: k
        }),
        i = a ? await ctx.db.get(a.userId) : null,
        p = await ctx.db.get(v);
      return t?.email && (await ctx.scheduler.runAfter(0, internal.lib.email.sendOrderConfirmation, {
        clientEmail: t.email,
        clientName: t.name || "Customer",
        orderNumber: p.orderNumber,
        orderTitle: d,
        amount: s,
        currency: o,
        deliveryDays: l,
        orderId: v
      })), i?.email && (await ctx.scheduler.runAfter(0, internal.lib.email.sendNewOrderNotification, {
        freelancerEmail: i.email,
        freelancerName: a?.displayName || i.name || "Freelancer",
        orderNumber: p.orderNumber,
        orderTitle: d,
        amount: s - h,
        currency: o,
        deliveryDays: l,
        orderId: v
      })), v;
    }
  }),
  createBetaGigOrder = mutation({
    args: {
      gigId: v.id("gigs"),
      packageId: v.id("gigPackages"),
      requestId: v.optional(v.string()),
    },
    returns: v.object({
      orderId: v.id("orders")
    }),
    handler: async (ctx, args) => {
      let t = await requireAuthUser(ctx);
      requireMarketplaceContext(t, "client", "online", "buying a service");
      if (args.requestId !== undefined && !/^[A-Za-z0-9_-]{16,128}$/.test(args.requestId)) throw new Error("Invalid order request ID.");
      if (args.requestId) {
        const existing = await ctx.db.query("orders").withIndex("by_client_and_requestId", q => q.eq("clientId", t._id).eq("clientRequestId", args.requestId)).unique();
        if (existing) {
          if (existing.gigId !== args.gigId || existing.gigPackageId !== args.packageId || existing.tenantId !== t.tenantId) throw new Error("This order request ID was already used for another package.");
          return { orderId: existing._id };
        }
      }
      let [a, d] = await Promise.all([ctx.db.get(args.gigId), ctx.db.get(args.packageId)]);
      if (!a || a.status !== "active") throw new Error("This service is not available.");
      if (!d || d.gigId !== a._id) throw new Error("The selected package does not belong to this service.");
      let s = await ctx.db.get(a.freelancerId);
      if (!s || s.status !== "active") throw new Error("The freelancer profile is not available.");
      if (s.userId === t._id) throw new Error("You cannot order your own service.");
      const seller = await ctx.db.get(s.userId);
      if (!seller || seller.tenantId !== t.tenantId) throw new Error("The freelancer account belongs to another workspace.");
      assertActiveOnlineProviderProfile(s, { ownerId: seller._id, accountTenantId: seller.tenantId, resourceTenantId: t.tenantId });
      assertOnlineGig(a, s, { expectedTenantId: t.tenantId });
      await assertOnlineMarketplaceCategory(ctx, a.categoryId, t.tenantId, a.locale);
      if (s.isAvailable === false || s.profileVisibility === "private") throw new Error("This freelancer is not accepting new orders.");
      if (!/^[A-Z]{3}$/.test(d.currency ?? "EUR")) throw new Error("The selected package needs a valid currency.");
      if (!Number.isFinite(d.price) || d.price < 0 || d.price > 1_000_000 || !Number.isInteger(d.deliveryDays) || d.deliveryDays < 1 || d.deliveryDays > 365 || (d.revisionCount !== undefined && (!Number.isInteger(d.revisionCount) || d.revisionCount < 0))) throw new Error("The selected package needs to be updated before ordering.");
      if (!args.requestId) {
        // Compatibility for an older tab: reuse its most recent active commitment.
        // Modern callers supply a new intent ID when deliberately ordering again.
        const recent = await ctx.db.query("orders").withIndex("by_client_and_package", q => q.eq("clientId", t._id).eq("gigPackageId", args.packageId)).order("desc").first();
        if (recent && recent.tenantId === t.tenantId && !["completed", "cancelled"].includes(recent.status)) return { orderId: recent._id };
      }
      let o = Date.now(),
        l = await ctx.db.insert("orders", {
          tenantId: a.tenantId,
          orderNumber: generateOrderNumber(),
          orderType: "gig",
          clientId: t._id,
          freelancerId: s._id,
          gigId: a._id,
          gigPackageId: d._id,
          clientRequestId: args.requestId,
          title: `${a.title} - ${d.title}`,
          description: d.description,
          amount: d.price,
          platformFee: 0,
          freelancerEarnings: d.price,
          currency: d.currency ?? "EUR",
          deliveryDeadline: o + d.deliveryDays * 24 * 60 * 60 * 1e3,
          revisionCount: d.revisionCount,
          revisionsUsed: 0,
          deliveryVersion: 0,
          status: "active",
          escrowStatus: "beta_no_payment",
          createdAt: o,
          updatedAt: o
        }),
        f = await ctx.db.insert("conversations", {
          tenantId: a.tenantId,
          contextType: "order",
          contextTitle: a.title,
          contextHref: `/orders/${l}`,
          orderId: l,
          freelancerProfileId: s._id,
          gigId: a._id,
          participant1: t._id,
          participant2: s.userId,
          status: "active",
          unreadCount1: 0,
          unreadCount2: 0,
          createdAt: o,
          updatedAt: o
        });
      await ctx.scheduler.runAfter(0, internal.lib.email.sendOrderConfirmation, {
        clientEmail: t.email, clientName: t.name || "Customer", orderNumber: (await ctx.db.get(l))!.orderNumber,
        orderTitle: `${a.title} - ${d.title}`, amount: d.price, currency: d.currency ?? "EUR", deliveryDays: d.deliveryDays, orderId: l,
      });
      await ctx.scheduler.runAfter(0, internal.lib.email.sendNewOrderNotification, {
        freelancerEmail: seller.email, freelancerName: s.displayName || seller.name, orderNumber: (await ctx.db.get(l))!.orderNumber,
        orderTitle: `${a.title} - ${d.title}`, amount: d.price, currency: d.currency ?? "EUR", deliveryDays: d.deliveryDays, orderId: l,
      });
      return await ctx.db.insert("messages", {
        conversationId: f,
        content: `Private beta order started: ${a.title}`,
        messageType: "system",
        isRead: !1,
        createdAt: o
      }), await notifyUser(ctx, {
        userId: s.userId,
        type: "order_placed",
        title: "New private beta order",
        body: `${t.name} started ${d.title} for ${a.title}.`,
        link: `/orders/${l}`,
        metadata: {
          orderId: l,
          gigId: a._id
        }
      }), {
        orderId: l
      };
    }
  }),
  getByStripePaymentIntentId = query({
    args: {
      stripePaymentIntentId: v.string(),
      serverSecret: v.optional(v.string())
    },
    handler: async (ctx, args) => (requireServerSecret(args.serverSecret), (await ctx.db.query("orders").withIndex("by_stripePaymentIntentId", a => a.eq("stripePaymentIntentId", args.stripePaymentIntentId)).first()) ?? null)
  }),
  updateStripePayment = mutation({
    args: {
      orderId: v.id("orders"),
      stripePaymentIntentId: v.string(),
      requirements: v.optional(v.string()),
      serverSecret: v.optional(v.string())
    },
    returns: v.id("orders"),
    handler: async (ctx, args) => {
      requireServerSecret(args.serverSecret), requireLivePaymentsEnabled("Stripe payment reconciliation");
      let t = await ctx.db.get(args.orderId);
      if (!t) throw new Error("Order not found.");
      return t.status !== "active" && assertTransition(orderTransitions, t.status, "active"), await notifyUser(ctx, {
        userId: t.clientId,
        type: "order_delivered",
        title: "Work submitted for review",
        body: `${t.title} is ready for your review.`,
        link: `/orders/${t._id}`,
        metadata: {
          orderId: t._id
        }
      }), await ctx.db.patch(args.orderId, {
        stripePaymentIntentId: args.stripePaymentIntentId,
        escrowStatus: "held",
        status: "active",
        requirements: args.requirements,
        updatedAt: Date.now()
      }), args.orderId;
    }
  }),
  createTransaction = mutation({
    args: {
      orderId: v.id("orders"),
      payerId: v.optional(v.id("users")),
      payeeId: v.optional(v.id("users")),
      amount: v.number(),
      platformFee: v.optional(v.number()),
      currency: v.string(),
      stripePaymentIntentId: v.optional(v.string()),
      description: v.optional(v.string()),
      serverSecret: v.optional(v.string())
    },
    returns: v.id("transactions"),
    handler: async (ctx, args) => {
      requireServerSecret(args.serverSecret), requireLivePaymentsEnabled("Payment ledger creation");
      let t = await ctx.db.get(args.orderId);
      if (!t) throw new Error("Order not found");
      let a = Date.now();
      return await ctx.db.insert("transactions", {
        tenantId: t.tenantId,
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
        createdAt: a,
        updatedAt: a
      });
    }
  }),
  getByUser = query({
    args: {
      userId: v.id("users"),
      role: v.union(v.literal("client"), v.literal("freelancer")),
      limit: v.optional(v.number())
    },
    returns: v.array(orderViewValidator),
    handler: async (ctx, args) => {
      await requireOwner(ctx, args.userId);
      let t = Math.min(100, Math.max(1, Math.floor(args.limit ?? 20))),
        a: Doc<"orders">[];
      if (args.role === "client") a = await ctx.db.query("orders").withIndex("by_client", i => i.eq("clientId", args.userId)).order("desc").take(t);else {
        const profiles = await ctx.db.query("freelancerProfiles").withIndex("by_userId", p => p.eq("userId", args.userId)).take(20);
        const groups = await Promise.all(profiles.map(profile => ctx.db.query("orders").withIndex("by_freelancer", p => p.eq("freelancerId", profile._id)).order("desc").take(t)));
        a = [...new Map(groups.flat().map(order => [order._id, order])).values()].sort((x, y) => y.createdAt - x.createdAt).slice(0, t);
      }
      let d = [...new Set(a.map(i => i.clientId).filter(Boolean))],
        s = [...new Set(a.map(i => i.freelancerId).filter(Boolean))],
        [o, l] = await Promise.all([Promise.all(d.map(i => ctx.db.get(i))), Promise.all(s.map(i => ctx.db.get(i)))]),
        f = new Map(o.filter(Boolean).map(i => [i._id, i])),
        h = new Map(l.filter(Boolean).map(i => [i._id, i])),
        T = [...new Set(l.filter(Boolean).map(i => i.userId).filter(Boolean))],
        S = await Promise.all(T.map(i => ctx.db.get(i))),
        k = new Map(S.filter(Boolean).map(i => [i._id, i]));
      return a.map(i => {
        let p = f.get(i.clientId),
          c = i.freelancerId ? h.get(i.freelancerId) : null,
          w = c ? k.get(c.userId) : null;
        return {
          ...i,
          remainingRevisions: remainingRevisions(i),
          deliveryVersion: i.deliveryVersion ?? 0,
          clientName: p?.name ?? null,
          freelancerName: c?.displayName ?? w?.name ?? null,
          freelancerUserId: c?.userId ?? null
        };
      });
    }
  }),
  getById = query({
    args: {
      orderId: v.id("orders")
    },
    returns: v.union(v.null(), orderViewValidator),
    handler: async (ctx, args) => {
      let t = await ctx.db.get(args.orderId);
      if (!t) return null;
      let a = await requireAuthUser(ctx),
        d = t.freelancerId ? await ctx.db.get(t.freelancerId) : null,
        s = t.clientId === a._id,
        o = d?.userId === a._id;
      if (!s && !o) throw new Error("Access denied: you are not a party to this order");
      let [l, f] = await Promise.all([ctx.db.get(t.clientId), d ? ctx.db.get(d.userId) : Promise.resolve(null)]);
      return {
        ...t,
        remainingRevisions: remainingRevisions(t),
        deliveryVersion: t.deliveryVersion ?? 0,
        clientName: l?.name ?? null,
        freelancerName: d?.displayName ?? f?.name ?? null,
        freelancerUserId: d?.userId ?? null
      };
    }
  }),
  deliver = mutation({
    args: {
      orderId: v.id("orders")
    },
    returns: v.object({
      success: v.boolean()
    }),
    handler: async (ctx, args): Promise<{ success: boolean }> => {
      let t = await ctx.db.get(args.orderId);
      if (!t) throw new Error("Order not found");
      let a = await requireAuthUser(ctx),
        d = t.freelancerId ? await ctx.db.get(t.freelancerId) : null;
      if (!d || d.userId !== a._id) throw new Error("Access denied: only the freelancer can deliver this order");
      requireOrderContext(a, t, "provider");
      requireBetaOrder(t);
      await assertOrderNotDisputed(ctx, t);
      if (["local", "local_quote"].includes(t.orderType)) throw new Error("Update local service progress in the appointment workspace.");
      if (t.status === "delivered") return { success: true };
      if (t.escrowStatus === "held" && requireLivePaymentsEnabled("Paid-order delivery"), assertTransition(orderTransitions, t.status, "delivered"), !(await ctx.db.query("orderDeliverables").withIndex("by_order", l => l.eq("orderId", t._id)).first())) throw new Error("Add at least one file or delivery note before submitting the work.");
      if (await ctx.db.patch(args.orderId, {
        status: "delivered",
        deliveryVersion: (t.deliveryVersion ?? 0) + 1,
        updatedAt: Date.now()
      }), t.escrowStatus === "held") {
        let l = await ctx.scheduler.runAfter(6048e5, internal.marketplace.escrow.releaseToFreelancer, {
          orderId: args.orderId
        });
        await ctx.db.patch(args.orderId, {
          autoReleaseJobId: l
        });
      }
      await notifyUser(ctx, { userId: t.clientId, type: "order_delivered", title: "Work submitted for review", body: `${t.title} is ready for your review.`, link: `/orders/${t._id}`, metadata: { orderId: t._id, deliveryVersion: (t.deliveryVersion ?? 0) + 1 } });
      let o = await ctx.db.get(t.clientId);
      return o?.email && (await ctx.scheduler.runAfter(0, internal.lib.email.sendOrderDelivered, {
        clientEmail: o.email,
        clientName: o.name || "Customer",
        orderNumber: t.orderNumber,
        orderTitle: t.title,
        orderId: args.orderId,
        deliveryVersion: (t.deliveryVersion ?? 0) + 1,
      })), {
        success: !0
      };
    }
  }),
  approve = mutation({
    args: {
      orderId: v.id("orders")
    },
    returns: v.object({
      success: v.boolean()
    }),
    handler: async (ctx, args): Promise<{ success: boolean }> => {
      let t = await ctx.db.get(args.orderId);
      if (!t) throw new Error("Order not found");
      let a = await requireAuthUser(ctx);
      if (t.clientId !== a._id) throw new Error("Access denied: only the client can approve this order");
      requireOrderContext(a, t, "client");
      requireBetaOrder(t);
      await assertOrderNotDisputed(ctx, t);
      if (["local", "local_quote"].includes(t.orderType)) throw new Error("Update local service progress in the appointment workspace.");
      t.escrowStatus === "held" && requireLivePaymentsEnabled("Paid-order approval"), t.status !== "completed" && assertTransition(orderTransitions, t.status, "completed");
      let d = Date.now();
      if (await finishLinkedWork(ctx, t, "completed", d), t.status === "completed") return {
        success: !0
      };
      t.autoReleaseJobId && (await ctx.scheduler.cancel(t.autoReleaseJobId)), await ctx.db.patch(args.orderId, {
        status: "completed",
        completedAt: d,
        updatedAt: d,
        autoReleaseJobId: void 0
      }), t.escrowStatus === "held" && (await ctx.scheduler.runAfter(0, internal.marketplace.escrow.releaseToFreelancer, {
        orderId: args.orderId
      }), await ctx.scheduler.runAfter(0, internal.marketplace.rewards.processOrderCashback, {
        orderId: args.orderId
      }), t.freelancerId && (await ctx.scheduler.runAfter(0, internal.marketplace.rewards.recalculateFreelancerLevel, {
        freelancerProfileId: t.freelancerId
      })));
      let s = t.freelancerId ? await ctx.db.get(t.freelancerId) : null,
        o = s ? await ctx.db.get(s.userId) : null;
      return o?.email && (await ctx.scheduler.runAfter(0, internal.lib.email.sendOrderCompleted, {
        freelancerEmail: o.email,
        freelancerName: s?.displayName || o.name || "Freelancer",
        orderNumber: t.orderNumber,
        orderTitle: t.title,
        amount: t.freelancerEarnings ?? t.amount,
        currency: t.currency ?? "EUR",
        orderId: args.orderId
      })), o && (await notifyUser(ctx, {
        userId: o._id,
        type: "order_completed",
        title: "Order completed",
        body: `${t.title} was approved by the client.`,
        link: `/orders/${t._id}`,
        metadata: {
          orderId: t._id
        }
      })), {
        success: !0
      };
    }
  }),
  requestRevision = mutation({
    args: {
      orderId: v.id("orders"),
      message: v.string()
    },
    returns: v.object({
      success: v.boolean(),
      revisionsUsed: v.number()
    }),
    handler: async (ctx, args) => {
      let t = await ctx.db.get(args.orderId);
      if (!t) throw new Error("Order not found");
      let a = await requireAuthUser(ctx);
      if (t.clientId !== a._id) throw new Error("Access denied: only the client can request a revision");
      requireOrderContext(a, t, "client");
      requireBetaOrder(t);
      await assertOrderNotDisputed(ctx, t);
      if (["local", "local_quote"].includes(t.orderType)) throw new Error("Use the local appointment workspace for this order.");
      if (t.status === "revision_requested") throw new Error("A revision has already been requested. Wait for the next delivery.");
      assertTransition(orderTransitions, t.status, "revision_requested");
      if (remainingRevisions(t) === 0) throw new Error("All included revisions have been used. Discuss any additional work with the freelancer.");
      let d = args.message.trim();
      if (d.length < 10 || d.length > 3e3) throw new Error("Revision feedback must be between 10 and 3,000 characters.");
      let s = (t.revisionsUsed ?? 0) + 1;
      await ctx.db.patch(args.orderId, {
        status: "revision_requested",
        revisionsUsed: s,
        updatedAt: Date.now()
      });
      let o = await ctx.db.query("conversations").withIndex("by_order", f => f.eq("orderId", t._id)).unique();
      if (o) {
        let f = Date.now();
        await ctx.db.insert("messages", {
          conversationId: o._id,
          senderId: a._id,
          content: d,
          messageType: "order_update",
          isRead: !1,
          createdAt: f
        }), await ctx.db.patch(o._id, {
          lastMessageAt: f,
          lastMessagePreview: d.slice(0, 140),
          ...(o.participant1 === a._id ? { unreadCount2: (o.unreadCount2 ?? 0) + 1 } : { unreadCount1: (o.unreadCount1 ?? 0) + 1 }),
          updatedAt: f
        });
      }
      let l = t.freelancerId ? await ctx.db.get(t.freelancerId) : null;
      return l && (await notifyUser(ctx, {
        userId: l.userId,
        type: "revision_requested",
        title: "Revision requested",
        body: `${t.title}: ${d.slice(0, 120)}`,
        link: `/orders/${t._id}`,
        metadata: {
          orderId: t._id
        }
      })), {
        success: !0,
        revisionsUsed: s
      };
    }
  }),
  getByIdInternal = internalQuery({
    args: {
      orderId: v.id("orders")
    },
    handler: async (ctx, args) => ctx.db.get(args.orderId)
  }),
  markReleased = internalMutation({
    args: {
      orderId: v.id("orders"),
      stripeTransferId: v.string()
    },
    returns: v.null(),
    handler: async (ctx, args) => {
      requireLivePaymentsEnabled("Stripe transfer reconciliation");
      let t = await ctx.db.get(args.orderId);
      if (!t) throw new Error("Order not found.");
      let a = Date.now();
      if (t.escrowStatus === "released" && t.stripeTransferId && t.stripeTransferId !== args.stripeTransferId) throw new Error("Order is already associated with a different Stripe transfer.");
      return await ctx.db.patch(args.orderId, {
        escrowStatus: "released",
        stripeTransferId: args.stripeTransferId,
        status: "completed",
        completedAt: a,
        updatedAt: a
      }), await completeLinkedProject(ctx, t, a, {
        afterExternalTransfer: !0
      }), null;
    }
  }),
  markRefunded = internalMutation({
    args: {
      orderId: v.id("orders")
    },
    returns: v.null(),
    handler: async (ctx, args) => (requireLivePaymentsEnabled("Stripe refund reconciliation"), await ctx.db.patch(args.orderId, {
      escrowStatus: "refunded",
      status: "cancelled",
      cancelledAt: Date.now(),
      updatedAt: Date.now()
    }), null)
  });
export { approve, create, createBetaGigOrder, createTransaction, deliver, getById, getByIdInternal, getByStripePaymentIntentId, getByUser, markRefunded, markReleased, requestRevision, updateStripePayment };
