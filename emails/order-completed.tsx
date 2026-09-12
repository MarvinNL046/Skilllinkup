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
}: OrderCompletedEmailProps) =>{
 return (
 <BaseLayout
 locale={locale}
 preview={`Order #${orderNumber} completed — ${orderTitle}`}
 heroTitle="Order Completed"
 heroSubtitle="The client has approved your delivery"
 heroColor={colors.accent}
 >
 <Section style={contentSection}>
 <Text style={paragraph}>Hi {freelancerName},</Text>
 <Text style={paragraph}>
 The client has approved your delivery and the order is complete.
 You can review the finished work and leave feedback from the order page.
 </Text>

 <Section style={infoBox}>
 <Text style={infoLabel}>Order Number</Text>
 <Text style={infoValue}>#{orderNumber}</Text>

 <Text style={infoLabel}>Service</Text>
 <Text style={infoValue}>{orderTitle}</Text>

 <Text style={earningsLabel}>Agreed scope amount</Text>
 <Text style={earningsValue}>{formatCurrency(amount, currency)}</Text>
 </Section>

 <Text style={paragraph}>
 This was a free private-beta order. No payment, escrow transfer or wallet earnings
 were created. The amount above describes the agreed scope only.
 </Text>
 </Section>

 <Section style={ctaSection}>
 <Button
 style={ctaButton}
 href={`${baseUrl}/orders/${orderId}`}
 >
 View Completed Order
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
