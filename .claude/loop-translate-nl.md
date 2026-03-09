# SkillLinkup Translation Loop — Multi-Language Queue Pipeline

## How This Loop Works
You process `data/translation-queue.json` one item at a time. Each iteration:

1. **Read** `data/translation-queue.json`
2. **Pick** the first item with `"status": "pending"` (lowest id)
3. **Lock** it: set status to `"in_progress"`, write the file
4. **Execute** the translation work (see rules per type below)
5. **Verify** `npx tsc --noEmit` passes
6. **Complete** set status to `"completed"`, increment `stats.completed`, write the file
7. **Commit** `git add -A && git commit -m "i18n(nl): <description> (<completed>/<total>)"`

If no pending items remain, report "Translation queue empty — all 633 items done!" and stop.

## Supported Locales (7 languages)
| Code | Language | Priority | Market |
|------|----------|----------|--------|
| nl | Dutch | 2-11 | Home market |
| de | German | 20-31 | #1 EU economy |
| fr | French | 30-41 | EU + Africa |
| es | Spanish | 40-51 | Global (500M speakers) |
| pt | Portuguese | 50-61 | Brazil + Portugal |
| it | Italian | 60-71 | EU |
| pl | Polish | 70-81 | Eastern EU tech |

NL goes first (lowest priority numbers), then DE, FR, ES, PT, IT, PL.
For non-NL locales: the component files are ALREADY wired to use `t('key')` (done during NL phase). You only need to create `messages/{locale}.json` and translate the DB content.

---

## Rules Per Type

### `infra` — Infrastructure setup
- Read the description, execute what it says
- For package installs: run the command
- For file creation: create the file with proper content
- For verification: run the checks, fix any issues

### `component` — Component string extraction
1. Read the target component file
2. Identify ALL hardcoded English strings (labels, buttons, headings, placeholders, messages)
3. Add corresponding keys to `messages/en.json` under the right namespace
4. Add Dutch translations to `messages/nl.json`
5. Import `useTranslations` in the component (or `getTranslations` for server components)
6. Replace hardcoded strings with `t('key')` calls
7. Keep the component working — test with `npx tsc --noEmit`

### `page` — Full page translation
1. Read the page file + its child components
2. Extract hardcoded strings to messages files (both en.json and nl.json)
3. Replace with translation calls
4. If page has `metadata` export, convert to `generateMetadata()` with locale support
5. Translate ALL content — not just titles, but descriptions, instructions, CTAs, everything

### `db-content` — Database content translation
1. For `script-setup`: create the translation script using `@iamtraction/google-translate` (free, no API key)
2. For table items: write and run a Convex mutation or Node script that:
   - Reads all English records (locale='en')
   - Translates text fields to Dutch
   - Creates new records with locale='nl' (same slug, different locale)
   - Uses the composite unique index (slug, locale) to avoid duplicates

### `meta` — SEO metadata
1. Convert static `metadata` exports to `generateMetadata()` functions
2. Accept locale parameter, return Dutch meta for 'nl'
3. Update sitemap/robots if needed

---

## Translation Style Guide (All Languages)

**General rules for ALL languages:**
- **Tone**: Informal, modern, direct — like a trendy tech platform (NOT corporate/formal)
- **Keep English**: freelancer, dashboard, portfolio, skills, tags, review, gig (internationally understood tech terms)
- **Platform name**: Always "SkillLinkup" (NEVER translate)
- **Currency**: Keep € symbol, use local number formatting where appropriate
- **Proper nouns**: Never translate city names, country names stay in local language

### Dutch (nl)
- "je/jij" (NIET "u") — informal
- Example tone: Bol.com, Thuisbezorgd

### German (de)
- "du" (NICHT "Sie") — informal for young platform
- Example tone: Fiverr.de, Freelancer.de

### French (fr)
- "tu" (PAS "vous") — informal
- Example tone: Malt.fr, ComeUp.com

### Spanish (es)
- "tú" (NO "usted") — informal
- Latin American neutral Spanish (understood everywhere)
- Example tone: Workana.com

### Portuguese (pt)
- Brazilian Portuguese (pt-BR) — larger market than PT-PT
- "você" — standard informal
- Example tone: 99freelas.com.br

### Italian (it)
- "tu" (NON "Lei") — informal
- Example tone: Addlance.com

### Polish (pl)
- "ty" — informal
- Example tone: Useme.com

### Key Terms Reference
| EN | NL | DE | FR | ES | PT | IT | PL |
|----|-----|-----|-----|-----|-----|-----|-----|
| View Profile | Bekijk Profiel | Profil ansehen | Voir le profil | Ver Perfil | Ver Perfil | Vedi Profilo | Zobacz Profil |
| Available Now | Nu Beschikbaar | Jetzt Verfügbar | Disponible | Disponible | Disponível | Disponibile | Dostępny |
| Online Marketplace | Online Marktplaats | Online-Marktplatz | Marché en Ligne | Mercado Online | Mercado Online | Mercato Online | Rynek Online |
| Browse Jobs | Bekijk Vacatures | Jobs durchsuchen | Parcourir les offres | Explorar Empleos | Explorar Vagas | Sfoglia Lavori | Przeglądaj Oferty |
| Become a Seller | Word Verkoper | Verkäufer werden | Devenir Vendeur | Hazte Vendedor | Torne-se Vendedor | Diventa Venditore | Zostań Sprzedawcą |
| Settings | Instellingen | Einstellungen | Paramètres | Configuración | Configurações | Impostazioni | Ustawienia |
| Messages | Berichten | Nachrichten | Messages | Mensajes | Mensagens | Messaggi | Wiadomości |
| Earnings | Inkomsten | Einnahmen | Revenus | Ganancias | Ganhos | Guadagni | Zarobki |
| Completed | Afgerond | Abgeschlossen | Terminé | Completado | Concluído | Completato | Ukończone |
| In Progress | Bezig | In Bearbeitung | En cours | En Progreso | Em Andamento | In Corso | W Toku |
| Search | Zoeken | Suchen | Rechercher | Buscar | Pesquisar | Cerca | Szukaj |
| Loading... | Laden... | Laden... | Chargement... | Cargando... | Carregando... | Caricamento... | Ładowanie... |
| Something went wrong | Er ging iets mis | Etwas ist schiefgelaufen | Une erreur est survenue | Algo salió mal | Algo deu errado | Qualcosa è andato storto | Coś poszło nie tak |
| Save | Opslaan | Speichern | Enregistrer | Guardar | Salvar | Salva | Zapisz |
| Cancel | Annuleren | Abbrechen | Annuler | Cancelar | Cancelar | Annulla | Anuluj |

---

## Important
- NEVER delete English content — translations are added alongside
- NEVER skip the tsc check — if it fails, fix before completing
- NEVER mark an item completed without actually doing the work
- Keep commits small and atomic — one item per commit
- Commit message format: `i18n({locale}): {description} ({completed}/{total})`
- If a file doesn't exist, mark the item completed with a note and move on
- For locales after NL: components already use `t('key')` — you ONLY need to add the new messages/{locale}.json entries and DB content
- The NL phase does the heavy lifting (extracting strings, wiring useTranslations). Other locales just need translation files + DB content
