# Neon Database Setup for SkillLinkup

## Option A: Via Netlify CLI (Recommended)

### Step 1: Login to Netlify
```bash
cd ~/Documenten/skillLinkup
netlify login
```

### Step 2: Initialize Database
```bash
npx netlify db init
```

When prompted:
- "Set up Drizzle boilerplate?" → **Y**

This will:
- ✅ Create Neon PostgreSQL database
- ✅ Install Drizzle ORM
- ✅ Configure Drizzle Studio
- ✅ Set DATABASE_URL environment variable

## Option B: Manual Neon Setup (If CLI fails)

### Step 1: Create Neon Account
1. Go to https://neon.tech
2. Sign up with GitHub (marvinsmit1988@gmail.com)
3. Create new project: "skilllinkup"

### Step 2: Get Connection String
1. In Neon dashboard → Project → Connection Details
2. Copy the connection string (PostgreSQL)
3. Format: `postgresql://user:password@host/database?sslmode=require`

### Step 3: Add to Netlify Environment Variables
```bash
# Via Netlify CLI
netlify env:set DATABASE_URL "postgresql://user:password@host/database?sslmode=require"

# Or via Netlify Dashboard:
# Site Settings → Environment Variables → Add variable
# Key: DATABASE_URL
# Value: [your connection string]
```

### Step 4: Install Drizzle ORM Manually
```bash
cd ~/Documenten/skillLinkup
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit
```

### Step 5: Create Drizzle Config
```bash
# drizzle.config.ts will be created in next step
```

## Post-Setup: Multi-Tenant Schema

After database is initialized, we'll:

1. **Create Schema** (from MULTI_TENANT_ARCHITECTURE.md):
   - tenants table
   - users table
   - posts table
   - categories table
   - etc.

2. **Enable Row-Level Security (RLS)**:
   ```sql
   ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
   CREATE POLICY tenant_isolation ON posts
     USING (tenant_id = current_setting('app.tenant_id')::UUID);
   ```

3. **Run Migrations**:
   ```bash
   npm run db:generate  # Generate migrations
   npm run db:migrate   # Apply migrations
   ```

4. **Seed Initial Data**:
   - Default tenant
   - Sample posts
   - Categories

## Environment Variables Needed

### Local Development (.env.local)
```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."  # For migrations
```

### Netlify Production
Set via Netlify Dashboard or CLI:
```bash
netlify env:set DATABASE_URL "postgresql://..."
netlify env:set DIRECT_URL "postgresql://..."
```

## Drizzle Studio (Database GUI)

Once Drizzle is set up:
```bash
npm run db:studio
# Opens at https://local.drizzle.studio
```

## Current Status

- ✅ Netlify project linked (bejewelled-mousse-4b72ef)
- ✅ Domain configured (skilllinkup.com)
- ⏳ Database initialization needed

## Next Steps

**Choose one approach:**

### If Netlify CLI works:
```bash
netlify login  # If not already logged in
npx netlify db init
```

### If manual setup needed:
1. Create Neon account at https://neon.tech
2. Get connection string
3. Add to Netlify env vars
4. Install Drizzle manually
5. Create schema

**Then:**
- Implement multi-tenant schema
- Run migrations
- Test database connection
- Build CMS features
