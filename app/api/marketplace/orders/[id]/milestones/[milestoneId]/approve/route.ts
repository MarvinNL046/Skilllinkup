import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';
import { createNotification, calculatePlatformFee } from '@/lib/marketplace-queries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/marketplace/orders/[id]/milestones/[milestoneId]/approve
 *
 * Allows the client on an order to approve a delivered milestone.
 * The milestone must be in 'delivered' status.
 *
 * On approval:
 * - Sets status to 'approved', records approved_at
 * - Creates a transaction record for the proportional freelancer payout
 * - Activates the next pending milestone (if any)
 * - If all milestones are approved, marks the order as 'completed'
 * - Notifies the freelancer
 */
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; milestoneId: string }> }
) {
  try {
    const { id: orderId, milestoneId } = await params;
    const user = await requireAuth();

    // Fetch the order and verify caller is the client
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
        { error: 'You are not authorized to approve milestones for this order' },
        { status: 403 }
      );
    }

    // Fetch the specific milestone
    const milestoneRows = await sql`
      SELECT id, order_id, title, status, amount, currency
      FROM order_milestones
      WHERE id = ${milestoneId} AND order_id = ${orderId}
      LIMIT 1
    `;

    if (!milestoneRows || milestoneRows.length === 0) {
      return NextResponse.json({ error: 'Milestone not found' }, { status: 404 });
    }

    const milestone = milestoneRows[0];

    // Validate milestone status
    if (milestone.status !== 'delivered') {
      return NextResponse.json(
        {
          error: `Cannot approve a milestone with status '${milestone.status}'. Milestone must be 'delivered'.`,
        },
        { status: 400 }
      );
    }

    // Approve the milestone
    const updatedRows = await sql`
      UPDATE order_milestones
      SET
        status = 'approved',
        approved_at = NOW(),
        updated_at = NOW()
      WHERE id = ${milestoneId}
      RETURNING
        id,
        order_id,
        title,
        status,
        amount,
        currency,
        approved_at,
        updated_at
    `;

    const updatedMilestone = updatedRows[0];

    // Calculate proportional payout for this milestone
    const milestoneAmount = Number(milestone.amount);
    const milestoneFee = calculatePlatformFee(milestoneAmount);
    const milestoneFreelancerEarnings = Math.round((milestoneAmount - milestoneFee) * 100) / 100;

    // Create a transaction record for this milestone payout
    try {
      if (order.freelancer_user_id) {
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
            'milestone_payout',
            ${milestoneFreelancerEarnings},
            ${milestone.currency as string},
            'completed',
            NOW()
          )
        `;
      }
    } catch {
      // Transactions table may not exist yet; skip and continue
    }

    // Check if the next pending milestone should become active
    const nextPendingRows = await sql`
      SELECT id
      FROM order_milestones
      WHERE order_id = ${orderId}
        AND status = 'pending'
      ORDER BY sort_order ASC, created_at ASC
      LIMIT 1
    `;

    if (nextPendingRows && nextPendingRows.length > 0) {
      const nextMilestoneId = nextPendingRows[0].id as string;
      await sql`
        UPDATE order_milestones
        SET status = 'active', updated_at = NOW()
        WHERE id = ${nextMilestoneId}
      `;
    }

    // Check if all milestones are now approved
    const remainingRows = await sql`
      SELECT COUNT(*)::int AS count
      FROM order_milestones
      WHERE order_id = ${orderId}
        AND status != 'approved'
    `;

    const remainingCount = Number((remainingRows[0] as { count: number }).count);
    const allApproved = remainingCount === 0;

    if (allApproved) {
      // Mark the order as completed
      await sql`
        UPDATE orders
        SET
          status = 'completed',
          escrow_status = 'released',
          completed_at = NOW(),
          updated_at = NOW()
        WHERE id = ${orderId}
      `;

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
    }

    // Notify the freelancer
    try {
      if (order.freelancer_user_id) {
        const notificationBody = allApproved
          ? `All milestones for order "${order.title}" have been approved. Payment has been released.`
          : `The client approved the milestone "${milestone.title}" for order "${order.title}".`;

        await createNotification(
          order.freelancer_user_id as string,
          allApproved ? 'order_completed' : 'milestone_approved',
          allApproved ? 'Order Completed & Payment Released' : 'Milestone Approved',
          notificationBody,
          `/en/dashboard/seller/orders/${orderId}`
        );
      }
    } catch {
      // Skip notification failure
    }

    return NextResponse.json(
      {
        milestone: updatedMilestone,
        orderCompleted: allApproved,
        message: allApproved
          ? 'Milestone approved and all milestones complete. Order marked as completed.'
          : 'Milestone approved successfully',
      },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error(
      'POST /api/marketplace/orders/[id]/milestones/[milestoneId]/approve error:',
      err
    );
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
