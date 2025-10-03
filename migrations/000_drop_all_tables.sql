-- Drop All Tables Migration
-- WARNING: This will delete all data!

-- Drop tables in correct order (respecting foreign keys)
DROP TABLE IF EXISTS analytics CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS media CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tenants CASCADE;

-- Drop any existing functions
DROP FUNCTION IF EXISTS auth.user_id() CASCADE;

-- Success message
SELECT 'All tables dropped successfully!' as status;
