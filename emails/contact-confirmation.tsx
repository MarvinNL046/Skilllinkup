import * as React from 'react';
import { Button, Section, Text } from '@react-email/components';
import { BaseLayout } from './components/BaseLayout';
import {
 contentSection,
 paragraph,
 ctaButton,
 infoBox,
 infoLabel,
 colors,
} from './components/styles';
import type { Locale } from './translations';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

interface ContactConfirmationEmailProps {
 name: string;
 message: string;
 locale?: Locale;
}

export const ContactConfirmationEmail = ({
 name,
 message,
 locale = 'en',
}: ContactConfirmationEmailProps) =>{
 const localePath = locale === 'en' ? '/en' : '/nl';

 return (
 <BaseLayout
 locale={locale}
 preview="We received your message - SkillLinkup"
 heroTitle="We received your message!"
 heroSubtitle="We'll get back to you as soon as possible"
 >
 <Section style={contentSection}>
 <Text style={paragraph}>
 Hi {name},
 </Text>
 <Text style={paragraph}>
 Thanks for reaching out! We have received your message and will get back to you
 as soon as possible. Our team typically responds within 1-2 business days.
 </Text>

 <Text style={infoLabel}>Your message</Text>
 <Section style={infoBox}>
 <Text style={messageText}>{message}</Text>
 </Section>

 <Text style={paragraph}>
 We'll get back to you soon. In the meantime, feel free to explore our platform
 comparisons, tools, and blog posts.
 </Text>
 </Section>

 <Section style={ctaSection}>
 <Button style={ctaButton} href={`${baseUrl}${localePath}`}>
 Visit SkillLinkup
 </Button>
 </Section>
 </BaseLayout>
 );
};

// Additional styles
const messageText: React.CSSProperties = {
 color: colors.text,
 fontSize: '15px',
 lineHeight: '1.7',
 margin: '0',
 whiteSpace: 'pre-wrap' as const,
};

const ctaSection: React.CSSProperties = {
 padding: '8px 32px 32px 32px',
 textAlign: 'center' as const,
};

export default ContactConfirmationEmail;
