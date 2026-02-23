-- Migration 0014: Add SEO metadata to marketplace categories
-- Purpose: Add seo_metadata JSONB column to marketplace_categories for SEO landing pages
-- Created: 2026-02-23
-- Depends on: 0010_marketplace_foundation.sql (marketplace_categories)

ALTER TABLE marketplace_categories
  ADD COLUMN IF NOT EXISTS seo_metadata JSONB DEFAULT '{}';

-- Index for efficient JSONB queries (optional but useful for large tables)
CREATE INDEX IF NOT EXISTS idx_marketplace_categories_seo_metadata
  ON marketplace_categories USING GIN(seo_metadata);

COMMENT ON COLUMN marketplace_categories.seo_metadata IS
  'SEO metadata for category landing pages. Fields: meta_title (string, max 60 chars), meta_description (string, max 155 chars), intro_paragraph (string)';
