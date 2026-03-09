import { Suspense } from "react";
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Breadcumb18 from "@/components/breadcumb/Breadcumb18";
import Listing19 from "@/components/section/Listing19";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("projects");
  return {
    title: t("title"),
    description: t("metaDescription"),
    openGraph: {
      title: t("title"),
      description: t("metaDescription"),
      url: "https://skilllinkup.com/online/projects",
    },
  };
}

export default async function page() {
  const t = await getTranslations("projects");
  return (
    <>
      <Breadcumb3 path={[t("breadcrumbHome"), t("breadcrumbProjects")]} />
      <Suspense>
        <Breadcumb18 />
        <Listing19 />
      </Suspense>
    </>
  );
}
