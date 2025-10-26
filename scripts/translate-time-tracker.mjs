#!/usr/bin/env node

/**
 * Translate Time Tracker Tool Strings from English to Dutch
 * Uses FREE Google Translate via @iamtraction/google-translate (no API key needed!)
 */

import translate from '@iamtraction/google-translate';

const strings = {
  // Breadcrumb & Navigation (5)
  breadcrumbHome: "Home",
  breadcrumbTools: "Tools",
  breadcrumbTimeTracker: "Time Tracker",
  breadcrumbSeparator: "→",

  // Hero Section (2)
  heroTitle: "Time Tracker",
  heroSubtitle: "Track billable hours, manage projects, and calculate earnings automatically. Perfect for freelancers and consultants.",

  // Summary Cards (8)
  summaryToday: "Today",
  summaryThisWeek: "This Week",
  summaryThisMonth: "This Month",
  summaryAllTime: "All Time",
  hoursUnit: "h",
  currencySymbol: "$",

  // Timer Card (7)
  timerTitle: "Live Timer",
  timerSelectProject: "Select Project...",
  timerDescription: "What are you working on?",
  timerStart: "Start",
  timerPause: "Pause",
  timerResume: "Resume",
  timerStop: "Stop",

  // Quick Actions (4)
  quickActionsTitle: "Quick Actions",
  quickActionsManualEntry: "Add Manual Entry",
  quickActionsAddProject: "Add Project",
  quickActionsExport: "Export to CSV",

  // Projects List (4)
  projectsTitle: "Projects",
  projectsEmpty: "No projects yet. Add one to get started!",
  projectsHourlyRate: "/hr",
  projectsCount: "({count})",

  // Time Entries (10)
  entriesTitle: "Time Entries",
  entriesFilterProject: "Project",
  entriesFilterDateRange: "Date Range",
  entriesAllProjects: "All Projects",
  entriesAllTime: "All Time",
  entriesToday: "Today",
  entriesThisWeek: "This Week",
  entriesThisMonth: "This Month",
  entriesEmpty: "No time entries yet. Start the timer or add a manual entry!",

  // Project Modal (11)
  projectModalTitleEdit: "Edit Project",
  projectModalTitleAdd: "Add Project",
  projectModalLabelName: "Project Name",
  projectModalPlaceholderName: "Website Redesign",
  projectModalLabelClient: "Client Name",
  projectModalPlaceholderClient: "Acme Corp",
  projectModalLabelRate: "Hourly Rate ($)",
  projectModalLabelColor: "Color",
  projectModalButtonUpdate: "Update",
  projectModalButtonAdd: "Add",
  projectModalButtonSuffix: "Project",
  projectModalButtonCancel: "Cancel",

  // Manual Entry Modal (10)
  manualModalTitle: "Add Manual Entry",
  manualModalLabelDate: "Date",
  manualModalLabelHours: "Hours",
  manualModalLabelMinutes: "Minutes",
  manualModalLabelProject: "Project",
  manualModalPlaceholderProject: "Select Project...",
  manualModalLabelDescription: "Description",
  manualModalPlaceholderDescription: "What did you work on?",
  manualModalButtonAdd: "Add Entry",
  manualModalButtonCancel: "Cancel",

  // Confirmations (2)
  confirmDeleteProject: "Delete this project? This will not affect existing time entries.",
  confirmDeleteEntry: "Delete this time entry?",

  // CSV Export (1)
  csvFilename: "time-tracker-export",
};

async function translateStrings() {
  console.log('🌍 Starting FREE Google Translate (no API key!)...\n');

  const translations = {};
  const totalStrings = Object.keys(strings).length;
  let currentIndex = 0;

  for (const [key, value] of Object.entries(strings)) {
    currentIndex++;

    try {
      // Skip technical strings and symbols
      if (value === '→' || value === '$' || value === 'h' || value === '({count})' || value === '/hr') {
        translations[key] = value;
        console.log(`[${currentIndex}/${totalStrings}] ⏭️  Skipped: ${key} = "${value}" (technical)`);
        continue;
      }

      // Translate to Dutch
      const result = await translate(value, { from: 'en', to: 'nl' });
      translations[key] = result.text;

      console.log(`[${currentIndex}/${totalStrings}] ✅ ${key}: "${value}" → "${result.text}"`);

      // Rate limiting: wait 200ms between requests
      await new Promise(resolve => setTimeout(resolve, 200));

    } catch (error) {
      console.error(`[${currentIndex}/${totalStrings}] ❌ Failed to translate "${key}":`, error.message);
      translations[key] = value; // Fallback to English
    }
  }

  return translations;
}

function generateJsonStructure(translations) {
  return {
    timeTracker: {
      breadcrumb: {
        home: translations.breadcrumbHome,
        tools: translations.breadcrumbTools,
        timeTracker: translations.breadcrumbTimeTracker,
        separator: translations.breadcrumbSeparator
      },
      hero: {
        title: translations.heroTitle,
        subtitle: translations.heroSubtitle
      },
      summaryCards: {
        today: translations.summaryToday,
        thisWeek: translations.summaryThisWeek,
        thisMonth: translations.summaryThisMonth,
        allTime: translations.summaryAllTime,
        hoursUnit: translations.hoursUnit,
        currencySymbol: translations.currencySymbol
      },
      timer: {
        title: translations.timerTitle,
        selectProject: translations.timerSelectProject,
        description: translations.timerDescription,
        start: translations.timerStart,
        pause: translations.timerPause,
        resume: translations.timerResume,
        stop: translations.timerStop
      },
      quickActions: {
        title: translations.quickActionsTitle,
        manualEntry: translations.quickActionsManualEntry,
        addProject: translations.quickActionsAddProject,
        export: translations.quickActionsExport
      },
      projects: {
        title: translations.projectsTitle,
        empty: translations.projectsEmpty,
        hourlyRate: translations.projectsHourlyRate,
        count: translations.projectsCount
      },
      entries: {
        title: translations.entriesTitle,
        filterProject: translations.entriesFilterProject,
        filterDateRange: translations.entriesFilterDateRange,
        allProjects: translations.entriesAllProjects,
        allTime: translations.entriesAllTime,
        today: translations.entriesToday,
        thisWeek: translations.entriesThisWeek,
        thisMonth: translations.entriesThisMonth,
        empty: translations.entriesEmpty
      },
      projectModal: {
        titleEdit: translations.projectModalTitleEdit,
        titleAdd: translations.projectModalTitleAdd,
        labelName: translations.projectModalLabelName,
        placeholderName: translations.projectModalPlaceholderName,
        labelClient: translations.projectModalLabelClient,
        placeholderClient: translations.projectModalPlaceholderClient,
        labelRate: translations.projectModalLabelRate,
        labelColor: translations.projectModalLabelColor,
        buttonUpdate: translations.projectModalButtonUpdate,
        buttonAdd: translations.projectModalButtonAdd,
        buttonSuffix: translations.projectModalButtonSuffix,
        buttonCancel: translations.projectModalButtonCancel
      },
      manualModal: {
        title: translations.manualModalTitle,
        labelDate: translations.manualModalLabelDate,
        labelHours: translations.manualModalLabelHours,
        labelMinutes: translations.manualModalLabelMinutes,
        labelProject: translations.manualModalLabelProject,
        placeholderProject: translations.manualModalPlaceholderProject,
        labelDescription: translations.manualModalLabelDescription,
        placeholderDescription: translations.manualModalPlaceholderDescription,
        buttonAdd: translations.manualModalButtonAdd,
        buttonCancel: translations.manualModalButtonCancel
      },
      confirmations: {
        deleteProject: translations.confirmDeleteProject,
        deleteEntry: translations.confirmDeleteEntry
      },
      csv: {
        filename: translations.csvFilename
      }
    }
  };
}

async function main() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║  Time Tracker Translation Script (English → Dutch)      ║');
  console.log('║  FREE Google Translate (no API key needed!)             ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  try {
    const translations = await translateStrings();
    const jsonStructure = generateJsonStructure(translations);

    console.log('\n\n✅ Translation Complete!');
    console.log('📊 Summary:', Object.keys(translations).length, 'strings translated');
    console.log('\n📋 JSON Structure for messages/nl.json:\n');
    console.log(JSON.stringify(jsonStructure, null, 2));

    console.log('\n\n📝 Next Steps:');
    console.log('1. Copy the JSON structure above to messages/nl.json (merge with existing content)');
    console.log('2. Add the same structure to messages/en.json with original English strings');
    console.log('3. Update app/[locale]/tools/time-tracker/page.tsx to use useTranslations');
    console.log('4. Run: npm run build');

  } catch (error) {
    console.error('❌ Translation failed:', error);
    process.exit(1);
  }
}

main();
