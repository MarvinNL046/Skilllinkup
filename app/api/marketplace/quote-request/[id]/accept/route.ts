import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';
import { createOrder, createNotification, type OrderSummary } from '@/lib/marketplace-queries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/marketplace/quote-request/[id]/accept
// Client accepts a quote. Creates an order from it and notifies all freelancers.
export async function POST(
 request: NextRequest,
 { params }: { params: Promise<{ id: string }>}
) {
 try {
 const { id } = await params;
 const user = await requireAuth();
 const body = await request.json();

 const quoteId = body.quote_id ? String(body.quote_id).trim() : null;
 if (!quoteId) {
 return NextResponse.json({ error: 'quote_id is required' }, { status: 400 });
 }

 // Verify the quote request exists and belongs to this client
 const qrRows = await sql`
 SELECT id, client_id, title, category_id, status
 FROM quote_requests
 WHERE id = ${id}
 LIMIT 1
 `;

 if (qrRows.length === 0) {
 return NextResponse.json({ error: 'Quote request not found' }, { status: 404 });
 }

 const quoteRequest = qrRows[0];

 if (String(quoteRequest.client_id) !== user.id) {
 return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
 }

 if (quoteRequest.status !== 'open') {
 return NextResponse.json(
 { error: 'This quote request has already been closed' },
 { status: 409 }
 );
 }

 // Fetch the accepted quote
 const acceptedQuoteRows = await sql`
 SELECT q.id, q.freelancer_id, q.amount, q.currency, q.estimated_days, q.status,
 fp.user_id AS freelancer_user_id,
 fp.display_name AS freelancer_display_name
 FROM quotes q
 JOIN freelancer_profiles fp ON q.freelancer_id = fp.id
 WHERE q.id = ${quoteId}
 AND q.quote_request_id = ${id}
 LIMIT 1
 `;

 if (acceptedQuoteRows.length === 0) {
 return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
 }

 const acceptedQuote = acceptedQuoteRows[0];

 if (acceptedQuote.status !== 'pending') {
 return NextResponse.json(
 { error: 'This quote is no longer available to accept' },
 { status: 409 }
 );
 }

 // Update accepted quote to 'accepted'
 await sql`
 UPDATE quotes
 SET status = 'accepted', updated_at = NOW()
 WHERE id = ${quoteId}
 `;

 // Reject all other pending quotes for this request
 await sql`
 UPDATE quotes
 SET status = 'rejected', updated_at = NOW()
 WHERE quote_request_id = ${id}
 AND id != ${quoteId}
 AND status = 'pending'
 `;

 // Close the quote request
 await sql`
 UPDATE quote_requests
 SET status = 'accepted', updated_at = NOW()
 WHERE id = ${id}
 `;

 // Create an order from the accepted quote
 const deliveryDays = acceptedQuote.estimated_days
 ? Number(acceptedQuote.estimated_days)
 : 7;

 let order: OrderSummary | null = null;
 try {
 order = await createOrder({
 client_id: user.id,
 freelancer_id: String(acceptedQuote.freelancer_id),
 order_type: 'project',
 title: String(quoteRequest.title),
 amount: Number(acceptedQuote.amount),
 currency: String(acceptedQuote.currency),
 delivery_days: deliveryDays,
 });
 } catch (orderErr) {
 console.error('Failed to create order from quote:', orderErr);
 // Non-fatal: quote is still accepted even if order creation fails
 }

 // Notify accepted freelancer
 await createNotification(
 String(acceptedQuote.freelancer_user_id),
 'quote_accepted',
 'Your Quote Was Accepted!',
 `Your quote for "${quoteRequest.title}" has been accepted. An order has been created.`,
 order ? `/en/dashboard/seller/orders/${order.id}` : undefined
 );

 // Notify rejected freelancers
 const rejectedRows = await sql`
 SELECT fp.user_id
 FROM quotes q
 JOIN freelancer_profiles fp ON q.freelancer_id = fp.id
 WHERE q.quote_request_id = ${id}
 AND q.status = 'rejected'
 `;

 for (const row of rejectedRows) {
 await createNotification(
 String(row.user_id),
 'quote_rejected',
 'Quote Not Selected',
 `Another quote was selected for "${quoteRequest.title}". Thank you for participating.`,
 undefined
 );
 }

 return NextResponse.json({
 message: 'Quote accepted successfully',
 order: order ?? null,
 });
 } catch (err) {
 if (err instanceof Error && err.message === 'Unauthorized') {
 return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 }
 console.error('POST /api/marketplace/quote-request/[id]/accept error:', err);
 return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}
