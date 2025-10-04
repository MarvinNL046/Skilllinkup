-- SkillLinkup Database Setup Script
-- Run this in your Neon SQL Editor

-- 1. Create tenants table (required for multi-tenancy)
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  domain VARCHAR(255),
  settings JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  subscription_tier VARCHAR(50) DEFAULT 'free',
  subscription_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- 2. Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'author' NOT NULL,
  avatar VARCHAR(500),
  bio TEXT,
  email_verified BOOLEAN DEFAULT false,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- 3. Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  color VARCHAR(7) DEFAULT '#ef2b70',
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- 4. Create posts table with ALL columns
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  feature_img VARCHAR(500),
  post_format VARCHAR(50) DEFAULT 'standard',
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  meta_title VARCHAR(255),
  meta_description TEXT,
  tags JSONB DEFAULT '[]',
  status VARCHAR(50) DEFAULT 'draft' NOT NULL,
  published_at TIMESTAMP,
  scheduled_for TIMESTAMP,
  views INTEGER DEFAULT 0,
  read_time INTEGER,
  featured BOOLEAN DEFAULT false,
  sticky BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- 5. Create default tenant (for single-tenant setup)
INSERT INTO tenants (name, slug, is_active)
VALUES ('SkillLinkup', 'skilllinkup', true)
ON CONFLICT (slug) DO NOTHING;

-- 6. Get the tenant ID for reference
-- Copy this ID and use it when creating posts/users
SELECT id, name, slug FROM tenants WHERE slug = 'skilllinkup';
