import ClientOnboarding from "@/components/onboarding/ClientOnboarding";

export default function BecomeClientPage() {
  return (
    <div className="bgc-thm4">
      <section className="our-register">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="main-title text-center">
                <h2 className="title">Become a Client</h2>
                <p className="paragraph">
                  Share your project goals so we can match you with talent.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-8 mx-auto">
              <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                <ClientOnboarding />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
