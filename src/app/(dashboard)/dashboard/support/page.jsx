import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SupportInfo from "@/components/dashboard/section/SupportInfo";

export const metadata = {
  title: "Help & Support",
  robots: { index: false, follow: false },
};

export default function SupportPage() {
  return (
    <DashboardLayout maxWidth="wide">
      <SupportInfo />
    </DashboardLayout>
  );
}
