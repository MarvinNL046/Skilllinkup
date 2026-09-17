import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import AccountModeGuard from "@/components/dashboard/AccountModeGuard";
import CreditsInfo from "@/components/dashboard/section/CreditsInfo";
import CreditsPageHeader from "@/components/dashboard/section/CreditsPageHeader";

export async function generateMetadata() {
  return {
    title: "Local beta access",
    robots: { index: false, follow: false },
  };
}

export default function CreditsPage() {
  return (
    <>
      <DashboardLayout maxWidth="wide">
        <AccountModeGuard role="local_professional" world="local">
        <div className="dashboard__content hover-bgc-color">
          <div className="row pb-10">
            <div className="col-lg-12">
              <DashboardNavigation />
            </div>
            <div className="col-lg-12">
              <CreditsPageHeader />
            </div>
          </div>
          <CreditsInfo />
        </div>
        </AccountModeGuard>
      </DashboardLayout>
    </>
  );
}
