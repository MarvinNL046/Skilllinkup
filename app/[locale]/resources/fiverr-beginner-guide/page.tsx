import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const slug = 'fiverr-beginner-guide';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
  const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

  if (locale === 'nl') {
    return {
      title: "Fiverr voor Beginners: Maak een Winnend Verkopersprofiel 2025",
      description: "Volledige beginnersgids voor Fiverr succes. Leer hoe je een hoogconverterend verkopersprofiel maakt, gigs strategisch prijst en snel je eerste klanten binnenhaalt.",
      keywords: "fiverr beginners gids, fiverr profiel maken, fiverr gig aanmaken, fiverr verkoper worden, fiverr tips nederland",
      openGraph: {
        title: "Fiverr voor Beginners: Maak een Winnend Verkopersprofiel 2025",
        description: "Volledige beginnersgids voor Fiverr succes. Leer hoe je een hoogconverterend verkopersprofiel maakt, gigs strategisch prijst en snel je eerste klanten binnenhaalt.",
        url: pageUrl,
        siteName: 'SkillLinkup',
        images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Fiverr voor Beginners: Maak een Winnend Verkopersprofiel 2025' }],
        locale: "nl_NL",
        type: "article",
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Fiverr voor Beginners: Maak een Winnend Verkopersprofiel 2025',
        description: 'Volledige beginnersgids voor Fiverr succes. Leer hoe je een hoogconverterend verkopersprofiel maakt.',
        images: [`${siteUrl}/images/og/resources-og.png`],
        creator: '@SkillLinkup',
        site: '@SkillLinkup',
      },
      alternates: {
        canonical: pageUrl,
        languages: {
          'en': `${siteUrl}/en/resources/${slug}`,
          'nl': `${siteUrl}/nl/resources/${slug}`,
        },
      },
      robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
      },
    };
  }

  return {
    title: "Fiverr for Beginners: Create a Winning Seller Profile in 2025",
    description: "Complete beginner's guide to Fiverr success. Learn how to create a high-converting seller profile, price gigs strategically, and land your first clients fast.",
    keywords: "fiverr beginner guide, fiverr seller profile, fiverr gig creation, how to start on fiverr, fiverr tips 2025",
    openGraph: {
      title: "Fiverr for Beginners: Create a Winning Seller Profile in 2025",
      description: "Complete beginner's guide to Fiverr success. Learn how to create a high-converting seller profile, price gigs strategically, and land your first clients fast.",
      url: pageUrl,
      siteName: 'SkillLinkup',
      images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Fiverr for Beginners: Create a Winning Seller Profile in 2025' }],
      locale: 'en_US',
      type: "article",
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Fiverr for Beginners: Create a Winning Seller Profile in 2025',
      description: "Complete beginner's guide to Fiverr success. Learn how to create a high-converting seller profile.",
      images: [`${siteUrl}/images/og/resources-og.png`],
      creator: '@SkillLinkup',
      site: '@SkillLinkup',
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'en': `${siteUrl}/en/resources/${slug}`,
        'nl': `${siteUrl}/nl/resources/${slug}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export default async function FiverrBeginnerGuidePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    hero: {
      badge: "Beginnersgids",
      h1: "Fiverr voor Beginners: Maak een Winnend Verkopersprofiel",
      intro: "Start je freelance carrière op Fiverr met vertrouwen. Deze complete beginnersgids toont je precies hoe je een profiel maakt dat klanten aantrekt en vanaf dag één verkopen genereert.",
      cta1: "Vergelijk Platforms",
      cta2: "Lees Reviews"
    },
    stats: {
      stat1: { value: "24-48u", label: "Gemiddelde Tijd tot Eerste Order" },
      stat2: { value: "20%", label: "Platform Commissie Tarief" },
      stat3: { value: "160+", label: "Actieve Landen" }
    },
    intro: {
      title: "Waarom Fiverr Perfect is voor Beginners",
      text1: "Fiverr heeft freelancen gerevolutioneerd door het traditionele model om te draaien. In plaats van op opdrachten te bieden, maak je 'gigs' (dienstaanbiedingen) die klanten direct kunnen kopen. Dit maakt Fiverr bijzonder beginnersvriendelijk omdat jij je diensten bepaalt, je prijzen instelt en wacht tot klanten naar jou toekomen.",
      benefits: {
        title: "Belangrijkste Voordelen voor Nieuwe Freelancers:",
        list: [
          { bold: "Geen proposals schrijven:", text: "Klanten vinden en kopen je gigs direct" },
          { bold: "Ingebouwd verkeer:", text: "Fiverr stuurt kopers naar categorieën en zoekresultaten" },
          { bold: "Betalingsbescherming:", text: "Geld in escrow tot goedkeuring levering" },
          { bold: "Duidelijke prijsstructuur:", text: "Pakketgebaseerde prijzen maken scopebeheer makkelijker" },
          { bold: "Niveausysteem:", text: "Gamified progressie motiveert en beloont consistentie" }
        ]
      }
    },
    section1: {
      title: "Stap 1: Maak Je Verkopersaccount",
      subtitle: "Profielbasics die Converteren",
      text: "Je profiel is je eerste indruk. Complete profielen ontvangen 60% meer kliks dan onvolledige. Dit is wat het meest telt:",
      photo: {
        title: "Professionele Profielfoto",
        text: "Gebruik een kwalitatieve headshot met goede verlichting. Glimlach natuurlijk, kijk recht in de camera en gebruik een neutrale achtergrond. Foto's met gezichten krijgen 40% meer engagement dan logo's of generieke afbeeldingen.",
        do: {
          title: "✓ Doe Dit:",
          items: ["Duidelijke, professionele headshot", "Vriendelijke, toegankelijke glimlach", "Goede verlichting en kwaliteit", "Effen of wazige achtergrond"]
        },
        avoid: {
          title: "✗ Vermijd:",
          items: ["Groepsfoto's of selfies", "Logo's of stockafbeeldingen", "Donkere of wazige foto's", "Zonnebril of hoeden"]
        }
      },
      description: {
        title: "Overtuigende Beschrijving",
        text: "Je beschrijving moet beantwoorden: Wie ben je? Wat doe je? Waarom moeten klanten jou kiezen?",
        template: "Voorbeeld Template:",
        example: "Hoi! Ik ben [Naam], een [jouw titel] met [X jaar] ervaring in het helpen van [doelklanten] om [specifiek resultaat] te bereiken. Ik specialiseer me in [3 kernvaardigheden] en heb [X projecten voltooid/Y resultaten geleverd]. Als je met mij werkt, krijg je [uniek voordeel]. Laten we je project bespreken!"
      },
      skills: {
        title: "Vaardigheden & Talen",
        text: "Voeg 10-15 relevante vaardigheden toe die bij je gigs passen. Elke vaardigheid helpt je verschijnen in meer zoekopdrachten. Voor talen: wees eerlijk over niveaus—moedertaal, vloeiend, conversatie of basis."
      }
    },
    ctaMid: {
      title: "Moet je Je Perfecte Prijzen Berekenen?",
      text: "Gebruik onze gratis tariefcalculator om competitieve prijzen te bepalen die je kosten dekken en inkomsten maximaliseren.",
      button: "Bereken Je Tarief Nu"
    },
    section2: {
      title: "Stap 2: Maak Je Eerste Winnende Gig",
      gigTitle: {
        title: "Gig Titel Strategie",
        text: "Je gig titel heeft 80 karakters om iemand te overtuigen te klikken. Begin met 'Ik zal' en voeg je dienst, methode en voordeel toe.",
        weak: "❌ Zwakke Titel:",
        weakExample: "Ik zal een logo ontwerpen",
        strong: "✅ Sterke Titel:",
        strongExample: "Ik zal een modern minimalistisch logo voor je merk ontwerpen in 24 uur",
        formula: "Titel Formule:",
        formulaText: "Ik zal + [Actie Werkwoord] + [Specifieke Dienst] + [Stijl/Methode] + [Voor Wie] + [Tijdsbestek/Voordeel]"
      },
      category: {
        title: "Categorie, Subcategorie & Tags",
        text: "Kies de meest specifieke categorie mogelijk. Probeer niet in meerdere categorieën te passen—focus laserscherp op één niche.",
        strategy: "Tag Selectie Strategie:",
        steps: [
          "Onderzoek wat succesvolle verkopers in je niche gebruiken (bekijk top-ranked gigs)",
          "Gebruik alle 5 beschikbare tags—ze zijn cruciaal voor zoekzichtbaarheid",
          "Balanceer populaire tags (veel verkeer) met specifieke tags (minder concurrentie)",
          "Match tags met termen die kopers daadwerkelijk zoeken (geen technisch jargon)"
        ]
      },
      pricing: {
        title: "Prijspakket Strategie",
        text: "Fiverr biedt drie pakketten: Basic, Standard en Premium. Deze gelaagde structuur verhoogt de gemiddelde orderwaarde dramatisch door duidelijke upgrade paden te bieden.",
        table: {
          package: "Pakket",
          purpose: "Doel",
          strategy: "Prijs Strategie",
          basic: { package: "Basic", purpose: "Instappunt, waarde bewijzen", price: "€25-50 (competitief)" },
          standard: { package: "Standard", purpose: "Sweet spot, populairst", price: "2-3x Basic prijs" },
          premium: { package: "Premium", purpose: "Hoogwaardig, volledige service", price: "4-5x Basic prijs" }
        },
        tip: "💡 Pro Tip:",
        tipText: "De meeste kopers kiezen de middelste optie (Standard). Maak deze aantrekkelijk met 2-3 overtuigende extra's vergeleken met Basic, maar bewaar 2-3 premium features alleen voor de Premium tier."
      },
      gigDescription: {
        title: "Hoogconverterende Gig Beschrijving",
        text: "Je beschrijving moet 1.000-1.500 karakters zijn, scanbaar en gericht op kopervoordelen (niet alleen features).",
        structure: "Winnende Beschrijving Structuur:",
        steps: [
          { title: "Hook (2-3 zinnen):", text: "Spreek direct het pijnpunt of verlangen van de koper aan" },
          { title: "Wat Je Krijgt (lijst met bullets):", text: "Duidelijke opleverpunten met specifieke details" },
          { title: "Waarom Mij Kiezen (3-4 punten):", text: "Je unieke voordelen, credentials of resultaten" },
          { title: "Proces (optioneel):", text: "Hoe jullie samen zullen werken, stap voor stap" },
          { title: "Call to Action:", text: "'Klik 'Doorgaan' om te beginnen' of 'Stuur me een bericht met vragen'" }
        ]
      },
      visuals: {
        title: "Visuele Assets die Verkopen",
        images: {
          title: "Gig Afbeeldingen (3 verplicht, tot 7 totaal)",
          text: "Je eerste afbeelding is de thumbnail—deze moet aandacht trekken in zoekresultaten. Gebruik hoge resolutie afbeeldingen (1280x768px aanbevolen) met duidelijke tekstoverlays.",
          list: [
            "Afbeelding 1: Opvallende thumbnail met voordeel-tekst overlay",
            "Afbeeldingen 2-3: Portfolio voorbeelden of oplevering previews",
            "Afbeeldingen 4-7: Extra werkvoorbeelden, procesvisualisatie of features"
          ]
        },
        video: {
          title: "Gig Video (Sterk Aanbevolen)",
          text: "Gigs met video's ontvangen 220% meer orders dan gigs zonder. Je video moet 30-90 seconden zijn, je gezicht tonen en je dienst duidelijk uitleggen.",
          script: "Simpel Video Script:",
          example: "Hoi, ik ben [Naam]! Ik zal [dienst] voor je doen door [methode]. Je krijgt [opleverpunten] in [tijdsbestek]. Ik heb [X klanten] geholpen [resultaat] te bereiken. Laten we samenwerken—klik Doorgaan om te beginnen!"
        }
      }
    },
    section3: {
      title: "Stap 3: Haal Snel Je Eerste Orders Binnen",
      text: "Die eerste verkoop is cruciaal—het ontgrendelt reviews en sociaal bewijs. Zo versnel je je eerste order:",
      promote: {
        title: "💎 Promoot Je Gigs",
        items: [
          "Deel op social media (LinkedIn, Twitter, Instagram)",
          "Post in relevante Facebook groepen of communities",
          "Benader je bestaande netwerk",
          "Gebruik Fiverr's 'Deel Je Gig' functie"
        ]
      },
      requests: {
        title: "⚡ Buyer Requests",
        text: "Fiverr heeft een 'Buyer Requests' sectie waar klanten hun behoeften posten. Nieuwe verkopers kunnen 10 offers per dag sturen naar deze verzoeken.",
        formula: "Succes Formule:",
        items: [
          "Reageer binnen minuten na posting",
          "Personaliseer elk aanbod naar het verzoek",
          "Gebruik alle 10 dagelijkse aanbiedingen consistent",
          "Track respons percentages en optimaliseer"
        ]
      },
      intro: {
        title: "🎁 Bied een Onweerstaanbare Introprijs",
        text: "Overweeg je eerste 5-10 orders met korting te prijzen om snel reviews op te bouwen. Zodra je 10+ vijfsterren reviews hebt, kun je prijzen significant verhogen.",
        example: "Voorbeeld Strategie:",
        items: [
          "Orders 1-5: €15 (introprijs voor reviews)",
          "Orders 6-20: €35 (normale competitieve prijs)",
          "Order 21+: €50+ (premium prijs met kwaliteitsbewijs)"
        ]
      }
    },
    section4: {
      title: "Fiverr Verkoper Niveaus Begrijpen",
      text: "Fiverr gebruikt een gamified niveausysteem dat consistentie en kwaliteit beloont. Hogere niveaus ontgrendelen betere zichtbaarheid, prijsflexibiliteit en klantvertrouwen.",
      levels: {
        new: {
          title: "Nieuwe Verkoper",
          req: "Vereisten: Account aangemaakt",
          desc: "Beperkte zichtbaarheid, geen extra's beschikbaar, moet betrouwbaarheid bewijzen"
        },
        one: {
          title: "Level One Verkoper",
          req: "Vereisten: 60+ dagen actief, 10+ orders voltooid, €400+ verdiend, 4.7+ rating",
          desc: "Ontgrendel gig extras, betere zoekplaatsing, kan custom aanbiedingen doen"
        },
        two: {
          title: "Level Two Verkoper",
          req: "Vereisten: 120+ dagen actief, 50+ orders, €2.000+ verdiend, 4.7+ rating, 90%+ op tijd levering",
          desc: "Prioriteit support, badge zichtbaarheid boost, kan tot 7 actieve gigs maken"
        },
        top: {
          title: "Top Rated Verkoper",
          req: "Vereisten: Alleen op uitnodiging, 180+ dagen als Level Two, uitzonderlijke service metrics",
          desc: "Premium badge, maximale zichtbaarheid, toegewijde account manager, Fiverr Business verwijzingen"
        }
      },
      strategy: {
        title: "💡 Level Progressie Strategie",
        text: "Focus op het op tijd voltooien van orders met uitzonderlijke kwaliteit tijdens je eerste 90 dagen. Behoud een 4.9+ rating door overcommunicatie met klanten en lever meer dan verwacht. De meeste succesvolle verkopers bereiken Level Two binnen 6-12 maanden door consistentie te behouden en prijzen geleidelijk te verhogen naarmate reviews zich opstapelen."
      }
    },
    relatedLinks: {
      title: "Ga Verder met Je Onderzoek",
      links: [
        { href: "platforms", title: "Vergelijk Alle Platforms →", desc: "Zie hoe Fiverr scoort ten opzichte van 25+ andere freelance marktplaatsen" },
        { href: "reviews", title: "Lees Fiverr Reviews →", desc: "Echte verkoperservaringen, inkomstenrapporten en succesverhalen" },
        { href: "tools/rate-calculator", title: "Tariefcalculator Tool →", desc: "Bereken competitieve Fiverr prijzen op basis van je kosten en markt" },
        { href: "comparisons", title: "Gedetailleerde Vergelijkingen →", desc: "Fiverr vs Upwork, Freelancer.com en andere platforms" }
      ]
    },
    finalCta: {
      title: "Klaar om Je Fiverr Journey te Starten?",
      text: "Gebruik deze gids om je winnende profiel te maken, je eerste gig te lanceren en binnen dagen te verdienen.",
      button1: "Ontdek Alle Platforms",
      button2: "Ontvang Wekelijkse Tips"
    }
  } : {
    hero: {
      badge: "Beginner's Guide",
      h1: "Fiverr for Beginners: Create a Winning Seller Profile",
      intro: "Launch your freelance career on Fiverr with confidence. This complete beginner's guide shows you exactly how to create a profile that attracts clients and generates sales from day one.",
      cta1: "Compare Platforms",
      cta2: "Read Reviews"
    },
    stats: {
      stat1: { value: "24-48h", label: "Average Time to First Order" },
      stat2: { value: "20%", label: "Platform Commission Rate" },
      stat3: { value: "160+", label: "Countries Active" }
    },
    intro: {
      title: "Why Fiverr is Perfect for Beginners",
      text1: "Fiverr revolutionized freelancing by flipping the traditional model. Instead of bidding on jobs, you create 'gigs' (service listings) that clients purchase directly. This makes Fiverr exceptionally beginner-friendly because you define your services, set your prices, and wait for clients to come to you.",
      benefits: {
        title: "Key Advantages for New Freelancers:",
        list: [
          { bold: "No proposal writing:", text: "Clients find and purchase your gigs directly" },
          { bold: "Built-in traffic:", text: "Fiverr sends buyers to browse categories and search" },
          { bold: "Payment protection:", text: "Funds held in escrow until delivery approval" },
          { bold: "Clear pricing structure:", text: "Package-based pricing makes scope management easier" },
          { bold: "Leveling system:", text: "Gamified progression motivates and rewards consistency" }
        ]
      }
    },
    section1: {
      title: "Step 1: Create Your Seller Account",
      subtitle: "Profile Basics That Convert",
      text: "Your profile is your first impression. Complete profiles receive 60% more clicks than incomplete ones. Here's what matters most:",
      photo: {
        title: "Professional Profile Photo",
        text: "Use a high-quality headshot with good lighting. Smile naturally, face the camera directly, and use a clean background. Photos with faces get 40% more engagement than logos or generic images.",
        do: {
          title: "✓ Do This:",
          items: ["Clear, professional headshot", "Friendly, approachable smile", "Good lighting and quality", "Solid or blurred background"]
        },
        avoid: {
          title: "✗ Avoid:",
          items: ["Group photos or selfies", "Logos or stock images", "Dark or blurry photos", "Sunglasses or hats"]
        }
      },
      description: {
        title: "Compelling Description",
        text: "Your description should answer: Who are you? What do you do? Why should clients choose you?",
        template: "Example Template:",
        example: "Hi! I'm [Name], a [your title] with [X years] experience helping [target clients] achieve [specific result]. I specialize in [3 key skills] and have completed [X projects/delivered Y results]. When you work with me, you get [unique benefit]. Let's discuss your project!"
      },
      skills: {
        title: "Skills & Languages",
        text: "Add 10-15 relevant skills that match your gigs. Each skill helps you appear in more searches. For languages, be honest about proficiency levels—native, fluent, conversational, or basic."
      }
    },
    ctaMid: {
      title: "Need to Calculate Your Perfect Pricing?",
      text: "Use our free rate calculator to determine competitive pricing that covers your costs and maximizes earnings.",
      button: "Calculate Your Rate Now"
    },
    section2: {
      title: "Step 2: Create Your First Winning Gig",
      gigTitle: {
        title: "Gig Title Strategy",
        text: "Your gig title has 80 characters to convince someone to click. It should start with 'I will' and include your service, method, and benefit.",
        weak: "❌ Weak Title:",
        weakExample: "I will design a logo",
        strong: "✅ Strong Title:",
        strongExample: "I will design a modern minimalist logo for your brand in 24 hours",
        formula: "Title Formula:",
        formulaText: "I will + [Action Verb] + [Specific Service] + [Style/Method] + [For Whom] + [Timeframe/Benefit]"
      },
      category: {
        title: "Category, Subcategory & Tags",
        text: "Choose the most specific category possible. Don't try to fit into multiple categories—be laser-focused on one niche.",
        strategy: "Tag Selection Strategy:",
        steps: [
          "Research what successful sellers in your niche use (check top-ranked gigs)",
          "Use all 5 available tags—they're critical for search visibility",
          "Balance popular tags (high traffic) with specific tags (less competition)",
          "Match tags to terms buyers actually search (not technical jargon)"
        ]
      },
      pricing: {
        title: "Pricing Package Strategy",
        text: "Fiverr allows three packages: Basic, Standard, and Premium. This tiered structure dramatically increases average order value by offering clear upgrade paths.",
        table: {
          package: "Package",
          purpose: "Purpose",
          strategy: "Price Strategy",
          basic: { package: "Basic", purpose: "Entry point, prove value", price: "$25-50 (competitive)" },
          standard: { package: "Standard", purpose: "Sweet spot, most popular", price: "2-3x Basic price" },
          premium: { package: "Premium", purpose: "High-value, full service", price: "4-5x Basic price" }
        },
        tip: "💡 Pro Tip:",
        tipText: "Most buyers choose the middle option (Standard). Make it attractive with 2-3 compelling extras compared to Basic, but leave 2-3 premium features for the Premium tier only."
      },
      gigDescription: {
        title: "High-Converting Gig Description",
        text: "Your description should be 1,000-1,500 characters, scannable, and focused on buyer benefits (not just features).",
        structure: "Winning Description Structure:",
        steps: [
          { title: "Hook (2-3 sentences):", text: "Address the buyer's pain point or desire immediately" },
          { title: "What You'll Get (bulleted list):", text: "Clear deliverables with specific details" },
          { title: "Why Choose Me (3-4 points):", text: "Your unique advantages, credentials, or results" },
          { title: "Process (optional):", text: "How you'll work together, step by step" },
          { title: "Call to Action:", text: "'Click 'Continue' to get started' or 'Message me with questions'" }
        ]
      },
      visuals: {
        title: "Visual Assets That Sell",
        images: {
          title: "Gig Images (3 required, up to 7 total)",
          text: "Your first image is the thumbnail—it must grab attention in search results. Use high-resolution images (1280x768px recommended) with clear text overlays.",
          list: [
            "Image 1: Eye-catching thumbnail with service benefit text overlay",
            "Images 2-3: Portfolio examples or deliverable previews",
            "Images 4-7: Additional work samples, process visualization, or features"
          ]
        },
        video: {
          title: "Gig Video (Highly Recommended)",
          text: "Gigs with videos receive 220% more orders than those without. Your video should be 30-90 seconds, show your face, and explain your service clearly.",
          script: "Simple Video Script:",
          example: "Hi, I'm [Name]! I'll [service] for you by [method]. You'll get [deliverables] in [timeframe]. I've helped [X clients] achieve [result]. Let's work together—click Continue to get started!"
        }
      }
    },
    section3: {
      title: "Step 3: Land Your First Orders Fast",
      text: "Getting that first sale is crucial—it unlocks reviews and social proof. Here's how to accelerate your first order:",
      promote: {
        title: "💎 Promote Your Gigs",
        items: [
          "Share on social media (LinkedIn, Twitter, Instagram)",
          "Post in relevant Facebook groups or communities",
          "Reach out to your existing network",
          "Use Fiverr's 'Share Your Gig' feature"
        ]
      },
      requests: {
        title: "⚡ Buyer Requests",
        text: "Fiverr has a 'Buyer Requests' section where clients post needs. New sellers can submit 10 offers per day to these requests.",
        formula: "Success Formula:",
        items: [
          "Respond within minutes of posting",
          "Personalize each offer to the request",
          "Use all 10 daily offers consistently",
          "Track response rates and optimize"
        ]
      },
      intro: {
        title: "🎁 Offer an Irresistible Intro Price",
        text: "Consider pricing your first 5-10 orders at a discount to build reviews quickly. Once you have 10+ five-star reviews, you can raise prices significantly.",
        example: "Example Strategy:",
        items: [
          "Orders 1-5: $15 (intro price to get reviews)",
          "Orders 6-20: $35 (normal competitive price)",
          "Order 21+: $50+ (premium price with proof of quality)"
        ]
      }
    },
    section4: {
      title: "Understanding Fiverr's Seller Levels",
      text: "Fiverr uses a gamified leveling system that rewards consistency and quality. Higher levels unlock better visibility, pricing flexibility, and customer trust.",
      levels: {
        new: {
          title: "New Seller",
          req: "Requirements: Account created",
          desc: "Limited visibility, no extras available, must prove reliability"
        },
        one: {
          title: "Level One Seller",
          req: "Requirements: 60+ days active, 10+ orders completed, $400+ earned, 4.7+ rating",
          desc: "Unlock gig extras, better search placement, can offer custom offers"
        },
        two: {
          title: "Level Two Seller",
          req: "Requirements: 120+ days active, 50+ orders, $2,000+ earned, 4.7+ rating, 90%+ on-time delivery",
          desc: "Priority support, badge visibility boost, can create up to 7 active gigs"
        },
        top: {
          title: "Top Rated Seller",
          req: "Requirements: Invitation only, 180+ days as Level Two, exceptional service metrics",
          desc: "Premium badge, maximum visibility, dedicated account manager, Fiverr Business referrals"
        }
      },
      strategy: {
        title: "💡 Level Progression Strategy",
        text: "Focus on completing orders on time with exceptional quality during your first 90 days. Maintain a 4.9+ rating by over-communicating with clients and delivering beyond expectations. Most successful sellers reach Level Two within 6-12 months by maintaining consistency and gradually raising prices as reviews accumulate."
      }
    },
    relatedLinks: {
      title: "Continue Your Research",
      links: [
        { href: "platforms", title: "Compare All Platforms →", desc: "See how Fiverr stacks up against 25+ other freelance marketplaces" },
        { href: "reviews", title: "Read Fiverr Reviews →", desc: "Real seller experiences, earnings reports, and success stories" },
        { href: "tools/rate-calculator", title: "Rate Calculator Tool →", desc: "Calculate competitive Fiverr pricing based on your costs and market" },
        { href: "comparisons", title: "Detailed Comparisons →", desc: "Fiverr vs Upwork, Freelancer.com, and other platforms" }
      ]
    },
    finalCta: {
      title: "Ready to Start Your Fiverr Journey?",
      text: "Use this guide to create your winning profile, launch your first gig, and start earning within days.",
      button1: "Explore All Platforms",
      button2: "Get Weekly Tips"
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": locale === 'nl' ? "Fiverr voor Beginners: Hoe je een Winnend Verkopersprofiel Maakt" : "Fiverr for Beginners: How to Create a Winning Seller Profile",
    "description": locale === 'nl' ? "Stap-voor-stap gids voor beginners om een succesvol Fiverr verkopersprofiel te maken en hun eerste klanten binnen te halen." : "Step-by-step guide for beginners to create a successful Fiverr seller profile and land their first clients.",
    "inLanguage": locale === 'nl' ? "nl" : "en",
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
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-accent/10 via-white to-primary/10 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 dark:bg-accent/30 text-accent dark:text-accent mb-6">
                <span className="text-2xl">🚀</span>
                <span className="text-sm font-heading font-semibold">{content.hero.badge}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                {content.hero.h1}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {content.hero.intro}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white font-heading font-semibold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
                >
                  {content.hero.cta1}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/reviews`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-accent dark:text-accent border-2 border-accent dark:border-accent font-heading font-semibold hover:bg-accent/5 dark:hover:bg-accent/10 transition-all"
                >
                  {content.hero.cta2}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 text-center border border-accent/20">
                  <div className="text-4xl mb-3">⚡</div>
                  <div className="text-3xl font-heading font-bold text-accent mb-2">{content.stats.stat1.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{content.stats.stat1.label}</div>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 text-center border border-primary/20">
                  <div className="text-4xl mb-3">💰</div>
                  <div className="text-3xl font-heading font-bold text-primary mb-2">{content.stats.stat2.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{content.stats.stat2.label}</div>
                </div>
                <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 dark:from-secondary/20 dark:to-secondary/10 rounded-xl p-6 text-center border border-secondary/20">
                  <div className="text-4xl mb-3">🌍</div>
                  <div className="text-3xl font-heading font-bold text-secondary mb-2">{content.stats.stat3.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{content.stats.stat3.label}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content - Intro */}
        <article className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <section className="mb-16">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">🎯</span>
                    {content.intro.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    {content.intro.text1}
                  </p>
                  <div className="bg-gradient-to-r from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border-l-4 border-accent">
                    <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <span>✨</span>
                      {content.intro.benefits.title}
                    </h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      {content.intro.benefits.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-accent mt-1">→</span>
                          <span><strong>{item.bold}</strong> {item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Final CTA */}
              <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                      {content.finalCta.title}
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                      {content.finalCta.text}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Link
                        href={`/${locale}/platforms`}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent text-white font-heading font-bold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
                      >
                        {content.finalCta.button1}
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                      <Link
                        href={`/${locale}/newsletter`}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white dark:bg-gray-800 text-accent dark:text-accent border-2 border-accent dark:border-accent font-heading font-bold hover:bg-accent/5 dark:hover:bg-accent/10 transition-all"
                      >
                        {content.finalCta.button2}
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
