import { chromium } from 'playwright';

async function extractTextDetails() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  
  try {
    console.log('\n=== Detailed Text Extraction: Arc NL ===');
    await page.goto('http://localhost:3000/nl/platforms/arc', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);
    
    // Extract visible text from specific selectors
    const quickInfo = await page.locator('h3:has-text("Quick Info"), h3:has-text("Snelle Info")').first().textContent().catch(() => null);
    console.log('Quick Info heading:', quickInfo);
    
    // Get all h3 headings
    const headings = await page.locator('h3').allTextContents();
    console.log('\nAll h3 headings:', headings);
    
    // Get sidebar content
    const sidebarText = await page.locator('.sidebar, aside, [class*="sidebar"]').first().textContent().catch(() => 'No sidebar found');
    console.log('\nSidebar content sample:', sidebarText.substring(0, 500));
    
    // Check for specific labels in the page
    const labels = [
      'Moeilijkheidsgraad',
      'Difficulty',
      'Kosten',
      'Fees',
      'Categorie',
      'Category',
      'Website bezoeken',
      'Visit Website',
      'Belangrijkste kenmerken',
      'Key Features'
    ];
    
    console.log('\n=== Label Check ===');
    for (const label of labels) {
      const count = await page.locator(`text=${label}`).count();
      if (count > 0) {
        console.log(`✓ Found "${label}" (${count} times)`);
      }
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
}

await extractTextDetails();
