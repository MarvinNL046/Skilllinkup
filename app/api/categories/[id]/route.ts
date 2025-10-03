import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../../../lib/queries';
import { stackServerApp } from '../../../../stack/server';

// PUT /api/categories/[id] - Update categorie
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { id } = await params;

    // Genereer slug als naam is ge update
    let slug = data.slug;
    if (data.name && !slug) {
      slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Check of slug al bestaat bij een andere categorie
    if (slug) {
      const existing = await sql`
        SELECT id FROM categories
        WHERE slug = ${slug} AND id != ${id}
      `;

      if (existing.length > 0) {
        return NextResponse.json(
          { error: 'Een categorie met deze slug bestaat al' },
          { status: 400 }
        );
      }
    }

    // Update categorie
    const result = await sql`
      UPDATE categories
      SET
        name = COALESCE(${data.name}, name),
        slug = COALESCE(${slug}, slug),
        description = COALESCE(${data.description}, description),
        color = COALESCE(${data.color}, color),
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING id, name, slug, description, color, created_at, updated_at
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Categorie niet gevonden' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      category: result[0]
    });

  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE /api/categories/[id] - Verwijder categorie
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Check of er posts zijn met deze categorie
    const posts = await sql`
      SELECT COUNT(*)::int as count
      FROM posts
      WHERE category_id = ${id}
    `;

    if (posts[0].count > 0) {
      return NextResponse.json(
        {
          error: 'Kan categorie niet verwijderen - er zijn nog posts gekoppeld',
          postCount: posts[0].count
        },
        { status: 400 }
      );
    }

    // Verwijder categorie
    const result = await sql`
      DELETE FROM categories
      WHERE id = ${id}
      RETURNING id, name
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Categorie niet gevonden' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Categorie "${result[0].name}" is verwijderd`
    });

  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
