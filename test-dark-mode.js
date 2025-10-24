const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  
  // Test 1: Pink Button Contrast in Dark Mode
  console.log('Test 1: Checking pink button text contrast in dark mode...');
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  
  // Toggle dark mode by clicking the dark mode button
  const darkModeButton = await page.locator('button[aria-label*="dark"], button[aria-label*="Dark"], .dark-mode-toggle, [data-theme-toggle]').first();
  if (await darkModeButton.count() > 0) {
    await darkModeButton.click();
    await page.waitForTimeout(500);
  } else {
    // Manually add dark class if no toggle found
    await page.evaluate(() => document.documentElement.classList.add('dark'));
  }
  
  await page.screenshot({ path: '.playwright-mcp/homepage-pink-buttons-dark-mode.png', fullPage: true });
  
  // Test 2: Dark Mode on New Pages - Tools
  console.log('Test 2: Checking /tools page dark mode...');
  await page.goto('http://localhost:3000/tools');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '.playwright-mcp/tools-page-light-mode.png', fullPage: true });
  
  await page.evaluate(() => document.documentElement.classList.add('dark'));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '.playwright-mcp/tools-page-dark-mode.png', fullPage: true });
  
  // Test 3: Newsletter page
  console.log('Test 3: Checking /newsletter page dark mode...');
  await page.goto('http://localhost:3000/newsletter');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '.playwright-mcp/newsletter-page-light-mode.png', fullPage: true });
  
  await page.evaluate(() => document.documentElement.classList.add('dark'));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '.playwright-mcp/newsletter-page-dark-mode.png', fullPage: true });
  
  // Test 4: Guides page
  console.log('Test 4: Checking /guides page dark mode...');
  await page.goto('http://localhost:3000/guides');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '.playwright-mcp/guides-page-light-mode.png', fullPage: true });
  
  await page.evaluate(() => document.documentElement.classList.add('dark'));
  await page.waitForTimeout(500);
  await page.screenshot({ path: '.playwright-mcp/guides-page-dark-mode.png', fullPage: true });
  
  // Test 5: Navigation - Guide card links
  console.log('Test 5: Testing guide card navigation...');
  const guideCard = await page.locator('a[href^="/post/"]').first();
  if (await guideCard.count() > 0) {
    const href = await guideCard.getAttribute('href');
    console.log('Guide card href:', href);
    await guideCard.click();
    await page.waitForLoadState('networkidle');
    const currentUrl = page.url();
    console.log('Navigated to:', currentUrl);
    await page.screenshot({ path: '.playwright-mcp/guides-navigation-test.png', fullPage: true });
  } else {
    console.log('No guide card found!');
  }
  
  // Test 6: "Browse All Reviews" button
  console.log('Test 6: Testing Browse All Reviews button...');
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  
  const browseButton = await page.locator('a:has-text("Browse All Reviews"), button:has-text("Browse All Reviews")').first();
  if (await browseButton.count() > 0) {
    const href = await browseButton.getAttribute('href');
    console.log('Browse All Reviews href:', href);
    await browseButton.click();
    await page.waitForLoadState('networkidle');
    const currentUrl = page.url();
    console.log('Navigated to:', currentUrl);
  } else {
    console.log('Browse All Reviews button not found!');
  }
  
  await browser.close();
  console.log('All tests completed!');
})();
