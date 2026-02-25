import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { EmployeeCard } from "@/components/marketplace/EmployeeCard";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clients & Employers | SkillLinkup",
  description:
    "Browse clients and employers on SkillLinkup who are looking for talented freelancers. Connect with businesses ready to hire for their next project.",
  openGraph: {
    title: "Clients & Employers | SkillLinkup",
    description:
      "Browse clients and employers on SkillLinkup who are looking for talented freelancers. Connect with businesses ready to hire for their next project.",
  },
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function EmployeesPage({ params }: PageProps) {
  const { locale } = await params;

  type ConvexClient = Awaited<
    ReturnType<typeof fetchQuery<typeof api.marketplace.clients.list>>
  >[number];

  let rawClients: ConvexClient[] = [];

  try {
    rawClients = await fetchQuery(api.marketplace.clients.list, {
      locale,
      limit: 60,
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
  }

  return (
    <>
      <Breadcrumb
        title="Clients & Employers"
        brief="Browse clients looking for talented freelancers"
      />

      <section className="pt30 pb90">
        <div className="container">
          {rawClients.length === 0 ? (
            <div className="row">
              <div className="col-12 text-center py60">
                <p className="fz18 text-muted">No clients registered yet.</p>
                <p className="fz14 text-muted mt10">
                  Be the first to sign up as a client and post your projects!
                </p>
              </div>
            </div>
          ) : (
            <div className="row">
              {rawClients.map((client) => (
                <div key={client._id} className="col-sm-6 col-xl-3 mb30">
                  <EmployeeCard
                    _id={client._id}
                    name={client.name}
                    email={client.email}
                    avatar={client.avatar}
                    bio={client.bio}
                    locationCity={client.locationCity}
                    locationCountry={client.locationCountry}
                    createdAt={client.createdAt}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
