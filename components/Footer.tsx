
import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { 
  Facebook, Linkedin, Instagram, ChevronUp, MapPin, Mail, Phone, Info, Shield, LayoutList, FileText, Newspaper
} from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => setShowScroll(window.scrollY > 500);
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const handleLink = (v: any, hash?: string) => {
    if (onNavigate) {
      onNavigate(v);
      if (hash) {
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else window.location.hash = hash;
        }, 100);
      }
    }
  };

  const footerLinks = {
    "Company": [
      { name: 'About Us', view: 'about', hash: '#about', icon: <Info size={14} /> },
      { name: 'Impact Stories', view: 'impact', hash: '#impact', icon: <LayoutList size={14} /> },
      { name: 'Blog', view: 'blog', hash: '#blog', icon: <Newspaper size={14} /> },
    ],
    "Legal": [
      { name: 'Privacy Policy', view: 'privacy', hash: '#privacy', icon: <Shield size={14} /> },
      { name: 'Data Processing Agreement', view: 'dpa', hash: '#dpa', icon: <FileText size={14} /> },
      { name: 'Terms of Use', view: 'terms', hash: '#terms', icon: <FileText size={14} /> }
    ]
  };

  const socialLinks = [
    { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61587047357852", label: "Facebook" },
    { Icon: Linkedin, href: "https://www.linkedin.com/company/trustskep-global/", label: "LinkedIn" },
    { Icon: Instagram, href: "https://instagram.com/trustskepglobal", label: "Instagram" }
  ];

  return (
    <footer className="bg-[#001A3D] text-white pt-48 pb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[180px] -translate-y-1/2 translate-x-1/2"></div>
      
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-12 right-12 z-[60] bg-white text-[#001A3D] p-5 rounded-2xl shadow-premium border border-slate-100 transition-all duration-500 hover:scale-110 active:scale-90 ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Scroll to top"
      >
        <ChevronUp size={28} />
      </button>

      <div className="w-full px-6 sm:px-10 lg:px-20 max-w-[1600px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-5 space-y-12">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-white rounded-2xl">
                  <Logo hideText className="h-12" />
               </div>
               <div className="flex flex-col">
                  <span className="text-3xl font-black tracking-tighter uppercase leading-none">Trustskep</span>
                  <span className="text-[10px] font-black tracking-[0.6em] uppercase text-blue-400 mt-1">Global</span>
               </div>
            </div>
            <p className="text-xl text-white/50 font-medium leading-relaxed max-w-md">
              “Your Trusted Tech Source.” Bridging the technical divide through elite talent and institutional innovation.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white/5 border border-white/10 text-white/40 hover:text-blue-400 hover:bg-white/10 rounded-2xl flex items-center justify-center transition-all shadow-lg hover:-translate-y-1"
                  aria-label={`Follow us on ${social.label}`}
                >
                  <social.Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 grid sm:grid-cols-2 gap-10">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-10">
                <h6 className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20">{title}</h6>
                <ul className="space-y-6">
                  {links.map((link) => (
                    <li key={link.name}>
                      <button 
                        onClick={() => handleLink(link.view, link.hash)} 
                        className="text-white/40 hover:text-blue-400 font-bold transition-all text-base text-left flex items-center gap-3 group active:scale-95"
                      >
                        <span className="p-2 rounded-lg bg-white/5 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          {link.icon}
                        </span>
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 space-y-10">
            <h6 className="text-[11px] font-black uppercase tracking-[0.5em] text-white/20">Get in Touch</h6>
            <ul className="space-y-8">
               <li className="flex items-start gap-5">
                  <MapPin size={24} className="text-blue-400" />
                  <div>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">HQ</p>
                    <p className="text-xl font-bold">Osun, Nigeria</p>
                  </div>
               </li>
               <li className="flex items-start gap-5">
                  <Mail size={24} className="text-blue-400" />
                  <div>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Email</p>
                    <p className="text-xl font-bold">trustskepglobal@solution.org</p>
                  </div>
               </li>
               <li className="flex items-start gap-5">
                  <Phone size={24} className="text-blue-400" />
                  <div>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-xl font-bold">+254 7045347214</p>
                  </div>
               </li>
            </ul>
          </div>
        </div>
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 text-[11px] font-black uppercase tracking-[0.4em] text-white/20">
          <p>© 2026 Trustskep Global. All Rights Reserved.</p>
          <div className="flex gap-8">
             <button onClick={() => handleLink('privacy', '#privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
             <button onClick={() => handleLink('terms', '#terms')} className="hover:text-white transition-colors">Terms of Use</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
