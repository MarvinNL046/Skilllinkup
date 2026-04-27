"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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

  const salaryLabel =
    salaryMin && salaryMax
      ? `€${salaryMin.toLocaleString()}–€${salaryMax.toLocaleString()}`
      : salaryMin
      ? `From €${salaryMin.toLocaleString()}`
      : "";

  return (
    <section>
      <div className="mx-auto max-w-screen-2xl mx-4 lg:mx-5 px-6 lg:px-8 pt-16 sm:pt-32 pb-16 sm:pb-32 rounded-2xl relative overflow-hidden flex items-center bg-[var(--surface-2)]">
        <Image
          height={226}
          width={198}
          className="absolute top-0 left-0 hidden md:block opacity-40 pointer-events-none"
          src="/images/vector-img/left-top.png"
          alt=""
          aria-hidden="true"
        />
        <Image
          height={181}
          width={255}
          className="absolute bottom-0 right-0 hidden md:block opacity-40 pointer-events-none"
          src="/images/vector-img/right-bottom.png"
          alt=""
          aria-hidden="true"
        />
        <div className="container relative">
          <div className="max-w-4xl mx-auto">
            <div className="lg:flex lg:items-end lg:justify-between gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6 lg:mb-0">
                <Image
                  height={100}
                  width={100}
                  className="rounded-md flex-shrink-0"
                  src="/images/team/job-single.png"
                  alt="job"
                />
                <div>
                  <h4 className="text-2xl md:text-3xl font-semibold mb-2">
                    {title}
                  </h4>
                  {company && (
                    <h6 className="text-base text-primary mb-3">{company}</h6>
                  )}
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    {salaryLabel && (
                      <span className="font-medium">{salaryLabel}</span>
                    )}
                    {jobType && (
                      <>
                        <span className="text-[var(--text-tertiary)]">·</span>
                        <span>{jobType.replace("_", " ")}</span>
                      </>
                    )}
                    <span className="text-[var(--text-tertiary)]">·</span>
                    <span>{workType}</span>
                  </div>
                </div>
              </div>
              <Button asChild variant="secondary">
                <Link href="/contact">
                  Apply For Job
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
