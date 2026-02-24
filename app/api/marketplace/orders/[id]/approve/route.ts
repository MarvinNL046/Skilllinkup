import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';
import { createNotification } from '@/lib/marketplace-queries';
import { sendEmailAsync } from '@/lib/send-email';
import { getUserContact } from '@/lib/get-user-email';
import { OrderCompletedEmail } from '@/emails/order-completed';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/marketplace/orders/[id]/approve
 *
 * Allows the client on an order to approve the delivery and release payment.
 * Order must be in 'delivered' status.
 *
 * The actual Stripe transfer was set up automatically via transfer_data
 * in the original PaymentIntent. We update our database state to reflect
 * that the payment has been released.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;
    const user = await requireAuth();

    // Fetch the order and verify this user is the client
    const orderRows = await sql`
      SELECT
        o.id,
        o.order_number,
        o.client_id,
        o.freelancer_id,
        o.title,
        o.status,
        o.amount,
        o.freelancer_earnings,
        o.currency,
        o.gig_id,
        fp.user_id AS freelancer_user_id
      FROM orders o
      LEFT JOIN freelancer_profiles fp ON o.freelancer_id = fp.id
      WHERE o.id = ${orderId}
      LIMIT 1
    `;

    if (!orderRows || orderRows.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const order = orderRows[0];

    // Verify the caller is the client on this order
    if (order.client_id !== user.id) {
      return NextResponse.json(
        { error: 'You are not authorized to approve this order' },
        { status: 403 }
      );
    }

    // Validate status
    if (order.status !== 'delivered') {
      return NextResponse.json(
        {
          error: `Cannot approve an order with status '${order.status}'. Order must be 'delivered'.`,
        },
        { status: 400 }
      );
    }

    // Update order: status = 'completed', escrow_status = 'released', completed_at = NOW()
    const updatedRows = await sql`
      UPDATE orders
      SET
        status = 'completed',
        escrow_status = 'released',
        completed_at = NOW(),
        updated_at = NOW()
      WHERE id = ${orderId}
      RETURNING
        id,
        order_number,
        status,
        escrow_status,
        completed_at,
        updated_at
    `;

    const updatedOrder = updatedRows[0];

    // Create a payout transaction record
    try {
      await sql`
        INSERT INTO marketplace_transactions (
          order_id,
          user_id,
          type,
          amount,
          currency,
          status,
          created_at
        ) VALUES (
          ${orderId},
          ${order.freelancer_user_id as string},
          'payout',
          ${order.freelancer_earnings as number},
          ${order.currency as string},
          'completed',
          NOW()
        )
      `;
    } catch {
      // Transactions table may not exist; skip and continue
    }

    // Update freelancer profile stats
    try {
      await sql`
        UPDATE freelancer_profiles
        SET
          total_orders = COALESCE(total_orders, 0) + 1,
          total_earnings = COALESCE(total_earnings, 0) + ${order.freelancer_earnings as number},
          updated_at = NOW()
        WHERE id = ${order.freelancer_id as string}
      `;
    } catch {
      // Skip if column doesn't exist
    }

    // Update gig order count
    if (order.gig_id) {
      try {
        await sql`
          UPDATE gigs
          SET order_count = COALESCE(order_count, 0) + 1
          WHERE id = ${order.gig_id as string}
        `;
      } catch {
        // Skip on error
      }
    }

    // Notify freelancer
    try {
      if (order.freelancer_user_id) {
        await createNotification(
          order.freelancer_user_id as string,
          'order_completed',
          'Order Completed & Payment Released',
          `The client approved your delivery for "${order.title}". Payment has been released.`,
          `/en/dashboard/seller/orders/${orderId}`
        );
      }
    } catch {
      // Skip notification failure
    }

    // Send payment released email to freelancer
    if (order.freelancer_user_id) {
      const freelancerContact = await getUserContact(order.freelancer_user_id as string);
      if (freelancerContact) {
        sendEmailAsync({
          to: freelancerContact.email,
          subject: `Payment Released: ${order.order_number}`,
          react: OrderCompletedEmail({
            freelancerName: freelancerContact.name,
            orderNumber: order.order_number as string,
            orderTitle: order.title as string,
            amount: order.freelancer_earnings as number,
            currency: order.currency as string,
            orderId,
          }),
        });
      }
    }

    // Notify client (confirmation)
    try {
      await createNotification(
        user.id,
        'order_approved',
        'Order Approved',
        `You have approved the delivery for "${order.title}".`,
        `/en/dashboard/orders/${orderId}`
      );
    } catch {
      // Skip notification failure
    }

    return NextResponse.json(
      { order: updatedOrder, message: 'Order approved and payment released' },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    console.error('POST /api/marketplace/orders/[id]/approve error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
