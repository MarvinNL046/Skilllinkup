"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function InspiringWork() {
  const t = useTranslations("home20");
  const locale = useLocale();

  return (
    <section className="pb90 pb20-md pt-0">
      <div className="container">
        <div className="row align-items-center wow fadeInUp" data-wow-delay="00ms">
          <div className="col-md-6">
            <div className="find-work bgc-light-yellow pb50 pt60 px20 bdrs24 text-center mb30">
              <Image
                width={270}
                height={176}
                style={{ height: "fit-content" }}
                className="mb30"
                src="/images/about/home20-vector-1.png"
                alt=""
              />
              <h2 className="title mb30">{t("inspiringWork.freelancerTitle")}</h2>
              <p className="text mb30">{t("inspiringWork.freelancerText")}</p>
              <Link className="ud-btn btn-dark bdrs60" href={`/${locale}/marketplace/gigs`}>
                {t("inspiringWork.freelancerCta")} <i className="fal fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="find-work bgc-thm4 pb50 pt60 px20 bdrs24 text-center mb30">
              <Image
                width={270}
                height={180}
                className="mb30"
                src="/images/about/home20-vector-2.png"
                alt=""
              />
              <h2 className="title mb30">{t("inspiringWork.clientTitle")}</h2>
              <p className="text mb30">{t("inspiringWork.clientText")}</p>
              <Link className="ud-btn btn-dark bdrs60" href={`/${locale}/freelancers`}>
                {t("inspiringWork.clientCta")} <i className="fal fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
