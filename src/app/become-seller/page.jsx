import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import BecomeSeller from "@/components/section/BecomeSeller";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("becomeSeller");
  return {
    title: t("title"),
    description: t("metaDescription"),
    openGraph: {
      title: t("title"),
      description: t("metaDescription"),
    },
  };
}

export default function page() {
  return (
    <>
      <Header20 />
      <BecomeSeller />
      <Footer14 />
    </>
  );
}
