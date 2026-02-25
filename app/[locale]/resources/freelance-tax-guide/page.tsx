import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, FileText, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';

type Props = {
 params: Promise<{
 locale: string;
 }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'freelance-tax-guide';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

 if (locale === 'nl') {
 return {
 title: 'Belastinggids voor Freelancers: BTW, Inkomstenbelasting & Voorlopige Aanslag',
 description: 'Complete belastinggids voor ZZP\'ers met uitleg over BTW-aangifte, inkomstenbelasting, aftrekposten en voorlopige aanslag. Bespaar belasting en blijf compliant.',
 keywords: 'belastingen freelancer, BTW aangifte ZZP, inkomstenbelasting zzp\'er, voorlopige aanslag, aftrekposten zzp, belastingaangifte zelfstandige',
 openGraph: {
 title: 'Belastinggids voor Freelancers: BTW, Inkomstenbelasting & Voorlopige Aanslag',
 description: 'Beheers je belastingen als ZZP\'er met onze complete gids. Leer over BTW-aangifte, aftrekposten en voorlopige aanslag.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Belastinggids voor Freelancers' }],
 locale: 'nl_NL',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Belastinggids voor Freelancers: BTW, Inkomstenbelasting & Voorlopige Aanslag',
 description: 'Beheers je belastingen als ZZP\'er met onze complete gids. Leer over BTW-aangifte, aftrekposten en voorlopige aanslag.',
 images: [`${siteUrl}/images/og/resources-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: { 'en': `${siteUrl}/en/resources/${slug}`, 'nl': `${siteUrl}/nl/resources/${slug}` },
 },
 robots: {
 index: true, follow: true,
 googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
 },
 };
 }

 return {
 title: 'Freelance Tax Guide: What You Need to Know (US & International)',
 description: 'Complete freelance tax guide covering deductions, quarterly payments, self-employment tax, and international considerations. Save money and stay compliant.',
 keywords: 'freelance taxes, self-employment tax, tax deductions, quarterly taxes, freelance accounting, 1099 taxes',
 openGraph: {
 title: 'Freelance Tax Guide: What You Need to Know (US & International)',
 description: 'Master freelance taxes with our complete guide. Learn about deductions, quarterly payments, and how to save money while staying compliant.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Freelance Tax Guide' }],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Freelance Tax Guide: What You Need to Know (US & International)',
 description: 'Master freelance taxes with our complete guide. Learn about deductions, quarterly payments, and how to save money while staying compliant.',
 images: [`${siteUrl}/images/og/resources-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: { 'en': `${siteUrl}/en/resources/${slug}`, 'nl': `${siteUrl}/nl/resources/${slug}` },
 },
 robots: {
 index: true, follow: true,
 googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
 },
 };
}

export default async function FreelanceTaxGuidePage({ params }: Props) {
 const { locale } = await params;

 const content = locale === 'nl' ? {
 // Hero Section
 hero: {
 title: 'Belastinggids voor Freelancers: Alles wat je moet weten',
 description: 'Navigeer door het Nederlandse belastingstelsel met vertrouwen. Leer over BTW-aangifte, inkomstenbelasting, aftrekposten en voorlopige aanslag om belasting te besparen en compliant te blijven.',
 cta1: 'Volg je Inkomen',
 cta2: 'Zakelijke Tools',
 },
 // Alert
 alert: {
 title: 'Belangrijke Disclaimer',
 text: 'Deze gids biedt algemene belastinginformatie voor educatieve doeleinden. Belastingwetten variëren per situatie. Raadpleeg altijd een erkend fiscalist of belastingadviseur voor persoonlijk advies.',
 },
 // Dutch Tax Basics
 dutchBasics: {
 title: 'Nederlandse Belastingen voor ZZP\'ers',
 subtitle1: 'BTW (Belasting over de Toegevoegde Waarde)',
 text1: 'Als ZZP\'er met een omzet boven €25.000 per jaar bent u BTW-plichtig. U rekent BTW aan klanten en draagt dit af aan de Belastingdienst via kwartaalaangiftes.',
 btw: {
 high: 'Algemeen tarief (21%): Meeste diensten en producten',
 low: 'Laag tarief (9%): Bepaalde diensten en voedingsmiddelen',
 zero: 'Nultarief (0%): Export buiten de EU',
 },
 example: {
 title: 'BTW Berekeningsvoorbeeld',
 revenue: 'Omzet exclusief BTW',
 btw: 'BTW 21%',
 total: 'Totaal te factureren',
 input: 'Betaalde BTW (inkopen)',
 pay: 'Af te dragen BTW aan Belastingdienst',
 },
 subtitle2: 'Inkomstenbelasting voor ZZP\'ers',
 text2: 'Als zelfstandige betaalt u inkomstenbelasting over uw winst (omzet minus aftrekbare kosten). Nederland hanteert een progressief systeem met belastingschijven:',
 brackets: {
 first: 'Schijf 1: Tot €75.624 - 36,97%',
 second: 'Schijf 2: Vanaf €75.624 - 49,50%',
 note: 'Tarieven 2024, inclusief premies volksverzekeringen',
 },
 subtitle3: 'Voorlopige Aanslag',
 text3: 'De Belastingdienst stuurt u een voorlopige aanslag voor inkomstenbelasting en premies volksverzekeringen. Dit is een schatting van uw verschuldigde belasting, te betalen in maandelijkse of kwartaaltermijnen.',
 provisional: {
 title: 'Voorlopige Aanslag Overzicht',
 estimate: 'Geschatte jaarwinst',
 deductions: 'Zelfstandigenaftrek',
 taxable: 'Belastbaar inkomen',
 tax: 'Inkomstenbelasting (36,97%)',
 monthly: 'Maandelijkse betaling',
 note: 'De definitieve aanslag volgt na uw jaarlijkse belastingaangifte. Verschil wordt verrekend.',
 },
 },
 // CTA 1
 cta1: {
 title: 'Volg Inkomen voor Nauwkeurige Belastingaangifte',
 text: 'Gebruik onze gratis factuurmaker om nauwkeurige inkomstenregistratie bij te houden. Georganiseerde administratie maakt belastingaangifte aanzienlijk makkelijker.',
 button: 'Maak Professionele Facturen',
 },
 // Deductions
 deductions: {
 title: 'Belangrijkste Aftrekposten voor ZZP\'ers',
 intro: 'Zakelijke kosten verlagen uw belastbaar inkomen en kunnen u duizenden euro\'s besparen:',
 items: [
 {
 title: 'Zelfstandigenaftrek',
 text: 'Vaste aftrek voor ondernemers die voldoen aan het urencriterium (minimaal 1.225 uur per jaar aan uw onderneming werken).',
 details: [
 '2024: €3.750 aftrek per jaar',
 'Geldt automatisch bij voldoen aan urencriterium',
 'Wordt afgebouwd tot 2027 naar €900',
 ],
 },
 {
 title: 'Thuiswerkplek',
 text: 'Als u een ruimte in uw woning uitsluitend gebruikt voor uw bedrijf, kunt u gerelateerde kosten aftrekken:',
 details: [
 'Percentage van huur/hypotheek gebaseerd op m²',
 'Percentage van energie, water, gemeentelijke heffingen',
 'Volledige kosten van specifieke werkplek inrichting',
 ],
 note: 'Voorbeeld: 15 m² werkkamer in 100 m² woning = 15% van woonkosten aftrekbaar',
 },
 {
 title: 'Bedrijfsmiddelen & Software',
 text: 'Computers, monitors, softwareabonnementen, kantoormeubels en gereedschap exclusief voor zakelijk gebruik:',
 details: [
 'Adobe Creative Cloud, Microsoft 365 abonnementen',
 'Laptops, tablets, smartphones (zakelijk gebruikspercentage)',
 'Externe schijven, camera\'s, microfoons',
 'Bureau, bureaustoel, verlichting',
 ],
 },
 {
 title: 'Internet & Telefoon',
 text: 'Trek het zakelijke gebruikspercentage af van uw internet- en telefoonrekeningen. Bij 70% zakelijk gebruik trekt u 70% van de kosten af.',
 },
 {
 title: 'Zorgverzekering',
 text: 'Als ZZP\'er kunt u de inkomensafhankelijke bijdrage Zorgverzekeringswet (Zvw) aftrekken. Dit wordt automatisch berekend in uw belastingaanslag op basis van uw winst.',
 },
 {
 title: 'Pensioenopbouw',
 text: 'ZZP\'ers kunnen fiscaalvriendelijk pensioen opbouwen:',
 details: [
 'Lijfrentepremie: Aftrekbaar binnen jaarruimte (maximaal 9,44% van winst)',
 'Oudedagsreserve (FOR): Jaarlijks maximaal 9,44% van winst reserveren',
 'Fiscale oudedagsreserve opbouwen tot maximaal €182.192 (2024)',
 ],
 },
 {
 title: 'Zakelijke Reiskosten',
 text: 'Reizen voor zakelijke doeleinden zijn volledig aftrekbaar:',
 details: [
 'Auto: €0,23 per kilometer (2024) of werkelijke kosten',
 'Openbaar vervoer: Volledige ticketkosten',
 'Parkeerkosten en tolheffingen',
 'Lease of brandstof bij zakelijke kilometers',
 ],
 },
 {
 title: 'Opleiding & Vakbeurs',
 text: 'Cursussen, conferenties, vakliteratuur en trainingen die uw huidige vaardigheden verbeteren of professionele certificeringen onderhouden zijn volledig aftrekbaar.',
 },
 {
 title: 'Marketing & Reclame',
 text: 'Alle marketinguitgaven zijn aftrekbaar:',
 details: [
 'Websitehosting en domeinnamen',
 'Social media advertising (Facebook, LinkedIn, Google Ads)',
 'Visitekaartjes, promotiemateriaal',
 'E-mailmarketing software (Mailchimp, ConvertKit)',
 ],
 },
 {
 title: 'Uitbesteding & Freelancers Inhuren',
 text: 'Betalingen aan onderaannemers, virtual assistants of andere freelancers die u helpen zijn volledig aftrekbaar. Let op VAR-verklaring bij langdurige samenwerking.',
 },
 {
 title: 'Professionele Dienstverlening',
 text: 'Kosten voor accountants, advocaten, consultants en andere professionals voor zakelijke diensten zijn volledig aftrekbaar. Dit geldt ook voor belastingadviezen.',
 },
 ],
 },
 // Record Keeping
 recordKeeping: {
 title: 'Administratie Best Practices',
 intro: 'Nauwkeurige administratie is essentieel voor het maximaliseren van aftrekposten en overleven van een fiscale controle:',
 docs: {
 title: 'Essentiële Documentatie',
 items: [
 {
 title: 'Aparte Zakelijke Bankrekening',
 text: 'Houd zakelijke en privéfinanciën gescheiden. Dit vereenvoudigt de administratie en biedt duidelijke documentatie van zakelijke transacties.',
 },
 {
 title: 'Bewaar Alle Bonnen',
 text: 'Bewaar digitale kopieën van bonnen voor alle zakelijke uitgaven. Gebruik apps zoals Exact Online, Moneybird of Twinfield om bonnen direct te fotograferen en categoriseren.',
 },
 {
 title: 'Kilometeradministratie',
 text: 'Gebruik apps zoals MileageTracker of handmatige rittenadministratie voor zakelijke kilometers. Noteer datum, bestemming, doel en kilometers.',
 },
 {
 title: 'Bewaar Facturen',
 text: 'Bewaar kopieën van alle verzonden facturen en ontvangen betalingen. Deze documentatie bewijst uw inkomen en valideert uw zakelijke activiteiten.',
 },
 {
 title: 'Bewaartermijn',
 text: 'Bewaar belastingstukken minimaal 7 jaar (wettelijke termijn). Bewaar digitale back-ups in cloudopslag voor extra veiligheid.',
 },
 ],
 },
 },
 // International
 international: {
 title: 'Internationale Aspecten voor Nederlandse ZZP\'ers',
 subtitle1: 'Werken met Buitenlandse Opdrachtgevers',
 text1: 'Nederlandse ZZP\'ers die werken voor buitenlandse opdrachtgevers moeten al hun wereldwijde inkomen opgeven in hun Nederlandse belastingaangifte, ongeacht waar de klant gevestigd is.',
 subtitle2: 'BTW bij Internationale Diensten',
 text2: 'BTW-regels variëren afhankelijk van de locatie van uw klant:',
 vat: {
 title: 'BTW-regels per Situatie',
 eu: 'Zakelijke klant in EU: Verlegd BTW-regime (klant rekent BTW af in eigen land)',
 euPrivate: 'Particulier in EU: Nederlandse BTW 21% aanrekenen',
 outside: 'Klant buiten EU: Geen BTW aanrekenen (0-tarief)',
 note: 'Vanaf €10.000 omzet met EU-klanten: OSS-aangifte verplicht',
 },
 subtitle3: 'Belastingverdragen',
 text3: 'Nederland heeft belastingverdragen met 100+ landen om dubbele belasting te voorkomen. Deze verdragen zorgen ervoor dat u niet in twee landen over hetzelfde inkomen belasting betaalt. Raadpleeg een fiscalist bij twijfel.',
 },
 // CTA 2
 cta2: {
 title: 'Bescherm je Bedrijf met Goede Contracten',
 text: 'Solide contracten beschermen uw inkomen en vereenvoudigen belastingaangifte. Leer hoe u uitgebreide freelance contracten opstelt met betalingsvoorwaarden en belastingverantwoordelijkheden.',
 button1: 'Lees Contractgids',
 button2: 'Facturatie Best Practices',
 },
 // Software
 software: {
 title: 'Aanbevolen Boekhoud Software voor ZZP\'ers',
 items: [
 {
 title: 'Moneybird',
 text: 'Populairste Nederlandse boekhoudprogramma voor ZZP\'ers. Facturen, offertes, administratie en BTW-aangiftes. Direct koppeling met je bank.',
 features: [
 'Automatische boekingen',
 'BTW-aangifte koppeling',
 'Meertalige facturen',
 ],
 price: 'Vanaf €9/maand',
 },
 {
 title: 'Exact Online',
 text: 'Professionele boekhoudoplossing met uitgebreide functies voor groeiende bedrijven. Volledige integratie met banken en fiscale regelgeving.',
 features: [
 'Bankintegratie',
 'Uitgebreide rapportages',
 'Accountant toegang',
 ],
 price: 'Vanaf €32/maand',
 },
 {
 title: 'Twinfield',
 text: 'Cloudgebaseerde administratie software speciaal voor Nederlandse ondernemers. Compleet met factuurmodule en BTW-aangiftes.',
 features: [
 'Real-time administratie',
 'Automatische herkenning',
 'Fiscale updates',
 ],
 price: 'Vanaf €24/maand',
 },
 {
 title: 'InformerOnline',
 text: 'Gratis boekhoudprogramma voor startende ZZP\'ers met basis functionaliteit. Uitstekend voor kleine omzetten.',
 features: [
 'Gratis tot 25 facturen/jaar',
 'Basis administratie',
 'BTW-aangifte hulp',
 ],
 price: 'Gratis basisversie',
 },
 ],
 },
 // CPA
 cpa: {
 title: 'Wanneer een Belastingadviseur Inschakelen',
 intro: 'Overweeg een fiscalist of belastingadviseur als u:',
 reasons: [
 'Meer dan €75.000 per jaar verdient als ZZP\'er',
 'Complexe bedrijfsstructuren heeft (BV, holding)',
 'Regelmatig met internationale opdrachtgevers werkt',
 'Meerdere bedrijven of vastgoed bezit',
 'Te maken heeft met een belastingcontrole',
 'Strategische belastingplanning wilt om aanslag te minimaliseren',
 'Zich overweldigd voelt door belastingvereisten',
 ],
 text: 'Een goede fiscalist kost €500-€1.500 voor basisaangiftes, maar bespaart vaak meer dan hun kosten door strategische planning en maximale aftrekposten. Ze bieden ook gemoedsrust en controle-ondersteuning.',
 },
 // Conclusion
 conclusion: {
 title: 'Neem Controle over je Belastingen',
 text1: 'Belastingen als ZZP\'er hoeven niet overweldigend te zijn. Door het begrijpen van BTW, inkomstenbelasting, voorlopige aanslag, aftrekposten en het bijhouden van nauwkeurige administratie, kunt u uw belastingdruk minimaliseren en kostbare fouten voorkomen.',
 text2: 'Begin vanaf dag één met goede administratiegewoonten. Houd alle zakelijke uitgaven bij, bewaar alle bonnen en gebruik boekhoudsoftware om georganiseerd te blijven. Als belastingaangifte aankomt, heeft u alles binnen handbereik.',
 text3: 'Onthoud dat deze gids algemene informatie biedt. Belastingwetten veranderen regelmatig. Raadpleeg altijd een gekwalificeerde fiscalist voor persoonlijk advies op basis van uw specifieke situatie.',
 },
 // Related
 related: {
 title: 'Gerelateerde Bronnen',
 link1: 'Facturatie Gids voor Freelancers',
 link2: 'Meerdere Klanten Beheren',
 link3: 'Bedrijfsverzekering Gids',
 link4: 'Gratis Zakelijke Tools',
 },
 } : {
 // English content (original)
 hero: {
 title: 'Freelance Tax Guide: What You Need to Know',
 description: 'Navigate freelance taxes with confidence. Learn about deductions, quarterly payments, self-employment tax, and international considerations to save money and stay compliant.',
 cta1: 'Track Your Income',
 cta2: 'Business Tools',
 },
 alert: {
 title: 'Important Disclaimer',
 text: 'This guide provides general tax information for educational purposes. Tax laws vary by location and individual circumstances. Always consult with a qualified tax professional or CPA for personalized tax advice.',
 },
 dutchBasics: {
 title: 'US Freelance Tax Basics',
 subtitle1: 'Self-Employment Tax',
 text1: 'As a freelancer, you\'re subject to self-employment tax, which covers Social Security (12.4%) and Medicare (2.9%), totaling 15.3% of your net self-employment income. This is in addition to regular income tax.',
 example: {
 title: 'Tax Calculation Example',
 revenue: 'Gross freelance income',
 expenses: 'Business expenses',
 net: 'Net income',
 selfTax: 'Self-employment tax (15.3%)',
 incomeTax: 'Income tax (22% bracket example)',
 total: 'Total estimated tax',
 },
 subtitle2: 'Quarterly Estimated Tax Payments',
 text2: 'Unlike traditional employees with paycheck withholding, freelancers must make quarterly estimated tax payments to the IRS. These payments are due four times per year:',
 quarters: [
 { title: 'Q1 - April 15', period: 'January 1 - March 31 income' },
 { title: 'Q2 - June 15', period: 'April 1 - May 31 income' },
 { title: 'Q3 - September 15', period: 'June 1 - August 31 income' },
 { title: 'Q4 - January 15', period: 'September 1 - December 31 income' },
 ],
 text3: 'To calculate quarterly payments, estimate your annual income and divide your total tax liability by four. Use IRS Form 1040-ES to calculate and submit payments. Underpayment can result in penalties, typically 0.5% per month on the unpaid amount.',
 },
 cta1: {
 title: 'Track Income for Accurate Tax Calculations',
 text: 'Use our free invoice generator to maintain accurate income records throughout the year. Organized records make tax time significantly easier.',
 button: 'Create Professional Invoices',
 },
 deductions: {
 title: 'Essential Freelance Tax Deductions',
 intro: 'Business deductions reduce your taxable income, potentially saving you thousands in taxes. Here are the most valuable deductions for freelancers:',
 items: [
 {
 title: 'Home Office Deduction',
 text: 'If you use part of your home exclusively and regularly for business, you can deduct related expenses. Two methods:',
 details: [
 'Simplified method: $5 per square foot (up to 300 sq ft = $1,500 max)',
 'Actual expense method: Percentage of rent/mortgage, utilities, insurance, repairs',
 ],
 note: 'Example: 200 sq ft office in 2,000 sq ft home = 10% of housing expenses are deductible',
 },
 {
 title: 'Business Equipment & Software',
 text: 'Computers, monitors, software subscriptions, office furniture, and tools used exclusively for business:',
 details: [
 'Adobe Creative Cloud, Microsoft Office subscriptions',
 'Laptops, tablets, smartphones (business use percentage)',
 'External drives, cameras, microphones',
 'Office desk, chair, lighting',
 ],
 },
 {
 title: 'Internet & Phone',
 text: 'Deduct the business-use percentage of your internet and phone bills. If you use your phone 70% for business and 30% personal, deduct 70% of the cost.',
 },
 {
 title: 'Health Insurance Premiums',
 text: 'Self-employed individuals can deduct 100% of health insurance premiums for themselves, spouse, and dependents. This is an "above-the-line" deduction, reducing adjusted gross income.',
 },
 {
 title: 'Retirement Contributions',
 text: 'Freelancers can contribute to tax-advantaged retirement accounts:',
 details: [
 'SEP IRA: Up to 25% of net self-employment income (max $66,000 in 2024)',
 'Solo 401(k): Up to $23,000 employee + 25% employer (max $69,000 in 2024)',
 'Traditional IRA: Up to $7,000 ($8,000 if age 50+)',
 ],
 },
 {
 title: 'Business Travel & Meals',
 text: 'Travel for business purposes is fully deductible:',
 details: [
 'Transportation: Airfare, train, car rental, mileage (67 cents/mile in 2024)',
 'Lodging: Hotels, Airbnb during business trips',
 'Meals: 50% deductible for business meals, 100% for company events',
 ],
 },
 {
 title: 'Education & Professional Development',
 text: 'Online courses, conferences, books, and training materials that improve your current skills or help maintain professional certifications are fully deductible.',
 },
 {
 title: 'Marketing & Advertising',
 text: 'All marketing expenses are deductible:',
 details: [
 'Website hosting and domain names',
 'Social media advertising (Facebook, LinkedIn, Google Ads)',
 'Business cards, promotional materials',
 'Email marketing software (Mailchimp, ConvertKit)',
 ],
 },
 {
 title: 'Contract Labor & Outsourcing',
 text: 'Payments to contractors, virtual assistants, designers, or other freelancers who help with your business are fully deductible. Issue 1099-NEC forms if you pay contractors $600+ annually.',
 },
 {
 title: 'Professional Services',
 text: 'Fees paid to accountants, lawyers, consultants, and other professionals for business services are fully deductible. This includes tax preparation fees for your business tax returns.',
 },
 ],
 },
 recordKeeping: {
 title: 'Record Keeping Best Practices',
 intro: 'Accurate record-keeping is essential for maximizing deductions and surviving an IRS audit:',
 docs: {
 title: 'Essential Documentation',
 items: [
 {
 title: 'Separate Business Bank Account',
 text: 'Keep business and personal finances separate. This simplifies accounting and provides clear documentation of business transactions.',
 },
 {
 title: 'Save All Receipts',
 text: 'Keep digital copies of receipts for all business expenses. Use apps like Expensify, QuickBooks, or FreshBooks to photograph and categorize receipts immediately.',
 },
 {
 title: 'Track Mileage',
 text: 'Use apps like MileIQ or Everlance to automatically track business mileage. At 67 cents per mile (2024), mileage deductions add up quickly.',
 },
 {
 title: 'Maintain Invoice Records',
 text: 'Keep copies of all invoices sent and payments received. This documentation proves your income and validates your business activities.',
 },
 {
 title: 'Retention Period',
 text: 'Keep tax records for at least 3 years (IRS audit period), but 7 years is recommended for complete protection. Store backups in cloud storage.',
 },
 ],
 },
 },
 international: {
 title: 'International Freelance Tax Considerations',
 subtitle1: 'Working with International Clients (US Freelancers)',
 text1: 'US freelancers working with international clients must report all worldwide income on their US tax return, regardless of where the client is located or which currency was used for payment.',
 subtitle2: 'Foreign Earned Income Exclusion (FEIE)',
 text2: 'US citizens living and working abroad may qualify for the Foreign Earned Income Exclusion, allowing you to exclude up to $126,500 (2024) of foreign-earned income from US taxes. Requirements:',
 feie: [
 'Physical presence test: In foreign country 330 full days during 12-month period',
 'Bona fide residence test: Resident of foreign country for entire tax year',
 'File Form 2555 with your tax return',
 ],
 subtitle3: 'VAT/GST for International Work',
 text3: 'If you provide services to businesses in the European Union, you may need to register for VAT and charge it on your invoices. Each country has different thresholds and rules. Consult with an international tax advisor if you regularly work with EU clients.',
 subtitle4: 'Tax Treaties',
 text4: 'The US has tax treaties with over 60 countries to prevent double taxation. These treaties typically allow you to claim a foreign tax credit for taxes paid to foreign governments. Form 1116 is used to claim foreign tax credits on your US return.',
 },
 cta2: {
 title: 'Protect Your Business with Proper Contracts',
 text: 'Solid contracts protect your income and simplify tax reporting. Learn how to create comprehensive freelance contracts that cover payment terms and tax responsibilities.',
 button1: 'Read Contract Guide',
 button2: 'Invoicing Best Practices',
 },
 software: {
 title: 'Recommended Tax Software for Freelancers',
 items: [
 {
 title: 'QuickBooks Self-Employed',
 text: 'Designed specifically for freelancers. Tracks income/expenses, calculates quarterly taxes, and integrates with TurboTax.',
 features: [
 'Automatic expense categorization',
 'Mileage tracking',
 'Quarterly tax estimates',
 ],
 price: '$15/month',
 },
 {
 title: 'TurboTax Self-Employed',
 text: 'Comprehensive tax filing with Schedule C support, industry-specific deductions, and audit defense.',
 features: [
 'Form 1099 support',
 'Deduction finder',
 'Audit support included',
 ],
 price: '$119/year',
 },
 {
 title: 'FreshBooks',
 text: 'All-in-one solution combining invoicing, expense tracking, and accounting. Excellent for client management.',
 features: [
 'Professional invoicing',
 'Expense management',
 'Time tracking built-in',
 ],
 price: '$17-$30/month',
 },
 {
 title: 'Wave (Free)',
 text: 'Completely free accounting and invoicing software. Perfect for freelancers just starting out. Paid features for payroll and payments.',
 features: [
 'Unlimited invoicing',
 'Receipt scanning',
 'Financial reports',
 ],
 price: 'Free',
 },
 ],
 },
 cpa: {
 title: 'When to Hire a Tax Professional',
 intro: 'Consider hiring a CPA or tax professional if you:',
 reasons: [
 'Earn over $75,000 annually from freelancing',
 'Have complex business structures (LLC, S-Corp)',
 'Work with international clients regularly',
 'Own multiple businesses or rental properties',
 'Face an IRS audit or have outstanding tax issues',
 'Want strategic tax planning to minimize liability',
 'Feel overwhelmed by tax requirements and deadlines',
 ],
 text: 'A good CPA costs $200-$500 for basic returns, but often saves you more than their fee through strategic planning and maximum deductions. They also provide peace of mind and audit protection.',
 },
 conclusion: {
 title: 'Take Control of Your Freelance Taxes',
 text1: 'Freelance taxes don\'t have to be overwhelming. By understanding self-employment tax, making quarterly payments, maximizing deductions, and keeping accurate records, you can minimize your tax burden and avoid costly mistakes.',
 text2: 'Start with good record-keeping habits from day one. Track every business expense, save all receipts, and use accounting software to stay organized. When tax season arrives, you\'ll have everything you need at your fingertips.',
 text3: 'Remember, this guide provides general information. Tax laws change frequently and vary by location. Always consult with a qualified tax professional for personalized advice based on your specific situation.',
 },
 related: {
 title: 'Related Resources',
 link1: 'Freelance Invoicing Guide',
 link2: 'Managing Multiple Clients',
 link3: 'Business Insurance Guide',
 link4: 'Free Business Tools',
 },
 };

 const jsonLd = {
 '@context': 'https://schema.org',
 '@type': 'Article',
 headline: locale === 'nl'
 ? 'Belastinggids voor Freelancers: BTW, Inkomstenbelasting & Voorlopige Aanslag'
 : 'Freelance Tax Guide: What You Need to Know (US & International)',
 description: locale === 'nl'
 ? 'Complete belastinggids voor ZZP\'ers met uitleg over BTW-aangifte, inkomstenbelasting, aftrekposten en voorlopige aanslag.'
 : 'Comprehensive guide to freelance taxes including deductions, quarterly payments, and international considerations.',
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
 inLanguage: locale === 'nl' ? 'nl-NL' : 'en-US',
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />
 
 <main className="min-h-screen bg-white dark:bg-gray-900">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-primary/5 via-white to-accent/5 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 sm:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-2xl mb-6">
 <Calculator className="w-8 h-8 text-white" />
 </div>
 <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white mb-6">
 {content.hero.title}
 </h1>
 <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
 {content.hero.description}
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link
 href={`/${locale}/tools/invoice-generator`}
 className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-heading font-semibold rounded-lg shadow-lg transition-all hover:shadow-xl"
 >
 <Calculator className="w-5 h-5" />
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
 {locale === 'nl' ? (
 <>
 Belastingen voor freelancers en ZZP'ers kunnen overweldigend aanvoelen, vooral in het begin. Anders dan werknemers met automatische loonheffing, bent u als zelfstandige verantwoordelijk voor het berekenen, betalen en documenteren van uw eigen belastingen. Deze uitgebreide gids behandelt alles wat u moet weten over belastingen als ZZP'er in Nederland.
 </>
 ) : (
 <>
 Freelance taxes can feel overwhelming, especially when you're starting out. Unlike traditional employees with automatic tax withholding, freelancers are responsible for calculating, paying, and documenting their own taxes. This comprehensive guide covers everything you need to know about freelance taxes in the United States and international considerations.
 </>
 )}
 </p>
 </div>

 {/* Alert Box */}
 <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 p-6 rounded-r-lg mb-8">
 <div className="flex items-start gap-3">
 <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
 <div>
 <h4 className="font-semibold text-yellow-900 dark:text-yellow-400 mb-2">{content.alert.title}</h4>
 <p className="text-yellow-800 dark:text-yellow-300 text-sm">
 {content.alert.text}
 </p>
 </div>
 </div>
 </div>

 {locale === 'nl' ? (
 <>
 {/* Dutch Tax Basics */}
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
 {content.dutchBasics?.title}
 </h2>

 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
 {content.dutchBasics?.subtitle1}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.dutchBasics?.text1}
 </p>
 <div className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 mb-8">
 <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 BTW Tarieven
 </h4>
 <div className="space-y-3 text-gray-700 dark:text-gray-300">
 <div className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
 <span>{content.dutchBasics?.btw?.high}</span>
 </div>
 <div className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
 <span>{content.dutchBasics?.btw?.low}</span>
 </div>
 <div className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
 <span>{content.dutchBasics?.btw?.zero}</span>
 </div>
 </div>
 </div>

 <div className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 mb-8">
 <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {content.dutchBasics?.example?.title}
 </h4>
 <div className="space-y-3 text-gray-700 dark:text-gray-300">
 <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
 <span>{content.dutchBasics?.example?.revenue}</span>
 <span className="font-semibold">€5.000</span>
 </div>
 <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
 <span>{content.dutchBasics?.example?.btw}</span>
 <span className="font-semibold">€1.050</span>
 </div>
 <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
 <span className="font-semibold">{content.dutchBasics?.example?.total}</span>
 <span className="font-semibold text-primary">€6.050</span>
 </div>
 <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
 <span>{content.dutchBasics?.example?.input}</span>
 <span className="font-semibold">-€200</span>
 </div>
 <div className="flex justify-between items-center text-lg pt-2">
 <span className="font-bold">{content.dutchBasics?.example?.pay}</span>
 <span className="font-bold text-primary">€850</span>
 </div>
 </div>
 </div>

 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
 {content.dutchBasics?.subtitle2}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.dutchBasics?.text2}
 </p>
 <div className="bg-white dark:bg-gray-800 border-2 border-primary/20 dark:border-primary/30 rounded-xl p-6 mb-6">
 <div className="space-y-3 text-gray-700 dark:text-gray-300">
 <div className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
 <span>{content.dutchBasics?.brackets?.first}</span>
 </div>
 <div className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
 <span>{content.dutchBasics?.brackets?.second}</span>
 </div>
 <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
 {content.dutchBasics?.brackets?.note}
 </p>
 </div>
 </div>

 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
 {content.dutchBasics?.subtitle3}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.dutchBasics?.text3}
 </p>
 <div className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 mb-8">
 <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {content.dutchBasics?.provisional?.title}
 </h4>
 <div className="space-y-3 text-gray-700 dark:text-gray-300">
 <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
 <span>{content.dutchBasics?.provisional?.estimate}</span>
 <span className="font-semibold">€60.000</span>
 </div>
 <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
 <span>{content.dutchBasics?.provisional?.deductions}</span>
 <span className="font-semibold">-€3.750</span>
 </div>
 <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
 <span className="font-semibold">{content.dutchBasics?.provisional?.taxable}</span>
 <span className="font-semibold">€56.250</span>
 </div>
 <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
 <span>{content.dutchBasics?.provisional?.tax}</span>
 <span className="font-semibold text-primary">€20.796</span>
 </div>
 <div className="flex justify-between items-center text-lg pt-2">
 <span className="font-bold">{content.dutchBasics?.provisional?.monthly}</span>
 <span className="font-bold text-primary">€1.733</span>
 </div>
 <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
 {content.dutchBasics?.provisional?.note}
 </p>
 </div>
 </div>
 </>
 ) : (
 <>
 {/* US Tax Basics */}
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
 {content.dutchBasics?.title}
 </h2>

 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
 {content.dutchBasics?.subtitle1}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.dutchBasics?.text1}
 </p>
 <div className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 mb-8">
 <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {content.dutchBasics?.example?.title}
 </h4>
 <div className="space-y-3 text-gray-700 dark:text-gray-300">
 <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
 <span>{content.dutchBasics?.example?.revenue}</span>
 <span className="font-semibold">$75,000</span>
 </div>
 <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
 <span>{content.dutchBasics?.example?.expenses}</span>
 <span className="font-semibold">-$15,000</span>
 </div>
 <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
 <span className="font-semibold">{content.dutchBasics?.example?.net}</span>
 <span className="font-semibold">$60,000</span>
 </div>
 <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
 <span>{content.dutchBasics?.example?.selfTax}</span>
 <span className="font-semibold text-primary">$9,180</span>
 </div>
 <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
 <span>{content.dutchBasics?.example?.incomeTax}</span>
 <span className="font-semibold text-primary">$13,200</span>
 </div>
 <div className="flex justify-between items-center text-lg pt-2">
 <span className="font-bold">{content.dutchBasics?.example?.total}</span>
 <span className="font-bold text-primary">$22,380</span>
 </div>
 </div>
 </div>

 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
 {content.dutchBasics?.subtitle2}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.dutchBasics?.text2}
 </p>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
 {content.dutchBasics?.quarters?.map((q: any, i: number) =>(
 <div key={i} className="bg-white dark:bg-gray-800 border-2 border-primary/20 dark:border-primary/30 rounded-xl p-6">
 <h4 className="font-semibold text-primary mb-2">{q.title}</h4>
 <p className="text-sm text-gray-600 dark:text-gray-400">{q.period}</p>
 </div>
 ))}
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.dutchBasics?.text3}
 </p>
 </>
 )}

 {/* CTA Box 1 */}
 <div className="bg-gradient-to-br from-primary to-primary-dark dark:from-primary dark:to-primary-dark rounded-2xl p-8 my-12 text-center shadow-xl">
 <FileText className="w-12 h-12 text-white mx-auto mb-4" />
 <h3 className="text-2xl font-heading font-bold text-white mb-3">
 {content.cta1.title}
 </h3>
 <p className="text-white/90 mb-6 max-w-2xl mx-auto">
 {content.cta1.text}
 </p>
 <Link
 href={`/${locale}/tools/invoice-generator`}
 className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary hover:bg-gray-100 font-heading font-semibold rounded-lg shadow-lg transition-all"
 >
 <FileText className="w-5 h-5" />
 {content.cta1.button}
 </Link>
 </div>

 {/* Tax Deductions */}
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
 {content.deductions.title}
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.deductions.intro}
 </p>

 <div className="space-y-6 mb-8">
 {content.deductions?.items?.map((item: any, index: number) =>(
 <div key={index} className="bg-white dark:bg-gray-800 border-2 border-accent/20 dark:border-accent/30 rounded-xl p-6">
 <div className="flex items-start gap-4">
 <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
 <div>
 <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h4>
 <p className="text-gray-700 dark:text-gray-300 mb-3">
 {item.text}
 </p>
 {item.details && (
 <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
 {item.details.map((detail: string, i: number) =>(
 <li key={i}>{detail}</li>
 ))}
 </ul>
 )}
 {item.note && (
 <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
 {item.note}
 </p>
 )}
 </div>
 </div>
 </div>
 ))}
 </div>

 {/* Record Keeping */}
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
 {content.recordKeeping.title}
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.recordKeeping.intro}
 </p>

 <div className="bg-gradient-to-br from-accent/5 to-primary/5 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 mb-8">
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">
 {content.recordKeeping?.docs?.title}
 </h3>
 <div className="space-y-4">
 {content.recordKeeping?.docs?.items.map((item: any, index: number) =>(
 <div key={index} className="flex items-start gap-3">
 <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
 <span className="text-white font-bold">{index + 1}</span>
 </div>
 <div>
 <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h4>
 <p className="text-gray-700 dark:text-gray-300">
 {item.text}
 </p>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* International Considerations */}
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
 {content.international.title}
 </h2>

 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
 {content.international.subtitle1}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.international.text1}
 </p>

 {locale === 'nl' ? (
 <>
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
 {content.international.subtitle2}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.international.text2}
 </p>
 <div className="bg-gradient-to-br from-primary/5 to-accent/5 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 mb-8">
 <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {content.international?.vat?.title}
 </h4>
 <div className="space-y-3 text-gray-700 dark:text-gray-300">
 <div className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
 <span>{content.international?.vat?.eu}</span>
 </div>
 <div className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
 <span>{content.international?.vat?.euPrivate}</span>
 </div>
 <div className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
 <span>{content.international?.vat?.outside}</span>
 </div>
 <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
 {content.international?.vat?.note}
 </p>
 </div>
 </div>

 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
 {content.international.subtitle3}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.international.text3}
 </p>
 </>
 ) : (
 <>
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
 {content.international.subtitle2}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.international.text2}
 </p>
 <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
 {content.international.feie?.map((item: string, i: number) =>(
 <li key={i}>{item}</li>
 ))}
 </ul>

 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
 {content.international.subtitle3}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.international.text3}
 </p>

 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mt-8 mb-4">
 {content.international.subtitle4}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.international.text4}
 </p>
 </>
 )}

 {/* CTA Box 2 */}
 <div className="bg-gradient-to-br from-accent/10 to-primary/10 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 my-12 text-center border-2 border-accent/20 dark:border-gray-700">
 <DollarSign className="w-12 h-12 text-accent mx-auto mb-4" />
 <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-3">
 {content.cta2.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
 {content.cta2.text}
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link
 href={`/${locale}/resources/freelance-contracts-101`}
 className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-heading font-semibold rounded-lg shadow-lg transition-all"
 >
 <FileText className="w-5 h-5" />
 {content.cta2.button1}
 </Link>
 <Link
 href={`/${locale}/resources/freelance-invoicing-guide`}
 className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-heading font-semibold rounded-lg shadow border-2 border-gray-200 dark:border-gray-700 transition-all"
 >
 {content.cta2.button2}
 </Link>
 </div>
 </div>

 {/* Tax Software Recommendations */}
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
 {content.software.title}
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
 {content.software?.items?.map((item: any, index: number) =>(
 <div key={index} className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
 <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">{item.title}</h4>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 {item.text}
 </p>
 <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
 {item.features.map((feature: string, i: number) =>(
 <li key={i} className="flex items-center gap-2">
 <CheckCircle className="w-4 h-4 text-accent" />
 {feature}
 </li>
 ))}
 </ul>
 <p className="text-sm font-semibold text-primary">{item.price}</p>
 </div>
 ))}
 </div>

 {/* When to Hire a CPA */}
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
 {content.cpa.title}
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.cpa.intro}
 </p>
 <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
 {content.cpa?.reasons?.map((reason: string, index: number) =>(
 <li key={index}>{reason}</li>
 ))}
 </ul>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.cpa.text}
 </p>

 {/* Conclusion */}
 <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mt-12 mb-6">
 {content.conclusion.title}
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.conclusion.text1}
 </p>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.conclusion.text2}
 </p>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 {content.conclusion.text3}
 </p>

 {/* Internal Links */}
 <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
 <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">
 {content.related.title}
 </h3>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <Link
 href={`/${locale}/resources/freelance-invoicing-guide`}
 className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
 >
 <FileText className="w-6 h-6 text-primary" />
 <span className="font-semibold text-gray-900 dark:text-white">{content.related.link1}</span>
 </Link>
 <Link
 href={`/${locale}/resources/managing-multiple-clients`}
 className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
 >
 <CheckCircle className="w-6 h-6 text-primary" />
 <span className="font-semibold text-gray-900 dark:text-white">{content.related.link2}</span>
 </Link>
 <Link
 href={`/${locale}/resources/freelance-business-insurance`}
 className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
 >
 <AlertTriangle className="w-6 h-6 text-primary" />
 <span className="font-semibold text-gray-900 dark:text-white">{content.related.link3}</span>
 </Link>
 <Link
 href={`/${locale}/tools`}
 className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
 >
 <Calculator className="w-6 h-6 text-primary" />
 <span className="font-semibold text-gray-900 dark:text-white">{content.related.link4}</span>
 </Link>
 </div>
 </div>

 </article>
 </div>
 </div>
 </section>
 </main>
 
 </>
 );
}
