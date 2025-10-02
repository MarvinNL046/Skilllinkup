import { drizzle } from 'drizzle-orm/neon-http';
import { neon as netlifyNeon } from '@netlify/neon';
import { neon as neonServerless } from '@neondatabase/serverless';
import * as schema from '../drizzle/schema';

// Detect if we're running on Netlify
const isNetlify = process.env.NETLIFY === 'true';

// Use @netlify/neon in production (Netlify), @neondatabase/serverless locally
const sql = isNetlify
  ? netlifyNeon() // Automatically uses NETLIFY_DATABASE_URL
  : neonServerless(process.env.DATABASE_URL!);

if (!isNetlify && !process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required for local development');
}

export const db = drizzle(sql, { schema });

// Export schema for direct access
export { schema };

// Helper functions for common queries
export const queries = {
  // Get all published posts with author and category
  async getPublishedPosts(limit = 10, offset = 0) {
    return db.query.posts.findMany({
      where: (posts, { eq }) => eq(posts.status, 'published'),
      with: {
        author: true,
        category: true,
      },
      orderBy: (posts, { desc }) => [desc(posts.publishedAt)],
      limit,
      offset,
    });
  },

  // Get post by slug
  async getPostBySlug(slug: string) {
    return db.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.slug, slug),
      with: {
        author: true,
        category: true,
      },
    });
  },

  // Get featured posts
  async getFeaturedPosts(limit = 3) {
    return db.query.posts.findMany({
      where: (posts, { and, eq }) => and(
        eq(posts.status, 'published'),
        eq(posts.featured, true)
      ),
      with: {
        author: true,
        category: true,
      },
      orderBy: (posts, { desc }) => [desc(posts.publishedAt)],
      limit,
    });
  },

  // Get posts by category
  async getPostsByCategory(categorySlug: string, limit = 10) {
    return db.query.posts.findMany({
      where: (posts, { and, eq }) => and(
        eq(posts.status, 'published'),
        eq(posts.category.slug, categorySlug)
      ),
      with: {
        author: true,
        category: true,
      },
      orderBy: (posts, { desc }) => [desc(posts.publishedAt)],
      limit,
    });
  },

  // Get all categories with post count
  async getCategories() {
    return db.query.categories.findMany({
      orderBy: (categories, { asc }) => [asc(categories.name)],
    });
  },
};
