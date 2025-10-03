import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../../lib/queries';
import { stackServerApp } from '../../../stack/server';

// GET /api/categories - Haal alle categorieën op
export async function GET(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const categories = await sql`
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

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/categories - Maak nieuwe categorie aan
export async function POST(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Genereer slug als die niet is meegegeven
    const slug = data.slug || data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check of slug al bestaat
    const existing = await sql`
      SELECT id FROM categories WHERE slug = ${slug}
    `;

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Een categorie met deze slug bestaat al' },
        { status: 400 }
      );
    }

    // Maak categorie aan
    const result = await sql`
      INSERT INTO categories (
        name,
        slug,
        description,
        color
      ) VALUES (
        ${data.name},
        ${slug},
        ${data.description || null},
        ${data.color || '#ef2b70'}
      )
      RETURNING id, name, slug, description, color, created_at, updated_at
    `;

    return NextResponse.json({
      success: true,
      category: result[0]
    });

  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
