import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SavedInfo from "@/components/dashboard/section/SavedInfo";


export async function generateMetadata() {
  const t = await getTranslations("saved");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

      <DashboardLayout maxWidth="wide">
        <SavedInfo />
      </DashboardLayout>
    </>
  );
}
