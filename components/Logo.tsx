import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Logo: React.FC<{ className?: string; hideText?: boolean }> = ({ className = "h-14 md:h-20", hideText = false }) => {
  const logoUrl = "https://i.ibb.co/Mqz6RkG/Trustskep-Global.png";

  return (
    <div className={`flex flex-row items-center gap-3 md:gap-5 ${className} group cursor-pointer`}>
      <div className="relative h-full aspect-square flex items-center justify-center p-2 bg-white/10 rounded-2xl backdrop-blur-md border border-white/30 shadow-xl group-hover:bg-white/20 transition-all duration-700">
        {/* Visibility Glow for dark sections */}
        <div className="absolute inset-0 bg-white/40 rounded-2xl blur-[40px] opacity-20 group-hover:opacity-60 transition-opacity"></div>
        <img 
          src={logoUrl} 
          alt="Trustskep Global" 
          className="h-full w-full object-contain relative z-10 transition-all group-hover:scale-110 duration-700 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = "w-10 h-10 md:w-14 md:h-14 bg-[#002B5B] rounded-xl flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-inner border-2 border-white/20";
            fallback.innerText = "T";
            target.parentElement?.appendChild(fallback);
          }}
        />
      </div>
      
      {!hideText && (
        <div className="flex flex-col items-start justify-center">
          <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-tighter text-[#002B5B] dark:text-white leading-none group-hover:text-blue-600 transition-colors uppercase">
            TRUSTSKEP
          </span>
          <div className="flex items-center gap-1.5 mt-1.5">
             <ArrowRight size={12} className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
             <span className="text-[8px] md:text-[10px] uppercase font-black tracking-[0.4em] md:tracking-[0.6em] text-blue-600 dark:text-blue-400">GLOBAL</span>
          </div>
        </div>
      )}
    </div>
  );
};