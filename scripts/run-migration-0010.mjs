#!/usr/bin/env node

/**
 * Migration Runner for 0010: Marketplace Foundation Tables
 *
 * Creates:
 *   - accounts          (Auth.js OAuth account links)
 *   - sessions          (Auth.js user sessions)
 *   - verification_tokens (Auth.js email verification)
 *   - users extensions  (user_type, image, email_verified columns + indexes)
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

  // Split by semicolons, but preserve $$ function bodies
  const statements = [];
  let current = '';
  let inDollarBlock = false;

  for (const line of migration.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('--') && !current.trim()) continue;

    if (trimmed.includes('$$') && !inDollarBlock) {
      inDollarBlock = true;
      current += line + '\n';
      // Check if $$ opens AND closes on same line (e.g., $$ language 'plpgsql')
      const count = (line.match(/\$\$/g) || []).length;
      if (count >= 2) inDollarBlock = false;
      continue;
    }

    if (inDollarBlock) {
      current += line + '\n';
      if (trimmed.includes('$$')) inDollarBlock = false;
      continue;
    }

    // Normal mode: split on semicolons
    current += line + '\n';
    if (trimmed.endsWith(';')) {
      const stmt = current.trim().replace(/;$/, '').trim();
      if (stmt.length > 0) statements.push(stmt);
      current = '';
    }
  }

  // Handle any remaining statement
  if (current.trim().replace(/;$/, '').trim().length > 0) {
    statements.push(current.trim().replace(/;$/, '').trim());
  }

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
    console.log('  - users                   (added user_type, image, email_verified)');
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
