import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardNavigation from "@/components/dashboard/header/DashboardNavigation";
import AdminDisputeList from "@/components/dashboard/AdminDisputeList";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

export async function generateMetadata() {
  const t = await getTranslations("adminDisputes");
  return {
    title: t("title"),
  };
}

export default async function AdminDisputesPage() {
  const t = await getTranslations("adminDisputes");
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
      <DashboardLayout maxWidth="wide">
        <div className="dashboard__content hover-bgc-color">
          <div className="row pb40">
            <div className="col-lg-12">
              <DashboardNavigation />
            </div>
            <div className="col-lg-12">
              <div className="dashboard_title_area">
                <h2>{t("heading")}</h2>
                <p className="text">
                  {t("pageDescription")}
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
