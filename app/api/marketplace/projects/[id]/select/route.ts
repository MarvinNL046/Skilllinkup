import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';
import { createOrder, createNotification, type OrderSummary } from '@/lib/marketplace-queries';
import { sendEmailAsync } from '@/lib/send-email';
import { getUserContact } from '@/lib/get-user-email';
import { BidAcceptedEmail } from '@/emails/bid-accepted';
import { BidRejectedEmail } from '@/emails/bid-rejected';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/marketplace/projects/[id]/select
// Select a freelancer's bid as the winner.
// - Updates project status to 'in_progress' and selected_freelancer_id
// - Updates winning bid status to 'accepted'
// - Updates all other bids to 'rejected'
// - Creates an order for the selected bid
// - Notifies all bidders
export async function POST(
 request: NextRequest,
 { params }: { params: Promise<{ id: string }>}
) {
 try {
 const { id: projectId } = await params;
 const user = await requireAuth();
 const body = await request.json();

 const bidId = String(body.bid_id ?? '').trim();
 if (!bidId) {
 return NextResponse.json({ error: 'bid_id is required' }, { status: 400 });
 }

 // Verify project exists and belongs to this user
 const projectRows = await sql`
 SELECT id, client_id, title, currency, status
 FROM projects
 WHERE id = ${projectId}
 LIMIT 1
 `;

 if (projectRows.length === 0) {
 return NextResponse.json({ error: 'Project not found' }, { status: 404 });
 }

 const project = projectRows[0];

 if (project.client_id !== user.id) {
 return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
 }

 if (project.status !== 'open') {
 return NextResponse.json(
 { error: 'This project is not in an open state' },
 { status: 400 }
 );
 }

 // Verify the bid exists and belongs to this project
 const bidRows = await sql`
 SELECT b.id, b.freelancer_id, b.amount, b.currency, b.delivery_days, b.status,
 fp.user_id AS freelancer_user_id
 FROM bids b
 JOIN freelancer_profiles fp ON b.freelancer_id = fp.id
 WHERE b.id = ${bidId} AND b.project_id = ${projectId}
 LIMIT 1
 `;

 if (bidRows.length === 0) {
 return NextResponse.json({ error: 'Bid not found' }, { status: 404 });
 }

 const selectedBid = bidRows[0];

 if (selectedBid.status !== 'pending') {
 return NextResponse.json(
 { error: 'This bid is no longer pending' },
 { status: 400 }
 );
 }

 // Update winning bid to 'accepted'
 await sql`
 UPDATE bids SET status = 'accepted', updated_at = NOW()
 WHERE id = ${bidId}
 `;

 // Reject all other bids for this project
 await sql`
 UPDATE bids SET status = 'rejected', updated_at = NOW()
 WHERE project_id = ${projectId}
 AND id != ${bidId}
 AND status = 'pending'
 `;

 // Update project to 'in_progress' with selected freelancer
 await sql`
 UPDATE projects
 SET status = 'in_progress',
 selected_freelancer_id = ${String(selectedBid.freelancer_id)},
 updated_at = NOW()
 WHERE id = ${projectId}
 `;

 // Create an order for this project
 let order: OrderSummary | null = null;
 try {
 order = await createOrder({
 project_id: projectId,
 client_id: user.id,
 freelancer_id: String(selectedBid.freelancer_id),
 order_type: 'project',
 title: String(project.title),
 amount: Number(selectedBid.amount),
 currency: String(selectedBid.currency || project.currency || 'EUR'),
 delivery_days: Number(selectedBid.delivery_days),
 });
 } catch (orderErr) {
 console.error('Failed to create order for project:', orderErr);
 // Non-critical for the selection itself; log and continue
 }

 // Notify the selected freelancer
 try {
 await createNotification(
 String(selectedBid.freelancer_user_id),
 'bid_accepted',
 'Your bid was accepted!',
 `Congratulations! Your bid on "${project.title}" has been accepted. An order has been created.`,
 order ? `/en/dashboard/seller/orders/${order.id}` : `/en/dashboard/seller/orders`,
 { project_id: projectId, bid_id: bidId, order_id: order?.id ?? null }
 );
 } catch {
 // Non-critical
 }

 // Send bid accepted email to winner
 const winnerContact = await getUserContact(String(selectedBid.freelancer_user_id));
 if (winnerContact) {
 sendEmailAsync({
 to: winnerContact.email,
 subject: `Your bid was accepted! - SkillLinkup`,
 react: BidAcceptedEmail({
 freelancerName: winnerContact.name,
 projectTitle: String(project.title),
 amount: Number(selectedBid.amount),
 currency: String(selectedBid.currency || project.currency || 'EUR'),
 orderId: order?.id,
 }),
 });
 }

 // Notify all other rejected bidders
 try {
 const otherBidders = await sql`
 SELECT fp.user_id, b.id AS bid_id
 FROM bids b
 JOIN freelancer_profiles fp ON b.freelancer_id = fp.id
 WHERE b.project_id = ${projectId}
 AND b.id != ${bidId}
 AND b.status = 'rejected'
 `;

 for (const bidder of otherBidders) {
 try {
 await createNotification(
 String(bidder.user_id),
 'bid_rejected',
 'Your bid was not selected',
 `The client has selected another freelancer for "${project.title}". Keep applying to other projects!`,
 `/en/marketplace/projects`,
 { project_id: projectId }
 );
 } catch {
 // Non-critical per-bidder
 }

 // Send bid rejected email
 const bidderContact = await getUserContact(String(bidder.user_id));
 if (bidderContact) {
 sendEmailAsync({
 to: bidderContact.email,
 subject: `Update on your bid - SkillLinkup`,
 react: BidRejectedEmail({
 freelancerName: bidderContact.name,
 projectTitle: String(project.title),
 }),
 });
 }
 }
 } catch {
 // Non-critical
 }

 return NextResponse.json({
 message: 'Freelancer selected successfully',
 bid_id: bidId,
 project_status: 'in_progress',
 order: order ?? null,
 });
 } catch (err) {
 if (err instanceof Error && err.message === 'Unauthorized') {
 return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 }
 console.error('POST /api/marketplace/projects/[id]/select error:', err);
 return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}
