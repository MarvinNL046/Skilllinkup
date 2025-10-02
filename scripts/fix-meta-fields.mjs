#!/usr/bin/env node

/**
 * Fix Missing SEO Meta Fields
 * Auto-generates meta_title and meta_description from post title/excerpt
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

async function fixMetaFields() {
  console.log('🔧 Fixing missing SEO meta fields...\n');

  try {
    // Show what will be fixed
    const toFix = await sql`
      SELECT id, slug, title, excerpt, meta_title, meta_description
      FROM posts
      WHERE meta_title IS NULL OR TRIM(meta_title) = ''
         OR meta_description IS NULL OR TRIM(meta_description) = '';
    `;

    if (toFix.length === 0) {
      console.log('✅ No posts need fixing!');
      return;
    }

    console.log(`Found ${toFix.length} posts to fix:\n`);
    toFix.forEach(post => {
      console.log(`   - "${post.title}"`);
      if (!post.meta_title || post.meta_title.trim() === '') {
        console.log(`     ❌ meta_title: ${post.meta_title === null ? 'NULL' : 'EMPTY'}`);
      }
      if (!post.meta_description || post.meta_description.trim() === '') {
        console.log(`     ❌ meta_description: ${post.meta_description === null ? 'NULL' : 'EMPTY'}`);
      }
    });
    console.log('');

    // Fix meta_title (use post title + " - SkillLinkup")
    const fixedTitles = await sql`
      UPDATE posts
      SET meta_title = CONCAT(title, ' - SkillLinkup')
      WHERE meta_title IS NULL OR TRIM(meta_title) = ''
      RETURNING id, slug, title, meta_title;
    `;

    console.log(`✅ Fixed ${fixedTitles.length} meta_title fields!\n`);

    // Fix meta_description (use excerpt, or truncated title if no excerpt)
    const fixedDescriptions = await sql`
      UPDATE posts
      SET meta_description = CASE
        WHEN excerpt IS NOT NULL AND TRIM(excerpt) != ''
          THEN LEFT(excerpt, 160)
        ELSE LEFT(CONCAT('Learn about ', LOWER(title), ' at SkillLinkup. Expert insights and practical tips.'), 160)
      END
      WHERE meta_description IS NULL OR TRIM(meta_description) = ''
      RETURNING id, slug, title, meta_description;
    `;

    console.log(`✅ Fixed ${fixedDescriptions.length} meta_description fields!\n`);

    // Show results
    console.log('Updated posts:');
    const updated = await sql`
      SELECT id, slug, title, meta_title, meta_description
      FROM posts
      WHERE id = ANY(${fixedTitles.map(p => p.id)});
    `;

    updated.forEach(post => {
      console.log(`\n   📝 "${post.title}"`);
      console.log(`      meta_title: "${post.meta_title}"`);
      console.log(`      meta_description: "${post.meta_description}"`);
    });
    console.log('');

    console.log('🎉 All done! Run health check to verify:');
    console.log('   npm run db:health');
  } catch (error) {
    console.error('❌ Fix failed:', error.message);
    process.exit(1);
  }
}

fixMetaFields();
