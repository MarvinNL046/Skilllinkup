import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProjectBidsInfo from "@/components/dashboard/section/ProjectBidsInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export async function generateMetadata() {
  const t = await getTranslations("projectBids");
  return {
    title: t("title"),
  };
}

export default async function ProjectBidsPage({ params }) {
  const { id } = await params;

  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout maxWidth="full">
        <ProjectBidsInfo projectId={id} />
      </DashboardLayout>
    </>
  );
}
