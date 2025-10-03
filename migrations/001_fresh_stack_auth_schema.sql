-- Fresh Schema for Stack Auth Integration
-- This is a clean slate designed specifically for Stack Auth

-- ============================================================================
-- STEP 1: Enable Extensions
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- STEP 2: Create Neon Authorize Function
-- ============================================================================

CREATE OR REPLACE FUNCTION auth.user_id() RETURNS TEXT AS $$
  SELECT NULLIF(
    current_setting('request.jwt.claims', true)::json->>'sub',
    ''
  )::text;
$$ LANGUAGE SQL STABLE;

-- ============================================================================
-- STEP 3: Create Categories Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#ef2b70',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- STEP 4: Create Posts Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  featured_image TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  views INTEGER DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- ============================================================================
-- STEP 5: Create Comments Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'spam')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- STEP 6: Create Media Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  alt_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- STEP 7: Create Analytics Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  event TEXT NOT NULL,
  session_id TEXT,
  user_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- STEP 8: Enable Row Level Security
-- ============================================================================

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- STEP 9: Create RLS Policies for Posts
-- ============================================================================

-- SELECT: Users can see their own posts OR published posts
CREATE POLICY posts_select_policy ON posts
  FOR SELECT
  TO authenticated
  USING (owner_id = auth.user_id() OR status = 'published');

-- INSERT: Users can only create their own posts
CREATE POLICY posts_insert_policy ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (owner_id = auth.user_id());

-- UPDATE: Users can only update their own posts
CREATE POLICY posts_update_policy ON posts
  FOR UPDATE
  TO authenticated
  USING (owner_id = auth.user_id())
  WITH CHECK (owner_id = auth.user_id());

-- DELETE: Users can only delete their own posts
CREATE POLICY posts_delete_policy ON posts
  FOR DELETE
  TO authenticated
  USING (owner_id = auth.user_id());

-- ============================================================================
-- STEP 10: Create RLS Policies for Categories
-- ============================================================================

-- All authenticated users can read categories
CREATE POLICY categories_select_policy ON categories
  FOR SELECT
  TO authenticated
  USING (true);

-- All authenticated users can create categories
CREATE POLICY categories_insert_policy ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- All authenticated users can update categories
CREATE POLICY categories_update_policy ON categories
  FOR UPDATE
  TO authenticated
  USING (true);

-- All authenticated users can delete categories
CREATE POLICY categories_delete_policy ON categories
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================================
-- STEP 11: Create RLS Policies for Comments
-- ============================================================================

-- All users can read approved comments
CREATE POLICY comments_select_policy ON comments
  FOR SELECT
  TO authenticated
  USING (status = 'approved' OR status = 'pending');

-- Anyone can insert comments
CREATE POLICY comments_insert_policy ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only post owners can update/moderate comments
CREATE POLICY comments_update_policy ON comments
  FOR UPDATE
  TO authenticated
  USING (
    post_id IN (
      SELECT id FROM posts WHERE owner_id = auth.user_id()
    )
  );

-- Only post owners can delete comments
CREATE POLICY comments_delete_policy ON comments
  FOR DELETE
  TO authenticated
  USING (
    post_id IN (
      SELECT id FROM posts WHERE owner_id = auth.user_id()
    )
  );

-- ============================================================================
-- STEP 12: Create RLS Policies for Media
-- ============================================================================

-- All users can read media
CREATE POLICY media_select_policy ON media
  FOR SELECT
  TO authenticated
  USING (true);

-- Users can only upload their own media
CREATE POLICY media_insert_policy ON media
  FOR INSERT
  TO authenticated
  WITH CHECK (owner_id = auth.user_id());

-- Users can only update their own media
CREATE POLICY media_update_policy ON media
  FOR UPDATE
  TO authenticated
  USING (owner_id = auth.user_id());

-- Users can only delete their own media
CREATE POLICY media_delete_policy ON media
  FOR DELETE
  TO authenticated
  USING (owner_id = auth.user_id());

-- ============================================================================
-- STEP 13: Create RLS Policies for Analytics
-- ============================================================================

-- All users can read analytics
CREATE POLICY analytics_select_policy ON analytics
  FOR SELECT
  TO authenticated
  USING (true);

-- Anyone can insert analytics events
CREATE POLICY analytics_insert_policy ON analytics
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- ============================================================================
-- STEP 14: Create Indexes
-- ============================================================================

CREATE INDEX posts_owner_id_idx ON posts(owner_id);
CREATE INDEX posts_status_idx ON posts(status);
CREATE INDEX posts_category_id_idx ON posts(category_id);
CREATE INDEX posts_slug_idx ON posts(slug);
CREATE INDEX posts_published_at_idx ON posts(published_at);

CREATE INDEX categories_slug_idx ON categories(slug);

CREATE INDEX comments_post_id_idx ON comments(post_id);
CREATE INDEX comments_status_idx ON comments(status);

CREATE INDEX media_owner_id_idx ON media(owner_id);

CREATE INDEX analytics_post_id_idx ON analytics(post_id);
CREATE INDEX analytics_created_at_idx ON analytics(created_at);

-- ============================================================================
-- STEP 15: Insert Default Categories
-- ============================================================================

INSERT INTO categories (name, slug, description, color) VALUES
  ('Platforms', 'platforms', 'Reviews and comparisons of freelance platforms', '#ef2b70'),
  ('Guides', 'guides', 'Step-by-step guides for freelancers', '#22c55e'),
  ('Comparisons', 'comparisons', 'Head-to-head platform comparisons', '#1e1541'),
  ('Career', 'career', 'Career advice and development', '#3b82f6'),
  ('Business', 'business', 'Business tips for freelancers', '#f59e0b')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- STEP 16: Grant Permissions
-- ============================================================================

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;

-- Anonymous users can read published content
GRANT SELECT ON posts TO anon;
GRANT SELECT ON categories TO anon;
GRANT SELECT ON comments TO anon;

-- ============================================================================
-- SUCCESS!
-- ============================================================================

SELECT 'Fresh Stack Auth schema created successfully!' as status;
