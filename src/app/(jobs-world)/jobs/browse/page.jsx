import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Breadcumb12 from "@/components/breadcumb/Breadcumb12";
import Listing16 from "@/components/section/Listing16";

export async function generateMetadata() {
  const t = await getTranslations("jobsHub");
  return {
    title: t("browseTitle"),
    description: t("browseDescription"),
  };
}

export default async function BrowseJobsPage() {
  const t = await getTranslations("jobsHub");
  return (
    <>
      <Breadcumb3 path={[t("breadcrumbHome"), t("breadcrumbJobs"), t("breadcrumbBrowse")]} />
      <Suspense>
        <Breadcumb12 />
        <Listing16 />
      </Suspense>
    </>
  );
}
