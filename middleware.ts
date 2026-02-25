import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/about-2",
  "/blog-3",
  "/blog-single",
  "/contact",
  "/faq",
  "/help",
  "/pricing",
  "/terms",
  "/become-seller",
  "/service-6",
  "/service-single-v3",
  "/freelancer-2",
  "/freelancer-single-v3",
  "/employee-2",
  "/employee-single",
  "/project-4",
  "/project-single-v3",
  "/job-3",
  "/job-single",
  "/login",
  "/register",
  "/ui-elements",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
