export default function FaqPayment() {
  return (
    <>
      <div className="ui-content">
        <h4 className="title">Payments</h4>
        <div className="accordion-style1 faq-page mb90">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item active">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  What methods of payment are supported?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div className="accordion-body">
                  SkillLinkup supports payments through Stripe, which accepts
                  all major credit and debit cards (Visa, Mastercard, American
                  Express), as well as Apple Pay, Google Pay, and iDEAL for
                  Dutch users. All payments are processed securely through
                  Stripe Connect.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  How does SkillLinkup protect my payment?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div className="accordion-body">
                  We use an escrow system — your payment is held securely until
                  the work is delivered and approved. If a dispute arises, our
                  resolution process ensures both parties are treated fairly.
                  Funds are only released to the freelancer once you confirm
                  satisfaction.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  What are the fees for using SkillLinkup?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-parent="#accordionExample"
              >
                <div className="accordion-body">
                  SkillLinkup charges a transparent 3.5% fee from both the
                  buyer and the seller per transaction — that&apos;s it. No hidden
                  fees, no monthly subscriptions, no upsells. You can see the
                  full breakdown on our pricing page.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  When do freelancers get paid?
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Once the client approves the delivered work, the funds are
                  released to the freelancer&apos;s Stripe Connect account. From
                  there, payouts to your bank account typically arrive within
                  2-7 business days depending on your country and bank.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingFive">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFive"
                  aria-expanded="false"
                  aria-controls="collapseFive"
                >
                  Can I get a refund?
                </button>
              </h2>
              <div
                id="collapseFive"
                className="accordion-collapse collapse"
                aria-labelledby="headingFive"
                data-parent="#accordionExample"
              >
                <div className="accordion-body">
                  If the work hasn&apos;t started yet, you can cancel the order for
                  a full refund. If work is in progress or delivered, you can
                  open a dispute through our resolution center. Refunds are
                  handled case-by-case based on our terms of service.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
