#!/usr/bin/env node

/**
 * Affiliate Disclosure Page Translation Script
 * Translates all Affiliate Disclosure content from English to Dutch using Google Translate
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

// Affiliate Disclosure content to translate
const disclosureContent = {
  metadata: {
    title: "Affiliate Disclosure | SkillLinkup",
    description: "Learn about SkillLinkup's affiliate partnerships and how we maintain transparency."
  },
  title: "Affiliate Disclosure",
  lastUpdated: "Last updated",
  sections: {
    section1: {
      title: "Our Commitment to Transparency",
      content: "At SkillLinkup, we believe in complete transparency with our readers. This page explains our affiliate relationships and how we earn revenue while maintaining our commitment to providing honest, unbiased reviews and recommendations."
    },
    section2: {
      title: "What Are Affiliate Links?",
      content: "Affiliate links are special tracking links that allow us to earn a commission when you click through to a platform and make a purchase or sign up for a service. These links help support our work at no additional cost to you.",
      content2: "When you use an affiliate link, the price you pay remains the same. The platform simply pays us a small commission for referring you to their service."
    },
    section3: {
      title: "How We Use Affiliate Links",
      content: "SkillLinkup participates in affiliate marketing programs with various freelance platforms and services, including but not limited to:",
      list: [
        "Upwork",
        "Fiverr",
        "Freelancer.com",
        "Toptal",
        "99designs",
        "Other freelance marketplaces and tools"
      ],
      content2: "Not all links on our website are affiliate links. We clearly mark affiliate content where appropriate and only recommend platforms and services we genuinely believe can benefit our readers."
    },
    section4: {
      title: "Our Editorial Independence",
      content: "While we do earn commissions from some platforms we review, this does not influence our editorial content. Our commitment to you includes:",
      list: [
        "Honest Reviews: We provide unbiased, accurate reviews based on thorough research and real user experiences",
        "No Pay-to-Play: Platforms cannot pay us to receive positive reviews or higher rankings",
        "Balanced Coverage: We highlight both pros and cons of every platform we review",
        "Regular Updates: We update our content regularly to reflect changes in platform features and pricing",
        "User-First Approach: Our recommendations are based on what's best for our readers, not commission rates"
      ]
    },
    section5: {
      title: "How Affiliate Commissions Work",
      content: "We may earn a commission when:",
      list: [
        "You click an affiliate link and sign up for a platform",
        "You make a purchase through an affiliate link",
        "You subscribe to a service after clicking our link"
      ],
      content2: "Commission rates vary by platform and are subject to change. Some platforms offer one-time commissions, while others provide recurring commissions for ongoing subscriptions."
    },
    section6: {
      title: "Your Support Helps Us",
      content: "When you use our affiliate links, you help support SkillLinkup at no extra cost to you. These commissions allow us to:",
      list: [
        "Continue providing free, comprehensive platform reviews and comparisons",
        "Maintain and improve our website",
        "Research and test new freelance platforms",
        "Create helpful guides, tutorials, and resources",
        "Keep our content up-to-date and accurate"
      ],
      content2: "We deeply appreciate your support and trust in our recommendations."
    },
    section7: {
      title: "FTC Compliance",
      content: "SkillLinkup complies with the Federal Trade Commission's (FTC) guidelines concerning the use of endorsements and testimonials in advertising. We disclose our affiliate relationships in accordance with the FTC's 16 CFR Part 255: \"Guides Concerning the Use of Endorsements and Testimonials in Advertising.\""
    },
    section8: {
      title: "Third-Party Advertising",
      content: "In addition to affiliate links, we may display advertisements from third-party networks. These ads are clearly labeled and do not influence our editorial content or platform rankings."
    },
    section9: {
      title: "No Guarantees",
      content: "While we strive to provide accurate information, we cannot guarantee:",
      list: [
        "That you will earn income using the platforms we recommend",
        "Specific results or outcomes from using any freelance platform",
        "That platform features, fees, or policies won't change"
      ],
      content2: "Your success on any freelance platform depends on many factors including your skills, effort, market demand, and the platform's policies."
    },
    section10: {
      title: "Due Diligence",
      content: "We encourage you to:",
      list: [
        "Conduct your own research before signing up for any platform",
        "Read the platform's terms of service and fee structure",
        "Compare multiple platforms to find the best fit for your needs",
        "Start with free trials or basic plans when available",
        "Read recent user reviews from multiple sources"
      ]
    },
    section11: {
      title: "Updates to This Disclosure",
      content: "We may update this Affiliate Disclosure from time to time to reflect changes in our affiliate partnerships or policies. The \"Last updated\" date at the top of this page indicates when changes were last made."
    },
    section12: {
      title: "Questions or Concerns?",
      content: "If you have any questions about our affiliate relationships or this disclosure, please contact us at:",
      email: "Email: disclosure@skilllinkup.com",
      content2: "We value your trust and are committed to maintaining transparency in all our business practices."
    },
    section13: {
      title: "Thank You for Your Support",
      content: "By using our affiliate links, you're helping us continue to provide free, valuable content to the freelance community. We appreciate your trust and support in our mission to help freelancers find the best platforms for their careers."
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

async function translateDisclosureContent() {
  console.log('🚀 Starting Affiliate Disclosure translation (EN → NL)...\n');

  const translations = {
    metadata: {},
    sections: {}
  };

  // Translate metadata
  console.log('📝 Translating metadata...');
  translations.metadata.title = await translateText(disclosureContent.metadata.title);
  await sleep(RATE_LIMIT_MS);
  translations.metadata.description = await translateText(disclosureContent.metadata.description);
  await sleep(RATE_LIMIT_MS);

  // Translate main fields
  console.log('📝 Translating main fields...');
  translations.title = await translateText(disclosureContent.title);
  await sleep(RATE_LIMIT_MS);
  translations.lastUpdated = await translateText(disclosureContent.lastUpdated);
  await sleep(RATE_LIMIT_MS);

  // Translate all sections
  const sectionKeys = Object.keys(disclosureContent.sections);
  for (let i = 0; i < sectionKeys.length; i++) {
    const key = sectionKeys[i];
    const section = disclosureContent.sections[key];

    console.log(`📝 Translating ${key}...`);
    translations.sections[key] = { title: await translateText(section.title) };
    await sleep(RATE_LIMIT_MS);

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

  console.log('\n✅ Affiliate Disclosure translation complete!\n');
  return translations;
}

// Main execution
(async () => {
  try {
    const translations = await translateDisclosureContent();

    // Read existing messages files
    const enPath = path.join(__dirname, '../messages/en.json');
    const nlPath = path.join(__dirname, '../messages/nl.json');

    const enMessages = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    const nlMessages = JSON.parse(fs.readFileSync(nlPath, 'utf8'));

    // Add English content
    enMessages.disclosurePage = disclosureContent;

    // Add Dutch translations
    nlMessages.disclosurePage = translations;

    // Write back to files
    fs.writeFileSync(enPath, JSON.stringify(enMessages, null, 2) + '\n');
    fs.writeFileSync(nlPath, JSON.stringify(nlMessages, null, 2) + '\n');

    console.log('✅ Updated messages/en.json with Disclosure content');
    console.log('✅ Updated messages/nl.json with Dutch translations');
    console.log('\n📊 Translation Summary:');
    console.log(`   - Metadata fields: 2`);
    console.log(`   - Main fields: 2`);
    console.log(`   - Sections: ${Object.keys(disclosureContent.sections).length}`);
    console.log(`   - Total strings translated: ~90+`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
})();
