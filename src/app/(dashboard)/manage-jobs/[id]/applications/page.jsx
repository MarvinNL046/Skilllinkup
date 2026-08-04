import DashboardLayout from "@/components/dashboard/DashboardLayout";
import EmployerApplications from "@/components/dashboard/section/EmployerApplications";
import AccountModeGuard from "@/components/dashboard/AccountModeGuard";

export const metadata = {
  title: "Review job applicants | Skilllinkup",
  robots: { index: false, follow: false },
};

export default async function JobApplicationsPage({ params }) {
  const { id } = await params;
  return <DashboardLayout maxWidth="wide"><AccountModeGuard role="company" world="jobs"><EmployerApplications jobId={id} /></AccountModeGuard></DashboardLayout>;
}
