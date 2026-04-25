import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ReviewsInfo from "@/components/dashboard/section/ReviewsInfo";


export async function generateMetadata() {
  const t = await getTranslations("reviews");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

      <DashboardLayout maxWidth="wide">
        <ReviewsInfo />
      </DashboardLayout>
    </>
  );
}
