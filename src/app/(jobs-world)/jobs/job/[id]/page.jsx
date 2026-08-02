import { fetchQuery } from "convex/nextjs";
import { getTranslations } from "next-intl/server";
import { api } from "../../../../../../convex/_generated/api";
import TabSection1 from "@/components/section/TabSection1";
import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import Breadcumb13 from "@/components/breadcumb/Breadcumb13";
import JobDetail1 from "@/components/section/JobDetail1";
import { buildJobPosting } from "@/lib/seo/jobPosting.mjs";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skilllinkup.com";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const t = await getTranslations("jobsHub");
  try {
    const job = await fetchQuery(api.marketplace.jobs.getBySlug, {
      slug: id,
      locale: "en",
    });
    if (job) {
      const isOpen =
        job.status === "open" && (!job.expiresAt || job.expiresAt > Date.now());
      const salary =
        job.salaryMin && job.salaryMax
          ? ` — €${job.salaryMin.toLocaleString()}–€${job.salaryMax.toLocaleString()}`
          : "";
      const titleSuffix = job.company
        ? ` ${t("atCompany", { company: job.company })}`
        : "";
      return {
        title: `${job.title}${titleSuffix}`,
        description: job.description
          ? job.description.slice(0, 155)
          : `${job.title}${salary}. ${t("applyOnSkillLinkup")}`,
        openGraph: {
          title: `${job.title}${titleSuffix}`,
          description: job.description?.slice(0, 155) || job.title,
        },
        alternates: {
          canonical: `/jobs/job/${job.slug}`,
        },
        robots: isOpen
          ? { index: true, follow: true }
          : { index: false, follow: false, nocache: true },
      };
    }
  } catch {}
  return {
    title: t("jobOpeningFallback"),
    description: t("jobOpeningDescription"),
  };
}

export default async function page({ params }) {
  const { id } = await params;
  const t = await getTranslations("jobsHub");
  let job = null;
  try {
    job = await fetchQuery(api.marketplace.jobs.getBySlug, {
      slug: id,
      locale: "en",
    });
  } catch {}

  const isOpen =
    job?.status === "open" && (!job.expiresAt || job.expiresAt > Date.now());
  const jobPosting = isOpen
    ? buildJobPosting(job, { baseUrl: BASE_URL })
    : null;

  return (
    <>
      {jobPosting ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jobPosting).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
      <TabSection1 />
      <Breadcumb10
        path={[t("breadcrumbHome"), t("breadcrumbJobs"), t("breadcrumbDetail")]}
      />
      <Breadcumb13 />
      <JobDetail1 />
    </>
  );
}
