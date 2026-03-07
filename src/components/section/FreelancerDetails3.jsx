"use client";

import Sticky from "react-stickynode";
import useScreen from "@/hook/useScreen";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
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

function formatMonthYear(ts) {
  if (!ts) return "Present";
  return new Date(ts).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

// ---- Sidebar ----

function ProfileSidebar({ convexData }) {
  const location = convexData?.locationCity
    ? `${convexData.locationCity}${convexData.locationCountry ? `, ${convexData.locationCountry}` : ""}`
    : convexData?.locationCountry || null;

  const memberSince = convexData?.createdAt
    ? new Date(convexData.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : null;

  const languages = convexData?.languages || [];
  const skills = convexData?.skills || [];

  return (
    <>
      {/* Hourly rate + contact */}
      <div className="price-widget pt25 bdrs8 mb30">
        {convexData?.hourlyRate && (
          <h3 className="widget-title mb20">
            ${convexData.hourlyRate}
            <small className="fz15 fw500">/per hour</small>
          </h3>
        )}
        <div className="category-list mt10">
          {location && (
            <div className="d-flex align-items-center justify-content-between bdrb1 pb10 mb10">
              <span className="text">
                <i className="flaticon-place text-thm2 pe-2 vam" />
                Location
              </span>
              <span className="fw500">{location}</span>
            </div>
          )}
          {memberSince && (
            <div className="d-flex align-items-center justify-content-between bdrb1 pb10 mb10">
              <span className="text">
                <i className="flaticon-30-days text-thm2 pe-2 vam" />
                Member since
              </span>
              <span className="fw500">{memberSince}</span>
            </div>
          )}
          {languages.length > 0 && (
            <div className="d-flex align-items-center justify-content-between bdrb1 pb10 mb10">
              <span className="text">
                <i className="flaticon-translator text-thm2 pe-2 vam" />
                Languages
              </span>
              <span className="fw500">{languages.join(", ")}</span>
            </div>
          )}
          {convexData?.isVerified && (
            <div className="d-flex align-items-center justify-content-between pb10 mb10">
              <span className="text">
                <i className="flaticon-verify text-thm2 pe-2 vam" />
                Verified
              </span>
              <span className="fw500 text-success">Yes</span>
            </div>
          )}
        </div>
        {convexData?.userId && (
          <div className="d-grid mt20">
            <ContactButton recipientId={convexData.userId} className="w-100" />
          </div>
        )}
      </div>

      {/* Level badge */}
      {convexData?.level && convexData.level !== "new" && (
        <div className="ps-widget bdrs8 p30 bdr1 mb30">
          <h6 className="mb15">Seller Level</h6>
          {(() => {
            const LEVEL_CONFIG = {
              top_rated: { label: "Top Rated", color: "#1a73e8" },
              pro:       { label: "Pro",       color: "#ef2b70" },
              rising:    { label: "Rising",    color: "#22c55e" },
            };
            const cfg = LEVEL_CONFIG[convexData.level];
            if (!cfg) return null;
            return (
              <div className="d-flex align-items-center gap-2">
                <span
                  className="badge px-3 py-2 fz14 fw600"
                  style={{ backgroundColor: cfg.color, color: "#fff", borderRadius: 12 }}
                >
                  {cfg.label}
                </span>
                {convexData.level === "top_rated" && (
                  <span className="fz13 text-muted">Top 1% of sellers</span>
                )}
                {convexData.level === "pro" && (
                  <span className="fz13 text-muted">Verified professional</span>
                )}
                {convexData.level === "rising" && (
                  <span className="fz13 text-muted">Up-and-coming seller</span>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* Social links */}
      {(convexData?.websiteUrl || convexData?.linkedinUrl || convexData?.twitterUrl || convexData?.githubUrl) && (
        <div className="sidebar-widget mb30 pb20 bdrs8">
          <h4 className="widget-title">Links</h4>
          <div className="d-flex flex-column gap-2 mt15">
            {convexData.websiteUrl && (
              <a href={convexData.websiteUrl} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-2 fz14 text-thm">
                <i className="flaticon-website fz16" />
                Website
              </a>
            )}
            {convexData.linkedinUrl && (
              <a href={convexData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-2 fz14 text-thm">
                <i className="fab fa-linkedin fz16" />
                LinkedIn
              </a>
            )}
            {convexData.twitterUrl && (
              <a href={convexData.twitterUrl} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-2 fz14 text-thm">
                <i className="fab fa-twitter fz16" />
                Twitter / X
              </a>
            )}
            {convexData.githubUrl && (
              <a href={convexData.githubUrl} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-2 fz14 text-thm">
                <i className="fab fa-github fz16" />
                GitHub
              </a>
            )}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="sidebar-widget mb30 pb20 bdrs8">
          <h4 className="widget-title">Skills</h4>
          <div className="tag-list mt20">
            {skills.map((skill, i) => (
              <a key={i}>{skill}</a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ---- Gigs ----

const TIER_LABELS = { basic: "Basic", standard: "Standard", premium: "Premium" };

function GigPackageTable({ gig, recipientUserId }) {
  const packages = gig.packages;
  const { isSignedIn } = useUser();
  const gigRouter = useRouter();

  function handleContactClick(e) {
    if (!isSignedIn) {
      e.preventDefault();
      const returnUrl = typeof window !== "undefined" ? window.location.pathname : "";
      gigRouter.push(`/login?redirect_url=${encodeURIComponent(returnUrl)}`);
    }
    // signed in: Link handles navigation normally
  }

  if (!packages || packages.length === 0) return null;

  return (
    <div className="mb30">
      <h5 className="mb5">{gig.title}</h5>
      {gig.description && (
        <p className="text fz14 mb15" style={{ maxWidth: 680 }}>
          {gig.description.length > 200 ? gig.description.slice(0, 200) + "…" : gig.description}
        </p>
      )}
      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center mb-0" style={{ minWidth: 480 }}>
          <thead className="bgc-thm-light">
            <tr>
              {packages.map((pkg) => (
                <th key={pkg._id} scope="col" className="fz15 fw600 p20">
                  {TIER_LABELS[pkg.tier] || pkg.tier}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Package title */}
            <tr>
              {packages.map((pkg) => (
                <td key={pkg._id} className="fz14 fw500 p15">{pkg.title}</td>
              ))}
            </tr>
            {/* Price */}
            <tr className="bgc-light">
              {packages.map((pkg) => (
                <td key={pkg._id} className="fz20 fw700 p15 dark-color">
                  {(Number(pkg.price) || 0).toLocaleString("nl-NL", {
                    style: "currency",
                    currency: pkg.currency || "EUR",
                    maximumFractionDigits: 0,
                  })}
                </td>
              ))}
            </tr>
            {/* Delivery */}
            <tr>
              {packages.map((pkg) => (
                <td key={pkg._id} className="fz13 text p15">
                  <i className="flaticon-clock me-1" />
                  {pkg.deliveryDays} {pkg.deliveryDays === 1 ? "day" : "days"} delivery
                </td>
              ))}
            </tr>
            {/* Revisions */}
            {packages.some((p) => p.revisionCount != null) && (
              <tr>
                {packages.map((pkg) => (
                  <td key={pkg._id} className="fz13 text p15">
                    <i className="flaticon-cycle me-1" />
                    {pkg.revisionCount != null ? `${pkg.revisionCount} revision${pkg.revisionCount !== 1 ? "s" : ""}` : "—"}
                  </td>
                ))}
              </tr>
            )}
            {/* Features */}
            {packages.some((p) => p.features && p.features.length > 0) && (
              <tr>
                {packages.map((pkg) => (
                  <td key={pkg._id} className="fz13 text p15" style={{ verticalAlign: "top" }}>
                    {(pkg.features || []).map((f, i) => (
                      <div key={`${pkg._id}-f${i}`} className="d-flex align-items-center justify-content-center gap-1 mb5">
                        <i className="flaticon-check text-success fz12" />
                        <span>{String(f)}</span>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            )}
            {/* CTA row */}
            <tr>
              {packages.map((pkg) => {
                const subject = encodeURIComponent(`${gig.title} — ${TIER_LABELS[pkg.tier] || pkg.tier}`);
                const href = recipientUserId
                  ? `/dashboard/message?recipientId=${recipientUserId}&subject=${subject}`
                  : null;
                return (
                  <td key={pkg._id} className="p15">
                    {href ? (
                      <Link href={href} className="ud-btn btn-thm btn-sm w-100" onClick={handleContactClick}>
                        Contact
                        <i className="fal fa-arrow-right-long ms-1" />
                      </Link>
                    ) : (
                      <button className="ud-btn btn-thm btn-sm w-100" disabled>
                        Contact
                        <i className="fal fa-arrow-right-long ms-1" />
                      </button>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GigsSection({ freelancerProfileId, recipientUserId }) {
  const gigs = useQuery(
    api.marketplace.gigs.getByFreelancerWithPackages,
    freelancerProfileId ? { freelancerId: freelancerProfileId } : "skip"
  );

  if (!gigs || gigs.length === 0) return null;

  return (
    <div className="px30 pt30 pb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1 mb30">
      <h4 className="mb25">Services</h4>
      {gigs.map((gig, idx) => (
        <div key={gig._id}>
          {idx > 0 && <hr className="my30" />}
          <GigPackageTable gig={gig} recipientUserId={recipientUserId} />
        </div>
      ))}
    </div>
  );
}

// ---- Portfolio ----

function PortfolioSection({ userId }) {
  const projects = useQuery(
    api.marketplace.portfolio.getByUser,
    userId ? { userId } : "skip"
  );

  if (!projects || projects.length === 0) return null;

  return (
    <div className="px30 pt30 pb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1 mb30">
      <h4 className="mb25">Portfolio</h4>
      <div className="row">
        {projects.map((project) => (
          <div key={project._id} className="col-sm-6 col-lg-4 mb20">
            <div className="bdrs8 overflow-hidden bdr1">
              <div
                style={{
                  height: 140,
                  background: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span className="flaticon-photo fz30 text-muted" />
              </div>
              <div className="p15">
                <h6 className="mb5">{project.title}</h6>
                {project.description && (
                  <p
                    className="fz13 text mb10"
                    style={{
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {project.description}
                  </p>
                )}
                {(project.tags || []).length > 0 && (
                  <div className="d-flex flex-wrap gap-1 mb10">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="badge bg-light text-dark fz11">{tag}</span>
                    ))}
                  </div>
                )}
                {project.externalUrl && (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fz13 text-thm"
                  >
                    View project ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Experience ----

function ExperienceSection({ userId }) {
  const workExp = useQuery(
    api.marketplace.experience.getWorkExperience,
    userId ? { userId } : "skip"
  );
  const education = useQuery(
    api.marketplace.experience.getEducation,
    userId ? { userId } : "skip"
  );
  const certs = useQuery(
    api.marketplace.experience.getCertifications,
    userId ? { userId } : "skip"
  );

  const hasWork = workExp && workExp.length > 0;
  const hasEdu = education && education.length > 0;
  const hasCerts = certs && certs.length > 0;

  if (!hasWork && !hasEdu && !hasCerts) return null;

  return (
    <div className="px30 pt30 pb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1 mb30">
      <h4 className="mb25">Experience & Education</h4>

      {hasWork && (
        <>
          <h5 className="fz16 mb15">Work Experience</h5>
          {workExp.map((item) => (
            <div key={item._id} className="bdrb1 pb15 mb15">
              <h6 className="mb2">{item.title}</h6>
              <p className="fz14 text mb2 fw500">{item.company}</p>
              <p className="fz13 text-muted mb5">
                {formatMonthYear(item.startDate)} —{" "}
                {item.isCurrent ? "Present" : formatMonthYear(item.endDate)}
              </p>
              {item.description && <p className="fz13 text mb-0">{item.description}</p>}
            </div>
          ))}
        </>
      )}

      {hasEdu && (
        <>
          <h5 className="fz16 mb15 mt20">Education</h5>
          {education.map((item) => (
            <div key={item._id} className="bdrb1 pb15 mb15">
              <h6 className="mb2">{item.school}</h6>
              {item.degree && (
                <p className="fz14 text mb2">
                  {item.degree}{item.field ? `, ${item.field}` : ""}
                </p>
              )}
              {(item.startYear || item.endYear) && (
                <p className="fz13 text-muted mb-0">
                  {item.startYear || ""}{item.endYear ? ` — ${item.endYear}` : ""}
                </p>
              )}
            </div>
          ))}
        </>
      )}

      {hasCerts && (
        <>
          <h5 className="fz16 mb15 mt20">Certifications</h5>
          {certs.map((item) => (
            <div key={item._id} className="bdrb1 pb15 mb15">
              <h6 className="mb2">{item.name}</h6>
              {item.issuer && (
                <p className="fz14 text mb2">
                  {item.issuer}{item.year ? ` · ${item.year}` : ""}
                </p>
              )}
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="fz13 text-thm">
                  View certificate ↗
                </a>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// ---- Reviews ----

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

  const avgRating = reviews.reduce((sum, r) => sum + r.overallRating, 0) / reviews.length;

  return (
    <div className="px30 pt30 pb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1 mb30">
      <div className="product_single_content">
        <div className="mbp_pagination_comments">
          <div className="d-md-flex align-items-center mb30">
            <div className="total-review-box d-flex align-items-center text-center mb30-sm me-4">
              <div className="wrapper mx-auto">
                <div className="t-review mb5">{avgRating.toFixed(1)}</div>
                <StarRating value={Math.round(avgRating)} readOnly size="sm" />
                <p className="text mb-0 mt5 fz13">
                  {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                </p>
              </div>
            </div>
          </div>

          {reviews.map((review, idx) => (
            <div key={review._id} className={`col-md-12 ${idx > 0 ? "mt30" : ""}`}>
              <div className="bdrb1 pb30">
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

                {(review.communicationRating || review.qualityRating || review.timelinessRating || review.valueRating) && (
                  <div className="d-flex flex-wrap gap-3 mb15">
                    {review.communicationRating > 0 && (
                      <span className="fz13 text">Communication: <strong>{review.communicationRating}/5</strong></span>
                    )}
                    {review.qualityRating > 0 && (
                      <span className="fz13 text">Quality: <strong>{review.qualityRating}/5</strong></span>
                    )}
                    {review.timelinessRating > 0 && (
                      <span className="fz13 text">Timeliness: <strong>{review.timelinessRating}/5</strong></span>
                    )}
                    {review.valueRating > 0 && (
                      <span className="fz13 text">Value: <strong>{review.valueRating}/5</strong></span>
                    )}
                  </div>
                )}

                {review.content && <p className="text mb-0">{review.content}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- Main component ----

export default function FreelancerDetails3() {
  const isMatchedScreen = useScreen(1216);
  const { id } = useParams();

  const convexData = useConvexFreelancerDetail(id);
  const isLoading = convexData === undefined;

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

  if (!convexData) {
    return (
      <section className="pt10 pb90 pb30-md">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <p className="text">Freelancer not found.</p>
              <Link href="/freelancers" className="ud-btn btn-thm mt10">Browse Freelancers</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const profileImg = convexData.avatarUrl || "/images/team/default-avatar.svg";
  const profileName = convexData.displayName || "Freelancer";
  const profession = convexData.tagline || "";
  const rating = convexData.ratingAverage || 0;
  const reviewCount = convexData.ratingCount || 0;
  const location = convexData.locationCity
    ? `${convexData.locationCity}${convexData.locationCountry ? `, ${convexData.locationCountry}` : ""}`
    : convexData.locationCountry || null;
  const memberSince = convexData.createdAt
    ? new Date(convexData.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;
  const bio = convexData.bio || null;

  const sidebar = <ProfileSidebar convexData={convexData} />;

  return (
    <section className="pt10 pb90 pb30-md">
      <div className="container">
        {/* Cover image banner */}
        {convexData.coverImageUrl && (
          <div
            className="bdrs12 overflow-hidden mb30 wow fadeInUp"
            style={{ height: 220, backgroundImage: `url(${convexData.coverImageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
          />
        )}

        <div className="row wow fadeInUp">
          {/* Left column */}
          <div className="col-lg-8">
            {/* Profile header */}
            <div className="px30 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1">
              <div className="position-relative overflow-hidden d-flex align-items-center pb30 mb30 bdrb1">
                <div className="row w-100">
                  <div className="col-xl-12">
                    <div className="list-meta d-sm-flex align-items-center">
                      <a className="position-relative freelancer-single-style">
                        <span className="online" />
                        <Image
                          width={90}
                          height={90}
                          className="rounded-circle w-100 wa-sm mb15-sm"
                          src={profileImg}
                          alt={profileName}
                        />
                      </a>
                      <div className="ml20 ml0-xs">
                        <h5 className="title mb-1">{profileName}</h5>
                        {profession && <p className="mb-0">{profession}</p>}
                        {rating > 0 && (
                          <p className="mb-0 dark-color fz15 fw500 list-inline-item mb5-sm">
                            <i className="fas fa-star vam fz10 review-color me-2" />
                            {rating.toFixed(1)} ({reviewCount} reviews)
                          </p>
                        )}
                        {location && (
                          <p className="mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs">
                            <i className="flaticon-place vam fz20 me-2" />
                            {location}
                          </p>
                        )}
                        {memberSince && (
                          <p className="mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs">
                            <i className="flaticon-30-days vam fz20 me-2" />
                            Member since {memberSince}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="row">
                {rating > 0 && (
                  <div className="col-sm-6 col-xl-4">
                    <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                      <div className="icon flex-shrink-0"><span className="flaticon-goal" /></div>
                      <div className="details">
                        <h5 className="title">Rating</h5>
                        <p className="mb-0 text">{rating.toFixed(1)} ({reviewCount} reviews)</p>
                      </div>
                    </div>
                  </div>
                )}
                {convexData.hourlyRate && (
                  <div className="col-sm-6 col-xl-4">
                    <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                      <div className="icon flex-shrink-0"><span className="flaticon-dollar" /></div>
                      <div className="details">
                        <h5 className="title">Hourly Rate</h5>
                        <p className="mb-0 text">${convexData.hourlyRate}/hr</p>
                      </div>
                    </div>
                  </div>
                )}
                {convexData.totalOrders > 0 && (
                  <div className="col-sm-6 col-xl-4">
                    <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                      <div className="icon flex-shrink-0"><span className="flaticon-contract" /></div>
                      <div className="details">
                        <h5 className="title">Orders</h5>
                        <p className="mb-0 text">{convexData.totalOrders} completed</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            {bio && (
              <div className="px30 pt30 pb30 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1">
                <h4>About</h4>
                <p className="text mb-0">{bio}</p>
              </div>
            )}

            {/* Services */}
            <GigsSection freelancerProfileId={id} recipientUserId={convexData.userId} />

            {/* Portfolio */}
            <PortfolioSection userId={convexData.userId} />

            {/* Experience & Education */}
            <ExperienceSection userId={convexData.userId} />

            {/* Reviews */}
            <FreelancerReviews freelancerId={id} />
          </div>

          {/* Right sidebar */}
          <div className="col-lg-4" id="stikyContainer">
            {isMatchedScreen ? (
              <Sticky bottomBoundary="#stikyContainer">
                <div className="blog-sidebar ms-lg-auto">
                  {sidebar}
                </div>
              </Sticky>
            ) : (
              <div className="blog-sidebar ms-lg-auto">
                {sidebar}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
