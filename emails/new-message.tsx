import * as React from 'react';
import { Button, Section, Text } from '@react-email/components';
import { BaseLayout } from './components/BaseLayout';
import {
 contentSection,
 paragraph,
 ctaButton,
} from './components/styles';
import type { Locale } from './translations';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

interface NewMessageEmailProps {
 recipientName: string;
 senderName: string;
 messagePreview: string;
 conversationId: string;
 locale?: Locale;
}

export const NewMessageEmail = ({
 recipientName,
 senderName,
 messagePreview,
 conversationId,
 locale = 'en',
}: NewMessageEmailProps) =>{
 return (
 <BaseLayout
 locale={locale}
 preview={`New message from ${senderName}: ${messagePreview.slice(0, 80)}`}
 showHero={false}
 >
 <Section style={contentSection}>
 <Text style={heading}>New Message</Text>

 <Text style={paragraph}>Hi {recipientName},</Text>
 <Text style={paragraph}>
 You have a new message from <strong>{senderName}</strong>:
 </Text>

 <Section style={quoteBox}>
 <Text style={quoteText}>&ldquo;{messagePreview}&rdquo;</Text>
 <Text style={quoteSender}>— {senderName}</Text>
 </Section>

 <Text style={paragraph}>
 Reply directly from your SkillLinkup messages dashboard to keep the
 conversation going.
 </Text>
 </Section>

 <Section style={ctaSection}>
 <Button
 style={ctaButton}
 href={`${baseUrl}/dashboard/messages/${conversationId}`}
 >
 Read Message
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

const quoteBox: React.CSSProperties = {
 backgroundColor: '#f8f9fb',
 borderLeft: '4px solid #e5e7eb',
 borderRadius: '0 8px 8px 0',
 margin: '16px 0',
 padding: '16px 20px',
};

const quoteText: React.CSSProperties = {
 color: '#1e1541',
 fontSize: '15px',
 fontStyle: 'italic',
 lineHeight: '1.6',
 margin: '0 0 8px 0',
};

const quoteSender: React.CSSProperties = {
 color: '#9691ad',
 fontSize: '13px',
 fontWeight: '500',
 margin: '0',
};

const ctaSection: React.CSSProperties = {
 padding: '8px 32px 32px 32px',
 textAlign: 'center' as const,
};

export default NewMessageEmail;
