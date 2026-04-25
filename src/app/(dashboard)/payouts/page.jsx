import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PayoutInfo from "@/components/dashboard/section/PayoutInfo";


export async function generateMetadata() {
  const t = await getTranslations("payouts");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

      <DashboardLayout maxWidth="wide">
        <PayoutInfo />
      </DashboardLayout>
    </>
  );
}
