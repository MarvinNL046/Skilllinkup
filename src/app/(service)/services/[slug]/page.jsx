import { fetchQuery } from "convex/nextjs";
import { notFound } from "next/navigation";
import { api } from "../../../../../convex/_generated/api";
import Header20 from "@/components/header/Header20";
import Footer14 from "@/components/footer/Footer14";
import ServiceSearchResults from "@/components/services/ServiceSearchResults";
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await fetchQuery(api.marketplace.categories.getBySlug, { slug, locale: "en" });
  return { title: category?.name || "Services", description: category?.description || "Compare service packages and professionals on SkillLinkup.", alternates: { canonical: "/services/" + slug } };
}
export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = await fetchQuery(api.marketplace.categories.getBySlug, { slug, locale: "en" });
  if (!category) notFound();
  return <><Header20 /><ServiceSearchResults category={slug} categoryName={category.name} /><Footer14 /></>;
}
