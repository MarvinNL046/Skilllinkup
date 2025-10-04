import { neon } from '@neondatabase/serverless';

async function addQuickInfoFields() {
  const sql = neon(process.env.DATABASE_URL!);

  try {
    console.log('Adding Quick Info columns to posts table...');

    await sql`
      ALTER TABLE posts
      ADD COLUMN IF NOT EXISTS platform_type VARCHAR(255),
      ADD COLUMN IF NOT EXISTS fee_structure VARCHAR(255),
      ADD COLUMN IF NOT EXISTS difficulty_level VARCHAR(100),
      ADD COLUMN IF NOT EXISTS best_for VARCHAR(255)
    `;

    console.log('✅ Successfully added Quick Info columns!');
  } catch (error) {
    console.error('❌ Error adding columns:', error);
    process.exit(1);
  }
}

addQuickInfoFields();
