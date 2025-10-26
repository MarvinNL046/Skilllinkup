#!/usr/bin/env node

/**
 * Fix Locale Data Script
 *
 * Updates existing database records from 'nl' to 'en' locale.
 * This is needed because the content was always in English, but was incorrectly
 * marked as Dutch (nl) in the database.
 *
 * Usage: node scripts/fix-locale-to-english.mjs
 */

import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL || '';

if (!connectionString) {
  console.error('❌ DATABASE_URL or NETLIFY_DATABASE_URL not found in environment');
  process.exit(1);
}

const sql = neon(connectionString);

async function fixLocales() {
  console.log('🔧 Fixing locale data - setting existing content to English...\n');

  try {
    // Update platforms: nl -> en (existing content is English)
    const platforms = await sql`
      UPDATE platforms
      SET locale = 'en'
      WHERE locale = 'nl'
      RETURNING name
    `;
    console.log(`✅ Updated ${platforms.length} platforms to English (en)`);

    // Update posts: nl -> en
    const posts = await sql`
      UPDATE posts
      SET locale = 'en'
      WHERE locale = 'nl'
      RETURNING title
    `;
    console.log(`✅ Updated ${posts.length} posts to English (en)`);

    // Update categories: nl -> en
    const categories = await sql`
      UPDATE categories
      SET locale = 'en'
      WHERE locale = 'nl'
      RETURNING name
    `;
    console.log(`✅ Updated ${categories.length} categories to English (en)`);

    console.log('\n🎉 Locale fix complete! All content now marked as English.');
    console.log('📝 Next step: Run translate-platforms.mjs to create Dutch versions');

  } catch (error) {
    console.error('\n❌ Failed to fix locales:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

fixLocales()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  });
