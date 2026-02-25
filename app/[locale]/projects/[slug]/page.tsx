import Image from "next/image";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

function formatDate(timestamp: number | undefined | null): string {
  if (!timestamp) return "Unknown date";
  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatBudget(
  min: number | undefined | null,
  max: number | undefined | null,
  currency: string | undefined | null
): string {
  const symbol = currency === "USD" ? "$" : currency === "GBP" ? "£" : "€";
  if (min != null && max != null) return `${symbol}${min} - ${symbol}${max}`;
  if (min != null) return `From ${symbol}${min}`;
  if (max != null) return `Up to ${symbol}${max}`;
  return "Negotiable";
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  return (
    <span className="review-color fz12">
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) return <i key={i} className="fas fa-star" />;
        if (i === full && hasHalf) return <i key={i} className="fas fa-star-half-alt" />;
        return <i key={i} className="far fa-star" />;
      })}
    </span>
  );
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  const project = await fetchQuery(api.marketplace.projects.getBySlug, {
    slug,
    locale,
  });

  if (!project) {
    return (
      <>
        <Breadcrumb title="Project Not Found" brief="Projects" />
        <div className="bgc-thm3">
          <section className="pt60 pb90">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 text-center">
                  <h3 className="mb20">Project not found</h3>
                  <p className="text mb30">
                    The project you are looking for does not exist or has been removed.
                  </p>
                  <Link href={`/${locale}/projects`} className="ud-btn btn-thm">
                    Browse Projects
                    <i className="fal fa-arrow-right-long ms-2" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  const bids = await fetchQuery(api.marketplace.projects.getBids, {
    projectId: project._id,
  });

  const requiredSkills = Array.isArray(project.requiredSkills)
    ? project.requiredSkills
    : [];

  return (
    <>
      <Breadcrumb
        title="Project Details"
        brief={project.categoryName ?? "Projects"}
      />

      <div className="bgc-thm3">
        <section className="pt10 pb90 pb30-md">
          <div className="container">
            <div className="row wrap">

              {/* ── Main content ─────────────────────────────────── */}
              <div className="col-lg-8">
                <div className="column">

                  {/* Title + meta */}
                  <div className="px30 bdr1 pt30 pb30 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                    <h2 className="mb20">{project.title}</h2>

                    <div className="list-meta d-flex flex-wrap align-items-center gap-3">
                      {project.clientName && (
                        <p className="mb-0 dark-color fz14 d-flex align-items-center gap-2">
                          <i className="flaticon-tracking vam fz18" />
                          {project.clientName}
                        </p>
                      )}
                      <p className="mb-0 dark-color fz14 d-flex align-items-center gap-2">
                        <i className="flaticon-calendar vam fz18" />
                        Posted {formatDate(project.publishedAt ?? project.createdAt)}
                      </p>
                      <p className="mb-0 dark-color fz14 d-flex align-items-center gap-2">
                        <i className="flaticon-website vam fz18" />
                        {project.views ?? 0} Views
                      </p>
                      <span
                        className={`fz13 bdrs4 px-2 py-1 ${
                          project.status === "open"
                            ? "bgc-success text-white"
                            : "bgc-secondary text-white"
                        }`}
                      >
                        {project.status === "open" ? "Open" : project.status}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="px30 bdr1 pt30 pb30 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                    <h4 className="mb20">Description</h4>
                    <p className="text mb-0" style={{ whiteSpace: "pre-wrap" }}>
                      {project.description}
                    </p>
                  </div>

                  {/* Required Skills */}
                  {requiredSkills.length > 0 && (
                    <div className="px30 bdr1 pt30 pb30 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                      <h4 className="mb20">Required Skills</h4>
                      <div className="d-flex flex-wrap gap-2">
                        {requiredSkills.map((skill: string) => (
                          <span
                            key={skill}
                            className="bdrs4 bdr1 px15 py-1 fz14 dark-color"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bids / Proposals */}
                  <div className="px30 bdr1 pt30 pb30 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                    <h4 className="mb25">
                      Proposals ({bids.length})
                    </h4>

                    {bids.length === 0 ? (
                      <p className="text mb-0">
                        No proposals yet. Be the first to submit a bid!
                      </p>
                    ) : (
                      <div>
                        {bids.map((bid: any) => (
                          <div
                            key={bid._id}
                            className="freelancer-style1 bdr1 bdrs8 mb20 p20"
                          >
                            <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
                              {/* Freelancer info */}
                              <div className="d-flex align-items-center gap-3">
                                <Image
                                  width={40}
                                  height={40}
                                  className="rounded-circle flex-shrink-0"
                                  src={
                                    bid.freelancerAvatar ??
                                    "/images/resource/user.png"
                                  }
                                  alt={bid.freelancerName ?? "Freelancer"}
                                />
                                <div>
                                  <h6 className="mb-0 fz15">
                                    {bid.freelancerName ?? "Freelancer"}
                                    {bid.freelancerVerified && (
                                      <i
                                        className="fas fa-badge-check text-primary ms-2 fz13"
                                        title="Verified"
                                      />
                                    )}
                                  </h6>
                                  <div className="d-flex align-items-center gap-1 mt1">
                                    <StarRating
                                      rating={bid.freelancerRating ?? 0}
                                    />
                                    <span className="fz12 text-muted ms-1">
                                      {Number(bid.freelancerRating ?? 0).toFixed(1)}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Bid amount + delivery */}
                              <div className="text-end">
                                <div className="h5 mb-0 text-thm">
                                  {formatBudget(
                                    bid.amount,
                                    null,
                                    bid.currency
                                  ).replace(" - ", "")}
                                </div>
                                <p className="mb-0 fz12 text-muted">
                                  {bid.deliveryDays ?? "?"} days delivery
                                </p>
                              </div>
                            </div>

                            {/* Pitch */}
                            {bid.pitch && (
                              <p className="text mt15 mb-0 fz14">
                                {bid.pitch}
                              </p>
                            )}

                            {bid.status === "accepted" && (
                              <span className="fz12 bdrs4 px-2 py-1 bgc-success text-white mt10 d-inline-block">
                                Accepted
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* ── Sidebar ──────────────────────────────────────── */}
              <div className="col-lg-4">
                <div className="service-sidebar">

                  {/* Budget / project info widget */}
                  <div className="price-widget pt25 bdrs8 bdr1 bg-white default-box-shadow1 mb30 px30 pb30">
                    <h3 className="title">
                      {formatBudget(
                        project.budgetMin,
                        project.budgetMax,
                        project.currency
                      )}
                    </h3>
                    <p className="text fz14 mb25">Budget</p>

                    <div className="d-flex align-items-start mb15">
                      <i className="flaticon-goal vam fz20 me-3 mt1" />
                      <div>
                        <p className="mb-0 fw500 dark-color">Work Type</p>
                        <p className="mb-0 text fz14">
                          {project.workType
                            ? project.workType.charAt(0).toUpperCase() +
                              project.workType.slice(1)
                            : "Remote"}
                        </p>
                      </div>
                    </div>

                    {project.deadline && (
                      <div className="d-flex align-items-start mb15">
                        <i className="flaticon-calendar vam fz20 me-3 mt1" />
                        <div>
                          <p className="mb-0 fw500 dark-color">Deadline</p>
                          <p className="mb-0 text fz14">
                            {formatDate(project.deadline)}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="d-flex align-items-start mb25">
                      <i className="flaticon-file-1 vam fz20 me-3 mt1" />
                      <div>
                        <p className="mb-0 fw500 dark-color">Proposals</p>
                        <p className="mb-0 text fz14">
                          {project.bidCount ?? 0} bids
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/${locale}/sign-in`}
                      className="ud-btn btn-thm w-100"
                    >
                      Submit a Proposal
                      <i className="fal fa-arrow-right-long ms-2" />
                    </Link>
                  </div>

                  {/* Client info widget */}
                  <div className="freelancer-style1 service-single mb-0 bdrs8 p20 mt30 bdr1 bg-white default-box-shadow1">
                    <h5 className="mb20">About the Client</h5>

                    <div className="d-flex align-items-center mb20">
                      <Image
                        width={50}
                        height={50}
                        className="rounded-circle flex-shrink-0"
                        src={
                          project.clientAvatar ?? "/images/resource/user.png"
                        }
                        alt={project.clientName ?? "Client"}
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">
                          {project.clientName ?? "Client"}
                        </h6>
                        {project.categoryName && (
                          <p className="mb-0 text fz13">
                            {project.categoryName}
                          </p>
                        )}
                      </div>
                    </div>

                    {project.clientName && (
                      <div className="d-flex align-items-center mb20">
                        <i className="flaticon-tracking vam fz18 me-2" />
                        <span className="fz14 text">
                          {project.clientName}
                        </span>
                      </div>
                    )}

                    <Link
                      href={`/${locale}/sign-in`}
                      className="ud-btn btn-white2 w-100"
                    >
                      Contact Client
                      <i className="fal fa-arrow-right-long ms-2" />
                    </Link>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}
