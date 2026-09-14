import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AccountModeGuard from "@/components/dashboard/AccountModeGuard";
import JobInvitations from "@/components/dashboard/section/JobInvitations";
export const metadata = {
  title: "Vacancy invitations",
  robots: { index: false, follow: false },
};
export default function Page() {
  return (
    <DashboardLayout>
      <AccountModeGuard role="candidate" world="jobs">
        <JobInvitations audience="candidate" />
      </AccountModeGuard>
    </DashboardLayout>
  );
}
