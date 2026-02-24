#!/usr/bin/env node

/**
 * Migration Runner for 0015: Add last_active_at to users
 *
 * Adds:
 *   - last_active_at TIMESTAMP column on users table
 *   - Index for efficient online-status lookups
 *
 * Run with: node scripts/run-migration-0015.mjs
 */

import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { config } from 'dotenv';

config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function run() {
  console.log('Running migration 0015: Add last_active_at to users...\n');

  const migrationPath = new URL(
    '../drizzle/migrations/0015_add_last_active_at.sql',
    import.meta.url
  );
  const migration = readFileSync(migrationPath, 'utf-8');

  const statements = migration
    .split('\n')
    .filter(line => line.trim() && !line.trim().startsWith('--'))
    .join('\n')
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const statement of statements) {
    const preview = statement.substring(0, 60).replace(/\n/g, ' ');
    try {
      await sql(statement);
      console.log(`  ok  ${preview}...`);
      successCount++;
    } catch (err) {
      if (
        err.message?.includes('already exists') ||
        err.message?.includes('duplicate column')
      ) {
        console.log(`  --  ${preview}... (already exists, skipped)`);
        skipCount++;
      } else {
        console.error(`  ERR ${preview}...`);
        console.error(`      ${err.message}`);
        errorCount++;
      }
    }
  }

  console.log('\n--- Migration 0015 summary ---');
  console.log(`  ${successCount} statements succeeded`);
  console.log(`  ${skipCount} statements skipped (already exist)`);
  console.log(`  ${errorCount} statements failed`);

  if (errorCount > 0) {
    console.error('\nMigration completed with errors. Review the output above.');
    process.exit(1);
  } else {
    console.log('\nMigration 0015 complete!');
    console.log('\nChanges:');
    console.log('  - users.last_active_at TIMESTAMP column added');
    console.log('  - idx_users_last_active index created');
  }
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
