import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import CreditsInfo from "@/components/dashboard/section/CreditsInfo";
import CreditsPageHeader from "@/components/dashboard/section/CreditsPageHeader";

export async function generateMetadata() {
  const t = await getTranslations("creditsInfo");
  return {
    title: t("title"),
  };
}

export default function CreditsPage() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout maxWidth="wide">
        <div className="dashboard__content hover-bgc-color">
          <div className="row pb40">
            <div className="col-lg-12">
              <DashboardNavigation />
            </div>
            <div className="col-lg-12">
              <CreditsPageHeader />
            </div>
          </div>
          <CreditsInfo />
        </div>
      </DashboardLayout>
    </>
  );
}
