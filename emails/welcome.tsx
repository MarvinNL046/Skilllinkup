import {
 Body,
 Button,
 Container,
 Head,
 Heading,
 Hr,
 Html,
 Img,
 Link,
 Preview,
 Section,
 Text,
} from '@react-email/components';
import * as React from 'react';
import { type Locale, getWelcomeTranslations } from './translations';

interface WelcomeEmailProps {
 email?: string;
 locale?: Locale;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

export const WelcomeEmail = ({
 email = 'subscriber@example.com',
 locale = 'en',
}: WelcomeEmailProps) =>{
 const t = getWelcomeTranslations(locale);
 const localePath = locale === 'en' ? '/en' : '/nl';

 return (
 <Html lang={locale}>
 <Head />
 <Preview>{t.preview}</Preview>
 <Body style={main}>
 <Container style={container}>
 {/* Header */}
 <Section style={header}>
 <Img
 src={`${baseUrl}/images/logo/logo-black.png`}
 width="180"
 height="40"
 alt="SkillLinkup"
 style={logo}
 />
 </Section>

 {/* Hero */}
 <Section style={heroSection}>
 <Heading style={heroTitle}>
 {t.heroTitle}
 </Heading>
 <Text style={heroSubtitle}>
 {t.heroSubtitle}
 </Text>
 </Section>

 {/* Main Content */}
 <Section style={contentSection}>
 <Text style={paragraph}>
 {t.greeting}
 </Text>
 <Text style={paragraph}>
 {t.thankYou}
 </Text>
 <Text style={paragraph}>
 {t.intro}
 </Text>
 </Section>

 {/* Features */}
 <Section style={featuresSection}>
 <table style={featuresTable} cellPadding={0} cellSpacing={0}>
 <tbody>
 <tr>
 <td style={featureItem}>
 <div style={featureIcon}>
 <Img
 src={`${baseUrl}/images/icons/star.png`}
 width="32"
 height="32"
 alt=""
 style={iconFallback}
 />
 </div>
 <Text style={featureTitle}>{t.features.reviews.title}</Text>
 <Text style={featureText}>{t.features.reviews.text}</Text>
 </td>
 <td style={featureItem}>
 <div style={featureIcon}>
 <Img
 src={`${baseUrl}/images/icons/lightbulb.png`}
 width="32"
 height="32"
 alt=""
 style={iconFallback}
 />
 </div>
 <Text style={featureTitle}>{t.features.tips.title}</Text>
 <Text style={featureText}>{t.features.tips.text}</Text>
 </td>
 </tr>
 <tr>
 <td style={featureItem}>
 <div style={featureIcon}>
 <Img
 src={`${baseUrl}/images/icons/chart.png`}
 width="32"
 height="32"
 alt=""
 style={iconFallback}
 />
 </div>
 <Text style={featureTitle}>{t.features.insights.title}</Text>
 <Text style={featureText}>{t.features.insights.text}</Text>
 </td>
 <td style={featureItem}>
 <div style={featureIcon}>
 <Img
 src={`${baseUrl}/images/icons/gift.png`}
 width="32"
 height="32"
 alt=""
 style={iconFallback}
 />
 </div>
 <Text style={featureTitle}>{t.features.deals.title}</Text>
 <Text style={featureText}>{t.features.deals.text}</Text>
 </td>
 </tr>
 </tbody>
 </table>
 </Section>

 {/* CTA */}
 <Section style={ctaSection}>
 <Text style={ctaText}>{t.cta}</Text>
 <Button style={ctaButton} href={`${baseUrl}${localePath}/platforms`}>
 {t.ctaButton}
 </Button>
 </Section>

 <Hr style={divider} />

 {/* Footer */}
 <Section style={footer}>
 <Img
 src={`${baseUrl}/images/logo/logo-black.png`}
 width="120"
 height="28"
 alt="SkillLinkup"
 style={footerLogo}
 />
 <Text style={footerText}>{t.footer.reason}</Text>
 <Text style={footerLinks}>
 <Link href={`${baseUrl}${localePath}/platforms`} style={footerLink}>Platforms</Link>
 {' | '}
 <Link href={`${baseUrl}${localePath}/blog`} style={footerLink}>Blog</Link>
 {' | '}
 <Link href={`${baseUrl}${localePath}/tools`} style={footerLink}>Tools</Link>
 {' | '}
 <Link href={`${baseUrl}${localePath}/contact`} style={footerLink}>Contact</Link>
 </Text>
 <Text style={unsubscribe}>
 {t.footer.unsubscribeIntro}{' '}
 <Link href={`${baseUrl}${localePath}/unsubscribe?email=${email}`} style={unsubscribeLink}>
 {t.footer.unsubscribe}
 </Link>
 </Text>
 <Text style={copyright}>
 &copy; {new Date().getFullYear()} SkillLinkup. {t.footer.copyright}
 </Text>
 </Section>
 </Container>
 </Body>
 </Html>
 );
};

// Styles
const main: React.CSSProperties = {
 backgroundColor: '#f8f9fb',
 fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container: React.CSSProperties = {
 backgroundColor: '#ffffff',
 margin: '0 auto',
 maxWidth: '600px',
};

const header: React.CSSProperties = {
 backgroundColor: '#1e1541',
 padding: '24px 32px',
 textAlign: 'center' as const,
};

const logo: React.CSSProperties = {
 margin: '0 auto',
 filter: 'brightness(0) invert(1)',
};

const heroSection: React.CSSProperties = {
 backgroundColor: '#ef2b70',
 padding: '48px 32px',
 textAlign: 'center' as const,
};

const heroTitle: React.CSSProperties = {
 color: '#ffffff',
 fontSize: '32px',
 fontWeight: '700',
 lineHeight: '1.2',
 margin: '0 0 12px 0',
};

const heroSubtitle: React.CSSProperties = {
 color: 'rgba(255, 255, 255, 0.9)',
 fontSize: '18px',
 fontWeight: '400',
 lineHeight: '1.5',
 margin: '0',
};

const contentSection: React.CSSProperties = {
 padding: '32px 32px 16px 32px',
};

const paragraph: React.CSSProperties = {
 color: '#1e1541',
 fontSize: '16px',
 lineHeight: '1.6',
 margin: '0 0 16px 0',
};

const featuresSection: React.CSSProperties = {
 padding: '16px 32px',
};

const featuresTable: React.CSSProperties = {
 width: '100%',
};

const featureItem: React.CSSProperties = {
 backgroundColor: '#f8f9fb',
 borderRadius: '12px',
 padding: '20px',
 textAlign: 'center' as const,
 verticalAlign: 'top',
 width: '50%',
};

const featureIcon: React.CSSProperties = {
 backgroundColor: '#ef2b70',
 borderRadius: '50%',
 display: 'inline-block',
 height: '48px',
 lineHeight: '48px',
 marginBottom: '12px',
 width: '48px',
};

const iconFallback: React.CSSProperties = {
 margin: '8px',
 filter: 'brightness(0) invert(1)',
};

const featureTitle: React.CSSProperties = {
 color: '#1e1541',
 fontSize: '14px',
 fontWeight: '600',
 margin: '0 0 4px 0',
};

const featureText: React.CSSProperties = {
 color: '#64607d',
 fontSize: '13px',
 lineHeight: '1.4',
 margin: '0',
};

const ctaSection: React.CSSProperties = {
 padding: '24px 32px 32px 32px',
 textAlign: 'center' as const,
};

const ctaText: React.CSSProperties = {
 color: '#1e1541',
 fontSize: '16px',
 margin: '0 0 16px 0',
};

const ctaButton: React.CSSProperties = {
 backgroundColor: '#ef2b70',
 borderRadius: '8px',
 color: '#ffffff',
 display: 'inline-block',
 fontSize: '16px',
 fontWeight: '600',
 padding: '14px 32px',
 textDecoration: 'none',
};

const divider: React.CSSProperties = {
 borderColor: '#e5e7eb',
 borderStyle: 'solid',
 borderWidth: '1px 0 0 0',
 margin: '0',
};

const footer: React.CSSProperties = {
 backgroundColor: '#f8f9fb',
 padding: '32px',
 textAlign: 'center' as const,
};

const footerLogo: React.CSSProperties = {
 margin: '0 auto 16px auto',
 opacity: 0.7,
};

const footerText: React.CSSProperties = {
 color: '#64607d',
 fontSize: '13px',
 lineHeight: '1.5',
 margin: '0 0 12px 0',
};

const footerLinks: React.CSSProperties = {
 color: '#64607d',
 fontSize: '13px',
 margin: '0 0 16px 0',
};

const footerLink: React.CSSProperties = {
 color: '#ef2b70',
 textDecoration: 'none',
};

const unsubscribe: React.CSSProperties = {
 color: '#9691ad',
 fontSize: '12px',
 margin: '0 0 8px 0',
};

const unsubscribeLink: React.CSSProperties = {
 color: '#9691ad',
 textDecoration: 'underline',
};

const copyright: React.CSSProperties = {
 color: '#9691ad',
 fontSize: '12px',
 margin: '0',
};

export default WelcomeEmail;
