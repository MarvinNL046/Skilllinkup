/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "geolocation=(), microphone=(), camera=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/services", destination: "/online/services", permanent: true },
      { source: "/services/:slug", destination: "/online/services/:slug", permanent: true },
      { source: "/service/:id", destination: "/online/service/:id", permanent: true },
      { source: "/freelancers", destination: "/online/freelancers", permanent: true },
      { source: "/freelancer/:id", destination: "/online/freelancer/:id", permanent: true },
      { source: "/projects", destination: "/online/projects", permanent: true },
      { source: "/project/:id", destination: "/online/project/:id", permanent: true },
      // Resources: redirect old /en/resources/* URLs to canonical /resources/*
      { source: "/en/resources/:slug", destination: "/resources/:slug", permanent: true },
      // Platforms: redirect old /en/platforms/* URLs to canonical /platforms/*
      { source: "/en/platforms/:slug", destination: "/platforms/:slug", permanent: true },
      // Old blog post URL format
      { source: "/post/ai-tools-for-freelancers", destination: "/resources/project-management-tools-freelancers", permanent: true },
      // Old comparisons listing
      { source: "/comparisons", destination: "/resources", permanent: false },
      // Old NL guides
      { source: "/guides/niche-gidsen/:slug", destination: "/nl/resources/:slug", permanent: true },
    ];
  },
};

module.exports = nextConfig;
