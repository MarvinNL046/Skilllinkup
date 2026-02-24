import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BarChart3, CheckCircle, Zap, Calendar, Users, Folder, Star, Clock } from 'lucide-react';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { locale } = await params;

 const slug = 'project-management-tools-freelancers';
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';
 const pageUrl = `${siteUrl}/${locale}/resources/${slug}`;

 if (locale === 'nl') {
 return {
 title: 'Projectmanagement Tools voor Freelancers: Verhoog Je Productiviteit',
 description: 'Vergelijk de beste projectmanagement tools voor freelancers. Organiseer taken, beheer deadlines en werk samen met klanten via Trello, Asana, Notion en meer.',
 keywords: 'projectmanagement, freelance productiviteit, taakbeheer, Trello, Asana, Notion',
 openGraph: {
 title: 'Beste Projectmanagement Tools voor Freelancers',
 description: 'Verhoog je productiviteit met top projectmanagement tools ontworpen voor freelancers.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Projectmanagement Tools voor Freelancers' }],
 locale: 'nl_NL',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Beste Projectmanagement Tools voor Freelancers',
 description: 'Vergelijk Trello, Asana, Notion en meer voor freelance productiviteit.',
 images: [`${siteUrl}/images/og/resources-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: { 'en': `${siteUrl}/en/resources/${slug}`, 'nl': `${siteUrl}/nl/resources/${slug}` },
 },
 robots: {
 index: true,
 follow: true,
 googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
 },
 };
 }

 return {
 title: 'Project Management Tools for Freelancers: Boost Your Productivity',
 description: 'Compare the best project management tools for freelancers. Organize tasks, manage deadlines, and collaborate with clients using Trello, Asana, Notion, and more.',
 keywords: 'project management, freelance productivity, task management, Trello, Asana, Notion',
 openGraph: {
 title: 'Best Project Management Tools for Freelancers',
 description: 'Boost productivity with top project management tools designed for freelancers.',
 url: pageUrl,
 siteName: 'SkillLinkup',
 images: [{ url: `${siteUrl}/images/og/resources-og.png`, width: 1200, height: 630, alt: 'Project Management Tools for Freelancers' }],
 locale: 'en_US',
 type: 'article',
 },
 twitter: {
 card: 'summary_large_image',
 title: 'Best Project Management Tools for Freelancers',
 description: 'Compare Trello, Asana, Notion and more for freelance productivity.',
 images: [`${siteUrl}/images/og/resources-og.png`],
 creator: '@SkillLinkup',
 site: '@SkillLinkup',
 },
 alternates: {
 canonical: pageUrl,
 languages: { 'en': `${siteUrl}/en/resources/${slug}`, 'nl': `${siteUrl}/nl/resources/${slug}` },
 },
 robots: {
 index: true,
 follow: true,
 googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
 },
 };
}

export default async function ProjectManagementToolsPage({ params }: PageProps) {
 const { locale } = await params;
 const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

 const articleSchema = {
 '@context': 'https://schema.org',
 '@type': 'Article',
 headline: 'Project Management Tools for Freelancers: Boost Your Productivity',
 description: 'Compare the best project management tools for freelancers.',
 author: { '@type': 'Organization', name: 'SkillLinkup' },
 publisher: {
 '@type': 'Organization',
 name: 'SkillLinkup',
 logo: { '@type': 'ImageObject', url: `${siteUrl}/images/logo/skilllinkup-transparant-rozepunt.webp` },
 },
 datePublished: '2026-01-15',
 };

 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

 <Header />
 <main className="flex-1 bg-gray-50 dark:bg-gray-900">
 {/* Hero */}
 <section className="bg-gradient-to-br from-secondary via-primary-dark to-accent py-16 sm:py-24">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto text-center">
 <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
 <BarChart3 className="w-8 h-8 text-white" />
 </div>
 <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
 Project Management Tools for Freelancers: Boost Your Productivity
 </h1>
 <p className="text-xl text-white/90 mb-8">
 Discover the best project management tools to organize tasks, meet deadlines, and deliver exceptional results to clients while staying sane.
 </p>
 <div className="flex flex-wrap gap-4 justify-center">
 <Link href={`/${locale}/tools`} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-secondary rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg">
 <Zap className="w-5 h-5" />
 Browse Freelance Tools
 </Link>
 </div>
 </div>
 </div>
 </section>

 {/* Content */}
 <article className="py-16">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-4xl mx-auto">
 <div className="prose prose-lg dark:prose-invert max-w-none">
 <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed border-l-4 border-secondary dark:border-accent pl-6 py-2 mb-8">
 Managing multiple clients, projects, and deadlines without a system is a recipe for missed deadlines, stressed clients, and burnout. The right project management tool transforms chaos into clarity.
 </p>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 Why Freelancers Need Project Management Tools
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 As a freelancer, you're not just doing the work—you're managing it all. Project management tools help you track tasks, meet deadlines, communicate with clients, and maintain visibility into your workload. Without these tools, critical details fall through the cracks.
 </p>

 <div className="grid md:grid-cols-3 gap-6 my-8">
 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
 <Calendar className="w-10 h-10 text-secondary dark:text-accent mb-3" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Never Miss Deadlines</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm">Visual timelines and reminders keep you on track</p>
 </div>
 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
 <Users className="w-10 h-10 text-secondary dark:text-accent mb-3" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Client Collaboration</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm">Share progress, get feedback, and manage revisions</p>
 </div>
 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
 <Folder className="w-10 h-10 text-secondary dark:text-accent mb-3" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Centralized Files</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm">All project assets and documents in one place</p>
 </div>
 </div>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 Essential Features for Freelancers
 </h2>
 <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
 <li><strong>Task boards:</strong>Visual organization with drag-and-drop simplicity</li>
 <li><strong>Calendar views:</strong>See all deadlines and commitments at a glance</li>
 <li><strong>Client access:</strong>Share specific projects with clients for transparency</li>
 <li><strong>File attachments:</strong>Keep all project files centralized and accessible</li>
 <li><strong>Deadline reminders:</strong>Automated notifications so nothing slips through</li>
 <li><strong>Templates:</strong>Reuse workflows for recurring project types</li>
 <li><strong>Mobile apps:</strong>Manage projects from anywhere</li>
 </ul>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 Top Project Management Tools Compared
 </h2>

 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
 1. Trello (Freemium)
 </h3>
 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 my-6 border border-gray-200 dark:border-gray-700">
 <div className="flex items-start justify-between mb-4">
 <div className="flex items-center gap-3">
 <div className="flex items-center gap-1">
 <Star className="w-5 h-5 fill-secondary text-secondary" />
 <Star className="w-5 h-5 fill-secondary text-secondary" />
 <Star className="w-5 h-5 fill-secondary text-secondary" />
 <Star className="w-5 h-5 fill-secondary text-secondary" />
 <Star className="w-5 h-5 fill-secondary text-secondary" />
 </div>
 <span className="font-bold text-gray-900 dark:text-white">4.8</span>
 </div>
 <span className="px-3 py-1 bg-accent text-white text-sm font-semibold rounded-full">FREE</span>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Visual, intuitive Kanban-style boards perfect for freelancers who love simplicity. Drag-and-drop cards between "To Do", "In Progress", and "Done" lists.
 </p>
 <div className="grid md:grid-cols-2 gap-4 mb-4">
 <div>
 <p className="font-semibold text-gray-900 dark:text-white mb-2">✅ Pros</p>
 <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
 <li>• Extremely easy to learn</li>
 <li>• Beautiful, visual interface</li>
 <li>• Generous free plan</li>
 <li>• Power-Ups for extensions</li>
 <li>• Great mobile apps</li>
 </ul>
 </div>
 <div>
 <p className="font-semibold text-gray-900 dark:text-white mb-2">❌ Cons</p>
 <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
 <li>• Limited advanced features</li>
 <li>• No built-in time tracking</li>
 <li>• Can get messy with many projects</li>
 </ul>
 </div>
 </div>
 <p className="text-sm text-gray-600 dark:text-gray-400">
 <strong>Best for:</strong>Visual thinkers who want simple task management without complexity. Ideal for freelancers with 5-15 active projects.
 </p>
 </div>

 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
 2. Asana (Freemium)
 </h3>
 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 my-6 border border-gray-200 dark:border-gray-700">
 <div className="flex items-start justify-between mb-4">
 <div className="flex items-center gap-3">
 <div className="flex items-center gap-1">
 <Star className="w-5 h-5 fill-primary text-primary" />
 <Star className="w-5 h-5 fill-primary text-primary" />
 <Star className="w-5 h-5 fill-primary text-primary" />
 <Star className="w-5 h-5 fill-primary text-primary" />
 <Star className="w-5 h-5 fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600" />
 </div>
 <span className="font-bold text-gray-900 dark:text-white">4.5</span>
 </div>
 <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-semibold rounded-full">$11/mo</span>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Powerful task and project management with multiple views (list, board, timeline, calendar). More structured than Trello with excellent collaboration features.
 </p>
 <div className="space-y-2 mb-4">
 <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
 <span>Multiple project views for different workflows</span>
 </div>
 <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
 <span>Timeline/Gantt charts for planning</span>
 </div>
 <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
 <span>Robust task dependencies and subtasks</span>
 </div>
 <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
 <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
 <span>Custom fields for tracking additional details</span>
 </div>
 </div>
 <p className="text-sm text-gray-600 dark:text-gray-400">
 <strong>Best for:</strong>Freelancers managing complex projects with multiple phases and dependencies.
 </p>
 </div>

 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
 3. Notion (Freemium)
 </h3>
 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 my-6 border border-gray-200 dark:border-gray-700">
 <div className="flex items-start justify-between mb-4">
 <div className="flex items-center gap-3">
 <div className="flex items-center gap-1">
 <Star className="w-5 h-5 fill-primary text-primary" />
 <Star className="w-5 h-5 fill-primary text-primary" />
 <Star className="w-5 h-5 fill-primary text-primary" />
 <Star className="w-5 h-5 fill-primary text-primary" />
 <Star className="w-5 h-5 fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600" />
 </div>
 <span className="font-bold text-gray-900 dark:text-white">4.7</span>
 </div>
 <span className="px-3 py-1 bg-accent text-white text-sm font-semibold rounded-full">FREE</span>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 All-in-one workspace combining notes, tasks, wikis, and databases. Highly customizable and perfect for freelancers who want everything in one place.
 </p>
 <p className="text-sm text-gray-600 dark:text-gray-400">
 <strong>Best for:</strong>Freelancers who want a flexible system for projects, notes, client databases, and knowledge management.
 </p>
 </div>

 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
 4. Monday.com (Paid)
 </h3>
 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 my-6 border border-gray-200 dark:border-gray-700">
 <div className="flex items-start justify-between mb-4">
 <div className="flex items-center gap-3">
 <div className="flex items-center gap-1">
 <Star className="w-5 h-5 fill-primary text-primary" />
 <Star className="w-5 h-5 fill-primary text-primary" />
 <Star className="w-5 h-5 fill-primary text-primary" />
 <Star className="w-5 h-5 fill-primary text-primary" />
 <Star className="w-5 h-5 fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600" />
 </div>
 <span className="font-bold text-gray-900 dark:text-white">4.6</span>
 </div>
 <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-semibold rounded-full">$10/mo</span>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Colorful, visual work management platform with automation capabilities. Great for freelancers who want professional polish and advanced features.
 </p>
 <p className="text-sm text-gray-600 dark:text-gray-400">
 <strong>Best for:</strong>Established freelancers managing teams or large-scale client projects.
 </p>
 </div>

 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
 5. ClickUp (Freemium)
 </h3>
 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 my-6 border border-gray-200 dark:border-gray-700">
 <div className="flex items-start justify-between mb-4">
 <div className="flex items-center gap-3">
 <div className="flex items-center gap-1">
 <Star className="w-5 h-5 fill-primary text-primary" />
 <Star className="w-5 h-5 fill-primary text-primary" />
 <Star className="w-5 h-5 fill-primary text-primary" />
 <Star className="w-5 h-5 fill-primary text-primary" />
 <Star className="w-5 h-5 fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600" />
 </div>
 <span className="font-bold text-gray-900 dark:text-white">4.5</span>
 </div>
 <span className="px-3 py-1 bg-accent text-white text-sm font-semibold rounded-full">FREE</span>
 </div>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Feature-packed platform with built-in time tracking, docs, goals, and more. Generous free plan with unlimited tasks and projects.
 </p>
 <p className="text-sm text-gray-600 dark:text-gray-400">
 <strong>Best for:</strong>Power users who want maximum features on a budget.
 </p>
 </div>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 Choosing the Right Tool for Your Workflow
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 The "best" tool depends on your specific needs. Consider:
 </p>
 <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
 <li><strong>Simplicity vs. Features:</strong>Trello for simplicity, Asana/ClickUp for power features</li>
 <li><strong>Visual preferences:</strong>Kanban boards vs. list views vs. calendar views</li>
 <li><strong>Client collaboration:</strong>How much do clients need to see and interact?</li>
 <li><strong>Budget:</strong>Free plans vs. paid features you actually need</li>
 <li><strong>Integration needs:</strong>What other tools do you use daily?</li>
 </ul>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 Setting Up Your Project Management System
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 Whatever tool you choose, follow these best practices:
 </p>

 <div className="bg-white dark:bg-gray-800 rounded-xl p-6 my-6 border border-gray-200 dark:border-gray-700">
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Create Project Templates</h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Build reusable templates for recurring project types. Include all standard tasks, checklists, and timelines. This saves hours when starting new projects.
 </p>

 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Use Consistent Naming</h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Develop naming conventions for projects and tasks. Example: "[Client Name] - Project Name" or "2026-Q1-ClientName-ProjectType"
 </p>

 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Set Realistic Deadlines</h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Add buffer time to estimates. Set internal deadlines before client deadlines to account for revisions and unexpected issues.
 </p>

 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">4. Review Weekly</h3>
 <p className="text-gray-700 dark:text-gray-300">
 Schedule 30 minutes every Monday to review all projects, update statuses, and plan the week ahead. This prevents surprises and keeps clients informed.
 </p>
 </div>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 Integrating With Other Tools
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 Project management tools become more powerful when integrated with your existing workflow:
 </p>
 <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
 <li><strong>Time tracking:</strong>Track time directly from project tasks</li>
 <li><strong>Calendar:</strong>Sync deadlines with Google Calendar or Outlook</li>
 <li><strong>Email:</strong>Create tasks from emails automatically</li>
 <li><strong>File storage:</strong>Link Dropbox, Google Drive, or OneDrive</li>
 <li><strong>Communication:</strong>Connect Slack for team updates</li>
 </ul>

 <div className="bg-gradient-to-r from-secondary/10 to-accent/10 dark:from-secondary/20 dark:to-accent/20 rounded-xl p-6 my-6 border-l-4 border-secondary">
 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Complete Your Workflow</h3>
 <p className="text-gray-700 dark:text-gray-300 mb-4">
 Pair your project management tool with our free time tracker to monitor how long tasks actually take. This data helps you estimate future projects more accurately and identify bottlenecks.
 </p>
 <Link href={`/${locale}/tools/time-tracker`} className="inline-flex items-center gap-2 text-secondary dark:text-accent font-semibold hover:underline">
 Try Free Time Tracker →
 </Link>
 </div>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 Common Project Management Mistakes
 </h2>
 <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 my-6">
 <p className="text-red-800 dark:text-red-200 mb-3">
 <strong>❌ Over-complicating the system:</strong>Start simple. Add complexity only when needed.
 </p>
 <p className="text-red-800 dark:text-red-200 mb-3">
 <strong>❌ Not updating regularly:</strong>Outdated project boards are worse than no system at all.
 </p>
 <p className="text-red-800 dark:text-red-200 mb-3">
 <strong>❌ Too many boards/projects:</strong>Keep active projects visible, archive completed ones.
 </p>
 <p className="text-red-800 dark:text-red-200">
 <strong>❌ Ignoring the mobile app:</strong>Quick updates on-the-go keep your system current.
 </p>
 </div>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 Client-Facing Project Management
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 Should you give clients access to your project management tool? It depends:
 </p>
 <div className="grid md:grid-cols-2 gap-6 my-6">
 <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
 <h3 className="text-lg font-bold text-green-900 dark:text-green-100 mb-3">✅ Give Access When:</h3>
 <ul className="text-sm text-green-800 dark:text-green-200 space-y-2">
 <li>• Client needs to approve milestones</li>
 <li>• Multiple stakeholders need visibility</li>
 <li>• Frequent revision cycles expected</li>
 <li>• Long-term retainer relationship</li>
 </ul>
 </div>
 <div className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl p-6">
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Keep Private When:</h3>
 <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
 <li>• Simple one-off projects</li>
 <li>• Client prefers email updates</li>
 <li>• You manage multiple clients in one board</li>
 <li>• Internal tasks client shouldn't see</li>
 </ul>
 </div>
 </div>

 <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
 Scaling Your System As You Grow
 </h2>
 <p className="text-gray-700 dark:text-gray-300 mb-6">
 As your freelance business grows, your project management needs evolve:
 </p>
 <div className="space-y-4 mb-6">
 <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">Solo (1-5 clients)</h3>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 Trello or Notion free plans work great. Focus on task completion, not complex workflows.
 </p>
 </div>
 <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">Established (5-15 clients)</h3>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 Consider Asana or ClickUp for better organization and automation. Templates become essential.
 </p>
 </div>
 <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
 <h3 className="font-bold text-gray-900 dark:text-white mb-2">Agency (15+ clients or team)</h3>
 <p className="text-gray-700 dark:text-gray-300 text-sm">
 Monday.com or enterprise plans with advanced reporting, resource management, and client portals.
 </p>
 </div>
 </div>
 </div>

 {/* CTA */}
 <div className="bg-gradient-to-br from-secondary via-primary-dark to-accent rounded-2xl p-8 md:p-12 text-center mt-16 shadow-2xl">
 <h2 className="text-3xl font-bold text-white mb-4">
 Organize Your Freelance Projects Today
 </h2>
 <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
 Combine project management with time tracking and invoicing to run your freelance business efficiently. Try our free tools.
 </p>
 <div className="flex flex-wrap gap-4 justify-center">
 <Link href={`/${locale}/tools/time-tracker`} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-secondary rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg">
 <Clock className="w-5 h-5" />
 Track Project Time
 </Link>
 <Link href={`/${locale}/tools`} className="inline-flex items-center gap-2 px-8 py-4 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-all">
 Browse All Tools
 </Link>
 </div>
 </div>

 {/* Related */}
 <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
 <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Complete Productivity Toolkit</h2>
 <div className="grid md:grid-cols-2 gap-6">
 <Link href={`/${locale}/tools/time-tracker`} className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-secondary transition-all">
 <Clock className="w-8 h-8 text-secondary dark:text-accent mb-3" />
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-secondary dark:group-hover:text-accent">Time Tracker</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm">Track how long project tasks actually take</p>
 </Link>
 <Link href={`/${locale}/tools/invoice-generator`} className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-secondary transition-all">
 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-secondary dark:group-hover:text-accent">Invoice Generator</h3>
 <p className="text-gray-600 dark:text-gray-400 text-sm">Bill clients for completed projects professionally</p>
 </Link>
 </div>
 </div>
 </div>
 </div>
 </article>
 </main>
 <Footer />
 </>
 );
}
