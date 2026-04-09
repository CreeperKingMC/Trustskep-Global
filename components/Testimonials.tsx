import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Testimonial } from '../types';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const mockTestimonials: Testimonial[] = [
  {
    name: "Omowumi Adetoro",
    role: "Leader in Customer Service and Sales @ Trustskep Global",
    content: "Trustskep Global empowered me to lead with excellence. My journey to becoming a regional leader in customer service and sales has been truly transformative.",
    image: "https://lh3.googleusercontent.com/d/17VuR1hmU4749r-uMsf5r7mMTvy63Dotu"
  },
  {
    name: "Joy Ansah",
    role: "Specialist in Financial Services @ Trustskep Global",
    content: "Trustskep Global provided the strategic foundation I needed to excel in the financial services sector. The mentorship and institutional support have been pivotal in my career advancement.",
    image: "https://lh3.googleusercontent.com/d/1FphHTsBo6eF1jVKaMMKAtSiapj670xHz"
  },
  {
    name: "Bolanle Adesakin",
    role: "Project Coordinator @ Trustskep Global",
    content: "The institutional support at Trustskep Global has been a game-changer for my professional development. Leading complex projects with global partners has refined my strategic approach and technical oversight.",
    image: "https://lh3.googleusercontent.com/d/1Hwl4ZcojmsfslzK-IB8NQYqBgrK_BWXQ"
  }
];

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(1);
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  // Responsive items to show
  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth >= 1280) setItemsToShow(2);
      else setItemsToShow(1);
    };
    updateItems();
    window.addEventListener('resize', updateItems);
    return () => window.removeEventListener('resize', updateItems);
  }, []);

  const maxIndex = Math.max(0, mockTestimonials.length - itemsToShow);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, maxIndex]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, maxIndex]);

  useEffect(() => {
    const timer = setInterval(handleNext, 8000);
    return () => clearInterval(timer);
  }, [handleNext]);

  // Touch handlers for swiping
  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  return (
    <section id="testimonials" className="py-48 bg-slate-50 dark:bg-slate-950 overflow-hidden relative selection:bg-blue-600/30">
      <div className="w-full px-6 sm:px-10 lg:px-20 max-w-[1600px] mx-auto relative z-10">
        <ScrollReveal className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-6">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em]">Success Stories</span>
            <h3 className="text-6xl md:text-8xl font-black text-[#002B5B] dark:text-white tracking-tighter leading-none">Voices of <br />Impact.</h3>
          </div>
          <p className="text-2xl text-slate-500 font-medium max-w-xl">
            Empowering technical leaders and driving enterprise innovation across the global digital frontier.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200} className="relative group">
          <div 
            className="overflow-visible md:overflow-hidden p-4 -m-4"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div 
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" 
              style={{ transform: `translateX(-${activeIndex * (100 / itemsToShow)}%)` }}
              aria-live="polite"
            >
              {mockTestimonials.map((t, idx) => (
                <div 
                  key={idx} 
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="bg-white dark:bg-slate-900 p-10 md:p-16 rounded-[4rem] shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden group/card hover:-translate-y-3 transition-all duration-700 h-full flex flex-col justify-between">
                    <Quote className="absolute top-10 right-10 text-blue-600/5 group-hover/card:text-blue-600/10 transition-colors" size={120} />
                    
                    <div className="relative z-10 space-y-8">
                      <p className="text-2xl md:text-3xl text-slate-700 dark:text-slate-100 font-bold leading-tight tracking-tight italic">
                        "{t.content}"
                      </p>
                      
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-blue-600 rounded-[1.5rem] blur-xl opacity-0 group-hover/card:opacity-20 transition-opacity"></div>
                          <img 
                            src={t.image} 
                            alt={t.name} 
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] object-cover ring-4 ring-blue-50 dark:ring-slate-800 shadow-xl relative z-10 transition-transform duration-700 group-hover/card:scale-110" 
                          />
                        </div>
                        <div>
                          <h4 className="text-2xl font-black text-[#002B5B] dark:text-white mb-1">{t.name}</h4>
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-6 mt-16 md:absolute md:-top-32 md:right-0">
            <button 
              onClick={handlePrev}
              className="p-5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-blue-600 hover:border-blue-600 transition-all shadow-xl active:scale-90"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={handleNext}
              className="p-5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 hover:text-blue-600 hover:border-blue-600 transition-all shadow-xl active:scale-90"
              aria-label="Next testimonial"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex gap-3 mt-12 justify-center md:justify-start">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button 
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 transition-all duration-700 rounded-full ${activeIndex === i ? 'w-16 bg-blue-600' : 'w-4 bg-slate-300 dark:bg-slate-700'}`}
                aria-label={`Go to testimonial page ${i + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};