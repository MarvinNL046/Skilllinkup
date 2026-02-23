-- Migration 0010: Marketplace Foundation Tables
-- Purpose: Add Auth.js tables, extend users, and create freelancer marketplace tables
-- Created: 2026-02-23

-- ============================================================
-- AUTH.JS / NEXTAUTH V5 TABLES
-- ============================================================

-- accounts: OAuth account links per user
CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type VARCHAR(255),
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
  CONSTRAINT accounts_provider_provider_account_id_unique UNIQUE (provider, provider_account_id)
);

-- sessions: User sessions managed by Auth.js
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token VARCHAR(255) NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMP NOT NULL,
  CONSTRAINT sessions_session_token_unique UNIQUE (session_token)
);

-- verification_tokens: Email verification tokens
CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier TEXT NOT NULL,
  token TEXT NOT NULL,
  expires TIMESTAMP NOT NULL,
  CONSTRAINT verification_tokens_token_unique UNIQUE (token),
  CONSTRAINT verification_tokens_identifier_token_unique UNIQUE (identifier, token)
);

-- ============================================================
-- EXTEND USERS TABLE
-- ============================================================

ALTER TABLE users ADD COLUMN IF NOT EXISTS user_type VARCHAR(20) DEFAULT 'client';
ALTER TABLE users ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_type ON users(user_type);

-- ============================================================
-- FREELANCER PROFILES
-- ============================================================

CREATE TABLE IF NOT EXISTS freelancer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  -- Identity
  display_name VARCHAR(255) NOT NULL,
  tagline VARCHAR(255),
  bio TEXT,
  avatar_url TEXT,
  cover_image_url TEXT,

  -- Rates & Work Type
  hourly_rate DECIMAL(10,2),
  work_type VARCHAR(50) DEFAULT 'remote', -- 'remote', 'local', 'hybrid'

  -- Location (for local/hybrid work)
  location_city VARCHAR(255),
  location_country VARCHAR(5),
  location_postcode VARCHAR(20),
  service_radius_km INTEGER,

  -- Skills & Portfolio
  languages TEXT[] DEFAULT ARRAY['en'],
  skills TEXT[] DEFAULT ARRAY[]::TEXT[],
  portfolio_urls TEXT[] DEFAULT ARRAY[]::TEXT[],

  -- Links
  website_url TEXT,
  linkedin_url TEXT,

  -- Verification
  is_verified BOOLEAN DEFAULT false,
  verification_date TIMESTAMP,

  -- Stripe Integration
  stripe_account_id VARCHAR(255),
  stripe_onboarding_complete BOOLEAN DEFAULT false,

  -- Performance Metrics
  response_time_hours INTEGER,
  completion_rate DECIMAL(5,2) DEFAULT 100.00,
  total_earnings DECIMAL(12,2) DEFAULT 0,
  total_orders INTEGER DEFAULT 0,

  -- Ratings
  rating_average DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,

  -- Status
  is_available BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'active', 'suspended'
  locale VARCHAR(5) DEFAULT 'en',

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_freelancer_profiles_user ON freelancer_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_freelancer_profiles_status ON freelancer_profiles(status);
CREATE INDEX IF NOT EXISTS idx_freelancer_profiles_location ON freelancer_profiles(location_country, location_city);
CREATE INDEX IF NOT EXISTS idx_freelancer_profiles_skills ON freelancer_profiles USING GIN(skills);
CREATE INDEX IF NOT EXISTS idx_freelancer_profiles_rating ON freelancer_profiles(rating_average DESC);
CREATE INDEX IF NOT EXISTS idx_freelancer_profiles_work_type ON freelancer_profiles(work_type);

-- ============================================================
-- MARKETPLACE CATEGORIES
-- ============================================================

CREATE TABLE IF NOT EXISTS marketplace_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  image_url TEXT,

  -- Hierarchy (for subcategories)
  parent_id UUID REFERENCES marketplace_categories(id) ON DELETE SET NULL,

  -- Service type
  service_type VARCHAR(20) NOT NULL DEFAULT 'digital', -- 'digital', 'local', 'hybrid'

  -- Display
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  locale VARCHAR(5) DEFAULT 'en',

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,

  CONSTRAINT marketplace_categories_slug_locale_unique UNIQUE (slug, locale)
);

CREATE INDEX IF NOT EXISTS idx_marketplace_categories_parent ON marketplace_categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_categories_service_type ON marketplace_categories(service_type);
CREATE INDEX IF NOT EXISTS idx_marketplace_categories_active_sort ON marketplace_categories(is_active, sort_order);

-- ============================================================
-- SKILLS
-- ============================================================

CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  category_id UUID REFERENCES marketplace_categories(id) ON DELETE SET NULL,
  locale VARCHAR(5) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,

  CONSTRAINT skills_slug_locale_unique UNIQUE (slug, locale)
);

CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category_id);

-- ============================================================
-- GIGS
-- ============================================================

CREATE TABLE IF NOT EXISTS gigs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  freelancer_id UUID NOT NULL REFERENCES freelancer_profiles(id) ON DELETE CASCADE,

  -- Content
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category_id UUID REFERENCES marketplace_categories(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],

  -- Work Type & Location
  work_type VARCHAR(50) DEFAULT 'remote', -- 'remote', 'local', 'hybrid'
  location_city VARCHAR(255),
  location_country VARCHAR(5),
  service_radius_km INTEGER,

  -- Engagement
  views INTEGER DEFAULT 0,
  order_count INTEGER DEFAULT 0,

  -- Ratings
  rating_average DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,

  -- Status
  is_featured BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'active', 'paused', 'rejected'
  locale VARCHAR(5) DEFAULT 'en',
  published_at TIMESTAMP,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,

  CONSTRAINT gigs_slug_locale_unique UNIQUE (slug, locale)
);

CREATE INDEX IF NOT EXISTS idx_gigs_freelancer ON gigs(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_gigs_category ON gigs(category_id);
CREATE INDEX IF NOT EXISTS idx_gigs_status_published ON gigs(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_gigs_rating ON gigs(rating_average DESC);
CREATE INDEX IF NOT EXISTS idx_gigs_location ON gigs(location_country, location_city);
CREATE INDEX IF NOT EXISTS idx_gigs_tags ON gigs USING GIN(tags);

-- ============================================================
-- GIG PACKAGES (Pricing Tiers)
-- ============================================================

CREATE TABLE IF NOT EXISTS gig_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id UUID NOT NULL REFERENCES gigs(id) ON DELETE CASCADE,

  -- Tier
  tier VARCHAR(20) NOT NULL, -- 'basic', 'standard', 'premium'
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,

  -- Pricing
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  delivery_days INTEGER NOT NULL,

  -- Scope
  revision_count INTEGER DEFAULT 0,
  features JSONB DEFAULT '[]',

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_gig_packages_gig ON gig_packages(gig_id);

-- ============================================================
-- GIG IMAGES
-- ============================================================

CREATE TABLE IF NOT EXISTS gig_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id UUID NOT NULL REFERENCES gigs(id) ON DELETE CASCADE,

  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  sort_order INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_gig_images_gig ON gig_images(gig_id);

-- ============================================================
-- UPDATED_AT TRIGGERS
-- ============================================================

-- Reuse trigger function from migration 0009 if it exists, otherwise create a generic one
CREATE OR REPLACE FUNCTION update_marketplace_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_accounts_updated_at ON accounts;
CREATE TRIGGER update_accounts_updated_at
  BEFORE UPDATE ON accounts
  FOR EACH ROW EXECUTE FUNCTION update_marketplace_updated_at_column();

DROP TRIGGER IF EXISTS update_freelancer_profiles_updated_at ON freelancer_profiles;
CREATE TRIGGER update_freelancer_profiles_updated_at
  BEFORE UPDATE ON freelancer_profiles
  FOR EACH ROW EXECUTE FUNCTION update_marketplace_updated_at_column();

DROP TRIGGER IF EXISTS update_marketplace_categories_updated_at ON marketplace_categories;
CREATE TRIGGER update_marketplace_categories_updated_at
  BEFORE UPDATE ON marketplace_categories
  FOR EACH ROW EXECUTE FUNCTION update_marketplace_updated_at_column();

DROP TRIGGER IF EXISTS update_gigs_updated_at ON gigs;
CREATE TRIGGER update_gigs_updated_at
  BEFORE UPDATE ON gigs
  FOR EACH ROW EXECUTE FUNCTION update_marketplace_updated_at_column();

DROP TRIGGER IF EXISTS update_gig_packages_updated_at ON gig_packages;
CREATE TRIGGER update_gig_packages_updated_at
  BEFORE UPDATE ON gig_packages
  FOR EACH ROW EXECUTE FUNCTION update_marketplace_updated_at_column();
