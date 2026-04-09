import React from 'react';
import { 
  CheckCircle2, ArrowRight, Layout, Database, Smartphone, Cloud, Layers, 
  Users, Laptop, Briefcase, Rocket, Sparkles, Code, Search, LineChart, ShieldCheck,
  Workflow, FileText, Settings, Zap, GraduationCap, BarChart3, Share2,
  Headphones, MessageSquare, PhoneCall, Globe, Clock, Monitor, Database as DbIcon, ClipboardList,
  Building2, ShoppingCart, Package, DollarSign, ShieldAlert, Heart, Trees, Landmark, Home,
  ArrowUpRight
} from 'lucide-react';

const techStack = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    icon: <Layout className="text-blue-500" />
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "Go", "GraphQL", "PostgreSQL"],
    icon: <Database className="text-indigo-500" />
  },
  {
    category: "Data Analytics",
    items: ["SQL", "Pandas & NumPy", "Power BI", "Tableau", "Excel Expert"],
    icon: <BarChart3 className="text-orange-500" />
  },
  {
    category: "Social Media & Marketing",
    items: ["SEO & SEM", "Meta Ads Manager", "Google Analytics", "Content Strategy", "Hootsuite"],
    icon: <Share2 className="text-emerald-500" />
  },
  {
    category: "Mobile & Apps",
    items: ["React Native", "Swift (iOS)", "Kotlin (Android)"],
    icon: <Smartphone className="text-blue-600" />
  },
  {
    category: "DevOps & Cloud",
    items: ["Docker", "Kubernetes", "AWS", "Google Cloud", "Vercel"],
    icon: <Cloud className="text-rose-500" />
  }
];

const outsourcingModels = [
  {
    title: "Dedicated Engineering Squads",
    desc: "A full-stack product team consisting of developers, designers, and a project manager working exclusively on your product.",
    bestFor: "Startups & Scaled Enterprises",
    features: ["End-to-end Ownership", "Agile Integration", "Scalable on Demand"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Team Augmentation",
    desc: "Seamlessly inject 1 to 5 senior engineers into your existing internal team to accelerate feature delivery or handle specialized tech.",
    bestFor: "Filling Specific Skill Gaps",
    features: ["Sub-48hr Onboarding", "Same Timezone Support", "Fractional or Full-time"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Project-Based Outsourcing",
    desc: "Hand off specific modules or entire projects to our managed hub. We handle the discovery, build, and QA for a fixed scope.",
    bestFor: "MVP Development & Migration",
    features: ["Fixed Cost Estimates", "Milestone Payments", "Turnkey Solutions"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  }
];

const remoteRoleExperts = [
  { title: "Technical Support Tier 1-3", icon: <Monitor size={28} />, desc: "Elite troubleshooting for complex software products." },
  { title: "Bilingual Sales Agents", icon: <Globe size={28} />, desc: "Multilingual technical support for global market reach." },
  { title: "Data Scientists & Analysts", icon: <DbIcon size={28} />, desc: "High-precision data processing and predictive modeling." },
  { title: "Product Managers", icon: <ClipboardList size={28} />, desc: "Managing the intersection of business and technical teams." },
  { title: "Customer Success Hubs", icon: <Headphones size={28} />, desc: "24/7 technical assistance for global user bases." },
  { title: "Manual & Automation QA", icon: <ShieldCheck size={28} />, desc: "Institutional grade testing to ensure zero-fail deployments." },
  { title: "Apprenticeship Sourcing", icon: <GraduationCap size={28} />, desc: "Curating the top 1% of emerging junior talent." },
  { title: "Specialized Back-office", icon: <Layers size={28} />, desc: "Administrative logistics for technical enterprises." }
];

export const ProgramsView: React.FC<{ onApply: (name: string, type: 'client' | 'talent') => void }> = ({ onApply }) => {
  return (
    <div className="animate-in fade-in duration-1000 bg-slate-50 dark:bg-slate-950">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center bg-slate-950 overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-blue-600/5"></div>
        <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto relative z-10">
          <div className="max-w-5xl space-y-8">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest pt-20 block">SKEP TALENT PROTOCOL</span>
            <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-none">The Outsourcing <br /><span className="shimmer-text">Vanguard.</span></h1>
            <p className="text-2xl md:text-3xl text-slate-300 font-medium max-w-2xl leading-tight">Trustskep Global bridges the gap between your roadmap and the world's most capable technical specialists.</p>
          </div>
        </div>
      </section>

      {/* Outsourcing Models Section with Workspace Images */}
      <section className="py-40 bg-white dark:bg-slate-950">
        <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-6xl md:text-8xl font-black text-[#002B5B] dark:text-white tracking-tighter uppercase">How We <span className="text-blue-600">Scale You.</span></h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Tailored engagement models designed for speed, security, and institutional reliability.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-12">
            {outsourcingModels.map((model, idx) => (
              <div key={idx} className="group flex flex-col bg-slate-50 dark:bg-slate-900 rounded-[4rem] border border-slate-100 dark:border-white/5 hover:border-blue-600 hover:shadow-2xl transition-all duration-700 overflow-hidden">
                <div className="h-64 relative overflow-hidden">
                  <img src={model.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={model.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-12 px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">{model.bestFor}</div>
                </div>
                <div className="p-12 pt-6 space-y-8 flex-grow flex flex-col">
                  <h4 className="text-3xl font-black text-[#002B5B] dark:text-white tracking-tight leading-none uppercase">{model.title}</h4>
                  <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{model.desc}</p>
                  <ul className="space-y-4 flex-grow">
                    {model.features.map(f => (
                      <li key={f} className="flex items-center gap-3 text-slate-700 dark:text-slate-200 font-bold">
                        <CheckCircle2 size={18} className="text-blue-600" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => onApply(model.title, 'client')} className="w-full py-5 bg-[#002B5B] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl">
                    Consult on Model
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Talent Verticals with visual context */}
      <section className="py-40 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="Office Background" />
        </div>
        <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto relative z-10">
          <div className="text-center mb-24 space-y-6">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">MANAGED ROLE EXPERTS</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase">Managed Technical <span className="text-blue-400">Roles.</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {remoteRoleExperts.map((role, idx) => (
              <div key={idx} className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-blue-400 transition-all group backdrop-blur-md">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
                  {role.icon}
                </div>
                <h4 className="text-xl font-black mb-4 uppercase leading-none">{role.title}</h4>
                <p className="text-slate-400 font-medium text-sm leading-relaxed">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-48 bg-slate-50 dark:bg-slate-950">
        <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto">
          <div className="text-center mb-32 space-y-6">
            <h2 className="text-6xl md:text-8xl font-black text-[#002B5B] dark:text-white tracking-tighter uppercase">Technology <span className="text-blue-600">Mastery.</span></h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">Our outsourced squads are experts in modern, enterprise-ready infrastructure.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {techStack.map((tech, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-12 rounded-[4rem] shadow-xl border border-slate-100 dark:border-slate-700">
                <div className="w-16 h-16 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center justify-center mb-8 shadow-inner">{tech.icon}</div>
                <h4 className="text-2xl font-black text-[#002B5B] dark:text-white mb-8 tracking-tight uppercase leading-none">{tech.category}</h4>
                <ul className="space-y-4">
                  {tech.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-lg font-bold text-slate-600 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Sourcing - Workspace context */}
      <section className="py-48 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]"></div>
        <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-24 items-center relative z-10">
          <div className="space-y-12">
            <h2 className="text-6xl md:text-[8rem] font-black text-white tracking-tighter leading-[0.85] uppercase">Sourced Locally. <br />Deployed <span className="text-slate-900">Globally.</span></h2>
            <p className="text-2xl text-blue-100 font-medium leading-relaxed">
              We leverage cost-effective talent from Africa's top emerging tech hubs, rigorously vetting for technical depth and cultural sync with global markets.
            </p>
            <div className="flex flex-wrap gap-8">
               <div className="px-8 py-4 bg-white/20 backdrop-blur-3xl rounded-3xl border border-white/20">
                  <p className="text-white font-black text-3xl">40%+</p>
                  <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">Cost Savings</p>
               </div>
               <div className="px-8 py-4 bg-white/20 backdrop-blur-3xl rounded-3xl border border-white/20">
                  <p className="text-white font-black text-3xl">48hrs</p>
                  <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">Average Onboarding</p>
               </div>
               <div className="px-8 py-4 bg-white/20 backdrop-blur-3xl rounded-3xl border border-white/20">
                  <p className="text-white font-black text-3xl">100%</p>
                  <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">Replacement Guarantee</p>
               </div>
            </div>
          </div>
          <div className="relative">
             <div className="aspect-[4/5] rounded-[5rem] overflow-hidden border-[16px] border-white/10 shadow-5xl group">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
                  alt="Elite Sourcing" 
                />
                <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             </div>
             <div className="absolute -bottom-10 -left-10 p-10 bg-white rounded-[3.5rem] shadow-4xl text-slate-900 space-y-2 animate-float">
                <p className="font-black text-2xl tracking-tighter uppercase leading-none">Vetted Protocol</p>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Trustskep Certified</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};