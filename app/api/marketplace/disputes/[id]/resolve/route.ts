import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';
import { createNotification } from '@/lib/marketplace-queries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VALID_RESOLUTIONS = [
 'full_refund',
 'partial_refund',
 'release_to_freelancer',
 'mutual_cancellation',
] as const;

/**
 * POST /api/marketplace/disputes/[id]/resolve
 *
 * Admin resolves a dispute.
 * Body: { resolution, resolution_note }
 */
export async function POST(
 request: NextRequest,
 { params }: { params: Promise<{ id: string }>}
) {
 try {
 const { id: disputeId } = await params;
 const user = await requireAuth();

 // Verify admin role
 const adminCheck = await sql`
 SELECT id, role
 FROM users
 WHERE id = ${user.id}
 LIMIT 1
 `;

 if (
 !adminCheck ||
 adminCheck.length === 0 ||
 adminCheck[0].role !== 'admin'
 ) {
 return NextResponse.json(
 { error: 'Admin access required' },
 { status: 403 }
 );
 }

 const body = await request.json();
 const resolution = String(body.resolution ?? '').trim();
 const resolutionNote = String(body.resolution_note ?? '').trim();

 // Validate resolution
 if (!VALID_RESOLUTIONS.includes(resolution as (typeof VALID_RESOLUTIONS)[number])) {
 return NextResponse.json(
 {
 error: `Invalid resolution. Must be one of: ${VALID_RESOLUTIONS.join(', ')}`,
 },
 { status: 400 }
 );
 }

 if (!resolutionNote) {
 return NextResponse.json(
 { error: 'Resolution note is required' },
 { status: 400 }
 );
 }

 // Fetch the dispute with order info
 const disputeRows = await sql`
 SELECT
 d.id,
 d.order_id,
 d.opened_by,
 d.status,
 o.title AS order_title,
 o.client_id,
 o.freelancer_id,
 fp.user_id AS freelancer_user_id
 FROM disputes d
 JOIN orders o ON d.order_id = o.id
 LEFT JOIN freelancer_profiles fp ON o.freelancer_id = fp.id
 WHERE d.id = ${disputeId}
 LIMIT 1
 `;

 if (!disputeRows || disputeRows.length === 0) {
 return NextResponse.json({ error: 'Dispute not found' }, { status: 404 });
 }

 const dispute = disputeRows[0];

 if (dispute.status === 'resolved') {
 return NextResponse.json(
 { error: 'This dispute has already been resolved' },
 { status: 409 }
 );
 }

 // Resolve the dispute
 const updatedDisputes = await sql`
 UPDATE disputes
 SET
 status = 'resolved',
 resolution = ${resolution},
 resolution_note = ${resolutionNote},
 resolved_by = ${user.id},
 resolved_at = NOW(),
 updated_at = NOW()
 WHERE id = ${disputeId}
 RETURNING
 id,
 order_id,
 status,
 resolution,
 resolution_note,
 resolved_by,
 resolved_at,
 updated_at
 `;

 const updatedDispute = updatedDisputes[0];

 // Determine the corresponding order status based on resolution
 let newOrderStatus: string;
 let newEscrowStatus: string | null = null;

 switch (resolution) {
 case 'full_refund':
 newOrderStatus = 'cancelled';
 newEscrowStatus = 'refunded';
 break;
 case 'partial_refund':
 newOrderStatus = 'completed';
 newEscrowStatus = 'partial_refund';
 break;
 case 'release_to_freelancer':
 newOrderStatus = 'completed';
 newEscrowStatus = 'released';
 break;
 case 'mutual_cancellation':
 newOrderStatus = 'cancelled';
 newEscrowStatus = 'refunded';
 break;
 default:
 newOrderStatus = 'completed';
 }

 // Update the order
 if (newEscrowStatus) {
 await sql`
 UPDATE orders
 SET
 status = ${newOrderStatus},
 escrow_status = ${newEscrowStatus},
 updated_at = NOW()
 WHERE id = ${dispute.order_id as string}
 `;
 } else {
 await sql`
 UPDATE orders
 SET
 status = ${newOrderStatus},
 updated_at = NOW()
 WHERE id = ${dispute.order_id as string}
 `;
 }

 // Notify both parties
 const clientId = dispute.client_id as string;
 const freelancerUserId = dispute.freelancer_user_id as string;
 const orderTitle = dispute.order_title as string;
 const orderId = dispute.order_id as string;

 try {
 await createNotification(
 clientId,
 'dispute_resolved',
 'Dispute Resolved',
 `The dispute for order "${orderTitle}" has been resolved. Resolution: ${resolution.replace(/_/g, ' ')}.`,
 `/en/dashboard/orders/${orderId}/dispute`
 );
 } catch {
 // Skip notification failure
 }

 try {
 if (freelancerUserId) {
 await createNotification(
 freelancerUserId,
 'dispute_resolved',
 'Dispute Resolved',
 `The dispute for order "${orderTitle}" has been resolved. Resolution: ${resolution.replace(/_/g, ' ')}.`,
 `/en/dashboard/seller/orders/${orderId}`
 );
 }
 } catch {
 // Skip notification failure
 }

 return NextResponse.json(
 { dispute: updatedDispute, message: 'Dispute resolved successfully' },
 { status: 200 }
 );
 } catch (err) {
 if (err instanceof Error && err.message === 'Unauthorized') {
 return NextResponse.json({ error: err.message }, { status: 401 });
 }
 console.error('POST /api/marketplace/disputes/[id]/resolve error:', err);
 return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}
