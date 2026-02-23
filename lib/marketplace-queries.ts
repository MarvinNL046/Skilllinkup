import { sql } from '@/lib/db';

// ============================================================
// Type Definitions
// ============================================================

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

export interface OrderSummary {
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

export interface CreateOrderData {
  gig_id?: string;
  project_id?: string;
  package_id?: string;
  client_id: string;
  freelancer_id: string;
  order_type: 'gig' | 'project';
  title: string;
  amount: number;
  currency: string;
  delivery_days: number;
}

// ============================================================
// Utility Functions
// ============================================================

/**
 * Calculate platform fee based on order amount.
 * < $50: 15%
 * $50 - $500: 12%
 * > $500: 10%
 */
export function calculatePlatformFee(amount: number): number {
  if (amount < 50) {
    return Math.round(amount * 0.15 * 100) / 100;
  } else if (amount <= 500) {
    return Math.round(amount * 0.12 * 100) / 100;
  } else {
    return Math.round(amount * 0.10 * 100) / 100;
  }
}

/**
 * Insert a notification for a user.
 */
export async function createNotification(
  userId: string,
  type: string,
  title: string,
  body: string,
  link?: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  await sql`
    INSERT INTO notifications (
      user_id,
      type,
      title,
      body,
      link,
      metadata
    ) VALUES (
      ${userId},
      ${type},
      ${title},
      ${body},
      ${link ?? null},
      ${metadata ? JSON.stringify(metadata) : null}
    )
  `;
}

// ============================================================
// Gig Queries
// ============================================================

/**
 * Get a paginated list of published/active gigs with freelancer info,
 * category details, minimum package price, and first image.
 */
export async function getPublishedGigs(
  limit = 20,
  offset = 0,
  locale = 'en'
): Promise<GigSummary[]> {
  const gigs = await sql`
    SELECT
      g.id,
      g.freelancer_id,
      COALESCE(fp.display_name, 'Unknown') AS freelancer_name,
      fp.avatar_url AS freelancer_avatar,
      COALESCE(fp.rating_average, 0) AS freelancer_rating,
      COALESCE(fp.is_verified, false) AS freelancer_verified,
      g.title,
      g.slug,
      COALESCE(g.description, '') AS description,
      g.category_id,
      COALESCE(mc.name, 'Uncategorized') AS category_name,
      COALESCE(mc.slug, '') AS category_slug,
      COALESCE(g.tags, '{}') AS tags,
      COALESCE(g.work_type, 'remote') AS work_type,
      g.location_city,
      g.location_country,
      COALESCE(
        (
          SELECT MIN(gp.price)
          FROM gig_packages gp
          WHERE gp.gig_id = g.id
        ),
        0
      ) AS price_from,
      COALESCE(
        (
          SELECT gp.currency
          FROM gig_packages gp
          WHERE gp.gig_id = g.id
          ORDER BY gp.price ASC
          LIMIT 1
        ),
        'USD'
      ) AS currency,
      COALESCE(g.views, 0) AS views,
      COALESCE(g.order_count, 0) AS order_count,
      COALESCE(g.rating_average, 0) AS rating_average,
      COALESCE(g.rating_count, 0) AS rating_count,
      COALESCE(g.is_featured, false) AS is_featured,
      g.status,
      COALESCE(
        (
          SELECT ARRAY_AGG(gi.image_url ORDER BY gi.sort_order ASC)
          FROM gig_images gi
          WHERE gi.gig_id = g.id
          LIMIT 1
        ),
        '{}'
      ) AS images,
      g.created_at
    FROM gigs g
    JOIN freelancer_profiles fp ON g.freelancer_id = fp.id
    JOIN marketplace_categories mc ON g.category_id = mc.id
    WHERE g.status = 'active'
      AND g.locale = ${locale}
    ORDER BY g.is_featured DESC, g.rating_average DESC, g.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  return gigs as GigSummary[];
}

/**
 * Get full gig detail by slug, including packages and all images.
 */
export async function getGigBySlug(
  slug: string,
  locale = 'en'
): Promise<GigDetail | null> {
  const gigs = await sql`
    SELECT
      g.id,
      g.freelancer_id,
      COALESCE(fp.display_name, 'Unknown') AS freelancer_name,
      fp.avatar_url AS freelancer_avatar,
      COALESCE(fp.rating_average, 0) AS freelancer_rating,
      COALESCE(fp.is_verified, false) AS freelancer_verified,
      fp.bio AS freelancer_bio,
      COALESCE(fp.total_orders, 0) AS freelancer_total_orders,
      fp.location_city AS freelancer_city,
      fp.location_country AS freelancer_country,
      g.title,
      g.slug,
      COALESCE(g.description, '') AS description,
      g.category_id,
      COALESCE(mc.name, 'Uncategorized') AS category_name,
      COALESCE(mc.slug, '') AS category_slug,
      COALESCE(g.tags, '{}') AS tags,
      COALESCE(g.work_type, 'remote') AS work_type,
      g.location_city,
      g.location_country,
      COALESCE(
        (
          SELECT MIN(gp.price)
          FROM gig_packages gp
          WHERE gp.gig_id = g.id
        ),
        0
      ) AS price_from,
      COALESCE(
        (
          SELECT gp.currency
          FROM gig_packages gp
          WHERE gp.gig_id = g.id
          ORDER BY gp.price ASC
          LIMIT 1
        ),
        'USD'
      ) AS currency,
      COALESCE(g.views, 0) AS views,
      COALESCE(g.order_count, 0) AS order_count,
      COALESCE(g.rating_average, 0) AS rating_average,
      COALESCE(g.rating_count, 0) AS rating_count,
      COALESCE(g.is_featured, false) AS is_featured,
      g.status,
      COALESCE(
        (
          SELECT ARRAY_AGG(gi.image_url ORDER BY gi.sort_order ASC)
          FROM gig_images gi
          WHERE gi.gig_id = g.id
        ),
        '{}'
      ) AS images,
      g.created_at
    FROM gigs g
    JOIN freelancer_profiles fp ON g.freelancer_id = fp.id
    JOIN marketplace_categories mc ON g.category_id = mc.id
    WHERE g.slug = ${slug}
      AND g.locale = ${locale}
    LIMIT 1
  `;

  if (!gigs || gigs.length === 0) {
    return null;
  }

  const gig = gigs[0];

  // Fetch packages for this gig
  const packages = await sql`
    SELECT
      gp.id,
      COALESCE(gp.tier, 'basic') AS tier,
      COALESCE(gp.title, '') AS title,
      COALESCE(gp.description, '') AS description,
      COALESCE(gp.price, 0) AS price,
      COALESCE(gp.currency, 'USD') AS currency,
      COALESCE(gp.delivery_days, 1) AS delivery_days,
      COALESCE(gp.revision_count, 0) AS revision_count,
      COALESCE(gp.features, '{}') AS features
    FROM gig_packages gp
    WHERE gp.gig_id = ${gig.id}
    ORDER BY gp.price ASC
  `;

  // Fetch all images with alt text
  const allImages = await sql`
    SELECT
      gi.image_url,
      COALESCE(gi.alt, '') AS alt
    FROM gig_images gi
    WHERE gi.gig_id = ${gig.id}
    ORDER BY gi.sort_order ASC
  `;

  return {
    ...gig,
    packages: packages as GigPackage[],
    all_images: allImages as { url: string; alt: string }[],
  } as GigDetail;
}

/**
 * Get all active gigs for a specific freelancer.
 */
export async function getGigsByFreelancer(
  freelancerId: string,
  locale = 'en'
): Promise<GigSummary[]> {
  const gigs = await sql`
    SELECT
      g.id,
      g.freelancer_id,
      COALESCE(fp.display_name, 'Unknown') AS freelancer_name,
      fp.avatar_url AS freelancer_avatar,
      COALESCE(fp.rating_average, 0) AS freelancer_rating,
      COALESCE(fp.is_verified, false) AS freelancer_verified,
      g.title,
      g.slug,
      COALESCE(g.description, '') AS description,
      g.category_id,
      COALESCE(mc.name, 'Uncategorized') AS category_name,
      COALESCE(mc.slug, '') AS category_slug,
      COALESCE(g.tags, '{}') AS tags,
      COALESCE(g.work_type, 'remote') AS work_type,
      g.location_city,
      g.location_country,
      COALESCE(
        (
          SELECT MIN(gp.price)
          FROM gig_packages gp
          WHERE gp.gig_id = g.id
        ),
        0
      ) AS price_from,
      COALESCE(
        (
          SELECT gp.currency
          FROM gig_packages gp
          WHERE gp.gig_id = g.id
          ORDER BY gp.price ASC
          LIMIT 1
        ),
        'USD'
      ) AS currency,
      COALESCE(g.views, 0) AS views,
      COALESCE(g.order_count, 0) AS order_count,
      COALESCE(g.rating_average, 0) AS rating_average,
      COALESCE(g.rating_count, 0) AS rating_count,
      COALESCE(g.is_featured, false) AS is_featured,
      g.status,
      COALESCE(
        (
          SELECT ARRAY_AGG(gi.image_url ORDER BY gi.sort_order ASC)
          FROM gig_images gi
          WHERE gi.gig_id = g.id
          LIMIT 1
        ),
        '{}'
      ) AS images,
      g.created_at
    FROM gigs g
    JOIN freelancer_profiles fp ON g.freelancer_id = fp.id
    JOIN marketplace_categories mc ON g.category_id = mc.id
    WHERE g.freelancer_id = ${freelancerId}
      AND g.status = 'active'
      AND g.locale = ${locale}
    ORDER BY g.is_featured DESC, g.rating_average DESC, g.created_at DESC
  `;

  return gigs as GigSummary[];
}

// ============================================================
// Category Queries
// ============================================================

/**
 * Get all marketplace categories as a tree (parents with nested children),
 * including gig counts.
 */
export async function getMarketplaceCategories(
  locale = 'en'
): Promise<MarketplaceCategory[]> {
  const rows = await sql`
    SELECT
      mc.id,
      COALESCE(mc.name, '') AS name,
      COALESCE(mc.slug, '') AS slug,
      mc.description,
      mc.icon,
      mc.image_url,
      mc.parent_id,
      COALESCE(mc.service_type, 'freelance') AS service_type,
      COALESCE(
        (
          SELECT COUNT(*)::int
          FROM gigs g
          WHERE g.category_id = mc.id
            AND g.status = 'active'
            AND g.locale = ${locale}
        ),
        0
      ) AS gig_count
    FROM marketplace_categories mc
    ORDER BY mc.parent_id NULLS FIRST, mc.name ASC
  `;

  const categories = rows as MarketplaceCategory[];

  // Build tree: map id -> category, then attach children to parents
  const map = new Map<string, MarketplaceCategory>();
  const roots: MarketplaceCategory[] = [];

  for (const cat of categories) {
    map.set(cat.id, { ...cat, children: [] });
  }

  for (const cat of map.values()) {
    if (cat.parent_id) {
      const parent = map.get(cat.parent_id);
      if (parent) {
        parent.children = parent.children ?? [];
        parent.children.push(cat);
      } else {
        // Parent not found, treat as root
        roots.push(cat);
      }
    } else {
      roots.push(cat);
    }
  }

  return roots;
}

// ============================================================
// Freelancer Queries
// ============================================================

/**
 * Get a paginated list of active freelancers.
 */
export async function searchFreelancers(
  limit = 20,
  offset = 0,
  locale = 'en'
): Promise<FreelancerProfile[]> {
  const freelancers = await sql`
    SELECT
      fp.id,
      fp.user_id,
      COALESCE(fp.display_name, 'Unknown') AS display_name,
      fp.tagline,
      fp.bio,
      fp.avatar_url,
      fp.hourly_rate,
      COALESCE(fp.work_type, 'remote') AS work_type,
      fp.location_city,
      fp.location_country,
      COALESCE(fp.skills, '{}') AS skills,
      COALESCE(fp.languages, '{}') AS languages,
      COALESCE(fp.is_verified, false) AS is_verified,
      COALESCE(fp.rating_average, 0) AS rating_average,
      COALESCE(fp.rating_count, 0) AS rating_count,
      COALESCE(fp.total_orders, 0) AS total_orders,
      COALESCE(fp.completion_rate, 0) AS completion_rate,
      fp.response_time_hours,
      COALESCE(fp.status, 'active') AS status,
      fp.created_at
    FROM freelancer_profiles fp
    WHERE fp.status = 'active'
      AND fp.locale = ${locale}
    ORDER BY fp.is_verified DESC, fp.rating_average DESC, fp.total_orders DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  return freelancers as FreelancerProfile[];
}

/**
 * Get a single freelancer profile by their user_id.
 */
export async function getFreelancerProfile(
  userId: string,
  locale = 'en'
): Promise<FreelancerProfile | null> {
  const rows = await sql`
    SELECT
      fp.id,
      fp.user_id,
      COALESCE(fp.display_name, 'Unknown') AS display_name,
      fp.tagline,
      fp.bio,
      fp.avatar_url,
      fp.hourly_rate,
      COALESCE(fp.work_type, 'remote') AS work_type,
      fp.location_city,
      fp.location_country,
      COALESCE(fp.skills, '{}') AS skills,
      COALESCE(fp.languages, '{}') AS languages,
      COALESCE(fp.is_verified, false) AS is_verified,
      COALESCE(fp.rating_average, 0) AS rating_average,
      COALESCE(fp.rating_count, 0) AS rating_count,
      COALESCE(fp.total_orders, 0) AS total_orders,
      COALESCE(fp.completion_rate, 0) AS completion_rate,
      fp.response_time_hours,
      COALESCE(fp.status, 'active') AS status,
      fp.created_at
    FROM freelancer_profiles fp
    WHERE fp.user_id = ${userId}
      AND fp.locale = ${locale}
    LIMIT 1
  `;

  if (!rows || rows.length === 0) {
    return null;
  }

  return rows[0] as FreelancerProfile;
}

// ============================================================
// Project Queries
// ============================================================

/**
 * Get a paginated list of open projects with client name and category.
 */
export async function getOpenProjects(
  limit = 20,
  offset = 0,
  locale = 'en'
): Promise<ProjectSummary[]> {
  const projects = await sql`
    SELECT
      p.id,
      p.client_id,
      COALESCE(
        (
          SELECT fp.display_name
          FROM freelancer_profiles fp
          WHERE fp.user_id = p.client_id
          LIMIT 1
        ),
        'Unknown Client'
      ) AS client_name,
      COALESCE(p.title, '') AS title,
      COALESCE(p.slug, '') AS slug,
      COALESCE(p.description, '') AS description,
      COALESCE(mc.name, 'Uncategorized') AS category_name,
      COALESCE(p.required_skills, '{}') AS required_skills,
      p.budget_min,
      p.budget_max,
      COALESCE(p.currency, 'USD') AS currency,
      p.deadline,
      COALESCE(p.work_type, 'remote') AS work_type,
      p.location_city,
      p.location_country,
      COALESCE(
        (
          SELECT COUNT(*)::int
          FROM bids b
          WHERE b.project_id = p.id
        ),
        0
      ) AS bid_count,
      COALESCE(p.views, 0) AS views,
      COALESCE(p.status, 'open') AS status,
      p.created_at
    FROM projects p
    LEFT JOIN marketplace_categories mc ON p.category_id = mc.id
    WHERE p.status = 'open'
      AND p.locale = ${locale}
    ORDER BY p.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  return projects as ProjectSummary[];
}

// ============================================================
// Order Queries
// ============================================================

/**
 * Create a new order with auto-generated order number and platform fee calculation.
 */
export async function createOrder(data: CreateOrderData): Promise<OrderSummary> {
  const platformFee = calculatePlatformFee(data.amount);
  const freelancerEarnings = Math.round((data.amount - platformFee) * 100) / 100;

  // Generate order number: ORD-YYYYMMDD-XXXXXX (random 6-char suffix)
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.random().toString(36).toUpperCase().slice(2, 8);
  const orderNumber = `ORD-${datePart}-${randomSuffix}`;

  const deliveryDeadline = new Date(now);
  deliveryDeadline.setDate(deliveryDeadline.getDate() + data.delivery_days);

  const rows = await sql`
    INSERT INTO orders (
      order_number,
      order_type,
      gig_id,
      project_id,
      package_id,
      client_id,
      freelancer_id,
      title,
      amount,
      platform_fee,
      freelancer_earnings,
      currency,
      status,
      escrow_status,
      delivery_deadline
    ) VALUES (
      ${orderNumber},
      ${data.order_type},
      ${data.gig_id ?? null},
      ${data.project_id ?? null},
      ${data.package_id ?? null},
      ${data.client_id},
      ${data.freelancer_id},
      ${data.title},
      ${data.amount},
      ${platformFee},
      ${freelancerEarnings},
      ${data.currency},
      'pending',
      'pending',
      ${deliveryDeadline.toISOString()}
    )
    RETURNING
      id,
      order_number,
      order_type,
      title,
      amount,
      platform_fee,
      freelancer_earnings,
      currency,
      status,
      escrow_status,
      delivery_deadline,
      (
        SELECT COALESCE(fp.display_name, 'Unknown')
        FROM freelancer_profiles fp
        WHERE fp.user_id = client_id
        LIMIT 1
      ) AS client_name,
      (
        SELECT COALESCE(fp.display_name, 'Unknown')
        FROM freelancer_profiles fp
        WHERE fp.id = freelancer_id
        LIMIT 1
      ) AS freelancer_name,
      created_at,
      completed_at
  `;

  return rows[0] as OrderSummary;
}

/**
 * Get orders for a user, either as client or freelancer.
 */
export async function getOrdersByUser(
  userId: string,
  role: 'client' | 'freelancer',
  limit = 20,
  offset = 0
): Promise<OrderSummary[]> {
  // Determine which column to filter on
  // For 'client': match client_id = userId
  // For 'freelancer': match freelancer profiles id where user_id = userId
  if (role === 'client') {
    const orders = await sql`
      SELECT
        o.id,
        o.order_number,
        COALESCE(o.order_type, 'gig') AS order_type,
        COALESCE(o.title, '') AS title,
        COALESCE(o.amount, 0) AS amount,
        COALESCE(o.platform_fee, 0) AS platform_fee,
        COALESCE(o.freelancer_earnings, 0) AS freelancer_earnings,
        COALESCE(o.currency, 'USD') AS currency,
        COALESCE(o.status, 'pending') AS status,
        COALESCE(o.escrow_status, 'pending') AS escrow_status,
        o.delivery_deadline,
        COALESCE(
          (
            SELECT fp.display_name
            FROM freelancer_profiles fp
            WHERE fp.user_id = o.client_id
            LIMIT 1
          ),
          'Unknown'
        ) AS client_name,
        COALESCE(
          (
            SELECT fp.display_name
            FROM freelancer_profiles fp
            WHERE fp.id = o.freelancer_id
            LIMIT 1
          ),
          'Unknown'
        ) AS freelancer_name,
        o.created_at,
        o.completed_at
      FROM orders o
      WHERE o.client_id = ${userId}
      ORDER BY o.created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;
    return orders as OrderSummary[];
  } else {
    const orders = await sql`
      SELECT
        o.id,
        o.order_number,
        COALESCE(o.order_type, 'gig') AS order_type,
        COALESCE(o.title, '') AS title,
        COALESCE(o.amount, 0) AS amount,
        COALESCE(o.platform_fee, 0) AS platform_fee,
        COALESCE(o.freelancer_earnings, 0) AS freelancer_earnings,
        COALESCE(o.currency, 'USD') AS currency,
        COALESCE(o.status, 'pending') AS status,
        COALESCE(o.escrow_status, 'pending') AS escrow_status,
        o.delivery_deadline,
        COALESCE(
          (
            SELECT fp.display_name
            FROM freelancer_profiles fp
            WHERE fp.user_id = o.client_id
            LIMIT 1
          ),
          'Unknown'
        ) AS client_name,
        COALESCE(
          (
            SELECT fp.display_name
            FROM freelancer_profiles fp
            WHERE fp.id = o.freelancer_id
            LIMIT 1
          ),
          'Unknown'
        ) AS freelancer_name,
        o.created_at,
        o.completed_at
      FROM orders o
      JOIN freelancer_profiles fp ON o.freelancer_id = fp.id
      WHERE fp.user_id = ${userId}
      ORDER BY o.created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;
    return orders as OrderSummary[];
  }
}

// ============================================================
// Review Queries
// ============================================================

export interface FreelancerReview {
  id: string;
  reviewer_id: string;
  reviewee_id: string;
  reviewer_role: string;
  overall_rating: number;
  communication_rating: number | null;
  quality_rating: number | null;
  timeliness_rating: number | null;
  value_rating: number | null;
  content: string | null;
  is_public: boolean;
  created_at: string;
  reviewer_name: string;
  reviewer_avatar: string | null;
  order_title: string | null;
}

/**
 * Get public reviews for a freelancer by their freelancer_profiles.id.
 * Only returns reviews where is_public = true (both parties reviewed).
 */
export async function getFreelancerReviews(
  freelancerId: string,
  limit = 10,
  offset = 0
): Promise<FreelancerReview[]> {
  return await sql`
    SELECT mr.*, u.name AS reviewer_name, u.image AS reviewer_avatar,
      o.title AS order_title
    FROM marketplace_reviews mr
    JOIN users u ON mr.reviewer_id = u.id
    JOIN orders o ON mr.order_id = o.id
    WHERE mr.reviewee_id = (
      SELECT user_id FROM freelancer_profiles WHERE id = ${freelancerId} LIMIT 1
    )
    AND mr.is_public = true
    ORDER BY mr.created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  ` as FreelancerReview[];
}

/**
 * Get a single order by ID, with an auth check that the requesting user
 * is either the client or the freelancer on the order.
 */
export async function getOrderById(
  orderId: string,
  userId: string
): Promise<OrderSummary | null> {
  const rows = await sql`
    SELECT
      o.id,
      o.order_number,
      COALESCE(o.order_type, 'gig') AS order_type,
      COALESCE(o.title, '') AS title,
      COALESCE(o.amount, 0) AS amount,
      COALESCE(o.platform_fee, 0) AS platform_fee,
      COALESCE(o.freelancer_earnings, 0) AS freelancer_earnings,
      COALESCE(o.currency, 'USD') AS currency,
      COALESCE(o.status, 'pending') AS status,
      COALESCE(o.escrow_status, 'pending') AS escrow_status,
      o.delivery_deadline,
      COALESCE(
        (
          SELECT fp.display_name
          FROM freelancer_profiles fp
          WHERE fp.user_id = o.client_id
          LIMIT 1
        ),
        'Unknown'
      ) AS client_name,
      COALESCE(
        (
          SELECT fp.display_name
          FROM freelancer_profiles fp
          WHERE fp.id = o.freelancer_id
          LIMIT 1
        ),
        'Unknown'
      ) AS freelancer_name,
      o.created_at,
      o.completed_at
    FROM orders o
    LEFT JOIN freelancer_profiles fp ON o.freelancer_id = fp.id
    WHERE o.id = ${orderId}
      AND (
        o.client_id = ${userId}
        OR fp.user_id = ${userId}
      )
    LIMIT 1
  `;

  if (!rows || rows.length === 0) {
    return null;
  }

  return rows[0] as OrderSummary;
}
