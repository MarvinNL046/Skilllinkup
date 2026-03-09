import { getTranslations } from "next-intl/server";
import LocalHero from "@/components/hero/LocalHero";

export async function generateMetadata() {
  const t = await getTranslations("localHub");
  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default function LocalPage() {
  return (
    <>
      <LocalHero />
    </>
  );
}
