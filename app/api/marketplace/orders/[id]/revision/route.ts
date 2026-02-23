import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';
import { createNotification } from '@/lib/marketplace-queries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/marketplace/orders/[id]/revision
 *
 * Allows the client on an order to request a revision.
 * Order must be in 'delivered' status.
 * The order must have remaining revisions (revisions_used < revision_count).
 *
 * Body:
 *   { note: string }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;
    const user = await requireAuth();

    // Parse request body
    const body = await request.json();
    const note = String(body.note ?? '').trim();
    if (!note) {
      return NextResponse.json(
        { error: 'Revision note is required' },
        { status: 400 }
      );
    }

    // Fetch the order and verify this user is the client
    const orderRows = await sql`
      SELECT
        o.id,
        o.order_number,
        o.client_id,
        o.freelancer_id,
        o.title,
        o.status,
        COALESCE(o.revision_count, 0) AS revision_count,
        COALESCE(o.revisions_used, 0) AS revisions_used,
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
        { error: 'You are not authorized to request a revision for this order' },
        { status: 403 }
      );
    }

    // Validate status
    if (order.status !== 'delivered') {
      return NextResponse.json(
        {
          error: `Cannot request revision for an order with status '${order.status}'. Order must be 'delivered'.`,
        },
        { status: 400 }
      );
    }

    // Check available revisions
    const revisionsUsed = Number(order.revisions_used ?? 0);
    const revisionCount = Number(order.revision_count ?? 0);
    if (revisionCount > 0 && revisionsUsed >= revisionCount) {
      return NextResponse.json(
        {
          error: `No revisions remaining. This order included ${revisionCount} revision(s) and all have been used.`,
        },
        { status: 400 }
      );
    }

    // Update order: status = 'revision', increment revisions_used
    const updatedRows = await sql`
      UPDATE orders
      SET
        status = 'revision',
        revisions_used = COALESCE(revisions_used, 0) + 1,
        updated_at = NOW()
      WHERE id = ${orderId}
      RETURNING
        id,
        order_number,
        status,
        revisions_used,
        revision_count,
        updated_at
    `;

    const updatedOrder = updatedRows[0];

    // Store the revision note
    try {
      await sql`
        INSERT INTO order_revision_requests (
          order_id,
          client_id,
          note,
          created_at
        ) VALUES (
          ${orderId},
          ${user.id},
          ${note},
          NOW()
        )
      `;
    } catch {
      // Table may not exist yet; skip silently
    }

    // Notify the freelancer
    try {
      if (order.freelancer_user_id) {
        await createNotification(
          order.freelancer_user_id as string,
          'revision_requested',
          'Revision Requested',
          `The client has requested a revision for "${order.title}": ${note}`,
          `/en/dashboard/seller/orders/${orderId}`
        );
      }
    } catch {
      // Skip notification failure
    }

    return NextResponse.json(
      { order: updatedOrder, message: 'Revision requested successfully' },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    console.error('POST /api/marketplace/orders/[id]/revision error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
