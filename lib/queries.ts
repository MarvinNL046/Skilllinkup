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
  post_count?: number;
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
      COALESCE(NULLIF(TRIM(p.feature_img), ''), '/images/posts/lifestyle-post-01.webp') AS feature_img,
      p.post_format,
      p.status,
      p.published_at,
      p.views,
      p.read_time,
      p.featured,
      p.sticky,
      p.created_at,
      COALESCE(NULLIF(TRIM(p.meta_title), ''), CONCAT(p.title, ' - SkillLinkup')) as meta_title,
      COALESCE(NULLIF(TRIM(p.meta_description), ''), LEFT(p.excerpt, 160)) as meta_description,
      u.id as author_id,
      COALESCE(NULLIF(TRIM(u.name), ''), 'Anonymous') as author_name,
      u.email as author_email,
      COALESCE(NULLIF(TRIM(u.avatar), ''), '/images/posts/author/author-image-1.png') as author_avatar,
      c.id as category_id,
      COALESCE(c.name, 'Uncategorized') as category_name,
      c.slug as category_slug
    FROM posts p
    LEFT JOIN users u ON p.author_id = u.id
    LEFT JOIN categories c ON p.category_id = c.id
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
      COALESCE(NULLIF(TRIM(p.feature_img), ''), '/images/posts/lifestyle-post-01.webp') AS feature_img,
      p.post_format,
      p.status,
      p.published_at,
      p.views,
      p.read_time,
      p.featured,
      p.sticky,
      p.created_at,
      u.id as author_id,
      COALESCE(NULLIF(TRIM(u.name), ''), 'Anonymous') as author_name,
      u.email as author_email,
      COALESCE(NULLIF(TRIM(u.avatar), ''), '/images/posts/author/author-image-1.png') as author_avatar,
      c.id as category_id,
      COALESCE(c.name, 'Uncategorized') as category_name,
      c.slug as category_slug
    FROM posts p
    LEFT JOIN users u ON p.author_id = u.id
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'published' AND p.featured = true
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
      COALESCE(NULLIF(TRIM(p.feature_img), ''), '/images/posts/lifestyle-post-01.webp') AS feature_img,
      p.post_format,
      p.status,
      p.published_at,
      p.views,
      p.read_time,
      p.featured,
      p.sticky,
      p.created_at,
      COALESCE(NULLIF(TRIM(p.meta_title), ''), CONCAT(p.title, ' - SkillLinkup')) as meta_title,
      COALESCE(NULLIF(TRIM(p.meta_description), ''), LEFT(COALESCE(p.excerpt, p.title), 160)) as meta_description,
      u.id as author_id,
      COALESCE(NULLIF(TRIM(u.name), ''), 'Anonymous') as author_name,
      u.email as author_email,
      COALESCE(NULLIF(TRIM(u.avatar), ''), '/images/posts/author/author-image-1.png') as author_avatar,
      c.id as category_id,
      COALESCE(c.name, 'Uncategorized') as category_name,
      c.slug as category_slug
    FROM posts p
    LEFT JOIN users u ON p.author_id = u.id
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
      COALESCE(NULLIF(TRIM(p.feature_img), ''), '/images/posts/lifestyle-post-01.webp') AS feature_img,
      p.post_format,
      p.status,
      p.published_at,
      p.views,
      p.read_time,
      p.featured,
      p.sticky,
      p.created_at,
      u.id as author_id,
      COALESCE(NULLIF(TRIM(u.name), ''), 'Anonymous') as author_name,
      u.email as author_email,
      COALESCE(NULLIF(TRIM(u.avatar), ''), '/images/posts/author/author-image-1.png') as author_avatar,
      c.id as category_id,
      COALESCE(c.name, 'Uncategorized') as category_name,
      c.slug as category_slug
    FROM posts p
    LEFT JOIN users u ON p.author_id = u.id
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
      COALESCE(NULLIF(TRIM(c.image), ''), '/images/post-images/category-image-01.jpg') as image,
      COUNT(p.id)::int as post_count
    FROM categories c
    LEFT JOIN posts p ON c.id = p.category_id AND p.status = 'published'
    GROUP BY c.id, c.name, c.slug, c.description, c.image
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
      COALESCE(NULLIF(TRIM(p.feature_img), ''), '/images/posts/lifestyle-post-01.webp') AS feature_img,
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
        COUNT(*) FILTER (WHERE feature_img IS NULL) AS null_images,
        COUNT(*) FILTER (WHERE TRIM(feature_img) = '') AS empty_images,
        COUNT(*) FILTER (WHERE status = 'published') AS published_posts,
        COUNT(*) FILTER (WHERE featured = true) AS featured_posts
      FROM posts;
    `;

    console.log('📊 Database Health Check:', result[0]);
    return result[0];
  } catch (error) {
    console.error('❌ Database health check failed:', error);
    return null;
  }
}

// Utility: Fix NULL/empty feature_img in database
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
