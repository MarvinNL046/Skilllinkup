import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FileText, Shield, CheckCircle, AlertTriangle, Download } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }>}): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'freelance-contracts-101';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

 if (locale === 'nl') {
 return {
 title: 'Freelance Contracten Opstellen: Bescherm Jezelf en Je Klanten 2024',
 description: 'Leer hoe je effectieve freelance contracten opstelt die zowel jou als je klanten beschermen. Inclusief essentiële clausules, sjablonen en juridische best practices voor ZZP\'ers.',
 keywords: 'contracten opstellen freelance, algemene voorwaarden zzp, freelance overeenkomst nederland, zelfstandigen contract, juridische bescherming zzp',
 openGraph: {
 title: 'Freelance Contracten Opstellen: Bescherm Jezelf en Je Klanten 2024',
 description: 'Master freelance contracten met sjablonen en best practices. Leer essentiële clausules om je werk te beschermen en betaling te garanderen.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/resources-og.png`,
 width: 1200,
 height: 630,
 alt: 'Freelance Contracten Opstellen: Bescherm Jezelf en Je Klanten 2024',
 }
 ],
 locale: 'nl_NL',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Freelance Contracten Opstellen: Bescherm Jezelf en Je Klanten 2024',
 description: 'Leer hoe je effectieve freelance contracten opstelt die zowel jou als je klanten beschermen. Inclusief essentiële clausules, sjablonen en juridische best practices voor ZZP\'ers.',
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
 googleBot: {
 index: true,
 follow: true,
 'max-video-preview': -1,
 'max-image-preview': 'large',
 'max-snippet': -1,
 },
 },
 };
 }

 return {
 title: 'Freelance Contracts 101: Protect Yourself and Your Clients',
 description: 'Learn how to create effective freelance contracts that protect both you and your clients. Includes essential clauses, templates, and legal best practices.',
 keywords: 'freelance contract, contract template, freelance agreement, legal protection, freelance terms',
 openGraph: {
 title: 'Freelance Contracts 101: Protect Yourself and Your Clients',
 description: 'Master freelance contracts with templates and best practices. Learn essential clauses to protect your work and ensure payment.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [
 {
 url: `${siteUrl}/images/og/resources-og.png`,
 width: 1200,
 height: 630,
 alt: 'Freelance Contracts 101: Protect Yourself and Your Clients',
 }
 ],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Freelance Contracts 101: Protect Yourself and Your Clients',
 description: 'Learn how to create effective freelance contracts that protect both you and your clients. Includes essential clauses, templates, and legal best practices.',
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
 googleBot: {
 index: true,
 follow: true,
 'max-video-preview': -1,
 'max-image-preview': 'large',
 'max-snippet': -1,
 },
 },
 };
}

export default async function FreelanceContractsGuidePage({ params }: { params: Promise<{ locale: string }>}) {
 const { locale } = await params;

 const content = locale === 'nl' ? {
 jsonLd: {
 headline: 'Freelance Contracten Opstellen: Jezelf en Je Klanten Beschermen',
 description: 'Complete gids voor freelance contracten inclusief essentiële clausules, sjablonen en juridische beschermingsstrategieën.',
 },
 hero: {
 h1: 'Freelance Contracten Opstellen: Bescherm Jezelf en Je Klanten',
 intro: 'Leer hoe je uitgebreide freelance contracten opstelt die je werk beschermen, betaling garanderen en professionele klantrelaties opbouwen.',
 cta1: 'Maak Professionele Facturen',
 cta2: 'Zakelijke Tools',
 },
 intro: 'Een goed geschreven freelance contract is je beste bescherming tegen scope creep, betalingsconflicten en juridische problemen. Of je nu ontwerper, ontwikkelaar, schrijver of consultant bent, elk freelance project moet beginnen met een helder, uitgebreid contract dat verwachtingen, deliverables en voorwaarden vastlegt.',
 whySection: {
 title: 'Waarom Elk Freelance Project Een Contract Nodig Heeft',
 cards: [
 {
 title: 'Juridische Bescherming',
 desc: 'Contracten bieden juridische verhaalsmogelijkheden als klanten niet betalen, je werk misbruiken of de deliverables betwisten. Ze stellen een duidelijk overzicht vast van overeengekomen voorwaarden.',
 },
 {
 title: 'Duidelijke Verwachtingen',
 desc: 'Contracten definiëren projectscope, tijdlijnen, deliverables en revisiebeleid, waardoor misverstanden en scope creep worden voorkomen.',
 },
 {
 title: 'Professioneel Imago',
 desc: 'Het gebruik van contracten toont professionaliteit en vestigt je als serieuze ondernemer, niet als een hobby-freelancer.',
 },
 {
 title: 'Conflictpreventie',
 desc: 'De meeste geschillen ontstaan door onduidelijke verwachtingen. Contracten elimineren dubbelzinnigheid en bieden een referentiepunt voor het oplossen van meningsverschillen.',
 },
 ],
 },
 essentialElements: {
 title: 'Essentiële Onderdelen van een Freelance Contract',
 intro: 'Elk freelance contract moet deze kritieke componenten bevatten:',
 elements: [
 {
 number: '1',
 title: 'Partijen en Contactinformatie',
 intro: 'Identificeer beide partijen duidelijk met volledige juridische namen, bedrijfsnamen (indien van toepassing) en contactgegevens:',
 example: {
 provider: 'Dienstverlener (Freelancer):',
 providerName: 'Jane Smith / JS Design Studio',
 providerAddress: 'Hoofdstraat 123, Amsterdam 1000 AA',
 providerContact: 'jane@jsdesign.nl | 020 123 4567',
 client: 'Opdrachtgever:',
 clientName: 'ABC Bedrijf B.V.',
 clientAddress: 'Zakenlaan 456, Rotterdam 3000 BB',
 clientContact: 'Contact: John Doe, Marketing Directeur',
 clientEmail: 'john@abcbedrijf.nl | 010 987 6543',
 },
 },
 {
 number: '2',
 title: 'Scope van het Werk',
 intro: 'Definieer precies welk werk je gaat leveren. Wees specifiek om scope creep te voorkomen:',
 exampleTitle: 'Voorbeeld voor Web Designer:',
 list: [
 'Ontwerp homepage, over-pagina, diensten-pagina, contact-pagina (4 pagina\'s totaal)',
 'Mobiel-responsive ontwerp voor alle pagina\'s',
 'Custom logo ontwerp (3 concepten, 2 revisierondes)',
 'Kleurenpalet en typografie richtlijnen document',
 'Oplevering: Definitieve ontwerpbestanden in Figma en geëxporteerde assets (PNG, SVG)',
 'NIET inbegrepen: Website ontwikkeling/codering, SEO optimalisatie, content schrijven',
 ],
 },
 {
 number: '3',
 title: 'Tijdlijn en Deliverables',
 intro: 'Stel duidelijke deadlines en mijlpalen vast:',
 timeline: [
 { period: 'Week 1-2:', task: 'Onderzoek, wireframes en initiële concepten' },
 { period: 'Week 3:', task: 'Eerste ontwerp draft voor klant review' },
 { period: 'Week 4:', task: 'Revisies op basis van feedback' },
 { period: 'Week 5:', task: 'Finale oplevering van alle assets' },
 ],
 note: 'Opmerking: Tijdlijn veronderstelt dat klant binnen 3 werkdagen feedback geeft. Vertragingen in klant respons zullen de tijdlijn dienovereenkomstig verlengen.',
 },
 {
 number: '4',
 title: 'Betalingsvoorwaarden',
 intro: 'Specificeer totale kosten, betalingsschema en geaccepteerde betaalmethodes:',
 exampleTitle: 'Voorbeeld Betalingsstructuur:',
 structure: [
 { label: 'Totale Projectkosten:', amount: '€5.000' },
 { label: 'Aanbetaling (50% bij ondertekening):', amount: '€2.500', highlight: true },
 { label: 'Eindbetaling (bij oplevering):', amount: '€2.500', highlight: true },
 ],
 methods: 'Betaalmethodes: Bankoverschrijving, iDEAL, Credit Card',
 lateFee: 'Te Late Betaling: Facturen onbetaald na 14 dagen onderhevig aan 1,5% maandelijkse rente',
 },
 {
 number: '5',
 title: 'Revisiebeleid',
 intro: 'Definieer welke revisies inbegrepen zijn en hoe extra wijzigingen worden behandeld:',
 list: [
 'Inbegrepen: Tot 2 revisierondes gebaseerd op oorspronkelijke scope',
 'Revisie Definitie: Kleine aanpassingen aan deliverables (kleurwijzigingen, tekst edits, layout tweaks)',
 'GEEN Revisies: Nieuwe pagina\'s, extra features, complete herontwerpen of scope wijzigingen',
 'Extra Revisies: €150 per extra ronde of uurtarief van €75/uur',
 'Grote Wijzigingen: Vereisen nieuwe scope definitie en aparte overeenkomst',
 ],
 },
 {
 number: '6',
 title: 'Intellectuele Eigendomsrechten',
 intro: 'Verduidelijk wie eigenaar is van het werk en wanneer eigendom overgaat:',
 clause: '"Na ontvangst van de eindbetaling gaan alle intellectuele eigendomsrechten voor het geleverde werk over naar de Opdrachtgever. Tot eindbetaling is ontvangen, behoudt de Opdrachtnemer alle rechten op het werk. Opdrachtnemer behoudt het recht om het werk in hun portfolio te tonen en te gebruiken voor zelfpromotie doeleinden."',
 important: 'Belangrijk: Sommige klanten kunnen work-for-hire overeenkomsten of directe IP-overdracht vereisen. Pas prijzen dienovereenkomstig aan voor deze voorwaarden.',
 },
 {
 number: '7',
 title: 'Beëindigingsclausule',
 intro: 'Beschrijf hoe beide partijen het contract kunnen beëindigen:',
 clause: '"Beide partijen kunnen deze overeenkomst beëindigen met 7 dagen schriftelijke kennisgeving. Bij beëindiging:',
 list: [
 'Opdrachtgever moet betalen voor al het tot dan toe voltooide werk op basis van percentage projectvoltooiing',
 'Opdrachtnemer levert al het werk in uitvoering in de huidige staat',
 'Elke vooruitbetaling voor onvoltooid werk wordt binnen 14 dagen terugbetaald',
 'Beide partijen\' verplichtingen onder vertrouwelijkheid en IP clausules blijven van kracht"',
 ],
 },
 {
 number: '8',
 title: 'Vertrouwelijkheid en NDA',
 intro: 'Bescherm gevoelige klantinformatie:',
 clause: '"Opdrachtnemer stemt ermee in vertrouwelijkheid te bewaren van alle eigendomsinformatie, bedrijfsgeheimen en gevoelige bedrijfsinformatie gedeeld door Opdrachtgever tijdens het project. Deze verplichting duurt 2 jaar na projectvoltooiing. Vertrouwelijke informatie omvat niet: (a) informatie al in het publieke domein, (b) informatie ontvangen van derden zonder vertrouwelijkheidsverplichtingen, of (c) werk samples gebruikt in Opdrachtnemer\'s portfolio met schriftelijke toestemming van Opdrachtgever."',
 },
 ],
 },
 ctaBox1: {
 title: 'Combineer Contracten met Professioneel Factureren',
 description: 'Zodra je contract getekend is, stuur professionele facturen die aansluiten bij je voorwaarden. Onze gratis factuur generator maakt factureren eenvoudig en consistent.',
 cta: 'Maak Professionele Factuur',
 },
 bestPractices: {
 title: 'Best Practices voor Freelance Contracten',
 practices: [
 {
 title: 'Gebruik Begrijpelijke Taal',
 content: 'Vermijd excessief juridisch jargon. Je contract moet begrijpelijk zijn voor zowel jou als je klant zonder juridische graad. Duidelijke taal voorkomt misinterpretatie en toont professionaliteit.',
 },
 {
 title: 'Laat Het Tekenen Voor Je Begint',
 content: 'Begin nooit met werken zonder getekend contract, ongeacht hoe urgent de klant zegt dat het project is. Niet-ondertekende contracten hebben geen juridisch gewicht. Gebruik elektronische handtekening tools zoals DocuSign, HelloSign of PandaDoc voor snelle ondertekening.',
 },
 {
 title: 'Eis Aanbetalingen voor Nieuwe Klanten',
 content: 'Eis altijd 25-50% vooruitbetaling van nieuwe klanten. Dit toont hun betrokkenheid en beschermt je tegen tijdverspillers. Voor gevestigde, vertrouwde klanten kun je deze eis laten varen.',
 },
 {
 title: 'Bouw Een Contractenbibliotheek',
 content: 'Creëer sjablonen voor verschillende projecttypes (ontwerp, ontwikkeling, consulting, retainers). Pas elk sjabloon aan voor specifieke klanten terwijl je jouw kernbeschermingsclausules behoudt. Dit bespaart tijd en zorgt voor consistentie.',
 },
 {
 title: 'Documenteer Alles Schriftelijk',
 content: 'Volg verbale gesprekken en beslissingen op met schriftelijke bevestiging via email. "Zoals we telefonisch besproken..." emails creëren een papieren trail die kan worden geraadpleegd als geschillen ontstaan.',
 },
 {
 title: 'Herzie en Update Regelmatig',
 content: 'Herzie je contract sjablonen jaarlijks of na elk problematisch project. Leer van ervaring en voeg clausules toe om problemen die je hebt ondervonden aan te pakken. Overweeg een advocaat grote updates te laten reviewen.',
 },
 ],
 },
 redFlags: {
 title: 'Contract Red Flags Om Op Te Letten',
 intro: 'Wees voorzichtig met klanten die pushback geven op deze gezond verstand contract bepalingen:',
 flags: [
 {
 title: 'Weigeren Een Contract Te Tekenen',
 content: '"Laten we gewoon beginnen en zien hoe het gaat" of "We vertrouwen elkaar, we hebben geen contract nodig" zijn grote red flags. Professionele klanten begrijpen de waarde van contracten.',
 },
 {
 title: 'Geen Vooruitbetaling',
 content: 'Klanten die geen enkele aanbetaling willen geven verdwijnen vaak of weigeren eindbetaling. Als ze geen geld vooraf kunnen committeren, zijn ze niet gecommitteerd aan het project.',
 },
 {
 title: 'Onbeperkte Revisies',
 content: 'Klanten die "onbeperkte revisies" eisen zullen je tijd en winst weglekken. Cap altijd revisies of reken per uur voor extra wijzigingen.',
 },
 {
 title: 'Betaling Na Projectsucces',
 content: '"We betalen je zodra de campagne succesvol is" of "betaling op basis van resultaten" draagt bedrijfsrisico over op jou. Tenzij je partner bent met aandelen, verdien je betaling voor voltooid werk.',
 },
 {
 title: 'Vage Scope Vereisten',
 content: 'Als een klant niet duidelijk kan definiëren wat ze willen, krijg je eindloze revisies en scope creep. Ga niet verder tot de scope kristalhelder is en gedocumenteerd.',
 },
 ],
 },
 digitalTools: {
 title: 'Beste Digitale Handtekening Tools voor Freelancers',
 tools: [
 {
 name: 'DocuSign',
 description: 'Industriestandaard met juridisch bindende handtekeningen. Gratis plan omvat 5 documenten/maand. Mobiele app beschikbaar.',
 bestFor: 'Beste voor: Hoogwaardige contracten die maximale juridische bescherming vereisen',
 },
 {
 name: 'HelloSign (Dropbox Sign)',
 description: 'Eenvoudige, gebruiksvriendelijke interface. 3 documenten/maand gratis. Integreert met Google Drive en Dropbox.',
 bestFor: 'Beste voor: Freelancers die eenvoudige, snelle handtekening verzameling willen',
 },
 {
 name: 'PandaDoc',
 description: 'Combineert contracten, offertes en quotes in één platform. Document analytics tonen wanneer klanten contracten bekijken.',
 bestFor: 'Beste voor: Freelancers die offertes en contracten samen versturen',
 },
 {
 name: 'Bonsai',
 description: 'All-in-one freelance platform met contracten, facturering, tijdregistratie en klantbeheer. €22/maand.',
 bestFor: 'Beste voor: Freelancers die geïntegreerde bedrijfsmanagement tools willen',
 },
 ],
 },
 lawyerSection: {
 title: 'Wanneer Een Advocaat Inschakelen',
 intro: 'Overweeg een advocaat te raadplegen in deze situaties:',
 situations: [
 'Je eerste contract sjabloon maken: Een advocaat kan ervoor zorgen dat je basis sjabloon juridisch solide is (€500-€1.500)',
 'Hoogwaardige projecten: Projecten boven €25.000 rechtvaardigen juridische review van het contract',
 'Complexe IP regelingen: Wanneer licenties, gezamenlijk eigendom of work-for-hire voorwaarden betrokken zijn',
 'Internationale klanten: Grensoverschrijdende contracten kunnen meerdere jurisdicties vereisen',
 'Klant-aangeleverde contracten: Laat een advocaat elk contract dat een klant je stuurt reviewen voor ondertekening',
 'Geschilbeslechting: Als een contract geschil ontstaat, raadpleeg onmiddellijk een advocaat',
 ],
 conclusion: 'Investering in juridische review betaalt zich vaak terug door kostbare geschillen te voorkomen en je belangen te beschermen in situaties met hoge inzet.',
 },
 ctaBox2: {
 title: 'Beheer Je Freelance Bedrijf Als Een Pro',
 description: 'Contracten zijn slechts één onderdeel van succesvol freelance bedrijfsbeheer. Leer hoe je meerdere klanten jongleert, je workflow organiseert en je bedrijf schaalt.',
 cta1: 'Klantbeheer Gids',
 cta2: 'Facturatie Best Practices',
 },
 conclusion: {
 title: 'Bescherm Je Werk, Bouw Je Bedrijf',
 paragraphs: [
 'Professionele freelance contracten beschermen zowel jou als je klanten door duidelijke verwachtingen te stellen, misverstanden te voorkomen en juridische verhaalsmogelijkheden te bieden als problemen ontstaan. Hoewel het misschien extra werk lijkt vooraf, bespaart een goed geschreven contract tijd, geld en stress op de lange termijn.',
 'Begin met een solide sjabloon, pas het aan voor elk project en laat het altijd tekenen voordat je begint met werken. Je contracten weerspiegelen je professionaliteit en zetten de toon voor succesvolle klantrelaties.',
 'Onthoud: Een contract gaat niet over wantrouwen—het gaat om duidelijkheid, professionaliteit en wederzijdse bescherming. Klanten die terugdeinzen voor het tekenen van contracten zwaaien met rode vlaggen. Professionele klanten verwachten en waarderen duidelijke contracten.',
 ],
 },
 relatedResources: {
 title: 'Gerelateerde Bronnen',
 links: [
 { href: '/resources/freelance-invoicing-guide', label: 'Freelance Facturatie Gids' },
 { href: '/resources/freelance-tax-guide', label: 'Freelance Belasting Gids' },
 { href: '/resources/freelance-business-insurance', label: 'Zakelijke Verzekering Gids' },
 { href: '/tools', label: 'Gratis Zakelijke Tools' },
 ],
 },
 } : {
 jsonLd: {
 headline: 'Freelance Contracts 101: Protecting Yourself and Your Clients',
 description: 'Complete guide to freelance contracts including essential clauses, templates, and legal protection strategies.',
 },
 hero: {
 h1: 'Freelance Contracts 101: Protect Yourself and Your Clients',
 intro: 'Learn how to create comprehensive freelance contracts that protect your work, ensure payment, and build professional client relationships.',
 cta1: 'Create Professional Invoices',
 cta2: 'Business Tools',
 },
 intro: 'A well-written freelance contract is your best protection against scope creep, payment disputes, and legal issues. Whether you\'re a designer, developer, writer, or consultant, every freelance project should start with a clear, comprehensive contract that outlines expectations, deliverables, and terms.',
 whySection: {
 title: 'Why Every Freelance Project Needs a Contract',
 cards: [
 {
 title: 'Legal Protection',
 desc: 'Contracts provide legal recourse if clients don\'t pay, misuse your work, or dispute deliverables. They establish a clear record of agreed-upon terms.',
 },
 {
 title: 'Clear Expectations',
 desc: 'Contracts define project scope, timelines, deliverables, and revision policies, preventing misunderstandings and scope creep.',
 },
 {
 title: 'Professional Image',
 desc: 'Using contracts demonstrates professionalism and establishes you as a serious business owner, not a hobby freelancer.',
 },
 {
 title: 'Conflict Prevention',
 desc: 'Most disputes arise from unclear expectations. Contracts eliminate ambiguity and provide a reference point for resolving disagreements.',
 },
 ],
 },
 essentialElements: {
 title: 'Essential Elements of a Freelance Contract',
 intro: 'Every freelance contract should include these critical components:',
 elements: [
 {
 number: '1',
 title: 'Parties and Contact Information',
 intro: 'Clearly identify both parties with full legal names, business names (if applicable), and contact details:',
 example: {
 provider: 'Service Provider (Freelancer):',
 providerName: 'Jane Smith / JS Design Studio',
 providerAddress: '123 Main Street, City, State 12345',
 providerContact: 'jane@jsdesign.com | (555) 123-4567',
 client: 'Client:',
 clientName: 'ABC Company Inc.',
 clientAddress: '456 Business Ave, City, State 67890',
 clientContact: 'Contact: John Doe, Marketing Director',
 clientEmail: 'john@abccompany.com | (555) 987-6543',
 },
 },
 {
 number: '2',
 title: 'Scope of Work',
 intro: 'Define exactly what work you\'ll deliver. Be specific to prevent scope creep:',
 exampleTitle: 'Example for Web Designer:',
 list: [
 'Design homepage, about page, services page, contact page (4 pages total)',
 'Mobile-responsive design for all pages',
 'Custom logo design (3 concepts, 2 revision rounds)',
 'Color palette and typography guidelines document',
 'Delivery: Final design files in Figma and exported assets (PNG, SVG)',
 'NOT included: Website development/coding, SEO optimization, content writing',
 ],
 },
 {
 number: '3',
 title: 'Timeline and Deliverables',
 intro: 'Establish clear deadlines and milestones:',
 timeline: [
 { period: 'Week 1-2:', task: 'Research, wireframes, and initial concepts' },
 { period: 'Week 3:', task: 'First design draft for client review' },
 { period: 'Week 4:', task: 'Revisions based on feedback' },
 { period: 'Week 5:', task: 'Final delivery of all assets' },
 ],
 note: 'Note: Timeline assumes client provides feedback within 3 business days. Delays in client response will extend the timeline accordingly.',
 },
 {
 number: '4',
 title: 'Payment Terms',
 intro: 'Specify total cost, payment schedule, and accepted payment methods:',
 exampleTitle: 'Example Payment Structure:',
 structure: [
 { label: 'Total Project Cost:', amount: '$5,000' },
 { label: 'Deposit (50% due at signing):', amount: '$2,500', highlight: true },
 { label: 'Final Payment (due upon delivery):', amount: '$2,500', highlight: true },
 ],
 methods: 'Payment Methods: Bank transfer, PayPal, Credit Card',
 lateFee: 'Late Payment: Invoices unpaid after 14 days subject to 1.5% monthly interest charge',
 },
 {
 number: '5',
 title: 'Revision Policy',
 intro: 'Define what revisions are included and how additional changes are handled:',
 list: [
 'Included: Up to 2 rounds of revisions based on original scope',
 'Revision Definition: Minor adjustments to deliverables (color changes, text edits, layout tweaks)',
 'NOT Revisions: New pages, additional features, complete redesigns, or scope changes',
 'Additional Revisions: $150 per additional round or hourly rate of $75/hour',
 'Major Changes: Require new scope definition and separate agreement',
 ],
 },
 {
 number: '6',
 title: 'Intellectual Property Rights',
 intro: 'Clarify who owns the work and when ownership transfers:',
 clause: '"Upon receipt of final payment, all intellectual property rights for the delivered work transfer to the Client. Until final payment is received, Freelancer retains all rights to the work. Freelancer reserves the right to display the work in their portfolio and use it for self-promotion purposes."',
 important: 'Important: Some clients may require work-for-hire agreements or immediate IP transfer. Adjust pricing accordingly for these terms.',
 },
 {
 number: '7',
 title: 'Termination Clause',
 intro: 'Outline how either party can end the contract:',
 clause: '"Either party may terminate this agreement with 7 days written notice. Upon termination:',
 list: [
 'Client must pay for all work completed to date based on percentage of project completion',
 'Freelancer will deliver all work in progress in its current state',
 'Any advance payment for incomplete work will be refunded within 14 days',
 'Both parties\' obligations under confidentiality and IP clauses remain in effect"',
 ],
 },
 {
 number: '8',
 title: 'Confidentiality and NDA',
 intro: 'Protect sensitive client information:',
 clause: '"Freelancer agrees to maintain confidentiality of all proprietary information, trade secrets, and sensitive business information shared by Client during the project. This obligation continues for 2 years after project completion. Confidential information does not include: (a) information already in public domain, (b) information received from third parties without confidentiality obligations, or (c) work samples used in Freelancer\'s portfolio with Client\'s written permission."',
 },
 ],
 },
 ctaBox1: {
 title: 'Pair Contracts with Professional Invoicing',
 description: 'Once your contract is signed, send professional invoices that match your terms. Our free invoice generator makes billing easy and consistent.',
 cta: 'Create Professional Invoice',
 },
 bestPractices: {
 title: 'Freelance Contract Best Practices',
 practices: [
 {
 title: 'Use Plain Language',
 content: 'Avoid excessive legal jargon. Your contract should be understandable to both you and your client without a law degree. Clear language prevents misinterpretation and shows professionalism.',
 },
 {
 title: 'Get It Signed Before Starting Work',
 content: 'Never begin work without a signed contract, regardless of how urgent the client says the project is. Unsigned contracts have no legal weight. Use electronic signature tools like DocuSign, HelloSign, or PandaDoc for fast signing.',
 },
 {
 title: 'Require Deposits for New Clients',
 content: 'Always require 25-50% upfront payment from new clients. This demonstrates their commitment and protects you from time-wasters. For established, trusted clients, you may waive this requirement.',
 },
 {
 title: 'Build a Contract Library',
 content: 'Create templates for different project types (design, development, consulting, retainers). Customize each template for specific clients while maintaining your core protection clauses. This saves time and ensures consistency.',
 },
 {
 title: 'Document Everything in Writing',
 content: 'Follow up verbal conversations and decisions with written confirmation via email. "As we discussed on the phone..." emails create a paper trail that can be referenced if disputes arise.',
 },
 {
 title: 'Review and Update Regularly',
 content: 'Review your contract templates annually or after any problematic project. Learn from experience and add clauses to address issues you\'ve encountered. Consider having a lawyer review major updates.',
 },
 ],
 },
 redFlags: {
 title: 'Contract Red Flags to Watch For',
 intro: 'Be cautious of clients who push back on these common-sense contract provisions:',
 flags: [
 {
 title: 'Refusing to Sign a Contract',
 content: '"Let\'s just start and see how it goes" or "We trust each other, we don\'t need a contract" are major red flags. Professional clients understand the value of contracts.',
 },
 {
 title: 'No Upfront Payment',
 content: 'Clients who won\'t provide any deposit often disappear or refuse final payment. If they can\'t commit money upfront, they\'re not committed to the project.',
 },
 {
 title: 'Unlimited Revisions',
 content: 'Clients demanding "unlimited revisions" will drain your time and profit. Always cap revisions or charge hourly for additional changes.',
 },
 {
 title: 'Payment After Project Success',
 content: '"We\'ll pay you once the campaign is successful" or "payment based on results" transfers business risk to you. Unless you\'re a partner with equity, you deserve payment for work completed.',
 },
 {
 title: 'Vague Scope Requirements',
 content: 'If a client can\'t clearly define what they want, you\'ll face endless revisions and scope creep. Don\'t proceed until the scope is crystal clear and documented.',
 },
 ],
 },
 digitalTools: {
 title: 'Best Digital Signature Tools for Freelancers',
 tools: [
 {
 name: 'DocuSign',
 description: 'Industry standard with legally binding signatures. Free plan includes 5 documents/month. Mobile app available.',
 bestFor: 'Best for: High-value contracts requiring maximum legal protection',
 },
 {
 name: 'HelloSign (Dropbox Sign)',
 description: 'Simple, user-friendly interface. 3 documents/month free. Integrates with Google Drive and Dropbox.',
 bestFor: 'Best for: Freelancers who want simple, fast signature collection',
 },
 {
 name: 'PandaDoc',
 description: 'Combines contracts, proposals, and quotes in one platform. Document analytics show when clients view contracts.',
 bestFor: 'Best for: Freelancers sending proposals and contracts together',
 },
 {
 name: 'Bonsai',
 description: 'All-in-one freelance platform with contracts, invoicing, time tracking, and client management. $24/month.',
 bestFor: 'Best for: Freelancers wanting integrated business management tools',
 },
 ],
 },
 lawyerSection: {
 title: 'When to Hire a Contract Lawyer',
 intro: 'Consider consulting with a lawyer in these situations:',
 situations: [
 'Creating your first contract template: A lawyer can ensure your base template is legally sound ($500-$1,500)',
 'High-value projects: Projects over $25,000 warrant legal review of the contract',
 'Complex IP arrangements: When licensing, joint ownership, or work-for-hire terms are involved',
 'International clients: Cross-border contracts may require consideration of multiple jurisdictions',
 'Client-provided contracts: Have a lawyer review any contract a client sends you before signing',
 'Dispute resolution: If a contract dispute arises, consult a lawyer immediately',
 ],
 conclusion: 'Investment in legal review often pays for itself by preventing costly disputes and protecting your interests in high-stakes situations.',
 },
 ctaBox2: {
 title: 'Manage Your Freelance Business Like a Pro',
 description: 'Contracts are just one piece of successful freelance business management. Learn how to juggle multiple clients, organize your workflow, and scale your business.',
 cta1: 'Client Management Guide',
 cta2: 'Invoicing Best Practices',
 },
 conclusion: {
 title: 'Protect Your Work, Build Your Business',
 paragraphs: [
 'Professional freelance contracts protect both you and your clients by establishing clear expectations, preventing misunderstandings, and providing legal recourse if problems arise. While it may seem like extra work upfront, a well-written contract saves time, money, and stress in the long run.',
 'Start with a solid template, customize it for each project, and always get it signed before beginning work. Your contracts reflect your professionalism and set the tone for successful client relationships.',
 'Remember: A contract isn\'t about distrust—it\'s about clarity, professionalism, and mutual protection. Clients who balk at signing contracts are waving red flags. Professional clients expect and appreciate clear contracts.',
 ],
 },
 relatedResources: {
 title: 'Related Resources',
 links: [
 { href: '/resources/freelance-invoicing-guide', label: 'Freelance Invoicing Guide' },
 { href: '/resources/freelance-tax-guide', label: 'Freelance Tax Guide' },
 { href: '/resources/freelance-business-insurance', label: 'Business Insurance Guide' },
 { href: '/tools', label: 'Free Business Tools' },
 ],
 },
 };

 const jsonLd = {
 '@context': 'https://schema.org',
 '@type': 'Article',
 headline: content.jsonLd.headline,
 description: content.jsonLd.description,
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
 datePublished: '2026-01-15',
 dateModified: '2026-01-15',
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
 <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-2xl mb-6">
 <Shield className="w-8 h-8 text-white" />
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

 {/* Why Contracts Matter */}
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
 {content.whySection.title}
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
 {content.whySection.cards.map((card, index) =>(
 <div
 key={index}
 className={`bg-gradient-to-br ${
 index === 0 ? 'from-accent/10 to-accent/5' :
 index === 1 ? 'from-primary/10 to-primary/5' :
 index === 2 ? 'from-secondary/10 to-secondary/5' :
 'from-accent/10 to-accent/5'
 } dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 border-2 ${
 index === 0 ? 'border-accent/20' :
 index === 1 ? 'border-primary/20' :
 index === 2 ? 'border-secondary/20' :
 'border-accent/20'
 } dark:border-gray-700`}
 >
 {index === 0 && <Shield className="w-10 h-10 text-accent mb-4" />}
 {index === 1 && <CheckCircle className="w-10 h-10 text-primary mb-4" />}
 {index === 2 && <FileText className="w-10 h-10 text-secondary mb-4" />}
 {index === 3 && <AlertTriangle className="w-10 h-10 text-yellow-600 mb-4" />}
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">
 {card.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300">
 {card.desc}
 </p>
 </div>
 ))}
 </div>

 {/* Essential Contract Elements */}
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
 {content.essentialElements.title}
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.essentialElements.intro}
 </p>

 <div className="space-y-8 mb-8">
 {content.essentialElements.elements.map((element, index) =>(
 <div key={index} className="border-l-4 border-primary bg-gray-50 dark:bg-gray-800 p-6 rounded-r-lg">
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
 <span className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-lg font-bold text-sm">{element.number}</span>
 {element.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 {element.intro}
 </p>

 {element.example && (
 <div className="bg-white dark:bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-700 dark:text-gray-300">
 <p className="mb-2"><strong>{element.example.provider}</strong></p>
 <p className="ml-4">{element.example.providerName}</p>
 <p className="ml-4">{element.example.providerAddress}</p>
 <p className="ml-4">{element.example.providerContact}</p>
 <p className="mt-4 mb-2"><strong>{element.example.client}</strong></p>
 <p className="ml-4">{element.example.clientName}</p>
 <p className="ml-4">{element.example.clientAddress}</p>
 <p className="ml-4">{element.example.clientContact}</p>
 <p className="ml-4">{element.example.clientEmail}</p>
 </div>
 )}

 {element.exampleTitle && (
 <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
 <p className="text-gray-700 dark:text-gray-300 mb-3"><strong>{element.exampleTitle}</strong></p>
 <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
 {element.list?.map((item, i) =>(
 <li key={i}>{item}</li>
 ))}
 </ul>
 </div>
 )}

 {element.timeline && (
 <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
 <div className="space-y-3">
 {element.timeline.map((item, i) =>(
 <div key={i} className="flex items-start gap-3">
 <div className="w-24 flex-shrink-0 font-semibold text-primary">{item.period}</div>
 <div className="text-gray-700 dark:text-gray-300">{item.task}</div>
 </div>
 ))}
 </div>
 <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 italic">
 {element.note}
 </p>
 </div>
 )}

 {element.structure && (
 <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
 <p className="text-gray-700 dark:text-gray-300 mb-3"><strong>{element.exampleTitle}</strong></p>
 <div className="space-y-2 mb-4">
 {element.structure.map((item, i) =>(
 <div key={i} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
 <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
 <span className={`font-semibold ${item.highlight ? 'text-primary' : 'text-gray-900 dark:text-white'}`}>
 {item.amount}
 </span>
 </div>
 ))}
 </div>
 <p className="text-sm text-gray-600 dark:text-gray-400 mb-2"><strong>{element.methods}</strong></p>
 <p className="text-sm text-gray-600 dark:text-gray-400"><strong>{element.lateFee}</strong></p>
 </div>
 )}

 {element.list && !element.exampleTitle && (
 <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
 <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
 {element.list.map((item, i) =>(
 <li key={i}>{item}</li>
 ))}
 </ul>
 </div>
 )}

 {element.clause && (
 <div className="bg-white dark:bg-gray-900 rounded-lg p-4">
 <p className="text-gray-700 dark:text-gray-300 mb-3 italic text-sm">
 {element.clause}
 </p>
 {element.list && (
 <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2 mb-3">
 {element.list.map((item, i) =>(
 <li key={i}>{item}</li>
 ))}
 </ul>
 )}
 {element.important && (
 <p className="text-sm text-gray-600 dark:text-gray-400">
 <strong>{element.important}</strong>
 </p>
 )}
 </div>
 )}
 </div>
 ))}
 </div>

 {/* CTA Box */}
 <div className="bg-gradient-to-br from-primary to-primary-dark dark:from-primary dark:to-primary-dark rounded-2xl p-8 my-12 text-center shadow-xl">
 <Download className="w-12 h-12 text-white mx-auto mb-4" />
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
 <FileText className="w-5 h-5" />
 {content.ctaBox1.cta}
 </Link>
 </div>

 {/* Contract Best Practices */}
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
 {content.bestPractices.title}
 </h2>

 <div className="space-y-6 mb-8">
 {content.bestPractices.practices.map((practice, index) =>(
 <div key={index} className="bg-gradient-to-r from-accent/10 to-transparent dark:from-gray-800 dark:to-transparent border-l-4 border-accent p-6 rounded-r-lg">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
 <CheckCircle className="w-6 h-6 text-accent" />
 {practice.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300">
 {practice.content}
 </p>
 </div>
 ))}
 </div>

 {/* Red Flags */}
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
 {content.redFlags.title}
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.redFlags.intro}
 </p>

 <div className="space-y-4 mb-8">
 {content.redFlags.flags.map((flag, index) =>(
 <div key={index} className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-6 rounded-r-lg">
 <h4 className="font-semibold text-red-900 dark:text-red-400 mb-2 flex items-center gap-2">
 <AlertTriangle className="w-5 h-5" />
 {flag.title}
 </h4>
 <p className="text-red-800 dark:text-red-300 text-sm">
 {flag.content}
 </p>
 </div>
 ))}
 </div>

 {/* Digital Signature Tools */}
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
 {content.digitalTools.title}
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
 {content.digitalTools.tools.map((tool, index) =>(
 <div key={index} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
 <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">{tool.name}</h4>
 <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
 {tool.description}
 </p>
 <p className="text-sm text-gray-600 dark:text-gray-400"><strong>{tool.bestFor}</strong></p>
 </div>
 ))}
 </div>

 {/* When to Hire a Lawyer */}
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
 {content.lawyerSection.title}
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.lawyerSection.intro}
 </p>
 <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
 {content.lawyerSection.situations.map((situation, index) =>(
 <li key={index}>{situation}</li>
 ))}
 </ul>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.lawyerSection.conclusion}
 </p>

 {/* Final CTA */}
 <div className="bg-gradient-to-br from-accent/10 to-primary/10 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 my-12 text-center border-2 border-accent/20 dark:border-gray-700">
 <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-3">
 {content.ctaBox2.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
 {content.ctaBox2.description}
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link
 href={`/${locale}/resources/managing-multiple-clients`}
 className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-heading font-semibold rounded-lg shadow-lg transition-all"
 >
 <CheckCircle className="w-5 h-5" />
 {content.ctaBox2.cta1}
 </Link>
 <Link
 href={`/${locale}/resources/freelance-invoicing-guide`}
 className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-heading font-semibold rounded-lg shadow border-2 border-gray-200 dark:border-gray-700 transition-all"
 >
 {content.ctaBox2.cta2}
 </Link>
 </div>
 </div>

 {/* Conclusion */}
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
 {content.conclusion.title}
 </h2>
 {content.conclusion.paragraphs.map((paragraph, index) =>(
 <p key={index} className="text-gray-700 dark:text-gray-300 mb-6">
 {paragraph}
 </p>
 ))}

 {/* Internal Links */}
 <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {content.relatedResources.title}
 </h3>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {content.relatedResources.links.map((link, index) =>(
 <Link
 key={index}
 href={`/${locale}${link.href}`}
 className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
 >
 {index === 0 && <FileText className="w-6 h-6 text-primary" />}
 {index === 1 && <CheckCircle className="w-6 h-6 text-primary" />}
 {index === 2 && <Shield className="w-6 h-6 text-primary" />}
 {index === 3 && <Download className="w-6 h-6 text-primary" />}
 <span className="font-semibold text-gray-900 dark:text-white">{link.label}</span>
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
