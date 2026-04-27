"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useConvexUser from "@/hook/useConvexUser";
import DashboardHeader from "./header/DashboardHeader";
import DashboardSidebar from "./sidebar/DashboardSidebar";
import dashboardSidebarStore from "@/store/dashboardSidebarStore";

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
 * Auth gate: unauthenticated → /login; missing userType / preferredWorld
 * → /onboarding.
 */
export default function DashboardLayout({ children, maxWidth = "full" }) {
  const router = useRouter();
  const pathname = usePathname();
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const collapsed = dashboardSidebarStore((s) => s.collapsed);
  const mobileOpen = dashboardSidebarStore((s) => s.mobileOpen);
  const closeMobile = dashboardSidebarStore((s) => s.closeMobile);

  useEffect(() => {
    if (isLoaded && !isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (
      convexUser &&
      (!convexUser.userType || !convexUser.preferredWorld) &&
      pathname !== "/onboarding"
    ) {
      router.replace("/onboarding");
    }
  }, [convexUser, isLoaded, isAuthenticated, pathname, router]);

  // Close mobile drawer on route change so navigation away dismisses it
  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  // Lock body scroll while the mobile drawer is open so the page behind
  // the overlay doesn't scroll when users swipe inside the drawer.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <div
      style={{
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        flex: "1 0 auto",
        minWidth: 0,
      }}
    >
      <DashboardHeader />
      <div
        className="app-shell"
        data-sidebar={collapsed ? "collapsed" : "expanded"}
      >
        <aside
          className="app-shell__sidebar"
          data-mobile-open={mobileOpen ? "true" : "false"}
        >
          <DashboardSidebar />
        </aside>
        {mobileOpen && (
          <div
            className="app-shell__backdrop"
            onClick={closeMobile}
            aria-hidden="true"
          />
        )}
        <main
          className="app-shell__content"
          data-max-width={maxWidth}
          id="dashboard-content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
