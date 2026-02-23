-- Migration 0011: Marketplace Orders, Messages, Transactions, Disputes & Reviews
-- Purpose: Add transaction layer, messaging system, disputes, and reviews for the marketplace
-- Created: 2026-02-23
-- Depends on: 0010_marketplace_foundation.sql (freelancer_profiles, marketplace_categories, gigs, gig_packages)

-- ============================================================
-- PROJECTS (client-posted jobs)
-- ============================================================

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Content
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category_id UUID REFERENCES marketplace_categories(id) ON DELETE SET NULL,
  required_skills TEXT[] DEFAULT ARRAY[]::TEXT[],

  -- Budget
  budget_min DECIMAL(10,2),
  budget_max DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'EUR',

  -- Timeline & Work Type
  deadline TIMESTAMP,
  work_type VARCHAR(50) DEFAULT 'remote',

  -- Location (for local/hybrid projects)
  location_city VARCHAR(255),
  location_country VARCHAR(5),
  location_postcode VARCHAR(20),

  -- Attachments & Engagement
  attachments JSONB DEFAULT '[]',
  bid_count INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,

  -- Status & Assignment
  status VARCHAR(20) DEFAULT 'open', -- 'open', 'in_progress', 'completed', 'cancelled', 'closed'
  selected_freelancer_id UUID REFERENCES freelancer_profiles(id) ON DELETE SET NULL,

  -- Localisation
  locale VARCHAR(5) DEFAULT 'en',
  published_at TIMESTAMP,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,

  CONSTRAINT projects_slug_locale_unique UNIQUE (slug, locale)
);

CREATE INDEX IF NOT EXISTS idx_projects_client ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_status_published ON projects(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_projects_location ON projects(location_country, location_city);
CREATE INDEX IF NOT EXISTS idx_projects_skills ON projects USING GIN(required_skills);

-- ============================================================
-- BIDS (freelancer proposals on projects)
-- ============================================================

CREATE TABLE IF NOT EXISTS bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  freelancer_id UUID NOT NULL REFERENCES freelancer_profiles(id) ON DELETE CASCADE,

  -- Proposal
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  delivery_days INTEGER NOT NULL,
  pitch TEXT NOT NULL,
  attachments JSONB DEFAULT '[]',

  -- Status
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'accepted', 'rejected', 'withdrawn'

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,

  CONSTRAINT bids_project_freelancer_unique UNIQUE (project_id, freelancer_id)
);

CREATE INDEX IF NOT EXISTS idx_bids_project ON bids(project_id);
CREATE INDEX IF NOT EXISTS idx_bids_freelancer ON bids(freelancer_id);

-- ============================================================
-- ORDERS (active engagements between client & freelancer)
-- ============================================================

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  order_number VARCHAR(50) NOT NULL UNIQUE,
  order_type VARCHAR(20) NOT NULL, -- 'gig', 'project'

  -- Parties
  client_id UUID REFERENCES users(id) ON DELETE SET NULL,
  freelancer_id UUID REFERENCES freelancer_profiles(id) ON DELETE SET NULL,

  -- Source (one of these will be set)
  gig_id UUID REFERENCES gigs(id) ON DELETE SET NULL,
  gig_package_id UUID REFERENCES gig_packages(id) ON DELETE SET NULL,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  bid_id UUID REFERENCES bids(id) ON DELETE SET NULL,

  -- Order Details
  title VARCHAR(255) NOT NULL,
  description TEXT,
  requirements TEXT,

  -- Financials
  amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL,
  freelancer_earnings DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',

  -- Delivery
  delivery_deadline TIMESTAMP,
  revision_count INTEGER DEFAULT 0,
  revisions_used INTEGER DEFAULT 0,

  -- Status & Payment
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'active', 'delivered', 'revision_requested', 'completed', 'cancelled', 'disputed'
  stripe_payment_intent_id VARCHAR(255),
  stripe_transfer_id VARCHAR(255),
  escrow_status VARCHAR(20) DEFAULT 'held', -- 'held', 'released', 'refunded'

  -- Completion
  completed_at TIMESTAMP,
  cancelled_at TIMESTAMP,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_client ON orders(client_id);
CREATE INDEX IF NOT EXISTS idx_orders_freelancer ON orders(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_gig ON orders(gig_id);
CREATE INDEX IF NOT EXISTS idx_orders_project ON orders(project_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);

-- ============================================================
-- ORDER MILESTONES (payment checkpoints within an order)
-- ============================================================

CREATE TABLE IF NOT EXISTS order_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

  title VARCHAR(255) NOT NULL,
  description TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  due_date TIMESTAMP,

  -- Status & Payment
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'in_progress', 'delivered', 'approved', 'disputed'
  stripe_payment_intent_id VARCHAR(255),

  -- Completion
  delivered_at TIMESTAMP,
  approved_at TIMESTAMP,

  -- Display
  sort_order INTEGER DEFAULT 0,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_order_milestones_order ON order_milestones(order_id);

-- ============================================================
-- ORDER DELIVERABLES (files delivered by the freelancer)
-- ============================================================

CREATE TABLE IF NOT EXISTS order_deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  milestone_id UUID REFERENCES order_milestones(id) ON DELETE SET NULL,
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,

  -- File Info
  file_url TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_size INTEGER,
  file_type VARCHAR(100),
  description TEXT,

  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_order_deliverables_order ON order_deliverables(order_id);

-- ============================================================
-- CONVERSATIONS (messaging threads)
-- ============================================================

CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  -- Context (optional links to order or project)
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,

  -- Participants
  participant_1 UUID REFERENCES users(id) ON DELETE SET NULL,
  participant_2 UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Last Message Preview
  last_message_at TIMESTAMP,
  last_message_preview TEXT,

  -- Unread Counts (per participant)
  unread_count_1 INTEGER DEFAULT 0,
  unread_count_2 INTEGER DEFAULT 0,

  -- Status
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'archived', 'blocked'

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_conversations_participant_1 ON conversations(participant_1, last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_participant_2 ON conversations(participant_2, last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_order ON conversations(order_id);

-- ============================================================
-- MESSAGES
-- ============================================================

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Content
  content TEXT,
  message_type VARCHAR(20) DEFAULT 'text', -- 'text', 'file', 'system', 'order_update'

  -- File Attachment (optional)
  file_url TEXT,
  file_name VARCHAR(255),
  file_size INTEGER,

  -- Read State
  is_read BOOLEAN DEFAULT false,

  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id, created_at);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);

-- ============================================================
-- TRANSACTIONS (financial ledger)
-- ============================================================

CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,

  -- Context
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  milestone_id UUID REFERENCES order_milestones(id) ON DELETE SET NULL,

  -- Parties
  payer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  payee_id UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Financials
  amount DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) DEFAULT 0,
  currency VARCHAR(3) DEFAULT 'EUR',

  -- Type & Stripe References
  transaction_type VARCHAR(20) NOT NULL, -- 'payment', 'payout', 'refund', 'platform_fee', 'dispute_hold'
  stripe_payment_intent_id VARCHAR(255),
  stripe_transfer_id VARCHAR(255),
  stripe_refund_id VARCHAR(255),

  -- Status
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  description TEXT,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_transactions_order ON transactions(order_id);
CREATE INDEX IF NOT EXISTS idx_transactions_payer ON transactions(payer_id);
CREATE INDEX IF NOT EXISTS idx_transactions_payee ON transactions(payee_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);

-- ============================================================
-- DISPUTES
-- ============================================================

CREATE TABLE IF NOT EXISTS disputes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  opened_by UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Dispute Details
  reason VARCHAR(50) NOT NULL, -- 'non_delivery', 'quality_issue', 'scope_creep', 'payment_issue', 'other'
  description TEXT NOT NULL,
  evidence JSONB DEFAULT '[]',

  -- Resolution
  resolution VARCHAR(50), -- 'refund_full', 'refund_partial', 'release_payment', 'split', 'escalated'
  resolution_note TEXT,
  resolved_by UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Status & Timestamps
  status VARCHAR(20) DEFAULT 'open', -- 'open', 'under_review', 'resolved', 'escalated', 'closed'
  opened_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_disputes_order ON disputes(order_id);
CREATE INDEX IF NOT EXISTS idx_disputes_status ON disputes(status);

-- ============================================================
-- MARKETPLACE REVIEWS
-- ============================================================

CREATE TABLE IF NOT EXISTS marketplace_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,

  -- Reviewer & Reviewee
  reviewer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  reviewee_id UUID REFERENCES users(id) ON DELETE SET NULL,
  reviewer_role VARCHAR(20) NOT NULL, -- 'client', 'freelancer'

  -- Ratings (1-5)
  overall_rating INTEGER NOT NULL CHECK (overall_rating BETWEEN 1 AND 5),
  communication_rating INTEGER CHECK (communication_rating BETWEEN 1 AND 5),
  quality_rating INTEGER CHECK (quality_rating BETWEEN 1 AND 5),
  timeliness_rating INTEGER CHECK (timeliness_rating BETWEEN 1 AND 5),
  value_rating INTEGER CHECK (value_rating BETWEEN 1 AND 5),

  -- Content
  content TEXT,
  is_public BOOLEAN DEFAULT true,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL,

  CONSTRAINT marketplace_reviews_order_reviewer_unique UNIQUE (order_id, reviewer_id)
);

CREATE INDEX IF NOT EXISTS idx_marketplace_reviews_reviewee ON marketplace_reviews(reviewee_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_reviews_order ON marketplace_reviews(order_id);

-- ============================================================
-- NOTIFICATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Content
  type VARCHAR(50) NOT NULL, -- 'order_placed', 'order_delivered', 'message_received', 'bid_received', 'review_received', etc.
  title VARCHAR(255) NOT NULL,
  body TEXT,
  link VARCHAR(500),

  -- Extra context
  metadata JSONB DEFAULT '{}',

  -- State
  is_read BOOLEAN DEFAULT false,

  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read, created_at DESC);

-- ============================================================
-- UPDATED_AT TRIGGERS
-- ============================================================

-- Reuse the trigger function created in migration 0010
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_marketplace_updated_at_column();

DROP TRIGGER IF EXISTS update_bids_updated_at ON bids;
CREATE TRIGGER update_bids_updated_at
  BEFORE UPDATE ON bids
  FOR EACH ROW EXECUTE FUNCTION update_marketplace_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_marketplace_updated_at_column();

DROP TRIGGER IF EXISTS update_order_milestones_updated_at ON order_milestones;
CREATE TRIGGER update_order_milestones_updated_at
  BEFORE UPDATE ON order_milestones
  FOR EACH ROW EXECUTE FUNCTION update_marketplace_updated_at_column();

DROP TRIGGER IF EXISTS update_conversations_updated_at ON conversations;
CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_marketplace_updated_at_column();

DROP TRIGGER IF EXISTS update_transactions_updated_at ON transactions;
CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_marketplace_updated_at_column();

DROP TRIGGER IF EXISTS update_disputes_updated_at ON disputes;
CREATE TRIGGER update_disputes_updated_at
  BEFORE UPDATE ON disputes
  FOR EACH ROW EXECUTE FUNCTION update_marketplace_updated_at_column();

DROP TRIGGER IF EXISTS update_marketplace_reviews_updated_at ON marketplace_reviews;
CREATE TRIGGER update_marketplace_reviews_updated_at
  BEFORE UPDATE ON marketplace_reviews
  FOR EACH ROW EXECUTE FUNCTION update_marketplace_updated_at_column();
