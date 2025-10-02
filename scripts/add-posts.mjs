#!/usr/bin/env node

/**
 * Add Extra Posts to Database
 * Adds 2 more published posts for optimal layout (total 6 published)
 */

import { config } from 'dotenv';
import { neon } from '@neondatabase/serverless';

// Load .env.local
config({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL not configured');
  process.exit(1);
}

const sql = neon(databaseUrl);

async function addPosts() {
  console.log('📝 Adding extra posts to database...\n');

  try {
    // Get tenant, author and categories
    const [tenant] = await sql`
      SELECT id FROM tenants LIMIT 1;
    `;

    const [author] = await sql`
      SELECT id FROM users LIMIT 1;
    `;

    const categories = await sql`
      SELECT id, name, slug FROM categories ORDER BY name;
    `;

    if (!tenant || !author || categories.length === 0) {
      console.error('❌ No tenant, author or categories found. Run seed script first.');
      process.exit(1);
    }

    // New posts with meta fields and feature images
    const newPosts = [
      {
        title: 'Advanced TypeScript Patterns for React',
        slug: 'advanced-typescript-patterns-react',
        excerpt: 'Master advanced TypeScript patterns to build type-safe React applications with confidence.',
        content: `<h2>TypeScript Best Practices</h2>
<p>TypeScript has become the standard for building robust React applications. In this guide, we'll explore advanced patterns that will help you write safer, more maintainable code.</p>
<h3>Generic Components</h3>
<p>Learn how to create reusable components with proper type inference and constraints.</p>
<h3>Discriminated Unions</h3>
<p>Leverage TypeScript's type system to handle complex state management scenarios.</p>`,
        category: categories[0].id, // Technology
        meta_title: 'Advanced TypeScript Patterns for React - SkillLinkup',
        meta_description: 'Master advanced TypeScript patterns to build type-safe React applications. Learn generic components, discriminated unions, and more.',
        feature_img: '/images/posts/post-grid-01.webp',
        post_format: 'standard',
        status: 'published',
        featured: false,
        views: 234,
        read_time: 8,
      },
      {
        title: 'Building Scalable APIs with Node.js',
        slug: 'building-scalable-apis-nodejs',
        excerpt: 'Learn best practices for designing and implementing scalable REST and GraphQL APIs with Node.js.',
        content: `<h2>API Architecture Best Practices</h2>
<p>Building scalable APIs requires careful planning and adherence to proven patterns. This guide covers everything you need to know.</p>
<h3>RESTful Design</h3>
<p>Understand REST principles and how to apply them effectively in modern applications.</p>
<h3>Authentication & Security</h3>
<p>Implement secure authentication flows and protect your API from common vulnerabilities.</p>
<h3>Performance Optimization</h3>
<p>Optimize your API for speed and efficiency with caching, compression, and database indexing.</p>`,
        category: categories[1].id, // Development
        meta_title: 'Building Scalable APIs with Node.js - SkillLinkup',
        meta_description: 'Learn best practices for designing REST and GraphQL APIs with Node.js. Covers architecture, security, and performance optimization.',
        feature_img: '/images/posts/post-dark-01.webp',
        post_format: 'standard',
        status: 'published',
        featured: false,
        views: 567,
        read_time: 12,
      },
    ];

    // Insert posts
    for (const post of newPosts) {
      const [created] = await sql`
        INSERT INTO posts (
          tenant_id, title, slug, excerpt, content,
          author_id, category_id, status, featured,
          meta_title, meta_description, feature_img, post_format,
          published_at, views, read_time
        )
        VALUES (
          ${tenant.id},
          ${post.title},
          ${post.slug},
          ${post.excerpt},
          ${post.content},
          ${author.id},
          ${post.category},
          ${post.status},
          ${post.featured},
          ${post.meta_title},
          ${post.meta_description},
          ${post.feature_img},
          ${post.post_format},
          NOW(),
          ${post.views},
          ${post.read_time}
        )
        RETURNING id, title, slug, status, feature_img;
      `;

      console.log(`✅ Created: "${created.title}"`);
      console.log(`   Slug: ${created.slug}`);
      console.log(`   Image: ${created.feature_img}`);
      console.log(`   Status: ${created.status}\n`);
    }

    // Show updated stats
    const [stats] = await sql`
      SELECT
        COUNT(*) AS total_posts,
        COUNT(*) FILTER (WHERE status = 'published') AS published_posts,
        COUNT(*) FILTER (WHERE featured = true) AS featured_posts
      FROM posts;
    `;

    console.log('🎉 Posts added successfully!\n');
    console.log('📊 Database Statistics:');
    console.log(`   Total posts: ${stats.total_posts}`);
    console.log(`   Published posts: ${stats.published_posts}`);
    console.log(`   Featured posts: ${stats.featured_posts}\n`);

    console.log('🚀 Ready for deployment!');
    console.log('   Homepage now has enough posts for optimal layout (6 published)');

  } catch (error) {
    console.error('❌ Failed to add posts:', error.message);
    process.exit(1);
  }
}

addPosts();
