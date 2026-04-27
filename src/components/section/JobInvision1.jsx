"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import useConvexClients from "@/hook/useConvexClients";
import useConvexJobs from "@/hook/useConvexJobs";
import JobCard4 from "../card/JobCard4";

export default function JobInvision1() {
  const t = useTranslations("jobsHub");
  const { id } = useParams();
  const clients = useConvexClients();
  const jobs = useConvexJobs();

  if (clients === undefined || jobs === undefined) {
    return null;
  }

  const company = clients.find((item) => String(item._id) === String(id));
  const companyJobs = jobs
    .filter((job) => String(job.clientId) === String(id))
    .slice(0, 4);

  if (!company || companyJobs.length === 0) {
    return null;
  }

  return (
    <>
      <section className="pt-0 pb-24 pb-8-md">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="mb-8">
                <h2>{t("jobsAtCompany", { count: companyJobs.length, company: company.server })}</h2>
                <p className="text">
                  {t("browseLatestRoles")}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {companyJobs.map((item) => (
              <div key={item._id} className="col-sm-6 col-lg-4 col-xl-3">
                <JobCard4 data={item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
