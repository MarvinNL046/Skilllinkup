import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import OrderList from "@/components/section/OrderList";

export async function generateMetadata() {
  const t = await getTranslations("orders");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>
      <DashboardLayout maxWidth="wide">
        <div className="dashboard__content hover-bgc-color">
          <div className="row pb-10">
            <div className="col-lg-12">
              <DashboardNavigation />
            </div>
            <div className="col-lg-12">
              <OrderList />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
