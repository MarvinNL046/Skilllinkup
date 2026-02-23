#!/usr/bin/env node

/**
 * Migration Runner for 0011: Marketplace Orders, Messages & Transactions
 *
 * Creates:
 *   - projects            (client-posted jobs with bidding)
 *   - bids                (freelancer proposals on projects)
 *   - orders              (active engagements: gig or project based)
 *   - order_milestones    (payment checkpoints within an order)
 *   - order_deliverables  (files submitted by freelancers)
 *   - conversations       (messaging threads between two users)
 *   - messages            (individual messages within a conversation)
 *   - transactions        (financial ledger: payments, payouts, refunds)
 *   - disputes            (conflict resolution cases)
 *   - marketplace_reviews (mutual ratings after order completion)
 *   - notifications       (in-app notification feed)
 *
 * Run with: node scripts/run-migration-0011.mjs
 */

import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { config } from 'dotenv';

config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function run() {
  console.log('Running migration 0011: Marketplace Orders, Messages & Transactions...\n');

  const migrationPath = new URL(
    '../drizzle/migrations/0011_marketplace_orders_messages.sql',
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

  console.log('\n--- Migration 0011 summary ---');
  console.log(`  ${successCount} statements succeeded`);
  console.log(`  ${skipCount} statements skipped (already exist)`);
  console.log(`  ${errorCount} statements failed`);

  if (errorCount > 0) {
    console.error('\nMigration completed with errors. Review the output above.');
    process.exit(1);
  } else {
    console.log('\nMigration 0011 complete!');
    console.log('\nTables created:');
    console.log('  - projects              (client-posted jobs)');
    console.log('  - bids                  (freelancer proposals on projects)');
    console.log('  - orders                (active engagements)');
    console.log('  - order_milestones      (payment checkpoints)');
    console.log('  - order_deliverables    (files submitted by freelancers)');
    console.log('  - conversations         (messaging threads)');
    console.log('  - messages              (individual messages)');
    console.log('  - transactions          (financial ledger)');
    console.log('  - disputes              (conflict resolution)');
    console.log('  - marketplace_reviews   (mutual ratings post-order)');
    console.log('  - notifications         (in-app notification feed)');
  }
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
