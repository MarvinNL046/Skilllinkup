import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AccountModeGuard from "@/components/dashboard/AccountModeGuard";
import CandidateDirectory from "@/components/dashboard/section/CandidateDirectory";
export const metadata = {
  title: "Find candidates | Skilllinkup",
  robots: { index: false, follow: false },
};
export default function CandidatesPage() {
  return (
    <DashboardLayout maxWidth="wide">
      <AccountModeGuard role="company" world="jobs">
        <CandidateDirectory />
      </AccountModeGuard>
    </DashboardLayout>
  );
}
