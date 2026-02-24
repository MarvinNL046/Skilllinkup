// Shared base layout for all SkillLinkup marketplace email templates
// Provides: Header (dark bg + logo), optional Hero, Footer (nav + copyright)
// No unsubscribe link — these are transactional emails

import {
 Body,
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
import {
 colors,
 main,
 container,
 header,
 logo,
 heroSection,
 heroTitle as heroTitleStyle,
 heroSubtitle as heroSubtitleStyle,
 divider,
 footer,
 footerLogo,
 footerText,
 footerLink,
 copyright,
} from './styles';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

interface BaseLayoutProps {
 locale: 'en' | 'nl';
 preview: string;
 heroTitle?: string;
 heroSubtitle?: string;
 heroColor?: string;
 showHero?: boolean;
 children: React.ReactNode;
}

export const BaseLayout = ({
 locale,
 preview,
 heroTitle,
 heroSubtitle,
 heroColor,
 showHero = true,
 children,
}: BaseLayoutProps) =>{
 const localePath = locale === 'en' ? '/en' : '/nl';

 return (
 <Html lang={locale}>
 <Head />
 <Preview>{preview}</Preview>
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

 {/* Hero (optional) */}
 {showHero && heroTitle && (
 <Section
 style={{
 ...heroSection,
 ...(heroColor ? { backgroundColor: heroColor } : {}),
 }}
 >
 <Heading style={heroTitleStyle}>{heroTitle}</Heading>
 {heroSubtitle && (
 <Text style={heroSubtitleStyle}>{heroSubtitle}</Text>
 )}
 </Section>
 )}

 {/* Content */}
 {children}

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
 <Text style={footerText}>
 <Link href={`${baseUrl}${localePath}/platforms`} style={footerLink}>
 {locale === 'nl' ? 'Platforms' : 'Platforms'}
 </Link>
 {' | '}
 <Link href={`${baseUrl}${localePath}/blog`} style={footerLink}>
 Blog
 </Link>
 {' | '}
 <Link href={`${baseUrl}${localePath}/tools`} style={footerLink}>
 Tools
 </Link>
 {' | '}
 <Link href={`${baseUrl}${localePath}/contact`} style={footerLink}>
 Contact
 </Link>
 </Text>
 <Text style={copyright}>
 &copy; {new Date().getFullYear()} SkillLinkup.{' '}
 {locale === 'nl'
 ? 'Alle rechten voorbehouden.'
 : 'All rights reserved.'}
 </Text>
 </Section>
 </Container>
 </Body>
 </Html>
 );
};

export { baseUrl, colors };
