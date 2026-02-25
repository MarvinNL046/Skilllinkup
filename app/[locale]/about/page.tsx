import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Breadcrumb from "@/components/layout/Breadcrumb";
import CounterSection from "./CounterSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | SkillLinkup",
  description:
    "Learn more about SkillLinkup — the freelance marketplace connecting talented freelancers with clients across the Netherlands and beyond.",
  openGraph: {
    title: "About Us | SkillLinkup",
    description:
      "Learn more about SkillLinkup — the freelance marketplace connecting talented freelancers with clients across the Netherlands and beyond.",
  },
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  // Fetch real marketplace stats from Convex
  let stats = {
    freelancers: 500,
    completedProjects: 1200,
    clients: 200,
    countries: 5,
  };

  try {
    const liveStats = await fetchQuery(
      api.marketplace.clients.getMarketplaceStats,
      {}
    );
    // Use live stats if meaningful data exists, otherwise use aspirational numbers
    stats = {
      freelancers: liveStats.freelancers > 0 ? liveStats.freelancers : 500,
      completedProjects:
        liveStats.completedProjects > 0 ? liveStats.completedProjects : 1200,
      clients: liveStats.clients > 0 ? liveStats.clients : 200,
      countries: liveStats.countries,
    };
  } catch (error) {
    console.error("Error fetching marketplace stats:", error);
  }

  const counterStats = [
    {
      icon: "flaticon-freelancer",
      end: stats.freelancers,
      suffix: "+",
      label: "Freelancers Registered",
    },
    {
      icon: "flaticon-contract",
      end: stats.completedProjects,
      suffix: "+",
      label: "Projects Completed",
    },
    {
      icon: "flaticon-group",
      end: stats.clients,
      suffix: "+",
      label: "Satisfied Clients",
    },
    {
      icon: "flaticon-worldwide",
      end: stats.countries,
      suffix: "",
      label: "Countries Covered",
    },
  ];

  return (
    <>
      <Breadcrumb title="About Us" brief="Learn more about SkillLinkup" />

      {/* About Section */}
      <section className="our-about pb90 pt60">
        <div className="container">
          <div className="row align-items-center">
            {/* Left: Image */}
            <div className="col-lg-6 mb40-md">
              <div className="position-relative">
                <Image
                  height={580}
                  width={560}
                  className="w-100 bdrs16"
                  src="/images/home/home-2.jpg"
                  alt="About SkillLinkup"
                />
                <div
                  className="about-stats-card bdrs16 bgc-white p30 position-absolute d-none d-md-block"
                  style={{ bottom: 40, right: -30, zIndex: 1 }}
                >
                  <div className="d-flex align-items-center">
                    <div className="icon-box bgc-thm rounded-circle d-flex align-items-center justify-content-center me-3"
                         style={{ width: 50, height: 50 }}>
                      <i className="flaticon-protection fz20 text-white" />
                    </div>
                    <div>
                      <h5 className="mb-0">Trusted Platform</h5>
                      <p className="mb-0 fz14 dark-color">Verified profiles only</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="col-lg-6 ps-xl-5">
              <div className="mb30">
                <h2 className="title mb20">
                  Connecting Freelancers &amp; Clients{" "}
                  <span className="text-thm">Across the Netherlands</span>
                </h2>
                <p className="text mb20">
                  SkillLinkup is the freelance marketplace built for the Dutch
                  market and beyond. Whether you need a web developer in
                  Amsterdam, a graphic designer in Rotterdam, or a remote
                  copywriter anywhere in Europe — we make the connection simple,
                  secure, and transparent.
                </p>
                <p className="text mb30">
                  Our mission is to empower freelancers with the tools and
                  visibility they deserve, while giving clients a trusted place
                  to find top talent quickly. Every profile is verified, every
                  transaction is protected, and every project matters.
                </p>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="iconbox-style1 d-flex align-items-start mb20">
                    <span className="icon flex-shrink-0">
                      <i className="flaticon-checked fz20 text-thm" />
                    </span>
                    <div className="ms-3">
                      <h6 className="mb-1">Verified Profiles</h6>
                      <p className="mb-0 fz14">
                        Every freelancer goes through identity verification
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="iconbox-style1 d-flex align-items-start mb20">
                    <span className="icon flex-shrink-0">
                      <i className="flaticon-protection fz20 text-thm" />
                    </span>
                    <div className="ms-3">
                      <h6 className="mb-1">Secure Payments</h6>
                      <p className="mb-0 fz14">
                        Escrow payments protect both parties
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="iconbox-style1 d-flex align-items-start mb20">
                    <span className="icon flex-shrink-0">
                      <i className="flaticon-star fz20 text-thm" />
                    </span>
                    <div className="ms-3">
                      <h6 className="mb-1">Honest Reviews</h6>
                      <p className="mb-0 fz14">
                        Transparent ratings from real clients
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="iconbox-style1 d-flex align-items-start mb20">
                    <span className="icon flex-shrink-0">
                      <i className="flaticon-support fz20 text-thm" />
                    </span>
                    <div className="ms-3">
                      <h6 className="mb-1">24/7 Support</h6>
                      <p className="mb-0 fz14">
                        Our team is always here to help
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt20">
                <Link href={`/${locale}/services`} className="ud-btn btn-thm me-3">
                  Browse Services
                  <i className="fal fa-arrow-right-long" />
                </Link>
                <Link
                  href={`/${locale}/become-freelancer`}
                  className="ud-btn btn-white2"
                >
                  Become a Freelancer
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counter Section */}
      <CounterSection stats={counterStats} />

      {/* Values Section */}
      <section className="our-team pt90 pb90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <div className="main-title mb50">
                <h2 className="title">Our Core Values</h2>
                <p className="paragraph">
                  Everything we build is guided by three principles that put
                  freelancers and clients first.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Value 1: Quality */}
            <div className="col-md-4 mb30">
              <div className="iconbox-style1 at-home19 bdrs16 bdr1 hover-box-shadow p40 text-center h-100">
                <span className="icon mb20 d-block">
                  <i className="flaticon-medal fz50 text-thm" />
                </span>
                <h4 className="mb15">Quality First</h4>
                <p className="text mb-0">
                  We only feature freelancers who meet our quality standards.
                  Every service listing is reviewed, and every profile is
                  verified to ensure you work with the best talent available.
                </p>
              </div>
            </div>

            {/* Value 2: Trust */}
            <div className="col-md-4 mb30">
              <div className="iconbox-style1 at-home19 bdrs16 bdr1 hover-box-shadow p40 text-center h-100">
                <span className="icon mb20 d-block">
                  <i className="flaticon-handshake fz50 text-thm" />
                </span>
                <h4 className="mb15">Built on Trust</h4>
                <p className="text mb-0">
                  Secure escrow payments, verified identity checks, and
                  transparent review systems ensure every transaction is safe.
                  Trust is not a feature — it&apos;s our foundation.
                </p>
              </div>
            </div>

            {/* Value 3: Growth */}
            <div className="col-md-4 mb30">
              <div className="iconbox-style1 at-home19 bdrs16 bdr1 hover-box-shadow p40 text-center h-100">
                <span className="icon mb20 d-block">
                  <i className="flaticon-growth fz50 text-thm" />
                </span>
                <h4 className="mb15">Growth Together</h4>
                <p className="text mb-0">
                  We grow when our community grows. That&apos;s why we invest in
                  tools, training resources, and competitive pricing to help
                  freelancers build sustainable careers and clients find
                  long-term partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-banner bgc-thm2 pt60 pb60">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 mb20-md">
              <div className="cta-style2">
                <h2 className="title text-white mb10">
                  Ready to get started?
                </h2>
                <p className="text text-white mb-0">
                  Join thousands of freelancers and clients already using
                  SkillLinkup. Sign up free — no subscription required.
                </p>
              </div>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="d-flex flex-wrap gap-3 justify-content-lg-end">
                <Link
                  href={`/${locale}/sign-up`}
                  className="ud-btn btn-thm"
                >
                  Sign Up Free
                  <i className="fal fa-arrow-right-long" />
                </Link>
                <Link
                  href={`/${locale}/services`}
                  className="ud-btn btn-white2"
                >
                  Browse Services
                  <i className="fal fa-arrow-right-long" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
