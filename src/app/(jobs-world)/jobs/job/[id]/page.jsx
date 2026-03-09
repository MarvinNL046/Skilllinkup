import { fetchQuery } from "convex/nextjs";
import { getTranslations } from "next-intl/server";
import { api } from "../../../../../../convex/_generated/api";
import TabSection1 from "@/components/section/TabSection1";
import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import Breadcumb13 from "@/components/breadcumb/Breadcumb13";
import JobDetail1 from "@/components/section/JobDetail1";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const t = await getTranslations("jobsHub");
  try {
    const job = await fetchQuery(api.marketplace.jobs.getBySlug, {
      slug: id,
      locale: "en",
    });
    if (job) {
      const salary = job.salaryMin && job.salaryMax
        ? ` — €${job.salaryMin.toLocaleString()}–€${job.salaryMax.toLocaleString()}`
        : "";
      const titleSuffix = job.company ? ` ${t("atCompany", { company: job.company })}` : "";
      return {
        title: `${job.title}${titleSuffix}`,
        description: job.description
          ? job.description.slice(0, 155)
          : `${job.title}${salary}. ${t("applyOnSkillLinkup")}`,
        openGraph: {
          title: `${job.title}${titleSuffix}`,
          description: job.description?.slice(0, 155) || job.title,
        },
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

  return (
    <>
      <TabSection1 />
      <Breadcumb10 path={[t("breadcrumbHome"), t("breadcrumbJobs"), t("breadcrumbDetail")]} />
      <Breadcumb13 />
      <JobDetail1 />
    </>
  );
}
