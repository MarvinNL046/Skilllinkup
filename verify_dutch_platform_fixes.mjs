import { chromium } from 'playwright';

async function verifyDutchPlatformFixes() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  
  console.log('Testing Dutch Arc platform page...');
  
  await page.goto('http://localhost:3000/nl/platforms/arc', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: '.playwright-mcp/final-verification-arc-nl.png', fullPage: true });
  console.log('Screenshot saved: final-verification-arc-nl.png');
  
  const pageContent = await page.content();
  
  const metaTitle = await page.title();
  console.log('\n=== META TITLE CHECK ===');
  console.log('Meta title:', metaTitle);
  const hasEnglishMetaTitle = metaTitle.includes('Fees') || metaTitle.includes('Features') || metaTitle.includes('Pros') || metaTitle.includes('Cons');
  console.log('Contains English meta title:', hasEnglishMetaTitle ? 'FAIL' : 'PASS');
  
  console.log('\n=== VISIT BUTTON CHECK ===');
  const visitButtons = await page.locator('a:has-text("Visit"), a:has-text("Bezoek")').allTextContents();
  console.log('Button texts found:', visitButtons);
  const hasEnglishVisit = visitButtons.some(text => text.includes('Visit') && !text.includes('Bezoek'));
  console.log('Contains English Visit:', hasEnglishVisit ? 'FAIL' : 'PASS');
  
  console.log('\n=== DIFFICULTY CHECK ===');
  const difficultyTexts = await page.locator('text=/Eenvoudig|Medium|Moeilijk|Easy|Hard/i').allTextContents();
  console.log('Difficulty texts found:', difficultyTexts);
  const hasEnglishDifficulty = difficultyTexts.some(text => 
    text.match(/\b(Easy|Hard)\b/i) && !text.includes('Eenvoudig') && !text.includes('Moeilijk')
  );
  console.log('Contains English difficulty:', hasEnglishDifficulty ? 'FAIL' : 'PASS');
  
  console.log('\n=== TESTING OTHER PLATFORMS ===');
  
  await page.goto('http://localhost:3000/nl/platforms/upwork', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '.playwright-mcp/final-verification-upwork-nl.png', fullPage: true });
  const upworkDifficulty = await page.locator('text=/Eenvoudig|Easy/i').allTextContents();
  console.log('Upwork difficulty:', upworkDifficulty);
  
  await page.goto('http://localhost:3000/nl/platforms/fiverr', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '.playwright-mcp/final-verification-fiverr-nl.png', fullPage: true });
  const fiverrDifficulty = await page.locator('text=/Medium/i').allTextContents();
  console.log('Fiverr difficulty:', fiverrDifficulty);
  
  console.log('\n=== FINAL SUMMARY ===');
  const allPassed = !hasEnglishMetaTitle && !hasEnglishVisit && !hasEnglishDifficulty;
  console.log('All fixes verified:', allPassed ? 'SUCCESS' : 'ISSUES FOUND');
  
  await browser.close();
}

verifyDutchPlatformFixes().catch(console.error);
