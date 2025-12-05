import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { type Locale, getNewsletterTranslations } from './translations';

interface NewsletterArticle {
  title: string;
  excerpt: string;
  imageUrl: string;
  url: string;
  category?: string;
}

interface FeaturedPlatform {
  name: string;
  description: string;
  rating: string;
  url: string;
  imageUrl?: string;
}

interface NewsletterEmailProps {
  locale?: Locale;
  previewText?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  introText?: string;
  articles?: NewsletterArticle[];
  featuredPlatform?: FeaturedPlatform;
  tipOfTheWeek?: {
    title: string;
    content: string;
  };
  subscriberEmail?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

export const NewsletterEmail = ({
  locale = 'en',
  previewText,
  heroTitle,
  heroSubtitle,
  introText,
  articles,
  featuredPlatform,
  tipOfTheWeek,
  subscriberEmail = 'subscriber@example.com',
}: NewsletterEmailProps) => {
  const t = getNewsletterTranslations(locale);
  const localePath = locale === 'en' ? '/en' : '/nl';

  // Use provided values or fall back to translated defaults
  const finalPreviewText = previewText || t.defaultPreview;
  const finalHeroTitle = heroTitle || t.defaultHeroTitle;
  const finalHeroSubtitle = heroSubtitle || t.defaultHeroSubtitle;
  const finalIntroText = introText || t.defaultIntro;

  // Default articles based on locale
  const defaultArticles: NewsletterArticle[] = locale === 'nl' ? [
    {
      title: 'Upwork vs Fiverr: Welke is beter in 2025?',
      excerpt: 'Een uitgebreide vergelijking van de twee grootste freelance platforms...',
      imageUrl: `${baseUrl}/images/posts/upwork-vs-fiverr.jpg`,
      url: `${baseUrl}/nl/blog/upwork-vs-fiverr`,
      category: 'Vergelijking',
    },
    {
      title: 'Hoe je je eerste klant vindt als freelancer',
      excerpt: 'Praktische tips om snel je eerste opdracht binnen te halen...',
      imageUrl: `${baseUrl}/images/posts/first-client.jpg`,
      url: `${baseUrl}/nl/blog/eerste-klant-vinden`,
      category: 'Tips',
    },
  ] : [
    {
      title: 'Upwork vs Fiverr: Which is Better in 2025?',
      excerpt: 'A comprehensive comparison of the two biggest freelance platforms...',
      imageUrl: `${baseUrl}/images/posts/upwork-vs-fiverr.jpg`,
      url: `${baseUrl}/en/blog/upwork-vs-fiverr`,
      category: 'Comparison',
    },
    {
      title: 'How to Find Your First Client as a Freelancer',
      excerpt: 'Practical tips to land your first gig quickly...',
      imageUrl: `${baseUrl}/images/posts/first-client.jpg`,
      url: `${baseUrl}/en/blog/finding-first-client`,
      category: 'Tips',
    },
  ];

  const defaultFeaturedPlatform: FeaturedPlatform = locale === 'nl' ? {
    name: 'Toptal',
    description: 'Het premium platform voor top 3% developers en designers',
    rating: '4.8/5',
    url: `${baseUrl}/nl/platforms/toptal`,
  } : {
    name: 'Toptal',
    description: 'The premium platform for the top 3% of developers and designers',
    rating: '4.8/5',
    url: `${baseUrl}/en/platforms/toptal`,
  };

  const defaultTip = locale === 'nl' ? {
    title: t.sections.tipOfTheWeek,
    content: 'Stel altijd vragen voordat je een offerte maakt. Hoe beter je het project begrijpt, hoe accurater je prijsvoorstel en hoe professioneler je overkomt.',
  } : {
    title: t.sections.tipOfTheWeek,
    content: 'Always ask questions before sending a quote. The better you understand the project, the more accurate your pricing and the more professional you appear.',
  };

  const finalArticles = articles || defaultArticles;
  const finalFeaturedPlatform = featuredPlatform || defaultFeaturedPlatform;
  const finalTipOfTheWeek = tipOfTheWeek || defaultTip;

  const formattedDate = new Date().toLocaleDateString(t.dateLocale, t.dateOptions);

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{finalPreviewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Row>
              <Column>
                <Img
                  src={`${baseUrl}/images/logo/logo-black.png`}
                  width="140"
                  height="32"
                  alt="SkillLinkup"
                  style={logoStyle}
                />
              </Column>
              <Column style={headerRight}>
                <Text style={dateText}>{formattedDate}</Text>
              </Column>
            </Row>
          </Section>

          {/* Hero */}
          <Section style={heroSection}>
            <Heading style={heroTitleStyle}>{finalHeroTitle}</Heading>
            <Text style={heroSubtitleStyle}>{finalHeroSubtitle}</Text>
          </Section>

          {/* Intro */}
          <Section style={introSection}>
            <Text style={introTextStyle}>{finalIntroText}</Text>
          </Section>

          {/* Featured Articles */}
          <Section style={sectionWrapper}>
            <Heading as="h2" style={sectionTitle}>
              {t.sections.featuredArticles}
            </Heading>

            {finalArticles.map((article, index) => (
              <Section key={index} style={articleCard}>
                <Row>
                  <Column style={articleImageCol}>
                    <Img
                      src={article.imageUrl}
                      width="120"
                      height="80"
                      alt={article.title}
                      style={articleImage}
                    />
                  </Column>
                  <Column style={articleContentCol}>
                    {article.category && (
                      <Text style={categoryBadge}>{article.category}</Text>
                    )}
                    <Link href={article.url} style={articleTitleLink}>
                      {article.title}
                    </Link>
                    <Text style={articleExcerpt}>{article.excerpt}</Text>
                    <Link href={article.url} style={readMoreLink}>
                      {t.readMore}
                    </Link>
                  </Column>
                </Row>
              </Section>
            ))}
          </Section>

          <Hr style={divider} />

          {/* Featured Platform */}
          <Section style={sectionWrapper}>
            <Heading as="h2" style={sectionTitle}>
              {t.sections.platformSpotlight}
            </Heading>

            <Section style={platformCard}>
              <Row>
                <Column style={platformContent}>
                  <Text style={platformName}>{finalFeaturedPlatform.name}</Text>
                  <Text style={platformDescription}>{finalFeaturedPlatform.description}</Text>
                  <Row style={platformMeta}>
                    <Column>
                      <Text style={ratingText}>
                        <span style={starIcon}>★</span> {finalFeaturedPlatform.rating}
                      </Text>
                    </Column>
                  </Row>
                  <Button style={platformButton} href={finalFeaturedPlatform.url}>
                    {t.viewPlatform}
                  </Button>
                </Column>
              </Row>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Tip of the Week */}
          <Section style={tipSection}>
            <div style={tipIcon}>💡</div>
            <Heading as="h2" style={tipTitle}>{finalTipOfTheWeek.title}</Heading>
            <Text style={tipContent}>{finalTipOfTheWeek.content}</Text>
          </Section>

          {/* CTA Section */}
          <Section style={ctaSection}>
            <Text style={ctaText}>{t.contactCta}</Text>
            <Button style={ctaButton} href={`${baseUrl}${localePath}/contact`}>
              {t.contactButton}
            </Button>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <Img
              src={`${baseUrl}/images/logo/logo-black.png`}
              width="100"
              height="24"
              alt="SkillLinkup"
              style={footerLogo}
            />

            <Row style={socialRow}>
              <Column align="center">
                <Link href="https://twitter.com/skilllinkup" style={socialLink}>Twitter</Link>
                <span style={socialDivider}>|</span>
                <Link href="https://linkedin.com/company/skilllinkup" style={socialLink}>LinkedIn</Link>
                <span style={socialDivider}>|</span>
                <Link href="https://instagram.com/skilllinkup" style={socialLink}>Instagram</Link>
              </Column>
            </Row>

            <Text style={footerText}>
              {t.footer.receivingAt} {subscriberEmail} {t.footer.because}
            </Text>

            <Row style={footerLinksRow}>
              <Column align="center">
                <Link href={`${baseUrl}${localePath}/platforms`} style={footerLink}>Platforms</Link>
                <span style={footerDivider}>•</span>
                <Link href={`${baseUrl}${localePath}/blog`} style={footerLink}>Blog</Link>
                <span style={footerDivider}>•</span>
                <Link href={`${baseUrl}${localePath}/tools`} style={footerLink}>Tools</Link>
                <span style={footerDivider}>•</span>
                <Link href={`${baseUrl}${localePath}/contact`} style={footerLink}>Contact</Link>
              </Column>
            </Row>

            <Text style={unsubscribeText}>
              <Link href={`${baseUrl}${localePath}/unsubscribe?email=${subscriberEmail}`} style={unsubscribeLink}>
                {t.footer.unsubscribe}
              </Link>
              {' | '}
              <Link href={`${baseUrl}${localePath}/preferences?email=${subscriberEmail}`} style={unsubscribeLink}>
                {t.footer.preferences}
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
  padding: '16px 24px',
};

const logoStyle: React.CSSProperties = {
  filter: 'brightness(0) invert(1)',
};

const headerRight: React.CSSProperties = {
  textAlign: 'right' as const,
};

const dateText: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.7)',
  fontSize: '12px',
  margin: '0',
};

const heroSection: React.CSSProperties = {
  background: 'linear-gradient(135deg, #ef2b70 0%, #d91a5f 100%)',
  padding: '40px 24px',
  textAlign: 'center' as const,
};

const heroTitleStyle: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '1.2',
  margin: '0 0 8px 0',
};

const heroSubtitleStyle: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.9)',
  fontSize: '16px',
  fontWeight: '400',
  margin: '0',
};

const introSection: React.CSSProperties = {
  padding: '24px',
};

const introTextStyle: React.CSSProperties = {
  color: '#1e1541',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0',
};

const sectionWrapper: React.CSSProperties = {
  padding: '0 24px 24px 24px',
};

const sectionTitle: React.CSSProperties = {
  color: '#1e1541',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px 0',
};

const articleCard: React.CSSProperties = {
  backgroundColor: '#f8f9fb',
  borderRadius: '12px',
  marginBottom: '12px',
  padding: '16px',
};

const articleImageCol: React.CSSProperties = {
  width: '120px',
  verticalAlign: 'top',
};

const articleImage: React.CSSProperties = {
  borderRadius: '8px',
  objectFit: 'cover' as const,
};

const articleContentCol: React.CSSProperties = {
  paddingLeft: '16px',
  verticalAlign: 'top',
};

const categoryBadge: React.CSSProperties = {
  backgroundColor: '#ef2b70',
  borderRadius: '4px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '10px',
  fontWeight: '600',
  letterSpacing: '0.5px',
  margin: '0 0 8px 0',
  padding: '2px 8px',
  textTransform: 'uppercase' as const,
};

const articleTitleLink: React.CSSProperties = {
  color: '#1e1541',
  display: 'block',
  fontSize: '15px',
  fontWeight: '600',
  lineHeight: '1.3',
  marginBottom: '4px',
  textDecoration: 'none',
};

const articleExcerpt: React.CSSProperties = {
  color: '#64607d',
  fontSize: '13px',
  lineHeight: '1.4',
  margin: '0 0 8px 0',
};

const readMoreLink: React.CSSProperties = {
  color: '#ef2b70',
  fontSize: '13px',
  fontWeight: '500',
  textDecoration: 'none',
};

const divider: React.CSSProperties = {
  borderColor: '#e5e7eb',
  borderStyle: 'solid',
  borderWidth: '1px 0 0 0',
  margin: '0 24px',
};

const platformCard: React.CSSProperties = {
  backgroundColor: '#1e1541',
  borderRadius: '12px',
  padding: '24px',
};

const platformContent: React.CSSProperties = {
  textAlign: 'center' as const,
};

const platformName: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: '700',
  margin: '0 0 8px 0',
};

const platformDescription: React.CSSProperties = {
  color: 'rgba(255, 255, 255, 0.8)',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0 0 12px 0',
};

const platformMeta: React.CSSProperties = {
  marginBottom: '16px',
};

const ratingText: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '14px',
  margin: '0',
};

const starIcon: React.CSSProperties = {
  color: '#fbbf24',
};

const platformButton: React.CSSProperties = {
  backgroundColor: '#ef2b70',
  borderRadius: '8px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: '600',
  padding: '12px 24px',
  textDecoration: 'none',
};

const tipSection: React.CSSProperties = {
  backgroundColor: '#fef3c7',
  margin: '24px',
  padding: '24px',
  borderRadius: '12px',
  textAlign: 'center' as const,
};

const tipIcon: React.CSSProperties = {
  fontSize: '32px',
  marginBottom: '12px',
};

const tipTitle: React.CSSProperties = {
  color: '#92400e',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 8px 0',
};

const tipContent: React.CSSProperties = {
  color: '#78350f',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0',
};

const ctaSection: React.CSSProperties = {
  padding: '24px',
  textAlign: 'center' as const,
};

const ctaText: React.CSSProperties = {
  color: '#64607d',
  fontSize: '14px',
  margin: '0 0 16px 0',
};

const ctaButton: React.CSSProperties = {
  backgroundColor: '#1e1541',
  borderRadius: '8px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: '500',
  padding: '12px 24px',
  textDecoration: 'none',
};

const footer: React.CSSProperties = {
  backgroundColor: '#f8f9fb',
  padding: '32px 24px',
  textAlign: 'center' as const,
};

const footerLogo: React.CSSProperties = {
  margin: '0 auto 16px auto',
  opacity: 0.6,
};

const socialRow: React.CSSProperties = {
  marginBottom: '16px',
};

const socialLink: React.CSSProperties = {
  color: '#ef2b70',
  fontSize: '13px',
  textDecoration: 'none',
};

const socialDivider: React.CSSProperties = {
  color: '#9691ad',
  margin: '0 8px',
};

const footerText: React.CSSProperties = {
  color: '#64607d',
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '0 0 12px 0',
};

const footerLinksRow: React.CSSProperties = {
  marginBottom: '16px',
};

const footerLink: React.CSSProperties = {
  color: '#64607d',
  fontSize: '12px',
  textDecoration: 'none',
};

const footerDivider: React.CSSProperties = {
  color: '#9691ad',
  margin: '0 8px',
};

const unsubscribeText: React.CSSProperties = {
  margin: '0 0 8px 0',
};

const unsubscribeLink: React.CSSProperties = {
  color: '#9691ad',
  fontSize: '11px',
  textDecoration: 'underline',
};

const copyright: React.CSSProperties = {
  color: '#9691ad',
  fontSize: '11px',
  margin: '0',
};

export default NewsletterEmail;
