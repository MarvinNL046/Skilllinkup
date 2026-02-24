-- Migration 0015: Add last_active_at column to users table
-- Tracks when a user was last active (used for online status + email throttling)

ALTER TABLE users ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMP;
CREATE INDEX IF NOT EXISTS idx_users_last_active ON users(last_active_at);
