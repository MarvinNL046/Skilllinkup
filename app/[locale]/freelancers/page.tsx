import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { FreelancerCard } from "@/components/marketplace/FreelancerCard";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Freelancers | SkillLinkup",
  description:
    "Browse verified freelance talent on SkillLinkup. Find skilled developers, designers, marketers, and more — ready to work on your next project.",
  openGraph: {
    title: "Freelancers | SkillLinkup",
    description:
      "Browse verified freelance talent on SkillLinkup. Find skilled developers, designers, marketers, and more — ready to work on your next project.",
  },
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function FreelancersPage({ params }: PageProps) {
  const { locale } = await params;

  type ConvexProfile = Awaited<ReturnType<typeof fetchQuery<typeof api.marketplace.freelancers.list>>>[number];
  let rawFreelancers: ConvexProfile[] = [];

  try {
    rawFreelancers = await fetchQuery(api.marketplace.freelancers.list, { locale, limit: 60 });
  } catch (error) {
    console.error("Error fetching freelancers:", error);
  }

  const freelancers = rawFreelancers.map((f) => ({
    id: f._id,
    user_id: f.userId,
    display_name: f.displayName ?? "Unknown",
    tagline: f.tagline ?? null,
    bio: f.bio ?? null,
    avatar_url: f.avatarUrl ?? null,
    hourly_rate: f.hourlyRate ?? null,
    work_type: f.workType ?? "remote",
    location_city: f.locationCity ?? null,
    location_country: f.locationCountry ?? null,
    skills: Array.isArray(f.skills) ? f.skills : [],
    languages: Array.isArray(f.languages) ? f.languages : [],
    is_verified: Boolean(f.isVerified),
    rating_average: Number(f.ratingAverage ?? 0),
    rating_count: Number(f.ratingCount ?? 0),
    total_orders: Number(f.totalOrders ?? 0),
    completion_rate: Number(f.completionRate ?? 0),
    response_time_hours: f.responseTimeHours ?? null,
    status: f.status,
    created_at: String(f.createdAt),
  }));

  return (
    <>
      <Breadcrumb title="Freelancers" brief="Browse verified freelance talent" />
      <section className="pt30 pb90">
        <div className="container">
          <div className="row">
            {freelancers.map((freelancer) => (
              <div key={freelancer.id} className="col-sm-6 col-xl-3 mb30">
                <FreelancerCard freelancer={freelancer} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
