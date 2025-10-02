# Quick Neon Database Setup (Bypass Netlify Integration Issue)

## Problem
Netlify's Neon integration heeft een org_id error. We maken de database direct in Neon aan.

## Solution: Direct Neon Setup

### Step 1: Create Neon Project
1. **Open**: https://console.neon.tech
2. **Login**: marvinsmit1988@gmail.com
3. **Click**: "New Project" button (top right)

### Step 2: Project Configuration
Fill in:
- **Name**: `skilllinkup`
- **Region**: Europe (Frankfurt) - `aws-eu-central-1` of `aws-eu-west-1`
- **Postgres Version**: 16 (latest)
- **Compute size**: Autoscaling (default free tier)

Click: **"Create Project"**

### Step 3: Get Connection String
Na aanmaken zie je direct:

```
Connection Details
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Database: neondb
Role: [username]
Host: ep-xxxx-xxxx.eu-central-1.aws.neon.tech
Connection string:
postgresql://[user]:[password]@ep-xxxx-xxxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

**Copy deze hele connection string!**

### Step 4: Add to Local Environment

```bash
cd ~/Documenten/skillLinkup

# Create .env.local
cat > .env.local << 'EOF'
DATABASE_URL="postgresql://[PASTE_YOUR_CONNECTION_STRING_HERE]"
EOF
```

**Of handmatig**:
1. Create file: `.env.local` in project root
2. Add line: `DATABASE_URL="postgresql://..."`

### Step 5: Add to Netlify Environment Variables

**Option A: Via Netlify CLI**
```bash
cd ~/Documenten/skillLinkup
netlify env:set DATABASE_URL "postgresql://[YOUR_CONNECTION_STRING]"
```

**Option B: Via Netlify Dashboard**
1. Go to: https://app.netlify.com/sites/bejewelled-mousse-4b72ef/configuration/env
2. Click: "Add a variable"
3. Key: `DATABASE_URL`
4. Value: `postgresql://...` (your connection string)
5. Click: "Create variable"

### Step 6: Verify Installation

Check that everything is ready:
```bash
cd ~/Documenten/skillLinkup

# Check .env.local exists
cat .env.local

# Check Drizzle config
cat drizzle.config.ts

# Check schema
cat drizzle/schema.ts
```

### Step 7: Add Database Scripts to package.json

```bash
npm pkg set scripts.db:generate="drizzle-kit generate"
npm pkg set scripts.db:migrate="drizzle-kit migrate"
npm pkg set scripts.db:studio="drizzle-kit studio"
npm pkg set scripts.db:push="drizzle-kit push"
```

Or manually add to `package.json`:
```json
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio",
    "db:push": "drizzle-kit push"
  }
}
```

### Step 8: Generate and Run Migrations

```bash
# Generate migration files from schema
npm run db:generate

# Push schema to database (faster, for development)
npm run db:push
```

### Step 9: Verify Database

```bash
# Open Drizzle Studio (database GUI)
npm run db:studio
# Opens at https://local.drizzle.studio
```

## Expected Result

After setup you should have:
- ✅ Neon PostgreSQL database running
- ✅ DATABASE_URL in .env.local
- ✅ DATABASE_URL in Netlify env vars
- ✅ All tables created (tenants, users, posts, etc.)
- ✅ Drizzle Studio running

## Troubleshooting

### Issue: "Can't find .env.local"
```bash
# Make sure you're in project root
pwd  # Should show: /home/marvin/Documenten/skillLinkup

# Create .env.local
echo 'DATABASE_URL="postgresql://..."' > .env.local
```

### Issue: "drizzle-kit not found"
```bash
npm install -D drizzle-kit
```

### Issue: "Connection refused"
- Check connection string is correct
- Check Neon project is active (not paused)
- Check firewall/network

## Next Steps After Database Setup

1. ✅ Seed initial data (default tenant, categories)
2. ✅ Create database connection helper
3. ✅ Build CMS data fetching functions
4. ✅ Test multi-tenant isolation
5. ✅ Build authentication system

## Files Created

```
skillLinkup/
├── .env.local                    # Local environment variables
├── drizzle.config.ts            # Drizzle configuration
├── drizzle/
│   ├── schema.ts                # Multi-tenant database schema
│   └── migrations/              # Migration files (auto-generated)
└── package.json                 # Updated with db scripts
```

## Connection String Format

```
postgresql://[username]:[password]@[host]/[database]?sslmode=require

Example:
postgresql://neondb_owner:npg_AbCdEf123@ep-cool-tree-123456.eu-central-1.aws.neon.tech/neondb?sslmode=require
```

**Security Note**: Never commit .env.local to git! It's already in .gitignore.
