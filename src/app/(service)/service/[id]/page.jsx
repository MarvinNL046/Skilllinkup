import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import PopulerService from "@/components/section/PopulerService";
import ServiceDetail3 from "@/components/section/ServiceDetails3";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("gigDetail");
  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default async function ServiceSinglePage() {
  const t = await getTranslations("gigDetail");
  return (
    <div style={{ background: "var(--bg)" }}>
      <Header20 />
      <Breadcumb3 path={[t("breadcrumbHome"), t("breadcrumbServices"), t("breadcrumbCategory")]} />
      <ServiceDetail3 />
      <PopulerService />
      <Footer14 />
    </div>
  );
}
