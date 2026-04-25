"use client";
import { useState } from "react";
import { useQuery } from "convex/react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { api } from "../../../../convex/_generated/api";
import DashboardNavigation from "../header/DashboardNavigation";
import ReviewComment from "../element/ReviewComment";
import useConvexUser from "@/hook/useConvexUser";

// Map review orderType to tab index
const getTabForReview = (review) => {
  const orderType = review?.orderType ?? "";
  if (orderType === "project") return 1;
  if (orderType === "job") return 2;
  return 0; // default to Services
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

  // Group reviews by tab
  const groupedReviews = {
    0: [], // Services
    1: [], // Project
    2: [], // Jobs
  };

  if (reviews && Array.isArray(reviews)) {
    reviews.forEach((review) => {
      const tabIndex = getTabForReview(review);
      groupedReviews[tabIndex].push(review);
    });
  }

  const currentReviews = groupedReviews[getCurrentTab] ?? [];

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>{t("title")}</h2>
              <p className="text">{t("pageDescription")}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden relative">
              <div className="packages_table table-responsive">
                <div className="navtab-style1">
                  <nav>
                    <div className="nav nav-tabs mb30">
                      {tabs.map((item, i) => (
                        <button
                          onClick={() => setCurrentTab(i)}
                          key={i}
                          className={`nav-link fw500 ps-0 ${
                            getCurrentTab === i ? "active" : ""
                          }`}
                        >
                          {item}
                          {reviews && Array.isArray(reviews) && groupedReviews[i].length > 0 && (
                            <span className="ms-1 fz12 text">
                              ({groupedReviews[i].length})
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </nav>

                  {/* Still loading Convex user */}
                  {isAuthenticated && convexUser === undefined && (
                    <div className="text-center py-5">
                      <div className="spinner-border spinner-border-sm text-success" role="status" />
                    </div>
                  )}

                  {/* Clerk authenticated but not yet in Convex */}
                  {isAuthenticated && convexUser === null && (
                    <div className="text-center py-5">
                      <p className="text mb-0">{t("settingUpAccount")}</p>
                    </div>
                  )}

                  {/* Not authenticated */}
                  {isLoaded && !isAuthenticated && (
                    <div className="text-center py-5">
                      <p className="text mb-0">{t("signInPrompt")}</p>
                    </div>
                  )}

                  {/* Loading state */}
                  {isAuthenticated && reviews === undefined && (
                    <div className="text-center py-5">
                      <div className="spinner-border text-thm" role="status" />
                    </div>
                  )}

                  {/* Empty state */}
                  {reviews !== undefined && currentReviews.length === 0 && (
                    <div style={{ textAlign: "center", padding: "var(--space-12) var(--space-4)" }}>
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          margin: "0 auto var(--space-4)",
                          borderRadius: "var(--radius-lg)",
                          background: "var(--primary-50)",
                          color: "var(--primary-700)",
                          display: "grid",
                          placeItems: "center",
                          fontSize: 28,
                        }}
                      >
                        <i className="flaticon-review-1" />
                      </div>
                      <p
                        className="body-md"
                        style={{ color: "var(--text-secondary)", margin: 0, marginBottom: "var(--space-5)" }}
                      >
                        {t("noReviewsYet")}
                      </p>
                      <Link href="/online/freelancers" className="btn btn--secondary btn--sm">
                        {t("browseFreelancers", { default: "Browse freelancers" })}
                      </Link>
                    </div>
                  )}

                  {/* Reviews list */}
                  {currentReviews.length > 0 &&
                    currentReviews.map((review, i) => (
                      <div key={review._id} className="col-md-12">
                        <ReviewComment
                          review={review}
                          i={i}
                          lenght={currentReviews.length}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
