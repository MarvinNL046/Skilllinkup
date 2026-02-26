"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import useConvexJobDetail from "@/hook/useConvexJobDetail";

export default function JobDetail1() {
  const { id } = useParams();
  const convexData = useConvexJobDetail(id);

  // convexData === undefined means still loading
  const isLoading = convexData === undefined;

  const data = !isLoading
    ? convexData
      ? {
          _id: convexData._id,
          title: convexData.title,
          description: convexData.description || null,
          location: convexData.locationCity
            ? `${convexData.locationCity}, ${convexData.locationCountry || ""}`
            : convexData.workType === "remote"
            ? "Remote"
            : null,
          postedAt: convexData.createdAt
            ? (() => {
                const diffMs = Date.now() - convexData.createdAt;
                const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                if (diffDays === 0) return "Posted today";
                if (diffDays === 1) return "Posted 1 day ago";
                return `Posted ${diffDays} days ago`;
              })()
            : null,
          hours: convexData.hoursPerWeek
            ? `${convexData.hoursPerWeek}h / week`
            : null,
          salary:
            convexData.salaryMin && convexData.salaryMax
              ? `$${Math.round(convexData.salaryMin / 1000)}k - $${Math.round(
                  convexData.salaryMax / 1000
                )}k`
              : convexData.salaryMax
              ? `$${Math.round(convexData.salaryMax / 1000)}k`
              : null,
          responsibilities: convexData.responsibilities || [],
          requirements: convexData.requirements || [],
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
              <p className="text">Loading job details...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const location = data?.location || null;
  const postedAt = data?.postedAt || null;
  const hours = data?.hours || null;
  const salary = data?.salary || null;
  const description = data?.description || null;
  const responsibilities = data?.responsibilities || [];
  const requirements = data?.requirements || [];

  // Only render the stats row if we have at least one stat to show
  const hasStats = postedAt || location || hours || salary;

  return (
    <>
      <section className="pt10 pb90 pb30-md">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-8 mx-auto">
              {hasStats && (
                <div className="row">
                  {postedAt && (
                    <div className="col-sm-6 col-xl-3">
                      <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                        <div className="icon flex-shrink-0">
                          <span className="flaticon-calendar" />
                        </div>
                        <div className="details">
                          <h5 className="title">Date Posted</h5>
                          <p className="mb-0 text">{postedAt}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {location && (
                    <div className="col-sm-6 col-xl-3">
                      <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                        <div className="icon flex-shrink-0">
                          <span className="flaticon-place" />
                        </div>
                        <div className="details">
                          <h5 className="title">Location</h5>
                          <p className="mb-0 text">{location}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {hours && (
                    <div className="col-sm-6 col-xl-3">
                      <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                        <div className="icon flex-shrink-0">
                          <span className="flaticon-fifteen" />
                        </div>
                        <div className="details">
                          <h5 className="title">Hours</h5>
                          <p className="mb-0 text">{hours}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {salary && (
                    <div className="col-sm-6 col-xl-3">
                      <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                        <div className="icon flex-shrink-0">
                          <span className="flaticon-pay-day" />
                        </div>
                        <div className="details">
                          <h5 className="title">Salary</h5>
                          <p className="mb-0 text">{salary}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="service-about">
                {description && (
                  <>
                    <h4 className="mb-4">Description</h4>
                    <p className="text mb30">{description}</p>
                  </>
                )}
                {responsibilities.length > 0 && (
                  <>
                    <h4 className="mb30">Key Responsibilities</h4>
                    <div className="list-style1 mb60 pr50 pr0-lg">
                      <ul>
                        {responsibilities.map((item, i) => (
                          <li key={i}>
                            <i className="far fa-check text-thm3 bgc-thm3-light" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
                {requirements.length > 0 && (
                  <>
                    <h4 className="mb30">Requirements</h4>
                    <ul className="list-style-type-bullet ps-3 mb60">
                      {requirements.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
                <div className="d-grid mb60">
                  <Link href="/contact" className="ud-btn btn-thm2">
                    Apply For Job
                    <i className="fal fa-arrow-right-long" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
