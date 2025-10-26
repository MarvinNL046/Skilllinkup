#!/usr/bin/env node

/**
 * Google Translate Blog Posts Translation Script
 *
 * Creates Dutch versions of all English blog posts using FREE Google Translate.
 * NO API KEY REQUIRED - uses Google Translate web interface
 *
 * Usage: node scripts/translate-posts-google.mjs
 *
 * 100% FREE - No creditcard, no API key, no limits
 */

import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import translate from '@iamtraction/google-translate';

const connectionString = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL || '';

if (!connectionString) {
  console.error('❌ DATABASE_URL or NETLIFY_DATABASE_URL not found in environment');
  process.exit(1);
}

const sql = neon(connectionString);

/**
 * Translate text using FREE Google Translate (no API key needed)
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code (default: 'nl')
 * @returns {Promise<string>} Translated text
 */
async function translateWithGoogle(text, targetLang = 'nl') {
  if (!text || text.trim() === '') {
    return text;
  }

  try {
    const result = await translate(text, {
      from: 'en',
      to: targetLang
    });

    return result.text;
  } catch (error) {
    console.error(`⚠️  Translation failed: ${error.message}`);
    return text; // Return original text on error
  }
}

/**
 * Translate array of strings (for tags)
 */
async function translateArray(items) {
  if (!items || !Array.isArray(items)) return items;

  const translated = [];
  for (const item of items) {
    if (typeof item === 'string') {
      const translatedItem = await translateWithGoogle(item);
      translated.push(translatedItem);
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } else {
      translated.push(item);
    }
  }

  return translated;
}

/**
 * Main translation function
 */
async function translatePosts() {
  console.log('🌍 Starting FREE Google Translate from English to Dutch...');
  console.log('💚 No API key needed - 100% FREE!\n');

  try {
    // Fetch all English blog posts
    const englishPosts = await sql`
      SELECT * FROM posts
      WHERE locale = 'en'
      ORDER BY created_at DESC
    `;

    console.log(`📋 Found ${englishPosts.length} English blog posts to translate\n`);

    if (englishPosts.length === 0) {
      console.log('✅ No English blog posts found. Nothing to translate.');
      return;
    }

    let created = 0;
    let skipped = 0;
    let errors = 0;

    // For each post, create Dutch version
    for (const post of englishPosts) {
      try {
        // Check if Dutch version already exists
        const existing = await sql`
          SELECT id FROM posts
          WHERE slug = ${post.slug} AND locale = 'nl'
        `;

        if (existing.length > 0) {
          console.log(`⏭️  ${post.title} - Dutch version already exists`);
          skipped++;
          continue;
        }

        console.log(`🔄 Translating "${post.title}"...`);

        // Translate main text fields
        const dutchTitle = await translateWithGoogle(post.title);
        await new Promise(resolve => setTimeout(resolve, 200));

        const dutchExcerpt = await translateWithGoogle(post.excerpt);
        await new Promise(resolve => setTimeout(resolve, 200));

        console.log(`   📄 Translating content (HTML)...`);
        const dutchContent = await translateWithGoogle(post.content);
        await new Promise(resolve => setTimeout(resolve, 300)); // Longer delay for large content

        // Translate SEO fields
        const dutchMetaTitle = await translateWithGoogle(post.meta_title);
        await new Promise(resolve => setTimeout(resolve, 200));

        const dutchMetaDescription = await translateWithGoogle(post.meta_description);
        await new Promise(resolve => setTimeout(resolve, 200));

        // Translate tags array
        console.log(`   🏷️  Translating tags...`);
        const dutchTags = await translateArray(post.tags);

        // Convert tags to JSON string for insertion
        const tagsJson = dutchTags ? JSON.stringify(dutchTags) : null;

        // Insert Dutch version with all fields
        await sql`
          INSERT INTO posts (
            tenant_id, title, slug, excerpt, content,
            feature_img, post_format,
            author_id, author_name, category_id,
            meta_title, meta_description, tags,
            ad_image, ad_link,
            status, published_at, scheduled_for,
            views, read_time, featured, sticky,
            locale,
            created_at, updated_at
          ) VALUES (
            ${post.tenant_id},
            ${dutchTitle},
            ${post.slug},
            ${dutchExcerpt},
            ${dutchContent},
            ${post.feature_img},
            ${post.post_format},
            ${post.author_id},
            ${post.author_name},
            ${post.category_id},
            ${dutchMetaTitle},
            ${dutchMetaDescription},
            ${tagsJson}::jsonb,
            ${post.ad_image},
            ${post.ad_link},
            ${post.status},
            ${post.published_at},
            ${post.scheduled_for},
            ${post.views},
            ${post.read_time},
            ${post.featured},
            ${post.sticky},
            'nl',
            NOW(),
            NOW()
          )
        `;

        console.log(`✅ "${post.title}" - Created Dutch version\n`);
        created++;

        // Longer delay between posts to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        console.error(`❌ "${post.title}" - Failed: ${error.message}`);
        errors++;
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Translation Summary:');
    console.log('='.repeat(60));
    console.log(`✅ Created:  ${created} Dutch blog posts`);
    console.log(`⏭️  Skipped:  ${skipped} (already exist)`);
    console.log(`❌ Errors:   ${errors}`);
    console.log(`💚 Cost:     €0.00 (100% FREE!)`);
    console.log('='.repeat(60));

    if (errors === 0) {
      console.log('\n🎉 Translation completed successfully!');
      console.log('💡 Pro tip: Google Translate is FREE but slower than paid APIs');
      console.log('🌐 Visit /nl/blog to see your translated posts!');
    } else {
      console.log('\n⚠️  Translation completed with errors. Please review.');
    }

  } catch (error) {
    console.error('\n❌ Translation failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the translation
translatePosts()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  });
