import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MessageInfo from "@/components/dashboard/section/MessageInfo";


export async function generateMetadata() {
  const t = await getTranslations("messages");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

      <DashboardLayout maxWidth="full">
        <MessageInfo />
      </DashboardLayout>
    </>
  );
}
