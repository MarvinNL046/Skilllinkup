import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CreateQuoteRequestInfo from "@/components/dashboard/section/CreateQuoteRequestInfo";
import AccountModeGuard from "@/components/dashboard/AccountModeGuard";

export const metadata = {
  title: "Request local quotes | Skilllinkup",
  robots: { index: false, follow: false },
};

export default function RequestLocalQuotePage() {
  return <DashboardLayout maxWidth="wide"><AccountModeGuard role="client" world="local"><CreateQuoteRequestInfo /></AccountModeGuard></DashboardLayout>;
}
