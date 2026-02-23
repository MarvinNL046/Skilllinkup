import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { requireFreelancer } from '@/lib/auth-helpers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET /api/marketplace/seller/gigs
// Returns all gigs for the authenticated freelancer (all statuses)
export async function GET() {
  try {
    const { profile } = await requireFreelancer();

    const gigs = await sql`
      SELECT
        g.id,
        g.freelancer_id,
        g.title,
        g.slug,
        COALESCE(g.description, '') AS description,
        g.category_id,
        COALESCE(mc.name, 'Uncategorized') AS category_name,
        COALESCE(mc.slug, '') AS category_slug,
        COALESCE(g.tags, '{}') AS tags,
        COALESCE(g.work_type, 'remote') AS work_type,
        g.location_city,
        g.location_country,
        COALESCE(
          (
            SELECT MIN(gp.price)
            FROM gig_packages gp
            WHERE gp.gig_id = g.id
          ),
          0
        ) AS price_from,
        COALESCE(
          (
            SELECT gp.currency
            FROM gig_packages gp
            WHERE gp.gig_id = g.id
            ORDER BY gp.price ASC
            LIMIT 1
          ),
          'EUR'
        ) AS currency,
        COALESCE(g.views, 0) AS views,
        COALESCE(g.order_count, 0) AS order_count,
        COALESCE(g.rating_average, 0) AS rating_average,
        COALESCE(g.rating_count, 0) AS rating_count,
        COALESCE(g.is_featured, false) AS is_featured,
        g.status,
        g.locale,
        COALESCE(
          (
            SELECT ARRAY_AGG(gi.url ORDER BY gi.sort_order ASC)
            FROM gig_images gi
            WHERE gi.gig_id = g.id
          ),
          '{}'
        ) AS images,
        g.created_at
      FROM gigs g
      LEFT JOIN marketplace_categories mc ON g.category_id = mc.id
      WHERE g.freelancer_id = ${profile.id}
      ORDER BY g.created_at DESC
    `;

    return NextResponse.json({ gigs });
  } catch (err) {
    if (err instanceof Error && (err.message === 'Unauthorized' || err.message === 'No active freelancer profile')) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    console.error('GET /api/marketplace/seller/gigs error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/marketplace/seller/gigs
// Create a new gig with packages and images
export async function POST(request: NextRequest) {
  try {
    const { user, profile } = await requireFreelancer();
    const body = await request.json();

    // --- Validation ---
    const title = String(body.title ?? '').trim();
    if (title.length < 10) {
      return NextResponse.json(
        { error: 'Title must be at least 10 characters' },
        { status: 400 }
      );
    }

    const description = String(body.description ?? '').trim();
    if (description.length < 50) {
      return NextResponse.json(
        { error: 'Description must be at least 50 characters' },
        { status: 400 }
      );
    }

    if (!body.category_id) {
      return NextResponse.json(
        { error: 'category_id is required' },
        { status: 400 }
      );
    }

    const packages = Array.isArray(body.packages) ? body.packages : [];
    const validPackages = packages.filter(
      (pkg: { tier: string; price: number }) =>
        pkg && typeof pkg.price === 'number' && pkg.price > 0
    );
    if (validPackages.length === 0) {
      return NextResponse.json(
        { error: 'At least one package with a price greater than 0 is required' },
        { status: 400 }
      );
    }

    // --- Generate unique slug ---
    const slug =
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') +
      '-' +
      Math.random().toString(36).slice(2, 7);

    const tags = Array.isArray(body.tags) ? body.tags : [];
    const workType = body.work_type ?? 'remote';
    const status = body.status ?? 'draft';
    const locale = body.locale ?? 'en';

    // Get tenant_id from user record
    const userRows = await sql`
      SELECT tenant_id FROM users WHERE id = ${user.id} LIMIT 1
    `;
    const tenantId = userRows[0]?.tenant_id ?? null;

    // --- Insert gig ---
    const gigRows = await sql`
      INSERT INTO gigs (
        freelancer_id,
        tenant_id,
        title,
        slug,
        description,
        category_id,
        tags,
        work_type,
        location_city,
        location_country,
        service_radius_km,
        status,
        locale,
        views,
        order_count,
        rating_average,
        rating_count,
        is_featured
      ) VALUES (
        ${profile.id},
        ${tenantId},
        ${title},
        ${slug},
        ${description},
        ${body.category_id},
        ${JSON.stringify(tags)}::TEXT[],
        ${workType},
        ${body.location_city ? String(body.location_city).trim() : null},
        ${body.location_country ? String(body.location_country).trim() : null},
        ${body.service_radius_km != null ? Number(body.service_radius_km) : null},
        ${status},
        ${locale},
        0,
        0,
        0,
        0,
        false
      )
      RETURNING id, title, slug, status, created_at
    `;

    const gig = gigRows[0];

    // --- Insert packages ---
    if (packages.length > 0) {
      for (const pkg of validPackages) {
        const features = Array.isArray(pkg.features) ? pkg.features : [];
        await sql`
          INSERT INTO gig_packages (
            gig_id,
            tier,
            title,
            description,
            price,
            currency,
            delivery_days,
            revision_count,
            features
          ) VALUES (
            ${gig.id},
            ${pkg.tier ?? 'basic'},
            ${String(pkg.title ?? '').trim()},
            ${String(pkg.description ?? '').trim()},
            ${Number(pkg.price)},
            ${pkg.currency ?? 'EUR'},
            ${Number(pkg.delivery_days ?? 7)},
            ${Number(pkg.revision_count ?? 1)},
            ${JSON.stringify(features)}::JSONB
          )
        `;
      }
    }

    // --- Insert images ---
    const images = Array.isArray(body.images) ? body.images : [];
    if (images.length > 0) {
      for (const img of images.slice(0, 5)) {
        if (!img.image_url) continue;
        await sql`
          INSERT INTO gig_images (
            gig_id,
            url,
            alt_text,
            sort_order
          ) VALUES (
            ${gig.id},
            ${String(img.image_url).trim()},
            ${img.alt_text ? String(img.alt_text).trim() : null},
            ${Number(img.sort_order ?? 0)}
          )
        `;
      }
    }

    return NextResponse.json(
      { gig, message: 'Gig created successfully' },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof Error && (err.message === 'Unauthorized' || err.message === 'No active freelancer profile')) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    console.error('POST /api/marketplace/seller/gigs error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
