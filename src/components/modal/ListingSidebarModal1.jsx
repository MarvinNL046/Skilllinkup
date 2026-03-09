"use client";
import { useTranslations } from "next-intl";
import toggleStore from "@/store/toggleStore";
import DeliveryTimeOption1 from "../option/DeliveryTimeOption1";
import BudgetOption1 from "../option/BudgetOption1";
import DesignToolOption1 from "../option/DesignToolOption1";
import LocationOption1 from "../option/LocationOption1";
import SpeakOption1 from "../option/SpeakOption1";
import LevelOption1 from "../option/LevelOption1";
import ClearButton from "../button/ClearButton";

export default function ListingSidebarModal1() {
  const t = useTranslations("filterModals");
  const listingToggle = toggleStore((state) => state.listingToggleHandler);

  return (
    <>
      <div className="lefttside-hidden-bar">
        <div className="hsidebar-header bdrb1">
          <h4 className="list-title">{t("allFilters")}</h4>
          <div onClick={listingToggle} className="sidebar-close-icon">
            <span className="far fa-times" />
          </div>
        </div>
        <div className="hsidebar-content">
          <div className="widget-wrapper">
            <div className="sidebar-accordion">
              <div className="accordion" id="accordionExample2">
                <div className="card mb20 pb10 rounded-0">
                  <div className="card-header" id="headingZero">
                    <h4>
                      <button
                        className="btn btn-link ps-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseZero"
                        aria-expanded="false"
                        aria-controls="collapseZero"
                      >
                        {t("deliveryTime")}
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapseZero"
                    className="collapse show"
                    aria-labelledby="headingZero"
                    data-parent="#accordionExample"
                  >
                    <DeliveryTimeOption1 />
                  </div>
                </div>
                <div className="card mb20 pb0 rounded-0">
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
                        {t("budget")}
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapseOnes"
                    className="collapse"
                    aria-labelledby="headingOnes"
                    data-parent="#accordionExample"
                  >
                    <BudgetOption1 />
                  </div>
                </div>
                <div className="card mb20 pb5 rounded-0">
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
                        {t("designTool")}
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapseTwos"
                    className="collapse"
                    aria-labelledby="headingTwos"
                    data-parent="#accordionExample"
                  >
                    <DesignToolOption1 />
                  </div>
                </div>
                <div className="card mb20 pb5 rounded-0">
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
                        {t("location")}
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapseThrees"
                    className="collapse"
                    aria-labelledby="headingThrees"
                    data-parent="#accordionExample"
                  >
                    <LocationOption1 />
                  </div>
                </div>
                <div className="card mb20 pb5 rounded-0">
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
                        {t("speaks")}
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapseFours"
                    className="collapse"
                    aria-labelledby="headingFours"
                    data-parent="#accordionExample"
                  >
                    <SpeakOption1 />
                  </div>
                </div>
                <div className="card mb20 pb0 rounded-0">
                  <div className="card-header" id="headingFives">
                    <h4>
                      <button
                        className="btn btn-link ps-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFives"
                        aria-expanded="true"
                        aria-controls="collapseFives"
                      >
                        {t("level")}
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapseFives"
                    className="collapse"
                    aria-labelledby="headingFives"
                    data-parent="#accordionExample"
                  >
                    <LevelOption1 />
                  </div>
                </div>
              </div>
              <ClearButton />
            </div>
          </div>
        </div>
      </div>
      <div onClick={listingToggle} className="hiddenbar-body-ovelay" />
    </>
  );
}
