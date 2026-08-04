import * as React from "react";
import { Button, Section, Text } from "@react-email/components";
import { BaseLayout, baseUrl } from "./components/BaseLayout";
import { colors, contentSection, ctaButton, paragraph } from "./components/styles";
import type { Locale } from "./translations";

interface LifecycleNotificationProps {
  recipientName: string;
  title: string;
  message: string;
  actionHref: string;
  locale?: Locale;
}

interface LifecycleEmailProps extends LifecycleNotificationProps {
  product: "Jobs" | "Local";
  actionLabel: string;
  preview: string;
}

function LifecycleEmail({
  recipientName,
  title,
  message,
  actionHref,
  locale = "en",
  product,
  actionLabel,
  preview,
}: LifecycleEmailProps) {
  const href = actionHref.startsWith("http")
    ? actionHref
    : `${baseUrl}${actionHref.startsWith("/") ? actionHref : `/${actionHref}`}`;
  return (
    <BaseLayout
      locale={locale}
      preview={preview}
      heroTitle={title}
      heroSubtitle={`${product} · Skilllinkup`}
      heroColor={product === "Jobs" ? colors.secondary : colors.accent}
    >
      <Section style={contentSection}>
        <Text style={eyebrow}>{product.toUpperCase()}</Text>
        <Text style={paragraph}>Hi {recipientName},</Text>
        <Section style={messageBox}>
          <Text style={messageText}>{message}</Text>
        </Section>
        <Text style={supportText}>
          Open Skilllinkup to review the details and continue securely inside the platform.
        </Text>
      </Section>
      <Section style={ctaSection}>
        <Button style={ctaButton} href={href}>
          {actionLabel}
        </Button>
      </Section>
    </BaseLayout>
  );
}

export function JobApplicationReceivedEmail(props: LifecycleNotificationProps) {
  return (
    <LifecycleEmail
      {...props}
      product="Jobs"
      preview="A new candidate applied to your vacancy"
      actionLabel="Review application"
    />
  );
}

export function JobApplicationStatusEmail(props: LifecycleNotificationProps) {
  return (
    <LifecycleEmail
      {...props}
      product="Jobs"
      preview="Your job application has been updated"
      actionLabel="View application"
    />
  );
}

export function LocalQuoteReceivedEmail(props: LifecycleNotificationProps) {
  return (
    <LifecycleEmail
      {...props}
      product="Local"
      preview="You received a new quote from a local professional"
      actionLabel="Review quote"
    />
  );
}

export function LocalQuoteAcceptedEmail(props: LifecycleNotificationProps) {
  return (
    <LifecycleEmail
      {...props}
      product="Local"
      preview="Your local quote was accepted"
      actionLabel="Open workspace"
    />
  );
}

export function LocalAppointmentStatusEmail(props: LifecycleNotificationProps) {
  return (
    <LifecycleEmail
      {...props}
      product="Local"
      preview="Your local appointment has been updated"
      actionLabel="View appointment"
    />
  );
}

const eyebrow: React.CSSProperties = {
  color: colors.accent,
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "1.4px",
  margin: "0 0 16px",
};

const messageBox: React.CSSProperties = {
  backgroundColor: "#f4f8f7",
  border: "1px solid #dceae5",
  borderRadius: "12px",
  margin: "18px 0",
  padding: "20px 22px",
};

const messageText: React.CSSProperties = {
  color: colors.text,
  fontSize: "16px",
  lineHeight: "1.65",
  margin: 0,
};

const supportText: React.CSSProperties = {
  color: colors.textMuted,
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 12px",
};

const ctaSection: React.CSSProperties = {
  padding: "0 32px 36px",
  textAlign: "center",
};
