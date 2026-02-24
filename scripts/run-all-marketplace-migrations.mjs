import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { config } from 'dotenv';

config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

const migrations = [
  { file: '0010_marketplace_foundation.sql', name: '0010: Marketplace Foundation' },
  { file: '0011_marketplace_orders_messages.sql', name: '0011: Orders & Messages' },
  { file: '0012_add_geo_coordinates.sql', name: '0012: Geo Coordinates' },
  { file: '0013_quote_requests.sql', name: '0013: Quote Requests' },
  { file: '0014_marketplace_seo_metadata.sql', name: '0014: SEO Metadata' },
];

async function runMigration(migration) {
  console.log(`\n📦 Running migration ${migration.name}...`);

  let content;
  try {
    content = readFileSync(
      new URL(`../drizzle/migrations/${migration.file}`, import.meta.url),
      'utf-8'
    );
  } catch (err) {
    console.log(`  ⚠ File not found: ${migration.file}, skipping`);
    return;
  }

  // Split by semicolons, handling $$ blocks for functions/triggers
  const statements = [];
  let current = '';
  let inDollarBlock = false;

  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('--') && !inDollarBlock) continue;

    if (trimmed.includes('$$')) {
      inDollarBlock = !inDollarBlock;
    }

    current += line + '\n';

    if (trimmed.endsWith(';') && !inDollarBlock) {
      const stmt = current.trim();
      if (stmt.length > 1) {
        statements.push(stmt);
      }
      current = '';
    }
  }

  let success = 0;
  let failed = 0;
  for (const statement of statements) {
    try {
      await sql.query(statement);
      success++;
      const preview = statement.substring(0, 70).replace(/\n/g, ' ');
      console.log(`  ✓ ${preview}...`);
    } catch (err) {
      const msg = err.message || '';
      if (msg.includes('already exists') || msg.includes('duplicate')) {
        console.log(`  ~ Already exists: ${statement.substring(0, 50).replace(/\n/g, ' ')}...`);
      } else {
        failed++;
        console.error(`  ✗ ${statement.substring(0, 50).replace(/\n/g, ' ')}...`);
        console.error(`    Error: ${msg.substring(0, 120)}`);
      }
    }
  }
  console.log(`  Done: ${success} succeeded, ${failed} failed`);
}

async function run() {
  console.log('🚀 Running all marketplace migrations...\n');

  for (const migration of migrations) {
    await runMigration(migration);
  }

  console.log('\n✅ All migrations complete!');
}

run().catch(console.error);
