/**
 * Translation Script for Comparisons Page
 * FREE Google Translate (no API key required!)
 * Extracts all 22 strings from Comparisons page and generates Dutch translations
 */

import translate from '@iamtraction/google-translate';

const comparisonsData = {
  metadata: {
    title: "Platform Comparisons | SkillLinkup",
    description: "Compare the best freelance platforms and find the perfect platform for your skills."
  },
  hero: {
    title: "Compare Freelance Platforms",
    subtitle: "Find the perfect platform for your skills. Compare fees, specializations, and reviews."
  },
  table: {
    headers: {
      platform: "Platform",
      commission: "Commission",
      rating: "Rating",
      reviews: "Reviews",
      specialization: "Specialization",
      action: "Action"
    },
    emptyState: "No platforms available for comparison yet.",
    reviewsLabel: "reviews",
    emptyCategory: "-",
    viewButton: "View",
    visitButton: "Visit →"
  },
  stats: {
    totalPlatforms: "Total Platforms",
    averageCommission: "Average Commission",
    averageRating: "Average Rating"
  },
  cta: {
    heading: "Not sure which platform is right for you?",
    description: "Read our comprehensive reviews and platform analyses to find the perfect platform for your skills.",
    viewAllButton: "View All Platforms",
    readReviewsButton: "Read Reviews"
  }
};

// Flatten object to get all translatable strings
function flattenObject(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey));
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

// Unflatten object back to nested structure
function unflattenObject(flatObj) {
  const result = {};
  for (const [key, value] of Object.entries(flatObj)) {
    const keys = key.split('.');
    let current = result;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
  }
  return result;
}

async function translateComparisonsPage() {
  console.log('🚀 Starting Comparisons Page Translation (FREE Google Translate)\n');
  console.log('📊 Total strings to translate: 22\n');

  const flatData = flattenObject(comparisonsData);
  const translatedFlat = {};
  let successCount = 0;
  let errorCount = 0;

  for (const [key, value] of Object.entries(flatData)) {
    try {
      console.log(`Translating: ${key}`);
      console.log(`  EN: "${value}"`);

      const result = await translate(value, { from: 'en', to: 'nl' });
      translatedFlat[key] = result.text;

      console.log(`  NL: "${result.text}"`);
      console.log('  ✅ Success\n');

      successCount++;

      // Rate limiting: 500ms delay between requests
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.error(`  ❌ Error: ${error.message}\n`);
      translatedFlat[key] = value; // Fallback to English
      errorCount++;
    }
  }

  const translatedData = unflattenObject(translatedFlat);

  console.log('\n' + '='.repeat(60));
  console.log('📈 TRANSLATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successful: ${successCount}/22`);
  console.log(`❌ Failed: ${errorCount}/22`);
  console.log(`📊 Success Rate: ${((successCount / 22) * 100).toFixed(1)}%`);
  console.log('='.repeat(60) + '\n');

  console.log('📋 TRANSLATED DATA (Dutch):');
  console.log(JSON.stringify(translatedData, null, 2));

  return translatedData;
}

// Run the translation
translateComparisonsPage().catch(console.error);
