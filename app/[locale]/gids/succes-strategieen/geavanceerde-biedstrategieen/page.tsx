import Link from 'next/link';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: 'Geavanceerde Biedstrategieën voor Freelancers: Win 70%+ van je Proposals',
    description: 'Leer geavanceerde strategieën voor het winnen van freelance projecten. Psychology-based proposal writing, competitive analysis, en pricing strategies voor maximale win rate.',
    keywords: 'freelance biedstrategie, proposals winnen, upwork bidding, freelancer proposals, win rate verhogen, pricing strategy, proposal writing',
    openGraph: {
      title: 'Geavanceerde Biedstrategieën: Win 70%+ van je Freelance Proposals',
      description: 'Psychology-based strategieën voor het consistent winnen van high-value freelance projecten',
      type: 'article',
      locale: locale,
      siteName: 'SkillLinkup',
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://skilllinkup.com/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Gids",
        "item": `https://skilllinkup.com/${locale}/gids`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Succes Strategieën",
        "item": `https://skilllinkup.com/${locale}/gids/succes-strategieen`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Geavanceerde Biedstrategieën",
        "item": `https://skilllinkup.com/${locale}/gids/succes-strategieen/geavanceerde-biedstrategieen`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Geavanceerde Biedstrategieën voor Freelancers: Win 70%+ van je Proposals",
    "description": "Psychology-based strategieën voor het consistent winnen van high-value freelance projecten met geavanceerde proposal technieken.",
    "author": {
      "@type": "Organization",
      "name": "SkillLinkup"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SkillLinkup",
      "logo": {
        "@type": "ImageObject",
        "url": "https://skilllinkup.com/images/logo.png"
      }
    },
    "datePublished": "2026-01-15",
    "dateModified": "2026-01-15",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://skilllinkup.com/${locale}/gids/succes-strategieen/geavanceerde-biedstrategieen`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="bg-gradient-to-b from-[#1e1541] to-[#2a1f5f] py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-8" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-gray-300">
              <li><Link href={`/${locale}`} className="hover:text-[#ef2b70] transition-colors">Home</Link></li>
              <li className="text-gray-500">/</li>
              <li><Link href={`/${locale}/gids`} className="hover:text-[#ef2b70] transition-colors">Gids</Link></li>
              <li className="text-gray-500">/</li>
              <li><Link href={`/${locale}/gids/succes-strategieen`} className="hover:text-[#ef2b70] transition-colors">Succes Strategieën</Link></li>
              <li className="text-gray-500">/</li>
              <li className="text-[#ef2b70]" aria-current="page">Geavanceerde Biedstrategieën</li>
            </ol>
          </nav>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Geavanceerde Biedstrategieën voor Freelancers
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Psychology-based strategieën voor het consistent winnen van high-value projecten met 70%+ win rate.
          </p>
        </div>
      </div>

      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <div className="bg-[#22c55e]/10 border-l-4 border-[#22c55e] p-6 mb-8 rounded-r-lg">
            <p className="text-lg font-semibold text-gray-900 mb-2">🎯 De Win Rate Paradox</p>
            <p className="text-gray-700 mb-0">
              Gemiddelde freelancers winnen <strong>5-15%</strong> van hun proposals. Top performers? <strong>60-80%</strong>.
              Het verschil? Niet talent of ervaring, maar <em>strategie</em>. Ze bieden niet op elk project, maar selecteren
              zorgvuldig en schrijven proposals die psychologisch onweerstaanbaar zijn.
            </p>
          </div>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            De 3 Fases van een Winnende Biedstrategie
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Top freelancers gebruiken een <strong>driedelig systeem</strong> voor elke bid:
          </p>

          <div className="grid gap-6 mb-12">
            <div className="border-l-4 border-[#ef2b70] bg-gray-50 p-6 rounded-r-lg">
              <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-2">
                Fase 1: Pre-Bid Intelligence (30 min)
              </h3>
              <p className="text-gray-700 mb-0">
                Research de klant, concurrent analysis, en beslissen of je überhaupt moet bieden.
              </p>
            </div>

            <div className="border-l-4 border-[#ef2b70] bg-gray-50 p-6 rounded-r-lg">
              <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-2">
                Fase 2: Proposal Construction (45-60 min)
              </h3>
              <p className="text-gray-700 mb-0">
                Schrijven van een gepersonaliseerde, psychology-based proposal die onderscheidt van 50+ andere bids.
              </p>
            </div>

            <div className="border-l-4 border-[#ef2b70] bg-gray-50 p-6 rounded-r-lg">
              <h3 className="font-heading text-xl font-bold text-[#1e1541] mb-2">
                Fase 3: Post-Bid Engagement (10-15 min)
              </h3>
              <p className="text-gray-700 mb-0">
                Follow-up strategie en conversational engagement om van shortlist naar hire te gaan.
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8 rounded-r-lg">
            <p className="text-gray-800 font-semibold mb-2">⏱️ Waarom Zo Veel Tijd per Proposal?</p>
            <p className="text-gray-700 mb-0">
              Een generieke proposal in 10 minuten heeft <strong>5% win rate</strong>. Een strategische proposal van 90 minuten
              heeft <strong>60-80% win rate</strong>. Wat verdien je meer mee? 10 slechte proposals of 2 geweldige?
            </p>
          </div>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            Fase 1: Pre-Bid Intelligence - De Onzichtbare Competitie
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Voordat je zelfs maar begint met schrijven: <strong>verzamel intelligence over de klant en concurrent</strong>.
          </p>

          <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
            Client Research Checklist (15 minuten)
          </h3>

          <ul className="space-y-3 mb-8 ml-6">
            <li className="flex items-start gap-3">
              <span className="text-[#ef2b70] font-bold">✓</span>
              <span className="text-gray-700"><strong>Review history</strong> - Hebben ze eerder freelancers ingehuurd? Wat voor feedback gaven ze?</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#ef2b70] font-bold">✓</span>
              <span className="text-gray-700"><strong>Budget patroon</strong> - Betalen ze fair of zoeken ze bargains?</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#ef2b70] font-bold">✓</span>
              <span className="text-gray-700"><strong>Project beschrijving kwaliteit</strong> - Vage brief = problematische klant</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#ef2b70] font-bold">✓</span>
              <span className="text-gray-700"><strong>LinkedIn/website check</strong> - Wat voor bedrijf is het? Welke tone of voice gebruiken ze?</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#ef2b70] font-bold">✓</span>
              <span className="text-gray-700"><strong>Red flags detectie</strong> - Unrealistic deadlines, scope creep hints, vage requirements</span>
            </li>
          </ul>

          <div className="bg-red-50 border border-red-300 p-6 my-8 rounded-lg">
            <p className="text-gray-800 font-semibold mb-3">🚩 Automatische "No Bid" Red Flags</p>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Budget: "We don't have a budget yet" of onrealistisch laag voor scope</li>
              <li>• Reviews: Klant heeft alleen 1-2 sterren gegeven aan vorige freelancers</li>
              <li>• Scope: "We'll figure it out as we go" - geen duidelijke deliverables</li>
              <li>• Urgency: "Need this done by tomorrow" voor complex werk</li>
              <li>• Payment: "Will pay after we see results" of milestone weigering</li>
            </ul>
          </div>

          <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
            Competitive Analysis (15 minuten)
          </h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Op platforms zoals Upwork en Freelancer zie je hoeveel anderen al geboden hebben. <strong>Gebruik dit in je voordeel</strong>.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
              <p className="font-semibold text-green-800 mb-3">✅ Goede Bid Opportunities</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>5-15 proposals</strong> - Genoeg interesse, niet overweldigend</li>
                <li>• <strong>Recent gepost</strong> - Je bent in de eerste golf</li>
                <li>• <strong>Clear requirements</strong> - Klant weet wat ze willen</li>
                <li>• <strong>Realistic budget</strong> - Matcht marktwaarde</li>
                <li>• <strong>Verified payment</strong> - Serieuze klant</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <p className="font-semibold text-red-800 mb-3">❌ Slechte Bid Opportunities</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>50+ proposals</strong> - Race to the bottom, tijdverspilling</li>
                <li>• <strong>Gepost &gt;7 dagen geleden</strong> - Waarschijnlijk al ingehuurd</li>
                <li>• <strong>Vage description</strong> - Scope creep garantie</li>
                <li>• <strong>Unrealistic budget</strong> - €100 voor een e-commerce site</li>
                <li>• <strong>No payment verified</strong> - Mogelijk tijdverspiller</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#ef2b70] to-[#ff4081] text-white p-8 rounded-xl my-12 shadow-lg">
            <h3 className="font-heading text-2xl font-bold mb-4">🎯 Vind de Beste Projecten voor Jouw Skills</h3>
            <p className="text-lg mb-6 text-white/90">
              Verschillende platforms trekken verschillende soorten projecten en budgetten. Kies strategisch waar je biedt.
            </p>
            <Link
              href={`/${locale}/platforms`}
              className="inline-block bg-white text-[#ef2b70] font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-md"
            >
              Vergelijk Freelance Platforms →
            </Link>
          </div>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            Fase 2: Psychology-Based Proposal Writing
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Een winnende proposal is geen opsomming van je skills. Het is een <strong>psychologisch verhaal</strong> dat de klant
            door een besluitvormingsproces leidt.
          </p>

          <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
            De AIDA Formula voor Freelance Proposals
          </h3>

          <div className="space-y-6 mb-12">
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-lg text-[#1e1541] mb-3">
                A - Attention (Eerste 2 zinnen)
              </h4>
              <p className="text-gray-700 mb-3">
                <strong>Doel:</strong> Laat zien dat je de brief écht gelezen hebt en hun probleem begrijpt.
              </p>
              <div className="bg-white p-4 rounded border border-gray-200">
                <p className="text-gray-700 italic text-sm mb-0">
                  "Ik zie dat je website momenteel een bounce rate van 70%+ heeft op mobiel - dat kost je direct €X per maand
                  in gemiste conversies. Dit is typisch het gevolg van [specifiek technisch probleem]."
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-lg text-[#1e1541] mb-3">
                I - Interest (Paragraaf 2-3)
              </h4>
              <p className="text-gray-700 mb-3">
                <strong>Doel:</strong> Laat zien dat jij dit probleem eerder hebt opgelost met meetbare resultaten.
              </p>
              <div className="bg-white p-4 rounded border border-gray-200">
                <p className="text-gray-700 italic text-sm mb-0">
                  "Vorige maand heb ik een soortgelijk probleem opgelost voor [bedrijf/type klant]. Door [specifieke aanpak]
                  te implementeren, verbeterde de mobile bounce rate van 68% naar 32% in 3 weken, wat resulteerde in
                  40% meer conversies. Hier is de case study: [link]"
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-lg text-[#1e1541] mb-3">
                D - Desire (Paragraaf 4-5)
              </h4>
              <p className="text-gray-700 mb-3">
                <strong>Doel:</strong> Laat ze zien wat er mogelijk is met jouw aanpak.
              </p>
              <div className="bg-white p-4 rounded border border-gray-200">
                <p className="text-gray-700 italic text-sm mb-0">
                  "Voor jouw project zou ik de volgende aanpak nemen: [stap 1], [stap 2], [stap 3].
                  Dit zou resulteren in [specifiek resultaat] binnen [tijdframe]. Ik voeg ook [bonus deliverable] toe
                  om te zorgen dat de resultaten behouden blijven na oplevering."
                </p>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-lg text-[#1e1541] mb-3">
                A - Action (Laatste paragraaf + CTA)
              </h4>
              <p className="text-gray-700 mb-3">
                <strong>Doel:</strong> Maak het makkelijk om 'ja' te zeggen met een duidelijke volgende stap.
              </p>
              <div className="bg-white p-4 rounded border border-gray-200">
                <p className="text-gray-700 italic text-sm mb-0">
                  "Ik kan volgende week starten. Mijn voorstel: laten we een kort 15-min gesprek plannen waar ik je
                  mijn aanpak kan laten zien en we kunnen bespreken of dit past bij je verwachtingen.
                  Wanneer zou jou het beste uitkomen?"
                </p>
              </div>
            </div>
          </div>

          <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
            7 Psychologie Triggers in Proposals
          </h3>

          <div className="space-y-4 mb-8">
            <div className="border-l-4 border-[#22c55e] pl-6">
              <h4 className="font-semibold text-gray-900 mb-2">1. Social Proof</h4>
              <p className="text-gray-700 text-sm">
                "Ik heb dit voor 15+ klanten gedaan, waaronder [bekende namen of industrie]" - mensen volgen de massa.
              </p>
            </div>

            <div className="border-l-4 border-[#22c55e] pl-6">
              <h4 className="font-semibold text-gray-900 mb-2">2. Specificity</h4>
              <p className="text-gray-700 text-sm">
                "40% meer conversies" klinkt geloofwaardiger dan "Veel meer conversies". Specifieke getallen = expertise.
              </p>
            </div>

            <div className="border-l-4 border-[#22c55e] pl-6">
              <h4 className="font-semibold text-gray-900 mb-2">3. Scarcity</h4>
              <p className="text-gray-700 text-sm">
                "Ik kan volgende week starten, maar daarna zit ik vol tot eind maart" - beperkte beschikbaarheid verhoogt waarde.
              </p>
            </div>

            <div className="border-l-4 border-[#22c55e] pl-6">
              <h4 className="font-semibold text-gray-900 mb-2">4. Loss Aversion</h4>
              <p className="text-gray-700 text-sm">
                "Je verliest nu €X per maand door dit probleem" werkt beter dan "Je kunt €X verdienen door dit op te lossen".
              </p>
            </div>

            <div className="border-l-4 border-[#22c55e] pl-6">
              <h4 className="font-semibold text-gray-900 mb-2">5. Authority</h4>
              <p className="text-gray-700 text-sm">
                Link naar je blog, case studies, of certificeringen - laat zien dat je een erkende expert bent.
              </p>
            </div>

            <div className="border-l-4 border-[#22c55e] pl-6">
              <h4 className="font-semibold text-gray-900 mb-2">6. Reciprocity</h4>
              <p className="text-gray-700 text-sm">
                Geef gratis waarde in je proposal (mini audit, strategy document) - mensen voelen zich verplicht terug te geven.
              </p>
            </div>

            <div className="border-l-4 border-[#22c55e] pl-6">
              <h4 className="font-semibold text-gray-900 mb-2">7. Likeability</h4>
              <p className="text-gray-700 text-sm">
                Gebruik hun taal en tone. Formele klant? Formele proposal. Startup? Casual en energiek. Spiegelen = vertrouwen.
              </p>
            </div>
          </div>

          <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
            Pricing Strategy: The Anchoring Effect
          </h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Hoe je je prijs presenteert is <strong>net zo belangrijk</strong> als de prijs zelf.
          </p>

          <div className="bg-green-50 border border-green-300 p-6 my-8 rounded-lg">
            <p className="text-gray-800 font-semibold mb-3">✅ Goede Pricing Presentatie</p>
            <div className="bg-white p-4 rounded border border-gray-200 mb-3">
              <p className="text-gray-700 mb-2">
                <strong>Option 1: Complete Package</strong> - €5,500
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Volledige website redesign (5 pagina's)</li>
                <li>• Mobile optimization</li>
                <li>• SEO setup</li>
                <li>• 30 dagen support na launch</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border border-gray-200">
              <p className="text-gray-700 mb-2">
                <strong>Option 2: Basic Package</strong> - €3,200
              </p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Website redesign (5 pagina's)</li>
                <li>• Mobile optimization</li>
              </ul>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Psychologie:</strong> De dure optie maakt de middelste optie redelijk lijken. 70% kiest de complete package.
            </p>
          </div>

          <div className="bg-red-50 border border-red-300 p-6 my-8 rounded-lg">
            <p className="text-gray-800 font-semibold mb-3">❌ Slechte Pricing Presentatie</p>
            <div className="bg-white p-4 rounded border border-gray-200">
              <p className="text-gray-700 mb-0">
                "Mijn uurtarief is €80/uur en dit project kost ongeveer 40-60 uur, dus tussen de €3200-€4800."
              </p>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Waarom slecht?</strong> Onduidelijke totaalprijs, focus op uren ipv resultaat, en geen keuze optie.
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#1e1541] to-[#2a1f5f] text-white p-8 rounded-xl my-12 shadow-lg">
            <h3 className="font-heading text-2xl font-bold mb-4">💼 Klaar om te Winnen?</h3>
            <p className="text-lg mb-6 text-white/90">
              Verschillende platforms hebben verschillende bidding interfaces en regels. Kies het platform dat jouw strategie ondersteunt.
            </p>
            <Link
              href={`/${locale}/platforms`}
              className="inline-block bg-[#ef2b70] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#d91f5f] transition-all transform hover:scale-105 shadow-md"
            >
              Ontdek Beste Platforms →
            </Link>
          </div>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            Fase 3: Post-Bid Engagement Strategy
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Je proposal is verstuurd. Nu begint het <strong>echte strategische spel</strong>.
          </p>

          <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
            The 48-Hour Window
          </h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            De meeste klanten maken een shortlist binnen 48 uur. Jouw doel: <strong>top-of-mind blijven</strong> zonder pushy te zijn.
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-900 mb-2">⏰ Uur 0 (Direct na bid)</p>
              <p className="text-gray-700 text-sm">
                Verstuur je proposal. Voeg een <strong>relevant portfolio sample</strong> toe die exact matcht met hun project.
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-900 mb-2">⏰ Uur 6-8</p>
              <p className="text-gray-700 text-sm">
                Als de klant online is geweest maar niet gereageerd: stuur een <strong>korte follow-up vraag</strong>.
                "Heb je al kans gehad om mijn voorstel te bekijken? Ik had nog een vraag over [detail]..."
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-900 mb-2">⏰ Uur 24</p>
              <p className="text-gray-700 text-sm">
                Deel een <strong>gratis bonus</strong> zonder iets te verwachten. "Ik heb dit [quick tip/resource] gemaakt
                die je ook kan helpen, ongeacht of je met mij werkt."
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-900 mb-2">⏰ Uur 48</p>
              <p className="text-gray-700 text-sm">
                Als nog geen reactie: laatste follow-up met <strong>zachte deadline</strong>.
                "Ik begrijp dat je veel proposals ontvangt. Mijn beschikbaarheid voor volgende week loopt af op vrijdag,
                dus laat het me weten als je vragen hebt!"
              </p>
            </div>
          </div>

          <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
            Conversational Engagement Technieken
          </h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Als de klant reageert, ga dan in <strong>conversatie mode</strong>. Dit is geen Q&A sessie, maar een adviesgesprek.
          </p>

          <ul className="space-y-3 mb-8 ml-6">
            <li className="flex items-start gap-3">
              <span className="text-[#ef2b70] font-bold">→</span>
              <span className="text-gray-700"><strong>Stel verdiepende vragen</strong> - "Wat is de grootste uitdaging die je nu ervaart met [X]?"</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#ef2b70] font-bold">→</span>
              <span className="text-gray-700"><strong>Geef ongevraagd advies</strong> - "Gebaseerd op wat je vertelt, zou ik ook [suggestie] overwegen"</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#ef2b70] font-bold">→</span>
              <span className="text-gray-700"><strong>Laat waarschuwingssignalen zien</strong> - "Let op dat [probleem] niet gebeurt - dat zie ik vaak bij dit soort projecten"</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#ef2b70] font-bold">→</span>
              <span className="text-gray-700"><strong>Bied een discovery call aan</strong> - "Laten we 15 minuten bellen zodat ik je kan laten zien hoe ik dit zou aanpakken"</span>
            </li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
            <p className="text-gray-800 font-semibold mb-2">🎯 The Discovery Call Close</p>
            <p className="text-gray-700 mb-0">
              Als je een discovery call krijgt, heb je <strong>80% kans</strong> om de klant te winnen - mits je het gesprek
              goed voert. Luister 70% van de tijd, adviseer 30%. Laat hen praten over hun problemen, jij stelt slimme vragen.
            </p>
          </div>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            Platform-Specifieke Bidding Strategieën
          </h2>

          <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
            Upwork: The Connect Economy
          </h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Op Upwork kost elke bid 'Connects' (gemiddeld 10-16 connects per bid). <strong>Wees selectief</strong>.
          </p>

          <ul className="space-y-3 mb-8 ml-6">
            <li className="flex items-start gap-3">
              <span className="text-[#22c55e] font-bold">✓</span>
              <span className="text-gray-700">Gebruik de "Boosted" feature alleen voor high-value projects (€3K+)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#22c55e] font-bold">✓</span>
              <span className="text-gray-700">Filter op "Client's recent history" en vermijd nieuwe accounts zonder verified payment</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#22c55e] font-bold">✓</span>
              <span className="text-gray-700">Bid binnen de eerste 2 uur na posting - je komt bovenaan de lijst</span>
            </li>
          </ul>

          <h3 className="font-heading text-2xl font-semibold text-[#1e1541] mt-8 mb-4">
            Fiverr: Reverse Bidding Strategy
          </h3>

          <p className="text-gray-700 leading-relaxed mb-6">
            Op Fiverr bied je niet op projecten - je <strong>creëert gigs waar klanten op afkomen</strong>. Strategy shift:
          </p>

          <ul className="space-y-3 mb-8 ml-6">
            <li className="flex items-start gap-3">
              <span className="text-[#22c55e] font-bold">✓</span>
              <span className="text-gray-700">Optimaliseer gig titles met buyer keywords ("WordPress speed optimization" ipv "I will optimize websites")</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#22c55e] font-bold">✓</span>
              <span className="text-gray-700">Gebruik video in je gig - 40% hogere conversie dan text-only</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#22c55e] font-bold">✓</span>
              <span className="text-gray-700">Prijs je eerste pakket competitief, maak winst op upsells</span>
            </li>
          </ul>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            Advanced: De Template Library Strategie
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            Top freelancers schrijven niet elke proposal vanaf nul. Ze hebben een <strong>library van 10-15 templates</strong>
            voor verschillende project types.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>Hoe bouw je een template library:</strong>
          </p>

          <ol className="space-y-4 mb-8 ml-6">
            <li className="flex items-start gap-3">
              <span className="text-[#ef2b70] font-bold">1.</span>
              <div className="text-gray-700">
                <strong>Categoriseer je project types</strong> - Bijvoorbeeld: "E-commerce websites", "SEO audits", "Logo design", etc.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#ef2b70] font-bold">2.</span>
              <div className="text-gray-700">
                <strong>Schrijf een master template per type</strong> - Met placeholders voor [client name], [specific problem], [deliverables]
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#ef2b70] font-bold">3.</span>
              <div className="text-gray-700">
                <strong>Personaliseer 30-40% van de template</strong> - Eerste paragraaf is altijd uniek, rest is 70% template
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#ef2b70] font-bold">4.</span>
              <div className="text-gray-700">
                <strong>Track welke templates winnen</strong> - Optimaliseer je best-performing templates elke maand
              </div>
            </li>
          </ol>

          <div className="bg-green-50 border-l-4 border-[#22c55e] p-6 my-8 rounded-r-lg">
            <p className="text-gray-800 font-semibold mb-2">💡 Pro Efficiency Tip</p>
            <p className="text-gray-700 mb-0">
              Gebruik Text Expander (Mac) of PhraseExpress (Windows) om templates in te voeren met shortcuts.
              Type "..webtemplate" en je hele proposal verschijnt. Dit reduceert proposal tijd van 60 naar 15 minuten.
            </p>
          </div>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            Veelgestelde Vragen over Biedstrategieën
          </h2>

          <div className="space-y-6 mb-12">
            <div className="border-l-4 border-[#ef2b70] pl-6">
              <h4 className="font-semibold text-lg text-gray-900 mb-2">
                Moet ik altijd de goedkoopste zijn om te winnen?
              </h4>
              <p className="text-gray-700 mb-0">
                <strong>Absoluut niet</strong>. Klanten kiezen de goedkoopste optie alleen als alle proposals hetzelfde lijken.
                Differentieer op expertise, proces, en resultaten - niet op prijs. De duurste bid wint vaak bij high-value klanten.
              </p>
            </div>

            <div className="border-l-4 border-[#ef2b70] pl-6">
              <h4 className="font-semibold text-lg text-gray-900 mb-2">
                Hoeveel proposals moet ik versturen per week?
              </h4>
              <p className="text-gray-700 mb-0">
                <strong>Kwaliteit &gt; kwantiteit</strong>. 5 strategische, gepersonaliseerde proposals hebben een hogere ROI
                dan 50 generieke proposals. Target: 5-10 per week met 60%+ win rate = 3-6 nieuwe projecten/maand.
              </p>
            </div>

            <div className="border-l-4 border-[#ef2b70] pl-6">
              <h4 className="font-semibold text-lg text-gray-900 mb-2">
                Wat als ik geen eerdere resultaten heb om te delen?
              </h4>
              <p className="text-gray-700 mb-0">
                Start met <strong>pro bono of discounted projecten</strong> voor je eerste 3-5 case studies. Of gebruik "hypothetische case studies":
                "Als ik dit project zou doen, zou ik [aanpak] gebruiken, wat typisch resulteert in [resultaat] gebaseerd op industrie benchmarks."
              </p>
            </div>

            <div className="border-l-4 border-[#ef2b70] pl-6">
              <h4 className="font-semibold text-lg text-gray-900 mb-2">
                Hoe ga ik om met klanten die alleen op prijs selecteren?
              </h4>
              <p className="text-gray-700 mb-0">
                <strong>Walk away</strong>. Klanten die alleen op prijs selecteren zijn bijna altijd problematisch.
                Ze geven lage reviews, vragen constant extra werk, en betalen langzaam. Focus op klanten die waarde waarderen boven kosten.
              </p>
            </div>
          </div>

          <h2 className="font-heading text-3xl font-bold text-[#1e1541] mt-12 mb-6">
            Conclusie: Winnen Begint Voor Je Biedt
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            De freelancers met de hoogste win rates hebben één ding gemeen: <strong>ze behandelen elke bid als een strategisch project</strong>.
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            <strong>Samenvatting van de winnende formule:</strong>
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-[#22c55e] text-xl mt-1">✓</span>
              <span className="text-gray-700"><strong>Pre-bid intelligence</strong> - onderzoek de klant en concurrent voordat je tijd investeert</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#22c55e] text-xl mt-1">✓</span>
              <span className="text-gray-700"><strong>Psychology-based writing</strong> - AIDA formule + 7 psychologie triggers</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#22c55e] text-xl mt-1">✓</span>
              <span className="text-gray-700"><strong>Strategic pricing</strong> - anchor effect met meerdere opties</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#22c55e] text-xl mt-1">✓</span>
              <span className="text-gray-700"><strong>Post-bid engagement</strong> - 48-uur follow-up strategie</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#22c55e] text-xl mt-1">✓</span>
              <span className="text-gray-700"><strong>Template optimization</strong> - werk slimmer met een library van proven templates</span>
            </li>
          </ul>

          <p className="text-gray-700 leading-relaxed mb-6">
            Implementeer dit systeem consequent en je win rate stijgt van 10% naar 60%+ binnen 3 maanden.
            Dat is het verschil tussen €3K/maand en €15K/maand met dezelfde hoeveelheid werk.
          </p>

          <p className="text-gray-700 leading-relaxed font-semibold">
            Begin vandaag: kies je volgende bid zorgvuldig en investeer 90 minuten in een strategische proposal. Track je resultaten. 🎯
          </p>
        </div>
      </article>
    </>
  );
}
