"use client";

import { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import useConvexUser from "@/hook/useConvexUser";
import { hasCompletedActiveContext } from "@/lib/accountContext.mjs";
import { onboardingUrl } from "@/lib/onboardingRedirect.mjs";
import DashboardHeader from "./header/DashboardHeader";
import DashboardSidebar from "./sidebar/DashboardSidebar";
import dashboardSidebarStore, {
  useHydratedSidebarCollapsed,
} from "@/store/dashboardSidebarStore";

/**
 * Dashboard app-shell — full-width layout, NOT a centered marketing
 * container. The sidebar pins to the left viewport edge (sticky), the
 * content takes the remaining width with an opt-in max-width per route.
 *
 * maxWidth options:
 *   "full"   — no constraint (default; dashboards, messages)
 *   "wide"   — 1400px (listings: orders, saved, manage-*)
 *   "medium" — 1100px (profile, rewards, feedback)
 *   "form"   — 880px  (create-projects, add-services, settings forms)
 *
 * Auth gate: unauthenticated → /login; incomplete active account context
 * → /onboarding.
 */
export default function DashboardLayout({ children, maxWidth = "full" }) {
  const router = useRouter();
  const pathname = usePathname();
  const { convexUser, isLoaded, isClerkSignedIn, isAuthenticated } =
    useConvexUser();
  const collapsed = useHydratedSidebarCollapsed();
  const mobileOpen = dashboardSidebarStore((s) => s.mobileOpen);
  const closeMobile = dashboardSidebarStore((s) => s.closeMobile);
  useEffect(() => {
    if (isLoaded && !isClerkSignedIn) {
      const destination = window.location.pathname + window.location.search + window.location.hash;
      router.replace(`/login?${new URLSearchParams({ redirect_url: destination })}`);
      return;
    }
    if (
      convexUser &&
      !hasCompletedActiveContext(convexUser) &&
      pathname !== "/onboarding"
    ) {
      router.replace(onboardingUrl(window.location.pathname + window.location.search + window.location.hash));
    }
  }, [convexUser, isLoaded, isClerkSignedIn, pathname, router]);

  // Close mobile drawer on route change so navigation away dismisses it
  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) closeMobile();
    };
    desktop.addEventListener("change", closeOnDesktop);
    closeOnDesktop();
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [closeMobile]);

  if (
    !isLoaded ||
    !isAuthenticated ||
    !convexUser ||
    !hasCompletedActiveContext(convexUser)
  ) {
    return (
      <main
        id="dashboard-content"
        className="app-shell__content"
        aria-busy="true"
      >
        <p role="status">Opening your workspace...</p>
      </main>
    );
  }

  return (
    <div
      className="app-shell"
      data-sidebar={collapsed ? "collapsed" : "expanded"}
      style={{
        flex: "1 0 auto",
        minWidth: 0,
      }}
    >
      <aside className="app-shell__sidebar">
        <DashboardSidebar />
      </aside>
      <Dialog.Root
        open={mobileOpen}
        onOpenChange={(open) => {
          if (!open) closeMobile();
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="app-shell__backdrop" />
          <Dialog.Content
            id="dashboard-mobile-navigation"
            className="app-shell__mobile-navigation"
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              document.getElementById("dashboard-navigation-trigger")?.focus();
            }}
          >
            <Dialog.Title className="sr-only">
              Dashboard navigation
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              Choose a workspace or dashboard page.
            </Dialog.Description>
            <Dialog.Close
              className="app-shell__drawer-close"
              aria-label="Close dashboard navigation"
            >
              <X size={19} />
            </Dialog.Close>
            <DashboardSidebar mobile />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <section className="app-shell__workspace">
        <DashboardHeader />
        <main
          className="app-shell__content"
          data-max-width={maxWidth}
          id="dashboard-content"
        >
          {children}
        </main>
      </section>
    </div>
  );
}
