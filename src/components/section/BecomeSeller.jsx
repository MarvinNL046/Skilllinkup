"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function BecomeSeller() {
  const t = useTranslations("becomeSeller");

  const waysToEarn = [
    {
      id: "online",
      color: "#ef2b70",
      bgLight: "rgba(239, 43, 112, 0.08)",
      icon: "flaticon-web",
      world: t("onlineWorld"),
      title: t("onlineTitle"),
      description: t("onlineDesc"),
      features: [t("onlineF1"), t("onlineF2"), t("onlineF3")],
      cta: t("onlineCta"),
      href: "/register?role=freelancer",
    },
    {
      id: "local",
      color: "#1e1541",
      bgLight: "rgba(30, 21, 65, 0.07)",
      icon: "flaticon-place",
      world: t("localWorld"),
      title: t("localTitle"),
      description: t("localDesc"),
      features: [t("localF1"), t("localF2"), t("localF3")],
      cta: t("localCta"),
      href: "/register?role=freelancer",
    },
    {
      id: "jobs",
      color: "var(--primary-600)",
      bgLight: "rgba(34, 197, 94, 0.08)",
      icon: "flaticon-briefcase",
      world: t("jobsWorld"),
      title: t("jobsTitle"),
      description: t("jobsDesc"),
      features: [t("jobsF1"), t("jobsF2"), t("jobsF3")],
      cta: t("jobsCta"),
      href: "/jobs/browse",
    },
  ];

  const steps = [
    { number: "01", title: t("step1Title"), description: t("step1Desc") },
    { number: "02", title: t("step2Title"), description: t("step2Desc") },
    { number: "03", title: t("step3Title"), description: t("step3Desc") },
  ];

  const benefits = [
    { icon: "flaticon-security", title: t("benefitSecureTitle"), text: t("benefitSecureText") },
    { icon: "flaticon-dollar", title: t("benefitFeesTitle"), text: t("benefitFeesText") },
    { icon: "flaticon-badge", title: t("benefitReputationTitle"), text: t("benefitReputationText") },
    { icon: "flaticon-place", title: t("benefitLocalTitle"), text: t("benefitLocalText") },
    { icon: "flaticon-chat", title: t("benefitMessageTitle"), text: t("benefitMessageText") },
    { icon: "flaticon-presentation", title: t("benefitAnalyticsTitle"), text: t("benefitAnalyticsText") },
  ];

  const faqs = [
    { id: "BsOne", question: t("faq1Q"), answer: t("faq1A") },
    { id: "BsTwo", question: t("faq2Q"), answer: t("faq2A") },
    { id: "BsThree", question: t("faq3Q"), answer: t("faq3A") },
    { id: "BsFour", question: t("faq4Q"), answer: t("faq4A") },
    { id: "BsFive", question: t("faq5Q"), answer: t("faq5A") },
  ];

  const heroStats = [
    { stat: t("stat1"), sub: t("stat1Sub") },
    { stat: t("stat2"), sub: t("stat2Sub") },
    { stat: t("stat3"), sub: t("stat3Sub") },
  ];

  return (
    <>
      {/* Section 1: Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1e1541 0%, #2d2060 60%, #3a1a6e 100%)",
          paddingTop: "100px",
          paddingBottom: "100px",
        }}
      >
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

        <div className="container relative">
          <div className="row justify-center text-center">
            <div className="col-lg-8 col-xl-7">
              <div className="wow fadeInUp" data-wow-delay="100ms">
                <h1
                  className="text-white mb-5"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 700, lineHeight: 1.2 }}
                >
                  {t("heroTitle")}
                </h1>
                <p
                  className="mb-10"
                  style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.125rem", lineHeight: 1.7 }}
                >
                  {t("heroSubtitle")}
                </p>
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                  <Button asChild size="lg" className="min-w-[180px]">
                    <Link href="/register?role=freelancer">
                      {t("getStartedFree")}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="min-w-[160px]">
                    <a href="#how-it-works">{t("howItWorks")}</a>
                  </Button>
                </div>

                <div className="row justify-center g-4">
                  {heroStats.map((item, i) => (
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
                          className="text-white font-semibold"
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
      <section className="pt-24 pb-24">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-8 mx-auto text-center">
              <div className="main-title mb-12">
                <h2 className="title">{t("threeWaysTitle")}</h2>
                <p className="paragraph mt-2.5">{t("threeWaysSubtitle")}</p>
              </div>
            </div>
          </div>

          <div className="row g-4 wow fadeInUp" data-wow-delay="200ms">
            {waysToEarn.map((card) => (
              <div key={card.id} className="col-lg-4 col-sm-6">
                <div
                  className="h-full bdrs12"
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
                    <span className={card.icon} style={{ color: card.color, fontSize: "26px" }} />
                  </div>

                  <span
                    className="text-sm font-semibold mb-2.5"
                    style={{
                      color: card.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      display: "block",
                    }}
                  >
                    {card.world}
                  </span>

                  <h4 className="mb-4" style={{ fontWeight: 700 }}>{card.title}</h4>
                  <p className="body-color text-base mb-6" style={{ lineHeight: 1.7, flexGrow: 1 }}>
                    {card.description}
                  </p>

                  <ul className="mb-8 p-0" style={{ listStyle: "none" }}>
                    {card.features.map((feature, fi) => (
                      <li key={fi} className="flex items-center text-sm mb-2.5" style={{ color: "#555" }}>
                        <i className="far fa-check-circle me-2" style={{ color: card.color, flexShrink: 0 }} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={card.href}
                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg font-semibold text-white no-underline transition-opacity hover:opacity-85"
                    style={{
                      background: card.color,
                      border: `1px solid ${card.color}`,
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
      <section id="how-it-works" className="pt-20 pb-20" style={{ background: "#f8f9fb" }}>
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-7 mx-auto text-center">
              <div className="main-title mb-12">
                <h2 className="title">{t("stepsTitle")}</h2>
                <p className="paragraph mt-2.5">{t("stepsSubtitle")}</p>
              </div>
            </div>
          </div>

          <div className="row g-4 wow fadeInUp" data-wow-delay="200ms">
            {steps.map((step, i) => (
              <div key={i} className="col-lg-4 col-sm-6">
                <div
                  className="h-full bdrs12"
                  style={{
                    background: "#fff",
                    boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
                    padding: "36px 28px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
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
                    className="mb-5"
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
                  <h4 className="mb-4" style={{ fontWeight: 700 }}>{step.title}</h4>
                  <p className="body-color text-base mb-0" style={{ lineHeight: 1.7 }}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Why SkillLinkup */}
      <section className="pt-24 pb-24">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-7 mx-auto text-center">
              <div className="main-title mb-12">
                <h2 className="title">{t("whyTitle")}</h2>
                <p className="paragraph mt-2.5">{t("whySubtitle")}</p>
              </div>
            </div>
          </div>

          <div className="row g-4 wow fadeInUp" data-wow-delay="200ms">
            {benefits.map((benefit, i) => (
              <div key={i} className="col-lg-4 col-sm-6">
                <div
                  className="flex items-start bdrs12 h-full"
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
                    <span className={benefit.icon} style={{ color: "#ef2b70", fontSize: "22px" }} />
                  </div>
                  <div>
                    <h5 className="mb-2.5" style={{ fontWeight: 700, fontSize: "1rem" }}>{benefit.title}</h5>
                    <p className="body-color text-sm mb-0" style={{ lineHeight: 1.6 }}>{benefit.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: CTA Banner */}
      <section className="pt-20 pb-20" style={{ background: "#1e1541" }}>
        <div className="container">
          <div className="row justify-center text-center wow fadeInUp">
            <div className="col-lg-6">
              <h2 className="text-white mb-5" style={{ fontWeight: 700 }}>{t("ctaTitle")}</h2>
              <p className="mb-10" style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem" }}>
                {t("ctaSubtitle")}
              </p>
              <Button asChild size="lg" className="min-w-[220px]">
                <Link href="/register?role=freelancer">
                  {t("ctaButton")}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: FAQ */}
      <section className="our-faqs pt-20 pb-20">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-6 mx-auto text-center">
              <div className="main-title mb-10">
                <h2 className="title">{t("faqTitle")}</h2>
                <p className="paragraph mt-2.5">{t("faqSubtitle")}</p>
              </div>
            </div>
          </div>

          <div className="row wow fadeInUp" data-wow-delay="200ms">
            <div className="col-lg-8 mx-auto">
              <Accordion type="single" collapsible defaultValue={faqs[0]?.id} className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-base font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[var(--text-secondary)]">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
