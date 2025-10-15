import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL not configured');
}

const sql = neon(databaseUrl);

// GET - Fetch single platform by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const platform = await sql`
      SELECT * FROM platforms
      WHERE id = ${id}
      LIMIT 1
    `;

    if (platform.length === 0) {
      return NextResponse.json(
        { error: 'Platform not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: platform[0]
    });
  } catch (error: any) {
    console.error('❌ Error fetching platform:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch platform' },
      { status: 500 }
    );
  }
}

// PUT - Update platform
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
      // Affiliate fields
      affiliate_link,
      commission_type,
      commission_value,
      cookie_duration,
      avg_affiliate_earnings,
      unique_benefits,
      automation_status,
    } = body;

    // Check if platform exists
    const existing = await sql`
      SELECT * FROM platforms WHERE id = ${id} LIMIT 1
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Platform not found' },
        { status: 404 }
      );
    }

    // Update platform
    const platform = await sql`
      UPDATE platforms SET
        name = ${name},
        slug = ${slug},
        description = ${description || null},
        logo_url = ${logo_url || null},
        website_url = ${website_url || null},
        rating = ${rating || 0},
        category = ${category},
        fees = ${fees || null},
        difficulty = ${difficulty},
        color = ${color || '#3B82F6'},
        featured = ${featured || false},
        pros = ${JSON.stringify(pros || [])}::jsonb,
        cons = ${JSON.stringify(cons || [])}::jsonb,
        features = ${JSON.stringify(features || [])}::jsonb,
        status = ${status || 'draft'},
        published_at = ${status === 'published' && !existing[0].published_at ? new Date().toISOString() : existing[0].published_at},
        updated_at = NOW(),
        affiliate_link = ${affiliate_link || null},
        commission_type = ${commission_type || 'fixed'},
        commission_value = ${commission_value || null},
        cookie_duration = ${cookie_duration || 30},
        avg_affiliate_earnings = ${avg_affiliate_earnings || 0},
        unique_benefits = ${unique_benefits && unique_benefits.length > 0 ? unique_benefits.filter((b: string) => b.trim()) : null}::text[],
        automation_status = ${automation_status || 'pending'}
      WHERE id = ${id}
      RETURNING *
    `;

    console.log('✅ Platform updated:', platform[0].name);

    return NextResponse.json({
      success: true,
      data: platform[0],
      message: 'Platform updated successfully'
    });
  } catch (error: any) {
    console.error('❌ Error updating platform:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update platform' },
      { status: 500 }
    );
  }
}

// DELETE - Delete platform
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if platform exists
    const existing = await sql`
      SELECT * FROM platforms WHERE id = ${id} LIMIT 1
    `;

    if (existing.length === 0) {
      return NextResponse.json(
        { error: 'Platform not found' },
        { status: 404 }
      );
    }

    // Delete platform
    await sql`
      DELETE FROM platforms WHERE id = ${id}
    `;

    console.log('✅ Platform deleted:', existing[0].name);

    return NextResponse.json({
      success: true,
      message: 'Platform deleted successfully'
    });
  } catch (error: any) {
    console.error('❌ Error deleting platform:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete platform' },
      { status: 500 }
    );
  }
}
