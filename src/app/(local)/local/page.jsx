import { getTranslations } from "next-intl/server";
import PrelaunchWorld from "@/components/section/PrelaunchWorld";

export async function generateMetadata() {
  const t = await getTranslations("localHub");
  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default function LocalPage() {
  const bullets = [
    {
      title: "Verified craftspeople",
      desc: "Plumbers, electricians, painters, gardeners — identity + insurance checked before we let them on the platform.",
    },
    {
      title: "Quote in minutes",
      desc: "Describe the job, get three quotes from pros in your area within a day. No call-around marathon.",
    },
    {
      title: "Local, not lost",
      desc: "We match on distance and availability — so the person who shows up is actually close and actually free.",
    },
  ];

  const categories = [
    { name: "Home renovation", href: "#" },
    { name: "Plumbing", href: "#" },
    { name: "Electrical", href: "#" },
    { name: "Painting & Decorating", href: "#" },
    { name: "Gardening & Landscaping", href: "#" },
    { name: "Cleaning", href: "#" },
    { name: "Moving & Delivery", href: "#" },
    { name: "Appliance repair", href: "#" },
  ];

  return (
    <PrelaunchWorld
      tone="secondary"
      eyebrow="Local marketplace"
      title="Someone in the neighbourhood who"
      accent="actually shows up."
      subtitle="Trades, repairs, cleaning, moving — the jobs that need a real person in your postcode. We check credentials so you don't have to."
      bullets={bullets}
      categories={categories}
    />
  );
}
