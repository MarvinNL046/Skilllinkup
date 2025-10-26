#!/usr/bin/env node

/**
 * Refactor Invoice Generator with i18n translations
 *
 * Replaces all hardcoded English strings with translation keys
 *
 * Usage: node scripts/refactor-invoice-i18n.mjs
 */

import fs from 'fs';
import path from 'path';

const FILE_PATH = 'app/[locale]/tools/invoice-generator/page.tsx';

console.log('🔧 Refactoring Invoice Generator with i18n...\n');

// Read the file
let content = fs.readFileSync(FILE_PATH, 'utf8');

// Define all replacements
const replacements = [
  // Invoice Details Card
  ['>Invoice Details<', ">{t('invoiceDetails.title')}<"],
  ['>Invoice Number<', ">{t('invoiceDetails.invoiceNumber')}<"],
  ['placeholder="INV-2025-0001"', "placeholder={t('invoiceDetails.invoiceNumberPlaceholder')}"],
  ['>Invoice Date<', ">{t('invoiceDetails.invoiceDate')}<"],
  ['>Due Date<', ">{t('invoiceDetails.dueDate')}<"],
  ['>Currency<', ">{t('invoiceDetails.currency')}<"],
  ['title="Generate"', "title={t('invoiceDetails.generate')}"],

  // From Details Card
  ['>From (Your Details)<', ">{t('from.title')}<"],
  ['>Upload Logo<', ">{t('from.uploadLogo')}<"],
  ['>Max 2MB<', ">{t('from.logoMaxSize')}<"],
  ['alt="Company Logo"', "alt={t('from.logoAlt')}"],
  ['>Remove Logo<', ">{t('from.removeLogo')}<"],
  ['placeholder="Your Name / Company Name"', "placeholder={t('from.namePlaceholder')}"],
  ['placeholder="Address"', "placeholder={t('from.addressPlaceholder')}"],
  ['placeholder="City"', "placeholder={t('from.cityPlaceholder')}"],
  ['placeholder="Postal Code"', "placeholder={t('from.postalCodePlaceholder')}"],
  ['placeholder="Country"', "placeholder={t('from.countryPlaceholder')}"],
  ['placeholder="Email"', "placeholder={t('from.emailPlaceholder')}"],
  ['placeholder="Phone"', "placeholder={t('from.phonePlaceholder')}"],
  ['placeholder="Tax/VAT Number (optional)"', "placeholder={t('from.taxNumberPlaceholder')}"],

  // To Details Card
  ['>To (Client Details)<', ">{t('to.title')}<"],
  ['placeholder="Client Name / Company"', "placeholder={t('to.namePlaceholder')}"],
  ['>Bill To<', ">{t('to.billTo')}<"],
  ["|| 'Client Name'", "|| t('to.nameDefault')"],

  // Line Items Card
  ['>Line Items<', ">{t('lineItems.title')}<"],
  ['>Add Item<', ">{t('lineItems.addItem')}<"],
  ['placeholder="Description"', "placeholder={t('lineItems.descriptionPlaceholder')}"],
  ['placeholder="Qty"', "placeholder={t('lineItems.qtyPlaceholder')}"],
  ['placeholder="Rate"', "placeholder={t('lineItems.ratePlaceholder')}"],
  ["|| 'Service description'", "|| t('lineItems.serviceDescription')"],

  // Calculations Card
  ['>Calculations<', ">{t('calculations.title')}<"],
  ['>Subtotal<', ">{t('calculations.subtotal')}<"],
  ['>Tax/VAT Rate<', ">{t('calculations.taxRate')}<"],
  ['>Tax Amount<', ">{t('calculations.taxAmount')}<"],
  ['>Total<', ">{t('calculations.total')}<"],

  // Table headers
  ['>Description<', ">{t('table.description')}<"],
  ['>Qty<', ">{t('table.qty')}<"],
  ['>Rate<', ">{t('table.rate')}<"],
  ['>Amount<', ">{t('table.amount')}<"],

  // Additional Information Card
  ['>Additional Information<', ">{t('additional.title')}<"],
  ['>Notes<', ">{t('additional.notesLabel')}<"],
  ['placeholder="Additional notes or terms..."', "placeholder={t('additional.notesPlaceholder')}"],
  ['>Payment Instructions<', ">{t('additional.paymentLabel')}<"],
  ['placeholder="Bank details, payment methods, etc..."', "placeholder={t('additional.paymentPlaceholder')}"],

  // Actions Card
  ['>Actions<', ">{t('actions.title')}<"],
  ['>Save Invoice<', ">{t('actions.save')}<"],
  ['>Load Invoice<', ">{t('actions.load')}<"],
  ['>Print / PDF<', ">{t('actions.print')}<"],
  ['>Clear Form<', ">{t('actions.clear')}<"],

  // Preview Section
  ['>INVOICE<', ">{t('preview.title')}<"],
  ['>From<', ">{t('preview.from')}<"],
  ["|| 'Your Name'", "|| t('preview.yourName')"],
  ['>VAT: ', ">{t('preview.vat')} "],
  ['>Date: ', ">{t('preview.date')} "],
  ['>Due: ', ">{t('preview.due')} "],
  ['>Subtotal:', ">{t('preview.subtotal')}"],
  ['>Tax (', ">{t('preview.taxPrefix')} ("],
  ['>Total:', ">{t('preview.total')}"],

  // Modal
  ['>Load Saved Invoice<', ">{t('modal.title')}<"],
  ['>No saved invoices yet.<', ">{t('modal.empty')}<"],
  ['>To: ', ">{t('modal.to')} "],
  ['>Total: ', ">{t('modal.total')} "],

  // Messages
  ["'Please fill in required fields'", "t('messages.requiredFields')"],
  ["'Invoice saved successfully!'", "t('messages.saved')"],
  ["'Image must be less than 2MB'", "t('messages.imageSize')"],
  ["'Please select a valid image file'", "t('messages.invalidImage')"],
  ["'Clear all fields? This will reset the invoice.'", "t('messages.clearConfirm')"],

  // Date localization (needs special handling)
  ['.toLocaleDateString()}', ".toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-US')}"],
];

let replacedCount = 0;

// Apply all replacements
for (const [oldStr, newStr] of replacements) {
  const regex = new RegExp(oldStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  const matchesCount = (content.match(regex) || []).length;

  if (matchesCount > 0) {
    content = content.replace(regex, newStr);
    console.log(`✓ Replaced "${oldStr}" → "${newStr}" (${matchesCount}x)`);
    replacedCount += matchesCount;
  }
}

// Write the refactored content
fs.writeFileSync(FILE_PATH, content, 'utf8');

console.log(`\n✅ Refactoring complete!`);
console.log(`Total replacements: ${replacedCount}`);
console.log(`\nNext steps:`);
console.log(`1. Review changes: git diff ${FILE_PATH}`);
console.log(`2. Test build: npm run build`);
console.log(`3. Test pages: /en/tools/invoice-generator and /nl/tools/invoice-generator`);
