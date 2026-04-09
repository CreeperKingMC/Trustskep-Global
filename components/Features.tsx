import React from 'react';
import { Users, Code, Globe, Search, ShieldCheck, LineChart, ArrowUpRight, GraduationCap, Briefcase, Camera, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const programs = [
  {
    title: 'Hiring Great Talent',
    description: 'We help companies find the best and smartest helpers to join their teams and build great things.',
    icon: <Users aria-hidden="true" />,
    color: 'bg-blue-600 shadow-blue-600/40',
    target: '#register'
  },
  {
    title: 'Web & App Design',
    description: 'We build beautiful websites and apps that are fast and easy for everyone to use.',
    icon: <Code aria-hidden="true" />,
    color: 'bg-indigo-600 shadow-indigo-600/40',
    target: '#register'
  },
  {
    title: 'Apprenticeships & Internships',
    description: 'Real-world experience through guided industry projects and elite mentorship pathways.',
    icon: <Briefcase aria-hidden="true" />,
    color: 'bg-blue-500 shadow-blue-500/40',
    target: '#register'
  },
  {
    title: 'Technical Training',
    description: 'Professional skill development in high-demand technical fields for global careers.',
    icon: <GraduationCap aria-hidden="true" />,
    color: 'bg-indigo-500 shadow-indigo-500/40',
    target: '#register'
  },
  {
    title: 'Social Media Help',
    description: 'We help businesses talk to people on social media to grow their brand globally.',
    icon: <Globe aria-hidden="true" />,
    color: 'bg-emerald-600 shadow-emerald-600/40',
    target: '#register'
  },
  {
    title: 'Market Research',
    description: 'We learn about what people want so your business can make the best choices.',
    icon: <Search aria-hidden="true" />,
    color: 'bg-purple-600 shadow-purple-600/40',
    target: '#register'
  },
  {
    title: 'Data Analytics',
    description: 'We help you understand business numbers so you can grow big and strong.',
    icon: <LineChart aria-hidden="true" />,
    color: 'bg-orange-600 shadow-orange-600/40',
    target: '#register'
  },
  {
    title: 'Quality Testing (QA)',
    description: 'We test your computer tools to make sure there are no mistakes and everything is safe.',
    icon: <ShieldCheck aria-hidden="true" />,
    color: 'bg-rose-600 shadow-rose-600/40',
    target: '#register'
  },
];

export const Features: React.FC = () => {
  const handleNav = (target: string) => {
    if (target.startsWith('#')) {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = target;
    }
  };

  return (
    <section id="programs" className="py-24 md:py-48 bg-white dark:bg-slate-950 transition-colors relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-4xl mx-auto mb-16 md:mb-32">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-[10px] font-black tracking-widest uppercase mb-6">
            OUR CAPABILITIES
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-[#002B5B] dark:text-white mb-6 md:mb-10 tracking-tighter leading-tight">Helping You <br /><span className="text-blue-600">Succeed.</span></h2>
          <p className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto tracking-tight">
            Trustskep Global offers simple and professional ways to grow through technology and great talent.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-32">
          {programs.map((program, idx) => (
            <ScrollReveal key={idx} delay={idx * 100} className="h-full">
              <button 
                onClick={() => handleNav(program.target)}
                className="group p-8 md:p-10 text-left rounded-[3rem] border border-slate-100 dark:border-slate-800 hover:border-blue-500 hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-100 relative overflow-hidden flex flex-col items-start h-full cursor-pointer w-full"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/5 group-hover:bg-blue-500/10 rounded-full blur-[80px] transition-all duration-700"></div>
                
                <div className={`${program.color} w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center mb-8 md:mb-10 group-hover:rotate-6 group-hover:scale-110 transition-all duration-700 text-white shadow-2xl relative z-10`}>
                  {React.cloneElement(program.icon as React.ReactElement<any>, { size: 36 })}
                </div>
                
                <h4 className="text-xl md:text-2xl font-black text-[#002B5B] dark:text-white mb-4 tracking-tight group-hover:text-blue-600 transition-colors relative z-10">{program.title}</h4>
                <p className="text-base text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-medium flex-grow relative z-10">
                  {program.description}
                </p>
                
                <div className="flex items-center gap-4 text-blue-600 font-black text-[10px] md:text-xs uppercase tracking-[0.3em] group-hover:gap-8 transition-all mt-auto relative z-10">
                  Learn More <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {/* The Synergy Protocol Visualization */}
        <ScrollReveal className="relative bg-[#001A3D] rounded-[5rem] overflow-hidden p-12 lg:p-24 shadow-5xl border border-white/5">
           <div className="absolute inset-0 grayscale opacity-20 pointer-events-none">
             <img src="https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Workspace Background" />
           </div>
           <div className="relative z-10 grid lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                 <div className="inline-flex items-center gap-3 text-blue-400 font-black text-[11px] uppercase tracking-[0.4em]">
                   <Camera size={18} /> OPERATIONAL VISUALS
                 </div>
                 <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase">High-Performance <br /><span className="text-blue-600">Synergy.</span></h2>
                 <p className="text-2xl text-blue-100 font-medium leading-relaxed max-w-xl">
                   Experience the institutional focus and elite collaboration that defines Trustskep Global's physical and digital hubs.
                 </p>
                 <button onClick={() => handleNav('#impact')} className="px-12 py-6 bg-white text-slate-900 rounded-[2rem] font-black text-xl flex items-center gap-4 hover:scale-105 transition-all shadow-2xl">
                    View Impact Stories <Sparkles className="text-blue-600" />
                 </button>
              </div>
              <div className="grid grid-cols-2 gap-6 relative z-10">
                 <div className="space-y-6">
                    <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-white/10 shadow-2xl group relative">
                       <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Collaboration" />
                       <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Collaboration</p>
                       </div>
                    </div>
                    <div className="aspect-square rounded-[3rem] overflow-hidden border-8 border-white/10 shadow-2xl group relative">
                       <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800" referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Mentorship" />
                       <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Mentorship</p>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-6 pt-12">
                    <div className="aspect-square rounded-[3rem] overflow-hidden border-8 border-white/10 shadow-2xl group relative">
                       <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800" referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Tech Hub" />
                       <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Tech Hub</p>
                       </div>
                    </div>
                    <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-white/10 shadow-2xl group relative">
                       <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" referrerPolicy="no-referrer" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Planning" />
                       <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-5 py-2 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                          <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Planning</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </ScrollReveal>
      </div>
    </section>
  );
};