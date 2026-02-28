import Image from "next/image";
import React from "react";

export default function Breadcumb18() {
  return (
    <section  className="breadcumb-section pt-0">
      <div  className="cta-service-v6 cta-banner mx-auto maxw1700 pt120 pb120 bdrs16 position-relative overflow-hidden d-flex align-items-center mx20-lg px30-lg">
        <Image
          width={198}
          height={226}
          style={{ height: "fit-content" }}
           className="left-top-img wow zoomIn"
          src="/images/vector-img/left-top.png"
          alt=" image "
        />
        <Image
          width={255}
          height={181}
          style={{ height: "fit-content" }}
           className="right-bottom-img wow zoomIn"
          src="/images/vector-img/right-bottom.png"
          alt=" image "
        />
        <div  className="container">
          <div  className="row wow fadeInUp">
            <div  className="col-xl-7">
              <div  className="position-relative">
                <h2  className="text-white">Projects List</h2>
                <p  className="text text-white">
                  Find projects that match your skills and start collaborating.
                </p>
                <div  className="advance-search-tab at-home6 bgc-white bdrs12 p10 position-relative border-0">
                  <div  className="row">
                    <div  className="col-md-9 col-lg-8 col-xl-9">
                      <div  className="advance-search-field mb10-sm">
                        <form  className="form-search position-relative">
                          <div  className="box-search">
                            <span  className="icon far fa-magnifying-glass"></span>
                            <input
                               className="form-control"
                              type="text"
                              name="search"
                              placeholder="Keyword or freelancer name"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                    <div  className="col-md-3 col-lg-4 col-xl-3">
                      <div  className="text-center">
                        <button
                           className="ud-btn btn-thm bdrs12 w-100 border-0"
                          type="button"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
