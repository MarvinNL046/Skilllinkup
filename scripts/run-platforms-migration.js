#!/usr/bin/env node

import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
import dotenv from 'dotenv';
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL not found in .env.local');
  process.exit(1);
}

const sql = neon(databaseUrl);

async function runMigration() {
  try {
    console.log('🔄 Starting platforms migration...\n');

    // Read migration file
    const migrationPath = join(__dirname, '..', 'migrations', '003_create_platforms.sql');
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
        await sql.unsafe(statement);
        console.log(`✅ Statement ${i + 1} completed\n`);
      } catch (error) {
        // If error is "already exists" or "duplicate key", it's okay
        if (error.message?.includes('already exists') ||
            error.message?.includes('duplicate key value')) {
          console.log(`⚠️  Statement ${i + 1} skipped (already exists)\n`);
        } else {
          throw error;
        }
      }
    }

    console.log('✅ Platforms migration completed successfully!');

    // Verify the migration
    const platforms = await sql`SELECT COUNT(*) as count FROM platforms`;
    const publishedPlatforms = await sql`SELECT COUNT(*) as count FROM platforms WHERE status = 'published'`;

    console.log('\n📊 Verification:');
    console.log(`   Total platforms: ${platforms[0]?.count || 0}`);
    console.log(`   Published platforms: ${publishedPlatforms[0]?.count || 0}`);

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

runMigration();
