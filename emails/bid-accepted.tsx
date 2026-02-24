import * as React from 'react';
import { Button, Section, Text } from '@react-email/components';
import { BaseLayout } from './components/BaseLayout';
import {
  contentSection,
  paragraph,
  ctaButton,
  infoBox,
  infoLabel,
  infoValue,
  colors,
} from './components/styles';
import type { Locale } from './translations';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

const formatCurrency = (amount: number, currency: string) =>
  currency === 'EUR' ? '€' + amount.toFixed(2) : currency + ' ' + amount.toFixed(2);

interface BidAcceptedEmailProps {
  freelancerName: string;
  projectTitle: string;
  amount: number;
  currency: string;
  orderId?: string;
  locale?: Locale;
}

export const BidAcceptedEmail = ({
  freelancerName,
  projectTitle,
  amount,
  currency,
  orderId,
  locale = 'en',
}: BidAcceptedEmailProps) => {
  const orderHref = orderId
    ? `${baseUrl}/dashboard/seller/orders/${orderId}`
    : `${baseUrl}/dashboard/seller/orders`;

  return (
    <BaseLayout
      locale={locale}
      preview={`Your bid on "${projectTitle}" has been accepted!`}
      heroTitle="Your Bid Was Accepted!"
      heroSubtitle="Congratulations — time to get to work!"
      heroColor={colors.accent}
    >
      <Section style={contentSection}>
        <Text style={paragraph}>Congratulations {freelancerName}!</Text>
        <Text style={paragraph}>
          Your bid on <strong>&ldquo;{projectTitle}&rdquo;</strong> has been accepted.
          The client is excited to work with you. Head over to your orders dashboard to
          get started and review the project details.
        </Text>

        <Section style={infoBox}>
          <Text style={infoLabel}>Project</Text>
          <Text style={infoValue}>{projectTitle}</Text>

          <Text style={infoLabel}>Agreed Amount</Text>
          <Text style={agreedAmountValue}>{formatCurrency(amount, currency)}</Text>
        </Section>

        <Text style={paragraph}>
          Remember to communicate clearly with your client and deliver on time to earn a
          great review. Good luck!
        </Text>
      </Section>

      <Section style={ctaSection}>
        <Button style={ctaButton} href={orderHref}>
          View Order
        </Button>
      </Section>
    </BaseLayout>
  );
};

// Additional styles
const agreedAmountValue: React.CSSProperties = {
  color: colors.accent,
  fontSize: '20px',
  fontWeight: '700',
  margin: '0',
};

const ctaSection: React.CSSProperties = {
  padding: '8px 32px 32px 32px',
  textAlign: 'center' as const,
};

export default BidAcceptedEmail;
