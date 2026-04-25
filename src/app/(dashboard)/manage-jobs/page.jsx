import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ManageJobInfo from "@/components/dashboard/section/ManageJobInfo";


export async function generateMetadata() {
  const t = await getTranslations("manageJobs");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

      <DashboardLayout maxWidth="wide">
        <ManageJobInfo />
      </DashboardLayout>
    </>
  );
}
