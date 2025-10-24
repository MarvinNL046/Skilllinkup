import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL || '';

if (!connectionString) {
  throw new Error('DATABASE_URL or NETLIFY_DATABASE_URL environment variable is required');
}

const sql = neon(connectionString);

async function runMigration() {
  console.log('🚀 Running migration 0004: Add work_type and countries...\n');

  try {
    // Statement 1: Add work_type column
    console.log('Adding work_type column...');
    await sql`ALTER TABLE platforms ADD COLUMN IF NOT EXISTS work_type VARCHAR(50) DEFAULT 'remote'`;

    // Statement 2: Add countries column
    console.log('Adding countries column...');
    await sql`ALTER TABLE platforms ADD COLUMN IF NOT EXISTS countries TEXT[]`;

    // Statement 3: Create work_type index
    console.log('Creating work_type index...');
    await sql`CREATE INDEX IF NOT EXISTS idx_platforms_work_type ON platforms(work_type)`;

    // Statement 4: Create countries GIN index
    console.log('Creating countries GIN index...');
    await sql`CREATE INDEX IF NOT EXISTS idx_platforms_countries ON platforms USING GIN(countries)`;

    // Statement 5: Set default values for existing records
    console.log('Setting default values for existing records...');
    await sql`UPDATE platforms SET work_type = 'remote' WHERE work_type IS NULL`;
    await sql`UPDATE platforms SET countries = ARRAY['Worldwide']::TEXT[] WHERE countries IS NULL AND work_type = 'remote'`;

    console.log('\n✅ Migration completed successfully!');

    // Verify the changes
    const result = await sql`
      SELECT
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_name = 'platforms'
        AND column_name IN ('work_type', 'countries')
      ORDER BY column_name;
    `;

    console.log('\n📊 New columns added:');
    result.forEach(col => {
      const type = col.data_type === 'ARRAY' ? 'TEXT[]' : col.data_type;
      const def = col.column_default ? ` (default: ${col.column_default})` : '';
      console.log(`  ✅ ${col.column_name}: ${type}${def}`);
    });

    // Show example platforms
    const platforms = await sql`
      SELECT name, work_type, countries
      FROM platforms
      LIMIT 3
    `;

    console.log('\n🔍 Sample platforms:');
    platforms.forEach(p => {
      console.log(`  ${p.name}: ${p.work_type} - [${p.countries?.join(', ') || 'NULL'}]`);
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
