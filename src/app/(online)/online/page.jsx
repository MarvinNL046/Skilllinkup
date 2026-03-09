import Hero20 from "@/components/hero/Hero20";
import TrendingService14 from "@/components/section/TrendingService14";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("online");
  return {
    title: t("title"),
    description: t("metaDescription"),
    openGraph: {
      title: t("title"),
      description: t("metaDescription"),
      url: "https://skilllinkup.com/online",
    },
  };
}

export default function OnlinePage() {
  return (
    <>
      <Hero20 />
      <TrendingService14 />
    </>
  );
}
