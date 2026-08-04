import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ManageProjectInfo from "@/components/dashboard/section/ManageProjectInfo";
import AccountModeGuard from "@/components/dashboard/AccountModeGuard";


export async function generateMetadata() {
  const t = await getTranslations("manageProjects");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

      <DashboardLayout maxWidth="wide">
        <AccountModeGuard role="client" world="online"><ManageProjectInfo /></AccountModeGuard>
      </DashboardLayout>
    </>
  );
}
