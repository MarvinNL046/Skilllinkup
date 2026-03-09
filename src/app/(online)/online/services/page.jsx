import { Suspense } from "react";
import Breadcumb1 from "@/components/breadcumb/Breadcumb1";
import Listing6 from "@/components/section/Listing6";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("services");
  return {
    title: t("title"),
    description: t("metaDescription"),
    openGraph: {
      title: t("title"),
      description: t("metaDescription"),
      url: "https://skilllinkup.com/online/services",
    },
  };
}

export default async function page() {
  const t = await getTranslations("services");
  return (
    <>
      <Breadcumb1
        title={t("title")}
        brief={t("breadcrumbBrief")}
        isBtnActive={false}
      />
      <Suspense>
        <Listing6 />
      </Suspense>
    </>
  );
}
