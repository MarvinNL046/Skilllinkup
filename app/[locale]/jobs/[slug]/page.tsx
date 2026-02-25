import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatSalary(min: number | null, max: number | null, currency: string): string {
  const symbol = currency === "USD" ? "$" : currency === "GBP" ? "£" : "€";
  if (min && max) return `${symbol}${min.toLocaleString()} - ${symbol}${max.toLocaleString()}`;
  if (min) return `From ${symbol}${min.toLocaleString()}`;
  if (max) return `Up to ${symbol}${max.toLocaleString()}`;
  return "Negotiable";
}

function formatJobType(type: string): string {
  const labels: Record<string, string> = {
    full_time: "Full Time",
    part_time: "Part Time",
    freelance: "Freelance",
    internship: "Internship",
  };
  return labels[type] ?? type;
}

function formatWorkType(type: string | undefined | null): string {
  if (!type) return "Not specified";
  const labels: Record<string, string> = {
    remote: "Remote",
    local: "On-site",
    hybrid: "Hybrid",
  };
  return labels[type] ?? type;
}

export default async function JobDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  let job: any = null;
  try {
    job = await fetchQuery(api.marketplace.jobs.getBySlug, { slug, locale });
  } catch (error) {
    console.error("Error fetching job:", error);
  }

  if (!job) {
    return (
      <>
        <Breadcrumb title="Job Not Found" brief="" />
        <section className="pt60 pb90">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6 text-center">
                <div className="freelancer-style1 bdrs12 bdr1 p60">
                  <i className="flaticon-briefcase fz60 body-color mb20 d-block" />
                  <h3 className="title mb20">Job not found</h3>
                  <p className="body-color mb30">
                    This job listing may have been removed or is no longer available.
                  </p>
                  <Link href={`/${locale}/jobs`} className="ud-btn btn-thm">
                    Browse Jobs <i className="fal fa-arrow-right-long" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const location = [job.locationCity, job.locationCountry].filter(Boolean).join(", ") || "Remote";
  const skills = Array.isArray(job.requiredSkills) ? job.requiredSkills : [];
  const benefits = Array.isArray(job.benefits) ? job.benefits : [];

  return (
    <>
      <Breadcrumb title={job.title} brief={job.company ?? "Job listing"} />

      <section className="pt30 pb90">
        <div className="container">
          <div className="row">
            {/* Main content */}
            <div className="col-lg-8">
              {/* Title card */}
              <div className="freelancer-style1 bdrs12 bdr1 p30 mb30">
                <div className="d-flex align-items-center mb20">
                  <Image
                    src={job.companyLogo || "/images/resource/user.png"}
                    alt={job.company || "Company"}
                    width={60}
                    height={60}
                    className="rounded-circle wa me-3"
                  />
                  <div>
                    <h3 className="title mb-1">{job.title}</h3>
                    <p className="fz15 body-color mb-0">{job.company || "Company"}</p>
                  </div>
                </div>

                <div className="d-flex flex-wrap gap-3 mb10">
                  <span className="fz14 body-color">
                    <i className="flaticon-place fz14 me-1" />
                    {location}
                  </span>
                  <span className="fz14 body-color">
                    <i className="flaticon-calendar fz14 me-1" />
                    Posted {formatDate(job.createdAt)}
                  </span>
                  {job.categoryName && (
                    <span className="fz14 body-color">
                      <i className="flaticon-document fz14 me-1" />
                      {job.categoryName}
                    </span>
                  )}
                  <span className="badge badge-primary fz12">
                    {formatJobType(job.jobType)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="freelancer-style1 bdrs12 bdr1 p30 mb30">
                <h4 className="title mb20">Job Description</h4>
                <div
                  className="text mb-0"
                  style={{ whiteSpace: "pre-wrap" }}
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </div>

              {/* Required Skills */}
              {skills.length > 0 && (
                <div className="freelancer-style1 bdrs12 bdr1 p30 mb30">
                  <h4 className="title mb20">Required Skills</h4>
                  <div className="skill-tags d-flex flex-wrap gap-2">
                    {skills.map((skill: string) => (
                      <span key={skill} className="tag bdrs4 fz14">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {benefits.length > 0 && (
                <div className="freelancer-style1 bdrs12 bdr1 p30 mb30">
                  <h4 className="title mb20">Benefits</h4>
                  <ul className="list-style1">
                    {benefits.map((benefit: string) => (
                      <li key={benefit}>
                        <i className="far fa-check text-thm me-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              {/* Salary & details widget */}
              <div className="price-widget pt25 bdrs8 mb30">
                <h3 className="widget-title">
                  {formatSalary(job.salaryMin, job.salaryMax, job.currency ?? "EUR")}
                </h3>
                <p className="text fz14 mb20">{formatJobType(job.jobType)}</p>

                <div className="details mb20">
                  <div className="fl-meta d-flex align-items-center justify-content-between mb10">
                    <span className="fz14 body-color">Work Type</span>
                    <span className="fz14 fw500 dark-color">{formatWorkType(job.workType)}</span>
                  </div>
                  <div className="fl-meta d-flex align-items-center justify-content-between mb10">
                    <span className="fz14 body-color">Location</span>
                    <span className="fz14 fw500 dark-color">{location}</span>
                  </div>
                  {job.experienceLevel && (
                    <div className="fl-meta d-flex align-items-center justify-content-between mb10">
                      <span className="fz14 body-color">Experience</span>
                      <span className="fz14 fw500 dark-color capitalize">{job.experienceLevel}</span>
                    </div>
                  )}
                  {job.expiresAt && (
                    <div className="fl-meta d-flex align-items-center justify-content-between mb10">
                      <span className="fz14 body-color">Expires</span>
                      <span className="fz14 fw500 dark-color">{formatDate(job.expiresAt)}</span>
                    </div>
                  )}
                  <div className="fl-meta d-flex align-items-center justify-content-between mb10">
                    <span className="fz14 body-color">Applications</span>
                    <span className="fz14 fw500 dark-color">{job.applicationCount ?? 0}</span>
                  </div>
                </div>

                <Link
                  href={`/${locale}/sign-in`}
                  className="ud-btn btn-thm d-block text-center"
                >
                  Apply Now
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>

              {/* Company info widget */}
              <div className="freelancer-style1 service-single mb-0 bdrs8 p20">
                <h4 className="mb20">About the Company</h4>
                <div className="d-flex align-items-center mb20">
                  <Image
                    src={job.companyLogo || "/images/resource/user.png"}
                    alt={job.company || "Company"}
                    width={50}
                    height={50}
                    className="rounded-circle wa me-3"
                  />
                  <div>
                    <h5 className="title mb-1">{job.company || "Company"}</h5>
                    {job.categoryName && (
                      <p className="mb-0 fz14 body-color">{job.categoryName}</p>
                    )}
                  </div>
                </div>

                <div className="fl-meta d-flex align-items-center justify-content-between mb10">
                  <span className="fz14 body-color">Location</span>
                  <span className="fz14 fw500 dark-color">{location}</span>
                </div>

                <Link
                  href={`/${locale}/sign-in`}
                  className="ud-btn btn-thm-border d-block text-center mt20"
                >
                  Contact Company
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
