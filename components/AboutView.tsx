import React, { useState, useEffect } from 'react';
import { 
  ArrowDown, Shield, Target, Globe2, Cpu, Fingerprint, Trophy, Lightbulb, Workflow, Code2, Users, Briefcase, Sparkles, Camera
} from 'lucide-react';

const coreValues = [
  {
    icon: <Shield className="text-blue-500" />,
    title: "Institutional Integrity",
    desc: "We prioritize radical transparency and security in every partnership.",
    details: "Our internal auditing processes ensure that every line of code meets international security standards and IP protection protocols."
  },
  {
    icon: <Lightbulb className="text-yellow-500" />,
    title: "Agile Innovation",
    desc: "Pivoting with precision in a rapidly evolving technological landscape.",
    details: "We don't just follow trends; we architect solutions that anticipate market shifts, ensuring your product stays ahead of the curve."
  },
  {
    icon: <Trophy className="text-emerald-500" />,
    title: "Zero-Compromise Excellence",
    desc: "High-performance code is our non-negotiable standard.",
    details: "Every engineer in our hub undergoes a 4-week rigorous audit. We only deploy the top 1% of technical specialists."
  },
  {
    icon: <Globe2 className="text-purple-500" />,
    title: "Sustainable Ecosystems",
    desc: "Building long-term tech prosperity across emerging markets.",
    details: "By bridging the gap between global demand and African talent, we create lasting career pathways and local economic impact."
  }
];

export const teamMembers = [
  {
    id: "trust-ceo",
    name: "Omikunle Timileyin Micheal",
    role: "Founder & CEO",
    bio: "Visionary leader with 15+ years in global tech infrastructure and strategic talent acquisition. Omikunle has pioneered multiple institutional tech hubs across sub-Saharan Africa.",
    image: "https://lh3.googleusercontent.com/d/1Wq_oUykqyh58AhEe0bJBdISlJEkz7q_K",
    specialties: ["Tech Infrastructure", "Global Strategy", "Talent Acquisition"],
    location: "Osun, Nigeria"
  },
  {
    id: "sarah-cto",
    name: "Oluwatosin Ogunfile",
    role: "Chief Technical Officer",
    bio: "Elite system architect specializing in high-uptime distributed systems and enterprise-grade software engineering. Oluwatosin leads the technical vanguard for our global partners.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800",
    specialties: ["System Architecture", "Software Engineering", "Technical Leadership"],
    location: "Lagos, Nigeria"
  },
  {
    id: "michael-ops",
    name: "Kelvin Inganga",
    role: "Operations Director & Founder, Ubuntu Developer",
    bio: "Strategic operations specialist and founder of Ubuntu Developer. Kelvin bridges the gap between organizational efficiency and community-driven technical growth.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    specialties: ["Operations Management", "Strategic Growth", "Ecosystem Development"],
    location: "Nairobi, Kenya"
  },
  {
    id: "amina-talent",
    name: "Uwana Bright O.",
    role: "Talent Strategy Lead",
    bio: "Expert in technical vetting and talent protocol development. Uwana ensures our hub remains the most exclusive network of technical experts in the region.",
    image: "https://images.unsplash.com/photo-1567532939604-b6c5b0adcc2c?auto=format&fit=crop&q=80&w=800",
    specialties: ["Talent Vetting", "Strategic HR", "Workforce Optimization"],
    location: "Lagos, Nigeria"
  },
  {
    id: "david-innovation",
    name: "Festus Oyedele",
    role: "Head of Innovation",
    bio: "Product strategist and innovation architect. Festus leads the R&D division, focusing on bridging emerging technologies with scalable enterprise solutions.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    specialties: ["R&D", "Product Strategy", "Emerging Tech"],
    location: "Osun, Nigeria"
  },
  {
    id: "omowumi-sales",
    name: "Omowumi Adetoro",
    role: "Leader in Customer Service and Sales",
    bio: "Strategic leader in customer experience and sales optimization. Omowumi has transformed our regional engagement protocols, ensuring elite service delivery across all global touchpoints.",
    image: "https://lh3.googleusercontent.com/d/17VuR1hmU4749r-uMsf5r7mMTvy63Dotu",
    specialties: ["Customer Experience", "Sales Strategy", "Regional Leadership"],
    location: "Lagos, Nigeria"
  }
];

interface AboutViewProps {
  onProfileClick: (id: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onProfileClick }) => {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="animate-in fade-in duration-1000 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Hero */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-slate-950 pt-32">
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40">
            <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-slate-50 dark:to-slate-950 opacity-90"></div>
        </div>
        
        <div className="w-full px-6 lg:px-20 relative z-10 max-w-[1600px] mx-auto">
          <div className="max-w-6xl space-y-12">
            <h1 className="text-7xl md:text-[11.5rem] font-black text-white leading-[0.8] tracking-tighter animate-fade-in-up">
              Institutional <br />
              <span className="shimmer-text">Integrity.</span>
            </h1>
            <p className="text-xl md:text-4xl text-slate-200 font-medium max-w-4xl leading-tight animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              We are the bridge between global technical demand and elite engineering talent.
            </p>
          </div>
        </div>
        
        <button onClick={() => scrollToSection('our-story')} className="absolute bottom-12 left-10 text-white/40 hover:text-white transition-all animate-bounce-slow flex flex-col items-center gap-3 z-20">
          <span className="text-[10px] uppercase font-black tracking-[0.6em]">Discover Our DNA</span>
          <ArrowDown size={32} />
        </button>
      </section>

      {/* Story Section with workspace imagery */}
      <section id="our-story" className="py-40 bg-white dark:bg-slate-950">
        <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto grid lg:grid-cols-12 gap-24 items-center">
            <div className="lg:col-span-7 space-y-12">
              <h2 className="text-6xl md:text-[8.5rem] font-black text-[#002B5B] dark:text-white tracking-tighter leading-[0.85]">
                Architecture of <br /><span className="text-blue-600">Pure Strategy.</span>
              </h2>
              <div className="space-y-8 text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium max-w-3xl">
                <p>Trustskep Global was founded on the principle that technical excellence should be institutionalized.</p>
                <p>Our mission is to provide enterprises with mission-critical engineering squads and sustainable career pathways for elite talent.</p>
              </div>
            </div>
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-[5rem] overflow-hidden shadow-5xl border-[16px] border-white dark:border-slate-900 aspect-square">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" alt="Collaborative Workspace" />
                <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#001A3D] p-8 rounded-[3rem] text-white shadow-2xl z-10 animate-float">
                <p className="text-xs font-black uppercase tracking-widest text-blue-400 mb-1">Interactive Hub</p>
                <p className="text-2xl font-black">24/7 Connectivity</p>
              </div>
            </div>
        </div>
      </section>

      {/* Global Synergy Gallery */}
      <section className="py-40 bg-slate-950 overflow-hidden">
        <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-24">
            <div className="space-y-6">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em]">OPERATIONAL VISUALS</span>
              <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none uppercase">Technical <br />Synergy <span className="text-blue-600">Protocol.</span></h2>
            </div>
            <p className="text-2xl text-slate-400 font-medium max-w-xl">
              Witness the high-performance culture that drives our global engineering squads. 
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative rounded-[4rem] overflow-hidden aspect-[3/4] shadow-4xl">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Team Synergy" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-12 left-12 text-white">
                <p className="font-black text-3xl uppercase tracking-tighter">Collaborative Sprint</p>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Lagos Tech Hub</p>
              </div>
            </div>
            <div className="group relative rounded-[4rem] overflow-hidden aspect-[3/4] shadow-4xl md:translate-y-20">
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Strategy Planning" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-12 left-12 text-white">
                <p className="font-black text-3xl uppercase tracking-tighter">Strategy Roadmap</p>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Global Ops Center</p>
              </div>
            </div>
            <div className="group relative rounded-[4rem] overflow-hidden aspect-[3/4] shadow-4xl">
              <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Mentorship Session" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-12 left-12 text-white">
                <p className="font-black text-3xl uppercase tracking-tighter">Elite Mentorship</p>
                <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Innovation Lab</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-40 bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-white/5 mt-20">
        <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-8xl font-black text-[#002B5B] dark:text-white tracking-tighter">Our Core <span className="text-blue-600">Values.</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, idx) => (
              <div 
                key={idx}
                onMouseEnter={() => setHoveredValue(idx)}
                onMouseLeave={() => setHoveredValue(null)}
                className="relative p-12 bg-white dark:bg-slate-800 rounded-[4rem] shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-500 hover:-translate-y-4 group h-[420px] overflow-hidden"
              >
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-20 h-20 bg-slate-50 dark:bg-slate-950 rounded-3xl flex items-center justify-center mb-8 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {value.icon}
                  </div>
                  <h4 className="text-2xl font-black text-[#002B5B] dark:text-white mb-6 group-hover:text-blue-600 transition-colors">{value.title}</h4>
                  <p className={`text-lg text-slate-500 dark:text-slate-400 font-medium transition-opacity ${hoveredValue === idx ? 'opacity-0' : 'opacity-100'}`}>
                    {value.desc}
                  </p>
                  <div className={`absolute bottom-0 left-0 right-0 transition-all duration-500 transform translate-y-8 ${hoveredValue === idx ? 'opacity-100 translate-y-0' : 'opacity-0'}`}>
                    <p className="text-lg text-slate-700 dark:text-slate-200 font-bold italic border-l-4 border-blue-600 pl-6 leading-relaxed">
                      {value.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-40 bg-white dark:bg-slate-950">
        <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto">
          <div className="mb-24 space-y-6">
            <h3 className="text-6xl md:text-8xl font-black text-[#002B5B] dark:text-white tracking-tighter leading-none">Meet Our <br /><span className="text-blue-600">Strategic Team.</span></h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                onClick={() => onProfileClick(member.id)}
                className="group relative bg-slate-50 dark:bg-slate-900 rounded-[3.5rem] overflow-hidden transition-all duration-700 hover:-translate-y-4 hover:shadow-4xl cursor-pointer"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    referrerPolicy="no-referrer" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001A3D] via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity"></div>
                </div>
                <div className="p-10 text-center space-y-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5">
                  <h4 className="text-2xl font-black text-[#002B5B] dark:text-white group-hover:text-blue-600 transition-colors">{member.name}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-48 bg-blue-600 relative overflow-hidden">
        <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto text-center relative z-10 space-y-12">
          <h2 className="text-6xl md:text-[9rem] font-black text-white tracking-tighter leading-none">The Future <br />is Vetted.</h2>
          <div className="pt-8 flex flex-wrap justify-center gap-8">
            <button onClick={() => window.location.hash = '#register'} className="px-20 py-8 bg-white text-blue-600 rounded-[3rem] font-black text-3xl shadow-4xl hover:scale-105 transition-all">
              Start Project Hub
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};