"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function CtaBanner() {
  const t = useTranslations("home20");
  const features = t.raw("cta.features") as { title: string; text: string; icon: string }[];
  const bullets = t.raw("cta.bullets") as string[];

  return (
    <section className="cta-banner-about2 at-home17 maxw1700 mx-auto position-relative pt60-lg pb60-lg">
      <div className="container">
        <div className="row align-items-center wow fadeInDown" data-wow-delay="400ms">
          <div className="col-lg-7 col-xl-5 offset-xl-1 wow fadeInRight mb60-xs mb100-md">
            <div className="mb30">
              <div className="main-title">
                <h2 className="title">
                  {t("cta.titleLine1")} <br className="d-none d-xl-block" />
                  {t("cta.titleLine2")}
                </h2>
              </div>
            </div>
            <div className="why-chose-list">
              {features.map((item) => (
                <div key={item.title} className="list-one d-flex align-items-start mb30">
                  <span className={`list-icon flex-shrink-0 ${item.icon}`}></span>
                  <div className="list-content flex-grow-1 ml20">
                    <h4 className="mb-1">{item.title}</h4>
                    <p className="text mb-0 fz15">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-5 col-xl-4 wow fadeInLeft">
            <div className="listbox-style1 px30 py-5 bdrs16 bgc-dark position-relative">
              <div className="list-style1">
                <ul className="mb-0">
                  {bullets.map((item) => (
                    <li key={item} className="text-white fw500">
                      <i className="far fa-check dark-color bgc-white"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        width={610}
        height={710}
        style={{ height: "fit-content" }}
        className="home10-cta-img bdrs24"
        src="/images/about/about-19.jpg"
        alt={t("cta.imageAlt")}
      />
    </section>
  );
}
