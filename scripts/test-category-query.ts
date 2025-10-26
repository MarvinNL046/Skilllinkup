import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is required');
}

const sql = neon(connectionString);

async function testCategoryQuery() {
  console.log('🔍 Testing category query for slug="ai" and locale="nl"...\n');

  const result = await sql`
    SELECT
      c.id,
      c.name,
      c.slug,
      c.description,
      c.locale,
      COUNT(p.id)::int as post_count
    FROM categories c
    LEFT JOIN posts p ON c.id = p.category_id AND p.status = 'published' AND p.locale = 'nl'
    WHERE c.slug = 'ai'
      AND c.locale = 'nl'
    GROUP BY c.id, c.name, c.slug, c.description, c.locale;
  `;

  console.log('📊 Query result:');
  console.log(JSON.stringify(result, null, 2));

  if (result.length > 0) {
    console.log('\n✅ Category found!');
  } else {
    console.log('\n❌ Category NOT found! This will cause 404.');
  }

  // Also test all NL categories
  console.log('\n🔍 All NL categories:');
  const allNl = await sql`
    SELECT name, slug, locale
    FROM categories
    WHERE locale = 'nl'
    ORDER BY slug;
  `;
  console.table(allNl);

  process.exit(0);
}

testCategoryQuery().catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});
