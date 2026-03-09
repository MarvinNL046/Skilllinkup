"use client";
import useConvexPlatforms from "@/hook/useConvexPlatforms";
import PlatformCard from "@/components/card/PlatformCard";
import EmptyState from "@/components/ui/EmptyState";
import { useTranslations } from "next-intl";

export default function PlatformListing() {
  const t = useTranslations("platformsListing");
  const tc = useTranslations("common");
  const platforms = useConvexPlatforms("en");

  return (
    <section className="pt30 pb90">
      <div className="container">
        {/* Section header */}
        <div className="row mb40">
          <div className="col-12">
            <h2 className="title mb5">{t("heading")}</h2>
            <p className="body-color">
              {t("subheading")}
            </p>
          </div>
        </div>

        {/* Loading state */}
        {platforms === undefined && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">{tc("loading")}</span>
            </div>
            <p className="body-color mt-3">{tc("loading")}</p>
          </div>
        )}

        {/* Empty state */}
        {platforms !== undefined && platforms.length === 0 && (
          <EmptyState
            title={t("noPlatforms")}
            description={t("noPlatformsDescription")}
          />
        )}

        {/* Platform grid */}
        {platforms !== undefined && platforms.length > 0 && (
          <div className="row">
            {platforms.map((platform) => (
              <div key={platform._id} className="col-md-6 col-xl-4 mb25">
                <PlatformCard data={platform} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
