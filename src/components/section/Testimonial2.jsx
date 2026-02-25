"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Testimonial2() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Let Bootstrap JS handle tab behavior on the client
    if (typeof window !== "undefined" && window.bootstrap) {
      const tabEls = containerRef.current?.querySelectorAll('[data-bs-toggle="pill"]');
      tabEls?.forEach((el) => new window.bootstrap.Tab(el));
    }
  }, []);

  return (
    <>
      <section className="our-testimonial">
        <div className="container wow fadeInUp" data-wow-delay="300ms">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="main-title text-center">
                <h2 className="title">What our students have to say</h2>
                <p className="paragraph mt10">
                  Discover your perfect program in our courses.
                </p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-10 mx-auto" ref={containerRef}>
              <div className="home2_testimonial_tabs position-relative">
                <div className="tab-content" id="pills-tabContent2">
                  <div
                    className="tab-pane fade"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div className="testimonial-style2 at-about2 text-center">
                      <div className="testi-content text-center">
                        <span className="icon fas fa-quote-left" />
                        <h4 className="testi-text">
                          &quot;Our family was traveling via bullet train between
                          cities in Japan with our luggage - the location for
                          this hotel made that so easy. Agoda price was
                          fantastic. &quot;
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade show active"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    <div className="testimonial-style2 at-about2 text-center">
                      <div className="testi-content text-center">
                        <span className="icon fas fa-quote-left" />
                        <h4 className="testi-text">
                          &quot;Our family was traveling via bullet train between
                          cities in Japan with our luggage - the location for
                          this hotel made that so easy. Agoda price was
                          fantastic. &quot;
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="pills-contact"
                    role="tabpanel"
                    aria-labelledby="pills-contact-tab"
                  >
                    <div className="testimonial-style2 at-about2 text-center">
                      <div className="testi-content text-center">
                        <span className="icon fas fa-quote-left" />
                        <h4 className="testi-text">
                          &quot;Our family was traveling via bullet train between
                          cities in Japan with our luggage - the location for
                          this hotel made that so easy. Agoda price was
                          fantastic. &quot;
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <ul
                  className="nav justify-content-center"
                  id="pills-tab2"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="pills-home-tab"
                      data-bs-toggle="pill"
                      href="#pills-home"
                      role="tab"
                      aria-selected="false"
                      tabIndex="-1"
                    >
                      <div className="thumb d-flex align-items-center">
                        <Image
                          height={70}
                          width={70}
                          className="rounded-circle h-100"
                          src="/images/testimonials/1.jpg"
                          alt="1.jpg"
                        />
                        <h6 className="title ml30 ml15-xl mb-0">
                          Albert Cole
                          <br />
                          <small>Designer</small>
                        </h6>
                      </div>
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link active"
                      id="pills-profile-tab"
                      data-bs-toggle="pill"
                      href="#pills-profile"
                      role="tab"
                      aria-selected="true"
                    >
                      <div className="thumb d-flex align-items-center">
                        <Image
                          height={70}
                          width={70}
                          className="rounded-circle h-100"
                          src="/images/testimonials/2.jpg"
                          alt="2.jpg"
                        />
                        <h6 className="title ml30 ml15-xl mb-0">
                          Alison Dawn
                          <br />
                          <small>WP Developer</small>
                        </h6>
                      </div>
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="pills-contact-tab"
                      data-bs-toggle="pill"
                      href="#pills-contact"
                      role="tab"
                      aria-selected="false"
                      tabIndex="-1"
                    >
                      <div className="thumb d-flex align-items-center">
                        <Image
                          height={70}
                          width={70}
                          className="rounded-circle h-100"
                          src="/images/testimonials/3.jpg"
                          alt="3.jpg"
                        />
                        <h6 className="title ml30 ml15-xl mb-0">
                          Daniel Parker
                          <br />
                          <small>Front-end Developer</small>
                        </h6>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
