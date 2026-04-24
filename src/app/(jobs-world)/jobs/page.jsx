import { getTranslations } from "next-intl/server";
import PrelaunchWorld from "@/components/section/PrelaunchWorld";

export async function generateMetadata() {
  const t = await getTranslations("jobsHub");
  return {
    title: t("title"),
    description: t("metaDescription"),
  };
}

export default function JobsPage() {
  const bullets = [
    {
      title: "Real roles, real companies",
      desc: "Permanent and long-term contract positions. We turn away the endless gig reposts that fill other boards.",
    },
    {
      title: "Paid time to apply",
      desc: "Structured applications — no black-hole submissions. Every application gets a response within two weeks.",
    },
    {
      title: "Salary transparency by default",
      desc: "Every listing shows the band. Companies that won't disclose aren't on the platform.",
    },
  ];

  const categories = [
    { name: "Engineering", href: "#" },
    { name: "Design & Product", href: "#" },
    { name: "Marketing & Growth", href: "#" },
    { name: "Sales & Revenue", href: "#" },
    { name: "Operations & Finance", href: "#" },
    { name: "People & HR", href: "#" },
    { name: "Customer Support", href: "#" },
    { name: "Leadership", href: "#" },
  ];

  return (
    <PrelaunchWorld
      tone="neutral"
      eyebrow="Jobs"
      title="Hiring without the"
      accent="job-board fatigue."
      subtitle="Full-time and long-term contract roles at companies that take candidates seriously. Salary bands always shown. Applications always answered."
      bullets={bullets}
      categories={categories}
    />
  );
}
