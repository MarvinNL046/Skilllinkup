import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/marketplace/orders/[id]/milestones
 *
 * List milestones for an order, ordered by sort_order.
 * Accessible by both the client and freelancer on the order.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;
    const user = await requireAuth();

    // Verify the user is a party to this order
    const orderRows = await sql`
      SELECT o.id
      FROM orders o
      LEFT JOIN freelancer_profiles fp ON o.freelancer_id = fp.id
      WHERE o.id = ${orderId}
        AND (o.client_id = ${user.id} OR fp.user_id = ${user.id})
      LIMIT 1
    `;

    if (!orderRows || orderRows.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const milestones = await sql`
      SELECT
        id,
        order_id,
        title,
        COALESCE(description, '') AS description,
        amount,
        COALESCE(currency, 'EUR') AS currency,
        due_date,
        COALESCE(status, 'pending') AS status,
        stripe_payment_intent_id,
        delivered_at,
        approved_at,
        sort_order,
        created_at,
        updated_at
      FROM order_milestones
      WHERE order_id = ${orderId}
      ORDER BY sort_order ASC, created_at ASC
    `;

    return NextResponse.json({ milestones }, { status: 200 });
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('GET /api/marketplace/orders/[id]/milestones error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

interface MilestoneInput {
  title: string;
  description?: string;
  amount: number;
  due_date?: string;
}

/**
 * POST /api/marketplace/orders/[id]/milestones
 *
 * Bulk-create milestones for an order. Only the client can create milestones.
 * Total amount of all milestones must equal the order amount.
 *
 * Body: { milestones: [{ title, description, amount, due_date }] }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orderId } = await params;
    const user = await requireAuth();

    // Fetch the order and verify the caller is the client
    const orderRows = await sql`
      SELECT
        o.id,
        o.client_id,
        o.amount,
        o.currency,
        o.status
      FROM orders o
      WHERE o.id = ${orderId}
      LIMIT 1
    `;

    if (!orderRows || orderRows.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const order = orderRows[0];

    if (order.client_id !== user.id) {
      return NextResponse.json(
        { error: 'Only the client can create milestones for this order' },
        { status: 403 }
      );
    }

    // Check that no milestones exist yet
    const existingRows = await sql`
      SELECT id FROM order_milestones WHERE order_id = ${orderId} LIMIT 1
    `;
    if (existingRows && existingRows.length > 0) {
      return NextResponse.json(
        { error: 'Milestones have already been created for this order' },
        { status: 400 }
      );
    }

    // Parse body
    const body = await request.json();
    const milestoneInputs: MilestoneInput[] = Array.isArray(body.milestones) ? body.milestones : [];

    if (milestoneInputs.length === 0) {
      return NextResponse.json(
        { error: 'At least one milestone is required' },
        { status: 400 }
      );
    }

    // Validate each milestone
    for (const m of milestoneInputs) {
      if (!m.title || typeof m.title !== 'string' || m.title.trim() === '') {
        return NextResponse.json({ error: 'Each milestone must have a title' }, { status: 400 });
      }
      if (typeof m.amount !== 'number' || m.amount <= 0) {
        return NextResponse.json(
          { error: 'Each milestone must have a positive amount' },
          { status: 400 }
        );
      }
    }

    // Validate total matches order amount (with floating-point tolerance)
    const totalMilestoneAmount = milestoneInputs.reduce((sum, m) => sum + m.amount, 0);
    const orderAmount = Number(order.amount);
    if (Math.abs(totalMilestoneAmount - orderAmount) > 0.01) {
      return NextResponse.json(
        {
          error: `Total milestone amount (${totalMilestoneAmount}) must equal order amount (${orderAmount})`,
        },
        { status: 400 }
      );
    }

    // Insert milestones: first milestone gets status 'active', rest 'pending'
    const createdMilestones: Record<string, unknown>[] = [];
    for (let i = 0; i < milestoneInputs.length; i++) {
      const m = milestoneInputs[i];
      const status = i === 0 ? 'active' : 'pending';
      const dueDate = m.due_date ? m.due_date : null;

      const rows = await sql`
        INSERT INTO order_milestones (
          order_id,
          title,
          description,
          amount,
          currency,
          due_date,
          status,
          sort_order,
          created_at,
          updated_at
        ) VALUES (
          ${orderId},
          ${m.title.trim()},
          ${m.description ? m.description.trim() : null},
          ${m.amount},
          ${order.currency as string},
          ${dueDate},
          ${status},
          ${i + 1},
          NOW(),
          NOW()
        )
        RETURNING
          id,
          order_id,
          title,
          description,
          amount,
          currency,
          due_date,
          status,
          sort_order,
          created_at,
          updated_at
      `;
      createdMilestones.push(rows[0]);
    }

    return NextResponse.json({ milestones: createdMilestones }, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('POST /api/marketplace/orders/[id]/milestones error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
