#!/usr/bin/env node

/**
 * Google Translate About Page EN → NL
 *
 * Translates all 33 strings from About page to Dutch
 * Uses FREE @iamtraction/google-translate package
 *
 * Usage: node scripts/translate-about-page.mjs
 */

import translate from '@iamtraction/google-translate';

const strings = {
  // Metadata (2)
  metadataTitle: "About Us - SkillLinkup",
  metadataDescription: "Learn about SkillLinkup's mission to help freelancers find the perfect platform for their skills.",

  // Hero Section (2)
  heroTitle: "Helping Freelancers Find Their Perfect Platform",
  heroSubtitle: "We believe every freelancer deserves to work on a platform that matches their skills, experience level, and career goals. That's why we created SkillLinkup.",

  // Mission Section (5)
  missionTitle: "Our Mission",
  missionParagraph1: "The freelance economy is booming, with hundreds of platforms competing for your attention. Each platform has different fee structures, client types, and approval processes.",
  missionParagraph2: "SkillLinkup cuts through the noise with honest, data-driven reviews and comparisons. We help you make informed decisions so you can focus on what you do best: your work.",
  whatWeDoTitle: "What We Do",

  // What We Do List (4)
  whatWeDo1: "Review 25+ freelance platforms with real data",
  whatWeDo2: "Provide side-by-side platform comparisons",
  whatWeDo3: "Share expert tips and success strategies",
  whatWeDo4: "Keep you updated on platform changes",

  // Values Section (1)
  valuesTitle: "Our Values",

  // Value Cards (6)
  valueHonestTitle: "Honest Reviews",
  valueHonestDescription: "We provide unbiased, data-driven reviews with real pros and cons. No sugar-coating, just honest insights.",
  valueDataTitle: "Data-Driven",
  valueDataDescription: "Every review is backed by real data: fee structures, approval rates, average earnings, and user satisfaction.",
  valueCommunityTitle: "Community First",
  valueCommunityDescription: "We're built by freelancers, for freelancers. Your success is our success, and we're here to support your journey.",

  // Stats Section (4 labels, numbers stay the same)
  statsPlatformsLabel: "Platforms Reviewed",
  statsFreelancersLabel: "Freelancers Helped",
  statsRatingLabel: "Average Rating",
  statsUnbiasedLabel: "Unbiased Reviews",

  // Team Section (4)
  teamTitle: "Built by Freelancers, For Freelancers",
  teamDescription: "Our team consists of experienced freelancers who have worked across multiple platforms. We know the challenges you face because we've faced them ourselves.",
  ctaBrowse: "Browse Platforms",
  ctaContact: "Get in Touch",
};

async function translateString(text, key) {
  try {
    console.log(`Translating ${key}...`);
    const result = await translate(text, { from: 'en', to: 'nl' });
    console.log(`  ✓ ${result.text}`);
    return result.text;
  } catch (error) {
    console.error(`  ✗ Error translating ${key}:`, error.message);
    return text;
  }
}

async function main() {
  console.log('🌍 Google Translate About Page (EN → NL)');
  console.log('=========================================\n');
  console.log(`Total strings: ${Object.keys(strings).length}\n`);

  const translations = {};

  for (const [key, text] of Object.entries(strings)) {
    const translation = await translateString(text, key);
    translations[key] = translation;

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n✅ Translation Complete!');
  console.log('\n📋 Dutch Translations:');
  console.log('======================\n');
  console.log(JSON.stringify(translations, null, 2));

  console.log('\n📝 Next steps:');
  console.log('1. Add translations to messages/nl.json under "aboutPage"');
  console.log('2. Add English originals to messages/en.json under "aboutPage"');
  console.log('3. Convert About page to Client Component with useTranslations()');
  console.log('4. Run: npm run build');
}

main().catch(console.error);
