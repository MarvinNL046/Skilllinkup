import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AddServiceInfo from "@/components/dashboard/section/AddServiceInfo";


export async function generateMetadata() {
  const t = await getTranslations("addService");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

      <DashboardLayout maxWidth="form">
        <AddServiceInfo />
      </DashboardLayout>
    </>
  );
}
