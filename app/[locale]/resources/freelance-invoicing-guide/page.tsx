import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FileText, Download, CheckCircle, DollarSign, Clock } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'nl') {
    return {
      title: 'Facturen maken als ZZP\'er: Sjablonen & Best Practices 2024',
      description: 'Leer professioneel facturen maken met gratis sjablonen en best practices. Ontdek wat je moet vermelden, betalingstermijnen en hoe je sneller betaald krijgt als freelancer.',
      keywords: 'facturen maken zzp, factuur sjabloon, factureren freelance, btw factuur, betalingstermijnen',
      alternates: {
        canonical: 'https://skilllinkup.com/nl/seo/freelance-invoicing-guide',
      },
      openGraph: {
        title: 'Facturen maken als ZZP\'er: Sjablonen & Best Practices 2024',
        description: 'Leer professioneel facturen maken met gratis sjablonen en best practices. Ontdek hoe je sneller betaald krijgt.',
        type: 'article',
        url: 'https://skilllinkup.com/nl/seo/freelance-invoicing-guide',
      },
    };
  }

  return {
    title: 'Freelance Invoicing Guide: Templates & Best Practices 2024',
    description: 'Master freelance invoicing with templates, best practices, and tools. Learn what to include, payment terms, and how to get paid faster as a freelancer.',
    keywords: 'freelance invoicing, invoice template, freelance payment, invoice best practices, freelance billing',
    alternates: {
      canonical: 'https://skilllinkup.com/seo/freelance-invoicing-guide',
    },
    openGraph: {
      title: 'Freelance Invoicing Guide: Templates & Best Practices 2024',
      description: 'Master freelance invoicing with templates, best practices, and tools. Learn what to include, payment terms, and how to get paid faster.',
      type: 'article',
      url: 'https://skilllinkup.com/seo/freelance-invoicing-guide',
    },
  };
}

export default async function FreelanceInvoicingGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    hero: {
      badge: "Zakelijk",
      h1: "Facturen maken als ZZP'er: Sjablonen & Best Practices",
      intro: "Word een pro in professioneel factureren met onze complete gids. Leer wat je moet vermelden, betalingstermijnen en hoe je sneller betaald krijgt als freelancer.",
      cta1: "Maak Nu Een Factuur",
      cta2: "Zakelijke Tools",
    },
    intro: "Professioneel factureren is de ruggengraat van een succesvolle freelance onderneming. Of je nu net begint of je facturatieproces wilt stroomlijnen, deze uitgebreide gids leert je alles wat je moet weten over effectieve facturen die op tijd betaald worden.",
    essentialElements: {
      title: "Essentiële Onderdelen van een Professionele Factuur",
      intro: "Een complete freelance factuur moet deze belangrijke componenten bevatten voor duidelijkheid en professionaliteit:",
      subtitle: "Factuur Checklist",
      items: [
        { title: 'Factuurnummer', desc: 'Unieke identifier voor tracking (bijv. FAC-2024-001)' },
        { title: 'Factuurdatum', desc: 'Datum waarop de factuur is gemaakt' },
        { title: 'Vervaldatum', desc: 'Betalingsdeadline (meestal 14-30 dagen na factuurdatum)' },
        { title: 'Jouw Bedrijfsgegevens', desc: 'Naam, adres, contactgegevens, KVK-nummer, BTW-ID' },
        { title: 'Klantgegevens', desc: 'Naam klant, bedrijf, factuuradres' },
        { title: 'Gespecificeerde Diensten', desc: 'Gedetailleerde omschrijving, aantal, tarief en totaal per dienst' },
        { title: 'Subtotaal en BTW', desc: 'Bedragen voor en na BTW (21%)' },
        { title: 'Totaal Te Betalen', desc: 'Eindtotaal duidelijk weergegeven' },
        { title: 'Betalingsvoorwaarden', desc: 'Geaccepteerde betaalmethodes en beleid voor te late betaling' },
        { title: 'Betalingsinstructies', desc: 'IBAN, iDEAL details of andere betalingsinformatie' },
      ]
    },
    templateSection: {
      title: "Gratis Freelance Factuur Sjabloon",
      intro: "Gebruik deze professionele sjabloonstructuur voor je freelance facturen:",
    },
    ctaBox1: {
      title: "Maak Professionele Facturen in Minuten",
      description: "Gebruik onze gratis factuur generator om aangepaste, professionele facturen te maken met jouw branding. Geen ontwerpvaardigheden nodig.",
      cta: "Begin Met Facturen Maken",
    },
    bestPractices: {
      title: "Best Practices voor Freelance Facturatie",
      practices: [
        {
          title: "1. Factureer Direct Na Voltooiing",
          content: "Stuur facturen binnen 24-48 uur na voltooiing van het werk of het bereiken van projectmijlpalen. Hoe sneller je factureert, hoe sneller je betaald krijgt. Uitgestelde facturatie signaleert aan klanten dat betaling geen prioriteit heeft, wat kan leiden tot vertraagde betalingen."
        },
        {
          title: "2. Stel Duidelijke Betalingsvoorwaarden Vooraf Vast",
          content: "Leg betalingsvoorwaarden vast in je contract voordat je begint. Gangbare voorwaarden zijn:",
          list: [
            "14 dagen netto / 30 dagen netto: Betaling verschuldigd binnen 14 of 30 dagen na factuurdatum",
            "Bij Ontvangst: Betaling direct verwacht",
            "50/50 Verdeling: 50% vooruitbetaling, 50% bij voltooiing",
            "Mijlpaal-Gebaseerd: Betaling op specifieke projectmijlpalen",
            "Terugkerend: Maandelijks retainer of abonnementsfacturatie"
          ]
        },
        {
          title: "3. Gebruik Professionele Factuurnummering",
          content: "Maak een consistent nummersysteem voor eenvoudige tracking. Voorbeelden:",
          list: [
            "Opeenvolgend: FAC-001, FAC-002, FAC-003",
            "Datum-Gebaseerd: 2024-001, 2024-002",
            "Klant-Gebaseerd: ACME-001, ACME-002",
            "Gecombineerd: 2024-ACME-001"
          ]
        },
        {
          title: "4. Specificeer je Diensten Duidelijk",
          content: "Splits je werk op in specifieke regelitems met beschrijvingen, aantallen en tarieven. Deze transparantie bouwt vertrouwen op en vermindert betalingsgeschillen. Vermeld voor urenwerk het aantal gewerkte uren. Voor projectwerk, beschrijf elke deliverable."
        },
        {
          title: "5. Maak Betalen Makkelijk",
          content: "Bied meerdere betaalopties aan om klantvoorkeuren te accommoderen:",
          list: [
            "Bankoverschrijving/SEPA: Laagste kosten, 1-3 dagen verwerking",
            "iDEAL: Direct betalen, meest gebruikt in Nederland",
            "PayPal: Directe betaling, 2,9% + €0,35 transactiekosten",
            "Creditcard: Handig voor klanten, 2,9% - 3,5% kosten",
            "Internationaal: Wise (TransferWise), Payoneer voor grensoverschrijdende betalingen"
          ]
        },
        {
          title: "6. Volg Openstaande Facturen Op",
          content: "Maak een opvolgschema voor onbetaalde facturen:",
          list: [
            "Dag 1-3 Na Vervaldatum: Vriendelijke herinnering per e-mail",
            "Dag 7: Tweede herinnering met betalingsbevestigingsverzoek",
            "Dag 14: Formele aanmaning met notificatie van incassokosten",
            "Dag 30: Laatste waarschuwing voordat incassobureau wordt ingeschakeld"
          ]
        }
      ]
    },
    commonMistakes: {
      title: "Veelgemaakte Fouten Bij Facturatie",
      mistakes: [
        {
          title: "Ontbrekende of Onjuiste Informatie",
          content: "Controleer alle klantgegevens, bedragen en datums dubbel voordat je verstuurt. Fouten kunnen betaling vertragen en je professionele reputatie schaden."
        },
        {
          title: "Vage Dienst Omschrijvingen",
          content: "\"Ontwerpwerk - €2.000\" is te vaag. Gebruik in plaats daarvan: \"Homepage herontwerp inclusief wireframes, mockups en responsive development - 40 uur @ €50/uur - €2.000\""
        },
        {
          title: "Geen Vervaldatum Instellen",
          content: "Zonder duidelijke vervaldatum kunnen klanten betaling oneindig uitstellen. Vermeld altijd een betalingsdeadline."
        },
        {
          title: "BTW Vergeten",
          content: "Als je BTW-plichtig bent, moet je dit op je factuur vermelden. Raadpleeg een boekhouder over je BTW-verplichtingen."
        },
        {
          title: "Inconsistente Branding",
          content: "Gebruik hetzelfde logo, kleuren en opmaak op alle facturen om een professioneel merkimago te behouden."
        }
      ]
    },
    tools: {
      title: "Beste Facturatie Tools voor Freelancers",
      intro: "De juiste factuurtools besparen je uren en helpen je sneller betaald te krijgen:",
      free: {
        title: "Gratis Tools",
        items: [
          { name: "SkillLinkup Factuur Generator", desc: "Maak direct professionele facturen" },
          { name: "Wave", desc: "Gratis facturatie en boekhoudsoftware" },
          { name: "Invoice Ninja", desc: "Open-source facturatieoplossing" }
        ]
      },
      premium: {
        title: "Premium Tools",
        items: [
          { name: "Moneybird", desc: "Nederlandse boekhoud- en facturatiesoftware (€9+/maand)" },
          { name: "Informer", desc: "Volledige boekhouding voor ZZP'ers (€5+/maand)" },
          { name: "Bonsai", desc: "Contracten + facturatie + tijdregistratie ($24/maand)" }
        ]
      }
    },
    international: {
      title: "Nederlandse Facturatie Vereisten",
      intro: "Als ZZP'er in Nederland moet je factuur aan specifieke wettelijke eisen voldoen:",
      currency: {
        title: "BTW en Belastingen",
        content: "Als je meer dan €20.000 per jaar omzet draait, ben je BTW-plichtig (21% BTW voor de meeste diensten). Vermeld altijd je BTW-identificatienummer op facturen. Voor diensten aan klanten in de EU kan BTW-verlegging van toepassing zijn."
      },
      tax: {
        title: "KVK Registratie",
        content: "Alle freelancers in Nederland moeten geregistreerd staan bij de Kamer van Koophandel (KVK). Je KVK-nummer moet op elke factuur staan."
      },
      payment: {
        title: "Betalingstermijn en Incasso",
        content: "In Nederland is de standaard betalingstermijn 30 dagen. Na de vervaldatum mag je incassokosten en rente (wettelijke handelsrente) in rekening brengen. Voor bedrijven geldt de Wet betaling op termijn."
      }
    },
    ctaBox2: {
      title: "Volg Je Tijd, Krijg Accuraat Betaald",
      description: "Nauwkeurige tijdregistratie zorgt ervoor dat je voor elk gewerkt uur factureert. Gebruik onze gratis time tracker om projecturen bij te houden.",
      cta1: "Start Tijdregistratie",
      cta2: "Lees Belasting Gids"
    },
    conclusion: {
      title: "Begin Met Professioneel Factureren",
      p1: "Professionele facturatie is essentieel voor het behouden van een gezonde cashflow en het opbouwen van geloofwaardigheid bij klanten. Door deze best practices te volgen, duidelijke sjablonen te gebruiken en de juiste tools in te zetten, krijg je sneller betaald en besteed je minder tijd aan administratieve taken.",
      p2: "Vergeet niet om direct te factureren, duidelijke betalingsvoorwaarden vast te stellen en consequent openstaande betalingen op te volgen. Je facturen zijn een weerspiegeling van je professionaliteit—maak ze belangrijk.",
    },
    relatedResources: {
      title: "Gerelateerde Bronnen",
      links: [
        { title: "Freelance Contracten 101", href: "/nl/seo/freelance-contracts-101" },
        { title: "Meerdere Klanten Beheren", href: "/nl/seo/managing-multiple-clients" },
        { title: "Gratis Freelance Tools", href: "/nl/tools" },
        { title: "Freelance Blog", href: "/nl/blog" }
      ]
    }
  } : {
    hero: {
      badge: "Business",
      h1: "Freelance Invoicing Guide: Templates & Best Practices",
      intro: "Master the art of professional invoicing with our complete guide. Learn what to include, payment terms, and how to get paid faster as a freelancer.",
      cta1: "Create Invoice Now",
      cta2: "Browse Business Tools",
    },
    intro: "Professional invoicing is the backbone of a successful freelance business. Whether you're just starting out or looking to streamline your billing process, this comprehensive guide will teach you everything you need to know about creating effective invoices that get paid on time.",
    essentialElements: {
      title: "Essential Elements of a Professional Invoice",
      intro: "A complete freelance invoice should include these critical components to ensure clarity and professionalism:",
      subtitle: "Invoice Checklist",
      items: [
        { title: 'Invoice Number', desc: 'Unique identifier for tracking (e.g., INV-2024-001)' },
        { title: 'Invoice Date', desc: 'Date the invoice was created' },
        { title: 'Due Date', desc: 'Payment deadline (typically 14-30 days from invoice date)' },
        { title: 'Your Business Information', desc: 'Name, address, contact details, tax ID' },
        { title: 'Client Information', desc: 'Client name, company, billing address' },
        { title: 'Itemized Services', desc: 'Detailed description, quantity, rate, and total for each service' },
        { title: 'Subtotal and Taxes', desc: 'Breakdown of amounts before and after applicable taxes' },
        { title: 'Total Amount Due', desc: 'Final payment amount clearly displayed' },
        { title: 'Payment Terms', desc: 'Accepted payment methods and late payment policies' },
        { title: 'Payment Instructions', desc: 'Bank details, PayPal, or other payment information' },
      ]
    },
    templateSection: {
      title: "Free Freelance Invoice Template",
      intro: "Use this professional template structure for your freelance invoices:",
    },
    ctaBox1: {
      title: "Create Professional Invoices in Minutes",
      description: "Use our free invoice generator to create customized, professional invoices with your branding. No design skills required.",
      cta: "Start Creating Invoices",
    },
    bestPractices: {
      title: "Freelance Invoicing Best Practices",
      practices: [
        {
          title: "1. Invoice Immediately After Completion",
          content: "Send invoices within 24-48 hours of completing work or reaching project milestones. The faster you invoice, the faster you get paid. Delayed invoicing signals to clients that payment isn't a priority, which can lead to delayed payments."
        },
        {
          title: "2. Set Clear Payment Terms Upfront",
          content: "Establish payment terms in your contract before starting work. Common terms include:",
          list: [
            "Net 14/Net 30: Payment due within 14 or 30 days of invoice date",
            "Due Upon Receipt: Payment expected immediately",
            "50/50 Split: 50% upfront deposit, 50% upon completion",
            "Milestone-Based: Payment at specific project milestones",
            "Recurring: Monthly retainer or subscription billing"
          ]
        },
        {
          title: "3. Use Professional Invoice Numbering",
          content: "Create a consistent numbering system for easy tracking and organization. Examples:",
          list: [
            "Sequential: INV-001, INV-002, INV-003",
            "Date-Based: 2024-001, 2024-002",
            "Client-Based: ACME-001, ACME-002",
            "Combined: 2024-ACME-001"
          ]
        },
        {
          title: "4. Itemize Your Services Clearly",
          content: "Break down your work into specific line items with descriptions, quantities, and rates. This transparency builds trust and reduces payment disputes. For hourly work, include the number of hours worked. For project-based work, describe each deliverable."
        },
        {
          title: "5. Make Payment Easy",
          content: "Offer multiple payment options to accommodate client preferences:",
          list: [
            "Bank Transfer/ACH: Lowest fees, 1-3 day processing",
            "PayPal: Instant payment, 2.9% + $0.30 fee",
            "Credit Card: Convenient for clients, 2.9% - 3.5% fee",
            "Digital Wallets: Venmo, Cash App, Zelle for smaller amounts",
            "International: Wise (TransferWise), Payoneer for cross-border payments"
          ]
        },
        {
          title: "6. Follow Up on Overdue Invoices",
          content: "Create a follow-up schedule for unpaid invoices:",
          list: [
            "Day 1-3 After Due Date: Friendly reminder email",
            "Day 7: Second reminder with payment confirmation request",
            "Day 14: Formal notice with late fee notification",
            "Day 30: Final notice before collections or legal action"
          ]
        }
      ]
    },
    commonMistakes: {
      title: "Common Invoicing Mistakes to Avoid",
      mistakes: [
        {
          title: "Missing or Incorrect Information",
          content: "Double-check all client details, amounts, and dates before sending. Errors can delay payment and damage your professional reputation."
        },
        {
          title: "Vague Service Descriptions",
          content: "\"Design work - $2,000\" is too vague. Instead: \"Homepage redesign including wireframes, mockups, and responsive development - 40 hours @ $50/hr - $2,000\""
        },
        {
          title: "Not Setting Due Dates",
          content: "Without a clear due date, clients may delay payment indefinitely. Always specify a payment deadline."
        },
        {
          title: "Forgetting About Taxes",
          content: "If you're required to collect sales tax or VAT, include it in your invoice. Consult with an accountant about your tax obligations."
        },
        {
          title: "Inconsistent Branding",
          content: "Use the same logo, colors, and formatting on all invoices to maintain a professional brand image."
        }
      ]
    },
    tools: {
      title: "Best Invoicing Tools for Freelancers",
      intro: "The right invoicing tool can save you hours and help you get paid faster:",
      free: {
        title: "Free Tools",
        items: [
          { name: "SkillLinkup Invoice Generator", desc: "Create professional invoices instantly" },
          { name: "Wave", desc: "Free invoicing and accounting software" },
          { name: "Invoice Ninja", desc: "Open-source invoicing solution" }
        ]
      },
      premium: {
        title: "Premium Tools",
        items: [
          { name: "FreshBooks", desc: "Full-featured accounting ($15+/month)" },
          { name: "QuickBooks Self-Employed", desc: "Tax tracking included ($15/month)" },
          { name: "Bonsai", desc: "Contracts + invoicing + time tracking ($24/month)" }
        ]
      }
    },
    international: {
      title: "International Invoicing Considerations",
      intro: "Working with international clients requires additional attention to invoicing details:",
      currency: {
        title: "Currency and Exchange Rates",
        content: "Decide whether to invoice in your currency or the client's currency. Clearly state the currency on your invoice (USD, EUR, GBP, etc.). Consider using payment processors like Wise or Payoneer that offer competitive exchange rates and lower fees than traditional banks."
      },
      tax: {
        title: "Tax Compliance",
        content: "Research VAT/GST requirements for cross-border services. Some countries require you to charge VAT for services provided to businesses in their jurisdiction. Include your tax identification number (TIN, VAT number, etc.) on international invoices. Consult with an international tax professional to ensure compliance."
      },
      payment: {
        title: "Payment Processing Time",
        content: "International wire transfers can take 3-5 business days. Factor this into your payment terms and cash flow planning. PayPal international transfers are faster but have higher fees (typically 5-7% for cross-border transactions)."
      }
    },
    ctaBox2: {
      title: "Track Your Time, Get Paid Accurately",
      description: "Accurate time tracking ensures you bill for every hour worked. Use our free time tracker to monitor project hours and generate detailed reports.",
      cta1: "Start Time Tracking",
      cta2: "Read Tax Guide"
    },
    conclusion: {
      title: "Start Invoicing Like a Pro",
      p1: "Professional invoicing is essential for maintaining healthy cash flow and building credibility with clients. By following these best practices, using clear templates, and leveraging the right tools, you'll get paid faster and spend less time on administrative tasks.",
      p2: "Remember to invoice promptly, set clear payment terms, and follow up consistently on overdue payments. Your invoices are a reflection of your professionalism—make them count.",
    },
    relatedResources: {
      title: "Related Resources",
      links: [
        { title: "Freelance Contracts 101", href: "/seo/freelance-contracts-101" },
        { title: "Managing Multiple Clients", href: "/seo/managing-multiple-clients" },
        { title: "Free Freelance Tools", href: "/tools" },
        { title: "Freelance Blog", href: "/blog" }
      ]
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.hero.h1,
    description: content.intro,
    author: {
      '@type': 'Organization',
      name: 'SkillLinkup',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SkillLinkup',
      logo: {
        '@type': 'ImageObject',
        url: 'https://skilllinkup.com/images/logo/skilllinkup-transparant-rozepunt.webp',
      },
    },
    datePublished: '2024-01-15',
    dateModified: '2024-01-15',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                {content.hero.h1}
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                {content.hero.intro}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/tools/invoice-generator`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-heading font-semibold rounded-lg shadow-lg transition-all hover:shadow-xl"
                >
                  <FileText className="w-5 h-5" />
                  {content.hero.cta1}
                </Link>
                <Link
                  href={`/${locale}/tools`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-heading font-semibold rounded-lg shadow border-2 border-gray-200 dark:border-gray-700 transition-all"
                >
                  {content.hero.cta2}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <article className="prose prose-lg dark:prose-invert max-w-none">

                {/* Introduction */}
                <div className="mb-12">
                  <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                    {content.intro}
                  </p>
                </div>

                {/* Essential Invoice Elements */}
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.essentialElements.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {content.essentialElements.intro}
                </p>

                <div className="bg-gradient-to-br from-accent/5 to-primary/5 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 mb-8">
                  <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                    {content.essentialElements.subtitle}
                  </h3>
                  <div className="space-y-4">
                    {content.essentialElements.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Box */}
                <div className="bg-gradient-to-br from-primary to-primary-dark dark:from-primary dark:to-primary-dark rounded-2xl p-8 my-12 text-center shadow-xl">
                  <FileText className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">
                    {content.ctaBox1.title}
                  </h3>
                  <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    {content.ctaBox1.description}
                  </p>
                  <Link
                    href={`/${locale}/tools/invoice-generator`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary hover:bg-gray-100 font-heading font-semibold rounded-lg shadow-lg transition-all"
                  >
                    <Download className="w-5 h-5" />
                    {content.ctaBox1.cta}
                  </Link>
                </div>

                {/* Best Practices */}
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.bestPractices.title}
                </h2>

                {content.bestPractices.practices.map((practice, index) => (
                  <div key={index}>
                    <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
                      {practice.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {practice.content}
                    </p>
                    {practice.list && (
                      <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
                        {practice.list.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {/* Common Mistakes */}
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.commonMistakes.title}
                </h2>

                <div className="space-y-6 mb-8">
                  {content.commonMistakes.mistakes.map((mistake, index) => (
                    <div key={index} className="border-l-4 border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20 p-6 rounded-r-lg">
                      <h4 className="font-semibold text-red-900 dark:text-red-400 mb-2">{mistake.title}</h4>
                      <p className="text-red-800 dark:text-red-300 text-sm">
                        {mistake.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Conclusion */}
                <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
                  {content.conclusion.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {content.conclusion.p1}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {content.conclusion.p2}
                </p>

                {/* Internal Links */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
                    {content.relatedResources.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.relatedResources.links.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <FileText className="w-6 h-6 text-primary" />
                        <span className="font-semibold text-gray-900 dark:text-white">{link.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>

              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
