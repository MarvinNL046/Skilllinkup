import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  console.log('\n=== FINAL DUTCH PLATFORM VERIFICATION ===\n');
  
  console.log('Testing Arc platform (difficulty: Hard → Moeilijk)...');
  await page.goto('http://localhost:3000/nl/platforms/arc', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: '.playwright-mcp/final-arc-full.png', fullPage: true });
  
  const heroSection = await page.locator('.container').first();
  await heroSection.screenshot({ path: '.playwright-mcp/final-arc-hero.png' });
  
  const metaTitle = await page.title();
  console.log('Meta title:', metaTitle);
  const hasEnglishMeta = /Fees|Features|Pros.*Cons/i.test(metaTitle);
  console.log('Fix 3 - Meta title:', hasEnglishMeta ? 'FAIL (has English)' : 'PASS (Dutch)');
  
  const visitButtonText = await page.locator('a[href*="arc.dev"]').first().textContent();
  console.log('Visit button text:', visitButtonText);
  const hasEnglishVisit = /Visit\s+Arc|Visit\s+Platform/i.test(visitButtonText || '');
  console.log('Fix 1 - Visit button:', hasEnglishVisit ? 'FAIL' : 'PASS');
  
  const allText = await page.textContent('body');
  const easyCount = (allText.match(/\bEasy\b/g) || []).length;
  const hardCount = (allText.match(/\bHard\b/g) || []).length;
  console.log('English difficulty count - Easy:', easyCount, 'Hard:', hardCount);
  console.log('Fix 2 - Difficulty:', (easyCount > 0 || hardCount > 0) ? 'FAIL' : 'PASS');
  
  console.log('\nTesting Upwork...');
  await page.goto('http://localhost:3000/nl/platforms/upwork', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  console.log('\nTesting Fiverr...');
  await page.goto('http://localhost:3000/nl/platforms/fiverr', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  
  console.log('\n=== VERIFICATION COMPLETE ===');
  
  await browser.close();
})();
