"use client";

import FreelancerAbout1 from "../element/FreelancerAbout1";
import FreelancerSkill1 from "../element/FreelancerSkill1";
import Sticky from "react-stickynode";

import useScreen from "@/hook/useScreen";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import useConvexFreelancerDetail from "@/hook/useConvexFreelancerDetail";
import ContactButton from "@/components/ui/ContactButton";
import StarRating from "@/components/ui/StarRating";

function formatReviewDate(timestamp) {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function FreelancerReviews({ freelancerId }) {
  const reviews = useQuery(
    api.marketplace.reviews.getByFreelancer,
    freelancerId ? { freelancerId, limit: 10 } : "skip"
  );

  if (reviews === undefined) {
    return (
      <div className="px30 pt30 pb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1 mb30">
        <h4>Reviews</h4>
        <p className="text fz14">Loading reviews...</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="px30 pt30 pb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1 mb30">
        <h4>Reviews</h4>
        <p className="text fz14">No reviews yet. Be the first to leave a review after completing an order.</p>
      </div>
    );
  }

  const totalRating = reviews.reduce((sum, r) => sum + r.overallRating, 0);
  const avgRating = totalRating / reviews.length;

  return (
    <div className="px30 pt30 pb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1 mb30">
      <div className="product_single_content">
        <div className="mbp_pagination_comments">
          {/* Summary row */}
          <div className="d-md-flex align-items-center mb30">
            <div className="total-review-box d-flex align-items-center text-center mb30-sm me-4">
              <div className="wrapper mx-auto">
                <div className="t-review mb5">{avgRating.toFixed(1)}</div>
                <StarRating value={Math.round(avgRating)} readOnly size="sm" />
                <p className="text mb-0 mt5 fz13">{reviews.length} {reviews.length === 1 ? "review" : "reviews"}</p>
              </div>
            </div>
          </div>

          {/* Individual reviews */}
          {reviews.map((review, idx) => (
            <div key={review._id} className={`col-md-12 ${idx > 0 ? "mt30" : ""}`}>
              <div className="bdrb1 pb30">
                {/* Reviewer info */}
                <div className="mbp_first position-relative d-flex align-items-center justify-content-start mb15">
                  {review.reviewerAvatar ? (
                    <Image
                      height={50}
                      width={50}
                      src={review.reviewerAvatar}
                      className="rounded-circle mr-3"
                      alt={review.reviewerName || "Reviewer"}
                    />
                  ) : (
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center bgc-thm-light mr-3 flex-shrink-0"
                      style={{ width: 50, height: 50 }}
                    >
                      <i className="flaticon-user fz20 text-thm" />
                    </div>
                  )}
                  <div className="ml15">
                    <h6 className="mt-0 mb-0 fz15">{review.reviewerName || "Anonymous"}</h6>
                    <div className="d-flex align-items-center gap-2 mt2">
                      <StarRating value={review.overallRating} readOnly size="sm" />
                      <span className="fz13 text">{formatReviewDate(review.createdAt)}</span>
                    </div>
                    {review.orderTitle && (
                      <p className="mb-0 fz12 text mt2">
                        <i className="flaticon-receipt fz12 vam me-1" />
                        {review.orderTitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Sub-ratings */}
                {(review.communicationRating || review.qualityRating || review.timelinessRating || review.valueRating) && (
                  <div className="d-flex flex-wrap gap-3 mb15">
                    {review.communicationRating > 0 && (
                      <span className="fz13 text">
                        Communication: <strong>{review.communicationRating}/5</strong>
                      </span>
                    )}
                    {review.qualityRating > 0 && (
                      <span className="fz13 text">
                        Quality: <strong>{review.qualityRating}/5</strong>
                      </span>
                    )}
                    {review.timelinessRating > 0 && (
                      <span className="fz13 text">
                        Timeliness: <strong>{review.timelinessRating}/5</strong>
                      </span>
                    )}
                    {review.valueRating > 0 && (
                      <span className="fz13 text">
                        Value: <strong>{review.valueRating}/5</strong>
                      </span>
                    )}
                  </div>
                )}

                {/* Review text */}
                {review.content && (
                  <p className="text mb-0">{review.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FreelancerDetail3() {
  const isMatchedScreen = useScreen(1216);
  const { id } = useParams();

  // The id param is a Convex document ID for freelancerProfiles
  const convexData = useConvexFreelancerDetail(id);

  // convexData === undefined means still loading
  // convexData === null means not found in Convex
  const isLoading = convexData === undefined;

  const data = !isLoading
    ? convexData
      ? {
          _id: convexData._id,
          img: convexData.avatarUrl || "/images/team/fl-1.png",
          name: convexData.displayName || "Freelancer",
          profession: convexData.tagline || "Professional",
          rating: convexData.ratingAverage || 0,
          reviews: convexData.ratingCount || 0,
          location: convexData.locationCity
            ? `${convexData.locationCity}, ${convexData.locationCountry || ""}`
            : convexData.locationCountry || "Remote",
          memberSince: convexData.createdAt
            ? new Date(convexData.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : null,
          bio: convexData.bio || null,
          skills: convexData.skills || [],
          hourlyRate: convexData.hourlyRate || null,
        }
      : null
    : null;

  // Loading state
  if (isLoading) {
    return (
      <section className="pt10 pb90 pb30-md">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <p className="text">Loading freelancer profile...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const profileImg = data?.img || "/images/team/fl-1.png";
  const profileName = data?.name || "Freelancer";
  const profession = data?.profession || "";
  const rating = data?.rating ?? 0;
  const reviewCount = data?.reviews ?? 0;
  const location = data?.location || "";
  const memberSince = data?.memberSince || null;
  const bio = data?.bio || null;

  // The id in the URL is the freelancerProfiles document ID
  const freelancerProfileId = id;

  return (
    <>
      <section className="pt10 pb90 pb30-md">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-8">
              <div className="px30 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1">
                <div className="position-relative overflow-hidden d-flex align-items-center pb30 mb30 bdrb1 ">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="position-relative">
                        <div className="list-meta d-sm-flex align-items-center">
                          <a
                            className="position-relative freelancer-single-style"
                            href="#"
                          >
                            <span className="online"></span>
                            <Image
                              width={90}
                              height={90}
                              className="rounded-circle w-100 wa-sm mb15-sm"
                              src={profileImg}
                              alt="Freelancer Photo"
                            />
                          </a>
                          <div className="ml20 ml0-xs">
                            <h5 className="title mb-1">{profileName}</h5>
                            {profession && <p className="mb-0">{profession}</p>}
                            {rating > 0 && (
                              <p className="mb-0 dark-color fz15 fw500 list-inline-item mb5-sm">
                                <i className="fas fa-star vam fz10 review-color me-2"></i>{" "}
                                {rating.toFixed(1)} ({reviewCount} reviews)
                              </p>
                            )}
                            {location && (
                              <p className="mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs">
                                <i className="flaticon-place vam fz20 me-2"></i>{" "}
                                {location}
                              </p>
                            )}
                            {memberSince && (
                              <p className="mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs">
                                <i className="flaticon-30-days vam fz20 me-2"></i>{" "}
                                Member since {memberSince}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {rating > 0 && (
                    <div className="col-sm-6 col-xl-4">
                      <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                        <div className="icon flex-shrink-0">
                          <span className="flaticon-goal" />
                        </div>
                        <div className="details">
                          <h5 className="title">Rating</h5>
                          <p className="mb-0 text">
                            {rating.toFixed(1)} ({reviewCount} reviews)
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {data?.hourlyRate && (
                    <div className="col-sm-6 col-xl-4">
                      <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                        <div className="icon flex-shrink-0">
                          <span className="flaticon-dollar" />
                        </div>
                        <div className="details">
                          <h5 className="title">Hourly Rate</h5>
                          <p className="mb-0 text">${data.hourlyRate}/hr</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {bio && (
                <div className="service-about">
                  <div className="px30 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1">
                    <h4>Description</h4>
                    <p className="text mb30">{bio}</p>
                  </div>
                </div>
              )}

              {/* Public reviews section */}
              {freelancerProfileId && (
                <FreelancerReviews freelancerId={freelancerProfileId} />
              )}
            </div>
            <div className="col-lg-4" id="stikyContainer">
              {isMatchedScreen ? (
                <Sticky bottomBoundary="#stikyContainer">
                  <div className="blog-sidebar ms-lg-auto">
                    <FreelancerAbout1 />
                    <FreelancerSkill1 />
                    {convexData?.userId && (
                      <div className="mt20">
                        <ContactButton recipientId={convexData.userId} className="w-100" />
                      </div>
                    )}
                  </div>
                </Sticky>
              ) : (
                <div className="blog-sidebar ms-lg-auto">
                  <FreelancerAbout1 />
                  <FreelancerSkill1 />
                  {convexData?.userId && (
                    <div className="mt20">
                      <ContactButton recipientId={convexData.userId} className="w-100" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
