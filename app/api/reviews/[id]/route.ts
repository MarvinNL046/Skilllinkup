import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL not configured');
}

const sql = neon(databaseUrl);

// GET - Fetch single review by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const review = await sql`
      SELECT r.*, p.name as platform_name, p.slug as platform_slug
      FROM reviews r
      LEFT JOIN platforms p ON r.platform_id = p.id
      WHERE r.id = ${id}
      LIMIT 1
    `;

    if (review.length === 0) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: review[0]
    });
  } catch (error: any) {
    console.error('❌ Error fetching review:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch review' },
      { status: 500 }
    );
  }
}

// PUT - Update review
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      title,
      content,
      overall_rating,
      ease_of_use_rating,
      support_rating,
      value_rating,
      pros,
      cons,
      status,
      verified,
    } = body;

    const review = await sql`
      UPDATE reviews SET
        title = ${title},
        content = ${content},
        overall_rating = ${overall_rating},
        ease_of_use_rating = ${ease_of_use_rating || null},
        support_rating = ${support_rating || null},
        value_rating = ${value_rating || null},
        pros = ${JSON.stringify(pros || [])}::jsonb,
        cons = ${JSON.stringify(cons || [])}::jsonb,
        status = ${status},
        verified = ${verified || false},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    console.log('✅ Review updated:', review[0].title);

    return NextResponse.json({
      success: true,
      data: review[0],
      message: 'Review updated successfully'
    });
  } catch (error: any) {
    console.error('❌ Error updating review:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update review' },
      { status: 500 }
    );
  }
}

// DELETE - Delete review
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await sql`DELETE FROM reviews WHERE id = ${id}`;

    console.log('✅ Review deleted');

    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error: any) {
    console.error('❌ Error deleting review:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete review' },
      { status: 500 }
    );
  }
}
