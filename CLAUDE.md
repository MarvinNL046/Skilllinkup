# SkillLinkup - Next.js 15 with App Router

## Project Overview

**SkillLinkup** is a modern blog platform built with **Next.js 15** and **React 18**, using the **App Router** architecture. The project was migrated from the Blogar HTML template and upgraded from Next.js 12 (Pages Router) to Next.js 15 (App Router) on October 2, 2025.

## Technology Stack

### Core Framework
- **Next.js**: 15.0.0 (App Router)
- **React**: 18.3.1
- **TypeScript**: 5.x (with gradual migration from JavaScript)

### Database & Backend
- **Neon PostgreSQL**: Serverless Postgres database
- **@neondatabase/serverless**: 0.10.6 (database client)
- **Drizzle ORM**: 0.39.1 (type-safe database operations)
- **Drizzle Kit**: 0.30.1 (migrations and schema management)

### UI & Styling
- **Bootstrap**: 5.3.3
- **React Bootstrap**: 2.10.1
- **Sass**: 1.71.1
- **Framer Motion**: 11.0.8 (animations)

### Additional Libraries
- **Gray Matter**: 4.0.3 (markdown frontmatter parsing)
- **Remark**: 15.0.1 (markdown processing)
- **Remark HTML**: 16.0.1
- **React Slick**: 0.30.2 (carousels)
- **React Paginate**: 8.2.0
- **EmailJS Browser**: 4.3.3
- **Luxon**: 3.4.4 (date handling)
- **Sharp**: 0.33.2 (image optimization)

## Project Structure

### App Router Architecture (`app/` directory)

```
app/
├── layout.tsx          # Root layout with metadata
├── page.tsx            # Homepage (SEO blog variant, dynamic rendering)
├── error.tsx           # Global error boundary
├── loading.tsx         # Suspense loading fallback
├── about/
│   └── page.tsx        # About page
├── blog/
│   └── page.tsx        # Blog list with pagination
├── contact/
│   └── page.tsx        # Contact page with form
├── post/
│   └── [slug]/
│       └── page.tsx    # Dynamic post pages with metadata
└── api/
    ├── geo/
    │   └── route.ts    # Edge function for geolocation
    ├── search/
    │   └── route.ts    # Edge function for search
    └── posts/
        └── [slug]/
            └── views/
                └── route.ts  # View counter API
```

### Component Structure

```
src/
├── common/
│   ├── components/
│   │   ├── category/     # Category widgets
│   │   ├── form/         # Contact forms
│   │   ├── instagram/    # Instagram integration
│   │   ├── post/         # Post layouts and components
│   │   ├── sidebar/      # Sidebar widgets
│   │   ├── slider/       # Homepage slider
│   │   └── social/       # Social media components
│   └── elements/
│       ├── breadcrumb/   # Breadcrumb navigation
│       ├── footer/       # Footer variants
│       └── header/       # Header variants
├── data/              # Mock data and content
├── pages/             # Legacy Pages Router (being phased out)
└── styles/            # SCSS stylesheets
```

### Utility Libraries

```
lib/
├── api.ts             # File-based content system
├── defaults.ts        # Centralized fallback values (CRITICAL)
├── safe.ts            # Type-safe helpers for edge cases (CRITICAL)
├── db.ts              # Neon database connection
└── queries.ts         # Database queries with Drizzle ORM
```

### Database Schema

```
drizzle/
├── schema.ts          # Database schema definitions
└── migrations/        # Database migration files
```

### Static Assets

```
public/
├── images/
│   ├── logo/          # Brand logos
│   ├── post-images/   # Blog post images
│   ├── posts/         # Post images (WARNING: verify paths)
│   ├── small-images/  # Thumbnails
│   └── bg/            # Background images
├── css/               # Additional stylesheets
└── fonts/             # Custom fonts
```

## Development

### Local Development Commands

```bash
# Install dependencies
npm install

# Start development server (Next.js 15)
npm run dev
# Opens at http://localhost:3000

# Database operations
npm run db:generate    # Generate migrations from schema
npm run db:migrate     # Run database migrations
npm run db:push        # Push schema changes to database
npm run db:studio      # Open Drizzle Studio (database GUI)

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Testing and validation
npm test                    # Run test suite
bash scripts/sanity-check.sh  # Run production safety checks
```

### Migration Status

#### ✅ Completed
- Upgraded to Next.js 15.0.0
- Upgraded to React 18.3.1
- Migrated from Pages Router to App Router
- Created root layout with metadata
- Migrated key pages (home, about, blog, contact)
- Added TypeScript configuration
- **Neon PostgreSQL integration** (October 2, 2025)
- **Drizzle ORM setup** with schema and migrations
- **Production crash protection** implemented:
  - Created `lib/defaults.ts` for centralized fallback values
  - Created `lib/safe.ts` with edge case helpers
  - Created `app/error.tsx` (global error boundary)
  - Created `app/loading.tsx` (suspense fallback)
  - Comprehensive test suite (__tests__/safe.test.ts)
  - Sanity check script (scripts/sanity-check.sh)
- **Dynamic post routing** with `/post/[slug]`
- **Edge functions** for geo, search, and view tracking
- **Image optimization** with next/image and remote patterns

#### 🚧 In Progress
- Converting .js components to .tsx
- Verifying image paths in production
- Netlify deployment optimization

#### 📋 Pending
- Category and tag pages
- Author pages
- Dark mode implementation
- RSS feed generation
- Sitemap automation

## Key Features

### Homepage (SEO Blog Variant)
- Hero slider with featured posts
- Multiple post sections with different layouts
- Category grid
- Social media integration
- Instagram feed
- Responsive design

### Blog List
- Paginated post listing
- Sidebar with categories, search, recent posts
- Multiple post format support

### Navigation Structure
- **Top Header**: Blog, About, Contact
- **Main Menu**: Home, Blog, Post, About, Contact (centered)

## API & Data

### Content Management
- **Database**: Neon PostgreSQL (serverless)
- **ORM**: Drizzle ORM for type-safe queries
- **Legacy**: File-based content via `lib/api.ts` (being phased out)
- **Rendering**: Dynamic rendering with `export const dynamic = 'force-dynamic'`

### Database Schema
```typescript
// drizzle/schema.ts
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  content: text('content'),
  excerpt: text('excerpt'),
  feature_img: text('feature_img'),
  post_format: text('post_format').default('standard'),
  featured: boolean('featured').default(false),
  published: boolean('published').default(false),
  published_at: timestamp('published_at'),
  category_id: integer('category_id').references(() => categories.id),
  author_id: integer('author_id').references(() => authors.id),
  views: integer('views').default(0),
  read_time: integer('read_time').default(5),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});
```

### Post Fields (Normalized)
```typescript
// lib/defaults.ts & app/page.tsx normalizePost()
{
  id: string,
  title: string,              // DEFAULTS.title fallback
  featureImg: string,          // DEFAULTS.featureImg fallback
  postFormat: string,          // DEFAULTS.postFormat fallback
  featured: boolean,
  slidePost: boolean,
  date: string,               // ISO 8601 format
  slug: string,
  cate: string,               // DEFAULTS.category fallback
  cate_img: string,
  author_img: string,         // DEFAULTS.authorImg fallback
  author_name: string,        // DEFAULTS.authorName fallback
  post_views: number,         // DEFAULTS.views fallback
  read_time: number,          // DEFAULTS.readTime fallback
  author_social: Array<{icon, url, label?}>,
  excerpt: string,
  content: string,
}
```

## Configuration

### next.config.js
```javascript
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH : "",

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.skilllinkup.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.skilllinkup.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
```

### Environment Variables
```bash
# .env.local (not committed to git)
DATABASE_URL="postgresql://..."  # Neon PostgreSQL connection string
NEXT_PUBLIC_BASEPATH=""          # Base path for production deployment
```

### TypeScript
- Auto-generated `tsconfig.json`
- Gradual migration from JavaScript
- Type definitions for React components

## Environment

- **Node.js**: v22.16.0 (via NVM)
- **Platform**: Linux (Ubuntu)
- **Development Port**: 3000

## Git Repository

- **Remote**: https://github.com/MarvinNL046/Skilllinkup.git
- **Branch**: supabase (main branch)

## Version History

### v1.1.0 (October 2, 2025) - Production Hardening
- ✅ **Neon PostgreSQL Integration**: Full database migration with Drizzle ORM
- ✅ **Production Crash Protection**:
  - Created `lib/defaults.ts` - Centralized fallback values
  - Created `lib/safe.ts` - Edge case handlers (undefined, null, empty strings, whitespace)
  - Created `app/error.tsx` - Global error boundary
  - Created `app/loading.tsx` - Suspense loading fallback
  - Created comprehensive test suite (30+ tests in __tests__/safe.test.ts)
  - Created automated sanity checks (scripts/sanity-check.sh)
- ✅ **Data Normalization**: `normalizePost()` function with DEFAULTS
- ✅ **Dynamic Routing**: `/post/[slug]` with metadata generation
- ✅ **Edge Functions**: Geolocation, search, view tracking APIs
- ✅ **Image Optimization**: Next.js Image with remote patterns and domain whitelist
- ✅ **JSON Serialization Fixes**: Client Component prop safety
- 🐛 **Known Issues**:
  - Netlify cache clearing required after deployments
  - Image path verification needed for `/images/posts/lifestyle-post-01.webp`

### v1.0.0 (October 2, 2025)
- ✅ Upgraded to Next.js 15 with App Router
- ✅ Upgraded to React 18.3.1
- ✅ Added TypeScript support
- ✅ Migrated core pages to App Router
- ✅ Simplified navigation structure
- ✅ Created backup: `skillLinkup-backup-20241002`

### Previous Versions
- Based on Blogar HTML template v1.7.3
- Initial Next.js 12 implementation with Pages Router

## Credits & Original Template

**Original Template**: Blogar - Blog & Magazine HTML5 Template
**Version**: 1.7.3
**Bootstrap**: 5.3.7
**Font Awesome Pro**: 6.5.1

## Notes for Development

### 🚨 Critical Production Safety Rules

**ALWAYS use safe helpers from `lib/safe.ts`:**
```typescript
import { safeImage, safeText, safeArray, safeNumber, safeBoolean } from '../lib/safe';
import { DEFAULTS } from '../lib/defaults';

// ✅ CORRECT - Use safe helpers
const featureImg = safeImage(post.feature_img, DEFAULTS.featureImg);
const title = safeText(post.title, DEFAULTS.title);

// ❌ WRONG - Direct access can crash
const featureImg = post.feature_img || '/default.jpg';  // Empty string '' fails!
const title = post.title || 'Untitled';  // Whitespace '   ' fails!
```

**NEVER destructure featureImg in function parameters:**
```typescript
// ❌ WRONG - Can crash if undefined
function PostCard({ item: { featureImg, title } }) { ... }

// ✅ CORRECT - Access safely
function PostCard({ item }) {
  const featureImg = safeImage(item.featureImg, DEFAULTS.featureImg);
  ...
}
```

**ALWAYS check arrays before mapping:**
```typescript
// ✅ CORRECT
{author_social && author_social.length > 0 && (
  author_social.map(data => ...)
)}

// ❌ WRONG - Can crash if undefined
{author_social.map(data => ...)}
```

**Client Components must receive serializable props:**
```typescript
// ✅ CORRECT - Only primitives
const serializablePosts = posts.map(p => ({
  id: p.id,
  title: p.title,
  featureImg: p.featureImg,
}));
<HeaderOne postData={serializablePosts} />

// ❌ WRONG - Complex objects crash JSON.stringify
<HeaderOne postData={posts} />
```

### Important Patterns
1. **App Router**: All new pages go in `app/` directory
2. **Metadata**: Use `export const metadata` for SEO (use safe helpers!)
3. **Client Components**: Use `'use client'` directive for interactive components
4. **Server Components**: Default for pages, better performance
5. **Image Optimization**: Use Next.js `<Image>` component with safe src
6. **Dynamic Rendering**: Use `export const dynamic = 'force-dynamic'` for database pages
7. **Error Handling**: Wrap database calls in try/catch, graceful degradation
8. **Data Normalization**: Always normalize data with `normalizePost()` before use

### Common Tasks

**Add a new page**:
```bash
mkdir app/new-page
# Create app/new-page/page.tsx with dynamic = 'force-dynamic' if using database
```

**Update navigation**:
- Edit header components in `src/common/elements/header/`

**Add database query**:
```typescript
// In lib/queries.ts
export async function getNewData() {
  try {
    const { rows } = await neon(process.env.DATABASE_URL!)`
      SELECT * FROM table_name
    `;
    return rows;
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
}
```

**Run production checks**:
```bash
bash scripts/sanity-check.sh  # Automated safety checks
npm test                      # Run test suite
```

## Backup Information

A complete backup was created before the Next.js 15 migration:
- **Location**: `skillLinkup-backup-20241002/`
- **Contains**: Original Next.js 12 Pages Router implementation

## Deployment

### Netlify Configuration
- **Live Site**: https://skilllinkup.com
- **Deploy Command**: `npm run build`
- **Build Directory**: `.next`
- **Important**: Clear cache after major updates via Netlify UI:
  1. Netlify Dashboard → Deploys
  2. "Trigger deploy" → "Clear cache and deploy site"

### Edge Runtime Configuration
All API routes use Netlify Edge Functions:
```typescript
export const runtime = 'edge';  // Required for Netlify deployment
```

### Environment Variables (Netlify)
Set in Netlify Dashboard → Site settings → Environment variables:
- `DATABASE_URL` - Neon PostgreSQL connection string
- `NEXT_PUBLIC_BASEPATH` - Base path (usually empty)

## Troubleshooting

### Production Crashes
**Error: "Cannot read properties of undefined (reading 'featureImg')"**

**Root Causes:**
1. Database returning empty/null data
2. Direct property access without safety checks
3. JSON serialization of complex objects to Client Components

**Solutions:**
1. ✅ Always use safe helpers from `lib/safe.ts`
2. ✅ Normalize data with `normalizePost()` before use
3. ✅ Create serializable props for Client Components
4. ✅ Check arrays before mapping
5. ✅ Run `bash scripts/sanity-check.sh` before deploying

**Error: "ImageError: The requested resource isn't a valid image"**

**Root Cause:** Image path in DEFAULTS doesn't exist or returns HTML

**Solutions:**
1. Verify `/public/images/posts/lifestyle-post-01.webp` exists
2. Use static import instead: `import defaultImage from '@/public/...'`
3. Update DEFAULTS.featureImg to known-good path

### Netlify Cache Issues
**Symptoms:** New code not appearing in production after deployment

**Solution:** Manually clear Netlify build cache:
1. Netlify Dashboard → Deploys
2. "Trigger deploy" → "Clear cache and deploy site"
3. Wait 2-3 minutes for new deployment

### Database Connection Issues
**Error:** Connection timeouts or query failures

**Solutions:**
1. Verify DATABASE_URL in environment variables
2. Check Neon dashboard for database status
3. Ensure database is not sleeping (Neon free tier sleeps after inactivity)
4. Test connection: `npm run db:studio`

## Future Enhancements

### Immediate Priorities
- [ ] Verify and fix image paths in production
- [ ] Complete TypeScript migration (.js → .tsx)
- [ ] Add more test coverage for components

### Planned Features
- [ ] Implement Server Actions for forms
- [ ] Add authentication system (NextAuth.js)
- [ ] Create admin dashboard for content management
- [ ] Implement dark mode toggle
- [ ] Add RSS feed generation
- [ ] Add sitemap automation (as requested)
- [ ] Category and tag pages
- [ ] Author profile pages
- [ ] Advanced search functionality
- [ ] Comment system integration
- [ ] Newsletter subscription
- [ ] Performance optimizations (bundle analysis)
- [ ] Accessibility audit and improvements
