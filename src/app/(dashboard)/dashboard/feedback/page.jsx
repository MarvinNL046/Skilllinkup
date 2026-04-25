import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
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
      <DashboardLayout maxWidth="medium">
        <FeedbackInfo />
      </DashboardLayout>
    </>
  );
}
