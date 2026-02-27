import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";

export const metadata = {
  title: "Pricing | SkillLinkup",
  description:
    "SkillLinkup charges just 3.5% for buyers and 3.5% for sellers per transaction. No subscriptions, no hidden fees. Free to join.",
};

export default function PricingPage() {
  return (
    <>
      <Header20 />
      <section className="our-pricing pb90">
        <div className="container">
          {/* Hero */}
          <div className="row">
            <div className="col-lg-8 m-auto text-center mb40">
              <h1 className="title mb15" style={{ fontSize: "2.2rem" }}>
                Simple, transparent pricing
              </h1>
              <p className="paragraph fz17">
                No subscriptions. No monthly fees. Just 3.5% each for buyer and seller.
              </p>
            </div>
          </div>

          {/* Main fee card */}
          <div className="row justify-content-center mb60">
            <div className="col-lg-6 col-md-8">
              <div
                className="text-center p-5 bdrs12"
                style={{
                  background: "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)",
                  border: "2px solid #22c55e",
                }}
              >
                <p className="fz15 fw500 mb10" style={{ color: "#22c55e" }}>
                  Transaction Fee
                </p>
                <h2
                  className="mb5"
                  style={{ fontSize: "4rem", fontWeight: 800 }}
                >
                  3.5% + 3.5%
                </h2>
                <p className="body-color fz15 mb10">buyer fee + seller fee per completed order</p>
                <p className="fz13 mb0" style={{ color: "#22c55e" }}>Payment processing costs included — no extra charges</p>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="row justify-content-center mb60">
            <div className="col-lg-8">
              <h3 className="title text-center mb30" style={{ fontSize: "1.5rem" }}>
                How it works
              </h3>
              <div className="row">
                <div className="col-md-4 text-center mb30">
                  <div
                    className="d-inline-flex align-items-center justify-content-center bdrs50p mb15"
                    style={{
                      width: 64,
                      height: 64,
                      background: "#f0fdf4",
                    }}
                  >
                    <span style={{ fontSize: "1.8rem" }}>1</span>
                  </div>
                  <h5 className="mb10">Sign up free</h5>
                  <p className="body-color fz14">
                    Create your account and profile at no cost. No credit card required.
                  </p>
                </div>
                <div className="col-md-4 text-center mb30">
                  <div
                    className="d-inline-flex align-items-center justify-content-center bdrs50p mb15"
                    style={{
                      width: 64,
                      height: 64,
                      background: "#f0fdf4",
                    }}
                  >
                    <span style={{ fontSize: "1.8rem" }}>2</span>
                  </div>
                  <h5 className="mb10">Work &amp; deliver</h5>
                  <p className="body-color fz14">
                    Find projects, deliver great work, and get paid through our secure
                    escrow system.
                  </p>
                </div>
                <div className="col-md-4 text-center mb30">
                  <div
                    className="d-inline-flex align-items-center justify-content-center bdrs50p mb15"
                    style={{
                      width: 64,
                      height: 64,
                      background: "#f0fdf4",
                    }}
                  >
                    <span style={{ fontSize: "1.8rem" }}>3</span>
                  </div>
                  <h5 className="mb10">Keep 96.5%</h5>
                  <p className="body-color fz14">
                    We only take a 3.5% fee from each side when the order is completed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison */}
          <div className="row justify-content-center mb60">
            <div className="col-lg-8">
              <h3 className="title text-center mb30" style={{ fontSize: "1.5rem" }}>
                Compare our fees
              </h3>
              <div className="table-responsive">
                <table className="table table-bordered text-center">
                  <thead>
                    <tr style={{ background: "#f8f9fa" }}>
                      <th className="text-start py-3 px-4">Platform</th>
                      <th className="py-3 px-4">Seller fee</th>
                      <th className="py-3 px-4">Buyer fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ background: "#f0fdf4" }}>
                      <td className="text-start py-3 px-4 fw500">
                        SkillLinkup
                      </td>
                      <td className="py-3 px-4 fw500" style={{ color: "#22c55e" }}>
                        3.5%
                      </td>
                      <td className="py-3 px-4 fw500" style={{ color: "#22c55e" }}>
                        3.5%
                      </td>
                    </tr>
                    <tr>
                      <td className="text-start py-3 px-4 body-color">Fiverr</td>
                      <td className="py-3 px-4 body-color">20%</td>
                      <td className="py-3 px-4 body-color">5.5%</td>
                    </tr>
                    <tr>
                      <td className="text-start py-3 px-4 body-color">Upwork</td>
                      <td className="py-3 px-4 body-color">10%</td>
                      <td className="py-3 px-4 body-color">5%</td>
                    </tr>
                    <tr>
                      <td className="text-start py-3 px-4 body-color">Freelancer.com</td>
                      <td className="py-3 px-4 body-color">10%</td>
                      <td className="py-3 px-4 body-color">3%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h3 className="title text-center mb30" style={{ fontSize: "1.5rem" }}>
                Frequently asked questions
              </h3>
              <div className="mb20">
                <h6 className="mb10">Is it really free to sign up?</h6>
                <p className="body-color fz14">
                  Yes. Creating an account, setting up your profile, and browsing
                  projects is completely free for both freelancers and clients.
                </p>
              </div>
              <div className="mb20">
                <h6 className="mb10">When do I pay the fee?</h6>
                <p className="body-color fz14">
                  The 3.5% seller fee is automatically deducted from the freelancer&apos;s
                  earnings when the payment is released from escrow. The 3.5% buyer fee
                  is added at checkout.
                </p>
              </div>
              <div className="mb20">
                <h6 className="mb10">Are there any hidden fees?</h6>
                <p className="body-color fz14">
                  No. The 3.5% on each side is the only fee we charge. Payment
                  processing costs (Stripe) are included — we cover those. There are
                  no listing fees, subscription fees, or withdrawal fees.
                </p>
              </div>
              <div className="mb20">
                <h6 className="mb10">How much do buyers pay?</h6>
                <p className="body-color fz14">
                  Buyers pay the listed price plus a small 3.5% service fee. For
                  example, on a €100 order the buyer pays €103.50.
                </p>
              </div>
              <div className="mb20">
                <h6 className="mb10">Why is the fee so low?</h6>
                <p className="body-color fz14">
                  We believe freelancers should keep more of what they earn. As a lean
                  platform, we can offer competitive rates while still providing secure
                  payments and quality support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer14 />
    </>
  );
}
