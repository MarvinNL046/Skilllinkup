import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

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
