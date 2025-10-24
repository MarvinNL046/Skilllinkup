# Multi-Tenant Subdomain Architecture Plan

**Goal**: Separate freelancer platform from admin dashboard and main website using subdomains with multi-tenant Neon PostgreSQL database.

**Timeline**: 1-2 weeks setup + testing
**Architecture**: 3 separate Next.js apps sharing 1 Neon database

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Domain Structure](#domain-structure)
3. [Multi-Tenant Database Design](#multi-tenant-database-design)
4. [Application Setup](#application-setup)
5. [Authentication & Authorization](#authentication--authorization)
6. [Deployment Strategy](#deployment-strategy)
7. [Implementation Steps](#implementation-steps)
8. [Security Considerations](#security-considerations)

---

## Architecture Overview

### Current Structure
```
skilllinkup.com (Main website - Blog/Reviews)
  ↓
localhost:3002 (Admin Dashboard - Content Management)
```

### Proposed Structure (White-Label Multi-Tenant)
```
┌─────────────────────────────────────────────────────────────┐
│                    skilllinkup.com                          │
│              Main Website (Blog/Reviews)                     │
│                  Next.js App #1                             │
│                  Port 3000 (local)                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Shares Database
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   NEON PostgreSQL                           │
│                Multi-Tenant Database                        │
│            Row-Level Security (RLS) Enabled                 │
└─────────────────────────────────────────────────────────────┘
                            │
          ┌─────────────────┼─────────────────────────────────┐
          │                 │                                 │
          ↓                 ↓                                 ↓
┌──────────────────┐ ┌──────────────────────────┐  ┌─────────────────────┐
│ admin.           │ │ [username].              │  │ Wildcard Subdomain  │
│ skilllinkup.com  │ │ skilllinkup.com          │  │ Handler             │
│                  │ │                          │  │                     │
│ Master Admin     │ │ Dynamic Freelancer       │  │ youareawesome.      │
│ Dashboard        │ │ Profile + Dashboard      │  │ skilllinkup.com     │
│ (YOU)            │ │                          │  │                     │
│                  │ │ Public Profile +         │  │ janedoe.            │
│ Next.js App #2   │ │ Private Admin            │  │ skilllinkup.com     │
│ Port 3002        │ │                          │  │                     │
│                  │ │ Next.js App #3           │  │ johndeveloper.      │
│                  │ │ Port 3003                │  │ skilllinkup.com     │
│                  │ │                          │  │                     │
│                  │ │ Examples:                │  │ (etc.)              │
│                  │ │ - youareawesome          │  │                     │
│                  │ │ - janedoe                │  │ All served by       │
│                  │ │ - johndeveloper          │  │ same Next.js app    │
└──────────────────┘ └──────────────────────────┘  └─────────────────────┘
```

**Key Concept**:
- **Static subdomains**: `admin.skilllinkup.com` (your master admin)
- **Dynamic subdomains**: `*.skilllinkup.com` (each freelancer gets their own)
- **Same app serves all freelancer subdomains** with dynamic routing

---

## Domain Structure

### 1. Main Website (`skilllinkup.com`)
**Purpose**: Public-facing blog, platform reviews, SEO content
**Users**: Anonymous visitors, readers
**Tech Stack**: Next.js 15, Static Generation, ISR
**Deployment**: Netlify
**Port (local)**: 3000

**Features**:
- Blog posts
- Platform reviews
- Comparisons
- SEO landing pages
- Newsletter signup

**Database Access**:
- Read-only (posts, platforms, categories)
- No user authentication required
- Public data only

---

### 2. Admin Dashboard (`admin.skilllinkup.com`)
**Purpose**: Internal content management system
**Users**: Site admins, content editors
**Tech Stack**: Next.js 15, Server Components
**Deployment**: Netlify (separate site)
**Port (local)**: 3002

**Features**:
- Create/edit blog posts
- Manage platforms
- Moderate reviews
- User management
- Analytics dashboard

**Database Access**:
- Full read/write access
- Admin-only authentication
- Cross-tenant access (super admin)

---

### 3. Freelancer Portal (`[username].skilllinkup.com`)
**Purpose**: Individual freelancer websites (white-label)
**Users**: Registered freelancers + public visitors
**Tech Stack**: Next.js 15, Dynamic Routes, Cloudinary
**Deployment**: Netlify (single site, wildcard subdomain)
**Port (local)**: 3003

**How It Works**:
Each freelancer gets their own subdomain automatically:
- `youareawesome.skilllinkup.com` → Public profile + private dashboard
- `janedoe.skilllinkup.com` → Public profile + private dashboard
- `johndeveloper.skilllinkup.com` → Public profile + private dashboard

**URL Structure**:
```
youareawesome.skilllinkup.com/              → Public profile page
youareawesome.skilllinkup.com/portfolio     → Portfolio showcase
youareawesome.skilllinkup.com/contact       → Contact form
youareawesome.skilllinkup.com/admin         → Private dashboard (login required)
youareawesome.skilllinkup.com/admin/profile → Edit profile
youareawesome.skilllinkup.com/admin/portfolio → Manage portfolio
```

**Features**:

**Public Pages** (No login):
- Landing page with bio, skills, stats
- Portfolio showcase
- Contact form
- Reviews & testimonials
- Social links

**Private Dashboard** (`/admin` routes - login required):
- Edit profile (avatar, bio, skills)
- Portfolio management (CRUD projects)
- Upload images/videos (Cloudinary)
- View analytics (profile views, contact requests)
- Manage availability status

**Database Access**:
- Tenant lookup by subdomain
- Row-Level Security enforced
- Freelancer can only access their own tenant data
- Public visitors can view public data only

---

### 4. Client Portal (`client.skilllinkup.com`) - Future
**Purpose**: Clients hiring freelancers
**Users**: Companies, individuals hiring
**Tech Stack**: Next.js 15
**Deployment**: Netlify
**Port (local)**: 3004

**Features**:
- Post jobs
- Browse freelancers
- Hire & contract management
- Payment processing
- Project management

---

## Multi-Tenant Database Design

### Current Schema (Already has multi-tenancy!)
Your database already has multi-tenant structure with `tenant_id` on all tables:

```sql
-- Existing tables with tenant_id
tenants (id, name, domain, plan, max_users, created_at)
users (id, tenant_id, name, email, role)
posts (id, tenant_id, title, content)
platforms (id, tenant_id, name, slug)
categories (id, tenant_id, name)
```

### Enhanced Schema for Freelancer Platform

#### 1. Tenant Types
```sql
-- Add tenant_type to differentiate platform types
ALTER TABLE tenants ADD COLUMN tenant_type VARCHAR(50) DEFAULT 'blog';
-- Values: 'blog', 'freelancer_platform', 'enterprise'

-- Example tenants:
-- 1. 'skilllinkup-blog' (tenant_type: 'blog') → Main website content
-- 2. 'skilllinkup-freelance' (tenant_type: 'freelancer_platform') → Freelancer marketplace
```

#### 2. Freelancer Profiles
```sql
CREATE TABLE freelancer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Profile Info
  display_name VARCHAR(255) NOT NULL,
  tagline VARCHAR(500), -- "Full-Stack Developer | React & Node.js Expert"
  bio TEXT,
  avatar_url TEXT, -- Cloudinary URL
  cover_image_url TEXT, -- Cloudinary URL

  -- Professional Info
  hourly_rate DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'USD',
  years_experience INTEGER,
  skills JSONB DEFAULT '[]', -- ["React", "TypeScript", "Node.js"]
  languages JSONB DEFAULT '[]', -- [{"language": "English", "level": "Native"}]

  -- Availability
  availability_status VARCHAR(50) DEFAULT 'available', -- 'available', 'busy', 'unavailable'
  weekly_hours INTEGER, -- Hours available per week
  timezone VARCHAR(100),

  -- Stats & Verification
  total_jobs_completed INTEGER DEFAULT 0,
  total_earnings DECIMAL(12, 2) DEFAULT 0,
  average_rating DECIMAL(3, 2) DEFAULT 0,
  response_time_hours INTEGER, -- Average response time
  verified BOOLEAN DEFAULT FALSE,

  -- Social Links
  portfolio_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(tenant_id, user_id)
);

CREATE INDEX idx_freelancer_profiles_tenant_id ON freelancer_profiles(tenant_id);
CREATE INDEX idx_freelancer_profiles_user_id ON freelancer_profiles(user_id);
CREATE INDEX idx_freelancer_profiles_verified ON freelancer_profiles(verified);
```

#### 3. Portfolio Projects
```sql
CREATE TABLE portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  freelancer_profile_id UUID NOT NULL REFERENCES freelancer_profiles(id) ON DELETE CASCADE,

  -- Project Info
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100), -- "Web Development", "Mobile App", "Design"

  -- Media
  featured_image_url TEXT, -- Cloudinary URL
  video_url TEXT, -- Cloudinary video URL
  live_url TEXT, -- External project link

  -- Metadata
  completion_date DATE,
  client_name VARCHAR(255),
  technologies JSONB DEFAULT '[]', -- ["React", "Next.js", "Tailwind"]

  -- Display Order
  order_index INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,

  -- Stats
  views_count INTEGER DEFAULT 0,
  likes_count INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_portfolio_projects_tenant_id ON portfolio_projects(tenant_id);
CREATE INDEX idx_portfolio_projects_freelancer_id ON portfolio_projects(freelancer_profile_id);
CREATE INDEX idx_portfolio_projects_featured ON portfolio_projects(is_featured);
```

#### 4. Portfolio Images (Multiple images per project)
```sql
CREATE TABLE portfolio_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  portfolio_project_id UUID NOT NULL REFERENCES portfolio_projects(id) ON DELETE CASCADE,

  image_url TEXT NOT NULL, -- Cloudinary URL
  caption TEXT,
  order_index INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_portfolio_images_project_id ON portfolio_images(portfolio_project_id);
```

#### 5. Skills & Certifications
```sql
CREATE TABLE freelancer_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  freelancer_profile_id UUID NOT NULL REFERENCES freelancer_profiles(id) ON DELETE CASCADE,

  skill_name VARCHAR(100) NOT NULL,
  proficiency_level VARCHAR(50), -- 'Beginner', 'Intermediate', 'Expert'
  years_experience INTEGER,

  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(tenant_id, freelancer_profile_id, skill_name)
);

CREATE INDEX idx_freelancer_skills_profile_id ON freelancer_skills(freelancer_profile_id);

CREATE TABLE freelancer_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  freelancer_profile_id UUID NOT NULL REFERENCES freelancer_profiles(id) ON DELETE CASCADE,

  certification_name VARCHAR(255) NOT NULL,
  issuing_organization VARCHAR(255),
  issue_date DATE,
  expiry_date DATE,
  credential_id VARCHAR(255),
  credential_url TEXT,

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_certifications_profile_id ON freelancer_certifications(freelancer_profile_id);
```

#### 6. Jobs & Gigs (Future)
```sql
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  client_user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  budget_min DECIMAL(10, 2),
  budget_max DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'USD',

  job_type VARCHAR(50), -- 'fixed_price', 'hourly', 'contract'
  duration_weeks INTEGER,
  required_skills JSONB DEFAULT '[]',

  status VARCHAR(50) DEFAULT 'open', -- 'open', 'in_progress', 'completed', 'cancelled'

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_jobs_tenant_id ON jobs(tenant_id);
CREATE INDEX idx_jobs_status ON jobs(status);
```

---

## Row-Level Security (RLS) Policies

### Enable RLS
```sql
-- Enable RLS on all tenant-scoped tables
ALTER TABLE freelancer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancer_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancer_certifications ENABLE ROW LEVEL SECURITY;
```

### RLS Policies
```sql
-- Freelancers can only see/edit their own profile
CREATE POLICY "Freelancers can view own profile"
  ON freelancer_profiles
  FOR SELECT
  USING (user_id = current_user_id());

CREATE POLICY "Freelancers can update own profile"
  ON freelancer_profiles
  FOR UPDATE
  USING (user_id = current_user_id());

-- Public can view profiles (for browsing)
CREATE POLICY "Public can view verified profiles"
  ON freelancer_profiles
  FOR SELECT
  USING (verified = TRUE);

-- Portfolio projects (similar policies)
CREATE POLICY "Freelancers can manage own projects"
  ON portfolio_projects
  FOR ALL
  USING (
    freelancer_profile_id IN (
      SELECT id FROM freelancer_profiles WHERE user_id = current_user_id()
    )
  );

CREATE POLICY "Public can view portfolio projects"
  ON portfolio_projects
  FOR SELECT
  USING (TRUE); -- All projects are public
```

**Helper Function**:
```sql
CREATE OR REPLACE FUNCTION current_user_id()
RETURNS UUID AS $$
  SELECT current_setting('app.user_id', true)::UUID;
$$ LANGUAGE SQL STABLE;
```

**Usage in Next.js API**:
```typescript
// Set user context before queries
await db.execute(sql`SET app.user_id = ${userId}`);

// Now all queries respect RLS
const profile = await db.select().from(freelancerProfiles);
// Returns only user's own profile due to RLS
```

---

## Application Setup

### Directory Structure
```
/home/marvin/Documenten/
├── skillLinkup/                    # Main website (already exists)
│   ├── app/
│   ├── components/
│   ├── public/
│   └── package.json
│
├── skillLinkup-admin/              # Admin dashboard (already exists)
│   ├── app/
│   ├── components/
│   └── package.json
│
└── skillLinkup-freelance/          # NEW: Freelancer portal
    ├── app/
    │   ├── (auth)/
    │   │   ├── login/
    │   │   ├── register/
    │   │   └── layout.tsx
    │   ├── (dashboard)/
    │   │   ├── profile/
    │   │   ├── portfolio/
    │   │   ├── jobs/
    │   │   └── layout.tsx
    │   ├── api/
    │   │   ├── auth/
    │   │   ├── profile/
    │   │   └── portfolio/
    │   └── layout.tsx
    ├── components/
    │   ├── auth/
    │   ├── profile/
    │   └── portfolio/
    ├── lib/
    │   ├── auth.ts
    │   ├── db.ts (shared with other apps)
    │   └── queries.ts
    └── package.json
```

### Shared Database Configuration

**File**: `lib/db.ts` (Shared across all apps)

```typescript
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

// Same DATABASE_URL for all apps
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export { sql, db };
```

**Important**: All 3 apps use the **same Neon database** but access different data via:
1. `tenant_id` filtering
2. Row-Level Security policies
3. Different user roles

---

## Authentication & Authorization

### Stack Auth Integration (Already set up)

**Current Setup**:
- Main website: No auth needed (public)
- Admin dashboard: Stack Auth with admin roles

**New Setup**:
- **Freelancer Portal**: Stack Auth with freelancer roles

### User Roles
```typescript
type UserRole =
  | 'admin'           // Admin dashboard access
  | 'editor'          // Content editor (admin dashboard)
  | 'freelancer'      // Freelancer portal access
  | 'client'          // Client portal access (future)
  | 'user';           // Regular user (blog comments, etc.)
```

### Tenant Assignment on Registration

**File**: `app/api/auth/register/route.ts` (Freelancer portal)

```typescript
import { db } from '@/lib/db';
import { users, freelancerProfiles, tenants } from '@/drizzle/schema';

export async function POST(request: Request) {
  const { email, password, name } = await request.json();

  // Get or create 'skilllinkup-freelance' tenant
  let tenant = await db.select()
    .from(tenants)
    .where(eq(tenants.domain, 'freelance.skilllinkup.com'))
    .limit(1);

  if (!tenant[0]) {
    tenant = await db.insert(tenants).values({
      name: 'SkillLinkup Freelance',
      domain: 'freelance.skilllinkup.com',
      tenantType: 'freelancer_platform'
    }).returning();
  }

  // Create user with Stack Auth
  const stackUser = await stackAuth.createUser({ email, password });

  // Create user in database with tenant_id
  const user = await db.insert(users).values({
    tenantId: tenant[0].id,
    stackAuthId: stackUser.id,
    name,
    email,
    role: 'freelancer'
  }).returning();

  // Create empty freelancer profile
  await db.insert(freelancerProfiles).values({
    tenantId: tenant[0].id,
    userId: user[0].id,
    displayName: name,
    verified: false
  });

  return NextResponse.json({ success: true });
}
```

### Protected Routes Middleware

**File**: `middleware.ts` (Freelancer portal)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const session = await getSession(request);

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Ensure user is a freelancer
    if (session.user.role !== 'freelancer') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};
```

---

## Deployment Strategy

### Netlify Configuration

#### Site 1: Main Website (`skilllinkup.com`)
**Already deployed** ✅

**Netlify Settings**:
- Site name: `skilllinkup`
- Domain: `skilllinkup.com`
- Build command: `npm run build`
- Publish directory: `.next`
- Environment variables: `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`, etc.

---

#### Site 2: Admin Dashboard (`admin.skilllinkup.com`)
**To deploy**:

**Steps**:
1. Go to Netlify Dashboard → New site from Git
2. Connect GitHub repo: `skillLinkup-admin`
3. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Base directory: `/` (or leave empty)
4. Add custom domain: `admin.skilllinkup.com`
5. Environment variables:
   ```
   DATABASE_URL=postgresql://...
   NEXT_PUBLIC_SITE_URL=https://admin.skilllinkup.com
   STACK_AUTH_PROJECT_ID=...
   STACK_AUTH_SECRET_KEY=...
   ```

**DNS Setup**:
```
Type: CNAME
Name: admin
Value: [netlify-site-name].netlify.app
```

---

#### Site 3: Freelancer Portal (`freelance.skilllinkup.com`)
**To deploy**:

**Steps**:
1. Create new repo: `skillLinkup-freelance`
2. Netlify → New site from Git
3. Configure:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add custom domain: `freelance.skilllinkup.com`
5. Environment variables:
   ```
   DATABASE_URL=postgresql://... (SAME as other sites)
   NEXT_PUBLIC_SITE_URL=https://freelance.skilllinkup.com
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=...
   STACK_AUTH_PROJECT_ID=...
   STACK_AUTH_SECRET_KEY=...
   ```

**DNS Setup**:
```
Type: CNAME
Name: freelance
Value: [netlify-site-name].netlify.app
```

---

### Local Development

**Port Assignments**:
```bash
# Main Website
cd /home/marvin/Documenten/skillLinkup
npm run dev  # Port 3000

# Admin Dashboard
cd /home/marvin/Documenten/skillLinkup-admin
npm run dev  # Port 3002

# Freelancer Portal (NEW)
cd /home/marvin/Documenten/skillLinkup-freelance
npm run dev  # Port 3003
```

**Start All at Once**:
```bash
# Create start-all.sh script
#!/bin/bash
cd /home/marvin/Documenten/skillLinkup && npm run dev &
cd /home/marvin/Documenten/skillLinkup-admin && npm run dev &
cd /home/marvin/Documenten/skillLinkup-freelance && npm run dev &
wait
```

---

## Implementation Steps

### Phase 1: Database Setup (Day 1-2)

**Step 1.1: Create New Tables**
```bash
cd /home/marvin/Documenten/skillLinkup
npx drizzle-kit generate:pg --schema=./drizzle/schema.ts
npm run db:migrate
```

**Step 1.2: Create Freelancer Tenant**
```sql
INSERT INTO tenants (name, domain, tenant_type, plan, max_users)
VALUES (
  'SkillLinkup Freelance',
  'freelance.skilllinkup.com',
  'freelancer_platform',
  'unlimited',
  10000
);
```

**Step 1.3: Enable RLS**
```sql
-- Run RLS policies from earlier section
-- Test with sample data
```

---

### Phase 2: Freelancer Portal Setup (Day 3-5)

**Step 2.1: Create New Next.js App**
```bash
cd /home/marvin/Documenten
npx create-next-app@latest skillLinkup-freelance --typescript --tailwind --app
cd skillLinkup-freelance
npm install @neondatabase/serverless drizzle-orm
npm install cloudinary-react cloudinary
```

**Step 2.2: Configure Environment**
```bash
# Copy .env.local from skillLinkup
cp ../skillLinkup/.env.local ./.env.local

# Update NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_SITE_URL=http://localhost:3003
```

**Step 2.3: Set up Shared Database**
```typescript
// Symlink or copy lib/db.ts from main app
ln -s ../skillLinkup/lib/db.ts ./lib/db.ts
ln -s ../skillLinkup/drizzle ./drizzle
```

---

### Phase 3: Authentication (Day 6-7)

**Step 3.1: Set up Stack Auth**
- Configure Stack Auth project
- Add `freelance.skilllinkup.com` to allowed domains
- Implement login/register pages

**Step 3.2: Implement Protected Routes**
- Create middleware
- Add role-based access control
- Test authentication flow

---

### Phase 4: Core Features (Day 8-12)

**Day 8-9: Profile Management**
- Build profile creation form
- Implement avatar upload (Cloudinary)
- Skills & certifications CRUD

**Day 10-11: Portfolio System**
- Portfolio project CRUD
- Multi-image upload
- Video upload support

**Day 12: Public Profile Pages**
- SEO-friendly freelancer profiles
- Portfolio showcase
- Share links

---

### Phase 5: Deployment (Day 13-14)

**Step 5.1: Create Git Repository**
```bash
cd /home/marvin/Documenten/skillLinkup-freelance
git init
git add .
git commit -m "feat: Initial freelancer portal setup"
git remote add origin https://github.com/MarvinNL046/skillLinkup-freelance.git
git push -u origin main
```

**Step 5.2: Deploy to Netlify**
- Follow deployment steps from earlier section
- Configure DNS
- Test production environment

**Step 5.3: Verify Multi-Tenant Setup**
- Test data isolation between tenants
- Verify RLS policies work
- Check cross-subdomain functionality

---

## Security Considerations

### 1. Tenant Isolation

**CRITICAL**: Always filter by `tenant_id` in queries

```typescript
// ❌ WRONG - No tenant filtering
const profiles = await db.select().from(freelancerProfiles);

// ✅ CORRECT - Tenant-scoped query
const tenantId = await getTenantId('freelance.skilllinkup.com');
const profiles = await db.select()
  .from(freelancerProfiles)
  .where(eq(freelancerProfiles.tenantId, tenantId));
```

**Helper Function**:
```typescript
export async function getTenantId(domain: string): Promise<string> {
  const tenant = await db.select()
    .from(tenants)
    .where(eq(tenants.domain, domain))
    .limit(1);

  if (!tenant[0]) {
    throw new Error(`Tenant not found for domain: ${domain}`);
  }

  return tenant[0].id;
}
```

### 2. Row-Level Security (RLS)

**Always set user context** before queries:

```typescript
// In API routes
export async function GET(request: Request) {
  const session = await getSession(request);

  // Set RLS context
  await db.execute(sql`SET app.user_id = ${session.user.id}`);

  // Now queries respect RLS
  const profile = await db.select().from(freelancerProfiles);
}
```

### 3. CORS & Cross-Subdomain Security

**Configure CORS headers**:

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Allow requests from other SkillLinkup subdomains
  const allowedOrigins = [
    'https://skilllinkup.com',
    'https://admin.skilllinkup.com',
    'https://freelance.skilllinkup.com'
  ];

  const origin = request.headers.get('origin');
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  return response;
}
```

### 4. API Rate Limiting

**Prevent abuse**:

```typescript
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 h') // 100 requests per hour
});

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  return NextResponse.next();
}
```

---

## Cost Analysis

### Infrastructure Costs

| Service | Current | With Freelancer Portal | Notes |
|---------|---------|------------------------|-------|
| **Neon Database** | Free tier | Free tier → Pro ($19/mo) | Shared across all apps |
| **Netlify Hosting** | Free tier | 3 sites × Free tier | Or Pro $19/mo for better bandwidth |
| **Cloudinary** | $0 | Free tier → Plus ($89/mo) | For user uploads |
| **Stack Auth** | Free tier | Free tier → Startup ($29/mo) | For authentication |
| **Domain** | ~$15/year | +$0 (subdomains free) | Same domain |
| **Total** | ~$15/year | ~$136-156/month | Once platform grows |

**Free Tier Limits**:
- Neon: 10GB storage, 100 hours compute/month (sufficient for MVP)
- Netlify: 100GB bandwidth/month × 3 sites
- Cloudinary: 25GB storage, 25GB bandwidth/month
- Stack Auth: 1,000 MAU (Monthly Active Users)

**When to Upgrade**:
- Neon: >10GB data or >100 hours compute
- Netlify: >300GB total bandwidth across sites
- Cloudinary: >25GB user uploads or >25GB bandwidth
- Stack Auth: >1,000 monthly active users

---

## Success Metrics

### Technical Metrics
- ✅ **Data Isolation**: 100% tenant-scoped queries with RLS
- ✅ **Performance**: <200ms API response times
- ✅ **Uptime**: >99.9% across all subdomains
- ✅ **Security**: Zero tenant data leakage

### User Metrics
- ✅ **Freelancer Registrations**: Track sign-ups
- ✅ **Profile Completion Rate**: % of complete profiles
- ✅ **Portfolio Projects**: Average per freelancer
- ✅ **Session Duration**: Time spent on platform

### Business Metrics
- ✅ **Conversion Rate**: Visitor → Registered Freelancer
- ✅ **Monthly Active Users**: Track engagement
- ✅ **Job Postings**: Track marketplace activity (future)

---

## Next Steps

1. **Review this architecture plan**
2. **Create database migrations** for new tables
3. **Set up freelancer portal** Next.js app
4. **Implement authentication** with Stack Auth
5. **Build core features** (profile, portfolio)
6. **Deploy to Netlify** with subdomain
7. **Test multi-tenant isolation**
8. **Launch MVP** 🚀

---

## Resources

- [Neon Multi-Tenant Guide](https://neon.tech/docs/guides/multitenant-applications)
- [Row-Level Security (RLS)](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [Netlify Subdomain Setup](https://docs.netlify.com/domains-https/custom-domains/)
- [Stack Auth Multi-Tenant](https://docs.stack-auth.com/)
- [Cloudinary Next.js Guide](https://cloudinary.com/documentation/react_integration)

---

**Questions?** Ready to build the freelancer platform! 🚀
