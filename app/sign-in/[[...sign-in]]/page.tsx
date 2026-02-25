import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="bgc-thm4 min-vh-100">
      <section className="our-login">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="main-title text-center">
                <h2 className="title">Log In</h2>
                <p className="paragraph">
                  Give your visitor a smooth online experience with a solid UX design
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6 mx-auto">
              <div className="log-reg-form search-modal form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12">
                <div className="mb30">
                  <h4>We're glad to see you again!</h4>
                  <p className="text">
                    Don't have an account?{" "}
                    <Link href="/sign-up" className="text-thm">
                      Sign Up!
                    </Link>
                  </p>
                </div>
                <SignIn
                  appearance={{
                    elements: {
                      rootBox: "w-100",
                      card: "shadow-none border-0 w-100",
                      formFieldInput: "form-control",
                      formButtonPrimary: "ud-btn btn-thm w-100",
                      formFieldLabel: "form-label fw600 dark-color",
                      footer: "d-none",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
