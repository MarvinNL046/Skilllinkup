-- Migration: Add locale column for internationalization
-- Date: 2025-10-25
-- Purpose: Support multi-language content (NL, EN)
-- Author: Claude Code
-- Tables affected: platforms, posts, categories

-- Add locale column to platforms
ALTER TABLE platforms ADD COLUMN IF NOT EXISTS locale VARCHAR(5) DEFAULT 'nl';
CREATE INDEX IF NOT EXISTS idx_platforms_locale ON platforms(locale);
UPDATE platforms SET locale = 'nl' WHERE locale IS NULL;

-- Add locale column to posts
ALTER TABLE posts ADD COLUMN IF NOT EXISTS locale VARCHAR(5) DEFAULT 'nl';
CREATE INDEX IF NOT EXISTS idx_posts_locale ON posts(locale);
UPDATE posts SET locale = 'nl' WHERE locale IS NULL;

-- Add locale column to categories
ALTER TABLE categories ADD COLUMN IF NOT EXISTS locale VARCHAR(5) DEFAULT 'nl';
CREATE INDEX IF NOT EXISTS idx_categories_locale ON categories(locale);
UPDATE categories SET locale = 'nl' WHERE locale IS NULL;

-- Add comments for documentation
COMMENT ON COLUMN platforms.locale IS 'Content locale: nl (Dutch), en (English)';
COMMENT ON COLUMN posts.locale IS 'Content locale: nl (Dutch), en (English)';
COMMENT ON COLUMN categories.locale IS 'Content locale: nl (Dutch), en (English)';
