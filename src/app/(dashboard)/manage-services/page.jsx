import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ManageServiceInfo from "@/components/dashboard/section/ManageServiceInfo";


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
        <ManageServiceInfo />
      </DashboardLayout>
    </>
  );
}
