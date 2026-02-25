"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import DashboardNavigation from "../header/DashboardNavigation";
import ExtraService from "./ExtraService";
import ServiceGallery from "./ServiceGallery";
import ServicePackage from "./ServicePackage";
import useConvexProfile from "@/hook/useConvexProfile";

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AddServiceInfo() {
  const router = useRouter();
  const { convexUser, profile } = useConvexProfile();

  const createGig = useMutation(api.marketplace.gigs.create);
  const createPackage = useMutation(api.marketplace.gigs.createPackage);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("select");
  const [tags, setTags] = useState("");
  const [locationCountry, setLocationCountry] = useState("usa");
  const [locationCity, setLocationCity] = useState("new-york");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveAndPublish = async () => {
    if (!profile?._id || !convexUser) {
      setSaveError("You must be signed in with a freelancer profile to add a service.");
      return;
    }
    if (!title.trim()) {
      setSaveError("Please enter a service title.");
      return;
    }
    if (!description.trim()) {
      setSaveError("Please enter a service description.");
      return;
    }

    setSaving(true);
    setSaveError(null);

    try {
      const slug = slugify(title) + "-" + Date.now();

      // Create the gig
      const gigId = await createGig({
        tenantId: convexUser.tenantId,
        freelancerId: profile._id,
        title: title.trim(),
        slug,
        description: description.trim(),
        tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : undefined,
        locationCountry: locationCountry !== "select" ? locationCountry : undefined,
        locationCity: locationCity !== "select" ? locationCity : undefined,
        locale: "en",
      });

      // Create a basic package if a price was entered
      if (price && !isNaN(Number(price))) {
        await createPackage({
          gigId,
          tier: "basic",
          title: "Basic Package",
          description: description.trim(),
          price: Number(price),
          currency: "EUR",
          deliveryDays: 3,
          revisionCount: 1,
        });
      }

      setSaveSuccess(true);
      setTimeout(() => {
        router.push("/dashboard-manage-service");
      }, 1500);
    } catch (error) {
      console.error("Failed to create gig:", error);
      setSaveError(error.message || "Failed to save service. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>Add Services</h2>
              <p className="text">Lorem ipsum dolor sit amet, consectetur.</p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="text-lg-end">
              <button
                className="ud-btn btn-dark"
                onClick={handleSaveAndPublish}
                disabled={saving || !profile}
              >
                {saving ? "Saving..." : "Save & Publish"}
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>

        {saveError && (
          <div className="row mb20">
            <div className="col-xl-12">
              <div className="alert alert-danger" role="alert">
                {saveError}
              </div>
            </div>
          </div>
        )}

        {saveSuccess && (
          <div className="row mb20">
            <div className="col-xl-12">
              <div className="alert alert-success" role="alert">
                Service created successfully! Redirecting...
              </div>
            </div>
          </div>
        )}

        {!profile && (
          <div className="row mb20">
            <div className="col-xl-12">
              <div className="alert alert-info" role="alert">
                No freelancer profile found. Please set your account type to freelancer first.
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-xl-12">
            {/* Inline basic information form wired to Convex state */}
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="bdrb1 pb15 mb25">
                <h5 className="list-title">Basic Information</h5>
              </div>
              <div className="col-xl-8">
                <div className="form-style1">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Service Title
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. I will design your website"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Price (EUR)
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="e.g. 50"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Category
                        </label>
                        <select
                          className="form-control"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="select">Select</option>
                          <option value="graphics-design">Graphics &amp; Design</option>
                          <option value="digital-marketing">Digital Marketing</option>
                          <option value="writing-translation">Writing &amp; Translation</option>
                          <option value="video-animation">Video &amp; Animation</option>
                          <option value="music-audio">Music &amp; Audio</option>
                          <option value="programming-tech">Programming &amp; Tech</option>
                          <option value="business">Business</option>
                          <option value="lifestyle">Lifestyle</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Tags (comma separated)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. web, design, react"
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Country
                        </label>
                        <select
                          className="form-control"
                          value={locationCountry}
                          onChange={(e) => setLocationCountry(e.target.value)}
                        >
                          <option value="usa">United States</option>
                          <option value="canada">Canada</option>
                          <option value="uk">United Kingdom</option>
                          <option value="australia">Australia</option>
                          <option value="germany">Germany</option>
                          <option value="netherlands">Netherlands</option>
                          <option value="belgium">Belgium</option>
                          <option value="japan">Japan</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          City
                        </label>
                        <select
                          className="form-control"
                          value={locationCity}
                          onChange={(e) => setLocationCity(e.target.value)}
                        >
                          <option value="new-york">New York</option>
                          <option value="toronto">Toronto</option>
                          <option value="london">London</option>
                          <option value="sydney">Sydney</option>
                          <option value="berlin">Berlin</option>
                          <option value="amsterdam">Amsterdam</option>
                          <option value="brussels">Brussels</option>
                          <option value="tokyo">Tokyo</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb10">
                        <label className="heading-color ff-heading fw500 mb10">
                          Services Detail
                        </label>
                        <textarea
                          cols={30}
                          rows={6}
                          placeholder="Describe your service in detail"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ServicePackage />
            <ExtraService />
            <ServiceGallery />
          </div>
        </div>
      </div>
    </>
  );
}
