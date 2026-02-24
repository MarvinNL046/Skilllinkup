import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export async function generateMetadata({
 params,
}: {
 params: Promise<{ locale: string }>;
}): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'negotiate-higher-rates';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

 if (locale === "nl") {
 return {
 title: "Hoger Tarief Onderhandelen als Freelancer (2026 Gids)",
 description: "Meester tariefonderhandeling met bewezen scripts en tactieken. Leer wanneer en hoe je je freelance tarief verhoogt zonder klanten te verliezen. Inclusief kant-en-klare templates.",
 keywords: "hoger tarief onderhandelen, meer verdienen freelance, tarief verhogen ZZP, freelance tarief onderhandeling, uurtarief verhogen",
 openGraph: {
 title: "Hoger Tarief Onderhandelen als Freelancer (2026 Gids)",
 description: "Bewezen onderhandelingstactieken om je freelance tarief met 30-50% te verhogen zonder klanten te verliezen. Inclusief scripts en templates.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Hoger Tarief Onderhandelen als Freelancer' }],
 locale: 'nl_NL',
 type: "article",
 },
 twitter: {
 card: 'summary_large_image',
 title: "Hoger Tarief Onderhandelen als Freelancer (2026 Gids)",
 description: "Bewezen onderhandelingstactieken om je freelance tarief met 30-50% te verhogen zonder klanten te verliezen. Inclusief scripts en templates.",
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
 title: "How to Negotiate Higher Rates on Freelance Platforms (2026 Guide)",
 description: "Master rate negotiation with proven scripts and tactics. Learn when and how to raise your freelance rates without losing clients. Includes word-for-word templates.",
 keywords: "negotiate freelance rates, raise freelance rates, freelance rate negotiation, increase hourly rate, freelance pricing negotiation",
 openGraph: {
 title: "How to Negotiate Higher Rates on Freelance Platforms (2026 Guide)",
 description: "Proven negotiation tactics to raise your freelance rates by 30-50% without losing clients. Includes scripts and templates.",
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'How to Negotiate Higher Rates on Freelance Platforms' }],
 locale: 'en_US',
 type: "article",
 },
 twitter: {
 card: 'summary_large_image',
 title: "How to Negotiate Higher Rates on Freelance Platforms (2026 Guide)",
 description: "Proven negotiation tactics to raise your freelance rates by 30-50% without losing clients. Includes scripts and templates.",
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

export default async function NegotiateHigherRatesPage({
 params,
}: {
 params: Promise<{ locale: string }>;
}) {
 const { locale } = await params;

 const content = {
 nl: {
 badge: "Bewezen Onderhandelingstactieken",
 title: "Hoger Tarief Onderhandelen op Freelance Platforms",
 subtitle: "Stop met geld laten liggen. Gebruik deze bewezen onderhandelingsstrategieën om je tarief met 30-50% te verhogen zonder klanten te verliezen.",
 cta1: "Bereken Je Streeftarief",
 cta2: "Vergelijk Platforms",
 intro: "De angst om klanten te verliezen houdt talloze freelancers jarenlang vast aan hetzelfde tarief. Ondertussen verbeteren je vaardigheden, groeit je portfolio en neemt je waarde toe—maar je inkomen niet. Deze uitgebreide gids leert je precies wanneer en hoe je hogere tarieven onderhandelt, compleet met kant-en-klare scripts en bewezen tactieken die duizenden freelancers hebben geholpen hun inkomen te verhogen zonder klanten te verliezen.",
 psychologyTitle: "De Psychologie Achter Succesvolle Tariefonderhandelingen",
 fearsTitle: "Waarom De Meeste Freelancers Bang Zijn Om Tarieven Te Verhogen",
 fear1Title: "Angst #1",
 fear1Text: "Mijn klanten gaan naar iemand goedkopers",
 fear2Title: "Angst #2",
 fear2Text: "Ik ben niet goed genoeg om meer te vragen",
 fear3Title: "Angst #3",
 fear3Text: "De markt ondersteunt geen hogere tarieven",
 realityTitle: "De Realiteit: Wat Er Echt Gebeurt Als Je Je Tarief Verhoogt",
 stat1Percent: "85%",
 stat1Text: "van bestaande klanten accepteert tariefverhogingen",
 stat1Detail: "Vooral wanneer het goed gecommuniceerd wordt met kennisgeving en onderbouwing",
 stat2Percent: "15%",
 stat2Text: "van klanten weigert of onderhandelt",
 stat2Detail: "Vaak zijn dit de prijsgevoelige klanten die je groei tegenhouden",
 stat3Percent: "40%",
 stat3Text: "gemiddelde inkomstenstijging binnen 6 maanden",
 stat3Detail: "Zelfs rekening houdend met klantverlies stijgt het netto inkomen aanzienlijk",
 confidenceTitle: "De Vertrouwensvermenigvuldiger",
 confidenceText: "Klanten zien vertrouwen als competentie. Wanneer je zelfverzekerd hogere tarieven communiceert, gaan klanten ervan uit dat je het waard bent. Aarzeling en verontschuldigende taal ondermijnen je waargenomen waarde en verlagen acceptatiepercentages met 40%.",
 timingTitle: "Wanneer Je Tarief Verhogen: De Perfecte Timing",
 greenLightTitle: "Groene Lichten",
 greenLightSubtitle: "Verhoog je tarief wanneer je deze signalen ziet:",
 greenLight1: "Je bent consistent volledig geboekt (80%+ capaciteit)",
 greenLight2: "Je wijst werk af vanwege gebrek aan beschikbaarheid",
 greenLight3: "6+ maanden op huidig tarief zonder verhoging",
 greenLight4: "Aanzienlijke nieuwe vaardigheden of certificeringen verkregen",
 greenLight5: "Sterke portfolio met bewezen resultaten",
 greenLight6: "Uitstekende klantfeedback en testimonials",
 greenLight7: "Markttarieven zijn gestegen in je niche",
 redLightTitle: "Rode Lichten",
 redLightSubtitle: "Wacht met tarief verhogen als:",
 redLight1: "Je moeite hebt om klanten te vinden op huidige tarieven",
 redLight2: "Minder dan 3 maanden op huidig platform",
 redLight3: "Geen substantiële werkvoorbeelden of portfolio",
 redLight4: "Recente negatieve reviews of klantproblemen",
 redLight5: "Onder 50% bezettingsgraad",
 redLight6: "Economische neergang in je doelbranche",
 redLight7: "Je bent nog bezig je kernvaardigheden onder de knie te krijgen",
 annualReviewTitle: "De Jaarlijkse Tariefbeoordelingsstrategie",
 annualReviewText: "Top-verdienende freelancers verhogen jaarlijks hun tarief met 5-10%, ongeacht andere factoren. Dit houdt gelijke tred met inflatie en beloont ervaring. Markeer je 'tariefbeoordelingsdatum' elk jaar in je agenda.",
 annualReviewExample: "Voorbeeld: Beginnend op €50/uur met 8% jaarlijkse verhogingen: Jaar 1: €50 → Jaar 2: €54 → Jaar 3: €58 → Jaar 4: €63 → Jaar 5: €68. Dat is 36% inkomstenstijging over 5 jaar alleen door consistentie.",
 cta1Title: "Ken Je Waarde Voor Je Onderhandelt",
 cta1Text: "Bereken je ideale tarief op basis van kosten, marktonderzoek en ervaringsniveau",
 scriptsTitle: "Kant-en-Klare Onderhandelingsscripts Die Werken",
 script1Title: "Tariefverhoging voor Bestaande Langetermijnklant",
 script1Subject: "Onderwerp: Bijgewerkte Tarieven - Ingaande [Datum]",
 script1Content: `Hoi [Klantnaam],

Ik wilde persoonlijk laten weten dat ik mijn tarieven vanaf [Datum - 60 dagen vanaf nu] ga bijwerken.

In de afgelopen [tijdsperiode] van samenwerken heb ik [specifieke resultaten: X projecten, Y outcomes, Z waarde] geleverd. Ik heb ook aanzienlijk geïnvesteerd in [nieuwe vaardigheden/certificeringen/tools] waardoor ik nog betere resultaten voor je kan leveren.

Mijn nieuwe tarief wordt €[nieuw tarief]/uur, wat een verhoging van [X%] betekent. Dit brengt mijn tarief in lijn met marktnormen voor het gespecialiseerde werk dat ik lever.

Omdat ik onze samenwerking waardeer, geef ik je 60 dagen kennisgeving. Alles werk voltooid voor [datum] blijft op ons huidige tarief van €[huidig tarief]/uur.

Ik blijf toegewijd om het hoge kwaliteitswerk te leveren dat je van me gewend bent. Als je vragen hebt of dit wilt bespreken, bel ik graag even.

Ik kijk uit naar onze voortgezette samenwerking!`,
 script1WhyTitle: "Waarom Dit Werkt:",
 script1Why1: "✓ Geeft adequate kennisgeving (60 dagen)",
 script1Why2: "✓ Benadrukt geleverde waarde",
 script1Why3: "✓ Onderbouwt met markttarieven",
 script1Why4: "✓ Toont voortdurende investering",
 script1Why5: "✓ Behoudt positieve toon",
 script1ResponseTitle: "Verwachte Reactie:",
 script1Response: "85% acceptatiepercentage. Meeste klanten reageren positief en waarderen de kennisgevingsperiode. Bezwaren richten zich meestal op budgetbeperkingen, wat leidt tot Script #4.",
 script2Title: "Tarief Onderhandelen voor Nieuw Project",
 script2Content: `Hoi [Klantnaam],

Bedankt voor je bericht over [projectnaam]. Op basis van de scope en deliverables die je hebt geschetst, kan ik [specifieke outcomes] leveren binnen [tijdsbestek].

Mijn tarief voor dit type project is €[tarief]/uur (geschat [X] uren) of €[vast bedrag] als vast bedrag. Dit omvat [wat is inbegrepen: revisies, consultatie, deliverables, etc.].

Ik heb gewerkt aan [vergelijkbare projecten] voor [vergelijkbare klanten], resulterend in [specifieke resultaten]. Je kunt voorbeelden zien in mijn portfolio op [link].

Ik ben ervan overtuigd dat ik uitstekende resultaten voor je kan leveren. Wil je een kort gesprek plannen om de projectdetails te bespreken en te zorgen dat we op één lijn zitten met verwachtingen?

Vriendelijke groet,`,
 script2WhyTitle: "Waarom Dit Werkt:",
 script2Why1: "✓ Vermeldt tarief met vertrouwen",
 script2Why2: "✓ Biedt opties (uurloon/vast)",
 script2Why3: "✓ Toont relevante ervaring",
 script2Why4: "✓ Bevat social proof",
 script2Why5: "✓ Nodigt uit tot gesprek",
 script2TipTitle: "Pro Tip:",
 script2Tip: "Verontschuldig je nooit voor of onderbouw je tarief niet in het eerste voorstel. Vermeld het feitelijk alsof het niet onderhandelbaar is. Onderhandel alleen als de klant er expliciet om vraagt.",
 script3Title: "Reageren op 'Je Tarief is Te Hoog'",
 script3Content: `Hoi [Klantnaam],

Ik waardeer je eerlijkheid over je budgetzorgen. Laten we kijken of we een oplossing kunnen vinden die voor ons beiden werkt.

Mijn tarief weerspiegelt [specifieke waarde: jaren ervaring, gespecialiseerde vaardigheden, bewezen resultaten]. Dat gezegd hebbende, ik begrijp budgetbeperkingen.

Hier zijn een paar opties die we kunnen verkennen:

1. **Scope verkleinen:** We kunnen ons eerst richten op [prioriteit deliverables], wat de investering zou verlagen naar €[lager bedrag].
2. **Gefaseerde aanpak:** Het project opdelen in fases, zodat je resultaten kunt zien voordat je je verbindt aan het volledige project.
3. **Retainer-regeling:** Als je doorlopende behoeften hebt, biedt een maandelijkse retainer van €[bedrag] betere waarde dan per-project prijzen.

Wat ik niet kan doen is mijn uurtarief verlagen, aangezien het is vastgesteld op basis van de kwaliteit en expertise die ik breng. Ik ben echter flexibel met projectstructuur om bij je budget te passen.

Welke optie klinkt het meest interessant voor jou?

Groet,`,
 script3WhyTitle: "Waarom Dit Werkt:",
 script3Why1: "✓ Erkent zorgen zonder verontschuldigen",
 script3Why2: "✓ Versterkt waarde voor opties bieden",
 script3Why3: "✓ Biedt alternatieven voor tariefverlaging",
 script3Why4: "✓ Behoudt tariefintegriteit",
 script3Why5: "✓ Toont flexibiliteit op structuur, niet waarde",
 script3NeverTitle: "Zeg Nooit:",
 script3Never1: "✗ 'Ik kan mijn tarief verlagen naar €X'",
 script3Never2: "✗ 'Ik heb dit project echt nodig'",
 script3Never3: "✗ 'Sorry dat mijn tarieven hoog zijn'",
 script3Never4: "✗ 'Ik maak deze keer een uitzondering'",
 script4Title: "Klant Kan Tariefverhoging Niet Betalen (Grandfathering)",
 script4Content: `Hoi [Klantnaam],

Bedankt voor je transparantie over je budgetsituatie. Ik waardeer onze samenwerking en de resultaten die we samen hebben bereikt echt.

Dit is wat ik kan aanbieden: Ik zal je huidige tarief van €[huidig tarief] handhaven voor de komende [3-6 maanden], zodat je tijd hebt om je budget aan te passen. Na die periode zal mijn tarief stijgen naar €[nieuw tarief].

Als alternatief, als je je verbindt aan een [retainer/minimum uren per maand], kan ik een iets verlaagd tarief van €[compromis tarief] aanbieden, wat nog steeds waarde biedt voor ons beiden.

Ik wil graag met je blijven werken, en ik ben ervan overtuigd dat we een regeling kunnen vinden die werkt. Laat me weten welke optie je verkiest, of als je andere oplossingen wilt brainstormen.

Vriendelijke groet,`,
 script4NoteTitle: "Strategische Notitie:",
 script4Note: "Grandfathering werkt voor maximaal 1-2 hoogwaardige klanten. Als je te veel klanten grandfather, implementeer je nooit volledig je tariefverhoging. Stel een deadline in en houd je eraan.",
 tacticsTitle: "10 Geavanceerde Onderhandelingstactieken",
 tactic1Title: "Anchor Hoog",
 tactic1Text: "Begin onderhandelingen 15-20% boven je streeftarief. Dit geeft je onderhandelingsruimte terwijl je het gesprek op een hoger prijspunt ankert. Zelfs als je 'compromist', kom je uit op je gewenste tarief.",
 tactic2Title: "Waarde, Niet Kosten",
 tactic2Text: "Frame discussies rond ROI en geleverde waarde, niet gewerkte uren. '€5.000 voor een website die €50.000 aan verkopen genereert' verslaat '€75/uur voor 66 uren.'",
 tactic3Title: "De Kracht van Stilte",
 tactic3Text: "Stop met praten na het vermelden van je tarief. Weersta de drang om stilte te vullen met onderbouwingen of kortingen. Laat de klant eerst verwerken en reageren. Stilte creëert druk om te accepteren.",
 tactic4Title: "Strategische Schaarste",
 tactic4Text: "Vermeld beperkte beschikbaarheid: 'Ik heb capaciteit voor 1-2 nieuwe klanten dit kwartaal.' Schaarste verhoogt de waargenomen waarde en vermindert prijsgevoeligheid.",
 tactic5Title: "Bundelen & Upsellen",
 tactic5Text: "Wanneer klanten terugdeinzen voor de prijs, voeg waarde toe in plaats van kosten te verlagen. 'Voor dit budget kan ik [extra service] toevoegen' handhaaft je tarief terwijl de waargenomen waarde toeneemt.",
 tactic6Title: "De Terugtrekclose",
 tactic6Text: "Wanneer onderhandelingen vastlopen, trek je gracieus terug: 'Het klinkt alsof we misschien niet de juiste match zijn op dit moment. Ik hoop dat we in de toekomst kunnen samenwerken wanneer budgetten overeenkomen.' Triggert vaak hernieuwd engagement.",
 tactic7Title: "Social Proof Autoriteit",
 tactic7Text: "Verwijs naar andere klanten: 'Bedrijven zoals [Naam] investeren in dit expertiseniveau omdat [resultaat].' Toont marktvalidatie van je tarieven.",
 tactic8Title: "Risicoherziening",
 tactic8Text: "Verminder waargenomen risico: 'Als je niet tevreden bent met [deliverable] tegen [datum], pas ik het zonder extra kosten aan.' Maakt hogere tarieven veiliger.",
 tactic9Title: "Tijdelijke Aanbiedingen",
 tactic9Text: "Creëer urgentie voor huidige tarieven: 'Ik verhoog tarieven op [datum]. Vergrendel huidige prijzen door daarvoor te starten.' Motiveert snellere beslissingen.",
 tactic10Title: "De Vergelijkingsreframe",
 tactic10Text: "Zet kosten in perspectief: '€500/maand is minder dan één werknemerslunch per dag, maar het levert [massale waarde].' Maakt de investering kleiner voelen.",
 cta2Title: "Kies Het Juiste Platform Voor Je Tarieven",
 cta2Text: "Verschillende platforms hebben verschillende kostenstructuren en klantenbases. Vind de beste match voor je prijsstrategie.",
 relatedTitle: "Gerelateerde Prijsresources",
 related1Title: "Bereken Je Tarief",
 related1Text: "Bepaal je minimale winstgevende tarief voordat je onderhandelt",
 related1Link: "Lees Gids →",
 related2Title: "Prijsmodellen",
 related2Text: "Kies tussen uurloon, vast bedrag en waardegebaseerde prijzen",
 related2Link: "Lees Gids →",
 related3Title: "Platform Fee Impact",
 related3Text: "Begrijp hoe platformkosten je onderhandelde tarieven beïnvloeden",
 related3Link: "Lees Gids →",
 finalCtaTitle: "Volg Elk Factureerbaar Uur Om Hogere Tarieven Te Rechtvaardigen",
 finalCtaText: "Nauwkeurige tijdgegevens tonen precies waar je waarde creëert—krachtig bewijs tijdens tariefonderhandelingen",
 finalCtaButton: "Start Met Tijdregistratie",
 },
 en: {
 badge: "Proven Negotiation Tactics",
 title: "How to Negotiate Higher Rates on Freelance Platforms",
 subtitle: "Stop leaving money on the table. Use these proven negotiation strategies to increase your rates by 30-50% without losing clients.",
 cta1: "Calculate Your Target Rate",
 cta2: "Compare Platforms",
 intro: "The fear of losing clients keeps countless freelancers stuck at the same rates for years. Meanwhile, your skills improve, your portfolio grows, and your value increases—but your income doesn't. This comprehensive guide will teach you exactly when and how to negotiate higher rates, complete with word-for-word scripts and proven tactics that have helped thousands of freelancers increase their income without client churn.",
 psychologyTitle: "The Psychology Behind Successful Rate Negotiations",
 fearsTitle: "Why Most Freelancers Fear Raising Rates",
 fear1Title: "Fear #1",
 fear1Text: "My clients will leave me for someone cheaper",
 fear2Title: "Fear #2",
 fear2Text: "I'm not good enough to charge more",
 fear3Title: "Fear #3",
 fear3Text: "The market won't support higher rates",
 realityTitle: "The Reality: What Actually Happens When You Raise Rates",
 stat1Percent: "85%",
 stat1Text: "of existing clients accept rate increases",
 stat1Detail: "Especially when communicated properly with notice and justification",
 stat2Percent: "15%",
 stat2Text: "of clients decline or negotiate",
 stat2Detail: "Often these are the price-sensitive clients holding back your growth",
 stat3Percent: "40%",
 stat3Text: "average income increase within 6 months",
 stat3Detail: "Even accounting for client loss, net income rises significantly",
 confidenceTitle: "The Confidence Multiplier",
 confidenceText: "Clients perceive confidence as competence. When you confidently communicate higher rates, clients assume you're worth it. Hesitation and apologetic language undermine your perceived value and reduce acceptance rates by 40%.",
 timingTitle: "When to Raise Your Rates: The Perfect Timing",
 greenLightTitle: "Green Light Indicators",
 greenLightSubtitle: "Raise rates when you see these signals:",
 greenLight1: "You're consistently fully booked (80%+ capacity)",
 greenLight2: "Turning down work due to lack of availability",
 greenLight3: "6+ months at current rate without increase",
 greenLight4: "Gained significant new skills or certifications",
 greenLight5: "Strong portfolio with proven results",
 greenLight6: "Excellent client feedback and testimonials",
 greenLight7: "Market rates have increased in your niche",
 redLightTitle: "Red Light Indicators",
 redLightSubtitle: "Wait to raise rates if:",
 redLight1: "You're struggling to find clients at current rates",
 redLight2: "Less than 3 months on current platform",
 redLight3: "No substantial work examples or portfolio",
 redLight4: "Recent negative reviews or client issues",
 redLight5: "Below 50% utilization rate",
 redLight6: "Economic downturn in your target industry",
 redLight7: "You're still mastering your core skills",
 annualReviewTitle: "The Annual Rate Review Strategy",
 annualReviewText: "Top-earning freelancers raise rates annually by 5-10%, regardless of other factors. This keeps pace with inflation and rewards experience growth. Mark your calendar for your 'rate review date' each year.",
 annualReviewExample: "Example: Starting at $50/hour with 8% annual increases: Year 1: $50 → Year 2: $54 → Year 3: $58 → Year 4: $63 → Year 5: $68. That's a 36% income increase over 5 years through consistency alone.",
 cta1Title: "Know Your Worth Before Negotiating",
 cta1Text: "Calculate your ideal rate based on expenses, market research, and experience level",
 scriptsTitle: "Word-for-Word Negotiation Scripts That Work",
 script1Title: "Rate Increase for Existing Long-Term Client",
 script1Subject: "Subject: Updated Rates - Effective [Date]",
 script1Content: `Hi [Client Name],

I wanted to reach out personally to let you know that I'll be updating my rates effective [Date - 60 days from now].

Over the past [time period] of working together, I've delivered [specific results: X projects, Y outcomes, Z value]. I've also invested significantly in [new skills/certifications/tools] that allow me to deliver even better results for you.

My new rate will be $[new rate]/hour, which represents a [X%] increase. This brings my rate in line with market standards for the specialized work I provide.

Because I value our working relationship, I'm giving you 60 days' notice. All work completed before [date] will remain at our current rate of $[current rate]/hour.

I'm committed to continuing to deliver the high-quality work you've come to expect. If you have any questions or would like to discuss this, I'm happy to set up a quick call.

Looking forward to our continued partnership!`,
 script1WhyTitle: "Why This Works:",
 script1Why1: "✓ Gives adequate notice (60 days)",
 script1Why2: "✓ Highlights value delivered",
 script1Why3: "✓ Justifies with market rates",
 script1Why4: "✓ Shows continued investment",
 script1Why5: "✓ Maintains positive tone",
 script1ResponseTitle: "Expected Response:",
 script1Response: "85% acceptance rate. Most clients respond positively and appreciate the notice period. Objections typically center on budget constraints, which leads to Script #4.",
 script2Title: "Negotiating Rate for New Project",
 script2Content: `Hi [Client Name],

Thank you for reaching out about [project name]. Based on the scope and deliverables you've outlined, I can deliver [specific outcomes] within [timeframe].

My rate for this type of project is $[rate]/hour (estimated [X] hours) or $[fixed price] as a fixed-price deliverable. This includes [what's included: revisions, consultation, deliverables, etc.].

I've worked on [similar projects] for [similar clients], resulting in [specific results]. You can see examples in my portfolio at [link].

I'm confident I can deliver excellent results for you. Would you like to schedule a brief call to discuss the project details and ensure we're aligned on expectations?

Best regards,`,
 script2WhyTitle: "Why This Works:",
 script2Why1: "✓ States rate confidently",
 script2Why2: "✓ Provides options (hourly/fixed)",
 script2Why3: "✓ Demonstrates relevant experience",
 script2Why4: "✓ Includes social proof",
 script2Why5: "✓ Invites conversation",
 script2TipTitle: "Pro Tip:",
 script2Tip: "Never apologize for or justify your rate in the initial proposal. State it matter-of-factly as if it's non-negotiable. Only negotiate if the client explicitly asks.",
 script3Title: "Responding to 'Your Rate is Too High'",
 script3Content: `Hi [Client Name],

I appreciate you being upfront about your budget concerns. Let's see if we can find a solution that works for both of us.

My rate reflects [specific value: years of experience, specialized skills, proven results]. That said, I understand budget constraints.

Here are a few options we could explore:

1. **Reduce scope:** We could focus on [priority deliverables] first, which would bring the investment down to $[lower amount].
2. **Phased approach:** Break the project into stages, allowing you to see results before committing to the full project.
3. **Retainer arrangement:** If you have ongoing needs, a monthly retainer at $[amount] would provide better value than per-project pricing.

What I can't do is reduce my hourly rate, as it's set based on the quality and expertise I bring. However, I'm flexible on project structure to fit your budget.

Which option sounds most interesting to you?

Best,`,
 script3WhyTitle: "Why This Works:",
 script3Why1: "✓ Acknowledges concern without apologizing",
 script3Why2: "✓ Reinforces value before offering options",
 script3Why3: "✓ Provides alternatives to rate reduction",
 script3Why4: "✓ Maintains rate integrity",
 script3Why5: "✓ Shows flexibility on structure, not value",
 script3NeverTitle: "Never Say:",
 script3Never1: "✗ 'I can lower my rate to $X'",
 script3Never2: "✗ 'I really need this project'",
 script3Never3: "✗ 'I'm sorry my rates are high'",
 script3Never4: "✗ 'I'll make an exception this time'",
 script4Title: "Client Can't Afford Rate Increase (Grandfathering)",
 script4Content: `Hi [Client Name],

Thank you for being transparent about your budget situation. I really value our working relationship and the results we've achieved together.

Here's what I can offer: I'll maintain your current rate of $[current rate] for the next [3-6 months], giving you time to adjust your budget. After that period, my rate will increase to $[new rate].

Alternatively, if you commit to a [retainer/minimum hours per month], I can offer a slightly reduced rate of $[compromise rate], which still provides value for both of us.

I want to continue working with you, and I'm confident we can find an arrangement that works. Let me know which option you'd prefer, or if you'd like to brainstorm other solutions.

Best regards,`,
 script4NoteTitle: "Strategic Note:",
 script4Note: "Grandfathering works for 1-2 high-value clients maximum. If you grandfather too many clients, you'll never fully implement your rate increase. Set a deadline and stick to it.",
 tacticsTitle: "10 Advanced Negotiation Tactics",
 tactic1Title: "Anchor High",
 tactic1Text: "Start negotiations 15-20% above your target rate. This gives you negotiating room while anchoring the conversation at a higher price point. Even if you 'compromise,' you'll land at your desired rate.",
 tactic2Title: "Value, Not Cost",
 tactic2Text: "Frame discussions around ROI and value delivered, not hours worked. '$5,000 for a website that generates $50,000 in sales' beats '$75/hour for 66 hours.'",
 tactic3Title: "The Power of Silence",
 tactic3Text: "After stating your rate, stop talking. Resist the urge to fill silence with justifications or discounts. Let the client process and respond first. Silence creates pressure to accept.",
 tactic4Title: "Strategic Scarcity",
 tactic4Text: "Mention limited availability: 'I have capacity for 1-2 new clients this quarter.' Scarcity increases perceived value and reduces price sensitivity.",
 tactic5Title: "Bundle & Upsell",
 tactic5Text: "When clients balk at price, add value instead of reducing cost. 'For this budget, I can include [additional service]' maintains your rate while increasing perceived value.",
 tactic6Title: "The Takeaway Close",
 tactic6Text: "When negotiations stall, gracefully withdraw: 'It sounds like we might not be the right fit right now. I hope we can work together in the future when budgets align.' Often triggers re-engagement.",
 tactic7Title: "Social Proof Authority",
 tactic7Text: "Reference other clients: 'Companies like [Name] invest in this level of expertise because [result].' Demonstrates market validation of your rates.",
 tactic8Title: "Risk Reversal",
 tactic8Text: "Reduce perceived risk: 'If you're not satisfied with [deliverable] by [date], I'll revise it at no additional cost.' Makes higher rates feel safer.",
 tactic9Title: "Time-Limited Offers",
 tactic9Text: "Create urgency for current rates: 'I'm raising rates on [date]. Lock in current pricing by starting before then.' Motivates faster decisions.",
 tactic10Title: "The Comparison Reframe",
 tactic10Text: "Put costs in perspective: '$500/month is less than one employee lunch per day, but it delivers [massive value].' Makes the investment feel smaller.",
 cta2Title: "Choose the Right Platform for Your Rates",
 cta2Text: "Different platforms have different fee structures and client bases. Find the best fit for your pricing strategy.",
 relatedTitle: "Related Pricing Resources",
 related1Title: "Calculate Your Rate",
 related1Text: "Determine your minimum profitable rate before negotiating",
 related1Link: "Read Guide →",
 related2Title: "Pricing Models",
 related2Text: "Choose between hourly, fixed-price, and value-based pricing",
 related2Link: "Read Guide →",
 related3Title: "Platform Fee Impact",
 related3Text: "Understand how platform fees affect your negotiated rates",
 related3Link: "Read Guide →",
 finalCtaTitle: "Track Every Billable Hour to Justify Higher Rates",
 finalCtaText: "Accurate time data shows exactly where you create value—powerful evidence during rate negotiations",
 finalCtaButton: "Start Tracking Time",
 },
 };

 const t = content[locale as keyof typeof content] || content.en;

 const jsonLd = {
 "@context": "https://schema.org",
 "@type": "Article",
 "headline": locale === "nl"
 ? "Hoger Tarief Onderhandelen op Freelance Platforms"
 : "How to Negotiate Higher Rates on Freelance Platforms",
 "description": locale === "nl"
 ? "Volledige gids voor het onderhandelen van hogere freelance tarieven met bewezen scripts, timing strategieën en klantbehoudsttactieken."
 : "Complete guide to negotiating higher freelance rates with proven scripts, timing strategies, and client retention tactics.",
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
 "datePublished": "2026-01-15",
 "dateModified": "2026-01-15"
 };

 return (
 <>
 <script
 type="application/ld+json"
 dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
 />

 <Header />

 <main className="flex-1 bg-white dark:bg-gray-900">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-secondary via-secondary-medium to-secondary-light dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white py-16 md:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
 <div className="text-center">
 <div className="inline-block bg-primary/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
 <span className="text-primary font-semibold">{t.badge}</span>
 </div>
 <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
 {t.title}
 </h1>
 <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
 {t.subtitle}
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark px-8 py-4 text-lg font-heading font-semibold text-white transition-all shadow-xl hover:shadow-2xl"
 >
 {t.cta1}
 <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
 </svg>
 </Link>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 text-secondary px-8 py-4 text-lg font-heading font-semibold transition-all shadow-xl"
 >
 {t.cta2}
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Main Content */}
 <article className="py-16 md:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

 {/* Introduction */}
 <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
 <p className="text-xl text-text-secondary dark:text-gray-300 leading-relaxed">
 {t.intro}
 </p>
 </div>

 {/* Psychology of Rate Negotiation */}
 <section className="mb-16">
 <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
 {t.psychologyTitle}
 </h2>

 <div className="bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/20 dark:to-accent/10 rounded-lg p-8 mb-8 border-2 border-accent/30">
 <h3 className="font-heading text-2xl font-bold text-secondary dark:text-white mb-4">
 {t.fearsTitle}
 </h3>
 <div className="grid md:grid-cols-3 gap-6">
 <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
 <h4 className="font-semibold text-lg text-secondary dark:text-white mb-3">{t.fear1Title}</h4>
 <p className="text-text-secondary dark:text-gray-300 text-sm">
 {t.fear1Text}
 </p>
 </div>
 <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
 <h4 className="font-semibold text-lg text-secondary dark:text-white mb-3">{t.fear2Title}</h4>
 <p className="text-text-secondary dark:text-gray-300 text-sm">
 {t.fear2Text}
 </p>
 </div>
 <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
 <h4 className="font-semibold text-lg text-secondary dark:text-white mb-3">{t.fear3Title}</h4>
 <p className="text-text-secondary dark:text-gray-300 text-sm">
 {t.fear3Text}
 </p>
 </div>
 </div>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg mb-8">
 <h3 className="font-heading text-2xl font-bold text-secondary dark:text-white mb-4">
 {t.realityTitle}
 </h3>
 <div className="space-y-4">
 <div className="flex items-start">
 <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl mr-4 flex-shrink-0">
 {t.stat1Percent}
 </div>
 <div>
 <p className="font-semibold text-secondary dark:text-white mb-1">
 {t.stat1Text}
 </p>
 <p className="text-sm text-text-secondary dark:text-gray-300">
 {t.stat1Detail}
 </p>
 </div>
 </div>
 <div className="flex items-start">
 <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl mr-4 flex-shrink-0">
 {t.stat2Percent}
 </div>
 <div>
 <p className="font-semibold text-secondary dark:text-white mb-1">
 {t.stat2Text}
 </p>
 <p className="text-sm text-text-secondary dark:text-gray-300">
 {t.stat2Detail}
 </p>
 </div>
 </div>
 <div className="flex items-start">
 <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary dark:text-white font-bold text-xl mr-4 flex-shrink-0">
 {t.stat3Percent}
 </div>
 <div>
 <p className="font-semibold text-secondary dark:text-white mb-1">
 {t.stat3Text}
 </p>
 <p className="text-sm text-text-secondary dark:text-gray-300">
 {t.stat3Detail}
 </p>
 </div>
 </div>
 </div>
 </div>

 <div className="bg-primary/5 dark:bg-primary/10 border-l-4 border-primary rounded-lg p-6">
 <h4 className="font-heading text-lg font-bold text-secondary dark:text-white mb-3">
 {t.confidenceTitle}
 </h4>
 <p className="text-text-secondary dark:text-gray-300">
 {t.confidenceText}
 </p>
 </div>
 </section>

 {/* When to Raise Rates */}
 <section className="mb-16">
 <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
 {t.timingTitle}
 </h2>

 <div className="grid md:grid-cols-2 gap-6 mb-8">
 <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-accent">
 <h3 className="font-heading text-xl font-bold text-accent mb-4">
 {t.greenLightTitle}
 </h3>
 <p className="text-sm text-text-secondary dark:text-gray-300 mb-4">
 {t.greenLightSubtitle}
 </p>
 <ul className="space-y-3 text-text-secondary dark:text-gray-300">
 <li className="flex items-start">
 <svg className="w-5 h-5 text-accent mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 <span>{t.greenLight1}</span>
 </li>
 <li className="flex items-start">
 <svg className="w-5 h-5 text-accent mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 <span>{t.greenLight2}</span>
 </li>
 <li className="flex items-start">
 <svg className="w-5 h-5 text-accent mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 <span>{t.greenLight3}</span>
 </li>
 <li className="flex items-start">
 <svg className="w-5 h-5 text-accent mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 <span>{t.greenLight4}</span>
 </li>
 <li className="flex items-start">
 <svg className="w-5 h-5 text-accent mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 <span>{t.greenLight5}</span>
 </li>
 <li className="flex items-start">
 <svg className="w-5 h-5 text-accent mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 <span>{t.greenLight6}</span>
 </li>
 <li className="flex items-start">
 <svg className="w-5 h-5 text-accent mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
 </svg>
 <span>{t.greenLight7}</span>
 </li>
 </ul>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 border-primary">
 <h3 className="font-heading text-xl font-bold text-primary mb-4">
 {t.redLightTitle}
 </h3>
 <p className="text-sm text-text-secondary dark:text-gray-300 mb-4">
 {t.redLightSubtitle}
 </p>
 <ul className="space-y-3 text-text-secondary dark:text-gray-300">
 <li className="flex items-start">
 <svg className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
 </svg>
 <span>{t.redLight1}</span>
 </li>
 <li className="flex items-start">
 <svg className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
 </svg>
 <span>{t.redLight2}</span>
 </li>
 <li className="flex items-start">
 <svg className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
 </svg>
 <span>{t.redLight3}</span>
 </li>
 <li className="flex items-start">
 <svg className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
 </svg>
 <span>{t.redLight4}</span>
 </li>
 <li className="flex items-start">
 <svg className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
 </svg>
 <span>{t.redLight5}</span>
 </li>
 <li className="flex items-start">
 <svg className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
 </svg>
 <span>{t.redLight6}</span>
 </li>
 <li className="flex items-start">
 <svg className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
 </svg>
 <span>{t.redLight7}</span>
 </li>
 </ul>
 </div>
 </div>

 <div className="bg-accent/10 dark:bg-accent/20 rounded-lg p-6">
 <h4 className="font-heading text-lg font-bold text-secondary dark:text-white mb-3">
 {t.annualReviewTitle}
 </h4>
 <p className="text-text-secondary dark:text-gray-300 mb-4">
 {t.annualReviewText}
 </p>
 <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
 <p className="text-sm text-text-secondary dark:text-gray-300">
 <strong>{locale === "nl" ? "Voorbeeld:" : "Example:"}</strong>{t.annualReviewExample}
 </p>
 </div>
 </div>
 </section>

 {/* CTA 1 */}
 <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg p-8 md:p-12 text-center text-white mb-16 shadow-xl">
 <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
 {t.cta1Title}
 </h3>
 <p className="text-xl mb-6 opacity-90">
 {t.cta1Text}
 </p>
 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 text-secondary px-8 py-4 text-lg font-heading font-semibold transition-all shadow-lg"
 >
 {t.cta1}
 <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
 </svg>
 </Link>
 </div>

 {/* Negotiation Scripts */}
 <section className="mb-16">
 <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
 {t.scriptsTitle}
 </h2>

 <div className="space-y-8">
 {/* Script 1 */}
 <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
 <div className="flex items-center mb-6">
 <div className="bg-accent text-white rounded-lg px-4 py-2 font-heading font-bold mr-4">
 Script #1
 </div>
 <h3 className="font-heading text-xl font-bold text-secondary dark:text-white">
 {t.script1Title}
 </h3>
 </div>

 <div className="bg-accent/5 dark:bg-accent/10 rounded-lg p-6 mb-4">
 <p className="text-sm text-text-muted mb-3">{t.script1Subject}</p>
 <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary dark:text-gray-300 whitespace-pre-line">
 {t.script1Content}
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-4">
 <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
 <h4 className="font-semibold text-sm text-green-800 dark:text-green-300 mb-2">{t.script1WhyTitle}</h4>
 <ul className="text-xs text-green-700 dark:text-green-400 space-y-1">
 <li>{t.script1Why1}</li>
 <li>{t.script1Why2}</li>
 <li>{t.script1Why3}</li>
 <li>{t.script1Why4}</li>
 <li>{t.script1Why5}</li>
 </ul>
 </div>
 <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
 <h4 className="font-semibold text-sm text-blue-800 dark:text-blue-300 mb-2">{t.script1ResponseTitle}</h4>
 <p className="text-xs text-blue-700 dark:text-blue-400">
 {t.script1Response}
 </p>
 </div>
 </div>
 </div>

 {/* Script 2 */}
 <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
 <div className="flex items-center mb-6">
 <div className="bg-primary text-white rounded-lg px-4 py-2 font-heading font-bold mr-4">
 Script #2
 </div>
 <h3 className="font-heading text-xl font-bold text-secondary dark:text-white">
 {t.script2Title}
 </h3>
 </div>

 <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-6 mb-4">
 <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary dark:text-gray-300 whitespace-pre-line">
 {t.script2Content}
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-4">
 <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
 <h4 className="font-semibold text-sm text-green-800 dark:text-green-300 mb-2">{t.script2WhyTitle}</h4>
 <ul className="text-xs text-green-700 dark:text-green-400 space-y-1">
 <li>{t.script2Why1}</li>
 <li>{t.script2Why2}</li>
 <li>{t.script2Why3}</li>
 <li>{t.script2Why4}</li>
 <li>{t.script2Why5}</li>
 </ul>
 </div>
 <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
 <h4 className="font-semibold text-sm text-blue-800 dark:text-blue-300 mb-2">{t.script2TipTitle}</h4>
 <p className="text-xs text-blue-700 dark:text-blue-400">
 {t.script2Tip}
 </p>
 </div>
 </div>
 </div>

 {/* Script 3 */}
 <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
 <div className="flex items-center mb-6">
 <div className="bg-secondary text-white rounded-lg px-4 py-2 font-heading font-bold mr-4">
 Script #3
 </div>
 <h3 className="font-heading text-xl font-bold text-secondary dark:text-white">
 {t.script3Title}
 </h3>
 </div>

 <div className="bg-secondary/5 dark:bg-secondary/10 rounded-lg p-6 mb-4">
 <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary dark:text-gray-300 whitespace-pre-line">
 {t.script3Content}
 </div>
 </div>

 <div className="grid md:grid-cols-2 gap-4">
 <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
 <h4 className="font-semibold text-sm text-green-800 dark:text-green-300 mb-2">{t.script3WhyTitle}</h4>
 <ul className="text-xs text-green-700 dark:text-green-400 space-y-1">
 <li>{t.script3Why1}</li>
 <li>{t.script3Why2}</li>
 <li>{t.script3Why3}</li>
 <li>{t.script3Why4}</li>
 <li>{t.script3Why5}</li>
 </ul>
 </div>
 <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
 <h4 className="font-semibold text-sm text-red-800 dark:text-red-300 mb-2">{t.script3NeverTitle}</h4>
 <ul className="text-xs text-red-700 dark:text-red-400 space-y-1">
 <li>{t.script3Never1}</li>
 <li>{t.script3Never2}</li>
 <li>{t.script3Never3}</li>
 <li>{t.script3Never4}</li>
 </ul>
 </div>
 </div>
 </div>

 {/* Script 4 */}
 <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
 <div className="flex items-center mb-6">
 <div className="bg-accent text-white rounded-lg px-4 py-2 font-heading font-bold mr-4">
 Script #4
 </div>
 <h3 className="font-heading text-xl font-bold text-secondary dark:text-white">
 {t.script4Title}
 </h3>
 </div>

 <div className="bg-accent/5 dark:bg-accent/10 rounded-lg p-6 mb-4">
 <div className="prose prose-sm dark:prose-invert max-w-none text-text-secondary dark:text-gray-300 whitespace-pre-line">
 {t.script4Content}
 </div>
 </div>

 <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4">
 <h4 className="font-semibold text-sm text-secondary dark:text-white mb-2">{t.script4NoteTitle}</h4>
 <p className="text-xs text-text-secondary dark:text-gray-300">
 {t.script4Note}
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Negotiation Tactics */}
 <section className="mb-16">
 <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
 {t.tacticsTitle}
 </h2>

 <div className="grid md:grid-cols-2 gap-6">
 <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
 <div className="flex items-center mb-4">
 <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold mr-3">
 1
 </div>
 <h3 className="font-heading text-lg font-bold text-secondary dark:text-white">
 {t.tactic1Title}
 </h3>
 </div>
 <p className="text-sm text-text-secondary dark:text-gray-300">
 {t.tactic1Text}
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
 <div className="flex items-center mb-4">
 <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
 2
 </div>
 <h3 className="font-heading text-lg font-bold text-secondary dark:text-white">
 {t.tactic2Title}
 </h3>
 </div>
 <p className="text-sm text-text-secondary dark:text-gray-300">
 {t.tactic2Text}
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
 <div className="flex items-center mb-4">
 <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold mr-3">
 3
 </div>
 <h3 className="font-heading text-lg font-bold text-secondary dark:text-white">
 {t.tactic3Title}
 </h3>
 </div>
 <p className="text-sm text-text-secondary dark:text-gray-300">
 {t.tactic3Text}
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
 <div className="flex items-center mb-4">
 <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold mr-3">
 4
 </div>
 <h3 className="font-heading text-lg font-bold text-secondary dark:text-white">
 {t.tactic4Title}
 </h3>
 </div>
 <p className="text-sm text-text-secondary dark:text-gray-300">
 {t.tactic4Text}
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
 <div className="flex items-center mb-4">
 <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
 5
 </div>
 <h3 className="font-heading text-lg font-bold text-secondary dark:text-white">
 {t.tactic5Title}
 </h3>
 </div>
 <p className="text-sm text-text-secondary dark:text-gray-300">
 {t.tactic5Text}
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
 <div className="flex items-center mb-4">
 <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold mr-3">
 6
 </div>
 <h3 className="font-heading text-lg font-bold text-secondary dark:text-white">
 {t.tactic6Title}
 </h3>
 </div>
 <p className="text-sm text-text-secondary dark:text-gray-300">
 {t.tactic6Text}
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
 <div className="flex items-center mb-4">
 <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold mr-3">
 7
 </div>
 <h3 className="font-heading text-lg font-bold text-secondary dark:text-white">
 {t.tactic7Title}
 </h3>
 </div>
 <p className="text-sm text-text-secondary dark:text-gray-300">
 {t.tactic7Text}
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
 <div className="flex items-center mb-4">
 <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
 8
 </div>
 <h3 className="font-heading text-lg font-bold text-secondary dark:text-white">
 {t.tactic8Title}
 </h3>
 </div>
 <p className="text-sm text-text-secondary dark:text-gray-300">
 {t.tactic8Text}
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
 <div className="flex items-center mb-4">
 <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold mr-3">
 9
 </div>
 <h3 className="font-heading text-lg font-bold text-secondary dark:text-white">
 {t.tactic9Title}
 </h3>
 </div>
 <p className="text-sm text-text-secondary dark:text-gray-300">
 {t.tactic9Text}
 </p>
 </div>

 <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
 <div className="flex items-center mb-4">
 <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold mr-3">
 10
 </div>
 <h3 className="font-heading text-lg font-bold text-secondary dark:text-white">
 {t.tactic10Title}
 </h3>
 </div>
 <p className="text-sm text-text-secondary dark:text-gray-300">
 {t.tactic10Text}
 </p>
 </div>
 </div>
 </section>

 {/* CTA 2 */}
 <div className="bg-gradient-to-r from-accent to-accent-dark rounded-lg p-8 md:p-12 text-center text-white mb-16 shadow-xl">
 <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
 {t.cta2Title}
 </h3>
 <p className="text-xl mb-6 opacity-90">
 {t.cta2Text}
 </p>
 <Link
 href={`/${locale}/platforms`}
 className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 text-secondary px-8 py-4 text-lg font-heading font-semibold transition-all shadow-lg"
 >
 {t.cta2}
 <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
 </svg>
 </Link>
 </div>

 {/* Related Resources */}
 <section className="mb-16">
 <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-6">
 {t.relatedTitle}
 </h2>

 <div className="grid md:grid-cols-3 gap-6">
 <Link href={`/${locale}/resources/calculate-freelance-hourly-rate`} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
 <h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-3">
 {t.related1Title}
 </h3>
 <p className="text-text-secondary dark:text-gray-300 mb-4">
 {t.related1Text}
 </p>
 <span className="text-primary hover:underline font-semibold">
 {t.related1Link}
 </span>
 </Link>

 <Link href={`/${locale}/resources/freelance-pricing-strategies`} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
 <h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-3">
 {t.related2Title}
 </h3>
 <p className="text-text-secondary dark:text-gray-300 mb-4">
 {t.related2Text}
 </p>
 <span className="text-primary hover:underline font-semibold">
 {t.related2Link}
 </span>
 </Link>

 <Link href={`/${locale}/resources/platform-fees-maximize-earnings`} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
 <h3 className="font-heading text-xl font-bold text-secondary dark:text-white mb-3">
 {t.related3Title}
 </h3>
 <p className="text-text-secondary dark:text-gray-300 mb-4">
 {t.related3Text}
 </p>
 <span className="text-primary hover:underline font-semibold">
 {t.related3Link}
 </span>
 </Link>
 </div>
 </section>

 {/* Final CTA */}
 <div className="bg-gradient-to-br from-secondary via-secondary-medium to-secondary-light rounded-lg p-8 md:p-12 text-center text-white shadow-xl">
 <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
 {t.finalCtaTitle}
 </h3>
 <p className="text-xl mb-6 opacity-90">
 {t.finalCtaText}
 </p>
 <Link
 href={`/${locale}/tools/time-tracker`}
 className="inline-flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 text-secondary px-8 py-4 text-lg font-heading font-semibold transition-all shadow-lg"
 >
 {t.finalCtaButton}
 <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
 </svg>
 </Link>
 </div>

 </div>
 </article>
 </main>

 <Footer />
 </>
 );
}
