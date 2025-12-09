import createMiddleware from 'next-intl/middleware';

// Note: /en/guides to /en/gids rewrites are handled in next.config.js
// This middleware only handles locale detection and routing

export default createMiddleware({
  // All supported locales
  locales: ['en', 'nl'],

  // Default locale (English)
  defaultLocale: 'en',

  // Always use locale prefix in URL (even for default locale)
  // This ensures consistent routing and prevents issues with Next.js 15
  localePrefix: 'always'
});

export const config = {
  // Match all pathnames except:
  // - API routes (/api/*)
  // - Next.js internal routes (/_next/*)
  // - Static files in public folder (/images/*, /fonts/*, etc.)
  // - Favicon and other root-level assets
  // - Sitemap and robots.txt
  matcher: [
    // Match root path
    '/',

    // Match all paths with supported locales (including /en/guides which gets rewritten)
    '/(en|nl)/:path*',

    // Exclude specific paths (negative lookahead)
    '/((?!api|_next|_vercel|images|fonts|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'
  ]
};
