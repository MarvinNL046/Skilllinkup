#!/usr/bin/env node

/**
 * Platform Translation Script
 *
 * Creates Dutch versions of all English platform records.
 * Translates English content to Dutch using basic word replacement.
 *
 * Usage: node scripts/translate-platforms.mjs
 */

import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL || '';

if (!connectionString) {
  console.error('❌ DATABASE_URL or NETLIFY_DATABASE_URL not found in environment');
  process.exit(1);
}

const sql = neon(connectionString);

/**
 * Basic translation dictionary for common English phrases
 * Translates from English to Dutch
 */
const translations = {
  // Common English to Dutch
  'Freelance platform for': 'Freelance platform voor',
  'The platform for': 'Het platform voor',
  'A platform for': 'Een platform voor',
  'designers': 'ontwerpers',
  'developers': 'ontwikkelaars',
  'writers': 'schrijvers',
  'translators': 'vertalers',
  'graphic designers': 'grafisch ontwerpers',
  'web developers': 'webontwikkelaars',
  'Dutch': 'Nederlandse',
  'European': 'Europese',
  'international': 'internationale',
  'best': 'beste',
  'affordable': 'goedkope',
  'reliable': 'betrouwbare',
  'Find': 'Vind',
  'Compare': 'Vergelijk',
  'Review': 'Beoordeling',
  'Rating': 'Waardering',
  'Easy': 'Gemakkelijk',
  'Medium': 'Gemiddeld',
  'Hard': 'Moeilijk',
  'Low': 'Laag',
  'High': 'Hoog',
  'Free': 'Gratis',
  'Paid': 'Betaald',
  'Commission': 'Commissie',
  'Percentage': 'Percentage',
  'Fixed': 'Vast',
};

/**
 * Simple text translation using word replacement
 * @param {string} text - Text to translate
 * @returns {string} Translated text
 */
function translateText(text) {
  if (!text) return text;

  let translated = text;

  // Apply translations
  for (const [dutch, english] of Object.entries(translations)) {
    const regex = new RegExp(dutch, 'gi');
    translated = translated.replace(regex, english);
  }

  return translated;
}

/**
 * Main translation function
 */
async function translatePlatforms() {
  console.log('🌍 Starting platform translation from English to Dutch...\n');

  try {
    // 1. Fetch all English platforms
    const englishPlatforms = await sql`
      SELECT * FROM platforms
      WHERE locale = 'en'
      ORDER BY name
    `;

    console.log(`📋 Found ${englishPlatforms.length} English platforms to translate\n`);

    if (englishPlatforms.length === 0) {
      console.log('✅ No English platforms found. Nothing to translate.');
      return;
    }

    let created = 0;
    let skipped = 0;
    let errors = 0;

    // 2. For each platform, create Dutch version
    for (const platform of englishPlatforms) {
      try {
        // Check if Dutch version already exists
        const existing = await sql`
          SELECT id FROM platforms
          WHERE slug = ${platform.slug} AND locale = 'nl'
        `;

        if (existing.length > 0) {
          console.log(`⏭️  ${platform.name} - Dutch version already exists`);
          skipped++;
          continue;
        }

        // Translate text fields (keep brand names)
        const dutchName = platform.name; // Keep brand names
        const dutchDescription = translateText(platform.description);
        const dutchMetaTitle = translateText(platform.meta_title);
        const dutchMetaDescription = translateText(platform.meta_description);

        // Convert JSONB/Array fields to JSON strings for insertion
        const prosJson = platform.pros ? JSON.stringify(platform.pros) : null;
        const consJson = platform.cons ? JSON.stringify(platform.cons) : null;
        const featuresJson = platform.features ? JSON.stringify(platform.features) : null;
        const uniqueBenefitsArray = platform.unique_benefits || null;
        const countriesArray = platform.countries || null;

        // Insert Dutch version using raw SQL to handle JSONB properly
        await sql`
          INSERT INTO platforms (
            owner_id, name, slug, description, locale,
            logo_url, website_url, affiliate_link,
            rating, category, fees, difficulty, color,
            featured, pros, cons, features,
            meta_title, meta_description,
            status, published_at,
            commission_type, commission_value, cookie_duration,
            avg_affiliate_earnings, unique_benefits,
            automation_status, work_type, countries,
            created_at, updated_at
          ) VALUES (
            ${platform.owner_id},
            ${dutchName},
            ${platform.slug},
            ${dutchDescription},
            'nl',
            ${platform.logo_url},
            ${platform.website_url},
            ${platform.affiliate_link},
            ${platform.rating},
            ${platform.category},
            ${platform.fees},
            ${platform.difficulty},
            ${platform.color},
            ${platform.featured},
            ${prosJson}::jsonb,
            ${consJson}::jsonb,
            ${featuresJson}::jsonb,
            ${dutchMetaTitle},
            ${dutchMetaDescription},
            ${platform.status},
            ${platform.published_at},
            ${platform.commission_type},
            ${platform.commission_value},
            ${platform.cookie_duration},
            ${platform.avg_affiliate_earnings},
            ${uniqueBenefitsArray},
            ${platform.automation_status},
            ${platform.work_type},
            ${countriesArray},
            NOW(),
            NOW()
          )
        `;

        console.log(`✅ ${platform.name} - Created Dutch version`);
        created++;

      } catch (error) {
        console.error(`❌ ${platform.name} - Failed: ${error.message}`);
        errors++;
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 Translation Summary:');
    console.log('='.repeat(60));
    console.log(`✅ Created:  ${created} Dutch platforms`);
    console.log(`⏭️  Skipped:  ${skipped} (already exist)`);
    console.log(`❌ Errors:   ${errors}`);
    console.log('='.repeat(60));

    if (errors === 0) {
      console.log('\n🎉 Translation completed successfully!');
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
translatePlatforms()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  });
