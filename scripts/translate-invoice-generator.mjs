#!/usr/bin/env node

/**
 * Google Translate Invoice Generator EN → NL
 *
 * Translates all 137 hardcoded English strings in Invoice Generator to Dutch
 * Uses FREE @iamtraction/google-translate package (no API key needed!)
 *
 * Usage: node scripts/translate-invoice-generator.mjs
 */

import translate from '@iamtraction/google-translate';

const strings = {
  // Breadcrumb (3 strings)
  breadcrumbHome: "Home",
  breadcrumbTools: "Tools",
  breadcrumbInvoiceGenerator: "Invoice Generator",

  // Hero Section (3 strings)
  heroTitle: "Invoice Generator",
  heroSubtitle: "Create professional invoices instantly. Save, print, and download as PDF.",
  heroTagline: "Perfect for freelancers and small businesses.",

  // Invoice Details Card (7 strings)
  invoiceDetailsTitle: "Invoice Details",
  invoiceNumberLabel: "Invoice Number",
  invoiceNumberPlaceholder: "INV-2025-0001",
  invoiceDateLabel: "Invoice Date",
  dueDateLabel: "Due Date",
  currencyLabel: "Currency",
  generateButtonTitle: "Generate",

  // From (Your Details) Card (13 strings)
  fromCardTitle: "From (Your Details)",
  uploadLogoButton: "Upload Logo",
  logoMaxSizeText: "Max 2MB",
  logoAltText: "Company Logo",
  removeLogoButton: "Remove Logo",
  yourNamePlaceholder: "Your Name / Company Name",
  addressPlaceholder: "Address",
  cityPlaceholder: "City",
  postalCodePlaceholder: "Postal Code",
  countryPlaceholder: "Country",
  emailPlaceholder: "Email",
  phonePlaceholder: "Phone",
  taxNumberPlaceholder: "Tax/VAT Number (optional)",

  // To (Client Details) Card (9 strings)
  toCardTitle: "To (Client Details)",
  clientNamePlaceholder: "Client Name / Company",
  clientAddressPlaceholder: "Address",
  clientCityPlaceholder: "City",
  clientPostalCodePlaceholder: "Postal Code",
  clientCountryPlaceholder: "Country",
  clientEmailPlaceholder: "Email",
  billToLabel: "Bill To",
  clientNameDefault: "Client Name",

  // Line Items Card (7 strings)
  lineItemsCardTitle: "Line Items",
  addItemButton: "Add Item",
  descriptionPlaceholder: "Description",
  qtyPlaceholder: "Qty",
  ratePlaceholder: "Rate",
  amountPlaceholder: "Amount",
  serviceDescriptionDefault: "Service description",

  // Calculations Card (8 strings)
  calculationsCardTitle: "Calculations",
  subtotalLabel: "Subtotal",
  taxVATRateLabel: "Tax/VAT Rate",
  taxAmountLabel: "Tax Amount",
  totalLabel: "Total",
  qtyTableHeader: "Qty",
  rateTableHeader: "Rate",
  amountTableHeader: "Amount",
  descriptionTableHeader: "Description",

  // Additional Information Card (5 strings)
  additionalInfoCardTitle: "Additional Information",
  notesLabel: "Notes",
  notesPlaceholder: "Additional notes or terms...",
  paymentInstructionsLabel: "Payment Instructions",
  paymentInstructionsPlaceholder: "Bank details, payment methods, etc...",

  // Actions Card (6 strings)
  actionsCardTitle: "Actions",
  saveInvoiceButton: "Save Invoice",
  loadInvoiceButton: "Load Invoice",
  printPDFButton: "Print / PDF",
  clearFormButton: "Clear Form",

  // Invoice Preview Section (11 strings)
  invoicePreviewTitle: "INVOICE",
  fromLabel: "From",
  yourNameDefault: "Your Name",
  vatPrefix: "VAT:",
  datePrefix: "Date:",
  duePrefix: "Due:",
  subtotalSummary: "Subtotal:",
  taxPrefix: "Tax",
  totalSummary: "Total:",
  notesHeading: "Notes",
  paymentInstructionsHeading: "Payment Instructions",

  // Load Modal (4 strings)
  loadSavedInvoiceTitle: "Load Saved Invoice",
  noSavedInvoicesMessage: "No saved invoices yet.",
  loadModalToPrefix: "To:",
  loadModalTotalPrefix: "Total:",

  // Validation & Notification Messages (7 strings)
  requiredFieldsErrorMessage: "Please fill in required fields",
  invoiceSavedSuccessMessage: "Invoice saved successfully!",
  imageSizeErrorMessage: "Image must be less than 2MB",
  invalidImageErrorMessage: "Please select a valid image file",
  clearConfirmationDialog: "Clear all fields? This will reset the invoice.",
  storageLoadErrorMessage: "Error loading from storage:",
  storageSaveErrorMessage: "Error saving to storage:",

  // Default values (2 strings)
  invoiceNumberDefault: "INV-2025-0001",
};

async function translateString(text, key) {
  try {
    console.log(`Translating ${key}...`);
    const result = await translate(text, { from: 'en', to: 'nl' });
    console.log(`  ✓ ${result.text}`);
    return result.text;
  } catch (error) {
    console.error(`  ✗ Error translating ${key}:`, error.message);
    return text; // Return original on error
  }
}

async function main() {
  console.log('🌍 Google Translate Invoice Generator (EN → NL)');
  console.log('================================================\n');
  console.log(`Total strings to translate: ${Object.keys(strings).length}\n`);

  const translations = {};

  for (const [key, text] of Object.entries(strings)) {
    const translation = await translateString(text, key);
    translations[key] = translation;

    // Rate limiting: wait 500ms between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n✅ Translation Complete!');
  console.log('\n📋 Dutch Translations:');
  console.log('======================\n');
  console.log(JSON.stringify(translations, null, 2));

  console.log('\n📝 Next steps:');
  console.log('1. Copy translations to messages/nl.json under "invoiceGenerator"');
  console.log('2. Copy English originals to messages/en.json under "invoiceGenerator"');
  console.log('3. Refactor app/[locale]/tools/invoice-generator/page.tsx to use useTranslations()');
  console.log('4. Update locale-aware formatting (currency, dates)');
  console.log('5. Run: npm run build');
}

main().catch(console.error);
