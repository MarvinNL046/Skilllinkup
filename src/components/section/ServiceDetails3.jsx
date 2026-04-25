"use client";

import Sticky from "react-stickynode";

import useScreen from "@/hook/useScreen";
import ServiceContactWidget1 from "../element/ServiceContactWidget1";
import ServiceDetailSlider2 from "../element/ServiceDetailSlider2";
import ServiceDetailPrice1 from "../element/ServiceDetailPrice1";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { Star, Eye, ClipboardList, Clock, MapPin, ArrowRight } from "lucide-react";
import useConvexGigDetail from "@/hook/useConvexGigDetail";
import ContactButton from "@/components/ui/ContactButton";

export default function ServiceDetail3() {
  const t = useTranslations("gigDetail");
  const isMatchedScreen = useScreen(1216);
  const { id } = useParams();
  const router = useRouter();
  const { isSignedIn } = useUser();

  function handleSelectPackage() {
    if (!isSignedIn) {
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "/";
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    router.push("/dashboard/orders");
  }

  const gigData = useConvexGigDetail(id);

  // Map Convex data to the shape this component expects
  const data =
    gigData !== undefined
      ? gigData
        ? {
            id: gigData._id,
            title: gigData.title,
            description: gigData.description,
            category: gigData.category?.name,
            rating: gigData.ratingAverage || 0,
            reviewCount: gigData.ratingCount || 0,
            views: gigData.views || 0,
            orderCount: gigData.orderCount || 0,
            freelancer: gigData.freelancerProfile,
            packages: gigData.packages || [],
            images: gigData.images || [],
            workType: gigData.workType,
            location: gigData.locationCity
              ? `${gigData.locationCity}, ${gigData.locationCountry || ""}`
              : t("remote"),
          }
        : null
      : null; // null = still loading

  if (data === null) {
    return (
      <section style={{ padding: "var(--space-16) 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p className="body-md" style={{ color: "var(--text-secondary)" }}>{t("loadingDetails")}</p>
        </div>
      </section>
    );
  }

  const freelancerName = data?.freelancer?.displayName || "Freelancer";
  const freelancerAvatar =
    data?.freelancer?.avatarUrl || "/images/team/fl-d-1.png";
  const rating = data?.rating ?? 0;
  const reviewCount = data?.reviewCount ?? 0;
  const orderCount = data?.orderCount ?? 0;
  const views = data?.views ?? 0;
  const location = data?.location || "Remote";
  const description = data?.description || null;
  const packages = data?.packages || [];

  const heroStats = [
    packages.length > 0 && {
      icon: Clock,
      label: t("deliveryTime"),
      value: `${packages[0].deliveryDays} ${t("days")}`,
    },
    {
      icon: MapPin,
      label: t("location"),
      value: location,
    },
  ].filter(Boolean);

  return (
    <section style={{ padding: "var(--space-10) 0 var(--space-16)" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div
              className="card"
              style={{
                padding: "var(--space-7)",
                marginBottom: "var(--space-6)",
              }}
            >
              {data?.title && (
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-h2)",
                    fontWeight: 500,
                    margin: 0,
                    marginBottom: "var(--space-5)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {data.title}
                </h1>
              )}

              <div
                style={{
                  display: "flex",
                  gap: "var(--space-4)",
                  flexWrap: "wrap",
                  alignItems: "center",
                  paddingBottom: "var(--space-6)",
                  marginBottom: "var(--space-6)",
                  borderBottom: "1px solid var(--border-subtle)",
                  color: "var(--text-secondary)",
                  fontSize: "var(--text-body-sm)",
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)" }}>
                  <span className="avatar avatar--sm" style={{ flexShrink: 0 }}>
                    <Image width={28} height={28} src={freelancerAvatar} alt={freelancerName} />
                  </span>
                  <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{freelancerName}</span>
                </span>
                {rating > 0 && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <Star size={14} fill="currentColor" style={{ color: "var(--secondary-500)" }} />
                    <strong style={{ color: "var(--text-primary)" }}>{rating.toFixed(1)}</strong>
                    <span>({reviewCount} {t("reviews")})</span>
                  </span>
                )}
                {orderCount > 0 && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <ClipboardList size={14} />
                    {orderCount} {t("orderInQueue")}
                  </span>
                )}
                {views > 0 && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <Eye size={14} />
                    {views} {t("views")}
                  </span>
                )}
              </div>

              {heroStats.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "var(--space-5)",
                  }}
                >
                  {heroStats.map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)" }}
                    >
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "var(--radius-md)",
                          background: "var(--primary-50)",
                          color: "var(--primary-600)",
                          display: "grid",
                          placeItems: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div className="overline" style={{ color: "var(--text-tertiary)", marginBottom: 2 }}>
                          {label}
                        </div>
                        <div className="body-md" style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <ServiceDetailSlider2 images={data?.images || []} title={data?.title} />
            <div className="service-about">
              {description && (
                <div
                  className="card"
                  style={{ padding: "var(--space-7)", marginBottom: "var(--space-6)" }}
                >
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-h3)",
                      fontWeight: 500,
                      marginBottom: "var(--space-4)",
                    }}
                  >
                    {t("about")}
                  </h2>
                  <p
                    className="body-md"
                    style={{ color: "var(--text-secondary)", margin: 0, whiteSpace: "pre-wrap" }}
                  >
                    {description}
                  </p>
                </div>
              )}
                  {/* Compare Packages */}
                  {packages.length > 0 && (
                    <div className="px30 bdr1 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                      <h4>{t("comparePackages")}</h4>
                      <div className="table-style2 table-responsive bdr1 mt30 mb60">
                        <table className="table table-borderless mb-0">
                          <thead className="t-head">
                            <tr>
                              <th className="col" scope="col" />
                              {packages.map((pkg, i) => (
                                <th key={i} className="col" scope="col">
                                  <span className="h2">
                                    &euro;{pkg.price}
                                  </span>
                                  <br />
                                  <span className="h4">
                                    {pkg.title || pkg.tier}
                                  </span>
                                  <br />
                                  <span className="text">{pkg.description}</span>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="t-body">
                            <tr>
                              <th scope="row">{t("deliveryTime")}</th>
                              {packages.map((pkg, i) => (
                                <td key={i}>{pkg.deliveryDays} {t("days")}</td>
                              ))}
                            </tr>
                            <tr className="bgc-thm3">
                              <th scope="row">{t("revisions")}</th>
                              {packages.map((pkg, i) => (
                                <td key={i}>{pkg.revisionCount || 0}</td>
                              ))}
                            </tr>
                            <tr>
                              <th scope="row">{t("total")}</th>
                              {packages.map((pkg, i) => (
                                <td key={i}>&euro;{pkg.price}</td>
                              ))}
                            </tr>
                            <tr>
                              <th scope="row" />
                              {packages.map((pkg, i) => (
                                <td key={i}>
                                  <button
                                    className="ud-btn btn-thm"
                                    onClick={handleSelectPackage}
                                  >
                                    {t("select")}{" "}
                                    <i className="fal fa-arrow-right-long" />
                                  </button>
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            <div className="col-lg-4" id="stikyContainer">
              <div className="column">
                {isMatchedScreen ? (
                  <Sticky bottomBoundary="#stikyContainer">
                    <div className="scrollbalance-inner">
                      <div className="blog-sidebar ms-lg-auto">
                        <ServiceDetailPrice1
                          packages={packages}
                          gigId={data?.id}
                        />
                        <ServiceContactWidget1
                          freelancer={data?.freelancer}
                        />
                        {gigData?.freelancerProfile?.userId && (
                          <div style={{ marginTop: "var(--space-3)" }}>
                            <ContactButton
                              recipientId={gigData.freelancerProfile.userId}
                              className="w-100"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Sticky>
                ) : (
                  <div className="scrollbalance-inner">
                    <div className="blog-sidebar ms-lg-auto">
                      <ServiceDetailPrice1
                        packages={packages}
                        gigId={data?.id}
                      />
                      <ServiceContactWidget1
                        freelancer={data?.freelancer}
                      />
                      {gigData?.freelancerProfile?.userId && (
                        <div className="mt20">
                          <ContactButton
                            recipientId={gigData.freelancerProfile.userId}
                            className="w-100"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
