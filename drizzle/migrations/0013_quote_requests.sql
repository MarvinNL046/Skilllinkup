-- Migration 0013: Quote Requests for Local Services
-- Purpose: Add quote_requests and quotes tables for local service marketplace
-- Created: 2026-02-23
-- Depends on: 0011_marketplace_orders_messages.sql (marketplace_categories, freelancer_profiles, users, tenants)

-- ============================================================
-- QUOTE REQUESTS (clients post requests, freelancers respond)
-- ============================================================

CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES users(id),
  category_id UUID NOT NULL REFERENCES marketplace_categories(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location_city VARCHAR(255),
  location_postcode VARCHAR(20),
  location_country VARCHAR(5) DEFAULT 'NL',
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  photos JSONB DEFAULT '[]',
  budget_indication VARCHAR(50),
  preferred_date TIMESTAMP,
  status VARCHAR(20) DEFAULT 'open',
  quote_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_qr_client ON quote_requests(client_id);
CREATE INDEX IF NOT EXISTS idx_qr_category ON quote_requests(category_id);
CREATE INDEX IF NOT EXISTS idx_qr_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_qr_location ON quote_requests(location_country, location_city);

-- ============================================================
-- QUOTES (responses from freelancers)
-- ============================================================

CREATE TABLE IF NOT EXISTS quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_request_id UUID NOT NULL REFERENCES quote_requests(id) ON DELETE CASCADE,
  freelancer_id UUID NOT NULL REFERENCES freelancer_profiles(id),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  description TEXT NOT NULL,
  estimated_days INTEGER,
  valid_until TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(quote_request_id, freelancer_id)
);

CREATE INDEX IF NOT EXISTS idx_quotes_request ON quotes(quote_request_id);
CREATE INDEX IF NOT EXISTS idx_quotes_freelancer ON quotes(freelancer_id);

-- ============================================================
-- UPDATED_AT TRIGGERS
-- ============================================================

-- Reuse the trigger function created in migration 0010
DROP TRIGGER IF EXISTS update_quote_requests_updated_at ON quote_requests;
CREATE TRIGGER update_quote_requests_updated_at
  BEFORE UPDATE ON quote_requests
  FOR EACH ROW EXECUTE FUNCTION update_marketplace_updated_at_column();

DROP TRIGGER IF EXISTS update_quotes_updated_at ON quotes;
CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW EXECUTE FUNCTION update_marketplace_updated_at_column();
