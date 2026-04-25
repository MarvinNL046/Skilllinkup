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

  const compare = [
    { name: "SkillLinkup", seller: "3.5%", buyer: "3.5%", highlight: true },
    { name: "Fiverr",        seller: "20%",  buyer: "5.5%" },
    { name: "Upwork",        seller: "10%",  buyer: "5%" },
    { name: "Freelancer.com", seller: "10%", buyer: "3%" },
  ];

  return (
    <div style={{ background: "var(--bg)" }}>
      <Header20 />
      <section style={{ padding: "var(--space-16) 0 var(--space-14)" }}>
        <div className="container">
          {/* Hero */}
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto var(--space-10)",
              textAlign: "center",
            }}
          >
            <span className="overline" style={{ color: "var(--primary-600)" }}>
              Pricing
            </span>
            <h1
              className="display-lg"
              style={{
                fontWeight: 500,
                margin: "var(--space-2) 0 var(--space-3)",
              }}
            >
              {t("heroTitle")}
            </h1>
            <p
              className="body-lg"
              style={{ color: "var(--text-secondary)", margin: 0 }}
            >
              {t("heroSubtitle")}
            </p>
          </div>

          {/* Main fee card */}
          <div
            style={{
              maxWidth: 520,
              margin: "0 auto var(--space-14)",
              padding: "var(--space-10)",
              borderRadius: "var(--radius-2xl)",
              textAlign: "center",
              background:
                "linear-gradient(135deg, var(--success-50) 0%, oklch(96% 0.04 195) 100%)",
              border: "2px solid var(--success-500)",
              boxShadow: "var(--shadow-2)",
            }}
          >
            <div
              className="overline"
              style={{
                color: "var(--success-700)",
                marginBottom: "var(--space-3)",
              }}
            >
              {t("transactionFee")}
            </div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 500,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: "var(--text-primary)",
                marginBottom: "var(--space-3)",
              }}
            >
              3.5% + 3.5%
            </div>
            <p
              className="body-md"
              style={{ color: "var(--text-secondary)", margin: "0 0 var(--space-3)" }}
            >
              {t("feeExplainer")}
            </p>
            <p
              className="body-sm"
              style={{ color: "var(--success-700)", margin: 0, fontWeight: 500 }}
            >
              {t("feeIncluded")}
            </p>
          </div>

          {/* How it works */}
          <div style={{ maxWidth: 960, margin: "0 auto var(--space-14)" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h3)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                textAlign: "center",
                marginBottom: "var(--space-8)",
              }}
            >
              {t("howItWorks")}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "var(--space-5)",
              }}
            >
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="card"
                  style={{ padding: "var(--space-7)", textAlign: "center" }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "999px",
                      background: "var(--success-50)",
                      color: "var(--success-700)",
                      display: "grid",
                      placeItems: "center",
                      margin: "0 auto var(--space-4)",
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-h4)",
                      fontWeight: 500,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-h5)",
                      fontWeight: 500,
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    {step.title}
                  </div>
                  <p
                    className="body-md"
                    style={{ color: "var(--text-secondary)", margin: 0 }}
                  >
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison */}
          <div style={{ maxWidth: 760, margin: "0 auto var(--space-14)" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h3)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                textAlign: "center",
                marginBottom: "var(--space-8)",
              }}
            >
              {t("compareTitle")}
            </h2>
            <div
              className="card"
              style={{ padding: 0, overflow: "hidden" }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "var(--surface-2)" }}>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "var(--space-4) var(--space-5)",
                        fontSize: "var(--text-body-sm)",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      {t("platform")}
                    </th>
                    <th
                      style={{
                        padding: "var(--space-4) var(--space-5)",
                        fontSize: "var(--text-body-sm)",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      {t("sellerFee")}
                    </th>
                    <th
                      style={{
                        padding: "var(--space-4) var(--space-5)",
                        fontSize: "var(--text-body-sm)",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      {t("buyerFee")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compare.map((row) => (
                    <tr
                      key={row.name}
                      style={{
                        background: row.highlight ? "var(--success-50)" : "transparent",
                        borderTop: "1px solid var(--border-subtle)",
                      }}
                    >
                      <td
                        style={{
                          textAlign: "left",
                          padding: "var(--space-4) var(--space-5)",
                          fontWeight: row.highlight ? 600 : 500,
                          color: "var(--text-primary)",
                        }}
                      >
                        {row.name}
                      </td>
                      <td
                        style={{
                          padding: "var(--space-4) var(--space-5)",
                          textAlign: "center",
                          fontWeight: 500,
                          color: row.highlight
                            ? "var(--success-700)"
                            : "var(--text-secondary)",
                        }}
                      >
                        {row.seller}
                      </td>
                      <td
                        style={{
                          padding: "var(--space-4) var(--space-5)",
                          textAlign: "center",
                          fontWeight: 500,
                          color: row.highlight
                            ? "var(--success-700)"
                            : "var(--text-secondary)",
                        }}
                      >
                        {row.buyer}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h3)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                textAlign: "center",
                marginBottom: "var(--space-8)",
              }}
            >
              {t("faqTitle")}
            </h2>
            <div style={{ display: "grid", gap: "var(--space-6)" }}>
              {faqs.map((faq, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "var(--text-h5)",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    {faq.q}
                  </div>
                  <p
                    className="body-md"
                    style={{ color: "var(--text-secondary)", margin: 0 }}
                  >
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer14 />
    </div>
  );
}
