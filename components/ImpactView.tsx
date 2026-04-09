
import React, { useState, useCallback } from 'react';
import { 
  TrendingUp, MapPin, Quote, ChevronLeft, ChevronRight, 
  Target, Globe2, ShieldCheck, Users, Zap
} from 'lucide-react';

interface ImpactStory {
  name: string;
  country: string;
  role: string;
  story: string;
  image: string;
  company: string;
}

const impactStories: ImpactStory[] = [
  { 
    name: "Omowumi Adetori", 
    country: "Nigeria", 
    role: "Leader in Customer Service and Sales", 
    story: "Trustskep Global empowered me to lead with excellence. My journey to becoming a regional leader in customer service and sales has been truly transformative.", 
    image: "https://lh3.googleusercontent.com/d/17VuR1hmU4749r-uMsf5r7mMTvy63Dotu", 
    company: "Trustskep Global" 
  },
  {
    name: "Joy Ansah",
    country: "Nigeria",
    role: "Specialist in Financial Services",
    story: "Trustskep Global provided the strategic foundation I needed to excel in the financial services sector. The mentorship and institutional support have been pivotal in my career advancement.",
    image: "https://lh3.googleusercontent.com/d/1FphHTsBo6eF1jVKaMMKAtSiapj670xHz",
    company: "Trustskep Global"
  },
  {
    name: "Bolanle Adesakin",
    country: "Nigeria",
    role: "Project Coordinator",
    story: "The institutional support at Trustskep Global has been a game-changer for my professional development. Leading complex projects with global partners has refined my strategic approach and technical oversight.",
    image: "https://lh3.googleusercontent.com/d/1Hwl4ZcojmsfslzK-IB8NQYqBgrK_BWXQ",
    company: "Trustskep Global"
  }
];

const transformationStats = [
  { label: 'Successful Projects', value: '250+', icon: <Target className="text-blue-500" /> },
  { label: 'Global Reaches', value: '1.2M', icon: <Globe2 className="text-emerald-500" /> },
  { label: 'Partner Satisfaction', value: '94%', icon: <ShieldCheck className="text-indigo-500" /> },
  { label: 'Tech Collaborators', value: '450', icon: <Users className="text-rose-500" /> },
];

export const ImpactView: React.FC = () => {
  const [activeStory, setActiveStory] = useState(0);

  const handleNext = useCallback(() => setActiveStory((prev) => (prev + 1) % impactStories.length), []);
  const handlePrev = useCallback(() => setActiveStory((prev) => (prev - 1 + impactStories.length) % impactStories.length), []);

  const handlePartnerRedirect = () => {
    window.location.hash = '#register';
    // Small delay to allow hash to update before scrolling (if needed by parent logic)
    setTimeout(() => {
      const el = document.getElementById('register');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen selection:bg-blue-600/30">
      {/* Cinematic Hero */}
      <section className="relative min-h-[80vh] flex items-center bg-slate-950 overflow-hidden pt-40 pb-20">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
          <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-slate-950"></div>
        <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-600/20 text-blue-300 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-xl mb-12 border border-white/10">
            <TrendingUp size={14} /> IMPACT & RESULTS
          </div>
          <h1 className="text-6xl md:text-[9rem] font-black text-white tracking-tighter leading-none mb-10">
            Scaling Global <br /><span className="shimmer-text">Transformation.</span>
          </h1>
          <p className="text-2xl md:text-3xl text-slate-200 font-medium max-w-4xl mx-auto leading-tight">
            We bridge the gap between technical demand and elite talent, creating sustainable career pathways and high-performance digital solutions.
          </p>
        </div>
      </section>

      {/* Transformation Hub Stats */}
      <section className="py-32 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/5 relative overflow-hidden">
        <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto">
          <div className="text-center mb-24 space-y-4">
             <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.5em]">The Transformation Hub</h2>
             <h3 className="text-5xl md:text-7xl font-black text-[#002B5B] dark:text-white tracking-tighter">Impact by the Numbers.</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {transformationStats.map((stat, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-12 rounded-[4rem] border border-slate-100 dark:border-slate-700 shadow-xl text-center group hover:-translate-y-3 transition-all">
                <div className="w-20 h-20 bg-white dark:bg-slate-950 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-5xl md:text-6xl font-black text-[#002B5B] dark:text-white mb-4 tracking-tighter">
                  {stat.value}
                </div>
                <p className="text-sm font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voices of Resilience - 10 Profiles */}
      <section className="py-48 bg-slate-950 text-white relative overflow-hidden">
        <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto relative z-10">
          <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-10">
            <div className="space-y-6">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.6em]">Voices of Resilience</span>
              <h3 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none">The Human <br /><span className="text-blue-600">Standard.</span></h3>
            </div>
            <p className="text-2xl text-slate-400 font-medium max-w-xl">
              Success stories from our 10 primary ambassadors who have transformed their careers through Trustskep Global.
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]" style={{ transform: `translateX(-${activeStory * 100}%)` }}>
                {impactStories.map((s, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-center bg-white/5 border border-white/10 rounded-[5rem] p-16 md:p-24 backdrop-blur-3xl overflow-hidden relative group">
                      <Quote className="absolute top-12 right-12 text-blue-600/10 group-hover:text-blue-600/20 transition-colors" size={200} />
                      <div className="space-y-12 relative z-10">
                        <div className="flex items-center gap-6">
                          <div className="px-6 py-2 bg-blue-600/20 text-blue-300 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                            <MapPin size={16} /> {s.country}
                          </div>
                          <div className="text-slate-400 font-black text-sm uppercase tracking-widest">{s.company}</div>
                        </div>
                        <p className="text-4xl md:text-5xl font-bold text-white leading-tight italic">"{s.story}"</p>
                        <div>
                          <h4 className="text-4xl font-black text-blue-600 mb-2">{s.name}</h4>
                          <p className="text-slate-500 font-black text-sm uppercase tracking-widest">{s.role}</p>
                        </div>
                      </div>
                      <div className="aspect-[4/5] rounded-[4rem] overflow-hidden border-[16px] border-white/5 shadow-5xl relative">
                        <img 
                          src={s.image} 
                          alt={s.name} 
                          referrerPolicy="no-referrer" 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-12 mt-16 justify-center">
              <button onClick={handlePrev} className="p-10 rounded-full bg-white/5 text-white hover:bg-blue-600 transition-all border border-white/10 active:scale-90" aria-label="Previous story"><ChevronLeft size={48} /></button>
              <button onClick={handleNext} className="p-10 rounded-full bg-white/5 text-white hover:bg-blue-600 transition-all border border-white/10 active:scale-90" aria-label="Next story"><ChevronRight size={48} /></button>
            </div>
            
            <div className="flex justify-center gap-4 mt-12">
              {impactStories.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveStory(i)} 
                  className={`h-2.5 rounded-full transition-all duration-500 ${activeStory === i ? 'w-20 bg-blue-600' : 'w-4 bg-white/10'}`} 
                  aria-label={`Go to story ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach Section */}
      <section className="py-48 bg-white dark:bg-slate-950">
        <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-16">
                 <div className="space-y-6 text-center lg:text-left">
                    <span className="text-sm font-black text-blue-600 uppercase tracking-[0.4em]">Global Presence</span>
                    <h2 className="text-6xl md:text-8xl font-black text-[#002B5B] dark:text-white tracking-tighter leading-[0.9]">Expanding Our <br /><span className="text-blue-600">Footprint.</span></h2>
                    <p className="text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                      We operate high-performance tech hubs in key emerging markets, providing local experts with global opportunities.
                    </p>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    {[
                      { city: 'Lagos', country: 'Nigeria', active: true },
                      { city: 'Nairobi', country: 'Kenya', active: true },
                      { city: 'Accra', country: 'Ghana', active: true },
                      { city: 'Kigali', country: 'Rwanda', active: true },
                    ].map((hub, i) => (
                      <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 flex items-center gap-6 group hover:border-blue-500 transition-all">
                        <div className={`w-4 h-4 rounded-full ${hub.active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                        <div>
                          <p className="text-2xl font-black text-[#002B5B] dark:text-white group-hover:text-blue-600 transition-colors">{hub.city}</p>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{hub.country}</p>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
              <div className="relative aspect-square rounded-[5rem] overflow-hidden border-[16px] border-slate-100 dark:border-slate-900 shadow-5xl group">
                 <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Global Network" />
              </div>
           </div>
        </div>
      </section>

      {/* Final Call */}
      <section className="py-48 bg-blue-600 text-center px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <h2 className="text-6xl md:text-[8rem] font-black text-white tracking-tighter leading-none uppercase">Partner with Success.</h2>
          <p className="text-2xl md:text-4xl text-blue-100 font-medium leading-tight">
            Our impact is measured by the growth of our people and the success of our clients.
          </p>
          <button 
            onClick={handlePartnerRedirect}
            className="px-16 py-8 bg-white text-blue-600 rounded-[3rem] font-black text-3xl shadow-4xl hover:scale-110 transition-all active:scale-95 hover:shadow-[0_20px_60px_rgba(255,255,255,0.3)]"
          >
            Become a Partner
          </button>
        </div>
      </section>
    </div>
  );
};
