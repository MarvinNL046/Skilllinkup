import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import MyLeadsInfo from "@/components/dashboard/section/MyLeadsInfo";

export const metadata = {
  title: "SkillLinkup | My Leads",
};

export default function MyLeadsPage() {
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
                <h2>My Leads</h2>
                <p className="text">
                  Leads you have claimed. Client contact details are shown below.
                </p>
              </div>
            </div>
          </div>
          <MyLeadsInfo />
        </div>
      </DashboardLayout>
    </>
  );
}
