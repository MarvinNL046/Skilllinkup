import Image from "next/image";
import { getTranslations } from "next-intl/server";
import EmptyState from "@/components/ui/EmptyState";

export async function generateMetadata() {
  const t = await getTranslations("jobsHub");
  return {
    title: t("companiesTitle"),
    description: t("companiesDescription"),
  };
}

export default async function CompaniesPage() {
  const t = await getTranslations("jobsHub");
  return (
    <>
      <section className="breadcumb-section pt-0">
        <div className="cta-job-v1 cta-banner mx-auto maxw1700 pt120 pb120 bdrs16 position-relative overflow-hidden d-flex align-items-center mx20-lg px30-lg">
          <Image
            height={226}
            width={198}
            className="left-top-img wow zoomIn"
            src="/images/vector-img/left-top.png"
            alt="left-top"
          />
          <Image
            height={181}
            width={255}
            className="right-bottom-img wow zoomIn"
            src="/images/vector-img/right-bottom.png"
            alt="right-bottom"
          />
          <div className="container">
            <div className="row wow fadeInUp">
              <div className="col-xl-7">
                <div className="position-relative">
                  <h2>{t("companiesHeading")}</h2>
                  <p className="text">
                    {t("companiesText")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt30 pb90">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 mx-auto">
              <EmptyState
                icon="🏢"
                title={t("companiesComingSoon")}
                description={t("companiesComingSoonText")}
                actionLabel={t("browseJobs")}
                actionHref="/jobs/browse"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
