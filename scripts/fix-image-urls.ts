import { neon } from '@neondatabase/serverless';

async function fixImageUrls() {
 const sql = neon(process.env.DATABASE_URL!);

 try {
 console.log(' Finding posts with localhost image URLs...\n');

 // Get all posts
 const posts = await sql`
 SELECT id, title, content
 FROM posts
 WHERE content LIKE '%localhost:3000%' OR content LIKE '%http://localhost%'
 `;

 console.log(`Found ${posts.length} posts with localhost URLs\n`);

 for (const post of posts) {
 console.log(` Processing: ${post.title}`);

 // Replace all localhost URLs with relative paths
 let updatedContent = post.content || '';

 // Pattern 1: http://localhost:3000/images/...
 updatedContent = updatedContent.replace(
 /http:\/\/localhost:3000\/images\//g,
 '/images/'
 );

 // Pattern 2: http://localhost/images/...
 updatedContent = updatedContent.replace(
 /http:\/\/localhost\/images\//g,
 '/images/'
 );

 // Pattern 3: https://localhost:3000/images/...
 updatedContent = updatedContent.replace(
 /https:\/\/localhost:3000\/images\//g,
 '/images/'
 );

 // Update the post
 await sql`
 UPDATE posts
 SET content = ${updatedContent},
 updated_at = NOW()
 WHERE id = ${post.id}
 `;

 console.log(` ✅ Updated image URLs\n`);
 }

 console.log(' All done! Image URLs have been fixed.');
 } catch (error) {
 console.error('❌ Error fixing image URLs:', error);
 process.exit(1);
 }
}

fixImageUrls();
