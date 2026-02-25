"use client";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

interface BreadcrumbProps {
  title: string;
  brief?: string;
  isBtnActive?: boolean;
}

export default function Breadcrumb({ title, brief, isBtnActive }: BreadcrumbProps) {
  const locale = useLocale();

  return (
    <section className="breadcumb-section wow fadeInUp mt40">
      <div className="cta-commmon-v1 cta-banner bgc-thm2 mx-auto maxw1700 pt120 pb120 bdrs16 position-relative overflow-hidden d-flex align-items-center mx20-lg">
        <Image
          height={226}
          width={198}
          className="left-top-img wow zoomIn"
          src="/images/vector-img/left-top.png"
          alt=""
        />
        <Image
          height={181}
          width={255}
          className="right-bottom-img wow zoomIn"
          src="/images/vector-img/right-bottom.png"
          alt=""
        />
        <div className="container">
          <div className="row">
            <div className="col-xl-5">
              <div className="position-relative wow fadeInUp" data-wow-delay="300ms">
                <h2 className="text-white">{title}</h2>
                {brief && <p className="text mb30 text-white">{brief}</p>}
                {isBtnActive && (
                  <Link className="ud-btn btn-thm" href={`/${locale}/contact`}>
                    Become Seller
                    <i className="fal fa-arrow-right-long" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
