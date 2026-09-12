"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import styles from "./ExitIntentPopup.module.css";

const SESSION_KEY = "exitIntentShown";
const DELAY_MS = 5000;
const COPY = {
  en: {
    eyebrow: "Stay in the loop",
    title: "Follow the public launch.",
    description:
      "Skilllinkup is in private beta. Explore profiles now, and join the waitlist for public launch updates.",
    email: "Email address",
    placeholder: "you@example.com",
    join: "Join the waitlist",
    later: "Maybe later",
    close: "Close",
    privacy: "Only launch updates. Read our",
    privacyLink: "privacy policy",
    success: "You're on the list.",
    already: "You're already on the list.",
    successDescription: "We'll email you about Skilllinkup's public launch. You can keep exploring profiles in the meantime.",
    done: "Continue browsing",
  },
  nl: {
    eyebrow: "Blijf op de hoogte",
    title: "Volg de publieke lancering.",
    description:
      "Skilllinkup is in private bèta. Bekijk nu al profielen en meld je aan voor updates over de publieke lancering.",
    email: "E-mailadres",
    placeholder: "jij@voorbeeld.nl",
    join: "Op de wachtlijst",
    later: "Misschien later",
    close: "Sluiten",
    privacy: "Alleen updates over de lancering. Lees ons",
    privacyLink: "privacybeleid",
    success: "Je staat op de lijst.",
    already: "Je staat al op de lijst.",
    successDescription:
      "Je krijgt updates over de publieke lancering van Skilllinkup. Ondertussen kun je profielen blijven bekijken.",
    done: "Verder bekijken",
  },
};

export default function ExitIntentPopup() {
  const t = useTranslations("waitlist");
  const locale = useLocale();
  const copy = COPY[locale] ?? COPY.en;
  const { isSignedIn, isLoaded } = useAuth();
  const joinWaitlist = useMutation(api.waitlist.join);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const shown = useRef(false);
  const submitting = useRef(false);
  const returnFocus = useRef(null);

  useEffect(() => {
    if (!isLoaded || isSignedIn) return;
    let ready = false;
    const timer = setTimeout(() => {
      ready = true;
    }, DELAY_MS);
    function handleMouseLeave(event) {
      if (!ready || event.clientY > 0 || shown.current) return;
      if (document.querySelector('[role="dialog"], [role="alertdialog"]'))
        return;
      try {
        if (sessionStorage.getItem(SESSION_KEY)) return;
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // The memory guard prevents repeated prompts when storage is unavailable.
      }
      shown.current = true;
      returnFocus.current = document.activeElement;
      setVisible(true);
    }
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isLoaded, isSignedIn]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const trimmed = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(trimmed) || trimmed.length > 254) {
      setError(t("errorInvalidEmail"));
      return;
    }
    submitting.current = true;
    setLoading(true);
    setError("");
    try {
      const response = await joinWaitlist({
        email: trimmed,
        source: window.location.pathname,
        locale,
        trap,
      });
      if (!response?.success) {
        setError(
          t(
            response?.error === "invalid_email"
              ? "errorInvalidEmail"
              : "errorGeneric",
          ),
        );
        return;
      }
      setResult(response.alreadyJoined ? "already" : "joined");
      setEmail("");
    } catch {
      setError(t("errorGeneric"));
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  }

  if (!isLoaded || isSignedIn) return null;

  return (
    <Dialog open={visible} onOpenChange={setVisible}>
      <DialogContent
        className={styles.card}
        showCloseButton={false}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          const previous = returnFocus.current;
          if (previous?.isConnected && previous !== document.body)
            previous.focus();
          else document.getElementById("main-content")?.focus();
        }}
      >
        <DialogClose asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={styles.close}
            aria-label={copy.close}
          >
            <X aria-hidden="true" />
          </Button>
        </DialogClose>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <DialogTitle className={styles.title}>
            {result
              ? result === "already"
                ? copy.already
                : copy.success
              : copy.title}
          </DialogTitle>
          <DialogDescription className={styles.description}>
            {result ? copy.successDescription : copy.description}
          </DialogDescription>
        </div>
        {result ? (
          <div role="status" className={styles.success}>
            <span className="sr-only">
              {result === "already" ? copy.already : copy.success}
            </span>
            <DialogClose asChild>
              <Button type="button">{copy.done}</Button>
            </DialogClose>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={styles.form}
            aria-busy={loading}
          >
            <div className={styles.trap} aria-hidden="true">
              <label>
                Leave this field empty
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={trap}
                  onChange={(event) => setTrap(event.target.value)}
                />
              </label>
            </div>
            <label className={styles.label} htmlFor="exit-waitlist-email">
              {copy.email}
            </label>
            <input
              id="exit-waitlist-email"
              name="email"
              className={styles.input}
              type="email"
              required
              maxLength={254}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              autoComplete="email"
              inputMode="email"
              placeholder={copy.placeholder}
              disabled={loading}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "exit-waitlist-error" : undefined}
            />
            {error && (
              <p id="exit-waitlist-error" role="alert" className={styles.error}>
                {error}
              </p>
            )}
            <div className={styles.actions}>
              <Button type="submit" disabled={loading}>
                {loading ? t("submitting") : copy.join}
                <ArrowRight aria-hidden="true" />
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  {copy.later}
                </Button>
              </DialogClose>
            </div>
            <p className={styles.privacy}>
              {copy.privacy}{" "}
              <Link href="/privacy-policy" onClick={() => setVisible(false)}>
                {copy.privacyLink}
              </Link>
              .
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
