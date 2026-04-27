"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import useConvexClients from "@/hook/useConvexClients";
import useConvexJobs from "@/hook/useConvexJobs";
import JobCard4 from "../card/JobCard4";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  Calendar,
  MapPin,
  Briefcase,
} from "lucide-react";

function formatMonthYear(timestamp) {
  if (!timestamp) return null;
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function EmplyeeDetail1() {
  const t = useTranslations("common");
  const { id } = useParams();
  const clients = useConvexClients();
  const jobs = useConvexJobs();

  if (clients === undefined || jobs === undefined) {
    return (
      <section className="pt-2 pb-24">
        <div className="container">
          <div className="flex justify-center py-12">
            <div
              role="status"
              aria-label={t("loading")}
              className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--border-subtle)] border-t-primary"
            />
          </div>
        </div>
      </section>
    );
  }

  const company =
    clients && id
      ? clients.find((item) => String(item._id) === String(id))
      : null;

  const companyJobs = (jobs || [])
    .filter((job) => String(job.clientId) === String(id))
    .slice(0, 3);

  const memberSince = formatMonthYear(company?.createdAt);

  return (
    <section className="pt-2 pb-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h4 className="text-2xl font-semibold mb-5">About Company</h4>
            <p className="text-base text-[var(--text-secondary)] mb-8">
              {company?.bio
                ? company.bio
                : "This company has not added a public description yet."}
            </p>

            <h4 className="text-2xl font-semibold mb-6 mt-10">Open Jobs</h4>
            {companyJobs.length === 0 ? (
              <p className="text-base text-[var(--text-secondary)]">
                No open jobs from this company right now.
              </p>
            ) : (
              <div className="space-y-5">
                {companyJobs.map((item) => (
                  <JobCard4 key={item._id} data={item} />
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-5">Company Info</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                    <span className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <Building2 className="h-4 w-4 text-primary" />
                      Company
                    </span>
                    <span className="text-sm font-medium">
                      {company?.server || "Unknown"}
                    </span>
                  </div>
                  {memberSince && (
                    <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                      <span className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <Calendar className="h-4 w-4 text-primary" />
                        Member since
                      </span>
                      <span className="text-sm font-medium">{memberSince}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                    <span className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <MapPin className="h-4 w-4 text-primary" />
                      Location
                    </span>
                    <span className="text-sm font-medium">
                      {company?.location || "Remote"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <Briefcase className="h-4 w-4 text-primary" />
                      Open jobs
                    </span>
                    <span className="text-sm font-medium">{companyJobs.length}</span>
                  </div>
                </div>
                <Button asChild className="w-full mt-6">
                  <Link href="/contact">
                    Contact
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
