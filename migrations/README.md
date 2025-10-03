# Database Migrations - Fresh Start

## Quick Start (3 Steps)

### Step 1: Enable Neon Authorize
1. Go to: https://console.neon.tech
2. Select project: `neondb`
3. Go to: **Settings → Authentication**
4. Enable: **"Neon Authorize"**
5. Add JWKS URL:
   ```
   https://api.stack-auth.com/api/v1/projects/1d0ac907-f91b-455d-aca3-a63180b5c94f/.well-known/jwks.json
   ```
6. Click **Save**

### Step 2: Drop Old Tables
1. Open **SQL Editor** in Neon Console
2. Copy contents of: `migrations/000_drop_all_tables.sql`
3. Paste and click **Run**
4. Wait for confirmation

### Step 3: Create Fresh Schema
1. In same **SQL Editor**
2. Copy contents of: `migrations/001_fresh_stack_auth_schema.sql`
3. Paste and click **Run**
4. Wait for all statements to complete (should see green checkmarks)

### Step 4: Verify
```bash
cd /home/marvin/Documenten/skillLinkup-admin
./run-check.sh
```

You should see:
- ✅ 5 tables (posts, categories, comments, media, analytics)
- ✅ 14 RLS policies
- ✅ 5 default categories

## What's Included

### Tables
- **posts** - Blog posts with owner_id for Stack Auth
- **categories** - Categories with colors
- **comments** - Comments linked to posts
- **media** - File uploads with owner_id
- **analytics** - Event tracking

### Security (RLS Policies)
- ✅ Users can only manage their own posts
- ✅ Users can only manage their own media
- ✅ Post owners can moderate comments
- ✅ All users can read published content
- ✅ Anonymous users can read public content

### Features
- ✅ Stack Auth JWT validation (`auth.user_id()`)
- ✅ Default categories with colors
- ✅ Performance indexes
- ✅ Proper foreign keys and cascades

## No More Tenant System

The old multi-tenant architecture has been removed. This is now a single-tenant system designed for SkillLinkup only. Much simpler and cleaner!

## Troubleshooting

### "Permission denied"
- Make sure DATABASE_URL uses the owner role: `neondb_owner`

### "Already exists" errors
- Run `000_drop_all_tables.sql` first to clean everything

### "RLS policies not found"
- Make sure you enabled Neon Authorize in Step 1
- Re-run `001_fresh_stack_auth_schema.sql`

## Next Steps

After migrations are complete:

1. ✅ Test database connection: `./run-check.sh`
2. 🔄 Update admin pages to use real data (Claude will do this)
3. 🧪 Test creating posts as authenticated user
4. 🎨 Test categories and media uploads

## Files

- `000_drop_all_tables.sql` - Drops all existing tables (fresh start)
- `001_fresh_stack_auth_schema.sql` - Creates complete Stack Auth schema
- `002_stack_auth_integration.sql` - (OLD - not needed anymore)
