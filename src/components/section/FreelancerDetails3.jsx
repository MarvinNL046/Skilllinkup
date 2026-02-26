"use client";

import FreelancerAbout1 from "../element/FreelancerAbout1";
import FreelancerSkill1 from "../element/FreelancerSkill1";
import Sticky from "react-stickynode";

import useScreen from "@/hook/useScreen";
import Image from "next/image";
import { useParams } from "next/navigation";
import useConvexFreelancerDetail from "@/hook/useConvexFreelancerDetail";

export default function FreelancerDetail3() {
  const isMatchedScreen = useScreen(1216);
  const { id } = useParams();

  // The id param is a Convex document ID for freelancerProfiles
  const convexData = useConvexFreelancerDetail(id);

  // convexData === undefined means still loading
  // convexData === null means not found in Convex
  const isLoading = convexData === undefined;

  const data = !isLoading
    ? convexData
      ? {
          _id: convexData._id,
          img: convexData.avatarUrl || "/images/team/fl-1.png",
          name: convexData.displayName || "Freelancer",
          profession: convexData.tagline || "Professional",
          rating: convexData.ratingAverage || 0,
          reviews: convexData.ratingCount || 0,
          location: convexData.locationCity
            ? `${convexData.locationCity}, ${convexData.locationCountry || ""}`
            : convexData.locationCountry || "Remote",
          memberSince: convexData.createdAt
            ? new Date(convexData.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : null,
          bio: convexData.bio || null,
          skills: convexData.skills || [],
          hourlyRate: convexData.hourlyRate || null,
        }
      : null
    : null;

  // Loading state
  if (isLoading) {
    return (
      <section className="pt10 pb90 pb30-md">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <p className="text">Loading freelancer profile...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const profileImg = data?.img || "/images/team/fl-1.png";
  const profileName = data?.name || "Freelancer";
  const profession = data?.profession || "";
  const rating = data?.rating ?? 0;
  const reviewCount = data?.reviews ?? 0;
  const location = data?.location || "";
  const memberSince = data?.memberSince || null;
  const bio = data?.bio || null;

  return (
    <>
      <section className="pt10 pb90 pb30-md">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-8">
              <div className="px30 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1">
                <div className="position-relative overflow-hidden d-flex align-items-center pb30 mb30 bdrb1 ">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="position-relative">
                        <div className="list-meta d-sm-flex align-items-center">
                          <a
                            className="position-relative freelancer-single-style"
                            href="#"
                          >
                            <span className="online"></span>
                            <Image
                              width={90}
                              height={90}
                              className="rounded-circle w-100 wa-sm mb15-sm"
                              src={profileImg}
                              alt="Freelancer Photo"
                            />
                          </a>
                          <div className="ml20 ml0-xs">
                            <h5 className="title mb-1">{profileName}</h5>
                            {profession && <p className="mb-0">{profession}</p>}
                            {rating > 0 && (
                              <p className="mb-0 dark-color fz15 fw500 list-inline-item mb5-sm">
                                <i className="fas fa-star vam fz10 review-color me-2"></i>{" "}
                                {rating.toFixed(1)} ({reviewCount} reviews)
                              </p>
                            )}
                            {location && (
                              <p className="mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs">
                                <i className="flaticon-place vam fz20 me-2"></i>{" "}
                                {location}
                              </p>
                            )}
                            {memberSince && (
                              <p className="mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs">
                                <i className="flaticon-30-days vam fz20 me-2"></i>{" "}
                                Member since {memberSince}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {rating > 0 && (
                    <div className="col-sm-6 col-xl-4">
                      <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                        <div className="icon flex-shrink-0">
                          <span className="flaticon-goal" />
                        </div>
                        <div className="details">
                          <h5 className="title">Rating</h5>
                          <p className="mb-0 text">
                            {rating.toFixed(1)} ({reviewCount} reviews)
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {data?.hourlyRate && (
                    <div className="col-sm-6 col-xl-4">
                      <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                        <div className="icon flex-shrink-0">
                          <span className="flaticon-dollar" />
                        </div>
                        <div className="details">
                          <h5 className="title">Hourly Rate</h5>
                          <p className="mb-0 text">${data.hourlyRate}/hr</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {bio && (
                <div className="service-about">
                  <div className="px30 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1">
                    <h4>Description</h4>
                    <p className="text mb30">{bio}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="col-lg-4" id="stikyContainer">
              {isMatchedScreen ? (
                <Sticky bottomBoundary="#stikyContainer">
                  <div className="blog-sidebar ms-lg-auto">
                    <FreelancerAbout1 />
                    <FreelancerSkill1 />
                  </div>
                </Sticky>
              ) : (
                <div className="blog-sidebar ms-lg-auto">
                  <FreelancerAbout1 />
                  <FreelancerSkill1 />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
