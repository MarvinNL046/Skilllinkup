#!/usr/bin/env node
const { neon } = require('@netlify/neon');
require('dotenv').config({ path: '.env.local' });

async function testNetlifyNeon() {
  console.log('🧪 Testing @netlify/neon package...\n');

  try {
    // @netlify/neon can use explicit connection string or env var
    const sql = neon(process.env.DATABASE_URL);

    console.log('📊 Fetching posts from database...\n');

    const posts = await sql`
      SELECT
        p.id,
        p.title,
        p.slug,
        p.status,
        p.featured,
        p.views,
        c.name as category_name,
        u.name as author_name
      FROM posts p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.author_id = u.id
      WHERE p.status = 'published'
      ORDER BY p.published_at DESC
      LIMIT 5;
    `;

    console.log(`✅ Found ${posts.length} published posts:\n`);

    posts.forEach((post, i) => {
      console.log(`${i + 1}. ${post.title}`);
      console.log(`   Status: ${post.status} | Featured: ${post.featured} | Views: ${post.views}`);
      console.log(`   Category: ${post.category_name} | Author: ${post.author_name}`);
      console.log(`   Slug: /${post.slug}\n`);
    });

    console.log('✅ @netlify/neon package works perfectly!\n');
    console.log('💡 In production on Netlify, you can use:');
    console.log('   const sql = neon(); // No connection string needed!\n');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

testNetlifyNeon();
