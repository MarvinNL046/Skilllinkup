import { getTranslations } from "next-intl/server";
import CreateProjectInfo from "@/components/dashboard/section/CreateProjectInfo";
import AppFooter from "@/components/footer/AppFooter";
import AccountModeGuard from "@/components/dashboard/AccountModeGuard";

export async function generateMetadata() {
  const t = await getTranslations("createProject");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <div className="wrapper ovh">
      <AccountModeGuard role="client" world="online"><CreateProjectInfo /></AccountModeGuard>
      <AppFooter />
    </div>
  );
}
