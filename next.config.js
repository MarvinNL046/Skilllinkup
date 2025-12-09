const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH : "",

  // Image optimization configuration
  images: {
    unoptimized: true, // Disable image optimization for Netlify
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.skilllinkup.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.skilllinkup.com',
      },
      // Add other external image domains as needed
      // Example: unsplash, cloudinary, etc.
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // CORS headers
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: 'https://admin.skilllinkup.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS,PATCH' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ]
  },

  // URL rewrites for locale-specific paths
  // English uses /guides, Dutch uses /gids, both serve from /gids routes
  async rewrites() {
    return {
      beforeFiles: [
        // Rewrite /en/guides to /en/gids (overview page)
        {
          source: '/en/guides',
          destination: '/en/gids',
        },
        // Rewrite /en/guides/:path* to /en/gids/:path* (sub-pages)
        {
          source: '/en/guides/:path*',
          destination: '/en/gids/:path*',
        },
      ],
    }
  },
}

module.exports = withNextIntl(nextConfig);
