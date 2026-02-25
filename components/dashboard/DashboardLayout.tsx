"use client";
import { useToggleStore } from "@/store/toggleStore";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebarNav from "./DashboardSidebarNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const isActive = useToggleStore((state) => state.isDashboardSidebarActive);

  return (
    <>
      <DashboardHeader />
      <div className="dashboard_content_wrapper">
        <div className={`dashboard dashboard_wrapper pr30 pr0-xl ${isActive ? "dsh_board_sidebar_hidden" : ""}`}>
          <DashboardSidebarNav />
          <div className="dashboard__main pl0-md">
            {children}
            <footer className="dashboard_footer pt30 pb30">
              <div className="container">
                <div className="row align-items-center justify-content-center justify-content-md-between">
                  <div className="col-auto">
                    <p className="copyright-text ff-heading mb-0">
                      &copy; SkillLinkup {new Date().getFullYear()}. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
