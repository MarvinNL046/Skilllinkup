import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Breadcumb1 from "@/components/breadcumb/Breadcumb1";
import Listing14 from "@/components/section/Listing14";

export async function generateMetadata() {
  const t = await getTranslations("localHub");
  return {
    title: t("craftsmenTitle"),
    description: t("craftsmenDescription"),
    openGraph: {
      title: t("craftsmenTitle"),
      description: t("craftsmenDescription"),
    },
  };
}

export default async function CraftsmenPage() {
  const t = await getTranslations("localHub");
  return (
    <>
      <Breadcumb1
        title={t("craftsmenTitle")}
        brief={t("craftsmenBrief")}
        isBtnActive={false}
      />
      <Suspense>
        <Listing14 />
      </Suspense>
    </>
  );
}
