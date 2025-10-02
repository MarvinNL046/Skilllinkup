import { NextResponse } from 'next/server';
import { sql } from '@/lib/queries';

// Edge Runtime - runs globally
export const runtime = 'edge';

/**
 * Increment post view count
 * GET /api/posts/{slug}/views
 */
export async function POST(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const params = await context.params;
    const { slug } = params;

    // Increment view count
    const result = await sql`
      UPDATE posts
      SET views = views + 1
      WHERE slug = ${slug}
      RETURNING views
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      views: result[0].views,
    });
  } catch (error) {
    console.error('Error incrementing views:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to increment views' },
      { status: 500 }
    );
  }
}

/**
 * Get current view count
 * GET /api/posts/{slug}/views
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const params = await context.params;
    const { slug } = params;

    const result = await sql`
      SELECT views
      FROM posts
      WHERE slug = ${slug}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      views: result[0].views,
    });
  } catch (error) {
    console.error('Error fetching views:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch views' },
      { status: 500 }
    );
  }
}
