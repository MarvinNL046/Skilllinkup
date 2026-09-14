import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AccountModeGuard from "@/components/dashboard/AccountModeGuard";
import CandidateProfile from "@/components/dashboard/section/CandidateProfile";
export const metadata = {
  title: "My profile & CV | Skilllinkup",
  robots: { index: false, follow: false },
};
export default function CandidateProfilePage() {
  return (
    <DashboardLayout maxWidth="wide">
      <AccountModeGuard role="candidate" world="jobs">
        <CandidateProfile />
      </AccountModeGuard>
    </DashboardLayout>
  );
}
