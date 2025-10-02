import { NextResponse } from 'next/server';
import { sql } from '@/lib/queries';

// Edge Runtime for fast global search
export const runtime = 'edge';

/**
 * Search posts by title, content, or category
 * GET /api/search?q=keyword&limit=10
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!query || query.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Query must be at least 2 characters' },
        { status: 400 }
      );
    }

    // Full-text search across title, excerpt, and content
    const results = await sql`
      SELECT
        p.id,
        p.title,
        p.slug,
        p.excerpt,
        p.feature_img,
        p.published_at,
        c.name as category_name,
        c.slug as category_slug,
        u.name as author_name,
        -- Relevance score
        ts_rank(
          to_tsvector('english', p.title || ' ' || COALESCE(p.excerpt, '') || ' ' || p.content),
          plainto_tsquery('english', ${query})
        ) as relevance
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.author_id = u.id
      WHERE
        p.status = 'published'
        AND (
          p.title ILIKE ${`%${query}%`}
          OR p.excerpt ILIKE ${`%${query}%`}
          OR p.content ILIKE ${`%${query}%`}
          OR c.name ILIKE ${`%${query}%`}
        )
      ORDER BY relevance DESC, p.published_at DESC
      LIMIT ${limit}
    `;

    return NextResponse.json({
      success: true,
      query,
      count: results.length,
      results: results.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        featureImg: post.feature_img,
        publishedAt: post.published_at,
        category: post.category_name,
        categorySlug: post.category_slug,
        author: post.author_name,
        relevance: post.relevance,
      })),
    });
  } catch (error) {
    console.error('Error searching posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search posts' },
      { status: 500 }
    );
  }
}
