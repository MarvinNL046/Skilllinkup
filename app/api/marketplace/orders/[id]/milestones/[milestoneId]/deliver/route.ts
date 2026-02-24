import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireFreelancer } from '@/lib/auth-helpers';
import { createNotification } from '@/lib/marketplace-queries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/marketplace/orders/[id]/milestones/[milestoneId]/deliver
 *
 * Allows the freelancer on an order to mark a specific milestone as delivered.
 * The milestone must be in 'active' status.
 * Sets status to 'delivered' and records delivered_at timestamp.
 * Notifies the client.
 */
export async function POST(
 _request: NextRequest,
 { params }: { params: Promise<{ id: string; milestoneId: string }>}
) {
 try {
 const { id: orderId, milestoneId } = await params;
 const { user, profile } = await requireFreelancer();

 // Fetch the order and verify this freelancer is assigned to it
 const orderRows = await sql`
 SELECT
 o.id,
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
 { error: 'You are not authorized to deliver milestones for this order' },
 { status: 403 }
 );
 }

 // Fetch the milestone and verify it belongs to this order
 const milestoneRows = await sql`
 SELECT id, order_id, title, status
 FROM order_milestones
 WHERE id = ${milestoneId} AND order_id = ${orderId}
 LIMIT 1
 `;

 if (!milestoneRows || milestoneRows.length === 0) {
 return NextResponse.json({ error: 'Milestone not found' }, { status: 404 });
 }

 const milestone = milestoneRows[0];

 // Validate milestone status
 if (milestone.status !== 'active') {
 return NextResponse.json(
 {
 error: `Cannot deliver a milestone with status '${milestone.status}'. Milestone must be 'active'.`,
 },
 { status: 400 }
 );
 }

 // Update milestone status to 'delivered'
 const updatedRows = await sql`
 UPDATE order_milestones
 SET
 status = 'delivered',
 delivered_at = NOW(),
 updated_at = NOW()
 WHERE id = ${milestoneId}
 RETURNING
 id,
 order_id,
 title,
 status,
 delivered_at,
 updated_at
 `;

 const updatedMilestone = updatedRows[0];

 // Notify the client
 try {
 await createNotification(
 order.client_id as string,
 'milestone_delivered',
 'Milestone Delivered',
 `The freelancer has delivered the milestone "${milestone.title}" for order "${order.title}". Please review and approve.`,
 `/en/dashboard/orders/${orderId}`
 );
 } catch {
 // Notification failure should not block the response
 }

 return NextResponse.json(
 { milestone: updatedMilestone, message: 'Milestone delivered successfully' },
 { status: 200 }
 );
 } catch (err) {
 if (
 err instanceof Error &&
 (err.message === 'Unauthorized' || err.message === 'No active freelancer profile')
 ) {
 return NextResponse.json({ error: err.message }, { status: 401 });
 }
 console.error(
 'POST /api/marketplace/orders/[id]/milestones/[milestoneId]/deliver error:',
 err
 );
 return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}
