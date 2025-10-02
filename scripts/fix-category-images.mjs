#!/usr/bin/env node

/**
 * Fix NULL Category Images
 * Updates categories with missing images to use default fallback
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

async function fixCategoryImages() {
  console.log('🔧 Fixing NULL category images...\n');

  try {
    // Show what will be fixed
    const toFix = await sql`
      SELECT id, name, slug, image
      FROM categories
      WHERE image IS NULL OR TRIM(image) = '';
    `;

    if (toFix.length === 0) {
      console.log('✅ No categories need fixing!');
      return;
    }

    console.log(`Found ${toFix.length} categories to fix:\n`);
    toFix.forEach(cat => {
      console.log(`   - ${cat.name} (${cat.slug})`);
      console.log(`     Current: ${cat.image === null ? 'NULL' : `'${cat.image}'`}`);
    });
    console.log('');

    // Apply fix - use different images per category for variety
    const categoryImages = {
      'technology': '/images/post-images/category-image-01.jpg',
      'design': '/images/post-images/category-image-02.jpg',
      'development': '/images/post-images/category-image-03.jpg',
      'business': '/images/post-images/category-image-04.jpg',
      'lifestyle': '/images/post-images/category-image-01.jpg',
    };

    const updates = [];
    for (const cat of toFix) {
      const image = categoryImages[cat.slug] || '/images/post-images/category-image-01.jpg';
      const result = await sql`
        UPDATE categories
        SET image = ${image}
        WHERE id = ${cat.id}
        RETURNING id, name, slug, image;
      `;
      updates.push(result[0]);
    }

    console.log(`✅ Fixed ${updates.length} categories!\n`);
    console.log('Updated categories:');
    updates.forEach(cat => {
      console.log(`   - ${cat.name} (${cat.slug})`);
      console.log(`     New image: '${cat.image}'`);
    });
    console.log('');

    console.log('🎉 All done! Run health check to verify:');
    console.log('   npm run db:health');
  } catch (error) {
    console.error('❌ Fix failed:', error.message);
    process.exit(1);
  }
}

fixCategoryImages();
