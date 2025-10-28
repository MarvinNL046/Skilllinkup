import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "nl") {
    return {
      title: "Platformkosten Begrijpen: Prijs Optimaal om Netto Verdiensten te Maximaliseren (2025)",
      description: "Complete uitleg van freelance platformkosten en hoe je je diensten moet prijzen om verdiensten te maximaliseren. Vergelijk Upwork, Fiverr, Freelancer en 10+ platforms met echte berekeningen.",
      keywords: "freelance platformkosten, upwork kosten, fiverr kosten, freelancer kosten, platform commissie, maximaliseer freelance verdiensten, freelance netto verdiensten",
      openGraph: {
        title: "Platformkosten Begrijpen: Prijs Optimaal om Netto Verdiensten te Maximaliseren (2025)",
        description: "Leer hoe platformkosten je inkomen beïnvloeden en ontdek prijsstrategieën om je netto verdiensten te maximaliseren op alle belangrijke platforms.",
        type: "article",
      },
    };
  }

  return {
    title: "Understanding Platform Fees: Price to Maximize Take-Home Pay (2025)",
    description: "Complete breakdown of freelance platform fees and how to price your services to maximize earnings. Compare Upwork, Fiverr, Freelancer, and 10+ platforms with real calculations.",
    keywords: "freelance platform fees, upwork fees, fiverr fees, freelancer fees, platform commission, maximize freelance earnings, freelance take-home pay",
    openGraph: {
      title: "Understanding Platform Fees: Price to Maximize Take-Home Pay (2025)",
      description: "Learn how platform fees impact your income and discover pricing strategies to maximize your take-home pay across all major platforms.",
      type: "article",
    },
  };
}

export default async function PlatformFeesMaximizeEarningsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const content = locale === "nl" ? {
    badge: "Platformkosten Vergelijking 2025",
    title: "Platformkosten Begrijpen: Hoe te Prijzen om Netto Verdiensten te Maximaliseren",
    subtitle: "Platformkosten kunnen 5-30% van je verdiensten opslokken. Leer precies hoe elk platform rekent en hoe je strategisch prijst om je inkomen te maximaliseren.",
    ctaPlatforms: "Vergelijk Alle Platforms",
    ctaCalculate: "Bereken Je Tarief",
    intro: "Elk freelance platform neemt een deel van je verdiensten - het is de prijs voor toegang tot hun klantenbestand, betalingsverwerking en platformfuncties. Maar deze kosten variëren enorm, van 5% tot 30%, en het begrijpen ervan is essentieel om je diensten winstgevend te prijzen. Deze gids ontleedt de kostenstructuren van alle belangrijke platforms en toont je precies hoe je moet prijzen om je netto verdiensten te maximaliseren.",

    sectionComparison: {
      title: "Complete Platformkosten Vergelijking (2025)",
      headers: {
        platform: "Platform",
        structure: "Kostenstructuur",
        effective: "Effectief Tarief",
        payment: "Betalingsverwerking",
      },
      lowestFees: {
        title: "Laagste Kosten",
        items: [
          "Toptal: 0% (klant betaalt)",
          "Contra: 0% commissie",
          "Upwork: 5% op hoogste niveau",
        ],
      },
      moderateFees: {
        title: "Gemiddelde Kosten",
        items: [
          "Guru: 5-9%",
          "Freelancer: 10%",
          "Upwork: 10% middenniveau",
        ],
      },
      highestFees: {
        title: "Hoogste Kosten",
        items: [
          "99designs: 40%",
          "Fiverr: 20% vast",
          "Upwork: 20% initieel",
        ],
      },
    },

    sectionImpact: {
      title: "De Werkelijke Impact van Platformkosten op Je Inkomen",
      subtitle: "Jaarlijks Inkomen Vergelijking Over Platforms",
      intro: "Stel je voltooit €60.000 aan factureerbaar werk over een jaar. Dit is wat je werkelijk overhoudt op verschillende platforms:",
      scenarios: [
        { platform: "Toptal (0% kosten)", desc: "Beste scenario", amount: "€60.000", percent: "100% netto" },
        { platform: "Upwork (5% geoptimaliseerd)", desc: "Langetermijn klanten, €10k+ facturering", amount: "€57.000", percent: "95% netto" },
        { platform: "Guru (7% middenniveau)", desc: "Pro plan lid", amount: "€55.800", percent: "93% netto" },
        { platform: "Freelancer (10% vast)", desc: "Standaard tarief", amount: "€54.000", percent: "90% netto" },
        { platform: "Upwork (12% gemiddeld)", desc: "Mix van nieuwe en terugkerende klanten", amount: "€52.800", percent: "88% netto" },
        { platform: "Fiverr (20% vast)", desc: "Standaard verkoper", amount: "€48.000", percent: "80% netto" },
        { platform: "99designs (40% kosten)", desc: "Contest-gebaseerd werk", amount: "€36.000", percent: "60% netto" },
      ],
      difference: "Platformkeuze verschil: €24.000/jaar",
      differenceDesc: "Zelfde factureerbaar bedrag, maar €24k verschil tussen beste (Toptal) en slechtste (99designs) platforms!",
    },

    cta1: {
      title: "Vind het Beste Platform voor Jouw Niche",
      subtitle: "Vergelijk alle grote freelance platforms op kosten, functies en klantkwaliteit",
      button: "Vergelijk Platforms Nu",
    },

    sectionStrategies: {
      title: "6 Prijsstrategieën om Netto Verdiensten te Maximaliseren",
      strategies: [
        {
          number: 1,
          title: "Verhoog Je Tarieven om Doelinkomen te Behalen",
          intro: "Bereken altijd achterwaarts vanaf je gewenste netto betaling. Gebruik deze formule:",
          formula: "Platform Tarief = Gewenst Netto Tarief ÷ (1 - Kosten %)",
          examples: [
            { label: "Wil €75/uur netto:", calc: "20% kosten: Vraag €94/uur" },
            { label: "Wil €75/uur netto:", calc: "10% kosten: Vraag €83/uur" },
            { label: "Wil €75/uur netto:", calc: "5% kosten: Vraag €79/uur" },
          ],
        },
        {
          number: 2,
          title: "Optimaliseer voor Lagere Kostenniveaus",
          intro: "Op platforms met niveaus zoals Upwork, structureer projecten om snel lagere kostenniveaus te bereiken:",
          points: [
            { label: "Begin klein:", text: "Win een €500 project om het 20% niveau te passeren, stel dan groter werk voor" },
            { label: "Bundel projecten:", text: "Combineer meerdere kleine taken in één €10k+ opdracht voor 5% kosten" },
            { label: "Retainers:", text: "Maandelijkse retainers bouwen snel facturering op, waardoor je naar lagere niveaus gaat" },
          ],
        },
        {
          number: 3,
          title: "Multi-Platform Strategie",
          intro: "Zet niet al je eieren in één mand. Gebruik verschillende platforms voor verschillende projecttypes:",
          types: [
            { label: "Hoogwaardige projecten (€5k+)", text: "Gebruik Toptal (0% kosten) of Upwork met vaste klanten (5% kosten)" },
            { label: "Snelle klussen (€100-€500)", text: "Gebruik Fiverr of Freelancer waar snelheid belangrijker is dan kosten optimalisatie" },
            { label: "Nieuwe klantacquisitie", text: "Gebruik lead-gen platforms zoals Bark, ga dan over naar directe contracten" },
            { label: "Doorlopende relaties", text: "Schakel over naar directe facturering of 0% platforms nadat vertrouwen is opgebouwd" },
          ],
        },
        {
          number: 4,
          title: "Onderhandel Directe Betaling na Platform Introductie",
          intro: "Sommige platforms staan directe betaling toe (of kijken weg) na initiële samenwerking:",
          strategy: "Voltooi 1-2 projecten via het platform om vertrouwen op te bouwen, stel dan directe betaling voor voor doorlopend werk.",
          script: "Ik heb genoten van het werken met je op [platform]. Voor ons doorlopende werk, zou je open staan voor direct werken? Ik kan de platformbesparingen aan jou doorgeven met een verlaagd tarief.",
          warning: "Let op: Controleer platform ToS zorgvuldig. Upwork en Fiverr verbieden dit streng en kunnen je bannen. Toptal en Contra zijn flexibeler. Bij twijfel, vraag support.",
        },
        {
          number: 5,
          title: "Upgrade naar Betaalde Plannen met Lagere Kosten",
          intro: "Veel platforms bieden betaalde lidmaatschappen die servicekosten verlagen:",
          table: {
            headers: ["Platform", "Gratis Plan", "Betaald Plan", "Break-Even Punt"],
            rows: [
              ["Guru", "9% kosten", "5% kosten (€39,95/mnd)", "€1.000/maand facturering"],
              ["Freelancer", "10% + limieten", "10% + voordelen (€7,99/mnd)", "Hangt af van voordelen waarde"],
            ],
          },
          roi: "ROI Voorbeeld: Op Guru, als je €2.000/maand factureert, bespaart het Pro plan (€39,95/mnd) je €80/maand (4% kosten reductie), netto €40/maand extra inkomen.",
        },
        {
          number: 6,
          title: "Verwerk Kosten in Je Tarief Onderhandeling",
          intro: "Wees bij onderhandelen met klanten transparant over platformkosten om hogere tarieven te rechtvaardigen:",
          script: "Mijn tarief via [Platform] is €100/uur. Het platform rekent mij echter een servicekosten van 20%, dus mijn werkelijke netto is €80/uur. Als we direct werken, kan ik je een tarief van €90/uur bieden - je bespaart €10/uur terwijl ik €10/uur meer verdien.",
          note: "Deze transparantie bouwt vertrouwen op en leidt vaak tot directe samenwerking of acceptatie van hogere platformtarieven.",
        },
      ],
    },

    sectionHidden: {
      title: "Verborgen Kosten Naast Platformkosten",
      intro: "Platform servicekosten zijn slechts één kostenpost. Dit zijn de verborgen uitgaven die je netto verdiensten verder verlagen:",
      costs: [
        {
          title: "Betalingsverwerkingskosten",
          desc: "Veel platforms rekenen extra kosten om verdiensten op te nemen of betalingen te ontvangen.",
          items: [
            "Freelancer: 3% opnamekosten",
            "PayPal: 2,9% + €0,30 per transactie",
            "Bankoverschrijving: €30-€50 per overboeking",
            "Banktransfer: 1-3% op sommige platforms",
          ],
          percent: "1-3%",
        },
        {
          title: "Connect/Bod Kosten",
          desc: "Sommige platforms rekenen je om voorstellen in te dienen of met klanten te verbinden.",
          items: [
            "Upwork: 10-20 Connects per voorstel (€0,15 elk)",
            "Freelancer: Bod credits vereist voor voorstellen",
            "Bark/Thumbtack: Betaal per lead (€3-€65)",
          ],
          percent: "Variabel",
        },
        {
          title: "Premium Lidmaatschappen",
          desc: "Om competitief te zijn, heb je vaak betaalde plannen nodig voor betere zichtbaarheid en lagere kosten.",
          items: [
            "Upwork Plus: €49,99/maand",
            "Freelancer: €7,99-€59,95/maand",
            "Guru: €39,95-€499,95/maand",
          ],
          percent: "€8-€500/mnd",
        },
        {
          title: "Valutaconversie",
          desc: "Als je betaald wordt in een andere valuta, zijn conversiekosten en ongunstige wisselkoersen van toepassing.",
          items: [
            "Bank conversie: 3-5% opslag op wisselkoers",
            "Platform conversie: 1-3% kosten",
            "Wise/TransferWise: 0,5-2% (beste optie)",
          ],
          percent: "1-5%",
        },
      ],
      total: "Totale Verborgen Kosten: 3-10% extra",
      totalDesc: "Bij 20% platformkosten kun je eigenlijk 23-30% van je bruto inkomen verliezen!",
    },

    cta2: {
      title: "Bereken Je Werkelijke Uurtarief na Kosten",
      subtitle: "Verwerk platformkosten, betalingsverwerking en verborgen kosten om winstgevende tarieven in te stellen",
      button: "Bereken Je Netto Tarief",
    },

    sectionTips: {
      title: "Platform-Specifieke Kosten Optimalisatie Tips",
      platforms: [
        {
          name: "Upwork Optimalisatie",
          color: "accent",
          tips: [
            "Bouw 2-3 anker klanten op tot €10k+ facturering (5% kostenniveau)",
            "Win kleine projecten (€200-500) snel om 20% niveau te passeren",
            "Stel retainers voor om facturering snel op te bouwen",
            "Al het werk met één klant telt voor niveau (levenslang)",
          ],
        },
        {
          name: "Fiverr Optimalisatie",
          color: "primary",
          tips: [
            "Accepteer 20% kosten als kosten van hoge klantvolume",
            "Gebruik Fiverr voor leadgeneratie, niet langetermijn projecten",
            "Bied pakket deals aan (€100-€500) voor betere ROI",
            "Word Top Rated om premium prijzen te vragen",
          ],
        },
        {
          name: "Guru Optimalisatie",
          color: "secondary",
          tips: [
            "Upgrade naar Pro (€39,95/mnd) als je €1k+/maand factureert",
            "Gebruik SafePay mijlpalen om cashflow te beschermen",
            "5% kosten op Pro plan = grote besparingen op grote projecten",
            "Lager klantvolume, hogere projectwaarde",
          ],
        },
        {
          name: "Toptal Strategie",
          color: "accent",
          tips: [
            "Doorsta rigoureuze keuring (slechts 3% acceptatie ratio)",
            "0% freelancer kosten = maximale netto verdiensten",
            "Premium klanten bereid hogere tarieven te betalen",
            "Beste optie voor ervaren, gespecialiseerde freelancers",
          ],
        },
      ],
    },

    sectionRelated: {
      title: "Gerelateerde Prijs Bronnen",
      resources: [
        {
          href: "/seo/calculate-freelance-hourly-rate",
          title: "Bereken Je Tarief",
          desc: "Leer de formule om je basistarief te berekenen vóór platformkosten",
          cta: "Lees Gids →",
        },
        {
          href: "/seo/upwork-pricing-tactics",
          title: "Upwork Prijs Tactieken",
          desc: "Platform-specifieke strategieën om Upwork verdiensten te maximaliseren",
          cta: "Lees Gids →",
        },
        {
          href: "/seo/negotiate-higher-rates",
          title: "Onderhandel Hogere Tarieven",
          desc: "Beheers onderhandeling om verdiensten op elk platform te verhogen",
          cta: "Lees Gids →",
        },
      ],
    },

    ctaFinal: {
      title: "Vind het Beste Platform voor Maximale Verdiensten",
      subtitle: "Vergelijk kosten, functies, klantkwaliteit en verdien potentieel over alle grote freelance platforms",
      button: "Vergelijk Alle Platforms",
    },
  } : {
    badge: "Platform Fee Comparison 2025",
    title: "Understanding Platform Fees: How to Price to Maximize Take-Home Pay",
    subtitle: "Platform fees can eat up 5-30% of your earnings. Learn exactly how each platform charges and how to price strategically to maximize your income.",
    ctaPlatforms: "Compare All Platforms",
    ctaCalculate: "Calculate Your Rate",
    intro: "Every freelance platform takes a cut of your earnings—it's the cost of access to their client base, payment processing, and platform features. But these fees vary wildly, from 5% to 30%, and understanding them is critical to pricing your services profitably. This guide breaks down the fee structures of all major platforms and shows you exactly how to price to maximize your take-home pay.",

    sectionComparison: {
      title: "Complete Platform Fee Comparison (2025)",
      headers: {
        platform: "Platform",
        structure: "Fee Structure",
        effective: "Effective Fee",
        payment: "Payment Processing",
      },
      lowestFees: {
        title: "Lowest Fees",
        items: [
          "Toptal: 0% (client pays)",
          "Contra: 0% commission",
          "Upwork: 5% at highest tier",
        ],
      },
      moderateFees: {
        title: "Moderate Fees",
        items: [
          "Guru: 5-9%",
          "Freelancer: 10%",
          "Upwork: 10% mid-tier",
        ],
      },
      highestFees: {
        title: "Highest Fees",
        items: [
          "99designs: 40%",
          "Fiverr: 20% flat",
          "Upwork: 20% initial",
        ],
      },
    },

    sectionImpact: {
      title: "The Real Impact of Platform Fees on Your Income",
      subtitle: "Annual Income Comparison Across Platforms",
      intro: "Let's say you complete $60,000 in billable work across a year. Here's what you actually take home on different platforms:",
      scenarios: [
        { platform: "Toptal (0% fee)", desc: "Best case scenario", amount: "$60,000", percent: "100% take-home" },
        { platform: "Upwork (5% optimized)", desc: "Long-term clients, $10k+ billing", amount: "$57,000", percent: "95% take-home" },
        { platform: "Guru (7% mid-tier)", desc: "Pro plan member", amount: "$55,800", percent: "93% take-home" },
        { platform: "Freelancer (10% flat)", desc: "Standard rate", amount: "$54,000", percent: "90% take-home" },
        { platform: "Upwork (12% average)", desc: "Mix of new and repeat clients", amount: "$52,800", percent: "88% take-home" },
        { platform: "Fiverr (20% flat)", desc: "Standard seller", amount: "$48,000", percent: "80% take-home" },
        { platform: "99designs (40% fee)", desc: "Contest-based work", amount: "$36,000", percent: "60% take-home" },
      ],
      difference: "Platform choice difference: $24,000/year",
      differenceDesc: "Same billable amount, but $24k difference between best (Toptal) and worst (99designs) platforms!",
    },

    cta1: {
      title: "Find the Best Platform for Your Niche",
      subtitle: "Compare all major freelance platforms by fees, features, and client quality",
      button: "Compare Platforms Now",
    },

    sectionStrategies: {
      title: "6 Pricing Strategies to Maximize Take-Home Pay",
      strategies: [
        {
          number: 1,
          title: "Gross-Up Your Rates to Hit Target Net Income",
          intro: "Always calculate backwards from your desired take-home pay. Use this formula:",
          formula: "Platform Rate = Desired Net Rate ÷ (1 - Fee %)",
          examples: [
            { label: "Want $75/hr net:", calc: "20% fee: Charge $94/hr" },
            { label: "Want $75/hr net:", calc: "10% fee: Charge $83/hr" },
            { label: "Want $75/hr net:", calc: "5% fee: Charge $79/hr" },
          ],
        },
        {
          number: 2,
          title: "Optimize for Lower Fee Tiers",
          intro: "On tiered platforms like Upwork, structure projects to hit lower fee tiers quickly:",
          points: [
            { label: "Start small:", text: "Win a $500 project to clear the 20% tier, then propose larger work" },
            { label: "Bundle projects:", text: "Combine multiple small tasks into one $10k+ engagement for 5% fee" },
            { label: "Retainers:", text: "Monthly retainers quickly accumulate billing, dropping you to lower tiers" },
          ],
        },
        {
          number: 3,
          title: "Multi-Platform Strategy",
          intro: "Don't put all your eggs in one basket. Use different platforms for different project types:",
          types: [
            { label: "High-value projects ($5k+)", text: "Use Toptal (0% fee) or Upwork with established clients (5% fee)" },
            { label: "Quick gigs ($100-$500)", text: "Use Fiverr or Freelancer where speed matters more than fee optimization" },
            { label: "New client acquisition", text: "Use lead-gen platforms like Bark, then move to direct contracts" },
            { label: "Ongoing relationships", text: "Transition to direct billing or 0% platforms after trust is established" },
          ],
        },
        {
          number: 4,
          title: "Negotiate Direct Payment After Platform Introduction",
          intro: "Some platforms allow (or turn a blind eye to) direct payment after initial engagement:",
          strategy: "Complete 1-2 projects through the platform to build trust, then propose direct payment for ongoing work.",
          script: "I've loved working with you on [platform]. For our ongoing work, would you be open to working directly? I can pass along the platform savings to you with a reduced rate.",
          warning: "Warning: Check platform ToS carefully. Upwork and Fiverr strictly prohibit this and may ban you. Toptal and Contra are more flexible. When in doubt, ask support.",
        },
        {
          number: 5,
          title: "Upgrade to Paid Plans with Lower Fees",
          intro: "Many platforms offer paid memberships that reduce service fees:",
          table: {
            headers: ["Platform", "Free Plan", "Paid Plan", "Break-Even Point"],
            rows: [
              ["Guru", "9% fee", "5% fee ($39.95/mo)", "$1,000/month billing"],
              ["Freelancer", "10% + limits", "10% + perks ($7.99/mo)", "Depends on perks value"],
            ],
          },
          roi: "ROI Example: On Guru, if you bill $2,000/month, the Pro plan ($39.95/mo) saves you $80/month (4% fee reduction), netting $40/month extra income.",
        },
        {
          number: 6,
          title: "Factor Fees Into Your Rate Negotiation",
          intro: "When negotiating with clients, be transparent about platform fees to justify higher rates:",
          script: "My rate through [Platform] is $100/hour. However, the platform charges me a 20% service fee, so my actual take-home is $80/hour. If we work directly, I can offer you a rate of $90/hour—saving you $10/hour while I earn $10/hour more.",
          note: "This transparency builds trust and often leads to direct engagement or acceptance of higher platform rates.",
        },
      ],
    },

    sectionHidden: {
      title: "Hidden Costs Beyond Platform Fees",
      intro: "Platform service fees are just one cost. Here are the hidden expenses that further reduce your take-home pay:",
      costs: [
        {
          title: "Payment Processing Fees",
          desc: "Many platforms charge additional fees to withdraw earnings or receive payments.",
          items: [
            "Freelancer: 3% withdrawal fee",
            "PayPal: 2.9% + $0.30 per transaction",
            "Wire transfer: $30-$50 per transfer",
            "Bank transfer: 1-3% on some platforms",
          ],
          percent: "1-3%",
        },
        {
          title: "Connect/Bid Fees",
          desc: "Some platforms charge you to submit proposals or connect with clients.",
          items: [
            "Upwork: 10-20 Connects per proposal ($0.15 each)",
            "Freelancer: Bid credits required for proposals",
            "Bark/Thumbtack: Pay per lead ($3-$65)",
          ],
          percent: "Variable",
        },
        {
          title: "Premium Memberships",
          desc: "To be competitive, you often need paid plans for better visibility and lower fees.",
          items: [
            "Upwork Plus: $49.99/month",
            "Freelancer: $7.99-$59.95/month",
            "Guru: $39.95-$499.95/month",
          ],
          percent: "$8-$500/mo",
        },
        {
          title: "Currency Conversion",
          desc: "If you're paid in a different currency, conversion fees and unfavorable exchange rates apply.",
          items: [
            "Bank conversion: 3-5% markup on exchange rate",
            "Platform conversion: 1-3% fee",
            "Wise/TransferWise: 0.5-2% (best option)",
          ],
          percent: "1-5%",
        },
      ],
      total: "Total Hidden Costs: 3-10% additional",
      totalDesc: "On a 20% platform fee, you could actually be losing 23-30% of your gross income!",
    },

    cta2: {
      title: "Calculate Your True Hourly Rate After Fees",
      subtitle: "Factor in platform fees, payment processing, and hidden costs to set profitable rates",
      button: "Calculate Your Net Rate",
    },

    sectionTips: {
      title: "Platform-Specific Fee Optimization Tips",
      platforms: [
        {
          name: "Upwork Optimization",
          color: "accent",
          tips: [
            "Build 2-3 anchor clients to $10k+ billing (5% fee tier)",
            "Win small projects ($200-500) fast to clear 20% tier",
            "Propose retainers to accumulate billing quickly",
            "All work with one client counts toward tier (lifetime)",
          ],
        },
        {
          name: "Fiverr Optimization",
          color: "primary",
          tips: [
            "Accept 20% fee as cost of high client volume",
            "Use Fiverr for lead generation, not long-term projects",
            "Offer package deals ($100-$500) for better ROI",
            "Become Top Rated to charge premium prices",
          ],
        },
        {
          name: "Guru Optimization",
          color: "secondary",
          tips: [
            "Upgrade to Pro ($39.95/mo) if billing $1k+/month",
            "Use SafePay milestones to protect cash flow",
            "5% fee on Pro plan = big savings on large projects",
            "Lower client volume, higher project value",
          ],
        },
        {
          name: "Toptal Strategy",
          color: "accent",
          tips: [
            "Pass rigorous vetting (only 3% acceptance rate)",
            "0% freelancer fees = maximum take-home pay",
            "Premium clients willing to pay higher rates",
            "Best option for experienced, specialized freelancers",
          ],
        },
      ],
    },

    sectionRelated: {
      title: "Related Pricing Resources",
      resources: [
        {
          href: "/seo/calculate-freelance-hourly-rate",
          title: "Calculate Your Rate",
          desc: "Learn the formula to calculate your base rate before platform fees",
          cta: "Read Guide →",
        },
        {
          href: "/seo/upwork-pricing-tactics",
          title: "Upwork Pricing Tactics",
          desc: "Platform-specific strategies to maximize Upwork earnings",
          cta: "Read Guide →",
        },
        {
          href: "/seo/negotiate-higher-rates",
          title: "Negotiate Higher Rates",
          desc: "Master negotiation to increase earnings on any platform",
          cta: "Read Guide →",
        },
      ],
    },

    ctaFinal: {
      title: "Find the Best Platform for Maximum Earnings",
      subtitle: "Compare fees, features, client quality, and earning potential across all major freelance platforms",
      button: "Compare All Platforms",
    },
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": content.title,
    "description": content.intro.substring(0, 200),
    "author": {
      "@type": "Organization",
      "name": "SkillLinkup"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SkillLinkup",
      "logo": {
        "@type": "ImageObject",
        "url": "https://skilllinkup.com/images/logo/skilllinkup-transparant-rozepunt.webp"
      }
    },
    "datePublished": "2025-01-15",
    "dateModified": "2025-01-15"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="flex-1 bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary via-secondary-medium to-secondary-light dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center">
              <div className="inline-block bg-primary/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-primary font-semibold">{content.badge}</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {content.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                {content.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark px-8 py-4 text-lg font-heading font-semibold text-white transition-all shadow-xl hover:shadow-2xl"
                >
                  {content.ctaPlatforms}
                  <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/tools/rate-calculator`}
                  className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 text-secondary px-8 py-4 text-lg font-heading font-semibold transition-all shadow-xl"
                >
                  {content.ctaCalculate}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

            {/* Introduction */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-xl text-text-secondary dark:text-gray-300 leading-relaxed">
                {content.intro}
              </p>
            </div>

            {/* Platform Fee Comparison */}
            <section className="mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
                {content.sectionComparison.title}
              </h2>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl mb-8 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                      <th className="p-4 font-heading font-bold text-secondary dark:text-white">{content.sectionComparison.headers.platform}</th>
                      <th className="p-4 font-heading font-bold text-secondary dark:text-white">{content.sectionComparison.headers.structure}</th>
                      <th className="p-4 font-heading font-bold text-secondary dark:text-white">{content.sectionComparison.headers.effective}</th>
                      <th className="p-4 font-heading font-bold text-secondary dark:text-white">{content.sectionComparison.headers.payment}</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary dark:text-gray-300">
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-accent/5 dark:bg-accent/10">
                      <td className="p-4 font-semibold">Upwork</td>
                      <td className="p-4">
                        <div className="text-xs space-y-1">
                          <div>20% (first {locale === "nl" ? "€500" : "$500"})</div>
                          <div>10% ({locale === "nl" ? "€500-€10k" : "$500-$10k"})</div>
                          <div>5% ({locale === "nl" ? "€10k+" : "$10k+"})</div>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-primary">5-20%</td>
                      <td className="p-4 text-xs">{locale === "nl" ? "Gratis (ingebouwd)" : "Free (built-in)"}</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 font-semibold">Fiverr</td>
                      <td className="p-4">{locale === "nl" ? "20% vast" : "20% flat"}</td>
                      <td className="p-4 font-bold text-primary">20%</td>
                      <td className="p-4 text-xs">{locale === "nl" ? "€1 opnamekosten" : "$1 withdrawal fee"}</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-accent/5 dark:bg-accent/10">
                      <td className="p-4 font-semibold">Freelancer</td>
                      <td className="p-4">{locale === "nl" ? "10% of €5 min" : "10% or $5 min"}</td>
                      <td className="p-4 font-bold text-accent">10%</td>
                      <td className="p-4 text-xs">{locale === "nl" ? "3% + kosten" : "3% + fees"}</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 font-semibold">Toptal</td>
                      <td className="p-4">{locale === "nl" ? "Geen kosten (klant betaalt)" : "No fee (client pays)"}</td>
                      <td className="p-4 font-bold text-accent">0%</td>
                      <td className="p-4 text-xs">{locale === "nl" ? "Gratis" : "Free"}</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-accent/5 dark:bg-accent/10">
                      <td className="p-4 font-semibold">Guru</td>
                      <td className="p-4">
                        <div className="text-xs space-y-1">
                          <div>9% (Basic)</div>
                          <div>5-7% ({locale === "nl" ? "Betaalde plannen" : "Paid plans"})</div>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-accent">5-9%</td>
                      <td className="p-4 text-xs">2.9% + {locale === "nl" ? "€0,30" : "$0.30"}</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 font-semibold">PeoplePerHour</td>
                      <td className="p-4">
                        <div className="text-xs space-y-1">
                          <div>20% (first {locale === "nl" ? "€400" : "$438"})</div>
                          <div>7.5% ({locale === "nl" ? "€400+" : "$438+"})</div>
                        </div>
                      </td>
                      <td className="p-4 font-bold text-primary">7.5-20%</td>
                      <td className="p-4 text-xs">{locale === "nl" ? "3,4% + kosten" : "3.4% + fees"}</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-accent/5 dark:bg-accent/10">
                      <td className="p-4 font-semibold">99designs</td>
                      <td className="p-4">{locale === "nl" ? "Platform houdt 40%" : "Platform keeps 40%"}</td>
                      <td className="p-4 font-bold text-primary">40%</td>
                      <td className="p-4 text-xs">{locale === "nl" ? "Gratis (ingebouwd)" : "Free (built-in)"}</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 font-semibold">Contra</td>
                      <td className="p-4">{locale === "nl" ? "0% commissie" : "0% commission"}</td>
                      <td className="p-4 font-bold text-accent">0%</td>
                      <td className="p-4 text-xs">{locale === "nl" ? "Stripe kosten van toepassing" : "Stripe fees apply"}</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-accent/5 dark:bg-accent/10">
                      <td className="p-4 font-semibold">Bark</td>
                      <td className="p-4">{locale === "nl" ? "Betaal-per-lead (€3-€65)" : "Pay-per-lead ($3-$65)"}</td>
                      <td className="p-4 font-bold text-secondary">{locale === "nl" ? "Variabel" : "Variable"}</td>
                      <td className="p-4 text-xs">{locale === "nl" ? "Gratis overboeking" : "Free transfer"}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Thumbtack</td>
                      <td className="p-4">{locale === "nl" ? "Betaal-per-lead (10-50%)" : "Pay-per-lead (10-50%)"}</td>
                      <td className="p-4 font-bold text-primary">10-50%</td>
                      <td className="p-4 text-xs">{locale === "nl" ? "Gratis overboeking" : "Free transfer"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-lg p-6 border-2 border-accent/30">
                  <h3 className="font-heading text-xl font-bold text-accent mb-3">{content.sectionComparison.lowestFees.title}</h3>
                  <ul className="space-y-2 text-sm text-text-secondary dark:text-gray-300">
                    {content.sectionComparison.lowestFees.items.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-accent mr-2">★</span>
                        <span><strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-lg p-6 border-2 border-primary/30">
                  <h3 className="font-heading text-xl font-bold text-primary mb-3">{content.sectionComparison.moderateFees.title}</h3>
                  <ul className="space-y-2 text-sm text-text-secondary dark:text-gray-300">
                    {content.sectionComparison.moderateFees.items.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-primary mr-2">•</span>
                        <span><strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-lg p-6 border-2 border-secondary/30">
                  <h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-3">{content.sectionComparison.highestFees.title}</h3>
                  <ul className="space-y-2 text-sm text-text-secondary dark:text-gray-300">
                    {content.sectionComparison.highestFees.items.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-primary mr-2">!</span>
                        <span><strong>{item.split(':')[0]}:</strong> {item.split(':')[1]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Impact on Earnings */}
            <section className="mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
                {content.sectionImpact.title}
              </h2>

              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg mb-8">
                <h3 className="font-heading text-2xl font-bold text-secondary dark:text-white mb-6">
                  {content.sectionImpact.subtitle}
                </h3>
                <p className="text-text-secondary dark:text-gray-300 mb-6">
                  {content.sectionImpact.intro}
                </p>

                <div className="space-y-4">
                  {content.sectionImpact.scenarios.map((scenario, i) => (
                    <div key={i} className={`bg-gradient-to-r ${i < 2 ? 'from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 border-l-4 border-accent' : i < 4 ? 'from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 border-l-4 border-primary' : 'from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 border-l-4 border-secondary'} rounded-lg p-6`}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-lg text-secondary dark:text-white">{scenario.platform}</h4>
                          <p className="text-sm text-text-muted">{scenario.desc}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-3xl font-bold ${i < 2 ? 'text-accent' : i < 4 ? 'text-primary' : 'text-secondary dark:text-white'}`}>{scenario.amount}</p>
                          <p className="text-xs text-text-muted">{scenario.percent}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 rounded-lg p-6">
                  <p className="text-center font-bold text-xl text-secondary dark:text-white">
                    {content.sectionImpact.difference}
                  </p>
                  <p className="text-center text-sm text-text-secondary dark:text-gray-300 mt-2">
                    {content.sectionImpact.differenceDesc}
                  </p>
                </div>
              </div>
            </section>

            {/* CTA 1 */}
            <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg p-8 md:p-12 text-center text-white mb-16 shadow-xl">
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                {content.cta1.title}
              </h3>
              <p className="text-xl mb-6 opacity-90">
                {content.cta1.subtitle}
              </p>
              <Link
                href={`/${locale}/platforms`}
                className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 text-secondary px-8 py-4 text-lg font-heading font-semibold transition-all shadow-lg"
              >
                {content.cta1.button}
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Pricing Strategies */}
            <section className="mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
                {content.sectionStrategies.title}
              </h2>

              <div className="space-y-6">
                {content.sectionStrategies.strategies.map((strategy) => (
                  <div key={strategy.number} className={`bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border-l-4 ${strategy.number % 2 === 1 ? 'border-accent' : strategy.number === 6 ? 'border-secondary' : 'border-primary'}`}>
                    <div className="flex items-start mb-4">
                      <div className={`w-12 h-12 rounded-full ${strategy.number % 2 === 1 ? 'bg-accent' : strategy.number === 6 ? 'bg-secondary' : 'bg-primary'} flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0`}>
                        {strategy.number}
                      </div>
                      <div>
                        <h3 className="font-heading text-2xl font-bold text-secondary dark:text-white mb-3">
                          {strategy.title}
                        </h3>
                        <p className="text-text-secondary dark:text-gray-300 mb-4">
                          {strategy.intro}
                        </p>

                        {strategy.formula && (
                          <div className="bg-accent/10 dark:bg-accent/20 rounded-lg p-6 mb-4">
                            <p className="text-center font-mono text-xl font-bold text-secondary dark:text-white mb-4">
                              {strategy.formula}
                            </p>
                            {strategy.examples && (
                              <div className="grid md:grid-cols-3 gap-4 text-sm">
                                {strategy.examples.map((ex, i) => (
                                  <div key={i} className="bg-white dark:bg-gray-800 rounded p-3">
                                    <p className="font-semibold mb-1">{ex.label}</p>
                                    <p className="text-xs">{ex.calc}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {strategy.points && (
                          <ul className="space-y-3 text-text-secondary dark:text-gray-300">
                            {strategy.points.map((point, i) => (
                              <li key={i} className="flex items-start">
                                <svg className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span><strong>{point.label}</strong> {point.text}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {strategy.types && (
                          <div className="grid md:grid-cols-2 gap-4">
                            {strategy.types.map((type, i) => (
                              <div key={i} className={`${i % 2 === 0 ? 'bg-accent/5 dark:bg-accent/10' : 'bg-primary/5 dark:bg-primary/10'} rounded-lg p-4`}>
                                <h4 className="font-semibold mb-2">{type.label}</h4>
                                <p className="text-sm text-text-secondary dark:text-gray-300">
                                  {type.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {strategy.strategy && (
                          <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-6 mb-4">
                            <div className="space-y-3 text-sm text-text-secondary dark:text-gray-300">
                              <p><strong className="text-secondary dark:text-white">{locale === "nl" ? "Strategie:" : "Strategy:"}</strong> {strategy.strategy}</p>
                              <p><strong className="text-primary">{locale === "nl" ? "Voorbeeld script:" : "Example script:"}</strong> {strategy.script}</p>
                            </div>
                          </div>
                        )}

                        {strategy.warning && (
                          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                            <p className="text-xs text-red-700 dark:text-red-400">
                              <strong>{locale === "nl" ? "Let op:" : "Warning:"}</strong> {strategy.warning}
                            </p>
                          </div>
                        )}

                        {strategy.table && (
                          <>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b border-gray-200 dark:border-gray-700">
                                    {strategy.table.headers.map((header, i) => (
                                      <th key={i} className="p-3 text-left">{header}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="text-text-secondary dark:text-gray-300">
                                  {strategy.table.rows.map((row, i) => (
                                    <tr key={i} className="border-b border-gray-200 dark:border-gray-700">
                                      {row.map((cell, j) => (
                                        <td key={j} className={`p-3 ${j === 0 ? 'font-semibold' : ''}`}>{cell}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="mt-4 bg-accent/10 dark:bg-accent/20 rounded-lg p-4">
                              <p className="text-sm text-text-secondary dark:text-gray-300">
                                <strong>{locale === "nl" ? "ROI Voorbeeld:" : "ROI Example:"}</strong> {strategy.roi}
                              </p>
                            </div>
                          </>
                        )}

                        {strategy.script && !strategy.strategy && (
                          <div className="bg-secondary/5 dark:bg-secondary/10 rounded-lg p-6">
                            <p className="text-sm text-text-secondary dark:text-gray-300 mb-3">
                              <strong>{locale === "nl" ? "Script:" : "Script:"}</strong> {strategy.script}
                            </p>
                            <p className="text-xs text-text-muted">
                              {strategy.note}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Hidden Costs */}
            <section className="mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
                {content.sectionHidden.title}
              </h2>

              <div className="bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 rounded-lg p-8 mb-8">
                <p className="text-text-secondary dark:text-gray-300 mb-6">
                  {content.sectionHidden.intro}
                </p>

                <div className="space-y-4">
                  {content.sectionHidden.costs.map((cost, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg text-secondary dark:text-white mb-2">{cost.title}</h4>
                          <p className="text-sm text-text-secondary dark:text-gray-300 mb-2">
                            {cost.desc}
                          </p>
                          <ul className="text-xs text-text-muted space-y-1">
                            {cost.items.map((item, j) => (
                              <li key={j}>• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-right ml-4">
                          <span className="text-2xl font-bold text-primary">{cost.percent}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-gradient-to-r from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 rounded-lg p-6">
                  <p className="text-center font-bold text-xl text-secondary dark:text-white mb-2">
                    {content.sectionHidden.total}
                  </p>
                  <p className="text-center text-sm text-text-secondary dark:text-gray-300">
                    {content.sectionHidden.totalDesc}
                  </p>
                </div>
              </div>
            </section>

            {/* CTA 2 */}
            <div className="bg-gradient-to-r from-accent to-accent-dark rounded-lg p-8 md:p-12 text-center text-white mb-16 shadow-xl">
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                {content.cta2.title}
              </h3>
              <p className="text-xl mb-6 opacity-90">
                {content.cta2.subtitle}
              </p>
              <Link
                href={`/${locale}/tools/rate-calculator`}
                className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 text-secondary px-8 py-4 text-lg font-heading font-semibold transition-all shadow-lg"
              >
                {content.cta2.button}
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Platform-Specific Tips */}
            <section className="mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
                {content.sectionTips.title}
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {content.sectionTips.platforms.map((platform, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                    <h3 className={`font-heading text-xl font-bold text-${platform.color} mb-4`}>{platform.name}</h3>
                    <ul className="space-y-3 text-sm text-text-secondary dark:text-gray-300">
                      {platform.tips.map((tip, j) => (
                        <li key={j} className="flex items-start">
                          <span className={`text-${platform.color} mr-2 font-bold`}>→</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Related Resources */}
            <section className="mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
                {content.sectionRelated.title}
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {content.sectionRelated.resources.map((resource, i) => (
                  <Link key={i} href={`/${locale}${resource.href}`} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                    <h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-3">
                      {resource.title}
                    </h3>
                    <p className="text-text-secondary dark:text-gray-300 mb-4">
                      {resource.desc}
                    </p>
                    <span className="text-primary hover:underline font-semibold">
                      {resource.cta}
                    </span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Final CTA */}
            <div className="bg-gradient-to-br from-secondary via-secondary-medium to-secondary-light rounded-lg p-8 md:p-12 text-center text-white shadow-xl">
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                {content.ctaFinal.title}
              </h3>
              <p className="text-xl mb-6 opacity-90">
                {content.ctaFinal.subtitle}
              </p>
              <Link
                href={`/${locale}/platforms`}
                className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 text-secondary px-8 py-4 text-lg font-heading font-semibold transition-all shadow-lg"
              >
                {content.ctaFinal.button}
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
