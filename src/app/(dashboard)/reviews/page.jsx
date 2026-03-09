import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ReviewsInfo from "@/components/dashboard/section/ReviewsInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export async function generateMetadata() {
  const t = await getTranslations("reviews");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

    <MobileNavigation2 />
      <DashboardLayout>
        <ReviewsInfo />
      </DashboardLayout>
    </>
  );
}
