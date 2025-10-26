-- Migration 0007: Add locale support to tools table
-- This enables tools to have language-specific versions (en, nl)

-- Add locale column to tools table
ALTER TABLE tools ADD COLUMN locale VARCHAR(5) DEFAULT 'en';

-- Add index for locale queries (improves query performance)
CREATE INDEX idx_tools_locale ON tools(locale);

-- Add unique constraint for slug + locale combination
-- This allows same slug for different locales (e.g., time-tracker for both en and nl)
ALTER TABLE tools ADD CONSTRAINT tools_slug_locale_unique UNIQUE (slug, locale);

-- Update existing tools to have 'en' locale explicitly
UPDATE tools SET locale = 'en' WHERE locale IS NULL OR locale = '';

-- Make locale NOT NULL after setting defaults
ALTER TABLE tools ALTER COLUMN locale SET NOT NULL;
