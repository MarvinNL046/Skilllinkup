import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import InvoiceInfo from "@/components/dashboard/section/InvoiceInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export async function generateMetadata() {
  const t = await getTranslations("invoice");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

    <MobileNavigation2 />
      <DashboardLayout maxWidth="wide">
        <InvoiceInfo />
      </DashboardLayout>
    </>
  );
}
