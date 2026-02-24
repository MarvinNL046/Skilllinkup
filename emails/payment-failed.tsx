import * as React from 'react';
import { Button, Section, Text } from '@react-email/components';
import { BaseLayout } from './components/BaseLayout';
import {
  contentSection,
  paragraph,
  ctaButton,
  colors,
} from './components/styles';
import type { Locale } from './translations';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

interface PaymentFailedEmailProps {
  clientName: string;
  gigTitle: string;
  locale?: Locale;
}

export const PaymentFailedEmail = ({
  clientName,
  gigTitle,
  locale = 'en',
}: PaymentFailedEmailProps) => {
  const localePath = locale === 'en' ? '/en' : '/nl';

  return (
    <BaseLayout
      locale={locale}
      preview={`Payment failed for "${gigTitle}" - action required`}
      heroTitle="Payment Failed"
      heroSubtitle="We were unable to process your payment"
      heroColor={colors.amber}
    >
      <Section style={contentSection}>
        <Text style={paragraph}>
          Hi {clientName},
        </Text>
        <Text style={paragraph}>
          Your payment for <strong>{gigTitle}</strong> could not be processed. This can
          happen due to insufficient funds, an expired card, or a bank decline.
        </Text>
        <Text style={paragraph}>
          Please check your payment details and try again. Your order has not been placed
          and no charges have been made to your account.
        </Text>

        <Section style={tipsBox}>
          <Text style={tipsTitle}>Common reasons for payment failure:</Text>
          <Text style={tipItem}>- Insufficient funds on the card</Text>
          <Text style={tipItem}>- Card expired or incorrect details</Text>
          <Text style={tipItem}>- Bank blocked the transaction</Text>
          <Text style={tipItem}>- Billing address mismatch</Text>
        </Section>

        <Text style={paragraph}>
          If the problem persists, please contact your bank or try a different payment
          method.
        </Text>
      </Section>

      <Section style={ctaSection}>
        <Button style={ctaButton} href={`${baseUrl}${localePath}/marketplace`}>
          Try Again
        </Button>
      </Section>
    </BaseLayout>
  );
};

// Additional styles
const tipsBox: React.CSSProperties = {
  backgroundColor: '#fffbeb',
  border: `1px solid ${colors.amber}`,
  borderRadius: '8px',
  padding: '16px 20px',
  margin: '16px 0',
};

const tipsTitle: React.CSSProperties = {
  color: '#92400e',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 8px 0',
};

const tipItem: React.CSSProperties = {
  color: '#78350f',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0',
};

const ctaSection: React.CSSProperties = {
  padding: '8px 32px 32px 32px',
  textAlign: 'center' as const,
};

export default PaymentFailedEmail;
