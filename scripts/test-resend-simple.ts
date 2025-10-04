import { Resend } from 'resend';

async function simpleTest() {
  console.log('🔑 API Key:', process.env.RESEND_API_KEY?.substring(0, 10) + '...');

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // Try to send a simple test email
    console.log('\n📧 Attempting to send test email...');

    const result = await resend.emails.send({
      from: 'SkillLinkup <hello@skilllinkup.com>',
      to: 'marvinsmit1988@gmail.com',
      subject: 'Resend Test from SkillLinkup',
      html: '<p>Testing Resend integration! ✅</p>',
    });

    console.log('✅ Success!');
    console.log('📋 Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

simpleTest();
