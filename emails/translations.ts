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

  // ── Marketplace email translations ──

  contactAdmin: {
    en: {
      preview: "New contact form submission on SkillLinkup",
      heroTitle: "New Contact Form Message",
      heroSubtitle: "Someone reached out via the contact form",
      nameLabel: "Name",
      emailLabel: "Email",
      subjectLabel: "Subject",
      messageLabel: "Message",
      noSubject: "No subject",
      replyHint: "Reply directly to this email to respond.",
    },
    nl: {
      preview: "Nieuw contactformulier bericht op SkillLinkup",
      heroTitle: "Nieuw Contactformulier Bericht",
      heroSubtitle: "Iemand heeft contact opgenomen via het formulier",
      nameLabel: "Naam",
      emailLabel: "E-mail",
      subjectLabel: "Onderwerp",
      messageLabel: "Bericht",
      noSubject: "Geen onderwerp",
      replyHint: "Beantwoord deze email direct om te reageren.",
    },
  },

  contactConfirmation: {
    en: {
      preview: "We received your message - SkillLinkup",
      heroTitle: "We received your message!",
      heroSubtitle: "We'll get back to you as soon as possible",
      greeting: "Hi {name},",
      thankYou: "Thanks for reaching out to us! We've received your message and will get back to you as soon as possible.",
      yourMessage: "Your message:",
      ctaButton: "Visit SkillLinkup",
      signOff: "Best regards,",
      team: "The SkillLinkup Team",
    },
    nl: {
      preview: "We hebben je bericht ontvangen - SkillLinkup",
      heroTitle: "We hebben je bericht ontvangen!",
      heroSubtitle: "We nemen zo snel mogelijk contact met je op",
      greeting: "Hoi {name},",
      thankYou: "Bedankt voor je bericht! We hebben het ontvangen en nemen zo snel mogelijk contact met je op.",
      yourMessage: "Jouw bericht:",
      ctaButton: "Bezoek SkillLinkup",
      signOff: "Met vriendelijke groet,",
      team: "Het SkillLinkup Team",
    },
  },

  orderConfirmation: {
    en: {
      preview: "Your order has been confirmed - SkillLinkup",
      heroTitle: "Order Confirmed!",
      heroSubtitle: "Your order has been placed successfully",
      greeting: "Hi {name},",
      body: "Your order has been placed successfully. The freelancer will start working on it shortly.",
      orderLabel: "Order",
      serviceLabel: "Service",
      amountLabel: "Amount",
      deliveryLabel: "Estimated Delivery",
      days: "days",
      ctaButton: "View Your Order",
    },
    nl: {
      preview: "Je bestelling is bevestigd - SkillLinkup",
      heroTitle: "Bestelling Bevestigd!",
      heroSubtitle: "Je bestelling is succesvol geplaatst",
      greeting: "Hoi {name},",
      body: "Je bestelling is succesvol geplaatst. De freelancer gaat er binnenkort mee aan de slag.",
      orderLabel: "Bestelling",
      serviceLabel: "Dienst",
      amountLabel: "Bedrag",
      deliveryLabel: "Geschatte Levering",
      days: "dagen",
      ctaButton: "Bekijk Je Bestelling",
    },
  },

  newOrder: {
    en: {
      preview: "You have a new order - SkillLinkup",
      heroTitle: "New Order!",
      heroSubtitle: "A client has placed an order for your service",
      greeting: "Hi {name},",
      body: "Great news! You have a new order. Please start working on it as soon as possible.",
      orderLabel: "Order",
      serviceLabel: "Service",
      amountLabel: "Earnings",
      deliveryLabel: "Delivery Deadline",
      days: "days",
      ctaButton: "View Order Details",
    },
    nl: {
      preview: "Je hebt een nieuwe bestelling - SkillLinkup",
      heroTitle: "Nieuwe Bestelling!",
      heroSubtitle: "Een klant heeft een bestelling geplaatst voor je dienst",
      greeting: "Hoi {name},",
      body: "Goed nieuws! Je hebt een nieuwe bestelling. Ga er zo snel mogelijk mee aan de slag.",
      orderLabel: "Bestelling",
      serviceLabel: "Dienst",
      amountLabel: "Verdiensten",
      deliveryLabel: "Leverdeadline",
      days: "dagen",
      ctaButton: "Bekijk Besteldetails",
    },
  },

  paymentFailed: {
    en: {
      preview: "Your payment could not be processed - SkillLinkup",
      heroTitle: "Payment Failed",
      heroSubtitle: "There was an issue with your payment",
      greeting: "Hi {name},",
      body: "Unfortunately, your payment for \"{title}\" could not be processed. This can happen due to insufficient funds, an expired card, or a temporary bank issue.",
      ctaButton: "Try Again",
    },
    nl: {
      preview: "Je betaling kon niet worden verwerkt - SkillLinkup",
      heroTitle: "Betaling Mislukt",
      heroSubtitle: "Er was een probleem met je betaling",
      greeting: "Hoi {name},",
      body: "Helaas kon je betaling voor \"{title}\" niet worden verwerkt. Dit kan komen door onvoldoende saldo, een verlopen kaart of een tijdelijk bankprobleem.",
      ctaButton: "Probeer Opnieuw",
    },
  },

  orderDelivered: {
    en: {
      preview: "Your order has been delivered - SkillLinkup",
      heroTitle: "Your Order Has Been Delivered",
      heroSubtitle: "The freelancer has completed the work",
      greeting: "Hi {name},",
      body: "The freelancer has delivered your order. Please review the delivery and approve it if you're satisfied.",
      orderLabel: "Order",
      serviceLabel: "Service",
      ctaButton: "Review Delivery",
    },
    nl: {
      preview: "Je bestelling is geleverd - SkillLinkup",
      heroTitle: "Je Bestelling Is Geleverd",
      heroSubtitle: "De freelancer heeft het werk afgerond",
      greeting: "Hoi {name},",
      body: "De freelancer heeft je bestelling geleverd. Bekijk de levering en keur deze goed als je tevreden bent.",
      orderLabel: "Bestelling",
      serviceLabel: "Dienst",
      ctaButton: "Bekijk Levering",
    },
  },

  orderCompleted: {
    en: {
      preview: "Payment has been released - SkillLinkup",
      heroTitle: "Payment Released!",
      heroSubtitle: "The client approved your delivery",
      greeting: "Hi {name},",
      body: "Great news! The client has approved your delivery and payment has been released to your account.",
      orderLabel: "Order",
      serviceLabel: "Service",
      earningsLabel: "Earnings",
      ctaButton: "View Earnings",
    },
    nl: {
      preview: "Betaling is vrijgegeven - SkillLinkup",
      heroTitle: "Betaling Vrijgegeven!",
      heroSubtitle: "De klant heeft je levering goedgekeurd",
      greeting: "Hoi {name},",
      body: "Goed nieuws! De klant heeft je levering goedgekeurd en de betaling is vrijgegeven naar je account.",
      orderLabel: "Bestelling",
      serviceLabel: "Dienst",
      earningsLabel: "Verdiensten",
      ctaButton: "Bekijk Verdiensten",
    },
  },

  reviewReceived: {
    en: {
      preview: "You received a new review - SkillLinkup",
      greeting: "Hi {name},",
      body: "You received a new review for your order \"{title}\".",
      ratingLabel: "Rating",
      ctaButton: "View Review",
    },
    nl: {
      preview: "Je hebt een nieuwe review ontvangen - SkillLinkup",
      greeting: "Hoi {name},",
      body: "Je hebt een nieuwe review ontvangen voor je bestelling \"{title}\".",
      ratingLabel: "Beoordeling",
      ctaButton: "Bekijk Review",
    },
  },

  newBid: {
    en: {
      preview: "New bid on your project - SkillLinkup",
      heroTitle: "New Bid Received",
      heroSubtitle: "A freelancer is interested in your project",
      greeting: "Hi {name},",
      body: "{freelancer} placed a bid on your project \"{title}\".",
      projectLabel: "Project",
      bidAmountLabel: "Bid Amount",
      deliveryLabel: "Delivery",
      freelancerLabel: "Freelancer",
      days: "days",
      ctaButton: "View Bids",
    },
    nl: {
      preview: "Nieuw bod op je project - SkillLinkup",
      heroTitle: "Nieuw Bod Ontvangen",
      heroSubtitle: "Een freelancer is geïnteresseerd in je project",
      greeting: "Hoi {name},",
      body: "{freelancer} heeft een bod geplaatst op je project \"{title}\".",
      projectLabel: "Project",
      bidAmountLabel: "Bod Bedrag",
      deliveryLabel: "Levering",
      freelancerLabel: "Freelancer",
      days: "dagen",
      ctaButton: "Bekijk Biedingen",
    },
  },

  bidAccepted: {
    en: {
      preview: "Your bid was accepted - SkillLinkup",
      heroTitle: "Your Bid Was Accepted!",
      heroSubtitle: "Congratulations! You got the project",
      greeting: "Congratulations {name}!",
      body: "Your bid on \"{title}\" has been accepted. An order has been created and you can start working.",
      projectLabel: "Project",
      amountLabel: "Agreed Amount",
      ctaButton: "View Order",
    },
    nl: {
      preview: "Je bod is geaccepteerd - SkillLinkup",
      heroTitle: "Je Bod Is Geaccepteerd!",
      heroSubtitle: "Gefeliciteerd! Je hebt het project binnen",
      greeting: "Gefeliciteerd {name}!",
      body: "Je bod op \"{title}\" is geaccepteerd. Er is een bestelling aangemaakt en je kunt aan de slag.",
      projectLabel: "Project",
      amountLabel: "Afgesproken Bedrag",
      ctaButton: "Bekijk Bestelling",
    },
  },

  bidRejected: {
    en: {
      preview: "Update on your bid - SkillLinkup",
      greeting: "Hi {name},",
      body: "The client has selected another freelancer for \"{title}\". Don't worry — there are plenty of other opportunities waiting for you!",
      ctaButton: "Browse Projects",
    },
    nl: {
      preview: "Update over je bod - SkillLinkup",
      greeting: "Hoi {name},",
      body: "De klant heeft een andere freelancer gekozen voor \"{title}\". Geen zorgen — er zijn genoeg andere mogelijkheden die op je wachten!",
      ctaButton: "Bekijk Projecten",
    },
  },

  newMessage: {
    en: {
      preview: "New message from {sender} - SkillLinkup",
      greeting: "Hi {name},",
      body: "You have a new message from {sender}:",
      ctaButton: "Read Message",
    },
    nl: {
      preview: "Nieuw bericht van {sender} - SkillLinkup",
      greeting: "Hoi {name},",
      body: "Je hebt een nieuw bericht van {sender}:",
      ctaButton: "Lees Bericht",
    },
  },
} as const;

// Helper functions to get translations
export function getWelcomeTranslations(locale: Locale) {
  return translations.welcome[locale] || translations.welcome.en;
}

export function getNewsletterTranslations(locale: Locale) {
  return translations.newsletter[locale] || translations.newsletter.en;
}

export function getContactAdminTranslations(locale: Locale) {
  return translations.contactAdmin[locale] || translations.contactAdmin.en;
}

export function getContactConfirmationTranslations(locale: Locale) {
  return translations.contactConfirmation[locale] || translations.contactConfirmation.en;
}

export function getOrderConfirmationTranslations(locale: Locale) {
  return translations.orderConfirmation[locale] || translations.orderConfirmation.en;
}

export function getNewOrderTranslations(locale: Locale) {
  return translations.newOrder[locale] || translations.newOrder.en;
}

export function getPaymentFailedTranslations(locale: Locale) {
  return translations.paymentFailed[locale] || translations.paymentFailed.en;
}

export function getOrderDeliveredTranslations(locale: Locale) {
  return translations.orderDelivered[locale] || translations.orderDelivered.en;
}

export function getOrderCompletedTranslations(locale: Locale) {
  return translations.orderCompleted[locale] || translations.orderCompleted.en;
}

export function getReviewReceivedTranslations(locale: Locale) {
  return translations.reviewReceived[locale] || translations.reviewReceived.en;
}

export function getNewBidTranslations(locale: Locale) {
  return translations.newBid[locale] || translations.newBid.en;
}

export function getBidAcceptedTranslations(locale: Locale) {
  return translations.bidAccepted[locale] || translations.bidAccepted.en;
}

export function getBidRejectedTranslations(locale: Locale) {
  return translations.bidRejected[locale] || translations.bidRejected.en;
}

export function getNewMessageTranslations(locale: Locale) {
  return translations.newMessage[locale] || translations.newMessage.en;
}
