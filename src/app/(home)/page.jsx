import Footer14 from "@/components/footer/Footer14";
import Header19 from "@/components/header/Header19";
import HomepageHero from "@/components/hero/HomepageHero";
import NeedSomething2 from "@/components/section/NeedSomething2";
import CtaBanner18 from "@/components/section/CtaBanner18";
import SocialProofStats from "@/components/section/SocialProofStats";
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
        <HomepageHero />
        <SocialProofStats />
        <NeedSomething2 />
        <CtaBanner18 />
      </div>
      <Footer14 />
    </div>
  );
}
