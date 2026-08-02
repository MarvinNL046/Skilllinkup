import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/add-services(.*)",
  "/admin(.*)",
  "/create-job(.*)",
  "/create-projects(.*)",
  "/dashboard(.*)",
  "/invoice(.*)",
  "/invoices(.*)",
  "/local/request-quote(.*)",
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
  },
  {
    signInUrl: "/login",
    signUpUrl: "/register",
  },
);

export const config = {
  matcher: [
    "/add-services(.*)",
    "/admin(.*)",
    "/create-job(.*)",
    "/create-projects(.*)",
    "/dashboard(.*)",
    "/invoice(.*)",
    "/invoices(.*)",
    "/local/request-quote(.*)",
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
    "/login(.*)",
    "/register(.*)",
    "/api/((?!health(?:/|$)).*)",
    "/trpc(.*)",
  ],
};
