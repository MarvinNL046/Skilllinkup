import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  // Test EN
  await page.goto('http://localhost:3000/en/platforms', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '.playwright-mcp/dutch-test-en-platforms.png' });
  
  // Test NL
  await page.goto('http://localhost:3000/nl/platforms', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '.playwright-mcp/dutch-test-nl-platforms.png' });
  
  // Test language switch
  await page.goto('http://localhost:3000/en/platforms', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);
  const nlBtn = page.locator('button img[alt="Nederlands"]').first();
  await nlBtn.click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '.playwright-mcp/dutch-test-language-switch.png' });
  
  await browser.close();
  console.log('Screenshots captured!');
}

test().catch(console.error);
