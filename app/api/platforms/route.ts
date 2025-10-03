import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL not configured');
}

const sql = neon(databaseUrl);

// GET - Fetch all platforms
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';

    let platforms;

    if (status === 'all') {
      platforms = await sql`
        SELECT * FROM platforms
        ORDER BY created_at DESC
      `;
    } else {
      platforms = await sql`
        SELECT * FROM platforms
        WHERE status = ${status}
        ORDER BY created_at DESC
      `;
    }

    return NextResponse.json({
      success: true,
      data: platforms
    });
  } catch (error: any) {
    console.error('❌ Error fetching platforms:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch platforms' },
      { status: 500 }
    );
  }
}

// POST - Create new platform
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      slug,
      description,
      logo_url,
      website_url,
      rating,
      category,
      fees,
      difficulty,
      color,
      featured,
      pros,
      cons,
      features,
      status,
    } = body;

    // Validate required fields
    if (!name || !slug || !category || !difficulty) {
      return NextResponse.json(
        { error: 'Missing required fields: name, slug, category, difficulty' },
        { status: 400 }
      );
    }

    const platform = await sql`
      INSERT INTO platforms (
        owner_id,
        name,
        slug,
        description,
        logo_url,
        website_url,
        rating,
        category,
        fees,
        difficulty,
        color,
        featured,
        pros,
        cons,
        features,
        status,
        published_at
      ) VALUES (
        'test-owner-id',
        ${name},
        ${slug},
        ${description || null},
        ${logo_url || null},
        ${website_url || null},
        ${rating || 0},
        ${category},
        ${fees || null},
        ${difficulty},
        ${color || '#3B82F6'},
        ${featured || false},
        ${JSON.stringify(pros || [])}::jsonb,
        ${JSON.stringify(cons || [])}::jsonb,
        ${JSON.stringify(features || [])}::jsonb,
        ${status || 'draft'},
        ${status === 'published' ? new Date().toISOString() : null}
      )
      RETURNING *
    `;

    console.log('✅ Platform created:', platform[0].name);

    return NextResponse.json({
      success: true,
      data: platform[0],
      message: 'Platform created successfully'
    });
  } catch (error: any) {
    console.error('❌ Error creating platform:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create platform' },
      { status: 500 }
    );
  }
}
