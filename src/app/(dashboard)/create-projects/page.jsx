import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CreateProjectInfo from "@/components/dashboard/section/CreateProjectInfo";


export async function generateMetadata() {
  const t = await getTranslations("createProject");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

      <DashboardLayout maxWidth="form">
        <CreateProjectInfo />
      </DashboardLayout>
    </>
  );
}
