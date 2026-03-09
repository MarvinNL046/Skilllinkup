import { getTranslations } from "next-intl/server";
import Invoice from "@/components/section/Invoice";

export async function generateMetadata() {
  const t = await getTranslations("pageMeta.invoices");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function page() {
  return (
    <>
    
      <Invoice />
    </>
  );
}
