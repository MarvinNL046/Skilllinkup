# Hardcoded Text Audit - SkillLinkup

## Overview
Dit document bevat alle geïdentificeerde hardcoded Engelse tekst in de applicatie.

---

## Critical Issues (Must Fix)

### 1. ❌ CRITICAL: platform-filters.tsx

**File**: `/components/platform-filters.tsx`
**Lines**: Multiple
**Severity**: CRITICAL - Users see mixed language on /nl/platforms page

#### Search Input (Line 212)
```typescript
placeholder="Search platforms..."
```
**Fix**: `placeholder={t('filters.searchPlaceholder')}`

#### Filter Headers (Lines 238, 264, 283, 306, 322)
```typescript
"Categories"        // Line 238
"Difficulty"        // Line 264
"Rating"            // Line 283
"Work Type"         // Line 306
"Country"           // Line 322
```
**Fix**: Replace with `{t('filters.categories')}`, etc.

#### Select Options (Lines 314-337)
```typescript
<option value="all">All Work Types</option>
<option value="remote">Remote Only</option>
<option value="local">Local Only</option>
<option value="hybrid">Hybrid</option>

<option value="all">All Countries</option>
<option value="Worldwide">Worldwide</option>
<option value="NL">Netherlands</option>
<option value="BE">Belgium</option>
<option value="DE">Germany</option>
<option value="FR">France</option>
<option value="US">United States</option>
```

#### Sort Options (Lines 352-354)
```typescript
<option value="rating">Sort by: Rating</option>
<option value="name">Sort by: Name</option>
<option value="difficulty">Sort by: Difficulty</option>
```

#### Results Counter (Line 345)
```typescript
Showing {filteredPlatforms.length} platform{filteredPlatforms.length !== 1 ? 's' : ''}
```
**Fix**: Use plural handling from i18n

#### No Results Message (Lines 360, 365)
```typescript
"No platforms found matching your filters."
"Clear all filters"
```

#### Platform Card Labels (Lines 416, 423, 430, 443)
```typescript
"Category"
"Fees"
"Difficulty"
"Read Review"
```

**Total Impact**: ~30 hardcoded strings, highly visible in UI

---

## Medium Priority Issues

### 2. ⚠️  MEDIUM: CommentSection.tsx

**File**: `/components/CommentSection.tsx`
**Lines**: Unknown (need to verify)
**Impact**: Comment form shows English placeholders

```typescript
placeholder="Your name"
placeholder="your@email.com"
placeholder="Share your thoughts..."
```

**Status**: Needs full audit - file not yet reviewed

---

### 3. ⚠️  MEDIUM: ThemeToggle.tsx

**File**: `/components/ThemeToggle.tsx`
**Lines**: Unknown
**Impact**: Theme toggle accessibility labels in English

```typescript
aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
```

**Status**: Needs translation keys (theme.switchToDark, theme.switchToLight)

---

### 4. ⚠️  MEDIUM: LanguageSwitcher.tsx

**File**: `/components/LanguageSwitcher.tsx`
**Lines**: Unknown
**Impact**: Language switcher button accessibility

```typescript
aria-label={`Switch to ${label}`}
```

**Status**: May need review, likely OK as dynamic labels

---

## Good Practices (Already Implemented)

### ✅ Components Using Translations Correctly

1. **newsletter.tsx**
   ```typescript
   placeholder={t('placeholder')}  // ✅ Uses translation
   ```

2. **BackToTop.tsx**
   ```typescript
   aria-label={t('common.scrollToTop')}  // ✅ Uses translation
   ```

3. **testimonials.tsx**
   ```typescript
   aria-label={t('previousTestimonial')}  // ✅ Multiple correct uses
   aria-label={t('nextTestimonial')}
   aria-label={t('goToTestimonial', { number: index + 1 })}
   ```

---

## Summary Table

| Component | Type | Count | Status | Priority |
|---|---|---|---|---|
| platform-filters | Hardcoded | ~30 | ❌ Critical | 🔴 P1 |
| CommentSection | Hardcoded | ~3 | ❌ Unknown | 🟠 P2 |
| ThemeToggle | Hardcoded | 1 | ⚠️ Maybe | 🟡 P3 |
| LanguageSwitcher | Hardcoded | 1 | ✅ Likely OK | 🟡 P3 |
| Newsletter | Translations | All | ✅ Good | - |
| BackToTop | Translations | All | ✅ Good | - |
| Testimonials | Translations | All | ✅ Good | - |

---

## Required Translation Keys

### For `messages/en.json` and `messages/nl.json`:

```json
{
  "filters": {
    "searchPlaceholder": "Search platforms... | Zoek platforms...",
    "categories": "Categories | Categorieën",
    "difficulty": "Difficulty | Moeilijkheidsgraad",
    "rating": "Rating | Beoordeling",
    "workType": "Work Type | Werktype",
    "country": "Country | Land",
    "allWorkTypes": "All Work Types | Alle Werktypen",
    "remoteOnly": "Remote Only | Alleen Remote",
    "localOnly": "Local Only | Alleen Lokaal",
    "hybrid": "Hybrid | Hybride",
    "allCountries": "All Countries | Alle Landen",
    "worldwide": "Worldwide | Wereldwijd",
    "netherlands": "Netherlands | Nederland",
    "belgium": "Belgium | België",
    "germany": "Germany | Duitsland",
    "france": "France | Frankrijk",
    "unitedStates": "United States | Verenigde Staten",
    "sortByRating": "Sort by: Rating | Sorteren op: Beoordeling",
    "sortByName": "Sort by: Name | Sorteren op: Naam",
    "sortByDifficulty": "Sort by: Difficulty | Sorteren op: Moeilijkheidsgraad",
    "noPlatformsFound": "No platforms found matching your filters. | Geen platforms gevonden die voldoen aan uw filters.",
    "clearAllFilters": "Clear all filters | Alle filters wissen",
    "showingPlatforms": "Showing {count} platform{plural} | Toon {count} platform{plural}",
    "category": "Category | Categorie",
    "fees": "Fees | Kosten",
    "readReview": "Read Review | Lees Review"
  },
  "comments": {
    "nameYours": "Your name | Jouw naam",
    "emailPlaceholder": "your@email.com | jouw@email.nl",
    "thoughtsPlaceholder": "Share your thoughts... | Deel je gedachten..."
  },
  "theme": {
    "switchToDark": "Switch to dark mode | Schakel naar donkere modus",
    "switchToLight": "Switch to light mode | Schakel naar lichte modus"
  }
}
```

---

## Action Plan

### Step 1: Fix Platform Filters (IMMEDIATE)
1. Add all `filters.*` keys to both message files
2. Update platform-filters.tsx to use `useTranslations()`
3. Test /nl/platforms with all filters
4. Deploy to production

### Step 2: Audit Other Components (THIS WEEK)
1. Review CommentSection.tsx fully
2. Fix any hardcoded strings found
3. Add missing keys to messages
4. Test affected pages

### Step 3: Prevent Future Issues (THIS MONTH)
1. Create linting rule to catch hardcoded strings
2. Add to CI/CD pipeline
3. Document i18n best practices
4. Train team on proper translation usage

---

## Testing Checklist

- [ ] Visit /nl/platforms and verify all labels are in Dutch
- [ ] Use all filters and verify options are in Dutch
- [ ] Sort by different options
- [ ] Search for a platform
- [ ] Verify "No results" message in Dutch
- [ ] Check "Showing X platforms" counter in Dutch
- [ ] Click "Read Review" button - verify text is Dutch
- [ ] Test /en/platforms to ensure English still works
- [ ] Test theme toggle accessibility
- [ ] Test language switcher functionality

---

Generated: 26 oktober 2025
