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
      "img-src 'self' https://img.clerk.com https://*.clerk.com https://clerk.skilllinkup.com https://*.convex.cloud data: blob:",
      "connect-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://clerk.skilllinkup.com https://*.convex.cloud https://*.convex.site wss://*.convex.cloud",
      "frame-src 'self' https://*.clerk.accounts.dev https://*.clerk.com https://clerk.skilllinkup.com https://challenges.cloudflare.com",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; "),
  },
];

const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
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
      { protocol: "https", hostname: "**.convex.cloud" },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
  async headers() {
    // This repo builds two Vercel projects: the public marketplace and the
    // admin panel. Only the admin project sets ADMIN_NOINDEX, so the public
    // site keeps its indexing.
    const headers =
      process.env.ADMIN_NOINDEX === "1"
        ? [...securityHeaders, { key: "X-Robots-Tag", value: "noindex, nofollow" }]
        : securityHeaders;
    return [
      {
        source: "/(.*)",
        headers,
      },
    ];
  },
  async redirects() {
    return [
      // Match only the public www host; leave localhost and app subdomains alone.
      { source: "/:path*", has: [{ type: "host", value: "www\\.skilllinkup\\.com" }], destination: "https://skilllinkup.com/:path*", permanent: true },
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
      // Exact historical aliases must precede the generic locale redirect.
      { source: "/disclosure", destination: "/affiliate-disclosure", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/en/resources/upwork-vs-fiverr", destination: "/resources/fiverr-vs-upwork", permanent: true },
      { source: "/resources/upwork-vs-fiverr", destination: "/resources/fiverr-vs-upwork", permanent: true },
      { source: "/en/guides/platform-vergelijkingen/upwork-vs-fiverr", destination: "/resources/fiverr-vs-upwork", permanent: true },
      { source: "/en/gids/platform-vergelijkingen/upwork-vs-fiverr", destination: "/resources/fiverr-vs-upwork", permanent: true },
      { source: "/en/gids/platform-selectie/beste-freelance-platform-kiezen", destination: "/en/guides/platform-selectie/beste-freelance-platform-kiezen", permanent: true },
      { source: "/en/gids/platform-reviews/fiverr-pros-cons-deep-dive", destination: "/en/guides/platform-reviews/fiverr-pros-cons-deep-dive", permanent: true },
      { source: "/en/resources/best-platforms-freelance-writers-content-creators", destination: "/resources/best-platform-writers", permanent: true },
      { source: "/resources/best-platforms-freelance-writers-content-creators", destination: "/resources/best-platform-writers", permanent: true },
      { source: "/en/resources/how-to-stand-out-on-crowded-freelance-platforms", destination: "/resources/optimizing-freelance-profile-maximum-visibility", permanent: true },
      { source: "/resources/how-to-stand-out-on-crowded-freelance-platforms", destination: "/resources/optimizing-freelance-profile-maximum-visibility", permanent: true },
      // Resources: redirect old /en/resources/* URLs to canonical /resources/*
      { source: "/en/blog", destination: "/blog", permanent: true },
      { source: "/en/services", destination: "/services", permanent: true },
      { source: "/en/projects", destination: "/projects", permanent: true },
      { source: "/en/freelancers", destination: "/online/freelancers", permanent: true },
      { source: "/en/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/en/resources/:slug", destination: "/resources/:slug", permanent: true },
      // Platforms: redirect old /en/platforms/* URLs to canonical /platforms/*
      { source: "/en/platforms/:slug", destination: "/platforms/:slug", permanent: true },
      // Old blog post URL format
      { source: "/post/ai-tools-for-freelancers", destination: "/resources/ai-tools-for-freelancers", permanent: true },
      // Old comparisons listing
      { source: "/comparisons", destination: "/resources", permanent: false },
      // Old NL guides
      { source: "/guides/niche-gidsen/:slug", destination: "/nl/resources/:slug", permanent: true },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
