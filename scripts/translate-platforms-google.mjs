#!/usr/bin/env node

/**
 * Google Translate Platform Translation Script
 *
 * Creates Dutch versions of all English platform records using FREE Google Translate.
 * NO API KEY REQUIRED - uses Google Translate web interface
 *
 * Usage: node scripts/translate-platforms-google.mjs
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
 * Translate array of strings
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
async function translatePlatforms() {
  console.log('🌍 Starting FREE Google Translate from English to Dutch...');
  console.log('💚 No API key needed - 100% FREE!\n');

  try {
    // Fetch all English platforms
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

    // For each platform, create Dutch version
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

        console.log(`🔄 Translating ${platform.name}...`);

        // Translate text fields (keep brand names)
        const dutchName = platform.name; // Keep brand names unchanged

        // Translate description
        const dutchDescription = await translateWithGoogle(platform.description);
        await new Promise(resolve => setTimeout(resolve, 200)); // Rate limit protection

        // Translate meta tags
        const dutchMetaTitle = await translateWithGoogle(platform.meta_title);
        await new Promise(resolve => setTimeout(resolve, 200));

        const dutchMetaDescription = await translateWithGoogle(platform.meta_description);
        await new Promise(resolve => setTimeout(resolve, 200));

        // Translate arrays
        console.log(`   📝 Translating pros, cons, features...`);
        const dutchPros = await translateArray(platform.pros);
        const dutchCons = await translateArray(platform.cons);
        const dutchFeatures = await translateArray(platform.features);

        // Convert to JSON strings for insertion
        const prosJson = dutchPros ? JSON.stringify(dutchPros) : null;
        const consJson = dutchCons ? JSON.stringify(dutchCons) : null;
        const featuresJson = dutchFeatures ? JSON.stringify(dutchFeatures) : null;
        const uniqueBenefitsArray = platform.unique_benefits || null;
        const countriesArray = platform.countries || null;

        // Insert Dutch version
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

        console.log(`✅ ${platform.name} - Created Dutch version\n`);
        created++;

        // Longer delay between platforms to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));

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
    console.log(`💚 Cost:     €0.00 (100% FREE!)`);
    console.log('='.repeat(60));

    if (errors === 0) {
      console.log('\n🎉 Translation completed successfully!');
      console.log('💡 Pro tip: Google Translate is FREE but slower than paid APIs');
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
