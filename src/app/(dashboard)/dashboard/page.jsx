export const dynamic = "force-dynamic";

import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardInfo from "@/components/dashboard/section/DashboardInfo";


export async function generateMetadata() {
  const t = await getTranslations("dashboard");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

      <DashboardLayout maxWidth="full">
        <DashboardInfo />
      </DashboardLayout>
    </>
  );
}
