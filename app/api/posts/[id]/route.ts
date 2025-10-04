import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../../../lib/queries';
import { stackServerApp } from '../../../../stack/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: postId } = await params;

    const result = await sql`
      SELECT
        p.*,
        a.name as author_name,
        c.name as category_name
      FROM posts p
      LEFT JOIN authors a ON p.author_id = a.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ${postId}
      LIMIT 1;
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post: result[0] });

  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: postId } = await params;
    const data = await request.json();

    // Update post
    await sql`
      UPDATE posts
      SET
        title = ${data.title},
        slug = ${data.slug},
        excerpt = ${data.excerpt || null},
        content = ${data.content},
        feature_img = ${data.feature_img || null},
        status = ${data.status || 'draft'},
        featured = ${data.featured || false},
        category_id = ${data.category_id || null},
        updated_at = NOW()
      WHERE id = ${postId};
    `;

    // Update published_at if status changed to published
    if (data.status === 'published') {
      await sql`
        UPDATE posts
        SET published_at = COALESCE(published_at, NOW())
        WHERE id = ${postId};
      `;
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id: postId } = await params;

    await sql`
      DELETE FROM posts
      WHERE id = ${postId};
    `;

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
