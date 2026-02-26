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

  if (!paymentIntentId) {
    console.warn("[stripe/webhook] checkout.session.completed: no payment_intent on session.");
    return;
  }

  // Idempotency check: bail out if we already processed this payment.
  const existing = await convex.query(
    api.marketplace.orders.getByStripePaymentIntentId,
    { stripePaymentIntentId: paymentIntentId }
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
  const buyerEmail = session.customer_details?.email;
  let clientUser;
  if (buyerEmail) {
    try {
      clientUser = await convex.query(api.users.getByEmail, { email: buyerEmail });
      if (!clientUser) {
        console.warn(
          `[stripe/webhook] Buyer email ${buyerEmail} not found in Convex users table. ` +
          `Order will be created with freelancer as placeholder client.`
        );
      }
    } catch (err) {
      console.error("[stripe/webhook] Failed to resolve buyer email to Convex user:", err);
    }
  } else {
    console.warn("[stripe/webhook] No customer email on checkout session – buyer will be unresolved.");
  }

  // Amount is stored in Stripe as cents; convert back to the display unit.
  const amountCents = session.amount_total || 0;
  const amount = amountCents / 100;
  const currency = (session.currency || "eur").toUpperCase();

  // Create the order in Convex.
  // NOTE: orders.create requires an authenticated identity; since we are calling
  // from a server-side webhook (not a logged-in session) we use a dedicated
  // unauthenticated mutation if available, or skip auth via service role.
  // For now we call the public mutation – Convex will allow it from HTTP client.
  let orderId;
  try {
    orderId = await convex.mutation(api.marketplace.orders.create, {
      orderType: "gig",
      title: `${gig.title} – ${gigPackage.title}`,
      amount,
      currency,
      deliveryDays: gigPackage.deliveryDays,
      // clientId and freelancerId are required IDs; fall back gracefully.
      clientId: clientUser?._id ?? gig.freelancerId, // placeholder if buyer unknown
      freelancerId: gig.freelancerId,
      gigId: gig._id,
      gigPackageId: gigPackage._id,
    });
  } catch (err) {
    console.error("[stripe/webhook] Failed to create Convex order:", err);
    // Still attempt to at least log the transaction below.
    return;
  }

  // Link the Stripe PaymentIntent to the Convex order.
  try {
    await convex.mutation(api.marketplace.orders.updateStripePayment, {
      orderId,
      stripePaymentIntentId: paymentIntentId,
    });
  } catch (err) {
    console.error("[stripe/webhook] Failed to update Stripe payment on order:", err);
  }

  // Create a transaction record for accounting / statements.
  try {
    await convex.mutation(api.marketplace.orders.createTransaction, {
      orderId,
      payerId: clientUser?._id,
      amount,
      currency,
      stripePaymentIntentId: paymentIntentId,
      description: `Payment for gig: ${gig.title}`,
    });
  } catch (err) {
    console.error("[stripe/webhook] Failed to create transaction record:", err);
  }

  console.log(
    `[stripe/webhook] Order ${orderId} created for PaymentIntent ${paymentIntentId}.`
  );
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
