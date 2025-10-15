#!/usr/bin/env node
/**
 * Run Affiliate Fields Migration
 * Adds fields needed for automated blog post generation
 */

import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sql = neon(process.env.DATABASE_URL);

async function runMigration() {
  try {
    console.log('🚀 Running affiliate fields migration...\n');

    // Read migration file
    const migrationPath = join(__dirname, '../drizzle/migrations/0003_add_affiliate_fields.sql');
    const migrationSQL = readFileSync(migrationPath, 'utf-8');

    // Execute migration step by step
    console.log('Adding affiliate_link column...');
    await sql`ALTER TABLE platforms ADD COLUMN IF NOT EXISTS affiliate_link VARCHAR(500)`;

    console.log('Adding commission_type column...');
    await sql`ALTER TABLE platforms ADD COLUMN IF NOT EXISTS commission_type VARCHAR(50)`;

    console.log('Adding commission_value column...');
    await sql`ALTER TABLE platforms ADD COLUMN IF NOT EXISTS commission_value VARCHAR(100)`;

    console.log('Adding cookie_duration column...');
    await sql`ALTER TABLE platforms ADD COLUMN IF NOT EXISTS cookie_duration INTEGER`;

    console.log('Adding avg_affiliate_earnings column...');
    await sql`ALTER TABLE platforms ADD COLUMN IF NOT EXISTS avg_affiliate_earnings DECIMAL(10,2)`;

    console.log('Adding unique_benefits column...');
    await sql`ALTER TABLE platforms ADD COLUMN IF NOT EXISTS unique_benefits TEXT[]`;

    console.log('Adding automation_status column...');
    await sql`ALTER TABLE platforms ADD COLUMN IF NOT EXISTS automation_status VARCHAR(50) DEFAULT 'pending'`;

    console.log('Creating indexes...');
    await sql`CREATE INDEX IF NOT EXISTS idx_platforms_automation_status ON platforms(automation_status)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_platforms_affiliate_link ON platforms(affiliate_link)`;

    console.log('✅ Migration completed successfully!\n');

    // Verify new columns
    const result = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'platforms'
        AND column_name IN (
          'affiliate_link',
          'commission_type',
          'commission_value',
          'cookie_duration',
          'avg_affiliate_earnings',
          'unique_benefits',
          'automation_status'
        )
      ORDER BY column_name;
    `;

    console.log('📋 New columns added:');
    console.table(result);

    // Show example update query
    console.log('\n📝 Example usage:');
    console.log(`
UPDATE platforms
SET
  affiliate_link = 'https://go.skilllinkup.com/upwork',
  commission_type = 'fixed',
  commission_value = '$150 per signup',
  cookie_duration = 90,
  avg_affiliate_earnings = 1200.00,
  unique_benefits = ARRAY[
    'Dedicated account manager',
    'Marketing materials included',
    'High conversion rate (15%)'
  ],
  automation_status = 'pending'
WHERE slug = 'upwork';
    `);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
