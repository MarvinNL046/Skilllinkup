/**
 * Shared marketplace type definitions.
 * These types represent the serialized (snake_case) shapes
 * passed to client components from server pages.
 */

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

export interface GigSummary {
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

export interface GigDetail extends GigSummary {
  freelancer_bio: string | null;
  freelancer_total_orders: number;
  freelancer_city: string | null;
  freelancer_country: string | null;
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

export interface ProjectSummary {
  id: string;
  client_id: string;
  client_name: string;
  title: string;
  slug: string;
  description: string;
  category_name: string;
  budget_min: number | null;
  budget_max: number | null;
  currency: string;
  deadline: string | null;
  status: string;
  bid_count: number;
  created_at: string;
}

export interface OrderSummary {
  id: string;
  order_number: string;
  order_type: string;
  title: string;
  amount: number;
  currency: string;
  status: string;
  client_name: string | null;
  freelancer_name: string | null;
  freelancer_earnings: number;
  escrow_status: string;
  created_at: string;
  completed_at: string | null;
  delivery_deadline: string | null;
}

export interface FreelancerReview {
  id: string;
  reviewer_name: string;
  reviewer_avatar: string | null;
  overall_rating: number;
  content: string | null;
  created_at: string;
}
