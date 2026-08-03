import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ClientQuoteRequestsInfo from "@/components/dashboard/section/ClientQuoteRequestsInfo";

export const metadata = {
  title: "My local quote requests | Skilllinkup",
  robots: { index: false, follow: false },
};

export default function ClientQuoteRequestsPage() {
  return (
    <DashboardLayout maxWidth="wide">
      <ClientQuoteRequestsInfo />
    </DashboardLayout>
  );
}
