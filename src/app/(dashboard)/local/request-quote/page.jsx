import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CreateQuoteRequestInfo from "@/components/dashboard/section/CreateQuoteRequestInfo";

export const metadata = {
  title: "Request local quotes | Skilllinkup",
  robots: { index: false, follow: false },
};

export default function RequestLocalQuotePage() {
  return <DashboardLayout maxWidth="wide"><CreateQuoteRequestInfo /></DashboardLayout>;
}
