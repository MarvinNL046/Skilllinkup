import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

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
  "/(en|nl)/become-freelancer(.*)",
  "/(en|nl)/become-client(.*)",
]);

const isOnboardingRoute = createRouteMatcher([
  "/(en|nl)/onboarding(.*)",
  "/(en|nl)/become-freelancer(.*)",
  "/(en|nl)/become-client(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  const { userId, sessionClaims } = auth();
  if (userId) {
    const url = req.nextUrl;
    const segments = url.pathname.split("/").filter(Boolean);
    const locale = segments[0] || "en";
    const metadata =
      (sessionClaims as any)?.publicMetadata ||
      (sessionClaims as any)?.metadata ||
      {};
    const userType = metadata.userType as string | undefined;
    const onboardingCompleted = metadata.onboardingCompleted as boolean | undefined;

    if (!userType && !isOnboardingRoute(req)) {
      const redirectUrl = new URL(`/${locale}/onboarding`, req.url);
      return NextResponse.redirect(redirectUrl);
    }

    if (userType && !onboardingCompleted) {
      const target =
        userType === "freelancer"
          ? `/${locale}/become-freelancer`
          : `/${locale}/become-client`;
      if (url.pathname !== target) {
        const redirectUrl = new URL(target, req.url);
        return NextResponse.redirect(redirectUrl);
      }
    }
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
