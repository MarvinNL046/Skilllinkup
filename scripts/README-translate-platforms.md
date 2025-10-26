# Platform Translation Script

## Overview

The `translate-platforms.mjs` script creates English versions of all Dutch platform records by duplicating them with `locale = 'en'`.

## Usage

```bash
# Using npm script (recommended)
npm run db:translate-platforms

# Or directly with node
node scripts/translate-platforms.mjs
```

## What It Does

1. **Fetches all Dutch platforms** (`locale = 'nl'`)
2. **Checks for existing English versions** (same slug, locale = 'en')
3. **Creates English duplicates** with:
   - Same `slug` (language-independent)
   - Same technical fields (URLs, ratings, commission info, etc.)
   - Same JSONB fields (pros, cons, features)
   - Translated text fields (description, meta tags)
   - `locale = 'en'`

## Translation Approach

The script uses basic word replacement for common Dutch phrases:

```javascript
{
  'Freelance platform voor': 'Freelance platform for',
  'Het platform voor': 'The platform for',
  'ontwerpers': 'designers',
  'ontwikkelaars': 'developers',
  // etc.
}
```

**Note:** Most platform content (descriptions, pros/cons) is already in English, so translations are minimal.

## Database Changes

The script required updating the platforms table constraints:

### Before
```sql
-- Single-column unique constraints
UNIQUE (name)
UNIQUE (slug)
```

### After
```sql
-- Composite unique constraint
UNIQUE (slug, locale)
```

This allows the same `slug` to exist for multiple locales (nl, en).

## Migration

The constraint changes are documented in:
```
drizzle/migrations/0006_fix_locale_constraints.sql
```

## Safety Features

- ✅ **Idempotent**: Safe to run multiple times
- ✅ **Skip existing**: Won't create duplicates
- ✅ **Error handling**: Continues on individual errors
- ✅ **Progress logging**: Clear feedback on each platform
- ✅ **Summary report**: Final counts and error details

## Expected Output

```
🌍 Starting platform translation from Dutch to English...

📋 Found 18 Dutch platforms to translate

✅ Toptal - Created English version
✅ Upwork - Created English version
✅ Fiverr - Created English version
...

============================================================
📊 Translation Summary:
============================================================
✅ Created:  18 English platforms
⏭️  Skipped:  0 (already exist)
❌ Errors:   0
============================================================

🎉 Translation completed successfully!
```

## Verification

Check the results:

```bash
# Using Node.js
node -e "
import('dotenv/config').then(() => {
  const { neon } = require('@neondatabase/serverless');
  const sql = neon(process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL);

  Promise.all([
    sql\`SELECT COUNT(*) FROM platforms WHERE locale = 'nl'\`,
    sql\`SELECT COUNT(*) FROM platforms WHERE locale = 'en'\`
  ]).then(([nl, en]) => {
    console.log('Dutch platforms:', nl[0].count);
    console.log('English platforms:', en[0].count);
    process.exit(0);
  });
});
"
```

## Future Improvements

For production use, consider:

1. **AI Translation**: Use Claude API or DeepL for better translations
2. **Content Review**: Manual review of generated translations
3. **Field Selection**: More granular control over what gets translated
4. **Batch Size**: Process in batches for large datasets
5. **Rollback**: Transaction support for safer operations

## Related Files

- **Script**: `scripts/translate-platforms.mjs`
- **Migration**: `drizzle/migrations/0006_fix_locale_constraints.sql`
- **Package.json**: `npm run db:translate-platforms`
- **Schema**: Platform table with `locale` column
