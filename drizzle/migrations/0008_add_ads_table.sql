-- Migration: Add ads table for ad management system
-- Created: 2025-10-26

CREATE TABLE IF NOT EXISTS ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT NOT NULL,
  placement VARCHAR(50) NOT NULL, -- 'tools_listing', 'tools_detail', 'blog_sidebar'
  is_active BOOLEAN DEFAULT true,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for efficient queries
CREATE INDEX idx_ads_tenant ON ads(tenant_id);
CREATE INDEX idx_ads_placement ON ads(placement);
CREATE INDEX idx_ads_active ON ads(is_active);
CREATE INDEX idx_ads_placement_active ON ads(placement, is_active);

-- Add comment for documentation
COMMENT ON TABLE ads IS 'Advertisement management for promoting services on tools and blog pages';
COMMENT ON COLUMN ads.placement IS 'Where the ad appears: tools_listing, tools_detail, blog_sidebar';
