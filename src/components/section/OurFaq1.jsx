"use client";

import { usePathname } from "next/navigation";

const faqs = [
  {
    id: "One",
    question: "How do I get started as a freelancer on SkillLinkup?",
    answer:
      "Sign up for a free account, complete your profile with your skills and portfolio, and start browsing available projects or create service listings. Clients can find you through search or you can apply to posted projects directly.",
  },
  {
    id: "Two",
    question: "How do payments work?",
    answer:
      "SkillLinkup uses a secure escrow system. When a client hires you, the payment is held in escrow until the work is completed and approved. Once the client confirms delivery, the funds are released to your account. This protects both freelancers and clients.",
  },
  {
    id: "Three",
    question: "Is it free to create an account?",
    answer:
      "Yes, creating an account on SkillLinkup is completely free for both freelancers and clients. You can browse platforms, compare services, and set up your profile at no cost.",
  },
  {
    id: "Four",
    question: "How do I find the right freelancer for my project?",
    answer:
      "Use the search and filter options on the Services page to find freelancers by skill, rating, price range, and delivery time. You can also browse our platform comparisons to find the best freelance platform for your specific needs.",
  },
  {
    id: "Five",
    question: "What if I have a dispute with a client or freelancer?",
    answer:
      "SkillLinkup has a built-in dispute resolution system. If you encounter any issues, you can open a dispute through your dashboard. Our team will review the case and help mediate a fair resolution for both parties.",
  },
];

export default function OurFaq1() {
  const path = usePathname();

  return (
    <>
      <section
        className={`our-faqs pb50 ${
          path === "/become-seller" ? "pt-0" : path === "/contact" ? "pb70" : ""
        }`}
      >
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-6 m-auto">
              <div className="main-title text-center">
                <h2 className="title">Frequently Asked Questions</h2>
                <p className="paragraph mt10">
                  Everything you need to know about using SkillLinkup.
                </p>
              </div>
            </div>
          </div>
          <div className="row wow fadeInUp" data-wow-delay="300ms">
            <div className="col-lg-8 mx-auto">
              <div className="ui-content">
                <div className="accordion-style1 faq-page mb-4 mb-lg-5">
                  <div className="accordion" id="accordionExample">
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
                          data-parent="#accordionExample"
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
