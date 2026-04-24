"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useConvexUser from "@/hook/useConvexUser";
import DashboardHeader from "./header/DashboardHeader";
import DashboardSidebar from "./sidebar/DashboardSidebar";
import toggleStore from "@/store/toggleStore";

/**
 * Dashboard shell on the SkillLinkup Design System.
 *
 * - Sticky DashboardHeader at the top (DS-native, no Bootstrap JS)
 * - DashboardSidebar on the left (lg+) with world switcher + nav groups
 * - Main content fills the rest
 *
 * Auth gate: unauthenticated -> /login; missing userType/preferredWorld
 * -> /onboarding.
 */
export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();
  const sidebarHidden = toggleStore((s) => s.isDasboardSidebarActive);

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

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <DashboardHeader />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: sidebarHidden ? "1fr" : "minmax(240px, 280px) 1fr",
          gap: 0,
          maxWidth: "var(--container-xl, 1280px)",
          margin: "0 auto",
          padding: "0 var(--space-6)",
        }}
        className="dashboard-shell"
      >
        {!sidebarHidden && <DashboardSidebar />}
        <main style={{ minWidth: 0, padding: "var(--space-8) 0" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
