# Netlify to Vercel Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate SkillLinkup from Netlify to Vercel with security fixes, zero code-breaking changes.

**Architecture:** Remove Netlify-specific config, migrate headers to next.config.js, set up Vercel project with env vars, deploy and verify before DNS switch.

**Tech Stack:** Next.js 15, Vercel CLI, Netlify CLI (for env export)

---

### Task 1: Security Patches

**Files:**
- Modify: `package.json` (npm audit fix updates version)
- Modify: `package-lock.json` (auto-updated)

**Step 1: Run npm audit fix**

Run: `cd /home/marvin/Projecten/Skilllinkup && npm audit fix`
Expected: Next.js updates from 15.5.4 to ~15.5.12

**Step 2: Verify the fix**

Run: `npm audit --audit-level=critical`
Expected: 0 critical vulnerabilities

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "fix: patch Next.js security vulnerabilities (15.5.4 → 15.5.12)"
```

---

### Task 2: Create Error Boundary

**Files:**
- Create: `app/[locale]/error.tsx`

**Step 1: Create error boundary component**

```tsx
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add app/\[locale\]/error.tsx
git commit -m "feat: add error boundary for production crash protection"
```

---

### Task 3: Migrate next.config.js (Headers + Image Optimization)

**Files:**
- Modify: `next.config.js`

**Step 1: Update next.config.js**

Remove `unoptimized: true` from images config. Add security headers and cache headers to the existing `headers()` function. Update Netlify comment.

Final `next.config.js`:

```javascript
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH : "",

  // Image optimization configuration
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

  // Headers: CORS + Security + Cache
  async headers() {
    return [
      // CORS headers for API routes (admin dashboard access)
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://admin.skilllinkup.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS,PATCH' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
      // Security headers (all pages)
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      // Cache static assets (immutable)
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },

  // URL rewrites for locale-specific paths
  // English uses /guides, Dutch uses /gids, both serve from /gids routes
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/en/guides',
          destination: '/en/gids',
        },
        {
          source: '/en/guides/:path*',
          destination: '/en/gids/:path*',
        },
      ],
    }
  },
}

module.exports = withNextIntl(nextConfig);
```

**Step 2: Commit**

```bash
git add next.config.js
git commit -m "feat: migrate security/cache headers to next.config.js, enable image optimization"
```

---

### Task 4: Remove Netlify Config + Update Comments

**Files:**
- Delete: `netlify.toml`
- Modify: `package.json` (remove `@netlify/plugin-nextjs`)
- Modify: `app/api/geo/route.ts` (update comment)
- Modify: `lib/db.ts` (update comment)

**Step 1: Delete netlify.toml**

Run: `rm /home/marvin/Projecten/Skilllinkup/netlify.toml`

**Step 2: Remove @netlify/plugin-nextjs from package.json**

Run: `cd /home/marvin/Projecten/Skilllinkup && npm uninstall @netlify/plugin-nextjs`

**Step 3: Update comment in app/api/geo/route.ts**

Change line 15 from:
```typescript
// Netlify Edge Functions provide these headers
```
To:
```typescript
// Vercel Edge Runtime provides these headers
```

**Step 4: Update comment in lib/db.ts**

Change line 6 from:
```typescript
// Use DATABASE_URL for local development and Netlify production
```
To:
```typescript
// Use DATABASE_URL for local development and production
```

Change line 11 from:
```typescript
'DATABASE_URL or NETLIFY_DATABASE_URL environment variable is required'
```
To:
```typescript
'Database URL not configured. Please set DATABASE_URL or NETLIFY_DATABASE_URL environment variable.'
```

**Step 5: Remove .netlify directory if exists**

Run: `rm -rf /home/marvin/Projecten/Skilllinkup/.netlify`

**Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove Netlify config and plugin, update comments for Vercel"
```

---

### Task 5: Create vercel.json

**Files:**
- Create: `vercel.json`

**Step 1: Create vercel.json**

```json
{
  "framework": "nextjs"
}
```

**Step 2: Commit**

```bash
git add vercel.json
git commit -m "chore: add Vercel configuration"
```

---

### Task 6: Set Up Vercel Project + Push Env Vars

**Files:** None (CLI operations only)

**Step 1: Create Vercel project**

Run: `cd /home/marvin/Projecten/Skilllinkup && vercel link`
- Select: Create new project
- Project name: skilllinkup
- Framework: Next.js (auto-detected)

**Step 2: Push environment variables to Vercel**

```bash
echo "postgresql://neondb_owner:npg_iFUrTHN3o0Gk@ep-frosty-silence-agwmn44q-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require" | vercel env add DATABASE_URL production preview development
echo "https://skilllinkup.com" | vercel env add NEXT_PUBLIC_SITE_URL production preview development
echo "re_TbfRddTj_DYMkbAztbDiMx5xa9b6wA2rX" | vercel env add RESEND_API_KEY production preview development
echo "75a23919-4a89-44f6-a8dd-145609836da5" | vercel env add RESEND_AUDIENCE_ID production preview development
echo "d08c777a5b583d14c824fbca1ba2891a92cecff268ac86074f41a6e4f4f3adfc" | vercel env add REVALIDATE_SECRET production preview development
```

**Step 3: Connect Git repo for auto-deploy**

Run: `vercel git connect` (connects to MarvinNL046/Skilllinkup on GitHub)

---

### Task 7: Deploy to Vercel + Verify

**Step 1: Push code to trigger deploy**

Run: `git push origin main`

**Step 2: Check deployment status**

Run: `vercel ls` to see deployment URL

**Step 3: Verify preview URL works**

- Check homepage loads
- Check API routes respond
- Check images load

---

### Task 8: Add Domain + Provide DNS Instructions

**Step 1: Add domain to Vercel**

Run: `vercel domains add skilllinkup.com`

**Step 2: Add www redirect**

Run: `vercel domains add www.skilllinkup.com`

**Step 3: Note nameservers for user**

Vercel will output the required nameservers. User updates these at Cloud86.

---
