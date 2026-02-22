# SkillLinkup Freelance Marketplace - Design Document

**Date**: 2026-02-22
**Status**: Approved
**Author**: Claude + Marvin

---

## Vision

SkillLinkup evolves from a freelance platform comparison site into a **full-stack marketplace** for both digital freelancers (developers, designers, writers) and physical service providers (plumbers, roofers, electricians). International scope, Stripe Connect for payments, escrow protection, and in-app messaging.

### What Makes It Unique vs Fiverr/Upwork

- Physical + digital services in one platform
- Quote request system for local jobs
- Fixed gigs + project bidding combined
- Existing content engine (155+ SEO pages) as traffic source
- Existing freelancer tools (time tracker, invoice generator) as retention hooks

---

## User Roles

| Role | Description |
|------|-------------|
| **Freelancer** | Offers services (gigs + bids on projects) |
| **Client** | Searches services, posts projects, orders gigs |
| **Admin** | Moderates, manages platform, handles disputes |

---

## Core Features (MVP)

### 1. Authentication & Profiles

- Registration/login via Stack Auth (email + social OAuth)
- **Freelancer profile**: bio, skills, portfolio, reviews, location, availability, verification status
- **Client profile**: company info, project history, reviews given

### 2. Gig Marketplace (Fiverr-style)

- Freelancers create gigs: title, description, category, pricing tiers (Basic/Standard/Premium), delivery time, images
- Search/filter: category, price, rating, location, work-type (remote/local/hybrid)
- Direct order flow -> Stripe payment -> escrow

### 3. Project Board (Upwork-style)

- Clients post projects: description, budget range, deadline, category, location
- Freelancers browse and bid (price + pitch + estimated delivery)
- Client selects freelancer -> milestone payments via Stripe

### 4. Quote Requests (Local Services)

- Client describes job + postcode/city
- Freelancers in radius receive notification
- Respond with quote (price, availability, approach)
- Client chooses -> payment via platform after agreement

### 5. Payments & Escrow (Stripe Connect)

- Freelancers onboard via Stripe Connect (KYC verification)
- Client pays -> money held in escrow
- Freelancer delivers -> client approves -> payout
- Dispute flow if client is unsatisfied
- Platform commission: 10-15% per transaction

### 6. In-App Messaging

- Real-time chat per order/project (via Pusher or Ably)
- File sharing (images, documents)
- Email notifications for new messages (Resend)
- Message history available for disputes

### 7. Reviews & Ratings

- After every completed order: both parties review each other
- 5-star system + written review
- Verification badge for verified freelancers
- Rating aggregation on profile

### 8. Valuable Content (Traffic)

- Existing blog + guides + SEO pages continue
- New content: "What does a plumber cost?", "Hire a freelance developer: complete guide"
- Tools (time tracker, invoice generator) as lead magnets
- Platform comparisons link to own marketplace

---

## Page Structure & Routes

### Public (not logged in)

```
/[locale]/marketplace                    - Marketplace homepage (featured gigs, categories)
/[locale]/marketplace/gigs               - Browse all gigs + search/filter
/[locale]/marketplace/gigs/[slug]        - Gig detail (description, packages, reviews)
/[locale]/marketplace/projects           - Browse open projects/jobs
/[locale]/marketplace/projects/[slug]    - Project detail (description, budget, bid count)
/[locale]/marketplace/categories         - All categories overview
/[locale]/marketplace/categories/[slug]  - Gigs per category
/[locale]/marketplace/freelancers        - Freelancer directory + search
/[locale]/marketplace/freelancers/[slug] - Freelancer profile (portfolio, reviews, gigs)
/[locale]/marketplace/how-it-works       - Explanation page for new users
```

### Client Dashboard (logged in as client)

```
/[locale]/dashboard                      - Overview (active orders, messages, notifications)
/[locale]/dashboard/orders               - My orders (as client)
/[locale]/dashboard/orders/[id]          - Order detail (chat, deliverables, milestones)
/[locale]/dashboard/projects             - My posted projects
/[locale]/dashboard/projects/new         - Post new project/job
/[locale]/dashboard/projects/[id]        - Manage project (view bids, select freelancer)
/[locale]/dashboard/messages             - All conversations
/[locale]/dashboard/messages/[id]        - Chat with freelancer
/[locale]/dashboard/reviews              - My written reviews
/[locale]/dashboard/settings             - Account settings
/[locale]/dashboard/payments             - Payment history
```

### Freelancer Dashboard (logged in as freelancer)

```
/[locale]/dashboard/seller               - Seller overview (earnings, stats, to-dos)
/[locale]/dashboard/seller/gigs          - Manage my gigs
/[locale]/dashboard/seller/gigs/new      - Create new gig (guided wizard)
/[locale]/dashboard/seller/gigs/[id]     - Edit gig
/[locale]/dashboard/seller/orders        - Incoming orders
/[locale]/dashboard/seller/orders/[id]   - Handle order (upload deliverables)
/[locale]/dashboard/seller/bids          - My bids on projects
/[locale]/dashboard/seller/earnings      - Earnings overview + payouts
/[locale]/dashboard/seller/profile       - Edit profile (portfolio, skills, rate)
/[locale]/dashboard/seller/analytics     - Performance stats (views, conversion, response time)
/[locale]/dashboard/seller/stripe        - Stripe Connect onboarding/management
```

### Admin (extend existing admin dashboard)

```
/admin/marketplace/orders                - Moderate all orders
/admin/marketplace/disputes              - Handle disputes
/admin/marketplace/freelancers           - Freelancer verification/moderation
/admin/marketplace/gigs                  - Gig moderation
/admin/marketplace/projects              - Project moderation
/admin/marketplace/payouts               - Payouts overview
/admin/marketplace/categories            - Manage marketplace categories
```

---

## User Flows

### Flow 1: Client Orders a Gig

```
Client searches -> Filters by category/location/price -> Views gig detail
-> Chooses package (Basic/Standard/Premium) -> Adds requirements
-> Pays via Stripe -> Order created (status: active)
-> Freelancer receives notification -> Chat opens
-> Freelancer delivers -> Client reviews deliverable
-> Client approves -> Escrow release -> Both write review
   OR
-> Client requests revision -> Freelancer adjusts -> Re-review
   OR
-> Client opens dispute -> Admin mediates -> Refund or release
```

### Flow 2: Client Posts Project (Digital)

```
Client creates project -> Title, description, budget range, deadline, skills
-> Project visible on project board
-> Freelancers bid (price + pitch + delivery time)
-> Client reviews bids + freelancer profiles
-> Client selects freelancer -> Agree on milestone payments
-> Per milestone: freelancer delivers -> client approves -> payment
-> Project completed -> Both write review
```

### Flow 3: Quote Request for Local Job

```
Client describes job -> Category, description, photos, postcode/city
-> Freelancers within radius receive notification
-> Respond with quote (price, availability, approach)
-> Client compares quotes + reviews profiles/ratings
-> Client accepts quote -> Down payment via Stripe (e.g. 30%)
-> Freelancer performs job -> Client confirms completion
-> Remaining payment via platform -> Review
```

### Flow 4: Freelancer Onboarding

```
Registration -> Choose: "I want to offer services"
-> Create profile: bio, skills, portfolio, location, work type
-> Stripe Connect onboarding (KYC verification)
-> Create first gig (guided wizard)
-> Gig in review -> Admin approves -> Live
-> Optional: ID verification for "Verified" badge
```

---

## Category Taxonomy

### Digital Services

```
Development & IT
├── Web Development
├── Mobile Apps
├── WordPress
├── E-commerce
├── DevOps & Cloud
├── QA & Testing
└── AI & Machine Learning

Design & Creative
├── Logo & Branding
├── UI/UX Design
├── Graphic Design
├── Illustration
├── Video & Animation
├── Photography
└── 3D Design

Writing & Translation
├── Copywriting
├── Content Writing
├── Technical Writing
├── Translation
├── SEO Content
└── Ghostwriting

Marketing & Sales
├── Social Media
├── SEO
├── Google Ads
├── Email Marketing
├── Influencer Marketing
└── Market Research

Business Services
├── Accounting
├── Legal Advice
├── Virtual Assistant
├── Project Management
├── HR & Recruitment
└── Business Consulting
```

### Physical/Local Services

```
Construction & Renovation
├── General Contractor
├── Carpenter
├── Mason
├── Plasterer
├── Painter
└── Roofer

Installation & Technical
├── Plumber
├── Electrician
├── HVAC & Heating
├── Air Conditioning
├── Solar Panels
└── Glazier

Home & Garden
├── Cleaning
├── Garden Maintenance
├── Moving
├── Handyman
├── Interior Design
└── Pest Control

Auto & Transport
├── Mechanic
├── Auto Detailing
├── Courier
├── Driver
└── Roadside Assistance

Personal Services
├── Personal Trainer
├── Photographer (on-site)
├── Tutoring & Coaching
├── Catering
├── Events
└── Dog Walking
```

---

## Database Schema (New Tables)

### freelancer_profiles

Extends the existing `users` table with freelancer-specific data.

```sql
CREATE TABLE freelancer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  display_name VARCHAR(255) NOT NULL,
  tagline VARCHAR(255),
  bio TEXT,
  avatar_url TEXT,
  cover_image_url TEXT,
  hourly_rate DECIMAL(10,2),
  work_type VARCHAR(50) DEFAULT 'remote',        -- remote, local, hybrid
  location_city VARCHAR(255),
  location_country VARCHAR(5),                     -- ISO 3166-1 alpha-2
  location_postcode VARCHAR(20),
  service_radius_km INTEGER,                       -- for local services
  languages TEXT[],                                 -- ['en', 'nl', 'de']
  skills TEXT[],                                    -- skill slugs
  portfolio_urls TEXT[],
  website_url TEXT,
  linkedin_url TEXT,
  is_verified BOOLEAN DEFAULT false,
  verification_date TIMESTAMP,
  stripe_account_id VARCHAR(255),                  -- Stripe Connect
  stripe_onboarding_complete BOOLEAN DEFAULT false,
  response_time_hours INTEGER,                     -- average response time
  completion_rate DECIMAL(5,2),                    -- percentage
  total_earnings DECIMAL(12,2) DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  rating_average DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'pending',            -- pending, active, suspended
  locale VARCHAR(5) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_freelancer_profiles_user ON freelancer_profiles(user_id);
CREATE INDEX idx_freelancer_profiles_status ON freelancer_profiles(status);
CREATE INDEX idx_freelancer_profiles_location ON freelancer_profiles(location_country, location_city);
CREATE INDEX idx_freelancer_profiles_skills ON freelancer_profiles USING GIN(skills);
CREATE INDEX idx_freelancer_profiles_rating ON freelancer_profiles(rating_average DESC);
```

### marketplace_categories

```sql
CREATE TABLE marketplace_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),                               -- icon name or emoji
  image_url TEXT,
  parent_id UUID REFERENCES marketplace_categories(id),
  service_type VARCHAR(20) NOT NULL,               -- digital, physical
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  locale VARCHAR(5) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(slug, locale)
);

CREATE INDEX idx_marketplace_categories_parent ON marketplace_categories(parent_id);
CREATE INDEX idx_marketplace_categories_type ON marketplace_categories(service_type);
```

### skills

```sql
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  category_id UUID REFERENCES marketplace_categories(id),
  locale VARCHAR(5) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(slug, locale)
);
```

### gigs

```sql
CREATE TABLE gigs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  freelancer_id UUID NOT NULL REFERENCES freelancer_profiles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES marketplace_categories(id),
  tags TEXT[],
  work_type VARCHAR(50) DEFAULT 'remote',
  location_city VARCHAR(255),
  location_country VARCHAR(5),
  service_radius_km INTEGER,
  views INTEGER DEFAULT 0,
  order_count INTEGER DEFAULT 0,
  rating_average DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'pending',            -- pending, active, paused, rejected
  locale VARCHAR(5) DEFAULT 'en',
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(slug, locale)
);

CREATE INDEX idx_gigs_freelancer ON gigs(freelancer_id);
CREATE INDEX idx_gigs_category ON gigs(category_id);
CREATE INDEX idx_gigs_status ON gigs(status);
CREATE INDEX idx_gigs_rating ON gigs(rating_average DESC);
CREATE INDEX idx_gigs_location ON gigs(location_country, location_city);
```

### gig_packages

```sql
CREATE TABLE gig_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id UUID NOT NULL REFERENCES gigs(id) ON DELETE CASCADE,
  tier VARCHAR(20) NOT NULL,                       -- basic, standard, premium
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  delivery_days INTEGER NOT NULL,
  revision_count INTEGER DEFAULT 0,                -- 0 = no revisions, -1 = unlimited
  features JSONB DEFAULT '[]',                     -- ["Logo design", "Source files", "3D mockup"]
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_gig_packages_gig ON gig_packages(gig_id);
```

### gig_images

```sql
CREATE TABLE gig_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gig_id UUID NOT NULL REFERENCES gigs(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_gig_images_gig ON gig_images(gig_id);
```

### projects

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category_id UUID NOT NULL REFERENCES marketplace_categories(id),
  required_skills TEXT[],
  budget_min DECIMAL(10,2),
  budget_max DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'EUR',
  deadline TIMESTAMP,
  work_type VARCHAR(50) DEFAULT 'remote',
  location_city VARCHAR(255),
  location_country VARCHAR(5),
  location_postcode VARCHAR(20),
  attachments JSONB DEFAULT '[]',                  -- [{url, name, size}]
  bid_count INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'open',               -- open, in_progress, completed, cancelled
  selected_freelancer_id UUID REFERENCES freelancer_profiles(id),
  locale VARCHAR(5) DEFAULT 'en',
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(slug, locale)
);

CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_projects_category ON projects(category_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_location ON projects(location_country, location_city);
CREATE INDEX idx_projects_skills ON projects USING GIN(required_skills);
```

### bids

```sql
CREATE TABLE bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  freelancer_id UUID NOT NULL REFERENCES freelancer_profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  delivery_days INTEGER NOT NULL,
  pitch TEXT NOT NULL,
  attachments JSONB DEFAULT '[]',
  status VARCHAR(20) DEFAULT 'pending',            -- pending, accepted, rejected, withdrawn
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(project_id, freelancer_id)                -- one bid per freelancer per project
);

CREATE INDEX idx_bids_project ON bids(project_id);
CREATE INDEX idx_bids_freelancer ON bids(freelancer_id);
```

### orders

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  order_number VARCHAR(50) NOT NULL UNIQUE,        -- ORD-2026-XXXXX
  order_type VARCHAR(20) NOT NULL,                 -- gig, project, quote
  client_id UUID NOT NULL REFERENCES users(id),
  freelancer_id UUID NOT NULL REFERENCES freelancer_profiles(id),
  gig_id UUID REFERENCES gigs(id),
  gig_package_id UUID REFERENCES gig_packages(id),
  project_id UUID REFERENCES projects(id),
  bid_id UUID REFERENCES bids(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  requirements TEXT,                               -- client's specific requirements
  amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL,             -- commission amount
  freelancer_earnings DECIMAL(10,2) NOT NULL,      -- amount - fee
  currency VARCHAR(3) DEFAULT 'EUR',
  delivery_deadline TIMESTAMP,
  revision_count INTEGER DEFAULT 0,
  revisions_used INTEGER DEFAULT 0,
  status VARCHAR(20) DEFAULT 'pending',            -- pending, active, delivered, revision, completed, cancelled, disputed
  stripe_payment_intent_id VARCHAR(255),
  stripe_transfer_id VARCHAR(255),
  escrow_status VARCHAR(20) DEFAULT 'held',        -- held, released, refunded, partial_refund
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
```

### order_milestones

```sql
CREATE TABLE order_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  due_date TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending',            -- pending, in_progress, delivered, approved, disputed
  stripe_payment_intent_id VARCHAR(255),
  delivered_at TIMESTAMP,
  approved_at TIMESTAMP,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_order_milestones_order ON order_milestones(order_id);
```

### order_deliverables

```sql
CREATE TABLE order_deliverables (
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

CREATE INDEX idx_order_deliverables_order ON order_deliverables(order_id);
```

### conversations

```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id),
  project_id UUID REFERENCES projects(id),
  participant_1 UUID NOT NULL REFERENCES users(id),
  participant_2 UUID NOT NULL REFERENCES users(id),
  last_message_at TIMESTAMP,
  last_message_preview TEXT,
  unread_count_1 INTEGER DEFAULT 0,                -- unread for participant_1
  unread_count_2 INTEGER DEFAULT 0,                -- unread for participant_2
  status VARCHAR(20) DEFAULT 'active',             -- active, archived
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conversations_participants ON conversations(participant_1, participant_2);
CREATE INDEX idx_conversations_order ON conversations(order_id);
CREATE INDEX idx_conversations_last_message ON conversations(last_message_at DESC);
```

### messages

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES users(id),
  content TEXT,
  message_type VARCHAR(20) DEFAULT 'text',         -- text, file, system
  file_url TEXT,
  file_name VARCHAR(255),
  file_size INTEGER,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at);
CREATE INDEX idx_messages_sender ON messages(sender_id);
```

### transactions

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id),
  milestone_id UUID REFERENCES order_milestones(id),
  payer_id UUID NOT NULL REFERENCES users(id),
  payee_id UUID REFERENCES users(id),             -- NULL for platform fees
  amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'EUR',
  transaction_type VARCHAR(20) NOT NULL,           -- payment, payout, refund, fee
  stripe_payment_intent_id VARCHAR(255),
  stripe_transfer_id VARCHAR(255),
  stripe_refund_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending',            -- pending, completed, failed, refunded
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_transactions_order ON transactions(order_id);
CREATE INDEX idx_transactions_payer ON transactions(payer_id);
CREATE INDEX idx_transactions_payee ON transactions(payee_id);
CREATE INDEX idx_transactions_status ON transactions(status);
```

### disputes

```sql
CREATE TABLE disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  order_id UUID NOT NULL REFERENCES orders(id),
  opened_by UUID NOT NULL REFERENCES users(id),
  reason VARCHAR(50) NOT NULL,                     -- not_delivered, not_as_described, quality, other
  description TEXT NOT NULL,
  evidence JSONB DEFAULT '[]',                     -- [{url, description}]
  resolution VARCHAR(50),                          -- full_refund, partial_refund, release_to_freelancer, mutual_cancellation
  resolution_note TEXT,
  resolved_by UUID REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'open',               -- open, under_review, resolved, escalated
  opened_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_disputes_order ON disputes(order_id);
CREATE INDEX idx_disputes_status ON disputes(status);
```

### marketplace_reviews

```sql
CREATE TABLE marketplace_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  order_id UUID NOT NULL REFERENCES orders(id),
  reviewer_id UUID NOT NULL REFERENCES users(id),
  reviewee_id UUID NOT NULL REFERENCES users(id),
  reviewer_role VARCHAR(20) NOT NULL,              -- client, freelancer
  overall_rating INTEGER NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
  communication_rating INTEGER CHECK (communication_rating BETWEEN 1 AND 5),
  quality_rating INTEGER CHECK (quality_rating BETWEEN 1 AND 5),
  timeliness_rating INTEGER CHECK (timeliness_rating BETWEEN 1 AND 5),
  value_rating INTEGER CHECK (value_rating BETWEEN 1 AND 5),
  content TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(order_id, reviewer_id)                    -- one review per person per order
);

CREATE INDEX idx_marketplace_reviews_reviewee ON marketplace_reviews(reviewee_id);
CREATE INDEX idx_marketplace_reviews_order ON marketplace_reviews(order_id);
CREATE INDEX idx_marketplace_reviews_rating ON marketplace_reviews(overall_rating);
```

### notifications

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,                       -- new_order, new_message, new_bid, order_delivered, payment_received, review_received, etc.
  title VARCHAR(255) NOT NULL,
  body TEXT,
  link VARCHAR(500),                               -- relative URL to navigate to
  metadata JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, is_read, created_at DESC);
```

---

## Tech Stack Extensions

| Component | Choice | Reason |
|-----------|--------|--------|
| Payments | Stripe Connect | Escrow, international coverage, marketplace-ready |
| Real-time chat | Pusher or Ably | WebSocket-as-a-service, no own WS server needed |
| File upload | Vercel Blob or Cloudflare R2 | Scalable storage for portfolio/deliverables |
| Search | Algolia or Meilisearch | Fast fuzzy search on gigs/freelancers |
| Email | Resend (already integrated) | Transactional emails, notifications |
| Auth | Stack Auth (already integrated) | OAuth, sessions, role management |
| Geo/location | PostGIS or simple postcode-radius | Match local freelancers |

---

## Phasing

### Phase 1 - Foundation (4-6 weeks)

- Database schema extension (all new tables)
- Auth extension: client/freelancer roles via Stack Auth
- Freelancer profile create + edit
- Gig CRUD (create, edit, delete)
- Gig listing page with search/filters
- Gig detail page
- Category system
- Basic dashboards (client + freelancer)

### Phase 2 - Payments & Orders (3-4 weeks)

- Stripe Connect integration (freelancer onboarding)
- Checkout flow (gig ordering)
- Escrow system (hold -> release)
- Order management (status tracking)
- Delivery flow (freelancer delivers, client approves)
- Basic refund/dispute flow
- Earnings dashboard for freelancers

### Phase 3 - Communication & Projects (3-4 weeks)

- In-app messaging (Pusher/Ably real-time)
- File sharing in chat
- Email notifications (Resend)
- Project board (clients post projects)
- Bidding system (freelancers bid)
- Milestone payments

### Phase 4 - Local Services & Quotes (2-3 weeks)

- Location-based search (postcode/city radius)
- Quote request flow
- Notifications to local freelancers
- Quote comparison interface
- Down payment flow

### Phase 5 - Trust & Quality (2-3 weeks)

- Review system (two-sided: client <-> freelancer)
- Freelancer verification (ID check, portfolio review)
- Dispute resolution flow (admin panel)
- Freelancer analytics dashboard
- Rating aggregation + badges ("Top Rated", "Rising Star")

### Phase 6 - Growth & Content (ongoing)

- SEO pages for each category ("Hire a plumber", "Freelance developer costs")
- Integrate marketplace data into existing content
- Freelancer spotlight blog posts
- Price comparison tools
- API for external integrations

---

## API Routes (New)

### Marketplace Public

```
GET  /api/marketplace/gigs              - List/search gigs
GET  /api/marketplace/gigs/[slug]       - Get gig detail
GET  /api/marketplace/projects          - List open projects
GET  /api/marketplace/projects/[slug]   - Get project detail
GET  /api/marketplace/categories        - List categories
GET  /api/marketplace/freelancers       - Search freelancers
GET  /api/marketplace/freelancers/[slug]- Get freelancer profile
```

### Orders & Payments

```
POST /api/marketplace/orders            - Create order (gig purchase)
GET  /api/marketplace/orders            - List my orders
GET  /api/marketplace/orders/[id]       - Get order detail
POST /api/marketplace/orders/[id]/deliver   - Submit deliverable
POST /api/marketplace/orders/[id]/approve   - Approve delivery
POST /api/marketplace/orders/[id]/revision  - Request revision
POST /api/marketplace/orders/[id]/dispute   - Open dispute
```

### Stripe

```
POST /api/stripe/checkout               - Create checkout session
POST /api/stripe/webhook                - Stripe webhook handler
GET  /api/stripe/connect/onboard        - Start Stripe Connect onboarding
GET  /api/stripe/connect/return         - Handle onboarding return
POST /api/stripe/payout                 - Trigger freelancer payout
```

### Projects & Bids

```
POST /api/marketplace/projects          - Create project
POST /api/marketplace/projects/[id]/bid - Submit bid
PUT  /api/marketplace/projects/[id]/bid/[bid_id] - Update bid
POST /api/marketplace/projects/[id]/select - Select freelancer
```

### Messaging

```
GET  /api/messages/conversations        - List conversations
GET  /api/messages/conversations/[id]   - Get messages
POST /api/messages/conversations/[id]   - Send message
POST /api/messages/conversations        - Start new conversation
```

### Seller Dashboard

```
GET  /api/seller/stats                  - Earnings, orders, views stats
GET  /api/seller/earnings               - Detailed earnings/payouts
POST /api/seller/gigs                   - Create gig
PUT  /api/seller/gigs/[id]              - Update gig
DELETE /api/seller/gigs/[id]            - Delete gig
```

### Notifications

```
GET  /api/notifications                 - List notifications
PUT  /api/notifications/[id]/read       - Mark as read
PUT  /api/notifications/read-all        - Mark all as read
```

---

## Commission Structure

| Order Value | Platform Fee |
|-------------|-------------|
| < EUR 50    | 15%         |
| EUR 50-500  | 12%         |
| > EUR 500   | 10%         |

Freelancer sees net earnings after fee deduction. Stripe processing fees (~2.9% + EUR 0.25) are additional, charged to the client or split.

---

## Security Considerations

- All marketplace API routes require authentication
- Stripe webhook signature verification
- Rate limiting on bid/order creation
- Input sanitization on all user-generated content
- File upload validation (type, size limits)
- Escrow prevents payment fraud
- Admin moderation queue for new gigs/freelancers
- GDPR compliance: data export, deletion requests
