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

interface OrderDeliveredEmailProps {
 clientName: string;
 orderNumber: string;
 orderTitle: string;
 orderId: string;
 locale?: Locale;
}

export const OrderDeliveredEmail = ({
 clientName,
 orderNumber,
 orderTitle,
 orderId,
 locale = 'en',
}: OrderDeliveredEmailProps) =>{
 return (
 <BaseLayout
 locale={locale}
 preview={`Order #${orderNumber} has been delivered - review now`}
 heroTitle="Your Order Has Been Delivered"
 heroSubtitle="The freelancer has submitted the work for your review"
 >
 <Section style={contentSection}>
 <Text style={paragraph}>
 Hi {clientName},
 </Text>
 <Text style={paragraph}>
 The freelancer has delivered your order. Please review the delivered work and
 either approve it or request revisions if needed.
 </Text>

 <Section style={infoBox}>
 <Text style={infoLabel}>Order Number</Text>
 <Text style={infoValue}>#{orderNumber}</Text>

 <Text style={infoLabel}>Service</Text>
 <Text style={finalInfoValue}>{orderTitle}</Text>
 </Section>

 <Section style={noteBox}>
 <Text style={noteText}>
 Please review and approve the delivery within 3 days. If no action is taken,
 the order will be automatically marked as complete.
 </Text>
 </Section>
 </Section>

 <Section style={ctaSection}>
 <Button
 style={ctaButton}
 href={`${baseUrl}/dashboard/orders/${orderId}`}
 >
 Review Delivery
 </Button>
 </Section>
 </BaseLayout>
 );
};

// Additional styles
const finalInfoValue: React.CSSProperties = {
 color: '#1e1541',
 fontSize: '16px',
 fontWeight: '600',
 margin: '0',
};

const noteBox: React.CSSProperties = {
 backgroundColor: '#f0fdf4',
 border: `1px solid ${colors.accent}`,
 borderRadius: '8px',
 padding: '16px 20px',
 margin: '16px 0',
};

const noteText: React.CSSProperties = {
 color: '#166534',
 fontSize: '14px',
 lineHeight: '1.6',
 margin: '0',
};

const ctaSection: React.CSSProperties = {
 padding: '8px 32px 32px 32px',
 textAlign: 'center' as const,
};

export default OrderDeliveredEmail;
