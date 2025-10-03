-- Migration: Create platforms table
-- Description: Table for storing freelance platform information
-- Date: 2025-10-03

-- Create platforms table
CREATE TABLE IF NOT EXISTS platforms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id TEXT NOT NULL,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  logo_url TEXT,
  website_url TEXT,
  rating DECIMAL(2,1) DEFAULT 0.0,
  category TEXT NOT NULL,
  fees TEXT,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  color TEXT DEFAULT '#3B82F6',
  featured BOOLEAN DEFAULT FALSE,
  pros JSONB DEFAULT '[]'::jsonb,
  cons JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  meta_title TEXT,
  meta_description TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_platforms_slug ON platforms(slug);
CREATE INDEX IF NOT EXISTS idx_platforms_status ON platforms(status);
CREATE INDEX IF NOT EXISTS idx_platforms_category ON platforms(category);
CREATE INDEX IF NOT EXISTS idx_platforms_featured ON platforms(featured);
CREATE INDEX IF NOT EXISTS idx_platforms_owner_id ON platforms(owner_id);

-- Enable Row Level Security
ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for platforms
CREATE POLICY platforms_select_policy ON platforms
  FOR SELECT
  USING (status = 'published' OR owner_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY platforms_insert_policy ON platforms
  FOR INSERT
  WITH CHECK (owner_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY platforms_update_policy ON platforms
  FOR UPDATE
  USING (owner_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY platforms_delete_policy ON platforms
  FOR DELETE
  USING (owner_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Insert sample platforms data
INSERT INTO platforms (
  owner_id, name, slug, description, rating, category, fees, difficulty, featured, color,
  pros, cons, features, status, published_at
) VALUES
  (
    'test-owner-id',
    'Upwork',
    'upwork',
    'The world''s largest freelance marketplace connecting businesses with independent professionals.',
    4.5,
    'General',
    '5-20%',
    'Medium',
    true,
    '#14A800',
    '["Large client base", "Multiple job categories", "Payment protection", "Escrow system"]'::jsonb,
    '["High competition", "Platform fees can be steep", "Approval process required"]'::jsonb,
    '["Time tracking", "Milestone payments", "Dispute resolution", "Mobile app"]'::jsonb,
    'published',
    NOW()
  ),
  (
    'test-owner-id',
    'Fiverr',
    'fiverr',
    'A marketplace where freelancers offer services starting at $5. Great for quick gigs and specialized services.',
    4.3,
    'General',
    '5-20%',
    'Easy',
    true,
    '#1DBF73',
    '["Easy to start", "No bidding required", "Good for beginners", "Quick payments"]'::jsonb,
    '["Race to the bottom pricing", "High competition", "Limited client interaction"]'::jsonb,
    '["Seller levels", "Package options", "Gig promotion", "Analytics dashboard"]'::jsonb,
    'published',
    NOW()
  ),
  (
    'test-owner-id',
    'Toptal',
    'toptal',
    'An exclusive network of the top 3% of freelance talent. Premium platform for experienced professionals.',
    4.7,
    'Premium',
    '0%',
    'Hard',
    true,
    '#204ECF',
    '["No platform fees", "High-quality clients", "Premium rates", "Exclusive network"]'::jsonb,
    '["Rigorous screening process", "High experience required", "Limited spots"]'::jsonb,
    '["Dedicated account manager", "Flexible contracts", "Global client base", "Professional matching"]'::jsonb,
    'published',
    NOW()
  ),
  (
    'test-owner-id',
    'Freelancer',
    'freelancer',
    'A global freelancing and crowdsourcing marketplace. Compete on projects and build your reputation.',
    4.2,
    'General',
    '10%',
    'Easy',
    false,
    '#29B2FE',
    '["Contest opportunities", "Large project variety", "Global reach", "Mobile app"]'::jsonb,
    '["High competition", "Lower average rates", "Bidding system"]'::jsonb,
    '["Project contests", "Milestone payments", "Time tracking", "Skills tests"]'::jsonb,
    'published',
    NOW()
  ),
  (
    'test-owner-id',
    '99designs',
    '99designs',
    'The #1 creative marketplace for graphic design. Specialized platform for designers.',
    4.4,
    'Design',
    'Platform fee varies',
    'Medium',
    false,
    '#FF3366',
    '["Design-focused", "Contest opportunities", "Quality clients", "Portfolio showcase"]'::jsonb,
    '["Design-only platform", "Contest competition", "Platform fees"]'::jsonb,
    '["Design contests", "1-to-1 projects", "Portfolio builder", "Client reviews"]'::jsonb,
    'published',
    NOW()
  )
ON CONFLICT (name) DO NOTHING;
