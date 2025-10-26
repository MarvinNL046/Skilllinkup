#!/usr/bin/env node

/**
 * FAQ Page Translation Script
 * Translates all FAQ content from English to Dutch using FREE Google Translate API
 * No API key required! Uses @iamtraction/google-translate package
 */

import translate from '@iamtraction/google-translate';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Delay function for rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Translation function with retry logic
async function translateText(text, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await translate(text, { from: 'en', to: 'nl' });
      return result.text;
    } catch (error) {
      console.error(`Translation attempt ${i + 1} failed:`, error.message);
      if (i < retries - 1) {
        await delay(1000 * (i + 1)); // Exponential backoff
      }
    }
  }
  return text; // Return original if all retries fail
}

// FAQ data structure (all English content from the component)
const faqData = {
  metadata: {
    title: "Frequently Asked Questions | SkillLinkup",
    description: "Find answers to common questions about SkillLinkup, platform reviews, and freelancing success."
  },

  breadcrumb: {
    home: "Home",
    faq: "FAQ"
  },

  hero: {
    title: "Frequently Asked Questions",
    subtitle: "Find answers to common questions about SkillLinkup, platform reviews, and freelancing success."
  },

  search: {
    placeholder: "Search questions...",
    noResults: "No questions found matching your search."
  },

  filters: {
    allQuestions: "All Questions"
  },

  categories: {
    gettingStarted: {
      title: "Getting Started",
      items: [
        {
          question: "What is SkillLinkup and how does it work?",
          answer: "SkillLinkup is a comprehensive platform that helps freelancers discover and compare the best freelance platforms. We provide detailed reviews, comparisons, and insights to help you find the platform that best matches your skills and goals."
        },
        {
          question: "Is SkillLinkup free to use?",
          answer: "Yes! SkillLinkup is completely free to use. You can read all our reviews, comparisons, and use our tools without any subscription or payment required."
        },
        {
          question: "How do I find the right platform for me?",
          answer: "Start by browsing our platform reviews filtered by your skills or industry. Read our detailed comparisons, check the pros and cons, and use our tools like the Rate Calculator to understand your potential earnings on each platform."
        }
      ]
    },

    platformReviews: {
      title: "Platform Reviews",
      items: [
        {
          question: "How are platform reviews created?",
          answer: "Our reviews are based on extensive research, real user experiences, official platform data, and hands-on testing. We evaluate factors like fees, payment methods, client quality, approval process, and user satisfaction."
        },
        {
          question: "How often are reviews updated?",
          answer: "We update our reviews regularly, especially when platforms make significant changes to their fees, features, or terms of service. Major reviews are updated at least quarterly."
        },
        {
          question: "Are your reviews biased?",
          answer: "No. We maintain complete independence from the platforms we review. Our reviews are based on factual data and real user feedback, not sponsored content or affiliate relationships that might influence our opinions."
        },
        {
          question: "Can I suggest a platform to review?",
          answer: "Absolutely! We're always looking to expand our coverage. Contact us with your suggestion and we'll add it to our review queue."
        }
      ]
    },

    accountTools: {
      title: "Account & Tools",
      items: [
        {
          question: "Do I need an account to use SkillLinkup?",
          answer: "No account is required to read reviews and use our basic tools. However, creating a free account allows you to save your favorite platforms, bookmark articles, and access personalized recommendations."
        },
        {
          question: "What tools do you offer?",
          answer: "We offer several free tools including a Rate Calculator (to determine your hourly rate), comparison tools, and resource guides. More tools are being added regularly based on user feedback."
        },
        {
          question: "How does the Rate Calculator work?",
          answer: "Our Rate Calculator helps you determine your ideal hourly, daily, and project rates. Input your desired annual income, expected working hours, business expenses, and tax rate. The calculator will show you what you need to charge to meet your financial goals."
        }
      ]
    },

    platformSelection: {
      title: "Platform Selection",
      items: [
        {
          question: "Can I work on multiple platforms at once?",
          answer: "Yes! Many successful freelancers work on multiple platforms simultaneously to diversify their income and access different types of clients. Just make sure to check each platform's terms of service for any exclusivity requirements."
        },
        {
          question: "Which platform is best for beginners?",
          answer: "Platforms like Fiverr and Upwork are often recommended for beginners due to their large client base and lower barriers to entry. However, the \"best\" platform depends on your specific skills, industry, and career goals."
        },
        {
          question: "What are platform fees and how do they work?",
          answer: "Platform fees are percentages that freelance platforms deduct from your earnings. They typically range from 5% to 20%. Some platforms use tiered systems where fees decrease as you earn more with a client."
        }
      ]
    },

    paymentsEarnings: {
      title: "Payments & Earnings",
      items: [
        {
          question: "How do payment methods differ between platforms?",
          answer: "Payment methods vary by platform. Common options include PayPal, direct bank transfer, Payoneer, and wire transfer. Processing times can range from instant to 14 days depending on the platform and payment method."
        },
        {
          question: "What is a realistic income for freelancers?",
          answer: "Freelance income varies widely based on skills, experience, platform choice, and time invested. Beginners might earn $15-30/hour while experienced specialists can charge $75-200+/hour. Use our Rate Calculator to set realistic income goals."
        }
      ]
    },

    supportCommunity: {
      title: "Support & Community",
      items: [
        {
          question: "How can I contact SkillLinkup?",
          answer: "You can reach us through our contact form, email us directly, or connect with us on social media. We typically respond within 24-48 hours."
        },
        {
          question: "Do you offer freelancing advice or coaching?",
          answer: "While we don't offer one-on-one coaching, our blog contains extensive guides, tips, and strategies for freelance success. We also send weekly tips via our newsletter."
        },
        {
          question: "Can I contribute content to SkillLinkup?",
          answer: "We welcome guest contributions from experienced freelancers! If you have insights or experiences to share, please reach out through our contact page with your proposal."
        }
      ]
    }
  },

  stillHaveQuestions: {
    title: "Still Have Questions?",
    description: "Can't find the answer you're looking for? Our support team is here to help.",
    contactSupport: "Contact Support",
    browseGuides: "Browse Guides"
  },

  popularResources: {
    title: "Popular Resources",
    platformReviews: {
      title: "Platform Reviews",
      description: "Read detailed reviews of 25+ freelance platforms"
    },
    rateCalculator: {
      title: "Rate Calculator",
      description: "Calculate your ideal hourly and project rates"
    },
    newsletter: {
      title: "Newsletter",
      description: "Get weekly tips and insights delivered to your inbox"
    }
  }
};

// Translate FAQ data
async function translateFAQData() {
  console.log('Starting FAQ translation (EN → NL)...\n');

  const translated = {
    metadata: {
      title: await translateText(faqData.metadata.title),
      description: await translateText(faqData.metadata.description)
    },

    breadcrumb: {
      home: await translateText(faqData.breadcrumb.home),
      faq: await translateText(faqData.breadcrumb.faq)
    },

    hero: {
      title: await translateText(faqData.hero.title),
      subtitle: await translateText(faqData.hero.subtitle)
    },

    search: {
      placeholder: await translateText(faqData.search.placeholder),
      noResults: await translateText(faqData.search.noResults)
    },

    filters: {
      allQuestions: await translateText(faqData.filters.allQuestions)
    },

    categories: {},

    stillHaveQuestions: {},
    popularResources: {}
  };

  console.log('✓ Translated metadata, breadcrumb, hero, search, filters');
  await delay(500);

  // Translate categories with Q&A items
  for (const [categoryKey, categoryData] of Object.entries(faqData.categories)) {
    console.log(`\nTranslating category: ${categoryData.title}...`);

    translated.categories[categoryKey] = {
      title: await translateText(categoryData.title),
      items: []
    };

    await delay(500);

    for (let i = 0; i < categoryData.items.length; i++) {
      const item = categoryData.items[i];
      console.log(`  - Translating Q&A ${i + 1}/${categoryData.items.length}...`);

      const translatedItem = {
        question: await translateText(item.question),
        answer: await translateText(item.answer)
      };

      translated.categories[categoryKey].items.push(translatedItem);
      await delay(500); // Rate limiting
    }

    console.log(`✓ Completed ${categoryData.title} (${categoryData.items.length} items)`);
  }

  // Translate "Still Have Questions" section
  console.log('\nTranslating "Still Have Questions" section...');
  translated.stillHaveQuestions = {
    title: await translateText(faqData.stillHaveQuestions.title),
    description: await translateText(faqData.stillHaveQuestions.description),
    contactSupport: await translateText(faqData.stillHaveQuestions.contactSupport),
    browseGuides: await translateText(faqData.stillHaveQuestions.browseGuides)
  };
  await delay(500);
  console.log('✓ Completed "Still Have Questions"');

  // Translate "Popular Resources" section
  console.log('\nTranslating "Popular Resources" section...');
  translated.popularResources = {
    title: await translateText(faqData.popularResources.title),
    platformReviews: {
      title: await translateText(faqData.popularResources.platformReviews.title),
      description: await translateText(faqData.popularResources.platformReviews.description)
    },
    rateCalculator: {
      title: await translateText(faqData.popularResources.rateCalculator.title),
      description: await translateText(faqData.popularResources.rateCalculator.description)
    },
    newsletter: {
      title: await translateText(faqData.popularResources.newsletter.title),
      description: await translateText(faqData.popularResources.newsletter.description)
    }
  };
  await delay(500);
  console.log('✓ Completed "Popular Resources"');

  return translated;
}

// Main execution
async function main() {
  try {
    // Translate all FAQ content
    const translatedFAQ = await translateFAQData();

    // Save translated data to JSON file for manual review
    const outputPath = path.join(__dirname, 'faq-translations-nl.json');
    fs.writeFileSync(outputPath, JSON.stringify(translatedFAQ, null, 2), 'utf-8');

    console.log('\n===========================================');
    console.log('✓ Translation completed successfully!');
    console.log('===========================================\n');
    console.log('Translated data saved to:', outputPath);
    console.log('\nNext steps:');
    console.log('1. Review the translated content in faq-translations-nl.json');
    console.log('2. Manually add "faqPage" section to messages/en.json (English)');
    console.log('3. Manually add "faqPage" section to messages/nl.json (Dutch)');
    console.log('4. Update app/[locale]/faq/page.tsx with useTranslations()');

  } catch (error) {
    console.error('\n❌ Translation failed:', error);
    process.exit(1);
  }
}

main();
