/**
 * Translation Script for Hardcoded English Text to Dutch
 *
 * This script uses Google Translate (FREE - no API key needed!) to translate
 * all hardcoded English strings in components to Dutch.
 *
 * Package: @iamtraction/google-translate
 * Cost: 100% FREE
 * Quality: Good quality translations
 */

import translate from '@iamtraction/google-translate';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Translation mappings for component-specific strings
const translations = {
  platformFilters: {
    // Search
    searchPlaceholder: { en: "Search platforms...", nl: "" },

    // Sidebar headings
    categories: { en: "Categories", nl: "" },
    difficulty: { en: "Difficulty", nl: "" },
    rating: { en: "Rating", nl: "" },
    workType: { en: "Work Type", nl: "" },
    country: { en: "Country", nl: "" },

    // Difficulty levels
    easy: { en: "Easy", nl: "" },
    medium: { en: "Medium", nl: "" },
    hard: { en: "Hard", nl: "" },

    // Rating labels
    rating45Plus: { en: "4.5+ Stars", nl: "" },
    rating40To44: { en: "4.0-4.4 Stars", nl: "" },
    rating35To39: { en: "3.5-3.9 Stars", nl: "" },

    // Work type options
    allWorkTypes: { en: "All Work Types", nl: "" },
    remoteOnly: { en: "Remote Only", nl: "" },
    localOnly: { en: "Local Only", nl: "" },
    hybrid: { en: "Hybrid", nl: "" },

    // Country options
    allCountries: { en: "All Countries", nl: "" },
    worldwide: { en: "Worldwide", nl: "" },
    netherlands: { en: "Netherlands", nl: "" },
    belgium: { en: "Belgium", nl: "" },
    germany: { en: "Germany", nl: "" },
    france: { en: "France", nl: "" },
    unitedStates: { en: "United States", nl: "" },

    // Results display
    showingCount: { en: "Showing {count} platform{plural}", nl: "" },
    showingCountSingular: { en: "Showing {count} platform", nl: "" },

    // Sort options
    sortByRating: { en: "Sort by: Rating", nl: "" },
    sortByName: { en: "Sort by: Name", nl: "" },
    sortByDifficulty: { en: "Sort by: Difficulty", nl: "" },

    // Empty state
    noPlatformsFound: { en: "No platforms found matching your filters.", nl: "" },
    clearAllFilters: { en: "Clear all filters", nl: "" },

    // Platform card labels
    categoryLabel: { en: "Category", nl: "" },
    feesLabel: { en: "Fees", nl: "" },
    difficultyLabel: { en: "Difficulty", nl: "" },
    readReview: { en: "Read Review", nl: "" },
  },

  commentSection: {
    // Header
    commentsTitle: { en: "Comments ({count})", nl: "" },
    joinConversation: { en: "Share your thoughts and join the conversation", nl: "" },

    // Form
    leaveComment: { en: "Leave a Comment", nl: "" },
    nameLabel: { en: "Name *", nl: "" },
    namePlaceholder: { en: "Your name", nl: "" },
    emailLabel: { en: "Email * (will not be published)", nl: "" },
    emailPlaceholder: { en: "your@email.com", nl: "" },
    commentLabel: { en: "Comment *", nl: "" },
    commentPlaceholder: { en: "Share your thoughts...", nl: "" },
    characterCount: { en: "{count}/5000 characters", nl: "" },

    // Submit button
    submitting: { en: "Submitting...", nl: "" },
    postComment: { en: "Post Comment", nl: "" },

    // Messages
    successMessage: { en: "Thank you! Your comment has been submitted and will appear after moderation.", nl: "" },
    errorMessage: { en: "Failed to submit comment. Please try again.", nl: "" },
    generalError: { en: "An error occurred. Please try again later.", nl: "" },

    // Empty state
    noComments: { en: "No comments yet", nl: "" },
    beTheFirst: { en: "Be the first to share your thoughts!", nl: "" },
  },

  theme: {
    switchToLight: { en: "Switch to light mode", nl: "" },
    switchToDark: { en: "Switch to dark mode", nl: "" },
  },
};

/**
 * Translate a single text using Google Translate
 */
async function translateText(text) {
  try {
    const result = await translate(text, { from: 'en', to: 'nl' });
    return result.text;
  } catch (error) {
    console.error(`Translation error for "${text}":`, error.message);
    return text; // Return original on error
  }
}

/**
 * Add delay to avoid rate limiting
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Translate all strings in the translations object
 */
async function translateAll() {
  console.log('🌍 Starting translation process (EN → NL)...\n');

  let totalTranslated = 0;
  let totalFailed = 0;

  for (const [namespace, strings] of Object.entries(translations)) {
    console.log(`📦 Translating namespace: ${namespace}`);

    for (const [key, value] of Object.entries(strings)) {
      if (value.nl === "") {
        try {
          console.log(`  ⏳ Translating: ${value.en}`);

          // Add delay to avoid rate limiting (Google Translate free tier)
          await delay(500);

          const translated = await translateText(value.en);
          translations[namespace][key].nl = translated;

          console.log(`  ✅ Result: ${translated}`);
          totalTranslated++;
        } catch (error) {
          console.error(`  ❌ Failed: ${value.en}`);
          totalFailed++;
        }
      }
    }

    console.log(''); // Empty line between namespaces
  }

  console.log(`\n📊 Translation Summary:`);
  console.log(`   ✅ Successful: ${totalTranslated}`);
  console.log(`   ❌ Failed: ${totalFailed}`);
  console.log(`   📝 Total: ${totalTranslated + totalFailed}\n`);
}

/**
 * Update messages/en.json and messages/nl.json
 */
function updateMessageFiles() {
  console.log('📝 Updating message files...\n');

  const messagesDir = path.join(__dirname, '..', 'messages');
  const enPath = path.join(messagesDir, 'en.json');
  const nlPath = path.join(messagesDir, 'nl.json');

  // Read existing files
  const enMessages = JSON.parse(fs.readFileSync(enPath, 'utf-8'));
  const nlMessages = JSON.parse(fs.readFileSync(nlPath, 'utf-8'));

  // Add new translations
  for (const [namespace, strings] of Object.entries(translations)) {
    enMessages[namespace] = {};
    nlMessages[namespace] = {};

    for (const [key, value] of Object.entries(strings)) {
      enMessages[namespace][key] = value.en;
      nlMessages[namespace][key] = value.nl;
    }
  }

  // Write updated files
  fs.writeFileSync(enPath, JSON.stringify(enMessages, null, 2) + '\n', 'utf-8');
  fs.writeFileSync(nlPath, JSON.stringify(nlMessages, null, 2) + '\n', 'utf-8');

  console.log('✅ Updated messages/en.json');
  console.log('✅ Updated messages/nl.json\n');
}

/**
 * Main execution
 */
async function main() {
  console.log('╔═══════════════════════════════════════════════════════════════╗');
  console.log('║  Hardcoded Text Translation Script (EN → NL)                 ║');
  console.log('║  Using: @iamtraction/google-translate (FREE!)                ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  try {
    // Step 1: Translate all strings
    await translateAll();

    // Step 2: Update message files
    updateMessageFiles();

    console.log('✨ Translation complete!\n');
    console.log('Next steps:');
    console.log('1. Review translations in messages/nl.json');
    console.log('2. Update component files to use useTranslations()');
    console.log('3. Run: npm run build\n');

  } catch (error) {
    console.error('❌ Translation failed:', error);
    process.exit(1);
  }
}

main();
