import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireAuth } from '@/lib/auth-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/marketplace/seller/profile
export async function GET() {
  try {
    const user = await requireAuth();

    const rows = await sql`
      SELECT
        fp.id,
        fp.user_id,
        fp.tenant_id,
        COALESCE(fp.display_name, '') AS display_name,
        fp.tagline,
        fp.bio,
        fp.avatar_url,
        fp.cover_image_url,
        fp.hourly_rate,
        COALESCE(fp.work_type, 'remote') AS work_type,
        fp.location_city,
        fp.location_country,
        fp.location_postcode,
        fp.service_radius_km,
        COALESCE(fp.skills, '{}') AS skills,
        COALESCE(fp.languages, '{}') AS languages,
        COALESCE(fp.portfolio_urls, '{}') AS portfolio_urls,
        fp.website_url,
        fp.linkedin_url,
        COALESCE(fp.is_verified, false) AS is_verified,
        COALESCE(fp.is_available, true) AS is_available,
        COALESCE(fp.rating_average, 0) AS rating_average,
        COALESCE(fp.rating_count, 0) AS rating_count,
        COALESCE(fp.total_orders, 0) AS total_orders,
        COALESCE(fp.total_earnings, 0) AS total_earnings,
        COALESCE(fp.completion_rate, 0) AS completion_rate,
        fp.response_time_hours,
        COALESCE(fp.status, 'pending') AS status,
        fp.locale,
        fp.created_at,
        fp.updated_at
      FROM freelancer_profiles fp
      WHERE fp.user_id = ${user.id}
      LIMIT 1
    `;

    if (!rows || rows.length === 0) {
      return NextResponse.json({ profile: null });
    }

    return NextResponse.json({ profile: rows[0] });
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('GET /api/marketplace/seller/profile error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/marketplace/seller/profile
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();

    // Validate required field
    if (!body.display_name || !String(body.display_name).trim()) {
      return NextResponse.json(
        { error: 'display_name is required' },
        { status: 400 }
      );
    }

    // Check if profile already exists for this user
    const existing = await sql`
      SELECT id FROM freelancer_profiles WHERE user_id = ${user.id} LIMIT 1
    `;
    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Profile already exists. Use PUT to update.' },
        { status: 409 }
      );
    }

    // Get tenant_id from user record
    const userRows = await sql`
      SELECT tenant_id FROM users WHERE id = ${user.id} LIMIT 1
    `;
    const tenantId = userRows[0]?.tenant_id ?? null;

    const skills = Array.isArray(body.skills) ? body.skills : [];
    const languages = Array.isArray(body.languages) ? body.languages : [];

    const rows = await sql`
      INSERT INTO freelancer_profiles (
        user_id,
        tenant_id,
        display_name,
        tagline,
        bio,
        hourly_rate,
        work_type,
        location_city,
        location_country,
        location_postcode,
        service_radius_km,
        skills,
        languages,
        website_url,
        linkedin_url,
        status,
        locale
      ) VALUES (
        ${user.id},
        ${tenantId},
        ${String(body.display_name).trim()},
        ${body.tagline ? String(body.tagline).trim() : null},
        ${body.bio ? String(body.bio).trim() : null},
        ${body.hourly_rate != null ? Number(body.hourly_rate) : null},
        ${body.work_type ?? 'remote'},
        ${body.location_city ? String(body.location_city).trim() : null},
        ${body.location_country ? String(body.location_country).trim() : null},
        ${body.location_postcode ? String(body.location_postcode).trim() : null},
        ${body.service_radius_km != null ? Number(body.service_radius_km) : null},
        ${JSON.stringify(skills)}::TEXT[],
        ${JSON.stringify(languages)}::TEXT[],
        ${body.website_url ? String(body.website_url).trim() : null},
        ${body.linkedin_url ? String(body.linkedin_url).trim() : null},
        'pending',
        'en'
      )
      RETURNING id, display_name, status, created_at
    `;

    return NextResponse.json(rows[0], { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('POST /api/marketplace/seller/profile error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/marketplace/seller/profile
export async function PUT(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();

    // Validate required field
    if (!body.display_name || !String(body.display_name).trim()) {
      return NextResponse.json(
        { error: 'display_name is required' },
        { status: 400 }
      );
    }

    // Check profile exists
    const existing = await sql`
      SELECT id FROM freelancer_profiles WHERE user_id = ${user.id} LIMIT 1
    `;
    if (!existing || existing.length === 0) {
      return NextResponse.json(
        { error: 'No profile found. Use POST to create first.' },
        { status: 404 }
      );
    }

    const skills = Array.isArray(body.skills) ? body.skills : [];
    const languages = Array.isArray(body.languages) ? body.languages : [];

    const rows = await sql`
      UPDATE freelancer_profiles
      SET
        display_name = ${String(body.display_name).trim()},
        tagline = ${body.tagline ? String(body.tagline).trim() : null},
        bio = ${body.bio ? String(body.bio).trim() : null},
        hourly_rate = ${body.hourly_rate != null ? Number(body.hourly_rate) : null},
        work_type = ${body.work_type ?? 'remote'},
        location_city = ${body.location_city ? String(body.location_city).trim() : null},
        location_country = ${body.location_country ? String(body.location_country).trim() : null},
        location_postcode = ${body.location_postcode ? String(body.location_postcode).trim() : null},
        service_radius_km = ${body.service_radius_km != null ? Number(body.service_radius_km) : null},
        skills = ${JSON.stringify(skills)}::TEXT[],
        languages = ${JSON.stringify(languages)}::TEXT[],
        website_url = ${body.website_url ? String(body.website_url).trim() : null},
        linkedin_url = ${body.linkedin_url ? String(body.linkedin_url).trim() : null},
        updated_at = NOW()
      WHERE user_id = ${user.id}
      RETURNING id, display_name, status, updated_at
    `;

    return NextResponse.json(rows[0]);
  } catch (err) {
    if (err instanceof Error && err.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    console.error('PUT /api/marketplace/seller/profile error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
