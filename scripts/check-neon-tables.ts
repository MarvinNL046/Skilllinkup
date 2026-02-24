import { neon } from '@neondatabase/serverless';

async function checkNeonTables() {
 const sql = neon(process.env.DATABASE_URL!);

 try {
 console.log(' Checking Neon database tables...\n');
 console.log('Database URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@'), '\n');

 // Get all tables in the database
 const tables = await sql`
 SELECT
 table_name,
 table_type
 FROM information_schema.tables
 WHERE table_schema = 'public'
 ORDER BY table_name;
 `;

 console.log(' Found', tables.length, 'tables:\n');

 for (const table of tables) {
 console.log(` ✓ ${table.table_name} (${table.table_type})`);
 }

 console.log('\n---\n');

 // Get column details for each table
 for (const table of tables) {
 const columns = await sql`
 SELECT
 column_name,
 data_type,
 is_nullable,
 column_default
 FROM information_schema.columns
 WHERE table_schema = 'public'
 AND table_name = ${table.table_name}
 ORDER BY ordinal_position;
 `;

 console.log(`\n Table: ${table.table_name} (${columns.length} columns)`);
 console.log('─'.repeat(80));

 for (const col of columns) {
 const nullable = col.is_nullable === 'YES' ? '?' : '';
 const defaultVal = col.column_default ? ` = ${col.column_default}` : '';
 console.log(` • ${col.column_name}: ${col.data_type}${nullable}${defaultVal}`);
 }
 }

 console.log('\n\n✅ Database inspection complete!');

 } catch (error) {
 console.error('❌ Error checking database:', error);
 process.exit(1);
 }
}

checkNeonTables();
