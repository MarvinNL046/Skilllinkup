import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/marketplace/quote-request/[id]
// Get a specific quote request with all received quotes
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch the quote request
    const qrRows = await sql`
      SELECT
        qr.id,
        qr.client_id,
        COALESCE(u.name, u.email, 'Client') AS client_name,
        qr.category_id,
        COALESCE(mc.name, 'Uncategorized') AS category_name,
        qr.title,
        qr.description,
        qr.location_city,
        qr.location_postcode,
        qr.location_country,
        qr.budget_indication,
        qr.preferred_date,
        qr.status,
        qr.quote_count,
        qr.created_at
      FROM quote_requests qr
      LEFT JOIN users u ON qr.client_id = u.id
      LEFT JOIN marketplace_categories mc ON qr.category_id = mc.id
      WHERE qr.id = ${id}
      LIMIT 1
    `;

    if (qrRows.length === 0) {
      return NextResponse.json({ error: 'Quote request not found' }, { status: 404 });
    }

    const quoteRequest = qrRows[0];

    // Fetch all quotes for this request with freelancer info
    const quoteRows = await sql`
      SELECT
        q.id,
        q.quote_request_id,
        q.freelancer_id,
        COALESCE(fp.display_name, 'Unknown') AS freelancer_name,
        fp.avatar_url AS freelancer_avatar,
        COALESCE(fp.rating_average, 0) AS freelancer_rating,
        COALESCE(fp.rating_count, 0) AS freelancer_rating_count,
        COALESCE(fp.is_verified, false) AS freelancer_verified,
        fp.location_city AS freelancer_city,
        fp.location_country AS freelancer_country,
        COALESCE(q.amount, 0) AS amount,
        COALESCE(q.currency, 'EUR') AS currency,
        q.description,
        q.estimated_days,
        q.valid_until,
        q.status,
        q.created_at
      FROM quotes q
      JOIN freelancer_profiles fp ON q.freelancer_id = fp.id
      WHERE q.quote_request_id = ${id}
      ORDER BY
        CASE q.status WHEN 'accepted' THEN 0 ELSE 1 END,
        q.amount ASC,
        q.created_at ASC
    `;

    return NextResponse.json({
      quoteRequest,
      quotes: quoteRows,
    });
  } catch (error) {
    console.error('GET /api/marketplace/quote-request/[id] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
