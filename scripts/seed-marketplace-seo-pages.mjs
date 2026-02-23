#!/usr/bin/env node
/**
 * seed-marketplace-seo-pages.mjs
 *
 * Generates SEO-friendly metadata for each marketplace category and stores it
 * in the `seo_metadata` JSONB column of `marketplace_categories`.
 *
 * The script first runs the migration (0014_marketplace_seo_metadata.sql) to
 * ensure the column exists, then upserts metadata for every active parent
 * category.
 *
 * Usage:
 *   node scripts/seed-marketplace-seo-pages.mjs
 *
 * Requirements:
 *   - DATABASE_URL or NETLIFY_DATABASE_URL in environment / .env.local
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import postgres from 'postgres';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Load .env.local
dotenv.config({ path: resolve(root, '.env.local') });

const connectionString =
  process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;

if (!connectionString) {
  console.error(
    'ERROR: No DATABASE_URL or NETLIFY_DATABASE_URL found in environment.'
  );
  process.exit(1);
}

const sql = postgres(connectionString, { ssl: 'require', max: 1 });

// ============================================================
// SEO Content Generator
// ============================================================

/**
 * Generate SEO metadata for a category.
 * Lengths: title <= 60, description <= 155 chars.
 *
 * @param {string} name - Category name (e.g. "Web Development")
 * @param {string} description - Category description from DB (may be null)
 * @param {string} serviceType - 'digital', 'local', or 'hybrid'
 * @returns {{ meta_title: string, meta_description: string, intro_paragraph: string }}
 */
function generateSeoMetadata(name, description, serviceType) {
  const isLocal = serviceType === 'local';
  const isHybrid = serviceType === 'hybrid';

  // Meta title: "Best [Category] Freelancers | SkillLinkup" (max 60 chars)
  const baseTitle = `Best ${name} Freelancers | SkillLinkup`;
  const localTitle = `Top ${name} Specialists Near You | SkillLinkup`;
  const rawTitle = isLocal ? localTitle : baseTitle;
  const meta_title = rawTitle.length > 60 ? rawTitle.slice(0, 57) + '...' : rawTitle;

  // Meta description (max 155 chars)
  let rawDesc;
  if (isLocal) {
    rawDesc = `Find verified ${name} specialists in your area on SkillLinkup. Browse local freelancers, compare rates, and book in-person services with confidence.`;
  } else if (isHybrid) {
    rawDesc = `Hire skilled ${name} freelancers on SkillLinkup. Work remotely or locally – browse top profiles, view portfolios, and get your project done.`;
  } else {
    rawDesc = `Hire top ${name} freelancers on SkillLinkup. Browse services, compare packages, and work with vetted professionals. Start your project today.`;
  }
  const meta_description =
    rawDesc.length > 155 ? rawDesc.slice(0, 152) + '...' : rawDesc;

  // Intro paragraph (used in the hero section of the category landing page)
  let intro_paragraph;
  if (description && description.trim().length > 0) {
    // Use the existing description as the intro
    intro_paragraph = description.trim();
  } else if (isLocal) {
    intro_paragraph = `Looking for ${name} specialists near you? SkillLinkup connects you with trusted local professionals who can help in person. Simply browse, compare, and hire.`;
  } else {
    intro_paragraph = `Find the best ${name} freelancers on SkillLinkup. Whether you need a quick task completed or a long-term partner for your project, our verified professionals are ready to help.`;
  }

  return { meta_title, meta_description, intro_paragraph };
}

// ============================================================
// Main
// ============================================================

async function main() {
  console.log('SkillLinkup - Marketplace SEO Seed Script');
  console.log('==========================================\n');

  // Step 1: Run the migration to ensure seo_metadata column exists
  console.log('Step 1: Running migration 0014_marketplace_seo_metadata.sql ...');
  try {
    const migrationPath = resolve(
      root,
      'drizzle/migrations/0014_marketplace_seo_metadata.sql'
    );
    const migrationSql = readFileSync(migrationPath, 'utf-8');
    // Split on semicolons, run each statement separately
    const statements = migrationSql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith('--'));

    for (const stmt of statements) {
      await sql.unsafe(stmt);
    }
    console.log('  Migration applied (or already exists).\n');
  } catch (err) {
    // Non-fatal: column might already exist
    console.warn('  Migration warning (may already be applied):', err.message, '\n');
  }

  // Step 2: Fetch all active parent categories
  console.log('Step 2: Fetching active parent categories ...');
  const categories = await sql`
    SELECT id, name, slug, description, service_type, locale
    FROM marketplace_categories
    WHERE is_active = true
      AND parent_id IS NULL
    ORDER BY locale ASC, name ASC
  `;

  if (categories.length === 0) {
    console.log('  No categories found. Seeding skipped.');
    console.log('\nDone!');
    await sql.end();
    return;
  }

  console.log(`  Found ${categories.length} parent categories.\n`);

  // Step 3: Generate and upsert SEO metadata for each category
  console.log('Step 3: Generating and storing SEO metadata ...\n');

  let updated = 0;
  let skipped = 0;

  for (const cat of categories) {
    const { meta_title, meta_description, intro_paragraph } =
      generateSeoMetadata(cat.name, cat.description, cat.service_type);

    const seoMetadata = {
      meta_title,
      meta_description,
      intro_paragraph,
      generated_at: new Date().toISOString(),
    };

    await sql`
      UPDATE marketplace_categories
      SET seo_metadata = ${JSON.stringify(seoMetadata)}::jsonb,
          updated_at   = NOW()
      WHERE id = ${cat.id}
    `;

    console.log(`  [${cat.locale}] ${cat.name}`);
    console.log(`         Title: ${meta_title}`);
    console.log(`         Desc:  ${meta_description.slice(0, 80)}...`);
    console.log('');
    updated++;
  }

  console.log(
    `\nDone! ${updated} categories updated, ${skipped} skipped.`
  );

  await sql.end();
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
