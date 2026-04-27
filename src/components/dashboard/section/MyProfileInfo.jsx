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
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <DashboardNavigation />
      <div className="dashboard_title_area mb-6">
        <div>
          <h2>{t("title")}</h2>
          <p className="text-[var(--text-secondary)]">{t("manageProfile")}</p>
        </div>
        {profile?._id && (
          <Button asChild variant="outline">
            <Link
              href={`/online/freelancer/${profile.slug || profile._id}`}
              target="_blank"
            >
              {t("viewLiveProfile")}
              <ExternalLink className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>

      {/* Tab bar */}
      <div
        role="tablist"
        aria-label={t("title")}
        className="mb-6 flex flex-wrap gap-1 border-b border-[var(--border-subtle)] overflow-x-auto"
      >
        {TABS.map((tab) => {
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => setTab(tab.key)}
              className={cn(
                "px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors min-h-[44px]",
                active
                  ? "border-primary text-primary"
                  : "border-transparent text-[var(--text-secondary)] hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "profile" && <ProfileDetails />}
        {activeTab === "portfolio" && <PortfolioTab />}
        {activeTab === "experience" && <ExperienceTab />}
        {activeTab === "settings" && <SettingsTab />}
      </div>
    </div>
  );
}
