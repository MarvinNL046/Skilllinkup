import { getTranslations } from "next-intl/server";
import JobsHero from "@/components/hero/JobsHero";

export async function generateMetadata() {
  const t = await getTranslations("jobsHub");
  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default function JobsPage() {
  return (
    <>
      <JobsHero />
    </>
  );
}
