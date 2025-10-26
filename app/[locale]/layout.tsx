import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import BackToTop from "@/components/BackToTop";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';

// Generate locale-specific metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skilllinkup.com";

  // Locale-specific content
  const isEnglish = locale === 'en';
  const title = isEnglish
    ? "Best Freelance Platforms 2025 | Compare Upwork, Fiverr & More - SkillLinkup"
    : "Beste Freelance Platforms 2025 | Vergelijk Upwork, Fiverr & Meer - SkillLinkup";
  const description = isEnglish
    ? "Compare 25+ freelance platforms in 2025. Read honest reviews of Upwork, Fiverr, Toptal & more. Find the perfect marketplace for your skills today!"
    : "Vergelijk 25+ freelance platforms in 2025. Lees eerlijke reviews van Upwork, Fiverr, Toptal & meer. Vind het perfecte platform voor jouw skills vandaag!";
  const keywords = isEnglish
    ? "freelance platforms 2025, best freelance marketplaces, Upwork vs Fiverr, freelance platform comparison, top freelance sites, freelancer reviews, remote work platforms"
    : "freelance platforms 2025, beste freelance platforms, Upwork vs Fiverr, freelance platform vergelijking, top freelance sites, freelancer reviews, remote werk platforms";

  return {
    title,
    description,
    keywords,
    icons: {
      icon: "/images/favicon-skilllinkup.png",
      shortcut: "/images/favicon-skilllinkup.png",
      apple: "/images/favicon-skilllinkup.png",
    },
    openGraph: {
      title: isEnglish
        ? "Best Freelance Platforms 2025 | Compare Upwork, Fiverr & More"
        : "Beste Freelance Platforms 2025 | Vergelijk Upwork, Fiverr & Meer",
      description,
      url: `${baseUrl}/${locale}`,
      siteName: "SkillLinkup",
      locale: locale === 'en' ? 'en_US' : 'nl_NL',
      alternateLocale: locale === 'en' ? ['nl_NL'] : ['en_US'],
      type: "website",
      images: [
        {
          url: `${baseUrl}/images/og-image-homepage.jpg`,
          width: 1200,
          height: 630,
          alt: "SkillLinkup - Compare Freelance Platforms",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/images/og-image-homepage.jpg`],
      creator: "@SkillLinkup",
      site: "@SkillLinkup",
    },
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
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'nl': `${baseUrl}/nl`,
        'x-default': `${baseUrl}/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params in Next.js 15
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Load messages for the locale
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <>
      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WZ8RHPC9');
        `}
      </Script>

      {/* Microsoft Clarity */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "tv9u2xqtfg");
        `}
      </Script>

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-WZ8RHPC9"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>

      <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
          <BackToTop />
        </ThemeProvider>
      </NextIntlClientProvider>
    </>
  );
}
