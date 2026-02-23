import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { sql } from '@/lib/db';
import {
  createOrder,
  createNotification,
} from '@/lib/marketplace-queries';

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

async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent
): Promise<void> {
  const metadata = paymentIntent.metadata;

  const gigId = metadata.gig_id;
  const packageId = metadata.package_id;
  const clientId = metadata.client_id;
  const freelancerId = metadata.freelancer_id;
  const platformFee = parseFloat(metadata.platform_fee || '0');
  const requirements = metadata.requirements || '';
  const deliveryDays = parseInt(metadata.delivery_days || '7', 10);
  const gigTitle = metadata.gig_title || 'Service';
  const packageTitle = metadata.package_title || '';

  if (!gigId || !clientId || !freelancerId) {
    console.error(
      'payment_intent.succeeded: missing required metadata fields',
      { gigId, clientId, freelancerId }
    );
    return;
  }

  // Check if an order already exists for this PaymentIntent (idempotency guard)
  const existingOrders = await sql`
    SELECT id FROM orders
    WHERE stripe_payment_intent_id = ${paymentIntent.id}
    LIMIT 1
  `;

  if (existingOrders && existingOrders.length > 0) {
    // Order already created — this is a duplicate webhook delivery, ignore
    return;
  }

  // Determine the currency and amount from the PaymentIntent
  const currency = paymentIntent.currency.toUpperCase();
  const amount = paymentIntent.amount / 100; // convert from cents

  // Create the order
  const order = await createOrder({
    gig_id: gigId,
    package_id: packageId,
    client_id: clientId,
    freelancer_id: freelancerId,
    order_type: 'gig',
    title: packageTitle ? `${gigTitle} – ${packageTitle}` : gigTitle,
    amount,
    currency,
    delivery_days: deliveryDays,
  });

  // Update the order with the PaymentIntent ID and escrow status
  await sql`
    UPDATE orders
    SET
      stripe_payment_intent_id = ${paymentIntent.id},
      escrow_status = 'held',
      status = 'in_progress',
      requirements = ${requirements},
      updated_at = NOW()
    WHERE id = ${order.id}
  `;

  // Get the tenant_id for the transaction (use the client's tenant or a default)
  const tenantRows = await sql`
    SELECT tenant_id FROM users WHERE id = ${clientId} LIMIT 1
  `;
  const tenantId = (tenantRows[0]?.tenant_id as string | null) ?? null;

  // Create transaction record
  if (tenantId) {
    await sql`
      INSERT INTO transactions (
        tenant_id,
        order_id,
        payer_id,
        payee_id,
        amount,
        platform_fee,
        currency,
        transaction_type,
        stripe_payment_intent_id,
        status,
        description
      ) VALUES (
        ${tenantId},
        ${order.id},
        ${clientId},
        ${freelancerId},
        ${amount},
        ${platformFee},
        ${currency},
        'payment',
        ${paymentIntent.id},
        'completed',
        ${'Payment for: ' + (packageTitle ? `${gigTitle} – ${packageTitle}` : gigTitle)}
      )
    `;
  } else {
    // Insert transaction without tenant_id if not available
    await sql`
      INSERT INTO transactions (
        order_id,
        payer_id,
        payee_id,
        amount,
        platform_fee,
        currency,
        transaction_type,
        stripe_payment_intent_id,
        status,
        description
      ) VALUES (
        ${order.id},
        ${clientId},
        ${freelancerId},
        ${amount},
        ${platformFee},
        ${currency},
        'payment',
        ${paymentIntent.id},
        'completed',
        ${'Payment for: ' + (packageTitle ? `${gigTitle} – ${packageTitle}` : gigTitle)}
      )
    `;
  }

  // Resolve the client's user_id for notification if freelancerId is a profile ID
  const freelancerUserRows = await sql`
    SELECT user_id FROM freelancer_profiles WHERE id = ${freelancerId} LIMIT 1
  `;
  const freelancerUserId = (freelancerUserRows[0]?.user_id as string | null) ?? freelancerId;

  // Notify the client that their order has been created
  await createNotification(
    clientId,
    'order_created',
    'Order Confirmed',
    `Your order "${order.order_number}" has been placed successfully. The freelancer will start working shortly.`,
    `/en/orders/${order.id}`,
    { order_id: order.id, order_number: order.order_number }
  );

  // Notify the freelancer about the new order
  await createNotification(
    freelancerUserId,
    'new_order',
    'New Order Received',
    `You have a new order "${order.order_number}" for "${gigTitle}". Please start working on it.`,
    `/en/orders/${order.id}`,
    { order_id: order.id, order_number: order.order_number, gig_id: gigId }
  );
}

async function handlePaymentIntentFailed(
  paymentIntent: Stripe.PaymentIntent
): Promise<void> {
  const metadata = paymentIntent.metadata;
  const clientId = metadata.client_id;
  const gigTitle = metadata.gig_title || 'Service';

  console.error('payment_intent.payment_failed:', {
    paymentIntentId: paymentIntent.id,
    clientId,
    lastPaymentError: paymentIntent.last_payment_error?.message,
  });

  // Notify the client about the payment failure if we have their ID
  if (clientId) {
    try {
      await createNotification(
        clientId,
        'payment_failed',
        'Payment Failed',
        `Your payment for "${gigTitle}" could not be processed. Please try again.`,
        undefined,
        { payment_intent_id: paymentIntent.id }
      );
    } catch (notifErr) {
      console.error('Failed to send payment failure notification:', notifErr);
    }
  }
}
