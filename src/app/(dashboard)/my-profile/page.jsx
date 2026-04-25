import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MyProfileInfo from "@/components/dashboard/section/MyProfileInfo";


export async function generateMetadata() {
  const t = await getTranslations("myProfile");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

      <DashboardLayout maxWidth="medium">
        <Suspense>
          <MyProfileInfo />
        </Suspense>
      </DashboardLayout>
    </>
  );
}
