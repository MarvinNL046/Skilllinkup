import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CreateProjectInfo from "@/components/dashboard/section/CreateProjectInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export async function generateMetadata() {
  const t = await getTranslations("createProject");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

    <MobileNavigation2 />
      <DashboardLayout>
        <CreateProjectInfo />
      </DashboardLayout>
    </>
  );
}
