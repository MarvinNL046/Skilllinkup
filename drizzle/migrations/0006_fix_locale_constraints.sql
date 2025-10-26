-- Migration: Fix unique constraints for multi-locale support
-- Date: 2025-10-25
-- Purpose: Allow same slug/name for different locales
-- Author: Claude Code
-- Tables affected: platforms

-- Drop single-column unique constraints
ALTER TABLE platforms DROP CONSTRAINT IF EXISTS platforms_name_key;
ALTER TABLE platforms DROP CONSTRAINT IF EXISTS platforms_slug_key;

-- Add composite unique constraint on (slug, locale)
-- This allows same slug to exist for different languages
ALTER TABLE platforms ADD CONSTRAINT platforms_slug_locale_unique UNIQUE (slug, locale);

-- Add comment for documentation
COMMENT ON CONSTRAINT platforms_slug_locale_unique ON platforms IS
  'Ensures slug uniqueness within each locale (nl, en)';
