import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/marketplace/quote-request
// List quote requests with optional filters: category, location_country, location_city
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const limit = Math.min(parseInt(searchParams.get('limit') ?? '20', 10), 100);
    const offset = Math.max(parseInt(searchParams.get('offset') ?? '0', 10), 0);
    const categoryId = searchParams.get('category_id') ?? null;
    const locationCountry = searchParams.get('location_country') ?? null;
    const locationCity = searchParams.get('location_city') ?? null;
    const status = searchParams.get('status') ?? 'open';

    let rows;

    if (categoryId && locationCountry && locationCity) {
      rows = await sql`
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
        WHERE qr.status = ${status}
          AND qr.category_id = ${categoryId}
          AND qr.location_country = ${locationCountry}
          AND LOWER(qr.location_city) = LOWER(${locationCity})
        ORDER BY qr.created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `;
    } else if (categoryId && locationCountry) {
      rows = await sql`
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
        WHERE qr.status = ${status}
          AND qr.category_id = ${categoryId}
          AND qr.location_country = ${locationCountry}
        ORDER BY qr.created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `;
    } else if (categoryId) {
      rows = await sql`
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
        WHERE qr.status = ${status}
          AND qr.category_id = ${categoryId}
        ORDER BY qr.created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `;
    } else {
      rows = await sql`
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
        WHERE qr.status = ${status}
        ORDER BY qr.created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `;
    }

    return NextResponse.json({ quoteRequests: rows });
  } catch (error) {
    console.error('GET /api/marketplace/quote-request error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/marketplace/quote-request
// Create a new quote request (requires auth)
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();

    // Validation
    const title = String(body.title ?? '').trim();
    if (title.length < 5) {
      return NextResponse.json(
        { error: 'Title must be at least 5 characters' },
        { status: 400 }
      );
    }

    const description = String(body.description ?? '').trim();
    if (description.length < 10) {
      return NextResponse.json(
        { error: 'Description must be at least 10 characters' },
        { status: 400 }
      );
    }

    const categoryId = body.category_id ? String(body.category_id).trim() : null;
    if (!categoryId) {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      );
    }

    const locationCity = body.location_city ? String(body.location_city).trim() : null;
    const locationPostcode = body.location_postcode ? String(body.location_postcode).trim() : null;
    const locationCountry = body.location_country ? String(body.location_country).trim() : 'NL';
    const budgetIndication = body.budget_indication ? String(body.budget_indication).trim() : null;
    const preferredDate = body.preferred_date ? String(body.preferred_date) : null;

    // Get tenant_id from user record
    const userRows = await sql`
      SELECT tenant_id FROM users WHERE id = ${user.id} LIMIT 1
    `;
    const tenantId = userRows[0]?.tenant_id ?? null;

    const rows = await sql`
      INSERT INTO quote_requests (
        tenant_id,
        client_id,
        category_id,
        title,
        description,
        location_city,
        location_postcode,
        location_country,
        budget_indication,
        preferred_date,
        status,
        quote_count
      ) VALUES (
        ${tenantId},
        ${user.id},
        ${categoryId},
        ${title},
        ${description},
        ${locationCity},
        ${locationPostcode},
        ${locationCountry},
        ${budgetIndication},
        ${preferredDate},
        'open',
        0
      )
      RETURNING id, title, status, created_at
    `;

    const quoteRequest = rows[0];

    return NextResponse.json(
      { quoteRequest, message: 'Quote request created successfully' },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('POST /api/marketplace/quote-request error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
