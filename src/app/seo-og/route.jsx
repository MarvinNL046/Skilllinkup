import { ImageResponse } from 'next/og';

export function GET() {
  return new ImageResponse(<div style={{ background: '#f8fafb', color: '#172b40', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: 80, justifyContent: 'space-between' }}><div style={{ fontSize: 34, color: '#e9693b' }}>SkillLinkup</div><div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}><div style={{ fontSize: 68, fontWeight: 700 }}>Plan your next freelance project.</div><div style={{ fontSize: 30, color: '#52606d' }}>Practical guides. Clear briefs. Join the launch waitlist.</div></div></div>, { width: 1200, height: 630 });
}
