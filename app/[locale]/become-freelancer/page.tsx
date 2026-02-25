import type { Metadata } from "next";
import FreelancerOnboarding from "@/components/onboarding/FreelancerOnboarding";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Become a Freelancer | SkillLinkup",
  description:
    "Start your freelance career on SkillLinkup. Create your profile, showcase your skills, and connect with clients looking for talent like yours.",
  openGraph: {
    title: "Become a Freelancer | SkillLinkup",
    description:
      "Start your freelance career on SkillLinkup. Create your profile, showcase your skills, and connect with clients looking for talent like yours.",
  },
};

export default async function BecomeFreelancerPage() {
  const t = await getTranslations("onboarding");
  return (
    <div className="bgc-thm4">
      <section className="our-register">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="main-title text-center">
                <h2 className="title">{t("freelancerTitle")}</h2>
                <p className="paragraph">
                  {t("freelancerSubtitle")}
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
