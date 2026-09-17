import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PrivateBetaFinanceInfo from "@/components/dashboard/section/PrivateBetaFinanceInfo";

export const metadata = {
  title: "Rewards | Skilllinkup",
  robots: { index: false, follow: false },
};

// Kept so existing links and bookmarks land on an honest notice instead of a 404.
export default function RewardsPage() {
  return (
    <DashboardLayout maxWidth="medium">
      <PrivateBetaFinanceInfo kind="rewards" />
    </DashboardLayout>
  );
}
