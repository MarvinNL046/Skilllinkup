/**
 * Email Preview Script
 *
 * Run with: npm run email:preview
 *
 * This will generate HTML files in the /email-previews folder
 * that you can open in your browser to preview the emails.
 *
 * Generates previews for both EN and NL locales.
 */

import { render } from '@react-email/render';
import { WelcomeEmail } from '../emails/welcome';
import { NewsletterEmail } from '../emails/newsletter';
import type { Locale } from '../emails/translations';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const OUTPUT_DIR = join(process.cwd(), 'email-previews');

const locales: Locale[] = ['en', 'nl'];

async function generatePreviews() {
  console.log('📧 Generating email previews...\n');

  // Create output directory if it doesn't exist
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const locale of locales) {
    console.log(`\n🌍 Generating ${locale.toUpperCase()} emails...`);

    // Generate Welcome Email
    console.log(`   1️⃣ Welcome Email (${locale})...`);
    const welcomeHtml = await render(WelcomeEmail({
      email: 'test@example.com',
      locale,
    }));
    writeFileSync(join(OUTPUT_DIR, `welcome-${locale}.html`), welcomeHtml);
    console.log(`      ✅ Saved to email-previews/welcome-${locale}.html`);

    // Generate Newsletter Email with sample content
    console.log(`   2️⃣ Newsletter Email (${locale})...`);

    const sampleArticles = locale === 'nl' ? [
      {
        title: 'De 10 Beste Remote Work Tools voor 2025',
        excerpt: 'Van project management tot communicatie - deze tools maken remote werken een stuk makkelijker.',
        imageUrl: 'https://skilllinkup.com/images/posts/remote-tools.jpg',
        url: 'https://skilllinkup.com/nl/blog/remote-work-tools',
        category: 'Tools',
      },
      {
        title: 'Zo Onderhandel Je Over Je Tarief',
        excerpt: 'Praktische tips om met vertrouwen te onderhandelen en de waarde te krijgen die je verdient.',
        imageUrl: 'https://skilllinkup.com/images/posts/negotiation.jpg',
        url: 'https://skilllinkup.com/nl/blog/tarief-onderhandelen',
        category: 'Groei',
      },
      {
        title: 'Case Study: Van 0 naar 100K met Freelancen',
        excerpt: 'Hoe Lisa in 2 jaar een bloeiend freelance bedrijf opbouwde.',
        imageUrl: 'https://skilllinkup.com/images/posts/success-story.jpg',
        url: 'https://skilllinkup.com/nl/blog/succes-verhaal-lisa',
        category: 'Inspiratie',
      },
    ] : [
      {
        title: 'The 10 Best Remote Work Tools for 2025',
        excerpt: 'From project management to communication - these tools make remote work so much easier.',
        imageUrl: 'https://skilllinkup.com/images/posts/remote-tools.jpg',
        url: 'https://skilllinkup.com/en/blog/remote-work-tools',
        category: 'Tools',
      },
      {
        title: 'How to Negotiate Your Rate',
        excerpt: 'Practical tips to negotiate with confidence and get the value you deserve.',
        imageUrl: 'https://skilllinkup.com/images/posts/negotiation.jpg',
        url: 'https://skilllinkup.com/en/blog/rate-negotiation',
        category: 'Growth',
      },
      {
        title: 'Case Study: From 0 to 100K Freelancing',
        excerpt: 'How Lisa built a thriving freelance business in just 2 years.',
        imageUrl: 'https://skilllinkup.com/images/posts/success-story.jpg',
        url: 'https://skilllinkup.com/en/blog/success-story-lisa',
        category: 'Inspiration',
      },
    ];

    const sampleFeaturedPlatform = locale === 'nl' ? {
      name: 'Malt',
      description: 'Het Europese platform voor IT en marketing professionals',
      rating: '4.6/5',
      url: 'https://skilllinkup.com/nl/platforms/malt',
    } : {
      name: 'Malt',
      description: 'The European platform for IT and marketing professionals',
      rating: '4.6/5',
      url: 'https://skilllinkup.com/en/platforms/malt',
    };

    const sampleTip = locale === 'nl' ? {
      title: 'Tip van de Week',
      content: 'Stuur altijd een kort bedankje na elk project, ook als het niet perfect verliep. Dit bouwt relaties op en leidt vaak tot herhaalopdrachten of referrals.',
    } : {
      title: 'Tip of the Week',
      content: 'Always send a short thank you after every project, even if it didn\'t go perfectly. This builds relationships and often leads to repeat work or referrals.',
    };

    const newsletterHtml = await render(NewsletterEmail({
      locale,
      heroTitle: `SkillLinkup Weekly #42`,
      articles: sampleArticles,
      featuredPlatform: sampleFeaturedPlatform,
      tipOfTheWeek: sampleTip,
      subscriberEmail: 'test@example.com',
    }));
    writeFileSync(join(OUTPUT_DIR, `newsletter-${locale}.html`), newsletterHtml);
    console.log(`      ✅ Saved to email-previews/newsletter-${locale}.html`);
  }

  console.log('\n🎉 All previews generated successfully!\n');
  console.log('📂 Open the HTML files in your browser to preview:');
  console.log(`\n   English (EN):`);
  console.log(`   file://${OUTPUT_DIR}/welcome-en.html`);
  console.log(`   file://${OUTPUT_DIR}/newsletter-en.html`);
  console.log(`\n   Dutch (NL):`);
  console.log(`   file://${OUTPUT_DIR}/welcome-nl.html`);
  console.log(`   file://${OUTPUT_DIR}/newsletter-nl.html`);
}

generatePreviews().catch(console.error);
