// scripts/import-tools.ts
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL || '';

if (!connectionString) {
 throw new Error('DATABASE_URL or NETLIFY_DATABASE_URL environment variable is required');
}

const sql = neon(connectionString);

interface ToolData {
 name: string;
 slug: string;
 description: string;
 category: 'tool' | 'resource';
 icon: string;
 color: string;
 tool_url: string;
 is_available: boolean;
 featured: boolean;
 sort_order: number;
 status: 'published' | 'draft';
}

const tools: ToolData[] = [
 {
 name: 'Time Tracker',
 slug: 'time-tracker',
 description: 'Track your billable hours and generate reports for your clients',
 category: 'tool',
 icon: 'Clock',
 color: '#3B82F6',
 tool_url: '/tools/time-tracker',
 is_available: true,
 featured: true,
 sort_order: 1,
 status: 'published',
 },
 {
 name: 'Rate Calculator',
 slug: 'rate-calculator',
 description: 'Calculate your ideal hourly rate based on your costs and goals',
 category: 'tool',
 icon: 'Calculator',
 color: '#10B981',
 tool_url: '/tools/rate-calculator',
 is_available: true,
 featured: true,
 sort_order: 2,
 status: 'published',
 },
];

async function importTools() {
 console.log(' Starting tools import...\n');

 let successCount = 0;
 let errorCount = 0;

 for (const tool of tools) {
 try {
 // Check if tool already exists
 const existing = await sql`
 SELECT id FROM tools WHERE slug = ${tool.slug} LIMIT 1
 `;

 if (existing.length >0) {
 console.log(` Skipping "${tool.name}" - already exists`);
 continue;
 }

 // Insert tool
 await sql`
 INSERT INTO tools (
 owner_id,
 name,
 slug,
 description,
 category,
 icon,
 color,
 tool_url,
 is_available,
 featured,
 sort_order,
 views,
 status,
 created_at,
 updated_at
 ) VALUES (
 'test-owner-id',
 ${tool.name},
 ${tool.slug},
 ${tool.description},
 ${tool.category},
 ${tool.icon},
 ${tool.color},
 ${tool.tool_url},
 ${tool.is_available},
 ${tool.featured},
 ${tool.sort_order},
 0,
 ${tool.status},
 NOW(),
 NOW()
 )
 `;

 console.log(`✅ Imported: ${tool.name}`);
 successCount++;
 } catch (error) {
 console.error(`❌ Error importing "${tool.name}":`, error);
 errorCount++;
 }
 }

 console.log('\n Import Summary:');
 console.log(` ✅ Success: ${successCount}`);
 console.log(` ❌ Errors: ${errorCount}`);
 console.log(` Total: ${tools.length}\n`);
}

// Run the import
importTools()
 .then(() =>{
 console.log(' Tools import complete!');
 process.exit(0);
 })
 .catch((error) =>{
 console.error(' Fatal error:', error);
 process.exit(1);
 });
