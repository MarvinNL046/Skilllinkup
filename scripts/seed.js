#!/usr/bin/env node
const { neon } = require('@neondatabase/serverless');
const crypto = require('crypto');
require('dotenv').config({ path: '.env.local' });

// Simple password hashing (for demo - use bcrypt in production)
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function seedDatabase() {
  console.log('🌱 Seeding database...\n');

  try {
    const sql = neon(process.env.DATABASE_URL);

    // 1. Create default tenant
    console.log('📦 Creating default tenant...');
    const [tenant] = await sql`
      INSERT INTO tenants (name, slug, plan, max_posts, max_users, max_storage_mb, settings)
      VALUES (
        'SkillLinkup',
        'skilllinkup',
        'pro',
        1000,
        50,
        10000,
        '{"theme": "default", "language": "nl"}'::jsonb
      )
      RETURNING id, name, slug;
    `;
    console.log(`✅ Created tenant: ${tenant.name} (${tenant.id})\n`);

    // 2. Create admin user
    console.log('👤 Creating admin user...');
    const [adminUser] = await sql`
      INSERT INTO users (tenant_id, email, password_hash, name, role, email_verified)
      VALUES (
        ${tenant.id},
        'admin@skilllinkup.com',
        ${hashPassword('Admin123!')},
        'Admin User',
        'admin',
        true
      )
      RETURNING id, name, email, role;
    `;
    console.log(`✅ Created user: ${adminUser.name} (${adminUser.email})\n`);

    // 3. Create categories
    console.log('📁 Creating categories...');
    const categories = [
      { name: 'Technology', slug: 'technology', description: 'Tech news and tutorials' },
      { name: 'Development', slug: 'development', description: 'Software development tips' },
      { name: 'Design', slug: 'design', description: 'UI/UX and design resources' },
      { name: 'Business', slug: 'business', description: 'Business and entrepreneurship' },
      { name: 'Lifestyle', slug: 'lifestyle', description: 'Life and productivity' },
    ];

    const createdCategories = [];
    for (const cat of categories) {
      const [category] = await sql`
        INSERT INTO categories (tenant_id, name, slug, description)
        VALUES (
          ${tenant.id},
          ${cat.name},
          ${cat.slug},
          ${cat.description}
        )
        RETURNING id, name, slug;
      `;
      createdCategories.push(category);
      console.log(`   - ${category.name}`);
    }
    console.log(`✅ Created ${createdCategories.length} categories\n`);

    // 4. Create sample posts
    console.log('📝 Creating sample posts...');
    const posts = [
      {
        title: 'Welcome to SkillLinkup',
        slug: 'welcome-to-skilllinkup',
        excerpt: 'Learn about our new platform and what we have to offer.',
        content: '<h2>Welcome!</h2><p>We are excited to have you here. SkillLinkup is your platform for learning and growth.</p>',
        category: createdCategories[0].id,
        status: 'published',
        featured: true,
      },
      {
        title: 'Getting Started with Next.js 15',
        slug: 'getting-started-nextjs-15',
        excerpt: 'A comprehensive guide to building modern web applications with Next.js 15.',
        content: '<h2>Next.js 15 Features</h2><p>Next.js 15 introduces powerful new features including the App Router, Server Components, and more.</p>',
        category: createdCategories[1].id,
        status: 'published',
        featured: true,
      },
      {
        title: 'Modern UI Design Principles',
        slug: 'modern-ui-design-principles',
        excerpt: 'Essential design principles for creating beautiful user interfaces.',
        content: '<h2>Design Principles</h2><p>Great UI design starts with understanding core principles like hierarchy, contrast, and spacing.</p>',
        category: createdCategories[2].id,
        status: 'published',
        featured: false,
      },
      {
        title: 'Building a Startup in 2025',
        slug: 'building-startup-2025',
        excerpt: 'Tips and strategies for launching your startup successfully.',
        content: '<h2>Startup Success</h2><p>Learn the key strategies that successful founders use to build and scale their companies.</p>',
        category: createdCategories[3].id,
        status: 'published',
        featured: false,
      },
      {
        title: 'Productivity Hacks for Developers',
        slug: 'productivity-hacks-developers',
        excerpt: 'Boost your productivity with these proven techniques.',
        content: '<h2>Work Smarter</h2><p>Discover productivity techniques that will help you accomplish more in less time.</p>',
        category: createdCategories[4].id,
        status: 'draft',
        featured: false,
      },
    ];

    for (const post of posts) {
      const [createdPost] = await sql`
        INSERT INTO posts (
          tenant_id, title, slug, excerpt, content,
          author_id, category_id, status, featured,
          published_at, views, read_time
        )
        VALUES (
          ${tenant.id},
          ${post.title},
          ${post.slug},
          ${post.excerpt},
          ${post.content},
          ${adminUser.id},
          ${post.category},
          ${post.status},
          ${post.featured},
          ${post.status === 'published' ? 'NOW()' : null},
          ${Math.floor(Math.random() * 1000)},
          ${Math.floor(Math.random() * 10) + 3}
        )
        RETURNING id, title, status;
      `;
      console.log(`   - ${createdPost.title} (${createdPost.status})`);
    }
    console.log(`✅ Created ${posts.length} posts\n`);

    // Summary
    console.log('🎉 Database seeding complete!\n');
    console.log('📊 Summary:');
    console.log(`   - Tenant: ${tenant.name}`);
    console.log(`   - Users: 1 admin`);
    console.log(`   - Categories: ${createdCategories.length}`);
    console.log(`   - Posts: ${posts.length} (${posts.filter(p => p.status === 'published').length} published)\n`);

    console.log('🔗 Next steps:');
    console.log('   - Open Drizzle Studio: npm run db:studio');
    console.log('   - Start dev server: npm run dev');
    console.log('   - Admin login: admin@skilllinkup.com / Admin123!\n');

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

seedDatabase();
