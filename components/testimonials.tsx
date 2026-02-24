"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';

export function Testimonials() {
 const t = useTranslations('homepage.testimonials');

 const testimonials = [
 {
 name: t('testimonial1Name'),
 role: t('testimonial1Role'),
 platform: t('testimonial1Platform'),
 avatar: "SJ",
 quote: t('testimonial1Quote'),
 rating: 5,
 },
 {
 name: t('testimonial2Name'),
 role: t('testimonial2Role'),
 platform: t('testimonial2Platform'),
 avatar: "MC",
 quote: t('testimonial2Quote'),
 rating: 5,
 },
 {
 name: t('testimonial3Name'),
 role: t('testimonial3Role'),
 platform: t('testimonial3Platform'),
 avatar: "LA",
 quote: t('testimonial3Quote'),
 rating: 5,
 },
 {
 name: t('testimonial4Name'),
 role: t('testimonial4Role'),
 platform: t('testimonial4Platform'),
 avatar: "DM",
 quote: t('testimonial4Quote'),
 rating: 5,
 },
 {
 name: t('testimonial5Name'),
 role: t('testimonial5Role'),
 platform: t('testimonial5Platform'),
 avatar: "ET",
 quote: t('testimonial5Quote'),
 rating: 5,
 },
 {
 name: t('testimonial6Name'),
 role: t('testimonial6Role'),
 platform: t('testimonial6Platform'),
 avatar: "JW",
 quote: t('testimonial6Quote'),
 rating: 5,
 },
 ];

 const [currentIndex, setCurrentIndex] = useState(0);

 const nextTestimonial = () =>{
 setCurrentIndex((prev) =>(prev + 1) % testimonials.length);
 };

 const prevTestimonial = () =>{
 setCurrentIndex((prev) =>(prev - 1 + testimonials.length) % testimonials.length);
 };

 const visibleTestimonials = [
 testimonials[currentIndex],
 testimonials[(currentIndex + 1) % testimonials.length],
 testimonials[(currentIndex + 2) % testimonials.length],
 ];

 return (
 <section className="py-16 bg-white dark:bg-gray-800">
 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
 {/* Section Header */}
 <div className="mb-12 text-center">
 <h2 className="text-3xl font-heading font-bold text-text-primary dark:text-white sm:text-4xl mb-3">
 {t('title')}
 </h2>
 <p className="text-base text-text-secondary dark:text-gray-300 max-w-2xl mx-auto">
 {t('description')}
 </p>
 </div>

 {/* Testimonials Grid */}
 <div className="relative">
 <div className="grid gap-6 md:grid-cols-3">
 {visibleTestimonials.map((testimonial, index) =>(
 <div
 key={`${testimonial.name}-${index}`}
 className="bg-background-light dark:bg-gray-700 rounded-lg p-6 shadow-md hover:shadow-xl transition-all border border-gray-200 dark:border-gray-600"
 >
 {/* Rating */}
 <div className="flex gap-1 mb-4">
 {[...Array(testimonial.rating)].map((_, i) =>(
 <svg
 key={i}
 className="w-5 h-5 text-accent"
 fill="currentColor"
 viewBox="0 0 20 20"
 >
 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
 </svg>
 ))}
 </div>

 {/* Quote */}
 <blockquote className="mb-6">
 <p className="text-sm text-text-secondary dark:text-gray-300 leading-relaxed italic">
 "{testimonial.quote}"
 </p>
 </blockquote>

 {/* Author */}
 <div className="flex items-center gap-3">
 <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-md">
 <span className="text-white font-heading font-semibold text-sm">
 {testimonial.avatar}
 </span>
 </div>
 <div>
 <div className="font-heading font-semibold text-text-primary dark:text-white">
 {testimonial.name}
 </div>
 <div className="text-xs text-text-secondary dark:text-gray-300">
 {testimonial.role}
 </div>
 <div className="text-xs text-accent mt-0.5">
 {testimonial.platform}
 </div>
 </div>
 </div>
 </div>
 ))}
 </div>

 {/* Navigation Buttons */}
 <div className="flex items-center justify-center gap-4 mt-8">
 <button
 onClick={prevTestimonial}
 className="w-10 h-10 rounded-full border-2 border-primary hover:bg-primary text-primary hover:text-white dark:text-accent dark:hover:text-white transition-all flex items-center justify-center shadow-md hover:shadow-lg"
 aria-label={t('previousTestimonial')}
 >
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
 </svg>
 </button>

 {/* Indicators */}
 <div className="flex gap-2">
 {testimonials.map((_, index) =>(
 <button
 key={index}
 onClick={() =>setCurrentIndex(index)}
 className={`w-2 h-2 rounded-full transition-all ${
 index === currentIndex
 ? "bg-primary w-6"
 : "bg-background-gray dark:bg-gray-600 hover:bg-accent"
 }`}
 aria-label={t('goToTestimonial', { number: index + 1 })}
 />
 ))}
 </div>

 <button
 onClick={nextTestimonial}
 className="w-10 h-10 rounded-full border-2 border-primary hover:bg-primary text-primary hover:text-white dark:text-accent dark:hover:text-white transition-all flex items-center justify-center shadow-md hover:shadow-lg"
 aria-label={t('nextTestimonial')}
 >
 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
 </svg>
 </button>
 </div>
 </div>

 {/* Stats Bar */}
 <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
 <div className="text-center">
 <div className="text-3xl font-heading font-bold text-primary mb-1">
 {t('stat1Value')}
 </div>
 <div className="text-sm text-text-secondary dark:text-gray-300">
 {t('stat1Label')}
 </div>
 </div>
 <div className="text-center">
 <div className="text-3xl font-heading font-bold text-primary mb-1">
 {t('stat2Value')}
 </div>
 <div className="text-sm text-text-secondary dark:text-gray-300">
 {t('stat2Label')}
 </div>
 </div>
 <div className="text-center">
 <div className="text-3xl font-heading font-bold text-primary mb-1">
 {t('stat3Value')}
 </div>
 <div className="text-sm text-text-secondary dark:text-gray-300">
 {t('stat3Label')}
 </div>
 </div>
 <div className="text-center">
 <div className="text-3xl font-heading font-bold text-primary mb-1">
 {t('stat4Value')}
 </div>
 <div className="text-sm text-text-secondary dark:text-gray-300">
 {t('stat4Label')}
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}
