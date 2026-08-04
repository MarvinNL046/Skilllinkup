import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ClientQuoteRequestsInfo from "@/components/dashboard/section/ClientQuoteRequestsInfo";
import AccountModeGuard from "@/components/dashboard/AccountModeGuard";

export const metadata = {
  title: "My local quote requests | Skilllinkup",
  robots: { index: false, follow: false },
};

export default function ClientQuoteRequestsPage() {
  return (
    <DashboardLayout maxWidth="wide">
      <AccountModeGuard role="client" world="local"><ClientQuoteRequestsInfo /></AccountModeGuard>
    </DashboardLayout>
  );
}
