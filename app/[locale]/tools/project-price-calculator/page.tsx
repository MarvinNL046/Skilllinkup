'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { MoneyBiiPromo } from '@/components/MoneyBiiPromo';
import {
 DollarSign,
 Clock,
 Calculator,
 Info,
 Plus,
 Trash2,
 AlertCircle,
 CheckCircle,
} from 'lucide-react';

interface ProjectTask {
 id: string;
 name: string;
 hours: number;
 complexity: 'simple' | 'medium' | 'complex';
}

const COMPLEXITY_MULTIPLIERS = {
 simple: 1,
 medium: 1.25,
 complex: 1.5,
};

export default function ProjectPriceCalculatorPage() {
 const t = useTranslations('projectPriceCalculator');
 const params = useParams();
 const locale = params.locale as string;

 // Calculator state
 const [hourlyRate, setHourlyRate] = useState(75);
 const [bufferPercentage, setBufferPercentage] = useState(15);
 const [tasks, setTasks] = useState<ProjectTask[]>([
 { id: '1', name: '', hours: 0, complexity: 'medium' },
 ]);

 // New task form
 const [newTaskName, setNewTaskName] = useState('');
 const [newTaskHours, setNewTaskHours] = useState(0);
 const [newTaskComplexity, setNewTaskComplexity] = useState<'simple' | 'medium' | 'complex'>('medium');

 // Calculate totals
 const calculations = useMemo(() =>{
 const totalBaseHours = tasks.reduce((sum, task) =>sum + task.hours, 0);
 const totalAdjustedHours = tasks.reduce((sum, task) =>{
 const multiplier = COMPLEXITY_MULTIPLIERS[task.complexity];
 return sum + (task.hours * multiplier);
 }, 0);

 const basePrice = totalAdjustedHours * hourlyRate;
 const bufferAmount = basePrice * (bufferPercentage / 100);
 const totalPrice = basePrice + bufferAmount;

 // Time estimates
 const daysAt8Hours = totalAdjustedHours / 8;
 const weeksAt40Hours = totalAdjustedHours / 40;

 return {
 totalBaseHours,
 totalAdjustedHours,
 basePrice,
 bufferAmount,
 totalPrice,
 daysAt8Hours,
 weeksAt40Hours,
 };
 }, [tasks, hourlyRate, bufferPercentage]);

 const addTask = () =>{
 if (newTaskHours >0) {
 const newTask: ProjectTask = {
 id: Date.now().toString(),
 name: newTaskName || t('tasks.defaultName'),
 hours: newTaskHours,
 complexity: newTaskComplexity,
 };
 setTasks([...tasks, newTask]);
 setNewTaskName('');
 setNewTaskHours(0);
 setNewTaskComplexity('medium');
 }
 };

 const updateTask = (id: string, field: keyof ProjectTask, value: string | number) =>{
 setTasks(tasks.map(task =>
 task.id === id ? { ...task, [field]: value } : task
 ));
 };

 const removeTask = (id: string) =>{
 if (tasks.length >1) {
 setTasks(tasks.filter(task =>task.id !== id));
 }
 };

 const formatCurrency = (amount: number) =>{
 return `€${amount.toLocaleString('nl-NL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
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
 <span>/</span>
 <Link href={`/${locale}/tools`} className="hover:text-primary transition-colors">
 {t('breadcrumb.tools')}
 </Link>
 <span>/</span>
 <span className="text-gray-900 dark:text-white font-semibold">{t('breadcrumb.projectPriceCalculator')}</span>
 </div>
 </div>
 </section>

 {/* Hero */}
 <section className="bg-white dark:bg-slate-800 py-12 sm:py-16">
 <div className="container mx-auto px-4">
 <div className="max-w-3xl mx-auto text-center">
 <div className="flex items-center justify-center gap-3 mb-6">
 <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
 <DollarSign className="w-7 h-7 text-white" />
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

 {/* Calculator */}
 <section className="container mx-auto px-4 py-12">
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 {/* Input Section */}
 <div className="lg:col-span-2 space-y-6">
 {/* Rate & Buffer */}
 <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
 <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
 {t('settings.title')}
 </h2>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div>
 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
 {t('settings.hourlyRate')}
 </label>
 <div className="relative">
 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
 <input
 type="number"
 min="0"
 value={hourlyRate}
 onChange={(e) =>setHourlyRate(Number(e.target.value) || 0)}
 className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 </div>
 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
 {t('settings.hourlyRateHelp')}
 </p>
 </div>

 <div>
 <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
 {t('settings.buffer')}
 </label>
 <div className="relative">
 <input
 type="number"
 min="0"
 max="100"
 value={bufferPercentage}
 onChange={(e) =>setBufferPercentage(Number(e.target.value) || 0)}
 className="w-full pl-4 pr-8 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
 />
 <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
 </div>
 <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
 {t('settings.bufferHelp')}
 </p>
 </div>
 </div>
 </div>

 {/* Tasks */}
 <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
 <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
 {t('tasks.title')}
 </h2>

 {/* Existing Tasks */}
 <div className="space-y-4 mb-6">
 {tasks.map((task, index) =>(
 <div key={task.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
 <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
 <div>
 <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
 {t('tasks.taskName')}
 </label>
 <input
 type="text"
 value={task.name}
 onChange={(e) =>updateTask(task.id, 'name', e.target.value)}
 placeholder={`${t('tasks.taskPlaceholder')} ${index + 1}`}
 className="w-full px-3 py-2 bg-white dark:bg-slate-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white rounded-lg text-sm"
 />
 </div>
 <div>
 <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
 {t('tasks.hours')}
 </label>
 <input
 type="number"
 min="0"
 value={task.hours || ''}
 onChange={(e) =>updateTask(task.id, 'hours', Number(e.target.value) || 0)}
 className="w-full px-3 py-2 bg-white dark:bg-slate-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white rounded-lg text-sm"
 />
 </div>
 <div>
 <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
 {t('tasks.complexity')}
 </label>
 <select
 value={task.complexity}
 onChange={(e) =>updateTask(task.id, 'complexity', e.target.value)}
 className="w-full px-3 py-2 bg-white dark:bg-slate-600 border border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white rounded-lg text-sm"
 >
 <option value="simple">{t('tasks.complexitySimple')} (1x)</option>
 <option value="medium">{t('tasks.complexityMedium')} (1.25x)</option>
 <option value="complex">{t('tasks.complexityComplex')} (1.5x)</option>
 </select>
 </div>
 </div>
 <button
 onClick={() =>removeTask(task.id)}
 disabled={tasks.length <= 1}
 className="p-2 text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
 >
 <Trash2 className="w-5 h-5" />
 </button>
 </div>
 ))}
 </div>

 {/* Add New Task */}
 <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
 <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
 {t('tasks.addNew')}
 </p>
 <div className="flex items-end gap-4">
 <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
 <input
 type="text"
 value={newTaskName}
 onChange={(e) =>setNewTaskName(e.target.value)}
 placeholder={t('tasks.newTaskPlaceholder')}
 className="px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg text-sm"
 />
 <input
 type="number"
 min="0"
 value={newTaskHours || ''}
 onChange={(e) =>setNewTaskHours(Number(e.target.value) || 0)}
 placeholder={t('tasks.hoursPlaceholder')}
 className="px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg text-sm"
 />
 <select
 value={newTaskComplexity}
 onChange={(e) =>setNewTaskComplexity(e.target.value as 'simple' | 'medium' | 'complex')}
 className="px-3 py-2 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg text-sm"
 >
 <option value="simple">{t('tasks.complexitySimple')}</option>
 <option value="medium">{t('tasks.complexityMedium')}</option>
 <option value="complex">{t('tasks.complexityComplex')}</option>
 </select>
 </div>
 <button
 onClick={addTask}
 disabled={newTaskHours <= 0}
 className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
 >
 <Plus className="w-4 h-4" />
 {t('tasks.addButton')}
 </button>
 </div>
 </div>
 </div>

 {/* Tips */}
 <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
 <div className="flex items-start gap-3">
 <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
 <div>
 <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
 {t('tips.title')}
 </h3>
 <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
 <li>• {t('tips.tip1')}</li>
 <li>• {t('tips.tip2')}</li>
 <li>• {t('tips.tip3')}</li>
 <li>• {t('tips.tip4')}</li>
 </ul>
 </div>
 </div>
 </div>
 </div>

 {/* Results Section */}
 <div className="lg:col-span-1">
 <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 sticky top-24">
 <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
 {t('results.title')}
 </h2>

 {/* Main Price */}
 <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-6 mb-6 text-center">
 <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
 {t('results.totalPrice')}
 </p>
 <p className="text-4xl font-bold text-primary">
 {formatCurrency(calculations.totalPrice)}
 </p>
 </div>

 {/* Breakdown */}
 <div className="space-y-4 mb-6">
 <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
 <span className="text-gray-600 dark:text-gray-400">{t('results.baseHours')}</span>
 <span className="font-semibold text-gray-900 dark:text-white">
 {calculations.totalBaseHours.toFixed(1)} {t('results.hoursUnit')}
 </span>
 </div>
 <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
 <span className="text-gray-600 dark:text-gray-400">{t('results.adjustedHours')}</span>
 <span className="font-semibold text-gray-900 dark:text-white">
 {calculations.totalAdjustedHours.toFixed(1)} {t('results.hoursUnit')}
 </span>
 </div>
 <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
 <span className="text-gray-600 dark:text-gray-400">{t('results.basePrice')}</span>
 <span className="font-semibold text-gray-900 dark:text-white">
 {formatCurrency(calculations.basePrice)}
 </span>
 </div>
 <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
 <span className="text-gray-600 dark:text-gray-400">{t('results.buffer')} ({bufferPercentage}%)</span>
 <span className="font-semibold text-yellow-600 dark:text-yellow-400">
 +{formatCurrency(calculations.bufferAmount)}
 </span>
 </div>
 </div>

 {/* Time Estimate */}
 <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
 <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
 {t('results.timeEstimate')}
 </h3>
 <div className="grid grid-cols-2 gap-4">
 <div>
 <p className="text-2xl font-bold text-gray-900 dark:text-white">
 {calculations.daysAt8Hours.toFixed(1)}
 </p>
 <p className="text-sm text-gray-500 dark:text-gray-400">{t('results.days')}</p>
 </div>
 <div>
 <p className="text-2xl font-bold text-gray-900 dark:text-white">
 {calculations.weeksAt40Hours.toFixed(1)}
 </p>
 <p className="text-sm text-gray-500 dark:text-gray-400">{t('results.weeks')}</p>
 </div>
 </div>
 </div>

 {/* Warning/Success */}
 {calculations.totalPrice >0 ? (
 <div className="mt-6 flex items-start gap-2 text-sm text-green-700 dark:text-green-400">
 <CheckCircle className="w-5 h-5 flex-shrink-0" />
 <span>{t('results.readyMessage')}</span>
 </div>
 ) : (
 <div className="mt-6 flex items-start gap-2 text-sm text-yellow-700 dark:text-yellow-400">
 <AlertCircle className="w-5 h-5 flex-shrink-0" />
 <span>{t('results.addTasksMessage')}</span>
 </div>
 )}
 </div>
 </div>
 </div>
 </section>

 {/* CTA */}
 <section className="container mx-auto px-4 py-8">
 <div className="bg-primary rounded-lg shadow-lg p-8 text-center text-white">
 <h2 className="text-2xl font-bold mb-4">
 {t('cta.title')}
 </h2>
 <p className="text-white/90 mb-6 max-w-2xl mx-auto">
 {t('cta.description')}
 </p>
 <div className="flex items-center justify-center gap-4">
 <Link
 href={`/${locale}/tools/rate-calculator`}
 className="inline-flex items-center px-6 py-3 rounded-lg bg-white text-primary font-semibold hover:bg-gray-100 transition-colors"
 >
 {t('cta.rateCalculatorButton')}
 </Link>
 <Link
 href={`/${locale}/tools`}
 className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
 >
 {t('cta.allToolsButton')}
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
