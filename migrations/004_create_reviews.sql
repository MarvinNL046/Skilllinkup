-- Migration: Create reviews table
-- Description: Platform reviews with ratings, pros/cons, and user information

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_id UUID NOT NULL REFERENCES platforms(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  user_role TEXT,

  -- Review content
  title TEXT NOT NULL,
  content TEXT NOT NULL,

  -- Ratings (1-5 scale)
  overall_rating DECIMAL(2,1) NOT NULL CHECK (overall_rating >= 0 AND overall_rating <= 5),
  ease_of_use_rating DECIMAL(2,1) CHECK (ease_of_use_rating >= 0 AND ease_of_use_rating <= 5),
  support_rating DECIMAL(2,1) CHECK (support_rating >= 0 AND support_rating <= 5),
  value_rating DECIMAL(2,1) CHECK (value_rating >= 0 AND value_rating <= 5),

  -- Pros and Cons
  pros JSONB DEFAULT '[]'::jsonb,
  cons JSONB DEFAULT '[]'::jsonb,

  -- Additional info
  project_type TEXT,
  earnings_range TEXT,
  years_experience INTEGER,

  -- Verification and moderation
  verified BOOLEAN DEFAULT FALSE,
  helpful_count INTEGER DEFAULT 0,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_reviews_platform_id ON reviews(platform_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_overall_rating ON reviews(overall_rating DESC);

-- Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public read access to approved reviews"
  ON reviews FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Allow authenticated users to insert reviews"
  ON reviews FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow users to update their own reviews"
  ON reviews FOR UPDATE
  USING (true);

CREATE POLICY "Allow users to delete their own reviews"
  ON reviews FOR DELETE
  USING (true);

-- Insert sample reviews for testing
INSERT INTO reviews (
  platform_id,
  user_id,
  user_name,
  user_avatar,
  user_role,
  title,
  content,
  overall_rating,
  ease_of_use_rating,
  support_rating,
  value_rating,
  pros,
  cons,
  project_type,
  earnings_range,
  years_experience,
  verified,
  helpful_count,
  status
) VALUES
  -- Upwork reviews
  (
    (SELECT id FROM platforms WHERE slug = 'upwork'),
    'user-1',
    'Sarah Johnson',
    '/images/users/avatar-1.jpg',
    'Web Developer',
    'Great platform for finding quality clients',
    'I''ve been using Upwork for over 3 years and it has been instrumental in growing my freelance business. The quality of clients is generally high, and the payment protection is excellent.',
    4.5,
    4.0,
    4.5,
    5.0,
    '["Large client base", "Secure payment system", "Good dispute resolution", "Mobile app available"]'::jsonb,
    '["High service fees", "Competitive bidding", "Connect system can be expensive"]'::jsonb,
    'Web Development',
    '$50,000 - $75,000',
    3,
    true,
    24,
    'approved'
  ),
  (
    (SELECT id FROM platforms WHERE slug = 'upwork'),
    'user-2',
    'Michael Chen',
    '/images/users/avatar-2.jpg',
    'Graphic Designer',
    'Good for beginners but fees are high',
    'As a graphic designer, I found Upwork helpful when starting out. However, the 20% fee on the first $500 with each client is quite steep. The platform itself is user-friendly.',
    3.5,
    4.5,
    3.0,
    3.0,
    '["Easy to use", "Many job postings", "Professional interface"]'::jsonb,
    '["High fees for new freelancers", "Too much competition", "Difficult to stand out"]'::jsonb,
    'Graphic Design',
    '$25,000 - $50,000',
    1,
    true,
    18,
    'approved'
  ),

  -- Fiverr reviews
  (
    (SELECT id FROM platforms WHERE slug = 'fiverr'),
    'user-3',
    'Emma Davis',
    '/images/users/avatar-3.jpg',
    'Content Writer',
    'Perfect for passive income',
    'Fiverr allows me to create gigs and wait for orders to come in. It''s great for passive income, and the seller levels system motivates continuous improvement.',
    4.0,
    4.5,
    4.0,
    4.5,
    '["Passive income potential", "Level system is motivating", "Easy to get started", "Good buyer protection"]'::jsonb,
    '["Takes 20% commission", "Price pressure from competition", "Customer service can be slow"]'::jsonb,
    'Content Writing',
    '$15,000 - $25,000',
    2,
    true,
    32,
    'approved'
  ),

  -- Toptal review
  (
    (SELECT id FROM platforms WHERE slug = 'toptal'),
    'user-4',
    'David Martinez',
    '/images/users/avatar-4.jpg',
    'Full Stack Developer',
    'Elite platform with high-quality projects',
    'The vetting process was rigorous but worth it. Projects are high-quality, clients are professional, and rates are excellent. Best platform for experienced developers.',
    5.0,
    4.0,
    5.0,
    5.0,
    '["High-quality clients", "Excellent rates", "Professional environment", "Minimal competition"]'::jsonb,
    '["Difficult to get accepted", "Strict screening process", "High expectations from clients"]'::jsonb,
    'Full Stack Development',
    '$100,000+',
    7,
    true,
    45,
    'approved'
  ),

  -- Freelancer review
  (
    (SELECT id FROM platforms WHERE slug = 'freelancer'),
    'user-5',
    'Lisa Anderson',
    '/images/users/avatar-5.jpg',
    'Virtual Assistant',
    'Decent platform but very competitive',
    'Freelancer.com has many opportunities but the competition is fierce. The bid system can be frustrating, and you need to be strategic about which projects to bid on.',
    3.0,
    3.5,
    3.0,
    3.5,
    '["Many job categories", "International clients", "Contest opportunities"]'::jsonb,
    '["Very competitive", "Bid costs money", "Lower average rates", "Quality varies"]'::jsonb,
    'Virtual Assistant',
    '$10,000 - $25,000',
    2,
    false,
    12,
    'approved'
  );

-- Success message
DO $$
BEGIN
  RAISE NOTICE '✅ Reviews table created successfully with 5 sample reviews';
END $$;
