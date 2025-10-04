import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const runtime = 'edge';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const sql = neon(process.env.DATABASE_URL!);

    // Increment view count
    const result = await sql`
      UPDATE posts
      SET views = COALESCE(views, 0) + 1
      WHERE slug = ${slug}
      RETURNING views
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      views: result[0].views,
    });

  } catch (error) {
    console.error('Error updating views:', error);
    return NextResponse.json(
      { error: 'Failed to update views' },
      { status: 500 }
    );
  }
}
