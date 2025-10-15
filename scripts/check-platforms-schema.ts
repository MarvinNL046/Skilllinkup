// scripts/check-platforms-schema.ts
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || '';
const sql = neon(connectionString);

async function checkSchema() {
  try {
    // Check if platforms table exists and get structure
    const result = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'platforms'
      ORDER BY ordinal_position;
    `;

    console.log('📊 Platforms table structure:\n');
    result.forEach(col => {
      console.log(`   ${col.column_name.padEnd(20)} ${col.data_type.padEnd(20)} ${col.is_nullable === 'YES' ? '✓ nullable' : '❌ NOT NULL'}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

checkSchema();
