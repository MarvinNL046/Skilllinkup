import createMiddleware from 'next-intl/middleware';

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

    // Match all paths with supported locales
    '/(en|nl)/:path*',

    // Exclude specific paths (negative lookahead)
    '/((?!api|_next|_vercel|images|fonts|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)'
  ]
};
