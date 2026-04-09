import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, Send, X, Bot, Loader2, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { getAiResponse } from '../services/geminiService';

interface Message {
  role: 'bot' | 'user';
  text: string;
  action?: { label: string; href: string };
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isNearForm, setIsNearForm] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hello! I am your Trustskep AI assistant. How can I help you scale your business or grow your technical career today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect which form is currently being interacted with
  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const clientForm = target.closest('#client-form-root');
      const talentForm = target.closest('#talent-form-root');

      if (clientForm) {
        setMessages(prev => {
          if (prev.some(m => m.text.includes("noticed you're starting your hiring inquiry"))) return prev;
          return [...prev, { 
            role: 'bot', 
            text: "I noticed you're starting your hiring inquiry! If you're unsure about the 'Solution Required' field, our Engineering Squads are best for end-to-end product delivery, while Augmentation is best for adding specific skills to your current team.",
            action: { label: "Hiring FAQ", href: "#client-faqs" }
          }];
        });
      } else if (talentForm) {
        setMessages(prev => {
          if (prev.some(m => m.text.includes("applying to join our elite network"))) return prev;
          return [...prev, { 
            role: 'bot', 
            text: "Excited to see you applying to join our elite network! Make sure your CV highlights your work with modern tech stacks like Next.js or Go, as these are high-demand with our global partners.",
            action: { label: "Vetting FAQ", href: "#talent-faqs" }
          }];
        });
      }
    };

    document.addEventListener('focusin', handleFocus);
    return () => document.removeEventListener('focusin', handleFocus);
  }, [isOpen]);

  // Intersection Observer to detect if user is near the registration section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isNearForm) {
          setIsNearForm(true);
          setMessages(prev => {
            if (prev.some(m => m.text.includes("exploring our registration portal"))) return prev;
            return [...prev, { 
                role: 'bot', 
                text: "I noticed you're exploring our registration portal! Are you looking to hire elite engineering talent or join our network as a specialist? I can guide your journey.",
                action: { label: "Quick Start Guide", href: "#hiring-faqs" } 
            }];
          });
        }
      },
      { threshold: 0.3 }
    );

    const target = document.getElementById('register');
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [isNearForm, isOpen]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isOpen) {
      timerRef.current = setTimeout(() => setIsOpen(false), 60000); 
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const handleUserActivity = () => resetTimer();
      window.addEventListener('mousemove', handleUserActivity);
      window.addEventListener('keydown', handleUserActivity);
      resetTimer();
      return () => {
        window.removeEventListener('mousemove', handleUserActivity);
        window.removeEventListener('keydown', handleUserActivity);
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [isOpen, resetTimer]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleAction = (href: string) => {
    if (href === "#client-faqs") {
        setMessages(prev => [...prev, { 
            role: 'bot', 
            text: "Client FAQs:\n\n1. **Timeline:** Onboarding takes 48hrs to 2 weeks.\n2. **Costs:** Single invoice model handles global compliance.\n3. **Quality:** Every engineer is Trustskep Certified via 4-week audit.",
        }]);
        return;
    }
    if (href === "#talent-faqs") {
        setMessages(prev => [...prev, { 
            role: 'bot', 
            text: "Talent FAQs:\n\n1. **Vetting:** Includes a logic test, technical live audit, and background check.\n2. **Roles:** Mostly senior-level remote roles in FAANG-standard companies.\n3. **Growth:** We offer continuous technical training for all hub members.",
        }]);
        return;
    }
    if (href === "#hiring-faqs") {
        setMessages(prev => [...prev, { 
            role: 'bot', 
            text: "How to Start:\n\n- **Hiring?** Use 'Hire Talent' form for a strategic briefing.\n- **Applying?** Use 'Job Seekers' form to submit your CV for the top 1% vetting.",
        }]);
        return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      if (window.innerWidth < 768) setIsOpen(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);
    resetTimer();

    const rawBotMsg = await getAiResponse(userMsg);
    
    const actionMatch = rawBotMsg.match(/\[GOTO:(#[a-z-]+)\]/i);
    let cleanText = rawBotMsg;
    let action: Message['action'] = undefined;
    
    if (actionMatch) {
      const href = actionMatch[1];
      cleanText = rawBotMsg.replace(actionMatch[0], '').trim();
      let label = 'Learn More';
      if (href === '#register') label = 'Start Registration';
      if (href === '#programs') label = 'View Programs';
      action = { label, href };
    }
    
    setMessages(prev => [...prev, { role: 'bot', text: cleanText, action }]);
    setIsTyping(false);
    resetTimer();
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] selection:bg-blue-600/30">
      {isOpen ? (
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,43,91,0.3)] w-[360px] sm:w-[460px] flex flex-col overflow-hidden border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 origin-bottom-right">
          <div className="bg-[#001A3D] p-8 flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="flex items-center gap-5 relative z-10">
              <div className="bg-white/10 p-3.5 rounded-[1.5rem] backdrop-blur-3xl border border-white/20 shadow-2xl">
                <Bot className="text-white" size={28} />
              </div>
              <div className="text-white">
                <p className="font-black text-xl tracking-tight leading-none">Trustskep AI</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Strategic Support</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="relative z-20 text-white/40 hover:text-white transition-all p-4 hover:bg-white/10 rounded-full -mr-4 -mt-4">
              <X size={32} />
            </button>
          </div>

          <div ref={scrollRef} className="h-[420px] overflow-y-auto p-8 space-y-6 bg-slate-50 dark:bg-slate-950/40 scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-4 duration-500`}>
                <div className={`max-w-[88%] p-5 rounded-[2rem] text-sm leading-relaxed shadow-sm font-medium whitespace-pre-wrap ${
                  m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
                {m.action && (
                  <button 
                    onClick={() => handleAction(m.action!.href)}
                    className="mt-3 flex items-center gap-2 px-6 py-3 bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all border border-blue-600/20 shadow-sm"
                  >
                    {m.action.label.includes("FAQ") ? <HelpCircle size={14} /> : <ArrowRight size={14} />}
                    {m.action.label}
                  </button>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 p-5 rounded-[2rem] rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="flex gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="relative flex gap-4">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about hiring or talent..."
                className="flex-1 bg-slate-100 dark:bg-slate-800 border-2 border-transparent rounded-[1.75rem] px-8 py-5 text-sm focus:border-blue-500 outline-none text-slate-900 dark:text-white font-bold transition-all"
              />
              <button onClick={handleSend} disabled={!input.trim() || isTyping} className="bg-blue-600 text-white p-5 rounded-[1.5rem] hover:bg-blue-500 transition-all shadow-xl disabled:opacity-30">
                {isTyping ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-blue-600 text-white w-24 h-24 rounded-[2.5rem] flex items-center justify-center shadow-[0_30px_60px_-10px_rgba(37,99,235,0.4)] hover:scale-110 active:scale-95 transition-all group border-4 border-white dark:border-slate-950 relative animate-bounce-slow"
        >
          <div className="absolute inset-0 bg-blue-600 rounded-[2.5rem] animate-ping opacity-30"></div>
          <MessageSquare size={36} className="relative z-10" />
          <div className="absolute -top-1 -right-1 bg-yellow-400 text-blue-900 p-2 rounded-full shadow-xl border-2 border-white dark:border-slate-950">
            <Sparkles size={16} fill="currentColor" />
          </div>
        </button>
      )}
    </div>
  );
};