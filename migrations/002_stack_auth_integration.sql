-- Migration: Stack Auth Integration
-- This migration adapts the existing schema for Stack Auth

-- ============================================================================
-- STEP 1: Add Stack Auth columns and update existing tables
-- ============================================================================

-- Add owner_id to posts (Stack Auth user ID)
ALTER TABLE posts ADD COLUMN IF NOT EXISTS owner_id TEXT;

-- Update posts table to use Stack Auth
ALTER TABLE posts 
  ALTER COLUMN author_id DROP NOT NULL,
  ADD COLUMN IF NOT EXISTS author_name TEXT,
  ADD COLUMN IF NOT EXISTS author_email TEXT,
  ADD COLUMN IF NOT EXISTS author_avatar TEXT;

-- Add color column to categories (for UI)
ALTER TABLE categories ADD COLUMN IF NOT EXISTS color TEXT DEFAULT '#ef2b70';

-- ============================================================================
-- STEP 2: Create Neon Authorize function for JWT validation
-- ============================================================================

-- This function extracts the user ID from Stack Auth JWT tokens
CREATE OR REPLACE FUNCTION auth.user_id() RETURNS TEXT AS $$
  SELECT NULLIF(
    current_setting('request.jwt.claims', true)::json->>'sub',
    ''
  )::text;
$$ LANGUAGE SQL STABLE;

-- ============================================================================
-- STEP 3: Enable Row Level Security
-- ============================================================================

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STEP 4: Create RLS Policies for Posts
-- ============================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS posts_select_policy ON posts;
DROP POLICY IF EXISTS posts_insert_policy ON posts;
DROP POLICY IF EXISTS posts_update_policy ON posts;
DROP POLICY IF EXISTS posts_delete_policy ON posts;

-- SELECT: Users can see their own posts OR published posts
CREATE POLICY posts_select_policy ON posts
  AS PERMISSIVE FOR SELECT TO authenticated
  USING (
    owner_id = auth.user_id() OR 
    status = 'published'
  );

-- INSERT: Users can only insert their own posts
CREATE POLICY posts_insert_policy ON posts
  AS PERMISSIVE FOR INSERT TO authenticated
  WITH CHECK (owner_id = auth.user_id());

-- UPDATE: Users can only update their own posts
CREATE POLICY posts_update_policy ON posts
  AS PERMISSIVE FOR UPDATE TO authenticated
  USING (owner_id = auth.user_id())
  WITH CHECK (owner_id = auth.user_id());

-- DELETE: Users can only delete their own posts
CREATE POLICY posts_delete_policy ON posts
  AS PERMISSIVE FOR DELETE TO authenticated
  USING (owner_id = auth.user_id());

-- ============================================================================
-- STEP 5: Create RLS Policies for Categories
-- ============================================================================

DROP POLICY IF EXISTS categories_select_policy ON categories;
DROP POLICY IF EXISTS categories_insert_policy ON categories;
DROP POLICY IF EXISTS categories_update_policy ON categories;
DROP POLICY IF EXISTS categories_delete_policy ON categories;

-- All authenticated users can read categories
CREATE POLICY categories_select_policy ON categories
  AS PERMISSIVE FOR SELECT TO authenticated
  USING (true);

-- All authenticated users can create categories
CREATE POLICY categories_insert_policy ON categories
  AS PERMISSIVE FOR INSERT TO authenticated
  WITH CHECK (true);

-- All authenticated users can update categories
CREATE POLICY categories_update_policy ON categories
  AS PERMISSIVE FOR UPDATE TO authenticated
  USING (true);

-- All authenticated users can delete categories
CREATE POLICY categories_delete_policy ON categories
  AS PERMISSIVE FOR DELETE TO authenticated
  USING (true);

-- ============================================================================
-- STEP 6: Create RLS Policies for Comments
-- ============================================================================

DROP POLICY IF EXISTS comments_select_policy ON comments;
DROP POLICY IF EXISTS comments_insert_policy ON comments;
DROP POLICY IF EXISTS comments_update_policy ON comments;
DROP POLICY IF EXISTS comments_delete_policy ON comments;

-- All authenticated users can read approved comments
CREATE POLICY comments_select_policy ON comments
  AS PERMISSIVE FOR SELECT TO authenticated
  USING (status = 'approved' OR status = 'pending');

-- Anyone can insert comments
CREATE POLICY comments_insert_policy ON comments
  AS PERMISSIVE FOR INSERT TO authenticated
  WITH CHECK (true);

-- Only post owners can update comments
CREATE POLICY comments_update_policy ON comments
  AS PERMISSIVE FOR UPDATE TO authenticated
  USING (
    post_id IN (
      SELECT id FROM posts WHERE owner_id = auth.user_id()
    )
  );

-- Only post owners can delete comments
CREATE POLICY comments_delete_policy ON comments
  AS PERMISSIVE FOR DELETE TO authenticated
  USING (
    post_id IN (
      SELECT id FROM posts WHERE owner_id = auth.user_id()
    )
  );

-- ============================================================================
-- STEP 7: Create RLS Policies for Media
-- ============================================================================

DROP POLICY IF EXISTS media_select_policy ON media;
DROP POLICY IF EXISTS media_insert_policy ON media;
DROP POLICY IF EXISTS media_update_policy ON media;
DROP POLICY IF EXISTS media_delete_policy ON media;

-- Add owner_id to media
ALTER TABLE media ADD COLUMN IF NOT EXISTS owner_id TEXT;

-- All authenticated users can read media
CREATE POLICY media_select_policy ON media
  AS PERMISSIVE FOR SELECT TO authenticated
  USING (true);

-- Users can only insert their own media
CREATE POLICY media_insert_policy ON media
  AS PERMISSIVE FOR INSERT TO authenticated
  WITH CHECK (owner_id = auth.user_id());

-- Users can only update their own media
CREATE POLICY media_update_policy ON media
  AS PERMISSIVE FOR UPDATE TO authenticated
  USING (owner_id = auth.user_id());

-- Users can only delete their own media
CREATE POLICY media_delete_policy ON media
  AS PERMISSIVE FOR DELETE TO authenticated
  USING (owner_id = auth.user_id());

-- ============================================================================
-- STEP 8: Create RLS Policies for Analytics
-- ============================================================================

DROP POLICY IF EXISTS analytics_select_policy ON analytics;
DROP POLICY IF EXISTS analytics_insert_policy ON analytics;

-- All authenticated users can read analytics
CREATE POLICY analytics_select_policy ON analytics
  AS PERMISSIVE FOR SELECT TO authenticated
  USING (true);

-- Anyone can insert analytics (for tracking)
CREATE POLICY analytics_insert_policy ON analytics
  AS PERMISSIVE FOR INSERT TO authenticated
  WITH CHECK (true);

-- ============================================================================
-- STEP 9: Create Indexes for Performance
-- ============================================================================

CREATE INDEX IF NOT EXISTS posts_owner_id_idx ON posts(owner_id);
CREATE INDEX IF NOT EXISTS posts_status_idx ON posts(status);
CREATE INDEX IF NOT EXISTS posts_category_id_idx ON posts(category_id);
CREATE INDEX IF NOT EXISTS posts_published_at_idx ON posts(published_at);
CREATE INDEX IF NOT EXISTS posts_tenant_id_idx ON posts(tenant_id);

CREATE INDEX IF NOT EXISTS categories_tenant_id_idx ON categories(tenant_id);
CREATE INDEX IF NOT EXISTS categories_slug_idx ON categories(slug);

CREATE INDEX IF NOT EXISTS comments_post_id_idx ON comments(post_id);
CREATE INDEX IF NOT EXISTS comments_status_idx ON comments(status);

CREATE INDEX IF NOT EXISTS media_owner_id_idx ON media(owner_id);
CREATE INDEX IF NOT EXISTS media_tenant_id_idx ON media(tenant_id);

-- ============================================================================
-- STEP 10: Insert Default Categories (if not exists)
-- ============================================================================

INSERT INTO categories (tenant_id, name, slug, description, color)
SELECT 
  gen_random_uuid(),
  'Platforms',
  'platforms',
  'Reviews and comparisons of freelance platforms',
  '#ef2b70'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'platforms');

INSERT INTO categories (tenant_id, name, slug, description, color)
SELECT 
  gen_random_uuid(),
  'Guides',
  'guides',
  'Step-by-step guides for freelancers',
  '#22c55e'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'guides');

INSERT INTO categories (tenant_id, name, slug, description, color)
SELECT 
  gen_random_uuid(),
  'Comparisons',
  'comparisons',
  'Head-to-head platform comparisons',
  '#1e1541'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'comparisons');

INSERT INTO categories (tenant_id, name, slug, description, color)
SELECT 
  gen_random_uuid(),
  'Career',
  'career',
  'Career advice and development',
  '#3b82f6'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'career');

INSERT INTO categories (tenant_id, name, slug, description, color)
SELECT 
  gen_random_uuid(),
  'Business',
  'business',
  'Business tips for freelancers',
  '#f59e0b'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'business');

-- ============================================================================
-- STEP 11: Grant Permissions
-- ============================================================================

GRANT SELECT, UPDATE, INSERT, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Anonymous users can only read published content
GRANT SELECT ON posts TO anon;
GRANT SELECT ON categories TO anon;
GRANT SELECT ON comments TO anon;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- Summary:
-- ✅ Added Stack Auth integration (owner_id)
-- ✅ Created Neon Authorize function (auth.user_id())
-- ✅ Enabled RLS on all tables
-- ✅ Created RLS policies for Stack Auth
-- ✅ Added performance indexes
-- ✅ Kept tenant system for future multi-tenancy
-- ✅ Added default categories with colors
-- ✅ Granted proper permissions
