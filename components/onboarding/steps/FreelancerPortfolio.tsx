"use client";

import { useState } from "react";
import ImageUpload from "@/components/forms/ImageUpload";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useTranslations } from "next-intl";

export default function FreelancerPortfolio() {
  const t = useTranslations("onboarding");
  const portfolioItems = useOnboardingStore((state) => state.portfolioItems);
  const addPortfolioItem = useOnboardingStore((state) => state.addPortfolioItem);
  const removePortfolioItem = useOnboardingStore((state) => state.removePortfolioItem);

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  const handleAdd = () => {
    if (!title || !image) return;
    addPortfolioItem({ title, image, link });
    setTitle("");
    setLink("");
    setImage("");
  };

  return (
    <div>
      <ImageUpload
        label={t("fields.portfolioImage")}
        value={image}
        onChange={(value) => setImage(value)}
        helperText={t("help.portfolioImage")}
      />
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">
          {t("fields.projectTitle")}
        </label>
        <input
          type="text"
          className="form-control"
          value={title}
          placeholder={t("placeholders.projectTitle")}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">
          {t("fields.projectLink")}
        </label>
        <input
          type="text"
          className="form-control"
          value={link}
          placeholder={t("placeholders.projectLink")}
          onChange={(event) => setLink(event.target.value)}
        />
      </div>
      <button type="button" className="ud-btn btn-thm mb30" onClick={handleAdd}>
        {t("buttons.addPortfolioItem")}
      </button>

      {portfolioItems.length > 0 && (
        <div className="row">
          {portfolioItems.map((item, index) => (
            <div className="col-md-6" key={`${item.title}-${index}`}>
              <div className="default-box-shadow1 bdrs12 p20 mb20">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 className="mb5">{item.title}</h6>
                    {item.link && (
                      <a
                        className="text-thm fz14"
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.link}
                      </a>
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Remove"
                    onClick={() => removePortfolioItem(index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
