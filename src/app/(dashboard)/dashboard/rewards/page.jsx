import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
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
      <MobileNavigation2 />
      <DashboardLayout>
        <RewardsInfo />
      </DashboardLayout>
    </>
  );
}
