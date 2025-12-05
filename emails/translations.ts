// Email translations for SkillLinkup
// Supports: en (English), nl (Dutch)

export type Locale = 'en' | 'nl';

export const translations = {
  welcome: {
    en: {
      preview: "Welcome to SkillLinkup - Your guide to freelance success!",
      heroTitle: "Welcome to SkillLinkup!",
      heroSubtitle: "You're now part of our community of freelancers",
      greeting: "Hey there,",
      thankYou: "Thanks for signing up for the SkillLinkup newsletter! We're super excited to have you.",
      intro: "As a freelancer, you know how important it is to find the right platforms and tools. We help you with:",
      features: {
        reviews: {
          title: "Platform Reviews",
          text: "Honest comparisons of Fiverr, Upwork, Freelancer and more",
        },
        tips: {
          title: "Practical Tips",
          text: "Proven strategies to win more clients",
        },
        insights: {
          title: "Market Insights",
          text: "Trends and developments in the freelance world",
        },
        deals: {
          title: "Exclusive Deals",
          text: "Special discounts and offers for our readers",
        },
      },
      cta: "Ready to get started? Check out our most popular platforms:",
      ctaButton: "View All Platforms",
      footer: {
        reason: "You're receiving this email because you signed up for the SkillLinkup newsletter.",
        unsubscribeIntro: "Don't want to receive emails anymore?",
        unsubscribe: "Unsubscribe",
        copyright: "All rights reserved.",
      },
    },
    nl: {
      preview: "Welkom bij SkillLinkup - Jouw gids naar freelance succes!",
      heroTitle: "Welkom bij SkillLinkup!",
      heroSubtitle: "Je bent nu onderdeel van onze community van freelancers",
      greeting: "Hoi daar,",
      thankYou: "Bedankt voor je aanmelding voor de SkillLinkup nieuwsbrief! We zijn super blij dat je erbij bent.",
      intro: "Als freelancer weet je hoe belangrijk het is om de juiste platforms en tools te vinden. Wij helpen je daarbij met:",
      features: {
        reviews: {
          title: "Platform Reviews",
          text: "Eerlijke vergelijkingen van Fiverr, Upwork, Freelancer en meer",
        },
        tips: {
          title: "Praktische Tips",
          text: "Bewezen strategieën om meer klanten te winnen",
        },
        insights: {
          title: "Markt Inzichten",
          text: "Trends en ontwikkelingen in de freelance wereld",
        },
        deals: {
          title: "Exclusieve Deals",
          text: "Speciale kortingen en aanbiedingen voor onze lezers",
        },
      },
      cta: "Klaar om te beginnen? Bekijk onze populairste platformen:",
      ctaButton: "Bekijk Alle Platforms",
      footer: {
        reason: "Je ontvangt deze email omdat je je hebt aangemeld voor de SkillLinkup nieuwsbrief.",
        unsubscribeIntro: "Wil je geen emails meer ontvangen?",
        unsubscribe: "Uitschrijven",
        copyright: "Alle rechten voorbehouden.",
      },
    },
  },
  newsletter: {
    en: {
      defaultPreview: "The latest freelance tips and platform reviews",
      defaultHeroTitle: "SkillLinkup Weekly",
      defaultHeroSubtitle: "Your weekly dose of freelance inspiration",
      defaultIntro: "Hi! Here's your weekly update with the best freelance tips, platform news, and exclusive insights.",
      sections: {
        featuredArticles: "Featured Articles",
        platformSpotlight: "Platform Spotlight",
        tipOfTheWeek: "Tip of the Week",
      },
      readMore: "Read more →",
      viewPlatform: "View Platform",
      contactCta: "Have a question or suggestion for the newsletter?",
      contactButton: "Get in Touch",
      footer: {
        receivingAt: "You're receiving this email at",
        because: "because you signed up for the SkillLinkup newsletter.",
        unsubscribe: "Unsubscribe",
        preferences: "Manage preferences",
        copyright: "All rights reserved.",
      },
      dateLocale: "en-US",
      dateOptions: {
        weekday: "long" as const,
        year: "numeric" as const,
        month: "long" as const,
        day: "numeric" as const,
      },
    },
    nl: {
      defaultPreview: "De nieuwste freelance tips en platform reviews",
      defaultHeroTitle: "SkillLinkup Weekly",
      defaultHeroSubtitle: "Je wekelijkse dosis freelance inspiratie",
      defaultIntro: "Hoi! Hier is je wekelijkse update met de beste freelance tips, platform nieuws en exclusieve inzichten.",
      sections: {
        featuredArticles: "Uitgelichte Artikelen",
        platformSpotlight: "Platform Spotlight",
        tipOfTheWeek: "Tip van de Week",
      },
      readMore: "Lees meer →",
      viewPlatform: "Bekijk Platform",
      contactCta: "Heb je een vraag of suggestie voor de nieuwsbrief?",
      contactButton: "Neem Contact Op",
      footer: {
        receivingAt: "Je ontvangt deze email op",
        because: "omdat je je hebt aangemeld voor de SkillLinkup nieuwsbrief.",
        unsubscribe: "Uitschrijven",
        preferences: "Voorkeuren aanpassen",
        copyright: "Alle rechten voorbehouden.",
      },
      dateLocale: "nl-NL",
      dateOptions: {
        weekday: "long" as const,
        year: "numeric" as const,
        month: "long" as const,
        day: "numeric" as const,
      },
    },
  },
} as const;

// Helper function to get translations
export function getWelcomeTranslations(locale: Locale) {
  return translations.welcome[locale] || translations.welcome.en;
}

export function getNewsletterTranslations(locale: Locale) {
  return translations.newsletter[locale] || translations.newsletter.en;
}
