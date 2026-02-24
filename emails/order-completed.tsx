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

interface OrderCompletedEmailProps {
  freelancerName: string;
  orderNumber: string;
  orderTitle: string;
  amount: number;
  currency: string;
  orderId: string;
  locale?: Locale;
}

export const OrderCompletedEmail = ({
  freelancerName,
  orderNumber,
  orderTitle,
  amount,
  currency,
  orderId,
  locale = 'en',
}: OrderCompletedEmailProps) => {
  return (
    <BaseLayout
      locale={locale}
      preview={`Payment released for order #${orderNumber} — ${formatCurrency(amount, currency)}`}
      heroTitle="Payment Released!"
      heroSubtitle="Your earnings have been transferred to your account"
      heroColor={colors.accent}
    >
      <Section style={contentSection}>
        <Text style={paragraph}>Hi {freelancerName},</Text>
        <Text style={paragraph}>
          Great news! The client has approved your delivery and payment has been released.
          Your earnings are now available in your SkillLinkup wallet.
        </Text>

        <Section style={infoBox}>
          <Text style={infoLabel}>Order Number</Text>
          <Text style={infoValue}>#{orderNumber}</Text>

          <Text style={infoLabel}>Service</Text>
          <Text style={infoValue}>{orderTitle}</Text>

          <Text style={earningsLabel}>Earnings</Text>
          <Text style={earningsValue}>{formatCurrency(amount, currency)}</Text>
        </Section>

        <Text style={paragraph}>
          You can withdraw your earnings to your bank account or PayPal from your earnings
          dashboard at any time.
        </Text>
      </Section>

      <Section style={ctaSection}>
        <Button
          style={ctaButton}
          href={`${baseUrl}/dashboard/seller/earnings`}
        >
          View Earnings
        </Button>
      </Section>
    </BaseLayout>
  );
};

// Additional styles
const earningsLabel: React.CSSProperties = {
  color: '#64607d',
  fontSize: '13px',
  fontWeight: '500',
  margin: '0 0 4px 0',
};

const earningsValue: React.CSSProperties = {
  color: colors.accent,
  fontSize: '20px',
  fontWeight: '700',
  margin: '0',
};

const ctaSection: React.CSSProperties = {
  padding: '8px 32px 32px 32px',
  textAlign: 'center' as const,
};

export default OrderCompletedEmail;
