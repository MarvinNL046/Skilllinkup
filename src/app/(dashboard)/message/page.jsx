import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MessageInfo from "@/components/dashboard/section/MessageInfo";

export async function generateMetadata() {
  const t = await getTranslations("messages");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>
      <DashboardLayout maxWidth="full">
        <Suspense
          fallback={
            <p role="status" className="p-6">
              Opening messages…
            </p>
          }
        >
          <MessageInfo />
        </Suspense>
      </DashboardLayout>
    </>
  );
}
