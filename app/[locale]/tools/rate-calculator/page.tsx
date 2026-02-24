'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MoneyBiiPromo } from '@/components/MoneyBiiPromo';
import { Calculator, ArrowLeft, Info, DollarSign, Clock, TrendingUp, Calendar } from 'lucide-react';

export default function RateCalculatorPage() {
 const t = useTranslations('rateCalculator');
 const locale = useLocale();

 // Input states
 const [desiredIncome, setDesiredIncome] = useState<number>(50000);
 const [billableHours, setBillableHours] = useState<number>(1600);
 const [businessExpenses, setBusinessExpenses] = useState<number>(10000);
 const [taxRate, setTaxRate] = useState<number>(35);
 const [bufferPercent, setBufferPercent] = useState<number>(20);
 const [vacationWeeks, setVacationWeeks] = useState<number>(4);
 const [currency, setCurrency] = useState<'$' | '€' | '£'>('$');

 // Custom hourly rate mode
 const [useCustomRate, setUseCustomRate] = useState<boolean>(false);
 const [customHourlyRate, setCustomHourlyRate] = useState<number>(50);

 // Calculations
 const totalNeeded = desiredIncome + businessExpenses;
 const withBuffer = totalNeeded * (1 + bufferPercent / 100);
 const withTax = withBuffer / (1 - taxRate / 100);
 const calculatedHourlyRate = withTax / billableHours;

 // Use custom rate if enabled, otherwise use calculated rate
 const hourlyRate = useCustomRate ? customHourlyRate : calculatedHourlyRate;

 // Additional calculations
 const dayRate = hourlyRate * 8;
 const weekRate = hourlyRate * 40;
 const monthlyIncome = withTax / 12;
 const workingWeeks = 52 - vacationWeeks;
 const weeklyIncome = withTax / workingWeeks;

 // Project calculations
 const [projectHours, setProjectHours] = useState<number>(40);
 const projectPrice = projectHours * hourlyRate;

 // Breakdown
 const hourlyRateBeforeTax = withBuffer / billableHours;
 const taxPerHour = hourlyRate - hourlyRateBeforeTax;

 // Preset scenarios
 const presets = {
 junior: { income: 35000, hours: 1500, expenses: 5000, tax: 25, buffer: 15 },
 medior: { income: 60000, hours: 1600, expenses: 10000, tax: 35, buffer: 20 },
 senior: { income: 90000, hours: 1700, expenses: 15000, tax: 40, buffer: 25 },
 };

 const applyPreset = (preset: keyof typeof presets) =>{
 const p = presets[preset];
 setDesiredIncome(p.income);
 setBillableHours(p.hours);
 setBusinessExpenses(p.expenses);
 setTaxRate(p.tax);
 setBufferPercent(p.buffer);
 setUseCustomRate(false); // Disable custom rate mode when using presets
 };

 const formatCurrency = (amount: number) =>{
 const localeCode = locale === 'nl' ? 'nl-NL' : 'en-US';
 return `${currency}${Math.ceil(amount).toLocaleString(localeCode)}`;
 };

 return (
 <>
 <Header />
 <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
 {/* Breadcrumb */}
 <section className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
 <div className="container mx-auto px-4 py-4">
 <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
 <Link href={`/${locale}`} className="hover:text-primary transition-colors">
 {t('breadcrumb.home')}
 </Link>
 <span>{t('breadcrumb.separator')}</span>
 <Link href={`/${locale}/tools`} className="hover:text-primary transition-colors">
 {t('breadcrumb.tools')}
 </Link>
 <span>{t('breadcrumb.separator')}</span>
 <span className="text-gray-900 dark:text-white font-semibold">{t('breadcrumb.title')}</span>
 </div>
 </div>
 </section>

 {/* Hero */}
 <section className="bg-white dark:bg-slate-800 py-16 sm:py-20">
 <div className="container mx-auto px-4">
 <div className="max-w-3xl mx-auto text-center">
 <div className="flex items-center justify-center gap-3 mb-6">
 <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
 <Calculator className="w-7 h-7 text-white" />
 </div>
 </div>

 <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
 {t('hero.title')}
 </h1>
 <p className="text-xl text-gray-700 dark:text-gray-300">
 {t('hero.description')}
 </p>
 </div>
 </div>
 </section>

 {/* Main Content */}
 <section className="container mx-auto px-4 py-12">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
 {/* Input Section */}
 <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">
 <div className="flex items-center justify-between mb-6">
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
 {t('inputs.title')}
 </h2>

 {/* Currency Selector */}
 <div className="flex items-center gap-2">
 {(['$', '€', '£'] as const).map((curr) =>(
 <button
 key={curr}
 onClick={() =>setCurrency(curr)}
 className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
 currency === curr
 ? 'bg-primary text-white'
 : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
 }`}
 >
 {curr}
 </button>
 ))}
 </div>
 </div>

 {/* Preset Buttons */}
 <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
 <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">{t('inputs.quickPresets')}</p>
 <div className="grid grid-cols-3 gap-2">
 <button
 onClick={() =>applyPreset('junior')}
 className="px-4 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white hover:border-primary transition-colors"
 >
 {t('inputs.presetJunior')}
 </button>
 <button
 onClick={() =>applyPreset('medior')}
 className="px-4 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white hover:border-primary transition-colors"
 >
 {t('inputs.presetMedior')}
 </button>
 <button
 onClick={() =>applyPreset('senior')}
 className="px-4 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white hover:border-primary transition-colors"
 >
 {t('inputs.presetSenior')}
 </button>
 </div>
 </div>

 {/* Custom Hourly Rate */}
 <div className="mb-6">
 <div className="flex items-center justify-between mb-2">
 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
 {t('inputs.customRateLabel')}
 </label>
 <button
 onClick={() =>{
 setUseCustomRate(!useCustomRate);
 if (!useCustomRate) {
 setCustomHourlyRate(Math.ceil(calculatedHourlyRate));
 }
 }}
 className={`px-3 py-1 text-xs rounded-lg font-semibold transition-colors ${
 useCustomRate
 ? 'bg-primary text-white'
 : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
 }`}
 >
 {useCustomRate ? t('inputs.customRateActive') : t('inputs.customRateEnable')}
 </button>
 </div>
 <div className="relative">
 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
 {currency}
 </span>
 <input
 type="number"
 value={customHourlyRate}
 onChange={(e) =>{
 setCustomHourlyRate(Number(e.target.value));
 if (!useCustomRate) setUseCustomRate(true);
 }}
 min="1"
 max="500"
 step="1"
 disabled={!useCustomRate}
 className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
 useCustomRate
 ? 'bg-white dark:bg-slate-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'
 : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
 }`}
 placeholder={t('inputs.customRatePlaceholder')}
 />
 </div>
 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
 {useCustomRate
 ? t('inputs.customRateHelpEnabled')
 : t('inputs.customRateHelpDisabled')}
 </p>
 </div>

 <div className="space-y-6">
 {/* Desired Income */}
 <div>
 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
 {t('inputs.labelDesiredIncome')}
 </label>
 <div className="relative">
 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
 {currency}
 </span>
 <input
 type="number"
 value={desiredIncome}
 onChange={(e) =>{
 setDesiredIncome(Number(e.target.value));
 if (useCustomRate) setUseCustomRate(false);
 }}
 className="w-full pl-8 pr-4 py-3 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 </div>
 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
 {t('inputs.helpDesiredIncome')}
 </p>
 </div>

 {/* Billable Hours */}
 <div>
 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
 {t('inputs.labelBillableHours')}
 </label>
 <input
 type="number"
 value={billableHours}
 onChange={(e) =>{
 setBillableHours(Number(e.target.value));
 if (useCustomRate) setUseCustomRate(false);
 }}
 className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
 {t('inputs.helpBillableHours')}
 </p>
 </div>

 {/* Business Expenses */}
 <div>
 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
 {t('inputs.labelBusinessExpenses')}
 </label>
 <div className="relative">
 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
 {currency}
 </span>
 <input
 type="number"
 value={businessExpenses}
 onChange={(e) =>{
 setBusinessExpenses(Number(e.target.value));
 if (useCustomRate) setUseCustomRate(false);
 }}
 className="w-full pl-8 pr-4 py-3 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 </div>
 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
 {t('inputs.helpBusinessExpenses')}
 </p>
 </div>

 {/* Tax Rate */}
 <div>
 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
 {t('inputs.labelTaxRate')}
 </label>
 <div className="flex items-center gap-4">
 <input
 type="range"
 min="0"
 max="50"
 value={taxRate}
 onChange={(e) =>{
 setTaxRate(Number(e.target.value));
 if (useCustomRate) setUseCustomRate(false);
 }}
 className="flex-1"
 />
 <span className="w-16 text-right font-semibold text-gray-900 dark:text-white">
 {taxRate}%
 </span>
 </div>
 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
 {t('inputs.helpTaxRate')}
 </p>
 </div>

 {/* Buffer Percentage */}
 <div>
 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
 {t('inputs.labelSafetyBuffer')}
 </label>
 <div className="flex items-center gap-4">
 <input
 type="range"
 min="0"
 max="50"
 value={bufferPercent}
 onChange={(e) =>{
 setBufferPercent(Number(e.target.value));
 if (useCustomRate) setUseCustomRate(false);
 }}
 className="flex-1"
 />
 <span className="w-16 text-right font-semibold text-gray-900 dark:text-white">
 {bufferPercent}%
 </span>
 </div>
 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
 {t('inputs.helpSafetyBuffer')}
 </p>
 </div>

 {/* Vacation Weeks */}
 <div>
 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
 {t('inputs.labelVacationWeeks')}
 </label>
 <div className="flex items-center gap-4">
 <input
 type="range"
 min="0"
 max="12"
 value={vacationWeeks}
 onChange={(e) =>setVacationWeeks(Number(e.target.value))}
 className="flex-1"
 />
 <span className="w-16 text-right font-semibold text-gray-900 dark:text-white">
 {vacationWeeks} {t('units.weeks')}
 </span>
 </div>
 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
 {t('inputs.helpVacationWeeks')}
 </p>
 </div>
 </div>
 </div>

 {/* Results Section */}
 <div className="space-y-6">
 {/* Main Result Card */}
 <div className="bg-primary text-white rounded-lg shadow-lg p-8">
 <div className="text-center">
 <p className="text-sm font-semibold uppercase tracking-wide mb-2 text-white/80">
 {t('results.mainTitle')}
 </p>
 <div className="text-6xl font-bold mb-4">
 {formatCurrency(hourlyRate)}
 </div>
 <p className="text-white/90">
 {t('results.perHour')}
 </p>
 </div>
 </div>

 {/* Additional Rates Grid */}
 <div className="grid grid-cols-2 gap-4">
 <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
 <div className="flex items-center gap-2 mb-2 text-gray-600 dark:text-gray-300">
 <Clock className="w-4 h-4" />
 <p className="text-sm font-semibold">{t('results.dayRate')}</p>
 </div>
 <p className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(dayRate)}</p>
 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('results.dayHours')}</p>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
 <div className="flex items-center gap-2 mb-2 text-gray-600 dark:text-gray-300">
 <Calendar className="w-4 h-4" />
 <p className="text-sm font-semibold">{t('results.weekRate')}</p>
 </div>
 <p className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(weekRate)}</p>
 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('results.weekHours')}</p>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
 <div className="flex items-center gap-2 mb-2 text-gray-600 dark:text-gray-300">
 <DollarSign className="w-4 h-4" />
 <p className="text-sm font-semibold">{t('results.monthlyIncome')}</p>
 </div>
 <p className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(monthlyIncome)}</p>
 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('results.monthlyAvg')}</p>
 </div>

 <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
 <div className="flex items-center gap-2 mb-2 text-gray-600 dark:text-gray-300">
 <TrendingUp className="w-4 h-4" />
 <p className="text-sm font-semibold">{t('results.weeklyIncome')}</p>
 </div>
 <p className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(weeklyIncome)}</p>
 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{workingWeeks} {t('results.workingWeeks')}</p>
 </div>
 </div>

 {/* Breakdown Card */}
 <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
 {t('breakdown.title')}
 </h3>

 <div className="space-y-3">
 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700">
 <span className="text-sm text-gray-600 dark:text-gray-300">{t('breakdown.desiredIncome')}</span>
 <span className="font-semibold text-gray-900 dark:text-white">
 {formatCurrency(desiredIncome)}
 </span>
 </div>

 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700">
 <span className="text-sm text-gray-600 dark:text-gray-300">{t('breakdown.businessExpenses')}</span>
 <span className="font-semibold text-gray-900 dark:text-white">
 {formatCurrency(businessExpenses)}
 </span>
 </div>

 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700">
 <span className="text-sm text-gray-600 dark:text-gray-300">{t('breakdown.subtotal')}</span>
 <span className="font-semibold text-gray-900 dark:text-white">
 {formatCurrency(totalNeeded)}
 </span>
 </div>

 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700">
 <span className="text-sm text-gray-600 dark:text-gray-300">{t('breakdown.safetyBuffer')} ({bufferPercent}%)</span>
 <span className="font-semibold text-gray-900 dark:text-white">
 {formatCurrency(withBuffer - totalNeeded)}
 </span>
 </div>

 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700">
 <span className="text-sm text-gray-600 dark:text-gray-300">{t('breakdown.subtotalWithBuffer')}</span>
 <span className="font-semibold text-gray-900 dark:text-white">
 {formatCurrency(withBuffer)}
 </span>
 </div>

 <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700">
 <span className="text-sm text-gray-600 dark:text-gray-300">{t('breakdown.taxes')} ({taxRate}%)</span>
 <span className="font-semibold text-gray-900 dark:text-white">
 {formatCurrency(withTax - withBuffer)}
 </span>
 </div>

 <div className="flex items-center justify-between py-3 bg-gray-50 dark:bg-gray-700 -mx-6 px-6 mt-3">
 <span className="font-semibold text-gray-900 dark:text-white">{t('breakdown.totalRevenue')}</span>
 <span className="text-lg font-bold text-primary">
 {formatCurrency(withTax)}
 </span>
 </div>

 <div className="flex items-center justify-between py-2 mt-3">
 <span className="text-sm text-gray-600 dark:text-gray-300">{t('breakdown.billableHours')}</span>
 <span className="font-semibold text-gray-900 dark:text-white">
 {billableHours} {t('units.hours')}
 </span>
 </div>

 <div className="flex items-center justify-between py-3 bg-primary/5 dark:bg-primary/10 -mx-6 px-6 mt-3 rounded-lg">
 <span className="font-bold text-gray-900 dark:text-white">{t('breakdown.hourlyRate')}</span>
 <span className="text-2xl font-bold text-primary">
 {formatCurrency(hourlyRate)}
 </span>
 </div>
 </div>
 </div>

 {/* Project Price Calculator */}
 <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
 {t('project.title')}
 </h3>
 <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
 {t('project.description')}
 </p>

 <div className="space-y-4">
 <div>
 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
 {t('project.hoursLabel')}
 </label>
 <input
 type="number"
 value={projectHours}
 onChange={(e) =>setProjectHours(Number(e.target.value))}
 className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
 placeholder={t('project.hoursPlaceholder')}
 />
 </div>

 <div className="flex items-center justify-between py-3 bg-primary/5 dark:bg-primary/10 px-4 rounded-lg">
 <span className="font-bold text-gray-900 dark:text-white">{t('project.priceLabel')}</span>
 <span className="text-2xl font-bold text-primary">
 {formatCurrency(projectPrice)}
 </span>
 </div>

 <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
 <p>• {projectHours} {t('units.hours')} × {formatCurrency(hourlyRate)}{t('units.perHour')}</p>
 <p>• {t('project.bufferTip')}</p>
 </div>
 </div>
 </div>

 {/* Info Card */}
 <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
 <div className="flex items-start gap-3">
 <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
 <div>
 <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
 {t('tips.title')}
 </h4>
 <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
 <li>• {t('tips.tip1')}</li>
 <li>• {t('tips.tip2')}</li>
 <li>• {t('tips.tip3')}</li>
 <li>• {t('tips.tip4')} ({vacationWeeks} {t('units.weeks')})</li>
 <li>• {t('tips.tip5')}</li>
 <li>• {t('tips.tip6')}</li>
 </ul>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Additional Information Section */}
 <section className="container mx-auto px-4 pb-12">
 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-8">
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
 {t('understanding.title')}
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div>
 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
 {t('understanding.whyTitle')}
 </h3>
 <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
 <p>
 <strong>{t('understanding.incomeLabel')}</strong>{t('understanding.incomeExplain')}
 </p>
 <p>
 <strong>{t('understanding.expensesLabel')}</strong>{t('understanding.expensesExplain')}
 </p>
 <p>
 <strong>{t('understanding.bufferLabel')} ({bufferPercent}%):</strong>{t('understanding.bufferExplain')}
 </p>
 <p>
 <strong>{t('understanding.taxesLabel')} ({taxRate}%):</strong>{t('understanding.taxesExplain')}
 </p>
 <p>
 <strong>{t('understanding.hoursLabel')}</strong>{t('understanding.hoursExplain')}
 </p>
 </div>
 </div>

 <div>
 <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
 {t('quickRef.title')}
 </h3>
 <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
 <p><strong>{t('quickRef.hourly')}</strong>{formatCurrency(hourlyRate)}{t('units.perHour')}</p>
 <p><strong>{t('quickRef.daily')}</strong>{formatCurrency(dayRate)}/day (8 {t('units.hours')})</p>
 <p><strong>{t('quickRef.weekly')}</strong>{formatCurrency(weekRate)}/week (40 {t('units.hours')})</p>
 <p><strong>{t('quickRef.monthly')}</strong>{formatCurrency(monthlyIncome)}/month</p>
 <p><strong>{t('quickRef.annual')}</strong>{formatCurrency(withTax)}</p>
 <p><strong>{t('quickRef.workingWeeks')}</strong>{workingWeeks} {t('quickRef.weeksYear')}</p>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* CTA Section */}
 <section className="bg-primary py-12">
 <div className="container mx-auto px-4 text-center">
 <h2 className="text-2xl font-bold text-white mb-4">
 {t('cta.title')}
 </h2>
 <p className="text-white/90 mb-6 max-w-2xl mx-auto">
 {t('cta.description')}
 </p>
 <div className="flex items-center justify-center gap-4">
 <Link
 href={`/${locale}/tools`}
 className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-gray-100 transition-colors"
 >
 {t('cta.toolsButton')}
 </Link>
 <Link
 href={`/${locale}/guides`}
 className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
 >
 {t('cta.guidesButton')}
 </Link>
 </div>
 </div>
 </section>

 {/* MoneyBii Promo */}
 <div className="container mx-auto px-4 py-8">
 <MoneyBiiPromo variant="subtle" />
 </div>
 </main>
 <Footer />
 </>
 );
}
