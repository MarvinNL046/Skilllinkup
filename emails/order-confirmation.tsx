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

interface OrderConfirmationEmailProps {
 clientName: string;
 orderNumber: string;
 orderTitle: string;
 amount: number;
 currency: string;
 deliveryDays: number;
 orderId: string;
 locale?: Locale;
}

export const OrderConfirmationEmail = ({
 clientName,
 orderNumber,
 orderTitle,
 amount,
 currency,
 deliveryDays,
 orderId,
 locale = 'en',
}: OrderConfirmationEmailProps) =>{
 return (
 <BaseLayout
 locale={locale}
 preview={`Order #${orderNumber} confirmed - ${orderTitle}`}
 heroTitle="Order Confirmed!"
 heroSubtitle="Your order has been placed successfully"
 >
 <Section style={contentSection}>
 <Text style={paragraph}>
 Hi {clientName},
 </Text>
 <Text style={paragraph}>
 Your order has been placed and the freelancer has been notified. You can track
 the progress of your order from your dashboard.
 </Text>

 <Section style={infoBox}>
 <Text style={infoLabel}>Order Number</Text>
 <Text style={infoValue}>#{orderNumber}</Text>

 <Text style={infoLabel}>Service</Text>
 <Text style={infoValue}>{orderTitle}</Text>

 <Text style={infoLabel}>Agreed scope amount</Text>
 <Text style={infoValue}>{formatCurrency(amount, currency)}</Text>

 <Text style={infoLabel}>Delivery Time</Text>
 <Text style={deliveryValue}>
 {deliveryDays} {deliveryDays === 1 ? 'day' : 'days'}
 </Text>
 </Section>

 <Text style={paragraph}>
 This is a free private-beta order. No payment has been collected and no escrow is active.
 The amount above describes the agreed scope. We will notify you when work is submitted for review.
 </Text>
 </Section>

 <Section style={ctaSection}>
 <Button
 style={ctaButton}
 href={`${baseUrl}/orders/${orderId}`}
 >
 View Your Order
 </Button>
 </Section>
 </BaseLayout>
 );
};

// Additional styles
const deliveryValue: React.CSSProperties = {
 color: '#1e1541',
 fontSize: '16px',
 fontWeight: '600',
 margin: '0',
};

const ctaSection: React.CSSProperties = {
 padding: '8px 32px 32px 32px',
 textAlign: 'center' as const,
};

export default OrderConfirmationEmail;
