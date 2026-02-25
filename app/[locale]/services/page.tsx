import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ServicesClient from "./ServicesClient";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const fallbackImages = [
  "/images/listings/ct-s-1.jpg",
  "/images/listings/ct-s-2.jpg",
  "/images/listings/ct-s-3.jpg",
  "/images/listings/ct-s-4.jpg",
  "/images/listings/ct-s-5.jpg",
  "/images/listings/ct-s-6.jpg",
];

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;

  let services: any[] = [];
  let categories: any[] = [];

  try {
    [services, categories] = await Promise.all([
      fetchQuery(api.marketplace.gigs.list, { locale, limit: 60 }),
      fetchQuery(api.marketplace.categories.list, { locale }),
    ]);
  } catch (error) {
    console.error("Error fetching services:", error);
  }

  const mappedServices = services.map((service: any, index: number) => ({
    slug: service.slug,
    title: service.title,
    category: service.category?.name ?? "Uncategorized",
    categorySlug: service.category?.slug ?? "uncategorized",
    image:
      service.firstImage?.imageUrl ||
      fallbackImages[index % fallbackImages.length],
    rating: Number(service.ratingAverage ?? 0),
    reviewCount: Number(service.ratingCount ?? 0),
    freelancerName: service.freelancerProfile?.displayName ?? "Freelancer",
    freelancerAvatar: service.freelancerProfile?.avatarUrl ?? null,
    priceFrom: Number(service.minPrice ?? 0),
    locationCountry: service.locationCountry ?? null,
  }));

  const mappedCategories = categories.map((cat: any) => ({
    name: cat.name,
    slug: cat.slug,
  }));

  return (
    <>
      <Breadcrumb
        title="Services"
        brief="Browse services from top freelancers"
      />
      <ServicesClient services={mappedServices} categories={mappedCategories} />
    </>
  );
}
