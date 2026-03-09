"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function ContactInfo1() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const t = useTranslations("contact");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !subject || !message.trim()) {
      toast.error(t("fillAllFields"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error(t("invalidEmail"));
      return;
    }

    setSending(true);
    const loadingToast = toast.loading(t("sendingMessage"));

    try {
      const res = await fetch("/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      toast.dismiss(loadingToast);

      if (!res.ok) {
        throw new Error("Server responded with an error");
      }

      toast.success(t("messageSent"));
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      toast.dismiss(loadingToast);
      toast.error(t("sendFailed"));
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <section className="pt-0">
        <div className="container">
          <div className="row wow fadeInUp" data-wow-delay="300ms">
            <div className="col-lg-6">
              <div className="position-relative mt40">
                <div className="main-title">
                  <h4 className="form-title mb25">{t("getInTouch")}</h4>
                  <p className="text">{t("getInTouchDesc")}</p>
                </div>
                <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                  <div className="icon flex-shrink-0">
                    <span className="flaticon-mail" />
                  </div>
                  <div className="details">
                    <h5 className="title">{t("emailLabel")}</h5>
                    <p className="mb-0 text">info@skilllinkup.com</p>
                  </div>
                </div>
                <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                  <div className="icon flex-shrink-0">
                    <span className="flaticon-clock" />
                  </div>
                  <div className="details">
                    <h5 className="title">{t("responseTime")}</h5>
                    <p className="mb-0 text">{t("responseTimeDesc")}</p>
                  </div>
                </div>
                <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                  <div className="icon flex-shrink-0">
                    <span className="flaticon-tracking" />
                  </div>
                  <div className="details">
                    <h5 className="title">{t("location")}</h5>
                    <p className="mb-0 text">{t("locationDesc")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-page-form default-box-shadow1 bdrs8 bdr1 p50 mb30-md bgc-white">
                <h4 className="form-title mb25">{t("sendUsMessage")}</h4>
                <p className="text mb30">{t("sendUsMessageDesc")}</p>
                <form className="form-style1" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          {t("name")}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={t("namePlaceholder")}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          {t("email")}
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder={t("emailPlaceholder")}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          {t("subject")}
                        </label>
                        <select
                          className="form-control form-select"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                        >
                          <option value="">{t("selectTopic")}</option>
                          <option value="general">{t("topicGeneral")}</option>
                          <option value="account">{t("topicAccount")}</option>
                          <option value="freelancer">{t("topicFreelancer")}</option>
                          <option value="client">{t("topicClient")}</option>
                          <option value="payment">{t("topicPayment")}</option>
                          <option value="partnership">{t("topicPartnership")}</option>
                          <option value="bug">{t("topicBug")}</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          {t("message")}
                        </label>
                        <textarea
                          cols={30}
                          rows={6}
                          placeholder={t("messagePlaceholder")}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div>
                        <button
                          type="submit"
                          className="ud-btn btn-thm"
                          disabled={sending}
                        >
                          {sending ? t("sending") : t("sendMessage")}
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
