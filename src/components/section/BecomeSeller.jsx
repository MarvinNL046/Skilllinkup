"use client";

import Link from "next/link";

const waysToEarn = [
  {
    id: "online",
    color: "#ef2b70",
    bgLight: "rgba(239, 43, 112, 0.08)",
    icon: "flaticon-web",
    world: "Online Marketplace",
    title: "Sell Digital Services",
    description:
      "Create gig packages for design, development, marketing and more. Set your own prices and deliver remotely to clients worldwide.",
    features: [
      "Set your own prices",
      "Secure escrow payments",
      "Global client base",
    ],
    cta: "Start Selling Online",
    href: "/register?role=freelancer",
  },
  {
    id: "local",
    color: "#1e1541",
    bgLight: "rgba(30, 21, 65, 0.07)",
    icon: "flaticon-place",
    world: "Local Marketplace",
    title: "Get Local Leads",
    description:
      "Receive quote requests from homeowners in your area. Buy credits to claim leads and connect directly with clients.",
    features: [
      "Pay only for leads you want",
      "Exclusive or shared claims",
      "Direct client contact",
    ],
    cta: "Start Getting Leads",
    href: "/register?role=freelancer",
  },
  {
    id: "jobs",
    color: "#22c55e",
    bgLight: "rgba(34, 197, 94, 0.08)",
    icon: "flaticon-briefcase",
    world: "Jobs",
    title: "Find Employment",
    description:
      "Browse job openings from companies looking for your skills. Apply directly and find your next career opportunity.",
    features: [
      "Browse vacancies for free",
      "Direct applications",
      "Company profiles",
    ],
    cta: "Browse Jobs",
    href: "/jobs/browse",
  },
];

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description:
      "Sign up for free and showcase your skills, experience, and portfolio. Add your location for local work.",
  },
  {
    number: "02",
    title: "Get Discovered",
    description:
      "Clients find you through search, or browse open projects and quote requests to find work that fits.",
  },
  {
    number: "03",
    title: "Earn Securely",
    description:
      "Get paid through our secure payment system. Online orders use escrow, local leads use our credit system.",
  },
];

const benefits = [
  {
    icon: "flaticon-security",
    title: "Secure Payments",
    text: "Escrow protection for online orders. Your money is safe until work is approved.",
  },
  {
    icon: "flaticon-dollar",
    title: "Low Fees",
    text: "Competitive platform fees from 10-15%. Keep more of what you earn.",
  },
  {
    icon: "flaticon-badge",
    title: "Build Your Reputation",
    text: "Collect reviews, earn verification badges, and stand out from the crowd.",
  },
  {
    icon: "flaticon-place",
    title: "Local & Remote",
    text: "Work from anywhere or serve clients in your area. You choose.",
  },
  {
    icon: "flaticon-chat",
    title: "Direct Messaging",
    text: "Communicate directly with clients through our built-in messaging system.",
  },
  {
    icon: "flaticon-presentation",
    title: "Analytics Dashboard",
    text: "Track your orders, earnings, and performance from one dashboard.",
  },
];

const faqs = [
  {
    id: "BsOne",
    question: "Is it free to join?",
    answer:
      "Yes, creating a freelancer profile is completely free. For online services, we charge a small platform fee (10-15%) only when you make a sale. For local leads, you buy credits to claim the leads you want.",
  },
  {
    id: "BsTwo",
    question: "How do I get paid for online services?",
    answer:
      "Payments are held in escrow until the client approves your delivery. Once approved, funds are released to your Stripe account. We support bank transfers in most countries.",
  },
  {
    id: "BsThree",
    question: "How does the local lead system work?",
    answer:
      "Homeowners post quote requests for local services. You buy credits and use them to claim leads that match your skills and area. Once claimed, you get the client's contact details to reach out directly.",
  },
  {
    id: "BsFour",
    question: "Can I offer both online and local services?",
    answer:
      "Absolutely! Your profile can be set to remote, local, or hybrid. You'll appear in the relevant marketplace based on your settings.",
  },
  {
    id: "BsFive",
    question: "How long does it take to set up?",
    answer:
      "You can create your profile and start browsing opportunities in under 5 minutes. Add your skills, set your rates, and you're ready to go.",
  },
];

export default function BecomeSeller() {
  return (
    <>
      {/* Section 1: Hero */}
      <section
        className="position-relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1e1541 0%, #2d2060 60%, #3a1a6e 100%)",
          paddingTop: "100px",
          paddingBottom: "100px",
        }}
      >
        {/* Decorative background shape */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-80px",
            right: "-120px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background: "rgba(239, 43, 112, 0.12)",
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-60px",
            left: "-80px",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "rgba(34, 197, 94, 0.08)",
            pointerEvents: "none",
          }}
        />

        <div className="container position-relative">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8 col-xl-7">
              <div className="wow fadeInUp" data-wow-delay="100ms">
                <h1
                  className="text-white mb20"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 700, lineHeight: 1.2 }}
                >
                  Earn on Your Own Terms
                </h1>
                <p
                  className="mb40"
                  style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.125rem", lineHeight: 1.7 }}
                >
                  Join thousands of freelancers and craftsmen on SkillLinkup.
                  Offer your services online, get local leads, or find your next
                  opportunity.
                </p>
                <div className="d-flex flex-wrap justify-content-center gap-3 mb50">
                  <Link
                    href="/register?role=freelancer"
                    className="ud-btn btn-thm bdrs8"
                    style={{ minWidth: "180px" }}
                  >
                    Get Started Free
                    <i className="fal fa-arrow-right-long" />
                  </Link>
                  <a
                    href="#how-it-works"
                    className="ud-btn btn-white bdrs8"
                    style={{ minWidth: "160px" }}
                  >
                    How It Works
                  </a>
                </div>

                {/* Stats row */}
                <div className="row justify-content-center g-4">
                  {[
                    { stat: "0% to start", sub: "No upfront cost" },
                    { stat: "Secure payments", sub: "Escrow protected" },
                    { stat: "3 marketplaces", sub: "One profile" },
                  ].map((item, i) => (
                    <div key={i} className="col-auto">
                      <div
                        style={{
                          padding: "16px 28px",
                          borderRadius: "12px",
                          background: "rgba(255,255,255,0.1)",
                          backdropFilter: "blur(6px)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          minWidth: "140px",
                        }}
                      >
                        <div
                          className="text-white fw600"
                          style={{ fontSize: "1.1rem", marginBottom: "2px" }}
                        >
                          {item.stat}
                        </div>
                        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem" }}>
                          {item.sub}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Three Ways to Earn */}
      <section className="pt90 pb90">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-8 mx-auto text-center">
              <div className="main-title mb50">
                <h2 className="title">Three Ways to Earn</h2>
                <p className="paragraph mt10">
                  Choose one or combine all three. Your profile, your rules.
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4 wow fadeInUp" data-wow-delay="200ms">
            {waysToEarn.map((card) => (
              <div key={card.id} className="col-lg-4 col-sm-6">
                <div
                  className="h-100 bdrs12"
                  style={{
                    background: "#fff",
                    boxShadow: "0 4px 30px rgba(0,0,0,0.07)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    padding: "36px 32px 32px",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 30px rgba(0,0,0,0.07)";
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "14px",
                      background: card.bgLight,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      className={card.icon}
                      style={{ color: card.color, fontSize: "26px" }}
                    />
                  </div>

                  {/* World label */}
                  <span
                    className="fz13 fw600 mb10"
                    style={{
                      color: card.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      display: "block",
                    }}
                  >
                    {card.world}
                  </span>

                  <h4 className="mb15" style={{ fontWeight: 700 }}>
                    {card.title}
                  </h4>
                  <p className="body-color fz15 mb25" style={{ lineHeight: 1.7, flexGrow: 1 }}>
                    {card.description}
                  </p>

                  {/* Feature list */}
                  <ul className="mb30 p-0" style={{ listStyle: "none" }}>
                    {card.features.map((feature, fi) => (
                      <li
                        key={fi}
                        className="d-flex align-items-center fz14 mb10"
                        style={{ color: "#555" }}
                      >
                        <i
                          className="far fa-check-circle me-2"
                          style={{ color: card.color, flexShrink: 0 }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={card.href}
                    className="ud-btn bdrs8"
                    style={{
                      background: card.color,
                      color: "#fff",
                      border: `1px solid ${card.color}`,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      fontWeight: 600,
                      padding: "12px 24px",
                      borderRadius: "8px",
                      textDecoration: "none",
                      transition: "opacity 0.2s ease",
                      width: "100%",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    {card.cta}
                    <i className="fal fa-arrow-right-long" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section
        id="how-it-works"
        className="pt80 pb80"
        style={{ background: "#f8f9fb" }}
      >
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-7 mx-auto text-center">
              <div className="main-title mb50">
                <h2 className="title">Get Started in Minutes</h2>
                <p className="paragraph mt10">
                  Three simple steps to start earning on SkillLinkup.
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4 wow fadeInUp" data-wow-delay="200ms">
            {steps.map((step, i) => (
              <div key={i} className="col-lg-4 col-sm-6">
                <div
                  className="h-100 bdrs12"
                  style={{
                    background: "#fff",
                    boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
                    padding: "36px 28px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Step number watermark */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "16px",
                      fontSize: "80px",
                      fontWeight: 800,
                      color: "rgba(239, 43, 112, 0.07)",
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                  >
                    {step.number}
                  </span>

                  <div
                    className="mb20"
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "#ef2b70",
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "1rem",
                    }}
                  >
                    {i + 1}
                  </div>
                  <h4 className="mb15" style={{ fontWeight: 700 }}>
                    {step.title}
                  </h4>
                  <p className="body-color fz15 mb-0" style={{ lineHeight: 1.7 }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Why SkillLinkup */}
      <section className="pt90 pb90">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-7 mx-auto text-center">
              <div className="main-title mb50">
                <h2 className="title">Why Freelancers Choose SkillLinkup</h2>
                <p className="paragraph mt10">
                  Everything you need to grow your freelance business, in one place.
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4 wow fadeInUp" data-wow-delay="200ms">
            {benefits.map((benefit, i) => (
              <div key={i} className="col-lg-4 col-sm-6">
                <div
                  className="d-flex align-items-start bdrs12 h-100"
                  style={{
                    padding: "28px 24px",
                    border: "1px solid rgba(0,0,0,0.07)",
                    background: "#fff",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                    transition: "box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.04)";
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "12px",
                      background: "rgba(239, 43, 112, 0.09)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginRight: "16px",
                    }}
                  >
                    <span
                      className={benefit.icon}
                      style={{ color: "#ef2b70", fontSize: "22px" }}
                    />
                  </div>
                  <div>
                    <h5 className="mb10" style={{ fontWeight: 700, fontSize: "1rem" }}>
                      {benefit.title}
                    </h5>
                    <p className="body-color fz14 mb-0" style={{ lineHeight: 1.6 }}>
                      {benefit.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: CTA Banner */}
      <section
        className="pt80 pb80"
        style={{ background: "#1e1541" }}
      >
        <div className="container">
          <div className="row justify-content-center text-center wow fadeInUp">
            <div className="col-lg-6">
              <h2
                className="text-white mb20"
                style={{ fontWeight: 700 }}
              >
                Ready to Start Earning?
              </h2>
              <p
                className="mb40"
                style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem" }}
              >
                Join SkillLinkup today — it's free to create your profile.
              </p>
              <Link
                href="/register?role=freelancer"
                className="ud-btn btn-thm bdrs8"
                style={{ minWidth: "220px" }}
              >
                Create Your Free Profile
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: FAQ */}
      <section className="our-faqs pt80 pb80">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-6 mx-auto text-center">
              <div className="main-title mb40">
                <h2 className="title">Frequently Asked Questions</h2>
                <p className="paragraph mt10">
                  Everything you need to know before getting started.
                </p>
              </div>
            </div>
          </div>

          <div className="row wow fadeInUp" data-wow-delay="200ms">
            <div className="col-lg-8 mx-auto">
              <div className="ui-content">
                <div className="accordion-style1 faq-page mb-4 mb-lg-5">
                  <div className="accordion" id="accordionBecomeSeller">
                    {faqs.map((faq, index) => (
                      <div
                        key={faq.id}
                        className={`accordion-item${index === 0 ? " active" : ""}`}
                      >
                        <h2
                          className="accordion-header"
                          id={`heading${faq.id}`}
                        >
                          <button
                            className={`accordion-button${index !== 0 ? " collapsed" : ""}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${faq.id}`}
                            aria-expanded={index === 0 ? "true" : "false"}
                            aria-controls={`collapse${faq.id}`}
                          >
                            {faq.question}
                          </button>
                        </h2>
                        <div
                          id={`collapse${faq.id}`}
                          className={`accordion-collapse collapse${index === 0 ? " show" : ""}`}
                          aria-labelledby={`heading${faq.id}`}
                          data-parent="#accordionBecomeSeller"
                        >
                          <div className="accordion-body">{faq.answer}</div>
                        </div>
                      </div>
                    ))}
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
