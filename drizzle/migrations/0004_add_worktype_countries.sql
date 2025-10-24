-- Migration: Add Work Type and Countries to Platforms Table
-- Date: 2025-10-24
-- Purpose: Enable filtering by remote/local work and country/region

-- Add work type field (remote, local, hybrid)
ALTER TABLE platforms ADD COLUMN IF NOT EXISTS work_type VARCHAR(50) DEFAULT 'remote';

-- Add countries array field
ALTER TABLE platforms ADD COLUMN IF NOT EXISTS countries TEXT[];

-- Add comments for documentation
COMMENT ON COLUMN platforms.work_type IS 'Type of work: remote, local, hybrid';
COMMENT ON COLUMN platforms.countries IS 'Array of country codes (ISO 3166-1 alpha-2), e.g., ["NL", "BE"], or ["Worldwide"] for remote';

-- Create indexes for filtering
CREATE INDEX IF NOT EXISTS idx_platforms_work_type ON platforms(work_type);
CREATE INDEX IF NOT EXISTS idx_platforms_countries ON platforms USING GIN(countries);

-- Set default values for existing records
UPDATE platforms SET work_type = 'remote' WHERE work_type IS NULL;
UPDATE platforms SET countries = ARRAY['Worldwide']::TEXT[] WHERE countries IS NULL AND work_type = 'remote';
