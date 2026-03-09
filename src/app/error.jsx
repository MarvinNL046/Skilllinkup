"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Error({ error, reset }) {
  const t = useTranslations("errorPages");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="our-error">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-xl-6 text-center">
            <div className="error_page_content">
              <div
                className="mb30"
                style={{ fontSize: "5rem", color: "#ef2b70" }}
              >
                <i className="fal fa-triangle-exclamation" />
              </div>
              <div
                className="erro_code"
                style={{ color: "#1e1541" }}
              >
                {t("oops").replace("!", "")}<span className="text-thm">!</span>
              </div>
              <div className="h2 error_title">{t("somethingWentWrong")}</div>
              <p className="text fz15 mb30">
                {t("errorDescription")}
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <button
                  onClick={reset}
                  className="ud-btn btn-thm"
                >
                  {t("tryAgain")}
                  <i className="fal fa-rotate-right ms-2" />
                </button>
                <Link href="/" className="ud-btn btn-white2">
                  {t("goHome")}
                  <i className="fal fa-house ms-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
