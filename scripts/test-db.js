#!/usr/bin/env node
const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function testDatabase() {
  console.log('🔍 Testing database connection...\n');

  try {
    const sql = neon(process.env.DATABASE_URL);

    // Test query - list all tables
    console.log('📊 Checking tables...');

    const tables = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;

    console.log(`\n✅ Found ${tables.length} tables:`);
    tables.forEach(t => console.log(`   - ${t.table_name}`));

    // Count rows in each table
    console.log('\n📈 Row counts:');
    const tenantCount = await sql`SELECT COUNT(*) as count FROM tenants`;
    const userCount = await sql`SELECT COUNT(*) as count FROM users`;
    const categoryCount = await sql`SELECT COUNT(*) as count FROM categories`;
    const postCount = await sql`SELECT COUNT(*) as count FROM posts`;
    const commentCount = await sql`SELECT COUNT(*) as count FROM comments`;
    const mediaCount = await sql`SELECT COUNT(*) as count FROM media`;
    const analyticsCount = await sql`SELECT COUNT(*) as count FROM analytics`;

    console.log(`   - tenants: ${tenantCount[0].count} rows`);
    console.log(`   - users: ${userCount[0].count} rows`);
    console.log(`   - categories: ${categoryCount[0].count} rows`);
    console.log(`   - posts: ${postCount[0].count} rows`);
    console.log(`   - comments: ${commentCount[0].count} rows`);
    console.log(`   - media: ${mediaCount[0].count} rows`);
    console.log(`   - analytics: ${analyticsCount[0].count} rows`);

    console.log('\n✅ Database connection successful!\n');

    if (parseInt(tenantCount[0].count) === 0) {
      console.log('💡 Tables are empty. Run `node scripts/seed.js` to add initial data\n');
    }

  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

testDatabase();
