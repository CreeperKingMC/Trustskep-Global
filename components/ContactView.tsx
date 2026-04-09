import React, { useState, useEffect } from 'react';
import { 
  MapPin, Mail, Phone, MessageSquare, ChevronDown, ChevronUp, 
  Send, ShieldCheck, Zap, Star, Layout, Users, Code, Search, Copy, CheckCircle2,
  Calendar as CalendarIcon, X, Clock, Video, ArrowRight, Loader2, AlertCircle,
  Navigation, ExternalLink, Globe, Sparkles
} from 'lucide-react';
import { ClientForm } from './ClientForm';
import { TalentForm } from './TalentForm';

// Use the same webhook URL as your other forms
const GOOGLE_SCRIPT_WEBHOOK = 'https://script.google.com/macros/s/AKfycbzy-XEd8AT1uz-OAbLyl-Hz3bU8VFtV71iStyDjoBfetooFBin-nkMhu1FQO7uQifqWmw/exec';

const faqs = [
  {
    question: "How do I pay my international team members?",
    answer: "You don’t have to worry about cross-border complexity. You pay Trustskep Global as a single vendor, and we handle all the behind-the-scenes work—including international payroll, local taxes, benefit compliance, and currency exchange."
  },
  {
    question: "Who makes the final hiring decisions?",
    answer: "You do. We handle the heavy lifting of sourcing and vetting the top 1% of talent, but you follow your normal interview process and maintain complete control over which specific candidates join your dedicated squad."
  },
  {
    question: "How proficient are Trustskep specialists in English?",
    answer: "Extremely proficient. Most of our candidates have attended accredited international universities or have worked alongside Western firms for years. We conduct rigorous language assessments and live communication audits before they even reach your desk."
  },
  {
    question: "What is the minimum number of team members to start?",
    answer: "While we recommend starting with a core squad of at least five members for optimal project velocity, we are flexible. There is no upper limit to how many specialists you can add to your team as you scale."
  },
  {
    question: "When can my new team members start working?",
    answer: "Efficiency is our priority. Candidates typically start working within 1 to 2 weeks after you've completed your interviews and selected the team members who fit your culture."
  },
  {
    question: "Do my new team members need their own equipment?",
    answer: "Most of our specialists maintain high-end personal workstations and verified high-speed internet. However, depending on your security needs, we can provide work-only equipment (laptops, headsets, etc.) and invoice you directly for those costs."
  },
  {
    question: "Does Trustskep provide additional support after hiring?",
    answer: "Yes. Once your team is onboarded, you’ll be assigned a dedicated Customer Success Manager. Their primary role is to provide ongoing support, monitor KPIs, and share best practices for managing distributed high-performance teams."
  },
  {
    question: "What if a new team member isn't the right fit?",
    answer: "If a specialist isn't working out, we backfill the position immediately based on your specific feedback. Since you choose the team members yourself via our vetting process, we maintain one of the lowest attrition rates in the industry."
  },
  {
    question: "Are there long-term contracts or setup fees?",
    answer: "We utilize a standard Master Services Agreement (MSA) that is pay-as-you-go. Our model is designed for flexibility, meaning no predatory setup fees and no restrictive annual commitments."
  }
];

interface ContactViewProps {
  isModalForcedOpen?: boolean;
  onModalClose?: () => void;
  onOpenModalRequest?: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ isModalForcedOpen = false, onModalClose, onOpenModalRequest }) => {
  const [formType, setFormType] = useState<'client' | 'talent'>('client');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copied, setCopied] = useState<string | null>(null);
  
  // Scheduling State
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM", "05:00 PM"];
  const dates = ["Monday, May 18", "Tuesday, May 19", "Wednesday, May 20", "Thursday, May 21"];

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime || !userName || !userEmail) {
      setError("Please fill in all details");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        type: 'scheduling',
        name: userName,
        email: userEmail,
        date: selectedDate,
        time: selectedTime,
        timezone: 'GMT+1',
        timestamp: new Date().toISOString()
      };

      await fetch(GOOGLE_SCRIPT_WEBHOOK, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });
      
      setIsScheduled(true);

      setTimeout(() => {
        onModalClose?.();
        setIsScheduled(false);
        setSelectedDate(null);
        setSelectedTime(null);
        setUserName('');
        setUserEmail('');
        setIsSubmitting(false);
      }, 4000);

    } catch (err) {
      console.error("Scheduling error:", err);
      setError("Failed to schedule. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-1000 bg-slate-50 dark:bg-slate-950 min-h-screen relative">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center bg-slate-950 overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-blue-600/5"></div>
        <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto relative z-10">
          <div className="max-w-4xl space-y-12 text-center lg:text-left mx-auto lg:mx-0">
            <div className="space-y-6">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">GET IN TOUCH</span>
              <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[1.1] uppercase">Connect with <br /><span className="shimmer-text">Excellence.</span></h1>
              <p className="text-2xl text-slate-300 font-medium max-w-2xl leading-tight">“Your Trusted Tech Source.” We're ready to bring your roadmap to life with elite outsourced squads.</p>
            </div>
            
            <button 
              onClick={() => onOpenModalRequest?.()}
              className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-6 rounded-3xl font-black text-xl uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-105 active:scale-95 flex items-center gap-4 mx-auto lg:mx-0 group"
            >
              <CalendarIcon size={24} className="group-hover:rotate-12 transition-transform" />
              Schedule a Strategy Call
            </button>
          </div>
        </div>
      </section>

      {/* Meet your liaison - New human image section */}
      <section className="py-24 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-white/5">
        <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="aspect-square rounded-[5rem] overflow-hidden border-[16px] border-slate-50 dark:border-slate-900 shadow-5xl relative z-10">
              <img src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Client Success Lead" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
            </div>
            <div className="absolute -bottom-10 -right-10 bg-blue-600 p-10 rounded-[4rem] text-white shadow-4xl z-20 animate-float">
               <Sparkles className="mb-4 text-blue-200" />
               <p className="text-3xl font-black tracking-tighter uppercase leading-none">Dedicated <br />Support.</p>
               <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mt-4">Personal Success Lead</p>
            </div>
          </div>
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em]">DIRECT LIAISON</span>
              <h2 className="text-6xl md:text-8xl font-black text-[#002B5B] dark:text-white tracking-tighter leading-none uppercase">Global <br />Connectivity <span className="text-blue-600">Hub.</span></h2>
              <p className="text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl">
                Every partnership is assigned an institutional liaison to ensure 100% cultural and technical alignment.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              <button 
                onClick={() => copyToClipboard('Osun, Nigeria', 'hq')}
                className="group relative bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 text-center space-y-4 hover:border-blue-600 transition-all active:scale-95"
              >
                <div className="w-12 h-12 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                  {copied === 'hq' ? <CheckCircle2 size={24} /> : <MapPin size={24} />}
                </div>
                <h4 className="text-lg font-black text-[#002B5B] dark:text-white uppercase tracking-tighter">HQ</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium line-clamp-1">Osun, Nigeria</p>
              </button>
              
              <button 
                onClick={() => copyToClipboard('trustskepglobal@solution.org', 'email')}
                className="group relative bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 text-center space-y-4 hover:border-emerald-600 transition-all active:scale-95"
              >
                <div className="w-12 h-12 bg-emerald-600/10 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                  {copied === 'email' ? <CheckCircle2 size={24} /> : <Mail size={24} />}
                </div>
                <h4 className="text-lg font-black text-[#002B5B] dark:text-white uppercase tracking-tighter">Email</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium line-clamp-1">trustskep@hub.org</p>
              </button>

              <button 
                onClick={() => copyToClipboard('+254 7045347214', 'phone')}
                className="group relative bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 text-center space-y-4 hover:border-rose-600 transition-all active:scale-95"
              >
                <div className="w-12 h-12 bg-rose-600/10 text-rose-600 rounded-2xl flex items-center justify-center mx-auto transition-transform group-hover:scale-110">
                  {copied === 'phone' ? <CheckCircle2 size={24} /> : <Phone size={24} />}
                </div>
                <h4 className="text-lg font-black text-[#002B5B] dark:text-white uppercase tracking-tighter">Phone</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium line-clamp-1">+254 7045...</p>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto">
          <div className="rounded-[4rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-5xl h-[600px] relative group bg-slate-200">
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0} 
              src="https://maps.google.com/maps?q=Osun%2C%20Nigeria&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="grayscale group-hover:grayscale-0 transition-all duration-1000"
              title="Trustskep HQ Location"
            ></iframe>
            
            {/* Map Overlay Card */}
            <div className="absolute top-10 left-10 p-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow- premium max-w-sm animate-in slide-in-from-left-4 duration-1000">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                    <Navigation size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-[#002B5B] dark:text-white uppercase tracking-tighter">Operations Hub</h4>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Osun State, Nigeria</p>
                  </div>
                </div>
                
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  Our central command center overseeing distributed technical squads across the African continent and bridging them with global enterprise partners.
                </p>
                
                <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=Osun,Nigeria" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group/link text-xs font-black uppercase tracking-widest text-[#002B5B] dark:text-white hover:text-blue-600 transition-colors"
                  >
                    <span>Get Directions</span>
                    <ExternalLink size={14} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Globe size={12} className="text-blue-500" /> Serving 12+ Countries Globally
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Flare */}
            <div className="absolute bottom-10 right-10 flex gap-4 pointer-events-none">
                <div className="px-6 py-3 bg-blue-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl animate-pulse">
                  Live Operations Center
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="py-32 bg-slate-100 dark:bg-slate-900/50">
        <div className="w-full px-6 lg:px-20 max-w-[1600px] mx-auto">
          <div className="max-w-5xl mx-auto bg-[#001A3D] rounded-[5rem] overflow-hidden shadow-5xl border border-white/5">
            <div className="p-12 lg:p-24 space-y-12">
              <div className="text-center space-y-6">
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">Submit Your Inquiry</h2>
                <div className="flex justify-center gap-4 p-2 bg-white/5 backdrop-blur-3xl rounded-[2.25rem] w-fit border border-white/10 mx-auto">
                  <button onClick={() => setFormType('client')} className={`px-10 py-5 rounded-[1.75rem] font-black text-[11px] uppercase tracking-widest transition-all ${formType === 'client' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:text-white'}`}>Hire Talent</button>
                  <button onClick={() => setFormType('talent')} className={`px-10 py-5 rounded-[1.75rem] font-black text-[11px] uppercase tracking-widest transition-all ${formType === 'talent' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:text-white'}`}>Job Seekers</button>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-3xl rounded-[4.5rem] p-12 lg:p-20 border border-white/10 shadow-4xl min-h-[500px]">
                {formType === 'client' ? <ClientForm /> : <TalentForm />}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-48 bg-white dark:bg-slate-950">
        <div className="w-full px-6 lg:px-20 max-w-4xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">COMMON QUESTIONS</span>
            <h2 className="text-6xl md:text-8xl font-black text-[#002B5B] dark:text-white tracking-tighter leading-none uppercase">Institutional <br />Support <span className="text-blue-600">Hub.</span></h2>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-10 flex items-center justify-between text-left group"
                >
                  <span className="text-2xl font-black text-[#002B5B] dark:text-white group-hover:text-blue-600 transition-colors">{faq.question}</span>
                  {openFaq === idx ? <ChevronUp className="text-blue-600" size={28} /> : <ChevronDown className="text-slate-400" size={28} />}
                </button>
                {openFaq === idx && (
                  <div className="px-10 pb-10 animate-in slide-in-from-top-2 duration-300">
                    <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scheduling Modal */}
      {isModalForcedOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[4rem] shadow-5xl overflow-hidden border border-white/10 flex flex-col lg:flex-row max-h-[90vh]">
            <button 
              onClick={() => onModalClose?.()}
              className="absolute top-8 right-8 p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-rose-500 hover:text-white transition-all z-10"
            >
              <X size={24} />
            </button>

            {/* Modal Left - Branding & Context with Workspace Image */}
            <div className="lg:w-1/3 bg-[#001A3D] p-12 text-white flex flex-col justify-between relative overflow-hidden">
               <div className="absolute inset-0 opacity-20 pointer-events-none grayscale">
                 <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Workspace" />
               </div>
               <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl"></div>
               <div className="relative z-10 space-y-8">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                    <Video size={32} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black tracking-tighter uppercase leading-none">Strategy Briefing</h3>
                    <p className="text-blue-300 text-xs font-black uppercase tracking-widest mt-2">30 Min Discovery</p>
                  </div>
                  <div className="space-y-4 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-4 text-slate-400">
                      <Clock size={18} /> <span className="text-sm font-bold">30 Minutes</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-400">
                      <Video size={18} /> <span className="text-sm font-bold">Google Meet Invite</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-400">
                      <ShieldCheck size={18} /> <span className="text-sm font-bold">Encrypted Session</span>
                    </div>
                  </div>
               </div>
               <p className="text-white/40 text-[10px] font-black uppercase tracking-widest relative z-10">© Trustskep Global Scheduler</p>
            </div>

            {/* Modal Right - The Interface */}
            <div className="lg:w-2/3 p-12 lg:p-20 overflow-y-auto">
              {isScheduled ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in-95 duration-500 py-20">
                   <div className="w-32 h-32 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl animate-bounce">
                     <CheckCircle2 size={64} className="text-white" />
                   </div>
                   <div className="space-y-4">
                     <h4 className="text-4xl font-black text-[#002B5B] dark:text-white uppercase tracking-tighter">Briefing Scheduled</h4>
                     <p className="text-slate-500 dark:text-slate-400 font-medium text-xl max-w-md mx-auto">
                        Check your inbox for the Google Meet invitation. We'll see you on {selectedDate} at {selectedTime}.
                     </p>
                   </div>
                </div>
              ) : (
                <div className="space-y-12">
                   <div className="space-y-2">
                      <h4 className="text-4xl font-black text-[#002B5B] dark:text-white uppercase tracking-tighter">Select Timezone Slot</h4>
                      <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Availability updated for Osun/Lagos (GMT+1)</p>
                   </div>

                   {error && (
                     <div className="p-4 bg-rose-500/10 border border-rose-500 text-rose-500 rounded-2xl flex items-center gap-3 font-bold text-sm">
                       <AlertCircle size={18} /> {error}
                     </div>
                   )}

                   <div className="grid md:grid-cols-2 gap-10">
                      {/* Personal Details */}
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-2">Your Name</label>
                          <input 
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-800 dark:text-white font-bold outline-none focus:border-blue-500 transition-all"
                            placeholder="Full Name"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-2">Work Email</label>
                          <input 
                            type="email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 text-slate-800 dark:text-white font-bold outline-none focus:border-blue-500 transition-all"
                            placeholder="email@company.com"
                          />
                        </div>
                      </div>

                      {/* Date Selection */}
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-2">Choose Date</label>
                        <div className="grid grid-cols-1 gap-3">
                          {dates.map(date => (
                            <button 
                              key={date}
                              onClick={() => setSelectedDate(date)}
                              className={`p-4 rounded-xl border-2 font-black text-sm transition-all text-left flex justify-between items-center ${
                                selectedDate === date ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'border-slate-100 dark:border-slate-800 text-slate-400'
                              }`}
                            >
                              {date}
                              {selectedDate === date && <CheckCircle2 size={16} />}
                            </button>
                          ))}
                        </div>
                      </div>
                   </div>

                   {/* Time Slots */}
                   <div className={`space-y-4 transition-all duration-500 ${selectedDate ? 'opacity-100' : 'opacity-30 pointer-events-none'}`}>
                     <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-2">Available Slots</label>
                     <div className="flex flex-wrap gap-3">
                       {timeSlots.map(time => (
                         <button 
                           key={time}
                           onClick={() => setSelectedTime(time)}
                           className={`px-6 py-4 rounded-xl border-2 font-bold text-xs transition-all ${
                             selectedTime === time ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 'border-slate-100 dark:border-slate-800 text-slate-500'
                           }`}
                         >
                           {time}
                         </button>
                       ))}
                     </div>
                   </div>

                   <button 
                    disabled={!selectedDate || !selectedTime || !userName || !userEmail || isSubmitting}
                    onClick={handleSchedule}
                    className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xl uppercase tracking-widest shadow-xl transition-all active:scale-95 disabled:opacity-30 flex items-center justify-center gap-4 mt-8"
                   >
                     {isSubmitting ? <Loader2 size={24} className="animate-spin" /> : <>Confirm Briefing <ArrowRight size={20} /></>}
                   </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};