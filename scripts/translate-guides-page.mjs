#!/usr/bin/env node

/**
 * Translate Guides Page strings from English to Dutch
 * Uses FREE Google Translate (@iamtraction/google-translate) - NO API KEY NEEDED!
 */

import translate from '@iamtraction/google-translate';

// Rate limiting helper
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function translateText(text, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await sleep(500); // Rate limiting
      const result = await translate(text, { from: 'en', to: 'nl' });
      return result.text;
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`Retry ${i + 1}/${retries} for: ${text.substring(0, 30)}...`);
      await sleep(1000 * (i + 1)); // Exponential backoff
    }
  }
}

async function translateGuidesPage() {
  console.log('Starting Guides Page translation (EN → NL)...\n');

  const translations = {
    guidesPage: {
      metadata: {
        title: await translateText("Freelance Guides | SkillLinkup"),
        description: await translateText("Discover our comprehensive guides and tutorials for freelancers. Learn everything about platforms, pricing, marketing and more.")
      },
      hero: {
        title: await translateText("Freelance Guides & Tutorials"),
        subtitle: await translateText("Comprehensive guides to help you succeed as a freelancer. From beginner tips to advanced strategies.")
      },
      categories: {
        gettingStarted: {
          title: await translateText("Getting Started"),
          description: await translateText("Start your freelance career with our beginner guides"),
          linkText: await translateText("Read more →")
        },
        pricingEarning: {
          title: await translateText("Pricing & Earning"),
          description: await translateText("Optimize your rates and earn more"),
          linkText: await translateText("Read more →")
        },
        growthMarketing: {
          title: await translateText("Growth & Marketing"),
          description: await translateText("Grow your business and find more clients"),
          linkText: await translateText("Read more →")
        }
      },
      featured: {
        sectionTitle: await translateText("Featured Guide"),
        readGuide: await translateText("Read guide"),
        minRead: await translateText("min read")
      },
      allGuides: {
        sectionTitle: await translateText("All Guides"),
        guidesAvailable: await translateText("guides available"),
        noGuidesTitle: await translateText("No guides found"),
        noGuidesDescription: await translateText("We are working on adding new guides. Check back soon!")
      },
      cta: {
        heading: await translateText("Don't miss any guide!"),
        description: await translateText("Subscribe to our newsletter and receive the latest guides, tips and tutorials directly in your inbox."),
        viewAllButton: await translateText("View All Posts"),
        subscribeButton: await translateText("Subscribe")
      },
      meta: {
        authorFallback: await translateText("SkillLinkup")
      }
    }
  };

  console.log('\n✅ Translation complete!\n');
  console.log('Copy this JSON structure to messages/nl.json:');
  console.log('=====================================\n');
  console.log(JSON.stringify(translations, null, 2));
  console.log('\n=====================================');
}

translateGuidesPage().catch(console.error);
