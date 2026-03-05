import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/about(.*)",
  "/blog(.*)",
  "/post(.*)",
  "/contact(.*)",
  "/faq(.*)",
  "/help(.*)",
  "/pricing(.*)",
  "/terms(.*)",
  "/become-seller(.*)",
  "/services(.*)",
  "/service(.*)",
  "/freelancers(.*)",
  "/freelancer(.*)",
  "/employees(.*)",
  "/employee-single(.*)",
  "/projects(.*)",
  "/project(.*)",
  "/jobs(.*)",
  "/job(.*)",
  "/login(.*)",
  "/register(.*)",
  "/ui-elements(.*)",
  "/api/webhooks(.*)",
  // Marketplace public pages
  "/online(.*)",
  // Resources and platforms (public SEO pages)
  "/resources(.*)",
  "/nl/resources(.*)",
  "/platforms(.*)",
  "/nl/platforms(.*)",
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
