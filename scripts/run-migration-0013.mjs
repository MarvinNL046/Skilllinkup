#!/usr/bin/env node

/**
 * Migration Runner for 0013: Quote Requests for Local Services
 *
 * Creates:
 *   - quote_requests  (clients describe work needed, post locally)
 *   - quotes          (freelancer responses with price + description)
 *
 * Run with: node scripts/run-migration-0013.mjs
 */

import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { config } from 'dotenv';

config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function run() {
  console.log('Running migration 0013: Quote Requests for Local Services...\n');

  const migrationPath = new URL(
    '../drizzle/migrations/0013_quote_requests.sql',
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
      const count = (line.match(/\$\$/g) || []).length;
      if (count >= 2) inDollarBlock = false;
      continue;
    }

    if (inDollarBlock) {
      current += line + '\n';
      if (trimmed.includes('$$')) inDollarBlock = false;
      continue;
    }

    current += line + '\n';
    if (trimmed.endsWith(';')) {
      const stmt = current.trim().replace(/;$/, '').trim();
      if (stmt.length > 0) statements.push(stmt);
      current = '';
    }
  }

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

  console.log('\n--- Migration 0013 summary ---');
  console.log(`  ${successCount} statements succeeded`);
  console.log(`  ${skipCount} statements skipped (already exist)`);
  console.log(`  ${errorCount} statements failed`);

  if (errorCount > 0) {
    console.error('\nMigration completed with errors. Review the output above.');
    process.exit(1);
  } else {
    console.log('\nMigration 0013 complete!');
    console.log('\nTables created:');
    console.log('  - quote_requests  (client requests for local services)');
    console.log('  - quotes          (freelancer responses with pricing)');
  }
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
