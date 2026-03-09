import { getTranslations } from "next-intl/server";
import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import FreelancerDetail3 from "@/components/section/FreelancerDetails3";

export async function generateMetadata() {
  const t = await getTranslations("localHub");
  return {
    title: t("craftsmanProfileTitle"),
    description: t("craftsmanProfileDescription"),
  };
}

export default async function CraftsmanDetailPage({ params }) {
  const { id } = await params;
  const t = await getTranslations("localHub");

  return (
    <div className="bgc-thm3">
      <Breadcumb10 path={[t("breadcrumbHome"), t("breadcrumbLocal"), t("breadcrumbCraftsmen")]} />
      <FreelancerDetail3 />
    </div>
  );
}
