import PrelaunchWorld from "@/components/section/PrelaunchWorld";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("online");
  return {
    title: t("title"),
    description: t("metaDescription"),
    openGraph: {
      title: t("title"),
      description: t("metaDescription"),
      url: "https://skilllinkup.com/online",
    },
  };
}

export default function OnlinePage() {
  const bullets = [
    {
      title: "Vetted freelancers",
      desc: "Every profile on day one passes a skill + portfolio check. No spam accounts.",
    },
    {
      title: "Honest pricing",
      desc: "Flat commission, no hidden fees, clear escrow. You know what you pay and what the freelancer gets.",
    },
    {
      title: "Built for remote",
      desc: "Messaging, milestones, delivery — the whole project lives inside the platform.",
    },
  ];

  const categories = [
    { name: "Graphics & Design", href: "/online/services?q=graphics+design" },
    { name: "Digital Marketing", href: "/online/services?q=digital+marketing" },
    { name: "Writing & Translation", href: "/online/services?q=writing+translation" },
    { name: "Video & Animation", href: "/online/services?q=video+animation" },
    { name: "Programming & Tech", href: "/online/services?q=programming+tech" },
    { name: "Music & Audio", href: "/online/services?q=music+audio" },
    { name: "Data & Analytics", href: "/online/services?q=data+analytics" },
    { name: "Business Consulting", href: "/online/services?q=business+consulting" },
  ];

  return (
    <PrelaunchWorld
      tone="primary"
      eyebrow="Online marketplace"
      title="Remote freelancers,"
      accent="sharper than ever."
      subtitle="Design, development, marketing, writing — digital work that doesn't need a postcode. We're curating the network before we open the doors."
      bullets={bullets}
      categories={categories}
    />
  );
}
