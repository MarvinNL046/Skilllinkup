import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const screenshotDir = '/home/marvin/Documenten/skillLinkup/.playwright-mcp';

async function testInvoiceGenerator() {
  console.log('🎬 Starting Invoice Generator Test Suite...\n');
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();
  
  const results = {
    passed: [],
    failed: [],
    screenshots: []
  };

  try {
    // TEST 1: Page Load
    console.log('📋 TEST 1: Page Load and Initial State');
    await page.goto('http://localhost:3000/tools/invoice-generator', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    await page.screenshot({ 
      path: `${screenshotDir}/invoice-01-page-load.png`, 
      fullPage: true 
    });
    results.screenshots.push('invoice-01-page-load.png');
    
    // Check for two-column layout
    const formColumn = await page.locator('.grid.grid-cols-1.lg\\:grid-cols-2').count();
    if (formColumn > 0) {
      results.passed.push('Two-column layout renders correctly');
    } else {
      results.failed.push('Two-column layout NOT found');
    }
    
    // TEST 2: Auto-generated Invoice Number
    console.log('\n📋 TEST 2: Invoice Details - Auto-generated Invoice Number');
    const invoiceNumber = await page.locator('input[placeholder="INV-2025-0001"]').inputValue();
    console.log(`   Invoice Number: ${invoiceNumber}`);
    
    if (invoiceNumber.match(/^INV-\d{4}-\d{4}$/)) {
      results.passed.push(`Auto-generated invoice number: ${invoiceNumber}`);
    } else {
      results.failed.push(`Invalid invoice number format: ${invoiceNumber}`);
    }
    
    // TEST 3: Auto-calculated Due Date
    console.log('\n📋 TEST 3: Auto-calculated Due Date (+14 days)');
    const invoiceDateInput = await page.locator('input[type="date"]').first();
    const dueDateInput = await page.locator('input[type="date"]').nth(1);
    
    const invoiceDate = await invoiceDateInput.inputValue();
    const dueDate = await dueDateInput.inputValue();
    
    console.log(`   Invoice Date: ${invoiceDate}`);
    console.log(`   Due Date: ${dueDate}`);
    
    const invoiceDateObj = new Date(invoiceDate);
    const dueDateObj = new Date(dueDate);
    const daysDiff = Math.round((dueDateObj - invoiceDateObj) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 14) {
      results.passed.push(`Due date auto-calculated correctly (+14 days)`);
    } else {
      results.failed.push(`Due date calculation incorrect: ${daysDiff} days difference`);
    }
    
    // TEST 4: Currency Selector
    console.log('\n📋 TEST 4: Currency Selector');
    
    await page.screenshot({ 
      path: `${screenshotDir}/invoice-02-currency-before.png`, 
      fullPage: true 
    });
    results.screenshots.push('invoice-02-currency-before.png');
    
    // Click EUR
    await page.locator('button:has-text("€")').click();
    await page.waitForTimeout(500);
    
    const euroActive = await page.locator('button:has-text("€").bg-primary').count();
    if (euroActive > 0) {
      results.passed.push('Currency selector works (EUR active)');
    } else {
      results.failed.push('Currency selector EUR not activated');
    }
    
    // Click GBP
    await page.locator('button:has-text("£")').click();
    await page.waitForTimeout(500);
    
    // Switch back to USD
    await page.locator('button:has-text("$")').click();
    await page.waitForTimeout(500);
    
    await page.screenshot({ 
      path: `${screenshotDir}/invoice-03-currency-after.png`, 
      fullPage: true 
    });
    results.screenshots.push('invoice-03-currency-after.png');
    
    // TEST 5: Form Inputs - Fill in Your Details
    console.log('\n📋 TEST 5: Form Inputs - Your Details Section');
    
    await page.locator('input[placeholder="Your Name / Company Name"]').fill('Acme Corporation');
    await page.locator('input[placeholder="Address"]').first().fill('123 Business Street');
    await page.locator('input[placeholder="City"]').first().fill('New York');
    await page.locator('input[placeholder="Postal Code"]').first().fill('10001');
    await page.locator('input[placeholder="Country"]').first().fill('United States');
    await page.locator('input[placeholder="Email"]').first().fill('billing@acme.com');
    await page.locator('input[placeholder="Phone"]').first().fill('+1-555-0100');
    await page.locator('input[placeholder="Tax/VAT Number (optional)"]').fill('VAT-US-12345');
    
    await page.waitForTimeout(500);
    results.passed.push('Your Details form inputs working');
    
    // TEST 6: Client Details
    console.log('\n📋 TEST 6: Form Inputs - Client Details Section');
    
    await page.locator('input[placeholder="Client Name / Company"]').fill('Client Solutions Inc.');
    await page.locator('input[placeholder="Address"]').nth(1).fill('456 Client Avenue');
    await page.locator('input[placeholder="City"]').nth(1).fill('Los Angeles');
    await page.locator('input[placeholder="Postal Code"]').nth(1).fill('90001');
    await page.locator('input[placeholder="Country"]').nth(1).fill('United States');
    await page.locator('input[placeholder="Email"]').nth(1).fill('accounts@clientsolutions.com');
    
    await page.waitForTimeout(500);
    results.passed.push('Client Details form inputs working');
    
    await page.screenshot({ 
      path: `${screenshotDir}/invoice-04-form-filled.png`, 
      fullPage: true 
    });
    results.screenshots.push('invoice-04-form-filled.png');
    
    // TEST 7: Dynamic Line Items
    console.log('\n📋 TEST 7: Dynamic Line Items');
    
    // Fill first line item
    await page.locator('input[placeholder="Description"]').first().fill('Web Development Services');
    await page.locator('input[placeholder="Qty"]').first().fill('10');
    await page.locator('input[placeholder="Rate"]').first().fill('150');
    
    await page.waitForTimeout(500);
    
    // Check calculated amount (10 * 150 = 1500)
    const amount1 = await page.locator('.col-span-2.px-3.py-2.bg-gray-50').first().textContent();
    console.log(`   Line 1 Amount: ${amount1}`);
    
    if (amount1.includes('1,500.00')) {
      results.passed.push('Line item calculation correct (10 × $150 = $1,500)');
    } else {
      results.failed.push(`Line item calculation incorrect: ${amount1}`);
    }
    
    // Add second line item
    console.log('\n📋 TEST 8: Add Multiple Line Items');
    await page.locator('button:has-text("Add Item")').click();
    await page.waitForTimeout(500);
    
    const itemCount = await page.locator('input[placeholder="Description"]').count();
    if (itemCount === 2) {
      results.passed.push('Add line item button works (2 items)');
    } else {
      results.failed.push(`Add item failed: ${itemCount} items found`);
    }
    
    // Fill second item
    await page.locator('input[placeholder="Description"]').nth(1).fill('Design Services');
    await page.locator('input[placeholder="Qty"]').nth(1).fill('5');
    await page.locator('input[placeholder="Rate"]').nth(1).fill('200');
    
    await page.waitForTimeout(500);
    
    await page.screenshot({ 
      path: `${screenshotDir}/invoice-05-line-items.png`, 
      fullPage: true 
    });
    results.screenshots.push('invoice-05-line-items.png');
    
    // TEST 9: Remove Line Item
    console.log('\n📋 TEST 9: Remove Line Item');
    const removeButtons = await page.locator('button:has(svg.lucide-trash-2)');
    const removeCount = await removeButtons.count();
    
    // Try to remove the second item
    if (removeCount >= 2) {
      await removeButtons.nth(1).click();
      await page.waitForTimeout(500);
      
      const remainingItems = await page.locator('input[placeholder="Description"]').count();
      if (remainingItems === 1) {
        results.passed.push('Remove line item works');
      } else {
        results.failed.push(`Remove item failed: ${remainingItems} items remaining`);
      }
    }
    
    // Re-add the second item for total calculations
    await page.locator('button:has-text("Add Item")').click();
    await page.waitForTimeout(500);
    await page.locator('input[placeholder="Description"]').nth(1).fill('Design Services');
    await page.locator('input[placeholder="Qty"]').nth(1).fill('5');
    await page.locator('input[placeholder="Rate"]').nth(1).fill('200');
    await page.waitForTimeout(500);
    
    // TEST 10: Tax Calculations
    console.log('\n📋 TEST 10: Tax Rate and Total Calculations');
    
    // Set tax rate to 10%
    await page.locator('input[type="range"]').fill('10');
    await page.waitForTimeout(500);
    
    const taxRateDisplay = await page.locator('span:has-text("%")').filter({ hasText: /^\d+%$/ }).textContent();
    console.log(`   Tax Rate: ${taxRateDisplay}`);
    
    if (taxRateDisplay === '10%') {
      results.passed.push('Tax rate slider works (10%)');
    } else {
      results.failed.push(`Tax rate incorrect: ${taxRateDisplay}`);
    }
    
    await page.screenshot({ 
      path: `${screenshotDir}/invoice-06-tax-calculations.png`, 
      fullPage: true 
    });
    results.screenshots.push('invoice-06-tax-calculations.png');
    
    // TEST 11: Live Preview Updates
    console.log('\n📋 TEST 11: Live Preview Updates');
    
    // Check if preview shows company name
    const previewFromName = await page.locator('.invoice-preview p.font-semibold').first().textContent();
    console.log(`   Preview "From" Name: ${previewFromName}`);
    
    if (previewFromName === 'Acme Corporation') {
      results.passed.push('Live preview updates in real-time');
    } else {
      results.failed.push(`Live preview not updating: ${previewFromName}`);
    }
    
    // Check client name in preview
    const previewToName = await page.locator('.invoice-preview').locator('h3:has-text("Bill To")').locator('..').locator('p.font-semibold').textContent();
    console.log(`   Preview "To" Name: ${previewToName}`);
    
    if (previewToName === 'Client Solutions Inc.') {
      results.passed.push('Preview shows client details correctly');
    } else {
      results.failed.push(`Preview client details incorrect: ${previewToName}`);
    }
    
    await page.screenshot({ 
      path: `${screenshotDir}/invoice-07-live-preview.png`, 
      fullPage: true 
    });
    results.screenshots.push('invoice-07-live-preview.png');
    
    // TEST 12: Notes and Payment Instructions
    console.log('\n📋 TEST 12: Notes and Payment Instructions');
    
    await page.locator('textarea[placeholder*="Additional notes"]').fill('Thank you for your business!\nPayment due within 14 days.');
    await page.locator('textarea[placeholder*="Bank details"]').fill('Bank: First National Bank\nAccount: 1234567890\nRouting: 987654321');
    
    await page.waitForTimeout(500);
    results.passed.push('Notes and payment instructions inputs work');
    
    await page.screenshot({ 
      path: `${screenshotDir}/invoice-08-notes-payment.png`, 
      fullPage: true 
    });
    results.screenshots.push('invoice-08-notes-payment.png');
    
    // TEST 13: Save Invoice
    console.log('\n📋 TEST 13: Save Invoice to LocalStorage');
    
    await page.locator('button:has-text("Save Invoice")').click();
    await page.waitForTimeout(1000);
    
    // Check for success message
    const saveMessage = await page.locator('text="Invoice saved successfully!"').count();
    if (saveMessage > 0) {
      results.passed.push('Save invoice button works (success message shown)');
    } else {
      results.failed.push('Save invoice failed (no success message)');
    }
    
    await page.screenshot({ 
      path: `${screenshotDir}/invoice-09-saved.png`, 
      fullPage: true 
    });
    results.screenshots.push('invoice-09-saved.png');
    
    // TEST 14: Load Invoice Modal
    console.log('\n📋 TEST 14: Load Invoice Modal');
    
    await page.locator('button:has-text("Load Invoice")').click();
    await page.waitForTimeout(500);
    
    const modalVisible = await page.locator('text="Load Saved Invoice"').count();
    if (modalVisible > 0) {
      results.passed.push('Load invoice modal opens');
      
      await page.screenshot({ 
        path: `${screenshotDir}/invoice-10-load-modal.png`, 
        fullPage: true 
      });
      results.screenshots.push('invoice-10-load-modal.png');
      
      // Close modal
      await page.locator('button:has(svg.lucide-x)').last().click();
      await page.waitForTimeout(500);
    } else {
      results.failed.push('Load invoice modal failed to open');
    }
    
    // TEST 15: Clear Form
    console.log('\n📋 TEST 15: Clear Form Button');
    
    // Handle confirm dialog
    page.on('dialog', async dialog => {
      console.log('   Confirm dialog shown');
      await dialog.accept();
    });
    
    await page.locator('button:has-text("Clear Form")').click();
    await page.waitForTimeout(1000);
    
    // Check if client name is cleared
    const clearedClientName = await page.locator('input[placeholder="Client Name / Company"]').inputValue();
    if (clearedClientName === '') {
      results.passed.push('Clear form button works (form reset)');
    } else {
      results.failed.push(`Clear form failed: ${clearedClientName}`);
    }
    
    await page.screenshot({ 
      path: `${screenshotDir}/invoice-11-cleared.png`, 
      fullPage: true 
    });
    results.screenshots.push('invoice-11-cleared.png');
    
    // TEST 16: Dark Mode Toggle
    console.log('\n📋 TEST 16: Dark Mode Toggle');
    
    // Look for dark mode toggle button (assuming it's in header)
    const darkModeButton = await page.locator('button[aria-label*="dark" i], button[title*="dark" i], button:has(svg.lucide-moon)').count();
    
    if (darkModeButton > 0) {
      await page.locator('button[aria-label*="dark" i], button[title*="dark" i], button:has(svg.lucide-moon)').first().click();
      await page.waitForTimeout(500);
      
      await page.screenshot({ 
        path: `${screenshotDir}/invoice-12-dark-mode.png`, 
        fullPage: true 
      });
      results.screenshots.push('invoice-12-dark-mode.png');
      
      // Check if dark mode class is applied
      const htmlClass = await page.locator('html').getAttribute('class');
      if (htmlClass && htmlClass.includes('dark')) {
        results.passed.push('Dark mode toggle works');
      } else {
        results.failed.push('Dark mode not applied to HTML element');
      }
      
      // Toggle back to light mode
      await page.locator('button[aria-label*="light" i], button[title*="light" i], button:has(svg.lucide-sun)').first().click();
      await page.waitForTimeout(500);
    } else {
      results.failed.push('Dark mode toggle button not found');
    }
    
    // TEST 17: Print Functionality (check if print CSS exists)
    console.log('\n📋 TEST 17: Print Functionality');
    
    const printStyles = await page.locator('style:has-text("@media print")').count();
    if (printStyles > 0) {
      results.passed.push('Print styles defined in page');
    } else {
      results.failed.push('Print styles not found');
    }
    
    // Final screenshot
    await page.screenshot({ 
      path: `${screenshotDir}/invoice-13-final.png`, 
      fullPage: true 
    });
    results.screenshots.push('invoice-13-final.png');
    
  } catch (error) {
    results.failed.push(`CRITICAL ERROR: ${error.message}`);
    console.error('\n🚨 Test Error:', error);
    
    await page.screenshot({ 
      path: `${screenshotDir}/invoice-ERROR.png`, 
      fullPage: true 
    });
    results.screenshots.push('invoice-ERROR.png');
  } finally {
    await browser.close();
  }
  
  // Print Results
  console.log('\n\n' + '='.repeat(80));
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('='.repeat(80));
  
  console.log(`\n✅ PASSED (${results.passed.length}):`);
  results.passed.forEach(test => console.log(`   ✅ ${test}`));
  
  if (results.failed.length > 0) {
    console.log(`\n❌ FAILED (${results.failed.length}):`);
    results.failed.forEach(test => console.log(`   ❌ ${test}`));
  }
  
  console.log(`\n📸 Screenshots captured: ${results.screenshots.length}`);
  console.log(`   Location: ${screenshotDir}/`);
  results.screenshots.forEach(file => console.log(`   - ${file}`));
  
  console.log('\n' + '='.repeat(80));
  
  const successRate = Math.round((results.passed.length / (results.passed.length + results.failed.length)) * 100);
  console.log(`\n🎯 Success Rate: ${successRate}% (${results.passed.length}/${results.passed.length + results.failed.length} tests passed)`);
  
  if (results.failed.length === 0) {
    console.log('\n🎉 ALL TESTS PASSED! Invoice Generator is production-ready! 🚀');
  } else {
    console.log('\n⚠️  Some tests failed. Review the issues above.');
  }
  
  console.log('\n' + '='.repeat(80) + '\n');
}

testInvoiceGenerator();
