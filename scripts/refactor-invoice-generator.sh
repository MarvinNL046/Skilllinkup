#!/bin/bash

# Script to refactor Invoice Generator with translations
# This script applies all translation replacements

FILE="app/[locale]/tools/invoice-generator/page.tsx"

echo "Refactoring Invoice Generator..."

# Hero section
sed -i 's/<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Invoice Generator<\/h1>/<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{t('\''hero.title'\'')}<\/h1>/' "$FILE"
sed -i 's/<p className="text-xl text-gray-700 dark:text-gray-300">Create professional invoices instantly\. Save, print, and download as PDF\. Perfect for freelancers and small businesses\.<\/p>/<p className="text-xl text-gray-700 dark:text-gray-300">{t('\''hero.subtitle'\'')} {t('\''hero.tagline'\'')}<\/p>/' "$FILE"

# Invoice Details Card
sed -i 's/<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Invoice Details<\/h2>/<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('\''invoiceDetails.title'\'')}<\/h2>/' "$FILE"
sed -i 's/<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Invoice Number<\/label>/<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('\''invoiceDetails.invoiceNumber'\'')}<\/label>/' "$FILE"
sed -i 's/placeholder="INV-2025-0001"/placeholder={t('\''invoiceDetails.invoiceNumberPlaceholder'\'')}/' "$FILE"
sed -i 's/<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Invoice Date<\/label>/<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('\''invoiceDetails.invoiceDate'\'')}<\/label>/' "$FILE"
sed -i 's/<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Due Date<\/label>/<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('\''invoiceDetails.dueDate'\'')}<\/label>/' "$FILE"
sed -i 's/<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Currency<\/label>/<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('\''invoiceDetails.currency'\'')}<\/label>/' "$FILE"
sed -i 's/title="Generate"/title={t('\''invoiceDetails.generate'\'')}/' "$FILE"

echo "✓ Hero and Invoice Details sections updated"

# From Details Card
sed -i 's/<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">From (Your Details)<\/h2>/<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('\''from.title'\'')}<\/h2>/' "$FILE"
sed -i 's/Upload Logo/{t('\''from.uploadLogo'\'')}/' "$FILE"
sed -i 's/Max 2MB/{t('\''from.logoMaxSize'\'')}/' "$FILE"
sed -i 's/alt="Company Logo"/alt={t('\''from.logoAlt'\'')}/' "$FILE"
sed -i 's/Remove Logo/{t('\''from.removeLogo'\'')}/' "$FILE"
sed -i 's/placeholder="Your Name \/ Company Name"/placeholder={t('\''from.namePlaceholder'\'')}/' "$FILE"
sed -i 's/placeholder="Address"/placeholder={t('\''from.addressPlaceholder'\'')}/' "$FILE"
sed -i 's/placeholder="City"/placeholder={t('\''from.cityPlaceholder'\'')}/' "$FILE"
sed -i 's/placeholder="Postal Code"/placeholder={t('\''from.postalCodePlaceholder'\'')}/' "$FILE"
sed -i 's/placeholder="Country"/placeholder={t('\''from.countryPlaceholder'\'')}/' "$FILE"
sed -i 's/placeholder="Email"/placeholder={t('\''from.emailPlaceholder'\'')}/' "$FILE"
sed -i 's/placeholder="Phone"/placeholder={t('\''from.phonePlaceholder'\'')}/' "$FILE"
sed -i 's/placeholder="Tax\/VAT Number (optional)"/placeholder={t('\''from.taxNumberPlaceholder'\'')}/' "$FILE"

echo "✓ From Details section updated"

# To Details Card
sed -i 's/<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">To (Client Details)<\/h2>/<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('\''to.title'\'')}<\/h2>/' "$FILE"
sed -i 's/placeholder="Client Name \/ Company"/placeholder={t('\''to.namePlaceholder'\'')}/' "$FILE"

echo "✓ To Details section updated"

# Line Items Card
sed -i 's/<h2 className="text-xl font-bold text-gray-900 dark:text-white">Line Items<\/h2>/<h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('\''lineItems.title'\'')}<\/h2>/' "$FILE"
sed -i 's/Add Item/{t('\''lineItems.addItem'\'')}/' "$FILE"
sed -i 's/placeholder="Description"/placeholder={t('\''lineItems.descriptionPlaceholder'\'')}/' "$FILE"
sed -i 's/placeholder="Qty"/placeholder={t('\''lineItems.qtyPlaceholder'\'')}/' "$FILE"
sed -i 's/placeholder="Rate"/placeholder={t('\''lineItems.ratePlaceholder'\'')}/' "$FILE"

echo "✓ Line Items section updated"

# Calculations Card
sed -i 's/<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Calculations<\/h2>/<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('\''calculations.title'\'')}<\/h2>/' "$FILE"
sed -i 's/<span className="text-gray-600 dark:text-gray-300">Subtotal<\/span>/<span className="text-gray-600 dark:text-gray-300">{t('\''calculations.subtotal'\'')}<\/span>/' "$FILE"
sed -i 's/<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tax\/VAT Rate<\/label>/<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('\''calculations.taxRate'\'')}<\/label>/' "$FILE"
sed -i 's/<span className="text-gray-600 dark:text-gray-300">Tax Amount<\/span>/<span className="text-gray-600 dark:text-gray-300">{t('\''calculations.taxAmount'\'')}<\/span>/' "$FILE"
sed -i 's/<span className="text-lg font-bold text-gray-900 dark:text-white">Total<\/span>/<span className="text-lg font-bold text-gray-900 dark:text-white">{t('\''calculations.total'\'')}<\/span>/' "$FILE"

echo "✓ Calculations section updated"

# Additional Information Card
sed -i 's/<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Additional Information<\/h2>/<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('\''additional.title'\'')}<\/h2>/' "$FILE"
sed -i 's/<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Notes<\/label>/<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('\''additional.notesLabel'\'')}<\/label>/' "$FILE"
sed -i 's/placeholder="Additional notes or terms\.\.\."/placeholder={t('\''additional.notesPlaceholder'\'')}/' "$FILE"
sed -i 's/<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Payment Instructions<\/label>/<label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t('\''additional.paymentLabel'\'')}<\/label>/' "$FILE"
sed -i 's/placeholder="Bank details, payment methods, etc\.\.\."/placeholder={t('\''additional.paymentPlaceholder'\'')}/' "$FILE"

echo "✓ Additional Information section updated"

# Actions Card
sed -i 's/<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Actions<\/h2>/<h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{t('\''actions.title'\'')}<\/h2>/' "$FILE"
sed -i 's/Save Invoice/{t('\''actions.save'\'')}/' "$FILE"
sed -i 's/Load Invoice/{t('\''actions.load'\'')}/' "$FILE"
sed -i 's/Print \/ PDF/{t('\''actions.print'\'')}/' "$FILE"
sed -i 's/Clear Form/{t('\''actions.clear'\'')}/' "$FILE"

echo "✓ Actions section updated"

# Preview Section
sed -i 's/<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">INVOICE<\/h1>/<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('\''preview.title'\'')}<\/h1>/' "$FILE"
sed -i 's/<h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">From<\/h3>/<h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">{t('\''preview.from'\'')}<\/h3>/' "$FILE"
sed -i 's/{yourDetails\.name || '\''Your Name'\''}/ {yourDetails.name || t('\''preview.yourName'\'')}/' "$FILE"
sed -i 's/VAT: /{t('\''preview.vat'\'')} /' "$FILE"
sed -i 's/Date: /{t('\''preview.date'\'')} /' "$FILE"
sed -i 's/Due: /{t('\''preview.due'\'')} /' "$FILE"
sed -i 's/<h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Bill To<\/h3>/<h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">{t('\''to.billTo'\'')}<\/h3>/' "$FILE"
sed -i 's/{clientDetails\.name || '\''Client Name'\''}/ {clientDetails.name || t('\''to.nameDefault'\'')}/' "$FILE"

echo "✓ Preview section updated"

# Table headers
sed -i 's/<th className="text-left py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Description<\/th>/<th className="text-left py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{t('\''table.description'\'')}<\/th>/' "$FILE"
sed -i 's/<th className="text-center py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Qty<\/th>/<th className="text-center py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{t('\''table.qty'\'')}<\/th>/' "$FILE"
sed -i 's/<th className="text-right py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Rate<\/th>/<th className="text-right py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{t('\''table.rate'\'')}<\/th>/' "$FILE"
sed -i 's/<th className="text-right py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Amount<\/th>/<th className="text-right py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">{t('\''table.amount'\'')}<\/th>/' "$FILE"
sed -i 's/{item\.description || '\''Service description'\''}/ {item.description || t('\''lineItems.serviceDescription'\'')}/' "$FILE"

echo "✓ Table section updated"

# Preview totals
sed -i 's/<span>Subtotal:<\/span>/<span>{t('\''preview.subtotal'\'')}<\/span>/' "$FILE"
sed -i 's/<span>Tax ({taxRate}%):<\/span>/<span>{t('\''preview.taxPrefix'\'')} ({taxRate}%):<\/span>/' "$FILE"
sed -i 's/<span>Total:<\/span>/<span>{t('\''preview.total'\'')}<\/span>/' "$FILE"
sed -i 's/<h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Notes<\/h4>/<h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">{t('\''preview.notes'\'')}<\/h4>/' "$FILE"
sed -i 's/<h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">Payment Instructions<\/h4>/<h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">{t('\''preview.payment'\'')}<\/h4>/' "$FILE"

echo "✓ Preview totals updated"

# Modal
sed -i 's/<h3 className="text-xl font-bold text-gray-900 dark:text-white">Load Saved Invoice<\/h3>/<h3 className="text-xl font-bold text-gray-900 dark:text-white">{t('\''modal.title'\'')}<\/h3>/' "$FILE"
sed -i 's/<p className="text-gray-600 dark:text-gray-400 text-center py-8">No saved invoices yet\.<\/p>/<p className="text-gray-600 dark:text-gray-400 text-center py-8">{t('\''modal.empty'\'')}<\/p>/' "$FILE"
sed -i 's/<p>To: {invoice\.to\.name}<\/p>/<p>{t('\''modal.to'\'')} {invoice.to.name}<\/p>/' "$FILE"
sed -i 's/<p className="font-semibold text-primary">Total: /<p className="font-semibold text-primary">{t('\''modal.total'\'')} /' "$FILE"

echo "✓ Modal section updated"

# Messages
sed -i "s/setSaveMessage('Please fill in required fields')/setSaveMessage(t('messages.requiredFields'))/" "$FILE"
sed -i "s/setSaveMessage('Invoice saved successfully!')/setSaveMessage(t('messages.saved'))/" "$FILE"
sed -i "s/setSaveMessage('Image must be less than 2MB')/setSaveMessage(t('messages.imageSize'))/" "$FILE"
sed -i "s/setSaveMessage('Please select a valid image file')/setSaveMessage(t('messages.invalidImage'))/" "$FILE"
sed -i "s/confirm('Clear all fields? This will reset the invoice.')/confirm(t('messages.clearConfirm'))/" "$FILE"

echo "✓ Messages updated"

# Date localization
sed -i "s/{new Date(invoiceDate)\.toLocaleDateString()}/ {new Date(invoiceDate).toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-US')}/" "$FILE"
sed -i "s/{new Date(dueDate)\.toLocaleDateString()}/ {new Date(dueDate).toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-US')}/" "$FILE"
sed -i "s/{new Date(invoice\.date)\.toLocaleDateString()}/ {new Date(invoice.date).toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-US')}/" "$FILE"

echo "✓ Date localization updated"

echo ""
echo "✅ Invoice Generator refactoring complete!"
echo "Run 'npm run build' to test the changes"
