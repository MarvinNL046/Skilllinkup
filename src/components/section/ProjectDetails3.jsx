"use client";

import Sticky from "react-stickynode";
import ProjectPriceWidget1 from "../element/ProjectPriceWidget1";
import ProjectContactWidget1 from "../element/ProjectContactWidget1";
import BidForm from "../element/BidForm";
import BidList from "../element/BidList";
import useScreen from "@/hook/useScreen";
import { useParams } from "next/navigation";
import useConvexProjectDetail from "@/hook/useConvexProjectDetail";
import useConvexUser from "@/hook/useConvexUser";
import Link from "next/link";

export default function ProjectDetail3() {
  const isMatchedScreen = useScreen(1216);
  const { id } = useParams();

  const convexData = useConvexProjectDetail(id);
  const { convexUser, isAuthenticated, isLoaded } = useConvexUser();

  // convexData === undefined means still loading
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
            ? "Remote"
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

  // Loading state
  if (isLoading) {
    return (
      <section className="pt30">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <p className="text">Loading project details...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const title = data?.title || "";
  const location = data?.location || null;
  const postedAt = data?.postedAt || null;
  const views = data?.views != null ? `${data.views} Views` : null;
  const description = data?.description || null;
  const skills = data?.requiredSkills && data.requiredSkills.length > 0
    ? data.requiredSkills
    : [];
  const bidCount = data?.bidCount ?? 0;

  return (
    <>
      <section className="pt30">
        <div className="container">
          <div className="row wrap">
            <div className="col-lg-8">
              <div className="column">
                <div className="scrollbalance-inner">
                  <div className="px30 bdr1 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                    <div className="position-relative overflow-hidden d-flex align-items-center">
                      <div className="row ">
                        <div className="col-xl-12">
                          <div className="position-relative">
                            {title && <h2>{title}</h2>}
                            <div className="list-meta mt15 mb30 pb30 bdrb1 ">
                              {location && (
                                <p className="mb-0 dark-color fz15 fw500 list-inline-item mb5-sm">
                                  <i className="flaticon-place vam fz20 text-thm2 me-2"></i>{" "}
                                  {location}
                                </p>
                              )}
                              {postedAt && (
                                <p className="mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs">
                                  <i className="flaticon-calendar text-thm2 vam fz20 me-2"></i>{" "}
                                  {postedAt}
                                </p>
                              )}
                              {views && (
                                <p className="mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs">
                                  <i className="flaticon-website text-thm2 vam fz20 me-2"></i>{" "}
                                  {views}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {data?.projectType && (
                        <div className="col-sm-6 col-xl-4">
                          <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                            <div className="icon flex-shrink-0">
                              <span className="flaticon-dollar" />
                            </div>
                            <div className="details">
                              <h5 className="title">Project type</h5>
                              <p className="mb-0 text">{data.projectType}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {data?.duration && (
                        <div className="col-sm-6 col-xl-4">
                          <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                            <div className="icon flex-shrink-0">
                              <span className="flaticon-fifteen" />
                            </div>
                            <div className="details">
                              <h5 className="title">Project Duration</h5>
                              <p className="mb-0 text">{data.duration}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="service-about">
                    {description && (
                      <div className="px30 bdr1 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                        <h4>Description</h4>
                        <p className="text mb30">{description}</p>
                      </div>
                    )}
                    {skills.length > 0 && (
                      <div className="px30 bdr1 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                        <h4 className="mb30">Skills Required</h4>
                        <div className="mb60">
                          {skills.map((item, i) => (
                            <a
                              key={i}
                              className={`tag list-inline-item mb-2 mb-xl-0 ${
                                String(item).length === 7 ? "mr0" : "mr10"
                              }`}
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="px30 bdr1 pt30 pb30 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1">
                      <h4 className="mb30">
                        Project Proposals ({bidCount})
                      </h4>

                      {/* Bid list — always shown when there is a project ID */}
                      {data?._id && (
                        <BidList
                          projectId={data._id}
                          isOwner={
                            !!(
                              convexUser &&
                              convexData &&
                              convexUser._id === convexData.clientId
                            )
                          }
                        />
                      )}

                      {/* Bid form section */}
                      <div className="bsp_reveiw_wrt mt25">
                        {!isLoaded ? null : !isAuthenticated ? (
                          /* Not logged in */
                          <div className="text-center py20">
                            <p className="text mb15">
                              You must be signed in to submit a bid.
                            </p>
                            <Link href="/login" className="ud-btn btn-thm">
                              Log in to Bid
                              <i className="fal fa-arrow-right-long" />
                            </Link>
                          </div>
                        ) : convexUser &&
                          convexData &&
                          convexUser._id === convexData.clientId ? (
                          /* Current user is the project owner */
                          null
                        ) : data?._id ? (
                          /* Authenticated freelancer (not the owner) */
                          <BidForm
                            projectId={data._id}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4" id="stikyContainer">
              <div className="column">
                {isMatchedScreen ? (
                  <Sticky bottomBoundary="#stikyContainer">
                    <div className="scrollbalance-inner">
                      <div className="blog-sidebar ms-lg-auto">
                        <ProjectPriceWidget1 />
                        <ProjectContactWidget1 />
                      </div>
                    </div>
                  </Sticky>
                ) : (
                  <div className="scrollbalance-inner">
                    <div className="blog-sidebar ms-lg-auto">
                      <ProjectPriceWidget1 />
                      <ProjectContactWidget1 />
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
