# Netlify to Vercel Migration + Health Fixes

**Date**: 2026-02-22
**Scope**: Main app (skilllinkup.com) only. Admin dashboard stays on Netlify.
**Registrar**: Cloud86 (nameserver delegation to Vercel)

## Context

SkillLinkup is a Next.js 15 blog platform currently deployed on Netlify. The project has been dormant but is getting organic traffic. This migration combines security fixes with a platform move to Vercel, which has native Next.js support.

## What Changes

### Phase 1: Code Health Fixes

**1.1 Security patches**
- Run `npm audit fix` to update Next.js from 15.5.4 to 15.5.12
- Patches 5 vulnerabilities including critical RCE

**1.2 Error boundary**
- Create `app/[locale]/error.tsx` with user-friendly error fallback
- Prevents white-screen crashes in production

**1.3 Enable Vercel image optimization**
- Remove `images: { unoptimized: true }` from `next.config.js`
- Vercel provides built-in image optimization (Netlify doesn't)
- Keep `remotePatterns`, `formats`, `deviceSizes`, `imageSizes`

### Phase 2: Netlify Cleanup + Vercel Config

**2.1 Remove Netlify-specific code**
- Remove `@netlify/plugin-nextjs` from devDependencies
- Delete `netlify.toml`
- Remove `.netlify/` directory (link state)
- Update comment in `app/api/geo/route.ts` (Netlify → Edge Runtime)
- Update comment in `lib/db.ts` (Netlify → production)

**2.2 Migrate headers to next.config.js**
Security headers and cache headers move from `netlify.toml` to `next.config.js` headers config:

```typescript
async headers() {
  return [
    // Existing CORS headers for /api/*
    { source: '/api/:path*', headers: [...] },
    // Security headers (migrated from netlify.toml)
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
    // Cache headers for static assets
    {
      source: '/images/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
    {
      source: '/fonts/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
  ];
}
```

**2.3 Create vercel.json (minimal)**
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install"
}
```

Note: Vercel auto-detects Next.js. This file is mostly for explicitness.

### Phase 3: Vercel Deployment

**3.1 Create Vercel project via CLI**
```bash
vercel link  # Link to new project
```

**3.2 Push environment variables**
Transfer from Netlify to Vercel (7 vars):

| Variable | Vercel Scope |
|----------|-------------|
| DATABASE_URL | production, preview, development |
| NEXT_PUBLIC_SITE_URL | production, preview, development |
| RESEND_API_KEY | production, preview, development |
| RESEND_AUDIENCE_ID | production, preview, development |
| REVALIDATE_SECRET | production, preview, development |

Not migrating (Netlify-specific):
- `NETLIFY_DATABASE_URL` - same as DATABASE_URL
- `NETLIFY_DATABASE_URL_UNPOOLED` - not needed
- `NODE_VERSION` - Vercel auto-detects
- `NEXT_TELEMETRY_DISABLED` - optional, can add if wanted

**3.3 Deploy and verify on preview URL**
- Push code, Vercel auto-deploys
- Verify on `*.vercel.app` preview URL before DNS switch

### Phase 4: DNS Switch (User Action)

**4.1 Add domain in Vercel**
```bash
vercel domains add skilllinkup.com
```
Vercel will provide nameservers (typically `ns1.vercel-dns.com`, `ns2.vercel-dns.com`).

**4.2 User updates Cloud86**
- Go to Cloud86 dashboard
- Change nameservers to Vercel's nameservers
- Propagation: 5-60 minutes typically

**4.3 Verify**
- Vercel auto-provisions SSL certificate
- Test all routes work
- Test API endpoints
- Test image optimization

## What Does NOT Change

- **11 Edge Runtime API routes** - Vercel supports identical `runtime = 'edge'`
- **Geo headers** (`x-country`, `x-city`, etc.) - Vercel Edge injects same headers
- **`NETLIFY_DATABASE_URL` fallback** in 21 scripts - harmless, kept as fallback
- **Database (Neon PostgreSQL)** - platform-independent, same connection string
- **next-intl routing** - framework-level, not platform-specific
- **Sitemap/robots.ts** - Next.js App Router features, platform-independent
- **All page components and logic** - zero changes needed

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| DNS propagation delay | Test on Vercel preview URL first |
| Image optimization differences | Vercel's optimizer is superior, but test key pages |
| Edge function behavior | Same V8 runtime on both platforms |
| Admin dashboard CORS | Keep `admin.skilllinkup.com` in CORS config (still on Netlify) |

## Rollback Plan

If issues arise after DNS switch:
1. Change Cloud86 nameservers back to Netlify's
2. Netlify site is untouched and still functional
3. DNS propagation restores original setup within minutes

## Files Modified

| File | Action |
|------|--------|
| `package.json` | Remove `@netlify/plugin-nextjs`, update Next.js |
| `next.config.js` | Add security/cache headers, enable image optimization |
| `netlify.toml` | DELETE |
| `app/[locale]/error.tsx` | CREATE (error boundary) |
| `app/api/geo/route.ts` | Update comment only |
| `lib/db.ts` | Update comment only |
| `vercel.json` | CREATE (minimal config) |
| `.gitignore` | Add `.vercel/` |

## Estimated Effort

- Phase 1 (Code fixes): ~10 minutes
- Phase 2 (Config migration): ~10 minutes
- Phase 3 (Vercel setup): ~10 minutes
- Phase 4 (DNS switch): ~5 minutes (user action) + propagation wait
