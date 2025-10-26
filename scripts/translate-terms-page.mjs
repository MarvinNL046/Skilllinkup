#!/usr/bin/env node

/**
 * Terms of Service Page Translation Script
 * Translates all Terms of Service content from English to Dutch using Google Translate
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

// Terms of Service content to translate
const termsContent = {
  metadata: {
    title: "Terms of Service | SkillLinkup",
    description: "Terms and conditions for using SkillLinkup services."
  },
  title: "Terms of Service",
  lastUpdated: "Last updated",
  sections: {
    section1: {
      title: "Agreement to Terms",
      content: "By accessing or using SkillLinkup (\"the Website\"), you agree to be bound by these Terms of Service (\"Terms\"). If you do not agree to these Terms, please do not use the Website.",
      content2: "We reserve the right to modify these Terms at any time. Your continued use of the Website following any changes indicates your acceptance of the new Terms."
    },
    section2: {
      title: "Use of the Website",
      subsection: {
        title: "Permitted Use",
        content: "You may use the Website for lawful purposes only. You agree not to:",
        list: [
          "Use the Website in any way that violates applicable laws or regulations",
          "Attempt to gain unauthorized access to any portion of the Website",
          "Interfere with or disrupt the Website or servers",
          "Upload or transmit viruses or malicious code",
          "Collect or harvest any information from the Website using automated means",
          "Use the Website for any commercial purposes without our consent"
        ]
      }
    },
    section3: {
      title: "Intellectual Property Rights",
      content: "The Website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are owned by SkillLinkup, its licensors, or other providers of such material.",
      content2: "You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any of the content without our express written permission."
    },
    section4: {
      title: "User-Generated Content",
      content: "If you submit any content to the Website (reviews, comments, feedback), you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content.",
      content2: "You represent that you own or have the necessary rights to submit the content and that it does not violate any third-party rights or applicable laws."
    },
    section5: {
      title: "Third-Party Links and Services",
      content: "The Website may contain links to third-party websites or services (freelance platforms, affiliate partners). We are not responsible for:",
      list: [
        "The content, privacy policies, or practices of third-party websites",
        "Any damages or losses caused by your use of third-party services",
        "The accuracy of information provided by third parties"
      ],
      content2: "Your use of third-party services is at your own risk and subject to their terms and conditions."
    },
    section6: {
      title: "Affiliate Relationships",
      content: "SkillLinkup participates in affiliate marketing programs. We may earn commissions from qualifying purchases made through links on our Website. See our",
      linkText: "Affiliate Disclosure",
      content2: "for more information."
    },
    section7: {
      title: "Disclaimer of Warranties",
      content: "THE WEBSITE IS PROVIDED ON AN \"AS IS\" AND \"AS AVAILABLE\" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.",
      content2: "We do not warrant that:",
      list: [
        "The Website will be uninterrupted or error-free",
        "Defects will be corrected",
        "The Website is free of viruses or harmful components",
        "The information provided is accurate, complete, or current"
      ]
    },
    section8: {
      title: "Limitation of Liability",
      content: "TO THE FULLEST EXTENT PERMITTED BY LAW, SKILLLINKUP SHALL NOT BE LIABLE FOR:",
      list: [
        "Any indirect, incidental, special, or consequential damages",
        "Loss of profits, data, or business opportunities",
        "Damages arising from your use of or inability to use the Website",
        "Reliance on any information obtained from the Website"
      ]
    },
    section9: {
      title: "Indemnification",
      content: "You agree to indemnify and hold harmless SkillLinkup and its affiliates from any claims, damages, losses, or expenses arising from:",
      list: [
        "Your use of the Website",
        "Your violation of these Terms",
        "Your violation of any third-party rights",
        "Your content submissions"
      ]
    },
    section10: {
      title: "Information Accuracy",
      content: "We strive to provide accurate and up-to-date information about freelance platforms. However:",
      list: [
        "Platform features, fees, and policies may change without notice",
        "We are not responsible for the accuracy of third-party information",
        "Reviews and comparisons reflect our opinions and research at the time of publication",
        "You should verify information directly with the platforms before making decisions"
      ]
    },
    section11: {
      title: "Termination",
      content: "We reserve the right to terminate or suspend your access to the Website at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties."
    },
    section12: {
      title: "Governing Law",
      content: "These Terms shall be governed by and construed in accordance with the laws of the Netherlands, without regard to its conflict of law provisions."
    },
    section13: {
      title: "Changes to Terms",
      content: "We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the Website after changes constitutes acceptance of the modified Terms."
    },
    section14: {
      title: "Contact Information",
      content: "If you have any questions about these Terms, please contact us at:",
      email: "Email: legal@skilllinkup.com"
    },
    section15: {
      title: "Severability",
      content: "If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that the Terms shall otherwise remain in full force and effect."
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

async function translateTermsContent() {
  console.log('🚀 Starting Terms of Service translation (EN → NL)...\n');

  const translations = {
    metadata: {},
    sections: {}
  };

  // Translate metadata
  console.log('📝 Translating metadata...');
  translations.metadata.title = await translateText(termsContent.metadata.title);
  await sleep(RATE_LIMIT_MS);
  translations.metadata.description = await translateText(termsContent.metadata.description);
  await sleep(RATE_LIMIT_MS);

  // Translate main fields
  console.log('📝 Translating main fields...');
  translations.title = await translateText(termsContent.title);
  await sleep(RATE_LIMIT_MS);
  translations.lastUpdated = await translateText(termsContent.lastUpdated);
  await sleep(RATE_LIMIT_MS);

  // Translate all sections
  const sectionKeys = Object.keys(termsContent.sections);
  for (let i = 0; i < sectionKeys.length; i++) {
    const key = sectionKeys[i];
    const section = termsContent.sections[key];

    console.log(`📝 Translating ${key}...`);
    translations.sections[key] = { title: await translateText(section.title) };
    await sleep(RATE_LIMIT_MS);

    // Handle subsection for section2
    if (key === 'section2' && section.subsection) {
      translations.sections[key].subsection = {
        title: await translateText(section.subsection.title),
      };
      await sleep(RATE_LIMIT_MS);

      translations.sections[key].subsection.content = await translateText(section.subsection.content);
      await sleep(RATE_LIMIT_MS);

      translations.sections[key].subsection.list = [];
      for (const item of section.subsection.list) {
        translations.sections[key].subsection.list.push(await translateText(item));
        await sleep(RATE_LIMIT_MS);
      }
    } else {
      // Regular content
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

      if (section.linkText) {
        translations.sections[key].linkText = await translateText(section.linkText);
        await sleep(RATE_LIMIT_MS);
      }

      if (section.email) {
        translations.sections[key].email = await translateText(section.email);
        await sleep(RATE_LIMIT_MS);
      }
    }
  }

  console.log('\n✅ Terms of Service translation complete!\n');
  return translations;
}

// Main execution
(async () => {
  try {
    const translations = await translateTermsContent();

    // Read existing messages files
    const enPath = path.join(__dirname, '../messages/en.json');
    const nlPath = path.join(__dirname, '../messages/nl.json');

    const enMessages = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    const nlMessages = JSON.parse(fs.readFileSync(nlPath, 'utf8'));

    // Add English content
    enMessages.termsPage = termsContent;

    // Add Dutch translations
    nlMessages.termsPage = translations;

    // Write back to files
    fs.writeFileSync(enPath, JSON.stringify(enMessages, null, 2) + '\n');
    fs.writeFileSync(nlPath, JSON.stringify(nlMessages, null, 2) + '\n');

    console.log('✅ Updated messages/en.json with Terms content');
    console.log('✅ Updated messages/nl.json with Dutch translations');
    console.log('\n📊 Translation Summary:');
    console.log(`   - Metadata fields: 2`);
    console.log(`   - Main fields: 2`);
    console.log(`   - Sections: ${Object.keys(termsContent.sections).length}`);
    console.log(`   - Total strings translated: ~100+`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
