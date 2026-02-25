"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import toggleStore from "@/store/toggleStore";
import useConvexUser from "@/hook/useConvexUser";
import DashboardHeader from "./header/DashboardHeader";
import DashboardSidebar from "./sidebar/DashboardSidebar";
import DashboardFooter from "./footer/DashboardFooter";

export default function DashboardLayout({ children }) {
  const isActive = toggleStore((state) => state.isDasboardSidebarActive);
  const router = useRouter();
  const pathname = usePathname();
  const { convexUser } = useConvexUser();

  // Redirect to onboarding if user has no userType set
  useEffect(() => {
    if (
      convexUser &&
      !convexUser.userType &&
      pathname !== "/onboarding"
    ) {
      router.replace("/onboarding");
    }
  }, [convexUser, pathname, router]);

  return (
    <>
      <DashboardHeader />
      <div className="dashboard_content_wrapper">
        <div
          className={`dashboard dashboard_wrapper pr30 pr0-xl ${
            isActive ? "dsh_board_sidebar_hidden" : ""
          }`}
        >
          <DashboardSidebar />
          <div className="dashboard__main pl0-md">
            {children}
            <DashboardFooter />
          </div>
        </div>
      </div>
    </>
  );
}
