#!/usr/bin/env node

/**
 * Seed Script: Import generated SEO pages into database
 *
 * Run with: node scripts/seed-seo-pages.mjs
 *
 * This script:
 * 1. Reads all generated page.tsx files from app/[locale]/gids/
 * 2. Extracts metadata (title, description, content)
 * 3. Inserts into seo_pages table
 * 4. Creates CTA entries in seo_ctas table
 */

import { neon } from '@neondatabase/serverless';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Pillar configuration matching SEO_NAVIGATION
const PILLARS = [
  { id: 1, name: 'Platform Selectie', slug: 'platform-selectie' },
  { id: 2, name: 'Platform Reviews', slug: 'platform-reviews' },
  { id: 3, name: 'Prijzen & Verdienen', slug: 'prijzen-verdienen' },
  { id: 4, name: 'Aan de Slag', slug: 'aan-de-slag' },
  { id: 5, name: 'Tools & Productiviteit', slug: 'tools-productiviteit' },
  { id: 6, name: 'Platform Vergelijkingen', slug: 'platform-vergelijkingen' },
  { id: 7, name: 'Succes Strategieën', slug: 'succes-strategieen' },
  { id: 8, name: 'Niche Gidsen', slug: 'niche-gidsen' },
  { id: 9, name: 'Zakelijk Beheer', slug: 'zakelijk-beheer' },
  { id: 10, name: 'Best Practices', slug: 'best-practices' },
];

/**
 * Extract metadata from a page.tsx file
 */
function extractMetadata(filePath, pillar, subpillarSlug) {
  try {
    const content = readFileSync(filePath, 'utf-8');

    // Extract title from metadata export or h1
    let title = '';
    const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/);
    if (titleMatch) {
      title = titleMatch[1];
    } else {
      const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/i);
      if (h1Match) title = h1Match[1];
    }

    // Extract meta description
    let metaDescription = '';
    const descMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/);
    if (descMatch) {
      metaDescription = descMatch[1].substring(0, 160);
    }

    // Extract CTAs
    const ctas = [];
    const ctaMatches = content.matchAll(/href=\{?['"`]([^'"`}]+)['"`]\}?[^>]*>\s*([^<]+)/g);
    let ctaIndex = 0;
    for (const match of ctaMatches) {
      if (match[1].includes('/platforms') || match[1].includes('/tools') ||
          match[1].includes('/newsletter') || match[1].includes('/comparisons')) {
        const ctaType = ctaIndex === 0 ? 'primary' : ctaIndex === 1 ? 'secondary' : 'tertiary';
        const ctaPosition = ctaIndex === 0 ? 'top' : ctaIndex === 1 ? 'middle' : 'bottom';
        ctas.push({
          text: match[2].trim(),
          action: match[1],
          type: ctaType,
          position: ctaPosition,
        });
        ctaIndex++;
        if (ctaIndex >= 3) break;
      }
    }

    // Get approximate word count (for content length validation)
    const textContent = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    const wordCount = textContent.split(' ').length;

    return {
      title: title || `${pillar.name} - ${subpillarSlug}`,
      slug: `/gids/${pillar.slug}/${subpillarSlug}`,
      metaTitle: (title || '').substring(0, 60),
      metaDescription,
      h1: title,
      content: content, // Store full TSX content
      excerpt: metaDescription,
      pillarId: pillar.id,
      pillarName: pillar.name,
      pillarSlug: `/gids/${pillar.slug}`,
      keywords: [],
      ctas,
      wordCount,
    };
  } catch (error) {
    console.error(`Error extracting metadata from ${filePath}:`, error.message);
    return null;
  }
}

async function seedSeoPages() {
  console.log('🌱 Starting SEO pages seed...\n');

  const databaseUrl = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL not set');
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  // Get tenant ID (use first tenant or create one)
  let tenantId;
  const tenants = await sql`SELECT id FROM tenants LIMIT 1`;
  if (tenants.length > 0) {
    tenantId = tenants[0].id;
    console.log(`📦 Using existing tenant: ${tenantId}\n`);
  } else {
    const newTenant = await sql`
      INSERT INTO tenants (name, slug)
      VALUES ('SkillLinkup', 'skilllinkup')
      RETURNING id
    `;
    tenantId = newTenant[0].id;
    console.log(`📦 Created new tenant: ${tenantId}\n`);
  }

  const gidsPath = join(projectRoot, 'app', '[locale]', 'gids');
  let totalPages = 0;
  let totalCtas = 0;

  for (const pillar of PILLARS) {
    const pillarPath = join(gidsPath, pillar.slug);

    if (!existsSync(pillarPath)) {
      console.log(`⚠️  Pillar directory not found: ${pillar.slug}`);
      continue;
    }

    console.log(`\n📁 Processing pillar: ${pillar.name}`);

    const subpillars = readdirSync(pillarPath, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    let subpillarIndex = 0;
    for (const subpillarSlug of subpillars) {
      const pagePath = join(pillarPath, subpillarSlug, 'page.tsx');

      if (!existsSync(pagePath)) {
        console.log(`   ⚠️  No page.tsx in ${subpillarSlug}`);
        continue;
      }

      const metadata = extractMetadata(pagePath, pillar, subpillarSlug);
      if (!metadata) continue;

      subpillarIndex++;

      try {
        // Check if page already exists
        const existing = await sql`
          SELECT id FROM seo_pages
          WHERE slug = ${metadata.slug} AND locale = 'nl'
        `;

        let pageId;
        if (existing.length > 0) {
          // Update existing
          pageId = existing[0].id;
          await sql`
            UPDATE seo_pages SET
              title = ${metadata.title},
              meta_title = ${metadata.metaTitle},
              meta_description = ${metadata.metaDescription},
              h1 = ${metadata.h1},
              content = ${metadata.content},
              excerpt = ${metadata.excerpt},
              updated_at = NOW()
            WHERE id = ${pageId}
          `;
          console.log(`   ✏️  Updated: ${subpillarSlug}`);
        } else {
          // Insert new
          const result = await sql`
            INSERT INTO seo_pages (
              tenant_id, title, slug, meta_title, meta_description, h1,
              content, excerpt, pillar_id, pillar_name, pillar_slug,
              subpillar_index, keywords, locale, status
            ) VALUES (
              ${tenantId}, ${metadata.title}, ${metadata.slug},
              ${metadata.metaTitle}, ${metadata.metaDescription}, ${metadata.h1},
              ${metadata.content}, ${metadata.excerpt}, ${metadata.pillarId},
              ${metadata.pillarName}, ${metadata.pillarSlug}, ${subpillarIndex},
              ${JSON.stringify(metadata.keywords)}, 'nl', 'published'
            )
            RETURNING id
          `;
          pageId = result[0].id;
          console.log(`   ✅ Inserted: ${subpillarSlug} (~${metadata.wordCount} words)`);
        }

        totalPages++;

        // Insert CTAs
        for (const cta of metadata.ctas) {
          await sql`
            INSERT INTO seo_ctas (
              tenant_id, page_id, cta_text, cta_type, cta_action, cta_position
            ) VALUES (
              ${tenantId}, ${pageId}, ${cta.text}, ${cta.type}, ${cta.action}, ${cta.position}
            )
            ON CONFLICT DO NOTHING
          `;
          totalCtas++;
        }

      } catch (error) {
        console.error(`   ❌ Error inserting ${subpillarSlug}:`, error.message);
      }
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Seed completed!`);
  console.log(`   📄 Pages: ${totalPages}`);
  console.log(`   🎯 CTAs: ${totalCtas}`);
  console.log('='.repeat(50));
}

seedSeoPages().catch(console.error);
