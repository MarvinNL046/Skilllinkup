import * as React from 'react';
import { Section, Text } from '@react-email/components';
import { BaseLayout } from './components/BaseLayout';
import {
 contentSection,
 paragraph,
 infoBox,
 infoLabel,
 infoValue,
 colors,
} from './components/styles';
import type { Locale } from './translations';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

interface ContactAdminEmailProps {
 name: string;
 email: string;
 subject?: string;
 message: string;
 locale?: Locale;
}

export const ContactAdminEmail = ({
 name,
 email,
 subject,
 message,
 locale = 'en',
}: ContactAdminEmailProps) =>{
 return (
 <BaseLayout
 locale={locale}
 preview={`New contact form message from ${name}`}
 heroTitle="New Contact Form Message"
 heroSubtitle="Someone has submitted the contact form"
 >
 <Section style={contentSection}>
 <Text style={paragraph}>
 A new message has been submitted through the contact form. Details are below.
 </Text>

 <Section style={infoBox}>
 <Text style={infoLabel}>Name</Text>
 <Text style={infoValue}>{name}</Text>

 <Text style={infoLabel}>Email</Text>
 <Text style={infoValue}>{email}</Text>

 {subject && (
 <>
 <Text style={infoLabel}>Subject</Text>
 <Text style={infoValue}>{subject}</Text>
 </>
 )}
 </Section>

 <Text style={infoLabel}>Message</Text>
 <Section style={messagebox}>
 <Text style={messageText}>{message}</Text>
 </Section>

 <Text style={replyNote}>
 Reply directly to this email to respond to {name} at {email}.
 </Text>
 </Section>
 </BaseLayout>
 );
};

// Additional styles
const messagebox: React.CSSProperties = {
 backgroundColor: colors.white,
 border: `1px solid ${colors.border}`,
 borderRadius: '8px',
 padding: '16px 20px',
 margin: '8px 0 16px 0',
};

const messageText: React.CSSProperties = {
 color: colors.text,
 fontSize: '15px',
 lineHeight: '1.7',
 margin: '0',
 whiteSpace: 'pre-wrap' as const,
};

const replyNote: React.CSSProperties = {
 color: colors.textMuted,
 fontSize: '13px',
 lineHeight: '1.5',
 margin: '0',
 fontStyle: 'italic',
};

export default ContactAdminEmail;
