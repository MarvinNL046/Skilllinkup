import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AccountModeGuard from "@/components/dashboard/AccountModeGuard";
import JobInvitations from "@/components/dashboard/section/JobInvitations";
export const metadata = {
  title: "Sent invitations",
  robots: { index: false, follow: false },
};
export default function Page() {
  return (
    <DashboardLayout>
      <AccountModeGuard role="company" world="jobs">
        <JobInvitations audience="company" />
      </AccountModeGuard>
    </DashboardLayout>
  );
}
