"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { Mail, Clock, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const contactFacts = [
    { icon: Mail, title: t("emailLabel"), value: "info@skilllinkup.com" },
    { icon: Clock, title: t("responseTime"), value: t("responseTimeDesc") },
    { icon: MapPin, title: t("location"), value: t("locationDesc") },
  ];

  const TOPICS = [
    { value: "general", label: t("topicGeneral") },
    { value: "account", label: t("topicAccount") },
    { value: "freelancer", label: t("topicFreelancer") },
    { value: "client", label: t("topicClient") },
    { value: "payment", label: t("topicPayment") },
    { value: "partnership", label: t("topicPartnership") },
    { value: "bug", label: t("topicBug") },
  ];

  return (
    <section className="pt-10 pb-16">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left — contact facts */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-3">
                {t("getInTouch")}
              </h2>
              <p className="text-base text-[var(--text-secondary)] mb-0">
                {t("getInTouchDesc")}
              </p>
            </div>

            <div className="space-y-5">
              {contactFacts.map(({ icon: Icon, title, value }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary flex-shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg font-medium mb-0.5">{title}</div>
                    <div className="text-base text-[var(--text-secondary)]">
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-medium tracking-tight mb-2">
                {t("sendUsMessage")}
              </h2>
              <p className="text-base text-[var(--text-secondary)] mb-6">
                {t("sendUsMessageDesc")}
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">{t("name")}</Label>
                    <Input
                      id="contact-name"
                      type="text"
                      placeholder={t("namePlaceholder")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">{t("email")}</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-subject">{t("subject")}</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger id="contact-subject">
                      <SelectValue placeholder={t("selectTopic")} />
                    </SelectTrigger>
                    <SelectContent>
                      {TOPICS.map((topic) => (
                        <SelectItem key={topic.value} value={topic.value}>
                          {topic.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">{t("message")}</Label>
                  <Textarea
                    id="contact-message"
                    rows={6}
                    placeholder={t("messagePlaceholder")}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[140px]"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={sending}
                >
                  {sending ? t("sending") : t("sendMessage")}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
