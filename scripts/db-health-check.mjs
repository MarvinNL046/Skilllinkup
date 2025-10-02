#!/usr/bin/env node

/**
 * Database Health Check
 * Verifies data quality and fixes common issues
 */

import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';

// Load .env.local
config({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL not configured');
  process.exit(1);
}

const sql = neon(databaseUrl);

async function checkHealth() {
  console.log('🔍 Running database health check...\n');

  try {
    // Check posts table
    const result = await sql`
      SELECT
        COUNT(*) AS total_posts,
        COUNT(*) FILTER (WHERE feature_img IS NULL) AS null_images,
        COUNT(*) FILTER (WHERE TRIM(feature_img) = '') AS empty_images,
        COUNT(*) FILTER (WHERE status = 'published') AS published_posts,
        COUNT(*) FILTER (WHERE featured = true) AS featured_posts
      FROM posts;
    `;

    const stats = result[0];

    console.log('📊 Database Statistics:');
    console.log(`   Total posts: ${stats.total_posts}`);
    console.log(`   Published posts: ${stats.published_posts}`);
    console.log(`   Featured posts: ${stats.featured_posts}`);
    console.log(`   Posts with NULL images: ${stats.null_images}`);
    console.log(`   Posts with empty images: ${stats.empty_images}`);
    console.log('');

    // Check for problematic posts
    if (Number(stats.null_images) > 0 || Number(stats.empty_images) > 0) {
      console.log('⚠️  WARNING: Found posts with missing/empty images!');
      console.log('');

      const problematic = await sql`
        SELECT id, slug, title, feature_img
        FROM posts
        WHERE feature_img IS NULL OR TRIM(feature_img) = ''
        LIMIT 10;
      `;

      console.log('First 10 problematic posts:');
      problematic.forEach(post => {
        console.log(`   - ID ${post.id}: "${post.title}" (${post.slug})`);
        console.log(`     feature_img: ${post.feature_img === null ? 'NULL' : `'${post.feature_img}'`}`);
      });
      console.log('');

      // Offer to fix
      console.log('💡 To fix these issues, run:');
      console.log('   node scripts/fix-empty-images.mjs');
      console.log('');
    } else {
      console.log('✅ All posts have valid feature images!');
      console.log('');
    }

    // Check users
    const userStats = await sql`
      SELECT
        COUNT(*) AS total_users,
        COUNT(*) FILTER (WHERE avatar IS NULL OR TRIM(avatar) = '') AS missing_avatars
      FROM users;
    `;

    console.log('👥 User Statistics:');
    console.log(`   Total users: ${userStats[0].total_users}`);
    console.log(`   Users without avatars: ${userStats[0].missing_avatars}`);
    console.log('');

    // Check categories
    const catStats = await sql`
      SELECT COUNT(*) AS total_categories FROM categories;
    `;

    console.log('📁 Category Statistics:');
    console.log(`   Total categories: ${catStats[0].total_categories}`);
    console.log('');

    console.log('✅ Health check complete!');
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    process.exit(1);
  }
}

checkHealth();
