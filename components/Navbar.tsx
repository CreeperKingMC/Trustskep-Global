
import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ChevronRight, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: any) => void;
  onTalkToUs: () => void;
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onTalkToUs, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    
    const savedTheme = localStorage.getItem('trustskep-theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('trustskep-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('trustskep-theme', 'dark');
    }
    setIsDark(!isDark);
  };

  const navLinks = [
    { name: 'Home', href: '#home', view: 'home' },
    { name: 'Programs', href: '#programs', view: 'programs' },
    { name: 'Impact', href: '#impact', view: 'impact' },
    { name: 'About', href: '#about', view: 'about' },
    { name: 'Contact', href: '#contact', view: 'contact' },
  ];

  const handleLinkClick = (view: any, href: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.location.hash = href;
  };

  const handleTalkToUsClick = () => {
    onTalkToUs();
    setMobileMenuOpen(false);
  };

  return (
    <header className="contents">
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-in-out ${
          isScrolled 
          ? 'glass py-3 shadow-2xl backdrop-blur-3xl border-b border-blue-900/10' 
          : 'bg-transparent py-8 md:py-10'
        }`}
      >
        <div className="w-full px-6 sm:px-10 lg:px-20 flex justify-between items-center max-w-[1600px] mx-auto">
          <button 
            onClick={() => handleLinkClick('home', '#home')} 
            className="flex-shrink-0 transition-all hover:scale-105 active:scale-95 focus:outline-none flex items-center"
            aria-label="Navigate to home"
          >
            <Logo className="h-12 md:h-14 lg:h-16" />
          </button>

          <div className="hidden md:flex items-center gap-10 lg:gap-14">
            <ul className="flex items-center gap-8 lg:gap-12">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => handleLinkClick(link.view, link.href)}
                    className={`font-black transition-all relative group text-[11px] lg:text-[12px] uppercase tracking-[0.3em] lg:tracking-[0.4em] drop-shadow-sm ${
                      currentView === link.view
                      ? 'text-blue-600 dark:text-blue-400' 
                      : (isScrolled ? 'text-slate-800 dark:text-slate-200' : 'text-white hover:text-blue-400')
                    }`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-2 left-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full ${currentView === link.view ? 'w-full' : 'w-0'}`}></span>
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center gap-4 lg:gap-6">
              <button 
                onClick={toggleTheme} 
                className={`p-3 lg:p-4 rounded-2xl transition-all shadow-sm ${
                  isScrolled ? 'bg-slate-100 dark:bg-slate-800' : 'bg-white/10 shadow-lg'
                } hover:scale-110 active:scale-90`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="text-yellow-400" size={18} /> : <Moon className={isScrolled ? 'text-slate-600' : 'text-white'} size={18} />}
              </button>

              <button 
                onClick={handleTalkToUsClick}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 lg:px-10 py-4 lg:py-5 rounded-2xl lg:rounded-[2rem] font-black text-[11px] lg:text-[12px] uppercase tracking-[0.2em] transition-all shadow-2xl hover:-translate-y-1 active:scale-95"
              >
                Talk To Us
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button 
              className="p-3 rounded-xl bg-blue-600 text-white shadow-lg transition-all" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Flyout */}
        <div className={`md:hidden fixed inset-0 z-[-1] bg-white dark:bg-slate-950 flex flex-col p-12 pt-40 gap-10 transition-all duration-500 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleLinkClick(link.view, link.href)} 
                className="text-5xl font-black text-left text-slate-800 dark:text-white flex items-center justify-between group"
              >
                <span className={currentView === link.view ? 'text-blue-600' : ''}>{link.name}</span>
                <ChevronRight size={40} className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
          <div className="mt-auto pb-10">
            <button 
              onClick={handleTalkToUsClick} 
              className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-xl shadow-2xl"
             >
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
