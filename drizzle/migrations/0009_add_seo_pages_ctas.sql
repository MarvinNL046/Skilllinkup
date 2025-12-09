-- Migration 0009: Add SEO Pages and CTAs tables
-- Purpose: Store generated SEO landing pages and their CTAs for conversion tracking

-- SEO Pages table for storing generated landing pages
CREATE TABLE IF NOT EXISTS seo_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  -- Content
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(500) NOT NULL,
  meta_title VARCHAR(70),
  meta_description VARCHAR(170),
  h1 VARCHAR(255),
  content TEXT NOT NULL,
  excerpt TEXT,

  -- Organization
  pillar_id INTEGER NOT NULL,
  pillar_name VARCHAR(255) NOT NULL,
  pillar_slug VARCHAR(255) NOT NULL,
  subpillar_index INTEGER NOT NULL,

  -- SEO
  keywords JSONB DEFAULT '[]',
  schema_markup JSONB,
  canonical_url TEXT,

  -- Internal linking
  internal_links JSONB DEFAULT '[]',

  -- Localization
  locale VARCHAR(5) NOT NULL DEFAULT 'nl',
  alternate_urls JSONB DEFAULT '{}',

  -- Status
  status VARCHAR(50) DEFAULT 'draft' NOT NULL,
  published_at TIMESTAMP,

  -- Metrics
  views INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,

  -- Constraints
  CONSTRAINT seo_pages_slug_locale_unique UNIQUE (slug, locale)
);

-- CTAs table for tracking conversion elements
CREATE TABLE IF NOT EXISTS seo_ctas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  page_id UUID NOT NULL REFERENCES seo_pages(id) ON DELETE CASCADE,

  -- CTA Content
  cta_text VARCHAR(255) NOT NULL,
  cta_type VARCHAR(50) NOT NULL, -- 'primary', 'secondary', 'tertiary'
  cta_action TEXT NOT NULL, -- URL or action identifier
  cta_position VARCHAR(50) NOT NULL, -- 'top', 'middle', 'bottom'

  -- Context
  context_text TEXT, -- Surrounding text for the CTA
  button_style VARCHAR(100), -- CSS classes for button

  -- Tracking
  clicks INTEGER DEFAULT 0,
  conversions INTEGER DEFAULT 0,
  conversion_rate DECIMAL(5,2) DEFAULT 0,

  -- A/B Testing
  variant VARCHAR(50) DEFAULT 'default',
  is_active BOOLEAN DEFAULT true,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create indexes for performance
CREATE INDEX idx_seo_pages_locale ON seo_pages(locale);
CREATE INDEX idx_seo_pages_pillar ON seo_pages(pillar_id);
CREATE INDEX idx_seo_pages_status ON seo_pages(status);
CREATE INDEX idx_seo_pages_slug ON seo_pages(slug);
CREATE INDEX idx_seo_ctas_page ON seo_ctas(page_id);
CREATE INDEX idx_seo_ctas_type ON seo_ctas(cta_type);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_seo_pages_updated_at BEFORE UPDATE ON seo_pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_seo_ctas_updated_at BEFORE UPDATE ON seo_ctas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
