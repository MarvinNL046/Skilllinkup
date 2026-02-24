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

interface NewOrderEmailProps {
 freelancerName: string;
 orderNumber: string;
 orderTitle: string;
 amount: number;
 currency: string;
 deliveryDays: number;
 orderId: string;
 locale?: Locale;
}

export const NewOrderEmail = ({
 freelancerName,
 orderNumber,
 orderTitle,
 amount,
 currency,
 deliveryDays,
 orderId,
 locale = 'en',
}: NewOrderEmailProps) =>{
 return (
 <BaseLayout
 locale={locale}
 preview={`New order received - #${orderNumber}`}
 heroTitle="New Order!"
 heroSubtitle="You have a new order waiting for you"
 >
 <Section style={contentSection}>
 <Text style={paragraph}>
 Hi {freelancerName},
 </Text>
 <Text style={paragraph}>
 You have a new order! A client has placed an order for one of your services.
 Please review the details below and start working on it within your delivery
 timeframe.
 </Text>

 <Section style={infoBox}>
 <Text style={infoLabel}>Order Number</Text>
 <Text style={infoValue}>#{orderNumber}</Text>

 <Text style={infoLabel}>Service</Text>
 <Text style={infoValue}>{orderTitle}</Text>

 <Text style={infoLabel}>Earnings</Text>
 <Text style={infoValue}>{formatCurrency(amount, currency)}</Text>

 <Text style={infoLabel}>Delivery Time</Text>
 <Text style={deliveryValue}>
 {deliveryDays} {deliveryDays === 1 ? 'day' : 'days'}
 </Text>
 </Section>

 <Text style={paragraph}>
 Make sure to deliver on time to maintain your reputation. You can communicate
 with the client directly from your order page.
 </Text>
 </Section>

 <Section style={ctaSection}>
 <Button
 style={ctaButton}
 href={`${baseUrl}/dashboard/seller/orders/${orderId}`}
 >
 View Order Details
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

export default NewOrderEmail;
