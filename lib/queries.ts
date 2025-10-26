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
  updated_at: Date | null;
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
  tags?: string[];
  meta_title?: string | null;
  meta_description?: string | null;
  ad_image?: string | null;
  ad_link?: string | null;
  platform_type?: string | null;
  fee_structure?: string | null;
  difficulty_level?: string | null;
  best_for?: string | null;
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
  work_type: string;
  countries: string[];
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
export async function getPublishedPosts(limit = 10, offset = 0, locale = 'nl'): Promise<Post[]> {
  const posts = await sql`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.excerpt,
      p.content,
      COALESCE(NULLIF(TRIM(p.feature_img), ''), '/images/posts/lifestyle-post-01.webp') AS feature_img,
      COALESCE(p.post_format, 'standard') as post_format,
      p.status,
      p.published_at,
      COALESCE(p.views, 0) as views,
      COALESCE(p.read_time, 5) as read_time,
      COALESCE(p.featured, false) as featured,
      COALESCE(p.sticky, false) as sticky,
      p.created_at,
      COALESCE(p.meta_title, CONCAT(p.title, ' - SkillLinkup')) as meta_title,
      COALESCE(p.meta_description, LEFT(p.excerpt, 160)) as meta_description,
      a.id as author_id,
      COALESCE(NULLIF(TRIM(p.author_name), ''), a.name, 'Anonymous') as author_name,
      a.email as author_email,
      COALESCE(NULLIF(TRIM(a.avatar), ''), '/images/posts/author/author-image-1.png') as author_avatar,
      c.id as category_id,
      COALESCE(c.name, 'Uncategorized') as category_name,
      c.slug as category_slug
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN authors a ON p.author_id = a.id
    WHERE p.status = 'published'
      AND p.locale = ${locale}
    ORDER BY p.published_at DESC NULLS LAST
    LIMIT ${limit}
    OFFSET ${offset};
  `;

  return posts as Post[];
}

// Query: Get featured posts (SAFE)
export async function getFeaturedPosts(limit = 3, locale = 'nl'): Promise<Post[]> {
  const posts = await sql`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.excerpt,
      p.content,
      COALESCE(NULLIF(TRIM(p.feature_img), ''), '/images/posts/lifestyle-post-01.webp') AS feature_img,
      'standard' as post_format,
      p.status,
      p.published_at,
      p.views,
      5 as read_time,
      false as featured,
      false as sticky,
      p.created_at,
      a.id as author_id,
      COALESCE(NULLIF(TRIM(p.author_name), ''), a.name, 'Anonymous') as author_name,
      a.email as author_email,
      COALESCE(NULLIF(TRIM(a.avatar), ''), '/images/posts/author/author-image-1.png') as author_avatar,
      c.id as category_id,
      COALESCE(c.name, 'Uncategorized') as category_name,
      c.slug as category_slug
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN authors a ON p.author_id = a.id
    WHERE p.status = 'published'
      AND p.locale = ${locale}
    ORDER BY p.published_at DESC
    LIMIT ${limit};
  `;

  return posts as Post[];
}

// Query: Get post by slug (SAFE - includes meta fields for SEO)
export async function getPostBySlug(slug: string, locale = 'nl'): Promise<Post | null> {
  const posts = await sql`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.excerpt,
      p.content,
      COALESCE(NULLIF(TRIM(p.feature_img), ''), '/images/posts/lifestyle-post-01.webp') AS feature_img,
      COALESCE(p.post_format, 'standard') as post_format,
      p.status,
      p.published_at,
      p.updated_at,
      COALESCE(p.views, 0) as views,
      COALESCE(p.read_time, 5) as read_time,
      COALESCE(p.featured, false) as featured,
      COALESCE(p.sticky, false) as sticky,
      p.created_at,
      p.meta_title,
      p.meta_description,
      p.tags,
      p.ad_image,
      p.ad_link,
      p.platform_type,
      p.fee_structure,
      p.difficulty_level,
      p.best_for,
      a.id as author_id,
      COALESCE(NULLIF(TRIM(p.author_name), ''), a.name, 'Anonymous') as author_name,
      a.email as author_email,
      COALESCE(NULLIF(TRIM(a.avatar), ''), '/images/posts/author/author-image-1.png') as author_avatar,
      c.id as category_id,
      COALESCE(c.name, 'Uncategorized') as category_name,
      c.slug as category_slug
    FROM posts p
    LEFT JOIN authors a ON p.author_id = a.id
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.slug = ${slug}
      AND p.locale = ${locale}
    LIMIT 1;
  `;

  return (posts[0] as Post) || null;
}

// Query: Get posts by category (SAFE)
export async function getPostsByCategory(categorySlug: string, limit = 10, locale = 'nl'): Promise<Post[]> {
  const posts = await sql`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.excerpt,
      p.content,
      COALESCE(NULLIF(TRIM(p.feature_img), ''), '/images/posts/lifestyle-post-01.webp') AS feature_img,
      'standard' as post_format,
      p.status,
      p.published_at,
      p.views,
      5 as read_time,
      false as featured,
      false as sticky,
      p.created_at,
      a.id as author_id,
      COALESCE(NULLIF(TRIM(p.author_name), ''), a.name, 'Anonymous') as author_name,
      a.email as author_email,
      COALESCE(NULLIF(TRIM(a.avatar), ''), '/images/posts/author/author-image-1.png') as author_avatar,
      c.id as category_id,
      COALESCE(c.name, 'Uncategorized') as category_name,
      c.slug as category_slug
    FROM posts p
    LEFT JOIN authors a ON p.author_id = a.id
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'published'
      AND c.slug = ${categorySlug}
      AND p.locale = ${locale}
    ORDER BY p.published_at DESC
    LIMIT ${limit};
  `;

  return posts as Post[];
}

// Query: Get all categories (SAFE)
export async function getCategories(locale = 'nl'): Promise<Category[]> {
  const categories = await sql`
    SELECT
      c.id,
      c.name,
      c.slug,
      c.description,
      '#9333ea' as color,
      '/images/post-images/category-image-01.jpg' as image,
      COUNT(p.id)::int as post_count
    FROM categories c
    LEFT JOIN posts p ON c.id = p.category_id AND p.status = 'published' AND p.locale = ${locale}
    WHERE c.locale = ${locale}
    GROUP BY c.id, c.name, c.slug, c.description
    ORDER BY c.name ASC;
  `;

  return categories as Category[];
}

// Query: Get category by slug (SAFE)
export async function getCategoryBySlug(slug: string, locale = 'nl'): Promise<Category | null> {
  const result = await sql`
    SELECT
      c.id,
      c.name,
      c.slug,
      c.description,
      '#9333ea' as color,
      '/images/post-images/category-image-01.jpg' as image,
      COUNT(p.id)::int as post_count
    FROM categories c
    LEFT JOIN posts p ON c.id = p.category_id AND p.status = 'published' AND p.locale = ${locale}
    WHERE c.slug = ${slug}
      AND c.locale = ${locale}
    GROUP BY c.id, c.name, c.slug, c.description;
  `;

  return result.length > 0 ? (result[0] as Category) : null;
}

// Query: Get recent posts (for sidebar) (SAFE)
export async function getRecentPosts(limit = 5, locale = 'nl'): Promise<Post[]> {
  const posts = await sql`
    SELECT
      p.id,
      p.title,
      p.slug,
      COALESCE(NULLIF(TRIM(p.feature_img), ''), '/images/posts/lifestyle-post-01.webp') AS feature_img,
      p.published_at,
      p.views,
      COALESCE(c.name, 'Uncategorized') as category_name,
      c.slug as category_slug
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'published'
      AND p.locale = ${locale}
    ORDER BY p.published_at DESC
    LIMIT ${limit};
  `;

  return posts as Post[];
}

// Query: Get trending posts (sorted by views) (SAFE)
export async function getTrendingPosts(limit = 6, locale = 'nl'): Promise<Post[]> {
  const posts = await sql`
    SELECT
      p.id,
      p.title,
      p.slug,
      COALESCE(NULLIF(TRIM(p.feature_img), ''), '/images/posts/lifestyle-post-01.webp') AS feature_img,
      p.published_at,
      COALESCE(p.views, 0) as views,
      COALESCE(c.name, 'Uncategorized') as category_name,
      c.slug as category_slug
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'published'
      AND p.locale = ${locale}
    ORDER BY p.views DESC, p.published_at DESC
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
        COUNT(*) FILTER (WHERE feature_img IS NULL) AS null_images,
        COUNT(*) FILTER (WHERE TRIM(feature_img) = '') AS empty_images,
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
      SET feature_img = '/images/posts/lifestyle-post-01.webp'
      WHERE feature_img IS NULL OR TRIM(feature_img) = ''
      RETURNING id, slug, feature_img;
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
export async function getPublishedPlatforms(limit = 50, locale = 'nl'): Promise<Platform[]> {
  const platforms = await sql`
    SELECT
      id,
      name,
      slug,
      description,
      logo_url,
      website_url,
      affiliate_link,
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
      created_at,
      COALESCE(work_type, 'remote') as work_type,
      COALESCE(countries, ARRAY['Worldwide']::TEXT[]) as countries
    FROM platforms
    WHERE status = 'published'
      AND locale = ${locale}
    ORDER BY featured DESC, rating DESC, name ASC
    LIMIT ${limit};
  `;

  return platforms as Platform[];
}

// Query: Get featured platforms (SAFE)
export async function getFeaturedPlatforms(limit = 3, locale = 'nl'): Promise<Platform[]> {
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
      AND featured = true
      AND locale = ${locale}
    ORDER BY rating DESC, name ASC
    LIMIT ${limit};
  `;

  return platforms as Platform[];
}

// Query: Get top-rated platforms (SAFE)
export async function getTopRatedPlatforms(limit = 6, locale = 'nl'): Promise<Platform[]> {
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
      AND locale = ${locale}
    ORDER BY rating DESC, name ASC
    LIMIT ${limit};
  `;

  return platforms as Platform[];
}

// Query: Get platform by slug (SAFE)
export async function getPlatformBySlug(slug: string, locale = 'nl'): Promise<Platform | null> {
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
    WHERE slug = ${slug}
      AND status = 'published'
      AND locale = ${locale}
    LIMIT 1;
  `;

  return (platforms[0] as Platform) || null;
}

// Query: Get platforms by category (SAFE)
export async function getPlatformsByCategory(category: string, limit = 20, locale = 'nl'): Promise<Platform[]> {
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
      AND category = ${category}
      AND locale = ${locale}
    ORDER BY rating DESC, name ASC
    LIMIT ${limit};
  `;

  return platforms as Platform[];
}

// Query: Get platform categories with counts (SAFE)
export async function getPlatformCategories(locale = 'nl'): Promise<{ category: string; count: number }[]> {
  const categories = await sql`
    SELECT
      category,
      COUNT(*)::int as count
    FROM platforms
    WHERE status = 'published'
      AND locale = ${locale}
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

// ==========================================
// Comment Queries
// ==========================================

export interface Comment {
  id: string;
  post_id: string;
  author_name: string;
  author_email: string;
  content: string;
  status: string;
  created_at: Date;
}

/**
 * Get approved comments for a post
 */
export async function getCommentsByPost(postId: string): Promise<Comment[]> {
  const comments = await sql`
    SELECT
      id,
      post_id,
      author_name,
      author_email,
      content,
      status,
      created_at
    FROM comments
    WHERE post_id = ${postId} AND status = 'approved'
    ORDER BY created_at DESC;
  `;

  return comments as Comment[];
}

/**
 * Get all comments (for admin)
 */
export async function getAllComments(limit = 100): Promise<Comment[]> {
  const comments = await sql`
    SELECT
      id,
      post_id,
      author_name,
      author_email,
      content,
      status,
      created_at
    FROM comments
    ORDER BY created_at DESC
    LIMIT ${limit};
  `;

  return comments as Comment[];
}

/**
 * Get pending comments count (for admin dashboard)
 */
export async function getPendingCommentsCount(): Promise<number> {
  const result = await sql`
    SELECT COUNT(*)::int as count
    FROM comments
    WHERE status = 'pending';
  `;

  return result[0]?.count || 0;
}
