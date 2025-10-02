#!/usr/bin/env node

/**
 * Fix Empty/NULL Feature Images
 * Updates posts with missing images to use default fallback
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

async function fixImages() {
  console.log('🔧 Fixing empty/NULL feature images...\n');

  try {
    // Show what will be fixed
    const toFix = await sql`
      SELECT id, slug, title, feature_img
      FROM posts
      WHERE feature_img IS NULL OR TRIM(feature_img) = '';
    `;

    if (toFix.length === 0) {
      console.log('✅ No posts need fixing!');
      return;
    }

    console.log(`Found ${toFix.length} posts to fix:\n`);
    toFix.forEach(post => {
      console.log(`   - ID ${post.id}: "${post.title}"`);
      console.log(`     Current: ${post.feature_img === null ? 'NULL' : `'${post.feature_img}'`}`);
    });
    console.log('');

    // Apply fix
    const fixed = await sql`
      UPDATE posts
      SET feature_img = '/images/posts/lifestyle-post-01.webp'
      WHERE feature_img IS NULL OR TRIM(feature_img) = ''
      RETURNING id, slug, title, feature_img;
    `;

    console.log(`✅ Fixed ${fixed.length} posts!\n`);
    console.log('Updated posts:');
    fixed.forEach(post => {
      console.log(`   - ID ${post.id}: "${post.title}"`);
      console.log(`     New value: '${post.feature_img}'`);
    });
    console.log('');

    console.log('🎉 All done! Run health check to verify:');
    console.log('   node scripts/db-health-check.mjs');
  } catch (error) {
    console.error('❌ Fix failed:', error.message);
    process.exit(1);
  }
}

fixImages();
