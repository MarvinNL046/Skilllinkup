import { chromium } from 'playwright';
import { writeFile } from 'fs/promises';

const baseUrl = 'http://localhost:3000';
const screenshotDir = '.playwright-mcp';

async function runTests() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  const results = [];

  // Test 1: English Homepage
  console.log('Test 1: English Homepage...');
  try {
    await page.goto(baseUrl + '/en', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const screenshot1 = screenshotDir + '/i18n-test-english-homepage.png';
    await page.screenshot({ path: screenshot1, fullPage: true });
    
    // Verify language switcher
    const languageSwitcher = await page.locator('text=/🇳🇱.*NL/').first();
    const switcherExists = await languageSwitcher.count() > 0;
    
    // Verify header navigation in English
    const homeLink = await page.locator('text=/Home/i').first();
    const platformsLink = await page.locator('text=/Platforms/i').first();
    const homeExists = await homeLink.count() > 0;
    const platformsExists = await platformsLink.count() > 0;
    
    results.push({
      test: 'Test 1: English Homepage',
      screenshot: screenshot1,
      status: switcherExists && homeExists && platformsExists ? 'PASS' : 'FAIL',
      details: {
        languageSwitcher: switcherExists ? 'Found' : 'Not found',
        homeLink: homeExists ? 'Found' : 'Not found',
        platformsLink: platformsExists ? 'Found' : 'Not found'
      }
    });
  } catch (error) {
    results.push({
      test: 'Test 1: English Homepage',
      status: 'FAIL',
      error: error.message
    });
  }

  // Test 2: Dutch Homepage
  console.log('Test 2: Dutch Homepage...');
  try {
    await page.goto(baseUrl + '/nl', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const screenshot2 = screenshotDir + '/i18n-test-dutch-homepage.png';
    await page.screenshot({ path: screenshot2, fullPage: true });
    
    // Verify language switcher shows EN
    const languageSwitcher = await page.locator('text=/🇬🇧.*EN/').first();
    const switcherExists = await languageSwitcher.count() > 0;
    
    results.push({
      test: 'Test 2: Dutch Homepage',
      screenshot: screenshot2,
      status: switcherExists ? 'PASS' : 'FAIL',
      details: {
        languageSwitcher: switcherExists ? 'Found EN switcher' : 'Not found'
      }
    });
  } catch (error) {
    results.push({
      test: 'Test 2: Dutch Homepage',
      status: 'FAIL',
      error: error.message
    });
  }

  // Test 3: Language Switcher Functionality
  console.log('Test 3: Language Switcher Functionality...');
  try {
    await page.goto(baseUrl + '/en', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Click language switcher
    const switcher = await page.locator('text=/🇳🇱.*NL/').first();
    await switcher.click();
    await page.waitForTimeout(2000);
    
    const screenshot3 = screenshotDir + '/i18n-test-language-switch.png';
    await page.screenshot({ path: screenshot3, fullPage: true });
    
    const currentUrl = page.url();
    const switchedToNl = currentUrl.includes('/nl');
    
    results.push({
      test: 'Test 3: Language Switcher Functionality',
      screenshot: screenshot3,
      status: switchedToNl ? 'PASS' : 'FAIL',
      details: {
        currentUrl: currentUrl,
        switchedToNl: switchedToNl ? 'URL changed to /nl' : 'Still on /en'
      }
    });
  } catch (error) {
    results.push({
      test: 'Test 3: Language Switcher Functionality',
      status: 'FAIL',
      error: error.message
    });
  }

  // Test 4: Platform Page (English)
  console.log('Test 4: Platform Page (English)...');
  try {
    await page.goto(baseUrl + '/en/platforms/fiverr', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const screenshot4 = screenshotDir + '/i18n-test-platform-english.png';
    await page.screenshot({ path: screenshot4, fullPage: true });
    
    const title = await page.title();
    const hasContent = title.length > 0;
    
    results.push({
      test: 'Test 4: Platform Page (English)',
      screenshot: screenshot4,
      status: hasContent ? 'PASS' : 'FAIL',
      details: {
        pageTitle: title,
        contentLoaded: hasContent ? 'Page loaded' : 'No content'
      }
    });
  } catch (error) {
    results.push({
      test: 'Test 4: Platform Page (English)',
      status: 'FAIL',
      error: error.message
    });
  }

  // Test 5: Platform Page (Dutch)
  console.log('Test 5: Platform Page (Dutch)...');
  try {
    await page.goto(baseUrl + '/nl/platforms/fiverr', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    const screenshot5 = screenshotDir + '/i18n-test-platform-dutch.png';
    await page.screenshot({ path: screenshot5, fullPage: true });
    
    const title = await page.title();
    const hasContent = title.length > 0;
    
    results.push({
      test: 'Test 5: Platform Page (Dutch)',
      screenshot: screenshot5,
      status: hasContent ? 'PASS' : 'FAIL',
      details: {
        pageTitle: title,
        contentLoaded: hasContent ? 'Page loaded' : 'No content'
      }
    });
  } catch (error) {
    results.push({
      test: 'Test 5: Platform Page (Dutch)',
      status: 'FAIL',
      error: error.message
    });
  }

  await browser.close();
  
  // Write results
  await writeFile('i18n-test-results.json', JSON.stringify(results, null, 2));
  
  // Print summary
  console.log('\n========================================');
  console.log('I18N VISUAL TEST RESULTS');
  console.log('========================================\n');
  
  results.forEach(result => {
    const icon = result.status === 'PASS' ? 'PASS' : 'FAIL';
    console.log(icon + ' ' + result.test);
    console.log('   Screenshot: ' + (result.screenshot || 'N/A'));
    if (result.details) {
      Object.entries(result.details).forEach(([key, value]) => {
        console.log('   ' + key + ': ' + value);
      });
    }
    if (result.error) {
      console.log('   Error: ' + result.error);
    }
    console.log('');
  });
  
  const passCount = results.filter(r => r.status === 'PASS').length;
  const failCount = results.filter(r => r.status === 'FAIL').length;
  
  console.log('========================================');
  console.log('Total: ' + results.length + ' tests');
  console.log('Passed: ' + passCount);
  console.log('Failed: ' + failCount);
  console.log('========================================');
}

runTests().catch(console.error);
