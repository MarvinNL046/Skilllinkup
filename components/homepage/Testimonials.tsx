"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Testimonials() {
  const t = useTranslations("home20");
  const items = t.raw("testimonials.items") as {
    name: string;
    role: string;
    quote: string;
    image: string;
  }[];

  return (
    <section className="our-testimonial">
      <div className="container wow fadeInUp" data-wow-delay="300ms">
        <div className="row">
          <div className="col-lg-6 m-auto">
            <div className="main-title text-center">
              <h2 className="title">{t("testimonials.title")}</h2>
              <p className="paragraph mt10">{t("testimonials.subtitle")}</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-10 mx-auto">
            <div className="home2_testimonial_tabs position-relative">
              <div className="tab-content" id="pills-tabContent2">
                {items.map((item, index) => (
                  <div
                    key={item.name}
                    className={`tab-pane fade ${index === 1 ? "show active" : ""}`}
                    id={`testimonial-${index}`}
                    aria-labelledby={`testimonial-tab-${index}`}
                  >
                    <div className="testimonial-style2 at-about2 text-center">
                      <div className="testi-content text-center">
                        <span className="icon fas fa-quote-left" />
                        <h4 className="testi-text">"{item.quote}"</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <ul className="nav justify-content-center" id="pills-tab2">
                {items.map((item, index) => (
                  <li key={item.name} className="nav-item">
                    <a
                      className={`nav-link ${index === 1 ? "active" : ""}`}
                      id={`testimonial-tab-${index}`}
                      data-bs-toggle="pill"
                      href={`#testimonial-${index}`}
                    >
                      <div className="thumb d-flex align-items-center">
                        <Image
                          height={70}
                          width={70}
                          className="rounded-circle h-100"
                          src={item.image}
                          alt={item.name}
                        />
                        <h6 className="title ml30 ml15-xl mb-0">
                          {item.name}
                          <br />
                          <small>{item.role}</small>
                        </h6>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
