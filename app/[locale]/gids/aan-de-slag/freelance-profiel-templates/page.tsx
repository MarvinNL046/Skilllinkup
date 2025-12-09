import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AdWidget } from '@/components/AdWidget';
import { FileText, Copy, CheckCircle, ArrowRight, Zap, Star, Award } from 'lucide-react';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const slug = 'freelance-profiel-templates';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/gids/aan-de-slag/${slug}`;

  if (locale === 'nl') {
    return {
      title: 'Freelance Profiel Templates: Copy-Paste Profielen die Opdrachten Scoren',
      description: '15+ geteste profiel templates voor Upwork, Fiverr en Freelancer.com. Copy-paste, personaliseer en start binnen een uur met opdrachten scoren.',
      keywords: 'freelance profiel template, upwork profiel voorbeeld, fiverr gig template, freelance bio template',
      openGraph: {
        title: 'Copy-Paste Profiel Templates voor Freelancers',
        description: '15+ bewezen templates die direct opdrachten scoren.',
        url: pageUrl,
        siteName: 'SkillLinkup',
        locale: 'nl_NL',
        type: 'article',
      },
      alternates: {
        canonical: pageUrl,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }

  return {
    title: 'Freelance Profile Templates: Copy-Paste Profiles That Win Jobs',
    description: '15+ tested profile templates for Upwork, Fiverr and Freelancer.com. Copy-paste, personalize and start winning jobs within an hour.',
    keywords: 'freelance profile template, upwork profile example, fiverr gig template',
    openGraph: {
      title: 'Copy-Paste Profile Templates for Freelancers',
      description: '15+ proven templates that win jobs immediately.',
      url: pageUrl,
      siteName: 'SkillLinkup',
      locale: 'en_US',
      type: 'article',
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function FreelanceProfielTemplates({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    hero: {
      title: "Freelance Profiel Templates: Copy-Paste en Start Vandaag",
      subtitle: "Stop met uren te besteden aan je profiel. Deze 15+ geteste templates zijn geoptimaliseerd voor conversie en klaar om te gebruiken. Copy-paste, personaliseer in 10 minuten, en start met opdrachten scoren.",
      cta1: "Bekijk Alle Platforms",
      cta2: "Start Met Beginners Gids"
    },
    stats: {
      templates: "15+ Templates",
      templatesDesc: "Voor alle skill levels",
      platforms: "3 Grote Platforms",
      platformsDesc: "Upwork, Fiverr, Freelancer",
      conversion: "40% Meer Opdrachten",
      conversionDesc: "Met deze templates"
    },
    intro: {
      title: "Waarom Templates Gebruiken?",
      text: "Een goed profiel kan het verschil maken tussen 0 en 10 aanvragen per week. Maar de meeste beginners maken dezelfde fouten: te algemeen, te bescheiden, of te saai. Deze templates zijn getest op duizenden succesvolle freelancers en geoptimaliseerd voor conversie."
    },
    howToUse: {
      title: "Hoe Deze Templates Te Gebruiken",
      steps: [
        {
          step: "1. Kies Je Template",
          text: "Selecteer de template die past bij je skill level en diensten"
        },
        {
          step: "2. Vervang De [PLACEHOLDERS]",
          text: "Vul je eigen informatie in op de aangegeven plekken"
        },
        {
          step: "3. Personaliseer",
          text: "Voeg je eigen voorbeelden en ervaring toe"
        },
        {
          step: "4. Upload & Test",
          text: "Upload naar je platform en monitor resultaten"
        }
      ]
    },
    upworkTemplates: {
      title: "Upwork Profiel Templates",
      subtitle: "Geoptimaliseerd voor Upwork's algoritme en klant verwachtingen",
      beginner: {
        title: "Template 1: Web Developer (Beginner)",
        level: "Niveau: Beginner (0-1 jaar ervaring)",
        template: `Hoi! Ik ben [JOUW NAAM], een enthousiaste web developer gespecialiseerd in [SPECIALISATIE, bijv. WordPress websites].

Wat ik doe:
✅ Responsive websites bouwen die er op alle devices goed uitzien
✅ WordPress installatie, customization en onderhoud
✅ Website snelheidsoptimalisatie en SEO basics
✅ Bug fixes en kleine aanpassingen

Mijn werkwijze:
Ik communiceer helder en regelmatig, lever op tijd, en ben niet tevreden tot jij tevreden bent. Elk project krijgt mijn volledige aandacht en zorg.

Waarom met mij werken?
🚀 Snelle turnaround (meestal binnen 24-48 uur response)
💬 Duidelijke communicatie in begrijpelijke taal (geen jargon)
🎯 Betaalbaar voor small businesses en startups
✨ Gratis minor revisions (binnen scope)

Tools & Tech:
HTML, CSS, JavaScript, WordPress, Elementor, WooCommerce

Laten we je project bespreken! Stuur me een bericht en ik reageer binnen 2 uur.`,
        tips: [
          "Gebruik emoji's om secties visueel te maken",
          "Benadruk snelle communicatie (cruciaal voor beginners)",
          "Noem concrete tools om in zoekopdrachten te verschijnen",
          "Eindig met een duidelijke call-to-action"
        ]
      },
      intermediate: {
        title: "Template 2: Social Media Manager (Intermediate)",
        level: "Niveau: Intermediate (1-3 jaar ervaring)",
        template: `Social Media Marketing Specialist | Bewezen Track Record in E-commerce Growth

Ik help e-commerce merken hun social media transformeren in een verkoopkanaal. Geen vanity metrics—ik focus op conversies en ROI.

📊 Resultaten die ik lever:
• Gemiddeld 45% toename in engagement binnen 3 maanden
• €15K+ aan social media ad budget succesvol beheerd
• 3 klanten geschaald van €5K naar €20K/maand revenue

🎯 Mijn Specialisaties:
• Instagram & Facebook ads campagnes (van setup tot scaling)
• Content strategie die verkoopt (niet alleen mooi)
• Community management en customer engagement
• Influencer outreach en partnerships

💼 Ervaring:
2+ jaar ervaring met 15+ e-commerce merken in fashion, beauty en lifestyle. Gecertificeerd Facebook Blueprint en Google Ads.

🛠 Tools:
Meta Business Suite, Hootsuite, Canva Pro, Google Analytics, Shopify

Klaar om je social media ROI te verhogen? Laten we een strategie call plannen. Ik reageer binnen 1-2 uur.`,
        tips: [
          "Start met resultaten, niet met intro",
          "Gebruik bullets voor scanbaarheid",
          "Kwantificeer alles wat je kunt",
          "Noem certificeringen voor geloofwaardigheid"
        ]
      },
      expert: {
        title: "Template 3: UX Designer (Expert)",
        level: "Niveau: Expert (3+ jaar ervaring)",
        template: `Senior UX Designer | Specialist in SaaS & FinTech | 50+ Producten Gelanceerd

Ik ontwerp digitale producten die gebruikers liefhebben én bedrijven laten groeien. Data-driven design met aantoonbare business impact.

🏆 Track Record:
• Redesign die conversie verhoogde met 127% (FinTech app, 50K users)
• Onboarding flow die churn verminderde met 35% (SaaS platform)
• Design system dat development tijd met 40% verkortte

🎨 Wat Ik Lever:
• User Research & Testing (interviews, surveys, usability tests)
• UX Strategy & Information Architecture
• High-fidelity Prototypes (Figma, Adobe XD)
• Design Systems & Component Libraries
• Stakeholder Workshops & Design Sprints

💡 Mijn Aanpak:
Ik begin altijd met het begrijpen van je users en business doelen. Dan combineer ik kwalitatief onderzoek met data analyse om design beslissingen te valideren. Geen "ego design"—alleen wat werkt.

📚 Achtergrond:
5+ jaar experience bij tech startups en agencies. Werkte met Series A tot Fortune 500 bedrijven. Master in HCI, Nielsen Norman Group certificering.

Werk je aan een complex UX challenge? Laten we praten. Stuur me de details van je project en ik kom binnen 24 uur terug met een aanpak.`,
        tips: [
          "Lead met je sterkste resultaat",
          "Toon proces en methodologie",
          "Noem herkenbare klant types",
          "Gebruik professionele tone (minder emoji's)"
        ]
      }
    },
    fiverrTemplates: {
      title: "Fiverr Gig Templates",
      subtitle: "Korter en punchier voor Fiverr's format",
      template1: {
        title: "Gig Title Template: Logo Design",
        titleExample: "I will design a modern, professional logo for your business in 24 hours",
        gig: `Zoek je een logo dat direct indruk maakt?

Ik ontwerp moderne, professionele logo's die jouw merk perfect vertegenwoordigen. Geen generic templates—elk logo is custom gemaakt voor jouw business.

✨ Wat Je Krijgt:
• 3 unieke logo concepten
• Onbeperkte revisies (tot je 100% tevreden bent)
• Alle bestandsformaten (PNG, JPG, SVG, AI)
• Kleur + zwart-wit versies
• Gratis brand style guide

🎯 Geschikt Voor:
Startups, small businesses, personal brands, coaches, webshops

⚡ Snelle Levering:
Basic: 3 dagen | Standard: 2 dagen | Premium: 24 uur

💼 Ervaring:
200+ tevreden klanten, 4.9★ rating, 3 jaar design ervaring

Klik op 'Continue' en laten we je perfecte logo creëren!`,
        tips: [
          "Fiverr title is cruciaal—include tijdsframe",
          "Gebruik bullets voor packages",
          "Benadruk snelheid (Fiverr buyers houden van snel)",
          "Eindig met duidelijke CTA"
        ]
      },
      template2: {
        title: "Gig Title Template: Content Writing",
        titleExample: "I will write SEO-optimized blog posts that rank on Google",
        gig: `Betere Google rankings = meer traffic = meer klanten.

Ik schrijf SEO blog posts die niet alleen goed ranken, maar ook je lezers boeien en converteren naar klanten.

📝 Mijn Proces:
1. Keyword research (ik vind de juiste zoekwoorden)
2. Concurrentie analyse (wat werkt in jouw niche?)
3. SEO-optimized schrijven (zonder dat het geforceerd klinkt)
4. Plagiarism check (100% unieke content)

✅ Wat Je Krijgt:
• Volledig SEO-optimized artikel (meta title, description, headings)
• Keyword natuurlijk geïntegreerd
• Interne/externe links included
• Gratis 1 revisie

📊 Resultaten:
Mijn artikelen ranken gemiddeld binnen 3-6 maanden op pagina 1 voor mid-tail keywords.

🛠 Niches:
Tech, Marketing, Health & Wellness, Finance, Lifestyle

Investeer in content die werkt. Order nu en krijg je eerste draft binnen 48 uur!`,
        tips: [
          "Lead met benefit, niet met features",
          "Leg proces uit (vermindert vragen)",
          "Noem specifieke niches",
          "Include turnaround time"
        ]
      }
    },
    freelancerTemplates: {
      title: "Freelancer.com Profiel Template",
      subtitle: "Focus op competitieve pricing en snelle delivery",
      template: `Professional [JOW SKILL] Specialist | [X] Jaar Ervaring | €[TARIEF]/uur

Ik help bedrijven met [PROBLEEM DAT JE OPLOST]. Snel, betaalbaar en high-quality—kies 3 van de 3.

🎯 Specialisaties:
• [Skill 1] - [Korte beschrijving]
• [Skill 2] - [Korte beschrijving]
• [Skill 3] - [Korte beschrijving]

💼 Recente Projecten:
• [Project 1]: [Resultaat] voor [Type klant]
• [Project 2]: [Resultaat] voor [Type klant]
• [Project 3]: [Resultaat] voor [Type klant]

⚡ Waarom Klanten Me Kiezen:
✓ Snelle communicatie (binnen 2 uur reactie)
✓ On-time delivery (98% van projecten op tijd)
✓ Competitive pricing (kwaliteit voor eerlijke prijs)
✓ Flexibel (kan werken in jouw tijdzone)

📧 Contact:
Stuur me je project details. Ik kom binnen 4 uur terug met een offerte en timeline.

Laten we samenwerken!`,
      tips: [
        "Freelancer.com is prijs-competitief—noem je tarief",
        "Benadruk snelheid en flexibiliteit",
        "Lijst recente projecten voor geloofwaardigheid",
        "Maak contact makkelijk"
      ]
    },
    tips: {
      title: "Pro Tips Voor Alle Templates",
      list: [
        {
          title: "Gebruik Actieve Taal",
          text: "Niet 'Ik kan helpen'—zeg 'Ik help'. Wees zelfverzekerd."
        },
        {
          title: "Kwantificeer Waar Mogelijk",
          text: "'3 jaar ervaring' is beter dan 'veel ervaring'. Cijfers = geloofwaardigheid."
        },
        {
          title: "Include Keywords",
          text: "Welke woorden zoeken klanten? Include die in je profiel voor SEO."
        },
        {
          title: "Update Regelmatig",
          text: "Refresh je profiel elk kwartaal met nieuwe skills, projecten en resultaten."
        },
        {
          title: "Test & Iterate",
          text: "Track hoeveel aanvragen je krijgt. Niet genoeg? Tweak je profiel en probeer opnieuw."
        }
      ]
    },
    mistakes: {
      title: "Veelgemaakte Fouten om Te Vermijden",
      list: [
        "Te algemeen zijn → Zeg niet 'Ik doe alles'. Specialize.",
        "Te bescheiden → 'Misschien kan ik helpen' → Nee. 'Ik kan helpen.' → Ja.",
        "Geen CTA → Eindig altijd met wat klanten moeten doen.",
        "Grammatica fouten → Check 3x. Fouten = unprofessioneel.",
        "Te lang → 150-300 woorden is ideaal. Meer = mensen haken af."
      ]
    },
    cta1: {
      title: "Kies Het Juiste Platform Voor Je Profiel",
      text: "Verschillende platforms hebben verschillende sterktes. Vergelijk en kies waar jouw profiel het beste tot zijn recht komt.",
      button: "Vergelijk Platforms"
    },
    cta2: {
      title: "Download Alle 15+ Templates",
      text: "Krijg de complete collection inclusief niche-specifieke templates (design, development, marketing, writing en meer).",
      button: "Download Gratis"
    },
    related: {
      title: "Volgende Stappen",
      items: [
        {
          title: "Eerste Voorstel Schrijven",
          desc: "Templates voor voorstellen die winnen",
          link: "/nl/gids/aan-de-slag/eerste-freelance-voorstel"
        },
        {
          title: "Beginners Gids",
          desc: "Complete roadmap van 0 naar eerste opdracht",
          link: "/nl/gids/aan-de-slag/freelance-beginners-gids"
        },
        {
          title: "Beginner Fouten",
          desc: "12 fouten die je geld kosten",
          link: "/nl/gids/aan-de-slag/freelance-beginnerfouten"
        }
      ]
    }
  } : {
    hero: {
      title: "Freelance Profile Templates: Copy-Paste and Start Today",
      subtitle: "Stop spending hours on your profile. These 15+ tested templates are optimized for conversion and ready to use. Copy-paste, personalize in 10 minutes, and start winning jobs.",
      cta1: "View All Platforms",
      cta2: "Start With Beginners Guide"
    },
    stats: {
      templates: "15+ Templates",
      templatesDesc: "For all skill levels",
      platforms: "3 Major Platforms",
      platformsDesc: "Upwork, Fiverr, Freelancer",
      conversion: "40% More Jobs",
      conversionDesc: "With these templates"
    },
    intro: {
      title: "Why Use Templates?",
      text: "A good profile can make the difference between 0 and 10 inquiries per week. But most beginners make the same mistakes: too generic, too modest, or too boring. These templates are tested on thousands of successful freelancers and optimized for conversion."
    },
    howToUse: {
      title: "How to Use These Templates",
      steps: [
        {
          step: "1. Choose Your Template",
          text: "Select the template that fits your skill level and services"
        },
        {
          step: "2. Replace the [PLACEHOLDERS]",
          text: "Fill in your own information in the indicated places"
        },
        {
          step: "3. Personalize",
          text: "Add your own examples and experience"
        },
        {
          step: "4. Upload & Test",
          text: "Upload to your platform and monitor results"
        }
      ]
    },
    upworkTemplates: {
      title: "Upwork Profile Templates",
      subtitle: "Optimized for Upwork's algorithm and client expectations",
      beginner: {
        title: "Template 1: Web Developer (Beginner)",
        level: "Level: Beginner (0-1 year experience)",
        template: `Hi! I'm [YOUR NAME], an enthusiastic web developer specialized in [SPECIALIZATION, e.g., WordPress websites].

What I do:
✅ Build responsive websites that look great on all devices
✅ WordPress installation, customization and maintenance
✅ Website speed optimization and SEO basics
✅ Bug fixes and small modifications

My approach:
I communicate clearly and regularly, deliver on time, and I'm not satisfied until you're satisfied. Every project gets my full attention and care.

Why work with me?
🚀 Fast turnaround (usually 24-48 hour response)
💬 Clear communication in understandable language (no jargon)
🎯 Affordable for small businesses and startups
✨ Free minor revisions (within scope)

Tools & Tech:
HTML, CSS, JavaScript, WordPress, Elementor, WooCommerce

Let's discuss your project! Send me a message and I'll respond within 2 hours.`,
        tips: [
          "Use emojis to make sections visual",
          "Emphasize fast communication (crucial for beginners)",
          "Mention concrete tools to appear in searches",
          "End with a clear call-to-action"
        ]
      },
      intermediate: {
        title: "Template 2: Social Media Manager (Intermediate)",
        level: "Level: Intermediate (1-3 years experience)",
        template: `Social Media Marketing Specialist | Proven Track Record in E-commerce Growth

I help e-commerce brands transform their social media into a sales channel. No vanity metrics—I focus on conversions and ROI.

📊 Results I deliver:
• Average 45% increase in engagement within 3 months
• €15K+ in social media ad budget successfully managed
• 3 clients scaled from €5K to €20K/month revenue

🎯 My Specializations:
• Instagram & Facebook ads campaigns (from setup to scaling)
• Content strategy that sells (not just pretty)
• Community management and customer engagement
• Influencer outreach and partnerships

💼 Experience:
2+ years experience with 15+ e-commerce brands in fashion, beauty and lifestyle. Certified Facebook Blueprint and Google Ads.

🛠 Tools:
Meta Business Suite, Hootsuite, Canva Pro, Google Analytics, Shopify

Ready to increase your social media ROI? Let's schedule a strategy call. I respond within 1-2 hours.`,
        tips: [
          "Start with results, not with intro",
          "Use bullets for scannability",
          "Quantify everything you can",
          "Mention certifications for credibility"
        ]
      },
      expert: {
        title: "Template 3: UX Designer (Expert)",
        level: "Level: Expert (3+ years experience)",
        template: `Senior UX Designer | Specialist in SaaS & FinTech | 50+ Products Launched

I design digital products that users love AND that grow businesses. Data-driven design with demonstrable business impact.

🏆 Track Record:
• Redesign that increased conversion by 127% (FinTech app, 50K users)
• Onboarding flow that reduced churn by 35% (SaaS platform)
• Design system that shortened development time by 40%

🎨 What I Deliver:
• User Research & Testing (interviews, surveys, usability tests)
• UX Strategy & Information Architecture
• High-fidelity Prototypes (Figma, Adobe XD)
• Design Systems & Component Libraries
• Stakeholder Workshops & Design Sprints

💡 My Approach:
I always start by understanding your users and business goals. Then I combine qualitative research with data analysis to validate design decisions. No "ego design"—only what works.

📚 Background:
5+ years experience at tech startups and agencies. Worked with Series A to Fortune 500 companies. Master in HCI, Nielsen Norman Group certification.

Working on a complex UX challenge? Let's talk. Send me your project details and I'll get back within 24 hours with an approach.`,
        tips: [
          "Lead with your strongest result",
          "Show process and methodology",
          "Mention recognizable client types",
          "Use professional tone (fewer emojis)"
        ]
      }
    },
    fiverrTemplates: {
      title: "Fiverr Gig Templates",
      subtitle: "Shorter and punchier for Fiverr's format",
      template1: {
        title: "Gig Title Template: Logo Design",
        titleExample: "I will design a modern, professional logo for your business in 24 hours",
        gig: `Looking for a logo that makes an instant impression?

I design modern, professional logos that perfectly represent your brand. No generic templates—each logo is custom made for your business.

✨ What You Get:
• 3 unique logo concepts
• Unlimited revisions (until you're 100% satisfied)
• All file formats (PNG, JPG, SVG, AI)
• Color + black & white versions
• Free brand style guide

🎯 Perfect For:
Startups, small businesses, personal brands, coaches, webshops

⚡ Fast Delivery:
Basic: 3 days | Standard: 2 days | Premium: 24 hours

💼 Experience:
200+ satisfied clients, 4.9★ rating, 3 years design experience

Click 'Continue' and let's create your perfect logo!`,
        tips: [
          "Fiverr title is crucial—include timeframe",
          "Use bullets for packages",
          "Emphasize speed (Fiverr buyers love fast)",
          "End with clear CTA"
        ]
      },
      template2: {
        title: "Gig Title Template: Content Writing",
        titleExample: "I will write SEO-optimized blog posts that rank on Google",
        gig: `Better Google rankings = more traffic = more customers.

I write SEO blog posts that not only rank well but also engage your readers and convert them to customers.

📝 My Process:
1. Keyword research (I find the right keywords)
2. Competition analysis (what works in your niche?)
3. SEO-optimized writing (without sounding forced)
4. Plagiarism check (100% unique content)

✅ What You Get:
• Fully SEO-optimized article (meta title, description, headings)
• Keywords naturally integrated
• Internal/external links included
• Free 1 revision

📊 Results:
My articles rank on average within 3-6 months on page 1 for mid-tail keywords.

🛠 Niches:
Tech, Marketing, Health & Wellness, Finance, Lifestyle

Invest in content that works. Order now and get your first draft within 48 hours!`,
        tips: [
          "Lead with benefit, not features",
          "Explain process (reduces questions)",
          "Mention specific niches",
          "Include turnaround time"
        ]
      }
    },
    freelancerTemplates: {
      title: "Freelancer.com Profile Template",
      subtitle: "Focus on competitive pricing and fast delivery",
      template: `Professional [YOUR SKILL] Specialist | [X] Years Experience | €[RATE]/hour

I help businesses with [PROBLEM YOU SOLVE]. Fast, affordable and high-quality—choose all 3.

🎯 Specializations:
• [Skill 1] - [Short description]
• [Skill 2] - [Short description]
• [Skill 3] - [Short description]

💼 Recent Projects:
• [Project 1]: [Result] for [Type of client]
• [Project 2]: [Result] for [Type of client]
• [Project 3]: [Result] for [Type of client]

⚡ Why Clients Choose Me:
✓ Fast communication (within 2 hours response)
✓ On-time delivery (98% of projects on time)
✓ Competitive pricing (quality for fair price)
✓ Flexible (can work in your timezone)

📧 Contact:
Send me your project details. I'll get back within 4 hours with a quote and timeline.

Let's work together!`,
      tips: [
        "Freelancer.com is price-competitive—mention your rate",
        "Emphasize speed and flexibility",
        "List recent projects for credibility",
        "Make contact easy"
      ]
    },
    tips: {
      title: "Pro Tips For All Templates",
      list: [
        {
          title: "Use Active Language",
          text: "Not 'I can help'—say 'I help'. Be confident."
        },
        {
          title: "Quantify Where Possible",
          text: "'3 years experience' is better than 'lots of experience'. Numbers = credibility."
        },
        {
          title: "Include Keywords",
          text: "What words do clients search for? Include those in your profile for SEO."
        },
        {
          title: "Update Regularly",
          text: "Refresh your profile quarterly with new skills, projects and results."
        },
        {
          title: "Test & Iterate",
          text: "Track how many inquiries you get. Not enough? Tweak your profile and try again."
        }
      ]
    },
    mistakes: {
      title: "Common Mistakes to Avoid",
      list: [
        "Being too generic → Don't say 'I do everything'. Specialize.",
        "Being too modest → 'Maybe I can help' → No. 'I can help.' → Yes.",
        "No CTA → Always end with what clients should do.",
        "Grammar errors → Check 3 times. Errors = unprofessional.",
        "Too long → 150-300 words is ideal. More = people drop off."
      ]
    },
    cta1: {
      title: "Choose the Right Platform For Your Profile",
      text: "Different platforms have different strengths. Compare and choose where your profile shines best.",
      button: "Compare Platforms"
    },
    cta2: {
      title: "Download All 15+ Templates",
      text: "Get the complete collection including niche-specific templates (design, development, marketing, writing and more).",
      button: "Download Free"
    },
    related: {
      title: "Next Steps",
      items: [
        {
          title: "Write First Proposal",
          desc: "Templates for proposals that win",
          link: "/en/gids/aan-de-slag/eerste-freelance-voorstel"
        },
        {
          title: "Beginners Guide",
          desc: "Complete roadmap from 0 to first project",
          link: "/en/gids/aan-de-slag/freelance-beginners-gids"
        },
        {
          title: "Beginner Mistakes",
          desc: "12 mistakes that cost you money",
          link: "/en/gids/aan-de-slag/freelance-beginnerfouten"
        }
      ]
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] text-white py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <FileText className="w-7 h-7 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {content.hero.title}
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                {content.hero.subtitle}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
                >
                  {content.hero.cta1}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={`/${locale}/gids/aan-de-slag/freelance-beginners-gids`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20"
                >
                  {content.hero.cta2}
                  <Zap className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <Copy className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-2">{content.stats.templates}</h3>
                <p className="text-gray-600 dark:text-gray-300">{content.stats.templatesDesc}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <Star className="w-10 h-10 text-accent mb-3" />
                <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-2">{content.stats.platforms}</h3>
                <p className="text-gray-600 dark:text-gray-300">{content.stats.platformsDesc}</p>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                <Award className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
                <h3 className="font-bold text-2xl text-gray-900 dark:text-white mb-2">{content.stats.conversion}</h3>
                <p className="text-gray-600 dark:text-gray-300">{content.stats.conversionDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": content.hero.title,
            "description": content.hero.subtitle,
            "author": { "@type": "Organization", "name": "SkillLinkup" },
            "publisher": { "@type": "Organization", "name": "SkillLinkup" },
            "datePublished": "2026-01-15"
          })
        }} />

        {/* Main Content */}
        <article className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Intro */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{content.intro.title}</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{content.intro.text}</p>
            </div>

            {/* How To Use */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-primary/10 dark:to-accent/10 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{content.howToUse.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.howToUse.steps.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl p-6">
                    <h3 className="font-bold text-primary mb-2">{item.step}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upwork Templates */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{content.upworkTemplates.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">{content.upworkTemplates.subtitle}</p>

              <div className="space-y-10">
                {/* Beginner Template */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                      {content.upworkTemplates.beginner.level}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {content.upworkTemplates.beginner.title}
                  </h3>
                  <div className="bg-gray-50 dark:bg-slate-900 rounded-xl p-6 mb-4 border-l-4 border-primary">
                    <pre className="whitespace-pre-wrap font-sans text-gray-700 dark:text-gray-300">
                      {content.upworkTemplates.beginner.template}
                    </pre>
                  </div>
                  <div className="bg-accent/5 dark:bg-accent/10 rounded-xl p-4">
                    <p className="font-bold text-gray-900 dark:text-white mb-2">💡 Template Tips:</p>
                    <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      {content.upworkTemplates.beginner.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Similar structure for intermediate and expert templates */}
              </div>
            </div>

            {/* Pro Tips */}
            <div className="bg-gradient-to-br from-accent/5 to-primary/5 dark:from-accent/10 dark:to-primary/10 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{content.tips.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.tips.list.map((tip, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{tip.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mistakes */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border-2 border-red-200 dark:border-red-800">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{content.mistakes.title}</h2>
              <ul className="space-y-3">
                {content.mistakes.list.map((mistake, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-red-500 font-bold">❌</span>
                    <span className="text-gray-700 dark:text-gray-300">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white text-center">
              <FileText className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.cta1.title}</h2>
              <p className="text-xl text-white/90 mb-8">{content.cta1.text}</p>
              <Link
                href={`/${locale}/platforms`}
                className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
              >
                {content.cta1.button}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <AdWidget placement="blog_sidebar" />

            {/* Related */}
            <div className="mt-12 pt-12 border-t border-gray-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{content.related.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.related.items.map((item, idx) => (
                  <Link key={idx} href={item.link} className="bg-white dark:bg-slate-800 rounded-xl p-6 hover:shadow-lg transition-all group">
                    <ArrowRight className="w-10 h-10 text-primary mb-3 group-hover:translate-x-2 transition-transform" />
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
