import { pgTable, uuid, varchar, text, timestamp, integer, boolean, jsonb, pgPolicy, unique } from 'drizzle-orm/pg-core';
import { sql, relations } from 'drizzle-orm';

// Tenants Table
export const tenants = pgTable('tenants', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  customDomain: varchar('custom_domain', { length: 255 }).unique(),

  // Subscription & Limits
  plan: varchar('plan', { length: 50 }).default('free'),
  maxPosts: integer('max_posts').default(10),
  maxUsers: integer('max_users').default(3),
  maxStorageMb: integer('max_storage_mb').default(1000),

  // Settings
  settings: jsonb('settings').default({}),

  // Metadata
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Users Table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),

  email: varchar('email', { length: 255 }).notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),

  role: varchar('role', { length: 50 }).default('author').notNull(), // admin, editor, author
  avatar: varchar('avatar', { length: 500 }),
  bio: text('bio'),

  // Auth
  emailVerified: boolean('email_verified').default(false),
  lastLogin: timestamp('last_login'),

  // Metadata
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Categories Table
export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),

  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  description: text('description'),
  image: varchar('image', { length: 500 }),

  // Internationalization
  locale: varchar('locale', { length: 5 }).default('nl').notNull(), // nl, en

  // Metadata
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Posts Table
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),

  title: varchar('title', { length: 500 }).notNull(),
  slug: varchar('slug', { length: 500 }).notNull(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),

  // Media
  featureImg: varchar('feature_img', { length: 500 }),
  postFormat: varchar('post_format', { length: 50 }).default('standard'), // standard, video, audio, gallery, quote

  // Author & Category
  authorId: uuid('author_id').references(() => users.id, { onDelete: 'set null' }),
  authorName: varchar('author_name', { length: 255 }), // Custom author name (overrides user lookup)
  categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'set null' }),

  // SEO & Meta
  metaTitle: varchar('meta_title', { length: 255 }),
  metaDescription: text('meta_description'),
  tags: jsonb('tags').default([]),

  // Advertising
  adImage: varchar('ad_image', { length: 500 }), // Image URL for ad
  adLink: varchar('ad_link', { length: 500 }), // Click destination URL

  // Status & Publishing
  status: varchar('status', { length: 50 }).default('draft').notNull(), // draft, published, scheduled
  publishedAt: timestamp('published_at'),
  scheduledFor: timestamp('scheduled_for'),

  // Engagement
  views: integer('views').default(0),
  readTime: integer('read_time'), // in minutes
  featured: boolean('featured').default(false),
  sticky: boolean('sticky').default(false),

  // Internationalization
  locale: varchar('locale', { length: 5 }).default('nl').notNull(), // nl, en

  // Metadata
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Media Library Table
export const media = pgTable('media', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),

  fileName: varchar('file_name', { length: 255 }).notNull(),
  fileUrl: varchar('file_url', { length: 500 }).notNull(),
  fileType: varchar('file_type', { length: 100 }).notNull(), // image/jpeg, video/mp4, etc.
  fileSize: integer('file_size').notNull(), // in bytes

  // Image specifics
  width: integer('width'),
  height: integer('height'),
  altText: varchar('alt_text', { length: 255 }),

  // Organization
  uploadedBy: uuid('uploaded_by').references(() => users.id, { onDelete: 'set null' }),

  // Metadata
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Comments Table
export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  postId: uuid('post_id').references(() => posts.id, { onDelete: 'cascade' }).notNull(),

  authorName: varchar('author_name', { length: 255 }).notNull(),
  authorEmail: varchar('author_email', { length: 255 }).notNull(),
  authorWebsite: varchar('author_website', { length: 500 }),

  content: text('content').notNull(),
  parentId: uuid('parent_id').references(() => comments.id, { onDelete: 'cascade' }), // for nested comments

  // Moderation
  status: varchar('status', { length: 50 }).default('pending').notNull(), // pending, approved, spam
  ipAddress: varchar('ip_address', { length: 45 }),

  // Metadata
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Analytics Table
export const analytics = pgTable('analytics', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  postId: uuid('post_id').references(() => posts.id, { onDelete: 'cascade' }),

  event: varchar('event', { length: 100 }).notNull(), // page_view, post_view, click, etc.

  // Session info
  sessionId: varchar('session_id', { length: 255 }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),

  // Request info
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  referrer: varchar('referrer', { length: 500 }),

  // Geo
  country: varchar('country', { length: 100 }),
  city: varchar('city', { length: 100 }),

  // Metadata
  metadata: jsonb('metadata').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [posts.categoryId],
    references: [categories.id],
  }),
  tenant: one(tenants, {
    fields: [posts.tenantId],
    references: [tenants.id],
  }),
}));

export const usersRelations = relations(users, ({ one }) => ({
  tenant: one(tenants, {
    fields: [users.tenantId],
    references: [tenants.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ one }) => ({
  tenant: one(tenants, {
    fields: [categories.tenantId],
    references: [tenants.id],
  }),
}));

// Tools Table
export const tools = pgTable('tools', {
  id: uuid('id').primaryKey().defaultRandom(),
  ownerId: text('owner_id').notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  description: text('description'),
  category: text('category').notNull(),
  icon: text('icon'),
  color: text('color').default('#3b82f6'),
  toolUrl: text('tool_url'),
  isAvailable: boolean('is_available').default(false),
  featured: boolean('featured').default(false),
  sortOrder: integer('sort_order').default(0),
  views: integer('views').default(0),
  status: text('status').default('draft'),
  locale: varchar('locale', { length: 5 }).default('en').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  slugLocaleUnique: unique('tools_slug_locale_unique').on(table.slug, table.locale),
}));

// Ads Table
export const ads = pgTable('ads', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  imageUrl: text('image_url').notNull(),
  linkUrl: text('link_url').notNull(),
  placement: varchar('placement', { length: 50 }).notNull(), // 'tools_listing', 'tools_detail', 'blog_sidebar'
  isActive: boolean('is_active').default(true),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
