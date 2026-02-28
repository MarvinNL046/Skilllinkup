import { job1 } from "@/data/job";
import AboutMe1 from "../element/AboutMe1";
import EmployeeDetailSlider1 from "../element/EmployeeDetailSlider1";
import ServiceDetailComment1 from "../element/ServiceDetailComment1";
import ServiceDetailReviewInfo1 from "../element/ServiceDetailReviewInfo1";
import JobCard5 from "../card/JobCard5";

export default function EmplyeeDetail1() {
  return (
    <>
      <section className="pt10 pb90 pb30-md">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-8">
              <div className="service-about">
                <h4 className="mb20">About Company</h4>
                <p className="text mb30">
                  This company uses SkillLinkup to connect with top freelance
                  talent. They focus on delivering high-quality projects by
                  collaborating with skilled professionals across design,
                  development, and digital marketing.
                </p>
                <p className="text mb30">
                  With a strong track record on the platform, they provide
                  clear project briefs, timely feedback, and secure payments
                  through our escrow system. Freelancers consistently rate
                  their experience working with this employer highly.
                </p>
                <h5 className="mb20 mt60">Who are we?</h5>
                <p className="text mb30">
                  A growing team that values quality craftsmanship and
                  professional collaboration. We believe the best work happens
                  when talented people are given clear goals and the freedom
                  to deliver their best.
                </p>
                <h5 className="mb20 mt60">What do we do?</h5>
                <p className="text mb30">
                  We hire freelancers for a range of projects including web
                  development, graphic design, content creation, and digital
                  strategy. Every project is managed through SkillLinkup with
                  milestone-based payments and direct communication.
                </p>
                <EmployeeDetailSlider1 />
                <div className="row">
                  <h4 className="mb25">Projects</h4>
                  {job1.slice(0, 3).map((item,i) => (
                    <div key={ i } className="col-sm-6 col-xl-12">
                      <JobCard5 data={item} />
                    </div>
                  ))}
                </div>

                <ServiceDetailReviewInfo1 />
                <ServiceDetailComment1 />
              </div>
            </div>
            <div className="col-lg-4">
              <AboutMe1 />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
