'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Calculator, ArrowLeft, Info, DollarSign, Clock, TrendingUp, Calendar } from 'lucide-react';

export default function RateCalculatorPage() {
  // Input states
  const [desiredIncome, setDesiredIncome] = useState<number>(50000);
  const [billableHours, setBillableHours] = useState<number>(1600);
  const [businessExpenses, setBusinessExpenses] = useState<number>(10000);
  const [taxRate, setTaxRate] = useState<number>(35);
  const [bufferPercent, setBufferPercent] = useState<number>(20);
  const [vacationWeeks, setVacationWeeks] = useState<number>(4);
  const [currency, setCurrency] = useState<'$' | '€' | '£'>('$');

  // Calculations
  const totalNeeded = desiredIncome + businessExpenses;
  const withBuffer = totalNeeded * (1 + bufferPercent / 100);
  const withTax = withBuffer / (1 - taxRate / 100);
  const hourlyRate = withTax / billableHours;

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

  const applyPreset = (preset: keyof typeof presets) => {
    const p = presets[preset];
    setDesiredIncome(p.income);
    setBillableHours(p.hours);
    setBusinessExpenses(p.expenses);
    setTaxRate(p.tax);
    setBufferPercent(p.buffer);
  };

  const formatCurrency = (amount: number) => {
    return `${currency}${Math.ceil(amount).toLocaleString('en-US')}`;
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>→</span>
              <Link href="/tools" className="hover:text-primary transition-colors">
                Tools
              </Link>
              <span>→</span>
              <span className="text-gray-900 font-semibold">Rate Calculator</span>
            </div>
          </div>
        </section>

        {/* Hero */}
        <section className="bg-white py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
                  <Calculator className="w-7 h-7 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                Freelance Rate Calculator
              </h1>
              <p className="text-xl text-text-secondary">
                Calculate your ideal hourly rate based on your desired income, expenses, and billable hours.
                This calculator accounts for taxes and a buffer for unexpected costs.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Information
                </h2>

                {/* Currency Selector */}
                <div className="flex items-center gap-2">
                  {(['$', '€', '£'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                        currency === curr
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preset Buttons */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-3">Quick Presets</p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => applyPreset('junior')}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  >
                    Junior
                  </button>
                  <button
                    onClick={() => applyPreset('medior')}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  >
                    Medior
                  </button>
                  <button
                    onClick={() => applyPreset('senior')}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  >
                    Senior
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Desired Income */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Desired net annual income
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      {currency}
                    </span>
                    <input
                      type="number"
                      value={desiredIncome}
                      onChange={(e) => setDesiredIncome(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    The amount you want to earn net per year
                  </p>
                </div>

                {/* Billable Hours */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Billable hours per year
                  </label>
                  <input
                    type="number"
                    value={billableHours}
                    onChange={(e) => setBillableHours(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Typically 1600-1800 hours (40 hours/week, 40-45 weeks/year)
                  </p>
                </div>

                {/* Business Expenses */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Annual business expenses
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      {currency}
                    </span>
                    <input
                      type="number"
                      value={businessExpenses}
                      onChange={(e) => setBusinessExpenses(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Software, hardware, office, insurance, accountant, etc.
                  </p>
                </div>

                {/* Tax Rate */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Average tax rate
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-16 text-right font-semibold text-gray-900">
                      {taxRate}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Average 25-40% for freelancers (varies by country)
                  </p>
                </div>

                {/* Buffer Percentage */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Safety buffer
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={bufferPercent}
                      onChange={(e) => setBufferPercent(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-16 text-right font-semibold text-gray-900">
                      {bufferPercent}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Extra buffer for unexpected costs and slower periods
                  </p>
                </div>

                {/* Vacation Weeks */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Vacation weeks per year
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="12"
                      value={vacationWeeks}
                      onChange={(e) => setVacationWeeks(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-16 text-right font-semibold text-gray-900">
                      {vacationWeeks} weeks
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Typical 4-6 weeks per year for work-life balance
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
                    Recommended Hourly Rate
                  </p>
                  <div className="text-6xl font-bold mb-4">
                    {formatCurrency(hourlyRate)}
                  </div>
                  <p className="text-white/90">
                    per hour
                  </p>
                </div>
              </div>

              {/* Additional Rates Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center gap-2 mb-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <p className="text-sm font-semibold">Day Rate</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{formatCurrency(dayRate)}</p>
                  <p className="text-xs text-gray-500 mt-1">8 hours</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center gap-2 mb-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <p className="text-sm font-semibold">Week Rate</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{formatCurrency(weekRate)}</p>
                  <p className="text-xs text-gray-500 mt-1">40 hours</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center gap-2 mb-2 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <p className="text-sm font-semibold">Monthly Income</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{formatCurrency(monthlyIncome)}</p>
                  <p className="text-xs text-gray-500 mt-1">Average per month</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center gap-2 mb-2 text-gray-600">
                    <TrendingUp className="w-4 h-4" />
                    <p className="text-sm font-semibold">Weekly Income</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">{formatCurrency(weeklyIncome)}</p>
                  <p className="text-xs text-gray-500 mt-1">{workingWeeks} working weeks</p>
                </div>
              </div>

              {/* Breakdown Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Calculation Breakdown
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Desired net income</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(desiredIncome)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Business expenses</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(businessExpenses)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(totalNeeded)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Safety buffer ({bufferPercent}%)</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(withBuffer - totalNeeded)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Subtotal with buffer</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(withBuffer)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Taxes ({taxRate}%)</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(withTax - withBuffer)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 bg-gray-50 -mx-6 px-6 mt-3">
                    <span className="font-semibold text-gray-900">Total required revenue</span>
                    <span className="text-lg font-bold text-primary">
                      {formatCurrency(withTax)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 mt-3">
                    <span className="text-sm text-gray-600">Billable hours</span>
                    <span className="font-semibold text-gray-900">
                      {billableHours} hours
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-3 bg-primary/5 -mx-6 px-6 mt-3 rounded-lg">
                    <span className="font-bold text-gray-900">Hourly rate</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(hourlyRate)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Project Price Calculator */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Project Price Calculator
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Estimate project price based on your hourly rate
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Estimated project hours
                    </label>
                    <input
                      type="number"
                      value={projectHours}
                      onChange={(e) => setProjectHours(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="40"
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 bg-primary/5 px-4 rounded-lg">
                    <span className="font-bold text-gray-900">Project Price</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(projectPrice)}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• {projectHours} hours × {formatCurrency(hourlyRate)}/hour</p>
                    <p>• Consider adding 10-20% buffer for scope changes</p>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Tips for setting your rate
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Compare your rate with the market in your industry</li>
                      <li>• Consider your experience and expertise level</li>
                      <li>• Don't start too low - raising rates is harder than lowering them</li>
                      <li>• Account for {vacationWeeks} weeks vacation + sick leave</li>
                      <li>• Review and adjust rates annually for inflation</li>
                      <li>• Different rates for different client types is common</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Information Section */}
        <section className="container mx-auto px-4 pb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Understanding Your Rate
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Why this rate?
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <strong>Desired income:</strong> Your target take-home pay for the year
                  </p>
                  <p>
                    <strong>Business expenses:</strong> Tools, software, insurance, office costs
                  </p>
                  <p>
                    <strong>Safety buffer ({bufferPercent}%):</strong> Protection against slow periods and unexpected costs
                  </p>
                  <p>
                    <strong>Taxes ({taxRate}%):</strong> Income tax, VAT, and other applicable taxes
                  </p>
                  <p>
                    <strong>Billable hours:</strong> Not all work hours are billable (admin, sales, etc.)
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Quick reference
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>💰 <strong>Hourly:</strong> {formatCurrency(hourlyRate)}/hour</p>
                  <p>📅 <strong>Daily:</strong> {formatCurrency(dayRate)}/day (8 hours)</p>
                  <p>📆 <strong>Weekly:</strong> {formatCurrency(weekRate)}/week (40 hours)</p>
                  <p>📊 <strong>Monthly:</strong> {formatCurrency(monthlyIncome)}/month</p>
                  <p>🎯 <strong>Annual revenue:</strong> {formatCurrency(withTax)}</p>
                  <p>🏖️ <strong>Working weeks:</strong> {workingWeeks} weeks/year</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Need more help with your freelance business?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Discover our other tools and read our comprehensive guides on pricing and freelancing.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/tools"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-gray-100 transition-colors"
              >
                More tools
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Read our guides
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
