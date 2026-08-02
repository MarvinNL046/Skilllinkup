import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EmployerApplications from "@/components/dashboard/section/EmployerApplications";

export const metadata = {
  title: "Review job applicants | Skilllinkup",
  robots: { index: false, follow: false },
};

export default async function JobApplicationsPage({ params }) {
  const { id } = await params;
  return <DashboardLayout maxWidth="wide"><EmployerApplications jobId={id} /></DashboardLayout>;
}
