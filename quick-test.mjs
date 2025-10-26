import { chromium } from 'playwright';
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.goto('http://localhost:3000/nl/platforms/arc');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: '.playwright-mcp/arc-final-test.png', fullPage: false });
  const bodyText = await page.locator('body').textContent();
  const easyMatches = (bodyText.match(/\bEasy\b/g) || []).length;
  const hardMatches = (bodyText.match(/\bHard\b/g) || []).length;  
  const moeilijkMatches = (bodyText.match(/\bMoeilijk\b/g) || []).length;
  console.log('Visible text analysis:');
  console.log('- "Easy":', easyMatches);
  console.log('- "Hard":', hardMatches);
  console.log('- "Moeilijk":', moeilijkMatches);
  console.log(easyMatches === 0 && hardMatches === 0 ? 'SUCCESS' : 'FAIL - English found');
  await browser.close();
})();
