// app/robots.ts
import type { MetadataRoute } from "next";

/**
 * ROBOTS.TXT - SEO Configuration
 *
 * References the sitemap index which contains all individual sitemaps
 */

export default function robots(): MetadataRoute.Robots {
 const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://skilllinkup.com";

 return {
 rules: [
 {
 userAgent: "*",
 allow: "/",
 disallow: [
 "/admin",
 "/api",
 "/preview",
 "/_next",
 "/test",
 "/*.json$",
 "/loading-demo",
 ],
 },
 {
 userAgent: "GPTBot",
 disallow: ["/"],
 },
 {
 userAgent: "ChatGPT-User",
 disallow: ["/"],
 },
 {
 userAgent: "CCBot",
 disallow: ["/"],
 },
 {
 userAgent: "anthropic-ai",
 disallow: ["/"],
 },
 ],
 sitemap: `${baseUrl}/sitemap.xml`,
 host: baseUrl,
 };
}
