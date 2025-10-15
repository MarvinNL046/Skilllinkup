import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const runtime = 'edge';

// GET: Fetch all comments for admin
export async function GET(request: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    const comments = await sql`
      SELECT
        id,
        post_id,
        author_name,
        author_email,
        content,
        status,
        created_at
      FROM comments
      ORDER BY created_at DESC;
    `;

    return NextResponse.json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}
