import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL not configured');
}

const sql = neon(databaseUrl);

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Creating test post...');

    // Get Marvin's author ID
    const marvinResult = await sql`
      SELECT id FROM authors WHERE email = 'info@staycoolairco.nl' LIMIT 1
    `;

    if (marvinResult.length === 0) {
      throw new Error('Marvin not found in authors table');
    }

    const marvinId = marvinResult[0].id;

    // Get a category
    const categoryResult = await sql`
      SELECT id FROM categories LIMIT 1
    `;

    const categoryId = categoryResult.length > 0 ? categoryResult[0].id : null;

    // Create test post
    const post = await sql`
      INSERT INTO posts (
        owner_id,
        author_id,
        title,
        slug,
        excerpt,
        content,
        category_id,
        featured_image,
        status,
        published_at
      ) VALUES (
        'test-owner-id',
        ${marvinId},
        'Welcome to SkillLinkup - Your Guide to Freelance Platforms',
        'welcome-to-skilllinkup',
        'Discover the best freelance platforms and boost your freelancing career. We compare and review top platforms to help you find the perfect match.',
        '<h2>Welcome to SkillLinkup!</h2><p>Finding the right freelance platform can make or break your freelancing career. Whether you''re a designer, developer, writer, or marketer, choosing the platform that matches your skills and goals is crucial.</p><h3>What We Offer</h3><ul><li>In-depth platform reviews</li><li>Side-by-side comparisons</li><li>Expert tips and guides</li><li>Success stories from real freelancers</li></ul><p>Join us as we explore the world of freelancing platforms and help you make informed decisions about where to invest your time and talent.</p>',
        ${categoryId},
        '/images/posts/lifestyle-post-01.webp',
        'published',
        NOW()
      )
      RETURNING *
    `;

    console.log('✅ Test post created:', post[0]);

    return NextResponse.json({
      success: true,
      message: 'Test post created successfully!',
      post: post[0]
    });

  } catch (error: any) {
    console.error('❌ Failed to create test post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create test post' },
      { status: 500 }
    );
  }
}
