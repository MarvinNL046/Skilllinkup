"use client";

import { useState } from "react";
import ImageUpload from "@/components/forms/ImageUpload";
import { useOnboardingStore } from "@/store/onboardingStore";

export default function FreelancerPortfolio() {
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
        label="Portfolio image"
        value={image}
        onChange={(value) => setImage(value)}
        helperText="Upload a project screenshot or cover image."
      />
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">Project title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          placeholder="e.g. Fintech dashboard redesign"
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className="form-style1 mb20">
        <label className="heading-color ff-heading fw500 mb10">Project link (optional)</label>
        <input
          type="text"
          className="form-control"
          value={link}
          placeholder="https://"
          onChange={(event) => setLink(event.target.value)}
        />
      </div>
      <button type="button" className="ud-btn btn-thm mb30" onClick={handleAdd}>
        Add portfolio item
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
                      <a className="text-thm fz14" href={item.link} target="_blank" rel="noreferrer">
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
