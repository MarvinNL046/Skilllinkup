"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import listingStore from "@/store/listingStore";

export default function Breadcumb12() {
  const t = useTranslations("jobsHub");
  const getSearch = listingStore((state) => state.getSearch);
  const setSearch = listingStore((state) => state.setSearch);
  const setCategory = listingStore((state) => state.setCategory);
  const getCategory = listingStore((state) => state.getCategory);

  const categories = [
    "Graphics & Design",
    "Digital Marketing",
    "Writing & Translation",
    "Video & Animation",
    "Music & Audio",
    "Programming & Tech",
  ];

  return (
    <>
      <section className="breadcumb-section pt-0">
        <div className="cta-job-v1 cta-banner mx-auto maxw1700 pt120 pb120 bdrs16 relative overflow-hidden flex items-center mx20-lg px30-lg">
          <Image
            height={226}
            width={198}
            className="left-top-img wow zoomIn"
            src="/images/vector-img/left-top.png"
            alt="left-top"
          />
          <Image
            height={181}
            width={255}
            className="right-bottom-img wow zoomIn"
            src="/images/vector-img/right-bottom.png"
            alt="right-bottom"
          />
          <div className="container">
            <div className="row wow fadeInUp">
              <div className="col-xl-7">
                <div className="relative">
                  <h2>{t("jobList")}</h2>
                  <p className="text">
                    {t("jobListText")}
                  </p>
                </div>
                <div className="advance-search-tab bgc-white p10 bdrs4 mt30">
                  <div className="row">
                    <div className="col-md-5 col-lg-6 col-xl-6">
                      <div className="advance-search-field bdrr1 bdrn-sm">
                        <form
                          className="form-search relative"
                          onSubmit={(e) => e.preventDefault()}
                        >
                          <div className="box-search">
                            <span className="icon far fa-magnifying-glass" />
                            <input
                              className="form-control"
                              type="text"
                              name="search"
                              placeholder={t("searchPlaceholder")}
                              value={getSearch}
                              onChange={(e) => setSearch(e.target.value)}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-md-4 col-lg-4 col-xl-3">
                      <div className="bselect-style1">
                        <select
                          className="form-select"
                          value={getCategory[0] || ""}
                          onChange={(e) => {
                            listingStore.getState().getCategory.forEach(() => setCategory(""));
                            if (e.target.value) setCategory(e.target.value);
                          }}
                        >
                          <option value="">{t("allCategories")}</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-3">
                      <div className="text-center text-xl-start">
                        <button
                          type="button"
                          className="ud-btn btn-thm2 w-full vam"
                          onClick={() => {
                            const el = document.querySelector(".pt30");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          {t("search")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
