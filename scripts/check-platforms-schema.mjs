import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL || '';

if (!connectionString) {
  throw new Error('DATABASE_URL or NETLIFY_DATABASE_URL environment variable is required');
}

const sql = neon(connectionString);

async function checkPlatformsSchema() {
  console.log('🔍 Checking platforms table schema...\n');

  try {
    // Get table columns
    const columns = await sql`
      SELECT
        column_name,
        data_type,
        character_maximum_length,
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_name = 'platforms'
      ORDER BY ordinal_position;
    `;

    console.log('📊 Platforms table columns:\n');
    columns.forEach(col => {
      const nullable = col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL';
      const type = col.character_maximum_length
        ? `${col.data_type}(${col.character_maximum_length})`
        : col.data_type;
      const def = col.column_default ? ` DEFAULT ${col.column_default}` : '';

      console.log(`  ${col.column_name.padEnd(30)} ${type.padEnd(20)} ${nullable}${def}`);
    });

    // Check if work_type and countries columns exist
    const hasWorkType = columns.some(c => c.column_name === 'work_type');
    const hasCountries = columns.some(c => c.column_name === 'countries');

    console.log('\n\n🎯 Feature Check:');
    console.log(`  work_type column: ${hasWorkType ? '✅ EXISTS' : '❌ MISSING'}`);
    console.log(`  countries column: ${hasCountries ? '✅ EXISTS' : '❌ MISSING'}`);

  } catch (error) {
    console.error('❌ Error checking schema:', error);
    process.exit(1);
  }
}

checkPlatformsSchema()
  .then(() => {
    console.log('\n✨ Schema check complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
