
import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, Building2, Phone, Mail, User, MessageSquare, AlertCircle } from 'lucide-react';

const GOOGLE_SCRIPT_WEBHOOK = 'https://script.google.com/macros/s/AKfycbzy-XEd8AT1uz-OAbLyl-Hz3bU8VFtV71iStyDjoBfetooFBin-nkMhu1FQO7uQifqWmw/exec';

const COMMON_CODES = [
  { code: '+1', name: 'USA/Canada' },
  { code: '+44', name: 'UK' },
  { code: '+234', name: 'Nigeria' },
  { code: '+27', name: 'South Africa' },
  { code: '+91', name: 'India' },
  { code: '+254', name: 'Kenya' },
  { code: '+233', name: 'Ghana' },
];

export const ClientForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [countryCode, setCountryCode] = useState('+1');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (name: string, value: string) => {
    let error = '';
    const val = value.trim();
    if (!val) {
      error = 'Field is required';
    } else {
      if (name === 'email' && !/\S+@\S+\.\S+/.test(val)) error = 'Enter a valid email';
      if (name === 'phone' && val.replace(/\D/g, '').length < 7) error = 'Enter a valid phone number';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validate(name, value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (touched[name]) validate(name, value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Final check
    let hasError = false;
    const fields = ['firstName', 'lastName', 'email', 'phone', 'companyName', 'service'];
    fields.forEach(field => {
      const err = validate(field, formData.get(field) as string);
      if (err) hasError = true;
      setTouched(prev => ({ ...prev, [field]: true }));
    });

    if (hasError) return;

    setStatus('submitting');
    try {
      const formData = new FormData(form);
      const payload = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        countryCode: formData.get('countryCode'),
        phone: formData.get('phone'),
        companyName: formData.get('companyName'),
        service: formData.get('service'),
        timestamp: new Date().toISOString()
      };

      await fetch(GOOGLE_SCRIPT_WEBHOOK, { 
        method: 'POST', 
        mode: 'no-cors', 
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload) 
      });
      setStatus('success');
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-20 space-y-10 animate-fade-in-up">
        <div className="w-32 h-32 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl">
          <CheckCircle2 size={64} className="text-white" />
        </div>
        <h3 className="text-5xl font-black text-white tracking-tighter">Protocol Initiated</h3>
        <p className="text-blue-100 text-xl font-medium max-w-md mx-auto leading-relaxed">
          Inquiry logged. Expect a strategic briefing call within 24 hours.
        </p>
      </div>
    );
  }

  const inputClass = (name: string) => `w-full bg-white/5 border-2 rounded-2xl py-5 px-8 text-white outline-none font-bold transition-all ${
    touched[name] && errors[name] ? 'border-rose-500 bg-rose-500/5' : 'border-white/10 focus:border-blue-400'
  }`;

  return (
    <div className="space-y-10" id="client-form-root">
      <div className="text-center lg:text-left border-b border-white/10 pb-10">
        <h3 className="text-4xl font-black text-white tracking-tight">Hire Elite Talent Now</h3>
        <p className="text-blue-200 text-xl font-medium opacity-80 mt-2">Scale your team with Trustskep specialists.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest px-4">First Name*</label>
            <input name="firstName" onBlur={handleBlur} onChange={handleChange} className={inputClass('firstName')} placeholder="First Name" />
            {touched.firstName && errors.firstName && <p className="text-rose-400 text-xs font-bold flex items-center gap-1 px-4 mt-1"><AlertCircle size={12} /> {errors.firstName}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest px-4">Last Name*</label>
            <input name="lastName" onBlur={handleBlur} onChange={handleChange} className={inputClass('lastName')} placeholder="Last Name" />
            {touched.lastName && errors.lastName && <p className="text-rose-400 text-xs font-bold flex items-center gap-1 px-4 mt-1"><AlertCircle size={12} /> {errors.lastName}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest px-4">Work Email*</label>
          <div className="relative">
            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input name="email" type="email" onBlur={handleBlur} onChange={handleChange} className={`${inputClass('email')} pl-14`} placeholder="email@company.com" />
          </div>
          {touched.email && errors.email && <p className="text-rose-400 text-xs font-bold flex items-center gap-1 px-4 mt-1"><AlertCircle size={12} /> {errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest px-4">Phone Number*</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <select name="countryCode" value={countryCode} onChange={(e) => setCountryCode(e.target.value)} className="bg-white/10 border-2 border-white/10 rounded-2xl py-5 px-4 text-white font-bold outline-none cursor-pointer">
              {COMMON_CODES.map(c => <option key={c.code} value={c.code} className="bg-slate-900">{c.code} ({c.name})</option>)}
            </select>
            <div className="relative flex-grow">
              <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input name="phone" onBlur={handleBlur} onChange={handleChange} className={`${inputClass('phone')} pl-14`} placeholder="Mobile Number" />
            </div>
          </div>
          {touched.phone && errors.phone && <p className="text-rose-400 text-sm font-black flex items-center gap-2 px-4 mt-2 animate-pulse"><AlertCircle size={14} /> {errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest px-4">Company Name*</label>
          <input name="companyName" onBlur={handleBlur} onChange={handleChange} className={inputClass('companyName')} placeholder="Your organization" />
          {touched.companyName && errors.companyName && <p className="text-rose-400 text-xs font-bold flex items-center gap-1 px-4 mt-1"><AlertCircle size={12} /> {errors.companyName}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest px-4">Solution Required*</label>
          <select name="service" onBlur={handleBlur} onChange={handleChange} className={inputClass('service')}>
            <option value="" className="bg-slate-900">Choose a solution...</option>
            <option className="bg-slate-900">Enterprise Engineering Squads</option>
            <option className="bg-slate-900">AI Data Operations</option>
            <option className="bg-slate-900">Technical Consultancy</option>
          </select>
          {touched.service && errors.service && <p className="text-rose-400 text-xs font-bold flex items-center gap-1 px-4 mt-1"><AlertCircle size={12} /> {errors.service}</p>}
        </div>

        <button disabled={status === 'submitting'} type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-7 rounded-[2rem] font-black text-2xl shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4">
          {status === 'submitting' ? <Loader2 className="animate-spin" size={28} /> : <>Initiate Project <Send size={24} /></>}
        </button>
      </form>
    </div>
  );
};
