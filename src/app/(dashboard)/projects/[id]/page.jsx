import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProjectBidsInfo from "@/components/dashboard/section/ProjectBidsInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "Project Bids",
};

export default async function ProjectBidsPage({ params }) {
  const { id } = await params;

  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <ProjectBidsInfo projectId={id} />
      </DashboardLayout>
    </>
  );
}
