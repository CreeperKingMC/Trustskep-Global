
import React from 'react';
import { ArrowLeft, MapPin, Linkedin, Twitter, Globe, Github, Star, ShieldCheck, Mail, Phone, Briefcase } from 'lucide-react';
import { teamMembers } from './AboutView';

interface ProfileViewProps {
  profileId: string | null;
  onBack: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ profileId, onBack }) => {
  const profile = teamMembers.find(p => p.id === profileId);

  const handleBookSession = () => {
    window.location.hash = '#contact';
    // This will handle the global trigger via hash or by parent App.tsx state
    // For local immediate navigation we can rely on hashchange in App.tsx
  };

  const handleSocialLink = (platform: string) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(profile?.name || 'Trustskep Global')}+${platform}`;
    window.open(searchUrl, '_blank');
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
        <div className="text-center space-y-8 max-w-md">
          <div className="w-24 h-24 bg-rose-100 rounded-3xl flex items-center justify-center mx-auto text-rose-600">
            <Briefcase size={48} />
          </div>
          <h2 className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">Profile Not Found</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">The expert profile you're looking for might have been updated or moved.</p>
          <button onClick={onBack} className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl">
            Return to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000 bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* Dynamic Background Header */}
      <section className="relative h-[50vh] md:h-[65vh] overflow-hidden bg-slate-900 pt-32">
        <div className="absolute inset-0 w-full h-full opacity-30 grayscale saturate-0 pointer-events-none">
           <img src={profile.image} alt="Background" className="w-full h-full object-cover blur-[80px] scale-150" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-slate-950/20 to-transparent"></div>
        
        <div className="absolute top-32 left-0 w-full px-6 lg:px-20 z-10 max-w-[1600px] mx-auto">
          <button 
            onClick={onBack}
            className="group flex items-center gap-4 text-white hover:text-blue-400 transition-colors bg-black/30 backdrop-blur-xl p-4 rounded-2xl border border-white/20 mb-12"
          >
            <ArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform" />
            <span className="font-black text-xs uppercase tracking-widest">Back to Hub</span>
          </button>
        </div>
      </section>

      {/* Profile Detail Content */}
      <section className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto -mt-40 md:-mt-64 relative z-20 pb-48">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left: Sticky Image & Quick Info */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-12">
               <div className="relative group">
                  <div className="absolute inset-0 bg-blue-600 rounded-[5rem] blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="aspect-[4/5] rounded-[5rem] overflow-hidden border-[20px] border-white dark:border-slate-900 shadow-5xl relative z-10">
                     <img src={profile.image} alt={profile.name} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" />
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-4xl flex items-center justify-center p-8 z-20 border border-slate-100 dark:border-white/5">
                     <div className="text-center">
                        <div className="text-3xl font-black text-blue-600 leading-none">15+</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Years Exp.</div>
                     </div>
                  </div>
               </div>

               <div className="p-12 bg-white dark:bg-slate-900 rounded-[4rem] shadow-xl border border-slate-100 dark:border-white/5 space-y-10">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-5 text-slate-500 dark:text-slate-400">
                      <div className="w-12 h-12 bg-blue-50 dark:bg-slate-950 rounded-2xl flex items-center justify-center text-blue-600"><MapPin size={24} /></div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Base Location</p>
                        <p className="text-xl font-bold text-slate-800 dark:text-white leading-none mt-1">{profile.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 text-slate-500 dark:text-slate-400">
                      <div className="w-12 h-12 bg-emerald-50 dark:bg-slate-950 rounded-2xl flex items-center justify-center text-emerald-600"><ShieldCheck size={24} /></div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Security Clearance</p>
                        <p className="text-xl font-bold text-slate-800 dark:text-white leading-none mt-1">Institutional Grade</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-slate-100 dark:border-white/5">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Connect Strategically</p>
                     <div className="flex gap-4">
                        {[
                          { Icon: Linkedin, label: 'linkedin' },
                          { Icon: Twitter, label: 'twitter' },
                          { Icon: Globe, label: 'website' },
                          { Icon: Github, label: 'github' }
                        ].map(({Icon, label}, idx) => (
                          <button 
                            key={idx} 
                            onClick={() => handleSocialLink(label)}
                            className="w-14 h-14 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-600/10 transition-all border border-transparent hover:border-blue-600/20"
                            aria-label={`Visit ${profile.name}'s ${label}`}
                          >
                            <Icon size={24} />
                          </button>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Right: Bio & Professional DNA */}
          <div className="lg:col-span-7 pt-12 lg:pt-32 space-y-20">
            <div className="space-y-6">
               <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-600/10 text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] shadow-sm">
                  <Star size={14} fill="currentColor" /> ELITE TECHNICAL BOARD
               </div>
               <h1 className="text-7xl md:text-[9.5rem] font-black text-[#002B5B] dark:text-white leading-[0.8] tracking-tighter uppercase">
                 {profile.name.split(' ')[0]} <br />
                 <span className="text-blue-600">{profile.name.split(' ').slice(1).join(' ')}</span>
               </h1>
               <p className="text-2xl md:text-3xl font-bold text-slate-400 uppercase tracking-[0.1em]">{profile.role}</p>
            </div>

            <div className="space-y-12">
               <h3 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.6em] border-l-4 border-blue-600 pl-8">Strategic Profile</h3>
               <p className="text-2xl md:text-4xl text-slate-600 dark:text-slate-300 font-medium leading-[1.6]">
                  {profile.bio}
               </p>
               <div className="grid sm:grid-cols-2 gap-10 pt-8">
                  <div className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-white/5 space-y-6">
                     <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expert Verticals</h4>
                     <ul className="space-y-4">
                        {profile.specialties.map(spec => (
                          <li key={spec} className="flex items-center gap-4 text-xl font-bold text-[#002B5B] dark:text-white">
                            <div className="w-2 h-2 bg-blue-600 rounded-full" /> {spec}
                          </li>
                        ))}
                     </ul>
                  </div>
                  <div className="p-10 bg-[#001A3D] rounded-[3rem] shadow-2xl space-y-6">
                     <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Contact Information</h4>
                     <div className="space-y-6 text-white">
                        <div className="flex items-center gap-4">
                           <Mail className="text-blue-400" size={18} />
                           <span className="text-sm font-bold opacity-80">trustskep.global@talent.org</span>
                        </div>
                        <div className="flex items-center gap-4">
                           <Phone className="text-blue-400" size={18} />
                           <span className="text-sm font-bold opacity-80">+234 704 5347 214</span>
                        </div>
                        <button 
                          onClick={handleBookSession}
                          className="w-full py-4 bg-white text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95"
                        >
                           Book Strategy Session
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            <div className="pt-20 border-t border-slate-100 dark:border-white/5 space-y-12">
               <h3 className="text-[11px] font-black text-blue-600 uppercase tracking-[0.6em]">Professional Vision</h3>
               <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
                 "Our objective is not just to provide talent, but to engineer the foundations of sustainable tech growth. We believe every institution deserves access to the elite technical minds that traditionally gravitate towards limited geographies."
               </p>
               <div className="flex items-center gap-10 pt-10">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-400">99%</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Project <br />Continuity</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-400">Top 1%</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Vetting <br />Standard</span>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
