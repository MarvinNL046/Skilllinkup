-- Migration 0012: Add geo coordinates to freelancer_profiles
-- Purpose: Enable location-based distance search using Haversine formula
-- Created: 2026-02-23
-- Depends on: 0010_marketplace_foundation.sql (freelancer_profiles table)

ALTER TABLE freelancer_profiles ADD COLUMN IF NOT EXISTS latitude DECIMAL(10,7);
ALTER TABLE freelancer_profiles ADD COLUMN IF NOT EXISTS longitude DECIMAL(10,7);
CREATE INDEX IF NOT EXISTS idx_fp_geo ON freelancer_profiles(latitude, longitude) WHERE latitude IS NOT NULL
