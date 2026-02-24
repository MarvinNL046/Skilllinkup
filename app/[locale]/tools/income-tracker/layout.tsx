import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface LayoutProps {
 children: React.ReactNode;
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata>{
 const { locale } = await params;
 const t = await getTranslations({ locale, namespace: 'incomeTracker.metadata' });

 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/tools/income-tracker`;

 return {
 title: t('title'),
 description: t('description'),

 // Keywords
 keywords: t('keywords'),

 // Canonical URL with language alternates
 alternates: {
 canonical: pageUrl,
 languages: {
 'en': `${siteUrl}/en/tools/income-tracker`,
 'nl': `${siteUrl}/nl/tools/income-tracker`,
 },
 },

 // Open Graph (Facebook, LinkedIn, etc.)
 openGraph: {
 title: t('title'),
 description: t('description'),
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/income-tracker-og.png`,
 width: 1200,
 height: 630,
 alt: t('ogImageAlt'),
 }
 ],
 locale: locale === 'nl' ? 'nl_NL' : 'en_US',
 type: 'website',
 },

 // Twitter Card
 twitter: {
 card: 'summary_large_image',
 title: t('title'),
 description: t('description'),
 images: [`${siteUrl}/images/og/income-tracker-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },

 // Robots
 robots: {
 index: true,
 follow: true,
 googleBot: {
 index: true,
 follow: true,
 'max-video-preview': -1,
 'max-image-preview': 'large',
 'max-snippet': -1,
 },
 },
 };
}

export default function IncomeTrackerLayout({ children }: LayoutProps) {
 return children;
}
