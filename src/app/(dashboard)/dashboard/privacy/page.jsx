import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PrivacyInfo from "@/components/dashboard/section/PrivacyInfo";

export const metadata = {
  title: "Data & Privacy",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return <DashboardLayout maxWidth="wide"><PrivacyInfo /></DashboardLayout>;
}
