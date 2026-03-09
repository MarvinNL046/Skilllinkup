import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import Breadcumb1 from "@/components/breadcumb/Breadcumb1";
import Listing14 from "@/components/section/Listing14";

export async function generateMetadata() {
  const t = await getTranslations("pageMeta.onlineFreelancers");
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

export default function page() {
  return (
    <>
      <Breadcumb1
        title="Find Freelancers"
        brief="Browse talented professionals ready to work on your project."
        isBtnActive={false}
      />
      <Suspense>
        <Listing14 />
      </Suspense>
    </>
  );
}
