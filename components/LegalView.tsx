import React, { useState, useEffect } from 'react';

interface LegalViewProps {
  type: 'privacy' | 'terms' | 'dpa';
}

export const LegalView: React.FC<LegalViewProps> = ({ type }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const content = {
    privacy: {
      title: "Privacy Policy",
      subtitle: "Data Governance & Security",
      sections: [
        {
          title: "1. Commitment to Privacy",
          content: "At Trustskep Global, we are committed to protecting your personal information and your right to privacy. This notice describes how we might use your information if you visit our website, engage with our sales/marketing, or use our specialized tech services. If you disagree with any terms, please discontinue use of our Services immediately."
        },
        {
          title: "2. Information We Collect",
          content: "We collect personal information that you voluntarily provide to us (names, phone numbers, email addresses, job titles). When you visit or log in, cookies and similar technologies may be used by our online data partners or vendors to associate these activities with other personal information they or others have about you."
        },
        {
          title: "3. Usage and Legal Basis",
          content: "We process your information based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent. This includes providing the Services, sending marketing communications (which you can opt-out of), and protecting our rights."
        },
        {
          title: "4. Sharing and Disclosure",
          content: "We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. This may include sharing during business transfers, mergers, or with verified business partners to offer specific products or services."
        },
        {
          title: "5. Data Retention",
          content: "We keep your information for as long as necessary to fulfill the purposes outlined in this notice, unless a longer period is required by law. In any case, we do not retain personal information for longer than 2 years after the termination of an active relationship."
        },
        {
          title: "6. Your Rights",
          content: "Depending on your jurisdiction, you may have the right to request access to, update, or delete the personal data we collect. To exercise these rights, please contact our data compliance team at trustskepglobal@solution.org."
        }
      ]
    },
    terms: {
      title: "Terms of Use",
      subtitle: "Service Level Standards",
      sections: [
        {
          title: "1. Agreement to Terms",
          content: "These Terms constitute a legally binding agreement between you and Trustskep Global. By accessing the Site, you agree to be bound by all of these Terms. The Site is intended for users who are at least 18 years old."
        },
        {
          title: "2. Intellectual Property",
          content: "Unless otherwise indicated, the Site and all source code, databases, functionality, software, website designs, audio, video, text, and graphics (the 'Content') are our proprietary property. Marks and Content are protected by copyright and trademark laws of Nigeria and international conventions."
        },
        {
          title: "3. User Representations",
          content: "By using the Site, you represent that you have legal capacity, you will not access the Site through automated or non-human means (bots/scripts), and your use will not violate any applicable law or regulation."
        },
        {
          title: "4. Prohibited Activities",
          content: "You may not systematically retrieve data to create a database, defraud or mislead us, circumvent security features, disparage our services, or upload viruses/malicious code. Use of automated systems like scrapers or spiders is strictly prohibited."
        },
        {
          title: "5. Disclaimer & Liability",
          content: "The site is provided on an AS-IS and AS-AVAILABLE basis. We make no warranties about accuracy. In no event will we be liable for any direct, indirect, consequential, or punitive damages arising from your use of the site, to the maximum extent permitted by law."
        }
      ]
    },
    dpa: {
      title: "Data Processing Agreement",
      subtitle: "Global Compliance Framework",
      sections: [
        {
          title: "1. Scope and Precedence",
          content: "This DPA governs the processing of Personal Data between Trustskep Global ('Processor') and the 'Client' ('Controller'). It supplements the primary service agreement and prevails over any conflicting terms regarding data processing."
        },
        {
          title: "2. Definitions",
          content: "'Controller' determines the purpose of processing. 'Processor' processes data on behalf of the Controller. 'Personal Data Breach' means unauthorized access to or accidental loss of Personal Data. 'Subprocessor' refers to third parties (e.g., AWS, Google) engaged by the Processor."
        },
        {
          title: "3. Details of Processing",
          content: "Processing involves name, email, phone, and professional data for the purpose of technical service delivery. This continues for the duration of the Agreement. We act strictly upon the Client's written instructions unless required otherwise by law."
        },
        {
          title: "4. Technical Security Measures",
          content: "Trustskep Global implements 26 rigorous points of security, including: (1) Unauthorized physical access prevention; (2) Passwords and individual user authentication; (3) Data encryption during transmission; (4) Regular restore tests from protected backups; and (5) Systematic destruction of unnecessary data."
        },
        {
          title: "5. Subprocessors",
          content: "Client acknowledges the use of essential subprocessors for cloud infrastructure (AWS, Google, Neon). We ensure that all subprocessors are bound by the same or substantially similar data protection obligations as those defined in this DPA."
        },
        {
          title: "6. Data Transfers",
          content: "Personal Data may be transferred globally as necessary to provide Services. We utilize Standard Contractual Clauses (SCCs) to normalize international data transfers to countries not recognized as providing an adequate level of protection."
        },
        {
          title: "7. Disposition of Data",
          content: "Upon termination of the Agreement or at the Client's reasonable request, we will delete or return all Personal Data, except as required by law. Anonymized data may be retained for legitimate analytical purposes."
        }
      ]
    }
  };

  const active = content[type];

  return (
    <div className="animate-in fade-in duration-1000">
      <section className="relative h-[55vh] flex items-center overflow-hidden bg-slate-950 pt-32">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover"
            style={{ 
              transform: `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.2}px)`, 
              transition: 'transform 0.1s linear',
              filter: 'brightness(0.4)'
            }}
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-keyboard-and-hands-typing-1602-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30 opacity-90"></div>
        </div>
        <div className="w-full px-6 sm:px-10 lg:px-20 relative z-10 max-w-[1600px] mx-auto">
           <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] drop-shadow-sm animate-fade-in-up" style={{ animationDelay: '100ms' }}>{active.subtitle}</span>
           <h1 className="text-7xl md:text-9xl font-black text-white leading-none tracking-tighter mt-4 drop-shadow-2xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>{active.title}.</h1>
        </div>
      </section>

      <section className="py-32 bg-white dark:bg-slate-950">
        <div className="w-full px-6 sm:px-10 lg:px-20 max-w-4xl mx-auto space-y-16 animate-fade-in-up">
          {active.sections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="text-3xl font-black text-[#002B5B] dark:text-white tracking-tight flex items-center gap-4">
                <span className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center text-sm">{idx + 1}</span>
                {section.title}
              </h3>
              <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium pl-14">
                {section.content}
              </p>
            </div>
          ))}
          
          <div className="pt-16 border-t border-slate-100 dark:border-white/5">
            <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <p className="text-sm font-black text-[#002B5B] dark:text-white uppercase tracking-widest mb-2">Need further clarification?</p>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Our legal team in Osun, Nigeria is available for compliance inquiries.</p>
              </div>
              <button className="px-8 py-4 bg-[#002B5B] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl">
                Contact Legal Hub
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};