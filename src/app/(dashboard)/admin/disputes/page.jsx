import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MobileNavigation2 from "@/components/header/MobileNavigation2";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import AdminDisputeList from "@/components/dashboard/AdminDisputeList";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export const metadata = {
  title: "Admin — Disputes",
};

export default async function AdminDisputesPage() {
  const clerkUser = await currentUser();
  const email = clerkUser?.primaryEmailAddress?.emailAddress;
  const serverSecret = process.env.INTERNAL_EMAIL_SECRET;

  if (!email || !serverSecret) {
    notFound();
  }

  const convexUser = await convex.query(api.users.getByEmail, {
    email,
    serverSecret,
  });

  if (!convexUser || convexUser.role !== "admin") {
    notFound();
  }

  return (
    <>
      <MobileNavigation2 />
      <DashboardLayout>
        <div className="dashboard__content hover-bgc-color">
          <div className="row pb40">
            <div className="col-lg-12">
              <DashboardNavigation />
            </div>
            <div className="col-lg-12">
              <div className="dashboard_title_area">
                <h2>Dispute Management</h2>
                <p className="text">
                  Review open disputes and release funds or refund the client.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <AdminDisputeList />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
