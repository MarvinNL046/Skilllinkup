import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import AdminDisputeList from "@/components/dashboard/AdminDisputeList";

export const metadata = {
  title: "SkillLinkup | Admin — Disputes",
};

export default function AdminDisputesPage() {
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
                <h2>Dispute Management</h2>
                <p className="text">
                  Review open disputes and release funds or refund the client.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <AdminDisputeList />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
