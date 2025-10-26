import { chromium } from 'playwright';

async function testPlatformDetails() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  
  const results = {
    tests: [],
    screenshots: []
  };

  try {
    // Test 1: Arc Platform Detail (Nederlands)
    console.log('\n=== Test 1: Arc Platform Detail (Nederlands) ===');
    await page.goto('http://localhost:3000/nl/platforms/arc', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    
    const screenshotPath1 = '.playwright-mcp/platform-detail-arc-nl.png';
    await page.screenshot({ path: screenshotPath1, fullPage: true });
    results.screenshots.push(screenshotPath1);
    console.log('✓ Screenshot saved:', screenshotPath1);
    
    // Check for Dutch UI labels
    const dutchLabels = [
      'Moeilijkheidsgraad',
      'Kosten',
      'Website bezoeken',
      'Belangrijkste kenmerken',
      'Voor- en Nadelen',
      'Voordelen',
      'Nadelen',
      'Snelle Info',
      'Categorie',
      'Kostenstructuur',
      'Beoordeling',
      'Platform bezoeken',
      'Platforms Vergelijken'
    ];
    
    const pageContent = await page.content();
    const foundLabels = [];
    const missingLabels = [];
    
    for (const label of dutchLabels) {
      if (pageContent.includes(label)) {
        foundLabels.push(label);
      } else {
        missingLabels.push(label);
      }
    }
    
    console.log(`✓ Found ${foundLabels.length}/${dutchLabels.length} Dutch labels`);
    if (missingLabels.length > 0) {
      console.log('⚠ Missing labels:', missingLabels);
    }
    
    // Check for translation errors
    const errorTerms = ['Gratislance', 'Hoog-quality', 'Difficulty', 'Fees'];
    const foundErrors = [];
    
    for (const term of errorTerms) {
      if (pageContent.includes(term)) {
        foundErrors.push(term);
      }
    }
    
    if (foundErrors.length > 0) {
      console.log('❌ Found error terms:', foundErrors);
    } else {
      console.log('✓ No error terms found');
    }
    
    results.tests.push({
      test: 'Arc NL',
      dutchLabelsFound: foundLabels.length,
      dutchLabelsTotal: dutchLabels.length,
      missingLabels,
      errorTermsFound: foundErrors
    });

    // Test 2: English Version (Baseline)
    console.log('\n=== Test 2: Arc Platform Detail (English) ===');
    await page.goto('http://localhost:3000/en/platforms/arc', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    
    const screenshotPath2 = '.playwright-mcp/platform-detail-arc-en.png';
    await page.screenshot({ path: screenshotPath2, fullPage: true });
    results.screenshots.push(screenshotPath2);
    console.log('✓ Screenshot saved:', screenshotPath2);
    
    const enContent = await page.content();
    const englishLabels = [
      'Difficulty',
      'Fees',
      'Visit Website',
      'Key Features',
      'Pros & Cons',
      'Pros',
      'Cons',
      'Quick Info',
      'Category',
      'Fee Structure',
      'Rating',
      'Visit Platform',
      'Compare Platforms'
    ];
    
    const foundEnLabels = englishLabels.filter(label => enContent.includes(label));
    console.log(`✓ Found ${foundEnLabels.length}/${englishLabels.length} English labels`);
    
    results.tests.push({
      test: 'Arc EN',
      englishLabelsFound: foundEnLabels.length,
      englishLabelsTotal: englishLabels.length
    });

    // Test 3: Fiverr NL
    console.log('\n=== Test 3: Fiverr Platform Detail (Nederlands) ===');
    await page.goto('http://localhost:3000/nl/platforms/fiverr', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    
    const screenshotPath3 = '.playwright-mcp/platform-detail-fiverr-nl.png';
    await page.screenshot({ path: screenshotPath3, fullPage: true });
    results.screenshots.push(screenshotPath3);
    console.log('✓ Screenshot saved:', screenshotPath3);
    
    const fiverrContent = await page.content();
    const fiverrLabelsFound = dutchLabels.filter(label => fiverrContent.includes(label));
    const fiverrErrors = errorTerms.filter(term => fiverrContent.includes(term));
    
    console.log(`✓ Found ${fiverrLabelsFound.length}/${dutchLabels.length} Dutch labels`);
    if (fiverrErrors.length > 0) {
      console.log('❌ Found error terms:', fiverrErrors);
    }
    
    results.tests.push({
      test: 'Fiverr NL',
      dutchLabelsFound: fiverrLabelsFound.length,
      errorTermsFound: fiverrErrors
    });

    // Test 4: Upwork NL
    console.log('\n=== Test 4: Upwork Platform Detail (Nederlands) ===');
    await page.goto('http://localhost:3000/nl/platforms/upwork', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    
    const screenshotPath4 = '.playwright-mcp/platform-detail-upwork-nl.png';
    await page.screenshot({ path: screenshotPath4, fullPage: true });
    results.screenshots.push(screenshotPath4);
    console.log('✓ Screenshot saved:', screenshotPath4);
    
    const upworkContent = await page.content();
    const upworkLabelsFound = dutchLabels.filter(label => upworkContent.includes(label));
    const upworkErrors = errorTerms.filter(term => upworkContent.includes(term));
    
    console.log(`✓ Found ${upworkLabelsFound.length}/${dutchLabels.length} Dutch labels`);
    if (upworkErrors.length > 0) {
      console.log('❌ Found error terms:', upworkErrors);
    }
    
    results.tests.push({
      test: 'Upwork NL',
      dutchLabelsFound: upworkLabelsFound.length,
      errorTermsFound: upworkErrors
    });

  } catch (error) {
    console.error('Test error:', error);
    results.error = error.message;
  } finally {
    await browser.close();
  }
  
  return results;
}

const results = await testPlatformDetails();
console.log('\n=== FINAL RESULTS ===');
console.log(JSON.stringify(results, null, 2));
