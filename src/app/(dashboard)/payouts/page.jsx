import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PayoutInfo from "@/components/dashboard/section/PayoutInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export async function generateMetadata() {
  const t = await getTranslations("payouts");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

    <MobileNavigation2 />
      <DashboardLayout maxWidth="wide">
        <PayoutInfo />
      </DashboardLayout>
    </>
  );
}
