import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import MyLeadsInfo from "@/components/dashboard/section/MyLeadsInfo";
import MyLeadsPageHeader from "@/components/dashboard/section/MyLeadsPageHeader";

export async function generateMetadata() {
  const t = await getTranslations("myLeads");
  return {
    title: t("title"),
  };
}

export default function MyLeadsPage() {
  return (
    <>
      <DashboardLayout maxWidth="wide">
        <div className="dashboard__content hover-bgc-color">
          <div className="row pb-10">
            <div className="col-lg-12">
              <DashboardNavigation />
            </div>
            <div className="col-lg-12">
              <MyLeadsPageHeader />
            </div>
          </div>
          <MyLeadsInfo />
        </div>
      </DashboardLayout>
    </>
  );
}
