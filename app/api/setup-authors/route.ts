import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL not configured');
}

const sql = neon(databaseUrl);

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Creating authors table...');

    // Create authors table
    await sql`
      CREATE TABLE IF NOT EXISTS authors (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        bio TEXT,
        avatar TEXT,
        website TEXT,
        social_links JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    console.log('✅ Authors table created');

    // Add author_id column to posts
    await sql`
      ALTER TABLE posts
      ADD COLUMN IF NOT EXISTS author_id UUID REFERENCES authors(id)
    `;

    console.log('✅ Added author_id column to posts');

    // Insert Marvin as default author
    await sql`
      INSERT INTO authors (
        name,
        email,
        bio,
        avatar,
        website,
        social_links
      ) VALUES (
        'Marvin',
        'info@staycoolairco.nl',
        'Freelance platform expert and founder of SkillLinkup. Helping freelancers find the best platforms for their skills.',
        '/images/posts/author/author-image-1.png',
        'https://skilllinkup.com',
        ${JSON.stringify({
          twitter: 'https://twitter.com/skilllinkup',
          linkedin: 'https://linkedin.com/company/skilllinkup',
          github: 'https://github.com/MarvinNL046'
        })}::jsonb
      )
      ON CONFLICT (email) DO NOTHING
    `;

    console.log('✅ Marvin added as author');

    // Get Marvin's ID
    const marvinResult = await sql`
      SELECT id FROM authors WHERE email = 'info@staycoolairco.nl' LIMIT 1
    `;

    if (marvinResult.length === 0) {
      throw new Error('Could not find Marvin in authors table');
    }

    const marvinId = marvinResult[0].id;

    // Update existing posts to have Marvin as author
    const updateResult = await sql`
      UPDATE posts
      SET author_id = ${marvinId}
      WHERE author_id IS NULL
    `;

    console.log(`✅ Updated ${updateResult.length} posts with Marvin as author`);

    // Create index for better performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id)
    `;

    console.log('✅ Created index on posts.author_id');

    // Enable RLS on authors table
    await sql`
      ALTER TABLE authors ENABLE ROW LEVEL SECURITY
    `;

    // Create RLS policies for authors
    await sql`
      CREATE POLICY authors_select_policy ON authors
      FOR SELECT
      TO authenticated
      USING (true)
    `;

    await sql`
      CREATE POLICY authors_insert_policy ON authors
      FOR INSERT
      TO authenticated
      WITH CHECK (true)
    `;

    await sql`
      CREATE POLICY authors_update_policy ON authors
      FOR UPDATE
      TO authenticated
      USING (true)
    `;

    console.log('✅ Created RLS policies for authors');

    // Grant permissions (skip anon grants if role doesn't exist)
    try {
      await sql`GRANT SELECT ON authors TO anon`;
    } catch (e) {
      console.log('⚠️ Skipped anon grant (role does not exist)');
    }

    try {
      await sql`GRANT SELECT, INSERT, UPDATE ON authors TO authenticated`;
    } catch (e) {
      console.log('⚠️ Skipped authenticated grant (role does not exist)');
    }

    console.log('✅ Granted permissions');

    return NextResponse.json({
      success: true,
      message: 'Authors system setup completed successfully!',
      marvinId: marvinId
    });

  } catch (error: any) {
    console.error('❌ Setup failed:', error);

    // If error is "already exists", it's okay
    if (error.message?.includes('already exists')) {
      return NextResponse.json({
        success: true,
        message: 'Authors system already exists'
      });
    }

    return NextResponse.json(
      { error: error.message || 'Setup failed' },
      { status: 500 }
    );
  }
}
