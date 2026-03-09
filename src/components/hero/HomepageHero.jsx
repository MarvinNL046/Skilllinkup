"use client";
import WorldCard from "@/components/card/WorldCard";
import SearchBarWithDropdown from "@/components/ui/SearchBarWithDropdown";
import { useTranslations } from "next-intl";

const worlds = [
  {
    icon: "flaticon-web",
    titleKey: "onlineMarketplace",
    descKey: "onlineMarketplaceDesc",
    href: "/online",
    color: "#ef2b70",
  },
  {
    icon: "flaticon-place",
    titleKey: "localMarketplace",
    descKey: "localMarketplaceDesc",
    href: "/local",
    color: "#1e1541",
  },
  {
    icon: "flaticon-briefcase",
    titleKey: "jobsTitle",
    descKey: "jobsDesc",
    href: "/jobs",
    color: "#22c55e",
  },
];

export default function HomepageHero() {
  const t = useTranslations("home");

  return (
    <section className="hero-home13 at-home20 overflow-hidden pt60 pb40">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center mb40">
            <h1 className="hero-title animate-up-1 mb15">
              {t("heroTitle").split(",")[0]}, <span style={{ color: "#ef2b70" }}>{t("heroTitle").split(",")[1]?.trim()}</span>
            </h1>
            <p className="hero-text fz17 animate-up-2">
              {t("heroSubtitle")}
            </p>
          </div>
        </div>
        <div className="row justify-content-center animate-up-3 mb40">
          <div className="col-auto" style={{ maxWidth: 580, width: "100%" }}>
            <SearchBarWithDropdown />
          </div>
        </div>
        <div className="row animate-up-3">
          {worlds.map((w) => (
            <WorldCard
              key={w.href}
              icon={w.icon}
              title={t(w.titleKey)}
              description={t(w.descKey)}
              href={w.href}
              color={w.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
