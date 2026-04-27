"use client";
import DashboardNavigation from "../header/DashboardNavigation";
import DashboardTabs from "../element/DashboardTabs";
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { useTranslations } from "next-intl";
import { api } from "../../../../convex/_generated/api";
import useConvexUser from "@/hook/useConvexUser";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Bookmark } from "lucide-react";

const TAB_TYPES = ["gig", "project", "job"];

export default function SavedInfo() {
  const t = useTranslations("saved");
  const [getCurrentTab, setCurrentTab] = useState(0);
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();

  const tabs = [t("tabServices"), t("tabProjects"), t("tabJobs")];
  const emptyMessages = [t("noSavedServices"), t("noSavedProjects"), t("noSavedJobs")];
  const browseLabels = [t("browseServices"), t("browseProjects"), t("browseJobs")];
  const browsePaths = ["/online/services", "/online/projects", "/online/jobs"];

  const savedItems = useQuery(
    api.marketplace.savedItems.list,
    isAuthenticated ? {} : "skip"
  );

  const removeItem = useMutation(api.marketplace.savedItems.remove);
  const [removingId, setRemovingId] = useState(null);

  const handleRemove = async (itemId) => {
    if (!convexUser?._id) return;
    setRemovingId(itemId);
    try {
      await removeItem({ itemId: String(itemId) });
    } catch (err) {
      console.error("Failed to remove saved item:", err);
    } finally {
      setRemovingId(null);
    }
  };

  const currentType = TAB_TYPES[getCurrentTab];
  const currentItems =
    savedItems && Array.isArray(savedItems)
      ? savedItems.filter((item) => item.itemType === currentType)
      : [];

  const countByType = (type) =>
    savedItems && Array.isArray(savedItems)
      ? savedItems.filter((item) => item.itemType === type).length
      : 0;

  return (
    <div className="dashboard__content hover-bgc-color">
      <DashboardNavigation />
      <div className="dashboard_title_area mb-6">
        <h2>{t("title")}</h2>
        <p className="text-[var(--text-secondary)]">{t("pageDescription")}</p>
      </div>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="mb-5">
            <DashboardTabs
              value={getCurrentTab}
              onChange={setCurrentTab}
              ariaLabel={t("title")}
              options={tabs.map((label, i) => ({
                value: i,
                label,
                count: savedItems !== undefined ? countByType(TAB_TYPES[i]) : undefined,
              }))}
            />
          </div>

          {isLoaded && !isAuthenticated && (
            <p className="text-center text-[var(--text-secondary)] py-12">
              {t("signInPrompt")}
            </p>
          )}

          {isAuthenticated && convexUser === undefined && (
            <div className="flex justify-center py-8">
              <div
                role="status"
                aria-label="Loading"
                className="h-6 w-6 animate-spin rounded-full border-3 border-[var(--border-subtle)] border-t-primary"
              />
            </div>
          )}

          {isAuthenticated && convexUser === null && (
            <p className="text-center text-[var(--text-secondary)] py-8">
              {t("settingUpAccount")}
            </p>
          )}

          {isAuthenticated &&
            convexUser !== undefined &&
            convexUser !== null &&
            savedItems === undefined && (
              <div className="flex justify-center py-12">
                <div
                  role="status"
                  aria-label="Loading"
                  className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border-subtle)] border-t-primary"
                />
              </div>
            )}

          {savedItems !== undefined && currentItems.length === 0 && (
            <div className="text-center py-12">
              <Bookmark className="h-10 w-10 text-[var(--text-tertiary)] mx-auto mb-4" />
              <p className="text-[var(--text-secondary)] mb-5">
                {emptyMessages[getCurrentTab]}
              </p>
              <Button asChild>
                <Link href={browsePaths[getCurrentTab]}>
                  {browseLabels[getCurrentTab]}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}

          {currentItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {currentItems.map((item) => (
                <Card key={item._id} className="overflow-hidden">
                  {item.itemImage && (
                    <div className="relative h-48">
                      <Image
                        fill
                        src={item.itemImage}
                        alt={item.itemTitle ?? t("savedItem")}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <Badge variant="muted" className="mb-3">
                      {item.itemType}
                    </Badge>
                    <h6 className="text-base font-semibold mb-3">
                      {item.itemUrl ? (
                        <Link href={item.itemUrl} className="hover:text-primary">
                          {item.itemTitle ?? t("untitled")}
                        </Link>
                      ) : (
                        item.itemTitle ?? t("untitled")
                      )}
                    </h6>
                    <div className="flex items-center justify-between gap-2 mt-4">
                      {item.itemUrl && (
                        <Button asChild variant="outline" size="sm">
                          <Link href={item.itemUrl}>{t("view")}</Link>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ms-auto"
                        onClick={() => handleRemove(item.itemId)}
                        disabled={removingId === item.itemId}
                      >
                        {removingId === item.itemId ? (
                          <span
                            role="status"
                            aria-label="Loading"
                            className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--border-subtle)] border-t-primary"
                          />
                        ) : (
                          <>
                            <Heart className="mr-1 h-4 w-4" />
                            {t("remove")}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
