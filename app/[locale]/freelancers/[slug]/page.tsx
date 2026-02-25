import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ServiceCard from "@/components/marketplace/ServiceCard";
import { safeArray, safeImage, safeNumber, safeText } from "@/lib/safe";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function FreelancerDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "freelancers" });

  type ConvexProfile = Awaited<
    ReturnType<typeof fetchQuery<typeof api.marketplace.freelancers.getByUserId>>
  >;

  let profile: ConvexProfile = null;

  try {
    profile = await fetchQuery(api.marketplace.freelancers.getByUserId, {
      userId: slug as Id<"users">,
    });
  } catch (error) {
    console.error("Error fetching freelancer profile:", error);
  }

  if (!profile) {
    notFound();
  }

  type ConvexGig = Awaited<
    ReturnType<typeof fetchQuery<typeof api.marketplace.gigs.getByFreelancer>>
  >[number];

  let rawGigs: ConvexGig[] = [];
  try {
    rawGigs = await fetchQuery(api.marketplace.gigs.getByFreelancer, {
      freelancerId: profile._id,
      locale,
    });
  } catch (error) {
    console.error("Error fetching freelancer gigs:", error);
  }

  type ConvexReview = Awaited<
    ReturnType<typeof fetchQuery<typeof api.marketplace.freelancers.getReviews>>
  >[number];

  let rawReviews: ConvexReview[] = [];
  try {
    rawReviews = await fetchQuery(api.marketplace.freelancers.getReviews, {
      freelancerId: profile._id,
      limit: 6,
    });
  } catch (error) {
    console.error("Error fetching freelancer reviews:", error);
  }

  const services = rawGigs.map((gig) => ({
    slug: gig.slug,
    title: gig.title,
    category: gig.category?.name ?? "Service",
    categorySlug: gig.category?.slug ?? "service",
    image: gig.firstImage?.imageUrl ?? "/images/listings/ct-s-1.jpg",
    rating: Number(gig.ratingAverage ?? 0),
    reviewCount: Number(gig.ratingCount ?? 0),
    freelancerName: profile.displayName ?? "Freelancer",
    freelancerAvatar: profile.avatarUrl ?? null,
    priceFrom: Number(gig.minPrice ?? 0),
    locationCountry: gig.locationCountry ?? profile.locationCountry ?? null,
  }));

  const displayName = safeText(profile.displayName, "Unknown");
  const tagline = safeText(profile.tagline ?? "", "");
  const bio = safeText(profile.bio ?? "", "");
  const avatarUrl = safeImage(profile.avatarUrl ?? "", "/images/resource/user.png");
  const coverUrl = safeImage(
    profile.coverImageUrl ?? "",
    "/images/background/cta-service-v3-bg.jpg"
  );
  const skills = safeArray<string>(profile.skills ?? []);
  const languages = safeArray<string>(profile.languages ?? []);
  const portfolioUrls = safeArray<string>(profile.portfolioUrls ?? []);
  const rating = safeNumber(profile.ratingAverage ?? 0, 0);
  const ratingCount = safeNumber(profile.ratingCount ?? 0, 0);
  const totalOrders = safeNumber(profile.totalOrders ?? 0, 0);
  const completionRate = safeNumber(profile.completionRate ?? 0, 0);
  const responseTimeHours =
    profile.responseTimeHours != null ? safeNumber(profile.responseTimeHours, 0) : null;
  const hourlyRate = profile.hourlyRate != null ? safeNumber(profile.hourlyRate, 0) : null;
  const locationCity = safeText(profile.locationCity ?? "", "");
  const locationCountry = safeText(profile.locationCountry ?? "", "");
  const workType = safeText(profile.workType ?? "", "remote");
  const showLocation =
    (workType === "local" || workType === "hybrid") && (locationCity || locationCountry);
  const locationText = [locationCity, locationCountry].filter(Boolean).join(", ");
  const websiteUrl = safeText(profile.websiteUrl ?? "", "");
  const linkedinUrl = safeText(profile.linkedinUrl ?? "", "");

  const memberSince = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString(
        locale === "nl" ? "nl-NL" : "en-US",
        {
          year: "numeric",
          month: "long",
        }
      )
    : null;

  const reviews = rawReviews.map((review) => ({
    id: String(review._id),
    reviewerName: safeText(review.reviewerName ?? "", "Client"),
    reviewerAvatar: safeImage(review.reviewerAvatar ?? "", "/images/resource/user.png"),
    overallRating: safeNumber(review.overallRating ?? 0, 0),
    content: safeText(review.content ?? "", ""),
    createdAt: review.createdAt
      ? new Date(review.createdAt).toLocaleDateString(
          locale === "nl" ? "nl-NL" : "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        )
      : "",
  }));

  return (
    <>
      <Breadcrumb title="Freelancer Details" brief={displayName} />
      <section className="pt30 pb90">
        <div className="container">
          <div className="row wrap">
            <div className="col-lg-8">
              <div className="default-box-shadow1 bdrs12 bg-white mb30">
                <div className="position-relative">
                  <Image
                    width={1100}
                    height={360}
                    className="w-100 bdrs12"
                    src={coverUrl}
                    alt={`${displayName} cover`}
                  />
                  <div className="position-absolute" style={{ left: 30, bottom: -40 }}>
                    <span className="position-relative">
                      <Image
                        width={90}
                        height={90}
                        className="rounded-circle"
                        src={avatarUrl}
                        alt={displayName}
                      />
                      {profile.isVerified && <span className="online-badge" />}
                    </span>
                  </div>
                </div>
                <div className="px30 pb30 pt60">
                  <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
                    <div>
                      <h2 className="mb-1">{displayName}</h2>
                      <p className="mb-0 text">{tagline || t("taglineFallback")}</p>
                    </div>
                    <div className="d-flex align-items-center mt15 mt-md-0">
                      <div className="review-meta me-3">
                        <i className="fas fa-star fz10 review-color me-2" />
                        <span className="dark-color fw500">{rating.toFixed(1)}</span>
                        <span className="text ms-2">({ratingCount} reviews)</span>
                      </div>
                      {profile.isVerified && (
                        <span className="tag">{t("verified")}</span>
                      )}
                    </div>
                  </div>
                  <div className="list-meta mt30">
                    {showLocation && (
                      <p className="mb-0 dark-color fz14 list-inline-item mb5-sm">
                        <i className="flaticon-maps-and-flags vam fz20 me-2" />
                        {locationText}
                      </p>
                    )}
                    {responseTimeHours !== null && (
                      <p className="mb-0 dark-color fz14 list-inline-item mb5-sm">
                        <i className="flaticon-goal vam fz20 me-2" />
                        {t("responseTime")} {responseTimeHours} {t("hours")}
                      </p>
                    )}
                    {completionRate > 0 && (
                      <p className="mb-0 dark-color fz14 list-inline-item mb5-sm">
                        <i className="flaticon-checkmark vam fz20 me-2" />
                        {completionRate}% {t("completionRate")}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {bio && (
                <div className="px30 bdr1 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                  <h4>{t("aboutMe")}</h4>
                  <p className="text mb30">{bio}</p>
                </div>
              )}

              {skills.length > 0 && (
                <div className="px30 bdr1 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                  <h4>{t("skills")}</h4>
                  <div className="d-flex flex-wrap gap-2 mb30">
                    {skills.map((skill) => (
                      <span key={skill} className="tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {portfolioUrls.length > 0 && (
                <div className="px30 bdr1 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                  <h4>{t("portfolio")}</h4>
                  <div className="list-style1 mb30">
                    {portfolioUrls.map((url) => (
                      <div key={url} className="mb10">
                        <i className="far fa-link me-2" />
                        <a className="text" href={url} target="_blank" rel="noreferrer">
                          {url}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {reviews.length > 0 && (
                <div className="px30 bdr1 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                  <h4>Reviews</h4>
                  {reviews.map((review) => (
                    <div key={review.id} className="review-list d-flex mb30">
                      <Image
                        width={60}
                        height={60}
                        className="rounded-circle"
                        src={review.reviewerAvatar}
                        alt={review.reviewerName}
                      />
                      <div className="ms-3">
                        <div className="d-flex align-items-center flex-wrap">
                          <h5 className="mb-0 me-3">{review.reviewerName}</h5>
                          <div className="review-meta">
                            <i className="fas fa-star fz10 review-color me-2" />
                            <span className="dark-color fw500">
                              {review.overallRating.toFixed(1)}
                            </span>
                            <span className="text ms-2">{review.createdAt}</span>
                          </div>
                        </div>
                        {review.content && <p className="text mt10">{review.content}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {services.length > 0 && (
                <div className="mb30">
                  <h4 className="mb20">{t("myServices")}</h4>
                  <div className="row">
                    {services.map((service) => (
                      <div key={service.slug} className="col-sm-6 mb30">
                        <ServiceCard data={service} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="col-lg-4">
              <div className="sidebar-widget mb30 bdrs12 p30 bg-white default-box-shadow1">
                <h4 className="mb20">{t("contactFreelancer")}</h4>
                <p className="text mb20">
                  {t("contactFreelancer")} {displayName}.
                </p>
                <Link href={`/${locale}/marketplace/quote-request`} className="ud-btn btn-thm w-100">
                  Start a project
                  <i className="fal fa-arrow-right-long ms-2" />
                </Link>
              </div>

              <div className="sidebar-widget mb30 bdrs12 p30 bg-white default-box-shadow1">
                <h4 className="mb20">Overview</h4>
                <ul className="list-unstyled">
                  {hourlyRate !== null && hourlyRate > 0 && (
                    <li className="d-flex justify-content-between mb15">
                      <span>{t("hourlyRate")}</span>
                      <span className="fw500">€{hourlyRate}{t("perHour")}</span>
                    </li>
                  )}
                  {totalOrders > 0 && (
                    <li className="d-flex justify-content-between mb15">
                      <span>{t("ordersCompleted")}</span>
                      <span className="fw500">{totalOrders}</span>
                    </li>
                  )}
                  {memberSince && (
                    <li className="d-flex justify-content-between mb15">
                      <span>{t("memberSince")}</span>
                      <span className="fw500">{memberSince}</span>
                    </li>
                  )}
                  <li className="d-flex justify-content-between">
                    <span>Availability</span>
                    <span className="fw500">
                      {profile.isAvailable === false ? "Busy" : "Available"}
                    </span>
                  </li>
                </ul>
              </div>

              {languages.length > 0 && (
                <div className="sidebar-widget mb30 bdrs12 p30 bg-white default-box-shadow1">
                  <h4 className="mb20">{t("languages")}</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {languages.map((lang) => (
                      <span key={lang} className="tag">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(websiteUrl || linkedinUrl) && (
                <div className="sidebar-widget bdrs12 p30 bg-white default-box-shadow1">
                  <h4 className="mb20">Links</h4>
                  <ul className="list-unstyled">
                    {websiteUrl && (
                      <li className="mb10">
                        <a className="text" href={websiteUrl} target="_blank" rel="noreferrer">
                          <i className="fab fa-chrome me-2" />
                          Website
                        </a>
                      </li>
                    )}
                    {linkedinUrl && (
                      <li>
                        <a className="text" href={linkedinUrl} target="_blank" rel="noreferrer">
                          <i className="fab fa-linkedin me-2" />
                          LinkedIn
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
