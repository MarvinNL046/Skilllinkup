"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function ContactPage() {
 const t = useTranslations("contactPage");
 const params = useParams();
 const locale = params.locale as string;

 const [formData, setFormData] = useState({
 name: "",
 email: "",
 subject: "",
 message: "",
 });
 const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
 const [message, setMessage] = useState("");

 const handleSubmit = async (e: React.FormEvent) =>{
 e.preventDefault();
 setStatus("loading");
 setMessage("");

 // Simulate form submission
 setTimeout(() =>{
 setStatus("success");
 setMessage(t("form.successMessage"));
 setFormData({ name: "", email: "", subject: "", message: "" });

 setTimeout(() =>{
 setStatus("idle");
 setMessage("");
 }, 5000);
 }, 1000);
 };

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
 setFormData({
 ...formData,
 [e.target.name]: e.target.value,
 });
 };

 return (
 <>
 
 <main className="flex-1">
 {/* Hero Section */}
 <section className="bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 sm:py-20">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-3xl mx-auto text-center">
 <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white sm:text-5xl mb-4">
 {t("hero.title")}
 </h1>
 <p className="text-lg text-gray-700 dark:text-gray-300">
 {t("hero.subtitle")}
 </p>
 </div>
 </div>
 </section>

 {/* Contact Form Section */}
 <section className="py-16 bg-white dark:bg-gray-900">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
 {/* Contact Info */}
 <div>
 <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
 {t("contactInfo.heading")}
 </h2>

 <div className="space-y-6 mb-8">
 <div className="flex items-start gap-4">
 <div className="w-12 h-12 rounded-lg bg-primary dark:bg-accent flex items-center justify-center text-white flex-shrink-0">
 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
 </svg>
 </div>
 <div>
 <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-1">
 {t("contactInfo.email")}
 </h3>
 <a href="mailto:hello@skilllinkup.com" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors">
 {t("contactInfo.emailAddress")}
 </a>
 </div>
 </div>

 <div className="flex items-start gap-4">
 <div className="w-12 h-12 rounded-lg bg-primary dark:bg-accent flex items-center justify-center text-white flex-shrink-0">
 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
 </svg>
 </div>
 <div>
 <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-1">
 {t("contactInfo.responseTime")}
 </h3>
 <p className="text-gray-700 dark:text-gray-300">
 {t("contactInfo.responseTimeText")}
 </p>
 </div>
 </div>

 <div className="flex items-start gap-4">
 <div className="w-12 h-12 rounded-lg bg-primary dark:bg-accent flex items-center justify-center text-white flex-shrink-0">
 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
 </svg>
 </div>
 <div>
 <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-1">
 {t("contactInfo.support")}
 </h3>
 <p className="text-gray-700 dark:text-gray-300">
 {t("contactInfo.supportHours")}
 </p>
 </div>
 </div>
 </div>

 {/* FAQs Link */}
 <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
 <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-3">
 {t("faq.heading")}
 </h3>
 <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
 {t("faq.text")}
 </p>
 <Link
 href={`/${locale}/faq`}
 className="inline-flex items-center gap-2 text-primary dark:text-accent hover:text-primary-dark dark:hover:text-accent/90 font-heading font-semibold transition-colors"
 >
 {t("faq.button")}
 <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
 </svg>
 </Link>
 </div>
 </div>

 {/* Contact Form */}
 <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
 <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
 {t("form.heading")}
 </h2>

 <form onSubmit={handleSubmit} className="space-y-6">
 <div>
 <label htmlFor="name" className="block text-sm font-heading font-semibold text-gray-900 dark:text-white mb-2">
 {t("form.nameLabel")}
 </label>
 <input
 type="text"
 id="name"
 name="name"
 value={formData.name}
 onChange={handleChange}
 required
 disabled={status === "loading"}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent disabled:opacity-50"
 placeholder={t("form.namePlaceholder")}
 />
 </div>

 <div>
 <label htmlFor="email" className="block text-sm font-heading font-semibold text-gray-900 dark:text-white mb-2">
 {t("form.emailLabel")}
 </label>
 <input
 type="email"
 id="email"
 name="email"
 value={formData.email}
 onChange={handleChange}
 required
 disabled={status === "loading"}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent disabled:opacity-50"
 placeholder={t("form.emailPlaceholder")}
 />
 </div>

 <div>
 <label htmlFor="subject" className="block text-sm font-heading font-semibold text-gray-900 dark:text-white mb-2">
 {t("form.subjectLabel")}
 </label>
 <select
 id="subject"
 name="subject"
 value={formData.subject}
 onChange={handleChange}
 required
 disabled={status === "loading"}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent disabled:opacity-50"
 >
 <option value="">{t("form.selectSubject")}</option>
 <option value="general">{t("form.subjectGeneral")}</option>
 <option value="platform">{t("form.subjectPlatform")}</option>
 <option value="review">{t("form.subjectReview")}</option>
 <option value="partnership">{t("form.subjectPartnership")}</option>
 <option value="feedback">{t("form.subjectFeedback")}</option>
 <option value="other">{t("form.subjectOther")}</option>
 </select>
 </div>

 <div>
 <label htmlFor="message" className="block text-sm font-heading font-semibold text-gray-900 dark:text-white mb-2">
 {t("form.messageLabel")}
 </label>
 <textarea
 id="message"
 name="message"
 value={formData.message}
 onChange={handleChange}
 required
 disabled={status === "loading"}
 rows={6}
 className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent disabled:opacity-50 resize-none"
 placeholder={t("form.messagePlaceholder")}
 />
 </div>

 <button
 type="submit"
 disabled={status === "loading"}
 className="w-full rounded-lg bg-primary hover:bg-primary-dark dark:bg-accent dark:hover:bg-accent/90 px-8 py-3 font-heading font-semibold text-white transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
 >
 {status === "loading" ? t("form.sending") : t("form.sendButton")}
 </button>

 {message && (
 <div
 className={`rounded-lg p-4 text-sm font-medium ${
 status === "success"
 ? "bg-accent/10 dark:bg-accent/20 text-accent dark:text-accent-light"
 : "bg-primary/10 dark:bg-primary/20 text-primary dark:text-accent"
 }`}
 >
 {message}
 </div>
 )}
 </form>
 </div>
 </div>
 </div>
 </section>
 </main>
 
 </>
 );
}
