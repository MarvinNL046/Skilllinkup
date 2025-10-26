#!/usr/bin/env node

/**
 * FREE Google Translate Rate Calculator Strings (EN → NL)
 *
 * Uses @iamtraction/google-translate package (NO API KEY NEEDED!)
 * Translates all 90 hardcoded strings from the Rate Calculator component.
 */

import translate from '@iamtraction/google-translate';

// All 90 strings from the Rate Calculator
const strings = {
  // Breadcrumb & Navigation (7)
  breadcrumbHome: "Home",
  breadcrumbTools: "Tools",
  breadcrumbRateCalc: "Rate Calculator",
  breadcrumbSeparator: "→",

  // Hero Section (2)
  heroTitle: "Freelance Rate Calculator",
  heroDescription: "Calculate your ideal hourly rate based on your desired income, expenses, and billable hours. This calculator accounts for taxes and a buffer for unexpected costs.",

  // Input Section (4)
  inputTitle: "Your Information",
  quickPresetsLabel: "Quick Presets",
  customRateLabel: "Enter your own hourly rate",
  customRatePlaceholder: "e.g., 45",

  // Preset Buttons (3)
  presetJunior: "Junior",
  presetMedior: "Medior",
  presetSenior: "Senior",

  // Custom Rate States (4)
  customRateActive: "Active",
  customRateEnable: "Enable",
  customRateHelpEnabled: "Using custom rate to calculate your potential income",
  customRateHelpDisabled: "Click Enable to enter your own hourly rate and see your potential income",

  // Form Labels (22 - includes help text)
  labelDesiredIncome: "Desired net annual income",
  helpDesiredIncome: "The amount you want to earn net per year",
  labelBillableHours: "Billable hours per year",
  helpBillableHours: "Typically 1600-1800 hours (40 hours/week, 40-45 weeks/year)",
  labelBusinessExpenses: "Annual business expenses",
  helpBusinessExpenses: "Software, hardware, office, insurance, accountant, etc.",
  labelTaxRate: "Average tax rate",
  helpTaxRate: "Average 25-40% for freelancers (varies by country)",
  labelSafetyBuffer: "Safety buffer",
  helpSafetyBuffer: "Extra buffer for unexpected costs and slower periods",
  labelVacationWeeks: "Vacation weeks per year",
  helpVacationWeeks: "Typical 4-6 weeks per year for work-life balance",

  // Results Section (10)
  resultsMainTitle: "Recommended Hourly Rate",
  resultsPerHour: "per hour",
  resultsDayRate: "Day Rate",
  resultsDayHours: "8 hours",
  resultsWeekRate: "Week Rate",
  resultsWeekHours: "40 hours",
  resultsMonthlyIncome: "Monthly Income",
  resultsMonthlyAvg: "Average per month",
  resultsWeeklyIncome: "Weekly Income",
  resultsWorkingWeeks: "working weeks",

  // Calculation Breakdown (11)
  breakdownTitle: "Calculation Breakdown",
  breakdownDesiredIncome: "Desired net income",
  breakdownBusinessExpenses: "Business expenses",
  breakdownSubtotal: "Subtotal",
  breakdownSafetyBuffer: "Safety buffer",
  breakdownSubtotalWithBuffer: "Subtotal with buffer",
  breakdownTaxes: "Taxes",
  breakdownTotalRevenue: "Total required revenue",
  breakdownBillableHours: "Billable hours",
  breakdownHourlyRate: "Hourly rate",
  breakdownHoursUnit: "hours",

  // Project Calculator (6)
  projectTitle: "Project Price Calculator",
  projectDescription: "Estimate project price based on your hourly rate",
  projectHoursLabel: "Estimated project hours",
  projectPriceLabel: "Project Price",
  projectHoursPlaceholder: "40",
  projectBufferTip: "Consider adding 10-20% buffer for scope changes",

  // Tips Section (7)
  tipsTitle: "Tips for setting your rate",
  tip1: "Compare your rate with the market in your industry",
  tip2: "Consider your experience and expertise level",
  tip3: "Don't start too low - raising rates is harder than lowering them",
  tip4: "Account for vacation + sick leave",
  tip5: "Review and adjust rates annually for inflation",
  tip6: "Different rates for different client types is common",

  // Understanding Your Rate (12)
  understandingTitle: "Understanding Your Rate",
  understandingWhyTitle: "Why this rate?",
  understandingIncomeLabel: "Desired income:",
  understandingIncomeExplain: "Your target take-home pay for the year",
  understandingExpensesLabel: "Business expenses:",
  understandingExpensesExplain: "Tools, software, insurance, office costs",
  understandingBufferLabel: "Safety buffer",
  understandingBufferExplain: "Protection against slow periods and unexpected costs",
  understandingTaxesLabel: "Taxes",
  understandingTaxesExplain: "Income tax, VAT, and other applicable taxes",
  understandingHoursLabel: "Billable hours:",
  understandingHoursExplain: "Not all work hours are billable (admin, sales, etc.)",

  // Quick Reference (8)
  quickRefTitle: "Quick reference",
  quickRefHourly: "Hourly:",
  quickRefDaily: "Daily:",
  quickRefWeekly: "Weekly:",
  quickRefMonthly: "Monthly:",
  quickRefAnnual: "Annual revenue:",
  quickRefWorkingWeeks: "Working weeks:",
  quickRefWeeksYear: "weeks/year",

  // CTA Section (4)
  ctaTitle: "Need more help with your freelance business?",
  ctaDescription: "Discover our other tools and read our comprehensive guides on pricing and freelancing.",
  ctaToolsButton: "More tools",
  ctaGuidesButton: "Read our guides",

  // Units (3)
  unitsWeeks: "weeks",
  unitsHours: "hours",
  unitsPerHour: "/hour",
};

async function translateAllStrings() {
  console.log('🚀 Starting Rate Calculator Translation (EN → NL)');
  console.log('📦 Using FREE Google Translate (@iamtraction/google-translate)');
  console.log(`🔢 Total strings to translate: ${Object.keys(strings).length}\n`);

  const translations = {};
  let successCount = 0;
  let errorCount = 0;

  for (const [key, englishText] of Object.entries(strings)) {
    try {
      // Skip empty strings and symbols
      if (!englishText || englishText === '→') {
        translations[key] = englishText;
        console.log(`⏭️  Skipped: ${key} = "${englishText}"`);
        continue;
      }

      // Translate EN → NL
      const result = await translate(englishText, { from: 'en', to: 'nl' });
      const dutchText = result.text;

      translations[key] = dutchText;
      successCount++;

      console.log(`✅ ${key}:`);
      console.log(`   EN: ${englishText}`);
      console.log(`   NL: ${dutchText}\n`);

      // Rate limiting: wait 500ms between requests
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      errorCount++;
      console.error(`❌ Error translating ${key}:`, error.message);
      translations[key] = englishText; // Fallback to English
    }
  }

  console.log('\n📊 Translation Summary:');
  console.log(`   ✅ Successfully translated: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📝 Total: ${Object.keys(strings).length}`);

  // Print organized JSON structure
  console.log('\n📋 Translations organized by section:\n');
  console.log(JSON.stringify(translations, null, 2));

  return translations;
}

// Run translation
translateAllStrings().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
