import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProposalInfo from "@/components/dashboard/section/ProposalInfo";


export async function generateMetadata() {
  const t = await getTranslations("proposals");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

      <DashboardLayout maxWidth="wide">
        <ProposalInfo />
      </DashboardLayout>
    </>
  );
}
