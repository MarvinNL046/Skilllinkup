#!/usr/bin/env node

/**
 * Migration Runner for 0009: SEO Pages and CTAs tables
 *
 * Run with: node scripts/run-migration-0009.mjs
 */

import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runMigration() {
  console.log('🚀 Running migration 0009: Add SEO Pages and CTAs tables...\n');

  // Get database URL from environment
  const databaseUrl = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ DATABASE_URL environment variable is not set');
    console.log('Please set DATABASE_URL in your .env.local file');
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  try {
    // Execute migration statements directly using tagged template literals

    console.log('[1/12] Creating seo_pages table...');
    await sql`
      CREATE TABLE IF NOT EXISTS seo_pages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(500) NOT NULL,
        meta_title VARCHAR(70),
        meta_description VARCHAR(170),
        h1 VARCHAR(255),
        content TEXT NOT NULL,
        excerpt TEXT,
        pillar_id INTEGER NOT NULL,
        pillar_name VARCHAR(255) NOT NULL,
        pillar_slug VARCHAR(255) NOT NULL,
        subpillar_index INTEGER NOT NULL,
        keywords JSONB DEFAULT '[]',
        schema_markup JSONB,
        canonical_url TEXT,
        internal_links JSONB DEFAULT '[]',
        locale VARCHAR(5) NOT NULL DEFAULT 'nl',
        alternate_urls JSONB DEFAULT '{}',
        status VARCHAR(50) DEFAULT 'draft' NOT NULL,
        published_at TIMESTAMP,
        views INTEGER DEFAULT 0,
        conversions INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
        CONSTRAINT seo_pages_slug_locale_unique UNIQUE (slug, locale)
      )
    `;
    console.log('   ✅ seo_pages table created');

    console.log('[2/12] Creating seo_ctas table...');
    await sql`
      CREATE TABLE IF NOT EXISTS seo_ctas (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        page_id UUID NOT NULL REFERENCES seo_pages(id) ON DELETE CASCADE,
        cta_text VARCHAR(255) NOT NULL,
        cta_type VARCHAR(50) NOT NULL,
        cta_action TEXT NOT NULL,
        cta_position VARCHAR(50) NOT NULL,
        context_text TEXT,
        button_style VARCHAR(100),
        clicks INTEGER DEFAULT 0,
        conversions INTEGER DEFAULT 0,
        conversion_rate DECIMAL(5,2) DEFAULT 0,
        variant VARCHAR(50) DEFAULT 'default',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `;
    console.log('   ✅ seo_ctas table created');

    console.log('[3/12] Creating index on seo_pages.locale...');
    try {
      await sql`CREATE INDEX idx_seo_pages_locale ON seo_pages(locale)`;
      console.log('   ✅ Index created');
    } catch (e) {
      if (e.message?.includes('already exists')) console.log('   ⚠️  Already exists');
      else throw e;
    }

    console.log('[4/12] Creating index on seo_pages.pillar_id...');
    try {
      await sql`CREATE INDEX idx_seo_pages_pillar ON seo_pages(pillar_id)`;
      console.log('   ✅ Index created');
    } catch (e) {
      if (e.message?.includes('already exists')) console.log('   ⚠️  Already exists');
      else throw e;
    }

    console.log('[5/12] Creating index on seo_pages.status...');
    try {
      await sql`CREATE INDEX idx_seo_pages_status ON seo_pages(status)`;
      console.log('   ✅ Index created');
    } catch (e) {
      if (e.message?.includes('already exists')) console.log('   ⚠️  Already exists');
      else throw e;
    }

    console.log('[6/12] Creating index on seo_pages.slug...');
    try {
      await sql`CREATE INDEX idx_seo_pages_slug ON seo_pages(slug)`;
      console.log('   ✅ Index created');
    } catch (e) {
      if (e.message?.includes('already exists')) console.log('   ⚠️  Already exists');
      else throw e;
    }

    console.log('[7/12] Creating index on seo_ctas.page_id...');
    try {
      await sql`CREATE INDEX idx_seo_ctas_page ON seo_ctas(page_id)`;
      console.log('   ✅ Index created');
    } catch (e) {
      if (e.message?.includes('already exists')) console.log('   ⚠️  Already exists');
      else throw e;
    }

    console.log('[8/12] Creating index on seo_ctas.cta_type...');
    try {
      await sql`CREATE INDEX idx_seo_ctas_type ON seo_ctas(cta_type)`;
      console.log('   ✅ Index created');
    } catch (e) {
      if (e.message?.includes('already exists')) console.log('   ⚠️  Already exists');
      else throw e;
    }

    console.log('[9/12] Creating updated_at trigger function...');
    try {
      await sql`
        CREATE OR REPLACE FUNCTION update_seo_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ language 'plpgsql'
      `;
      console.log('   ✅ Trigger function created');
    } catch (e) {
      console.log('   ⚠️  Function may already exist');
    }

    console.log('[10/12] Creating trigger for seo_pages...');
    try {
      await sql`DROP TRIGGER IF EXISTS update_seo_pages_updated_at ON seo_pages`;
      await sql`
        CREATE TRIGGER update_seo_pages_updated_at
        BEFORE UPDATE ON seo_pages
        FOR EACH ROW EXECUTE FUNCTION update_seo_updated_at_column()
      `;
      console.log('   ✅ Trigger created');
    } catch (e) {
      console.log('   ⚠️  Trigger error:', e.message);
    }

    console.log('[11/12] Creating trigger for seo_ctas...');
    try {
      await sql`DROP TRIGGER IF EXISTS update_seo_ctas_updated_at ON seo_ctas`;
      await sql`
        CREATE TRIGGER update_seo_ctas_updated_at
        BEFORE UPDATE ON seo_ctas
        FOR EACH ROW EXECUTE FUNCTION update_seo_updated_at_column()
      `;
      console.log('   ✅ Trigger created');
    } catch (e) {
      console.log('   ⚠️  Trigger error:', e.message);
    }

    console.log('[12/12] Verifying tables exist...');
    const tables = await sql`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('seo_pages', 'seo_ctas')
    `;
    console.log(`   ✅ Found ${tables.length} tables:`, tables.map(t => t.table_name).join(', '));

    console.log('\n✅ Migration 0009 completed successfully!');
    console.log('\n📊 Tables created:');
    console.log('   - seo_pages: Store SEO landing pages');
    console.log('   - seo_ctas: Store CTAs for conversion tracking');

  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

runMigration();
