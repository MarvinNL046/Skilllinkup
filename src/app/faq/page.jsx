import Footer14 from "@/components/footer/Footer14";
import Header20 from "@/components/header/Header20";
import FaqPayment from "@/components/section/FaqPayment";
import FaqSuggestion from "@/components/section/FaqSuggestion";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations("faq");
    return {
        title: t("title"),
        description: t("metaDescription"),
        openGraph: {
            title: t("title"),
            description: t("metaDescription"),
            url: "https://skilllinkup.com/faq",
        },
    };
}

export default async function page() {
    const t = await getTranslations("faq");
    return (
        <>
            <Header20 />
            <section className="our-faq pb50">
                <div className="container">
                    <div className="row">
                        <div
                            className="col-lg-6 m-auto wow fadeInUp"
                            data-wow-delay="300ms"
                        >
                            <div className="main-title text-center">
                                <h2 className="title">
                                    {t("title")}
                                </h2>
                                <p className="paragraph mt10">
                                    {t("subtitle")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row wow fadeInUp" data-wow-delay="300ms">
                        <div className="col-lg-8 mx-auto">
                            <FaqPayment />
                            <FaqSuggestion />
                        </div>
                    </div>
                </div>
            </section>
            <Footer14 />
        </>
    );
}
