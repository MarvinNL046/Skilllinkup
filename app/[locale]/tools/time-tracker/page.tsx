'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  Clock,
  Play,
  Pause,
  Square,
  Plus,
  Download,
  Trash2,
  Edit,
  Calendar,
  DollarSign,
  Filter,
  X,
  Save
} from 'lucide-react';

// TypeScript Interfaces
interface Project {
  id: string;
  name: string;
  client: string;
  hourlyRate: number;
  color: string;
}

interface TimeEntry {
  id: string;
  projectId: string;
  projectName: string;
  description: string;
  startTime: Date;
  endTime: Date;
  duration: number; // minutes
  hourlyRate: number;
  earnings: number;
}

interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  startTime: number | null;
  elapsedSeconds: number;
  selectedProjectId: string | null;
  description: string;
}

// LocalStorage Keys
const STORAGE_KEYS = {
  projects: 'time-tracker-projects',
  entries: 'time-tracker-entries',
  timerState: 'time-tracker-timer-state'
};

// Helper Functions
const loadFromStorage = (key: string, defaultValue: any) => {
  try {
    if (typeof window === 'undefined') return defaultValue;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from storage:', error);
    return defaultValue;
  }
};

const saveToStorage = (key: string, value: any) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
};

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const formatDuration = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

const calculateEarnings = (minutes: number, hourlyRate: number): number => {
  return (minutes / 60) * hourlyRate;
};

const exportToCSV = (entries: TimeEntry[]) => {
  const headers = ['Date', 'Project', 'Client', 'Hours', 'Rate', 'Earnings', 'Description'];
  const rows = entries.map(entry => [
    new Date(entry.startTime).toLocaleDateString(),
    entry.projectName,
    '', // Client info not in entry, could be enhanced
    (entry.duration / 60).toFixed(2),
    entry.hourlyRate.toFixed(2),
    entry.earnings.toFixed(2),
    entry.description
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `time-tracker-export-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const getDateRange = (type: 'today' | 'week' | 'month'): { start: Date; end: Date } => {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);

  if (type === 'today') {
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
  } else if (type === 'week') {
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Monday
    start.setDate(diff);
    start.setHours(0, 0, 0, 0);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
  } else if (type === 'month') {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    end.setMonth(end.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);
  }

  return { start, end };
};

export default function TimeTrackerPage() {
  const t = useTranslations('timeTracker');

  // State Management
  const [projects, setProjects] = useState<Project[]>([]);
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    isPaused: false,
    startTime: null,
    elapsedSeconds: 0,
    selectedProjectId: null,
    description: ''
  });

  // UI State
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [filterProject, setFilterProject] = useState<string>('all');
  const [filterDateRange, setFilterDateRange] = useState<'all' | 'today' | 'week' | 'month'>('all');

  // Form State
  const [projectForm, setProjectForm] = useState({ name: '', client: '', hourlyRate: 50, color: '#3b82f6' });
  const [manualForm, setManualForm] = useState({
    date: new Date().toISOString().split('T')[0],
    hours: 0,
    minutes: 0,
    projectId: '',
    description: ''
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load data on mount
  useEffect(() => {
    setProjects(loadFromStorage(STORAGE_KEYS.projects, []));
    setEntries(loadFromStorage(STORAGE_KEYS.entries, []));
    const savedTimer = loadFromStorage(STORAGE_KEYS.timerState, null);
    if (savedTimer) {
      setTimerState(savedTimer);
    }
  }, []);

  // Save data on change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.projects, projects);
  }, [projects]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.entries, entries);
  }, [entries]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.timerState, timerState);
  }, [timerState]);

  // Timer Effect
  useEffect(() => {
    if (timerState.isRunning && !timerState.isPaused) {
      intervalRef.current = setInterval(() => {
        setTimerState(prev => ({
          ...prev,
          elapsedSeconds: prev.elapsedSeconds + 1
        }));
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isRunning, timerState.isPaused]);

  // Timer Controls
  const startTimer = () => {
    setTimerState(prev => ({
      ...prev,
      isRunning: true,
      isPaused: false,
      startTime: prev.startTime || Date.now()
    }));
  };

  const pauseTimer = () => {
    setTimerState(prev => ({
      ...prev,
      isPaused: true
    }));
  };

  const stopTimer = () => {
    if (timerState.elapsedSeconds > 0 && timerState.selectedProjectId) {
      const project = projects.find(p => p.id === timerState.selectedProjectId);
      if (project) {
        const duration = Math.floor(timerState.elapsedSeconds / 60);
        const earnings = calculateEarnings(duration, project.hourlyRate);

        const newEntry: TimeEntry = {
          id: Date.now().toString(),
          projectId: project.id,
          projectName: project.name,
          description: timerState.description,
          startTime: new Date(timerState.startTime!),
          endTime: new Date(),
          duration,
          hourlyRate: project.hourlyRate,
          earnings
        };

        setEntries(prev => [newEntry, ...prev]);
      }
    }

    setTimerState({
      isRunning: false,
      isPaused: false,
      startTime: null,
      elapsedSeconds: 0,
      selectedProjectId: null,
      description: ''
    });
  };

  // Project Management
  const addProject = () => {
    if (!projectForm.name || !projectForm.client) return;

    const newProject: Project = {
      id: Date.now().toString(),
      ...projectForm
    };

    setProjects(prev => [...prev, newProject]);
    setProjectForm({ name: '', client: '', hourlyRate: 50, color: '#3b82f6' });
    setShowProjectModal(false);
  };

  const updateProject = () => {
    if (!editingProject) return;

    setProjects(prev => prev.map(p =>
      p.id === editingProject.id ? { ...editingProject, ...projectForm } : p
    ));
    setEditingProject(null);
    setProjectForm({ name: '', client: '', hourlyRate: 50, color: '#3b82f6' });
    setShowProjectModal(false);
  };

  const deleteProject = (id: string) => {
    if (confirm(t('confirmations.deleteProject'))) {
      setProjects(prev => prev.filter(p => p.id !== id));
    }
  };

  const openEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      name: project.name,
      client: project.client,
      hourlyRate: project.hourlyRate,
      color: project.color
    });
    setShowProjectModal(true);
  };

  // Manual Entry
  const addManualEntry = () => {
    if (!manualForm.projectId || (manualForm.hours === 0 && manualForm.minutes === 0)) return;

    const project = projects.find(p => p.id === manualForm.projectId);
    if (!project) return;

    const duration = manualForm.hours * 60 + manualForm.minutes;
    const earnings = calculateEarnings(duration, project.hourlyRate);

    const entryDate = new Date(manualForm.date);
    entryDate.setHours(12, 0, 0, 0); // Set to noon to avoid timezone issues

    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      projectId: project.id,
      projectName: project.name,
      description: manualForm.description,
      startTime: entryDate,
      endTime: entryDate,
      duration,
      hourlyRate: project.hourlyRate,
      earnings
    };

    setEntries(prev => [newEntry, ...prev].sort((a, b) =>
      new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    ));

    setManualForm({
      date: new Date().toISOString().split('T')[0],
      hours: 0,
      minutes: 0,
      projectId: '',
      description: ''
    });
    setShowManualEntry(false);
  };

  const deleteEntry = (id: string) => {
    if (confirm(t('confirmations.deleteEntry'))) {
      setEntries(prev => prev.filter(e => e.id !== id));
    }
  };

  // Filtering
  const getFilteredEntries = () => {
    let filtered = entries;

    if (filterProject !== 'all') {
      filtered = filtered.filter(e => e.projectId === filterProject);
    }

    if (filterDateRange !== 'all') {
      const { start, end } = getDateRange(filterDateRange);
      filtered = filtered.filter(e => {
        const entryDate = new Date(e.startTime);
        return entryDate >= start && entryDate <= end;
      });
    }

    return filtered;
  };

  // Summary Calculations
  const calculateSummary = (type: 'all' | 'today' | 'week' | 'month') => {
    let relevantEntries = entries;

    if (type !== 'all') {
      const { start, end } = getDateRange(type);
      relevantEntries = entries.filter(e => {
        const entryDate = new Date(e.startTime);
        return entryDate >= start && entryDate <= end;
      });
    }

    const totalMinutes = relevantEntries.reduce((sum, e) => sum + e.duration, 0);
    const totalEarnings = relevantEntries.reduce((sum, e) => sum + e.earnings, 0);

    return {
      hours: (totalMinutes / 60).toFixed(1),
      earnings: totalEarnings.toFixed(2)
    };
  };

  const todaySummary = calculateSummary('today');
  const weekSummary = calculateSummary('week');
  const monthSummary = calculateSummary('month');
  const allTimeSummary = calculateSummary('all');

  const filteredEntries = getFilteredEntries();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Breadcrumb */}
        <section className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Link href="/" className="hover:text-primary transition-colors">
                {t('breadcrumb.home')}
              </Link>
              <span>{t('breadcrumb.separator')}</span>
              <Link href="/tools" className="hover:text-primary transition-colors">
                {t('breadcrumb.tools')}
              </Link>
              <span>{t('breadcrumb.separator')}</span>
              <span className="text-gray-900 dark:text-white font-semibold">{t('breadcrumb.timeTracker')}</span>
            </div>
          </div>
        </section>

        {/* Hero */}
        <section className="bg-white dark:bg-slate-800 py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
                  <Clock className="w-7 h-7 text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                {t('hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Summary Cards */}
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-2 text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4" />
                <p className="text-sm font-semibold">{t('summaryCards.today')}</p>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{todaySummary.hours}{t('summaryCards.hoursUnit')}</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">{t('summaryCards.currencySymbol')}{todaySummary.earnings}</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-2 text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4" />
                <p className="text-sm font-semibold">{t('summaryCards.thisWeek')}</p>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{weekSummary.hours}{t('summaryCards.hoursUnit')}</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">{t('summaryCards.currencySymbol')}{weekSummary.earnings}</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-2 text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4" />
                <p className="text-sm font-semibold">{t('summaryCards.thisMonth')}</p>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{monthSummary.hours}{t('summaryCards.hoursUnit')}</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">{t('summaryCards.currencySymbol')}{monthSummary.earnings}</p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-2 text-gray-600 dark:text-gray-300">
                <DollarSign className="w-4 h-4" />
                <p className="text-sm font-semibold">{t('summaryCards.allTime')}</p>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{allTimeSummary.hours}{t('summaryCards.hoursUnit')}</p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">{t('summaryCards.currencySymbol')}{allTimeSummary.earnings}</p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Timer & Controls */}
            <div className="lg:col-span-1 space-y-6">
              {/* Timer Card */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {t('timer.title')}
                </h2>

                {/* Timer Display */}
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-primary mb-4 font-mono">
                    {formatTime(timerState.elapsedSeconds)}
                  </div>

                  {/* Project Selector for Timer */}
                  {!timerState.isRunning && (
                    <div className="mb-4">
                      <select
                        value={timerState.selectedProjectId || ''}
                        onChange={(e) => setTimerState(prev => ({ ...prev, selectedProjectId: e.target.value }))}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        disabled={timerState.isRunning}
                      >
                        <option value="">{t('timer.selectProject')}</option>
                        {projects.map(p => (
                          <option key={p.id} value={p.id}>{p.name} - {p.client}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {timerState.isRunning && timerState.selectedProjectId && (
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {projects.find(p => p.id === timerState.selectedProjectId)?.name}
                    </div>
                  )}

                  {/* Description Input */}
                  {timerState.isRunning && (
                    <input
                      type="text"
                      value={timerState.description}
                      onChange={(e) => setTimerState(prev => ({ ...prev, description: e.target.value }))}
                      placeholder={t('timer.description')}
                      className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
                    />
                  )}
                </div>

                {/* Timer Buttons */}
                <div className="flex items-center justify-center gap-3">
                  {!timerState.isRunning ? (
                    <button
                      onClick={startTimer}
                      disabled={!timerState.selectedProjectId}
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                    >
                      <Play className="w-5 h-5" />
                      {t('timer.start')}
                    </button>
                  ) : (
                    <>
                      {!timerState.isPaused ? (
                        <button
                          onClick={pauseTimer}
                          className="flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors"
                        >
                          <Pause className="w-5 h-5" />
                          {t('timer.pause')}
                        </button>
                      ) : (
                        <button
                          onClick={startTimer}
                          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                        >
                          <Play className="w-5 h-5" />
                          {t('timer.resume')}
                        </button>
                      )}
                      <button
                        onClick={stopTimer}
                        className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
                      >
                        <Square className="w-5 h-5" />
                        {t('timer.stop')}
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {t('quickActions.title')}
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowManualEntry(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    {t('quickActions.manualEntry')}
                  </button>
                  <button
                    onClick={() => setShowProjectModal(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    {t('quickActions.addProject')}
                  </button>
                  <button
                    onClick={() => exportToCSV(filteredEntries)}
                    disabled={filteredEntries.length === 0}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    {t('quickActions.export')}
                  </button>
                </div>
              </div>

              {/* Projects List */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {t('projects.title')} {t('projects.count', { count: projects.length })}
                </h3>
                {projects.length === 0 ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('projects.empty')}</p>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {projects.map(project => (
                      <div
                        key={project.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: project.color }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                              {project.name}
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                              {project.client} • {t('summaryCards.currencySymbol')}{project.hourlyRate}{t('projects.hourlyRate')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => openEditProject(project)}
                            className="p-1.5 text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="p-1.5 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Time Entries */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t('entries.title')}
                  </h2>
                  <div className="flex items-center gap-3">
                    <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {t('entries.filterProject')}
                    </label>
                    <select
                      value={filterProject}
                      onChange={(e) => setFilterProject(e.target.value)}
                      className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">{t('entries.allProjects')}</option>
                      {projects.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {t('entries.filterDateRange')}
                    </label>
                    <select
                      value={filterDateRange}
                      onChange={(e) => setFilterDateRange(e.target.value as any)}
                      className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="all">{t('entries.allTime')}</option>
                      <option value="today">{t('entries.today')}</option>
                      <option value="week">{t('entries.thisWeek')}</option>
                      <option value="month">{t('entries.thisMonth')}</option>
                    </select>
                  </div>
                </div>

                {/* Entries List */}
                {filteredEntries.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      {t('entries.empty')}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto">
                    {filteredEntries.map(entry => {
                      const project = projects.find(p => p.id === entry.projectId);
                      return (
                        <div
                          key={entry.id}
                          className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            {project && (
                              <div
                                className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5"
                                style={{ backgroundColor: project.color }}
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-gray-900 dark:text-white">
                                  {entry.projectName}
                                </p>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(entry.startTime).toLocaleDateString()}
                                </span>
                              </div>
                              {entry.description && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                  {entry.description}
                                </p>
                              )}
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-gray-600 dark:text-gray-400">
                                  <Clock className="w-3 h-3 inline mr-1" />
                                  {formatDuration(entry.duration)}
                                </span>
                                <span className="text-green-600 dark:text-green-400 font-semibold">
                                  ${entry.earnings.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteEntry(entry.id)}
                            className="p-1.5 text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Project Modal */}
        {showProjectModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {editingProject ? t('projectModal.titleEdit') : t('projectModal.titleAdd')}
                </h3>
                <button
                  onClick={() => {
                    setShowProjectModal(false);
                    setEditingProject(null);
                    setProjectForm({ name: '', client: '', hourlyRate: 50, color: '#3b82f6' });
                  }}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('projectModal.labelName')}
                  </label>
                  <input
                    type="text"
                    value={projectForm.name}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={t('projectModal.placeholderName')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('projectModal.labelClient')}
                  </label>
                  <input
                    type="text"
                    value={projectForm.client}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, client: e.target.value }))}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={t('projectModal.placeholderClient')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('projectModal.labelRate')}
                  </label>
                  <input
                    type="number"
                    value={projectForm.hourlyRate}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, hourlyRate: Number(e.target.value) }))}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('projectModal.labelColor')}
                  </label>
                  <input
                    type="color"
                    value={projectForm.color}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full h-12 px-2 py-1 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={editingProject ? updateProject : addProject}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    {editingProject ? t('projectModal.buttonUpdate') : t('projectModal.buttonAdd')} {t('projectModal.buttonSuffix')}
                  </button>
                  <button
                    onClick={() => {
                      setShowProjectModal(false);
                      setEditingProject(null);
                      setProjectForm({ name: '', client: '', hourlyRate: 50, color: '#3b82f6' });
                    }}
                    className="px-4 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold transition-colors"
                  >
                    {t('projectModal.buttonCancel')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Manual Entry Modal */}
        {showManualEntry && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t('manualModal.title')}
                </h3>
                <button
                  onClick={() => {
                    setShowManualEntry(false);
                    setManualForm({
                      date: new Date().toISOString().split('T')[0],
                      hours: 0,
                      minutes: 0,
                      projectId: '',
                      description: ''
                    });
                  }}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('manualModal.labelDate')}
                  </label>
                  <input
                    type="date"
                    value={manualForm.date}
                    onChange={(e) => setManualForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {t('manualModal.labelHours')}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={manualForm.hours}
                      onChange={(e) => setManualForm(prev => ({ ...prev, hours: Number(e.target.value) }))}
                      className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      {t('manualModal.labelMinutes')}
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={manualForm.minutes}
                      onChange={(e) => setManualForm(prev => ({ ...prev, minutes: Number(e.target.value) }))}
                      className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('manualModal.labelProject')}
                  </label>
                  <select
                    value={manualForm.projectId}
                    onChange={(e) => setManualForm(prev => ({ ...prev, projectId: e.target.value }))}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">{t('manualModal.placeholderProject')}</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.name} - {p.client}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {t('manualModal.labelDescription')}
                  </label>
                  <textarea
                    value={manualForm.description}
                    onChange={(e) => setManualForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={t('manualModal.placeholderDescription')}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={addManualEntry}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
                  >
                    <Save className="w-5 h-5" />
                    {t('manualModal.buttonAdd')}
                  </button>
                  <button
                    onClick={() => {
                      setShowManualEntry(false);
                      setManualForm({
                        date: new Date().toISOString().split('T')[0],
                        hours: 0,
                        minutes: 0,
                        projectId: '',
                        description: ''
                      });
                    }}
                    className="px-4 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold transition-colors"
                  >
                    {t('manualModal.buttonCancel')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
