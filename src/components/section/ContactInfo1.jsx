export default function ContactInfo1() {
  return (
    <>
      <section className="pt-0">
        <div className="container">
          <div className="row wow fadeInUp" data-wow-delay="300ms">
            <div className="col-lg-6">
              <div className="position-relative mt40">
                <div className="main-title">
                  <h4 className="form-title mb25">Get In Touch</h4>
                  <p className="text">
                    Have a question about SkillLinkup? We&apos;re here to help
                    freelancers and clients get the most out of the platform.
                  </p>
                </div>
                <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                  <div className="icon flex-shrink-0">
                    <span className="flaticon-mail" />
                  </div>
                  <div className="details">
                    <h5 className="title">Email</h5>
                    <p className="mb-0 text">info@skilllinkup.com</p>
                  </div>
                </div>
                <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                  <div className="icon flex-shrink-0">
                    <span className="flaticon-clock" />
                  </div>
                  <div className="details">
                    <h5 className="title">Response Time</h5>
                    <p className="mb-0 text">
                      We typically respond within 24 hours <br /> on business
                      days.
                    </p>
                  </div>
                </div>
                <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                  <div className="icon flex-shrink-0">
                    <span className="flaticon-tracking" />
                  </div>
                  <div className="details">
                    <h5 className="title">Location</h5>
                    <p className="mb-0 text">
                      The Netherlands <br /> Serving freelancers worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-page-form default-box-shadow1 bdrs8 bdr1 p50 mb30-md bgc-white">
                <h4 className="form-title mb25">Send Us a Message</h4>
                <p className="text mb30">
                  Whether you have a question, feedback, or a partnership
                  inquiry, we&apos;d love to hear from you.
                </p>
                <form className="form-style1">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Subject
                        </label>
                        <select className="form-control form-select">
                          <option value="">Select a topic</option>
                          <option value="general">General Question</option>
                          <option value="account">Account & Login</option>
                          <option value="freelancer">Freelancer Support</option>
                          <option value="client">Client Support</option>
                          <option value="payment">Payments & Billing</option>
                          <option value="partnership">Partnership Inquiry</option>
                          <option value="bug">Report a Bug</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Message
                        </label>
                        <textarea
                          cols={30}
                          rows={6}
                          placeholder="How can we help you?"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div>
                        <button type="button" className="ud-btn btn-thm">
                          Send Message
                          <i className="fal fa-arrow-right-long" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
