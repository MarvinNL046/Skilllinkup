# SkillLinkup — uitvoering SEO-herstel

Afgerond lokaal op 9 september 2026. Gebaseerd op de Search Console-audit van 8 september en de bevestigde redesign rond maart. Niet gepubliceerd; Search Console-indexering is niet gewijzigd.

## Resultaat

- 18 verdwenen redactionele pagina’s hersteld en 6 bestaande pagina’s bijgewerkt.
- De losse factuurtool werkt weer op /en/tools/invoice-generator. Het Nederlandse resource-overzicht is toegevoegd.
- Alle 10 in de audit aangetroffen 404-URL’s met historische klikken hebben nu een lokaal geteste werkende bestemming. Dit zegt niets over huidige productie-indexering of toekomstig verkeer.
- Nieuwe opmaak gebruikt dezelfde Inter, witte achtergrond, rustige kaders en bestaande header/footer. Op de tool staat factureren voorop; op de gidsen staat een passende wachtlijst-CTA.
- Geen productie- of Convex-data gewijzigd en geen echte inschrijvingen aangemaakt. De redactionele herstelinhoud staat in Git.

## URL-beleid

De bestaande permanente /en/resources/:slug → /resources/:slug-migratie blijft bestaan. Ook een verdwenen Engelse resource is dus via zijn historische URL weer bereikbaar, met één 308 naar de inhoudelijke canonical. De oude /en/guides/-paden voor platformkeuze en Fiverr geven direct 200. De drie Nederlandse herstelpagina’s houden hun exacte Nederlandse URL en taal.

Gerichte aliassen herstellen disclosure, privacy, twee schrijf-/profielvarianten en de historische Upwork/Fiverr-ingangen. De AI-tools-blogalias gaat nu naar een echte AI-workflowgids. Er is geen algemene redirect van onbekende pagina’s naar de homepage. Onbekende gidsen en resources geven aantoonbaar 404.

De www-host krijgt een 308 naar https://skilllinkup.com met pad en query intact. Getest met echte HTTP Host-headers: alleen www.skilllinkup.com redirect; hoofdhost, admin-subdomein, localhost en een afwijkende lookalike blijven ongemoeid. Een www-URL met daarnaast een oude padalias kan twee redirects hebben. De Vercel-domeinconfiguratie is niet aangepast.

## Inhoud, keywords en onderhoud

| Canonical pad | Taal | Zoekintentie / root keyword | Wijziging |
|---|---|---|---|
| /platforms/upwork | en | upwork review | Bestaande pagina inhoudelijk bijgewerkt |
| /resources/fiverr-vs-upwork | en | fiverr vs upwork | Bestaande pagina inhoudelijk bijgewerkt |
| /resources/toptal-for-beginners | en | toptal for beginners | Bestaande pagina inhoudelijk bijgewerkt |
| /resources/freelancer-vs-guru | en | freelancer vs guru | Bestaande pagina inhoudelijk bijgewerkt |
| /resources/99designs-pricing | en | 99designs pricing | Bestaande pagina inhoudelijk bijgewerkt |
| /resources/freelance-invoice-generator | en | freelance invoice generator | Verdwenen pagina hersteld |
| /resources/building-portfolio-that-converts | en | freelance portfolio | Verdwenen pagina hersteld |
| /resources/essential-freelance-tools | en | essential freelance tools | Verdwenen pagina hersteld |
| /resources/freelance-invoicing-guide | en | freelance invoicing guide | Verdwenen pagina hersteld |
| /resources/upwork-pricing | en | upwork pricing | Bestaande pagina inhoudelijk bijgewerkt |
| /en/guides/platform-selectie/beste-freelance-platform-kiezen | en | choose a freelance platform | Verdwenen pagina hersteld |
| /en/guides/platform-reviews/fiverr-pros-cons-deep-dive | en | Fiverr pros and cons | Verdwenen pagina hersteld |
| /resources/what-is-toptal | en | what is toptal | Verdwenen pagina hersteld |
| /resources/toptal-vs-upwork | en | toptal vs upwork | Verdwenen pagina hersteld |
| /resources/best-time-tracking-tools-freelancers | en | time tracking tools for freelancers | Verdwenen pagina hersteld |
| /resources/best-platform-designers | en | best freelance platforms for designers | Verdwenen pagina hersteld |
| /resources/best-platform-writers | en | best freelance platforms for writers | Verdwenen pagina hersteld |
| /resources/platforms-for-copywriters | en | freelance platforms for copywriters | Verdwenen pagina hersteld |
| /resources/optimizing-freelance-profile-maximum-visibility | en | optimize freelance profile | Verdwenen pagina hersteld |
| /resources/best-freelance-platforms-marketing-consultants | en | freelance platforms for marketing consultants | Verdwenen pagina hersteld |
| /resources/ai-tools-for-freelancers | en | ai tools for freelancers | Verdwenen pagina hersteld |
| /nl/resources/upwork-pricing | nl | upwork pricing | Verdwenen pagina hersteld |
| /nl/resources/best-platforms-freelance-writers-content-creators | nl | best platforms freelance writers content creators | Verdwenen pagina hersteld |
| /nl/resources/how-to-stand-out-on-crowded-freelance-platforms | nl | how to stand out on crowded freelance platforms | Verdwenen pagina hersteld |

De keywordkolom benoemt intentie en bevat geen verzonnen Ahrefs-volume. Bij de Nederlandse varianten hoort Nederlandse redactie; ze worden niet automatisch naar Engels doorgestuurd. Hreflang-paren bestaan alleen voor de drie daadwerkelijk aanwezige taalparen.

Bronnen zijn gecontroleerd op 8–9 september: officiële Upwork- en Fiverr-help, Toptal-FAQ’s, Freelancer/Guru-prijzen, 99designs-prijzen en voorwaarden, Toggl/Clockify-documentatie en overheidsinformatie over facturen. Gedateerde prijzen staan als snapshot vermeld. Onbewezen garanties over klanten, inkomen, zichtbaarheid en betalingen zijn verwijderd. Rekenvoorbeelden zijn als voorbeelden gelabeld. De bestaande Toptal-canonical blijft intact.

Belangrijk voor onderhoud: routes in src/content/seo.js en src/content/recovery.js krijgen voorrang op de gelijknamige CMS-resource. Voor /platforms/upwork is er nu een servergerenderde route met een eigen review in plaats van de oude clientweergave met verouderde fee-uitleg. CMS-records zijn bewaard; CMS-aanpassingen overschrijven deze redactionele routes niet automatisch. Pas deze Git-bronnen aan of voer later een bewuste migratie naar het CMS uit. Publiceer geen tweede concurrerende versie.

## Toegepast uit Obsidian

- Notities 09 en 12/13: één intentie per pagina, een direct antwoord, beschrijvende metadata, één H1, echte HTML-inhoud, bereikbare FAQ’s en toegankelijke bediening.
- Notities 05 en 21: resource-hub, Nederlandse hub, contextlinks tussen gidsen en links vanaf bestaande service-/voorstelpagina’s. Canonicals staan één keer in de sitemap; CMS-dubbelen worden uitgesloten.
- Notities 19/22: gidsen helpen eerst de vraag oplossen. De factuurtool vereist geen wachtlijstinschrijving; de launch-CTA blijft aanvullend.
- Notities 26/27: concrete voorbeelden, primaire bronnen, geen verzonnen scores of ervaring en geen algemene verkoopbeloften.
- Notitie 28: meet na publicatie dezelfde URL-groepen. Geen datumverversing zonder inhoudelijke reden of garantie op Google-opname.

Vault: C:/Users/M_Smi/Documents/webdev/webdev/SEO. De vault zelf is niet gewijzigd.

## Verificatie

- Next.js-productiebuild inclusief TypeScript geslaagd; gerichte ESLint en factuurrekentests geslaagd.
- Getest tegen de gebouwde productieversie op localhost:3012: 29 pagina’s, 38 unieke historische/aliaspaden en 27 interne bestemmingen. Status, redirects, één H1, serverinhoud, canonical, robots, JSON-LD, hub-links en sitemap gecontroleerd. Geen fouten in de eindcontrole.
- Sitemap bevat 122 lokale routes; herstelcanonicals staan er elk één keer in. Dit is niet het aantal bij Google geïndexeerde pagina’s.
- Browser: Inter en geen horizontale overflow op 390 px; Engelse en Nederlandse wachtlijstmodals passen; de invoice-CTA vult freelancer/Freelancing in. De bestaande inschrijfmutatie is niet veranderd. Databaseopslag is in de voorgaande QA-ronde gecontroleerd; deze ronde controleerde openen, taal en defaults, zonder inschrijving te versturen.
- Factuur: twee posten leveren EUR 371,00 subtotaal + EUR 77,91 belasting = EUR 448,91. Getest: regelafronding, belastingafronding, grenzen, ongeldige getallen, lege verplichte velden, datuminvoer, toevoegen/verwijderen, laatste regel behouden en valuta. Er is geen automatische opslag, e-mail, incasso of fiscale beslislogica.
- Afdrukbeperking: de knop roept het browserafdrukvenster op. Het native venster kon niet met de aangesloten browser worden uitgelezen of geëxporteerd; de definitieve PDF-opmaak en lange facturen blijven een handmatige releasecontrole. Daarover wordt geen geslaagde PDF-test geclaimd.
- Een eerdere controle tijdens build/hot-reload gaf tijdelijke Turbopack-modulefouten. Na herstart en testen tegen de afgewerkte productiebuild slagen alle controles. Productie is niet aangepast.

Bewijs in het task-workspace outputs/: SkillLinkup-recovery-verification.json, SkillLinkup-recovery-browser-checks.json, SkillLinkup-recovery-host-checks.json en SkillLinkup-GSC-herstel-releasekaart.csv. De oorspronkelijke auditmatrix en bronbestanden blijven ongewijzigd.

## Publicatie en Search Console

1. Controleer de definitieve PDF handmatig, ook met langere omschrijvingen en meerdere pagina’s. Controleer de inhoud en normale releasechecks van de overige reeds gewijzigde projectonderdelen; deze SEO-ronde publiceert niets zelfstandig.
2. Controleer voor productie NEXT_PUBLIC_SITE_URL=https://skilllinkup.com en de normale productieomgevingen. Publiceer via de bestaande releaseprocedure.
3. Test daarna de tien historische klik-URL’s live, inclusief www, canonicals, taal, robots en eindstatus. Herhaal sitemap- en linkcontrole op de publieke host.
4. Inspecteer in GSC eerst invoice-generator, Upwork pricing, de twee /en/guides/-pagina’s en Nederlandse pricing. Vraag indexering pas aan wanneer die publieke inhoud daadwerkelijk is bijgewerkt. Valideer geen volledige 404-groep zolang andere gerapporteerde fouten nog bestaan.
5. Vergelijk wekelijks indexstatus en klikken/vertoningen van deze URL-groep met de opgeslagen uitgangsmeting. Kijk na 4–8 weken naar queries, snippets en intentie. Een indexeringsaanvraag is geen garantie op opname of herstel.
6. De lange staart uit de 310-URL-matrix blijft een aparte redactionele backlog. Oude assets, duplicaten en niet-relevante pagina’s worden niet massaal opnieuw gepubliceerd. De releasekaart markeert expliciet welke paden wel en niet in deze implementatie zijn gecontroleerd.
