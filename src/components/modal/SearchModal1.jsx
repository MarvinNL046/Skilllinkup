"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchModal1() {
  const [value, setValue] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/online/services?q=${encodeURIComponent(value.trim())}`);
    }
  }

  return (
    <div className="search-modal">
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel" />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fal fa-xmark" />
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="popup-search-field search_area">
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="What service are you looking for today?"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <label>
                  <span className="far fa-magnifying-glass" />
                </label>
                <button className="ud-btn btn-thm" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
