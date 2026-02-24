import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { fetchQuery, fetchMutation } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { sendEmailAsync } from '@/lib/send-email';
import { OrderConfirmationEmail } from '@/emails/order-confirmation';
import { NewOrderEmail } from '@/emails/new-order';
import { PaymentFailedEmail } from '@/emails/payment-failed';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/stripe/webhook
// Handles incoming Stripe webhook events for payment processing.
export async function POST(request: NextRequest) {
  // Get raw body text for signature verification — MUST use text(), not json()
  const rawBody = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not configured');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  // Verify webhook signature
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid webhook signature' },
      { status: 400 }
    );
  }

  // Handle events
  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentSucceeded(paymentIntent);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentFailed(paymentIntent);
        break;
      }

      default:
        // Ignore unhandled event types
        break;
    }
  } catch (err) {
    console.error(`Error handling Stripe event ${event.type}:`, err);
    // Return 200 to prevent Stripe from retrying on our application errors
    // Log internally for investigation
    return NextResponse.json(
      { error: 'Event handling failed', received: true },
      { status: 200 }
    );
  }

  return NextResponse.json({ received: true });
}

/**
 * Look up a Convex user by their Clerk/Stack Auth ID.
 * Returns null if not found.
 */
async function getConvexUserByClerkId(clerkId: string) {
  try {
    return await fetchQuery(api.users.getByStackAuthId, { stackAuthId: clerkId });
  } catch {
    return null;
  }
}

/**
 * Get user contact info (email, name) for sending emails.
 */
async function getUserContact(convexUserId: Id<'users'>) {
  try {
    return await fetchQuery(api.users.getContact, { userId: convexUserId });
  } catch {
    return null;
  }
}

async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent
): Promise<void> {
  const metadata = paymentIntent.metadata;

  const gigId = metadata.gig_id;
  const packageId = metadata.package_id;
  // client_id is a Clerk user ID (stackAuthId)
  const clientClerkId = metadata.client_id;
  // freelancer_profile_id is a Convex Id<"freelancerProfiles">
  const freelancerProfileId = metadata.freelancer_profile_id;
  const platformFee = parseFloat(metadata.platform_fee || '0');
  const requirements = metadata.requirements || '';
  const deliveryDays = parseInt(metadata.delivery_days || '7', 10);
  const gigTitle = metadata.gig_title || 'Service';
  const packageTitle = metadata.package_title || '';

  if (!gigId || !clientClerkId || !freelancerProfileId) {
    console.error(
      'payment_intent.succeeded: missing required metadata fields',
      { gigId, clientClerkId, freelancerProfileId }
    );
    return;
  }

  // Check if an order already exists for this PaymentIntent (idempotency guard)
  const existingOrder = await fetchQuery(
    api.marketplace.orders.getByStripePaymentIntentId,
    { stripePaymentIntentId: paymentIntent.id }
  );

  if (existingOrder) {
    // Order already created — this is a duplicate webhook delivery, ignore
    return;
  }

  // Determine the currency and amount from the PaymentIntent
  const currency = paymentIntent.currency.toUpperCase();
  const amount = paymentIntent.amount / 100; // convert from cents

  // Resolve the Convex user ID for the client from their Clerk ID
  const clientConvexUser = await getConvexUserByClerkId(clientClerkId);
  if (!clientConvexUser) {
    console.error(
      'payment_intent.succeeded: could not find Convex user for client Clerk ID',
      clientClerkId
    );
    return;
  }

  const clientConvexId = clientConvexUser._id as Id<'users'>;

  // Get the freelancer profile to find their Convex user ID
  const freelancerProfile = await fetchQuery(
    api.marketplace.freelancers.getById,
    { profileId: freelancerProfileId as Id<'freelancerProfiles'> }
  );

  if (!freelancerProfile) {
    console.error(
      'payment_intent.succeeded: could not find freelancer profile',
      freelancerProfileId
    );
    return;
  }

  const freelancerConvexUserId = freelancerProfile.userId as Id<'users'>;

  // Create the order via Convex mutation
  const orderTitle = packageTitle ? `${gigTitle} – ${packageTitle}` : gigTitle;

  const orderId = await fetchMutation(api.marketplace.orders.create, {
    orderType: 'gig',
    title: orderTitle,
    amount,
    currency,
    deliveryDays,
    clientId: clientConvexId,
    freelancerId: freelancerProfileId as Id<'freelancerProfiles'>,
    gigId: gigId as Id<'gigs'>,
    gigPackageId: packageId as Id<'gigPackages'>,
  });

  // Update the order with PaymentIntent ID, escrow status, and requirements
  await fetchMutation(api.marketplace.orders.updateStripePayment, {
    orderId: orderId as Id<'orders'>,
    stripePaymentIntentId: paymentIntent.id,
    requirements: requirements || undefined,
  });

  // Create transaction record
  await fetchMutation(api.marketplace.orders.createTransaction, {
    orderId: orderId as Id<'orders'>,
    payerId: clientConvexId,
    payeeId: freelancerConvexUserId,
    amount,
    platformFee,
    currency,
    stripePaymentIntentId: paymentIntent.id,
    description: `Payment for: ${orderTitle}`,
  });

  // We need the order number for notifications and emails.
  // Fetch the created order to get its orderNumber.
  const createdOrder = await fetchQuery(api.marketplace.orders.getByStripePaymentIntentId, {
    stripePaymentIntentId: paymentIntent.id,
  });
  const orderNumber = createdOrder?.orderNumber ?? String(orderId);
  const orderIdStr = String(orderId);

  // Notify the client that their order has been created
  await fetchMutation(api.marketplace.notifications.create, {
    userId: clientConvexId,
    type: 'order_created',
    title: 'Order Confirmed',
    body: `Your order "${orderNumber}" has been placed successfully. The freelancer will start working shortly.`,
    link: `/en/orders/${orderIdStr}`,
    metadata: { order_id: orderIdStr, order_number: orderNumber },
  });

  // Notify the freelancer about the new order
  await fetchMutation(api.marketplace.notifications.create, {
    userId: freelancerConvexUserId,
    type: 'new_order',
    title: 'New Order Received',
    body: `You have a new order "${orderNumber}" for "${gigTitle}". Please start working on it.`,
    link: `/en/orders/${orderIdStr}`,
    metadata: { order_id: orderIdStr, order_number: orderNumber, gig_id: gigId },
  });

  // Send order confirmation email to client
  const clientContact = await getUserContact(clientConvexId);
  if (clientContact) {
    sendEmailAsync({
      to: clientContact.email,
      subject: `Order Confirmed: ${orderNumber}`,
      react: OrderConfirmationEmail({
        clientName: clientContact.name,
        orderNumber,
        orderTitle,
        amount,
        currency,
        deliveryDays,
        orderId: orderIdStr,
      }),
    });
  }

  // Send new order email to freelancer
  const freelancerContact = await getUserContact(freelancerConvexUserId);
  if (freelancerContact) {
    sendEmailAsync({
      to: freelancerContact.email,
      subject: `New Order: ${orderNumber}`,
      react: NewOrderEmail({
        freelancerName: freelancerContact.name,
        orderNumber,
        orderTitle,
        amount,
        currency,
        deliveryDays,
        orderId: orderIdStr,
      }),
    });
  }
}

async function handlePaymentIntentFailed(
  paymentIntent: Stripe.PaymentIntent
): Promise<void> {
  const metadata = paymentIntent.metadata;
  const clientClerkId = metadata.client_id;
  const gigTitle = metadata.gig_title || 'Service';

  console.error('payment_intent.payment_failed:', {
    paymentIntentId: paymentIntent.id,
    clientClerkId,
    lastPaymentError: paymentIntent.last_payment_error?.message,
  });

  // Notify the client about the payment failure if we have their ID
  if (clientClerkId) {
    try {
      const clientConvexUser = await getConvexUserByClerkId(clientClerkId);
      if (clientConvexUser) {
        const clientConvexId = clientConvexUser._id as Id<'users'>;

        await fetchMutation(api.marketplace.notifications.create, {
          userId: clientConvexId,
          type: 'payment_failed',
          title: 'Payment Failed',
          body: `Your payment for "${gigTitle}" could not be processed. Please try again.`,
          metadata: { payment_intent_id: paymentIntent.id },
        });

        // Send payment failed email
        const clientContact = await getUserContact(clientConvexId);
        if (clientContact) {
          sendEmailAsync({
            to: clientContact.email,
            subject: 'Payment Failed - SkillLinkup',
            react: PaymentFailedEmail({
              clientName: clientContact.name,
              gigTitle,
            }),
          });
        }
      }
    } catch (notifErr) {
      console.error('Failed to send payment failure notification:', notifErr);
    }
  }
}
