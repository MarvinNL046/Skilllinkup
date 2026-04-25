import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api";
import Breadcumb3 from "@/components/breadcumb/Breadcumb3";
import PopulerService from "@/components/section/PopulerService";
import ServiceDetail3 from "@/components/section/ServiceDetails3";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const gig = await fetchQuery(api.marketplace.gigs.getBySlug, {
      slug: id,
      locale: "en",
    });
    if (gig) {
      return {
        title: gig.title,
        description: gig.description
          ? gig.description.slice(0, 155)
          : `Hire a freelancer for ${gig.title} on SkillLinkup.`,
        openGraph: {
          title: gig.title,
          description: gig.description?.slice(0, 155) || gig.title,
        },
      };
    }
  } catch {}
  return {
    title: "Service Details",
    description: "View service details, pricing, and seller information on SkillLinkup.",
  };
}

export default async function ServiceDetailPage({ params }) {
  const { id } = await params;
  return (
    <>
      <Breadcumb3 path={["Home", "Services"]} />
      <ServiceDetail3 />
      <PopulerService />
    </>
  );
}
