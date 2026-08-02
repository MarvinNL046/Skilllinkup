import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OrderWorkspace from "@/components/dashboard/section/OrderWorkspace";

export const metadata = {
  title: "Project workspace | Skilllinkup",
  robots: { index: false, follow: false },
};

export default async function OrderWorkspacePage({ params }) {
  const { id } = await params;
  return <DashboardLayout maxWidth="full"><OrderWorkspace orderId={id} /></DashboardLayout>;
}
