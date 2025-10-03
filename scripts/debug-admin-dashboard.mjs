import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function debugAdminDashboard() {
  console.log('Starting Playwright browser...');
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  // Listen for console messages
  page.on('console', msg => {
    console.log('BROWSER LOG:', msg.type(), msg.text());
  });

  // Listen for errors
  page.on('pageerror', error => {
    console.error('PAGE ERROR:', error.message);
  });

  try {
    console.log('\n1. Navigating to admin dashboard...');
    await page.goto('http://localhost:3002', { waitUntil: 'networkidle' });

    console.log('Current URL:', page.url());
    console.log('Page title:', await page.title());

    // Take screenshot of current page
    const screenshotPath1 = join(__dirname, '../debug-screenshot-1-initial.png');
    await page.screenshot({ path: screenshotPath1, fullPage: true });
    console.log(`\nScreenshot saved: ${screenshotPath1}`);

    // Check if we're on sign-in page
    if (page.url().includes('sign-in')) {
      console.log('\n2. On sign-in page, looking for Google OAuth button...');

      // Wait for the page to load
      await page.waitForTimeout(2000);

      // Try to find and click Google button
      const googleButton = await page.locator('button:has-text("Google")').or(
        page.locator('button:has-text("Continue with Google")')
      ).or(
        page.locator('[data-provider="google"]')
      ).first();

      if (await googleButton.isVisible().catch(() => false)) {
        console.log('Found Google button, clicking...');
        await googleButton.click();
        await page.waitForTimeout(3000);

        const screenshotPath2 = join(__dirname, '../debug-screenshot-2-after-google-click.png');
        await page.screenshot({ path: screenshotPath2, fullPage: true });
        console.log(`Screenshot saved: ${screenshotPath2}`);
      } else {
        console.log('Google button not found. Available buttons:');
        const buttons = await page.locator('button').all();
        for (const btn of buttons) {
          const text = await btn.textContent().catch(() => '');
          console.log('  -', text);
        }
      }
    }

    // Wait for potential navigation
    await page.waitForTimeout(2000);

    console.log('\n3. Checking current page state...');
    console.log('Final URL:', page.url());

    // Take final screenshot
    const screenshotPath3 = join(__dirname, '../debug-screenshot-3-final.png');
    await page.screenshot({ path: screenshotPath3, fullPage: true });
    console.log(`Screenshot saved: ${screenshotPath3}`);

    // Check for Tailwind classes
    console.log('\n4. Inspecting HTML for Tailwind classes...');
    const htmlContent = await page.content();

    // Check if Tailwind classes exist
    const hasTailwindClasses = htmlContent.includes('grid') ||
                                htmlContent.includes('md:grid-cols') ||
                                htmlContent.includes('lg:grid-cols');
    console.log('Contains Tailwind grid classes:', hasTailwindClasses);

    // Check for specific dashboard elements
    const hasStatsCards = htmlContent.includes('Total Posts') ||
                          htmlContent.includes('Published') ||
                          htmlContent.includes('Stats');
    console.log('Contains stats cards:', hasStatsCards);

    // Check computed styles of main container
    if (hasStatsCards) {
      console.log('\n5. Checking computed styles...');

      const gridElements = await page.locator('.grid, [class*="grid"]').all();
      console.log(`Found ${gridElements.length} elements with grid classes`);

      for (let i = 0; i < Math.min(gridElements.length, 5); i++) {
        const element = gridElements[i];
        const className = await element.getAttribute('class');
        const display = await element.evaluate(el => window.getComputedStyle(el).display);
        const gridTemplateColumns = await element.evaluate(el => window.getComputedStyle(el).gridTemplateColumns);

        console.log(`\nGrid element ${i + 1}:`);
        console.log('  Class:', className);
        console.log('  Display:', display);
        console.log('  Grid template columns:', gridTemplateColumns);
      }
    }

    // Check if Tailwind CSS is loaded
    console.log('\n6. Checking if Tailwind CSS is loaded...');
    const stylesheets = await page.evaluate(() => {
      return Array.from(document.styleSheets).map(sheet => {
        try {
          return {
            href: sheet.href,
            rules: sheet.cssRules?.length || 0
          };
        } catch (e) {
          return { href: sheet.href, error: 'Cannot access' };
        }
      });
    });

    console.log('Loaded stylesheets:');
    stylesheets.forEach(sheet => {
      console.log('  -', sheet.href, `(${sheet.rules} rules)`);
    });

    // Check console for errors
    console.log('\n7. Checking browser console...');
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    if (errors.length > 0) {
      console.log('Console errors found:');
      errors.forEach(err => console.log('  -', err));
    } else {
      console.log('No console errors detected');
    }

    console.log('\n8. Inspecting page HTML structure...');
    const bodyClasses = await page.evaluate(() => document.body.className);
    console.log('Body classes:', bodyClasses);

    const hasMainContent = await page.locator('main').count();
    console.log('Has <main> element:', hasMainContent > 0);

    console.log('\nDebug complete! Check the screenshots in the project root.');
    console.log('Press Ctrl+C to close the browser...');

    // Keep browser open for manual inspection
    await page.waitForTimeout(60000);

  } catch (error) {
    console.error('Error during debugging:', error);
  } finally {
    await browser.close();
  }
}

debugAdminDashboard().catch(console.error);
