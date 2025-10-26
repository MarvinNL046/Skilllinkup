const { chromium } = require('playwright');

async function testNLCategories() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  const urls = [
    'http://localhost:3000/nl/blog/category/ai',
    'http://localhost:3000/nl/blog/category/guides-tutorials',
    'http://localhost:3000/nl/blog/category/remote-work-trends-2025'
  ];
  
  const results = [];
  
  for (const url of urls) {
    try {
      console.log('\n🔍 Testing: ' + url);
      
      const response = await page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      const statusCode = response.status();
      console.log('   HTTP Status: ' + statusCode);
      
      await page.waitForTimeout(2000);
      
      const pageTitle = await page.title();
      const bodyText = await page.textContent('body');
      const is404 = bodyText.includes('404') || bodyText.includes('Not Found') || pageTitle.includes('404');
      
      const h1Text = await page.textContent('h1').catch(() => null);
      
      console.log('   Page Title: ' + pageTitle);
      console.log('   H1 Text: ' + h1Text);
      console.log('   Contains 404: ' + is404);
      
      const categoryName = url.split('/').pop();
      const screenshotPath = './.playwright-mcp/nl-category-' + categoryName + '.png';
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log('   Screenshot: ' + screenshotPath);
      
      results.push({
        url,
        statusCode,
        pageTitle,
        h1Text,
        is404,
        screenshotPath
      });
      
    } catch (error) {
      console.error('   ❌ Error: ' + error.message);
      results.push({
        url,
        error: error.message
      });
    }
  }
  
  await browser.close();
  
  console.log('\n📊 SUMMARY:');
  results.forEach(result => {
    console.log('\n' + result.url);
    if (result.error) {
      console.log('  ❌ Error: ' + result.error);
    } else {
      console.log('  Status: ' + result.statusCode);
      console.log('  Title: ' + result.pageTitle);
      console.log('  H1: ' + result.h1Text);
      console.log('  Is 404: ' + (result.is404 ? 'YES' : 'NO'));
      console.log('  Screenshot: ' + result.screenshotPath);
    }
  });
}

testNLCategories().catch(console.error);
