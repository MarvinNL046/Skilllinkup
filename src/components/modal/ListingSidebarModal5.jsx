"use client";
import { useTranslations } from "next-intl";
import toggleStore from "@/store/toggleStore";
import CategoryOption1 from "../option/CategoryOption1";
import ClearButton from "../button/ClearButton";
import BudgetOption1 from "../option/BudgetOption1";
import LocationOption1 from "../option/LocationOption1";
import SpeakOption1 from "../option/SpeakOption1";
import LevelOption1 from "../option/LevelOption1";
import AvailableNowOption from "../option/AvailableNowOption";

export default function ListingSidebarModal5() {
  const t = useTranslations("filterModals");
  const listingToggle = toggleStore((state) => state.listingToggleHandler);

  return (
    <>
      <div className="lefttside-hidden-bar">
        <div className="hsidebar-header bdrb1">
          <h4 className="list-title">{t("allFilters")}</h4>
          <div className="sidebar-close-icon" onClick={listingToggle}>
            <span className="far fa-times" />
          </div>
        </div>
        <div className="hsidebar-content">
          <div className="widget-wrapper">
            <div className="sidebar-accordion">
              <div className="accordion" id="accordionExample2">
                <AvailableNowOption />
                <div className="card mb20 pb10">
                  <div className="card-header" id="headingZero">
                    <h4>
                      <button
                        className="btn btn-link ps-0 collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseZero"
                        aria-expanded="false"
                        aria-controls="collapseZero"
                      >
                        {t("skills")}
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapseZero"
                    className="collapse show"
                    aria-labelledby="headingZero"
                    data-parent="#accordionExample"
                  >
                    <CategoryOption1 />
                  </div>
                </div>
                <div className="card mb20 pb0">
                  <div className="card-header" id="headingOnes">
                    <h4>
                      <button
                        className="btn btn-link ps-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOnes"
                        aria-expanded="true"
                        aria-controls="collapseOnes"
                      >
                        {t("price")}
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapseOnes"
                    className="collapse"
                    aria-labelledby="headingOnes"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body card-body px-0 pt-0">
                      <div className="range-slider-style2">
                        <BudgetOption1 />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mb20 pb5">
                  <div className="card-header" id="headingTwos">
                    <h4>
                      <button
                        className="btn btn-link ps-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwos"
                        aria-expanded="true"
                        aria-controls="collapseTwos"
                      >
                        {t("location")}
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapseTwos"
                    className="collapse"
                    aria-labelledby="headingTwos"
                    data-parent="#accordionExample"
                  >
                    <LocationOption1 />
                  </div>
                </div>
                <div className="card mb20 pb5">
                  <div className="card-header" id="headingThrees">
                    <h4>
                      <button
                        className="btn btn-link ps-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThrees"
                        aria-expanded="true"
                        aria-controls="collapseThrees"
                      >
                        {t("language")}
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapseThrees"
                    className="collapse"
                    aria-labelledby="headingThrees"
                    data-parent="#accordionExample"
                  >
                    <SpeakOption1 />
                  </div>
                </div>
                <div className="card mb20 pb5">
                  <div className="card-header" id="headingFours">
                    <h4>
                      <button
                        className="btn btn-link ps-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFours"
                        aria-expanded="true"
                        aria-controls="collapseFours"
                      >
                        {t("level")}
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapseFours"
                    className="collapse"
                    aria-labelledby="headingFours"
                    data-parent="#accordionExample"
                  >
                    <LevelOption1 />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ClearButton />
        </div>
      </div>
      <div onClick={listingToggle} className="hiddenbar-body-ovelay" />
    </>
  );
}
