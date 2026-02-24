import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireFreelancer } from '@/lib/auth-helpers';
import { createNotification } from '@/lib/marketplace-queries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/marketplace/quote-request/[id]/respond
// Freelancer submits a quote response
export async function POST(
 request: NextRequest,
 { params }: { params: Promise<{ id: string }>}
) {
 try {
 const { id } = await params;
 const { user, profile } = await requireFreelancer();
 const body = await request.json();

 // Validate amount
 const amount = parseFloat(String(body.amount ?? ''));
 if (!amount || amount <= 0) {
 return NextResponse.json(
 { error: 'A valid quote amount is required' },
 { status: 400 }
 );
 }

 // Validate description
 const description = String(body.description ?? '').trim();
 if (description.length < 10) {
 return NextResponse.json(
 { error: 'Description must be at least 10 characters' },
 { status: 400 }
 );
 }

 const currency = body.currency ? String(body.currency).trim() : 'EUR';
 const estimatedDays = body.estimated_days ? parseInt(String(body.estimated_days), 10) : null;
 const validUntil = body.valid_until ? String(body.valid_until) : null;

 // Verify the quote request exists and is open
 const qrRows = await sql`
 SELECT id, client_id, title, status
 FROM quote_requests
 WHERE id = ${id}
 LIMIT 1
 `;

 if (qrRows.length === 0) {
 return NextResponse.json({ error: 'Quote request not found' }, { status: 404 });
 }

 const quoteRequest = qrRows[0];

 if (quoteRequest.status !== 'open') {
 return NextResponse.json(
 { error: 'This quote request is no longer accepting quotes' },
 { status: 409 }
 );
 }

 // Check if freelancer already quoted
 const existingQuote = await sql`
 SELECT id FROM quotes
 WHERE quote_request_id = ${id}
 AND freelancer_id = ${profile.id}
 LIMIT 1
 `;

 if (existingQuote.length >0) {
 return NextResponse.json(
 { error: 'You have already submitted a quote for this request' },
 { status: 409 }
 );
 }

 // Insert the quote
 const rows = await sql`
 INSERT INTO quotes (
 quote_request_id,
 freelancer_id,
 amount,
 currency,
 description,
 estimated_days,
 valid_until,
 status
 ) VALUES (
 ${id},
 ${profile.id},
 ${amount},
 ${currency},
 ${description},
 ${estimatedDays},
 ${validUntil},
 'pending'
 )
 RETURNING id, amount, currency, status, created_at
 `;

 const quote = rows[0];

 // Increment quote_count on the request
 await sql`
 UPDATE quote_requests
 SET quote_count = quote_count + 1, updated_at = NOW()
 WHERE id = ${id}
 `;

 // Notify the client
 const freelancerRows = await sql`
 SELECT display_name FROM freelancer_profiles WHERE id = ${profile.id} LIMIT 1
 `;
 const freelancerName = freelancerRows[0]?.display_name ?? 'A freelancer';

 await createNotification(
 String(quoteRequest.client_id),
 'quote_received',
 'New Quote Received',
 `${freelancerName} has submitted a quote for your request: "${quoteRequest.title}"`,
 `/en/marketplace/quote-request/${id}`
 );

 return NextResponse.json(
 { quote, message: 'Quote submitted successfully' },
 { status: 201 }
 );
 } catch (err) {
 if (err instanceof Error) {
 if (err.message === 'Unauthorized') {
 return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
 }
 if (err.message === 'No active freelancer profile') {
 return NextResponse.json(
 { error: 'You need an active freelancer profile to submit quotes' },
 { status: 403 }
 );
 }
 }
 console.error('POST /api/marketplace/quote-request/[id]/respond error:', err);
 return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
 }
}
