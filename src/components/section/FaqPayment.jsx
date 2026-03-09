import { getTranslations } from "next-intl/server";

export default async function FaqPayment() {
  const t = await getTranslations("faq");

  const faqs = [
    { id: "One", q: t("pay1Q"), a: t("pay1A"), open: true },
    { id: "Two", q: t("pay2Q"), a: t("pay2A") },
    { id: "Three", q: t("pay3Q"), a: t("pay3A") },
    { id: "Four", q: t("pay4Q"), a: t("pay4A") },
    { id: "Five", q: t("pay5Q"), a: t("pay5A") },
  ];

  return (
    <>
      <div className="ui-content">
        <h4 className="title">{t("paymentsTitle")}</h4>
        <div className="accordion-style1 faq-page mb90">
          <div className="accordion" id="accordionExample">
            {faqs.map((faq) => (
              <div key={faq.id} className={`accordion-item${faq.open ? " active" : ""}`}>
                <h2 className="accordion-header" id={`heading${faq.id}`}>
                  <button
                    className={`accordion-button${!faq.open ? " collapsed" : ""}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${faq.id}`}
                    aria-expanded={faq.open ? "true" : "false"}
                    aria-controls={`collapse${faq.id}`}
                  >
                    {faq.q}
                  </button>
                </h2>
                <div
                  id={`collapse${faq.id}`}
                  className={`accordion-collapse collapse${faq.open ? " show" : ""}`}
                  aria-labelledby={`heading${faq.id}`}
                  data-parent="#accordionExample"
                >
                  <div className="accordion-body">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
