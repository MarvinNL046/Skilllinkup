import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("pricing");
  return {
    title: t("title"),
    description: t("metaDescription"),
    openGraph: {
      title: t("title"),
      description: t("metaDescription"),
    },
  };
}

export default async function PricingPage() {
  const t = await getTranslations("pricing");

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
    { q: t("faq5Q"), a: t("faq5A") },
  ];

  const steps = [
    { title: t("step1Title"), desc: t("step1Desc") },
    { title: t("step2Title"), desc: t("step2Desc") },
    { title: t("step3Title"), desc: t("step3Desc") },
  ];

  return (
    <>
      <Header20 />
      <section className="our-pricing pb90">
        <div className="container">
          {/* Hero */}
          <div className="row">
            <div className="col-lg-8 m-auto text-center mb40">
              <h1 className="title mb15" style={{ fontSize: "2.2rem" }}>
                {t("heroTitle")}
              </h1>
              <p className="paragraph fz17">{t("heroSubtitle")}</p>
            </div>
          </div>

          {/* Main fee card */}
          <div className="row justify-content-center mb60">
            <div className="col-lg-6 col-md-8">
              <div
                className="text-center p-5 bdrs12"
                style={{
                  background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
                  border: "2px solid #22c55e",
                }}
              >
                <p className="fz15 fw500 mb10" style={{ color: "#22c55e" }}>
                  {t("transactionFee")}
                </p>
                <h2 className="mb5" style={{ fontSize: "4rem", fontWeight: 800 }}>
                  3.5% + 3.5%
                </h2>
                <p className="body-color fz15 mb10">{t("feeExplainer")}</p>
                <p className="fz13 mb0" style={{ color: "#22c55e" }}>{t("feeIncluded")}</p>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="row justify-content-center mb60">
            <div className="col-lg-8">
              <h3 className="title text-center mb30" style={{ fontSize: "1.5rem" }}>
                {t("howItWorks")}
              </h3>
              <div className="row">
                {steps.map((step, i) => (
                  <div key={i} className="col-md-4 text-center mb30">
                    <div
                      className="d-inline-flex align-items-center justify-content-center bdrs50p mb15"
                      style={{ width: 64, height: 64, background: "#f0fdf4" }}
                    >
                      <span style={{ fontSize: "1.8rem" }}>{i + 1}</span>
                    </div>
                    <h5 className="mb10">{step.title}</h5>
                    <p className="body-color fz14">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="row justify-content-center mb60">
            <div className="col-lg-8">
              <h3 className="title text-center mb30" style={{ fontSize: "1.5rem" }}>
                {t("compareTitle")}
              </h3>
              <div className="table-responsive">
                <table className="table table-bordered text-center">
                  <thead>
                    <tr style={{ background: "#f8f9fa" }}>
                      <th className="text-start py-3 px-4">{t("platform")}</th>
                      <th className="py-3 px-4">{t("sellerFee")}</th>
                      <th className="py-3 px-4">{t("buyerFee")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ background: "#f0fdf4" }}>
                      <td className="text-start py-3 px-4 fw500">SkillLinkup</td>
                      <td className="py-3 px-4 fw500" style={{ color: "#22c55e" }}>3.5%</td>
                      <td className="py-3 px-4 fw500" style={{ color: "#22c55e" }}>3.5%</td>
                    </tr>
                    <tr>
                      <td className="text-start py-3 px-4 body-color">Fiverr</td>
                      <td className="py-3 px-4 body-color">20%</td>
                      <td className="py-3 px-4 body-color">5.5%</td>
                    </tr>
                    <tr>
                      <td className="text-start py-3 px-4 body-color">Upwork</td>
                      <td className="py-3 px-4 body-color">10%</td>
                      <td className="py-3 px-4 body-color">5%</td>
                    </tr>
                    <tr>
                      <td className="text-start py-3 px-4 body-color">Freelancer.com</td>
                      <td className="py-3 px-4 body-color">10%</td>
                      <td className="py-3 px-4 body-color">3%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h3 className="title text-center mb30" style={{ fontSize: "1.5rem" }}>
                {t("faqTitle")}
              </h3>
              {faqs.map((faq, i) => (
                <div key={i} className="mb20">
                  <h6 className="mb10">{faq.q}</h6>
                  <p className="body-color fz14">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer14 />
    </>
  );
}
