import { fetchQuery } from "convex/nextjs";
import { notFound } from "next/navigation";
import { api } from "../../../../../../convex/_generated/api";
import Breadcumb10 from "@/components/breadcumb/Breadcumb10";
import FreelancerDetail3 from "@/components/section/FreelancerDetails3";

// Accept both Convex IDs (alphanumeric) and URL slugs (with hyphens)
function isValidParam(id) {
  return id && typeof id === "string" && id.length >= 2 && /^[a-zA-Z0-9-]+$/.test(id);
}

// Convex IDs are alphanumeric strings (no hyphens)
function isConvexId(id) {
  return id && typeof id === "string" && id.length > 10 && /^[a-zA-Z0-9]+$/.test(id);
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const profile = isConvexId(id)
      ? await fetchQuery(api.marketplace.freelancers.getById, { profileId: id })
      : await fetchQuery(api.marketplace.freelancers.getBySlug, { slug: id });
    if (profile) {
      const name = profile.displayName || "Freelancer";
      const title = profile.title || "";
      return {
        title: title ? `${name} — ${title}` : name,
        description: profile.bio
          ? profile.bio.slice(0, 155)
          : `Hire ${name} on SkillLinkup. View portfolio, reviews, and services.`,
        openGraph: {
          title: name,
          description: profile.bio?.slice(0, 155) || `Freelancer on SkillLinkup`,
          images: profile.avatar ? [{ url: profile.avatar }] : [],
        },
      };
    }
  } catch {}
  return {
    title: "Freelancer Profile",
    description: "View freelancer profile, portfolio, reviews, and services on SkillLinkup.",
  };
}

export default async function page({ params }) {
  const { id } = await params;

  // Reject obviously invalid IDs (numeric, too short, injection attempts)
  if (!isValidParam(id)) {
    notFound();
  }

  return (
    <div className="bgc-thm3">
      <Breadcumb10 path={["Home", "Freelancers"]} />
      <FreelancerDetail3 />
    </div>
  );
}
