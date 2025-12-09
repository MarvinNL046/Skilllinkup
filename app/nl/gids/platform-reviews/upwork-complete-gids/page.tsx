import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Upwork Complete Gids 2026: Succesvol Worden als Freelancer',
  description: 'De ultieme Upwork gids met bewezen strategieën om je eerste opdrachten te scoren, je tarief te verhogen en een 6-cijferig inkomen te verdienen. Inclusief voorbeelden en templates.',
  openGraph: {
    title: 'Upwork Complete Gids 2026: Succesvol Worden als Freelancer',
    description: 'De ultieme Upwork gids met bewezen strategieën om je eerste opdrachten te scoren, je tarief te verhogen en een 6-cijferig inkomen te verdienen.',
    locale: 'nl_NL',
    type: 'article',
  },
};

export default function UpworkCompleteGidsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'Upwork Complete Gids 2026: Succesvol Worden als Freelancer',
            description: 'Stap-voor-stap gids om succesvol te worden op Upwork als freelancer.',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Profiel optimaliseren',
                text: 'Maak een profiel dat opdrachtgevers overtuigt om jou te kiezen.',
              },
              {
                '@type': 'HowToStep',
                name: 'Eerste opdrachten scoren',
                text: 'Strategieën om je eerste reviews en reputatie op te bouwen.',
              },
              {
                '@type': 'HowToStep',
                name: 'Voorstellen schrijven',
                text: 'Templates en technieken voor overtuigende proposals.',
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e1541] to-[#ef2b70] text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[#22c55e] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              📚 Complete Upwork Cursus
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Upwork Complete Gids: Van €0 naar €5.000/Maand
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-white/90">
              Bewezen strategieën, templates en insider tips om succesvol te worden op het grootste freelance platform ter wereld. Geen fluff, alleen wat werkt.
            </p>
            <Link
              href="/nl/platforms/upwork"
              className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-4 text-[#ef2b70] font-heading font-semibold text-lg shadow-lg transition-all hover:scale-105"
            >
              Start op Upwork →
            </Link>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="bg-[#f8f9fb] py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-lg shadow bg-white p-6">
              <h2 className="font-heading text-2xl font-bold text-[#1e1541] mb-4">
                📖 Inhoudsopgave
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 text-[#64607d]">
                <a href="#profiel" className="hover:text-[#ef2b70] transition-colors">→ 1. Je Profiel Optimaliseren</a>
                <a href="#eerste-opdrachten" className="hover:text-[#ef2b70] transition-colors">→ 2. Je Eerste Opdrachten Scoren</a>
                <a href="#voorstellen" className="hover:text-[#ef2b70] transition-colors">→ 3. Winnende Voorstellen Schrijven</a>
                <a href="#tarieven" className="hover:text-[#ef2b70] transition-colors">→ 4. Je Tarief Verhogen</a>
                <a href="#lange-termijn" className="hover:text-[#ef2b70] transition-colors">→ 5. Langdurige Klantrelaties</a>
                <a href="#veelgemaakte-fouten" className="hover:text-[#ef2b70] transition-colors">→ 6. Veelgemaakte Fouten Vermijden</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Section 1: Profile */}
          <section id="profiel" className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-[#1e1541] mb-6">
              1. Je Upwork Profiel Optimaliseren (De Basis van Succes)
            </h2>
            <p className="text-lg text-[#64607d] mb-6 leading-relaxed">
              Je profiel is je digitale CV, je salespage en je portfolio – allemaal tegelijk. <strong>97% van de freelancers maakt hier cruciale fouten</strong> waardoor ze nooit uitgenodigd worden voor projecten. Laten we dat voorkomen.
            </p>

            <div className="rounded-lg shadow bg-white p-6 mb-6">
              <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-4">
                🎯 De Perfecte Profieltitel (Most Important!)
              </h3>
              <p className="text-[#64607d] mb-4">
                Je profieltitel is het eerste wat opdrachtgevers zien. Maak het krachtig, specifiek en resultaatgericht.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-3">
                <p className="font-semibold text-red-800 mb-1">❌ Slecht Voorbeeld:</p>
                <p className="text-red-700">"Web Developer | WordPress Expert"</p>
                <p className="text-sm text-red-600 mt-1">Te algemeen, geen waarde propositie</p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <p className="font-semibold text-green-800 mb-1">✅ Goed Voorbeeld:</p>
                <p className="text-green-700">"WordPress Expert | Ik bouw high-converting websites die jouw omzet verdubbelen in 90 dagen"</p>
                <p className="text-sm text-green-600 mt-1">Specifiek, resultaatgericht, meet waarde toe</p>
              </div>
            </div>

            <div className="rounded-lg shadow bg-white p-6 mb-6">
              <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-4">
                📝 Je 'About' Sectie (Verkooppitch in 600 Woorden)
              </h3>
              <p className="text-[#64607d] mb-4">
                Gebruik deze template structuur:
              </p>

              <div className="space-y-3 text-[#64607d]">
                <div className="border-l-4 border-[#ef2b70] pl-4">
                  <p className="font-semibold text-[#1e1541]">Paragraaf 1: De Hook</p>
                  <p className="text-sm">Start met een krachtige claim die aandacht trekt. Bijvoorbeeld: "In de afgelopen 3 jaar heb ik 47 e-commerce websites gebouwd die samen €2,3M omzet genereren."</p>
                </div>
                <div className="border-l-4 border-[#ef2b70] pl-4">
                  <p className="font-semibold text-[#1e1541]">Paragraaf 2: Wat Je Doet</p>
                  <p className="text-sm">Leg uit welk probleem je oplost voor klanten. Focus op benefits, niet features.</p>
                </div>
                <div className="border-l-4 border-[#ef2b70] pl-4">
                  <p className="font-semibold text-[#1e1541]">Paragraaf 3: Bewijs</p>
                  <p className="text-sm">Noem specifieke resultaten, certificaten, of ervaringen. Cijfers werken goed: "50+ tevreden klanten", "98% on-time delivery".</p>
                </div>
                <div className="border-l-4 border-[#ef2b70] pl-4">
                  <p className="font-semibold text-[#1e1541]">Paragraaf 4: Call to Action</p>
                  <p className="text-sm">Eindig met een duidelijke CTA: "Stuur me een bericht en laten we bespreken hoe ik jouw project tot succes kan maken."</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-[#ef2b70] to-[#d91a5f] p-6 text-white mb-6">
              <h4 className="font-heading text-lg font-semibold mb-3">💡 Pro Tip: Portfolio is King</h4>
              <p className="text-white/90 mb-3">
                Upload minimaal <strong>5-10 portfolio items</strong> met screenshots, beschrijvingen en resultaten. Zelfs als je nog geen betaalde projecten hebt, maak dan eigen projecten of doe gratis werk voor goede doelen.
              </p>
              <p className="text-sm text-white/80">
                Opdrachtgevers die 10+ portfolio items zien, zijn 3x meer geneigd om je uit te nodigen.
              </p>
            </div>
          </section>

          {/* CTA Section 1 */}
          <div className="rounded-lg bg-[#f8f9fb] p-8 text-center mb-16 border-2 border-[#ef2b70]">
            <h3 className="font-heading text-2xl font-bold text-[#1e1541] mb-4">
              Nog Twijfels Over Upwork?
            </h3>
            <p className="text-lg text-[#64607d] mb-6">
              Lees onze complete introductie over wat Upwork is en hoe het platform werkt.
            </p>
            <Link
              href="/nl/gids/platform-reviews/wat-is-upwork"
              className="inline-block rounded-lg bg-[#ef2b70] hover:bg-[#d91a5f] px-8 py-3 text-white font-heading font-semibold shadow-lg transition-all hover:scale-105"
            >
              Wat is Upwork? →
            </Link>
          </div>

          {/* Section 2: First Jobs */}
          <section id="eerste-opdrachten" className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-[#1e1541] mb-6">
              2. Je Eerste Opdrachten Scoren (De Moeilijkste Stap)
            </h2>
            <p className="text-lg text-[#64607d] mb-6 leading-relaxed">
              Laten we eerlijk zijn: <strong>je eerste 3 opdrachten zijn het moeilijkst</strong>. Zonder reviews en zonder Job Success Score ben je onzichtbaar. Maar met deze strategieën ga je van 0 naar je eerste betaalde klant.
            </p>

            <div className="rounded-lg shadow bg-white p-6 mb-6">
              <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-4">
                🎯 Strategie 1: Start met Entry-Level Projecten
              </h3>
              <p className="text-[#64607d] mb-4">
                Je eerste 5 opdrachten moeten niet over geld gaan, maar over <strong>reviews verzamelen</strong>. Kies daarom bewust voor kleinere projecten (€50-200) waar je snel kunt leveren.
              </p>

              <div className="space-y-2 text-[#64607d]">
                <div className="flex items-start">
                  <span className="text-[#22c55e] mr-2">✓</span>
                  <span>Zoek op projecten met budget €50-200</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#22c55e] mr-2">✓</span>
                  <span>Filter op "Entry Level" ervaring vereist</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#22c55e] mr-2">✓</span>
                  <span>Kies opdrachten die je in 1-3 dagen kunt afronden</span>
                </div>
                <div className="flex items-start">
                  <span className="text-[#22c55e] mr-2">✓</span>
                  <span>Lever over-the-top kwaliteit om een 5-sterren review te garanderen</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg shadow bg-white p-6 mb-6">
              <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-4">
                💰 Strategie 2: De "Loss Leader" Tactiek
              </h3>
              <p className="text-[#64607d] mb-4">
                Je eerste 2-3 opdrachten mag je met verlies doen. Bied een onweerstaanbaar lage prijs (50% onder markt) en lever 200% kwaliteit. Dit geeft je:
              </p>

              <ul className="space-y-2 text-[#64607d] ml-4">
                <li>• <strong>5-sterren reviews</strong> van gelukkige klanten</li>
                <li>• <strong>100% Job Success Score</strong> om zichtbaarder te worden</li>
                <li>• <strong>Portfolio materiaal</strong> om te laten zien</li>
                <li>• <strong>Confidence boost</strong> en ervaring met het platform</li>
              </ul>
            </div>

            <div className="rounded-lg shadow bg-white p-6 mb-6">
              <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-4">
                🚀 Strategie 3: Reageer Snel (Binnen 30 Minuten)
              </h3>
              <p className="text-[#64607d] mb-4">
                Nieuwe projecten krijgen binnen de eerste 2 uur de meeste aandacht. Als jij als eerste reageert met een sterk voorstel, heb je een <strong>47% hogere kans</strong> om uitgenodigd te worden.
              </p>

              <div className="bg-[#f8f9fb] p-4 rounded-lg">
                <p className="font-semibold text-[#1e1541] mb-2">💡 Hack: Upwork Mobile App</p>
                <p className="text-sm text-[#64607d]">
                  Installeer de Upwork app en zet notificaties aan voor nieuwe projecten in jouw categorie. Reageer direct vanaf je telefoon zodra je een notificatie krijgt.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Proposals */}
          <section id="voorstellen" className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-[#1e1541] mb-6">
              3. Winnende Voorstellen Schrijven (Template Included)
            </h2>
            <p className="text-lg text-[#64607d] mb-6 leading-relaxed">
              Een goed voorstel kan het verschil maken tussen €0 en €5.000 per maand. Hier is de exacte structuur die <strong>37% response rate</strong> oplevert (gemiddelde is 5-10%).
            </p>

            <div className="rounded-lg shadow bg-white p-6 mb-6">
              <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-4">
                📋 De Winnende Voorstel Template
              </h3>

              <div className="bg-[#f8f9fb] p-6 rounded-lg font-mono text-sm mb-4">
                <p className="font-bold text-[#1e1541] mb-3">Onderwerp: [Herhaal project titel met kleine twist]</p>

                <p className="mb-3 text-[#64607d]">
                  Hoi [Naam],<br/><br/>
                  Ik zie dat je op zoek bent naar [specifiek probleem uit beschrijving]. Ik heb dit probleem al eerder opgelost voor [soortgelijk bedrijf/project] met [concreet resultaat].<br/><br/>

                  <strong>Dit is mijn aanpak:</strong><br/>
                  1. [Specifieke stap 1 die hun probleem oplost]<br/>
                  2. [Specifieke stap 2]<br/>
                  3. [Specifieke stap 3]<br/><br/>

                  <strong>Waarom ik?</strong><br/>
                  • [Relevante ervaring/skill 1]<br/>
                  • [Bewijs van expertise met cijfers]<br/>
                  • [Unique selling point]<br/><br/>

                  Ik kan binnen [tijdsframe] starten en verwacht het in [deadline] op te leveren.<br/><br/>

                  Heb je 15 minuten voor een kort gesprek om details te bespreken?<br/><br/>

                  Groeten,<br/>
                  [Jouw naam]
                </p>
              </div>

              <div className="space-y-3">
                <div className="border-l-4 border-[#22c55e] pl-4">
                  <p className="font-semibold text-[#1e1541]">✓ DO: Personaliseer elk voorstel</p>
                  <p className="text-sm text-[#64607d]">Noem de naam van de opdrachtgever en specifieke details uit hun beschrijving</p>
                </div>
                <div className="border-l-4 border-[#22c55e] pl-4">
                  <p className="font-semibold text-[#1e1541]">✓ DO: Focus op hun probleem, niet jouw skills</p>
                  <p className="text-sm text-[#64607d]">Start met WAT je voor hen kunt bereiken, niet WIE je bent</p>
                </div>
                <div className="border-l-4 border-[#ef2b70] pl-4">
                  <p className="font-semibold text-[#1e1541]">✗ DON'T: Copy-paste templates</p>
                  <p className="text-sm text-[#64607d]">Opdrachtgevers herkennen dit direct en skippen je voorstel</p>
                </div>
                <div className="border-l-4 border-[#ef2b70] pl-4">
                  <p className="font-semibold text-[#1e1541]">✗ DON'T: Schrijf een roman</p>
                  <p className="text-sm text-[#64607d]">Houd het kort en scanbaar (max 300 woorden)</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section 2 */}
          <div className="rounded-lg bg-gradient-to-r from-[#ef2b70] to-[#d91a5f] p-8 text-center text-white mb-16 shadow-lg">
            <h3 className="font-heading text-2xl font-bold mb-4">
              Wil je Andere Platforms Vergelijken?
            </h3>
            <p className="text-lg mb-6 text-white/90">
              Upwork is niet het enige freelance platform. Vergelijk met Fiverr, Toptal en anderen.
            </p>
            <Link
              href="/nl/comparisons"
              className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-3 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all hover:scale-105"
            >
              Vergelijk Platforms →
            </Link>
          </div>

          {/* Section 4: Rates */}
          <section id="tarieven" className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-[#1e1541] mb-6">
              4. Je Tarief Verhogen (Van €15 naar €75/Uur)
            </h2>
            <p className="text-lg text-[#64607d] mb-6 leading-relaxed">
              De meeste freelancers blijven vastzitten op lage tarieven omdat ze bang zijn klanten te verliezen. Maar hier is de waarheid: <strong>je klanten vertellen je wanneer het tijd is om je tarief te verhogen</strong>.
            </p>

            <div className="rounded-lg shadow bg-white p-6 mb-6">
              <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-4">
                📈 De Tarief Ladder (Bewezen Systeem)
              </h3>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-[#1e1541] mb-2">Fase 1: Starter (0-5 reviews) → €15-25/uur</p>
                  <p className="text-sm text-[#64607d]">Focus op reviews verzamelen, niet op geld verdienen</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-[#1e1541] mb-2">Fase 2: Intermediate (5-15 reviews) → €30-45/uur</p>
                  <p className="text-sm text-[#64607d]">Verhoog je tarief met €5-10 na elke 5 positieve reviews</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-[#1e1541] mb-2">Fase 3: Expert (15+ reviews, Top Rated) → €50-75/uur</p>
                  <p className="text-sm text-[#64607d]">Met Top Rated badge kun je 2x gemiddelde tarieven vragen</p>
                </div>
                <div className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] p-4 rounded-lg text-white">
                  <p className="font-semibold mb-2">Fase 4: Specialist (30+ reviews, niche) → €100-200+/uur</p>
                  <p className="text-sm text-white/90">Specialiseer in een winstgevende niche en word de go-to expert</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-[#f8f9fb] p-6 border-l-4 border-[#ef2b70]">
              <h4 className="font-heading text-lg font-semibold text-[#1e1541] mb-3">
                💡 Signalen dat het Tijd is om je Tarief te Verhogen
              </h4>
              <ul className="space-y-2 text-[#64607d]">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Je krijgt <strong>3+ nieuwe uitnodigingen per week</strong> zonder te solliciteren</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Klanten accepteren je voorstellen <strong>zonder onderhandelen</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Je Job Success Score is <strong>95%+ en stabiel</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Je hebt <strong>meer aanvragen dan tijd</strong> beschikbaar</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5: Long-term */}
          <section id="lange-termijn" className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-[#1e1541] mb-6">
              5. Langdurige Klantrelaties Opbouwen (De Echte Winst)
            </h2>
            <p className="text-lg text-[#64607d] mb-6 leading-relaxed">
              Nieuwe klanten zoeken is vermoeiend. Het echte geld zit in <strong>terugkerende klanten</strong> die je maand na maand work blijven geven. Zo bouw je die relaties op:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-lg font-semibold text-[#1e1541] mb-3 flex items-center">
                  <span className="text-2xl mr-2">📞</span>
                  Over-communiceer
                </h3>
                <p className="text-[#64607d] text-sm">
                  Stuur dagelijks updates, ook als er weinig te melden is. Klanten waarderen transparantie en voelen zich betrokken bij het proces.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-lg font-semibold text-[#1e1541] mb-3 flex items-center">
                  <span className="text-2xl mr-2">🎁</span>
                  Over-deliver
                </h3>
                <p className="text-[#64607d] text-sm">
                  Lever altijd 10-20% meer dan beloofd. Een extra feature, vroeger opleveren, of een bonus tip maken het verschil tussen "goed" en "onvergetelijk".
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-lg font-semibold text-[#1e1541] mb-3 flex items-center">
                  <span className="text-2xl mr-2">💬</span>
                  Vraag naar Feedback
                </h3>
                <p className="text-[#64607d] text-sm">
                  Aan het einde van elk project: "Is er iets wat ik beter had kunnen doen?" Dit toont professionaliteit en helpt je groeien.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6">
                <h3 className="font-heading text-lg font-semibold text-[#1e1541] mb-3 flex items-center">
                  <span className="text-2xl mr-2">🔁</span>
                  Stel Follow-up Voor
                </h3>
                <p className="text-[#64607d] text-sm">
                  Na afloop: "Laat me weten als je in de toekomst hulp nodig hebt met [gerelateerd probleem]." 60% van de klanten komt terug binnen 6 maanden.
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-[#1e1541] to-[#ef2b70] p-6 text-white">
              <h4 className="font-heading text-lg font-semibold mb-3">💰 De €5.000/Maand Formula</h4>
              <p className="text-white/90 mb-3">
                <strong>5 terugkerende klanten</strong> á €1.000/maand = Stabiel inkomen zonder constant nieuwe klanten te hoeven zoeken.
              </p>
              <p className="text-sm text-white/80">
                Dit bereik je door uitstekende kwaliteit te leveren en proactief nieuwe projecten voor te stellen aan bestaande klanten.
              </p>
            </div>
          </section>

          {/* Section 6: Mistakes */}
          <section id="veelgemaakte-fouten" className="mb-16">
            <h2 className="font-heading text-3xl font-bold text-[#1e1541] mb-6">
              6. Veelgemaakte Fouten (En Hoe je Ze Vermijdt)
            </h2>

            <div className="space-y-6">
              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-3">
                  ❌ Fout 1: Te Breed Profiel
                </h3>
                <p className="text-[#64607d] mb-2">
                  "Full-stack developer | Designer | Writer | Marketing Expert"
                </p>
                <p className="text-sm text-[#64607d]">
                  <strong>Waarom slecht:</strong> Niemand gelooft dat je overal expert in bent. Opdrachtgevers zoeken specialisten, geen jacks-of-all-trades.
                </p>
                <p className="text-sm text-[#22c55e] mt-2">
                  <strong>✓ Fix:</strong> Kies 1 hoofdvaardigheid en word daar de beste in.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-3">
                  ❌ Fout 2: Te Lage Tarieven (Te Lang)
                </h3>
                <p className="text-[#64607d] mb-2">
                  €10/uur blijven vragen na 20+ reviews
                </p>
                <p className="text-sm text-[#64607d]">
                  <strong>Waarom slecht:</strong> Lage tarieven trekken problematische klanten aan. Je werkt harder voor minder geld en krijgt slechte reviews.
                </p>
                <p className="text-sm text-[#22c55e] mt-2">
                  <strong>✓ Fix:</strong> Verhoog je tarief met €5-10 na elke 5 positieve reviews.
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-3">
                  ❌ Fout 3: Niet Vragen om Reviews
                </h3>
                <p className="text-[#64607d] mb-2">
                  Verwachten dat klanten automatisch een review achterlaten
                </p>
                <p className="text-sm text-[#64607d]">
                  <strong>Waarom slecht:</strong> 40% van tevreden klanten vergeet een review achter te laten. Jij mist cruciale social proof.
                </p>
                <p className="text-sm text-[#22c55e] mt-2">
                  <strong>✓ Fix:</strong> Stuur na voltooiing: "Als je tevreden bent, zou je dan een review willen achterlaten? Dit helpt mijn business enorm."
                </p>
              </div>

              <div className="rounded-lg shadow bg-white p-6 border-l-4 border-[#ef2b70]">
                <h3 className="font-heading text-xl font-semibold text-[#1e1541] mb-3">
                  ❌ Fout 4: Connects Verspillen aan Slechte Projecten
                </h3>
                <p className="text-[#64607d] mb-2">
                  Reageren op elk project zonder te filteren
                </p>
                <p className="text-sm text-[#64607d]">
                  <strong>Waarom slecht:</strong> Je verspilt connects aan projecten met lage budgetten, vage beschrijvingen of onbetrouwbare opdrachtgevers.
                </p>
                <p className="text-sm text-[#22c55e] mt-2">
                  <strong>✓ Fix:</strong> Screen projecten op: geverifieerde betaalmethode, duidelijke beschrijving, redelijk budget, eerdere hiring history.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="font-heading text-3xl font-bold text-[#1e1541] mb-6">
              Je Upwork Succesverhaal Begint Nu
            </h2>
            <p className="text-lg text-[#64607d] mb-4 leading-relaxed">
              Upwork is geen get-rich-quick scheme. Het vraagt werk, geduld en consistentie. Maar als je de strategieën uit deze gids toepast, kun je binnen <strong>3-6 maanden</strong> van €0 naar €2.000-5.000 per maand groeien.
            </p>
            <p className="text-lg text-[#64607d] mb-4 leading-relaxed">
              De sleutel? <strong>Begin vandaag.</strong> Optimaliseer je profiel, solliciteer op je eerste project, en blijf consistent voorstellen versturen. Succes komt niet van één perfect voorstel, maar van 50 goede voorstellen over 3 maanden.
            </p>
            <p className="text-lg text-[#64607d] mb-6 leading-relaxed">
              En vergeet niet: elke Top Rated freelancer die nu €10.000/maand verdient, is ooit begonnen met €0 en geen reviews. Het enige verschil tussen hen en jou? <strong>Zij zijn gestart.</strong>
            </p>

            <div className="rounded-lg bg-gradient-to-r from-[#22c55e] to-[#16a34a] p-6 text-white text-center">
              <p className="text-xl font-heading font-bold mb-2">Veel succes op je Upwork journey! 🚀</p>
              <p className="text-white/90">Kom terug naar deze gids wanneer je vastloopt – we hebben je rug.</p>
            </div>
          </section>

          {/* Final CTA */}
          <div className="rounded-lg bg-gradient-to-br from-[#1e1541] to-[#ef2b70] p-8 text-center text-white shadow-lg">
            <h3 className="font-heading text-2xl font-bold mb-4">
              Klaar voor de Volgende Stap?
            </h3>
            <p className="text-lg mb-6 text-white/90">
              Bekijk meer reviews en vergelijkingen van andere freelance platforms.
            </p>
            <Link
              href="/nl/reviews"
              className="inline-block rounded-lg bg-white hover:bg-gray-100 px-8 py-3 text-[#ef2b70] font-heading font-semibold shadow-lg transition-all hover:scale-105"
            >
              Ontdek Meer Platforms →
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
                href="/nl/gids/platform-reviews/wat-is-upwork"
                className="rounded-lg shadow bg-white p-4 hover:shadow-lg transition-shadow"
              >
                <h4 className="font-heading font-semibold text-[#1e1541] mb-2">
                  Wat is Upwork? →
                </h4>
                <p className="text-sm text-[#64607d]">
                  Complete introductie tot het grootste freelance platform ter wereld
                </p>
              </Link>
              <Link
                href="/nl/gids/platform-reviews/fiverr-beginners-gids"
                className="rounded-lg shadow bg-white p-4 hover:shadow-lg transition-shadow"
              >
                <h4 className="font-heading font-semibold text-[#1e1541] mb-2">
                  Fiverr Beginners Gids →
                </h4>
                <p className="text-sm text-[#64607d]">
                  Start vandaag met verkopen op Fiverr als complete beginner
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
