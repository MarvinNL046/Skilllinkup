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

interface WaitlistWelcomeEmailProps {
  name?: string;
  skill?: string;
  userType?: string;
  locale?: 'en' | 'nl';
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

const COPY = {
  en: {
    preview: "You're on the waitlist — here's what happens next.",
    heroTitle: "You're on the list",
    heroSubtitle:
      "Thanks for trusting us with your email while we're still building.",
    greetingNamed: (n: string) => `Hi ${n},`,
    greetingAnon: 'Hi there,',
    honestIntro:
      "Quick honesty: SkillLinkup is not live yet. We're building the network first — both the platform and the community of freelancers and clients who'll make it work from day one.",
    skillAckWithSkill: (s: string) =>
      `You told us you want to offer "${s}" — we'll keep that in mind while we prioritise which categories to launch first.`,
    skillAckFreelancer:
      "You signed up as a freelancer — we're stacking your category in our priority list as more people join.",
    skillAckClient:
      "You signed up as a client — we'll let you know as soon as we have freelancers live in your area.",
    whatHappens:
      "As soon as we hit the critical mass we need to make the platform work well on day one, you'll get a launch email from us. No marketing blasts in between.",
    helpUsOut:
      "If you know one person who'd want to be on this list — a freelancer friend, a client who keeps asking for recommendations — forwarding this email is the single most useful thing you can do for us right now.",
    signOff: '— The SkillLinkup team',
    footerReason:
      "You're receiving this because you signed up for the SkillLinkup waitlist.",
    unsubscribeIntro: "Changed your mind?",
    unsubscribe: "Unsubscribe",
    copyright: 'All rights reserved.',
  },
  nl: {
    preview: 'Je staat op de wachtlijst — hier is wat er nu gebeurt.',
    heroTitle: 'Je staat op de lijst',
    heroSubtitle:
      "Bedankt voor je vertrouwen. We zijn volop aan het bouwen.",
    greetingNamed: (n: string) => `Hoi ${n},`,
    greetingAnon: 'Hoi,',
    honestIntro:
      'Even eerlijk: SkillLinkup is nog niet live. We bouwen eerst het netwerk — zowel het platform als de community van freelancers en opdrachtgevers die vanaf dag 1 het verschil moeten maken.',
    skillAckWithSkill: (s: string) =>
      `Je gaf aan dat je "${s}" wil aanbieden — we houden daar rekening mee als we prioriteren welke categorieën als eerste live gaan.`,
    skillAckFreelancer:
      'Je hebt je aangemeld als freelancer — we zetten jouw categorie hoger op de prioriteitslijst naarmate er meer mensen bijkomen.',
    skillAckClient:
      'Je hebt je aangemeld als opdrachtgever — zodra er freelancers in jouw buurt live zijn, laten we het weten.',
    whatHappens:
      'Zodra we de kritische massa hebben bereikt om het platform op dag 1 goed te laten draaien, krijg je een lanceer-email van ons. Tussendoor geen marketing-mails.',
    helpUsOut:
      'Kent iemand die ook op deze lijst hoort — een freelancer-vriend, een opdrachtgever die altijd om aanbevelingen vraagt? Deze mail doorsturen is het nuttigste wat je voor ons kunt doen op dit moment.',
    signOff: '— Het SkillLinkup team',
    footerReason: 'Je ontvangt deze mail omdat je je hebt aangemeld voor de SkillLinkup wachtlijst.',
    unsubscribeIntro: 'Toch van gedachten veranderd?',
    unsubscribe: 'Uitschrijven',
    copyright: 'Alle rechten voorbehouden.',
  },
};

export const WaitlistWelcomeEmail = ({
  name,
  skill,
  userType,
  locale = 'en',
}: WaitlistWelcomeEmailProps) => {
  const t = COPY[locale] ?? COPY.en;
  const localePath = locale === 'nl' ? '/nl' : '/en';
  const greeting = name ? t.greetingNamed(name) : t.greetingAnon;

  let skillAck = '';
  if (skill) {
    skillAck = t.skillAckWithSkill(skill);
  } else if (userType === 'freelancer') {
    skillAck = t.skillAckFreelancer;
  } else if (userType === 'client') {
    skillAck = t.skillAckClient;
  }

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src={`${baseUrl}/images/logo/logo-black.png`}
              width="180"
              height="40"
              alt="SkillLinkup"
              style={logo}
            />
          </Section>

          <Section style={heroSection}>
            <Heading style={heroTitle}>{t.heroTitle}</Heading>
            <Text style={heroSubtitle}>{t.heroSubtitle}</Text>
          </Section>

          <Section style={contentSection}>
            <Text style={paragraph}>{greeting}</Text>
            <Text style={paragraph}>{t.honestIntro}</Text>
            {skillAck ? <Text style={paragraph}>{skillAck}</Text> : null}
            <Text style={paragraph}>{t.whatHappens}</Text>
            <Text style={paragraph}>{t.helpUsOut}</Text>
            <Text style={paragraph}>{t.signOff}</Text>
          </Section>

          <Hr style={divider} />

          <Section style={footer}>
            <Text style={footerText}>{t.footerReason}</Text>
            <Text style={unsubscribe}>
              {t.unsubscribeIntro}{' '}
              <Link
                href={`${baseUrl}${localePath}/unsubscribe`}
                style={unsubscribeLink}
              >
                {t.unsubscribe}
              </Link>
            </Text>
            <Text style={copyright}>
              &copy; {new Date().getFullYear()} SkillLinkup. {t.copyright}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main: React.CSSProperties = {
  backgroundColor: '#f8f9fb',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
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
  padding: '40px 32px',
  textAlign: 'center' as const,
};
const heroTitle: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 700,
  lineHeight: '1.2',
  margin: '0 0 12px 0',
};
const heroSubtitle: React.CSSProperties = {
  color: 'rgba(255,255,255,0.9)',
  fontSize: '16px',
  lineHeight: '1.5',
  margin: 0,
};
const contentSection: React.CSSProperties = { padding: '32px 32px 8px 32px' };
const paragraph: React.CSSProperties = {
  color: '#1e1541',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px 0',
};
const divider: React.CSSProperties = {
  borderColor: '#e5e7eb',
  borderStyle: 'solid',
  borderWidth: '1px 0 0 0',
  margin: 0,
};
const footer: React.CSSProperties = {
  backgroundColor: '#f8f9fb',
  padding: '32px',
  textAlign: 'center' as const,
};
const footerText: React.CSSProperties = {
  color: '#64607d',
  fontSize: '13px',
  lineHeight: '1.5',
  margin: '0 0 12px 0',
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
  margin: 0,
};

export default WaitlistWelcomeEmail;
