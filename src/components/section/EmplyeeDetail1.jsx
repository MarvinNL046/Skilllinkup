"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import useConvexClients from "@/hook/useConvexClients";
import useConvexJobs from "@/hook/useConvexJobs";
import JobCard4 from "../card/JobCard4";

function formatMonthYear(timestamp) {
  if (!timestamp) return null;
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function EmplyeeDetail1() {
  const { id } = useParams();
  const clients = useConvexClients();
  const jobs = useConvexJobs();

  if (clients === undefined || jobs === undefined) {
    return (
      <section className="pt10 pb90 pb30-md">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-thm" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const company =
    clients && id
      ? clients.find((item) => String(item._id) === String(id))
      : null;

  const companyJobs = (jobs || [])
    .filter((job) => String(job.clientId) === String(id))
    .slice(0, 3);

  const memberSince = formatMonthYear(company?.createdAt);

  return (
    <>
      <section className="pt10 pb90 pb30-md">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-8">
              <div className="service-about">
                <h4 className="mb20">About Company</h4>
                <p className="text mb30">
                  {company?.bio
                    ? company.bio
                    : "This company has not added a public description yet."}
                </p>

                <h4 className="mb25 mt40">Open Jobs</h4>
                {companyJobs.length === 0 ? (
                  <p className="text mb30">
                    No open jobs from this company right now.
                  </p>
                ) : (
                  <div className="row">
                    {companyJobs.map((item) => (
                      <div key={item._id} className="col-sm-6 col-xl-12 mb20">
                        <JobCard4 data={item} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-4">
              <div className="blog-sidebar ms-lg-auto">
                <div className="price-widget pt25 widget-mt-minus bdrs8">
                  <h4 className="widget-title">Company Info</h4>
                  <div className="category-list mt20">
                    <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
                      <span className="text">
                        <i className="flaticon-factory text-thm2 pe-2 vam" />
                        Company
                      </span>
                      <span>{company?.server || "Unknown"}</span>
                    </a>
                    {memberSince && (
                      <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
                        <span className="text">
                          <i className="flaticon-calendar text-thm2 pe-2 vam" />
                          Member since
                        </span>
                        <span>{memberSince}</span>
                      </a>
                    )}
                    <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
                      <span className="text">
                        <i className="flaticon-place text-thm2 pe-2 vam" />
                        Location
                      </span>
                      <span>{company?.location || "Remote"}</span>
                    </a>
                    <a className="d-flex align-items-center justify-content-between">
                      <span className="text">
                        <i className="flaticon-briefcase text-thm2 pe-2 vam" />
                        Open jobs
                      </span>
                      <span>{companyJobs.length}</span>
                    </a>
                  </div>
                  <div className="d-grid mt20">
                    <Link href="/contact" className="ud-btn btn-thm">
                      Contact
                      <i className="fal fa-arrow-right-long" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
