import { neon } from '@netlify/neon';
import { neon as neonServerless } from '@neondatabase/serverless';

// Detect environment
const isNetlify = process.env.NETLIFY === 'true';

// Get database URL
const getDatabaseUrl = () => {
  if (isNetlify) {
    return process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL;
  }
  return process.env.DATABASE_URL;
};

// Create SQL client factory
const createSqlClient = () => {
  const databaseUrl = getDatabaseUrl();

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

  return isNetlify ? neon(databaseUrl) : neonServerless(databaseUrl);
};

// Lazy initialization - only create client when needed
let sqlClient: ReturnType<typeof neon> | ReturnType<typeof neonServerless> | null = null;
export const sql: ReturnType<typeof neon> | ReturnType<typeof neonServerless> = new Proxy({} as any, {
  get(target, prop) {
    if (!sqlClient) {
      sqlClient = createSqlClient();
    }
    return sqlClient[prop as keyof typeof sqlClient];
  },
  apply(target, thisArg, args) {
    if (!sqlClient) {
      sqlClient = createSqlClient();
    }
    return (sqlClient as any).apply(thisArg, args);
  }
});

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

// Query: Get all published posts
export async function getPublishedPosts(limit = 10, offset = 0): Promise<Post[]> {
  const posts = await sql`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.excerpt,
      p.content,
      p.feature_img,
      p.post_format,
      p.status,
      p.published_at,
      p.views,
      p.read_time,
      p.featured,
      p.sticky,
      p.created_at,
      u.id as author_id,
      u.name as author_name,
      u.email as author_email,
      u.avatar as author_avatar,
      c.id as category_id,
      c.name as category_name,
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

// Query: Get featured posts
export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  const posts = await sql`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.excerpt,
      p.content,
      p.feature_img,
      p.post_format,
      p.status,
      p.published_at,
      p.views,
      p.read_time,
      p.featured,
      p.sticky,
      p.created_at,
      u.id as author_id,
      u.name as author_name,
      u.email as author_email,
      u.avatar as author_avatar,
      c.id as category_id,
      c.name as category_name,
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

// Query: Get post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await sql`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.excerpt,
      p.content,
      p.feature_img,
      p.post_format,
      p.status,
      p.published_at,
      p.views,
      p.read_time,
      p.featured,
      p.sticky,
      p.created_at,
      u.id as author_id,
      u.name as author_name,
      u.email as author_email,
      u.avatar as author_avatar,
      c.id as category_id,
      c.name as category_name,
      c.slug as category_slug
    FROM posts p
    LEFT JOIN users u ON p.author_id = u.id
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.slug = ${slug}
    LIMIT 1;
  `;

  return (posts[0] as Post) || null;
}

// Query: Get posts by category
export async function getPostsByCategory(categorySlug: string, limit = 10): Promise<Post[]> {
  const posts = await sql`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.excerpt,
      p.content,
      p.feature_img,
      p.post_format,
      p.status,
      p.published_at,
      p.views,
      p.read_time,
      p.featured,
      p.sticky,
      p.created_at,
      u.id as author_id,
      u.name as author_name,
      u.email as author_email,
      u.avatar as author_avatar,
      c.id as category_id,
      c.name as category_name,
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

// Query: Get all categories
export async function getCategories(): Promise<Category[]> {
  const categories = await sql`
    SELECT
      c.id,
      c.name,
      c.slug,
      c.description,
      c.image,
      COUNT(p.id)::int as post_count
    FROM categories c
    LEFT JOIN posts p ON c.id = p.category_id AND p.status = 'published'
    GROUP BY c.id, c.name, c.slug, c.description, c.image
    ORDER BY c.name ASC;
  `;

  return categories as Category[];
}

// Query: Get recent posts (for sidebar)
export async function getRecentPosts(limit = 5): Promise<Post[]> {
  const posts = await sql`
    SELECT
      p.id,
      p.title,
      p.slug,
      p.feature_img,
      p.published_at,
      p.views,
      c.name as category_name,
      c.slug as category_slug
    FROM posts p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.status = 'published'
    ORDER BY p.published_at DESC
    LIMIT ${limit};
  `;

  return posts as Post[];
}
