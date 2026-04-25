import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatementInfo from "@/components/dashboard/section/StatementInfo";


export async function generateMetadata() {
  const t = await getTranslations("statements");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

      <DashboardLayout maxWidth="wide">
        <StatementInfo />
      </DashboardLayout>
    </>
  );
}
