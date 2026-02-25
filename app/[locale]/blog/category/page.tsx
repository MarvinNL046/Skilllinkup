import { Metadata } from 'next';
import Link from 'next/link';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/convex/_generated/api';

export const dynamic = 'force-dynamic';

interface PageProps {
 params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata>{
 const { locale } = await params;

 return {
 title: locale === 'nl' ? 'Categorieën | SkillLinkup' : 'Categories | SkillLinkup',
 description: locale === 'nl'
 ? 'Verken alle blog categorieën en vind artikelen over freelancing, remote werk, AI tools en meer.'
 : 'Browse all blog categories and find articles about freelancing, remote work, AI tools, and more.',
 };
}

export default async function CategoriesPage({ params }: PageProps) {
 const { locale } = await params;
 const rawCategories = await fetchQuery(api.categories.list, { locale });

 // Map Convex camelCase to snake_case expected by JSX
 const categories = rawCategories.map((cat) => ({
   id: cat._id,
   name: cat.name,
   slug: cat.slug,
   description: cat.description ?? null,
   color: (cat as any).color ?? null,
   post_count: (cat as any).postCount ?? 0,
 }));

 return (
 <>
 <main>
 {/* Page Header / Breadcrumb */}
 <section className="breadcumb-section">
 <div className="container">
 <div className="row">
 <div className="col-lg-12">
 <div className="breadcumb-style1 text-center">
 <h2 className="title">
 {locale === 'nl' ? 'Blog Categorieën' : 'Blog Categories'}
 </h2>
 <p className="text fz17 mt10">
 {locale === 'nl'
 ? 'Ontdek artikelen gesorteerd op onderwerp'
 : 'Discover articles organized by topic'
 }
 </p>
 <div className="breadcumb-list mt15">
 <Link href={`/${locale}`}>Home</Link>
 <span className="mx10">/</span>
 <Link href={`/${locale}/blog`}>Blog</Link>
 <span className="mx10">/</span>
 <span className="active">
 {locale === 'nl' ? 'Categorieën' : 'Categories'}
 </span>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Categories Grid */}
 <section className="pt50 pb90">
 <div className="container">
 {categories.length === 0 ? (
 <div className="row">
 <div className="col-12 text-center py50">
 <p className="fz17 body-color mb30">
 {locale === 'nl'
 ? 'Er zijn nog geen categorieën beschikbaar.'
 : 'No categories available yet.'}
 </p>
 <Link
 href={`/${locale}/blog`}
 className="ud-btn btn-thm"
 >
 {locale === 'nl' ? 'Naar Blog' : 'View Blog'}
 </Link>
 </div>
 </div>
 ) : (
 <div className="row">
 {categories.map((category) => (
 <div key={category.id} className="col-sm-6 col-lg-4 col-xl-3">
 <Link
 href={`/${locale}/blog/category/${category.slug}`}
 className="d-block ps-widget bgc-white bdrs12 bdr1 hover-box-shadow p30 mb25 text-center"
 >
 {/* Icon */}
 <div
 className="d-flex align-items-center justify-content-center bdrs50 text-white fw600 mx-auto mb15"
 style={{ backgroundColor: category.color || '#9333ea', width: 56, height: 56, fontSize: '1.5rem' }}
 >
 {category.name.charAt(0)}
 </div>

 {/* Title */}
 <h5 className="fw600 mb10">{category.name}</h5>

 {/* Description */}
 {category.description && (
 <p className="fz14 body-color mb10">
 {category.description}
 </p>
 )}

 {/* Post Count */}
 <p className="fz13 text-muted mb0">
 {category.post_count}{' '}
 {category.post_count === 1
 ? (locale === 'nl' ? 'artikel' : 'post')
 : (locale === 'nl' ? 'artikelen' : 'posts')
 }
 </p>
 </Link>
 </div>
 ))}
 </div>
 )}
 </div>
 </section>
 </main>
 </>
 );
}
