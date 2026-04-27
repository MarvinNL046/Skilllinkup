"use client";

import Sticky from "react-stickynode";
import ProjectPriceWidget1 from "../element/ProjectPriceWidget1";
import ProjectContactWidget1 from "../element/ProjectContactWidget1";
import BidForm from "../element/BidForm";
import BidList from "../element/BidList";
import useScreen from "@/hook/useScreen";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import useConvexProjectDetail from "@/hook/useConvexProjectDetail";
import useConvexUser from "@/hook/useConvexUser";
import Link from "next/link";
import { useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Eye,
  DollarSign,
  Clock,
} from "lucide-react";

export default function ProjectDetail3() {
  const t = useTranslations("projectDetail");
  const isMatchedScreen = useScreen(1216);
  const { id } = useParams();
  const bidSectionRef = useRef(null);
  const scrollToBid = useCallback(() => {
    bidSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const convexData = useConvexProjectDetail(id);
  const { convexUser, isAuthenticated, isLoaded } = useConvexUser();

  const isLoading = convexData === undefined;

  const data = !isLoading
    ? convexData
      ? {
          _id: convexData._id,
          title: convexData.title,
          description: convexData.description || null,
          location: convexData.locationCity
            ? `${convexData.locationCity}, ${convexData.locationCountry || ""}`
            : convexData.workType === "remote"
            ? t("remote")
            : null,
          postedAt: convexData.createdAt
            ? new Date(convexData.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : null,
          views: convexData.views || null,
          budgetMin: convexData.budgetMin || null,
          budgetMax: convexData.budgetMax || null,
          requiredSkills: convexData.requiredSkills || [],
          bidCount: convexData.bidCount || 0,
          projectType: convexData.projectType || null,
          duration: convexData.duration || null,
        }
      : null
    : null;

  if (isLoading) {
    return (
      <section className="pt-8">
        <div className="container">
          <p className="text-center text-[var(--text-secondary)] py-12">
            {t("loadingProject")}
          </p>
        </div>
      </section>
    );
  }

  const title = data?.title || "";
  const location = data?.location || null;
  const postedAt = data?.postedAt || null;
  const views = data?.views != null ? `${data.views} ${t("views")}` : null;
  const description = data?.description || null;
  const skills =
    data?.requiredSkills && data.requiredSkills.length > 0
      ? data.requiredSkills
      : [];
  const bidCount = data?.bidCount ?? 0;

  const isOwner = !!(
    convexUser &&
    convexData &&
    convexUser._id === convexData.clientId
  );

  return (
    <section className="pt-8">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-8">
                {title && <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>}
                <div className="flex flex-wrap gap-x-5 gap-y-2 pb-6 mb-0 border-b border-[var(--border-subtle)] text-sm font-medium">
                  {location && (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-primary" />
                      {location}
                    </span>
                  )}
                  {postedAt && (
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-primary" />
                      {postedAt}
                    </span>
                  )}
                  {views && (
                    <span className="inline-flex items-center gap-1.5">
                      <Eye className="h-4 w-4 text-primary" />
                      {views}
                    </span>
                  )}
                </div>
                {(data?.projectType || data?.duration) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    {data?.projectType && (
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <DollarSign className="h-5 w-5" />
                        </div>
                        <div>
                          <h5 className="text-base font-semibold mb-1">
                            {t("projectType")}
                          </h5>
                          <p className="text-sm text-[var(--text-secondary)] mb-0">
                            {data.projectType}
                          </p>
                        </div>
                      </div>
                    )}
                    {data?.duration && (
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                          <Clock className="h-5 w-5" />
                        </div>
                        <div>
                          <h5 className="text-base font-semibold mb-1">
                            {t("projectDuration")}
                          </h5>
                          <p className="text-sm text-[var(--text-secondary)] mb-0">
                            {data.duration}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {description && (
              <Card>
                <CardContent className="p-8">
                  <h4 className="text-xl font-semibold mb-4">{t("description")}</h4>
                  <p className="text-base text-[var(--text-secondary)]">{description}</p>
                </CardContent>
              </Card>
            )}

            {skills.length > 0 && (
              <Card>
                <CardContent className="p-8">
                  <h4 className="text-xl font-semibold mb-5">
                    {t("skillsRequired")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((item, i) => (
                      <Badge key={i} variant="muted">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-8">
                <h4 className="text-xl font-semibold mb-5">
                  {t("projectProposals")} ({bidCount})
                </h4>
                {data?._id && <BidList projectId={data._id} isOwner={isOwner} />}

                <div ref={bidSectionRef} className="mt-6">
                  {!isLoaded ? null : !isAuthenticated ? (
                    <>
                      <Separator className="mb-6" />
                      <div className="text-center py-5">
                        <p className="text-base text-[var(--text-secondary)] mb-4">
                          {t("signInToBid")}
                        </p>
                        <Button asChild>
                          <Link href="/login">
                            {t("logInToBid")}
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </>
                  ) : isOwner ? null : data?._id ? (
                    <>
                      <Separator className="mb-6" />
                      <BidForm projectId={data._id} />
                    </>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1" id="stikyContainer">
            {isMatchedScreen ? (
              <Sticky bottomBoundary="#stikyContainer">
                <div className="space-y-5">
                  <ProjectPriceWidget1
                    budgetMin={convexData?.budgetMin}
                    budgetMax={convexData?.budgetMax}
                    currency={convexData?.currency}
                    scrollToBid={scrollToBid}
                  />
                  <ProjectContactWidget1
                    clientName={convexData?.clientName}
                    clientAvatar={convexData?.clientAvatar}
                    location={data?.location}
                    categoryName={convexData?.categoryName}
                  />
                </div>
              </Sticky>
            ) : (
              <div className="space-y-5">
                <ProjectPriceWidget1 />
                <ProjectContactWidget1 />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
