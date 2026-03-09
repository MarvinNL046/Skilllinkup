import { getTranslations } from "next-intl/server";

export default async function FaqSuggestion() {
  const t = await getTranslations("faq");

  const faqs = [
    { id: "Six", q: t("start1Q"), a: t("start1A"), open: true },
    { id: "Seven", q: t("start2Q"), a: t("start2A") },
    { id: "Eight", q: t("start3Q"), a: t("start3A") },
    { id: "Nine", q: t("start4Q"), a: t("start4A") },
    { id: "Ten", q: t("start5Q"), a: t("start5A") },
  ];

  return (
    <>
      <div className="ui-content">
        <h4 className="title">{t("startTitle")}</h4>
        <div className="accordion-style1 faq-page mb-4 mb-lg-5">
          <div className="accordion" id="accordionExample2">
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
                  data-parent="#accordionExample2"
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
