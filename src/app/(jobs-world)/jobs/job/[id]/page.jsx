import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api";
import TabSection1 from "@/components/section/TabSection1";
import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import Breadcumb13 from "@/components/breadcumb/Breadcumb13";
import JobDetail1 from "@/components/section/JobDetail1";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const job = await fetchQuery(api.marketplace.jobs.getBySlug, {
      slug: id,
      locale: "en",
    });
    if (job) {
      const salary = job.salaryMin && job.salaryMax
        ? ` — €${job.salaryMin.toLocaleString()}–€${job.salaryMax.toLocaleString()}`
        : "";
      return {
        title: `${job.title}${job.company ? ` at ${job.company}` : ""} | SkillLinkup`,
        description: job.description
          ? job.description.slice(0, 155)
          : `${job.title}${salary}. Apply on SkillLinkup.`,
        openGraph: {
          title: `${job.title}${job.company ? ` at ${job.company}` : ""}`,
          description: job.description?.slice(0, 155) || job.title,
        },
      };
    }
  } catch {}
  return {
    title: "Job Opening | SkillLinkup",
    description: "View job details and apply on SkillLinkup.",
  };
}

export default async function page({ params }) {
  const { id } = await params;

  return (
    <>
      <TabSection1 />
      <Breadcumb10 path={["Home", "Jobs", "Detail"]} />
      <Breadcumb13 />
      <JobDetail1 />
    </>
  );
}
