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
    console.log('🔄 Starting author migration...\n');

    // Read migration file
    const migrationPath = join(__dirname, '..', 'migrations', '002_add_marvin_author.sql');
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

      // Skip DO blocks and RAISE NOTICE (Neon doesn't support them)
      if (statement.includes('DO $$') || statement.includes('RAISE NOTICE')) {
        console.log(`⏭️  Skipping statement ${i + 1} (procedural code)`);
        continue;
      }

      try {
        console.log(`▶️  Executing statement ${i + 1}...`);
        await sql(statement);
        console.log(`✅ Statement ${i + 1} completed\n`);
      } catch (error) {
        // If error is "column already exists" or "already exists", it's okay
        if (error.message.includes('already exists') ||
            error.message.includes('duplicate key value')) {
          console.log(`⚠️  Statement ${i + 1} skipped (already exists)\n`);
        } else {
          throw error;
        }
      }
    }

    console.log('✅ Author migration completed successfully!');
    console.log('📝 Marvin added as default author');
    console.log('🔗 Existing posts linked to Marvin');

    // Verify the migration
    const authors = await sql`SELECT * FROM authors WHERE email = 'info@staycoolairco.nl'`;
    const posts = await sql`SELECT COUNT(*) as count FROM posts WHERE author_id IS NOT NULL`;

    console.log('\n📊 Verification:');
    console.log(`   Author: ${authors[0]?.name || 'Not found'}`);
    console.log(`   Posts with author: ${posts[0]?.count || 0}`);

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

runMigration();
