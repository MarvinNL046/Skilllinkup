"use client";

import { toast } from "sonner";

export default function PayoutForm() {
  function handleSave(e) {
    e.preventDefault();
    toast.success(
      "Payout details saved! Note: Bank payouts will be available soon. We currently support Stripe payouts."
    );
  }

  return (
    <>
      <form className="form-style1" onSubmit={handleSave}>
        <div className="row">
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
                Bank Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. ING Bank"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
                Bank Account Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. NL91ABNA0417164300"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
                Bank Account Holder Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Your full name"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
                Bank Routing Number
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. INGBNL2A"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
                Bank IBAN
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. NL91ABNA0417164300"
              />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="mb20">
              <label className="heading-color ff-heading fw500 mb-1">
                Swift Code
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. INGBNL2A"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="text-start">
              <button type="submit" className="ud-btn btn-thm">
                Save Detail
                <i className="fal fa-arrow-right-long" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
