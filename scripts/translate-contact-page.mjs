#!/usr/bin/env node

import translate from '@iamtraction/google-translate';

const strings = {
  // Metadata
  metadataTitle: "Contact Us - SkillLinkup",
  metadataDescription: "Get in touch with SkillLinkup. We're here to help with platform questions, partnerships, and feedback.",

  // Hero
  heroTitle: "Get in Touch",
  heroSubtitle: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",

  // Contact Info
  contactInfoHeading: "Contact Information",
  email: "Email",
  responseTime: "Response Time",
  responseTimeText: "We typically respond within 24 hours",
  support: "Support",
  supportHours: "Monday - Friday, 9am - 5pm EST",

  // FAQ
  faqHeading: "Looking for quick answers?",
  faqText: "Check out our frequently asked questions for instant help.",
  faqButton: "Visit FAQ",

  // Form
  formHeading: "Send us a Message",
  nameLabel: "Your Name *",
  namePlaceholder: "John Doe",
  emailLabel: "Email Address *",
  emailPlaceholder: "john@example.com",
  subjectLabel: "Subject *",
  selectSubject: "Select a subject",
  subjectGeneral: "General Inquiry",
  subjectPlatform: "Platform Question",
  subjectReview: "Review Request",
  subjectPartnership: "Partnership",
  subjectFeedback: "Feedback",
  subjectOther: "Other",
  messageLabel: "Message *",
  messagePlaceholder: "Tell us how we can help you...",
  sendButton: "Send Message",
  sending: "Sending...",
  successMessage: "Thanks for reaching out! We'll get back to you within 24 hours."
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
  console.log('🌍 Google Translate Contact Page (EN → NL)');
  console.log('==========================================\n');

  const translations = {};

  for (const [key, text] of Object.entries(strings)) {
    const translation = await translateString(text, key);
    translations[key] = translation;
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n✅ Translation Complete!');
  console.log('\n📋 Dutch Translations:');
  console.log('======================\n');
  console.log(JSON.stringify(translations, null, 2));
}

main().catch(console.error);
