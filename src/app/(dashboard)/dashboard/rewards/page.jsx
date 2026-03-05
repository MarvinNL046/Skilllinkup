import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import RewardsInfo from "@/components/dashboard/section/RewardsInfo";

export const metadata = {
  title: "SkillLinkup | My Rewards",
};

export default function page() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <RewardsInfo />
      </DashboardLayout>
    </>
  );
}
