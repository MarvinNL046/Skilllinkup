import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const sql = neon(process.env.DATABASE_URL!);

    // Fetch post categories
    const postCategories = await sql`
      SELECT
        c.id,
        c.name,
        c.slug,
        c.description,
        c.color,
        c.created_at,
        c.updated_at,
        COUNT(p.id)::int as post_count
      FROM categories c
      LEFT JOIN posts p ON c.id = p.category_id
      GROUP BY c.id, c.name, c.slug, c.description, c.color, c.created_at, c.updated_at
      ORDER BY c.name ASC
    `;

    // Fetch platform categories (unique categories from platforms table)
    const platformCategories = await sql`
      SELECT
        category,
        COUNT(*)::int as count
      FROM platforms
      WHERE status = 'published'
      GROUP BY category
      ORDER BY category ASC
    `;

    return NextResponse.json({
      postCategories,
      platformCategories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
