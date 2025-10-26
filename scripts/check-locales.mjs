import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL);

async function checkLocales() {
  console.log('🔍 Checking current locale distribution...\n');

  // Check platforms
  const platforms = await sql`
    SELECT locale, COUNT(*) as count
    FROM platforms
    GROUP BY locale
    ORDER BY locale
  `;
  console.log('Platforms by locale:');
  platforms.forEach(row => console.log(`  ${row.locale}: ${row.count} records`));

  // Check for duplicates
  const duplicates = await sql`
    SELECT slug, COUNT(*) as count
    FROM platforms
    GROUP BY slug
    HAVING COUNT(*) > 1
  `;
  console.log(`\nDuplicate slugs: ${duplicates.length}`);
  if (duplicates.length > 0) {
    console.log('Sample duplicates:');
    duplicates.slice(0, 5).forEach(row => console.log(`  ${row.slug}: ${row.count} versions`));
  }

  // Check posts
  const posts = await sql`
    SELECT locale, COUNT(*) as count
    FROM posts
    GROUP BY locale
    ORDER BY locale
  `;
  console.log('\nPosts by locale:');
  posts.forEach(row => console.log(`  ${row.locale}: ${row.count} records`));

  // Check categories
  const categories = await sql`
    SELECT locale, COUNT(*) as count
    FROM categories
    GROUP BY locale
    ORDER BY locale
  `;
  console.log('\nCategories by locale:');
  categories.forEach(row => console.log(`  ${row.locale}: ${row.count} records`));
}

checkLocales()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Failed:', error);
    process.exit(1);
  });
