import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import PlatformListing from "@/components/section/PlatformListing";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("platformsListing");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default function PlatformsPage() {
  return (
    <>
      <Header20 />
      <PlatformListing />
      <Footer14 />
    </>
  );
}
