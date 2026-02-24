import * as React from 'react';
import { Button, Section, Text } from '@react-email/components';
import { BaseLayout } from './components/BaseLayout';
import {
 contentSection,
 paragraph,
 ctaButton,
} from './components/styles';
import type { Locale } from './translations';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skilllinkup.com';

interface BidRejectedEmailProps {
 freelancerName: string;
 projectTitle: string;
 locale?: Locale;
}

export const BidRejectedEmail = ({
 freelancerName,
 projectTitle,
 locale = 'en',
}: BidRejectedEmailProps) =>{
 return (
 <BaseLayout
 locale={locale}
 preview={`Update on your bid for "${projectTitle}"`}
 showHero={false}
 >
 <Section style={contentSection}>
 <Text style={heading}>Bid Update</Text>

 <Text style={paragraph}>Hi {freelancerName},</Text>
 <Text style={paragraph}>
 The client has selected another freelancer for{' '}
 <strong>&ldquo;{projectTitle}&rdquo;</strong>.
 </Text>
 <Text style={paragraph}>
 Don&apos;t worry — this is a normal part of the bidding process. There are
 plenty of other great projects waiting for your skills. Keep applying and your
 next win could be just around the corner!
 </Text>
 <Text style={tipText}>
 Tip: A well-written proposal with a clear plan and competitive price increases
 your chances of winning future projects.
 </Text>
 </Section>

 <Section style={ctaSection}>
 <Button
 style={ctaButton}
 href={`${baseUrl}/marketplace/projects`}
 >
 Browse Projects
 </Button>
 </Section>
 </BaseLayout>
 );
};

// Additional styles
const heading: React.CSSProperties = {
 color: '#1e1541',
 fontSize: '24px',
 fontWeight: '700',
 margin: '0 0 20px 0',
 lineHeight: '1.3',
};

const tipText: React.CSSProperties = {
 backgroundColor: '#f8f9fb',
 borderLeft: '4px solid #ef2b70',
 borderRadius: '0 8px 8px 0',
 color: '#64607d',
 fontSize: '14px',
 lineHeight: '1.6',
 margin: '16px 0 0 0',
 padding: '12px 16px',
};

const ctaSection: React.CSSProperties = {
 padding: '8px 32px 32px 32px',
 textAlign: 'center' as const,
};

export default BidRejectedEmail;
