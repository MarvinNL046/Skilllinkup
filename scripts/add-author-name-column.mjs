import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL);

async function addColumn() {
  try {
    console.log('🔍 Checking if author_name column exists...');
    
    // Check if column already exists
    const checkColumn = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'posts' 
      AND column_name = 'author_name';
    `;
    
    if (checkColumn.length > 0) {
      console.log('✅ Column author_name already exists!');
    } else {
      console.log('📝 Adding author_name column...');
      
      // Add the column
      await sql`
        ALTER TABLE posts 
        ADD COLUMN author_name VARCHAR(255);
      `;
      
      console.log('✅ Successfully added author_name column!');
    }
    
    // Verify both columns
    console.log('\n📊 Verifying columns in posts table:');
    const verify = await sql`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns 
      WHERE table_name = 'posts' 
      AND column_name IN ('author_name', 'read_time')
      ORDER BY column_name;
    `;
    
    verify.forEach(col => {
      console.log(`  ✓ ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable})`);
    });
    
    console.log('\n🎉 Database update complete!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addColumn();
