'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MoneyBiiPromo } from '@/components/MoneyBiiPromo';
import {
  TrendingUp,
  TrendingDown,
  Plus,
  Trash2,
  Edit,
  Calendar,
  DollarSign,
  X,
  Save,
  ChevronLeft,
  ChevronRight,
  PieChart,
  BarChart3
} from 'lucide-react';

// TypeScript Interfaces
interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string; // YYYY-MM-DD
  recurring: boolean;
}

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
}

// Default Categories
const DEFAULT_INCOME_CATEGORIES: Category[] = [
  { id: 'freelance', name: 'Freelance', type: 'income', color: '#10b981' },
  { id: 'platforms', name: 'Platforms', type: 'income', color: '#3b82f6' },
  { id: 'consulting', name: 'Consulting', type: 'income', color: '#8b5cf6' },
  { id: 'products', name: 'Products', type: 'income', color: '#f59e0b' },
  { id: 'other-income', name: 'Other', type: 'income', color: '#6b7280' },
];

const DEFAULT_EXPENSE_CATEGORIES: Category[] = [
  { id: 'software', name: 'Software', type: 'expense', color: '#ef4444' },
  { id: 'equipment', name: 'Equipment', type: 'expense', color: '#f97316' },
  { id: 'marketing', name: 'Marketing', type: 'expense', color: '#ec4899' },
  { id: 'office', name: 'Office', type: 'expense', color: '#14b8a6' },
  { id: 'taxes', name: 'Taxes', type: 'expense', color: '#6366f1' },
  { id: 'other-expense', name: 'Other', type: 'expense', color: '#6b7280' },
];

// LocalStorage Keys
const STORAGE_KEYS = {
  transactions: 'income-tracker-transactions',
  categories: 'income-tracker-categories',
};

// Helper Functions
const loadFromStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    if (typeof window === 'undefined') return defaultValue;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from storage:', error);
    return defaultValue;
  }
};

const saveToStorage = (key: string, value: unknown) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
};

const formatCurrency = (amount: number, currency = '€'): string => {
  return `${currency}${amount.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const getMonthName = (month: number, locale: string): string => {
  const date = new Date(2024, month, 1);
  return date.toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-US', { month: 'long' });
};

export default function IncomeTrackerPage() {
  const t = useTranslations('incomeTracker');
  const params = useParams();
  const locale = params.locale as string;

  // State Management
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    ...DEFAULT_INCOME_CATEGORIES,
    ...DEFAULT_EXPENSE_CATEGORIES,
  ]);

  // View State
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [viewMode, setViewMode] = useState<'month' | 'year'>('month');

  // Modal State
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [transactionForm, setTransactionForm] = useState({
    type: 'income' as 'income' | 'expense',
    amount: 0,
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    recurring: false,
  });

  // Load data on mount
  useEffect(() => {
    const savedTransactions = loadFromStorage<Transaction[]>(STORAGE_KEYS.transactions, []);
    setTransactions(savedTransactions);

    const savedCategories = loadFromStorage<Category[]>(STORAGE_KEYS.categories, [
      ...DEFAULT_INCOME_CATEGORIES,
      ...DEFAULT_EXPENSE_CATEGORIES,
    ]);
    setCategories(savedCategories);
  }, []);

  // Save data on change
  useEffect(() => {
    if (transactions.length > 0 || localStorage.getItem(STORAGE_KEYS.transactions)) {
      saveToStorage(STORAGE_KEYS.transactions, transactions);
    }
  }, [transactions]);

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const date = new Date(t.date);
      if (viewMode === 'month') {
        return date.getFullYear() === selectedYear && date.getMonth() === selectedMonth;
      }
      return date.getFullYear() === selectedYear;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, selectedYear, selectedMonth, viewMode]);

  // Calculations
  const totals = useMemo(() => {
    const income = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      income,
      expenses,
      net: income - expenses,
    };
  }, [filteredTransactions]);

  // Category breakdown
  const categoryBreakdown = useMemo(() => {
    const breakdown: Record<string, { amount: number; category: Category }> = {};

    filteredTransactions.forEach(t => {
      const cat = categories.find(c => c.id === t.category);
      if (cat) {
        if (!breakdown[t.category]) {
          breakdown[t.category] = { amount: 0, category: cat };
        }
        breakdown[t.category].amount += t.amount;
      }
    });

    return Object.values(breakdown).sort((a, b) => b.amount - a.amount);
  }, [filteredTransactions, categories]);

  // Monthly data for year view
  const monthlyData = useMemo(() => {
    if (viewMode !== 'year') return [];

    return Array.from({ length: 12 }, (_, month) => {
      const monthTransactions = transactions.filter(t => {
        const date = new Date(t.date);
        return date.getFullYear() === selectedYear && date.getMonth() === month;
      });

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      return { month, income, expenses, net: income - expenses };
    });
  }, [transactions, selectedYear, viewMode]);

  // Transaction handlers
  const openAddTransaction = (type: 'income' | 'expense') => {
    setEditingTransaction(null);
    setTransactionForm({
      type,
      amount: 0,
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      recurring: false,
    });
    setShowTransactionModal(true);
  };

  const openEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setTransactionForm({
      type: transaction.type,
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description,
      date: transaction.date,
      recurring: transaction.recurring,
    });
    setShowTransactionModal(true);
  };

  const saveTransaction = () => {
    if (transactionForm.amount <= 0 || !transactionForm.category) return;

    if (editingTransaction) {
      setTransactions(prev =>
        prev.map(t =>
          t.id === editingTransaction.id
            ? { ...t, ...transactionForm }
            : t
        )
      );
    } else {
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        ...transactionForm,
      };
      setTransactions(prev => [newTransaction, ...prev]);
    }

    setShowTransactionModal(false);
    setEditingTransaction(null);
  };

  const deleteTransaction = (id: string) => {
    if (confirm(t('confirmations.deleteTransaction'))) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  // Navigation
  const navigatePeriod = (direction: 'prev' | 'next') => {
    if (viewMode === 'month') {
      if (direction === 'prev') {
        if (selectedMonth === 0) {
          setSelectedMonth(11);
          setSelectedYear(prev => prev - 1);
        } else {
          setSelectedMonth(prev => prev - 1);
        }
      } else {
        if (selectedMonth === 11) {
          setSelectedMonth(0);
          setSelectedYear(prev => prev + 1);
        } else {
          setSelectedMonth(prev => prev + 1);
        }
      }
    } else {
      setSelectedYear(prev => direction === 'prev' ? prev - 1 : prev + 1);
    }
  };

  const incomeCategories = categories.filter(c => c.type === 'income');
  const expenseCategories = categories.filter(c => c.type === 'expense');

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
              <span>/</span>
              <Link href={`/${locale}/tools`} className="hover:text-primary transition-colors">
                {t('breadcrumb.tools')}
              </Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-white font-semibold">{t('breadcrumb.incomeTracker')}</span>
            </div>
          </div>
        </section>

        {/* Hero */}
        <section className="bg-white dark:bg-slate-800 py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('hero.title')}
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                {t('hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Period Navigation */}
        <section className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setViewMode('month')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'month'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {t('navigation.month')}
              </button>
              <button
                onClick={() => setViewMode('year')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'year'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {t('navigation.year')}
              </button>
            </div>

            {/* Period Selector */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigatePeriod('prev')}
                className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="text-lg font-semibold text-gray-900 dark:text-white min-w-[180px] text-center">
                {viewMode === 'month'
                  ? `${getMonthName(selectedMonth, locale)} ${selectedYear}`
                  : selectedYear}
              </div>
              <button
                onClick={() => navigatePeriod('next')}
                className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAddTransaction('income')}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                {t('actions.addIncome')}
              </button>
              <button
                onClick={() => openAddTransaction('expense')}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                {t('actions.addExpense')}
              </button>
            </div>
          </div>
        </section>

        {/* Summary Cards */}
        <section className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('summary.income')}</p>
              </div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(totals.income)}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="w-5 h-5 text-red-500" />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('summary.expenses')}</p>
              </div>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {formatCurrency(totals.expenses)}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{t('summary.net')}</p>
              </div>
              <p className={`text-2xl font-bold ${totals.net >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {formatCurrency(totals.net)}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Transactions List */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {t('transactions.title')}
                </h2>

                {filteredTransactions.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">{t('transactions.empty')}</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {filteredTransactions.map(transaction => {
                      const category = categories.find(c => c.id === transaction.category);
                      return (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div
                              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                              }`}
                            >
                              {transaction.type === 'income' ? (
                                <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                              ) : (
                                <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-gray-900 dark:text-white truncate">
                                  {transaction.description || category?.name || t('transactions.noDescription')}
                                </p>
                                {category && (
                                  <span
                                    className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                                    style={{ backgroundColor: category.color }}
                                  >
                                    {category.name}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {new Date(transaction.date).toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-US')}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className={`text-lg font-bold ${
                              transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`}>
                              {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                            </p>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => openEditTransaction(transaction)}
                                className="p-1.5 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteTransaction(transaction.id)}
                                className="p-1.5 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  {t('breakdown.title')}
                </h2>

                {categoryBreakdown.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{t('breakdown.empty')}</p>
                ) : (
                  <div className="space-y-3">
                    {categoryBreakdown.map(item => {
                      const percentage = totals.income + totals.expenses > 0
                        ? (item.amount / (item.category.type === 'income' ? totals.income : totals.expenses)) * 100
                        : 0;
                      return (
                        <div key={item.category.id}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {item.category.name}
                            </span>
                            <span className={`text-sm font-bold ${
                              item.category.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`}>
                              {formatCurrency(item.amount)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${Math.min(percentage, 100)}%`,
                                backgroundColor: item.category.color,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Year Overview (when in year view) */}
              {viewMode === 'year' && (
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 mt-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {t('yearOverview.title')}
                  </h2>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {monthlyData.map(data => (
                      <div key={data.month} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {getMonthName(data.month, locale)}
                        </span>
                        <span className={`text-sm font-bold ${
                          data.net >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {formatCurrency(data.net)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Transaction Modal */}
        {showTransactionModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingTransaction
                    ? t('modal.titleEdit')
                    : transactionForm.type === 'income'
                      ? t('modal.titleAddIncome')
                      : t('modal.titleAddExpense')}
                </h3>
                <button
                  onClick={() => {
                    setShowTransactionModal(false);
                    setEditingTransaction(null);
                  }}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Type Toggle */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setTransactionForm(prev => ({ ...prev, type: 'income', category: '' }))}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      transactionForm.type === 'income'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {t('modal.income')}
                  </button>
                  <button
                    onClick={() => setTransactionForm(prev => ({ ...prev, type: 'expense', category: '' }))}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      transactionForm.type === 'expense'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {t('modal.expense')}
                  </button>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('modal.labelAmount')}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={transactionForm.amount || ''}
                      onChange={(e) => setTransactionForm(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                      className="w-full pl-8 pr-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('modal.labelCategory')}
                  </label>
                  <select
                    value={transactionForm.category}
                    onChange={(e) => setTransactionForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">{t('modal.selectCategory')}</option>
                    {(transactionForm.type === 'income' ? incomeCategories : expenseCategories).map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('modal.labelDate')}
                  </label>
                  <input
                    type="date"
                    value={transactionForm.date}
                    onChange={(e) => setTransactionForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('modal.labelDescription')}
                  </label>
                  <input
                    type="text"
                    value={transactionForm.description}
                    onChange={(e) => setTransactionForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={t('modal.placeholderDescription')}
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={saveTransaction}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    {editingTransaction ? t('modal.buttonUpdate') : t('modal.buttonAdd')}
                  </button>
                  <button
                    onClick={() => {
                      setShowTransactionModal(false);
                      setEditingTransaction(null);
                    }}
                    className="px-4 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold transition-colors"
                  >
                    {t('modal.buttonCancel')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MoneyBii Promo */}
        <div className="container mx-auto px-4 py-8">
          <MoneyBiiPromo variant="subtle" />
        </div>
      </main>
      <Footer />
    </>
  );
}
