"use client";
import { useState } from "react";
import { useQuery } from "convex/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { api } from "../../../../convex/_generated/api";
import DashboardNavigation from "../header/DashboardNavigation";
import DashboardTabs from "../element/DashboardTabs";
import ReviewComment from "../element/ReviewComment";
import useConvexUser from "@/hook/useConvexUser";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const getTabForReview = (review) => {
  const orderType = review?.orderType ?? "";
  if (orderType === "project") return 1;
  if (orderType === "job") return 2;
  return 0;
};

export default function ReviewsInfo() {
  const t = useTranslations("reviews");
  const [getCurrentTab, setCurrentTab] = useState(0);
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();

  const reviews = useQuery(
    api.marketplace.reviews.getByUserId,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  const tabs = [t("tabServices"), t("tabProject"), t("tabJobs")];

  const groupedReviews = { 0: [], 1: [], 2: [] };
  if (reviews && Array.isArray(reviews)) {
    reviews.forEach((review) => {
      const tabIndex = getTabForReview(review);
      groupedReviews[tabIndex].push(review);
    });
  }

  const currentReviews = groupedReviews[getCurrentTab] ?? [];

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
                count:
                  reviews !== undefined && Array.isArray(reviews)
                    ? groupedReviews[i].length
                    : undefined,
              }))}
            />
          </div>

          {isAuthenticated && convexUser === undefined && (
            <div className="flex justify-center py-12">
              <div
                role="status"
                aria-label="Loading"
                className="h-6 w-6 animate-spin rounded-full border-3 border-[var(--border-subtle)] border-t-primary"
              />
            </div>
          )}

          {isAuthenticated && convexUser === null && (
            <p className="text-center text-[var(--text-secondary)] py-12">
              {t("settingUpAccount")}
            </p>
          )}

          {isLoaded && !isAuthenticated && (
            <p className="text-center text-[var(--text-secondary)] py-12">
              {t("signInPrompt")}
            </p>
          )}

          {isAuthenticated && reviews === undefined && (
            <div className="flex justify-center py-12">
              <div
                role="status"
                aria-label="Loading"
                className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border-subtle)] border-t-primary"
              />
            </div>
          )}

          {reviews !== undefined && currentReviews.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Star className="h-6 w-6" />
              </div>
              <p className="text-[var(--text-secondary)] mb-5">{t("noReviewsYet")}</p>
              <Button asChild variant="outline" size="sm">
                <Link href="/online/freelancers">Browse freelancers</Link>
              </Button>
            </div>
          )}

          {currentReviews.length > 0 && (
            <div className="space-y-4">
              {currentReviews.map((review, i) => (
                <ReviewComment
                  key={review._id}
                  review={review}
                  i={i}
                  lenght={currentReviews.length}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
