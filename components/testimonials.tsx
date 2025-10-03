"use client";

import { useState } from "react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Web Designer",
      platform: "Found via Upwork Review",
      avatar: "SJ",
      quote: "SkillLinkup helped me understand which platform was best for my design skills. I'm now earning 40% more than my previous job!",
      rating: 5,
    },
    {
      name: "Marcus Chen",
      role: "Software Developer",
      platform: "Found via Toptal Review",
      avatar: "MC",
      quote: "The detailed comparison saved me weeks of research. I found the perfect platform match on my first try thanks to their expert insights.",
      rating: 5,
    },
    {
      name: "Lisa Anderson",
      role: "Content Writer",
      platform: "Found via Fiverr Review",
      avatar: "LA",
      quote: "As a beginner freelancer, the platform reviews gave me confidence to start. The tips and guidance were invaluable for my journey.",
      rating: 5,
    },
    {
      name: "David Martinez",
      role: "Digital Marketer",
      platform: "Found via Freelancer Review",
      avatar: "DM",
      quote: "I've tried 5 different platforms, and SkillLinkup's reviews were spot-on for each one. This is my go-to resource for freelance platform info.",
      rating: 5,
    },
    {
      name: "Emma Thompson",
      role: "Graphic Designer",
      platform: "Found via 99designs Review",
      avatar: "ET",
      quote: "The honest pros and cons helped me avoid platforms that wouldn't suit my style. Now I'm working with clients who truly value my work.",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "Video Editor",
      platform: "Found via PeoplePerHour Review",
      avatar: "JW",
      quote: "Clear, unbiased reviews with actual data. No fluff, just facts. Exactly what I needed to make an informed decision about my freelance career.",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-heading font-bold text-text-primary sm:text-4xl mb-3">
            Success Stories
          </h2>
          <p className="text-base text-text-secondary max-w-2xl mx-auto">
            Join thousands of freelancers who found their perfect platform through our reviews
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="relative">
          <div className="grid gap-6 md:grid-cols-3">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="bg-background-light rounded-lg p-6 shadow-md hover:shadow-xl transition-all"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
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
                  <p className="text-sm text-text-secondary leading-relaxed italic">
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
                    <div className="font-heading font-semibold text-text-primary">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-text-secondary">
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
              className="w-10 h-10 rounded-full border-2 border-primary hover:bg-primary hover:text-white text-primary transition-all flex items-center justify-center shadow-md hover:shadow-lg"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary w-6"
                      : "bg-background-gray hover:bg-accent"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full border-2 border-primary hover:bg-primary hover:text-white text-primary transition-all flex items-center justify-center shadow-md hover:shadow-lg"
              aria-label="Next testimonial"
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
              1,000+
            </div>
            <div className="text-sm text-text-secondary">
              Happy Freelancers
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-primary mb-1">
              25+
            </div>
            <div className="text-sm text-text-secondary">
              Platforms Reviewed
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-primary mb-1">
              4.9★
            </div>
            <div className="text-sm text-text-secondary">
              Average Rating
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-heading font-bold text-primary mb-1">
              100%
            </div>
            <div className="text-sm text-text-secondary">
              Unbiased Reviews
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
