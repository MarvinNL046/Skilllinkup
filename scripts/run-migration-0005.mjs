import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL || '';

if (!connectionString) {
  throw new Error('DATABASE_URL or NETLIFY_DATABASE_URL environment variable is required');
}

const sql = neon(connectionString);

async function runMigration() {
  console.log('🚀 Running migration 0005: Add locale column for internationalization...\n');

  try {
    // Statement 1: Add locale column to platforms
    console.log('Adding locale column to platforms...');
    await sql`ALTER TABLE platforms ADD COLUMN IF NOT EXISTS locale VARCHAR(5) DEFAULT 'nl'`;

    // Statement 2: Create platforms locale index
    console.log('Creating platforms locale index...');
    await sql`CREATE INDEX IF NOT EXISTS idx_platforms_locale ON platforms(locale)`;

    // Statement 3: Update existing platforms to 'nl'
    console.log('Setting default locale for existing platforms...');
    await sql`UPDATE platforms SET locale = 'nl' WHERE locale IS NULL`;

    // Statement 4: Add locale column to posts
    console.log('Adding locale column to posts...');
    await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS locale VARCHAR(5) DEFAULT 'nl'`;

    // Statement 5: Create posts locale index
    console.log('Creating posts locale index...');
    await sql`CREATE INDEX IF NOT EXISTS idx_posts_locale ON posts(locale)`;

    // Statement 6: Update existing posts to 'nl'
    console.log('Setting default locale for existing posts...');
    await sql`UPDATE posts SET locale = 'nl' WHERE locale IS NULL`;

    // Statement 7: Add locale column to categories
    console.log('Adding locale column to categories...');
    await sql`ALTER TABLE categories ADD COLUMN IF NOT EXISTS locale VARCHAR(5) DEFAULT 'nl'`;

    // Statement 8: Create categories locale index
    console.log('Creating categories locale index...');
    await sql`CREATE INDEX IF NOT EXISTS idx_categories_locale ON categories(locale)`;

    // Statement 9: Update existing categories to 'nl'
    console.log('Setting default locale for existing categories...');
    await sql`UPDATE categories SET locale = 'nl' WHERE locale IS NULL`;

    // Statement 10: Add comments (PostgreSQL specific)
    console.log('Adding column comments...');
    await sql`COMMENT ON COLUMN platforms.locale IS 'Content locale: nl (Dutch), en (English)'`;
    await sql`COMMENT ON COLUMN posts.locale IS 'Content locale: nl (Dutch), en (English)'`;
    await sql`COMMENT ON COLUMN categories.locale IS 'Content locale: nl (Dutch), en (English)'`;

    console.log('\n✅ Migration completed successfully!');

    // Verify the changes
    console.log('\n📊 Verifying changes...\n');

    // Check platforms table
    const platformsColumns = await sql`
      SELECT
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_name = 'platforms'
        AND column_name = 'locale'
      ORDER BY column_name;
    `;

    console.log('✅ Platforms table:');
    platformsColumns.forEach(col => {
      const def = col.column_default ? ` (default: ${col.column_default})` : '';
      console.log(`  ${col.column_name}: ${col.data_type}${def}`);
    });

    // Check posts table
    const postsColumns = await sql`
      SELECT
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_name = 'posts'
        AND column_name = 'locale'
      ORDER BY column_name;
    `;

    console.log('\n✅ Posts table:');
    postsColumns.forEach(col => {
      const def = col.column_default ? ` (default: ${col.column_default})` : '';
      console.log(`  ${col.column_name}: ${col.data_type}${def}`);
    });

    // Check categories table
    const categoriesColumns = await sql`
      SELECT
        column_name,
        data_type,
        is_nullable,
        column_default
      FROM information_schema.columns
      WHERE table_name = 'categories'
        AND column_name = 'locale'
      ORDER BY column_name;
    `;

    console.log('\n✅ Categories table:');
    categoriesColumns.forEach(col => {
      const def = col.column_default ? ` (default: ${col.column_default})` : '';
      console.log(`  ${col.column_name}: ${col.data_type}${def}`);
    });

    // Show sample records with locale
    console.log('\n🔍 Sample records with locale column:\n');

    const samplePlatforms = await sql`
      SELECT name, locale
      FROM platforms
      LIMIT 3
    `;
    console.log('Platforms:');
    samplePlatforms.forEach(p => {
      console.log(`  ${p.name}: ${p.locale}`);
    });

    const samplePosts = await sql`
      SELECT title, locale
      FROM posts
      LIMIT 3
    `;
    console.log('\nPosts:');
    samplePosts.forEach(p => {
      console.log(`  ${p.title}: ${p.locale}`);
    });

    const sampleCategories = await sql`
      SELECT name, locale
      FROM categories
      LIMIT 3
    `;
    console.log('\nCategories:');
    sampleCategories.forEach(c => {
      console.log(`  ${c.name}: ${c.locale}`);
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
