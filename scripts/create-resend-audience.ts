import { Resend } from 'resend';

async function manageAudiences() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    console.log('🔍 Checking existing audiences...\n');

    // List existing audiences
    const list = await resend.audiences.list();
    console.log('📋 Response:', JSON.stringify(list, null, 2));

    if (list.error) {
      console.error('❌ Error:', list.error.message);
      console.log('\n💡 Possible solutions:');
      console.log('1. Wait a few minutes for the API key to activate');
      console.log('2. Verify your domain at https://resend.com/domains');
      console.log('3. Create a new API key at https://resend.com/api-keys');
      return;
    }

    if (list.data && list.data.data && list.data.data.length > 0) {
      console.log(`\n✅ Found ${list.data.data.length} existing audience(s):`);
      list.data.data.forEach((aud: any) => {
        console.log(`  - ${aud.name}: ${aud.id}`);
      });
      console.log('\n💡 Add this to your .env.local:');
      console.log(`RESEND_AUDIENCE_ID="${list.data.data[0].id}"`);
    } else {
      console.log('\n🎯 No audiences found. Creating new one...');

      const audience = await resend.audiences.create({
        name: 'SkillLinkup Newsletter Subscribers'
      });

      if (audience.error) {
        console.error('❌ Error creating audience:', audience.error.message);
        return;
      }

      console.log('✅ Audience created successfully!');
      console.log('📋 Audience ID:', audience.data?.id);
      console.log('\n💡 Add this to your .env.local:');
      console.log(`RESEND_AUDIENCE_ID="${audience.data?.id}"`);
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

manageAudiences();
