#!/usr/bin/env node

/**
 * Google Translate Tools Page EN → NL
 *
 * Translates all 25 hardcoded English strings on the tools page to Dutch
 * Uses FREE @iamtraction/google-translate package (no API key needed!)
 *
 * Usage: node scripts/translate-tools-page.mjs
 */

import translate from '@iamtraction/google-translate';

const strings = {
  // Metadata (2 strings)
  pageTitle: "Freelance Tools & Resources | SkillLinkup",
  pageDescription: "Discover useful tools and calculators for freelancers. Calculate your rates, track your time and more.",

  // Hero Section (3 strings)
  heroTitle: "Freelance Tools & Resources",
  heroSubtitle: "Useful tools and calculators to help you run your freelance business more efficiently.",

  // Tools Section (4 strings)
  toolsSectionTitle: "Free Freelance Tools",
  toolsSectionDescription: "Use our tools to calculate your rates, track your time and organize your business.",
  startToolButton: "Start tool →",
  comingSoonBadge: "Coming soon",

  // Empty States (2 strings)
  noToolsFound: "No tools found. Check back soon!",
  noResourcesFound: "No resources found. Check back soon!",

  // Resources Section (2 strings)
  resourcesSectionTitle: "Downloads & Resources",
  resourcesSectionDescription: "Useful templates and guides to help you get started.",

  // CTA Section (6 strings)
  ctaTitle: "Don't miss new tools!",
  ctaDescription: "We're constantly working on new tools to make your freelance life easier. Sign up for updates.",
  guidesButton: "Read our guides",
  updatesButton: "Stay updated",

  // Hardcoded Tool Data (6 strings)
  timeTrackerName: "Time Tracker",
  timeTrackerDescription: "Track your billable hours and generate reports for your clients",

  rateCalculatorName: "Rate Calculator",
  rateCalculatorDescription: "Calculate your ideal hourly rate based on your costs and goals",

  invoiceGeneratorName: "Invoice Generator",
  invoiceGeneratorDescription: "Create professional invoices with real-time preview, save, print and download as PDF",
};

async function translateString(text, key) {
  try {
    console.log(`Translating ${key}...`);
    const result = await translate(text, { from: 'en', to: 'nl' });
    console.log(`  ✓ ${result.text}`);
    return result.text;
  } catch (error) {
    console.error(`  ✗ Error translating ${key}:`, error.message);
    return text; // Return original on error
  }
}

async function main() {
  console.log('🌍 Google Translate Tools Page (EN → NL)');
  console.log('=========================================\n');

  const translations = {};

  for (const [key, text] of Object.entries(strings)) {
    const translation = await translateString(text, key);
    translations[key] = translation;

    // Rate limiting: wait 500ms between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n✅ Translation Complete!');
  console.log('\n📋 Dutch Translations:');
  console.log('======================\n');
  console.log(JSON.stringify(translations, null, 2));

  console.log('\n📝 Next steps:');
  console.log('1. Add these translations to messages/nl.json under "toolsPage"');
  console.log('2. Add English originals to messages/en.json under "toolsPage"');
  console.log('3. Update app/[locale]/tools/page.tsx to use getTranslations()');
  console.log('4. Run: npm run build');
}

main().catch(console.error);
