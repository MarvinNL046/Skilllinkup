import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="bgc-thm4 min-vh-100">
      <section className="our-register">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="main-title text-center">
                <h2 className="title">Register</h2>
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
                  <h4>Let's create your account!</h4>
                  <p className="text mt20">
                    Already have an account?{" "}
                    <Link href="/sign-in" className="text-thm">
                      Log In!
                    </Link>
                  </p>
                </div>
                <SignUp
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
