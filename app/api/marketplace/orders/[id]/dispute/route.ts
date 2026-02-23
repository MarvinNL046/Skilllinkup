import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';
import { createNotification } from '@/lib/marketplace-queries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VALID_REASONS = [
  'not_delivered',
  'poor_quality',
  'not_as_described',
  'communication',
  'other',
] as const;

/**
 * GET /api/marketplace/orders/[id]/dispute
 *
 * Returns the dispute for an order if one exists.
 * Requires auth. The requesting user must be client or freelancer on the order.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;
    const user = await requireAuth();

    // Verify the user is a party on this order
    const orderRows = await sql`
      SELECT
        o.id,
        o.client_id,
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

    if (order.client_id !== user.id && order.freelancer_user_id !== user.id) {
      return NextResponse.json(
        { error: 'You are not authorized to view this dispute' },
        { status: 403 }
      );
    }

    const disputes = await sql`
      SELECT
        d.id,
        d.order_id,
        d.opened_by,
        d.reason,
        d.description,
        d.evidence,
        d.resolution,
        d.resolution_note,
        d.resolved_by,
        d.status,
        d.opened_at,
        d.resolved_at,
        d.created_at,
        d.updated_at
      FROM disputes d
      WHERE d.order_id = ${orderId}
      ORDER BY d.created_at DESC
      LIMIT 1
    `;

    if (!disputes || disputes.length === 0) {
      return NextResponse.json({ dispute: null }, { status: 200 });
    }

    return NextResponse.json({ dispute: disputes[0] }, { status: 200 });
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    console.error('GET /api/marketplace/orders/[id]/dispute error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/marketplace/orders/[id]/dispute
 *
 * Opens a dispute for an order.
 * - Order must be in 'delivered' or 'active' status
 * - User must be client or freelancer on this order
 * - No existing open dispute on this order
 *
 * Body: { reason, description, evidence: [{ type: 'text'|'url', content: string }] }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;
    const user = await requireAuth();

    const body = await request.json();
    const reason = String(body.reason ?? '').trim();
    const description = String(body.description ?? '').trim();
    const evidence = Array.isArray(body.evidence) ? body.evidence : [];

    // Validate reason
    if (!VALID_REASONS.includes(reason as (typeof VALID_REASONS)[number])) {
      return NextResponse.json(
        {
          error: `Invalid reason. Must be one of: ${VALID_REASONS.join(', ')}`,
        },
        { status: 400 }
      );
    }

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    // Fetch the order with party info
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
      LEFT JOIN freelancer_profiles fp ON o.freelancer_id = fp.id
      WHERE o.id = ${orderId}
      LIMIT 1
    `;

    if (!orderRows || orderRows.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const order = orderRows[0];

    // Verify the user is a party on this order
    const isClient = order.client_id === user.id;
    const isFreelancer = order.freelancer_user_id === user.id;

    if (!isClient && !isFreelancer) {
      return NextResponse.json(
        { error: 'You are not authorized to open a dispute for this order' },
        { status: 403 }
      );
    }

    // Validate order status
    if (order.status !== 'delivered' && order.status !== 'active') {
      return NextResponse.json(
        {
          error: `Cannot open a dispute for an order with status '${order.status}'. Order must be 'delivered' or 'active'.`,
        },
        { status: 400 }
      );
    }

    // Check for existing open dispute
    const existingDisputes = await sql`
      SELECT id
      FROM disputes
      WHERE order_id = ${orderId}
        AND status IN ('open', 'under_review')
      LIMIT 1
    `;

    if (existingDisputes && existingDisputes.length > 0) {
      return NextResponse.json(
        { error: 'A dispute is already open for this order' },
        { status: 409 }
      );
    }

    // Validate and sanitize evidence items
    const sanitizedEvidence = evidence
      .filter(
        (item: unknown) =>
          item !== null &&
          typeof item === 'object' &&
          'type' in (item as object) &&
          'content' in (item as object) &&
          ['text', 'url'].includes((item as { type: string }).type) &&
          String((item as { content: string }).content).trim().length > 0
      )
      .map((item: { type: string; content: string }) => ({
        type: item.type,
        content: String(item.content).trim(),
      }));

    // Create the dispute
    const disputeRows = await sql`
      INSERT INTO disputes (
        order_id,
        opened_by,
        reason,
        description,
        evidence,
        status,
        opened_at,
        created_at,
        updated_at
      ) VALUES (
        ${orderId},
        ${user.id},
        ${reason},
        ${description},
        ${JSON.stringify(sanitizedEvidence)}::JSONB,
        'open',
        NOW(),
        NOW(),
        NOW()
      )
      RETURNING
        id,
        order_id,
        opened_by,
        reason,
        description,
        evidence,
        status,
        opened_at,
        created_at
    `;

    const dispute = disputeRows[0];

    // Update order status to 'disputed'
    await sql`
      UPDATE orders
      SET
        status = 'disputed',
        updated_at = NOW()
      WHERE id = ${orderId}
    `;

    // Notify the other party
    try {
      const notifyUserId = isClient
        ? (order.freelancer_user_id as string)
        : (order.client_id as string);

      if (notifyUserId) {
        await createNotification(
          notifyUserId,
          'dispute_opened',
          'Dispute Opened',
          `A dispute has been opened for order "${order.title}". Please review and respond.`,
          `/en/dashboard/orders/${orderId}/dispute`
        );
      }
    } catch {
      // Notification failure should not block the response
    }

    return NextResponse.json(
      { dispute, message: 'Dispute opened successfully' },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    console.error('POST /api/marketplace/orders/[id]/dispute error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
