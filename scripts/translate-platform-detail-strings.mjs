#!/usr/bin/env node

/**
 * Script to translate platform detail page strings from English to Dutch
 * Uses Google Translate (FREE - no API key needed!)
 */

import translate from '@iamtraction/google-translate';

const stringsToTranslate = {
  difficulty: 'Difficulty',
  fees: 'Fees',
  visitWebsite: 'Visit Website',
  keyFeatures: 'Key Features',
  prosAndCons: 'Pros & Cons',
  pros: 'Pros',
  cons: 'Cons',
  readyToGetStarted: 'Ready to get started with {name}?',
  joinThousands: 'Join thousands of freelancers already using this platform to grow their business.',
  quickInfo: 'Quick Info',
  category: 'Category',
  feeStructure: 'Fee Structure',
  difficultyLevel: 'Difficulty Level',
  rating: 'Rating',
  visitPlatform: 'Visit Platform',
  comparePlatforms: 'Compare Platforms',
  notSure: 'Not sure if {name} is right for you? Compare with other platforms.',
  viewAllPlatforms: 'View All Platforms',
  similar: 'Similar {category} Platforms',
  home: 'Home'
};

async function translateStrings() {
  console.log('🌍 Translating platform detail page strings (EN → NL)...\n');

  const translations = {};
  let successCount = 0;
  let errorCount = 0;

  for (const [key, englishText] of Object.entries(stringsToTranslate)) {
    try {
      console.log(`📝 Translating: "${englishText}"`);

      const result = await translate(englishText, { from: 'en', to: 'nl' });
      translations[key] = result.text;

      console.log(`✅ Translated: "${result.text}"\n`);
      successCount++;

      // Rate limiting - wait 100ms between requests
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      console.error(`❌ Failed to translate "${englishText}": ${error.message}\n`);
      translations[key] = englishText; // Fallback to English
      errorCount++;
    }
  }

  console.log('\n📊 Translation Summary:');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log('\n📋 Dutch Translations:');
  console.log(JSON.stringify(translations, null, 2));

  return translations;
}

// Run the translation
translateStrings().catch(console.error);
