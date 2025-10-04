import { Resend } from 'resend';

async function testResend() {
  const resend = new Resend(process.env.RESEND_API_KEY);

  console.log('🧪 Testing Resend API...\n');

  // Test 1: List audiences
  console.log('1️⃣ Testing audience list...');
  const audiences = await resend.audiences.list();

  if (audiences.error) {
    console.log('❌ Error:', audiences.error.message);
    console.log('\n📝 Status: Domain not verified yet or API key not active');
    console.log('💡 Please verify your domain at: https://resend.com/domains');
    return;
  }

  console.log('✅ API is working!');
  console.log('📋 Audiences:', JSON.stringify(audiences.data, null, 2));

  // If no audiences exist, create one
  if (!audiences.data?.data || audiences.data.data.length === 0) {
    console.log('\n2️⃣ No audiences found. Creating one...');

    const newAudience = await resend.audiences.create({
      name: 'SkillLinkup Newsletter Subscribers'
    });

    if (newAudience.error) {
      console.log('❌ Error creating audience:', newAudience.error.message);
      return;
    }

    console.log('✅ Audience created!');
    console.log('📋 Audience ID:', newAudience.data?.id);
    console.log('\n💡 Add this to your .env.local:');
    console.log(`RESEND_AUDIENCE_ID="${newAudience.data?.id}"`);
  } else {
    console.log('\n✅ Existing audience found!');
    console.log('📋 Audience ID:', audiences.data.data[0].id);
    console.log('\n💡 Add this to your .env.local:');
    console.log(`RESEND_AUDIENCE_ID="${audiences.data.data[0].id}"`);
  }

  console.log('\n🎉 Everything is ready to go!');
}

testResend();
