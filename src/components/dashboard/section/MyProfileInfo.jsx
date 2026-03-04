"use client";
import { useSearchParams, useRouter } from "next/navigation";
import DashboardNavigation from "../header/DashboardNavigation";
import ProfileDetails from "./ProfileDetails";
import PortfolioTab from "./PortfolioTab";
import ExperienceTab from "./ExperienceTab";

const TABS = [
  { key: "profile", label: "Profile" },
  { key: "portfolio", label: "Portfolio" },
  { key: "experience", label: "Experience" },
  { key: "settings", label: "Settings" },
];

export default function MyProfileInfo() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "profile";

  const setTab = (key) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", key);
    router.push(`/my-profile?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-9">
          <div className="dashboard_title_area">
            <h2>My Profile</h2>
            <p className="text">Manage your profile, portfolio, and settings.</p>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="row mb20">
        <div className="col-xl-12">
          <div className="navtab-style1">
            <nav>
              <div className="nav nav-tabs">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    className={`nav-link fw500 ps-0 ${activeTab === tab.key ? "active" : ""}`}
                    onClick={() => setTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="row">
        <div className="col-xl-12">
          {activeTab === "profile" && <ProfileDetails />}
          {activeTab === "portfolio" && <PortfolioTab />}
          {activeTab === "experience" && <ExperienceTab />}
          {activeTab === "settings" && (
            <div className="ps-widget bgc-white bdrs4 p30 mb30">
              <p className="text fz15">Settings tab — coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
