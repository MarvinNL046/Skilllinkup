"use client";

import Sticky from "react-stickynode";

import useScreen from "@/hook/useScreen";
import ServiceContactWidget1 from "../element/ServiceContactWidget1";
import ServiceDetailSlider2 from "../element/ServiceDetailSlider2";
import ServiceDetailPrice1 from "../element/ServiceDetailPrice1";
import Image from "next/image";
import { useParams } from "next/navigation";
import useConvexGigDetail from "@/hook/useConvexGigDetail";

export default function ServiceDetail3() {
  const isMatchedScreen = useScreen(1216);
  const { id } = useParams();

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
              : "Remote",
          }
        : null
      : null; // null = still loading

  // Loading state while Convex query is in flight
  if (data === null) {
    return (
      <section className="pt10 pb90 pb30-md">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <p className="text">Loading service details...</p>
            </div>
          </div>
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

  return (
    <>
      <section className="pt10 pb90 pb30-md">
        <div className="container">
          <div className="row wrap">
            <div className="col-lg-8">
              <div className="column">
                <div className="row  px30 bdr1 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                  <div className="col-xl-12 mb30 pb30 bdrb1">
                    <div className="position-relative">
                      {data?.title && <h2>{data.title}</h2>}
                      <div className="list-meta mt30">
                        <a className="list-inline-item mb5-sm" href="#">
                          <span className="position-relative mr10">
                            <Image
                              width={40}
                              height={40}
                              className="rounded-circle"
                              src={freelancerAvatar}
                              alt="Freelancer Photo"
                            />
                            <span className="online-badge"></span>
                          </span>
                          <span className="fz14">{freelancerName}</span>
                        </a>
                        {rating > 0 && (
                          <p className="mb-0 dark-color fz14 list-inline-item ml25 ml15-sm mb5-sm ml0-xs">
                            <i className="fas fa-star vam fz10 review-color me-2"></i>{" "}
                            {rating.toFixed(1)} ({reviewCount} reviews)
                          </p>
                        )}
                        {orderCount > 0 && (
                          <p className="mb-0 dark-color fz14 list-inline-item ml25 ml15-sm mb5-sm ml0-xs">
                            <i className="flaticon-file-1 vam fz20 me-2"></i>{" "}
                            {orderCount} Order in Queue
                          </p>
                        )}
                        {views > 0 && (
                          <p className="mb-0 dark-color fz14 list-inline-item ml25 ml15-sm mb5-sm ml0-xs">
                            <i className="flaticon-website vam fz20 me-2"></i>{" "}
                            {views} Views
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {packages.length > 0 && (
                      <div className="col-sm-6 col-md-4">
                        <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                          <div className="icon flex-shrink-0">
                            <span className="flaticon-calendar" />
                          </div>
                          <div className="details">
                            <h5 className="title">Delivery Time</h5>
                            <p className="mb-0 text">
                              {packages[0].deliveryDays} Days
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="col-sm-6 col-md-4">
                      <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                        <div className="icon flex-shrink-0">
                          <span className="flaticon-tracking" />
                        </div>
                        <div className="details">
                          <h5 className="title">Location</h5>
                          <p className="mb-0 text">{location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <ServiceDetailSlider2 />
                <div className="service-about">
                  {description && (
                    <div className="px30 bdr1 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                      <h4>About</h4>
                      <p className="text mb30">{description}</p>
                    </div>
                  )}
                  {/* Compare Packages */}
                  {packages.length > 0 && (
                    <div className="px30 bdr1 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                      <h4>Compare Packages</h4>
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
                              <th scope="row">Delivery Time</th>
                              {packages.map((pkg, i) => (
                                <td key={i}>{pkg.deliveryDays} Days</td>
                              ))}
                            </tr>
                            <tr className="bgc-thm3">
                              <th scope="row">Revisions</th>
                              {packages.map((pkg, i) => (
                                <td key={i}>{pkg.revisionCount || 0}</td>
                              ))}
                            </tr>
                            <tr>
                              <th scope="row">Total</th>
                              {packages.map((pkg, i) => (
                                <td key={i}>&euro;{pkg.price}</td>
                              ))}
                            </tr>
                            <tr>
                              <th scope="row" />
                              {packages.map((pkg, i) => (
                                <td key={i}>
                                  <a className="ud-btn btn-thm">
                                    Select{" "}
                                    <i className="fal fa-arrow-right-long" />
                                  </a>
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
            </div>
            <div className="col-lg-4" id="stikyContainer">
              <div className="column">
                {isMatchedScreen ? (
                  <Sticky bottomBoundary="#stikyContainer">
                    <div className="scrollbalance-inner">
                      <div className="blog-sidebar ms-lg-auto">
                        <ServiceDetailPrice1 />
                        <ServiceContactWidget1 />
                      </div>
                    </div>
                  </Sticky>
                ) : (
                  <div className="scrollbalance-inner">
                    <div className="blog-sidebar ms-lg-auto">
                      <ServiceDetailPrice1 />
                      <ServiceContactWidget1 />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
