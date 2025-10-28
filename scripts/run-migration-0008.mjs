import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL || '';

if (!connectionString) {
  throw new Error('DATABASE_URL or NETLIFY_DATABASE_URL environment variable is required');
}

const sql = neon(connectionString);

async function runMigration() {
  console.log('🚀 Running migration 0008: Add ads table...\n');

  try {
    // Statement 1: Create ads table
    console.log('Creating ads table...');
    await sql`
      CREATE TABLE IF NOT EXISTS ads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        image_url TEXT NOT NULL,
        link_url TEXT NOT NULL,
        placement VARCHAR(50) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        start_date TIMESTAMP,
        end_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Statement 2: Create indexes
    console.log('Creating indexes...');
    await sql`CREATE INDEX IF NOT EXISTS idx_ads_tenant ON ads(tenant_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_ads_placement ON ads(placement)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_ads_active ON ads(is_active)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_ads_placement_active ON ads(placement, is_active)`;

    console.log('\n✅ Migration completed successfully!');

    // Verify the changes
    const result = await sql`
      SELECT
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_name = 'ads'
      ORDER BY ordinal_position;
    `;

    console.log('\n📊 Ads table columns:');
    result.forEach(col => {
      const nullable = col.is_nullable === 'YES' ? '(nullable)' : '(required)';
      const def = col.column_default ? ` [default: ${col.column_default.substring(0, 30)}...]` : '';
      console.log(`  ✅ ${col.column_name}: ${col.data_type} ${nullable}${def}`);
    });

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigration()
  .then(() => {
    console.log('\n✨ Migration script complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
