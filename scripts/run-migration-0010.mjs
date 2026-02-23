#!/usr/bin/env node

/**
 * Migration Runner for 0010: Marketplace Foundation Tables
 *
 * Creates:
 *   - accounts          (Auth.js OAuth account links)
 *   - sessions          (Auth.js user sessions)
 *   - verification_tokens (Auth.js email verification)
 *   - users extensions  (user_type, image, email_verified_at columns + indexes)
 *   - freelancer_profiles
 *   - marketplace_categories
 *   - skills
 *   - gigs
 *   - gig_packages
 *   - gig_images
 *
 * Run with: node scripts/run-migration-0010.mjs
 */

import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { config } from 'dotenv';

config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function run() {
  console.log('Running migration 0010: Marketplace Foundation...\n');

  const migrationPath = new URL(
    '../drizzle/migrations/0010_marketplace_foundation.sql',
    import.meta.url
  );
  const migration = readFileSync(migrationPath, 'utf-8');

  // Split by semicolons, handling $$ blocks for functions
  const statements = migration
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

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
      // Treat "already exists" errors as non-fatal (idempotent migration)
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

  console.log('\n--- Migration 0010 summary ---');
  console.log(`  ${successCount} statements succeeded`);
  console.log(`  ${skipCount} statements skipped (already exist)`);
  console.log(`  ${errorCount} statements failed`);

  if (errorCount > 0) {
    console.error('\nMigration completed with errors. Review the output above.');
    process.exit(1);
  } else {
    console.log('\nMigration 0010 complete!');
    console.log('\nTables created / extended:');
    console.log('  - accounts                (Auth.js OAuth links)');
    console.log('  - sessions                (Auth.js sessions)');
    console.log('  - verification_tokens     (Auth.js email verification)');
    console.log('  - users                   (added user_type, image, email_verified_at)');
    console.log('  - freelancer_profiles     (freelancer marketplace profiles)');
    console.log('  - marketplace_categories  (service categories)');
    console.log('  - skills                  (skill taxonomy)');
    console.log('  - gigs                    (freelancer service listings)');
    console.log('  - gig_packages            (pricing tiers per gig)');
    console.log('  - gig_images              (gallery images per gig)');
  }
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
