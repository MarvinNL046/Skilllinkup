import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Fiverr Beginners Gids 2026: Start Vandaag met Verkopen',
  description: 'Complete Fiverr gids voor beginners. Leer hoe je je eerste gig maakt, klanten aantrekt en succesvol wordt op Fiverr. Inclusief gig templates en pricing strategieën.',
  openGraph: {
    title: 'Fiverr Beginners Gids 2026: Start Vandaag met Verkopen',
    description: 'Complete Fiverr gids voor beginners. Leer hoe je je eerste gig maakt, klanten aantrekt en succesvol wordt op Fiverr.',
    locale: 'nl_NL',
    type: 'article',
  },
};

export default function FiverrBeginnersGidsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Fiverr Beginners Gids 2026: Start Vandaag met Verkopen',
            description: 'Stap-voor-stap gids voor beginners om succesvol te worden op Fiverr.',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Account aanmaken',
                text: 'Maak een professioneel Fiverr seller account aan.',
              },
              {
                '@type': 'HowToStep',
                name: 'Eerste gig maken',
                text: 'Creëer een gig die klanten overtuigt om te kopen.',
              },
              {
                '@type': 'HowToStep',
                name: 'Eerste verkopen scoren',
                text: 'Strategieën om je eerste klanten aan te trekken.',
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e1541] via-[#ef2b70] to-[#22c55e] text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-white text-[#ef2b70] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🚀 Perfect voor Beginners
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Fiverr Beginners Gids: Van €0 naar €1.000 in 30 Dagen
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-white/90">
              Stap-voor-stap uitleg hoe je als complete beginner start op Fiverr en je eerste verkopen scoort. Geen voorkennis vereist.
            </p>
            <Link
              href="/nl/platforms/fiverr"
              className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold text-lg shadow-lg transition-all hover:scale-105"
            >
              Start op Fiverr →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Fiverr for Beginners */}
      <section className="bg-[#f8f9fb] py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-lg shadow bg-white p-8">
              <h2 className="font-heading text-2xl font-bold text-[#1e1541] mb-6 text-center">
                Waarom Fiverr Perfect is voor Beginners
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">✨</div>
                  <h3 className="font-heading font-semibold text-[#1e1541] mb-2">Makkelijke Start</h3>
                  <p className="text-sm text-[#64607d]">Maak een gig in 30 minuten en begin direct met verkopen. Geen ingewikkelde sollicitaties.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">💰</div>
                  <h3 className="font-heading font-semibold text-[#1e1541] mb-2">Lage Drempel</h3>
                  <p className="text-sm text-[#64607d]">Start met gigs van €5 en bouw langzaam op naar €50-500 per opdracht.</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <h3 className="font-heading font-semibold text-[#1e1541] mb-2">Klanten Vinden Jou</h3>
                  <p className="text-sm text-[#64607d]">Geen actief solliciteren nodig. Klanten zoeken jouw gig en bestellen direct.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Account Setup */}
          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-[#1e1541] mb-6">
              Stap 1: Je Fiverr Account Opzetten (15 Minuten)
            </h2>
            <p className="text-lg text-[#64607d] mb-6 leading-relaxed">
              Je Fiverr profiel is je digitale visitekaartje. Een professioneel profiel verhoogt je conversie met <strong>67%</strong>. Zo maak je het perfect:
            </p>

            <div className="rounded-lg shadow bg-white p-6 mb-6">
              <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-4">
                📸 Profiel Foto (Super Belangrijk!)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="font-semibold text-red-800 mb-2">❌ Niet Doen:</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Selfie met slecht licht</li>
                    <li>• Foto met zonnebril/pet</li>
                    <li>• Groepsfoto of vakantiefoto</li>
                    <li>• Logo in plaats van gezicht</li>
                  </ul>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <p className="font-semibold text-green-800 mb-2">✅ Wel Doen:</p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Professionele headshot</li>
                    <li>• Vriendelijke glimlach</li>
                    <li>• Duidelijk gezicht (geen hoed)</li>
                    <li>• Neutrale achtergrond</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg shadow bg-white p-6 mb-6">
              <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-4">
                ✍️ Je Beschrijving (300 Woorden die Verkopen)
              </h3>
              <p className="text-[#64607d] mb-4">
                Gebruik deze simpele formule:
              </p>

              <div className="bg-[#f8f9fb] p-6 rounded-lg space-y-3">
                <div className="border-l-4 border-[#ef2b70] pl-4">
                  <p className="font-semibold text-[#1e1541]">Paragraaf 1: Wie ben je?</p>
                  <p className="text-sm text-[#64607d]">Voorbeeld: "Hoi! Ik ben Lisa, een grafisch ontwerper met 3 jaar ervaring in logo design."</p>
                </div>
                <div className="border-l-4 border-[#ef2b70] pl-4">
                  <p className="font-semibold text-[#1e1541]">Paragraaf 2: Wat doe je?</p>
                  <p className="text-sm text-[#64607d]">Voorbeeld: "Ik help kleine bedrijven met professionele logo's die hun merk laten opvallen."</p>
                </div>
                <div className="border-l-4 border-[#ef2b70] pl-4">
                  <p className="font-semibold text-[#1e1541]">Paragraaf 3: Waarom jij?</p>
                  <p className="text-sm text-[#64607d]">Voorbeeld: "Met 200+ tevreden klanten lever ik altijd binnen 48 uur met onbeperkte revisies."</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-[#22c55e] to-[#16a34a] p-6 text-white">
              <h4 className="font-heading text-lg font-semibold mb-2">💡 Pro Tip: Skills Toevoegen</h4>
              <p className="text-white/90 text-sm">
                Voeg minimaal <strong>10-15 relevante skills</strong> toe aan je profiel. Dit verhoogt je zichtbaarheid in zoekresultaten met 45%. Kies skills waar veel vraag naar is!
              </p>
            </div>
          </section>

          {/* Step 2: Creating Your First Gig */}
          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-[#1e1541] mb-6">
              Stap 2: Je Eerste Gig Maken (De Sleutel tot Succes)
            </h2>
            <p className="text-lg text-[#64607d] mb-6 leading-relaxed">
              Een gig is een dienst die je aanbiedt. Denk eraan als een <strong>product op een webshop</strong> – je beschrijving moet klanten overtuigen om direct te kopen. Hier is hoe:
            </p>

            <div className="rounded-lg shadow bg-white p-6 mb-6">
              <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-4">
                🎯 De Perfecte Gig Titel
              </h3>
              <p className="text-[#64607d] mb-4">
                Je titel moet <strong>specifiek en resultaatgericht</strong> zijn. Vermijd vage titels.
              </p>

              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                  <p className="font-semibold text-red-800 mb-1">❌ Slecht:</p>
                  <p className="text-red-700">"I will design a logo"</p>
                  <p className="text-xs text-red-600 mt-1">Te algemeen, duizenden anderen bieden dit aan</p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <p className="font-semibold text-green-800 mb-1">✅ Goed:</p>
                  <p className="text-green-700">"I will design a modern minimalist logo for your startup in 24 hours"</p>
                  <p className="text-xs text-green-600 mt-1">Specifiek, tijdframe, doelgroep duidelijk</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg shadow bg-white p-6 mb-6">
              <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-4">
                📝 Gig Beschrijving Template (Copy-Paste Klaar)
              </h3>

              <div className="bg-[#f8f9fb] p-6 rounded-lg font-mono text-sm mb-4">
                <p className="text-[#64607d] whitespace-pre-line">
{`[AANDACHT GRABBER]
Zoek je een [jouw dienst] die [gewenst resultaat]?

[WAT JE BIEDT]
Ik bied:
✅ [Feature 1]
✅ [Feature 2]
✅ [Feature 3]
✅ Snelle levering (binnen [tijdframe])
✅ Onbeperkte revisies

[WAAROM JIJ]
Met [X] jaar ervaring heb ik [aantal] tevreden klanten geholpen.

[PROCES]
Dit is mijn werkwijze:
1. [Stap 1]
2. [Stap 2]
3. [Stap 3]

[CALL TO ACTION]
Klik op 'Continue' en laten we beginnen! 🚀`}
                </p>
              </div>
            </div>

            <div className="rounded-lg shadow bg-white p-6 mb-6">
              <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-4">
                💰 Pricing Strategie voor Beginners
              </h3>
              <p className="text-[#64607d] mb-4">
                Fiverr werkt met <strong>3 packages</strong> (Basic, Standard, Premium). Zo stel je die in:
              </p>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-[#1e1541] mb-2">📦 Basic Package: €10-15</p>
                  <p className="text-sm text-[#64607d] mb-2">De "try me out" optie met basic features</p>
                  <p className="text-xs text-[#64607d]">Voorbeeld: "1 logo concept, 2 revisies, 3 dagen levering"</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-[#1e1541] mb-2">📦 Standard Package: €30-50</p>
                  <p className="text-sm text-[#64607d] mb-2">De "most popular" optie met extra's (meeste verkopen!)</p>
                  <p className="text-xs text-[#64607d]">Voorbeeld: "3 logo concepts, onbeperkte revisies, 2 dagen levering, source files"</p>
                </div>
                <div className="bg-gradient-to-r from-[#ef2b70] to-[#d91a5f] p-4 rounded-lg text-white">
                  <p className="font-semibold mb-2">📦 Premium Package: €75-150</p>
                  <p className="text-sm text-white/90 mb-2">De "wow" optie voor klanten die het beste willen</p>
                  <p className="text-xs text-white/80">Voorbeeld: "5 concepts, snelle levering (24u), brand guidelines, 3D mockups"</p>
                </div>
              </div>

              <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4">
                <p className="text-sm text-blue-800">
                  <strong>💡 Tip:</strong> 60% van klanten kiest het middelste package als je het markeert als "Most Popular". Maak deze het meest aantrekkelijk!
                </p>
              </div>
            </div>

            <div className="rounded-lg shadow bg-white p-6">
              <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-4">
                🎨 Gig Images & Video (Visuele Impact)
              </h3>
              <p className="text-[#64607d] mb-4">
                Gigs met video krijgen <strong>220% meer kliks</strong>. Maar als je geen video hebt, zijn professionele afbeeldingen genoeg.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-[#1e1541] mb-2">Afbeeldingen (3 minimum):</h4>
                  <ul className="text-sm text-[#64607d] space-y-1">
                    <li>• Afbeelding 1: Voorbeelden van je werk</li>
                    <li>• Afbeelding 2: Before & After</li>
                    <li>• Afbeelding 3: Proces of tools die je gebruikt</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1e1541] mb-2">Video (30-60 seconden):</h4>
                  <ul className="text-sm text-[#64607d] space-y-1">
                    <li>• Stel jezelf voor (5 sec)</li>
                    <li>• Wat je aanbiedt (20 sec)</li>
                    <li>• Call to action (5 sec)</li>
                    <li>• Gebruik je telefoon – hoeft niet fancy!</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 1 */}
          <div className="rounded-lg bg-gradient-to-r from-[#ef2b70] to-[#d91a5f] p-8 text-center text-white mb-16 shadow-lg">
            <h3 className="font-heading text-2xl font-bold mb-4">
              Wil je Weten Hoe Fiverr Verschilt van Upwork?
            </h3>
            <p className="text-lg mb-6 text-white/90">
              Vergelijk beide platforms en ontdek welke het beste bij jou past als beginner.
            </p>
            <Link
              href="/nl/comparisons"
              className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-3 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all hover:scale-105"
            >
              Vergelijk Platforms →
            </Link>
          </div>

          {/* Step 3: Getting First Sales */}
          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-[#1e1541] mb-6">
              Stap 3: Je Eerste Verkopen Scoren (0 naar 10 Reviews)
            </h2>
            <p className="text-lg text-[#64607d] mb-6 leading-relaxed">
              Dit is het moeilijkste deel. Zonder reviews word je amper gezien. Maar met deze <strong>3 tactieken</strong> haal je binnen 2-4 weken je eerste 10 verkopen:
            </p>

            <div className="space-y-6">
              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#22c55e]">
                <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-3">
                  🎁 Tactiek 1: "De Starter Special"
                </h3>
                <p className="text-[#64607d] mb-4">
                  Bied je eerste 5-10 klanten een <strong>special deal</strong> aan: 50% korting in ruil voor een eerlijke review.
                </p>
                <div className="bg-[#f8f9fb] p-4 rounded-lg">
                  <p className="text-sm text-[#64607d] mb-2">
                    <strong>Voeg toe aan je gig beschrijving:</strong>
                  </p>
                  <p className="text-sm italic text-[#64607d]">
                    "🎉 STARTER SPECIAL: Eerste 5 klanten krijgen 50% korting! Bestel nu voor slechts €7,50 i.p.v. €15."
                  </p>
                </div>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#22c55e]">
                <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-3">
                  📢 Tactiek 2: Fiverr Buyer Requests
                </h3>
                <p className="text-[#64607d] mb-4">
                  Ga naar <strong>Buyer Requests</strong> in je Fiverr dashboard en reageer op aanvragen van klanten. Dit is Fiverr's verborgen goudmijn voor beginners!
                </p>
                <div className="space-y-2 text-[#64607d] text-sm">
                  <p className="flex items-start">
                    <span className="text-[#22c55e] mr-2">•</span>
                    <span>Stuur 10-20 offers per dag (je hebt 10 gratis offers)</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-[#22c55e] mr-2">•</span>
                    <span>Reageer binnen 1 uur na posting (snelheid wint!)</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-[#22c55e] mr-2">•</span>
                    <span>Personaliseer elk bericht – geen copy-paste</span>
                  </p>
                </div>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#22c55e]">
                <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-3">
                  🚀 Tactiek 3: SEO Optimalisatie
                </h3>
                <p className="text-[#64607d] mb-4">
                  Fiverr is een zoekmachine. Optimaliseer je gig voor relevante zoekwoorden:
                </p>
                <div className="bg-[#f8f9fb] p-4 rounded-lg space-y-3">
                  <div>
                    <p className="font-semibold text-[#1e1541] text-sm mb-1">Keywords in Titel:</p>
                    <p className="text-xs text-[#64607d]">Gebruik keywords die klanten zoeken. Bijvoorbeeld: "logo design", "wordpress", "seo"</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1e1541] text-sm mb-1">Gig Tags (5 maximum):</p>
                    <p className="text-xs text-[#64607d]">Kies populaire tags met matige concurrentie. Check andere succesvolle gigs voor inspiratie.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#1e1541] text-sm mb-1">FAQ Sectie:</p>
                    <p className="text-xs text-[#64607d]">Voeg 3-5 veelgestelde vragen toe met keywords in antwoorden. Verhoogt ranking!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-[#1e1541] to-[#ef2b70] p-6 text-white mt-6">
              <h4 className="font-heading text-lg font-semibold mb-3">⏱️ Realistische Timeline</h4>
              <div className="space-y-2 text-sm text-white/90">
                <p>• <strong>Week 1-2:</strong> Eerste 3 verkopen via Buyer Requests & starter special</p>
                <p>• <strong>Week 3-4:</strong> 5-10 verkopen door betere ranking & mond-tot-mond</p>
                <p>• <strong>Maand 2:</strong> 20-30 verkopen per maand als je Level 1 Seller bereikt</p>
                <p>• <strong>Maand 3+:</strong> 50+ verkopen mogelijk met goede reviews en marketing</p>
              </div>
            </div>
          </section>

          {/* Step 4: Delivering Quality */}
          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-[#1e1541] mb-6">
              Stap 4: Uitstekende Service Leveren (5-Sterren Reviews)
            </h2>
            <p className="text-lg text-[#64607d] mb-6 leading-relaxed">
              Op Fiverr is je <strong>review score alles</strong>. Een 4.9-sterren rating opent deuren, een 4.5 sluit ze. Zo garandeer je 5-sterren reviews:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-lg font-semibold text-[#1e1541] mb-3 flex items-center">
                  <span className="text-2xl mr-2">💬</span>
                  Over-Communiceer
                </h3>
                <ul className="text-sm text-[#64607d] space-y-2">
                  <li>• Reageer binnen 1 uur op berichten</li>
                  <li>• Stuur updates tijdens het werk</li>
                  <li>• Vraag om verduidelijking als iets onduidelijk is</li>
                  <li>• Bedank klanten na levering</li>
                </ul>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-lg font-semibold text-[#1e1541] mb-3 flex items-center">
                  <span className="text-2xl mr-2">🎁</span>
                  Over-Deliver
                </h3>
                <ul className="text-sm text-[#64607d] space-y-2">
                  <li>• Lever 1 dag eerder dan beloofd</li>
                  <li>• Voeg een bonus toe (extra versie, tips)</li>
                  <li>• Maak een README file met instructies</li>
                  <li>• Vraag altijd: "Is er nog iets?"</li>
                </ul>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-lg font-semibold text-[#1e1541] mb-3 flex items-center">
                  <span className="text-2xl mr-2">⚡</span>
                  Werk Professioneel
                </h3>
                <ul className="text-sm text-[#64607d] space-y-2">
                  <li>• Gebruik correct Nederlands/Engels</li>
                  <li>• Lever altijd source files</li>
                  <li>• Zorg voor hoge kwaliteit output</li>
                  <li>• Respecteer deadlines – altijd</li>
                </ul>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-lg font-semibold text-[#1e1541] mb-3 flex items-center">
                  <span className="text-2xl mr-2">🔄</span>
                  Revisies Managen
                </h3>
                <ul className="text-sm text-[#64607d] space-y-2">
                  <li>• Bied 2-3 gratis revisies aan</li>
                  <li>• Reageer positief op feedback</li>
                  <li>• Fix revisies binnen 24 uur</li>
                  <li>• Vraag specifiek wat aangepast moet</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg bg-yellow-50 border-l-4 border-yellow-500 p-6">
              <h4 className="font-heading text-lg font-semibold text-yellow-900 mb-3">
                ⚠️ Waarschuwing: Red Flags Vermijden
              </h4>
              <p className="text-sm text-yellow-800 mb-3">
                Deze dingen vernietigen je rating. Vermijd ze ten alle tijden:
              </p>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• <strong>Late levering:</strong> Liever 1 dag te vroeg dan 1 uur te laat</li>
                <li>• <strong>Order cancellations:</strong> Vernietigt je completion rate</li>
                <li>• <strong>Plagiaat:</strong> Levert permanente ban op</li>
                <li>• <strong>Ruzie met klanten:</strong> Blijf altijd professioneel, ook bij lastige klanten</li>
              </ul>
            </div>
          </section>

          {/* Step 5: Scaling Up */}
          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-[#1e1541] mb-6">
              Stap 5: Opschalen naar €1.000+/Maand
            </h2>
            <p className="text-lg text-[#64607d] mb-6 leading-relaxed">
              Zodra je 10-20 reviews hebt, is het tijd om <strong>op te schalen</strong>. Hier is de roadmap van €100 naar €1.000+ per maand:
            </p>

            <div className="rounded-lg shadow bg-white p-6 mb-6">
              <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-4">
                📈 De Scaling Ladder
              </h3>

              <div className="space-y-4">
                <div className="border-l-4 border-gray-300 pl-4">
                  <p className="font-semibold text-[#1e1541] mb-1">Fase 1: New Seller (0-10 reviews)</p>
                  <p className="text-sm text-[#64607d]">Focus: Reviews verzamelen met lage prijzen (€10-30/gig)</p>
                  <p className="text-xs text-[#64607d] mt-1">Doel: €100-300/maand</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold text-[#1e1541] mb-1">Fase 2: Level 1 Seller (10+ reviews, 60 dagen actief)</p>
                  <p className="text-sm text-[#64607d]">Focus: Prijzen verhogen (€30-75/gig), meer gigs toevoegen</p>
                  <p className="text-xs text-[#64607d] mt-1">Doel: €500-800/maand</p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-semibold text-[#1e1541] mb-1">Fase 3: Level 2 Seller (50+ reviews, 120 dagen)</p>
                  <p className="text-sm text-[#64607d]">Focus: Premium gigs (€100-300), terugkerende klanten</p>
                  <p className="text-xs text-[#64607d] mt-1">Doel: €1.000-2.000/maand</p>
                </div>

                <div className="border-l-4 border-[#22c55e] pl-4">
                  <p className="font-semibold text-[#1e1541] mb-1">Fase 4: Top Rated Seller (100+ reviews, expert status)</p>
                  <p className="text-sm text-[#64607d]">Focus: Premium positioning (€200-500/gig), team building</p>
                  <p className="text-xs text-[#64607d] mt-1">Doel: €3.000-10.000+/maand</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg shadow bg-white p-6 mb-6">
              <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-4">
                💡 Scaling Strategieën
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#f8f9fb] p-4 rounded-lg">
                  <p className="font-semibold text-[#1e1541] mb-2">1. Verhoog je Prijzen Geleidelijk</p>
                  <p className="text-sm text-[#64607d]">Verhoog elke €10 na 10 nieuwe positieve reviews. Test resistance – als verkopen niet dalen, ga door.</p>
                </div>

                <div className="bg-[#f8f9fb] p-4 rounded-lg">
                  <p className="font-semibold text-[#1e1541] mb-2">2. Voeg Gig Extras Toe</p>
                  <p className="text-sm text-[#64607d]">Bied extra's aan voor €10-50: snellere levering, extra revisies, source files, commercieel gebruik.</p>
                </div>

                <div className="bg-[#f8f9fb] p-4 rounded-lg">
                  <p className="font-semibold text-[#1e1541] mb-2">3. Maak Gig Bundels</p>
                  <p className="text-sm text-[#64607d]">Combineer meerdere diensten in 1 pakket voor hogere order waarde (€100-500 per verkoop).</p>
                </div>

                <div className="bg-[#f8f9fb] p-4 rounded-lg">
                  <p className="font-semibold text-[#1e1541] mb-2">4. Automatiseer met Templates</p>
                  <p className="text-sm text-[#64607d]">Maak templates voor veelvoorkomende opdrachten. Lever in 1 uur wat normaal 4 uur kost.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 2 */}
          <div className="rounded-lg bg-[#f8f9fb] p-8 text-center mb-16 border-2 border-[#ef2b70]">
            <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-4">
              Klaar voor Meer Geavanceerde Strategieën?
            </h3>
            <p className="text-lg text-[#64607d] mb-6">
              Bekijk onze complete Upwork gids voor gevorderde freelance tactieken.
            </p>
            <Link
              href="/nl/gids/platform-reviews/upwork-complete-gids"
              className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-3 text-white font-heading font-semibold shadow-lg transition-all hover:scale-105"
            >
              Upwork Complete Gids →
            </Link>
          </div>

          {/* Common Mistakes */}
          <section className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-[#1e1541] mb-6">
              Veelgemaakte Fouten (En Hoe je Ze Vermijdt)
            </h2>

            <div className="space-y-4">
              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-lg font-semibold text-[#1e1541] mb-2">
                  ❌ Fout 1: Te Veel Gigs Tegelijk
                </h3>
                <p className="text-[#64607d] text-sm mb-2">
                  Beginners maken vaak 7+ gigs in verschillende categorieën. Result: geen enkele gig scoort goed.
                </p>
                <p className="text-[#22c55e] text-sm font-semibold">
                  ✓ Fix: Start met 1-2 gigs en perfectioneer die eerst. Voeg later meer toe.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-lg font-semibold text-[#1e1541] mb-2">
                  ❌ Fout 2: Te Snel Prijzen Verhogen
                </h3>
                <p className="text-[#64607d] text-sm mb-2">
                  Van €10 naar €100 springen na 5 reviews. Verkopen stoppen direct.
                </p>
                <p className="text-[#22c55e] text-sm font-semibold">
                  ✓ Fix: Verhoog in kleine stappen (€10-20) en monitor conversie rates.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-lg font-semibold text-[#1e1541] mb-2">
                  ❌ Fout 3: Orders Cancellen
                </h3>
                <p className="text-[#64607d] text-sm mb-2">
                  Elke cancellation verlaagt je completion rate en schaadt je ranking.
                </p>
                <p className="text-[#22c55e] text-sm font-semibold">
                  ✓ Fix: Screen klanten vooraf en wees duidelijk over wat je wel/niet doet.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-lg font-semibold text-[#1e1541] mb-2">
                  ❌ Fout 4: Copy-Paste Reacties op Buyer Requests
                </h3>
                <p className="text-[#64607d] text-sm mb-2">
                  Klanten herkennen generic berichten en negeren je.
                </p>
                <p className="text-[#22c55e] text-sm font-semibold">
                  ✓ Fix: Personaliseer elk bericht met specifieke verwijzing naar hun request.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="font-heading text-3xl font-bold text-[#1e1541] mb-6">
              Je Fiverr Reis Begint Nu
            </h2>
            <p className="text-lg text-[#64607d] mb-4 leading-relaxed">
              Fiverr is het perfecte platform voor beginners omdat het <strong>simpel, laagdrempelig en bewezen effectief</strong> is. Duizenden freelancers verdienen er full-time mee, en velen begonnen precies zoals jij – met €0 en geen ervaring.
            </p>
            <p className="text-lg text-[#64607d] mb-4 leading-relaxed">
              Het geheim? <strong>Starten en consistent blijven</strong>. Maak vandaag je eerste gig. Stuur morgen je eerste 10 Buyer Request offers. Lever over-the-top kwaliteit aan je eerste klant. En voor je het weet, heb je 10 reviews en een stabiel inkomen.
            </p>
            <p className="text-lg text-[#64607d] mb-6 leading-relaxed">
              Onthoud: Elke Top Rated Seller die nu €5.000/maand verdient, heeft ooit gestaan waar jij nu staat. Het enige verschil? <strong>Zij zijn begonnen.</strong> Nu is het jouw beurt.
            </p>

            <div className="rounded-lg bg-gradient-to-r from-[#22c55e] to-[#16a34a] p-8 text-white text-center">
              <p className="text-2xl font-heading font-bold mb-3">Veel succes op Fiverr! 🚀</p>
              <p className="text-lg text-white/90">
                Zet deze gids in je bladwijzers en kom terug wanneer je vragen hebt.
              </p>
            </div>
          </section>

          {/* Final CTA */}
          <div className="rounded-lg bg-gradient-to-br from-[#1e1541] to-[#ef2b70] p-8 text-center text-white shadow-lg">
            <h3 className="font-heading text-2xl font-bold mb-4">
              Ontdek Meer Freelance Platforms
            </h3>
            <p className="text-lg mb-6 text-white/90">
              Fiverr is geweldig, maar er zijn meer platforms. Bekijk onze reviews en vergelijkingen.
            </p>
            <Link
              href="/nl/reviews"
              className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-3 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all hover:scale-105"
            >
              Bekijk Alle Reviews →
            </Link>
          </div>
        </div>
      </article>

      {/* Internal Links Section */}
      <section className="bg-[#f8f9fb] py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-6 text-center">
              Gerelateerde Artikelen
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/nl/gids/platform-reviews/upwork-complete-gids"
                className="rounded-lg shadow bg-white p-4 hover:shadow-lg transition-shadow"
              >
                <h4 className="font-heading font-semibold text-[#1e1541] mb-2">
                  Upwork Complete Gids →
                </h4>
                <p className="text-sm text-[#64607d]">
                  Diepgaande strategieën voor het grootste freelance platform
                </p>
              </Link>
              <Link
                href="/nl/gids/platform-reviews/wat-is-toptal"
                className="rounded-lg shadow bg-white p-4 hover:shadow-lg transition-shadow"
              >
                <h4 className="font-heading font-semibold text-[#1e1541] mb-2">
                  Wat is Toptal? →
                </h4>
                <p className="text-sm text-[#64607d]">
                  Ontdek het meest exclusieve freelance platform (top 3% alleen)
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
