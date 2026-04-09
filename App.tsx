
import React, { useState, useEffect, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Stats } from './components/Stats';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';
import { Testimonials } from './components/Testimonials';
import { ProgramsView } from './components/ProgramsView';
import { AboutView } from './components/AboutView';
import { ImpactView } from './components/ImpactView';
import { BlogView } from './components/BlogView';
import { LegalView } from './components/LegalView';
import { ContactView } from './components/ContactView';
import { ProfileView } from './components/ProfileView';
import { ClientForm } from './components/ClientForm';
import { TalentForm } from './components/TalentForm';
import { ScrollReveal } from './components/ScrollReveal';
import { 
  Loader2, ShieldCheck, Mail, Send, Globe, Zap, Cpu, Code2
} from 'lucide-react';

export type ViewType = 'home' | 'programs' | 'about' | 'impact' | 'blog' | 'privacy' | 'terms' | 'dpa' | 'contact' | 'profile';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('home');
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [formType, setFormType] = useState<'client' | 'talent'>('client');
  const [loading, setLoading] = useState(true);
  const [emailSub, setEmailSub] = useState('');
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      
      if (hash.startsWith('#programs')) setView('programs');
      else if (hash.startsWith('#about')) setView('about');
      else if (hash.startsWith('#impact')) setView('impact');
      else if (hash.startsWith('#blog')) setView('blog');
      else if (hash.startsWith('#privacy')) setView('privacy');
      else if (hash.startsWith('#terms')) setView('terms');
      else if (hash.startsWith('#dpa')) setView('dpa');
      else if (hash.startsWith('#contact')) setView('contact');
      else if (hash.startsWith('#profile')) setView('profile');
      else setView('home');
      
      if (hash === '#register') {
          setTimeout(() => {
            const el = document.getElementById('register');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 300);
      } else {
          if (!hash.includes('register') && !hash.includes('programs')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openRegister = (programName?: string, type: 'client' | 'talent' = 'client') => {
    setFormType(type);
    if (view !== 'home') {
      navigateTo('home');
    }
    setTimeout(() => {
      const el = document.getElementById('register');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const navigateTo = (v: ViewType, profileId?: string) => {
    if (profileId) setSelectedProfileId(profileId);
    setView(v);
    window.location.hash = v === 'home' ? '#home' : `#${v}${profileId ? `/${profileId}` : ''}`;
  };

  const handleTalkToUs = () => {
    navigateTo('contact');
    setIsSchedulerOpen(true);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub) return;

    setSubStatus('loading');
    
    try {
      // Replace the URL below with your new Newsletter Webhook URL
      const NEWSLETTER_WEBHOOK = 'https://script.google.com/macros/s/AKfycbzPEDIDrXsT_EY9XFyHwZv7p-j9XtsaT3OGxJV6d7wpD95XcU8yIEJZekJoYHQ-Mhseuw/exec';
      
      await fetch(NEWSLETTER_WEBHOOK, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ 
          email: emailSub,
          timestamp: new Date().toISOString()
        })
      });

      setSubStatus('success');
      setEmailSub('');
      setTimeout(() => setSubStatus('idle'), 5000);
    } catch (error) {
      console.error("Newsletter error:", error);
      // Fallback to success UI so user isn't stuck, 
      // but you'll see the error in console
      setSubStatus('success'); 
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#002B5B] flex flex-col items-center justify-center z-[200]">
        <div className="relative w-40 h-40 mb-10">
           <div className="absolute inset-0 border-[6px] border-white/10 rounded-[3rem] animate-pulse"></div>
           <div className="absolute inset-0 border-t-[6px] border-white rounded-[3rem] animate-spin"></div>
           <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-black text-white">T</span>
           </div>
        </div>
        <p className="text-white/40 font-black text-sm uppercase tracking-[0.6em] animate-pulse">Establishing Secure Connection</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (view) {
      case 'programs': return <ProgramsView onApply={openRegister} />;
      case 'about': return <AboutView onProfileClick={(id) => navigateTo('profile', id)} />;
      case 'impact': return <ImpactView />;
      case 'blog': return <BlogView onProfileClick={(id) => navigateTo('profile', id)} />;
      case 'privacy': return <LegalView type="privacy" />;
      case 'terms': return <LegalView type="terms" />;
      case 'dpa': return <LegalView type="dpa" />;
      case 'contact': return <ContactView isModalForcedOpen={isSchedulerOpen} onModalClose={() => setIsSchedulerOpen(false)} onOpenModalRequest={() => setIsSchedulerOpen(true)} />;
      case 'profile': return <ProfileView profileId={selectedProfileId} onBack={() => navigateTo('about')} />;
      default:
        return (
          <>
            <Hero onExplore={() => navigateTo('programs')} />
            
            {/* Logo Section - Institutional Partners */}
            <section className="py-20 bg-white dark:bg-[#010816] border-b border-slate-100 dark:border-white/5 relative overflow-hidden">
              <div className="w-full px-6 sm:px-10 lg:px-20 max-w-[1600px] mx-auto text-center">
                <ScrollReveal>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.5em] mb-12">Building the future with our strategic partners</p>
                  <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 lg:gap-32">
                    <div className="flex items-center gap-3 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-default group">
                       <Zap className="text-blue-600 w-8 h-8 group-hover:scale-110 transition-transform" />
                       <span className="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tighter uppercase">Skep Foundations</span>
                    </div>
                    <div className="flex items-center gap-3 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-default group">
                       <Globe className="text-emerald-500 w-8 h-8 group-hover:scale-110 transition-transform" />
                       <span className="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tighter uppercase">Terra Balance</span>
                    </div>
                    <div className="flex items-center gap-3 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-default group">
                       <Cpu className="text-indigo-600 w-8 h-8 group-hover:scale-110 transition-transform" />
                       <span className="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tighter uppercase">Kodafreek</span>
                    </div>
                    <div className="flex items-center gap-3 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-default group">
                       <Code2 className="text-rose-500 w-8 h-8 group-hover:scale-110 transition-transform" />
                       <span className="text-xl md:text-2xl font-black text-slate-800 dark:text-white tracking-tighter uppercase">Ubuntu Developer</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </section>

            <Features />

            <Stats />
            <Testimonials />

            {/* Newsletter Section */}
            <section className="py-32 bg-slate-50 dark:bg-slate-950 border-y border-slate-100 dark:border-white/5">
               <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto">
                  <ScrollReveal className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-12 lg:p-20 rounded-[4rem] shadow-premium border border-slate-100 dark:border-white/5 flex flex-col lg:flex-row items-center justify-between gap-12">
                     <div className="space-y-4 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest">
                          <Mail size={14} /> NEWSLETTER SYNC
                        </div>
                        <h3 className="text-4xl font-black text-[#002B5B] dark:text-white tracking-tighter uppercase">Stay Informed.</h3>
                        <p className="text-lg text-slate-500 font-medium">Get high-performance technical insights and talent updates delivered directly to your inbox.</p>
                     </div>
                     <form onSubmit={handleSubscribe} className="w-full lg:w-1/2 flex flex-col sm:flex-row gap-4">
                        {subStatus === 'success' ? (
                          <div className="flex items-center gap-4 bg-emerald-50 text-emerald-600 px-8 py-5 rounded-2xl w-full font-bold animate-fade-in-up">
                            <ShieldCheck /> Success! You're synced with Trustskep Global.
                          </div>
                        ) : (
                          <>
                            <input 
                              required 
                              type="email" 
                              placeholder="Institutional Email" 
                              className="flex-1 bg-slate-100 dark:bg-slate-800 px-8 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 font-bold dark:text-white"
                              value={emailSub}
                              onChange={(e) => setEmailSub(e.target.value)}
                            />
                            <button 
                              disabled={subStatus === 'loading'}
                              className="bg-[#002B5B] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                              {subStatus === 'loading' ? <Loader2 className="animate-spin" /> : <>Join <Send size={14} /></>}
                            </button>
                          </>
                        )}
                     </form>
                  </ScrollReveal>
               </div>
            </section>

            {/* Registration Portal */}
            <section id="register" className="py-48 bg-white dark:bg-slate-950 relative scroll-mt-24 overflow-hidden">
              <div className="w-full px-6 sm:px-10 lg:px-20 max-w-[1600px] mx-auto">
                <ScrollReveal className="bg-[#002B5B] rounded-[5rem] p-12 lg:p-24 relative overflow-hidden shadow-5xl border border-white/5">
                   <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[200px] animate-pulse"></div>
                   
                   <div className="relative z-10 grid lg:grid-cols-12 gap-24 items-center">
                     <div className="lg:col-span-5 space-y-12 text-center lg:text-left">
                        <div className="space-y-6">
                           <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.6em]">{formType === 'client' ? 'Corporate Partnership' : 'Talent Protocol'}</span>
                           <h2 className="text-6xl lg:text-[9rem] font-black text-white leading-[0.8] tracking-tighter uppercase">
                             {formType === 'client' ? 'Scale' : 'Grow'} <br /><span className="text-blue-600">{formType === 'client' ? 'Now.' : 'Fast.'}</span>
                           </h2>
                        </div>
                        
                        <div className="flex justify-center lg:justify-start gap-4 p-2 bg-white/5 backdrop-blur-3xl rounded-[2.25rem] w-fit border border-white/10 mx-auto lg:mx-0">
                          <button onClick={() => setFormType('client')} className={`px-10 py-5 rounded-[1.75rem] font-black text-[11px] uppercase tracking-widest transition-all ${formType === 'client' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'text-slate-400 hover:text-white'}`}>For Companies</button>
                          <button onClick={() => setFormType('talent')} className={`px-10 py-5 rounded-[1.75rem] font-black text-[11px] uppercase tracking-widest transition-all ${formType === 'talent' ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'text-slate-400 hover:text-white'}`}>For Job Seekers</button>
                        </div>
                     </div>

                     <div className="lg:col-span-7">
                        <div className="bg-white/5 backdrop-blur-3xl rounded-[4.5rem] p-12 lg:p-20 border border-white/10 shadow-4xl relative min-h-[600px] flex flex-col justify-center">
                          {formType === 'client' ? <ClientForm /> : <TalentForm />}
                        </div>
                     </div>
                   </div>
                </ScrollReveal>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar onNavigate={navigateTo} onTalkToUs={handleTalkToUs} currentView={view as any} />
      <main id="main-content" className="relative z-0">
        <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" size={48} /></div>}>
          {renderContent()}
        </Suspense>
      </main>
      <Footer onNavigate={navigateTo as any} />
      <ChatBot />
    </div>
  );
};

export default App;
