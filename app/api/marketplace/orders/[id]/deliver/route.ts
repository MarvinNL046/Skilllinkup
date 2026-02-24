import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireFreelancer } from '@/lib/auth-helpers';
import { createNotification } from '@/lib/marketplace-queries';
import { sendEmailAsync } from '@/lib/send-email';
import { getUserContact } from '@/lib/get-user-email';
import { OrderDeliveredEmail } from '@/emails/order-delivered';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/marketplace/orders/[id]/deliver
 *
 * Allows the freelancer assigned to an order to mark it as delivered.
 * Order must be in 'active' or 'revision' status.
 *
 * Body:
 *   { message: string; fileUrls?: string[] }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;
    const { user, profile } = await requireFreelancer();

    // Parse request body
    const body = await request.json();
    const message = String(body.message ?? '').trim();
    if (!message) {
      return NextResponse.json(
        { error: 'Delivery message is required' },
        { status: 400 }
      );
    }
    const fileUrls: string[] = Array.isArray(body.fileUrls) ? body.fileUrls : [];

    // Fetch the order and verify this freelancer is assigned to it
    const orderRows = await sql`
      SELECT
        o.id,
        o.order_number,
        o.client_id,
        o.freelancer_id,
        o.title,
        o.status,
        fp.user_id AS freelancer_user_id
      FROM orders o
      JOIN freelancer_profiles fp ON o.freelancer_id = fp.id
      WHERE o.id = ${orderId}
      LIMIT 1
    `;

    if (!orderRows || orderRows.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const order = orderRows[0];

    // Verify the caller is the freelancer on this order
    if (order.freelancer_user_id !== user.id || order.freelancer_id !== profile.id) {
      return NextResponse.json(
        { error: 'You are not authorized to deliver this order' },
        { status: 403 }
      );
    }

    // Validate status
    if (order.status !== 'active' && order.status !== 'revision') {
      return NextResponse.json(
        {
          error: `Cannot deliver an order with status '${order.status}'. Order must be 'active' or 'revision'.`,
        },
        { status: 400 }
      );
    }

    // Update order status to 'delivered'
    const updatedRows = await sql`
      UPDATE orders
      SET
        status = 'delivered',
        updated_at = NOW()
      WHERE id = ${orderId}
      RETURNING
        id,
        order_number,
        status,
        updated_at
    `;

    const updatedOrder = updatedRows[0];

    // Insert deliverable record if there is a message or files
    try {
      await sql`
        INSERT INTO order_deliverables (
          order_id,
          freelancer_id,
          message,
          file_urls,
          created_at
        ) VALUES (
          ${orderId},
          ${profile.id},
          ${message},
          ${JSON.stringify(fileUrls)}::JSONB,
          NOW()
        )
      `;
    } catch {
      // Table may not exist yet; skip silently and proceed
    }

    // Notify the client
    try {
      await createNotification(
        order.client_id as string,
        'order_delivered',
        'Order Delivered',
        `Your order "${order.title}" has been delivered. Please review and approve.`,
        `/en/dashboard/orders/${orderId}`
      );
    } catch {
      // Notification failure should not block the response
    }

    // Send delivery email to client
    const clientContact = await getUserContact(order.client_id as string);
    if (clientContact) {
      sendEmailAsync({
        to: clientContact.email,
        subject: `Order Delivered: ${order.order_number}`,
        react: OrderDeliveredEmail({
          clientName: clientContact.name,
          orderNumber: order.order_number as string,
          orderTitle: order.title as string,
          orderId,
        }),
      });
    }

    return NextResponse.json(
      { order: updatedOrder, message: 'Order delivered successfully' },
      { status: 200 }
    );
  } catch (err) {
    if (
      err instanceof Error &&
      (err.message === 'Unauthorized' || err.message === 'No active freelancer profile')
    ) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    console.error('POST /api/marketplace/orders/[id]/deliver error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
