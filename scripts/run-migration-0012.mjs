import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { config } from 'dotenv';
config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL || '');

async function run() {
  console.log('Running migration 0012: Add geo coordinates...');
  const migration = readFileSync(
    new URL('../drizzle/migrations/0012_add_geo_coordinates.sql', import.meta.url),
    'utf-8'
  );
  const statements = migration
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith('--'));

  for (const statement of statements) {
    try {
      await sql(statement);
      console.log(`  v ${statement.substring(0, 60).replace(/\n/g, ' ')}...`);
    } catch (err) {
      console.error(`  x Error: ${err.message}`);
    }
  }
  console.log('Migration 0012 complete!');
}

run().catch(console.error);
