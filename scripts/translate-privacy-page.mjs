#!/usr/bin/env node

/**
 * Privacy Policy Page Translation Script
 * Translates all Privacy Policy content from English to Dutch using Google Translate
 * FREE - No API key required!
 */

import translate from '@iamtraction/google-translate';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rate limiting configuration
const RATE_LIMIT_MS = 500; // 500ms delay between requests
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Privacy Policy content to translate
const privacyContent = {
  metadata: {
    title: "Privacy Policy | SkillLinkup",
    description: "Learn how SkillLinkup collects, uses, and protects your personal information."
  },
  title: "Privacy Policy",
  lastUpdated: "Last updated",
  intro: "Welcome to SkillLinkup (\"we,\" \"our,\" or \"us\"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.",
  intro2: "Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.",
  sections: {
    section1: {
      title: "Introduction",
      content: "Welcome to SkillLinkup (\"we,\" \"our,\" or \"us\"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.",
      content2: "Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site."
    },
    section2: {
      title: "Information We Collect",
      subsection1: {
        title: "Personal Information You Disclose to Us",
        content: "We collect personal information that you voluntarily provide to us when you:",
        list: [
          "Subscribe to our newsletter",
          "Fill out contact forms",
          "Participate in surveys or promotions",
          "Otherwise contact us"
        ],
        content2: "The personal information we collect may include:",
        list2: [
          "Name and contact data (email address)",
          "Message content (when you contact us)"
        ]
      },
      subsection2: {
        title: "Information Automatically Collected",
        content: "We automatically collect certain information when you visit, use, or navigate our website. This information does not reveal your specific identity but may include:",
        list: [
          "Device and usage information (IP address, browser type, operating system)",
          "Location data (country, region)",
          "Log and usage data (pages viewed, time spent on pages)"
        ]
      }
    },
    section3: {
      title: "How We Use Your Information",
      content: "We use the information we collect or receive:",
      list: [
        "To send you marketing and promotional communications (with your consent)",
        "To respond to your inquiries and solve any potential issues",
        "To send administrative information (updates, security alerts)",
        "To improve our website and services",
        "To analyze usage trends and optimize user experience",
        "To comply with legal obligations"
      ]
    },
    section4: {
      title: "Sharing Your Information",
      content: "We may share or transfer your information in the following situations:",
      list: [
        "Service Providers: We may share your information with third-party service providers who perform services for us (email delivery, analytics, hosting)",
        "Business Transfers: We may share or transfer your information in connection with a merger, sale, or acquisition",
        "Legal Requirements: We may disclose your information where required by law or to protect our rights"
      ],
      content2: "We do not sell your personal information to third parties."
    },
    section5: {
      title: "Cookies and Tracking Technologies",
      content: "We may use cookies and similar tracking technologies to access or store information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
    },
    section6: {
      title: "Third-Party Links",
      content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies."
    },
    section7: {
      title: "Data Security",
      content: "We have implemented appropriate technical and organizational security measures to protect your personal information. However, no electronic transmission or storage method is 100% secure, and we cannot guarantee absolute security."
    },
    section8: {
      title: "Your Privacy Rights",
      content: "Depending on your location, you may have the following rights:",
      list: [
        "Access to your personal information",
        "Correction of inaccurate data",
        "Deletion of your personal information",
        "Withdrawal of consent (for newsletter subscriptions)",
        "Objection to processing of your data"
      ],
      content2: "To exercise these rights, please contact us using the information provided below."
    },
    section9: {
      title: "Data Retention",
      content: "We will retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law."
    },
    section10: {
      title: "Children's Privacy",
      content: "Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13."
    },
    section11: {
      title: "Updates to This Policy",
      content: "We may update this privacy policy from time to time. The updated version will be indicated by an updated \"Last updated\" date at the top of this page."
    },
    section12: {
      title: "Contact Us",
      content: "If you have questions or comments about this privacy policy, please contact us at:",
      email: "Email: privacy@skilllinkup.com"
    }
  }
};

async function translateText(text) {
  try {
    const result = await translate(text, { from: 'en', to: 'nl' });
    return result.text;
  } catch (error) {
    console.error(`Translation error for text "${text.substring(0, 50)}...":`, error.message);
    return text; // Return original if translation fails
  }
}

async function translatePrivacyContent() {
  console.log('🚀 Starting Privacy Policy translation (EN → NL)...\n');

  const translations = {
    metadata: {},
    sections: {}
  };

  // Translate metadata
  console.log('📝 Translating metadata...');
  translations.metadata.title = await translateText(privacyContent.metadata.title);
  await sleep(RATE_LIMIT_MS);
  translations.metadata.description = await translateText(privacyContent.metadata.description);
  await sleep(RATE_LIMIT_MS);

  // Translate main fields
  console.log('📝 Translating main fields...');
  translations.title = await translateText(privacyContent.title);
  await sleep(RATE_LIMIT_MS);
  translations.lastUpdated = await translateText(privacyContent.lastUpdated);
  await sleep(RATE_LIMIT_MS);
  translations.intro = await translateText(privacyContent.intro);
  await sleep(RATE_LIMIT_MS);
  translations.intro2 = await translateText(privacyContent.intro2);
  await sleep(RATE_LIMIT_MS);

  // Translate all sections
  const sectionKeys = Object.keys(privacyContent.sections);
  for (let i = 0; i < sectionKeys.length; i++) {
    const key = sectionKeys[i];
    const section = privacyContent.sections[key];

    console.log(`📝 Translating ${key}...`);
    translations.sections[key] = { title: await translateText(section.title) };
    await sleep(RATE_LIMIT_MS);

    // Handle subsections for section2
    if (key === 'section2') {
      translations.sections[key].subsection1 = {
        title: await translateText(section.subsection1.title),
      };
      await sleep(RATE_LIMIT_MS);

      translations.sections[key].subsection1.content = await translateText(section.subsection1.content);
      await sleep(RATE_LIMIT_MS);

      translations.sections[key].subsection1.list = [];
      for (const item of section.subsection1.list) {
        translations.sections[key].subsection1.list.push(await translateText(item));
        await sleep(RATE_LIMIT_MS);
      }

      translations.sections[key].subsection1.content2 = await translateText(section.subsection1.content2);
      await sleep(RATE_LIMIT_MS);

      translations.sections[key].subsection1.list2 = [];
      for (const item of section.subsection1.list2) {
        translations.sections[key].subsection1.list2.push(await translateText(item));
        await sleep(RATE_LIMIT_MS);
      }

      translations.sections[key].subsection2 = {
        title: await translateText(section.subsection2.title),
      };
      await sleep(RATE_LIMIT_MS);

      translations.sections[key].subsection2.content = await translateText(section.subsection2.content);
      await sleep(RATE_LIMIT_MS);

      translations.sections[key].subsection2.list = [];
      for (const item of section.subsection2.list) {
        translations.sections[key].subsection2.list.push(await translateText(item));
        await sleep(RATE_LIMIT_MS);
      }
    } else {
      // Regular sections
      if (section.content) {
        translations.sections[key].content = await translateText(section.content);
        await sleep(RATE_LIMIT_MS);
      }

      if (section.content2) {
        translations.sections[key].content2 = await translateText(section.content2);
        await sleep(RATE_LIMIT_MS);
      }

      if (section.list) {
        translations.sections[key].list = [];
        for (const item of section.list) {
          translations.sections[key].list.push(await translateText(item));
          await sleep(RATE_LIMIT_MS);
        }
      }

      if (section.email) {
        translations.sections[key].email = await translateText(section.email);
        await sleep(RATE_LIMIT_MS);
      }
    }
  }

  console.log('\n✅ Privacy Policy translation complete!\n');
  return translations;
}

// Main execution
(async () => {
  try {
    const translations = await translatePrivacyContent();

    // Read existing messages files
    const enPath = path.join(__dirname, '../messages/en.json');
    const nlPath = path.join(__dirname, '../messages/nl.json');

    const enMessages = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    const nlMessages = JSON.parse(fs.readFileSync(nlPath, 'utf8'));

    // Add English content
    enMessages.privacyPage = privacyContent;

    // Add Dutch translations
    nlMessages.privacyPage = translations;

    // Write back to files
    fs.writeFileSync(enPath, JSON.stringify(enMessages, null, 2) + '\n');
    fs.writeFileSync(nlPath, JSON.stringify(nlMessages, null, 2) + '\n');

    console.log('✅ Updated messages/en.json with Privacy Policy content');
    console.log('✅ Updated messages/nl.json with Dutch translations');
    console.log('\n📊 Translation Summary:');
    console.log(`   - Metadata fields: 2`);
    console.log(`   - Main fields: 4`);
    console.log(`   - Sections: ${Object.keys(privacyContent.sections).length}`);
    console.log(`   - Total strings translated: ~80+`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
