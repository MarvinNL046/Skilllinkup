import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OrdersInfo from "@/components/dashboard/section/OrdersInfo";
import MobileNavigation2 from "@/components/header/MobileNavigation2";

export const metadata = {
  title: "SkillLinkup | My Orders",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <OrdersInfo />
      </DashboardLayout>
    </>
  );
}
