import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProjectBidsInfo from "@/components/dashboard/section/ProjectBidsInfo";

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
      <DashboardLayout maxWidth="full">
        <ProjectBidsInfo projectId={id} />
      </DashboardLayout>
    </>
  );
}
