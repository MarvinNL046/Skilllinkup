"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function FreelancerNotFound() {
  const t = useTranslations("errorPages");

  return (
    <section className="our-error bgc-thm3">
      <div className="container">
        <div className="row align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
          <div className="col-lg-6 col-xl-5">
            <div className="error_page_content text-center">
              <div className="mb30" style={{ fontSize: 64 }}>
                👤
              </div>
              <h2 className="title">{t("freelancerNotFound")}</h2>
              <p className="text mb25">
                {t("freelancerNotFoundDescription")}
              </p>
              <Link href="/online/freelancers" className="ud-btn btn-thm">
                {t("browseFreelancers")}
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
