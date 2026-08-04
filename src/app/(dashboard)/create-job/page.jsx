import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CreateJobInfo from "@/components/dashboard/section/CreateJobInfo";
import AccountModeGuard from "@/components/dashboard/AccountModeGuard";

export const metadata = {
  title: "Publish a vacancy | Skilllinkup",
  robots: { index: false, follow: false },
};

export default function CreateJobPage() {
  return <DashboardLayout maxWidth="wide"><AccountModeGuard role="company" world="jobs"><CreateJobInfo /></AccountModeGuard></DashboardLayout>;
}
