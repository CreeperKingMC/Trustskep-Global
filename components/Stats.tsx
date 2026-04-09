import React from 'react';
import { ScrollReveal } from './ScrollReveal';

const stats = [
  { value: '250+', label: 'Successful Projects' },
  { value: '1.2M', label: 'Global Reaches' },
  { value: '94%', label: 'Partner Satisfaction' },
  { value: '450', label: 'Tech Collaborators' },
];

export const Stats: React.FC = () => {
  return (
    <section id="impact" className="py-32 bg-slate-900 overflow-hidden relative border-y border-white/5">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,#3b82f6_0%,transparent_50%)]"></div>
        <div className="absolute w-[1000px] h-[1000px] border border-blue-500/20 rounded-full -top-1/2 -right-1/4 animate-pulse-slow"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-20">
          <h2 className="text-xs font-black text-blue-400 uppercase tracking-[0.6em] mb-4">The Trustskep Impact</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white">Scaling Global Innovation</h3>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <ScrollReveal key={idx} delay={idx * 150}>
              <div 
                className="group p-10 rounded-[3rem] glass-dark text-center transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(37,99,235,0.3)] glow-hover border-white/10"
              >
                <div className="text-5xl md:text-6xl font-black mb-4 text-white group-hover:scale-110 transition-transform duration-500">
                  {stat.value}
                </div>
                <div className="text-sm font-black text-blue-400/80 uppercase tracking-[0.3em]">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};