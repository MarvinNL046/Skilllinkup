import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";

// ---------------------------------------------------------------------------
// POST /api/stripe/webhook
//
// Receives and processes signed webhook events from Stripe.
//
// SETUP REQUIRED:
//   1. Add STRIPE_WEBHOOK_SECRET to .env.local.
//      Get it from: https://dashboard.stripe.com/webhooks
//      (create a new webhook endpoint pointing to this route)
//   2. The webhook endpoint URL in Stripe should be:
//      https://skilllinkup.com/api/stripe/webhook
//      (or https://your-ngrok-url/api/stripe/webhook for local testing)
//
//   Events to subscribe to in the Stripe dashboard:
//     - checkout.session.completed
//     - account.updated
//     - payment_intent.succeeded
//     - charge.dispute.created
//
// HOW IT WORKS:
//   checkout.session.completed
//     → Creates an order in Convex, updates payment status
//   account.updated
//     → Marks the freelancer's Stripe onboarding as complete when
//       charges_enabled becomes true
// ---------------------------------------------------------------------------

// Convex HTTP client for calling mutations from outside Convex.
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
const SERVER_SECRET = process.env.INTERNAL_EMAIL_SECRET;

// Next.js App Router requires raw body access for signature verification.
// This config disables the automatic body parser so we can read raw bytes.
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  // Guard: Stripe not configured yet.
  if (!stripe) {
    console.error("[stripe/webhook] Stripe not configured.");
    return NextResponse.json(
      { error: "Stripe not configured" },
      { status: 503 }
    );
  }

  const sig = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Guard: webhook secret not configured.
  if (!webhookSecret) {
    console.error(
      "[stripe/webhook] STRIPE_WEBHOOK_SECRET is not set – cannot verify events."
    );
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 503 }
    );
  }
  if (!SERVER_SECRET) {
    console.error("[stripe/webhook] INTERNAL_EMAIL_SECRET is not set.");
    return NextResponse.json(
      { error: "Server secret not configured" },
      { status: 503 }
    );
  }

  // Read raw body as a buffer for signature verification.
  // stripe.webhooks.constructEvent requires the raw bytes, not a parsed object.
  const rawBody = await request.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("[stripe/webhook] Signature verification failed:", err.message);
    return NextResponse.json(
      { error: `Webhook signature invalid: ${err.message}` },
      { status: 400 }
    );
  }

  // Route to the correct handler based on event type.
  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event.data.object);
        break;

      case "account.updated":
        await handleAccountUpdated(event.data.object);
        break;

      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(event.data.object);
        break;

      case "charge.dispute.created":
        await handleChargeDisputeCreated(event.data.object);
        break;

      default:
        // Silently ignore unhandled events – Stripe expects a 200 either way.
        console.log(`[stripe/webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(`[stripe/webhook] Error handling event ${event.type}:`, err);
    // Return 500 so Stripe retries the event.
    return NextResponse.json(
      { error: "Webhook handler error" },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// Handler: checkout.session.completed
// ---------------------------------------------------------------------------

/**
 * Called when a buyer successfully completes a Stripe Checkout session.
 *
 * Steps:
 *   1. Extract metadata (gigId, packageId) from the session.
 *   2. Fetch the gig package from Convex to get deliveryDays, freelancerId, etc.
 *   3. Create a Convex order and link it to the Stripe PaymentIntent.
 *   4. Create a transaction record for accounting.
 *
 * Idempotency: if an order with the same PaymentIntent already exists we skip
 * creation (Stripe may replay the event).
 */
async function handleCheckoutSessionCompleted(session) {
  const paymentIntentId = session.payment_intent;
  const { gigId, packageId } = session.metadata || {};

  // Check if this is a credit purchase (pay-per-lead)
  if (session.metadata?.type === "credit_purchase") {
    await handleCreditPurchase(session);
    return;
  }

  if (!paymentIntentId) {
    console.warn("[stripe/webhook] checkout.session.completed: no payment_intent on session.");
    return;
  }

  // Idempotency check: bail out if we already processed this payment.
  const existing = await convex.query(
    api.marketplace.orders.getByStripePaymentIntentId,
    {
      stripePaymentIntentId: paymentIntentId,
      serverSecret: SERVER_SECRET,
    }
  );

  if (existing) {
    console.log(
      `[stripe/webhook] Order for PaymentIntent ${paymentIntentId} already exists – skipping.`
    );
    return;
  }

  // Fetch the gig package from Convex so we can create a fully-populated order.
  // NOTE: If the package cannot be found (e.g. deleted) we log and bail out.
  let gigPackage;
  try {
    gigPackage = await convex.query(api.marketplace.gigs.getPackageById, {
      packageId,
    });
  } catch (err) {
    console.error("[stripe/webhook] Failed to fetch gig package from Convex:", err);
    return;
  }

  if (!gigPackage) {
    console.error(`[stripe/webhook] Gig package ${packageId} not found – cannot create order.`);
    return;
  }

  // Fetch the gig to get the freelancer profile ID.
  let gig;
  try {
    gig = await convex.query(api.marketplace.gigs.getById, { gigId });
  } catch (err) {
    console.error("[stripe/webhook] Failed to fetch gig from Convex:", err);
    return;
  }

  if (!gig) {
    console.error(`[stripe/webhook] Gig ${gigId} not found – cannot create order.`);
    return;
  }

  // Resolve buyer's Convex user ID from the Stripe customer email.
  // The buyer's email is available on the checkout session.
  const buyerEmail = session.customer_details?.email || session.customer_email;
  let clientUser;
  if (buyerEmail) {
    try {
      clientUser = await convex.query(api.users.getByEmail, {
        email: buyerEmail,
        serverSecret: SERVER_SECRET,
      });
    } catch (err) {
      console.error("[stripe/webhook] Failed to resolve buyer email to Convex user:", err);
    }
  }
  if (!buyerEmail || !clientUser) {
    throw new Error(
      `Cannot resolve buyer account for checkout session ${session.id}.`
    );
  }

  // Amount is stored in Stripe as cents; convert back to the display unit.
  const amountCents = session.amount_total || 0;
  const amount = amountCents / 100;
  const currency = (session.currency || "eur").toUpperCase();

  // Create the order in Convex using the shared server secret.
  let orderId;
  try {
    orderId = await convex.mutation(api.marketplace.orders.create, {
      orderType: "gig",
      title: `${gig.title} – ${gigPackage.title}`,
      amount,
      currency,
      deliveryDays: gigPackage.deliveryDays,
      clientId: clientUser._id,
      freelancerId: gig.freelancerId,
      gigId: gig._id,
      gigPackageId: gigPackage._id,
      serverSecret: SERVER_SECRET,
    });
  } catch (err) {
    console.error("[stripe/webhook] Failed to create Convex order:", err);
    throw err;
  }

  // Link the Stripe PaymentIntent to the Convex order.
  try {
    await convex.mutation(api.marketplace.orders.updateStripePayment, {
      orderId,
      stripePaymentIntentId: paymentIntentId,
      serverSecret: SERVER_SECRET,
    });
  } catch (err) {
    console.error("[stripe/webhook] Failed to update Stripe payment on order:", err);
  }

  // Create a transaction record for accounting / statements.
  try {
    await convex.mutation(api.marketplace.orders.createTransaction, {
      orderId,
      payerId: clientUser._id,
      amount,
      currency,
      stripePaymentIntentId: paymentIntentId,
      description: `Payment for gig: ${gig.title}`,
      serverSecret: SERVER_SECRET,
    });
  } catch (err) {
    console.error("[stripe/webhook] Failed to create transaction record:", err);
  }

  console.log(
    `[stripe/webhook] Order ${orderId} created for PaymentIntent ${paymentIntentId}.`
  );
}

// ---------------------------------------------------------------------------
// Handler: credit purchase (pay-per-lead)
// ---------------------------------------------------------------------------

async function handleCreditPurchase(session) {
  const { credits, freelancerUserId, packageId } = session.metadata || {};

  if (!credits || !freelancerUserId) {
    console.error(
      "[stripe/webhook] Credit purchase missing metadata:",
      session.metadata
    );
    return;
  }

  const creditsNum = parseInt(credits, 10);
  if (!creditsNum || creditsNum <= 0) {
    console.error("[stripe/webhook] Invalid credits value:", credits);
    return;
  }

  try {
    await convex.mutation(api.marketplace.leads.addCredits, {
      freelancerUserId,
      credits: creditsNum,
      stripeSessionId: session.id,
      description: `Purchased ${creditsNum} credits (${packageId} package)`,
      serverSecret: SERVER_SECRET,
    });

    console.log(
      `[stripe/webhook] Added ${creditsNum} credits to user ${freelancerUserId} (session: ${session.id})`
    );
  } catch (err) {
    console.error("[stripe/webhook] Failed to add credits:", err);
  }
}

// ---------------------------------------------------------------------------
// Handler: account.updated
// ---------------------------------------------------------------------------

/**
 * Called whenever a connected Express account's details change.
 * We use this to detect when a freelancer completes onboarding
 * (charges_enabled flips to true) and mark it in Convex.
 */
async function handleAccountUpdated(account) {
  const convexUserId = account.metadata?.convexUserId;

  if (!convexUserId) {
    // This account was not created via SkillLinkup's Connect flow.
    return;
  }

  if (account.charges_enabled) {
    try {
      await convex.mutation(api.marketplace.freelancers.setOnboardingComplete, {
        userId: convexUserId,
        serverSecret: SERVER_SECRET,
      });
      console.log(
        `[stripe/webhook] Marked Stripe onboarding complete for user ${convexUserId}.`
      );
    } catch (err) {
      console.error(
        "[stripe/webhook] Failed to mark onboarding complete in Convex:",
        err
      );
    }
  }
}

// ---------------------------------------------------------------------------
// Handler: payment_intent.succeeded
// Confirms escrow is held. Safety-net log — no DB action needed since
// checkout.session.completed already creates the order.
// ---------------------------------------------------------------------------
async function handlePaymentIntentSucceeded(paymentIntent) {
  const existing = await convex.query(
    api.marketplace.orders.getByStripePaymentIntentId,
    {
      stripePaymentIntentId: paymentIntent.id,
      serverSecret: SERVER_SECRET,
    }
  );
  if (!existing) {
    // Order not yet created (checkout.session.completed may still be in flight)
    console.log(`[stripe/webhook] PaymentIntent ${paymentIntent.id} succeeded — no order found yet (checkout event may still be processing)`);
    return;
  }
  console.log(`[stripe/webhook] PaymentIntent ${paymentIntent.id} succeeded — escrow held for order ${existing._id}`);
}

// ---------------------------------------------------------------------------
// Handler: charge.dispute.created
// A cardholder filed a chargeback. Opens a dispute in Convex which cancels
// the auto-release job and freezes escrow.
// ---------------------------------------------------------------------------
async function handleChargeDisputeCreated(dispute) {
  const paymentIntentId = dispute.payment_intent;
  if (!paymentIntentId) {
    console.warn("[stripe/webhook] charge.dispute.created: no payment_intent on dispute — skipping");
    return;
  }

  const order = await convex.query(
    api.marketplace.orders.getByStripePaymentIntentId,
    {
      stripePaymentIntentId:
        typeof paymentIntentId === "string" ? paymentIntentId : paymentIntentId.id,
      serverSecret: SERVER_SECRET,
    }
  );

  if (!order) {
    console.warn(`[stripe/webhook] charge.dispute.created: no order found for PaymentIntent ${paymentIntentId}`);
    return;
  }

  // Open a dispute in Convex — this cancels auto-release and sets escrowStatus: "disputed"
  // disputes.open requires an authenticated user, so we open it as the order's client
  try {
    await convex.mutation(api.marketplace.disputes.open, {
      orderId: order._id,
      reason: "chargeback",
      description: `Stripe chargeback filed automatically. Stripe dispute ID: ${dispute.id}. Reason: ${dispute.reason}.`,
      openedByUserId: order.clientId,
      serverSecret: SERVER_SECRET,
    });
    console.log(`[stripe/webhook] Dispute opened in Convex for order ${order._id} (Stripe chargeback: ${dispute.id})`);
  } catch (err) {
    // A dispute may already exist for this order — log and continue
    console.warn(`[stripe/webhook] Could not open dispute for order ${order._id}: ${err.message}`);
  }
}
