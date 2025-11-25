import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AdWidget } from '@/components/AdWidget';
import { MessageSquare, Users, Award, CheckCircle, ArrowRight, Zap, ThumbsUp, Clock, Heart, Star, Mail, Phone } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  if (locale === 'nl') {
    return {
      title: 'Freelance Platform Communicatie: Hoe Je Klanten Imponeert',
      description: 'Beheers freelance platform communicatie om klanten te imponeren en terugkerende opdrachten te winnen. Leer responsstrategieën, berichtsjablonen en communicatietactieken die klantretentie met 60% verhogen.',
      keywords: 'klant communicatie freelance, professioneel communiceren, klantcontact platform, freelance communicatie tips, klantretentie strategieën',
      openGraph: {
        title: 'Freelance Platform Communicatie: Hoe Je Klanten Imponeert',
        description: 'Verhoog klantretentie met 60% door bewezen communicatiestrategieën voor freelance platforms.',
        type: 'article',
      },
    };
  }

  return {
    title: 'Freelance Platform Communication: How to Impress Clients',
    description: 'Master freelance platform communication to impress clients and win repeat business. Learn response strategies, messaging templates, and communication tactics that boost client retention by 60%.',
    keywords: 'freelance communication tips, client communication, platform messaging, impress freelance clients, client retention strategies',
    openGraph: {
      title: 'Freelance Platform Communication: How to Impress Clients',
      description: 'Boost client retention by 60% with proven communication strategies for freelance platforms.',
      type: 'article',
    },
  };
}

export default async function FreelancePlatformCommunication({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const content = locale === 'nl' ? {
    hero: {
      h1: "Freelance Platform Communicatie: Hoe Je Klanten Imponeert",
      intro: "Technische vaardigheden zorgen dat je één keer wordt ingehuurd. Communicatievaardigheden zorgen dat je herhaaldelijk wordt ingehuurd. Beheers de kunst van platform communicatie met bewezen strategieën die klantretentie met 60% verhogen en consistente verwijzingen genereren.",
      cta1: "Lees Expert Gidsen",
      cta2: "Bekijk Platforms"
    },
    introduction: {
      title: "Waarom Communicatie Meer Bepaalt Voor Freelance Succes Dan Vaardigheden",
      p1: "De freelance marktplaats is paradoxaal: technische excellentie geeft je initiële kansen, maar communicatie excellentie bepaalt lang termijn succes. Studies van zes-cijfer verdienende freelancers onthullen dat 70% van hun inkomen komt van terugkerende klanten en verwijzingen—relaties volledig gebouwd op communicatie kwaliteit, niet alleen deliverable kwaliteit. Slechte communicators worstelen voor elk project; excellente communicators hebben klanten die smeken om opnieuw met hen te werken.",
      p2: "De kwaliteit van je platform communicatie beïnvloedt direct je verdienbaar vermogen. Klanten betalen premium rates voor freelancers die professioneel communiceren, responsief zijn en hun zorgen anticiperen. Deze uitgebreide gids onthult de exacte communicatie strategieën die top-verdienende freelancers gebruiken om klanten te imponeren, 5-sterren reviews te verdienen en hun inkomen te verdubbelen door terugkerende opdrachten.",
      stats: [
        { value: "60% Hogere Retentie", desc: "Terugkerende klant percentage boost" },
        { value: "5-Sterren Reviews", desc: "Door communicatie excellentie" },
        { value: "3x Meer Verwijzingen", desc: "Van tevreden klanten" }
      ]
    },
    principles: {
      title: "De 5 Communicatie Principes Die Vertrouwen Opbouwen",
      intro: "Excellente platform communicatie volgt bewezen principes die vertrouwen opbouwen, professionaliteit signaleren en klantrelaties versterken. Deze vijf fundamentele praktijken onderscheiden top-verdienende freelancers van de gemiddelde performer.",
      items: [
        {
          icon: "Clock",
          title: "Responssnelheid: De 2-Uur Regel Voor Kritieke Berichten",
          desc: "Snelle reacties signaleren professionaliteit, beschikbaarheid en klant prioritering. Probeer binnen 2 uur tijdens kantooruren te reageren op klant berichten, zelfs als het alleen is om ontvangst te bevestigen en een tijdlijn te geven voor gedetailleerde reactie. Deze enkele gewoonte kan klant tevredenheidsscores met 40% verhogen.",
          action: "Stel platform notificaties in op je telefoon. Voor urgente berichten, reageer onmiddellijk met: 'Bedankt voor je bericht. Ik bekijk dit grondig en kom met een gedetailleerd antwoord binnen [tijdframe].' Deze korte bevestiging voorkomt klant angst en demonstreert professionaliteit."
        },
        {
          icon: "MessageSquare",
          title: "Proactieve Updates: Rapporteer Vooruitgang Voor Klanten Vragen",
          desc: "Wacht nooit tot klanten om updates vragen—het signaleert slechte project management. Excellente communicators delen proactief mijlpalen, voortgang en potentiële problemen. Regelmatige updates verlagen klant angst met 65% en verhogen tevredenheidscores aanzienlijk.",
          action: "Creëer een update schema: dagelijkse updates voor kritieke projecten, wekelijkse updates voor standaard projecten, bi-wekelijkse updates voor lange termijn werk. Gebruik deze template: 'Snelle update: [voltooide taken], [lopende werk], [volgende stappen], [verwachte voltooiing datum]'."
        },
        {
          icon: "CheckCircle",
          title: "Professionele Toon: Balans Vriendelijkheid Met Competentie",
          desc: "Je communicatie toon beïnvloedt hoe klanten je expertise waarnemen. Te casual ondermijnt geloofwaardigheid; te formeel creëert afstand. De optimale toon combineert warme professionaliteit: vriendelijk maar competent, benaderbaar maar expert.",
          action: "Begin berichten met een persoonlijke touch ('Hoop dat je week goed begon'), ga over naar zakelijke content, en sluit af met positieve afsluiting. Gebruik klant namen, vermijd jargon tenzij ze het gebruiken, en behoud consistente formaliteit niveau door het project."
        },
        {
          icon: "ThumbsUp",
          title: "Verwachting Management: Onderschat en Overdeliver",
          desc: "Klant teleurstelling komt zelden van werkelijke prestatie—het komt van verwachtingen mismatch. Excellente communicators stellen realistische verwachtingen en overtreffen ze vervolgens consistent. Deze strategie verhoogt client tevredenheid met 55%, zelfs wanneer deliverables identiek zijn.",
          action: "Voeg buffer tijd toe aan alle schattingen (voeg 25-30% toe aan je realistische tijdlijn). Als een taak 4 dagen duurt, beloof 5-6 dagen. Lever op dag 4. Deze consistente vroege levering bouwt reputatie van betrouwbaarheid en overschrijdt verwachtingen."
        },
        {
          icon: "Heart",
          title: "Empathische Reacties: Behandel Klant Zorgen Met Begrip",
          desc: "Klanten onthouden niet je excuses—ze onthouden hoe je reageerde op problemen. Wanneer issues ontstaan, prioritiseer empathische communicatie voor defensieve verklaringen. Klanten die empathische probleem resolutie ervaren zijn 70% meer waarschijnlijk om positieve reviews te geven ondanks problemen.",
          action: "Gebruik deze formule voor probleem reacties: 1) Erken klant emotie ('Ik begrijp je frustratie'), 2) Neem verantwoordelijkheid ('Dit is mijn fout'), 3) Bied oplossing ('Hier is hoe ik het fix'), 4) Voorkom toekomst ('Ik heb deze stap toegevoegd om dit te voorkomen'). Vermijd nooit excuses voor je verklaringen."
        }
      ]
    },
    templates: {
      title: "Berichten Templates Die Professionele Indruk Maken",
      intro: "Gebruik deze bewezen templates om professioneel en responsief te communiceren in elke situatie:",
      items: [
        {
          title: "Eerste Klant Contact Template",
          content: "Hoi [Naam],\n\nBedankt voor het overwegen van mijn profiel voor je project. Ik heb je vereisten zorgvuldig doorgenomen en ben enthousiast om je te helpen [specifiek resultaat behalen].\n\nIk heb [X jaar] ervaring met [relevante vaardigheid] en heb vergelijkbare projecten voltooid die [meetbaar resultaat] bereikten. Ik begrijp dat je [specifieke uitdaging uit projectbeschrijving] wilt oplossen.\n\nIk zou graag meer willen bespreken over:\n- [Specifieke vraag 1]\n- [Specifieke vraag 2]\n- [Tijdlijn en deliverables]\n\nBen je beschikbaar voor een kort gesprek deze week?\n\nBeste groeten,\n[Je Naam]"
        },
        {
          title: "Project Voortgang Update Template",
          content: "Hoi [Naam],\n\nSnelle update over je project:\n\n✅ Voltooid:\n- [Taak 1]\n- [Taak 2]\n\n🔄 Lopend:\n- [Taak 3] (85% klaar)\n\n⏭️ Volgende:\n- [Taak 4] (start morgen)\n\nWe liggen op schema voor levering op [datum]. Laat me weten als je vragen hebt!\n\nGroeten,\n[Je Naam]"
        },
        {
          title: "Probleem/Vertraging Communicatie Template",
          content: "Hoi [Naam],\n\nIk wilde je onmiddellijk informeren over een situatie die je project beïnvloedt.\n\n[Helder beschrijf probleem zonder excuses]\n\nImpact: [Hoe dit de tijdlijn/deliverable beïnvloedt]\n\nMijn oplossing: [Concrete stappen die je neemt]\n\nReviseerde tijdlijn: [Nieuwe verwachte voltooiing]\n\nIk neem volledige verantwoordelijkheid en werk nu aan dit om dit zo snel mogelijk op te lossen. Laat me weten als je andere zorgen hebt.\n\nMijn excuses voor het ongemak,\n[Je Naam]"
        }
      ]
    },
    cta1: {
      title: "Vind Platforms Met Beste Communicatie Tools",
      desc: "Verschillende platforms bieden verschillende berichtfuncties, video call opties en samenwerkingstools. Vergelijk communicatie mogelijkheden over 500+ freelance marktplaatsen.",
      button: "Bekijk Top Platforms"
    },
    advanced: {
      title: "Geavanceerde Communicatie Tactieken Voor Premium Klanten",
      intro: "Zodra je de basis beheerst, implementeer deze geavanceerde strategieën om premium klanten te imponeren en long-term relaties op te bouwen:",
      items: [
        {
          title: "Video Updates Voor High-Value Projecten",
          desc: "Voor projecten boven €1,500, overweeg korte video updates (1-2 minuten) in plaats van tekst alleen. Video voegt persoonlijke touch toe, bouwt sterkere connectie en communiceert complexe informatie effectiever. Klanten die video updates ontvangen scoren projecten 45% hoger voor communicatie kwaliteit."
        },
        {
          title: "Screen Recordings Voor Concept Presentaties",
          desc: "Wanneer je designs, features of resultaten presenteert, gebruik tools zoals Loom om screen recordings met voice-over te creëren. Deze aanpak verkleint feedback cycli met 60% omdat klanten context sneller begrijpen dan tekst uitleg alleen."
        },
        {
          title: "Gestructureerde Wekelijkse Rapporten Voor Lange Projecten",
          desc: "Voor projecten langer dan een maand, creëer wekelijkse rapporten met vaste structuur: voltooide werk, komende prioriteiten, blokkeerders/problemen, tijdlijn update. Deze consistentie bouwt klant vertrouwen en vermindert management overhead."
        }
      ]
    },
    mistakes: {
      title: "Communicatie Fouten Die Klantrelaties Vernietigen",
      intro: "Vermijd deze kritieke communicatie fouten die zelfs bij uitstekend werk leiden tot negatieve reviews en verloren toekomstige kansen:",
      items: [
        "Radio silence: Meer dan 24 uur geen reactie op klant berichten zonder voorafgaande mededeling",
        "Vage antwoorden: Reageren zonder specifieke informatie of actiestappen",
        "Defensieve toon: Tegen klant feedback vechten in plaats van begrip tonen",
        "Over-beloven: Onrealistische deadlines of features toezeggen om werk te winnen",
        "Inconsistente communicatie: Frequente updates aan het begin, dan weken stilte",
        "Gebrek aan taalvaardigheid: Slordig geschreven berichten met talloze grammatica fouten",
        "Te casual: Slang, emojis of informele taal met nieuwe klanten gebruiken",
        "Te technisch: Jargon gebruiken dat klanten niet begrijpen zonder uitleg",
        "Late nacht berichten: Om 2 uur 's nachts berichten sturen signaleert slechte werk-leven balans"
      ]
    },
    cta2: {
      title: "Beheers Communicatie, Beheers Freelancing",
      desc: "Implementeer deze communicatie strategieën en zie klantrelaties transformeren. Bouw de reputatie die verwijzingen, terugkerende opdrachten en premium tarieven genereert door communicatie excellentie.",
      button1: "Lees Meer Expert Gidsen",
      button2: "Ontvang Wekelijkse Tips"
    },
    relatedTitle: "Gerelateerde Resources",
    relatedItems: [
      { title: "Optimaliseer Je Profiel", desc: "Verhoog zichtbaarheid met 300% met bewezen tactieken" },
      { title: "Schrijf Winnende Offertes", desc: "Templates die 40% meer klanten converteren" },
      { title: "Beheers Platform Algoritmes", desc: "Krijg meer uitnodigingen met slimme strategieën" }
    ]
  } : {
    hero: {
      h1: "Freelance Platform Communication: How to Impress Clients",
      intro: "Technical skills get you hired once. Communication skills get you hired repeatedly. Master the art of platform communication with proven strategies that boost client retention by 60% and generate consistent referrals.",
      cta1: "Read Expert Guides",
      cta2: "Browse Platforms"
    },
    introduction: {
      title: "Why Communication Determines Freelance Success More Than Skills",
      p1: "The freelance marketplace is paradoxical: technical excellence gets you initial opportunities, but communication excellence determines long-term success. Studies of six-figure freelancers reveal that 70% of their income comes from repeat clients and referrals—relationships built entirely on communication quality, not just deliverable quality. Poor communicators struggle for every project; excellent communicators have clients begging to work with them again.",
      p2: "The quality of your platform communication directly impacts your earning potential. Clients pay premium rates for freelancers who communicate professionally, respond promptly, and anticipate their concerns. This comprehensive guide reveals the exact communication strategies top-earning freelancers use to impress clients, earn 5-star reviews, and double their income through repeat business.",
      stats: [
        { value: "60% Higher Retention", desc: "Client repeat rate boost" },
        { value: "5-Star Reviews", desc: "Through communication excellence" },
        { value: "3x More Referrals", desc: "From satisfied clients" }
      ]
    },
    principles: {
      title: "The 5 Communication Principles That Build Trust",
      intro: "Excellent platform communication follows proven principles that build trust, signal professionalism, and strengthen client relationships. These five fundamental practices separate top-earning freelancers from average performers.",
      items: [
        {
          icon: "Clock",
          title: "Response Speed: The 2-Hour Rule for Critical Messages",
          desc: "Fast responses signal professionalism, availability, and client prioritization. Aim to respond to client messages within 2 hours during business hours, even if just to acknowledge receipt and provide a timeline for detailed response. This single habit can improve client satisfaction scores by 40%.",
          action: "Set up platform notifications on your phone. For urgent messages, respond immediately with: 'Thanks for reaching out. I'm reviewing this thoroughly and will get back to you with a detailed response within [timeframe].' This brief acknowledgment prevents client anxiety and demonstrates professionalism."
        },
        {
          icon: "MessageSquare",
          title: "Proactive Updates: Report Progress Before Clients Ask",
          desc: "Never wait for clients to ask for updates—it signals poor project management. Excellent communicators proactively share milestones, progress, and potential issues. Regular updates reduce client anxiety by 65% and significantly increase satisfaction scores.",
          action: "Create an update schedule: daily updates for critical projects, weekly updates for standard projects, bi-weekly updates for long-term work. Use this template: 'Quick update: [completed tasks], [current work], [next steps], [expected completion date]'."
        },
        {
          icon: "CheckCircle",
          title: "Professional Tone: Balance Friendliness With Competence",
          desc: "Your communication tone affects how clients perceive your expertise. Too casual undermines credibility; too formal creates distance. The optimal tone combines warm professionalism: friendly but competent, approachable but expert.",
          action: "Begin messages with personal touch ('Hope your week is going well'), transition to business content, and close with positive sign-off. Use client names, avoid jargon unless they use it, and maintain consistent formality level throughout the project."
        },
        {
          icon: "ThumbsUp",
          title: "Expectation Management: Underpromise and Overdeliver",
          desc: "Client disappointment rarely comes from actual performance—it comes from expectation mismatch. Excellent communicators set realistic expectations then consistently exceed them. This strategy increases client satisfaction by 55%, even when deliverables are identical.",
          action: "Add buffer time to all estimates (add 25-30% to your realistic timeline). If a task takes 4 days, promise 5-6 days. Deliver on day 4. This consistent early delivery builds reputation for reliability and exceeds expectations."
        },
        {
          icon: "Heart",
          title: "Empathetic Responses: Address Client Concerns With Understanding",
          desc: "Clients don't remember your excuses—they remember how you responded to problems. When issues arise, prioritize empathetic communication over defensive explanations. Clients who experience empathetic problem resolution are 70% more likely to leave positive reviews despite issues.",
          action: "Use this formula for problem responses: 1) Acknowledge client emotion ('I understand your frustration'), 2) Take responsibility ('This is my mistake'), 3) Offer solution ('Here's how I'll fix it'), 4) Prevent future ('I've added this step to prevent this'). Never lead with excuses before acknowledgment."
        }
      ]
    },
    templates: {
      title: "Message Templates That Make Professional Impression",
      intro: "Use these proven templates to communicate professionally and responsively in every situation:",
      items: [
        {
          title: "Initial Client Contact Template",
          content: "Hi [Name],\n\nThank you for considering my profile for your project. I've carefully reviewed your requirements and I'm excited to help you [achieve specific outcome].\n\nI have [X years] experience with [relevant skill] and have completed similar projects that achieved [measurable result]. I understand you're looking to [specific challenge from project description].\n\nI'd love to discuss more about:\n- [Specific question 1]\n- [Specific question 2]\n- [Timeline and deliverables]\n\nAre you available for a brief call this week?\n\nBest regards,\n[Your Name]"
        },
        {
          title: "Project Progress Update Template",
          content: "Hi [Name],\n\nQuick update on your project:\n\n✅ Completed:\n- [Task 1]\n- [Task 2]\n\n🔄 In Progress:\n- [Task 3] (85% complete)\n\n⏭️ Next:\n- [Task 4] (starting tomorrow)\n\nWe're on track for delivery on [date]. Let me know if you have any questions!\n\nCheers,\n[Your Name]"
        },
        {
          title: "Problem/Delay Communication Template",
          content: "Hi [Name],\n\nI wanted to inform you immediately about a situation affecting your project.\n\n[Clearly describe problem without excuses]\n\nImpact: [How this affects timeline/deliverable]\n\nMy solution: [Concrete steps you're taking]\n\nRevised timeline: [New expected completion]\n\nI take full responsibility and I'm working on this now to resolve it as quickly as possible. Please let me know if you have any concerns.\n\nApologies for the inconvenience,\n[Your Name]"
        }
      ]
    },
    cta1: {
      title: "Find Platforms With Best Communication Tools",
      desc: "Different platforms offer different messaging features, video call options, and collaboration tools. Compare communication capabilities across 500+ freelance marketplaces.",
      button: "Browse Top Platforms"
    },
    advanced: {
      title: "Advanced Communication Tactics For Premium Clients",
      intro: "Once you've mastered the basics, implement these advanced strategies to impress premium clients and build long-term relationships:",
      items: [
        {
          title: "Video Updates For High-Value Projects",
          desc: "For projects above $1,500, consider short video updates (1-2 minutes) instead of text-only. Video adds personal touch, builds stronger connection, and communicates complex information more effectively. Clients who receive video updates rate projects 45% higher for communication quality."
        },
        {
          title: "Screen Recordings For Concept Presentations",
          desc: "When presenting designs, features, or results, use tools like Loom to create screen recordings with voice-over. This approach reduces feedback cycles by 60% because clients understand context faster than text explanation alone."
        },
        {
          title: "Structured Weekly Reports For Long Projects",
          desc: "For projects longer than one month, create weekly reports with fixed structure: completed work, upcoming priorities, blockers/issues, timeline update. This consistency builds client confidence and reduces management overhead."
        }
      ]
    },
    mistakes: {
      title: "Communication Mistakes That Destroy Client Relationships",
      intro: "Avoid these critical communication errors that lead to negative reviews and lost future opportunities, even with excellent work:",
      items: [
        "Radio silence: More than 24 hours without responding to client messages without advance notice",
        "Vague answers: Responding without specific information or action steps",
        "Defensive tone: Fighting client feedback instead of showing understanding",
        "Over-promising: Committing to unrealistic deadlines or features to win work",
        "Inconsistent communication: Frequent updates at start, then weeks of silence",
        "Poor language skills: Sloppily written messages with numerous grammar errors",
        "Too casual: Using slang, emojis, or informal language with new clients",
        "Too technical: Using jargon clients don't understand without explanation",
        "Late night messages: Sending messages at 2 AM signals poor work-life balance"
      ]
    },
    cta2: {
      title: "Master Communication, Master Freelancing",
      desc: "Implement these communication strategies and watch client relationships transform. Build the reputation that generates referrals, repeat business, and premium rates through communication excellence.",
      button1: "Read More Expert Guides",
      button2: "Get Weekly Tips"
    },
    relatedTitle: "Related Resources",
    relatedItems: [
      { title: "Optimize Your Profile", desc: "Boost visibility by 300% with proven tactics" },
      { title: "Write Winning Proposals", desc: "Templates that convert 40% more clients" },
      { title: "Master Platform Algorithms", desc: "Get more invites with smart strategies" }
    ]
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] text-white py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {content.hero.h1}
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                {content.hero.intro}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={`/${locale}/blog`}
                  className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  {content.hero.cta1}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20"
                >
                  {content.hero.cta2}
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
            "headline": content.hero.h1,
            "description": content.hero.intro,
            "author": {
              "@type": "Organization",
              "name": "SkillLinkup"
            },
            "publisher": {
              "@type": "Organization",
              "name": "SkillLinkup"
            },
            "datePublished": "2025-01-15",
            "dateModified": "2025-01-15"
          })
        }} />

        {/* Main Content */}
        <article className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">

            {/* Introduction */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.introduction.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {content.introduction.p1}
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {content.introduction.p2}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border border-primary/20">
                  <Users className="w-10 h-10 text-primary mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.introduction.stats[0].value}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{content.introduction.stats[0].desc}</p>
                </div>
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20">
                  <Heart className="w-10 h-10 text-accent mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.introduction.stats[1].value}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{content.introduction.stats[1].desc}</p>
                </div>
                <div className="bg-gradient-to-br from-[#1e1541]/10 to-[#1e1541]/5 dark:from-[#1e1541]/30 dark:to-[#1e1541]/20 rounded-xl p-6 border border-[#1e1541]/20">
                  <ThumbsUp className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{content.introduction.stats[2].value}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{content.introduction.stats[2].desc}</p>
                </div>
              </div>
            </div>

            {/* Communication Principles */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.principles.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {content.principles.intro}
              </p>
              <div className="space-y-6">
                {content.principles.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      {item.icon === 'Clock' && <Clock className="w-6 h-6 text-primary" />}
                      {item.icon === 'MessageSquare' && <MessageSquare className="w-6 h-6 text-primary" />}
                      {item.icon === 'CheckCircle' && <CheckCircle className="w-6 h-6 text-primary" />}
                      {item.icon === 'ThumbsUp' && <ThumbsUp className="w-6 h-6 text-primary" />}
                      {item.icon === 'Heart' && <Heart className="w-6 h-6 text-primary" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                        {item.desc}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        <strong>{locale === 'nl' ? 'Actiestap:' : 'Action Step:'}</strong> {item.action}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Templates */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.templates.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {content.templates.intro}
              </p>
              <div className="space-y-6">
                {content.templates.items.map((template, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-xl p-6 border border-accent/20">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Mail className="w-6 h-6 text-accent" />
                      {template.title}
                    </h3>
                    <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
                      <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans">
                        {template.content}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section 1 */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl shadow-xl p-8 md:p-12 mb-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <MessageSquare className="w-16 h-16 text-white mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {content.cta1.title}
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  {content.cta1.desc}
                </p>
                <Link
                  href={`/${locale}/platforms`}
                  className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
                >
                  {content.cta1.button}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Advanced Communication Tactics */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.advanced.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {content.advanced.intro}
              </p>
              <div className="space-y-6">
                {content.advanced.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 dark:bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Communication Mistakes */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12 mb-12 border border-gray-200 dark:border-slate-700">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {content.mistakes.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {content.mistakes.intro}
              </p>
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-xl">
                <ul className="space-y-3">
                  {content.mistakes.items.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-red-600 dark:text-red-400 font-bold text-lg">✗</span>
                      <span className="text-gray-700 dark:text-gray-300">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <AdWidget placement="blog_sidebar" />

            {/* Final CTA */}
            <div className="bg-gradient-to-br from-primary via-primary-dark to-[#1e1541] rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
              <div className="max-w-3xl mx-auto">
                <Award className="w-16 h-16 text-white mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {content.cta2.title}
                </h2>
                <p className="text-xl text-white/90 mb-8">
                  {content.cta2.desc}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href={`/${locale}/blog`}
                    className="inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg"
                  >
                    {content.cta2.button1}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    href={`/${locale}/newsletter`}
                    className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-white/20"
                  >
                    {content.cta2.button2}
                    <Zap className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Related Resources */}
            <div className="mt-12 pt-12 border-t border-gray-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {content.relatedTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                  href={`/${locale}/resources/optimizing-freelance-profile-maximum-visibility`}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
                >
                  <Users className="w-10 h-10 text-primary mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {content.relatedItems[0].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.relatedItems[0].desc}
                  </p>
                </Link>
                <Link
                  href={`/${locale}/resources/how-to-write-proposals-that-win`}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
                >
                  <Award className="w-10 h-10 text-accent mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {content.relatedItems[1].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.relatedItems[1].desc}
                  </p>
                </Link>
                <Link
                  href={`/${locale}/resources/mastering-freelance-platform-algorithms`}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all group"
                >
                  <ThumbsUp className="w-10 h-10 text-[#1e1541] dark:text-white mb-3" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {content.relatedItems[2].title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {content.relatedItems[2].desc}
                  </p>
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
