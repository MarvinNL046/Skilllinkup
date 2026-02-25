import { Metadata } from 'next';
import Link from 'next/link';
import { AdWidget } from '@/components/AdWidget';
import { FileText, Target, Award, CheckCircle, ArrowRight, Zap, TrendingUp, DollarSign, MessageSquare } from 'lucide-react';

type Props = {
 params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'how-to-write-proposals-that-win';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

 if (locale === 'nl') {
 return {
 title: 'Offertes Schrijven die Winnen: Sjablonen & Voorbeelden',
 description: 'Leer de kunst van winnende freelance offertes schrijven. Krijg bewezen sjablonen, echte voorbeelden en strategieën die 40% meer klanten converteren op Upwork, Fiverr en andere platforms.',
 keywords: 'offerte sjablonen freelance, upwork offerte voorbeelden, winnende offertes, freelance pitch, offerte schrijven tips, opdrachten binnenhalen',
 openGraph: {
 title: 'Offertes Schrijven die Winnen: Sjablonen & Voorbeelden',
 description: 'Krijg bewezen offerte sjablonen en strategieën die 40% meer freelance klanten converteren. Echte voorbeelden inbegrepen.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Offertes Schrijven die Winnen: Sjablonen & Voorbeelden' }],
 locale: 'nl_NL',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Offertes Schrijven die Winnen: Sjablonen & Voorbeelden',
 description: 'Leer de kunst van winnende freelance offertes schrijven. Krijg bewezen sjablonen, echte voorbeelden en strategieën.',
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
 title: 'How to Write Proposals That Win: Templates & Examples',
 description: 'Master the art of writing winning freelance proposals. Get proven templates, real examples, and strategies that convert 40% more clients across Upwork, Fiverr, and other platforms.',
 keywords: 'freelance proposal templates, upwork proposal examples, winning proposals, freelance pitch, proposal writing tips',
 openGraph: {
 title: 'How to Write Proposals That Win: Templates & Examples',
 description: 'Get proven proposal templates and strategies that convert 40% more freelance clients. Real examples included.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'How to Write Proposals That Win: Templates & Examples' }],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'How to Write Proposals That Win: Templates & Examples',
 description: 'Master the art of writing winning freelance proposals. Get proven templates, real examples, and strategies.',
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

export default async function HowToWriteProposalsThatWin({ params }: Props) {
 const { locale } = await params;

 const content = locale === 'nl' ? {
 hero: {
 title: 'Offertes Schrijven die Winnen: Sjablonen en Voorbeelden',
 description: 'Stop met offertes in het niets sturen. Leer de bewezen 5-stappen formule die 40% meer klanten converteert, met kant-en-klare sjablonen, echte voorbeelden en platformspecifieke strategieën.',
 ctaPrimary: 'Lees Expert Gidsen',
 ctaSecondary: 'Bekijk Platforms',
 },
 intro: {
 title: 'Waarom de Meeste Freelance Offertes Falen (En Hoe Je Die van Jou Kunt Verbeteren)',
 paragraph1: 'De gemiddelde freelance offerte heeft een conversiepercentage van 2-5%. Topfreelancers? Die converteren consistent tussen de 15-25%. Het verschil is geen talent, ervaring of tarieven—het is offertestrategie. De meeste freelancers schrijven offertes waarin ze over zichzelf praten: hun vaardigheden, ervaring en enthousiasme om te werken. Winnende offertes draaien dit script volledig om en richten zich laserscherp op het probleem van de klant en tonen begrip voordat ze oplossingen aandragen.',
 paragraph2: 'Deze uitgebreide gids onthult de exacte offerteformule die gebruikt wordt door zes-cijfer-freelancers op Upwork, Fiverr, Freelancer en andere platforms. Je krijgt bruikbare sjablonen, voorbeelden uit de praktijk van meerdere sectoren en platformspecifieke aanpassingsstrategieën. Door deze technieken te implementeren, zien freelancers doorgaans 40-60% toename in responspercentages binnen 30 dagen.',
 stat1Title: '40% Hogere Respons',
 stat1Desc: 'Gemiddelde conversiestijging',
 stat2Title: '25% Hogere Tarieven',
 stat2Desc: 'Bij juiste positionering',
 stat3Title: '5-10 Min Per Offerte',
 stat3Desc: 'Met sjabloonsysteem',
 },
 formula: {
 title: 'De 5-Stappen Winnende Offerte Formule',
 intro: 'Deze beproefde formule werkt op alle platforms en in alle sectoren. Elke stap dient een specifiek psychologisch doel en begeleidt klanten naar het kiezen voor jou boven tientallen concurrenten.',
 step1: {
 title: 'Gepersonaliseerde Hook: Bewijs dat Je Hun Post Gelezen Hebt (100-150 tekens)',
 description: 'Generieke openingszinnen schreeuwen "sjabloon". Begin met iets specifieks uit hun vacature te refereren—een unieke eis, genoemde uitdaging of projectdetail. Dit scheidt je onmiddellijk van 90% van de offertes en signaleert oprechte interesse.',
 example: '"Ik zag dat je de checkout flow wilt herontwerpen om de 67% winkelwagenverlating die je noemde te verminderen. Dat is een kritiek pijnpunt dat ik voor 3 e-commerce klanten in de afgelopen 6 maanden heb opgelost."',
 why: 'Toont leesvaardigheid, refereert hun specifieke metric (67%), en positioneert je direct als iemand die dit exacte probleem eerder heeft opgelost.',
 },
 step2: {
 title: 'Probleembegrip: Spiegel Hun Uitdaging (150-200 tekens)',
 description: 'Voordat je oplossingen aanbiedt, toon je diep begrip van hun probleem. Herformuleer hun uitdaging in je eigen woorden, voeg inzicht toe dat ze misschien niet overwogen hebben, en laat zien dat je het "snapt". Dit bouwt direct vertrouwen en credibiliteit op.',
 example: '"Hoge winkelwagenverlating komt vaak voort uit onverwachte kosten bij checkout, complexe formulieren of gebrek aan betaalopties. Van je productpagina\'s zie ik dat je een 5-stappen checkout gebruikt—dit optimaliseren naar 2-3 stappen kan direct die 67% impact hebben. Bovendien lijkt mobiele checkout voortgangsindicatoren te missen, wat onzekerheid creëert."',
 why: 'Laat zien dat je hun site al geanalyseerd hebt, specifieke problemen identificeert die verder gaan dan wat ze noemden, en de nuances van hun uitdaging begrijpt.',
 },
 step3: {
 title: 'Jouw Unieke Oplossing: Hoe Je Het Gaat Oplossen (200-300 tekens)',
 description: 'Nu introduceer je jouw aanpak—specifiek, bruikbaar en afgestemd op hun situatie. Vermijd generieke uitspraken ("Ik gebruik mijn expertise"). Schets in plaats daarvan 3-4 concrete stappen, noem relevante tools/methodologieën en leg uit waarom deze aanpak werkt.',
 example: 'Zo zou ik jouw winkelwagenverlating aanpakken:\n1. Checkout audit met heatmaps en sessie-opnames om frictie te identificeren\n2. Herontwerpen naar 2-stappen checkout met voortgangsindicatoren en vertrouwensbadges\n3. Gastcheckout optie toevoegen en betaalmethoden opslaan voor terugkerende klanten\n4. A/B test nieuwe flow versus huidige versie gedurende 2 weken voor volledige uitrol\n\nDeze aanpak verminderde winkelwagenverlating met 34% voor een vergelijkbare e-commerce klant vorig kwartaal.',
 why: 'Specifieke actiestappen tonen dat je over hun probleem hebt nagedacht, methodologie demonstreert professionaliteit, en het echte resultaat bewijst capaciteit.',
 },
 step4: {
 title: 'Sociaal Bewijs: Relevante Resultaten die Je Behaald Hebt (100-150 tekens)',
 description: 'Link naar 1-2 zeer relevante portfolio items of citeer specifieke resultaten van vergelijkbare projecten. Kwantificeer alles—percentages, bedragen, tijd bespaard. Vage beweringen zoals "verbeterde prestaties" dragen nul gewicht.',
 example: '"Recente vergelijkbare projecten omvatten: [Link naar Portfolio Item] - Checkout verlating verminderd van 71% naar 37% voor fashion e-commerce winkel, resulterend in €117K extra maandelijkse omzet. [Link naar Tweede Item] - SaaS aanmeldflow herontworpen, trial conversies met 54% verhoogd."',
 why: 'Portfolio links bieden bewijs, specifieke metrics bouwen geloofwaardigheid op, en vergelijkbare projectcontexten tonen direct relevante ervaring.',
 },
 step5: {
 title: 'Duidelijke Call-to-Action: Reageren Gemakkelijk Maken (75-100 tekens)',
 description: 'Sluit af met een specifieke, laagdrempelige volgende stap. Sluit nooit passief af met "Ik kijk uit naar uw reactie"—dat is passief. Stel in plaats daarvan een kort gesprek voor, stel een kwalificerende vraag of bied een snelle audit/consultatie aan.',
 examples: [
 'Ik heb 3 snelle vragen over je huidige checkout flow. Kunnen we deze week een 15-minuten gesprek plannen om te bespreken?',
 'Ik wil graag een snelle audit van je checkout proces uitvoeren—ik kan binnen 48 uur eerste bevindingen hebben. Interesse?',
 'Wat is je tijdlijn voor het implementeren van deze wijzigingen? Ik heb beschikbaarheid vanaf volgende week.',
 ],
 },
 },
 cta1: {
 title: 'Vind Platforms die bij Jouw Offertestijl Passen',
 description: 'Verschillende platforms belonen verschillende offertebenaderingen. Vergelijk offertelimieten, responsietijdverwachtingen en klantkwaliteit op 500+ marktplaatsen om je conversiestrategie te optimaliseren.',
 cta: 'Bekijk Top Platforms',
 },
 templates: {
 title: 'Platformspecifieke Offerte Sjablonen',
 intro: 'Elk platform heeft unieke eigenaardigheden, tekenlimieten en klantverwachtingen. Hier zijn bewezen sjablonen geoptimaliseerd voor de drie grootste freelance marktplaatsen.',
 upwork: {
 title: 'Upwork Offerte Sjabloon (Focus op Motivatiebrief)',
 description: 'Upwork benadrukt motivatiebrieven en offerte zichtbaarheid hangt af van algoritmische ranking. Plaats waarde vooraan, gebruik trefwoorden uit de vacature en houd het onder 1.000 tekens voor beste resultaten.',
 template: `Hoi [Klantnaam],

Ik zie dat je een [specifieke vaardigheid uit vacature] nodig hebt om [specifiek doel genoemd] te bereiken. Die [metric/uitdaging die ze noemden] is precies wat ik [vergelijkbaar klanttype] vorige maand heb helpen overwinnen—we behaalden [specifiek resultaat met nummer].

Jouw [specifiek aspect van hun project] suggereert dat je te maken hebt met [inzichtelijke observatie over hun situatie]. Zo zou ik het aanpakken:

1. [Specifieke actiestap]
2. [Specifieke actiestap]
3. [Specifieke actiestap]
4. [Specifieke actiestap]

Ik heb [portfolio item] bijgevoegd met vergelijkbaar werk waar ik [specifieke prestatie] bereikte. Tijdlijn zou [X dagen/weken] zijn met mijlpalen op [belangrijke punten].

Snelle vraag: [kwalificerende vraag over hun project]?

Kijk ernaar uit om te bespreken,
[Jouw Naam]

P.S. Ik ben beschikbaar voor een snel 15-min gesprek deze week als je je specifieke eisen wilt bespreken.`,
 },
 fiverr: {
 title: 'Fiverr Custom Offer Sjabloon (Kort & Voordeel-Gericht)',
 description: 'Fiverr custom offers vereisen beknoptheid en helderheid. Focus op deliverables, tijdlijn en directe voordelen. Klanten verwachten pakket-stijl presentatie.',
 template: `Hoi [Klantnaam],

Perfect getimed—ik ben gespecialiseerd in [hun specifieke behoefte].

Wat je krijgt:
✓ [Specifieke deliverable 1]
✓ [Specifieke deliverable 2]
✓ [Specifieke deliverable 3]
✓ [Bonus/toegevoegde waarde]

Recente resultaten: [Korte metric of prestatie van vergelijkbaar project]

Tijdlijn: [X dagen] met [mijlpaal] check-in

Ik heb je [projectdetail] bekeken en heb 2 snelle vragen:
1. [Vraag]
2. [Vraag]

Klaar om direct te starten. Laten we dit waarmaken!

[Jouw Naam]`,
 },
 freelancer: {
 title: 'Freelancer.com Bod Sjabloon (Competitieve Positionering)',
 description: 'Freelancer.com is zeer competitief met zichtbare bodbedragen. Open met waarderechtvaardiging, differentieer direct en pak budgetproblemen proactief aan.',
 template: `Hoi [Klantnaam],

Ik heb [X vergelijkbare projecten] voltooid met gemiddelde [rating/succes metric]. Jouw [specifieke eis] heeft iemand nodig die [belangrijkste uitdaging] begrijpt.

Mijn aanpak voor jouw project:
→ [Stap 1 met tijdsduur]
→ [Stap 2 met tijdsduur]
→ [Stap 3 met tijdsduur]

Waarom dit bodbedrag: [Korte rechtvaardiging—kwaliteit, tijdlijn of expertise]

Portfolio: [Link naar meest relevante item]
Eerdere klant testimonial: "[Korte quote met resultaat]"

Ik kan [direct/specifieke datum] starten en [mijlpaal 1] leveren binnen [tijdsduur].

Vraag: [Eén verduidelijkende vraag]

Met vriendelijke groet,
[Jouw Naam]`,
 },
 },
 mistakes: {
 title: '10 Offerte Fouten die Je Responspercentage Doden',
 list: [
 {
 title: 'Beginnen met "Geachte Heer/Mevrouw" of Generieke Begroetingen',
 description: 'Signaleert direct massaal verzonden sjabloon. Zoek de naam van de klant op (bekijk hun profiel, bedrijfswebsite of vacature ondertekening). Als niet beschikbaar, gebruik "Hoi [Bedrijfsnaam] Team" of sla de begroeting helemaal over.',
 },
 {
 title: 'Openen met "Ik Ben een Professionele [Jouw Titel]"',
 description: 'Ze weten al dat je een professional bent—je biedt op het project. Begin met te bewijzen dat je hun specifieke uitdaging begrijpt. Je titel staat in je profiel; gebruik offerte ruimte voor waarde.',
 },
 {
 title: 'Vaardigheden Opsommen in Plaats van Resultaten Tonen',
 description: '"Ik ken React, Node.js, MongoDB, AWS..." vertelt klanten niets. In plaats daarvan: "Ik bouwde een React/Node.js app die 10M maandelijkse gebruikers verwerkt met 99,9% uptime." Resultaten >buzzwords.',
 },
 {
 title: 'Romans Schrijven (1.500+ Tekens)',
 description: 'Klanten scannen offertes in 15-30 seconden. Tekstmuren worden overgeslagen. Streef naar 500-800 tekens met duidelijke structuur, bullet points en witruimte. Bewaar details voor het interview.',
 },
 {
 title: 'Vacaturetaal Letterlijk Kopiëren',
 description: 'Sommige freelancers kopiëren/plakken de eisen van de klant om te laten zien dat ze het gelezen hebben. Dit werkt averechts—toont dat je kunt kopiëren, niet denken. Parafraseer eisen en voeg inzichten toe die begrip tonen dat verder gaat dan het oppervlak.',
 },
 {
 title: 'Concurrenten of Andere Platforms Noemen',
 description: 'Schrijf nooit "Ik werk ook op Fiverr" of "Ik heb klanten op [ander platform]". Dit suggereert verdeelde aandacht en verminderde exclusiviteit. Focus volledig op hun project en jouw capaciteiten.',
 },
 {
 title: 'Onderverkopen met "Ik Kan Dit Gemakkelijk" of "Dit is Simpel"',
 description: 'Bedoeld om zelfvertrouwen te tonen maar ontwaardt eigenlijk het werk. Als het zo gemakkelijk is, waarom zouden ze dan je tarief betalen? Erken in plaats daarvan de complexiteit van het project terwijl je je efficiëntie demonstreert door eerdere resultaten.',
 },
 {
 title: 'Geen Call-to-Action of Passieve Afsluiting',
 description: '"Ik hoop van u te horen" legt de bal in hun veld zonder stimulans. Sluit af met vragen, bied snelle audits/consultaties aan of stel specifieke volgende stappen voor. Maak reageren de weg van de minste weerstand.',
 },
 {
 title: 'Focus op Wat Jij Wilt vs. Wat Klant Krijgt',
 description: '"Ik zou graag hieraan willen werken" of "Dit zou geweldig zijn voor mijn portfolio" centreert je eigen behoeften. Draai het om: "Je krijgt [specifieke deliverable] die [specifiek voordeel] biedt." Klantvoordelen eerst, altijd.',
 },
 {
 title: 'Typefouten, Grammaticafouten en Opmaakproblemen',
 description: 'Zelfs één typefout kan je diskwalificeren, vooral voor schrijf-, redigeer- of detailgericht werk. Gebruik Grammarly of vergelijkbare tools, controleer twee keer en test opmaak op verschillende apparaten. Fouten signaleren zorgeloosheid.',
 },
 ],
 },
 cta2: {
 title: 'Ontvang Wekelijkse Freelancing Strategieën',
 description: 'Sluit je aan bij 10.000+ freelancers die bruikbare tips, offerte sjablonen, platform updates en conversiestrategieën elke week ontvangen. Gratis nieuwsbrief zonder opvulling.',
 cta: 'Ontvang Wekelijkse Tips',
 },
 advanced: {
 title: 'Geavanceerde Offerte Strategieën voor Hogere Conversie',
 quickWin: {
 title: 'De "Quick Win" Strategie voor Competitieve Projecten',
 description: 'Wanneer je concurreert tegen 20+ offertes, bied iets onmiddellijks en laag-risico aan. Dit kan een gratis 15-minuten consultatie zijn, snelle audit van hun huidige oplossing of bruikbaar aanbevelingen document. Dit vermindert frictie dramatisch en start de relatie op een gevende basis.',
 example: '"Voordat je je aan een freelancer committeert, wil ik je een gratis 48-uurs audit van je huidige SEO setup aanbieden. Ik identificeer 5-7 directe mogelijkheden met geschatte impact rankings. Geen verplichting—dit helpt je een geïnformeerde beslissing te nemen en geeft mij een kans om expertise te demonstreren. Interesse?"',
 },
 budget: {
 title: 'Budgetproblemen Proactief Aanpakken',
 description: 'Als je tarief hoger is dan hun budget, spook niet of onderbied niet. Pak het direct aan met waarderechtvaardiging of stel een gefaseerde aanpak voor die in hun budget past terwijl je incrementeel waarde demonstreert.',
 approach1Title: 'Waarderechtvaardiging Aanpak:',
 approach1: '"Ik zie dat je budget €X is. Mijn tarief is €Y omdat [specifieke waarde: snelheid, expertise, resultaten]. Ter context, mijn laatste 3 vergelijkbare projecten bespaarden klanten gemiddeld €Z—mijn tarief betaalt zichzelf terug."',
 approach2Title: 'Gefaseerde Aanpak:',
 approach2: '"Ik begrijp het €X budget. Hier is een idee: Laten we beginnen met Fase 1 [belangrijke deliverable] voor €X, die [direct voordeel] zal bieden. Als je tevreden bent met de resultaten, kunnen we Fase 2 [uitgebreide scope] bespreken tegen [toekomstig tarief]."',
 },
 risk: {
 title: 'De "Risk Reversal" Techniek',
 description: 'Verwijder waargenomen risico door mijlpaal-gebaseerde betalingen, tevredenheidsgaranties of proefperiodes aan te bieden. Dit is vooral effectief voor nieuwe profielen of hoogwaardige projecten waar klanten aarzelen.',
 examples: [
 'Betaling alleen nadat je elke mijlpaal hebt bekeken en goedgekeurd',
 'Als eerste deliverable niet aan je verwachtingen voldoet, betaal je niets',
 '1-week proefperiode tegen verlaagd tarief—ga alleen door als tevreden',
 'Resultatengarantie: Als we [specifieke metric] niet behalen, werk ik extra uren zonder kosten',
 ],
 },
 },
 finalCta: {
 title: 'Begin met Offertes Schrijven die Echt Winnen',
 description: 'Implementeer deze sjablonen en strategieën vandaag. Track je responspercentages, verfijn je aanpak en sluit je aan bij de top 15% van freelancers die consistent premium projecten winnen.',
 ctaPrimary: 'Lees Meer Expert Gidsen',
 ctaSecondary: 'Bekijk Top Platforms',
 },
 related: {
 title: 'Gerelateerde Bronnen',
 profile: {
 title: 'Optimaliseer Je Profiel',
 description: 'Verhoog zichtbaarheid met 300% met bewezen tactieken',
 },
 algorithms: {
 title: 'Beheers Platform Algoritmes',
 description: 'Krijg meer uitnodigingen met slimme strategieën',
 },
 communication: {
 title: 'Klant Communicatie',
 description: 'Imponeer klanten en win herhaaldelijke opdrachten',
 },
 },
 } : {
 hero: {
 title: 'How to Write Proposals That Win: Templates and Examples',
 description: 'Stop sending proposals into the void. Learn the proven 5-step formula that converts 40% more clients, with ready-to-use templates, real examples, and platform-specific strategies.',
 ctaPrimary: 'Read Expert Guides',
 ctaSecondary: 'Browse Platforms',
 },
 intro: {
 title: 'Why Most Freelance Proposals Fail (And How to Fix Yours)',
 paragraph1: 'The average freelance proposal has a 2-5% conversion rate. Top freelancers? They consistently convert at 15-25%. The difference isn\'t talent, experience, or rates—it\'s proposal strategy. Most freelancers write proposals that talk about themselves: their skills, experience, and eagerness to work. Winning proposals flip this script entirely, focusing laser-sharp on the client\'s problem and demonstrating understanding before pitching solutions.',
 paragraph2: 'This comprehensive guide reveals the exact proposal formula used by six-figure freelancers across Upwork, Fiverr, Freelancer, and other platforms. You\'ll get actionable templates, real-world examples from multiple industries, and platform-specific customization strategies. By implementing these techniques, freelancers typically see 40-60% increases in response rates within 30 days.',
 stat1Title: '40% Higher Response',
 stat1Desc: 'Average conversion increase',
 stat2Title: '25% Higher Rates',
 stat2Desc: 'When positioning properly',
 stat3Title: '5-10 Min Per Proposal',
 stat3Desc: 'Using template system',
 },
 formula: {
 title: 'The 5-Step Winning Proposal Formula',
 intro: 'This battle-tested formula works across all platforms and industries. Each step serves a specific psychological purpose, guiding clients toward choosing you over dozens of competitors.',
 step1: {
 title: 'Personalized Hook: Prove You Read Their Post (100-150 characters)',
 description: 'Generic opening lines scream "template." Start by referencing something specific from their job post—a unique requirement, mentioned challenge, or project detail. This immediately separates you from 90% of proposals and signals genuine interest.',
 example: '"I noticed you\'re looking to redesign your checkout flow to reduce the 67% cart abandonment rate you mentioned. That\'s a critical pain point I\'ve solved for 3 e-commerce clients in the past 6 months."',
 why: 'Demonstrates reading comprehension, references their specific metric (67%), and immediately positions you as someone who\'s solved this exact problem before.',
 },
 step2: {
 title: 'Problem Understanding: Mirror Their Challenge (150-200 characters)',
 description: 'Before pitching solutions, demonstrate deep understanding of their problem. Restate their challenge in your own words, add insight they might not have considered, and show you "get it." This builds trust and credibility instantly.',
 example: '"High cart abandonment often stems from unexpected costs at checkout, complex forms, or lack of payment options. From your product pages, I see you\'re using a 5-step checkout—optimizing this to 2-3 steps could immediately impact that 67% rate. Additionally, mobile checkout seems to lack progress indicators, which creates uncertainty."',
 why: 'Shows you\'ve already analyzed their site, identified specific issues beyond what they mentioned, and understand the nuances of their challenge.',
 },
 step3: {
 title: 'Your Unique Solution: How You\'ll Solve It (200-300 characters)',
 description: 'Now introduce your approach—specific, actionable, and tailored to their situation. Avoid generic statements ("I\'ll use my expertise"). Instead, outline 3-4 concrete steps, mention relevant tools/methodologies, and explain why this approach works.',
 example: 'Here\'s how I\'d approach your cart abandonment challenge:\n1. Checkout audit using heatmaps and session recordings to identify friction points\n2. Redesign to 2-step checkout with progress indicators and trust badges\n3. Add guest checkout option and save payment methods for returning customers\n4. A/B test new flow against current version for 2 weeks before full rollout\n\nThis approach reduced cart abandonment by 34% for a similar e-commerce client last quarter.',
 why: 'Specific action steps show you\'ve thought through their problem, methodology demonstrates professionalism, and the real result proves capability.',
 },
 step4: {
 title: 'Social Proof: Relevant Results You\'ve Achieved (100-150 characters)',
 description: 'Link to 1-2 highly relevant portfolio pieces or cite specific results from similar projects. Quantify everything—percentages, dollar amounts, time saved. Vague claims like "improved performance" carry zero weight.',
 example: '"Recent similar projects include: [Link to Portfolio Item] - Reduced checkout abandonment from 71% to 37% for fashion e-commerce store, resulting in $127K additional monthly revenue. [Link to Second Item] - Redesigned SaaS signup flow, increasing trial conversions by 54%."',
 why: 'Portfolio links provide proof, specific metrics build credibility, and similar project contexts show directly relevant experience.',
 },
 step5: {
 title: 'Clear Call-to-Action: Make Responding Easy (75-100 characters)',
 description: 'End with a specific, low-friction next step. Never close with "I look forward to hearing from you"—that\'s passive. Instead, suggest a brief call, ask a qualifying question, or offer a quick audit/consultation.',
 examples: [
 'I have 3 quick questions about your current checkout flow. Can we schedule a 15-minute call this week to discuss?',
 'I\'d like to run a quick audit of your checkout process—I can have initial findings to you within 48 hours. Interested?',
 'What\'s your timeline for implementing these changes? I have availability starting next week.',
 ],
 },
 },
 cta1: {
 title: 'Find Platforms That Match Your Proposal Style',
 description: 'Different platforms reward different proposal approaches. Compare proposal limits, response time expectations, and client quality across 500+ marketplaces to optimize your conversion strategy.',
 cta: 'Browse Top Platforms',
 },
 templates: {
 title: 'Platform-Specific Proposal Templates',
 intro: 'Each platform has unique quirks, character limits, and client expectations. Here are proven templates optimized for the three largest freelance marketplaces.',
 upwork: {
 title: 'Upwork Proposal Template (Cover Letter Focus)',
 description: 'Upwork emphasizes cover letters and proposal visibility depends on algorithmic ranking. Front-load value, use keywords from the job post, and keep it under 1,000 characters for best results.',
 template: `Hi [Client Name],

I see you need a [specific skill from job post] to [specific goal mentioned]. That [metric/challenge they mentioned] is exactly what I helped [similar client type] overcome last month—we achieved [specific result with number].

Your [specific aspect of their project] suggests you're dealing with [insightful observation about their situation]. Here's how I'd tackle it:

1. [Specific action step]
2. [Specific action step]
3. [Specific action step]
4. [Specific action step]

I've attached [portfolio piece] showing similar work where I [specific achievement]. Timeline would be [X days/weeks] with milestones at [key points].

Quick question: [qualifying question about their project]?

Looking forward to discussing,
[Your Name]

P.S. I'm available for a quick 15-min call this week if you'd like to discuss your specific requirements.`,
 },
 fiverr: {
 title: 'Fiverr Custom Offer Template (Brief & Benefit-Focused)',
 description: 'Fiverr custom offers require brevity and clarity. Focus on deliverables, timeline, and immediate benefits. Clients expect package-style presentation.',
 template: `Hi [Client Name],

Perfect timing—I specialize in [their specific need].

What you'll get:
✓ [Specific deliverable 1]
✓ [Specific deliverable 2]
✓ [Specific deliverable 3]
✓ [Bonus/added value]

Recent results: [Brief metric or achievement from similar project]

Timeline: [X days] with [milestone] check-in

I've reviewed your [project detail] and have 2 quick questions:
1. [Question]
2. [Question]

Ready to start immediately. Let's make this happen!

[Your Name]`,
 },
 freelancer: {
 title: 'Freelancer.com Bid Template (Competitive Positioning)',
 description: 'Freelancer.com is highly competitive with visible bid amounts. Lead with value justification, differentiate immediately, and address budget concerns proactively.',
 template: `Hi [Client Name],

I've completed [X similar projects] with average [rating/success metric]. Your [specific requirement] needs someone who understands [key challenge].

My approach for your project:
→ [Step 1 with timeframe]
→ [Step 2 with timeframe]
→ [Step 3 with timeframe]

Why this bid amount: [Brief justification—quality, timeline, or expertise]

Portfolio: [Link to most relevant piece]
Previous client testimonial: "[Short quote with result]"

I can start [immediately/specific date] and deliver [milestone 1] within [timeframe].

Question: [One clarifying question]

Best regards,
[Your Name]`,
 },
 },
 mistakes: {
 title: '10 Proposal Mistakes That Kill Your Response Rate',
 list: [
 {
 title: 'Starting with "Dear Sir/Madam" or Generic Greetings',
 description: 'Instantly signals mass-sent template. Research the client\'s name (check their profile, company website, or job post signature). If unavailable, use "Hi [Company Name] Team" or skip the greeting entirely.',
 },
 {
 title: 'Leading with "I Am a Professional [Your Title]"',
 description: 'They already know you\'re a professional—you\'re bidding on the project. Start by proving you understand their specific challenge. Your title is in your profile; use proposal space for value.',
 },
 {
 title: 'Listing Skills Instead of Showing Results',
 description: '"I know React, Node.js, MongoDB, AWS..." tells clients nothing. Instead: "I built a React/Node.js app that handles 10M monthly users with 99.9% uptime." Results >buzzwords.',
 },
 {
 title: 'Writing Novels (1,500+ Characters)',
 description: 'Clients skim proposals in 15-30 seconds. Walls of text get skipped. Aim for 500-800 characters with clear structure, bullet points, and white space. Save details for the interview.',
 },
 {
 title: 'Copying Job Post Language Verbatim',
 description: 'Some freelancers copy/paste the client\'s requirements to show they read it. This backfires—shows you can copy, not think. Paraphrase requirements and add insights that demonstrate understanding beyond surface level.',
 },
 {
 title: 'Mentioning Competitors or Other Platforms',
 description: 'Never write "I also work on Fiverr" or "I have clients on [other platform]." This suggests divided attention and reduced exclusivity. Focus entirely on their project and your capabilities.',
 },
 {
 title: 'Underselling with "I Can Do This Easily" or "This is Simple"',
 description: 'Intended to show confidence but actually devalues the work. If it\'s so easy, why should they pay your rate? Instead, acknowledge project complexity while demonstrating your efficiency through past results.',
 },
 {
 title: 'No Call-to-Action or Passive Closing',
 description: '"I hope to hear from you" puts the ball in their court with no incentive. End with questions, offer quick audits/consultations, or suggest specific next steps. Make responding the path of least resistance.',
 },
 {
 title: 'Focusing on What You Want vs. What Client Gets',
 description: '"I would love to work on this" or "This would be great for my portfolio" centers your needs. Flip it: "You\'ll get [specific deliverable] that [specific benefit]." Client benefits first, always.',
 },
 {
 title: 'Typos, Grammar Errors, and Formatting Issues',
 description: 'Even one typo can disqualify you, especially for writing, editing, or detail-oriented work. Use Grammarly or similar tools, proofread twice, and test formatting across devices. Errors signal carelessness.',
 },
 ],
 },
 cta2: {
 title: 'Get Weekly Freelancing Strategies',
 description: 'Join 10,000+ freelancers receiving actionable tips, proposal templates, platform updates, and conversion strategies every week. Free newsletter with no fluff.',
 cta: 'Get Weekly Tips',
 },
 advanced: {
 title: 'Advanced Proposal Strategies for Higher Conversion',
 quickWin: {
 title: 'The "Quick Win" Strategy for Competitive Projects',
 description: 'When competing against 20+ proposals, offer something immediate and low-risk. This could be a free 15-minute consultation, quick audit of their current solution, or actionable recommendations document. This dramatically reduces friction and starts the relationship on a giving basis.',
 example: '"Before committing to any freelancer, I\'d like to offer you a complimentary 48-hour audit of your current SEO setup. I\'ll identify 5-7 immediate opportunities with estimated impact rankings. No obligation—this helps you make an informed decision and gives me a chance to demonstrate expertise. Interested?"',
 },
 budget: {
 title: 'Addressing Budget Concerns Proactively',
 description: 'If your rate is higher than their budget, don\'t ghost or underbid. Address it head-on with value justification or propose a phased approach that fits their budget while demonstrating value incrementally.',
 approach1Title: 'Value Justification Approach:',
 approach1: '"I see your budget is $X. My rate is $Y because [specific value: speed, expertise, results]. For context, my last 3 similar projects saved clients an average of $Z—my rate pays for itself."',
 approach2Title: 'Phased Approach:',
 approach2: '"I understand the $X budget. Here\'s an idea: Let\'s start with Phase 1 [key deliverable] for $X, which will [immediate benefit]. If you\'re happy with results, we can discuss Phase 2 [extended scope] at [future rate]."',
 },
 risk: {
 title: 'The "Risk Reversal" Technique',
 description: 'Remove perceived risk by offering milestone-based payments, satisfaction guarantees, or trial periods. This is especially effective for new profiles or high-value projects where clients are hesitant.',
 examples: [
 'Payment only after you\'ve reviewed and approved each milestone',
 'If first deliverable doesn\'t meet your expectations, you pay nothing',
 '1-week trial period at reduced rate—continue only if satisfied',
 'Results guarantee: If we don\'t achieve [specific metric], I\'ll work additional hours at no charge',
 ],
 },
 },
 finalCta: {
 title: 'Start Writing Proposals That Actually Win',
 description: 'Implement these templates and strategies today. Track your response rates, refine your approach, and join the top 15% of freelancers who consistently win premium projects.',
 ctaPrimary: 'Read More Expert Guides',
 ctaSecondary: 'Browse Top Platforms',
 },
 related: {
 title: 'Related Resources',
 profile: {
 title: 'Optimize Your Profile',
 description: 'Boost visibility by 300% with proven tactics',
 },
 algorithms: {
 title: 'Master Platform Algorithms',
 description: 'Get more invites with smart strategies',
 },
 communication: {
 title: 'Client Communication',
 description: 'Impress clients and win repeat business',
 },
 },
 };

 return (
 <>
 
 <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
 {/* Hero Section */}
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
 {content.hero.description}
 </p>

 <div className="flex flex-wrap items-center justify-center gap-4">
 <Link
 href={`/${locale}/blog`}
 className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
 >
 {content.hero.ctaPrimary}
 <ArrowRight className="w-5 h-5" />
 </Link>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20"
 >
 {content.hero.ctaSecondary}
 <Zap className="w-5 h-5" />
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Schema.org Structured Data */}
 <script type="application/ld+json" dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org",
 "@type": "Article",
 "headline": content.hero.title,
 "description": content.hero.description,
 "author": {
 "@type": "Organization",
 "name": "SkillLinkup"
 },
 "publisher": {
 "@type": "Organization",
 "name": "SkillLinkup"
 },
 "datePublished": "2026-01-15",
 "dateModified": "2026-01-15"
 })
 }} />

 {/* Main Content */}
 <article className="container mx-auto px-4 py-16">
 <div className="max-w-4xl mx-auto">

 {/* Introduction */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
 {content.intro.title}
 </h2>

 <div className="prose prose-lg dark:prose-invert max-w-none">
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
 {content.intro.paragraph1}
 </p>

 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
 {content.intro.paragraph2}
 </p>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
 <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border border-primary/20">
 <Target className="w-10 h-10 text-primary mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.intro.stat1Title}</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">{content.intro.stat1Desc}</p>
 </div>
 <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20">
 <DollarSign className="w-10 h-10 text-accent mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.intro.stat2Title}</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">{content.intro.stat2Desc}</p>
 </div>
 <div className="bg-gradient-to-br from-[#1e1541]/10 to-[#1e1541]/5 dark:from-[#1e1541]/30 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
 <TrendingUp className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.intro.stat3Title}</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">{content.intro.stat3Desc}</p>
 </div>
 </div>
 </div>
 </div>

 {/* The 5-Step Formula */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
 {content.formula.title}
 </h2>

 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
 {content.formula.intro}
 </p>

 <div className="space-y-6">
 <div className="flex items-start gap-4">
 <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
 <span className="text-primary font-bold text-xl">1</span>
 </div>
 <div>
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
 {content.formula.step1.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
 {content.formula.step1.description}
 </p>
 <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 mb-3">
 <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{locale === 'nl' ? 'Voorbeeld:' : 'Example:'}</p>
 <p className="text-gray-700 dark:text-gray-300 text-sm italic">
 {content.formula.step1.example}
 </p>
 </div>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 <strong>{locale === 'nl' ? 'Waarom het werkt:' : 'Why it works:'}</strong>{content.formula.step1.why}
 </p>
 </div>
 </div>

 <div className="flex items-start gap-4">
 <div className="w-12 h-12 bg-accent/10 dark:bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
 <span className="text-accent font-bold text-xl">2</span>
 </div>
 <div>
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
 {content.formula.step2.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
 {content.formula.step2.description}
 </p>
 <div className="bg-accent/5 dark:bg-accent/10 rounded-lg p-4 mb-3">
 <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{locale === 'nl' ? 'Voorbeeld:' : 'Example:'}</p>
 <p className="text-gray-700 dark:text-gray-300 text-sm italic">
 {content.formula.step2.example}
 </p>
 </div>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 <strong>{locale === 'nl' ? 'Waarom het werkt:' : 'Why it works:'}</strong>{content.formula.step2.why}
 </p>
 </div>
 </div>

 <div className="flex items-start gap-4">
 <div className="w-12 h-12 bg-[#1e1541]/10 dark:bg-[#1e1541]/30 rounded-xl flex items-center justify-center flex-shrink-0">
 <span className="text-[#1e1541] dark:text-white font-bold text-xl">3</span>
 </div>
 <div>
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
 {content.formula.step3.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
 {content.formula.step3.description}
 </p>
 <div className="bg-[#1e1541]/5 dark:bg-[#1e1541]/20 rounded-lg p-4 mb-3">
 <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{locale === 'nl' ? 'Voorbeeld:' : 'Example:'}</p>
 <p className="text-gray-700 dark:text-gray-300 text-sm italic mb-2">
 {content.formula.step3.example.split('\n')[0]}
 </p>
 <ol className="text-gray-700 dark:text-gray-300 text-sm space-y-1 list-decimal list-inside">
 {content.formula.step3.example.split('\n').slice(1, 5).map((line, i) =>(
 <li key={i}>{line.replace(/^\d+\.\s*/, '')}</li>
 ))}
 </ol>
 <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
 {content.formula.step3.example.split('\n')[6]}
 </p>
 </div>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 <strong>{locale === 'nl' ? 'Waarom het werkt:' : 'Why it works:'}</strong>{content.formula.step3.why}
 </p>
 </div>
 </div>

 <div className="flex items-start gap-4">
 <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
 <span className="text-primary font-bold text-xl">4</span>
 </div>
 <div>
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
 {content.formula.step4.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
 {content.formula.step4.description}
 </p>
 <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 mb-3">
 <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{locale === 'nl' ? 'Voorbeeld:' : 'Example:'}</p>
 <p className="text-gray-700 dark:text-gray-300 text-sm italic">
 {content.formula.step4.example}
 </p>
 </div>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 <strong>{locale === 'nl' ? 'Waarom het werkt:' : 'Why it works:'}</strong>{content.formula.step4.why}
 </p>
 </div>
 </div>

 <div className="flex items-start gap-4">
 <div className="w-12 h-12 bg-accent/10 dark:bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
 <span className="text-accent font-bold text-xl">5</span>
 </div>
 <div>
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
 {content.formula.step5.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
 {content.formula.step5.description}
 </p>
 <div className="bg-accent/5 dark:bg-accent/10 rounded-lg p-4">
 <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{locale === 'nl' ? 'Voorbeelden:' : 'Examples:'}</p>
 <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-2">
 {content.formula.step5.examples.map((example, i) =>(
 <li key={i}>→ {example}</li>
 ))}
 </ul>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* CTA Section 1 */}
 <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
 <div className="max-w-3xl mx-auto text-center">
 <Target className="w-16 h-16 text-white mx-auto mb-6" />
 <h2 className="text-3xl md:text-4xl font-bold mb-4">
 {content.cta1.title}
 </h2>
 <p className="text-xl text-white/90 mb-8">
 {content.cta1.description}
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
 >
 {content.cta1.cta}
 <ArrowRight className="w-5 h-5" />
 </Link>
 </div>
 </div>

 {/* Platform-Specific Templates */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
 {content.templates.title}
 </h2>

 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
 {content.templates.intro}
 </p>

 <div className="space-y-8">
 <div>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
 <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center">
 <FileText className="w-6 h-6 text-primary" />
 </div>
 {content.templates.upwork.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
 {content.templates.upwork.description}
 </p>
 <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
 <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans">
{content.templates.upwork.template}
 </pre>
 </div>
 </div>

 <div>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
 <div className="w-10 h-10 bg-accent/10 dark:bg-accent/20 rounded-xl flex items-center justify-center">
 <FileText className="w-6 h-6 text-accent" />
 </div>
 {content.templates.fiverr.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
 {content.templates.fiverr.description}
 </p>
 <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
 <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans">
{content.templates.fiverr.template}
 </pre>
 </div>
 </div>

 <div>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
 <div className="w-10 h-10 bg-[#1e1541]/10 dark:bg-[#1e1541]/30 rounded-xl flex items-center justify-center">
 <FileText className="w-6 h-6 text-[#1e1541] dark:text-white" />
 </div>
 {content.templates.freelancer.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
 {content.templates.freelancer.description}
 </p>
 <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
 <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans">
{content.templates.freelancer.template}
 </pre>
 </div>
 </div>
 </div>
 </div>

 {/* Ad Widget */}
 <div className="mb-12">
 <AdWidget placement="blog_sidebar" />
 </div>

 {/* Common Mistakes */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
 {content.mistakes.title}
 </h2>

 <div className="space-y-4">
 {content.mistakes.list.map((mistake, i) =>(
 <div key={i} className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-xl">
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
 {i + 1}. {mistake.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 {mistake.description}
 </p>
 </div>
 ))}
 </div>
 </div>

 {/* CTA Section 2 */}
 <div className="bg-gradient-to-br from-[#1e1541] to-[#1e1541]/80 rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
 <div className="max-w-3xl mx-auto text-center">
 <Award className="w-16 h-16 text-accent mx-auto mb-6" />
 <h2 className="text-3xl md:text-4xl font-bold mb-4">
 {content.cta2.title}
 </h2>
 <p className="text-xl text-white/90 mb-8">
 {content.cta2.description}
 </p>
 <Link
 href={`/${locale}/newsletter`}
 className="inline-flex items-center gap-2 bg-white text-[#1e1541] hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
 >
 {content.cta2.cta}
 <ArrowRight className="w-5 h-5" />
 </Link>
 </div>
 </div>

 {/* Advanced Strategies */}
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
 {content.advanced.title}
 </h2>

 <div className="space-y-8">
 <div>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 {content.advanced.quickWin.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
 {content.advanced.quickWin.description}
 </p>
 <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/20">
 <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{locale === 'nl' ? 'Voorbeeld:' : 'Example:'}</p>
 <p className="text-gray-700 dark:text-gray-300 text-sm italic">
 {content.advanced.quickWin.example}
 </p>
 </div>
 </div>

 <div>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 {content.advanced.budget.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
 {content.advanced.budget.description}
 </p>
 <ul className="space-y-3">
 <li className="flex items-start gap-3">
 <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
 <div>
 <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{content.advanced.budget.approach1Title}</p>
 <p className="text-gray-700 dark:text-gray-300 text-sm">{content.advanced.budget.approach1}</p>
 </div>
 </li>
 <li className="flex items-start gap-3">
 <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
 <div>
 <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{content.advanced.budget.approach2Title}</p>
 <p className="text-gray-700 dark:text-gray-300 text-sm">{content.advanced.budget.approach2}</p>
 </div>
 </li>
 </ul>
 </div>

 <div>
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
 {content.advanced.risk.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
 {content.advanced.risk.description}
 </p>
 <div className="bg-accent/5 dark:bg-accent/10 rounded-xl p-6 border border-accent/20">
 <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">{locale === 'nl' ? 'Risk Reversal Voorbeelden:' : 'Risk Reversal Examples:'}</p>
 <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
 {content.advanced.risk.examples.map((example, i) =>(
 <li key={i}>→ {example}</li>
 ))}
 </ul>
 </div>
 </div>
 </div>
 </div>

 {/* Final CTA */}
 <div className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
 <div className="max-w-3xl mx-auto">
 <FileText className="w-16 h-16 text-white mx-auto mb-6" />
 <h2 className="text-3xl md:text-4xl font-bold mb-4">
 {content.finalCta.title}
 </h2>
 <p className="text-xl text-white/90 mb-8">
 {content.finalCta.description}
 </p>
 <div className="flex flex-wrap items-center justify-center gap-4">
 <Link
 href={`/${locale}/blog`}
 className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
 >
 {content.finalCta.ctaPrimary}
 <ArrowRight className="w-5 h-5" />
 </Link>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20"
 >
 {content.finalCta.ctaSecondary}
 <Zap className="w-5 h-5" />
 </Link>
 </div>
 </div>
 </div>

 {/* Related Resources */}
 <div className="mt-12 pt-12 border-t border-gray-200 dark:border-slate-700">
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
 {content.related.title}
 </h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <Link
 href={`/${locale}/resources/optimizing-freelance-profile-maximum-visibility`}
 className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
 >
 <Target className="w-10 h-10 text-primary mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
 {content.related.profile.title}
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 {content.related.profile.description}
 </p>
 </Link>
 <Link
 href={`/${locale}/resources/mastering-freelance-platform-algorithms`}
 className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
 >
 <TrendingUp className="w-10 h-10 text-accent mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
 {content.related.algorithms.title}
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 {content.related.algorithms.description}
 </p>
 </Link>
 <Link
 href={`/${locale}/resources/freelance-platform-communication`}
 className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
 >
 <MessageSquare className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
 {content.related.communication.title}
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">
 {content.related.communication.description}
 </p>
 </Link>
 </div>
 </div>
 </div>
 </article>
 </main>
 
 </>
 );
}
