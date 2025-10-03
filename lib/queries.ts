import { neon } from '@neondatabase/serverless';

// Get database URL - try Netlify-specific env var first
const databaseUrl = process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ Database URL not configured');
  console.error('Environment:', {
    NETLIFY: process.env.NETLIFY,
    hasNETLIFY_DATABASE_URL: !!process.env.NETLIFY_DATABASE_URL,
    hasDATABASE_URL: !!process.env.DATABASE_URL,
  });
  throw new Error(
    'Database URL not configured. Please set DATABASE_URL or NETLIFY_DATABASE_URL environment variable.'
  );
}

// Create SQL client - simple and direct
export const sql = neon(databaseUrl);

// Type definitions
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  feature_img: string | null;
  post_format: string;
  status: string;
  published_at: Date | null;
  views: number;
  read_time: number | null;
  featured: boolean;
  sticky: boolean;
  created_at: Date;
  author_id: string | null;
  author_name: string | null;
  author_email: string | null;
  author_avatar: string | null;
  category_id: string | null;
  category_name: string | null;
  category_slug: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  color: string;
  post_count?: number;
}

export interface Platform {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  website_url: string | null;
  rating: number;
  category: string;
  fees: string | null;
  difficulty: string;
  color: string;
  featured: boolean;
  pros: string[];
  cons: string[];
  features: string[];
  status: string;
  published_at: Date | null;
  created_at: Date;
}

export interface Review {
  id: string;
  platform_id: string;
  platform_name?: string;
  platform_slug?: string;
  user_id: string;
  user_name: string;
  user_avatar: string | null;
  user_role: string | null;
  title: string;
  content: string;
  overall_rating: number;
  ease_of_use_rating: number | null;
  support_rating: number | null;
  value_rating: number | null;
  pros: string[];
  cons: string[];
  project_type: string | null;
  earnings_range: string | null;
  years_experience: number | null;
  verified: boolean;
  helpful_count: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

// Query: Get all published posts (SAFE: returns camelCase + never NULL/empty strings)
export async function getPublishedPosts(limit = 10, offset = 0): Promise<Post[]> {
  const posts = await sql`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.excerpt,
      p.content,
      COALESCE(NULLIF(TRIM(p.featured_image), ''), '/images/posts/lifestyle-post-01.webp') AS feature_img,
      'standard' as post_format,
      p.status,
      p.published_at,
      p.views,
      5 as read_time,
      false as featured,
      false as sticky,
      p.created_at,
      CONCAT(p.title, ' - SkillLinkup') as meta_title,
      LEFT(p.excerpt, 160) as meta_description,
      a.id as author_id,
      COALESCE(a.name, 'Anonymous') as author_name,
      a.email as author_email,
      COALESCE(NULLIF(TRIM(a.avatar), ''), '/images/posts/author/author-image-1.png') as author_avatar,
      c.id as category_id,
      COALESCE(c.name, 'Uncategorized') as category_name,
      c.slug as category_slug
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN authors a ON p.author_id = a.id
    WHERE p.status = 'published'
    ORDER BY p.published_at DESC
    LIMIT ${limit}
    OFFSET ${offset};
  `;

  return posts as Post[];
}

// Query: Get featured posts (SAFE)
export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  const posts = await sql`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.excerpt,
      p.content,
      COALESCE(NULLIF(TRIM(p.featured_image), ''), '/images/posts/lifestyle-post-01.webp') AS feature_img,
      'standard' as post_format,
      p.status,
      p.published_at,
      p.views,
      5 as read_time,
      false as featured,
      false as sticky,
      p.created_at,
      a.id as author_id,
      COALESCE(a.name, 'Anonymous') as author_name,
      a.email as author_email,
      COALESCE(NULLIF(TRIM(a.avatar), ''), '/images/posts/author/author-image-1.png') as author_avatar,
      c.id as category_id,
      COALESCE(c.name, 'Uncategorized') as category_name,
      c.slug as category_slug
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN authors a ON p.author_id = a.id
    WHERE p.status = 'published'
    ORDER BY p.published_at DESC
    LIMIT ${limit};
  `;

  return posts as Post[];
}

// Query: Get post by slug (SAFE - includes meta fields for SEO)
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await sql`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.excerpt,
      p.content,
      COALESCE(NULLIF(TRIM(p.featured_image), ''), '/images/posts/lifestyle-post-01.webp') AS feature_img,
      'standard' as post_format,
      p.status,
      p.published_at,
      p.views,
      5 as read_time,
      false as featured,
      false as sticky,
      p.created_at,
      CONCAT(p.title, ' - SkillLinkup') as meta_title,
      LEFT(p.excerpt, 160) as meta_description,
      a.id as author_id,
      COALESCE(a.name, 'Anonymous') as author_name,
      a.email as author_email,
      COALESCE(NULLIF(TRIM(a.avatar), ''), '/images/posts/author/author-image-1.png') as author_avatar,
      c.id as category_id,
      COALESCE(c.name, 'Uncategorized') as category_name,
      c.slug as category_slug
    FROM posts p
    LEFT JOIN authors a ON p.author_id = a.id
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.slug = ${slug}
    LIMIT 1;
  `;

  return (posts[0] as Post) || null;
}

// Query: Get posts by category (SAFE)
export async function getPostsByCategory(categorySlug: string, limit = 10): Promise<Post[]> {
  const posts = await sql`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.excerpt,
      p.content,
      COALESCE(NULLIF(TRIM(p.featured_image), ''), '/images/posts/lifestyle-post-01.webp') AS feature_img,
      'standard' as post_format,
      p.status,
      p.published_at,
      p.views,
      5 as read_time,
      false as featured,
      false as sticky,
      p.created_at,
      a.id as author_id,
      COALESCE(a.name, 'Anonymous') as author_name,
      a.email as author_email,
      COALESCE(NULLIF(TRIM(a.avatar), ''), '/images/posts/author/author-image-1.png') as author_avatar,
      c.id as category_id,
      COALESCE(c.name, 'Uncategorized') as category_name,
      c.slug as category_slug
    FROM posts p
    LEFT JOIN authors a ON p.author_id = a.id
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'published' AND c.slug = ${categorySlug}
    ORDER BY p.published_at DESC
    LIMIT ${limit};
  `;

  return posts as Post[];
}

// Query: Get all categories (SAFE)
export async function getCategories(): Promise<Category[]> {
  const categories = await sql`
    SELECT
      c.id,
      c.name,
      c.slug,
      c.description,
      c.color,
      '/images/post-images/category-image-01.jpg' as image,
      COUNT(p.id)::int as post_count
    FROM categories c
    LEFT JOIN posts p ON c.id = p.category_id AND p.status = 'published'
    GROUP BY c.id, c.name, c.slug, c.description, c.color
    ORDER BY c.name ASC;
  `;

  return categories as Category[];
}

// Query: Get recent posts (for sidebar) (SAFE)
export async function getRecentPosts(limit = 5): Promise<Post[]> {
  const posts = await sql`
    SELECT
      p.id,
      p.title,
      p.slug,
      COALESCE(NULLIF(TRIM(p.featured_image), ''), '/images/posts/lifestyle-post-01.webp') AS feature_img,
      p.published_at,
      p.views,
      COALESCE(c.name, 'Uncategorized') as category_name,
      c.slug as category_slug
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'published'
    ORDER BY p.published_at DESC
    LIMIT ${limit};
  `;

  return posts as Post[];
}

// Utility: Check database health and data quality
export async function checkDatabaseHealth() {
  try {
    const result = await sql`
      SELECT
        COUNT(*) AS total_posts,
        COUNT(*) FILTER (WHERE featured_image IS NULL) AS null_images,
        COUNT(*) FILTER (WHERE TRIM(featured_image) = '') AS empty_images,
        COUNT(*) FILTER (WHERE status = 'published') AS published_posts
      FROM posts;
    `;

    console.log('📊 Database Health Check:', result[0]);
    return result[0];
  } catch (error) {
    console.error('❌ Database health check failed:', error);
    return null;
  }
}

// Utility: Fix NULL/empty featured_image in database
export async function fixEmptyImages() {
  try {
    const result = await sql`
      UPDATE posts
      SET featured_image = '/images/posts/lifestyle-post-01.webp'
      WHERE featured_image IS NULL OR TRIM(featured_image) = ''
      RETURNING id, slug, featured_image;
    `;

    console.log(`✅ Fixed ${result.length} posts with empty images`);
    return result;
  } catch (error) {
    console.error('❌ Failed to fix empty images:', error);
    return [];
  }
}

// ==================== PLATFORMS QUERIES ====================

// Query: Get all published platforms (SAFE)
export async function getPublishedPlatforms(limit = 50): Promise<Platform[]> {
  const platforms = await sql`
    SELECT
      id,
      name,
      slug,
      description,
      logo_url,
      website_url,
      rating,
      category,
      fees,
      difficulty,
      color,
      featured,
      pros,
      cons,
      features,
      status,
      published_at,
      created_at
    FROM platforms
    WHERE status = 'published'
    ORDER BY featured DESC, rating DESC, name ASC
    LIMIT ${limit};
  `;

  return platforms as Platform[];
}

// Query: Get featured platforms (SAFE)
export async function getFeaturedPlatforms(limit = 3): Promise<Platform[]> {
  const platforms = await sql`
    SELECT
      id,
      name,
      slug,
      description,
      logo_url,
      website_url,
      rating,
      category,
      fees,
      difficulty,
      color,
      featured,
      pros,
      cons,
      features,
      status,
      published_at,
      created_at
    FROM platforms
    WHERE status = 'published' AND featured = true
    ORDER BY rating DESC, name ASC
    LIMIT ${limit};
  `;

  return platforms as Platform[];
}

// Query: Get platform by slug (SAFE)
export async function getPlatformBySlug(slug: string): Promise<Platform | null> {
  const platforms = await sql`
    SELECT
      id,
      name,
      slug,
      description,
      logo_url,
      website_url,
      rating,
      category,
      fees,
      difficulty,
      color,
      featured,
      pros,
      cons,
      features,
      status,
      published_at,
      created_at
    FROM platforms
    WHERE slug = ${slug} AND status = 'published'
    LIMIT 1;
  `;

  return (platforms[0] as Platform) || null;
}

// Query: Get platforms by category (SAFE)
export async function getPlatformsByCategory(category: string, limit = 20): Promise<Platform[]> {
  const platforms = await sql`
    SELECT
      id,
      name,
      slug,
      description,
      logo_url,
      website_url,
      rating,
      category,
      fees,
      difficulty,
      color,
      featured,
      pros,
      cons,
      features,
      status,
      published_at,
      created_at
    FROM platforms
    WHERE status = 'published' AND category = ${category}
    ORDER BY rating DESC, name ASC
    LIMIT ${limit};
  `;

  return platforms as Platform[];
}

// Query: Get platform categories with counts (SAFE)
export async function getPlatformCategories(): Promise<{ category: string; count: number }[]> {
  const categories = await sql`
    SELECT
      category,
      COUNT(*)::int as count
    FROM platforms
    WHERE status = 'published'
    GROUP BY category
    ORDER BY category ASC;
  `;

  return categories as { category: string; count: number }[];
}

// Query: Get approved reviews with platform info (SAFE)
export async function getApprovedReviews(limit = 50, offset = 0): Promise<Review[]> {
  const reviews = await sql`
    SELECT
      r.id,
      r.platform_id,
      p.name as platform_name,
      p.slug as platform_slug,
      r.user_id,
      r.user_name,
      r.user_avatar,
      r.user_role,
      r.title,
      r.content,
      r.overall_rating,
      r.ease_of_use_rating,
      r.support_rating,
      r.value_rating,
      r.pros,
      r.cons,
      r.project_type,
      r.earnings_range,
      r.years_experience,
      r.verified,
      r.helpful_count,
      r.status,
      r.created_at,
      r.updated_at
    FROM reviews r
    LEFT JOIN platforms p ON r.platform_id = p.id
    WHERE r.status = 'approved'
    ORDER BY r.created_at DESC
    LIMIT ${limit}
    OFFSET ${offset};
  `;

  return reviews as Review[];
}

// Query: Get reviews by platform ID (SAFE)
export async function getReviewsByPlatform(platformId: string, limit = 10): Promise<Review[]> {
  const reviews = await sql`
    SELECT
      r.id,
      r.platform_id,
      r.user_id,
      r.user_name,
      r.user_avatar,
      r.user_role,
      r.title,
      r.content,
      r.overall_rating,
      r.ease_of_use_rating,
      r.support_rating,
      r.value_rating,
      r.pros,
      r.cons,
      r.project_type,
      r.earnings_range,
      r.years_experience,
      r.verified,
      r.helpful_count,
      r.status,
      r.created_at,
      r.updated_at
    FROM reviews r
    WHERE r.platform_id = ${platformId}
      AND r.status = 'approved'
    ORDER BY r.created_at DESC
    LIMIT ${limit};
  `;

  return reviews as Review[];
}

// Query: Get review by ID (SAFE)
export async function getReviewById(id: string): Promise<Review | null> {
  const reviews = await sql`
    SELECT
      r.id,
      r.platform_id,
      p.name as platform_name,
      p.slug as platform_slug,
      r.user_id,
      r.user_name,
      r.user_avatar,
      r.user_role,
      r.title,
      r.content,
      r.overall_rating,
      r.ease_of_use_rating,
      r.support_rating,
      r.value_rating,
      r.pros,
      r.cons,
      r.project_type,
      r.earnings_range,
      r.years_experience,
      r.verified,
      r.helpful_count,
      r.status,
      r.created_at,
      r.updated_at
    FROM reviews r
    LEFT JOIN platforms p ON r.platform_id = p.id
    WHERE r.id = ${id}
    LIMIT 1;
  `;

  return reviews.length > 0 ? (reviews[0] as Review) : null;
}

// ==========================================
// Tool Queries
// ==========================================

export interface Tool {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  icon: string | null;
  color: string;
  tool_url: string | null;
  is_available: boolean;
  featured: boolean;
  sort_order: number;
  views: number;
  status: string;
  created_at: string;
  updated_at: string;
}

/**
 * Get all published tools with optional limit
 */
export async function getPublishedTools(limit = 50): Promise<Tool[]> {
  const tools = await sql`
    SELECT
      id,
      owner_id,
      name,
      slug,
      description,
      category,
      icon,
      color,
      tool_url,
      is_available,
      featured,
      sort_order,
      views,
      status,
      created_at,
      updated_at
    FROM tools
    WHERE status = 'published'
    ORDER BY sort_order ASC, created_at DESC
    LIMIT ${limit};
  `;

  return tools as Tool[];
}

/**
 * Get tool by slug
 */
export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const tools = await sql`
    SELECT
      id,
      owner_id,
      name,
      slug,
      description,
      category,
      icon,
      color,
      tool_url,
      is_available,
      featured,
      sort_order,
      views,
      status,
      created_at,
      updated_at
    FROM tools
    WHERE slug = ${slug} AND status = 'published'
    LIMIT 1;
  `;

  return tools.length > 0 ? (tools[0] as Tool) : null;
}

/**
 * Get tools by category ('tool' or 'resource')
 */
export async function getToolsByCategory(category: string): Promise<Tool[]> {
  const tools = await sql`
    SELECT
      id,
      owner_id,
      name,
      slug,
      description,
      category,
      icon,
      color,
      tool_url,
      is_available,
      featured,
      sort_order,
      views,
      status,
      created_at,
      updated_at
    FROM tools
    WHERE category = ${category} AND status = 'published'
    ORDER BY sort_order ASC, created_at DESC;
  `;

  return tools as Tool[];
}

/**
 * Get featured tools
 */
export async function getFeaturedTools(): Promise<Tool[]> {
  const tools = await sql`
    SELECT
      id,
      owner_id,
      name,
      slug,
      description,
      category,
      icon,
      color,
      tool_url,
      is_available,
      featured,
      sort_order,
      views,
      status,
      created_at,
      updated_at
    FROM tools
    WHERE featured = true AND status = 'published'
    ORDER BY sort_order ASC, created_at DESC;
  `;

  return tools as Tool[];
}
