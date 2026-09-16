import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AccountModeGuard from "@/components/dashboard/AccountModeGuard";
import JobInvitations from "@/components/dashboard/section/JobInvitations";
export const metadata = {
  title: "Vacancy invitations",
  robots: { index: false, follow: false },
};
export default async function Page({ searchParams }) {
  const params = await searchParams;
  const invitationId =
    typeof params?.invitation === "string" ? params.invitation : undefined;
  return (
    <DashboardLayout>
      <AccountModeGuard role="candidate" world="jobs">
        <JobInvitations audience="candidate" invitationId={invitationId} />
      </AccountModeGuard>
    </DashboardLayout>
  );
}
