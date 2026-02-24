import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";

const intlMiddleware = createIntlMiddleware({
  locales: ["en", "nl"],
  defaultLocale: "en",
  localePrefix: "always",
});

// Routes that require authentication
const isProtectedRoute = createRouteMatcher([
  "/(en|nl)/dashboard(.*)",
  "/(en|nl)/marketplace/seller(.*)",
  "/(en|nl)/onboarding(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Match root path
    "/",
    // Match all paths with supported locales
    "/(en|nl)/:path*",
    // Exclude specific paths (negative lookahead)
    "/((?!api|_next|_vercel|sign-in|sign-up|images|fonts|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
