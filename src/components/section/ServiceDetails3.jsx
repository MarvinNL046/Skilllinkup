"use client";

import Sticky from "react-stickynode";
import { useState } from "react";
import { toast } from "sonner";

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
  const [orderingPackageId, setOrderingPackageId] = useState(null);

  async function handleSelectPackage(pkg) {
    if (!pkg) return;
    if (!isSignedIn) {
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "/";
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }

    setOrderingPackageId(pkg._id);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gigId: data?.id,
          packageId: pkg._id,
          gigTitle: data?.title,
          packageTitle: pkg.title || pkg.tier || "",
          price: pkg.price,
          currency: (pkg.currency || "eur").toLowerCase(),
          freelancerStripeAccountId: data?.freelancer?.stripeAccountId || "",
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) {
        throw new Error(json.error || "Checkout failed to start");
      }
      window.location.href = json.url;
    } catch (err) {
      console.error("[checkout] error:", err);
      toast.error(err.message || "Could not start checkout");
      setOrderingPackageId(null);
    }
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
    <section style={{ padding: "var(--space-12) 0 var(--space-20, 80px)" }}>
      <div className="container">
        <div className="row" style={{ rowGap: "var(--space-8)" }}>
          <div className="col-lg-8">
            <div
              className="card"
              style={{
                padding: "var(--space-8)",
                marginBottom: "var(--space-8)",
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
                  style={{ padding: "var(--space-8)", marginBottom: "var(--space-8)" }}
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
                    <div className="card" style={{ padding: "var(--space-8)", marginBottom: "var(--space-8)" }}>
                      <h2
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "var(--text-h3)",
                          fontWeight: 500,
                          letterSpacing: "-0.01em",
                          marginBottom: "var(--space-6)",
                        }}
                      >
                        {t("comparePackages")}
                      </h2>
                      <div style={{ overflowX: "auto", margin: "0 calc(-1 * var(--space-2))" }}>
                        <table
                          style={{
                            width: "100%",
                            borderCollapse: "separate",
                            borderSpacing: 0,
                            fontSize: "var(--text-body-sm)",
                          }}
                        >
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                style={{ padding: "var(--space-4)", textAlign: "left" }}
                              />
                              {packages.map((pkg, i) => (
                                <th
                                  key={i}
                                  scope="col"
                                  style={{
                                    padding: "var(--space-5) var(--space-4)",
                                    textAlign: "left",
                                    background: "var(--surface-2)",
                                    borderTopLeftRadius: i === 0 ? "var(--radius-md)" : 0,
                                    borderTopRightRadius:
                                      i === packages.length - 1 ? "var(--radius-md)" : 0,
                                  }}
                                >
                                  <div
                                    style={{
                                      fontFamily: "var(--font-display)",
                                      fontSize: "var(--text-h3)",
                                      fontWeight: 500,
                                      letterSpacing: "-0.02em",
                                      color: "var(--text-primary)",
                                      marginBottom: 4,
                                    }}
                                  >
                                    €{pkg.price}
                                  </div>
                                  <div
                                    style={{
                                      fontFamily: "var(--font-display)",
                                      fontSize: "var(--text-h5)",
                                      fontWeight: 500,
                                      color: "var(--text-primary)",
                                      marginBottom: 2,
                                    }}
                                  >
                                    {pkg.title || pkg.tier}
                                  </div>
                                  {pkg.description && (
                                    <div
                                      style={{
                                        color: "var(--text-secondary)",
                                        fontWeight: 400,
                                        fontSize: 12,
                                      }}
                                    >
                                      {pkg.description}
                                    </div>
                                  )}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              {
                                label: t("deliveryTime"),
                                values: packages.map((p) => `${p.deliveryDays} ${t("days")}`),
                              },
                              {
                                label: t("revisions"),
                                values: packages.map((p) => p.revisionCount ?? 0),
                              },
                              {
                                label: t("total"),
                                values: packages.map((p) => `€${p.price}`),
                              },
                            ].map((row, idx) => (
                              <tr key={idx}>
                                <th
                                  scope="row"
                                  style={{
                                    padding: "var(--space-4)",
                                    textAlign: "left",
                                    color: "var(--text-secondary)",
                                    fontWeight: 500,
                                    borderTop: "1px solid var(--border-subtle)",
                                  }}
                                >
                                  {row.label}
                                </th>
                                {row.values.map((v, i) => (
                                  <td
                                    key={i}
                                    style={{
                                      padding: "var(--space-4)",
                                      borderTop: "1px solid var(--border-subtle)",
                                      color: "var(--text-primary)",
                                      fontWeight: row.label === t("total") ? 600 : 400,
                                    }}
                                  >
                                    {v}
                                  </td>
                                ))}
                              </tr>
                            ))}
                            <tr>
                              <th
                                scope="row"
                                style={{ padding: "var(--space-4) 0 0", borderTop: "1px solid var(--border-subtle)" }}
                              />
                              {packages.map((pkg, i) => (
                                <td
                                  key={i}
                                  style={{
                                    padding: "var(--space-4)",
                                    borderTop: "1px solid var(--border-subtle)",
                                  }}
                                >
                                  <button
                                    type="button"
                                    className="btn btn--primary btn--sm"
                                    onClick={() => handleSelectPackage(pkg)}
                                    disabled={orderingPackageId === pkg._id}
                                    style={{ width: "100%", justifyContent: "center" }}
                                  >
                                    {orderingPackageId === pkg._id ? (
                                      <span className="spinner-border spinner-border-sm" role="status" />
                                    ) : (
                                      <>
                                        {t("select")}
                                        <ArrowRight size={14} />
                                      </>
                                    )}
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
                          gigTitle={data?.title}
                          freelancerStripeAccountId={data?.freelancer?.stripeAccountId || ""}
                        />
                        <ServiceContactWidget1
                          freelancer={data?.freelancer}
                        />
                        {gigData?.freelancerProfile?.userId && (
                          <div style={{ marginTop: "var(--space-3)" }}>
                            <ContactButton
                              recipientId={gigData.freelancerProfile.userId}
                              className="w-full"
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
                        gigTitle={data?.title}
                        freelancerStripeAccountId={data?.freelancer?.stripeAccountId || ""}
                      />
                      <ServiceContactWidget1
                        freelancer={data?.freelancer}
                      />
                      {gigData?.freelancerProfile?.userId && (
                        <div className="mt20">
                          <ContactButton
                            recipientId={gigData.freelancerProfile.userId}
                            className="w-full"
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
