"use client";
import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div style={{ background: "var(--bg)" }}>
      <Header20 />
      <section
        style={{
          minHeight: "calc(100vh - 240px)",
          padding: "var(--space-16) 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="container" style={{ maxWidth: "var(--container-lg)" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--space-8)",
            }}
          >
            <div className="text-center" style={{ maxWidth: 480 }}>
              <span className="overline" style={{ color: "var(--primary-600)" }}>
                Sign in
              </span>
              <h1
                className="display-lg"
                style={{ margin: "var(--space-3) 0", fontWeight: 500 }}
              >
                Welcome back.
              </h1>
              <p className="body-md" style={{ color: "var(--text-secondary)", margin: 0 }}>
                SkillLinkup is pre-launch. This page is for existing accounts
                only — new sign-ups go via the waitlist.
              </p>
            </div>

            <SignIn
              routing="path"
              path="/login"
              fallbackRedirectUrl="/onboarding"
              signUpUrl="/register"
              appearance={{
                elements: {
                  rootBox: { width: "100%" },
                  card: {
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "var(--radius-xl)",
                    boxShadow: "var(--shadow-3)",
                  },
                  headerTitle: { fontFamily: "var(--font-display)", fontWeight: 500 },
                  formButtonPrimary: {
                    background: "var(--primary-600)",
                    borderRadius: "var(--radius-md)",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                  },
                  formFieldInput: {
                    borderRadius: "var(--radius-md)",
                    borderColor: "var(--border-default)",
                  },
                  socialButtonsBlockButton: {
                    borderRadius: "var(--radius-md)",
                    borderColor: "var(--border-default)",
                  },
                  footerActionLink: { color: "var(--primary-600)" },
                },
                variables: {
                  colorPrimary: "var(--primary-600)",
                  colorText: "var(--text-primary)",
                  colorTextSecondary: "var(--text-secondary)",
                  colorBackground: "var(--bg-elevated)",
                  borderRadius: "var(--radius-md)",
                  fontFamily: "var(--font-sans)",
                },
              }}
            />
          </div>
        </div>
      </section>
      <Footer14 />
    </div>
  );
}
