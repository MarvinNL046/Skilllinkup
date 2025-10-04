import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../../lib/queries';
import { stackServerApp } from '../../../stack/server';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Generate slug if not provided
    const slug = data.slug || data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Default tenant ID for single-tenant setup
    const TENANT_ID = '62999b2a-04ec-4ba8-814b-1d74d6937199';

    // Convert tags string to array
    const tagsArray = data.tags
      ? data.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag)
      : [];

    // Insert post into database
    const result = await sql`
      INSERT INTO posts (
        tenant_id,
        title,
        slug,
        excerpt,
        content,
        feature_img,
        status,
        featured,
        category_id,
        author_id,
        tags,
        meta_title,
        meta_description,
        created_at,
        updated_at
      ) VALUES (
        ${TENANT_ID},
        ${data.title},
        ${slug},
        ${data.excerpt || null},
        ${data.content},
        ${data.feature_img || data.featuredImage || null},
        ${data.status || 'draft'},
        ${data.featured || false},
        ${data.category_id || data.category || null},
        NULL,
        ${JSON.stringify(tagsArray)},
        ${data.meta_title || data.metaTitle || null},
        ${data.meta_description || data.metaDescription || null},
        NOW(),
        NOW()
      )
      RETURNING id, slug;
    `;

    // If published, set published_at
    if (data.status === 'published') {
      await sql`
        UPDATE posts
        SET published_at = NOW()
        WHERE id = ${result[0].id};
      `;
    }

    return NextResponse.json({
      success: true,
      post: result[0]
    });

  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    // Build query using template literal with conditional filters
    const posts = await sql`
      SELECT
        p.id,
        p.title,
        p.slug,
        p.excerpt,
        p.feature_img,
        p.status,
        p.featured,
        p.views,
        p.published_at,
        p.created_at,
        u.name as author_name,
        c.name as category_name
      FROM posts p
      LEFT JOIN users u ON p.author_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
        ${status ? sql`AND p.status = ${status}` : sql``}
        ${category ? sql`AND p.category_id = ${category}` : sql``}
        ${search ? sql`AND (p.title ILIKE ${`%${search}%`} OR p.content ILIKE ${`%${search}%`})` : sql``}
      ORDER BY p.created_at DESC
      LIMIT 100
    `;

    return NextResponse.json({ posts });

  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
