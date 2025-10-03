-- Migration: Create tools table
-- Description: Table for freelance tools and resources

-- Drop table if exists
DROP TABLE IF EXISTS tools CASCADE;

-- Create tools table
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id TEXT NOT NULL,

  -- Basic info
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT NOT NULL, -- 'tool' or 'resource'

  -- Tool details
  icon TEXT, -- lucide icon name (e.g., 'Calculator', 'Clock')
  color TEXT DEFAULT '#3b82f6', -- hex color for icon background

  -- URLs
  tool_url TEXT, -- URL to the tool if it's an external tool
  is_available BOOLEAN DEFAULT false,

  -- Featured
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,

  -- Metadata
  views INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft', -- 'draft' or 'published'

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_tools_owner ON tools(owner_id);
CREATE INDEX idx_tools_slug ON tools(slug);
CREATE INDEX idx_tools_status ON tools(status);
CREATE INDEX idx_tools_category ON tools(category);
CREATE INDEX idx_tools_featured ON tools(featured);
CREATE INDEX idx_tools_sort_order ON tools(sort_order);

-- Insert some example tools
INSERT INTO tools (
  owner_id,
  name,
  slug,
  description,
  category,
  icon,
  color,
  is_available,
  featured,
  sort_order,
  status
) VALUES
  (
    'system',
    'Rate Calculator',
    'rate-calculator',
    'Calculate your ideal hourly rate based on your costs and desired income',
    'tool',
    'Calculator',
    '#3b82f6',
    true,
    true,
    1,
    'published'
  ),
  (
    'system',
    'Time Tracker',
    'time-tracker',
    'Track your billable hours and generate reports for your clients',
    'tool',
    'Clock',
    '#10b981',
    false,
    true,
    2,
    'published'
  ),
  (
    'system',
    'Invoice Generator',
    'invoice-generator',
    'Create professional invoices in minutes',
    'tool',
    'FileText',
    '#8b5cf6',
    false,
    true,
    3,
    'published'
  ),
  (
    'system',
    'Income Tracker',
    'income-tracker',
    'Track your income and expenses per month and year',
    'tool',
    'BarChart3',
    '#6366f1',
    false,
    false,
    4,
    'published'
  ),
  (
    'system',
    'Project Price Calculator',
    'project-price-calculator',
    'Calculate the price for a fixed project based on estimated hours',
    'tool',
    'DollarSign',
    '#eab308',
    false,
    false,
    5,
    'published'
  ),
  (
    'system',
    'Client Manager',
    'client-manager',
    'Manage your clients and contact information in one place',
    'tool',
    'Users',
    '#ec4899',
    false,
    false,
    6,
    'published'
  ),
  (
    'system',
    'Contract Templates',
    'contract-templates',
    'Downloadable contracts for different types of projects',
    'resource',
    'FileText',
    '#dbeafe',
    false,
    true,
    1,
    'published'
  ),
  (
    'system',
    'Pricing Guide',
    'pricing-guide',
    'Guide for determining your freelance rates',
    'resource',
    'DollarSign',
    '#dcfce7',
    false,
    false,
    2,
    'published'
  ),
  (
    'system',
    'Tax Calculator',
    'tax-calculator',
    'Calculate your taxes as a freelancer',
    'resource',
    'Calculator',
    '#f3e8ff',
    false,
    false,
    3,
    'published'
  ),
  (
    'system',
    'Productivity Tips',
    'productivity-tips',
    'Tips to work more productively as a freelancer',
    'resource',
    'Zap',
    '#fef3c7',
    false,
    false,
    4,
    'published'
  );

-- Add RLS policies
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Allow public to read published tools
CREATE POLICY "Public can view published tools"
  ON tools
  FOR SELECT
  USING (status = 'published');

-- Allow authenticated users to manage their own tools
CREATE POLICY "Users can manage their own tools"
  ON tools
  FOR ALL
  USING (owner_id = current_setting('app.current_user_id', true));
