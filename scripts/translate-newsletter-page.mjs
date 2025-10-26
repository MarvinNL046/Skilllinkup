#!/usr/bin/env node

/**
 * Newsletter Page Translation Script (FREE Google Translate)
 * Translates all Newsletter page strings from English to Dutch
 * Uses @iamtraction/google-translate - 100% FREE, no API key needed!
 *
 * Total strings to translate: 51
 */

import translate from '@iamtraction/google-translate';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// All Newsletter page strings to translate
const newsletterStrings = {
  metadata: {
    title: "Newsletter - SkillLinkup",
    description: "Subscribe to weekly freelance insights, platform reviews, and expert tips. Join 12K+ freelancers growing their business."
  },
  breadcrumb: {
    home: "Home",
    newsletter: "Newsletter"
  },
  hero: {
    title: "Get Freelance Insights Delivered Weekly",
    subtitle: "Join thousands of freelancers who receive exclusive tips, platform reviews, and actionable advice to grow their business."
  },
  form: {
    heading: "Subscribe to Our Newsletter",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    submitButton: "Subscribe Now",
    submittingButton: "Subscribing...",
    terms: "By subscribing, you agree to receive our weekly newsletter. Unsubscribe anytime with one click.",
    privacyNotice: "We respect your privacy.",
    privacyDetails: "Your email will never be shared, and you can unsubscribe at any time."
  },
  success: {
    heading: "You're all set!",
    instruction: "Check your inbox for a welcome email. Don't forget to check your spam folder!",
    resetButton: "Subscribe another email"
  },
  errorMessage: "An error occurred. Please try again later.",
  benefits: {
    heading: "What You'll Get",
    weeklyReviews: {
      title: "Weekly Platform Reviews",
      description: "In-depth analysis of freelance platforms, comparing features, fees, and opportunities to help you choose the best fit."
    },
    expertTips: {
      title: "Expert Freelancing Tips",
      description: "Practical advice on pricing, client management, productivity, and building a sustainable freelance business."
    },
    exclusiveInsights: {
      title: "Exclusive Insights",
      description: "Access to tools, templates, and resources not available on our website. Subscriber-only content and early access to new features."
    },
    successStories: {
      title: "Success Stories",
      description: "Learn from other freelancers who've built successful careers. Real strategies and lessons from the field."
    }
  },
  stats: {
    subscribersCount: "12K+",
    subscribersLabel: "Subscribers",
    satisfactionCount: "98%",
    satisfactionLabel: "Satisfaction",
    weeksCount: "52",
    weeksLabel: "Weeks/Year"
  },
  testimonials: {
    heading: "What Subscribers Say",
    testimonial1: {
      quote: "The weekly newsletter has been invaluable for finding the right platforms and staying up-to-date with freelancing trends.",
      name: "Sarah K.",
      role: "Graphic Designer"
    },
    testimonial2: {
      quote: "I increased my rates by 30% after reading the pricing guides. The actionable advice is worth its weight in gold!",
      name: "Michael R.",
      role: "Web Developer"
    },
    testimonial3: {
      quote: "Best freelance newsletter I've subscribed to. Concise, relevant, and always delivers value. Highly recommended!",
      name: "Emma L.",
      role: "Content Writer"
    }
  },
  faq: {
    heading: "Frequently Asked Questions",
    frequency: {
      question: "How often will I receive emails?",
      answer: "We send one email per week, typically on Monday mornings. No spam, no daily bombardment - just valuable weekly insights."
    },
    unsubscribe: {
      question: "Can I unsubscribe anytime?",
      answer: "Absolutely! Every email includes an unsubscribe link. One click and you're off the list - no questions asked."
    },
    privacy: {
      question: "Is my email shared with third parties?",
      answer: "Never. We respect your privacy and will never sell, rent, or share your email address with anyone."
    },
    welcome: {
      question: "What if I don't see the welcome email?",
      answer: "Check your spam or promotions folder. If you still can't find it, contact us and we'll help you get set up."
    }
  }
};

async function translateString(text, from = 'en', to = 'nl') {
  try {
    await delay(500); // Rate limiting
    const result = await translate(text, { from, to });
    return result.text;
  } catch (error) {
    console.error(`Failed to translate: "${text.substring(0, 50)}..." - ${error.message}`);
    return text; // Fallback to original
  }
}

async function translateObject(obj, path = '') {
  const translated = {};

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;

    if (typeof value === 'string') {
      console.log(`Translating: ${currentPath}`);
      translated[key] = await translateString(value);
      console.log(`  EN: ${value}`);
      console.log(`  NL: ${translated[key]}\n`);
    } else if (typeof value === 'object' && value !== null) {
      translated[key] = await translateObject(value, currentPath);
    } else {
      translated[key] = value;
    }
  }

  return translated;
}

async function main() {
  console.log('='.repeat(80));
  console.log('Newsletter Page Translation (FREE Google Translate)');
  console.log('Translating 51 strings from English to Dutch');
  console.log('='.repeat(80));
  console.log();

  const startTime = Date.now();

  const dutchTranslations = await translateObject(newsletterStrings);

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log('='.repeat(80));
  console.log('Translation Complete!');
  console.log(`Duration: ${duration} seconds`);
  console.log('='.repeat(80));
  console.log();
  console.log('Dutch Translation Output:');
  console.log(JSON.stringify({ newsletterPage: dutchTranslations }, null, 2));
  console.log();
  console.log('='.repeat(80));
  console.log('Next Steps:');
  console.log('1. Copy the Dutch translation above');
  console.log('2. Add to messages/nl.json as "newsletterPage" section');
  console.log('3. Add the English version to messages/en.json');
  console.log('4. Update app/[locale]/newsletter/page.tsx to use translations');
  console.log('='.repeat(80));
}

main().catch(console.error);
