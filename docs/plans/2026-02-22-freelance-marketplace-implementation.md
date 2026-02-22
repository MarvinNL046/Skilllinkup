# Freelance Marketplace Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a full-stack freelance marketplace into SkillLinkup supporting gig-based services, project bidding, and local service quote requests with Stripe Connect payments, escrow, and real-time messaging.

**Architecture:** Extends the existing Next.js 15 App Router codebase with new marketplace routes under `/[locale]/marketplace/` and `/[locale]/dashboard/`. Uses raw Neon SQL for queries (existing pattern), Auth.js v5 for authentication, Stripe Connect for payments/escrow, and Pusher for real-time messaging. All new tables follow the existing multi-tenant pattern with `tenant_id`.

**Tech Stack:** Next.js 15.5.4, React 19, TypeScript, Neon PostgreSQL (raw SQL), Auth.js v5, Stripe Connect, Pusher, Resend, Tailwind CSS, next-intl v4.4.0

**Design Doc:** `docs/plans/2026-02-22-freelance-marketplace-design.md`

---

## Conventions (Read First)

Before implementing ANY task, understand these project-specific patterns:

### Database Queries
```typescript
// Always use raw Neon SQL (NOT Drizzle ORM)
import { sql } from '@/lib/db';

const results = await sql`
  SELECT id, name FROM table_name
  WHERE locale = ${locale} AND status = 'active'
  LIMIT ${limit} OFFSET ${offset}
`;
```

### Page Components
```typescript
// Every database-driven page MUST have:
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Next.js 15 params are Promise - MUST await:
interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}
export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;
}
```

### Safe Data Handling
```typescript
import { safeImage, safeText, safeArray } from '@/lib/safe';
import { DEFAULTS } from '@/lib/defaults';
// Always wrap database values with safe helpers
```

### API Routes
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
export const runtime = 'nodejs'; // For DB access
export const dynamic = 'force-dynamic';
```

### i18n
```typescript
// Server: const t = await getTranslations({ locale, namespace: 'key' });
// Client: const t = useTranslations('key');
// Add keys to messages/en.json AND messages/nl.json
```

### Styling
- Tailwind CSS with custom colors: primary (#ef2b70), secondary (#1e1541), accent (#22c55e)
- Fonts: `font-sans` (Inter), `font-heading` (Lexend)
- Dark mode via `dark:` prefix (class-based)
- Icons: `lucide-react`

---

## Phase 1: Foundation

### Task 1.1: Install Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install auth, payments, and real-time packages**

Run:
```bash
cd /home/marvin/Projecten/Skilllinkup
npm install next-auth@beta @auth/drizzle-adapter stripe @stripe/stripe-js pusher pusher-js
```

Expected: packages added to package.json

**Step 2: Install dev dependencies**

Run:
```bash
npm install -D @types/pusher-js
```

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install marketplace dependencies (auth.js, stripe, pusher)"
```

---

### Task 1.2: Database Migration - Core Marketplace Tables

**Files:**
- Create: `drizzle/migrations/0010_marketplace_foundation.sql`
- Create: `scripts/run-migration-0010.mjs`

**Step 1: Write the migration SQL**

Create `drizzle/migrations/0010_marketplace_foundation.sql`:

```sql
-- =============================================
-- Migration 0010: Marketplace Foundation Tables
-- =============================================

-- 1. Auth tables (for Auth.js / NextAuth v5)
CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type VARCHAR(255),
  scope VARCHAR(255),
  id_token TEXT,
  session_state VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(provider, provider_account_id)
);

CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token VARCHAR(255) NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires TIMESTAMP NOT NULL,
  UNIQUE(identifier, token)
);

-- 2. Extend users table for marketplace roles
ALTER TABLE users ADD COLUMN IF NOT EXISTS user_type VARCHAR(20) DEFAULT 'client';
ALTER TABLE users ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_type ON users(user_type);

-- 3. Freelancer profiles
CREATE TABLE IF NOT EXISTS freelancer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  display_name VARCHAR(255) NOT NULL,
  tagline VARCHAR(255),
  bio TEXT,
  avatar_url TEXT,
  cover_image_url TEXT,
  hourly_rate DECIMAL(10,2),
  work_type VARCHAR(50) DEFAULT 'remote',
  location_city VARCHAR(255),
  location_country VARCHAR(5),
  location_postcode VARCHAR(20),
  service_radius_km INTEGER,
  languages TEXT[] DEFAULT ARRAY['en'],
  skills TEXT[] DEFAULT ARRAY[]::TEXT[],
  portfolio_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  website_url TEXT,
  linkedin_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  verification_date TIMESTAMP,
  stripe_account_id VARCHAR(255),
  stripe_onboarding_complete BOOLEAN DEFAULT false,
  response_time_hours INTEGER,
  completion_rate DECIMAL(5,2) DEFAULT 100.00,
  total_earnings DECIMAL(12,2) DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  rating_average DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'pending',
  locale VARCHAR(5) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_fp_user ON freelancer_profiles(user_id);
CREATE INDEX idx_fp_status ON freelancer_profiles(status);
CREATE INDEX idx_fp_location ON freelancer_profiles(location_country, location_city);
CREATE INDEX idx_fp_skills ON freelancer_profiles USING GIN(skills);
CREATE INDEX idx_fp_rating ON freelancer_profiles(rating_average DESC);
CREATE INDEX idx_fp_work_type ON freelancer_profiles(work_type);

-- 4. Marketplace categories
CREATE TABLE IF NOT EXISTS marketplace_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  image_url TEXT,
  parent_id UUID REFERENCES marketplace_categories(id),
  service_type VARCHAR(20) NOT NULL DEFAULT 'digital',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  locale VARCHAR(5) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(slug, locale)
);

CREATE INDEX idx_mc_parent ON marketplace_categories(parent_id);
CREATE INDEX idx_mc_type ON marketplace_categories(service_type);
CREATE INDEX idx_mc_active ON marketplace_categories(is_active, sort_order);

-- 5. Skills taxonomy
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  category_id UUID REFERENCES marketplace_categories(id),
  locale VARCHAR(5) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(slug, locale)
);

CREATE INDEX idx_skills_category ON skills(category_id);

-- 6. Gigs
CREATE TABLE IF NOT EXISTS gigs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  freelancer_id UUID NOT NULL REFERENCES freelancer_profiles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES marketplace_categories(id),
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  work_type VARCHAR(50) DEFAULT 'remote',
  location_city VARCHAR(255),
  location_country VARCHAR(5),
  service_radius_km INTEGER,
  views INTEGER DEFAULT 0,
  order_count INTEGER DEFAULT 0,
  rating_average DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'pending',
  locale VARCHAR(5) DEFAULT 'en',
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(slug, locale)
);

CREATE INDEX idx_gigs_freelancer ON gigs(freelancer_id);
CREATE INDEX idx_gigs_category ON gigs(category_id);
CREATE INDEX idx_gigs_status ON gigs(status, published_at DESC);
CREATE INDEX idx_gigs_rating ON gigs(rating_average DESC);
CREATE INDEX idx_gigs_location ON gigs(location_country, location_city);
CREATE INDEX idx_gigs_tags ON gigs USING GIN(tags);

-- 7. Gig packages (pricing tiers)
CREATE TABLE IF NOT EXISTS gig_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id UUID NOT NULL REFERENCES gigs(id) ON DELETE CASCADE,
  tier VARCHAR(20) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  delivery_days INTEGER NOT NULL,
  revision_count INTEGER DEFAULT 0,
  features JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_gp_gig ON gig_packages(gig_id);

-- 8. Gig images
CREATE TABLE IF NOT EXISTS gig_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id UUID NOT NULL REFERENCES gigs(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_gi_gig ON gig_images(gig_id);
```

**Step 2: Write the migration runner**

Create `scripts/run-migration-0010.mjs`:

```javascript
import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { config } from 'dotenv';

config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function run() {
  console.log('Running migration 0010: Marketplace Foundation...');

  const migration = readFileSync(
    new URL('../drizzle/migrations/0010_marketplace_foundation.sql', import.meta.url),
    'utf-8'
  );

  // Split by semicolons and run each statement
  const statements = migration
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'));

  for (const statement of statements) {
    try {
      await sql(statement);
      // Log first 60 chars of each statement
      console.log(`  ✓ ${statement.substring(0, 60).replace(/\n/g, ' ')}...`);
    } catch (err) {
      console.error(`  ✗ ${statement.substring(0, 60).replace(/\n/g, ' ')}...`);
      console.error(`    Error: ${err.message}`);
    }
  }

  console.log('\nMigration 0010 complete!');
}

run().catch(console.error);
```

**Step 3: Run the migration**

Run: `node scripts/run-migration-0010.mjs`
Expected: All statements succeed with checkmarks

**Step 4: Commit**

```bash
git add drizzle/migrations/0010_marketplace_foundation.sql scripts/run-migration-0010.mjs
git commit -m "feat: add marketplace foundation tables (profiles, categories, gigs)"
```

---

### Task 1.3: Database Migration - Orders, Messages, Transactions

**Files:**
- Create: `drizzle/migrations/0011_marketplace_orders_messages.sql`
- Create: `scripts/run-migration-0011.mjs`

**Step 1: Write the migration SQL**

Create `drizzle/migrations/0011_marketplace_orders_messages.sql`:

```sql
-- =============================================
-- Migration 0011: Orders, Messages, Transactions
-- =============================================

-- 1. Projects (client-posted jobs)
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES marketplace_categories(id),
  required_skills TEXT[] DEFAULT ARRAY[]::TEXT[],
  budget_min DECIMAL(10,2),
  budget_max DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'EUR',
  deadline TIMESTAMP,
  work_type VARCHAR(50) DEFAULT 'remote',
  location_city VARCHAR(255),
  location_country VARCHAR(5),
  location_postcode VARCHAR(20),
  attachments JSONB DEFAULT '[]',
  bid_count INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'open',
  selected_freelancer_id UUID REFERENCES freelancer_profiles(id),
  locale VARCHAR(5) DEFAULT 'en',
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(slug, locale)
);

CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_projects_category ON projects(category_id);
CREATE INDEX idx_projects_status ON projects(status, published_at DESC);
CREATE INDEX idx_projects_location ON projects(location_country, location_city);
CREATE INDEX idx_projects_skills ON projects USING GIN(required_skills);

-- 2. Bids
CREATE TABLE IF NOT EXISTS bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  freelancer_id UUID NOT NULL REFERENCES freelancer_profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  delivery_days INTEGER NOT NULL,
  pitch TEXT NOT NULL,
  attachments JSONB DEFAULT '[]',
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(project_id, freelancer_id)
);

CREATE INDEX idx_bids_project ON bids(project_id);
CREATE INDEX idx_bids_freelancer ON bids(freelancer_id);

-- 3. Orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  order_number VARCHAR(50) NOT NULL UNIQUE,
  order_type VARCHAR(20) NOT NULL,
  client_id UUID NOT NULL REFERENCES users(id),
  freelancer_id UUID NOT NULL REFERENCES freelancer_profiles(id),
  gig_id UUID REFERENCES gigs(id),
  gig_package_id UUID REFERENCES gig_packages(id),
  project_id UUID REFERENCES projects(id),
  bid_id UUID REFERENCES bids(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  requirements TEXT,
  amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL,
  freelancer_earnings DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  delivery_deadline TIMESTAMP,
  revision_count INTEGER DEFAULT 0,
  revisions_used INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending',
  stripe_payment_intent_id VARCHAR(255),
  stripe_transfer_id VARCHAR(255),
  escrow_status VARCHAR(20) DEFAULT 'held',
  completed_at TIMESTAMP,
  cancelled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_orders_client ON orders(client_id);
CREATE INDEX idx_orders_freelancer ON orders(freelancer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_gig ON orders(gig_id);
CREATE INDEX idx_orders_project ON orders(project_id);
CREATE INDEX idx_orders_number ON orders(order_number);

-- 4. Order milestones
CREATE TABLE IF NOT EXISTS order_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  due_date TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending',
  stripe_payment_intent_id VARCHAR(255),
  delivered_at TIMESTAMP,
  approved_at TIMESTAMP,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_om_order ON order_milestones(order_id);

-- 5. Order deliverables
CREATE TABLE IF NOT EXISTS order_deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES order_milestones(id),
  uploaded_by UUID NOT NULL REFERENCES users(id),
  file_url TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_size INTEGER,
  file_type VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_od_order ON order_deliverables(order_id);

-- 6. Conversations
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id),
  project_id UUID REFERENCES projects(id),
  participant_1 UUID NOT NULL REFERENCES users(id),
  participant_2 UUID NOT NULL REFERENCES users(id),
  last_message_at TIMESTAMP,
  last_message_preview TEXT,
  unread_count_1 INTEGER DEFAULT 0,
  unread_count_2 INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conv_p1 ON conversations(participant_1, last_message_at DESC);
CREATE INDEX idx_conv_p2 ON conversations(participant_2, last_message_at DESC);
CREATE INDEX idx_conv_order ON conversations(order_id);

-- 7. Messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id),
  content TEXT,
  message_type VARCHAR(20) DEFAULT 'text',
  file_url TEXT,
  file_name VARCHAR(255),
  file_size INTEGER,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_msg_conv ON messages(conversation_id, created_at);
CREATE INDEX idx_msg_sender ON messages(sender_id);

-- 8. Transactions
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id),
  milestone_id UUID REFERENCES order_milestones(id),
  payer_id UUID NOT NULL REFERENCES users(id),
  payee_id UUID REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'EUR',
  transaction_type VARCHAR(20) NOT NULL,
  stripe_payment_intent_id VARCHAR(255),
  stripe_transfer_id VARCHAR(255),
  stripe_refund_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending',
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_tx_order ON transactions(order_id);
CREATE INDEX idx_tx_payer ON transactions(payer_id);
CREATE INDEX idx_tx_payee ON transactions(payee_id);
CREATE INDEX idx_tx_status ON transactions(status);

-- 9. Disputes
CREATE TABLE IF NOT EXISTS disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  order_id UUID NOT NULL REFERENCES orders(id),
  opened_by UUID NOT NULL REFERENCES users(id),
  reason VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  evidence JSONB DEFAULT '[]',
  resolution VARCHAR(50),
  resolution_note TEXT,
  resolved_by UUID REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'open',
  opened_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_disputes_order ON disputes(order_id);
CREATE INDEX idx_disputes_status ON disputes(status);

-- 10. Marketplace reviews
CREATE TABLE IF NOT EXISTS marketplace_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  order_id UUID NOT NULL REFERENCES orders(id),
  reviewer_id UUID NOT NULL REFERENCES users(id),
  reviewee_id UUID NOT NULL REFERENCES users(id),
  reviewer_role VARCHAR(20) NOT NULL,
  overall_rating INTEGER NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
  communication_rating INTEGER CHECK (communication_rating BETWEEN 1 AND 5),
  quality_rating INTEGER CHECK (quality_rating BETWEEN 1 AND 5),
  timeliness_rating INTEGER CHECK (timeliness_rating BETWEEN 1 AND 5),
  value_rating INTEGER CHECK (value_rating BETWEEN 1 AND 5),
  content TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(order_id, reviewer_id)
);

CREATE INDEX idx_mr_reviewee ON marketplace_reviews(reviewee_id);
CREATE INDEX idx_mr_order ON marketplace_reviews(order_id);

-- 11. Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  body TEXT,
  link VARCHAR(500),
  metadata JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notif_user ON notifications(user_id, is_read, created_at DESC);
```

**Step 2: Copy the migration runner from 0010, update filename references**

Create `scripts/run-migration-0011.mjs` (same pattern as 0010 but pointing to `0011_marketplace_orders_messages.sql`).

**Step 3: Run the migration**

Run: `node scripts/run-migration-0011.mjs`
Expected: All statements succeed

**Step 4: Commit**

```bash
git add drizzle/migrations/0011_marketplace_orders_messages.sql scripts/run-migration-0011.mjs
git commit -m "feat: add orders, messages, transactions, disputes tables"
```

---

### Task 1.4: Authentication Setup (Auth.js v5)

**Files:**
- Create: `lib/auth.ts`
- Create: `app/api/auth/[...nextauth]/route.ts`
- Modify: `middleware.ts`
- Create: `lib/auth-helpers.ts`
- Add env vars: `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`

**Step 1: Create Auth.js configuration**

Create `lib/auth.ts`:

```typescript
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { sql } from '@/lib/db';
import crypto from 'crypto';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const users = await sql`
          SELECT id, email, name, password_hash, user_type, image
          FROM users
          WHERE email = ${credentials.email as string}
          LIMIT 1
        `;

        if (users.length === 0) return null;

        const user = users[0];
        const hash = crypto
          .createHash('sha256')
          .update(credentials.password as string)
          .digest('hex');

        if (hash !== user.password_hash) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          userType: user.user_type,
        };
      },
    }),
  ],
  pages: {
    signIn: '/en/auth/signin',
    signUp: '/en/auth/signup',
    error: '/en/auth/error',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        // Upsert user on Google sign-in
        const existing = await sql`
          SELECT id, user_type FROM users WHERE email = ${user.email}
          LIMIT 1
        `;

        if (existing.length === 0) {
          // Get default tenant
          const tenants = await sql`SELECT id FROM tenants LIMIT 1`;
          const tenantId = tenants[0]?.id;

          await sql`
            INSERT INTO users (email, name, image, user_type, tenant_id, role, email_verified)
            VALUES (${user.email}, ${user.name}, ${user.image}, 'client', ${tenantId}, 'author', NOW())
          `;
        }

        // Store account link
        const userId = existing.length > 0
          ? existing[0].id
          : (await sql`SELECT id FROM users WHERE email = ${user.email} LIMIT 1`)[0].id;

        const accountExists = await sql`
          SELECT id FROM accounts
          WHERE provider = ${account.provider}
            AND provider_account_id = ${account.providerAccountId}
          LIMIT 1
        `;

        if (accountExists.length === 0) {
          await sql`
            INSERT INTO accounts (user_id, type, provider, provider_account_id, access_token, refresh_token, expires_at)
            VALUES (${userId}, ${account.type}, ${account.provider}, ${account.providerAccountId},
                    ${account.access_token}, ${account.refresh_token}, ${account.expires_at})
          `;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await sql`
          SELECT id, user_type, tenant_id FROM users WHERE email = ${user.email} LIMIT 1
        `;
        if (dbUser.length > 0) {
          token.userId = dbUser[0].id;
          token.userType = dbUser[0].user_type;
          token.tenantId = dbUser[0].tenant_id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.userType = token.userType as string;
        session.user.tenantId = token.tenantId as string;
      }
      return session;
    },
  },
  session: { strategy: 'jwt' },
});
```

**Step 2: Create the Auth.js route handler**

Create `app/api/auth/[...nextauth]/route.ts`:

```typescript
import { handlers } from '@/lib/auth';
export const { GET, POST } = handlers;
```

**Step 3: Create auth helper for getting current user in API routes**

Create `lib/auth-helpers.ts`:

```typescript
import { auth } from '@/lib/auth';
import { sql } from '@/lib/db';

export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return session.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

export async function requireFreelancer() {
  const user = await requireAuth();

  const profiles = await sql`
    SELECT id, status, stripe_onboarding_complete
    FROM freelancer_profiles
    WHERE user_id = ${user.id} AND status = 'active'
    LIMIT 1
  `;

  if (profiles.length === 0) {
    throw new Error('No active freelancer profile');
  }

  return { user, profile: profiles[0] };
}
```

**Step 4: Create type augmentation for Auth.js**

Create `types/next-auth.d.ts`:

```typescript
import 'next-auth';

declare module 'next-auth' {
  interface User {
    userType?: string;
    tenantId?: string;
  }
  interface Session {
    user: User & {
      id: string;
      userType: string;
      tenantId: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string;
    userType?: string;
    tenantId?: string;
  }
}
```

**Step 5: Update middleware to handle auth routes**

Modify `middleware.ts` - add auth routes to the matcher exclusion:

```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'nl'],
  defaultLocale: 'en',
  localePrefix: 'always'
});

export const config = {
  matcher: [
    '/',
    '/(en|nl)/:path*',
    '/((?!api|_next|_vercel|images|fonts|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'
  ]
};
```

**Step 6: Generate AUTH_SECRET and add to .env.local**

Run: `npx auth secret`
Then add to `.env.local`:
```
AUTH_SECRET=<generated-secret>
AUTH_GOOGLE_ID=<get-from-google-console>
AUTH_GOOGLE_SECRET=<get-from-google-console>
```

**Step 7: Commit**

```bash
git add lib/auth.ts lib/auth-helpers.ts app/api/auth/ types/next-auth.d.ts middleware.ts
git commit -m "feat: add Auth.js v5 authentication with Google + credentials"
```

---

### Task 1.5: Auth UI Pages (Sign In / Sign Up)

**Files:**
- Create: `app/[locale]/auth/signin/page.tsx`
- Create: `app/[locale]/auth/signup/page.tsx`
- Create: `components/auth/SignInForm.tsx`
- Create: `components/auth/SignUpForm.tsx`
- Modify: `messages/en.json` - add auth namespace
- Modify: `messages/nl.json` - add auth namespace

**Step 1: Add i18n strings**

Add to `messages/en.json`:
```json
{
  "auth": {
    "signIn": "Sign In",
    "signUp": "Sign Up",
    "email": "Email address",
    "password": "Password",
    "confirmPassword": "Confirm password",
    "fullName": "Full name",
    "continueWithGoogle": "Continue with Google",
    "or": "or",
    "noAccount": "Don't have an account?",
    "hasAccount": "Already have an account?",
    "signUpAs": "Sign up as",
    "client": "Client",
    "clientDesc": "I want to hire freelancers",
    "freelancer": "Freelancer",
    "freelancerDesc": "I want to offer my services",
    "passwordMismatch": "Passwords do not match",
    "signUpSuccess": "Account created! Please sign in.",
    "invalidCredentials": "Invalid email or password"
  }
}
```

Add corresponding Dutch translations to `messages/nl.json`.

**Step 2: Create SignInForm client component**

Create `components/auth/SignInForm.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function SignInForm({ locale }: { locale: string }) {
  const t = useTranslations('auth');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(t('invalidCredentials'));
      setLoading(false);
    } else {
      router.push(`/${locale}/dashboard`);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-3xl font-heading font-bold text-center mb-8">{t('signIn')}</h1>

      <button
        onClick={() => signIn('google', { callbackUrl: `/${locale}/dashboard` })}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-sm
                   hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-secondary-medium transition-colors"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        {t('continueWithGoogle')}
      </button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white dark:bg-secondary-dark text-text-muted">{t('or')}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-sm text-red-800 dark:text-red-300 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">{t('email')}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-sm
                       bg-white dark:bg-secondary-medium focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{t('password')}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-sm
                       bg-white dark:bg-secondary-medium focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-sm
                     transition-colors disabled:opacity-50"
        >
          {loading ? '...' : t('signIn')}
        </button>
      </form>

      <p className="mt-6 text-center text-text-muted">
        {t('noAccount')}{' '}
        <Link href={`/${locale}/auth/signup`} className="text-primary hover:underline">
          {t('signUp')}
        </Link>
      </p>
    </div>
  );
}
```

**Step 3: Create SignUpForm client component**

Create `components/auth/SignUpForm.tsx` with similar pattern but includes:
- Full name field
- Email + password + confirm password
- User type selector (client/freelancer) as two cards
- POST to `/api/auth/signup` to create user, then auto sign-in

**Step 4: Create sign-up API route**

Create `app/api/auth/signup/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import crypto from 'crypto';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, userType } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!['client', 'freelancer'].includes(userType)) {
      return NextResponse.json({ error: 'Invalid user type' }, { status: 400 });
    }

    // Check existing user
    const existing = await sql`SELECT id FROM users WHERE email = ${email} LIMIT 1`;
    if (existing.length > 0) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    // Get default tenant
    const tenants = await sql`SELECT id FROM tenants LIMIT 1`;
    const tenantId = tenants[0]?.id;

    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

    const result = await sql`
      INSERT INTO users (name, email, password_hash, user_type, tenant_id, role, created_at, updated_at)
      VALUES (${name}, ${email}, ${passwordHash}, ${userType}, ${tenantId}, 'author', NOW(), NOW())
      RETURNING id
    `;

    return NextResponse.json({ success: true, userId: result[0].id });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
}
```

**Step 5: Create sign-in and sign-up pages**

Create `app/[locale]/auth/signin/page.tsx`:

```typescript
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SignInForm } from '@/components/auth/SignInForm';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SignInPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <>
      <Header />
      <main className="min-h-[60vh] flex items-center justify-center py-16 px-4">
        <SignInForm locale={locale} />
      </main>
      <Footer />
    </>
  );
}
```

Create similar page for `/auth/signup/page.tsx`.

**Step 6: Commit**

```bash
git add app/[locale]/auth/ components/auth/ app/api/auth/signup/ messages/
git commit -m "feat: add sign-in and sign-up pages with Google + credentials auth"
```

---

### Task 1.6: Marketplace Category Seed Data

**Files:**
- Create: `scripts/seed-marketplace-categories.mjs`

**Step 1: Create the seed script**

This script inserts all marketplace categories (digital + physical) from the design doc.

```javascript
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

const categories = [
  // Digital - Top level
  { name: 'Development & IT', slug: 'development-it', type: 'digital', icon: 'Code2', children: [
    { name: 'Web Development', slug: 'web-development' },
    { name: 'Mobile Apps', slug: 'mobile-apps' },
    { name: 'WordPress', slug: 'wordpress' },
    { name: 'E-commerce', slug: 'ecommerce' },
    { name: 'DevOps & Cloud', slug: 'devops-cloud' },
    { name: 'QA & Testing', slug: 'qa-testing' },
    { name: 'AI & Machine Learning', slug: 'ai-machine-learning' },
  ]},
  { name: 'Design & Creative', slug: 'design-creative', type: 'digital', icon: 'Palette', children: [
    { name: 'Logo & Branding', slug: 'logo-branding' },
    { name: 'UI/UX Design', slug: 'ui-ux-design' },
    { name: 'Graphic Design', slug: 'graphic-design' },
    { name: 'Illustration', slug: 'illustration' },
    { name: 'Video & Animation', slug: 'video-animation' },
    { name: 'Photography', slug: 'photography' },
    { name: '3D Design', slug: '3d-design' },
  ]},
  // ... (all categories from design doc)
  // Physical - Top level
  { name: 'Construction & Renovation', slug: 'construction-renovation', type: 'physical', icon: 'Hammer', children: [
    { name: 'General Contractor', slug: 'general-contractor' },
    { name: 'Carpenter', slug: 'carpenter' },
    { name: 'Mason', slug: 'mason' },
    { name: 'Plasterer', slug: 'plasterer' },
    { name: 'Painter', slug: 'painter' },
    { name: 'Roofer', slug: 'roofer' },
  ]},
  // ... all other physical categories
];

async function seed() {
  const tenants = await sql`SELECT id FROM tenants LIMIT 1`;
  const tenantId = tenants[0].id;

  for (const locale of ['en', 'nl']) {
    for (let i = 0; i < categories.length; i++) {
      const cat = categories[i];
      // Insert parent
      const parent = await sql`
        INSERT INTO marketplace_categories (tenant_id, name, slug, icon, service_type, sort_order, locale)
        VALUES (${tenantId}, ${cat.name}, ${cat.slug}, ${cat.icon}, ${cat.type}, ${i}, ${locale})
        ON CONFLICT (slug, locale) DO UPDATE SET name = ${cat.name}, icon = ${cat.icon}
        RETURNING id
      `;
      // Insert children
      for (let j = 0; j < (cat.children || []).length; j++) {
        const child = cat.children[j];
        await sql`
          INSERT INTO marketplace_categories (tenant_id, name, slug, parent_id, service_type, sort_order, locale)
          VALUES (${tenantId}, ${child.name}, ${child.slug}, ${parent[0].id}, ${cat.type}, ${j}, ${locale})
          ON CONFLICT (slug, locale) DO UPDATE SET name = ${child.name}, parent_id = ${parent[0].id}
        `;
      }
      console.log(`  ✓ ${cat.name} (${locale}) + ${(cat.children || []).length} subcategories`);
    }
  }
}

seed().then(() => console.log('Done!')).catch(console.error);
```

**Step 2: Run the seed**

Run: `node scripts/seed-marketplace-categories.mjs`

**Step 3: Commit**

```bash
git add scripts/seed-marketplace-categories.mjs
git commit -m "feat: add marketplace category seed script (digital + physical)"
```

---

### Task 1.7: Marketplace Query Functions

**Files:**
- Create: `lib/marketplace-queries.ts`

**Step 1: Create marketplace-specific query file**

This keeps marketplace queries separate from the existing `lib/queries.ts`. Follow the exact same patterns (raw Neon SQL, COALESCE, type interfaces).

Create `lib/marketplace-queries.ts`:

```typescript
import { sql } from '@/lib/db';

// ============ TYPE DEFINITIONS ============

export interface FreelancerProfile {
  id: string;
  user_id: string;
  display_name: string;
  tagline: string | null;
  bio: string | null;
  avatar_url: string | null;
  hourly_rate: number | null;
  work_type: string;
  location_city: string | null;
  location_country: string | null;
  skills: string[];
  languages: string[];
  is_verified: boolean;
  rating_average: number;
  rating_count: number;
  total_orders: number;
  completion_rate: number;
  response_time_hours: number | null;
  status: string;
  created_at: string;
}

export interface Gig {
  id: string;
  freelancer_id: string;
  freelancer_name: string;
  freelancer_avatar: string | null;
  freelancer_rating: number;
  freelancer_verified: boolean;
  title: string;
  slug: string;
  description: string;
  category_id: string;
  category_name: string;
  category_slug: string;
  tags: string[];
  work_type: string;
  location_city: string | null;
  location_country: string | null;
  price_from: number;
  currency: string;
  views: number;
  order_count: number;
  rating_average: number;
  rating_count: number;
  is_featured: boolean;
  status: string;
  images: string[];
  created_at: string;
}

export interface GigDetail extends Gig {
  packages: GigPackage[];
  all_images: { url: string; alt: string }[];
}

export interface GigPackage {
  id: string;
  tier: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  delivery_days: number;
  revision_count: number;
  features: string[];
}

export interface MarketplaceCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  parent_id: string | null;
  service_type: string;
  gig_count: number;
  children?: MarketplaceCategory[];
}

export interface Project {
  id: string;
  client_id: string;
  client_name: string;
  title: string;
  slug: string;
  description: string;
  category_name: string;
  required_skills: string[];
  budget_min: number | null;
  budget_max: number | null;
  currency: string;
  deadline: string | null;
  work_type: string;
  location_city: string | null;
  location_country: string | null;
  bid_count: number;
  views: number;
  status: string;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  order_type: string;
  title: string;
  amount: number;
  platform_fee: number;
  freelancer_earnings: number;
  currency: string;
  status: string;
  escrow_status: string;
  delivery_deadline: string | null;
  client_name: string;
  freelancer_name: string;
  created_at: string;
  completed_at: string | null;
}

// ============ GIG QUERIES ============

export async function getPublishedGigs(
  limit = 20,
  offset = 0,
  locale = 'en',
  filters?: {
    categorySlug?: string;
    workType?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: string;
  }
) {
  // Base query with dynamic filters
  let query = sql`
    SELECT
      g.id, g.title, g.slug, g.description, g.tags, g.work_type,
      g.location_city, g.location_country, g.views, g.order_count,
      g.rating_average, g.rating_count, g.is_featured, g.status, g.created_at,
      fp.display_name AS freelancer_name,
      fp.avatar_url AS freelancer_avatar,
      fp.rating_average AS freelancer_rating,
      fp.is_verified AS freelancer_verified,
      fp.id AS freelancer_id,
      mc.name AS category_name,
      mc.slug AS category_slug,
      mc.id AS category_id,
      COALESCE((SELECT MIN(price) FROM gig_packages WHERE gig_id = g.id), 0) AS price_from,
      COALESCE((SELECT currency FROM gig_packages WHERE gig_id = g.id LIMIT 1), 'EUR') AS currency,
      COALESCE(
        (SELECT ARRAY_AGG(image_url ORDER BY sort_order) FROM gig_images WHERE gig_id = g.id),
        ARRAY[]::TEXT[]
      ) AS images
    FROM gigs g
    JOIN freelancer_profiles fp ON g.freelancer_id = fp.id
    JOIN marketplace_categories mc ON g.category_id = mc.id
    WHERE g.status = 'active'
      AND g.locale = ${locale}
    ORDER BY g.is_featured DESC, g.rating_average DESC, g.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  return query as Gig[];
}

export async function getGigBySlug(slug: string, locale = 'en'): Promise<GigDetail | null> {
  const gigs = await sql`
    SELECT
      g.*, fp.display_name AS freelancer_name, fp.avatar_url AS freelancer_avatar,
      fp.rating_average AS freelancer_rating, fp.is_verified AS freelancer_verified,
      fp.id AS freelancer_id, fp.bio AS freelancer_bio,
      fp.total_orders AS freelancer_total_orders,
      fp.location_city AS freelancer_city, fp.location_country AS freelancer_country,
      mc.name AS category_name, mc.slug AS category_slug, mc.id AS category_id
    FROM gigs g
    JOIN freelancer_profiles fp ON g.freelancer_id = fp.id
    JOIN marketplace_categories mc ON g.category_id = mc.id
    WHERE g.slug = ${slug} AND g.locale = ${locale} AND g.status = 'active'
    LIMIT 1
  `;

  if (gigs.length === 0) return null;

  const gig = gigs[0];

  // Fetch packages and images
  const packages = await sql`
    SELECT id, tier, title, description, price, currency, delivery_days, revision_count, features
    FROM gig_packages WHERE gig_id = ${gig.id}
    ORDER BY price ASC
  `;

  const images = await sql`
    SELECT image_url AS url, COALESCE(alt_text, '') AS alt
    FROM gig_images WHERE gig_id = ${gig.id}
    ORDER BY sort_order
  `;

  return {
    ...gig,
    packages: packages.map(p => ({
      ...p,
      features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features || [],
    })),
    all_images: images,
  } as GigDetail;
}

export async function getMarketplaceCategories(locale = 'en'): Promise<MarketplaceCategory[]> {
  const cats = await sql`
    SELECT
      mc.id, mc.name, mc.slug, mc.description, mc.icon, mc.image_url,
      mc.parent_id, mc.service_type,
      COALESCE(
        (SELECT COUNT(*) FROM gigs g WHERE g.category_id = mc.id AND g.status = 'active' AND g.locale = ${locale}),
        0
      )::int AS gig_count
    FROM marketplace_categories mc
    WHERE mc.is_active = true AND mc.locale = ${locale}
    ORDER BY mc.sort_order
  `;

  // Build tree structure
  const parentCats = cats.filter(c => c.parent_id === null);
  return parentCats.map(parent => ({
    ...parent,
    children: cats.filter(c => c.parent_id === parent.id),
  })) as MarketplaceCategory[];
}

// ============ FREELANCER QUERIES ============

export async function getFreelancerBySlug(userId: string, locale = 'en') {
  const profiles = await sql`
    SELECT fp.*, u.email
    FROM freelancer_profiles fp
    JOIN users u ON fp.user_id = u.id
    WHERE fp.user_id = ${userId} AND fp.locale = ${locale} AND fp.status = 'active'
    LIMIT 1
  `;
  return profiles.length > 0 ? profiles[0] : null;
}

export async function searchFreelancers(
  limit = 20,
  offset = 0,
  locale = 'en',
  filters?: {
    skill?: string;
    workType?: string;
    country?: string;
    minRate?: number;
    maxRate?: number;
    search?: string;
  }
) {
  return await sql`
    SELECT
      fp.id, fp.user_id, fp.display_name, fp.tagline, fp.avatar_url,
      fp.hourly_rate, fp.work_type, fp.location_city, fp.location_country,
      fp.skills, fp.languages, fp.is_verified,
      fp.rating_average, fp.rating_count, fp.total_orders, fp.completion_rate,
      fp.response_time_hours, fp.created_at
    FROM freelancer_profiles fp
    WHERE fp.status = 'active' AND fp.locale = ${locale}
    ORDER BY fp.is_verified DESC, fp.rating_average DESC, fp.total_orders DESC
    LIMIT ${limit} OFFSET ${offset}
  ` as FreelancerProfile[];
}

// ============ ORDER QUERIES ============

export async function createOrder(data: {
  tenantId: string;
  orderType: string;
  clientId: string;
  freelancerId: string;
  gigId?: string;
  gigPackageId?: string;
  projectId?: string;
  bidId?: string;
  title: string;
  description?: string;
  requirements?: string;
  amount: number;
  currency?: string;
  deliveryDays?: number;
  revisionCount?: number;
}) {
  const platformFee = calculatePlatformFee(data.amount);
  const freelancerEarnings = data.amount - platformFee;
  const orderNumber = `ORD-${new Date().getFullYear()}-${Date.now().toString(36).toUpperCase()}`;
  const deliveryDeadline = data.deliveryDays
    ? new Date(Date.now() + data.deliveryDays * 24 * 60 * 60 * 1000).toISOString()
    : null;

  const result = await sql`
    INSERT INTO orders (
      tenant_id, order_number, order_type, client_id, freelancer_id,
      gig_id, gig_package_id, project_id, bid_id,
      title, description, requirements,
      amount, platform_fee, freelancer_earnings, currency,
      delivery_deadline, revision_count, status, escrow_status,
      created_at, updated_at
    ) VALUES (
      ${data.tenantId}, ${orderNumber}, ${data.orderType}, ${data.clientId}, ${data.freelancerId},
      ${data.gigId || null}, ${data.gigPackageId || null}, ${data.projectId || null}, ${data.bidId || null},
      ${data.title}, ${data.description || null}, ${data.requirements || null},
      ${data.amount}, ${platformFee}, ${freelancerEarnings}, ${data.currency || 'EUR'},
      ${deliveryDeadline}, ${data.revisionCount || 0}, 'pending', 'held',
      NOW(), NOW()
    )
    RETURNING *
  `;

  return result[0] as Order;
}

export function calculatePlatformFee(amount: number): number {
  if (amount < 50) return Math.round(amount * 0.15 * 100) / 100;
  if (amount <= 500) return Math.round(amount * 0.12 * 100) / 100;
  return Math.round(amount * 0.10 * 100) / 100;
}

export async function getOrdersByUser(userId: string, role: 'client' | 'freelancer', limit = 20, offset = 0) {
  if (role === 'client') {
    return await sql`
      SELECT o.*, fp.display_name AS freelancer_name
      FROM orders o
      JOIN freelancer_profiles fp ON o.freelancer_id = fp.id
      WHERE o.client_id = ${userId}
      ORDER BY o.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    ` as Order[];
  }

  // Freelancer - need to join through profile
  return await sql`
    SELECT o.*, u.name AS client_name
    FROM orders o
    JOIN users u ON o.client_id = u.id
    JOIN freelancer_profiles fp ON o.freelancer_id = fp.id
    WHERE fp.user_id = ${userId}
    ORDER BY o.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  ` as Order[];
}

// ============ PROJECT QUERIES ============

export async function getOpenProjects(limit = 20, offset = 0, locale = 'en') {
  return await sql`
    SELECT
      p.id, p.title, p.slug, p.description, p.required_skills,
      p.budget_min, p.budget_max, p.currency, p.deadline,
      p.work_type, p.location_city, p.location_country,
      p.bid_count, p.views, p.status, p.created_at,
      u.name AS client_name,
      mc.name AS category_name
    FROM projects p
    JOIN users u ON p.client_id = u.id
    JOIN marketplace_categories mc ON p.category_id = mc.id
    WHERE p.status = 'open' AND p.locale = ${locale}
    ORDER BY p.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  ` as Project[];
}

// ============ NOTIFICATION HELPERS ============

export async function createNotification(
  userId: string,
  type: string,
  title: string,
  body: string,
  link?: string,
  metadata?: Record<string, unknown>
) {
  await sql`
    INSERT INTO notifications (user_id, type, title, body, link, metadata)
    VALUES (${userId}, ${type}, ${title}, ${body}, ${link || null}, ${JSON.stringify(metadata || {})})
  `;
}
```

**Step 2: Commit**

```bash
git add lib/marketplace-queries.ts
git commit -m "feat: add marketplace query functions (gigs, freelancers, orders, projects)"
```

---

### Task 1.8: Marketplace Public Pages - Gig Listing

**Files:**
- Create: `app/[locale]/marketplace/page.tsx`
- Create: `app/[locale]/marketplace/layout.tsx`
- Create: `app/[locale]/marketplace/gigs/page.tsx`
- Create: `components/marketplace/GigCard.tsx`
- Create: `components/marketplace/GigFilters.tsx`
- Modify: `messages/en.json` - add marketplace namespace
- Modify: `messages/nl.json` - add marketplace namespace

**Step 1: Add i18n strings for marketplace**

Add `marketplace` namespace to both `messages/en.json` and `messages/nl.json` with keys for:
- Page titles and descriptions
- Filter labels (category, price range, work type, sort)
- Gig card labels (starting at, reviews, orders)
- Empty state messages

**Step 2: Create marketplace layout**

Create `app/[locale]/marketplace/layout.tsx`:

```typescript
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background-light dark:bg-secondary-dark">
        {children}
      </main>
      <Footer />
    </>
  );
}
```

**Step 3: Create GigCard component**

Create `components/marketplace/GigCard.tsx`:

```typescript
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { safeImage, safeText } from '@/lib/safe';

interface GigCardProps {
  gig: {
    slug: string;
    title: string;
    images: string[];
    freelancer_name: string;
    freelancer_avatar: string | null;
    freelancer_verified: boolean;
    freelancer_rating: number;
    category_name: string;
    price_from: number;
    currency: string;
    rating_average: number;
    rating_count: number;
    order_count: number;
    work_type: string;
    location_city: string | null;
  };
  locale: string;
}

export function GigCard({ gig, locale }: GigCardProps) {
  const t = useTranslations('marketplace');
  const coverImage = safeImage(gig.images?.[0], '/images/placeholder-gig.jpg');
  const avatar = safeImage(gig.freelancer_avatar, '/images/posts/author/author-image-1.png');

  return (
    <Link
      href={`/${locale}/marketplace/gigs/${gig.slug}`}
      className="group bg-white dark:bg-secondary-medium rounded-sm shadow-sm hover:shadow-lg
                 transition-all duration-200 overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      {/* Cover image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={coverImage}
          alt={gig.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {gig.work_type !== 'remote' && gig.location_city && (
          <span className="absolute top-3 left-3 bg-white/90 dark:bg-secondary/90 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {gig.location_city}
          </span>
        )}
      </div>

      <div className="p-4">
        {/* Freelancer info */}
        <div className="flex items-center gap-2 mb-3">
          <Image
            src={avatar}
            alt={gig.freelancer_name}
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="text-sm font-medium truncate">{gig.freelancer_name}</span>
          {gig.freelancer_verified && (
            <span className="text-accent text-xs">✓</span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-medium text-sm leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {safeText(gig.title, 'Untitled Gig')}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{gig.rating_average.toFixed(1)}</span>
          <span className="text-xs text-text-muted">({gig.rating_count})</span>
        </div>

        {/* Price */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
          <p className="text-xs text-text-muted">{t('startingAt')}</p>
          <p className="text-lg font-heading font-bold text-primary">
            {gig.currency === 'EUR' ? '€' : '$'}{gig.price_from.toFixed(0)}
          </p>
        </div>
      </div>
    </Link>
  );
}
```

**Step 4: Create GigFilters component**

Create `components/marketplace/GigFilters.tsx` following the exact pattern from `components/platform-filters.tsx`:
- URL-based state management with `useSearchParams` and `useRouter`
- Filters: category, work_type, price range, sort, search
- In-memory filtering with `useMemo`

**Step 5: Create marketplace homepage**

Create `app/[locale]/marketplace/page.tsx`:

```typescript
import { getPublishedGigs, getMarketplaceCategories } from '@/lib/marketplace-queries';
import { GigCard } from '@/components/marketplace/GigCard';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function MarketplacePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'marketplace' });

  const [featuredGigs, categories] = await Promise.all([
    getPublishedGigs(8, 0, locale),
    getMarketplaceCategories(locale),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          {t('heroTitle')}
        </h1>
        <p className="text-xl text-text-muted max-w-2xl mx-auto mb-8">
          {t('heroSubtitle')}
        </p>
        {/* Search bar */}
        <div className="max-w-xl mx-auto">
          <input
            type="search"
            placeholder={t('searchPlaceholder')}
            className="w-full px-6 py-4 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-sm
                       focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-heading font-bold mb-8">{t('browseCategories')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/${locale}/marketplace/gigs?category=${cat.slug}`}
              className="p-4 bg-white dark:bg-secondary-medium rounded-sm border border-gray-100
                         dark:border-gray-700 hover:border-primary hover:shadow-sm transition-all text-center"
            >
              <span className="text-2xl mb-2 block">{cat.icon}</span>
              <h3 className="font-medium text-sm">{cat.name}</h3>
              <p className="text-xs text-text-muted mt-1">{cat.gig_count} {t('services')}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Gigs */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-heading font-bold">{t('featuredGigs')}</h2>
          <Link
            href={`/${locale}/marketplace/gigs`}
            className="text-primary hover:underline flex items-center gap-1"
          >
            {t('viewAll')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGigs.map(gig => (
            <GigCard key={gig.id} gig={gig} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
```

**Step 6: Create gigs listing page with filters**

Create `app/[locale]/marketplace/gigs/page.tsx` with `GigFilters` and grid of `GigCard` components.

**Step 7: Commit**

```bash
git add app/[locale]/marketplace/ components/marketplace/ messages/
git commit -m "feat: add marketplace homepage and gig listing with filters"
```

---

### Task 1.9: Gig Detail Page

**Files:**
- Create: `app/[locale]/marketplace/gigs/[slug]/page.tsx`
- Create: `components/marketplace/GigPackageSelector.tsx`
- Create: `components/marketplace/GigImageGallery.tsx`

**Step 1: Create GigPackageSelector (client component)**

Shows the three pricing tiers (Basic/Standard/Premium) as tabs with a sticky sidebar on desktop.

**Step 2: Create GigImageGallery (client component)**

Image carousel/gallery for gig images.

**Step 3: Create gig detail page (server component)**

```typescript
import { getGigBySlug } from '@/lib/marketplace-queries';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function GigDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const gig = await getGigBySlug(slug, locale);

  if (!gig) notFound();

  // Serialize dates for client components
  const serializedGig = {
    ...gig,
    created_at: gig.created_at?.toString() || '',
    packages: gig.packages.map(p => ({ ...p })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Content (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          <GigImageGallery images={gig.all_images} />
          <h1 className="text-2xl font-heading font-bold">{gig.title}</h1>
          {/* Freelancer info bar, description, reviews */}
        </div>

        {/* Right: Package selector (1/3, sticky) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <GigPackageSelector packages={serializedGig.packages} locale={locale} gigSlug={slug} />
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 4: Commit**

```bash
git add app/[locale]/marketplace/gigs/[slug]/ components/marketplace/
git commit -m "feat: add gig detail page with package selector and image gallery"
```

---

### Task 1.10: Freelancer Profile Page

**Files:**
- Create: `app/[locale]/marketplace/freelancers/page.tsx`
- Create: `app/[locale]/marketplace/freelancers/[slug]/page.tsx`
- Create: `components/marketplace/FreelancerCard.tsx`

Similar pattern to gig pages. Freelancer directory with search/filter, and detail page showing bio, portfolio, gigs, and reviews.

**Commit message:** `feat: add freelancer directory and profile pages`

---

### Task 1.11: Freelancer Dashboard - Profile Setup

**Files:**
- Create: `app/[locale]/dashboard/seller/page.tsx`
- Create: `app/[locale]/dashboard/seller/profile/page.tsx`
- Create: `app/[locale]/dashboard/seller/layout.tsx`
- Create: `components/dashboard/SellerSidebar.tsx`
- Create: `components/dashboard/ProfileForm.tsx`
- Create: `app/api/marketplace/seller/profile/route.ts`

The seller dashboard where freelancers manage their profile, with a sidebar nav and profile edit form that calls the API to update `freelancer_profiles`.

**Commit message:** `feat: add freelancer dashboard with profile management`

---

### Task 1.12: Gig Creation Wizard

**Files:**
- Create: `app/[locale]/dashboard/seller/gigs/new/page.tsx`
- Create: `app/[locale]/dashboard/seller/gigs/page.tsx`
- Create: `components/dashboard/GigWizard.tsx`
- Create: `app/api/marketplace/seller/gigs/route.ts`

Multi-step gig creation wizard:
1. Category & title
2. Description & tags
3. Pricing packages (Basic/Standard/Premium)
4. Image upload
5. Review & publish

API route handles creation with auth check via `requireFreelancer()`.

**Commit message:** `feat: add gig creation wizard with multi-step form`

---

## Phase 2: Payments & Orders

### Task 2.1: Stripe Connect Integration

**Files:**
- Create: `lib/stripe.ts`
- Create: `app/api/stripe/connect/onboard/route.ts`
- Create: `app/api/stripe/connect/return/route.ts`
- Create: `app/[locale]/dashboard/seller/stripe/page.tsx`
- Add env vars: `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`

**Step 1: Create Stripe helper**

```typescript
// lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export function getStripeConnectUrl(accountId: string, returnUrl: string, refreshUrl: string) {
  return stripe.accountLinks.create({
    account: accountId,
    refresh_url: refreshUrl,
    return_url: returnUrl,
    type: 'account_onboarding',
  });
}
```

**Step 2: Create Connect onboarding endpoint**

Creates a Stripe Connect Express account and redirects to Stripe's onboarding flow.

**Step 3: Create return handler**

Checks if onboarding is complete, updates `freelancer_profiles.stripe_onboarding_complete`.

**Step 4: Create Stripe dashboard page in seller area**

Shows onboarding status, link to Stripe dashboard, earnings summary.

**Commit message:** `feat: add Stripe Connect onboarding for freelancers`

---

### Task 2.2: Checkout & Escrow Flow

**Files:**
- Create: `app/api/stripe/checkout/route.ts`
- Create: `app/api/stripe/webhook/route.ts`
- Create: `app/[locale]/marketplace/checkout/[gigSlug]/page.tsx`
- Create: `components/marketplace/CheckoutForm.tsx`

**Step 1: Checkout API**

Creates a Stripe PaymentIntent with `transfer_data` for Connect, holds funds in escrow.

**Step 2: Stripe webhook handler**

Handles `payment_intent.succeeded`, `payment_intent.payment_failed` events. On success: creates order, creates transaction, sends notifications.

**Step 3: Checkout page**

Shows order summary, requirements textarea, Stripe Elements payment form.

**Commit message:** `feat: add checkout flow with Stripe escrow payments`

---

### Task 2.3: Order Management

**Files:**
- Create: `app/[locale]/dashboard/orders/page.tsx`
- Create: `app/[locale]/dashboard/orders/[id]/page.tsx`
- Create: `app/[locale]/dashboard/seller/orders/page.tsx`
- Create: `app/[locale]/dashboard/seller/orders/[id]/page.tsx`
- Create: `app/api/marketplace/orders/[id]/deliver/route.ts`
- Create: `app/api/marketplace/orders/[id]/approve/route.ts`
- Create: `app/api/marketplace/orders/[id]/revision/route.ts`

Order lifecycle: `pending` -> `active` -> `delivered` -> `completed` (or `revision` -> `delivered` loop).

On approve: triggers Stripe transfer to freelancer's Connect account via `stripe.transfers.create()`.

**Commit message:** `feat: add order management with delivery and approval flow`

---

### Task 2.4: Earnings Dashboard

**Files:**
- Create: `app/[locale]/dashboard/seller/earnings/page.tsx`
- Create: `app/api/marketplace/seller/earnings/route.ts`
- Create: `components/dashboard/EarningsChart.tsx`

Shows: pending balance, available balance, total earned, transaction history, payout schedule.

**Commit message:** `feat: add freelancer earnings dashboard`

---

## Phase 3: Communication & Projects

### Task 3.1: Real-Time Messaging (Pusher)

**Files:**
- Create: `lib/pusher.ts` (server-side)
- Create: `lib/pusher-client.ts` (client-side)
- Create: `app/api/messages/conversations/route.ts`
- Create: `app/api/messages/conversations/[id]/route.ts`
- Create: `app/api/messages/send/route.ts`
- Create: `app/[locale]/dashboard/messages/page.tsx`
- Create: `app/[locale]/dashboard/messages/[id]/page.tsx`
- Create: `components/dashboard/ChatWindow.tsx`
- Create: `components/dashboard/ConversationList.tsx`
- Add env vars: `PUSHER_APP_ID`, `PUSHER_KEY`, `PUSHER_SECRET`, `PUSHER_CLUSTER`, `NEXT_PUBLIC_PUSHER_KEY`, `NEXT_PUBLIC_PUSHER_CLUSTER`

**Step 1: Server-side Pusher setup**

```typescript
// lib/pusher.ts
import Pusher from 'pusher';

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});
```

**Step 2: Client-side Pusher**

```typescript
// lib/pusher-client.ts
import PusherClient from 'pusher-js';

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
});
```

**Step 3: Message send API**

POST to `/api/messages/send` - inserts message, triggers Pusher event on conversation channel, sends email notification via Resend.

**Step 4: ChatWindow component**

Real-time chat UI subscribed to Pusher channel `conversation-{id}`, with message list, input, file upload.

**Step 5: Conversation list and messaging pages**

Full messaging interface with conversation sidebar and chat area.

**Commit message:** `feat: add real-time messaging with Pusher`

---

### Task 3.2: Project Board

**Files:**
- Create: `app/[locale]/marketplace/projects/page.tsx`
- Create: `app/[locale]/marketplace/projects/[slug]/page.tsx`
- Create: `app/[locale]/dashboard/projects/new/page.tsx`
- Create: `app/[locale]/dashboard/projects/page.tsx`
- Create: `app/[locale]/dashboard/projects/[id]/page.tsx`
- Create: `app/api/marketplace/projects/route.ts`
- Create: `app/api/marketplace/projects/[id]/bid/route.ts`
- Create: `app/api/marketplace/projects/[id]/select/route.ts`
- Create: `components/marketplace/ProjectCard.tsx`
- Create: `components/marketplace/BidForm.tsx`

Clients post projects, freelancers browse and bid. Client selects winner, milestone payments begin.

**Commit message:** `feat: add project board with bidding system`

---

### Task 3.3: Milestone Payments

**Files:**
- Create: `app/api/marketplace/orders/[id]/milestones/route.ts`
- Create: `components/dashboard/MilestoneTracker.tsx`

After project freelancer selection, milestones are created. Each milestone has its own payment via Stripe.

**Commit message:** `feat: add milestone payment system for projects`

---

## Phase 4: Local Services & Quotes

### Task 4.1: Location-Based Search

**Files:**
- Modify: `lib/marketplace-queries.ts` - add geo-filtered queries
- Create: `components/marketplace/LocationSearch.tsx`

Add postcode/city search with radius filtering. Uses simple distance calculation (no PostGIS needed for MVP):

```sql
-- Approximate distance using lat/lon (added to freelancer_profiles)
ALTER TABLE freelancer_profiles ADD COLUMN IF NOT EXISTS latitude DECIMAL(10,7);
ALTER TABLE freelancer_profiles ADD COLUMN IF NOT EXISTS longitude DECIMAL(10,7);

-- Query with radius filter (Haversine approximation)
SELECT *, (
  6371 * acos(cos(radians($lat)) * cos(radians(latitude))
  * cos(radians(longitude) - radians($lon)) + sin(radians($lat)) * sin(radians(latitude)))
) AS distance_km
FROM freelancer_profiles
WHERE status = 'active' AND work_type IN ('local', 'hybrid')
HAVING distance_km < $radius
ORDER BY distance_km
```

**Commit message:** `feat: add location-based freelancer search with radius filtering`

---

### Task 4.2: Quote Request Flow

**Files:**
- Create: `app/[locale]/marketplace/quote-request/page.tsx`
- Create: `app/api/marketplace/quote-request/route.ts`
- Create: `app/api/marketplace/quote-request/[id]/respond/route.ts`
- Create: `components/marketplace/QuoteRequestForm.tsx`
- Create: `components/marketplace/QuoteCompare.tsx`
- Create: `app/[locale]/dashboard/seller/quotes/page.tsx`

Client fills form (category, description, photos, postcode) -> matching freelancers notified -> respond with quotes -> client compares and selects -> proceeds to order.

**Commit message:** `feat: add quote request system for local services`

---

## Phase 5: Trust & Quality

### Task 5.1: Two-Sided Review System

**Files:**
- Create: `app/api/marketplace/orders/[id]/review/route.ts`
- Create: `components/marketplace/OrderReviewForm.tsx`
- Create: `components/marketplace/ReviewDisplay.tsx`

After order completion, both parties can leave reviews. Reviews are only visible after both have submitted (prevents retaliation).

**Commit message:** `feat: add two-sided review system for completed orders`

---

### Task 5.2: Dispute Resolution

**Files:**
- Create: `app/api/marketplace/orders/[id]/dispute/route.ts`
- Create: `app/[locale]/dashboard/orders/[id]/dispute/page.tsx`
- Extend admin dashboard with dispute management pages

Client can open dispute within 7 days of delivery. Admin reviews evidence from both parties and decides: full refund, partial refund, or release to freelancer.

**Commit message:** `feat: add dispute resolution flow`

---

### Task 5.3: Freelancer Verification & Badges

**Files:**
- Create: `app/api/marketplace/seller/verify/route.ts`
- Modify: `components/marketplace/FreelancerCard.tsx` - add badges

Badge system:
- "Verified" - ID verified by admin
- "Top Rated" - rating >= 4.8 with 10+ reviews
- "Rising Star" - new freelancer with 5+ orders and 4.5+ rating

**Commit message:** `feat: add freelancer verification and badge system`

---

## Phase 6: Growth & Content Integration

### Task 6.1: Marketplace SEO Pages

**Files:**
- Create: `scripts/seed-marketplace-seo-pages.mjs`
- Modify: `app/sitemap.ts` - add marketplace routes

Generate SEO landing pages for marketplace categories:
- "Hire a [profession] near [city]"
- "Best [category] freelancers in [country]"
- "[Service] cost guide 2026"

**Commit message:** `feat: add marketplace SEO pages and sitemap integration`

---

### Task 6.2: Navigation Integration

**Files:**
- Modify: `components/header.tsx` - add Marketplace nav item
- Modify: `messages/en.json` - add header.marketplace
- Modify: `messages/nl.json` - add header.marketplace

Add "Marketplace" to the main navigation between "Platforms" and "Tools".

**Commit message:** `feat: add marketplace to main navigation`

---

### Task 6.3: Homepage Integration

**Files:**
- Modify: `app/[locale]/page.tsx` - add marketplace section

Add a "Popular Services" section to the homepage showcasing featured gigs and a CTA to browse the marketplace.

**Commit message:** `feat: add marketplace section to homepage`

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 1.1 - 1.12 | Foundation: deps, DB, auth, categories, queries, pages, dashboards |
| 2 | 2.1 - 2.4 | Payments: Stripe Connect, checkout, escrow, orders, earnings |
| 3 | 3.1 - 3.3 | Communication: Pusher messaging, project board, milestones |
| 4 | 4.1 - 4.2 | Local: geo search, quote requests |
| 5 | 5.1 - 5.3 | Trust: reviews, disputes, verification |
| 6 | 6.1 - 6.3 | Growth: SEO pages, navigation, homepage integration |

**Total: ~24 tasks across 6 phases**

Each task has a clear commit boundary. Tasks within a phase can sometimes be parallelized (e.g., 1.8 and 1.10 are independent), but phases are sequential (Phase 2 depends on Phase 1 completion).
