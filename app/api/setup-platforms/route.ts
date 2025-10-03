import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { join } from 'path';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL not configured');
}

const sql = neon(databaseUrl);

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Setting up platforms table...');

    // Read migration file
    const migrationPath = join(process.cwd(), 'migrations', '003_create_platforms.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf8');

    // Split by semicolons and filter out comments/empty lines
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--') && !s.startsWith('/*'));

    console.log(`📝 Found ${statements.length} SQL statements to execute\n`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];

      try {
        console.log(`▶️  Executing statement ${i + 1}...`);
        // Use neon() function directly for raw SQL
        if (!databaseUrl) {
          throw new Error('DATABASE_URL is not defined');
        }
        const db = neon(databaseUrl);
        // Use template literal for Neon
        await db`${statement};`;
        console.log(`✅ Statement ${i + 1} completed\n`);
      } catch (error: any) {
        // If error is "already exists" or "duplicate key", it's okay
        if (error.message?.includes('already exists') ||
            error.message?.includes('duplicate key value')) {
          console.log(`⚠️  Statement ${i + 1} skipped (already exists)\n`);
        } else {
          throw error;
        }
      }
    }

    // Verify the setup
    const platforms = await sql`SELECT COUNT(*) as count FROM platforms`;
    const publishedPlatforms = await sql`SELECT COUNT(*) as count FROM platforms WHERE status = 'published'`;

    console.log('✅ Platforms table setup completed successfully!');
    console.log(`📊 Total platforms: ${platforms[0]?.count || 0}`);
    console.log(`📊 Published platforms: ${publishedPlatforms[0]?.count || 0}`);

    return NextResponse.json({
      success: true,
      message: 'Platforms table setup completed successfully!',
      stats: {
        total: platforms[0]?.count || 0,
        published: publishedPlatforms[0]?.count || 0,
      }
    });

  } catch (error: any) {
    console.error('❌ Setup failed:', error);

    // If error is "already exists", it's okay
    if (error.message?.includes('already exists')) {
      const platforms = await sql`SELECT COUNT(*) as count FROM platforms`;
      return NextResponse.json({
        success: true,
        message: 'Platforms table already exists',
        stats: {
          total: platforms[0]?.count || 0,
        }
      });
    }

    return NextResponse.json(
      { error: error.message || 'Setup failed' },
      { status: 500 }
    );
  }
}
