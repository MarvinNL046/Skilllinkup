import ClientOnboarding from "@/components/onboarding/ClientOnboarding";
import { getTranslations } from "next-intl/server";

export default async function BecomeClientPage() {
  const t = await getTranslations("onboarding");
  return (
    <div className="bgc-thm4">
      <section className="our-register">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="main-title text-center">
                <h2 className="title">{t("clientTitle")}</h2>
                <p className="paragraph">
                  {t("clientSubtitle")}
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
