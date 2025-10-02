# SkillLinkup Multi-Tenant Architecture

**Date:** October 2, 2025
**Version:** 1.0
**Author:** Development Team

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture Diagram](#architecture-diagram)
3. [Database Strategy](#database-strategy)
4. [Tenant Types](#tenant-types)
5. [Database Schema](#database-schema)
6. [Tenant Context & Middleware](#tenant-context--middleware)
7. [Implementation Guide](#implementation-guide)
8. [Quota & Billing System](#quota--billing-system)
9. [Tenant Customization](#tenant-customization)
10. [Security Considerations](#security-considerations)
11. [Deployment Guide](#deployment-guide)

---

## Overview

SkillLinkup is a **multi-tenant blog platform** where multiple publishers/organizations can host their own branded blog on shared infrastructure. Each tenant has:

- ✅ Own subdomain (e.g., `publisher1.skilllinkup.com`)
- ✅ Isolated content and data
- ✅ Own users and authors
- ✅ Custom branding and theme
- ✅ Usage quotas based on subscription plan

### Tech Stack

- **Frontend:** Next.js 15 (App Router)
- **Database:** Neon PostgreSQL (Serverless)
- **Authentication:** NextAuth.js
- **Hosting:** Netlify
- **Storage:** Cloudinary/S3 for media

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                  NEON PostgreSQL (Single DB)             │
│                  Row-Level Isolation                     │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  Tenant 1    │  │  Tenant 2    │  │  Tenant N    │ │
│  │  tenant_id=1 │  │  tenant_id=2 │  │  tenant_id=N │ │
│  │              │  │              │  │              │ │
│  │  - Posts     │  │  - Posts     │  │  - Posts     │ │
│  │  - Users     │  │  - Users     │  │  - Users     │ │
│  │  - Categories│  │  - Categories│  │  - Categories│ │
│  │  - Media     │  │  - Media     │  │  - Media     │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                            ▲
                            │
           ┌────────────────┼────────────────┐
           │                │                │
    ┌──────▼──────┐  ┌──────▼──────┐  ┌─────▼──────┐
    │ Publisher 1 │  │ Publisher 2 │  │ Publisher N│
    │  .skilllink │  │  .skilllink │  │ .skilllink │
    │   up.com    │  │   up.com    │  │   up.com   │
    └─────────────┘  └─────────────┘  └────────────┘
           │                │                │
    ┌──────▼──────┐  ┌──────▼──────┐  ┌─────▼──────┐
    │ CMS Portal  │  │ CMS Portal  │  │ CMS Portal │
    │ cms.pub1... │  │ cms.pub2... │  │ cms.pubN...│
    └─────────────┘  └─────────────┘  └────────────┘
```

### Subdomain Structure

**Public Sites:**
```
publisher1.skilllinkup.com   → Tenant: "publisher1"
techblog.skilllinkup.com     → Tenant: "techblog"
mynews.skilllinkup.com       → Tenant: "mynews"
```

**CMS Portals:**
```
cms.publisher1.skilllinkup.com
cms.techblog.skilllinkup.com
cms.mynews.skilllinkup.com
```

**Admin Portal:**
```
admin.skilllinkup.com        → Super Admin (cross-tenant)
```

---

## Database Strategy

### Selected Strategy: Row-Level Isolation (Single Database, Shared Schema)

**Why This Approach?**

1. ✅ **Cost-Effective** - Single Neon database (free tier friendly)
2. ✅ **Scalable** - Easy to add new tenants
3. ✅ **Maintainable** - Single schema, one migration system
4. ✅ **Analytics-Friendly** - Cross-tenant reporting possible
5. ✅ **Performance** - PostgreSQL Row-Level Security (RLS) is fast

**How It Works:**

- Every tenant-specific table has a `tenant_id` column
- All queries are automatically filtered by `tenant_id`
- PostgreSQL RLS enforces isolation at the database level
- Middleware sets tenant context from subdomain

### Alternative Strategies Considered

| Strategy | Pros | Cons | Cost |
|----------|------|------|------|
| **Row-Level Isolation** ⭐ | Cost-effective, simple, scalable | Risk of data leakage if misconfigured | $ |
| **Schema per Tenant** | Better isolation, no tenant_id in queries | Complex migrations, harder analytics | $$ |
| **Database per Tenant** | Perfect isolation, independent scaling | Expensive, complex management | $$$$ |

---

## Tenant Types

### 1. Subdomain-based Tenants (Primary)

```
publisher1.skilllinkup.com
techblog.skilllinkup.com
lifestyle.skilllinkup.com
```

**Detection:** Extract subdomain from `host` header

### 2. Custom Domain Tenants (Premium)

```
myblog.com           → Maps to tenant "publisher1"
technews.io          → Maps to tenant "techblog"
lifestylemagazine.nl → Maps to tenant "lifestyle"
```

**Detection:** Lookup `custom_domain` in tenants table

### 3. Path-based Tenants (Optional)

```
skilllinkup.com/publisher1/
skilllinkup.com/techblog/
```

**Note:** Not recommended, less professional

---

## Database Schema

### Core Tenant Schema

```sql
-- ============================================
-- TENANTS TABLE
-- ============================================
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Identity
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  custom_domain VARCHAR(255) UNIQUE,

  -- Branding
  logo_url TEXT,
  favicon_url TEXT,
  primary_color VARCHAR(7) DEFAULT '#1a73e8',
  secondary_color VARCHAR(7) DEFAULT '#34a853',
  custom_css TEXT,

  -- Subscription & Limits
  plan VARCHAR(50) DEFAULT 'free', -- free, starter, pro, enterprise
  status VARCHAR(50) DEFAULT 'trial', -- trial, active, suspended, cancelled

  max_posts INTEGER DEFAULT 10,
  max_users INTEGER DEFAULT 3,
  max_storage_mb INTEGER DEFAULT 1000,
  max_api_calls_per_day INTEGER DEFAULT 1000,

  -- Trial & Billing
  trial_ends_at TIMESTAMP,
  subscription_started_at TIMESTAMP,
  subscription_ends_at TIMESTAMP,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,

  -- Settings (JSONB for flexibility)
  settings JSONB DEFAULT '{}'::jsonb
);

-- Indexes
CREATE INDEX idx_tenants_slug ON tenants(slug);
CREATE INDEX idx_tenants_custom_domain ON tenants(custom_domain);
CREATE INDEX idx_tenants_status ON tenants(status);

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  -- Authentication
  email VARCHAR(255) NOT NULL,
  password_hash TEXT NOT NULL,
  email_verified BOOLEAN DEFAULT false,

  -- Profile
  name VARCHAR(255),
  avatar_url TEXT,

  -- Authorization
  role VARCHAR(50) DEFAULT 'writer', -- writer, editor, admin, super_admin
  permissions JSONB DEFAULT '[]'::jsonb,

  -- Status
  status VARCHAR(50) DEFAULT 'active', -- active, suspended, pending
  last_login_at TIMESTAMP,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Unique email per tenant (different tenants can have same email)
  UNIQUE(tenant_id, email)
);

-- Indexes
CREATE INDEX idx_users_tenant ON users(tenant_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================
-- AUTHORS TABLE (Public Profiles)
-- ============================================
CREATE TABLE authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,

  -- Public Profile
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  designation VARCHAR(255),

  -- Social Media
  social_links JSONB DEFAULT '{}'::jsonb,
  -- Example: {"twitter": "https://twitter.com/...", "linkedin": "..."}

  -- Stats
  post_count INTEGER DEFAULT 0,
  total_views INTEGER DEFAULT 0,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(tenant_id, slug)
);

CREATE INDEX idx_authors_tenant ON authors(tenant_id);
CREATE INDEX idx_authors_user ON authors(user_id);

-- ============================================
-- CATEGORIES TABLE
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,

  -- Hierarchy
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,

  -- Display
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(tenant_id, slug)
);

CREATE INDEX idx_categories_tenant ON categories(tenant_id);
CREATE INDEX idx_categories_parent ON categories(parent_id);

-- ============================================
-- TAGS TABLE
-- ============================================
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,

  -- Stats
  post_count INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(tenant_id, slug)
);

CREATE INDEX idx_tags_tenant ON tags(tenant_id);

-- ============================================
-- POSTS TABLE
-- ============================================
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  -- Content
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,

  -- Media
  feature_image TEXT,
  post_format VARCHAR(50) DEFAULT 'standard',
  -- standard, video, gallery, quote, audio

  -- Relationships
  author_id UUID REFERENCES authors(id) ON DELETE SET NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,

  -- Status & Publishing
  status VARCHAR(50) DEFAULT 'draft',
  -- draft, published, scheduled, archived, deleted

  published_at TIMESTAMP,
  scheduled_at TIMESTAMP,

  -- Features
  featured BOOLEAN DEFAULT false,
  slide_post BOOLEAN DEFAULT false,
  sticky BOOLEAN DEFAULT false,
  allow_comments BOOLEAN DEFAULT true,

  -- Stats
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  read_time INTEGER, -- minutes

  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT[],
  og_image TEXT,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP,

  UNIQUE(tenant_id, slug)
);

-- Indexes for performance
CREATE INDEX idx_posts_tenant ON posts(tenant_id);
CREATE INDEX idx_posts_slug ON posts(tenant_id, slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_category ON posts(category_id);
CREATE INDEX idx_posts_published ON posts(published_at DESC);
CREATE INDEX idx_posts_featured ON posts(tenant_id, featured, published_at DESC);

-- ============================================
-- POST_TAGS TABLE (Many-to-Many)
-- ============================================
CREATE TABLE post_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,

  created_at TIMESTAMP DEFAULT NOW(),

  PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX idx_post_tags_post ON post_tags(post_id);
CREATE INDEX idx_post_tags_tag ON post_tags(tag_id);

-- ============================================
-- MEDIA TABLE
-- ============================================
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,

  -- File Info
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255),
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  mime_type VARCHAR(100),
  size INTEGER, -- bytes

  -- Metadata
  alt_text TEXT,
  caption TEXT,
  width INTEGER,
  height INTEGER,

  -- Organization
  folder VARCHAR(255) DEFAULT 'uploads',

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_media_tenant ON media(tenant_id);
CREATE INDEX idx_media_user ON media(user_id);

-- ============================================
-- SESSIONS TABLE (NextAuth)
-- ============================================
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,

  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,

  -- Context
  ip_address INET,
  user_agent TEXT,

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sessions_user ON sessions(user_id);
CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);

-- ============================================
-- AUDIT_LOGS TABLE
-- ============================================
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Action Details
  action VARCHAR(100) NOT NULL,
  -- create_post, update_post, delete_post, create_user, etc.

  entity_type VARCHAR(100),
  entity_id UUID,

  -- Changes (JSON diff)
  changes JSONB,

  -- Context
  ip_address INET,
  user_agent TEXT,

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_tenant ON audit_logs(tenant_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- ============================================
-- TENANT_USAGE TABLE (Quota Tracking)
-- ============================================
CREATE TABLE tenant_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  -- Usage Metrics
  post_count INTEGER DEFAULT 0,
  user_count INTEGER DEFAULT 0,
  storage_used_mb NUMERIC(10,2) DEFAULT 0,
  api_calls_today INTEGER DEFAULT 0,

  -- Bandwidth (optional)
  bandwidth_used_mb NUMERIC(10,2) DEFAULT 0,

  -- Updated daily
  date DATE NOT NULL DEFAULT CURRENT_DATE,

  UNIQUE(tenant_id, date)
);

CREATE INDEX idx_tenant_usage_tenant ON tenant_usage(tenant_id);
CREATE INDEX idx_tenant_usage_date ON tenant_usage(date DESC);
```

### Row-Level Security (RLS) Policies

```sql
-- ============================================
-- ROW LEVEL SECURITY SETUP
-- ============================================

-- Enable RLS on all tenant-specific tables
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Posts RLS Policy
CREATE POLICY tenant_isolation_posts ON posts
  USING (tenant_id = current_setting('app.tenant_id', true)::UUID);

CREATE POLICY tenant_isolation_posts_insert ON posts
  FOR INSERT
  WITH CHECK (tenant_id = current_setting('app.tenant_id', true)::UUID);

-- Users RLS Policy
CREATE POLICY tenant_isolation_users ON users
  USING (tenant_id = current_setting('app.tenant_id', true)::UUID);

-- Categories RLS Policy
CREATE POLICY tenant_isolation_categories ON categories
  USING (tenant_id = current_setting('app.tenant_id', true)::UUID);

-- Tags RLS Policy
CREATE POLICY tenant_isolation_tags ON tags
  USING (tenant_id = current_setting('app.tenant_id', true)::UUID);

-- Media RLS Policy
CREATE POLICY tenant_isolation_media ON media
  USING (tenant_id = current_setting('app.tenant_id', true)::UUID);

-- Authors RLS Policy
CREATE POLICY tenant_isolation_authors ON authors
  USING (tenant_id = current_setting('app.tenant_id', true)::UUID);
```

---

## Tenant Context & Middleware

### Tenant Detection from Subdomain

```typescript
// lib/tenant-context.ts
import { headers } from 'next/headers';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export interface TenantContext {
  id: string;
  slug: string;
  name: string;
  customDomain?: string;
  settings: any;
}

export async function getTenantFromRequest(): Promise<TenantContext | null> {
  const headersList = headers();
  const host = headersList.get('host') || '';

  // Remove port if present
  const hostname = host.split(':')[0];

  // Extract subdomain (e.g., "techblog" from "techblog.skilllinkup.com")
  const parts = hostname.split('.');

  let tenant: TenantContext | null = null;

  // Case 1: Subdomain-based tenant
  if (parts.length >= 3) {
    const subdomain = parts[0];

    // Skip www and common subdomains
    if (!['www', 'cms', 'admin', 'api'].includes(subdomain)) {
      const result = await sql`
        SELECT id, slug, name, custom_domain, settings
        FROM tenants
        WHERE slug = ${subdomain}
        AND status = 'active'
      `;

      if (result.length > 0) {
        tenant = result[0] as TenantContext;
      }
    }
  }

  // Case 2: Custom domain tenant
  if (!tenant) {
    const result = await sql`
      SELECT id, slug, name, custom_domain, settings
      FROM tenants
      WHERE custom_domain = ${hostname}
      AND status = 'active'
    `;

    if (result.length > 0) {
      tenant = result[0] as TenantContext;
    }
  }

  return tenant;
}

export async function getTenantId(): Promise<string> {
  const tenant = await getTenantFromRequest();

  if (!tenant) {
    throw new Error('No tenant context available');
  }

  return tenant.id;
}
```

### Next.js Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0];
  const parts = hostname.split('.');

  let tenantSlug: string | null = null;

  // Extract subdomain
  if (parts.length >= 3 && !['www', 'cms', 'admin'].includes(parts[0])) {
    tenantSlug = parts[0];
  } else {
    // Check custom domain
    const result = await sql`
      SELECT slug FROM tenants WHERE custom_domain = ${hostname}
    `;
    if (result.length > 0) {
      tenantSlug = result[0].slug;
    }
  }

  // If no tenant found, show 404 or redirect
  if (!tenantSlug) {
    return NextResponse.redirect(new URL('/tenant-not-found', request.url));
  }

  // Add tenant context to request headers
  const response = NextResponse.next();
  response.headers.set('x-tenant-slug', tenantSlug);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};
```

### Database Helper with Tenant Context

```typescript
// lib/db.ts
import { neon } from '@neondatabase/serverless';
import { getTenantId } from './tenant-context';

export async function getTenantDb() {
  const tenantId = await getTenantId();
  const sql = neon(process.env.DATABASE_URL!);

  // Set tenant context for Row-Level Security
  await sql`SET app.tenant_id = ${tenantId}`;

  return sql;
}

// Usage in Server Component
export default async function PostsPage() {
  const db = await getTenantDb();

  // Queries are automatically filtered by tenant_id via RLS
  const posts = await db`
    SELECT * FROM posts
    WHERE status = 'published'
    ORDER BY published_at DESC
    LIMIT 10
  `;

  return <PostList posts={posts} />;
}
```

---

## Implementation Guide

### Step 1: Install Dependencies

```bash
# Navigate to main app
cd /home/marvin/Documenten/skillLinkup

# Install Neon and database tools
npm install @neondatabase/serverless
npm install drizzle-orm drizzle-kit
npm install next-auth
npm install bcryptjs
npm install @types/bcryptjs --save-dev

# Optional: ORM alternative
# npm install prisma @prisma/client
```

### Step 2: Environment Variables

```bash
# .env.local
DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/skilllinkup?sslmode=require"
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="your-secret-key-here"

# Optional
CLOUDINARY_URL="cloudinary://..."
STRIPE_SECRET_KEY="sk_test_..."
```

### Step 3: Run Database Migrations

```bash
# Create migration files
npm run db:generate

# Run migrations
npm run db:migrate

# Or manually execute SQL schema from above
psql $DATABASE_URL < schema.sql
```

### Step 4: Seed Initial Data

```typescript
// scripts/seed.ts
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function seed() {
  // Create demo tenant
  const [tenant] = await sql`
    INSERT INTO tenants (name, slug, plan, status)
    VALUES ('Demo Publisher', 'demo', 'free', 'active')
    RETURNING *
  `;

  console.log('✓ Created tenant:', tenant.slug);

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);

  await sql`
    INSERT INTO users (tenant_id, email, password_hash, name, role)
    VALUES (${tenant.id}, 'admin@demo.com', ${hashedPassword}, 'Admin User', 'admin')
  `;

  console.log('✓ Created admin user');

  // Create default categories
  await sql`
    INSERT INTO categories (tenant_id, name, slug)
    VALUES
      (${tenant.id}, 'Technology', 'technology'),
      (${tenant.id}, 'Design', 'design'),
      (${tenant.id}, 'Marketing', 'marketing')
  `;

  console.log('✓ Created default categories');
}

seed().then(() => {
  console.log('✅ Seed completed');
  process.exit(0);
}).catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
```

### Step 5: Update Main App to Use Database

```typescript
// app/page.tsx
import { getTenantDb } from '@/lib/db';
import PostSectionEight from '@/src/common/components/post/PostSectionEight';

export default async function HomePage() {
  const db = await getTenantDb();

  // Fetch posts from database instead of markdown files
  const posts = await db`
    SELECT
      p.*,
      a.name as author_name,
      a.avatar_url as author_img,
      c.name as cate,
      c.image_url as cate_img
    FROM posts p
    LEFT JOIN authors a ON p.author_id = a.id
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'published'
    AND p.tenant_id = current_setting('app.tenant_id')::UUID
    ORDER BY p.published_at DESC
  `;

  return (
    <>
      <HeaderOne postData={posts} />
      <PostSectionEight postData={posts} />
      {/* Other sections */}
    </>
  );
}
```

---

## Quota & Billing System

### Check Quota Before Action

```typescript
// lib/quota.ts
import { getTenantDb } from './db';
import { getTenantId } from './tenant-context';

export interface QuotaStatus {
  exceeded: boolean;
  current: number;
  limit: number;
  percentage: number;
}

export async function checkQuota(
  type: 'posts' | 'users' | 'storage'
): Promise<QuotaStatus> {
  const db = await getTenantDb();
  const tenantId = await getTenantId();

  // Get tenant limits
  const [tenant] = await db`
    SELECT max_posts, max_users, max_storage_mb
    FROM tenants
    WHERE id = ${tenantId}
  `;

  // Get current usage
  const [usage] = await db`
    SELECT
      COUNT(DISTINCT posts.id) as post_count,
      COUNT(DISTINCT users.id) as user_count,
      COALESCE(SUM(media.size), 0) / 1024.0 / 1024.0 as storage_mb
    FROM tenants
    LEFT JOIN posts ON posts.tenant_id = tenants.id AND posts.status != 'deleted'
    LEFT JOIN users ON users.tenant_id = tenants.id AND users.status = 'active'
    LEFT JOIN media ON media.tenant_id = tenants.id
    WHERE tenants.id = ${tenantId}
    GROUP BY tenants.id
  `;

  const limits = {
    posts: tenant.max_posts,
    users: tenant.max_users,
    storage: tenant.max_storage_mb
  };

  const current = {
    posts: usage.post_count,
    users: usage.user_count,
    storage: Math.ceil(usage.storage_mb)
  };

  const limit = limits[type];
  const currentValue = current[type];
  const percentage = (currentValue / limit) * 100;

  return {
    exceeded: currentValue >= limit,
    current: currentValue,
    limit,
    percentage
  };
}

// Usage in API route
export async function POST(request: Request) {
  const quota = await checkQuota('posts');

  if (quota.exceeded) {
    return Response.json({
      error: 'Post quota exceeded',
      message: `You've reached your limit of ${quota.limit} posts. Upgrade your plan to create more.`,
      upgrade_url: '/billing/upgrade'
    }, { status: 403 });
  }

  // Create post...
}
```

### Usage Tracking

```typescript
// lib/usage-tracker.ts
export async function trackUsage(tenantId: string) {
  const db = await getTenantDb();

  const [usage] = await db`
    SELECT
      COUNT(DISTINCT posts.id) as post_count,
      COUNT(DISTINCT users.id) as user_count,
      COALESCE(SUM(media.size), 0) / 1024.0 / 1024.0 as storage_mb
    FROM tenants
    LEFT JOIN posts ON posts.tenant_id = tenants.id
    LEFT JOIN users ON users.tenant_id = tenants.id
    LEFT JOIN media ON media.tenant_id = tenants.id
    WHERE tenants.id = ${tenantId}
    GROUP BY tenants.id
  `;

  // Update tenant_usage table
  await db`
    INSERT INTO tenant_usage (
      tenant_id,
      post_count,
      user_count,
      storage_used_mb,
      date
    )
    VALUES (
      ${tenantId},
      ${usage.post_count},
      ${usage.user_count},
      ${usage.storage_mb},
      CURRENT_DATE
    )
    ON CONFLICT (tenant_id, date)
    DO UPDATE SET
      post_count = ${usage.post_count},
      user_count = ${usage.user_count},
      storage_used_mb = ${usage.storage_mb}
  `;
}

// Run daily via cron or Vercel Cron
export async function trackAllTenantUsage() {
  const db = await getTenantDb();

  const tenants = await db`SELECT id FROM tenants WHERE status = 'active'`;

  for (const tenant of tenants) {
    await trackUsage(tenant.id);
  }
}
```

---

## Tenant Customization

### Theme System

```typescript
// lib/theme.ts
import { getTenantFromRequest } from './tenant-context';

export interface TenantTheme {
  logo: string;
  favicon: string;
  colors: {
    primary: string;
    secondary: string;
  };
  customCss?: string;
}

export async function getTenantTheme(): Promise<TenantTheme> {
  const tenant = await getTenantFromRequest();

  if (!tenant) {
    throw new Error('No tenant context');
  }

  return {
    logo: tenant.settings?.logo_url || '/images/logo/default-logo.png',
    favicon: tenant.settings?.favicon_url || '/favicon.ico',
    colors: {
      primary: tenant.settings?.primary_color || '#1a73e8',
      secondary: tenant.settings?.secondary_color || '#34a853'
    },
    customCss: tenant.settings?.custom_css
  };
}
```

### Apply Theme in Layout

```typescript
// app/layout.tsx
import { getTenantTheme } from '@/lib/theme';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const theme = await getTenantTheme();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={theme.favicon} />
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --color-primary: ${theme.colors.primary};
            --color-secondary: ${theme.colors.secondary};
          }

          ${theme.customCss || ''}
        `}} />
      </head>
      <body>
        <div className="tenant-logo">
          <img src={theme.logo} alt="Logo" />
        </div>
        {children}
      </body>
    </html>
  );
}
```

---

## Security Considerations

### 1. Tenant Isolation

- ✅ **RLS Enforcement:** PostgreSQL Row-Level Security prevents cross-tenant queries
- ✅ **Middleware Validation:** Every request validates tenant context
- ✅ **API Route Guards:** Check tenant_id matches authenticated user's tenant

### 2. Authentication

```typescript
// lib/auth.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { getTenantDb } from './db';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password" }
      },
      async authorize(credentials) {
        const db = await getTenantDb();

        const [user] = await db`
          SELECT id, email, password_hash, name, role, tenant_id
          FROM users
          WHERE email = ${credentials.email}
          AND status = 'active'
        `;

        if (!user) return null;

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.password_hash
        );

        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          tenantId: user.tenant_id
        };
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.tenantId = token.tenantId;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.tenantId = user.tenantId;
      }
      return token;
    }
  }
});
```

### 3. API Route Protection

```typescript
// app/api/posts/route.ts
import { auth } from '@/lib/auth';
import { getTenantId } from '@/lib/tenant-context';

export async function POST(request: Request) {
  // 1. Check authentication
  const session = await auth();
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 2. Verify tenant context matches user's tenant
  const tenantId = await getTenantId();
  if (session.user.tenantId !== tenantId) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 3. Check permissions
  if (!['admin', 'editor', 'writer'].includes(session.user.role)) {
    return Response.json({ error: 'Insufficient permissions' }, { status: 403 });
  }

  // 4. Proceed with action
  const data = await request.json();
  // Create post...
}
```

### 4. Data Validation

```typescript
// lib/validation.ts
import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(1).max(500),
  slug: z.string().min(1).max(500).regex(/^[a-z0-9-]+$/),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  categoryId: z.string().uuid(),
  status: z.enum(['draft', 'published', 'scheduled']),
});

// Usage
export async function POST(request: Request) {
  const data = await request.json();

  const result = postSchema.safeParse(data);
  if (!result.success) {
    return Response.json({
      error: 'Validation failed',
      issues: result.error.issues
    }, { status: 400 });
  }

  // Proceed with validated data
}
```

---

## Deployment Guide

### Netlify Configuration

**netlify.toml** (Main App)
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[context.production.environment]
  DATABASE_URL = "postgresql://..."
  NEXTAUTH_SECRET = "..."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### DNS Configuration

**Main Domain:**
```
skilllinkup.com         A     76.76.21.21 (Netlify)
www.skilllinkup.com     CNAME skilllinkup.com
```

**Wildcard Subdomain (for tenants):**
```
*.skilllinkup.com       CNAME skilllinkup.netlify.app
```

**Specific Subdomains:**
```
cms.skilllinkup.com     CNAME skilllinkup-cms.netlify.app
admin.skilllinkup.com   CNAME skilllinkup-admin.netlify.app
```

### Environment Variables (Netlify)

**Production:**
```
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/skilllinkup
NEXTAUTH_URL=https://skilllinkup.com
NEXTAUTH_SECRET=production-secret-key
CLOUDINARY_URL=cloudinary://...
```

**Preview/Staging:**
```
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/skilllinkup_staging
NEXTAUTH_URL=https://staging.skilllinkup.com
```

### Neon Database Configuration

1. Create Neon project at https://neon.tech
2. Copy connection string
3. Enable connection pooling (recommended)
4. Run schema migrations:

```bash
# Install Neon CLI
npm i -g neonctl

# Create branch for staging
neonctl branches create --project-id <project-id> --name staging

# Run migrations
psql $DATABASE_URL < schema.sql
```

---

## Next Steps

### Phase 1: Database Setup (Week 1)
- [ ] Create Neon PostgreSQL database
- [ ] Run schema migrations
- [ ] Seed initial tenant data
- [ ] Test RLS policies

### Phase 2: Main App Integration (Week 2)
- [ ] Update main app to use Neon instead of markdown
- [ ] Implement tenant context middleware
- [ ] Add authentication with NextAuth
- [ ] Migrate existing posts to database

### Phase 3: CMS Development (Week 3-4)
- [ ] Create CMS Next.js project
- [ ] Build post editor (TipTap/Slate)
- [ ] Implement media library
- [ ] Add preview functionality

### Phase 4: Admin Portal (Week 5)
- [ ] Create Admin Next.js project
- [ ] Build tenant management dashboard
- [ ] Implement user management
- [ ] Add analytics and reporting

### Phase 5: Deployment (Week 6)
- [ ] Deploy main app to Netlify
- [ ] Configure DNS for subdomains
- [ ] Deploy CMS and Admin portals
- [ ] Set up monitoring and logging

---

## Support & Resources

- **Neon Docs:** https://neon.tech/docs
- **Next.js Docs:** https://nextjs.org/docs
- **NextAuth:** https://next-auth.js.org
- **Drizzle ORM:** https://orm.drizzle.team

---

**Last Updated:** October 2, 2025
**Version:** 1.0
**Status:** Planning Phase
