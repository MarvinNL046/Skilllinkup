import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ManageServiceInfo from "@/components/dashboard/section/ManageServiceInfo";
import AccountModeGuard from "@/components/dashboard/AccountModeGuard";


export async function generateMetadata() {
  const t = await getTranslations("manageServices");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

      <DashboardLayout maxWidth="wide">
        <AccountModeGuard role="freelancer" world="online"><ManageServiceInfo /></AccountModeGuard>
      </DashboardLayout>
    </>
  );
}
