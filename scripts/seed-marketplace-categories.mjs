#!/usr/bin/env node

/**
 * Seed Script: Marketplace Categories
 *
 * Inserts all marketplace categories (parent + children) for both EN and NL locales.
 * Safe to rerun: uses ON CONFLICT DO UPDATE (idempotent).
 *
 * Run with: node scripts/seed-marketplace-categories.mjs
 *
 * Categories seeded:
 *   Digital services (5 parent categories):
 *     1. Development & IT
 *     2. Design & Creative
 *     3. Writing & Translation
 *     4. Marketing & Sales
 *     5. Business Services
 *
 *   Physical/local services (5 parent categories):
 *     6. Construction & Renovation
 *     7. Installation & Technical
 *     8. Home & Garden
 *     9. Auto & Transport
 *    10. Personal Services
 */

import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

// ---------------------------------------------------------------------------
// Category data
// Each entry has:
//   en / nl  : parent category name for the respective locale
//   slug     : unique URL-safe identifier (shared across locales)
//   type     : 'digital' | 'physical'
//   icon     : Lucide icon name
//   children : subcategories, each with en / nl name and slug
// ---------------------------------------------------------------------------
const categories = [
  // ---- DIGITAL SERVICES ---------------------------------------------------
  {
    en: 'Development & IT',
    nl: 'Development & IT',
    slug: 'development-it',
    type: 'digital',
    icon: 'Code2',
    children: [
      { en: 'Web Development',       nl: 'Webontwikkeling',       slug: 'web-development' },
      { en: 'Mobile Apps',           nl: 'Mobiele Apps',          slug: 'mobile-apps' },
      { en: 'WordPress',             nl: 'WordPress',             slug: 'wordpress' },
      { en: 'E-commerce',            nl: 'E-commerce',            slug: 'e-commerce' },
      { en: 'DevOps & Cloud',        nl: 'DevOps & Cloud',        slug: 'devops-cloud' },
      { en: 'QA & Testing',          nl: 'QA & Testen',           slug: 'qa-testing' },
      { en: 'AI & Machine Learning', nl: 'AI & Machine Learning', slug: 'ai-machine-learning' },
    ],
  },
  {
    en: 'Design & Creative',
    nl: 'Design & Creatief',
    slug: 'design-creative',
    type: 'digital',
    icon: 'Palette',
    children: [
      { en: 'Logo & Branding',   nl: 'Logo & Huisstijl',   slug: 'logo-branding' },
      { en: 'UI/UX Design',      nl: 'UI/UX Design',       slug: 'ui-ux-design' },
      { en: 'Graphic Design',    nl: 'Grafisch Ontwerp',   slug: 'graphic-design' },
      { en: 'Illustration',      nl: 'Illustratie',        slug: 'illustration' },
      { en: 'Video & Animation', nl: 'Video & Animatie',   slug: 'video-animation' },
      { en: 'Photography',       nl: 'Fotografie',         slug: 'photography' },
      { en: '3D Design',         nl: '3D Ontwerp',         slug: '3d-design' },
    ],
  },
  {
    en: 'Writing & Translation',
    nl: 'Schrijven & Vertaling',
    slug: 'writing-translation',
    type: 'digital',
    icon: 'PenTool',
    children: [
      { en: 'Copywriting',        nl: 'Copywriting',          slug: 'copywriting' },
      { en: 'Content Writing',    nl: 'Contentteksten',       slug: 'content-writing' },
      { en: 'Technical Writing',  nl: 'Technisch Schrijven',  slug: 'technical-writing' },
      { en: 'Translation',        nl: 'Vertaling',            slug: 'translation' },
      { en: 'SEO Content',        nl: 'SEO-content',          slug: 'seo-content' },
      { en: 'Ghostwriting',       nl: 'Ghostwriting',         slug: 'ghostwriting' },
    ],
  },
  {
    en: 'Marketing & Sales',
    nl: 'Marketing & Sales',
    slug: 'marketing-sales',
    type: 'digital',
    icon: 'TrendingUp',
    children: [
      { en: 'Social Media',         nl: 'Social Media',         slug: 'social-media' },
      { en: 'SEO',                  nl: 'SEO',                  slug: 'seo' },
      { en: 'Google Ads',           nl: 'Google Ads',           slug: 'google-ads' },
      { en: 'Email Marketing',      nl: 'E-mailmarketing',      slug: 'email-marketing' },
      { en: 'Influencer Marketing', nl: 'Influencermarketing',  slug: 'influencer-marketing' },
      { en: 'Market Research',      nl: 'Marktonderzoek',       slug: 'market-research' },
    ],
  },
  {
    en: 'Business Services',
    nl: 'Zakelijke Diensten',
    slug: 'business-services',
    type: 'digital',
    icon: 'Briefcase',
    children: [
      { en: 'Accounting',         nl: 'Boekhouding',          slug: 'accounting' },
      { en: 'Legal Advice',       nl: 'Juridisch Advies',     slug: 'legal-advice' },
      { en: 'Virtual Assistant',  nl: 'Virtueel Assistent',   slug: 'virtual-assistant' },
      { en: 'Project Management', nl: 'Projectmanagement',    slug: 'project-management' },
      { en: 'HR & Recruitment',   nl: 'HR & Recruitment',     slug: 'hr-recruitment' },
      { en: 'Business Consulting', nl: 'Bedrijfsadvies',      slug: 'business-consulting' },
    ],
  },

  // ---- PHYSICAL / LOCAL SERVICES ------------------------------------------
  {
    en: 'Construction & Renovation',
    nl: 'Bouw & Verbouw',
    slug: 'construction-renovation',
    type: 'physical',
    icon: 'Hammer',
    children: [
      { en: 'General Contractor', nl: 'Aannemer',    slug: 'general-contractor' },
      { en: 'Carpenter',          nl: 'Timmerman',   slug: 'carpenter' },
      { en: 'Mason',              nl: 'Metselaar',   slug: 'mason' },
      { en: 'Plasterer',          nl: 'Stukadoor',   slug: 'plasterer' },
      { en: 'Painter',            nl: 'Schilder',    slug: 'painter' },
      { en: 'Roofer',             nl: 'Dakdekker',   slug: 'roofer' },
    ],
  },
  {
    en: 'Installation & Technical',
    nl: 'Installatie & Techniek',
    slug: 'installation-technical',
    type: 'physical',
    icon: 'Wrench',
    children: [
      { en: 'Plumber',          nl: 'Loodgieter',      slug: 'plumber' },
      { en: 'Electrician',      nl: 'Elektricien',     slug: 'electrician' },
      { en: 'HVAC & Heating',   nl: 'CV & Verwarming', slug: 'hvac-heating' },
      { en: 'Air Conditioning', nl: 'Airconditioning', slug: 'air-conditioning' },
      { en: 'Solar Panels',     nl: 'Zonnepanelen',    slug: 'solar-panels' },
      { en: 'Glazier',          nl: 'Glaszetter',      slug: 'glazier' },
    ],
  },
  {
    en: 'Home & Garden',
    nl: 'Huis & Tuin',
    slug: 'home-garden',
    type: 'physical',
    icon: 'Home',
    children: [
      { en: 'Cleaning',          nl: 'Schoonmaak',              slug: 'cleaning' },
      { en: 'Garden Maintenance', nl: 'Tuinonderhoud',          slug: 'garden-maintenance' },
      { en: 'Moving',            nl: 'Verhuizing',              slug: 'moving' },
      { en: 'Handyman',          nl: 'Klusjesman',              slug: 'handyman' },
      { en: 'Interior Design',   nl: 'Interieurontwerp',        slug: 'interior-design' },
      { en: 'Pest Control',      nl: 'Ongediertebestrijding',   slug: 'pest-control' },
    ],
  },
  {
    en: 'Auto & Transport',
    nl: 'Auto & Transport',
    slug: 'auto-transport',
    type: 'physical',
    icon: 'Car',
    children: [
      { en: 'Mechanic',           nl: 'Automonteur',  slug: 'mechanic' },
      { en: 'Auto Detailing',     nl: 'Autodetailing', slug: 'auto-detailing' },
      { en: 'Courier',            nl: 'Koerier',       slug: 'courier' },
      { en: 'Driver',             nl: 'Chauffeur',     slug: 'driver' },
      { en: 'Roadside Assistance', nl: 'Pechhulp',     slug: 'roadside-assistance' },
    ],
  },
  {
    en: 'Personal Services',
    nl: 'Persoonlijke Diensten',
    slug: 'personal-services',
    type: 'physical',
    icon: 'Heart',
    children: [
      { en: 'Personal Trainer',      nl: 'Personal Trainer',        slug: 'personal-trainer' },
      { en: 'Photographer (on-site)', nl: 'Fotograaf (op locatie)', slug: 'photographer-onsite' },
      { en: 'Tutoring & Coaching',   nl: 'Bijles & Coaching',       slug: 'tutoring-coaching' },
      { en: 'Catering',              nl: 'Catering',                slug: 'catering' },
      { en: 'Events',                nl: 'Evenementen',             slug: 'events' },
      { en: 'Dog Walking',           nl: 'Hondenuitlaatservice',    slug: 'dog-walking' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function seed() {
  const databaseUrl = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;
  if (!databaseUrl) {
    console.error('ERROR: DATABASE_URL is not set. Add it to .env.local and retry.');
    process.exit(1);
  }

  console.log('Seeding marketplace categories...\n');

  // Resolve tenant ID
  const tenants = await sql`SELECT id FROM tenants LIMIT 1`;
  if (tenants.length === 0) {
    console.error('ERROR: No tenant found in the database. Run migrations first.');
    process.exit(1);
  }
  const tenantId = tenants[0].id;
  console.log(`Using tenant: ${tenantId}\n`);

  let totalParents = 0;
  let totalChildren = 0;

  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];

    for (const locale of ['en', 'nl']) {
      const name = locale === 'en' ? cat.en : cat.nl;

      // Insert or update parent category
      const parentResult = await sql`
        INSERT INTO marketplace_categories
          (tenant_id, name, slug, icon, service_type, sort_order, locale)
        VALUES
          (${tenantId}, ${name}, ${cat.slug}, ${cat.icon}, ${cat.type}, ${i}, ${locale})
        ON CONFLICT (slug, locale) DO UPDATE
          SET name         = EXCLUDED.name,
              icon         = EXCLUDED.icon,
              service_type = EXCLUDED.service_type,
              sort_order   = EXCLUDED.sort_order,
              updated_at   = NOW()
        RETURNING id
      `;

      const parentId = parentResult[0].id;

      // Insert or update each child category
      for (let j = 0; j < cat.children.length; j++) {
        const child = cat.children[j];
        const childName = locale === 'en' ? child.en : child.nl;

        await sql`
          INSERT INTO marketplace_categories
            (tenant_id, name, slug, parent_id, service_type, sort_order, locale)
          VALUES
            (${tenantId}, ${childName}, ${child.slug}, ${parentId}, ${cat.type}, ${j}, ${locale})
          ON CONFLICT (slug, locale) DO UPDATE
            SET name         = EXCLUDED.name,
                parent_id    = EXCLUDED.parent_id,
                service_type = EXCLUDED.service_type,
                sort_order   = EXCLUDED.sort_order,
                updated_at   = NOW()
        `;

        if (locale === 'en') totalChildren++;
      }

      console.log(`  ok  ${name} (${locale}) + ${cat.children.length} subcategories`);
    }

    totalParents++;
  }

  console.log('\n' + '='.repeat(55));
  console.log('Done! All marketplace categories seeded.');
  console.log(`  Parent categories : ${totalParents} (x2 locales = ${totalParents * 2} rows)`);
  console.log(`  Subcategories     : ${totalChildren} (x2 locales = ${totalChildren * 2} rows)`);
  console.log(`  Total rows        : ${(totalParents + totalChildren) * 2}`);
  console.log('='.repeat(55));
}

seed().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
