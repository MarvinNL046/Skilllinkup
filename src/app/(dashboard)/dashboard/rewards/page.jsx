import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import RewardsInfo from "@/components/dashboard/section/RewardsInfo";

export async function generateMetadata() {
  const t = await getTranslations("rewards");
  return {
    title: t("title"),
  };
}

export default function RewardsPage() {
  return (
    <>
      <DashboardLayout maxWidth="medium">
        <RewardsInfo />
      </DashboardLayout>
    </>
  );
}
