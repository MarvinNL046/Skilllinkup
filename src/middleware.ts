import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher([
  "/add-services(.*)",
  "/admin(.*)",
  "/create-projects(.*)",
  "/dashboard(.*)",
  "/invoice(.*)",
  "/invoices(.*)",
  "/manage-jobs(.*)",
  "/manage-projects(.*)",
  "/manage-services(.*)",
  "/message(.*)",
  "/my-profile(.*)",
  "/onboarding(.*)",
  "/orders(.*)",
  "/payouts(.*)",
  "/proposal(.*)",
  "/reviews(.*)",
  "/saved(.*)",
  "/statements(.*)",
]);

export default clerkMiddleware(
  async (auth, request) => {
    if (isProtectedRoute(request)) {
      await auth.protect();
    }

    // Apply next-intl locale routing
    return handleI18nRouting(request);
  },
  {
    signInUrl: "/login",
    signUpUrl: "/register",
  }
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
