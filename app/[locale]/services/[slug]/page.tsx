import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ServiceImageSlider from "@/components/marketplace/ServiceImageSlider";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  const gig = await fetchQuery(api.marketplace.gigs.getBySlug, { slug, locale });
  if (!gig) {
    notFound();
  }

  const freelancer = gig.freelancerProfile as any;
  const category = gig.category as any;
  const images = (gig.images || []).map((img: any) => ({
    url: img.imageUrl,
    alt: gig.title,
  }));

  const packages = Array.isArray(gig.packages) ? gig.packages : [];

  return (
    <>
      <Breadcrumb
        title="Service Details"
        brief={category?.name ? category.name : "Service"}
      />
      <div className="bgc-thm3">
        <section className="pt10 pb90 pb30-md">
          <div className="container">
            <div className="row wrap">
              <div className="col-lg-8">
                <div className="column">
                  <div className="row px30 bdr1 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                    <div className="col-xl-12 mb30 pb30 bdrb1">
                      <div className="position-relative">
                        <h2>{gig.title}</h2>
                        <div className="list-meta mt30">
                          <a className="list-inline-item mb5-sm" href="#">
                            <span className="position-relative mr10">
                              <Image
                                width={40}
                                height={40}
                                className="rounded-circle"
                                src={freelancer?.avatarUrl ?? "/images/resource/user.png"}
                                alt={freelancer?.displayName ?? "Freelancer"}
                              />
                              <span className="online-badge"></span>
                            </span>
                            <span className="fz14">{freelancer?.displayName ?? "Freelancer"}</span>
                          </a>
                          <p className="mb-0 dark-color fz14 list-inline-item ml25 ml15-sm mb5-sm ml0-xs">
                            <i className="fas fa-star vam fz10 review-color me-2"></i>
                            {Number(gig.ratingAverage ?? 0).toFixed(1)} {gig.ratingCount ?? 0} reviews
                          </p>
                          <p className="mb-0 dark-color fz14 list-inline-item ml25 ml15-sm mb5-sm ml0-xs">
                            <i className="flaticon-file-1 vam fz20 me-2"></i> {gig.orderCount ?? 0} Orders
                          </p>
                          <p className="mb-0 dark-color fz14 list-inline-item ml25 ml15-sm mb5-sm ml0-xs">
                            <i className="flaticon-website vam fz20 me-2"></i> {gig.views ?? 0} Views
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 col-md-4">
                        <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                          <div className="icon flex-shrink-0">
                            <span className="flaticon-calendar" />
                          </div>
                          <div className="details">
                            <h5 className="title">Delivery Time</h5>
                            <p className="mb-0 text">
                              {packages[0]?.deliveryDays ? `${packages[0].deliveryDays} Days` : "Flexible"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4">
                        <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                          <div className="icon flex-shrink-0">
                            <span className="flaticon-goal" />
                          </div>
                          <div className="details">
                            <h5 className="title">Work Type</h5>
                            <p className="mb-0 text">{gig.workType ?? "Remote"}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-md-4">
                        <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                          <div className="icon flex-shrink-0">
                            <span className="flaticon-tracking" />
                          </div>
                          <div className="details">
                            <h5 className="title">Location</h5>
                            <p className="mb-0 text">{gig.locationCountry ?? "Worldwide"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <ServiceImageSlider images={images} />

                  <div className="service-about">
                    <div className="px30 bdr1 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                      <h4>About</h4>
                      <p className="text mb30">{gig.description}</p>
                      {Array.isArray(gig.tags) && gig.tags.length > 0 && (
                        <div className="d-flex align-items-start mb50">
                          <div className="list1">
                            <h6>Tags</h6>
                            {gig.tags.map((tag: string) => (
                              <p key={tag} className="text mb-0">
                                {tag}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {packages.length > 0 && (
                      <div className="px30 bdr1 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                        <h4>Compare Packages</h4>
                        <div className="table-style2 table-responsive bdr1 mt30 mb60">
                          <table className="table table-borderless mb-0">
                            <thead className="t-head">
                              <tr>
                                <th className="col" scope="col" />
                                {packages.map((pkg: any) => (
                                  <th key={pkg._id} className="col" scope="col">
                                    <span className="h2">
                                      €{pkg.price} <small>/ package</small>
                                    </span>
                                    <br />
                                    <span className="h4">{pkg.title}</span>
                                    <br />
                                    <span className="text">{pkg.description}</span>
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="t-body">
                              <tr className="bgc-thm3">
                                <th scope="row">Delivery Time</th>
                                {packages.map((pkg: any) => (
                                  <td key={pkg._id}>{pkg.deliveryDays ?? 0} Days</td>
                                ))}
                              </tr>
                              <tr>
                                <th scope="row">Revisions</th>
                                {packages.map((pkg: any) => (
                                  <td key={pkg._id}>{pkg.revisionCount ?? 0}</td>
                                ))}
                              </tr>
                              <tr className="bgc-thm3">
                                <th scope="row">Total</th>
                                {packages.map((pkg: any) => (
                                  <td key={pkg._id}>€{pkg.price}</td>
                                ))}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="service-sidebar">
                  <div className="sidebar-widget mb30 bdrs12 p30 bg-white default-box-shadow1">
                    <h4 className="mb20">Start a project</h4>
                    <p className="text mb20">
                      Ready to work with {freelancer?.displayName ?? "this freelancer"}?
                    </p>
                    <Link href={`/${locale}/marketplace/gigs/${gig.slug}`} className="ud-btn btn-thm w-100">
                      View Marketplace Listing
                      <i className="fal fa-arrow-right-long ms-2" />
                    </Link>
                  </div>
                  <div className="sidebar-widget bdrs12 p30 bg-white default-box-shadow1">
                    <h5 className="mb20">About the freelancer</h5>
                    <div className="d-flex align-items-center mb20">
                      <Image
                        width={60}
                        height={60}
                        className="rounded-circle"
                        src={freelancer?.avatarUrl ?? "/images/resource/user.png"}
                        alt={freelancer?.displayName ?? "Freelancer"}
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{freelancer?.displayName ?? "Freelancer"}</h6>
                        <p className="mb-0 text">{freelancer?.tagline ?? "Verified freelancer"}</p>
                      </div>
                    </div>
                    <Link href={`/${locale}/freelancers/${freelancer?.userId ?? ""}`} className="ud-btn btn-white2 w-100">
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
