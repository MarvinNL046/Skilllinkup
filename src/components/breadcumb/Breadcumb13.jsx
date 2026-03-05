"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Breadcumb13() {
  const { id } = useParams();
  const job = useQuery(
    api.marketplace.jobs.getBySlug,
    id ? { slug: id, locale: "en" } : "skip"
  );

  const title = job?.title || "Job Opening";
  const company = job?.company || "";
  const salaryMin = job?.salaryMin;
  const salaryMax = job?.salaryMax;
  const currency = job?.currency || "EUR";
  const workType = job?.workType || "Remote";
  const jobType = job?.jobType || "";

  const salaryLabel = salaryMin && salaryMax
    ? `€${salaryMin.toLocaleString()}–€${salaryMax.toLocaleString()}`
    : salaryMin
    ? `From €${salaryMin.toLocaleString()}`
    : "";

  return (
    <>
      <section className="breadcumb-section pt-0">
        <div className="cta-job-v1 freelancer-single-style mx-auto maxw1700 pt120 pt60-sm pb120 pb60-sm bdrs16 position-relative overflow-hidden d-flex align-items-center mx20-lg px30-lg">
          <Image
            height={226}
            width={198}
            className="left-top-img wow zoomIn"
            src="/images/vector-img/left-top.png"
            alt="left-top"
          />
          <Image
            height={181}
            width={255}
            className="right-bottom-img wow zoomIn"
            src="/images/vector-img/right-bottom.png"
            alt="right-bottom"
          />
          <div className="container">
            <div className="row wow fadeInUp">
              <div className="col-xl-8 mx-auto">
                <div className="position-relative">
                  <div className="list-meta d-lg-flex align-items-end justify-content-between">
                    <div className="wrapper d-sm-flex align-items-center mb20-md">
                      <a className="position-relative freelancer-single-style">
                        <Image
                          height={100}
                          width={100}
                          className="wa"
                          src="/images/team/job.png"
                          alt="job-single"
                        />
                      </a>
                      <div className="ml20 ml0-xs mt15-sm">
                        <h4 className="title">{title}</h4>
                        {company && <h6 className="mb-3 text-thm">{company}</h6>}
                        {salaryLabel && (
                          <h6 className="list-inline-item mb-0">{salaryLabel}</h6>
                        )}
                        {jobType && (
                          <h6 className="list-inline-item mb-0 bdrl-eunry pl15">
                            {jobType.replace("_", " ")}
                          </h6>
                        )}
                        <h6 className="list-inline-item mb-0 bdrl-eunry pl15">
                          {workType}
                        </h6>
                      </div>
                    </div>
                    <Link href="/contact" className="ud-btn btn-thm2">
                      Apply For Job
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
