import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import CreditsInfo from "@/components/dashboard/section/CreditsInfo";

export const metadata = {
  title: "SkillLinkup | Credits",
};

export default function CreditsPage() {
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
                <h2>Lead Credits</h2>
                <p className="text">
                  Buy credits to claim leads from the Local Marketplace. Each lead reveals
                  client contact details so you can reach out directly.
                </p>
              </div>
            </div>
          </div>
          <CreditsInfo />
        </div>
      </DashboardLayout>
    </>
  );
}
