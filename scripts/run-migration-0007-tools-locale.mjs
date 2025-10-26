import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sql = neon(process.env.DATABASE_URL);

async function runMigration() {
  try {
    console.log('🚀 Running migration 0007: Add locale support to tools...\n');

    // Execute each SQL statement separately
    console.log('  → Adding locale column...');
    try {
      await sql`ALTER TABLE tools ADD COLUMN locale VARCHAR(5) DEFAULT 'en'`;
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('    (column already exists, skipping)');
      } else {
        throw error;
      }
    }

    console.log('  → Creating locale index...');
    try {
      await sql`CREATE INDEX IF NOT EXISTS idx_tools_locale ON tools(locale)`;
    } catch (error) {
      console.log('    (index already exists, skipping)');
    }

    console.log('  → Dropping old slug unique constraint...');
    try {
      await sql`ALTER TABLE tools DROP CONSTRAINT IF EXISTS tools_slug_key`;
    } catch (error) {
      console.log('    (constraint does not exist, skipping)');
    }

    console.log('  → Adding slug+locale unique constraint...');
    try {
      await sql`ALTER TABLE tools ADD CONSTRAINT tools_slug_locale_unique UNIQUE (slug, locale)`;
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('    (constraint already exists, skipping)');
      } else {
        throw error;
      }
    }

    console.log('  → Updating existing tools...');
    await sql`UPDATE tools SET locale = 'en' WHERE locale IS NULL OR locale = ''`;

    console.log('  → Setting locale as NOT NULL...');
    try {
      await sql`ALTER TABLE tools ALTER COLUMN locale SET NOT NULL`;
    } catch (error) {
      if (error.message.includes('already NOT NULL')) {
        console.log('    (column already NOT NULL, skipping)');
      } else {
        throw error;
      }
    }

    console.log('✅ Migration completed successfully!\n');

    // Verify results
    const tools = await sql`SELECT name, slug, locale FROM tools ORDER BY locale, name`;
    console.log('📊 Current tools in database:');
    tools.forEach(t => console.log(`   ${t.name} (${t.slug}) [${t.locale}]`));
    console.log(`\n✨ Total: ${tools.length} tools`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
