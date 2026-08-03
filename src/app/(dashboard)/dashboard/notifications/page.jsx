import DashboardLayout from "@/components/dashboard/DashboardLayout";
import NotificationCentre from "@/components/dashboard/section/NotificationCentre";

export const metadata = {
  title: "Notifications | Skilllinkup",
};

export default function NotificationsPage() {
  return (
    <DashboardLayout maxWidth="medium">
      <NotificationCentre />
    </DashboardLayout>
  );
}
