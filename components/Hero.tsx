import React, { useState, useEffect, useRef } from 'react';
import { PlayCircle, ChevronDown, ArrowRight, Zap, Sparkles, Pause, Play } from 'lucide-react';

interface HeroProps {
  onExplore?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPrograms = () => {
    if (onExplore) {
      onExplore();
    } else {
      const el = document.getElementById('programs');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 pt-32 pb-20 md:pt-40 md:pb-20"
      aria-labelledby="hero-title"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          style={{ 
            transform: `scale(${1 + scrollY * 0.00015}) translateY(${scrollY * 0.05}px)`,
            transition: 'transform 0.3s cubic-bezier(0.2, 0, 0.2, 1)'
          }}
          aria-hidden="true"
        >
          <source 
            src="https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_25fps.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Refined Animated Overlays with improved contrast */}
        <div className="absolute inset-0 particle-bg opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-blue-950/20 to-slate-950 animate-mesh bg-[length:300%_300%]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,89,255,0.08),transparent_80%)]"></div>
      </div>

      {/* Accessibility Control: Video Toggle */}
      <button 
        onClick={toggleVideo}
        className="absolute bottom-12 right-12 z-20 p-4 bg-white/5 hover:bg-white/10 backdrop-blur-2xl rounded-full border border-white/10 text-white/80 hover:text-white transition-all hover:scale-110 active:scale-90 flex items-center justify-center shadow-2xl focus:ring-2 focus:ring-blue-500 outline-none"
        aria-label={isPlaying ? "Pause background video" : "Play background video"}
        aria-pressed={!isPlaying}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>

      <div className="w-full px-6 sm:px-10 lg:px-20 relative z-10 max-w-[1600px] mx-auto">
        <div className="max-w-5xl space-y-12 md:space-y-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-600/10 border border-blue-400/20 backdrop-blur-xl text-blue-300 text-[10px] md:text-[11px] font-black tracking-[0.4em] uppercase shadow-2xl animate-fade-in-up">
            <Zap size={14} className="text-blue-400 animate-pulse" aria-hidden="true" />
            <span>GLOBAL TALENT OUTSOURCING</span>
          </div>
          
          <div className="space-y-6">
            <h1 
              id="hero-title"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] md:leading-none tracking-tight drop-shadow-2xl animate-fade-in-up [text-shadow:0_4px_24px_rgba(0,0,0,0.5)]"
            >
              Your Elite <br />
              <span className="shimmer-text">Technical Squads.</span>
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-slate-100 leading-tight max-w-3xl font-medium tracking-tight opacity-90 animate-fade-in-up [text-shadow:0_2px_12px_rgba(0,0,0,0.3)]" style={{ animationDelay: '200ms' }}>
              We architect high-performance software teams that function as a seamless extension of your company. Cost-effective, globally sourced, and vetted by the top 1% standard.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-6 pt-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <button 
              onClick={scrollToRegister}
              className="btn-spring btn-glow relative group bg-blue-600 hover:bg-blue-500 text-white px-10 md:px-16 py-6 md:py-8 rounded-[2.5rem] font-black text-xl shadow-[0_20px_50px_rgba(0,89,255,0.2)] hover:shadow-[0_20px_60px_rgba(0,89,255,0.4)] flex items-center justify-center gap-4 overflow-hidden border border-blue-400/30 focus:ring-4 focus:ring-blue-500/50 outline-none"
              aria-label="Navigate to the registration portal to build your team"
            >
              <Sparkles size={20} className="text-white/60 group-hover:rotate-12 transition-transform duration-500" aria-hidden="true" />
              <span>Build My Team</span>
              <ArrowRight size={26} className="group-hover:translate-x-2 transition-transform duration-500" aria-hidden="true" />
            </button>
            <button 
              onClick={scrollToPrograms}
              className="btn-spring group bg-white/5 backdrop-blur-3xl border border-white/10 hover:border-blue-400/30 hover:bg-white/10 text-white px-10 md:px-16 py-6 md:py-8 rounded-[2.5rem] font-black text-xl flex items-center justify-center gap-4 shadow-xl hover:shadow-blue-500/10 focus:ring-4 focus:ring-white/20 outline-none"
              aria-label="Explore our technical talent capabilities"
            >
              <PlayCircle size={30} className="text-blue-400 group-hover:scale-110 group-hover:text-blue-300 transition-all duration-500" aria-hidden="true" />
              Talent Capabilities
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow text-white/20 hidden md:block">
        <ChevronDown size={32} aria-hidden="true" />
      </div>
    </section>
  );
};