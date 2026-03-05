import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import FeedbackInfo from "@/components/dashboard/section/FeedbackInfo";

export const metadata = {
  title: "SkillLinkup | My Feedback",
};

export default function FeedbackPage() {
  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <FeedbackInfo />
      </DashboardLayout>
    </>
  );
}
