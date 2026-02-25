"use client";

import { freelancer1, product1 } from "@/data/product";
import FreelancerAbout1 from "../element/FreelancerAbout1";
import FreelancerSkill1 from "../element/FreelancerSkill1";
import ServiceDetailComment1 from "../element/ServiceDetailComment1";
import ServiceDetailReviewInfo1 from "../element/ServiceDetailReviewInfo1";
import FreelancerFutureCard1 from "../card/FreelancerFutureCard1";
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
  // convexData === null means not found in Convex, use static fallback
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
            : "April 1, 2022",
          bio: convexData.bio || null,
          skills: convexData.skills || [],
          hourlyRate: convexData.hourlyRate || null,
        }
      : freelancer1.find((item) => item.id == id) || null
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
  const profileName = data?.name || "Leslie Alexander";
  const profession = data?.profession || "UI/UX Designer";
  const rating = data?.rating ?? 4.82;
  const reviewCount = data?.reviews ?? 94;
  const location = data?.location || "London, UK";
  const memberSince = data?.memberSince || "April 1, 2022";
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
                            <p className="mb-0">{profession}</p>
                            <p className="mb-0 dark-color fz15 fw500 list-inline-item mb5-sm">
                              <i className="fas fa-star vam fz10 review-color me-2"></i>{" "}
                              {rating} {reviewCount} reviews
                            </p>
                            <p className="mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs">
                              <i className="flaticon-place vam fz20 me-2"></i>{" "}
                              {location}
                            </p>
                            <p className="mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs">
                              <i className="flaticon-30-days vam fz20 me-2"></i>{" "}
                              Member since {memberSince}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-xl-3">
                    <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                      <div className="icon flex-shrink-0">
                        <span className="flaticon-target" />
                      </div>
                      <div className="details">
                        <h5 className="title">Job Success</h5>
                        <p className="mb-0 text">98%</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xl-3">
                    <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                      <div className="icon flex-shrink-0">
                        <span className="flaticon-goal" />
                      </div>
                      <div className="details">
                        <h5 className="title">Total Jobs</h5>
                        <p className="mb-0 text">921</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xl-3">
                    <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                      <div className="icon flex-shrink-0">
                        <span className="flaticon-fifteen" />
                      </div>
                      <div className="details">
                        <h5 className="title">Total Hours</h5>
                        <p className="mb-0 text">1,499</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-xl-3">
                    <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                      <div className="icon flex-shrink-0">
                        <span className="flaticon-file-1" />
                      </div>
                      <div className="details">
                        <h5 className="title">In Queue Service</h5>
                        <p className="mb-0 text">20</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="service-about">
                <div className="px30 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1">
                  <h4>Description</h4>
                  {bio ? (
                    <p className="text mb30">{bio}</p>
                  ) : (
                    <>
                      <p className="text mb30">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when looking
                        at its layout. The point of using Lorem Ipsum is that it
                        has a more-or-less normal distribution of letters, as
                        opposed to using &apos;Content here, content here&apos;,
                        making it look like readable English.
                      </p>
                      <p className="text mb30">
                        Many desktop publishing packages and web page editors now
                        use Lorem Ipsum as their default model text, and a search
                        for &apos;lorem ipsum&apos; will uncover many web sites
                        still in their infancy. Various versions have evolved
                        over the years, sometimes by accident, sometimes on
                        purpose (injected humour and the like).
                      </p>
                    </>
                  )}
                </div>
                {/* <hr className="opacity-100 mb60 mt60" /> */}
                <div className="px30 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1">
                  <h4 className="mb30">Education</h4>
                  <div className="educational-quality">
                    <div className="m-circle text-thm">M</div>
                    <div className="wrapper mb40">
                      <span className="tag">2012 - 2014</span>
                      <h5 className="mt15">Bachlors in Fine Arts</h5>
                      <h6 className="text-thm">Modern College</h6>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin a ipsum tellus. Interdum et malesuada fames ac
                        ante ipsum primis in faucibus.
                      </p>
                    </div>
                    <div className="m-circle before-none text-thm">M</div>
                    <div className="wrapper mb60">
                      <span className="tag">2008 - 2012</span>
                      <h5 className="mt15">Computer Science</h5>
                      <h6 className="text-thm">Harvartd University</h6>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin a ipsum tellus. Interdum et malesuada fames ac
                        ante ipsum primis in faucibus.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <hr className="opacity-100 mb60" /> */}
                <div className="px30 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1">
                  <h4 className="mb30">Work &amp; Experience</h4>
                  <div className="educational-quality">
                    <div className="m-circle text-thm">M</div>
                    <div className="wrapper mb40">
                      <span className="tag">2012 - 2014</span>
                      <h5 className="mt15">UX Designer</h5>
                      <h6 className="text-thm">Dropbox</h6>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin a ipsum tellus. Interdum et malesuada fames ac
                        ante ipsum primis in faucibus.
                      </p>
                    </div>
                    <div className="m-circle before-none text-thm">M</div>
                    <div className="wrapper mb60">
                      <span className="tag">2008 - 2012</span>
                      <h5 className="mt15">Art Director</h5>
                      <h6 className="text-thm">amazon</h6>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin a ipsum tellus. Interdum et malesuada fames ac
                        ante ipsum primis in faucibus.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <hr className="opacity-100 mb60" /> */}
                <div className="px30 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1">
                  <h4 className="mb30">Awards adn Certificates</h4>
                  <div className="educational-quality ps-0">
                    <div className="wrapper mb40">
                      <span className="tag">2012 - 2014</span>
                      <h5 className="mt15">UI UX Design</h5>
                      <h6 className="text-thm">Udemy</h6>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin a ipsum tellus. Interdum et malesuada fames ac
                        ante ipsum
                        <br className="d-none d-lg-block" />
                        primis in faucibus.
                      </p>
                    </div>
                    <div className="wrapper mb60">
                      <span className="tag">2008 - 2012</span>
                      <h5 className="mt15">App Design</h5>
                      <h6 className="text-thm">Google</h6>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Proin a ipsum tellus. Interdum et malesuada fames ac
                        ante ipsum
                        <br className="d-none d-lg-block" />
                        primis in faucibus.
                      </p>
                    </div>
                  </div>
                </div>
                {/* <hr className="opacity-100 mb60" /> */}
                <div className="px30 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1">
                  <h4 className="mb30">Featured Services</h4>
                  <div className="row mb35">
                    {product1.slice(0, 3).map((item, i) => (
                      <div className="col-sm-6 col-xl-4" key={i}>
                        <FreelancerFutureCard1 data={item} />
                      </div>
                    ))}
                  </div>
                </div>
                {/* <hr className="opacity-100" /> */}
                <div className="px30 pt30 pb-0 mb30 bg-white bdrs12 wow fadeInUp default-box-shadow1 bdr1">
                  <ServiceDetailReviewInfo1 />
                  <ServiceDetailComment1 />
                </div>
              </div>
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
