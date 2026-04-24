import { getTranslations } from "next-intl/server";
import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import JobDetail1 from "@/components/section/JobDetail1";

export async function generateMetadata() {
  const t = await getTranslations("pageMeta.jobSingle");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function JobSinglePage() {
  const t = await getTranslations("jobsHub");
  return (
    <div style={{ background: "var(--bg)" }}>
      <Header20 />
      <Breadcumb10 path={[t("breadcrumbHome"), t("breadcrumbJobs")]} />
      <JobDetail1 />
      <Footer14 />
    </div>
  );
}
