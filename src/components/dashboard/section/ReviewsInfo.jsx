"use client";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import DashboardNavigation from "../header/DashboardNavigation";
import ReviewComment from "../element/ReviewComment";
import useConvexUser from "@/hook/useConvexUser";

const TABS = ["Services", "Project", "Jobs"];

// Map review orderType to tab index
const getTabForReview = (review) => {
  const orderType = review?.orderType ?? "";
  if (orderType === "project") return 1;
  if (orderType === "job") return 2;
  return 0; // default to Services
};

export default function ReviewsInfo() {
  const [getCurrentTab, setCurrentTab] = useState(0);
  const { convexUser, isLoaded, isAuthenticated } = useConvexUser();

  const reviews = useQuery(
    api.marketplace.reviews.getByUserId,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

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
              <h2>Reviews</h2>
              <p className="text">Reviews you have received from clients and freelancers.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="packages_table table-responsive">
                <div className="navtab-style1">
                  <nav>
                    <div className="nav nav-tabs mb30">
                      {TABS.map((item, i) => (
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

                  {/* Not authenticated */}
                  {isLoaded && !isAuthenticated && (
                    <div className="text-center py-5">
                      <p className="text mb-0">Please sign in to view your reviews.</p>
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
                    <div className="text-center py-5">
                      <i className="flaticon-review-1 fz40 text mb20" />
                      <p className="text mb-0">No reviews yet for this category.</p>
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
