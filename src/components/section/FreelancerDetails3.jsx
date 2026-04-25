"use client";

import Sticky from "react-stickynode";
import useScreen from "@/hook/useScreen";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useTranslations } from "next-intl";
import { Star, MapPin, Calendar, Wallet, Briefcase, CheckCircle2 } from "lucide-react";
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

function formatMonthYear(ts, presentLabel = "Present") {
  if (!ts) return presentLabel;
  return new Date(ts).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

// ---- Sidebar ----

function SidebarRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-3)",
        padding: "var(--space-3) 0",
        borderBottom: "1px solid var(--border-subtle)",
        fontSize: "var(--text-body-sm)",
      }}
    >
      <span style={{ color: "var(--text-secondary)" }}>{label}</span>
      <span style={{ color: "var(--text-primary)", fontWeight: 500, textAlign: "right" }}>
        {value}
      </span>
    </div>
  );
}

function SocialLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        padding: "var(--space-2) 0",
        color: "var(--primary-600)",
        fontSize: "var(--text-body-sm)",
        fontWeight: 500,
      }}
    >
      {children}
    </a>
  );
}

function ProfileSidebar({ convexData }) {
  const t = useTranslations("freelancerProfile");
  const location = convexData?.locationCity
    ? `${convexData.locationCity}${convexData.locationCountry ? `, ${convexData.locationCountry}` : ""}`
    : convexData?.locationCountry || null;

  const memberSince = convexData?.createdAt
    ? new Date(convexData.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : null;

  const languages = convexData?.languages || [];
  const skills = convexData?.skills || [];

  const LEVEL_CONFIG = {
    top_rated: { key: "topRated", tone: "primary", captionKey: "top1Percent" },
    pro:       { key: "pro",       tone: "accent",  captionKey: "verifiedProfessional" },
    rising:    { key: "rising",    tone: "success", captionKey: "upAndComing" },
  };
  const levelCfg = convexData?.level && convexData.level !== "new" ? LEVEL_CONFIG[convexData.level] : null;

  const hasSocial =
    convexData?.websiteUrl || convexData?.linkedinUrl ||
    convexData?.twitterUrl || convexData?.githubUrl;

  return (
    <>
      {/* Hourly rate + quick facts */}
      <div
        className="card"
        style={{ padding: "var(--space-6)", marginBottom: "var(--space-5)" }}
      >
        {convexData?.hourlyRate && (
          <div
            className="price"
            style={{
              marginBottom: "var(--space-4)",
              paddingBottom: "var(--space-4)",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-display-sm, 2.25rem)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              €{convexData.hourlyRate}
            </span>
            <span
              className="body-sm"
              style={{ color: "var(--text-tertiary)", marginLeft: 4 }}
            >
              {t("perHour")}
            </span>
          </div>
        )}
        {location && <SidebarRow label={t("location")} value={location} />}
        {memberSince && <SidebarRow label={t("memberSince")} value={memberSince} />}
        {languages.length > 0 && (
          <SidebarRow label={t("languages")} value={languages.join(", ")} />
        )}
        {convexData?.isVerified && (
          <SidebarRow
            label={t("verified")}
            value={
              <span style={{ color: "var(--success-700)" }}>
                {t("yes")}
              </span>
            }
          />
        )}
        {convexData?.userId && (
          <div style={{ marginTop: "var(--space-5)" }}>
            <ContactButton recipientId={convexData.userId} className="w-full" />
          </div>
        )}
      </div>

      {/* Seller level */}
      {levelCfg && (
        <div
          className="card"
          style={{ padding: "var(--space-6)", marginBottom: "var(--space-5)" }}
        >
          <div
            className="overline"
            style={{ color: "var(--text-tertiary)", marginBottom: "var(--space-3)" }}
          >
            {t("sellerLevel")}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>
            <span className={`tag tag--${levelCfg.tone}`}>{t(levelCfg.key)}</span>
            <span className="body-sm" style={{ color: "var(--text-tertiary)" }}>
              {t(levelCfg.captionKey)}
            </span>
          </div>
        </div>
      )}

      {/* Social links */}
      {hasSocial && (
        <div
          className="card"
          style={{ padding: "var(--space-6)", marginBottom: "var(--space-5)" }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h5)",
              fontWeight: 500,
              marginBottom: "var(--space-3)",
            }}
          >
            {t("links")}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {convexData.websiteUrl && (
              <SocialLink href={convexData.websiteUrl}>{t("website")}</SocialLink>
            )}
            {convexData.linkedinUrl && (
              <SocialLink href={convexData.linkedinUrl}>LinkedIn</SocialLink>
            )}
            {convexData.twitterUrl && (
              <SocialLink href={convexData.twitterUrl}>Twitter / X</SocialLink>
            )}
            {convexData.githubUrl && (
              <SocialLink href={convexData.githubUrl}>GitHub</SocialLink>
            )}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div
          className="card"
          style={{ padding: "var(--space-6)", marginBottom: "var(--space-5)" }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h5)",
              fontWeight: 500,
              marginBottom: "var(--space-4)",
            }}
          >
            {t("skills")}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {skills.map((skill, i) => (
              <span key={i} className="tag">{skill}</span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ---- Gigs ----

function GigPackageTable({ gig, recipientUserId }) {
  const t = useTranslations("freelancerProfile");
  const TIER_LABELS = { basic: t("basic"), standard: t("standard"), premium: t("premium") };
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
          <thead style={{ background: "var(--primary-50)" }}>
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
            <tr style={{ background: "var(--surface-2)" }}>
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
                  {pkg.deliveryDays} {pkg.deliveryDays === 1 ? t("day") : t("days")} {t("delivery")}
                </td>
              ))}
            </tr>
            {/* Revisions */}
            {packages.some((p) => p.revisionCount != null) && (
              <tr>
                {packages.map((pkg) => (
                  <td key={pkg._id} className="fz13 text p15">
                    <i className="flaticon-cycle me-1" />
                    {pkg.revisionCount != null ? `${pkg.revisionCount} ${pkg.revisionCount !== 1 ? t("revisions") : t("revision")}` : "—"}
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
                      <div key={`${pkg._id}-f${i}`} className="flex items-center justify-center gap-1 mb5">
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
                  ? `/message?recipientId=${recipientUserId}&subject=${subject}`
                  : null;
                return (
                  <td key={pkg._id} className="p15">
                    {href ? (
                      <Link href={href} className="ud-btn btn-thm btn-sm w-full" onClick={handleContactClick}>
                        {t("contact")}
                        <i className="fal fa-arrow-right-long ms-1" />
                      </Link>
                    ) : (
                      <button className="ud-btn btn-thm btn-sm w-full" disabled>
                        {t("contact")}
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
  const t = useTranslations("freelancerProfile");
  const gigs = useQuery(
    api.marketplace.gigs.getByFreelancerWithPackages,
    freelancerProfileId ? { freelancerId: freelancerProfileId } : "skip"
  );

  if (gigs === undefined) {
    return (
      <div className="card" style={{ padding: "var(--space-8)", marginBottom: "var(--space-8)" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: "var(--space-5)" }}>{t("services")}</h2>
        <p className="text fz14">{t("loadingServices")}</p>
      </div>
    );
  }

  if (gigs.length === 0) {
    return (
      <div className="card" style={{ padding: "var(--space-8)", marginBottom: "var(--space-8)" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: "var(--space-5)" }}>{t("services")}</h2>
        <p className="text fz14">{t("noServices")}</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: "var(--space-8)", marginBottom: "var(--space-8)" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: "var(--space-5)" }}>{t("services")}</h2>
      {gigs.map((gig, idx) => (
        <div key={gig._id}>
          {idx > 0 && <hr className="my30" />}
          <GigPackageTable gig={gig} recipientUserId={recipientUserId} />
        </div>
      ))}
    </div>
  );
}

// ---- Projects ----

function ProjectsSection({ userId }) {
  const t = useTranslations("freelancerProfile");
  const projects = useQuery(
    api.marketplace.projects.getPublicByClient,
    userId ? { clientId: userId } : "skip"
  );

  if (projects === undefined) {
    return (
      <div className="card" style={{ padding: "var(--space-8)", marginBottom: "var(--space-8)" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: "var(--space-5)" }}>{t("projects")}</h2>
        <p className="text fz14">{t("loadingProjects")}</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="card" style={{ padding: "var(--space-8)", marginBottom: "var(--space-8)" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: "var(--space-5)" }}>{t("projects")}</h2>
        <p className="text fz14">{t("noProjects")}</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: "var(--space-8)", marginBottom: "var(--space-8)" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: "var(--space-5)" }}>{t("projects")}</h2>
      <div className="row">
        {projects.map((project) => (
          <div key={project._id} className="col-sm-6 mb20">
            <div style={{ padding: "var(--space-5)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", height: "100%" }}>
              <h6 className="mb10">{project.title}</h6>
              <div className="flex flex-wrap gap-2 mb10">
                {project.categoryName && (
                  <span className="tag">{project.categoryName}</span>
                )}
                {(project.budgetMin || project.budgetMax) && (
                  <span className="fz13 text">
                    <i className="flaticon-dollar me-1" />
                    {project.budgetMin && project.budgetMax
                      ? `€${project.budgetMin} – €${project.budgetMax}`
                      : project.budgetMax
                        ? `${t("upTo")} €${project.budgetMax}`
                        : `${t("from")} €${project.budgetMin}`}
                  </span>
                )}
              </div>
              {project.deadline && (
                <p className="fz13 text mb5">
                  <i className="flaticon-clock me-1" />
                  {t("deadline")}: {new Date(project.deadline).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                </p>
              )}
              <p className="fz13 text mb-0">
                <i className="flaticon-contract me-1" />
                {project.bidCount} {project.bidCount === 1 ? t("bid") : t("bids")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Portfolio ----

function PortfolioSection({ userId }) {
  const t = useTranslations("freelancerProfile");
  const portfolioItems = useQuery(
    api.marketplace.portfolio.getByUser,
    userId ? { userId } : "skip"
  );

  if (portfolioItems === undefined) {
    return (
      <div className="card" style={{ padding: "var(--space-8)", marginBottom: "var(--space-8)" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: "var(--space-5)" }}>{t("portfolio")}</h2>
        <p className="text fz14">{t("loadingPortfolio")}</p>
      </div>
    );
  }

  if (portfolioItems.length === 0) {
    return (
      <div className="card" style={{ padding: "var(--space-8)", marginBottom: "var(--space-8)" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: "var(--space-5)" }}>{t("portfolio")}</h2>
        <p className="text fz14">{t("noPortfolio")}</p>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: "var(--space-8)", marginBottom: "var(--space-8)" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: "var(--space-5)" }}>{t("portfolio")}</h2>
      <div className="row">
        {portfolioItems.map((item) => (
          <div key={item._id} className="col-sm-6 col-lg-4 mb20">
            <div style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", overflow: "hidden", height: "100%" }}>
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
                <h6 className="mb5">{item.title}</h6>
                {item.description && (
                  <p
                    className="fz13 text mb10"
                    style={{
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.description}
                  </p>
                )}
                {(item.tags || []).length > 0 && (
                  <div className="flex flex-wrap gap-1 mb10">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
                {item.externalUrl && (
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fz13 text-thm"
                  >
                    {t("viewProject")} ↗
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
  const t = useTranslations("freelancerProfile");
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
    <div className="card" style={{ padding: "var(--space-8)", marginBottom: "var(--space-8)" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: "var(--space-5)" }}>{t("experienceEducation")}</h2>

      {hasWork && (
        <>
          <h5 className="fz16 mb15">{t("workExperience")}</h5>
          {workExp.map((item) => (
            <div key={item._id} className="bdrb1 pb15 mb15">
              <h6 className="mb2">{item.title}</h6>
              <p className="fz14 text mb2 fw500">{item.company}</p>
              <p className="fz13 text-muted mb5">
                {formatMonthYear(item.startDate)} —{" "}
                {item.isCurrent ? t("present") : formatMonthYear(item.endDate, t("present"))}
              </p>
              {item.description && <p className="fz13 text mb-0">{item.description}</p>}
            </div>
          ))}
        </>
      )}

      {hasEdu && (
        <>
          <h5 className="fz16 mb15 mt20">{t("education")}</h5>
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
          <h5 className="fz16 mb15 mt20">{t("certifications")}</h5>
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
                  {t("viewCertificate")} ↗
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
  const t = useTranslations("freelancerProfile");
  const reviews = useQuery(
    api.marketplace.reviews.getByFreelancer,
    freelancerId ? { freelancerId, limit: 10 } : "skip"
  );

  if (reviews === undefined) {
    return (
      <div className="card" style={{ padding: "var(--space-8)", marginBottom: "var(--space-8)" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: "var(--space-5)" }}>{t("reviews")}</h2>
        <p className="text fz14">{t("loadingReviews")}</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="card" style={{ padding: "var(--space-8)", marginBottom: "var(--space-8)" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: "var(--space-5)" }}>{t("reviews")}</h2>
        <p className="text fz14">{t("noReviews")}</p>
      </div>
    );
  }

  const avgRating = reviews.reduce((sum, r) => sum + r.overallRating, 0) / reviews.length;

  return (
    <div className="card" style={{ padding: "var(--space-8)", marginBottom: "var(--space-8)" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h3)", fontWeight: 500, letterSpacing: "-0.01em", marginBottom: "var(--space-5)" }}>{t("reviews")}</h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-5)",
          padding: "var(--space-5)",
          marginBottom: "var(--space-6)",
          background: "var(--surface-2)",
          borderRadius: "var(--radius-md)",
        }}
      >
        <div style={{ textAlign: "center", minWidth: 80 }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-display-sm, 2.25rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            {avgRating.toFixed(1)}
          </div>
          <div style={{ marginTop: 4 }}>
            <StarRating value={Math.round(avgRating)} readOnly size="sm" />
          </div>
          <p
            className="body-sm"
            style={{ color: "var(--text-tertiary)", marginTop: 4, marginBottom: 0 }}
          >
            {reviews.length} {reviews.length === 1 ? t("review") : t("reviews")}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gap: "var(--space-6)" }}>
        {reviews.map((review) => (
          <div
            key={review._id}
            style={{
              paddingBottom: "var(--space-6)",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "var(--space-3)",
                alignItems: "flex-start",
                marginBottom: "var(--space-3)",
              }}
            >
              {review.reviewerAvatar ? (
                <span className="avatar avatar--lg" style={{ flexShrink: 0 }}>
                  <Image
                    height={48}
                    width={48}
                    src={review.reviewerAvatar}
                    alt={review.reviewerName || "Reviewer"}
                  />
                </span>
              ) : (
                <span
                  className="avatar avatar--lg"
                  style={{
                    flexShrink: 0,
                    background: "var(--primary-50)",
                    color: "var(--primary-600)",
                    fontWeight: 600,
                  }}
                >
                  {(review.reviewerName || "?").slice(0, 1).toUpperCase()}
                </span>
              )}
              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  className="body-md"
                  style={{ fontWeight: 600, color: "var(--text-primary)" }}
                >
                  {review.reviewerName || t("anonymous")}
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginTop: 2 }}
                >
                  <StarRating value={review.overallRating} readOnly size="sm" />
                  <span
                    className="body-sm"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {formatReviewDate(review.createdAt)}
                  </span>
                </div>
                {review.orderTitle && (
                  <p
                    className="body-sm"
                    style={{ color: "var(--text-tertiary)", margin: "2px 0 0" }}
                  >
                    {review.orderTitle}
                  </p>
                )}
              </div>
            </div>

            {(review.communicationRating || review.qualityRating || review.timelinessRating || review.valueRating) && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--space-4)",
                  marginBottom: "var(--space-3)",
                  fontSize: "var(--text-body-sm)",
                  color: "var(--text-secondary)",
                }}
              >
                {review.communicationRating > 0 && (
                  <span>{t("communication")}: <strong style={{ color: "var(--text-primary)" }}>{review.communicationRating}/5</strong></span>
                )}
                {review.qualityRating > 0 && (
                  <span>{t("quality")}: <strong style={{ color: "var(--text-primary)" }}>{review.qualityRating}/5</strong></span>
                )}
                {review.timelinessRating > 0 && (
                  <span>{t("timeliness")}: <strong style={{ color: "var(--text-primary)" }}>{review.timelinessRating}/5</strong></span>
                )}
                {review.valueRating > 0 && (
                  <span>{t("value")}: <strong style={{ color: "var(--text-primary)" }}>{review.valueRating}/5</strong></span>
                )}
              </div>
            )}

            {review.content && (
              <p
                className="body-md"
                style={{ color: "var(--text-secondary)", margin: 0, whiteSpace: "pre-wrap" }}
              >
                {review.content}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Main component ----

export default function FreelancerDetails3() {
  const t = useTranslations("freelancerProfile");
  const isMatchedScreen = useScreen(1216);
  const { id } = useParams();

  const convexData = useConvexFreelancerDetail(id);
  const isLoading = convexData === undefined;

  if (isLoading) {
    return (
      <section style={{ padding: "var(--space-16) 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p className="body-md" style={{ color: "var(--text-secondary)" }}>{t("loadingProfile")}</p>
        </div>
      </section>
    );
  }

  if (!convexData) {
    return (
      <section style={{ padding: "var(--space-16) 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p className="body-md" style={{ color: "var(--text-secondary)", marginBottom: "var(--space-5)" }}>{t("notFound")}</p>
          <Link href="/freelancers" className="btn btn--primary">{t("browseFreelancers")}</Link>
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

  const headerStats = [
    rating > 0 && {
      icon: Star,
      label: t("rating"),
      value: `${rating.toFixed(1)} (${reviewCount} ${t("reviews")})`,
    },
    convexData.hourlyRate && {
      icon: Wallet,
      label: t("hourlyRate"),
      value: `€${convexData.hourlyRate}/hr`,
    },
    convexData.totalOrders > 0 && {
      icon: Briefcase,
      label: t("orders"),
      value: `${convexData.totalOrders} ${t("completed")}`,
    },
  ].filter(Boolean);

  return (
    <section style={{ padding: "var(--space-10) 0 var(--space-16)" }}>
      <div className="container">
        {convexData.coverImageUrl && (
          <div
            style={{
              height: 240,
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              marginBottom: "var(--space-8)",
              backgroundImage: `url(${convexData.coverImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}

        <div className="row">
          {/* Left column */}
          <div className="col-lg-8">
            {/* Profile header — DS card */}
            <div
              className="card"
              style={{
                padding: "var(--space-7)",
                marginBottom: "var(--space-6)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "var(--space-5)",
                  alignItems: "center",
                  flexWrap: "wrap",
                  paddingBottom: "var(--space-6)",
                  marginBottom: "var(--space-6)",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                <span className="avatar-wrap" style={{ flexShrink: 0 }}>
                  <span className="avatar avatar--xl">
                    <Image
                      width={96}
                      height={96}
                      src={profileImg}
                      alt={profileName}
                    />
                  </span>
                  {convexData.isVerified && (
                    <span className="verify verify--lg" aria-label={t("verified")}>
                      <CheckCircle2 />
                    </span>
                  )}
                </span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h1
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-h2)",
                      fontWeight: 500,
                      margin: 0,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {profileName}
                  </h1>
                  {profession && (
                    <p
                      className="body-md"
                      style={{ color: "var(--text-secondary)", margin: "var(--space-1) 0 var(--space-3)" }}
                    >
                      {profession}
                    </p>
                  )}
                  <div
                    style={{
                      display: "flex",
                      gap: "var(--space-4)",
                      flexWrap: "wrap",
                      color: "var(--text-secondary)",
                      fontSize: "var(--text-body-sm)",
                    }}
                  >
                    {rating > 0 && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <Star size={14} fill="currentColor" style={{ color: "var(--secondary-500)" }} />
                        <strong style={{ color: "var(--text-primary)" }}>{rating.toFixed(1)}</strong>
                        <span>({reviewCount} {t("reviews")})</span>
                      </span>
                    )}
                    {location && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <MapPin size={14} />
                        {location}
                      </span>
                    )}
                    {memberSince && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                        <Calendar size={14} />
                        {t("memberSince")} {memberSince}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {headerStats.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "var(--space-5)",
                  }}
                >
                  {headerStats.map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)" }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "var(--radius-md)",
                          background: "var(--primary-50)",
                          color: "var(--primary-600)",
                          display: "grid",
                          placeItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div
                          className="overline"
                          style={{ color: "var(--text-tertiary)", marginBottom: 2 }}
                        >
                          {label}
                        </div>
                        <div
                          className="body-md"
                          style={{ fontWeight: 600, color: "var(--text-primary)" }}
                        >
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {bio && (
              <div
                className="card"
                style={{ padding: "var(--space-8)", marginBottom: "var(--space-8)" }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-h3)",
                    fontWeight: 500,
                    marginBottom: "var(--space-4)",
                  }}
                >
                  {t("about")}
                </h2>
                <p
                  className="body-md"
                  style={{ color: "var(--text-secondary)", margin: 0, whiteSpace: "pre-wrap" }}
                >
                  {bio}
                </p>
              </div>
            )}

            {/* Services */}
            <GigsSection freelancerProfileId={convexData._id} recipientUserId={convexData.userId} />

            {/* Projects */}
            <ProjectsSection userId={convexData.userId} />

            {/* Portfolio */}
            <PortfolioSection userId={convexData.userId} />

            {/* Experience & Education */}
            <ExperienceSection userId={convexData.userId} />

            {/* Reviews */}
            <FreelancerReviews freelancerId={convexData._id} />
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
