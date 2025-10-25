// scripts/import-platforms.ts
import 'dotenv/config';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL || '';

if (!connectionString) {
  throw new Error('DATABASE_URL or NETLIFY_DATABASE_URL environment variable is required');
}

const sql = neon(connectionString);

interface PlatformData {
  name: string;
  slug: string;
  description: string;
  logo_url?: string;
  website_url?: string;
  rating: number;
  category: string;
  fees: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  color?: string;
  featured: boolean;
  pros: string[];
  cons: string[];
  features: string[];
  status: 'published' | 'draft';
  published_at?: Date;
  work_type: 'remote' | 'local' | 'hybrid';
  countries: string[];
}

const platforms: PlatformData[] = [
  {
    name: 'PeoplePerHour',
    slug: 'peopleperhour',
    description: '<p>PeoplePerHour is a UK-based freelance marketplace connecting businesses with skilled professionals across development, design, marketing, and more. Known for its flexible hourly and project-based pricing models.</p><p>The platform offers a user-friendly interface with robust project management tools, making it ideal for both short-term gigs and long-term collaborations.</p>',
    website_url: 'https://www.peopleperhour.com',
    rating: 4.2,
    category: 'General Freelance',
    fees: '3.5% - 20% sliding scale',
    difficulty: 'Medium',
    color: '#E87E04',
    featured: false,
    pros: [
      'Flexible pricing models (hourly and fixed)',
      'Strong presence in Europe',
      'Good quality control with verified sellers',
      'AI-powered job matching'
    ],
    cons: [
      'High competition for beginners',
      'Platform fees can be significant for small projects',
      'Limited to certain regions for payment processing'
    ],
    features: [
      'Hourlies - fixed-price micro-services',
      'WorkStream collaboration tools',
      'Verified seller badges',
      'Proposal credits system'
    ],
    status: 'published',
    published_at: new Date(),
    work_type: 'remote',
    countries: ['Worldwide']
  },
  {
    name: 'Guru',
    slug: 'guru',
    description: '<p>Guru is a flexible work platform offering freelancers the ability to find work, manage projects, and get paid securely. With over 3 million members worldwide, it covers all major freelance categories.</p><p>Guru stands out with its SafePay system that ensures payment security for both freelancers and clients, along with robust workroom features for project collaboration.</p>',
    website_url: 'https://www.guru.com',
    rating: 4.1,
    category: 'General Freelance',
    fees: '5% - 9% membership tiers',
    difficulty: 'Medium',
    color: '#FF5A00',
    featured: false,
    pros: [
      'SafePay payment protection',
      'Flexible membership options',
      'Comprehensive workroom features',
      'Daily job matching emails'
    ],
    cons: [
      'Requires paid membership for full features',
      'Smaller project volume than top competitors',
      'Interface can feel outdated'
    ],
    features: [
      'SafePay escrow system',
      'Workroom collaboration tools',
      'Invoicing and time tracking',
      'Job matching algorithm'
    ],
    status: 'published',
    published_at: new Date(),
    work_type: 'remote',
    countries: ['Worldwide']
  },
  {
    name: 'Truelancer',
    slug: 'truelancer',
    description: '<p>Truelancer is a global freelancing platform connecting businesses with freelancers worldwide. With competitive fees and a wide range of categories, it\'s particularly popular in Asia and emerging markets.</p><p>The platform focuses on making freelancing accessible to professionals from developing countries while maintaining quality standards through verification systems.</p>',
    website_url: 'https://www.truelancer.com',
    rating: 3.9,
    category: 'General Freelance',
    fees: '10% commission',
    difficulty: 'Easy',
    color: '#00A3FF',
    featured: false,
    pros: [
      'Low entry barrier for beginners',
      'Competitive rates in emerging markets',
      'Growing platform with less saturation',
      'Active in Asia and developing regions'
    ],
    cons: [
      'Smaller client base than major platforms',
      'Payment processing can be slow',
      'Limited payment methods in some regions'
    ],
    features: [
      'Secure payment gateway',
      'Project milestones',
      'Dispute resolution',
      'Prime membership benefits'
    ],
    status: 'published',
    published_at: new Date(),
    work_type: 'remote',
    countries: ['Worldwide']
  },
  {
    name: 'Malt',
    slug: 'malt',
    description: '<p>Malt is Europe\'s leading freelance platform, especially strong in France, Germany, Spain, and the Netherlands. It focuses on high-quality professional services with a curated approach to freelancer selection.</p><p>The platform is known for its professional approach, offering business insurance, administrative support, and a strong focus on long-term B2B relationships.</p>',
    website_url: 'https://www.malt.com',
    rating: 4.4,
    category: 'General Freelance',
    fees: '10% commission',
    difficulty: 'Medium',
    color: '#FC5757',
    featured: true,
    pros: [
      'Strong European presence',
      'Professional business-focused approach',
      'Business insurance included',
      'High-quality client base',
      'Administrative support for freelancers'
    ],
    cons: [
      'Limited to European markets',
      'Selective approval process',
      'Higher competition among experienced freelancers'
    ],
    features: [
      'Professional liability insurance',
      'Invoicing and contract management',
      'Talent matching algorithm',
      'Business networking events'
    ],
    status: 'published',
    published_at: new Date(),
    work_type: 'remote',
    countries: ['Worldwide']
  },
  {
    name: 'FlexJobs',
    slug: 'flexjobs',
    description: '<p>FlexJobs specializes in remote, flexible, part-time, and freelance job opportunities. Unlike traditional freelance platforms, it focuses on curated, high-quality job listings with an emphasis on work-life balance.</p><p>The platform screens every job listing to ensure legitimacy, making it a trusted resource for professionals seeking remote work opportunities without scams or low-quality gigs.</p>',
    website_url: 'https://www.flexjobs.com',
    rating: 4.5,
    category: 'Remote Jobs',
    fees: 'Subscription-based ($14.95/month)',
    difficulty: 'Easy',
    color: '#0069FF',
    featured: true,
    pros: [
      'Hand-screened, scam-free job listings',
      'Focus on quality over quantity',
      'Excellent for remote and flexible work',
      'Strong reputation with employers',
      'Career coaching and resources included'
    ],
    cons: [
      'Requires paid subscription (no free tier)',
      'More focused on jobs than freelance projects',
      'U.S.-centric job listings'
    ],
    features: [
      'Curated job database',
      'Career coaching services',
      'Skills testing',
      'Resume review services'
    ],
    status: 'published',
    published_at: new Date(),
    work_type: 'remote',
    countries: ['Worldwide']
  },
  {
    name: 'Arc',
    slug: 'arc',
    description: '<p>Arc (formerly CodementorX) is a premium platform for remote software developers. It connects top tech talent with companies offering full-time remote positions and freelance contracts.</p><p>Arc uses a rigorous vetting process to ensure only the top 2% of developers join the platform, making it ideal for experienced developers looking for high-quality opportunities.</p>',
    website_url: 'https://arc.dev',
    rating: 4.6,
    category: 'Tech & Development',
    fees: 'Free for developers (clients pay)',
    difficulty: 'Hard',
    color: '#5A67D8',
    featured: true,
    pros: [
      'Top-tier clients and projects',
      'Rigorous vetting ensures quality',
      'No fees for developers',
      'Full-time and contract opportunities',
      'Dedicated account management'
    ],
    cons: [
      'Extremely selective (top 2% acceptance)',
      'Long vetting process',
      'Limited to software development'
    ],
    features: [
      'AI-powered job matching',
      'Video interviews and coding tests',
      'Contract negotiation support',
      'Payroll and benefits handling'
    ],
    status: 'published',
    published_at: new Date(),
    work_type: 'remote',
    countries: ['Worldwide']
  },
  {
    name: 'We Work Remotely',
    slug: 'we-work-remotely',
    description: '<p>We Work Remotely is the world\'s largest remote work community with over 4.5 million visitors. It focuses exclusively on remote job opportunities across development, design, marketing, and more.</p><p>The platform is known for its clean interface and high-quality job postings from reputable companies looking for remote talent.</p>',
    website_url: 'https://weworkremotely.com',
    rating: 4.3,
    category: 'Remote Jobs',
    fees: 'Free for job seekers',
    difficulty: 'Easy',
    color: '#319795',
    featured: false,
    pros: [
      'Largest remote work community',
      'High-quality job postings',
      'Free for job seekers',
      'Clean, simple interface',
      'Focus on legitimate remote positions'
    ],
    cons: [
      'High competition for listings',
      'No project-based freelance (jobs only)',
      'Limited filtering options'
    ],
    features: [
      'Daily email alerts',
      'Company profiles',
      'Remote work resources',
      'Category-specific job feeds'
    ],
    status: 'published',
    published_at: new Date(),
    work_type: 'remote',
    countries: ['Worldwide']
  },
  {
    name: 'Dribbble',
    slug: 'dribbble',
    description: '<p>Dribbble is the leading community for designers to showcase their work, find inspiration, and discover job opportunities. While primarily a portfolio platform, its job board is highly respected in the design industry.</p><p>The platform is ideal for UI/UX designers, graphic designers, illustrators, and other visual creatives looking to build their reputation and find premium clients.</p>',
    website_url: 'https://dribbble.com',
    rating: 4.5,
    category: 'Design & Creative',
    fees: 'Free (Pro membership $5/month for full features)',
    difficulty: 'Medium',
    color: '#EA4C89',
    featured: true,
    pros: [
      'Premium design-focused community',
      'Build portfolio and reputation',
      'High-quality clients and agencies',
      'Networking opportunities',
      'Inspiration and trends'
    ],
    cons: [
      'High competition among top designers',
      'Pro membership needed for job applications',
      'Limited to design and creative fields'
    ],
    features: [
      'Portfolio hosting',
      'Design job board',
      'Freelance marketplace',
      'Design showcases and trends'
    ],
    status: 'published',
    published_at: new Date(),
    work_type: 'remote',
    countries: ['Worldwide']
  },
  {
    name: 'CloudPeeps',
    slug: 'cloudpeeps',
    description: '<p>CloudPeeps is a curated freelance platform specializing in marketing, content creation, and social media professionals. It connects vetted freelancers with companies seeking top-tier marketing talent.</p><p>The platform stands out with its community-driven approach, offering networking events, resources, and a supportive environment for marketing freelancers.</p>',
    website_url: 'https://www.cloudpeeps.com',
    rating: 4.2,
    category: 'Marketing & Content',
    fees: '15% commission',
    difficulty: 'Medium',
    color: '#4A90E2',
    featured: false,
    pros: [
      'Specialized in marketing and content',
      'Curated community of professionals',
      'Networking events and resources',
      'Direct client communication',
      'Quality over quantity approach'
    ],
    cons: [
      'Selective approval process',
      'Smaller project volume',
      'Limited to marketing/content niches'
    ],
    features: [
      'Vetted freelancer community',
      'Direct client messaging',
      'Project management tools',
      'Educational resources'
    ],
    status: 'published',
    published_at: new Date(),
    work_type: 'remote',
    countries: ['Worldwide']
  },
  {
    name: 'GoLance',
    slug: 'golance',
    description: '<p>GoLance is a freelance marketplace offering low fees and a wide range of categories. It aims to provide a fair alternative to larger platforms with transparent pricing and flexible terms.</p><p>The platform focuses on creating a balanced marketplace where both freelancers and clients benefit from competitive rates and quality service.</p>',
    website_url: 'https://www.golance.com',
    rating: 3.8,
    category: 'General Freelance',
    fees: '7.95% commission',
    difficulty: 'Easy',
    color: '#00C48C',
    featured: false,
    pros: [
      'Lower fees than major competitors',
      'Wide range of categories',
      'Easy sign-up process',
      'Growing platform with opportunities'
    ],
    cons: [
      'Smaller client base',
      'Less established reputation',
      'Fewer high-budget projects'
    ],
    features: [
      'Secure payment system',
      'Time tracking tools',
      'Dispute resolution',
      'Project milestones'
    ],
    status: 'published',
    published_at: new Date(),
    work_type: 'remote',
    countries: ['Worldwide']
  },
  {
    name: 'Apploye',
    slug: 'apploye',
    description: '<p>Apploye is a time tracking and productivity platform that also serves as a freelance marketplace. It helps freelancers manage their work with robust tracking tools while connecting with clients.</p><p>The platform is particularly useful for freelancers who need detailed time tracking, screenshots, and productivity monitoring for client transparency.</p>',
    website_url: 'https://apploye.com',
    rating: 4.0,
    category: 'General Freelance',
    fees: 'Free (Premium features $4/month)',
    difficulty: 'Easy',
    color: '#6366F1',
    featured: false,
    pros: [
      'Advanced time tracking features',
      'Screenshot and activity monitoring',
      'Affordable pricing',
      'Project management integration'
    ],
    cons: [
      'Smaller marketplace',
      'More focused on time tracking than jobs',
      'Limited project variety'
    ],
    features: [
      'Automatic time tracking',
      'Screenshot monitoring',
      'Project budgeting',
      'Team collaboration tools'
    ],
    status: 'published',
    published_at: new Date(),
    work_type: 'remote',
    countries: ['Worldwide']
  },
  {
    name: 'Andela',
    slug: 'andela',
    description: '<p>Andela connects companies with top software developers from Africa and around the world. Unlike traditional freelance platforms, Andela focuses on long-term engagements and full-time remote positions.</p><p>The platform is known for its rigorous vetting process and commitment to developing tech talent in emerging markets, offering training and career development alongside job placements.</p>',
    website_url: 'https://andela.com',
    rating: 4.4,
    category: 'Tech & Development',
    fees: 'Free for developers (clients pay placement fees)',
    difficulty: 'Hard',
    color: '#34A853',
    featured: false,
    pros: [
      'Focus on long-term engagements',
      'Rigorous technical vetting',
      'Career development support',
      'Competitive salaries',
      'Strong community network'
    ],
    cons: [
      'Selective acceptance process',
      'Limited to software development',
      'Requires full-time availability',
      'Geographic restrictions may apply'
    ],
    features: [
      'Technical skills assessment',
      'Ongoing learning programs',
      'Career coaching',
      'Community events and networking'
    ],
    status: 'published',
    published_at: new Date(),
    work_type: 'remote',
    countries: ['Worldwide']
  },
  {
    name: 'ProZ',
    slug: 'proz',
    description: '<p>ProZ.com is the world\'s largest community of professional translators and interpreters, with over 1 million members. It offers a comprehensive marketplace for language services along with resources for translator development.</p><p>The platform is trusted by translation agencies and direct clients worldwide, offering everything from project listings to translation tools and certification programs.</p>',
    website_url: 'https://www.proz.com',
    rating: 4.3,
    category: 'Translation & Languages',
    fees: 'Free (Pro membership $120/year for full features)',
    difficulty: 'Medium',
    color: '#0066CC',
    featured: true,
    pros: [
      'Largest translation community',
      'Extensive language pairs',
      'Professional certification programs',
      'Translation tools and resources',
      'Trusted by global agencies'
    ],
    cons: [
      'Pro membership needed for full access',
      'High competition in popular languages',
      'Some low-budget projects'
    ],
    features: [
      'Job postings and RFQs',
      'Translation memory tools',
      'Translator directory',
      'Professional development courses',
      'Blueboard credentialing system'
    ],
    status: 'published',
    published_at: new Date(),
    work_type: 'remote',
    countries: ['Worldwide']
  },
  {
    name: 'Ureed',
    slug: 'ureed',
    description: '<p>Ureed is a Middle East-focused freelance platform originally specializing in translation and content but now expanding to various creative services. It connects Arabic-speaking freelancers with regional and international clients.</p><p>The platform is particularly strong in Arabic translation, localization, and Middle Eastern market expertise, making it ideal for businesses targeting Arabic-speaking audiences.</p>',
    website_url: 'https://ureed.com',
    rating: 4.0,
    category: 'Translation & Creative',
    fees: '20% commission',
    difficulty: 'Medium',
    color: '#FF6B6B',
    featured: false,
    pros: [
      'Strong in Middle East markets',
      'Arabic language specialization',
      'Growing service categories',
      'Regional market expertise',
      'Cultural localization services'
    ],
    cons: [
      'Limited global reach',
      'Higher commission rates',
      'Smaller project volume outside MENA region'
    ],
    features: [
      'Arabic translation services',
      'Content creation tools',
      'Project management system',
      'Quality assurance processes'
    ],
    status: 'published',
    published_at: new Date(),
    work_type: 'remote',
    countries: ['Worldwide']
  }
];

async function importPlatforms() {
  console.log('🚀 Starting platform import...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const platform of platforms) {
    try {
      // Check if platform already exists
      const existing = await sql`
        SELECT id FROM platforms WHERE slug = ${platform.slug} LIMIT 1
      `;

      if (existing.length > 0) {
        console.log(`⏭️  Skipping "${platform.name}" - already exists`);
        continue;
      }

      // Insert platform (with owner_id)
      await sql`
        INSERT INTO platforms (
          owner_id,
          name,
          slug,
          description,
          logo_url,
          website_url,
          rating,
          category,
          fees,
          difficulty,
          color,
          featured,
          pros,
          cons,
          features,
          status,
          published_at,
          work_type,
          countries,
          created_at,
          updated_at
        ) VALUES (
          'test-owner-id',
          ${platform.name},
          ${platform.slug},
          ${platform.description},
          ${platform.logo_url || null},
          ${platform.website_url || null},
          ${platform.rating},
          ${platform.category},
          ${platform.fees},
          ${platform.difficulty},
          ${platform.color || null},
          ${platform.featured},
          ${JSON.stringify(platform.pros)},
          ${JSON.stringify(platform.cons)},
          ${JSON.stringify(platform.features)},
          ${platform.status},
          ${platform.published_at || new Date()},
          ${platform.work_type},
          ${platform.countries},
          NOW(),
          NOW()
        )
      `;

      console.log(`✅ Imported: ${platform.name}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error importing "${platform.name}":`, error);
      errorCount++;
    }
  }

  console.log(`\n📊 Import complete!`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📋 Total: ${platforms.length}\n`);
}

// Run the import
importPlatforms()
  .then(() => {
    console.log('✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
