-- Migration: Add Affiliate Fields to Platforms Table
-- Date: 2025-10-15
-- Purpose: Add fields for automated blog post generation (Adam Enfroy style)

-- Add affiliate tracking and automation fields
ALTER TABLE platforms ADD COLUMN IF NOT EXISTS affiliate_link VARCHAR(500);
ALTER TABLE platforms ADD COLUMN IF NOT EXISTS commission_type VARCHAR(50);
ALTER TABLE platforms ADD COLUMN IF NOT EXISTS commission_value VARCHAR(100);
ALTER TABLE platforms ADD COLUMN IF NOT EXISTS cookie_duration INTEGER;
ALTER TABLE platforms ADD COLUMN IF NOT EXISTS avg_affiliate_earnings DECIMAL(10,2);
ALTER TABLE platforms ADD COLUMN IF NOT EXISTS unique_benefits TEXT[];
ALTER TABLE platforms ADD COLUMN IF NOT EXISTS automation_status VARCHAR(50) DEFAULT 'pending';

-- Add comments for documentation
COMMENT ON COLUMN platforms.affiliate_link IS 'Short.io link (e.g., go.skilllinkup.com/upwork)';
COMMENT ON COLUMN platforms.commission_type IS 'Type: percentage, fixed, recurring, cpa';
COMMENT ON COLUMN platforms.commission_value IS 'Human-readable (e.g., "30%", "$150", "$50 recurring")';
COMMENT ON COLUMN platforms.cookie_duration IS 'Cookie duration in days';
COMMENT ON COLUMN platforms.avg_affiliate_earnings IS 'Average earnings per year per customer';
COMMENT ON COLUMN platforms.unique_benefits IS 'Array of unique selling points for affiliates';
COMMENT ON COLUMN platforms.automation_status IS 'Status: pending, in-progress, published, failed';

-- Create index for automation filtering
CREATE INDEX IF NOT EXISTS idx_platforms_automation_status ON platforms(automation_status);
CREATE INDEX IF NOT EXISTS idx_platforms_affiliate_link ON platforms(affiliate_link);
