-- Migration: Add Marvin as default author and update posts table
-- Created: 2025-10-03

-- ============================================
-- 1. Add author_id column to posts table
-- ============================================
ALTER TABLE posts ADD COLUMN author_id UUID REFERENCES authors(id);

-- ============================================
-- 2. Insert Marvin as the default author
-- ============================================
INSERT INTO authors (
  id,
  name,
  email,
  bio,
  avatar,
  website,
  social_links
) VALUES (
  gen_random_uuid(),
  'Marvin',
  'info@staycoolairco.nl',
  'Freelance platform expert and founder of SkillLinkup. Helping freelancers find the best platforms for their skills.',
  '/images/posts/author/author-image-1.png',
  'https://skilllinkup.com',
  jsonb_build_object(
    'twitter', 'https://twitter.com/skilllinkup',
    'linkedin', 'https://linkedin.com/company/skilllinkup',
    'github', 'https://github.com/MarvinNL046'
  )
) ON CONFLICT (email) DO NOTHING;

-- ============================================
-- 3. Update existing posts to have Marvin as author
-- ============================================
UPDATE posts
SET author_id = (SELECT id FROM authors WHERE email = 'info@staycoolairco.nl' LIMIT 1)
WHERE author_id IS NULL;

-- ============================================
-- 4. Set default author for new posts
-- ============================================
ALTER TABLE posts
ALTER COLUMN author_id
SET DEFAULT (SELECT id FROM authors WHERE email = 'info@staycoolairco.nl' LIMIT 1);

-- ============================================
-- 5. Add index for better query performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ Author migration completed successfully!';
  RAISE NOTICE '📝 Marvin added as default author';
  RAISE NOTICE '🔗 Existing posts linked to Marvin';
END $$;
