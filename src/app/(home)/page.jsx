import Header19 from "@/components/header/Header19";
import WorldwideHome from "@/components/home/WorldwideHome";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("home");
  const locale = await getLocale();

  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    alternates: {
      canonical: "https://skilllinkup.com",
    },
    openGraph: {
      locale: locale === "nl" ? "nl_NL" : "en_US",
    },
  };
}

export default function page() {
  return (
    <div className="wrapper ovh">
      <Header19 />
      <div className="body_content">
        <WorldwideHome />
      </div>
    </div>
  );
}
