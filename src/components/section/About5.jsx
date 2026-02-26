import Link from "next/link";

export default function About5() {
  return (
    <>
      <section className="our-about pb0 pt60-lg">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-xl-6">
              <div
                className="mb30-sm wow fadeInRight"
                data-wow-delay="300ms"
              >
                <div
                  className="d-flex align-items-center justify-content-center bdrs16"
                  style={{
                    background: "linear-gradient(135deg, #1e1541 0%, #ef2b70 100%)",
                    minHeight: 400,
                    padding: "3rem",
                  }}
                >
                  <div className="text-center text-white">
                    <h2 className="text-white mb20" style={{ fontSize: "2.5rem" }}>
                      Connecting Talent <br /> with Opportunity
                    </h2>
                    <p className="text-white-50 fz16">
                      Helping freelancers find the right platforms <br />
                      and clients find the right talent.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-5 offset-xl-1">
              <div
                className="position-relative wow fadeInLeft"
                data-wow-delay="300ms"
              >
                <h2 className="mb25">
                  Your Guide to the{" "}
                  <br className="d-none d-xl-block" /> Freelance World
                </h2>
                <p className="text mb25">
                  SkillLinkup helps you navigate the freelance landscape. Whether
                  you&apos;re a freelancer looking for the best platform to sell your
                  services, or a client searching for the right talent &mdash; we&apos;ve
                  got you covered with honest reviews, comparisons, and a
                  growing marketplace.
                </p>
                <div className="list-style2">
                  <ul className="mb20">
                    <li>
                      <i className="far fa-check" />
                      Compare 19+ freelance platforms side by side
                    </li>
                    <li>
                      <i className="far fa-check" />
                      Find services from verified freelancers
                    </li>
                    <li>
                      <i className="far fa-check" />
                      Secure payments with built-in escrow protection
                    </li>
                  </ul>
                </div>
                <Link
                  href="/platforms"
                  className="ud-btn btn-thm-border"
                >
                  Explore Platforms
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
