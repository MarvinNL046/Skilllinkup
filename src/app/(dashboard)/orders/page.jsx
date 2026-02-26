import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import OrderList from "@/components/section/OrderList";

export const metadata = {
  title: "SkillLinkup | My Orders",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <div className="dashboard__content hover-bgc-color">
          <div className="row pb40">
            <div className="col-lg-12">
              <DashboardNavigation />
            </div>
            <div className="col-lg-12">
              <div className="dashboard_title_area">
                <h2>My Orders</h2>
                <p className="text">Manage your orders as buyer or seller.</p>
              </div>
            </div>
          </div>

          <OrderList />
        </div>
      </DashboardLayout>
    </>
  );
}
