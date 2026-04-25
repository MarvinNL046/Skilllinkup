import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MyProfileInfo from "@/components/dashboard/section/MyProfileInfo";

import MobileNavigation2 from "@/components/header/MobileNavigation2";

export async function generateMetadata() {
  const t = await getTranslations("myProfile");
  return {
    title: t("title"),
  };
}

export default function page() {
  return (
    <>

    <MobileNavigation2 />
      <DashboardLayout maxWidth="medium">
        <Suspense>
          <MyProfileInfo />
        </Suspense>
      </DashboardLayout>
    </>
  );
}
