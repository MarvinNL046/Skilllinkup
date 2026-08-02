import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PrivateBetaFinanceInfo from "@/components/dashboard/section/PrivateBetaFinanceInfo";


export const metadata = { title: "Payout policy" };

export default function page() {
  return (
    <>

      <DashboardLayout maxWidth="wide">
        <PrivateBetaFinanceInfo kind="payouts" />
      </DashboardLayout>
    </>
  );
}
