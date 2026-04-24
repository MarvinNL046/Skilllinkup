import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import FaqPayment from "@/components/section/FaqPayment";
import FaqSuggestion from "@/components/section/FaqSuggestion";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("faq");
  return {
    title: t("title"),
    description: t("metaDescription"),
    openGraph: {
      title: t("title"),
      description: t("metaDescription"),
      url: "https://skilllinkup.com/faq",
    },
  };
}

export default async function FaqPage() {
  const t = await getTranslations("faq");
  return (
    <div style={{ background: "var(--bg)" }}>
      <Header20 />
      <section style={{ padding: "var(--space-16) 0 var(--space-14)" }}>
        <div className="container">
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto var(--space-10)",
              textAlign: "center",
            }}
          >
            <span className="overline" style={{ color: "var(--primary-600)" }}>
              FAQ
            </span>
            <h1
              className="display-lg"
              style={{
                fontWeight: 500,
                margin: "var(--space-2) 0 var(--space-3)",
              }}
            >
              {t("title")}
            </h1>
            <p
              className="body-lg"
              style={{ color: "var(--text-secondary)", margin: 0 }}
            >
              {t("subtitle")}
            </p>
          </div>

          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <FaqPayment />
            <FaqSuggestion />
          </div>
        </div>
      </section>
      <Footer14 />
    </div>
  );
}
