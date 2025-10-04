import { neon } from '@neondatabase/serverless';

async function addAdFields() {
  const sql = neon(process.env.DATABASE_URL!);

  try {
    console.log('Adding ad_image and ad_link columns to posts table...');

    await sql`
      ALTER TABLE posts
      ADD COLUMN IF NOT EXISTS ad_image VARCHAR(500),
      ADD COLUMN IF NOT EXISTS ad_link VARCHAR(500)
    `;

    console.log('✅ Successfully added ad_image and ad_link columns!');
  } catch (error) {
    console.error('❌ Error adding columns:', error);
    process.exit(1);
  }
}

addAdFields();
