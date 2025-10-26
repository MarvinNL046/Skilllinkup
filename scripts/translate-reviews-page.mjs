#!/usr/bin/env node

/**
 * FREE Google Translate Script - Reviews Page
 * Translates Reviews page strings from English to Dutch
 * Uses @iamtraction/google-translate (FREE, no API key needed!)
 *
 * Usage: node scripts/translate-reviews-page.mjs
 */

import translate from '@iamtraction/google-translate';

// Rate limiting: 500ms between requests
const RATE_LIMIT_MS = 500;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const reviewsData = {
  metadata: {
    title: "Platform Reviews - SkillLinkup",
    description: "Read authentic reviews from freelancers about their experiences on various platforms."
  },
  hero: {
    title: "Platform Reviews",
    descriptionTemplate: "Read {count}+ authentic reviews from freelancers around the world"
  },
  stats: {
    totalReviews: "Total Reviews",
    avgRating: "Avg Rating",
    verified: "Verified"
  },
  emptyState: {
    title: "No reviews yet",
    description: "Be the first to share your experience!"
  },
  reviewCard: {
    pros: "Pros",
    cons: "Cons",
    yearsExperience: "y exp"
  },
  cta: {
    heading: "Share Your Experience",
    description: "Help other freelancers by sharing your honest review of the platforms you've used",
    browseButton: "Browse Platforms"
  }
};

async function translateText(text, from = 'en', to = 'nl') {
  try {
    await sleep(RATE_LIMIT_MS);
    const result = await translate(text, { from, to });
    return result.text;
  } catch (error) {
    console.error(`Translation error for "${text}":`, error.message);
    return text; // Fallback to original
  }
}

async function translateObject(obj, path = '') {
  const translated = {};

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      console.log(`📁 Translating section: ${currentPath}`);
      translated[key] = await translateObject(value, currentPath);
    } else if (typeof value === 'string') {
      console.log(`🔄 Translating: ${currentPath}`);
      const translatedText = await translateText(value);
      console.log(`   EN: ${value}`);
      console.log(`   NL: ${translatedText}\n`);
      translated[key] = translatedText;
    } else {
      translated[key] = value;
    }
  }

  return translated;
}

async function main() {
  console.log('🚀 Starting Reviews Page Translation (EN → NL)');
  console.log('📦 Using FREE Google Translate (no API key needed!)\n');

  const translatedData = await translateObject(reviewsData);

  console.log('\n✅ Translation Complete!');
  console.log('\n📋 Copy this to messages/nl.json under "reviewsPage":');
  console.log('─'.repeat(60));
  console.log(JSON.stringify({ reviewsPage: translatedData }, null, 2));
  console.log('─'.repeat(60));
}

main().catch(console.error);
