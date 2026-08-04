import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CandidateApplications from "@/components/dashboard/section/CandidateApplications";
import AccountModeGuard from "@/components/dashboard/AccountModeGuard";

export const metadata = {
  title: "My job applications | Skilllinkup",
  robots: { index: false, follow: false },
};

export default function ApplicationsPage() {
  return <DashboardLayout maxWidth="wide"><AccountModeGuard role="candidate" world="jobs"><CandidateApplications /></AccountModeGuard></DashboardLayout>;
}
