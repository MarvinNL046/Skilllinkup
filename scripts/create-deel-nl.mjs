import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import translate from '@iamtraction/google-translate';

dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function translateText(text) {
  if (!text) return text;
  try {
    const result = await translate(text, { from: 'en', to: 'nl' });
    return result.text;
  } catch (err) {
    console.error('Translation error:', err.message);
    return text;
  }
}

async function translateArray(arr) {
  if (!arr || !Array.isArray(arr)) return arr;
  const translated = [];
  for (const item of arr) {
    translated.push(await translateText(item));
  }
  return translated;
}

async function createDeelNL() {
  // Get English "deel" platform
  const [deelEN] = await sql`SELECT * FROM platforms WHERE slug = 'deel' AND locale = 'en'`;

  if (!deelEN) {
    console.log('ERROR: Could not find English "deel" platform');
    return;
  }

  console.log('Found English "deel" platform:', deelEN.name);
  console.log('Translating to Dutch...\n');

  // Translate fields
  const description = await translateText(deelEN.description);
  console.log('✓ Description translated');

  const metaTitle = await translateText(deelEN.meta_title);
  console.log('✓ Meta title translated');

  const metaDescription = await translateText(deelEN.meta_description);
  console.log('✓ Meta description translated');

  const pros = await translateArray(deelEN.pros);
  console.log('✓ Pros translated');

  const cons = await translateArray(deelEN.cons);
  console.log('✓ Cons translated');

  const features = await translateArray(deelEN.features);
  console.log('✓ Features translated');

  // Insert Dutch version - arrays need JSON.stringify for JSONB columns
  await sql`
    INSERT INTO platforms (
      name, slug, locale, description, logo_url, website_url,
      rating, fees, category, pros, cons, features,
      meta_title, meta_description, owner_id, work_type, countries,
      difficulty, color, featured, status, affiliate_link,
      commission_type, commission_value, cookie_duration
    ) VALUES (
      ${deelEN.name},
      ${deelEN.slug},
      'nl',
      ${description},
      ${deelEN.logo_url},
      ${deelEN.website_url},
      ${deelEN.rating},
      ${deelEN.fees},
      ${deelEN.category},
      ${JSON.stringify(pros)},
      ${JSON.stringify(cons)},
      ${JSON.stringify(features)},
      ${metaTitle},
      ${metaDescription},
      ${deelEN.owner_id},
      ${deelEN.work_type},
      ${deelEN.countries},
      ${deelEN.difficulty},
      ${deelEN.color},
      ${deelEN.featured},
      ${deelEN.status},
      ${deelEN.affiliate_link},
      ${deelEN.commission_type},
      ${deelEN.commission_value},
      ${deelEN.cookie_duration}
    )
  `;

  console.log('\n✅ Dutch "deel" platform created successfully!');

  // Verify
  const [deelNL] = await sql`SELECT id, name, locale FROM platforms WHERE slug = 'deel' AND locale = 'nl'`;
  console.log('Verified:', deelNL);
}

createDeelNL().catch(console.error);
