
import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, FileUp, AlertCircle } from 'lucide-react';

// IMPORTANT: Replace this with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_WEBHOOK = 'https://script.google.com/macros/s/AKfycbzNxjlIq0_ozZcQHLQLWaoZ4mfcOLRFifqvIoweWK1cF40n_V3uBHMNeUYwvnBEMDVm/exec';

export const TalentForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (name: string, value: any) => {
    let error = '';
    const val = typeof value === 'string' ? value.trim() : value;
    if (name === 'resume' && !value) {
      error = 'CV is required';
    } else if (typeof val === 'string' && !val) {
      error = 'Field is required';
    } else {
      if (name === 'email' && !/\S+@\S+\.\S+/.test(val)) error = 'Invalid email';
      if (name === 'phone' && typeof val === 'string' && val.replace(/\D/g, '').length < 7) error = 'Invalid phone number';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validate(name, value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (touched[name]) validate(name, value);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, resume: 'File size must be under 5MB' }));
        return;
      }
      setFileName(file.name);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        // Extract the base64 string from the data URL
        const base64String = (event.target?.result as string).split(',')[1];
        setFileData(base64String);
      };
      reader.readAsDataURL(file);
      
      setErrors(prev => ({ ...prev, resume: '' }));
      setTouched(prev => ({ ...prev, resume: true }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    let hasError = false;
    ['fullName', 'email', 'phone', 'education', 'skills', 'desiredJob'].forEach(field => {
      if (validate(field, formData.get(field))) hasError = true;
      setTouched(prev => ({ ...prev, [field]: true }));
    });
    if (!fileName && validate('resume', null)) hasError = true;

    if (hasError) return;

    setStatus('submitting');
    
    try {
      // Construct JSON payload for Google Apps Script
      const payload = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        education: formData.get('education'),
        skills: formData.get('skills'),
        desiredJob: formData.get('desiredJob'),
        resumeName: fileName,
        resumeData: fileData, // Base64 string of the PDF
        mimeType: 'application/pdf',
        timestamp: new Date().toISOString()
      };

      // We use no-cors because Apps Script web apps usually don't send back standard CORS headers
      // We use text/plain to avoid preflight requests which Apps Script doesn't handle well
      await fetch(GOOGLE_SCRIPT_WEBHOOK, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      setStatus('success');
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-20 space-y-10 animate-fade-in-up">
        <div className="w-32 h-32 bg-blue-500 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl">
          <CheckCircle2 size={64} className="text-white" />
        </div>
        <h3 className="text-5xl font-black text-white tracking-tighter uppercase">Application Received</h3>
        <p className="text-blue-100 text-xl font-medium max-w-md mx-auto leading-relaxed">
          Technical profile uploaded. Our recruitment protocol will contact you after the vetting stage.
        </p>
      </div>
    );
  }

  const inputClass = (name: string) => `w-full bg-white/5 border-2 rounded-2xl py-5 px-8 text-white outline-none font-bold transition-all ${
    touched[name] && errors[name] ? 'border-rose-500 bg-rose-500/5' : 'border-white/10 focus:border-blue-400'
  }`;

  return (
    <div className="space-y-10" id="talent-form-root">
      <div className="text-center lg:text-left border-b border-white/10 pb-10">
        <h3 className="text-4xl font-black text-white tracking-tight uppercase">Join Elite Pathways</h3>
        <p className="text-blue-200 text-xl font-medium opacity-80 mt-2">Grow with the top 1% of technical talent.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {status === 'error' && (
          <div className="p-4 bg-rose-500/20 border border-rose-500 text-rose-200 rounded-2xl text-sm font-bold flex items-center gap-3">
            <AlertCircle size={20} /> Submission failed. Please verify your connection or try again.
          </div>
        )}

        <div className="space-y-2">
          <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest px-4">Full Legal Name*</label>
          <input name="fullName" onBlur={handleBlur} onChange={handleChange} className={inputClass('fullName')} placeholder="Full Name" />
          {touched.fullName && errors.fullName && <p className="text-rose-400 text-xs font-bold flex items-center gap-1 px-4 mt-1"><AlertCircle size={12} /> {errors.fullName}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest px-4">Email Address*</label>
            <input name="email" onBlur={handleBlur} onChange={handleChange} className={inputClass('email')} placeholder="Email" />
            {touched.email && errors.email && <p className="text-rose-400 text-xs font-bold flex items-center gap-1 px-4 mt-1"><AlertCircle size={12} /> {errors.email}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest px-4">Phone*</label>
            <input name="phone" onBlur={handleBlur} onChange={handleChange} className={inputClass('phone')} placeholder="Number" />
            {touched.phone && errors.phone && <p className="text-rose-400 text-sm font-black flex items-center gap-2 px-4 mt-2 animate-pulse"><AlertCircle size={14} /> {errors.phone}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest px-4">Upload CV (PDF)*</label>
          <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-[2.5rem] cursor-pointer transition-all ${
            touched.resume && errors.resume ? 'border-rose-500 bg-rose-500/5' : 'border-white/10 hover:bg-white/10'
          }`}>
            <div className="flex flex-col items-center justify-center text-center px-6">
              <FileUp className={`w-8 h-8 mb-2 ${fileName ? 'text-blue-400' : 'text-white/40'}`} />
              <p className="text-xs text-white/60 font-black">{fileName || 'Click to Upload CV (Max 5MB)'}</p>
            </div>
            <input type="file" name="resume" className="hidden" accept=".pdf" onChange={handleFile} />
          </label>
          {touched.resume && errors.resume && <p className="text-rose-400 text-xs font-bold flex items-center gap-1 px-4 mt-1"><AlertCircle size={12} /> {errors.resume}</p>}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest px-4">Education*</label>
            <input name="education" onBlur={handleBlur} onChange={handleChange} className={inputClass('education')} placeholder="Institution & Year" />
            {touched.education && errors.education && <p className="text-rose-400 text-xs font-bold flex items-center gap-1 px-4 mt-1"><AlertCircle size={12} /> {errors.education}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest px-4">Key Skills*</label>
            <input name="skills" onBlur={handleBlur} onChange={handleChange} className={inputClass('skills')} placeholder="e.g. React, Python, AWS" />
            {touched.skills && errors.skills && <p className="text-rose-400 text-xs font-bold flex items-center gap-1 px-4 mt-1"><AlertCircle size={12} /> {errors.skills}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-blue-300 uppercase tracking-widest px-4">Desired Role*</label>
          <input name="desiredJob" onBlur={handleBlur} onChange={handleChange} className={inputClass('desiredJob')} placeholder="e.g. Senior Backend Dev" />
          {touched.desiredJob && errors.desiredJob && <p className="text-rose-400 text-xs font-bold flex items-center gap-1 px-4 mt-1"><AlertCircle size={12} /> {errors.desiredJob}</p>}
        </div>

        <button disabled={status === 'submitting'} type="submit" className="w-full bg-white text-[#002B5B] py-7 rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4">
          {status === 'submitting' ? <Loader2 className="animate-spin" size={28} /> : <>Verify & Apply <Send size={24} /></>}
        </button>
      </form>
    </div>
  );
};
