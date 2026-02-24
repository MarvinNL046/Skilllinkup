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

const renderStars = (rating: number): string => {
  const filled = Math.round(Math.max(0, Math.min(5, rating)));
  return '★'.repeat(filled) + '☆'.repeat(5 - filled);
};

interface ReviewReceivedEmailProps {
  userName: string;
  orderTitle: string;
  rating: number;
  orderId: string;
  locale?: Locale;
}

export const ReviewReceivedEmail = ({
  userName,
  orderTitle,
  rating,
  orderId,
  locale = 'en',
}: ReviewReceivedEmailProps) => {
  const roundedRating = Math.round(Math.max(0, Math.min(5, rating)));

  return (
    <BaseLayout
      locale={locale}
      preview={`You received a new ${roundedRating}-star review for "${orderTitle}"`}
      showHero={false}
    >
      <Section style={contentSection}>
        <Text style={heading}>You have a new review!</Text>

        <Text style={paragraph}>Hi {userName},</Text>
        <Text style={paragraph}>
          You received a new review for your order{' '}
          <strong>&ldquo;{orderTitle}&rdquo;</strong>. Here is what your client had to say:
        </Text>

        <Section style={ratingBox}>
          <Text style={starsText}>{renderStars(rating)}</Text>
          <Text style={ratingLabel}>
            {roundedRating} out of 5 stars
          </Text>
        </Section>

        <Text style={paragraph}>
          Reviews help build your reputation on SkillLinkup and attract more clients.
          Keep up the great work!
        </Text>
      </Section>

      <Section style={ctaSection}>
        <Button
          style={ctaButton}
          href={`${baseUrl}/dashboard/orders/${orderId}`}
        >
          View Review
        </Button>
      </Section>
    </BaseLayout>
  );
};

// Additional styles
const heading: React.CSSProperties = {
  color: '#1e1541',
  fontSize: '24px',
  fontWeight: '700',
  margin: '0 0 20px 0',
  lineHeight: '1.3',
};

const ratingBox: React.CSSProperties = {
  backgroundColor: '#f8f9fb',
  borderRadius: '12px',
  padding: '24px',
  margin: '16px 0',
  textAlign: 'center' as const,
};

const starsText: React.CSSProperties = {
  color: '#f59e0b',
  fontSize: '36px',
  margin: '0 0 8px 0',
  letterSpacing: '4px',
};

const ratingLabel: React.CSSProperties = {
  color: '#64607d',
  fontSize: '14px',
  fontWeight: '500',
  margin: '0',
};

const ctaSection: React.CSSProperties = {
  padding: '8px 32px 32px 32px',
  textAlign: 'center' as const,
};

export default ReviewReceivedEmail;
