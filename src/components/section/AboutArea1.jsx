import Link from "next/link";

export default function AboutArea1() {
  return (
    <>
      <section className="our-faq pb90 pt100">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-4">
              <div className="vertical-tab">
                <div className="widget_list">
                  <nav>
                    <div className="nav flex-column nav-tabs text-start">
                      <button
                        className="nav-link active text-start"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-accountpayment"
                      >
                        <span>For Hiring</span>
                      </button>
                      <button
                        className="nav-link text-start"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-manageother"
                      >
                        <span>For Freelancing</span>
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="tab-content" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="nav-accountpayment"
                  aria-labelledby="nav-accountpayment-tab"
                >
                  <div className="for-hire">
                    <h4>Find the Right Freelancer, Fast</h4>
                    <p className="text mb40">
                      SkillLinkup helps you discover and compare freelance
                      platforms to find the perfect match for your project.
                      Whether you need a designer, developer, or marketing
                      expert — we guide you to the right platform where top
                      talent is waiting.
                    </p>
                    <Link href="/freelancers" className="ud-btn btn-thm-border mb25 me-4">
                      Browse Freelancers
                      <i className="fal fa-arrow-right-long" />
                    </Link>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-manageother"
                  aria-labelledby="nav-manageother-tab"
                >
                  <div className="for-hire">
                    <h4>Grow Your Freelance Career</h4>
                    <p className="text mb40">
                      Compare freelance platforms side by side to find where
                      your skills are most valued. SkillLinkup shows you
                      commission rates, payment terms, and real reviews so you
                      can make an informed choice about where to offer your
                      services.
                    </p>
                    <Link href="/platforms" className="ud-btn btn-thm-border mb25 me-4">
                      Compare Platforms
                      <i className="fal fa-arrow-right-long" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
