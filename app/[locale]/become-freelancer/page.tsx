import FreelancerOnboarding from "@/components/onboarding/FreelancerOnboarding";

export default function BecomeFreelancerPage() {
  return (
    <div className="bgc-thm4">
      <section className="our-register">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="main-title text-center">
                <h2 className="title">Become a Freelancer</h2>
                <p className="paragraph">
                  Set up your profile to start attracting new clients.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-8 mx-auto">
              <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                <FreelancerOnboarding />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
