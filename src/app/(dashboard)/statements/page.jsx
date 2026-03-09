import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatementInfo from "@/components/dashboard/section/StatementInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export async function generateMetadata() {
  const t = await getTranslations("statements");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

    <MobileNavigation2 />
      <DashboardLayout>
        <StatementInfo />
      </DashboardLayout>
    </>
  );
}
