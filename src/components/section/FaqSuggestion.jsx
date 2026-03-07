export default function FaqSuggestion() {
  return (
    <>
      <div className="ui-content">
        <h4 className="title">Getting Started</h4>
        <div className="accordion-style1 faq-page mb-4 mb-lg-5">
          <div className="accordion" id="accordionExample2">
            <div className="accordion-item active">
              <h2 className="accordion-header" id="headingSix">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSix"
                  aria-expanded="true"
                  aria-controls="collapseSix"
                >
                  How do I create an account?
                </button>
              </h2>
              <div
                id="collapseSix"
                className="accordion-collapse collapse show"
                aria-labelledby="headingSix"
                data-parent="#accordionExample2"
              >
                <div className="accordion-body">
                  Click &quot;Join&quot; in the top navigation and sign up with your
                  email address or Google account. Once registered, you can
                  browse services, hire freelancers, or set up your own seller
                  profile to start offering your skills.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingSeven">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseSeven"
                  aria-expanded="false"
                  aria-controls="collapseSeven"
                >
                  How do I hire a freelancer?
                </button>
              </h2>
              <div
                id="collapseSeven"
                className="accordion-collapse collapse"
                aria-labelledby="headingSeven"
                data-parent="#accordionExample2"
              >
                <div className="accordion-body">
                  Browse or search for services in our marketplace. Once you
                  find a service you like, click on it to see details, reviews,
                  and pricing. You can then place an order directly or message
                  the freelancer first to discuss your requirements.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingEight">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseEight"
                  aria-expanded="false"
                  aria-controls="collapseEight"
                >
                  How do I start selling on SkillLinkup?
                </button>
              </h2>
              <div
                id="collapseEight"
                className="accordion-collapse collapse"
                aria-labelledby="headingEight"
                data-parent="#accordionExample2"
              >
                <div className="accordion-body">
                  After creating your account, go to your dashboard and click
                  &quot;Become a Seller.&quot; Complete your profile, set up your Stripe
                  account for payments, and create your first gig. Your service
                  will be visible in our marketplace once published.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingNine">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseNine"
                  aria-expanded="false"
                  aria-controls="collapseNine"
                >
                  What is the difference between online and local services?
                </button>
              </h2>
              <div
                id="collapseNine"
                className="accordion-collapse collapse"
                aria-labelledby="headingNine"
                data-parent="#accordionExample2"
              >
                <div className="accordion-body">
                  Online services are delivered remotely — think web development,
                  graphic design, or content writing. Local services are
                  performed on-site in your area — like home repairs, cleaning,
                  or photography. You can find both types on SkillLinkup.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTen">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTen"
                  aria-expanded="false"
                  aria-controls="collapseTen"
                >
                  How do I contact support?
                </button>
              </h2>
              <div
                id="collapseTen"
                className="accordion-collapse collapse"
                aria-labelledby="headingTen"
                data-parent="#accordionExample2"
              >
                <div className="accordion-body">
                  You can reach us via the contact page or email us directly at
                  info@skilllinkup.com. We typically respond within 24 hours on
                  business days.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
