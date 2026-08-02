import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PrivateBetaFinanceInfo from "@/components/dashboard/section/PrivateBetaFinanceInfo";


export const metadata = { title: "Invoice policy" };

export default function page() {
  return (
    <>

      <DashboardLayout maxWidth="wide">
        <PrivateBetaFinanceInfo kind="invoices" />
      </DashboardLayout>
    </>
  );
}
