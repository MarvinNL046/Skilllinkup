import Footer14 from "@/components/footer/Footer14";
import Header19 from "@/components/header/Header19";
import HomepageHero from "@/components/hero/HomepageHero";
import NeedSomething2 from "@/components/section/NeedSomething2";
import CtaBanner18 from "@/components/section/CtaBanner18";

export const metadata = {
  title: "SkillLinkup — Find the Right Talent, Anywhere",
  description: "Online freelancers, local craftsmen, and job vacancies — all in one platform.",
};

export default function page() {
  return (
    <div className="wrapper ovh">
      <Header19 />
      <div className="body_content">
        <HomepageHero />
        <NeedSomething2 />
        <CtaBanner18 />
      </div>
      <Footer14 />
    </div>
  );
}
