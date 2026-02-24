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
} from './components/styles';
import type { Locale } from './translations';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

const formatCurrency = (amount: number, currency: string) =>
  currency === 'EUR' ? '€' + amount.toFixed(2) : currency + ' ' + amount.toFixed(2);

interface NewBidEmailProps {
  clientName: string;
  projectTitle: string;
  bidAmount: number;
  currency: string;
  deliveryDays: number;
  freelancerName: string;
  projectId: string;
  locale?: Locale;
}

export const NewBidEmail = ({
  clientName,
  projectTitle,
  bidAmount,
  currency,
  deliveryDays,
  freelancerName,
  projectId,
  locale = 'en',
}: NewBidEmailProps) => {
  return (
    <BaseLayout
      locale={locale}
      preview={`${freelancerName} placed a bid on your project "${projectTitle}"`}
      heroTitle="New Bid Received"
      heroSubtitle="A freelancer has bid on your project"
    >
      <Section style={contentSection}>
        <Text style={paragraph}>Hi {clientName},</Text>
        <Text style={paragraph}>
          <strong>{freelancerName}</strong> has placed a bid on your project{' '}
          <strong>&ldquo;{projectTitle}&rdquo;</strong>. Review their offer and decide
          if it is a good fit for your needs.
        </Text>

        <Section style={infoBox}>
          <Text style={infoLabel}>Project</Text>
          <Text style={infoValue}>{projectTitle}</Text>

          <Text style={infoLabel}>Bid Amount</Text>
          <Text style={infoValue}>{formatCurrency(bidAmount, currency)}</Text>

          <Text style={infoLabel}>Delivery</Text>
          <Text style={infoValue}>
            {deliveryDays} {deliveryDays === 1 ? 'day' : 'days'}
          </Text>

          <Text style={infoLabel}>Freelancer</Text>
          <Text style={freelancerNameValue}>{freelancerName}</Text>
        </Section>

        <Text style={paragraph}>
          You can view the full bid details, the freelancer&apos;s profile and portfolio,
          and accept or decline from your project dashboard.
        </Text>
      </Section>

      <Section style={ctaSection}>
        <Button
          style={ctaButton}
          href={`${baseUrl}/dashboard/projects/${projectId}`}
        >
          View Bids
        </Button>
      </Section>
    </BaseLayout>
  );
};

// Additional styles
const freelancerNameValue: React.CSSProperties = {
  color: '#1e1541',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0',
};

const ctaSection: React.CSSProperties = {
  padding: '8px 32px 32px 32px',
  textAlign: 'center' as const,
};

export default NewBidEmail;
