# Verdienmodel per world — beslisdocument

Datum: 19 september 2026. Status: voorstel ter beslissing door de product owner. Er is nog niets gebouwd of ingeschakeld; betalingen blijven server-side geblokkeerd.

Dit document beschrijft wat de code nu al bevat, welke keuzes er per world liggen, wat elke keuze technisch en juridisch betekent, en in welke volgorde bouwen verstandig is. Het is geen juridisch, fiscaal of financieel advies. De punten onder "Eerst extern laten toetsen" horen bij een jurist of fiscalist.

## 1. Wat er al ligt (feiten uit de code)

**De blokkade.** `convex/lib/paymentPolicy.ts` gooit altijd een fout. Er is geen schakelaar per world en geen omgevingsvariabele; openzetten betekent die functie herschrijven. Er bestaat een tweede, losse vlag in `convex/marketplace/leadPricing.ts`.

**Online.** Het meeste is voorbereid, maar uitgeschakeld:
- Commissie op de verkoper, in drie treden: 15% onder €50, 12% tot en met €500, 10% daarboven. Geen kopersfee.
- Escrow-statussen, automatische vrijgave zeven dagen na oplevering, koppeling van Stripe-chargebacks aan geschillen, en idempotente vrijgave en terugbetaling.
- Stripe Connect Express-onboarding bestaat, maar staat in commentaar.
- Ontbreekt: het aanmaken van een betaalsessie (verwijderd), gedeeltelijke terugbetaling, grootboekregels voor uitbetaling en terugbetaling, btw en facturen.
- Het model is "separate charges and transfers": het geld staat tussentijds op het platformsaldo. Skilllinkup houdt dan geld van derden vast. Dat is precies de open juridische vraag.
- Cashback van 3, 5 of 7% voor klanten, betaald uit de commissie.

**Local.** Pay-per-lead is grotendeels af:
- Pakketten: 5 credits voor €25, 10 voor €45, 25 voor €99.
- Een lead kost 2, 3, 4 of 6 credits, verdubbeld bij exclusief claimen. Maximaal drie vakmensen per gedeelde lead.
- Tijdens de bèta is de prijs nul, maar de claim, het saldo en het grootboek draaien al.
- Geen Connect nodig: er wordt niets uitbetaald aan vakmensen. De klus zelf wordt buiten het platform betaald.
- Ontbreekt: de betaalroute voor credits moet opnieuw gebouwd worden.

**Jobs.** Er bestaat niets monetairs: geen prijs, geen uitgelichte vacature, geen werkgeversabonnement. De enige haak zijn de limieten, zoals tien uitnodigingen per dag.

**Overal.** Geen btw-logica, geen factuurnummering, geen veld voor btw-nummer of KvK. De factuurcode in de repo hoort bij de publieke factuurtool en maakt geen platformfacturen.

## 2. Bevindingen die je moet kennen vóór je kiest

1. **Knik in de tarieftabel.** Bij €500 is de fee €60 en houdt de freelancer €440 over. Bij €500,01 is de fee €50 en houdt hij €450,01 over. Bij €49,99 is de fee €7,50, bij €50 €6,00. Treden die op het hele bedrag werken, belonen prijzen net boven een grens. Een staffel waarbij elk deel van het bedrag zijn eigen percentage krijgt, heeft dat probleem niet.
2. **Dubbele bijschrijving van credits mogelijk.** De webhook voor credit-aankopen controleert niet of een Stripe-sessie al verwerkt is. Een herhaalde gebeurtenis zou dubbel bijschrijven, en fouten worden stil ingeslikt. Moet opgelost zijn vóór Local live gaat.
3. **Connect-callback zonder controle.** Het account-id komt uit de query-string en de callback controleert niet wie er is ingelogd. Elke klik op "verbind" maakt bovendien een nieuw Stripe-account.
4. **Bedragen als kommagetallen.** Orders rekenen in euro's met decimalen, de credits en rewards in centen. Voor betalingen hoort alles in hele centen.
5. **Verkeerde melding bij betaling.** Bij het verwerken van een betaling krijgt de klant de melding "Work submitted for review". Zit achter de blokkade, maar moet gecorrigeerd zijn vóór livegang.
6. **Budget als vrije tekst.** De leadprijs wordt afgeleid uit een tekstveld met een zoekopdracht op deelstrings. Dat is fragiel; een vaste keuzelijst is betrouwbaarder.

## 3. Opties per world

### Jobs
| Optie | Wat het is | Stripe | Werk | Kanttekening |
|---|---|---|---|---|
| A. Gratis blijven | Jobs als groeimotor | Geen | Geen | Geen inkomsten, wel aanbod voor de andere worlds |
| B. Betalen per vacature | Vast bedrag per plaatsing of per verlenging | Checkout, eenmalig | Klein | Drempel voor kleine werkgevers; werkt pas bij voldoende kandidaten |
| C. Werkgeversabonnement | Maandbedrag met limieten: actieve vacatures, uitnodigingen per dag, toegang tot kandidatenzoeker | Billing | Middel | Past op de bestaande limieten; vraagt een entitlement-laag |
| D. Hybride | Eén gratis vacature, daarna B of C | Checkout of Billing | Middel | Lage drempel, duidelijke upgrade |

Geen geldstroom tussen partijen, dus geen Connect, geen escrow en geen derdengelden.

### Local
| Optie | Wat het is | Stripe | Werk | Kanttekening |
|---|---|---|---|---|
| A. Pay-per-lead met credits | Bestaand ontwerp afmaken | Checkout, eenmalig | Klein | Grotendeels gebouwd; vakman betaalt ook voor leads die niets opleveren |
| B. Abonnement voor vakmensen | Maandbedrag met een aantal leads of onbeperkt in een regio | Billing | Middel | Voorspelbaar voor beide kanten; vraagt regiobeheer |
| C. Commissie op de klus | Percentage van de uitgevoerde klus | Connect | Groot | Klus wordt nu buiten het platform betaald; lastig af te dwingen |

### Online
| Optie | Wat het is | Stripe | Werk | Kanttekening |
|---|---|---|---|---|
| A. Commissie met beschermde betaling | Bestaand ontwerp: klant betaalt vooraf, vrijgave na goedkeuring | Connect, platform houdt geld vast | Groot | Sterkste propositie, zwaarste juridische last |
| B. Commissie met directe betaling | Klant betaalt de freelancer rechtstreeks, platform houdt alleen de fee in | Connect, direct of destination charges | Middel tot groot | Geen derdengelden op het platformsaldo; minder bescherming voor de klant |
| C. Abonnement voor freelancers | Maandbedrag voor zichtbaarheid of extra voorstellen, geen transactiefee | Billing | Middel | Geen geldstroom tussen partijen; inkomsten los van omzet |
| D. Gratis blijven tot er volume is | Eerst aanbod en vraag opbouwen | Geen | Geen | Uitstel van de moeilijkste beslissing |

## 4. Eerst extern laten toetsen

Deze punten bepalen welke Online-optie haalbaar is en horen niet bij een ontwikkelaar:
- Mag Skilllinkup geld van klanten vasthouden tot goedkeuring, en onder welke voorwaarden? Dit raakt aan regels voor betaaldiensten en derdengelden.
- Wie is de verkopende partij richting de klant, en wie factureert? Dit bepaalt de btw-behandeling, ook bij buitenlandse freelancers en zakelijke klanten.
- Regels voor terugbetaling, annulering, chargebacks en geschillen, en hoe die in de voorwaarden komen.
- Identiteitscontrole en uitbetaaltermijnen per land waar je freelancers toelaat.

De aangepaste Terms en Privacy uit blok 2 wachten nog op dezelfde review.

## 5. Volgorde die ik technisch verstandig vind

1. **Local, optie A.** Het minste werk, geen Connect, geen derdengelden. Eerst de dubbele bijschrijving en de budgetlijst oplossen.
2. **Jobs, optie D of C.** Nieuwe maar overzichtelijke bouw met Stripe Billing of Checkout.
3. **Online als laatste**, en pas na de juridische toets. Tot die tijd optie D.

Zo leer je met echte betalingen in de eenvoudigste world, terwijl de zwaarste beslissing niet onder tijdsdruk valt.

## 6. Wat in elk scenario eerst moet gebeuren

- De blokkade per world schakelbaar maken in plaats van één harde fout, met een test die bewijst dat een uitgeschakelde world geen betaling kan aanmaken.
- Alle bedragen naar hele centen.
- Webhook: elke gebeurtenis precies één keer verwerken, fouten niet inslikken, en de ontbrekende gebeurtenissen afhandelen (mislukte betaling, terugbetaling).
- Btw-gegevens en factuurnummering, zodra vaststaat wie factureert.
- De Stripe-koppeling in de ontwikkelomgeving herstellen; die maakte in de afgelopen sessies geen verbinding.
- De overige geminificeerde Convex-bestanden leesbaar maken die betalingen raken: `freelancers.ts`, `quotes.ts` en `leads.ts`. `orders.ts` en `disputes.ts` zijn klaar en vastgepind.

## 7. Beslissingen die ik van je nodig heb

1. Per world: welke optie, of "nog niet".
2. Akkoord op de volgorde Local, Jobs, Online, of een andere.
3. Wie doet de juridische en fiscale toets, en wanneer.
4. Voor Online: blijft de getrapte commissie, of wordt het een staffel zonder knik?
5. Blijft cashback voor klanten bestaan? Het gaat van de marge af en is nu nergens meer zichtbaar.
