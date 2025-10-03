import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL not configured');
}

const sql = neon(databaseUrl);

// GET - Fetch all reviews
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';
    const platformId = searchParams.get('platform_id');

    let reviews;

    if (platformId) {
      // Filter by platform
      if (status === 'all') {
        reviews = await sql`
          SELECT r.*, p.name as platform_name, p.slug as platform_slug
          FROM reviews r
          LEFT JOIN platforms p ON r.platform_id = p.id
          WHERE r.platform_id = ${platformId}
          ORDER BY r.created_at DESC
        `;
      } else {
        reviews = await sql`
          SELECT r.*, p.name as platform_name, p.slug as platform_slug
          FROM reviews r
          LEFT JOIN platforms p ON r.platform_id = p.id
          WHERE r.platform_id = ${platformId} AND r.status = ${status}
          ORDER BY r.created_at DESC
        `;
      }
    } else {
      // All reviews
      if (status === 'all') {
        reviews = await sql`
          SELECT r.*, p.name as platform_name, p.slug as platform_slug
          FROM reviews r
          LEFT JOIN platforms p ON r.platform_id = p.id
          ORDER BY r.created_at DESC
        `;
      } else {
        reviews = await sql`
          SELECT r.*, p.name as platform_name, p.slug as platform_slug
          FROM reviews r
          LEFT JOIN platforms p ON r.platform_id = p.id
          WHERE r.status = ${status}
          ORDER BY r.created_at DESC
        `;
      }
    }

    return NextResponse.json({
      success: true,
      data: reviews
    });
  } catch (error: any) {
    console.error('❌ Error fetching reviews:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

// POST - Create new review
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      platform_id,
      user_id,
      user_name,
      user_avatar,
      user_role,
      title,
      content,
      overall_rating,
      ease_of_use_rating,
      support_rating,
      value_rating,
      pros,
      cons,
      project_type,
      earnings_range,
      years_experience,
      verified,
      status,
    } = body;

    // Validate required fields
    if (!platform_id || !user_id || !user_name || !title || !content || !overall_rating) {
      return NextResponse.json(
        { error: 'Missing required fields: platform_id, user_id, user_name, title, content, overall_rating' },
        { status: 400 }
      );
    }

    const review = await sql`
      INSERT INTO reviews (
        platform_id,
        user_id,
        user_name,
        user_avatar,
        user_role,
        title,
        content,
        overall_rating,
        ease_of_use_rating,
        support_rating,
        value_rating,
        pros,
        cons,
        project_type,
        earnings_range,
        years_experience,
        verified,
        status
      ) VALUES (
        ${platform_id},
        ${user_id},
        ${user_name},
        ${user_avatar || null},
        ${user_role || null},
        ${title},
        ${content},
        ${overall_rating},
        ${ease_of_use_rating || null},
        ${support_rating || null},
        ${value_rating || null},
        ${JSON.stringify(pros || [])}::jsonb,
        ${JSON.stringify(cons || [])}::jsonb,
        ${project_type || null},
        ${earnings_range || null},
        ${years_experience || null},
        ${verified || false},
        ${status || 'pending'}
      )
      RETURNING *
    `;

    console.log('✅ Review created:', review[0].title);

    return NextResponse.json({
      success: true,
      data: review[0],
      message: 'Review created successfully'
    });
  } catch (error: any) {
    console.error('❌ Error creating review:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create review' },
      { status: 500 }
    );
  }
}
