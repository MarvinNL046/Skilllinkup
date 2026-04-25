"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import DashboardNavigation from "../header/DashboardNavigation";
import ProfileDetails from "./ProfileDetails";
import PortfolioTab from "./PortfolioTab";
import ExperienceTab from "./ExperienceTab";
import SettingsTab from "./SettingsTab";
import useConvexProfile from "@/hook/useConvexProfile";

export default function MyProfileInfo() {
  const t = useTranslations("myProfile");

  const TABS = [
    { key: "profile", label: t("tabProfile") },
    { key: "portfolio", label: t("tabPortfolio") },
    { key: "experience", label: t("tabExperience") },
    { key: "settings", label: t("tabSettings") },
  ];
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "profile";
  const { profile } = useConvexProfile();

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
          <div className="dashboard_title_area flex items-center justify-between">
            <div>
              <h2>{t("title")}</h2>
              <p className="text">{t("manageProfile")}</p>
            </div>
            {profile?._id && (
              <Link
                href={`/online/freelancer/${profile.slug || profile._id}`}
                className="ud-btn btn-white bdrs8"
                target="_blank"
              >
                {t("viewLiveProfile")} <i className="fal fa-external-link ms-1" />
              </Link>
            )}
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
          {activeTab === "settings" && <SettingsTab />}
        </div>
      </div>
    </div>
  );
}
