const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const { version: appVersion } = require("./package.json");

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
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.clerk.accounts.dev https://*.clerk.com https://clerk.skilllinkup.com https://challenges.cloudflare.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' https://img.clerk.com https://*.clerk.com https://clerk.skilllinkup.com data: blob:",
      "connect-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://clerk.skilllinkup.com https://*.convex.cloud https://*.convex.site wss://*.convex.cloud",
      "frame-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://clerk.skilllinkup.com https://challenges.cloudflare.com",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; "),
  },
];

const nextConfig = {
  // Freeze non-secret release metadata into the artifact at build time. Vercel
  // exposes its Git SHA and deployment URL during the build; inlining them
  // keeps /api/health useful even if a runtime is later moved or restored.
  env: {
    SKILLLINKUP_APP_VERSION: appVersion,
    SKILLLINKUP_RELEASE_SHA:
      process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || "",
    SKILLLINKUP_DEPLOYMENT_URL: process.env.VERCEL_URL || "",
  },
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
      // Auth route aliases (template used /sign-in, we use /login)
      { source: "/sign-in", destination: "/login", permanent: true },
      { source: "/sign-up", destination: "/register", permanent: true },
      // Canonical public marketplace routes. Keep aliases for old links and SEO equity.
      { source: "/service", destination: "/services", permanent: true },
      { source: "/service/:id", destination: "/online/service/:id", permanent: true },
      { source: "/online/services", destination: "/services", permanent: true },
      { source: "/online/services/:slug", destination: "/services/:slug", permanent: true },
      { source: "/freelancers", destination: "/online/freelancers", permanent: true },
      { source: "/freelancer", destination: "/online/freelancers", permanent: true },
      { source: "/freelancer/:id", destination: "/online/freelancer/:id", permanent: true },
      { source: "/employees", destination: "/online/freelancers", permanent: true },
      { source: "/employee-single", destination: "/online/freelancers", permanent: true },
      { source: "/employee-single/:id", destination: "/online/freelancer/:id", permanent: true },
      { source: "/project", destination: "/projects", permanent: true },
      { source: "/project/:id", destination: "/online/project/:id", permanent: true },
      { source: "/online/projects", destination: "/projects", permanent: true },
      { source: "/job", destination: "/jobs", permanent: true },
      { source: "/job/:id", destination: "/jobs/job/:id", permanent: true },
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

module.exports = withNextIntl(nextConfig);
