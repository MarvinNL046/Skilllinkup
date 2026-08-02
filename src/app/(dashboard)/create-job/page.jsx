import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CreateJobInfo from "@/components/dashboard/section/CreateJobInfo";

export const metadata = {
  title: "Publish a vacancy | Skilllinkup",
  robots: { index: false, follow: false },
};

export default function CreateJobPage() {
  return <DashboardLayout maxWidth="wide"><CreateJobInfo /></DashboardLayout>;
}
