import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ManageServiceInfo from "@/components/dashboard/section/ManageServiceInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export async function generateMetadata() {
  const t = await getTranslations("manageServices");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

    <MobileNavigation2 />
      <DashboardLayout maxWidth="wide">
        <ManageServiceInfo />
      </DashboardLayout>
    </>
  );
}
