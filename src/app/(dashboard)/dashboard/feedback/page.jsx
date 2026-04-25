import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import FeedbackInfo from "@/components/dashboard/section/FeedbackInfo";

export async function generateMetadata() {
  const t = await getTranslations("feedback");
  return {
    title: t("title"),
  };
}

export default function FeedbackPage() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout maxWidth="medium">
        <FeedbackInfo />
      </DashboardLayout>
    </>
  );
}
