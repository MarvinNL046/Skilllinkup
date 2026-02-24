import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AdWidget } from '@/components/AdWidget';
import { MessageCircle, Star, Zap, TrendingUp, CheckCircle, ArrowRight, Award, Clock, Users } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }>}): Promise<Metadata>{
 const { locale } = await params;
 const slug = 'freelance-communicatie';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/gids/best-practices/${slug}`;

 if (locale === 'nl') {
 return {
 title: 'Freelance Communicatie: Imponeer Klanten Met Communicatie [2026]',
 description: 'Meester professionele client communicatie. Leer response templates, expectation management en relatie-building tactieken die 60% repeat business genereren.',
 keywords: 'freelance communicatie, client communicatie, professionele email, klant relatie, repeat business',
 openGraph: {
 title: 'Freelance Communicatie: Imponeer Klanten Met Communicatie',
 description: 'Professionele communicatie tactieken die 60% repeat business genereren.',
 url: pageUrl, siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630 }],
 locale: 'nl_NL', type: 'article',
 },
 alternates: { canonical: pageUrl, languages: { 'nl': pageUrl } },
 robots: { index: true, follow: true },
 };
 }
 return {
 title: 'Freelance Communication: Impress Clients With Communication [2026]',
 description: 'Master professional client communication. Learn response templates, expectation management and relationship-building tactics that generate 60% repeat business.',
 alternates: { canonical: pageUrl },
 robots: { index: true, follow: true },
 };
}

export default async function FreelanceCommunicatie({ params }: { params: Promise<{ locale: string }>; }) {
 const { locale } = await params;

 const content = {
 hero: {
 title: "Freelance Communicatie: Imponeer Klanten Met Communicatie",
 subtitle: "Technische skills winnen je eerste project. Communicatie skills winnen repeat business. Leer de exacte frameworks, templates en tactieken die professionals gebruiken om klanten te imponeren, verwachtingen te managen en relaties op te bouwen die 60% repeat rate genereren.",
 cta1: "Vind Beste Platforms", cta2: "Meer Best Practices"
 },
 intro: {
 title: "Waarom Slechte Communicatie Goede Freelancers Ruïneert",
 text: "Je levert geweldig werk. Maar klanten blijven ontevreden, reviews zijn matig en repeat business gebeurt niet. Het probleem? Niet je skills—je communicatie. Klanten beoordelen je vanaf de eerste bericht tot de laatste deliverable. Elke interactie vormt hun perceptie van professionaliteit, betrouwbaarheid en waarde. Slechte communicatie creëert onzekerheid, frustratie en teleurstelling—zelfs wanneer het eindproduct excellent is. Uitstekende communicatie daarentegen bouwt vertrouwen, managet verwachtingen en creëert fans die terugkomen en je doorverwijzen. Deze gids revealeert de communication frameworks die top freelancers gebruiken."
 },
 section1: {
 title: "De 3 Fases Van Client Communicatie",
 intro: "Effectieve client communicatie evolveert door drie distincte fases: Pre-Project (eerste indruk), During-Project (expectation management), en Post-Project (relationship building). Elk fase vereist verschillende tactieken, tone en messaging.",
 phase1: {
 title: "Fase 1: Pre-Project Communicatie - Eerste Indruk Telt",
 text: "Je eerste berichten bepalen of een klant met je werkt. Professionaliteit, responsiveness en duidelijkheid in deze fase zijn kritisch voor het winnen van vertrouwen en het sluiten van deals.",
 response: "Response Time Standards:",
 list: [
 "Eerste contact (<2 uur): Toon dat je actief bent en geïnteresseerd. Zelfs 'Bedankt voor je bericht, ik bekijk het vandaag' werkt.",
 "Proposal vragen (<4 uur): Beantwoord vragen snel om momentum te behouden. Snelle response = professioneel.",
 "Contract negotiatie (<24 uur): Zet duidelijke verwachtingen en toon commitment.",
 "Weekend exceptions: Communiceer je availability upfront om verwachtingen te managen."
 ],
 template: "Pre-Project Email Template:",
 templateText: "Hi [Name], \n\nBedankt voor je interesse! Ik heb je project bekeken en het klinkt als een perfecte match voor mijn expertise in [skill]. \n\nVooraf enkele vragen om zeker te zijn dat we aligned zijn:\n1. [Specifieke vraag over scope]\n2. [Timeline vraag]\n3. [Budget/deliverable vraag]\n\nZodra ik je antwoorden heb, kan ik een gedetailleerd voorstel opstellen met timeline en pricing. Beschikbaar voor een korte call deze week?\n\nBest,\n[Your Name]"
 }
 },
 section2: {
 title: "Expectation Management: Voorkom Teleurstelling",
 intro: "De meeste client ontefredenheid komt niet van slecht werk—het komt van misaligned verwachtingen. Proactieve expectation management voorkomt misverstanden, scope creep en negatieve reviews.",
 management: {
 title: "1. Ondercommuniceer Niet, Overcommuniceer Strategic",
 text: "Klanten haten onzekerheid. Ze willen weten wat er gebeurt, wanneer het gebeurt en wat volgende stappen zijn. Strategische overcommunicatie elimineert onzekerheid en bouwt vertrouwen.",
 frequency: "Communicatie Frequency Framework:",
 list: [
 "Project start: Kickoff bericht met scope, timeline, milestones, communication plan",
 "Weekly updates: Status update elke vrijdag, ook als er weinig te melden is",
 "Milestone completion: Bericht bij elke major milestone completion",
 "Blockers immediate: Communiceer problemen/delays onmiddellijk, niet achteraf",
 "Scope changes: Document alle scope changes in writing met impact op timeline/budget"
 ],
 updateTemplate: "Weekly Update Template:",
 updateText: "Hi [Name], \n\nWeek [X] Update:\n\n✅ Completed:\n- [Achievement 1]\n- [Achievement 2]\n\n In Progress:\n- [Task 1 - 60% done]\n- [Task 2 - starting this week]\n\n Next Week:\n- [Planned task 1]\n- [Planned task 2]\n\n Blockers: [None / Issue description + how you're resolving]\n\nOn track voor [deadline]. Vragen? Laat weten!\n\nBest,\n[Your Name]"
 }
 },
 section3: {
 title: "Moeilijke Conversaties: Probleem Communicatie",
 intro: "Dingen gaan fout. Deadlines worden gemist, scopes veranderen, klanten zijn onredelijk. Hoe je moeilijke conversaties navigeert bepaalt of je de relatie behoudt of verliest. Eerlijke, proactieve communicatie tijdens crises is essentieel.",
 difficult: {
 title: "1. Deadline Delays: Bad News Early Is Better Than Late",
 text: "Als je een deadline gaat missen, communiceer dit zo vroeg mogelijk. Wachten tot de dag zelf ruïneert vertrouwen. Eerlijke, vroege communicatie met een plan toont professionaliteit.",
 delayTemplate: "Deadline Delay Template:",
 delayText: "Hi [Name], \n\nIk moet je een onverwachte update geven. Door [specifieke reden - client delays/technical issue/scope change], kunnen we de oorspronkelijke deadline van [date] helaas niet halen. \n\nIk wilde dit zo vroeg mogelijk communiceren zodat je kan plannen. \n\nNieuwe timeline:\n- [Milestone 1]: [New date]\n- [Final delivery]: [New date] (3 dagen later dan origineel)\n\nOm dit te compenseren:\n- [Extra deliverable / discount / priority support]\n\nKan ik iets doen om de impact te minimaliseren? Beschikbaar voor een call.\n\nSorry voor het ongemak,\n[Your Name]"
 }
 },
 cta1: {
 title: "Vind Platforms Met Uitstekende Communicatie Tools",
 text: "Verschillende platforms bieden verschillende messaging features, notification systems en client management tools. Vind het platform dat professionele communicatie ondersteunt en makkelijk maakt.",
 button: "Bekijk Platform Vergelijkingen"
 },
 cta2: {
 title: "Begin Vandaag Met Professionele Client Communicatie",
 text: "Transformeer je communicatie van reactief naar strategisch. Gebruik deze frameworks om verwachtingen te managen, vertrouwen op te bouwen en relaties te creëren die repeat business en referrals genereren.",
 button1: "Lees Meer Best Practices", button2: "Ontvang Wekelijkse Tips"
 },
 related: {
 title: "Gerelateerde Best Practices",
 profile: { title: "Profiel Optimaliseren", text: "Word gevonden door klanten" },
 proposals: { title: "Winnende Voorstellen", text: "Voorstellen die 40% meer converteren" },
 portfolio: { title: "Portfolio Dat Converteert", text: "Showcase werk dat verkoopt" }
 }
 };

 return (
 <>
 <Header />
 <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
 <section className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] text-white py-16 sm:py-20">
 <div className="container mx-auto px-4">
 <div className="max-w-4xl mx-auto text-center">
 <div className="flex items-center justify-center gap-3 mb-6">
 <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
 <MessageCircle className="w-7 h-7 text-white" />
 </div>
 </div>
 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">{content.hero.title}</h1>
 <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">{content.hero.subtitle}</p>
 <div className="flex flex-wrap items-center justify-center gap-4">
 <Link href={`/${locale}/platforms`} className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg">
 {content.hero.cta1} <ArrowRight className="w-5 h-5" />
 </Link>
 <Link href={`/${locale}/gids/best-practices`} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20">
 {content.hero.cta2} <Zap className="w-5 h-5" />
 </Link>
 </div>
 </div>
 </div>
 </section>

 <script type="application/ld+json" dangerouslySetInnerHTML={{
 __html: JSON.stringify({
 "@context": "https://schema.org", "@type": "HowTo",
 "name": content.hero.title, "description": content.hero.subtitle,
 "step": [
 { "@type": "HowToStep", "name": "Eerste Indruk", "text": "Reageer snel en professioneel in pre-project fase" },
 { "@type": "HowToStep", "name": "Manage Verwachtingen", "text": "Overcommuniceer strategisch met weekly updates" },
 { "@type": "HowToStep", "name": "Navigeer Moeilijke Gesprekken", "text": "Communiceer bad news vroeg met oplossingen" },
 { "@type": "HowToStep", "name": "Post-Project Follow-Up", "text": "Blijf in contact en vraag om referrals" },
 { "@type": "HowToStep", "name": "Bouw Lange-Termijn Relaties", "text": "Transformeer klanten naar advocates" }
 ]
 })
 }} />

 <article className="container mx-auto px-4 py-16">
 <div className="max-w-4xl mx-auto">
 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">{content.intro.title}</h2>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">{content.intro.text}</p>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
 <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border border-primary/20">
 <Clock className="w-10 h-10 text-primary mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">60% Repeat Rate</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">Met excellente communicatie</p>
 </div>
 <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20">
 <Star className="w-10 h-10 text-accent mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">4.9+ Avg Rating</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">Door expectation management</p>
 </div>
 <div className="bg-gradient-to-br from-[#1e1541]/10 to-[#1e1541]/5 dark:from-[#1e1541]/30 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
 <Users className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">40% Referrals</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">Van tevreden klanten</p>
 </div>
 </div>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">{content.section1.title}</h2>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">{content.section1.intro}</p>

 <div className="mb-10">
 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
 <MessageCircle className="w-7 h-7 text-primary" />
 {content.section1.phase1.title}
 </h3>
 <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{content.section1.phase1.text}</p>

 <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 rounded-xl p-6 mb-4 border border-primary/20">
 <h4 className="font-bold text-gray-900 dark:text-white mb-3">{content.section1.phase1.response}</h4>
 <ul className="space-y-2">
 {content.section1.phase1.list.map((item, index) =>(
 <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
 <span><strong className="text-gray-900 dark:text-white">{item.split(':')[0]}:</strong>{item.split(':').slice(1).join(':')}</span>
 </li>
 ))}
 </ul>
 </div>

 <div className="bg-accent/5 dark:bg-accent/10 rounded-xl p-6 border border-accent/20">
 <h4 className="font-bold text-gray-900 dark:text-white mb-3">{content.section1.phase1.template}</h4>
 <pre className="text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-4 rounded whitespace-pre-wrap font-sans">
 {content.section1.phase1.templateText}
 </pre>
 </div>
 </div>
 </div>

 <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
 <div className="max-w-3xl mx-auto text-center">
 <TrendingUp className="w-16 h-16 text-white mx-auto mb-6" />
 <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.cta1.title}</h2>
 <p className="text-xl text-white/90 mb-8">{content.cta1.text}</p>
 <Link href={`/${locale}/platforms`} className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg">
 {content.cta1.button} <ArrowRight className="w-5 h-5" />
 </Link>
 </div>
 </div>

 <AdWidget placement="blog_sidebar" />

 <div className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
 <div className="max-w-3xl mx-auto">
 <MessageCircle className="w-16 h-16 text-white mx-auto mb-6" />
 <h2 className="text-3xl md:text-4xl font-bold mb-4">{content.cta2.title}</h2>
 <p className="text-xl text-white/90 mb-8">{content.cta2.text}</p>
 <div className="flex flex-wrap items-center justify-center gap-4">
 <Link href={`/${locale}/gids/best-practices`} className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg">
 {content.cta2.button1} <ArrowRight className="w-5 h-5" />
 </Link>
 <Link href={`/${locale}/newsletter`} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20">
 {content.cta2.button2} <Zap className="w-5 h-5" />
 </Link>
 </div>
 </div>
 </div>

 <div className="mt-12 pt-12 border-t border-gray-200 dark:border-slate-700">
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{content.related.title}</h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <Link href={`/${locale}/gids/best-practices/profiel-optimaliseren`} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group">
 <Award className="w-10 h-10 text-primary mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{content.related.profile.title}</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">{content.related.profile.text}</p>
 </Link>
 <Link href={`/${locale}/gids/best-practices/winnende-voorstellen-schrijven`} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group">
 <Star className="w-10 h-10 text-accent mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{content.related.proposals.title}</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">{content.related.proposals.text}</p>
 </Link>
 <Link href={`/${locale}/gids/best-practices/portfolio-dat-converteert`} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group">
 <TrendingUp className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
 <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{content.related.portfolio.title}</h3>
 <p className="text-sm text-gray-600 dark:text-gray-300">{content.related.portfolio.text}</p>
 </Link>
 </div>
 </div>
 </div>
 </article>
 </main>
 <Footer />
 </>
 );
}
