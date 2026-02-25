"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function FinalCta() {
  const t = useTranslations("home20");
  const locale = useLocale();

  return (
    <section className="home11-cta-3 at-home20 bdrs24 maxw1700 mx-auto">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-md-6 col-lg-8 wow fadeInRight">
            <div className="cta-style3">
              <h2 className="cta-title text-white">
                {t("finalCta.title")}
                <br className="d-none d-xl-block" />
                {t("finalCta.titleHighlight")}
              </h2>
              <p className="cta-text text-white">{t("finalCta.subtitle")}</p>
              <Link href={`/${locale}/marketplace/gigs`} className="ud-btn btn-white bdrs16 mr20">
                {t("finalCta.primaryCta")} <i className="fal fa-arrow-right-long"></i>
              </Link>
              <Link href={`/${locale}/freelancers`} className="ud-btn btn-transparent2 bdrs16">
                {t("finalCta.secondaryCta")} <i className="fal fa-arrow-right-long"></i>
              </Link>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 wow fadeIn">
            <Image
              width={433}
              height={550}
              style={{ height: "fit-content" }}
              className="home11-ctaimg-v3 at-home15 d-none d-md-block"
              src="/images/about/about-16.png"
              alt=""
            />
            <Image
              width={270}
              height={300}
              style={{ height: "fit-content" }}
              className="home15-ctaimg-v2 at-home20 d-none d-md-block"
              src="/images/about/element-12.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
