"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const partners = [
  "/images/partners/1.png",
  "/images/partners/2.png",
  "/images/partners/3.png",
  "/images/partners/4.png",
  "/images/partners/5.png",
  "/images/partners/6.png",
];

export default function Partners() {
  const t = useTranslations("home20");

  return (
    <section className="our-partners hover-bgc-color pt80 pb50 maxw1700 mx-auto bdrs30 mb100">
      <div className="container">
        <div className="row wow fadeInUp">
          <div className="col-lg-12">
            <div className="main-title text-center">
              <h6>{t("partners.title")}</h6>
            </div>
          </div>
        </div>
        <div className="row wow fadeInUp" data-wow-delay="300ms">
          {partners.map((item) => (
            <div key={item} className="col-6 col-md-4 col-xl-2">
              <div className="partner_item text-center mb30-lg">
                <Image
                  height={26}
                  width={84}
                  className="wa m-auto w-100 h-100 object-fit-contain"
                  src={item}
                  alt="Partner logo"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
