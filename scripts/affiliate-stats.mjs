#!/usr/bin/env node
/**
 * Affiliate Stats Dashboard
 * Run with: node scripts/affiliate-stats.mjs
 */

import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);

async function getAffiliateStats() {
  console.log('\n📊 AFFILIATE CLICK STATISTICS\n');
  console.log('='.repeat(60));

  // Total clicks
  const totalClicks = await sql`
    SELECT COUNT(*) as total FROM affiliate_clicks
  `;
  console.log(`\n📈 Total Clicks: ${totalClicks[0].total}`);

  // Clicks by platform (top 10)
  const byPlatform = await sql`
    SELECT
      platform_name,
      COUNT(*) as clicks,
      COUNT(*) FILTER (WHERE link_type = 'affiliate') as affiliate_clicks,
      COUNT(*) FILTER (WHERE converted = true) as conversions
    FROM affiliate_clicks
    GROUP BY platform_name
    ORDER BY clicks DESC
    LIMIT 10
  `;

  if (byPlatform.length > 0) {
    console.log('\n🏆 Top Platforms by Clicks:');
    console.log('-'.repeat(60));
    console.log('Platform'.padEnd(25) + 'Clicks'.padEnd(10) + 'Affiliate'.padEnd(12) + 'Conversions');
    console.log('-'.repeat(60));
    byPlatform.forEach(p => {
      console.log(
        p.platform_name.padEnd(25) +
        String(p.clicks).padEnd(10) +
        String(p.affiliate_clicks).padEnd(12) +
        String(p.conversions)
      );
    });
  }

  // Clicks by day (last 7 days)
  const byDay = await sql`
    SELECT
      DATE(clicked_at) as date,
      COUNT(*) as clicks
    FROM affiliate_clicks
    WHERE clicked_at >= NOW() - INTERVAL '7 days'
    GROUP BY DATE(clicked_at)
    ORDER BY date DESC
  `;

  if (byDay.length > 0) {
    console.log('\n📅 Last 7 Days:');
    console.log('-'.repeat(40));
    byDay.forEach(d => {
      const bar = '█'.repeat(Math.min(Math.floor(d.clicks / 2), 20));
      console.log(`${d.date}: ${bar} ${d.clicks}`);
    });
  }

  // Conversion rate
  const conversionStats = await sql`
    SELECT
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE converted = true) as converted,
      COALESCE(SUM(conversion_value), 0) as total_revenue
    FROM affiliate_clicks
    WHERE link_type = 'affiliate'
  `;

  if (conversionStats[0].total > 0) {
    const rate = ((conversionStats[0].converted / conversionStats[0].total) * 100).toFixed(2);
    console.log('\n💰 Affiliate Performance:');
    console.log('-'.repeat(40));
    console.log(`Total Affiliate Clicks: ${conversionStats[0].total}`);
    console.log(`Conversions: ${conversionStats[0].converted}`);
    console.log(`Conversion Rate: ${rate}%`);
    console.log(`Total Revenue: €${parseFloat(conversionStats[0].total_revenue).toFixed(2)}`);
  }

  // Platforms with affiliate links
  const platformsWithLinks = await sql`
    SELECT
      name,
      slug,
      affiliate_link,
      commission_type,
      commission_value
    FROM platforms
    WHERE affiliate_link IS NOT NULL AND affiliate_link != ''
    ORDER BY name
  `;

  console.log('\n🔗 Platforms with Affiliate Links:');
  console.log('-'.repeat(60));
  if (platformsWithLinks.length === 0) {
    console.log('⚠️  No platforms have affiliate links configured yet!');
    console.log('   Add affiliate links in the admin dashboard or database.');
  } else {
    platformsWithLinks.forEach(p => {
      console.log(`✅ ${p.name}: ${p.affiliate_link?.substring(0, 40)}...`);
      if (p.commission_type) {
        console.log(`   Commission: ${p.commission_value} (${p.commission_type})`);
      }
    });
  }

  console.log('\n' + '='.repeat(60));
  console.log('💡 To add affiliate links, update the platforms table:');
  console.log('   UPDATE platforms SET affiliate_link = \'https://...\' WHERE slug = \'fiverr\';');
  console.log('='.repeat(60) + '\n');
}

getAffiliateStats().catch(console.error);
