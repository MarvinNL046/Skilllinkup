import * as React from "react";
import { Section, Text } from "@react-email/components";
import { BaseLayout } from "./components/BaseLayout";
import { contentSection, paragraph } from "./components/styles";

export function ContactMessageEmail({ name, email, subject, message }: { name: string; email: string; subject: string; message: string }) {
  return <BaseLayout locale="en" preview={"Contact request: " + subject} showHero={false}>
    <Section style={contentSection}>
      <Text style={paragraph}><strong>Contact request · {subject}</strong></Text>
      <Text style={paragraph}>From: {name} ({email})</Text>
      <Text style={{ ...paragraph, whiteSpace: "pre-wrap" }}>{message}</Text>
      <Text style={paragraph}>This message is also stored in the administration contact inbox.</Text>
    </Section>
  </BaseLayout>;
}
