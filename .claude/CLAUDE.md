# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SkillLinkup** is a Next.js 15 blog platform with App Router, featuring freelance platform comparisons and blog content. Migrated from Next.js 12 Pages Router in October 2025.

**Stack**: Next.js 15.5.4, React 19.2.0, TypeScript, Neon PostgreSQL, Drizzle ORM, Tailwind CSS

## Development Commands

```bash
# Development
npm run dev                    # Start dev server (port 3000)
npm run build                  # Production build
npm test                       # Run test suite

# Database
npm run db:generate            # Generate migrations from schema
npm run db:migrate             # Run migrations
npm run db:push                # Push schema changes
npm run db:studio              # Open Drizzle Studio GUI

# Database Maintenance
npm run db:fix-images          # Fix broken image references
npm run db:fix-meta            # Update metadata fields
npm run db:fix-all             # Run all fix scripts
npm run db:import-platforms    # Import platforms from scripts/import-platforms.ts
npm run db:import-tools        # Import tools from scripts/import-tools.ts

# Internationalization
node scripts/translate-platforms.mjs        # Basic word-replacement translation (EN→NL)
node scripts/translate-platforms-google.mjs # FREE Google Translate (EN→NL, no API key!)
node scripts/check-locales.mjs              # Check locale distribution in database
node scripts/cleanup-locale-mess.mjs        # Fix incorrect locale data

# Production Safety
bash scripts/sanity-check.sh   # Pre-deployment checks
```

## Architecture Overview

### Multi-Tenant Structure
The database uses a multi-tenant architecture with Row Level Security (RLS):
- **tenants**: Main tenant table with subscription limits
- **users**: Tenant-scoped users with role-based access
- **posts/categories/platforms**: All tenant-scoped via `tenant_id`

### Dual Application Setup
1. **Main App** (`/home/marvin/Documenten/skillLinkup`): Public-facing site (port 3000)
2. **Admin Dashboard** (`/home/marvin/Documenten/skillLinkup-admin`): Content management (port 3002)

Both share the same Neon PostgreSQL database and use Stack Auth for authentication.

### Critical Safety System
Production crash protection via `lib/safe.ts` and `lib/defaults.ts`:
- **Problem**: Database can return `null`, `undefined`, empty strings `''`, or whitespace-only strings `'   '`
- **Solution**: Always use safe helpers that handle ALL edge cases

```typescript
// ✅ CORRECT - Handles null, undefined, '', '   '
import { safeImage, safeText } from '../lib/safe';
import { DEFAULTS } from '../lib/defaults';

const featureImg = safeImage(post.feature_img, DEFAULTS.featureImg);
const title = safeText(post.title, DEFAULTS.title);

// ❌ WRONG - Empty string '' and whitespace '   ' pass through
const featureImg = post.feature_img || '/default.jpg';  // CRASHES!
const title = post.title || 'Untitled';                  // CRASHES!
```

**Available safe helpers**:
- `safeImage(value, fallback)` - For image paths
- `safeText(value, fallback)` - For text content
- `safeArray(value)` - For arrays (returns [] if invalid)
- `safeNumber(value, fallback)` - For numbers
- `safeBoolean(value, fallback)` - For booleans

### Image Upload Architecture
The admin dashboard's RichTextEditor uploads images to **both** folders simultaneously:
- `/home/marvin/Documenten/skillLinkup/public/images/posts/` (main app)
- `/home/marvin/Documenten/skillLinkup-admin/public/images/posts/` (admin)

This enables instant preview in admin (port 3002) while ensuring production availability.

### Automatic Sitemap System
WordPress-like automatic sitemap generation that updates without manual intervention:
- **Auto-generation**: Builds from database (posts, platforms, categories)
- **ISR caching**: 15-minute auto-refresh via `revalidate: 900`
- **On-demand updates**: Webhook endpoint for instant cache invalidation
- **Search engine notification**: Automatic ping to Google/Bing on updates
- **Production-safe**: Only pings search engines in production (skips localhost)

**Key files**:
- `app/sitemap.ts` - Sitemap generation with cached queries
- `lib/sitemap-data.ts` - Cached database queries with `unstable_cache` and tags
- `app/api/revalidate/route.ts` - Webhook for cache invalidation
- `app/robots.ts` - Dynamic robots.txt with sitemap reference

**Webhook usage**:
```bash
# Trigger sitemap update (requires REVALIDATE_SECRET in env)
POST https://skilllinkup.com/api/revalidate?secret=xxx
Body: { "paths": ["/blog", "/platforms"] }
```

### URL-Based Filtering Pattern
Client-side filtering with URL state management (SEO-friendly and shareable):
- **URL params**: Filters stored in query string (`?category=Tech&difficulty=Easy,Medium`)
- **Client component**: Uses `useSearchParams` and `useRouter` from Next.js
- **Server data**: Server Component fetches all data, passes to Client Component
- **Pattern**: Server fetches → Client filters in memory → URL updates on change

**Example**: `components/platform-filters.tsx` demonstrates this pattern for platform filtering.

### Freelance Tools Architecture
Client-side tools with localStorage persistence (no authentication required):

**Available Tools**:
- **Time Tracker** (`/tools/time-tracker`): Billable hours tracking with project management, timer/manual entry, data persistence
- **Rate Calculator** (`/tools/rate-calculator`): Calculate ideal hourly rate based on costs, goals, and experience level with custom rate input
- **Invoice Generator** (`/tools/invoice-generator`): Professional invoices with auto-numbering (INV-2025-XXXX), multi-currency (€/$£), logo upload, real-time calculations, localStorage save/load, print/PDF export

**Key Implementation Details**:
- All tools use React `useState` + `useEffect` for client-side state management
- Data persistence via `localStorage` API (browser-only, ~5-10MB limit per domain)
- No server-side storage or authentication (planned for future version)
- Logo upload uses Base64 encoding for localStorage compatibility
- Tools page (`/tools/page.tsx`) has hardcoded fallback array if database is empty
- Database script: `scripts/import-tools.ts` (run with `npm run db:import-tools`)

**LocalStorage Strategy**:
```typescript
// Save to localStorage
useEffect(() => {
  localStorage.setItem('toolName_data', JSON.stringify(data));
}, [data]);

// Load from localStorage on mount
useEffect(() => {
  const saved = localStorage.getItem('toolName_data');
  if (saved) setData(JSON.parse(saved));
}, []);
```

**Future Enhancement**: User accounts with cloud sync for cross-device tool data access.

## Database Schema Key Points

### Multi-Tenant Design
```typescript
// All tables have tenant_id for RLS
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').references(() => tenants.id, { onDelete: 'cascade' }).notNull(),
  // ... other fields
});
```

### Important Field Names
- Use `feature_img` (NOT `featured_image`)
- Use `featureImg` in normalized data (camelCase)
- No `category_color` field - removed in migration
- `tags` is JSONB array, not string

### Platform Work Type and Location Fields (Migration 0004)
Platforms support filtering by work type and geographic location:

**Work Type Field**:
- `work_type VARCHAR(50)` - Values: 'remote', 'local', 'hybrid'
- Defaults to 'remote' for new platforms
- Indexed for efficient filtering

**Countries Field**:
- `countries TEXT[]` - Array of ISO 3166-1 alpha-2 country codes
- Examples: `['NL', 'BE']` for Benelux, `['Worldwide']` for remote platforms
- Uses GIN index for array searches

**Usage Examples**:
```typescript
// Remote platform (global)
{ work_type: 'remote', countries: ['Worldwide'] }

// Local platform (Netherlands only)
{ work_type: 'local', countries: ['NL'] }

// Hybrid platform (Benelux region)
{ work_type: 'hybrid', countries: ['NL', 'BE', 'LU'] }
```

**Migration Details**:
- File: `drizzle/migrations/0004_add_worktype_countries.sql`
- Runner: `scripts/run-migration-0004-simple.mjs`
- All existing platforms set to work_type='remote', countries=['Worldwide']

### Dynamic Rendering Pattern
All database-driven pages must use:
```typescript
export const dynamic = 'force-dynamic';  // Required for database queries
export const runtime = 'nodejs';         // For Neon serverless
```

## Next.js 15 Breaking Changes

### Dynamic Route Params (CRITICAL)
All dynamic routes must await params Promise:

```typescript
// ✅ CORRECT (Next.js 15)
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;  // Must await!
  // ...
}

// ❌ WRONG (Next.js 14 pattern - breaks in 15)
export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;  // No await = build error
}
```

### API Route Handlers
```typescript
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }  // Promise type
) {
  const { id } = await params;  // Must await
}
```

## Common Patterns

### Adding New Database-Driven Page
```bash
mkdir app/new-page
```

```typescript
// app/new-page/page.tsx
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export default async function NewPage() {
  const data = await getDataFromDB();  // From lib/queries.ts

  // Normalize data with safe helpers
  const normalized = data.map(item => ({
    title: safeText(item.title, DEFAULTS.title),
    image: safeImage(item.image, DEFAULTS.featureImg),
  }));

  return <div>{/* ... */}</div>;
}
```

### Client Component Serialization
Server Components can't pass complex objects to Client Components:

```typescript
// ✅ CORRECT - Serialize to primitives
const serializablePosts = posts.map(p => ({
  id: p.id,
  title: p.title,
  featureImg: p.featureImg,
  // Only primitives: string, number, boolean, null
}));
<HeaderOne postData={serializablePosts} />

// ❌ WRONG - Date objects crash JSON.stringify
<HeaderOne postData={posts} />  // If posts has Date fields
```

### Array Rendering Safety
```typescript
// ✅ CORRECT
{author_social && author_social.length > 0 && (
  author_social.map(data => <Link key={data.url} />)
)}

// ❌ WRONG - Crashes if undefined
{author_social.map(data => <Link />)}
```

## Admin Dashboard Architecture

### Location
`/home/marvin/Documenten/skillLinkup-admin`

### Dual Server Development
```bash
# Terminal 1: Main app
cd /home/marvin/Documenten/skillLinkup
npm run dev  # Port 3000

# Terminal 2: Admin
cd /home/marvin/Documenten/skillLinkup-admin
npm run dev  # Port 3002
```

### RichTextEditor Component
Located at `components/RichTextEditor.tsx` - uses TipTap editor with:
- Floating toolbar on text selection (Bold, Italic, Link)
- HTML source editor for pasting from ChatGPT
- Image upload to both main and admin folders
- CSS to hide broken images

### Legacy Template Components
Admin uses Blogar template requiring specific props:
```typescript
<HeaderOne
  pClass=""
  darkLogo="/images/logo/logo-black.png"
  lightLogo="/images/logo/logo-white.png"
  postData={allPosts}
/>
```

## Deployment

### Netlify Configuration
- **Live Site**: https://skilllinkup.com
- **Build Command**: `npm run build`
- **Edge Functions**: All API routes use `export const runtime = 'edge';`
- **Cache Issues**: Manually clear cache in Netlify UI after major updates

### Environment Variables
```bash
DATABASE_URL="postgresql://..."                # Neon PostgreSQL
NETLIFY_DATABASE_URL="postgresql://..."        # Auto-added by Neon integration
NEXT_PUBLIC_SITE_URL="https://skilllinkup.com" # Used for sitemap/SEO
NEXT_PUBLIC_BASEPATH=""                        # Usually empty
REVALIDATE_SECRET="xxx"                        # Webhook authentication (rotate regularly)
RESEND_API_KEY="re_xxx"                        # Email service
RESEND_AUDIENCE_ID="xxx"                       # Newsletter list
```

## Troubleshooting

### Build Error: "Cannot read properties of undefined"
**Root Cause**: Direct property access without safe helpers

**Solution**:
1. Always use `safeImage()`, `safeText()`, etc. from `lib/safe.ts`
2. Run `bash scripts/sanity-check.sh` before deploying
3. Check arrays before `.map()`

### Build Error: "_error page" or "Html should not be imported"
**Solution**: Clear Next.js cache
```bash
rm -rf .next
npm run build
```

### Database Connection Timeouts
**Causes**:
1. Neon database sleeping (free tier)
2. Wrong DATABASE_URL

**Solution**: Test with `npm run db:studio`

### Netlify Deployment Not Updating
**Solution**: Netlify Dashboard → Deploys → "Clear cache and deploy site"

## Key Files to Understand

- `lib/safe.ts` - Production crash protection (30+ tests)
- `lib/defaults.ts` - Centralized fallback values
- `lib/queries.ts` - All database queries with error handling
- `lib/db.ts` - Exports both `sql` (raw Neon) and `db` (Drizzle ORM)
- `lib/sitemap-data.ts` - Cached sitemap queries with revalidation tags
- `drizzle/schema.ts` - Multi-tenant database schema with RLS
- `app/sitemap.ts` - Dynamic sitemap generation
- `app/robots.ts` - Dynamic robots.txt
- `app/api/revalidate/route.ts` - Webhook for cache invalidation
- `components/platform-filters.tsx` - URL-based filtering example
- `components/RichTextEditor.tsx` (admin) - TipTap rich text editor
- `app/api/upload/route.ts` (admin) - Dual-folder image upload
- `scripts/import-platforms.ts` - Platform data import script
- `scripts/import-tools.ts` - Tools data import script
- `drizzle/migrations/0004_add_worktype_countries.sql` - Work type and location filtering migration
- `scripts/run-migration-0004-simple.mjs` - Migration runner for work_type and countries fields
- `scripts/check-platforms-schema.mjs` - Database schema inspection utility
- `app/tools/time-tracker/page.tsx` - Time tracking tool with localStorage
- `app/tools/rate-calculator/page.tsx` - Rate calculator with custom input
- `app/tools/invoice-generator/page.tsx` - Invoice generator with logo upload

## N8N Blog Automation

### Workflow Architecture
The project includes an n8n workflow blueprint (`n8n-blog-automation-workflow.json`) for automated blog post generation:

**Workflow Pipeline**:
1. **Google Sheets Trigger** → New affiliate program row added
2. **Short.io API** → Resolve affiliate link to original URL
3. **Playwright Screenshot** → Capture platform homepage (1920x1080)
4. **Claude API** → Generate blog content in Adam Enfroy style
5. **Admin API** → Create draft post via `POST /api/posts`
6. **Email Notification** → Alert for review

**Integration Points**:
- Screenshots saved to both `/public/images/posts/` folders (main + admin)
- Content follows Adam Enfroy conversational style (short paragraphs, bold numbers, rhetorical questions)
- Draft posts created in admin dashboard (port 3002) for manual review
- Cost: ~$0.01-0.02 per post via Claude API

**Required Setup**:
- Google Sheets with columns: `program_name`, `affiliate_link`, `description`, `commission_type`, `commission_value`, etc.
- Short.io API key for link resolution
- Anthropic API key for content generation
- Admin dashboard API endpoint (`POST http://localhost:3002/api/posts`)

### Affiliate Marketing Schema
Platforms table includes affiliate-specific fields for monetization (see latest migration):
- `affiliate_link` - Short.io URL for tracking
- `commission_type` - Percentage, CPA, or hybrid
- `commission_value` - Payout amount/percentage
- `cookie_duration` - Attribution window in days
- `avg_earnings` - Typical affiliate earnings
- `unique_benefits` - JSONB array of selling points

## Testing Infrastructure

### Playwright E2E Tests
Playwright is installed for:
- Cross-browser screenshot capture (n8n automation)
- E2E testing workflows (not yet implemented)
- Visual regression testing capabilities

**Available but not configured**:
- Run tests: `npx playwright test`
- Generate test: `npx playwright codegen`
- Test report: `npx playwright show-report`

### Production Safety Scripts
Pre-deployment validation via `bash scripts/sanity-check.sh`:
- ✅ No unsafe `featureImg` destructuring
- ✅ All `<Image>` components have `src`
- ✅ No empty OpenGraph images arrays
- ✅ Safe helpers in use (`safeImage`, `safeText`, `safeArray`)
- ✅ Error boundary exists (`app/error.tsx`)
- ✅ DEFAULTS and safe utilities present

## Internationalization (i18n)

### Overview
The platform supports multi-language content using **next-intl v4.4.0** with locale-based routing:
- **Supported locales**: English (en - default), Dutch (nl)
- **Routing**: `/[locale]/` pattern (e.g., `/en/platforms`, `/nl/platforms`)
- **Database**: All content tables have `locale` column with composite unique constraints `(slug, locale)`

### Architecture

**Middleware** (`middleware.ts`):
- Intercepts all requests and adds locale prefix
- Redirects root `/` to `/en` (default locale)
- Configured with `localePrefix: 'always'`

**Translation Files**:
- `messages/en.json` - English UI strings (header, footer, common)
- `messages/nl.json` - Dutch UI strings

**Key Components**:
- `i18n/request.ts` - Server-side i18n configuration
- `components/LanguageSwitcher.tsx` - Client-side locale toggle with flags
- `app/[locale]/layout.tsx` - Wraps app with `NextIntlClientProvider`

### Translation Workflows

**Option 1: Basic Translation** (Free, instant)
```bash
node scripts/translate-platforms.mjs
```
- Uses simple word replacement dictionary
- Good for: Quick testing, basic translations
- Limitations: Low quality, misses context

**Option 2: Google Translate** (FREE, no API key! ⭐ RECOMMENDED)
```bash
node scripts/translate-platforms-google.mjs
```
- **Cost**: 100% FREE - No API key, no creditcard!
- **Quality**: Good quality translations
- **Package**: Uses `@iamtraction/google-translate`
- **Translates**: Descriptions, meta tags, pros, cons, features
- **Speed**: Slower than paid APIs (rate limiting)
- **Perfect for**: Getting started without any setup

**Verification Scripts**:
```bash
node scripts/check-locales.mjs           # Check locale distribution
node scripts/verify-translation-direction.mjs  # Verify EN→NL direction
```

### Environment Variables

Add to `.env.local`:
```bash
DEEPL_API_KEY=your-key-here  # Get from https://www.deepl.com/pro#developer
```

### Database Schema

All content tables support localization:
```sql
-- Platforms table
locale VARCHAR(5) DEFAULT 'en'
CREATE INDEX idx_platforms_locale ON platforms(locale);
ALTER TABLE platforms ADD CONSTRAINT platforms_slug_locale_unique UNIQUE (slug, locale);

-- Same pattern for posts, categories, tools
```

### Smart Sitemap

Sitemap automatically generates correct URLs based on existing content:
- Only generates URLs for content that exists
- Adds hreflang alternates only when both EN and NL versions exist
- Per-locale queries prevent 404 errors
- Auto-revalidates every 15 minutes

### Adding New Translations

**UI Strings**:
1. Add key to `messages/en.json`
2. Add Dutch translation to `messages/nl.json`
3. Use in components: `const t = useTranslations(); t('key.path')`

**Content**:
1. Create English version first (locale='en')
2. Run DeepL script for professional Dutch translation
3. Manual review in admin dashboard (port 3002)
4. Publish both versions

### SEO Considerations

- Each locale has its own sitemap entries
- Hreflang tags automatically added when both versions exist
- Meta titles and descriptions translated separately
- URL structure: `/{locale}/{slug}` for consistent indexing

## Ads Management System

### Overview
Unified ads management system for promoting internal products (MoneyBii) and affiliate partnerships across tools and blog pages.

### Architecture

**Main App** (Public-facing):
- `components/AdWidget.tsx` - Client component for displaying ads
- `app/api/ads/active/route.ts` - Edge API for fetching active ads
- Placement-based ad targeting with random rotation
- Date range filtering (start_date/end_date)
- Legacy support via direct props (`adImage`, `adLink`)

**Admin Dashboard** (Content Management):
- `app/(dashboard)/ads/page.tsx` - Ads listing with filters
- `app/(dashboard)/ads/new/page.tsx` - Create new ad form
- `app/(dashboard)/ads/[id]/edit/page.tsx` - Edit existing ad
- `app/api/ads/route.ts` - CRUD API endpoints
- `app/api/upload-ad/route.ts` - Image upload with dual-folder pattern

### Database Schema

```sql
CREATE TABLE ads (
  id UUID PRIMARY KEY,
  tenant_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT NOT NULL,
  placement VARCHAR(50) NOT NULL,  -- 'tools_listing', 'tools_detail', 'blog_sidebar'
  is_active BOOLEAN DEFAULT true,
  start_date TIMESTAMP,  -- Optional: ad becomes active
  end_date TIMESTAMP,    -- Optional: ad becomes inactive
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Usage Pattern

```typescript
// In any page where you want to show ads
import { AdWidget } from '@/components/AdWidget';

export default function ToolsPage() {
  return (
    <div>
      {/* Sidebar ad */}
      <AdWidget placement="tools_listing" />
    </div>
  );
}
```

### Placement Types

- **tools_listing** - Tools overview page sidebar
- **tools_detail** - Individual tool detail pages
- **blog_sidebar** - Blog post sidebars
- Extensible: Add new placements by creating new database entries

### Image Upload

Images are uploaded to **both** application folders:
- `/public/images/ads/` (main app)
- `../skillLinkup-admin/public/images/ads/` (admin)
- Converted to WebP format (85% quality)
- Sharp-based processing for optimal performance

### Ad Rotation Logic

```typescript
// Fetches all active ads for placement
// Filters by:
// - is_active = true
// - (start_date IS NULL OR start_date <= NOW())
// - (end_date IS NULL OR end_date >= NOW())
// Returns random ad from matching results
```

### Key Files

- `drizzle/migrations/0008_add_ads_table.sql` - Database migration
- `lib/queries.ts` - Ad CRUD functions (getActiveAds, getAllAds, createAd, etc.)
- Admin: `components/AdWidget.tsx` (admin dashboard preview)
- Main: `components/AdWidget.tsx` (public-facing display)

## Important Notes

1. **Never destructure featureImg in function parameters** - crashes if undefined
2. **Always use safe helpers** - database returns '', '   ', null, undefined
3. **Next.js 15 requires await params** - all dynamic routes must be async
4. **Client Components need serializable props** - no Date, undefined, complex objects
5. **Image uploads go to both folders** - ensures admin preview + production availability
6. **Edge runtime for API routes** - required for Netlify deployment
7. **Sitemap auto-updates** - revalidates every 15 minutes, manual trigger via webhook
8. **Use `lib/db.ts` exports** - `sql` for raw queries (sitemap), `db` for Drizzle ORM (app)
9. **Platforms table requires owner_id** - use "test-owner-id" for import scripts
10. **N8N workflow is blueprint only** - requires manual setup in n8n Cloud to activate
11. **Tools use localStorage only** - no authentication yet, data stored in browser, future: cloud sync
12. **Logo upload uses Base64** - enables localStorage compatibility for invoice generator
