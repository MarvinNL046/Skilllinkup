"use node";

import { v } from "convex/values";
import { internalAction } from "../_generated/server";
import { internal } from "../_generated/api";
import Stripe from "stripe";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY not set in Convex environment");
  return new Stripe(key, { apiVersion: "2026-02-25.clover" });
}

/**
 * Transfer freelancer earnings from platform account to freelancer's Stripe account.
 * Called by: orders.approve, orders.autoRelease, disputes.resolve (freelancer wins)
 */
export const releaseToFreelancer = internalAction({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.runQuery(internal.marketplace.orders.getByIdInternal, {
      orderId: args.orderId,
    });
    if (!order) throw new Error(`Order ${args.orderId} not found`);
    if (order.escrowStatus === "released") {
      console.log(`[escrow] Order ${args.orderId} already released — skipping`);
      return;
    }
    if (!order.stripePaymentIntentId) {
      throw new Error(`Order ${args.orderId} has no stripePaymentIntentId`);
    }

    // Get freelancer's Stripe account ID from Convex DB (never from Stripe metadata)
    const freelancerProfile = order.freelancerId
      ? await ctx.runQuery(internal.marketplace.freelancers.getProfileById, {
          profileId: order.freelancerId,
        })
      : null;
    const stripeAccountId = freelancerProfile?.stripeAccountId;
    if (!stripeAccountId) {
      throw new Error(
        `Freelancer for order ${args.orderId} has no Stripe account (freelancerId: ${order.freelancerId ?? "missing"})`
      );
    }

    const stripe = getStripe();

    // Retrieve the charge ID from the PaymentIntent (source_transaction requires a charge ID, not PI ID)
    const paymentIntent = await stripe.paymentIntents.retrieve(
      order.stripePaymentIntentId
    );
    const chargeId = typeof paymentIntent.latest_charge === "string"
      ? paymentIntent.latest_charge
      : paymentIntent.latest_charge?.id;
    if (!chargeId) throw new Error(`No charge found on PaymentIntent ${order.stripePaymentIntentId}`);

    const amountCents = Math.round(order.freelancerEarnings * 100);
    if (!amountCents || amountCents <= 0) {
      throw new Error(`Invalid freelancerEarnings for order ${args.orderId}: ${order.freelancerEarnings}`);
    }

    const transfer = await stripe.transfers.create(
      {
        amount: amountCents,
        currency: (order.currency ?? "EUR").toLowerCase(),
        destination: stripeAccountId,
        source_transaction: chargeId,
        metadata: { orderId: args.orderId },
      },
      { idempotencyKey: `release-${args.orderId}` }
    );

    await ctx.runMutation(internal.marketplace.orders.markReleased, {
      orderId: args.orderId,
      stripeTransferId: transfer.id,
    });

    console.log(`[escrow] Released ${amountCents} cents to ${stripeAccountId} for order ${args.orderId}`);
  },
});

/**
 * Refund the client's payment in full.
 * Called by: disputes.resolve (client wins)
 */
export const refundToClient = internalAction({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.runQuery(internal.marketplace.orders.getByIdInternal, {
      orderId: args.orderId,
    });
    if (!order) throw new Error(`Order ${args.orderId} not found`);
    if (order.escrowStatus === "refunded") {
      console.log(`[escrow] Order ${args.orderId} already refunded — skipping`);
      return;
    }
    if (!order.stripePaymentIntentId) {
      throw new Error(`Order ${args.orderId} has no stripePaymentIntentId`);
    }

    const stripe = getStripe();

    // Retrieve the PaymentIntent to get the charge ID
    const paymentIntent = await stripe.paymentIntents.retrieve(
      order.stripePaymentIntentId
    );
    const chargeId = typeof paymentIntent.latest_charge === "string"
      ? paymentIntent.latest_charge
      : paymentIntent.latest_charge?.id;

    if (!chargeId) throw new Error(`No charge found on PaymentIntent ${order.stripePaymentIntentId}`);

    await stripe.refunds.create(
      { charge: chargeId },
      { idempotencyKey: `refund-${args.orderId}` }
    );

    await ctx.runMutation(internal.marketplace.orders.markRefunded, {
      orderId: args.orderId,
    });

    console.log(`[escrow] Refunded charge ${chargeId} for order ${args.orderId}`);
  },
});
