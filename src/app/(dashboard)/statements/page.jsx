import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PrivateBetaFinanceInfo from "@/components/dashboard/section/PrivateBetaFinanceInfo";


export const metadata = { title: "Financial statement policy" };

export default function page() {
  return (
    <>

      <DashboardLayout maxWidth="wide">
        <PrivateBetaFinanceInfo kind="statements" />
      </DashboardLayout>
    </>
  );
}
